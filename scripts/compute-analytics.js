#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'public', 'data');
const citiesDir = path.join(dataDir, 'cities');

// Helper: linear regression slope
function linRegSlope(points) {
  // points: [{x, y}]
  const n = points.length;
  if (n < 2) return 0;
  const sx = points.reduce((a, p) => a + p.x, 0);
  const sy = points.reduce((a, p) => a + p.y, 0);
  const sxy = points.reduce((a, p) => a + p.x * p.y, 0);
  const sxx = points.reduce((a, p) => a + p.x * p.x, 0);
  const denom = n * sxx - sx * sx;
  if (denom === 0) return 0;
  return (n * sxy - sx * sy) / denom;
}

// Helper: Gini coefficient
function gini(values) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = sorted.reduce((a, b) => a + b, 0) / n;
  if (mean === 0) return 0;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      sum += Math.abs(sorted[i] - sorted[j]);
    }
  }
  return sum / (2 * n * n * mean);
}

console.log('Loading city data...');
const cityFiles = fs.readdirSync(citiesDir).filter(f => f.endsWith('.json'));
const cityIndex = JSON.parse(fs.readFileSync(path.join(dataDir, 'city-index.json'), 'utf8'));
const stats = JSON.parse(fs.readFileSync(path.join(dataDir, 'stats.json'), 'utf8'));
const nationalTrends = JSON.parse(fs.readFileSync(path.join(dataDir, 'national-trends.json'), 'utf8'));

// ========================
// A. Crime Velocity Index
// ========================
console.log('Computing Crime Velocity Index...');
const velocityResults = [];

for (const file of cityFiles) {
  const city = JSON.parse(fs.readFileSync(path.join(citiesDir, file), 'utf8'));
  const years = Object.keys(city.years).map(Number).sort();
  if (years.length < 3) continue;
  // Skip tiny cities — per-capita rates are unreliable below 10K
  const latestYear = years[years.length - 1];
  const pop = city.years[latestYear]?.population || 0;
  if (pop < 10000) continue;

  const violentPoints = years.map(y => ({ x: y, y: city.years[y].violentRate || 0 }));
  const propertyPoints = years.map(y => ({ x: y, y: city.years[y].propertyRate || 0 }));

  const violentTrend = linRegSlope(violentPoints);
  const propertyTrend = linRegSlope(propertyPoints);

  velocityResults.push({
    slug: city.slug,
    city: city.city,
    state: city.state,
    violentTrend: Math.round(violentTrend * 100) / 100,
    propertyTrend: Math.round(propertyTrend * 100) / 100,
    rawScore: violentTrend * 2 + propertyTrend, // weight violent more
    years: years.length,
  });
}

// Normalize using 2nd/98th percentile (robust to outliers)
const scores = velocityResults.map(v => v.rawScore).sort((a, b) => a - b);
const p2 = scores[Math.floor(scores.length * 0.02)] || -1;
const p98 = scores[Math.floor(scores.length * 0.98)] || 1;
const maxAbs = Math.max(Math.abs(p2), Math.abs(p98)) || 1;

for (const v of velocityResults) {
  v.velocityScore = Math.round((v.rawScore / maxAbs) * 100 * 10) / 10;
  v.velocityScore = Math.max(-100, Math.min(100, v.velocityScore));
  delete v.rawScore;

  if (v.velocityScore <= -40) v.category = 'rapidly-improving';
  else if (v.velocityScore <= -10) v.category = 'improving';
  else if (v.velocityScore <= 10) v.category = 'stable';
  else if (v.velocityScore <= 40) v.category = 'worsening';
  else v.category = 'rapidly-worsening';
}

velocityResults.sort((a, b) => b.velocityScore - a.velocityScore);
fs.writeFileSync(path.join(dataDir, 'crime-velocity.json'), JSON.stringify(velocityResults));
console.log(`  → ${velocityResults.length} cities with velocity scores`);

// ========================
// B. Violence Inequality Index
// ========================
console.log('Computing Violence Inequality Index...');
const stateMap = {};
for (const c of cityIndex) {
  if (!stateMap[c.state]) stateMap[c.state] = [];
  stateMap[c.state].push(c);
}

const stateAbbrs = {
  'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
  'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
  'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
  'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
  'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
  'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
  'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
  'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
  'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
  'District of Columbia': 'DC',
};

const inequalityResults = [];
for (const [state, cities] of Object.entries(stateMap)) {
  if (cities.length < 3) continue;
  const rates = cities.map(c => c.violentRate || 0);
  const giniIndex = Math.round(gini(rates) * 1000) / 1000;

  // Sort by total violent crime (rate * pop proxy)
  const sorted = [...cities].sort((a, b) => (b.violentCrime || 0) - (a.violentCrime || 0));
  const totalViolent = cities.reduce((s, c) => s + (c.violentCrime || 0), 0);

  const topCityPct = totalViolent > 0 ? Math.round((sorted[0].violentCrime || 0) / totalViolent * 1000) / 10 : 0;
  const top3 = sorted.slice(0, 3).reduce((s, c) => s + (c.violentCrime || 0), 0);
  const top3Pct = totalViolent > 0 ? Math.round(top3 / totalViolent * 1000) / 10 : 0;

  const avgRate = Math.round(rates.reduce((a, b) => a + b, 0) / rates.length * 10) / 10;
  const maxRate = Math.round(Math.max(...rates) * 10) / 10;
  const minRate = Math.round(Math.min(...rates) * 10) / 10;

  inequalityResults.push({
    state,
    abbr: stateAbbrs[state] || state.substring(0, 2).toUpperCase(),
    giniIndex,
    topCityPct,
    top3Pct,
    topCity: sorted[0].city,
    numCities: cities.length,
    avgRate,
    maxRate,
    minRate,
  });
}

inequalityResults.sort((a, b) => b.giniIndex - a.giniIndex);
fs.writeFileSync(path.join(dataDir, 'violence-inequality.json'), JSON.stringify(inequalityResults));
console.log(`  → ${inequalityResults.length} states with inequality index`);

// ========================
// C. City Crime DNA / Fingerprint
// ========================
console.log('Computing Crime DNA Profiles...');
const topCities = [...cityIndex].sort((a, b) => b.population - a.population).slice(0, 500);

// National average percentages
const nat = stats.national2024;
const natTotal = nat.violentCrime + nat.propertyCrime;
const natProfile = {
  murderPct: nat.homicide / natTotal * 100,
  rapePct: nat.rape / natTotal * 100,
  robberyPct: nat.robbery / natTotal * 100,
  assaultPct: nat.aggravatedAssault / natTotal * 100,
  burglaryPct: nat.burglary / natTotal * 100,
  larcenyPct: nat.larceny / natTotal * 100,
  mvtPct: nat.motorVehicleTheft / natTotal * 100,
};

const dnaProfiles = [];
for (const c of topCities) {
  // Load full city data
  const filePath = path.join(citiesDir, `${c.slug}.json`);
  if (!fs.existsSync(filePath)) continue;
  const cityData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Use latest year
  const years = Object.keys(cityData.years).map(Number).sort();
  const latest = cityData.years[years[years.length - 1]];

  const total = (latest.violentCrime || 0) + (latest.propertyCrime || 0);
  if (total === 0) continue;

  const profile = {
    murderPct: Math.round((latest.murder || 0) / total * 10000) / 100,
    rapePct: Math.round((latest.rape || 0) / total * 10000) / 100,
    robberyPct: Math.round((latest.robbery || 0) / total * 10000) / 100,
    assaultPct: Math.round((latest.aggravatedAssault || 0) / total * 10000) / 100,
    burglaryPct: Math.round((latest.burglary || 0) / total * 10000) / 100,
    larcenyPct: Math.round((latest.larceny || 0) / total * 10000) / 100,
    mvtPct: Math.round((latest.motorVehicleTheft || 0) / total * 10000) / 100,
  };

  const deviations = {};
  for (const key of Object.keys(natProfile)) {
    const field = key.replace('Pct', '');
    deviations[field] = Math.round((profile[key] - natProfile[key]) * 100) / 100;
  }

  // Assign personality
  const violentShare = profile.murderPct + profile.rapePct + profile.robberyPct + profile.assaultPct;
  const natViolentShare = natProfile.murderPct + natProfile.rapePct + natProfile.robberyPct + natProfile.assaultPct;
  const propertyShare = profile.burglaryPct + profile.larcenyPct + profile.mvtPct;
  const natPropertyShare = natProfile.burglaryPct + natProfile.larcenyPct + natProfile.mvtPct;

  let personality = 'Balanced';
  if (violentShare > natViolentShare * 1.5) {
    if (profile.assaultPct > natProfile.assaultPct * 2) personality = 'Assault Capital';
    else if (profile.robberyPct > natProfile.robberyPct * 2) personality = 'Robbery Hotspot';
    else if (profile.murderPct > natProfile.murderPct * 2) personality = 'Homicide Zone';
    else personality = 'Violent Hub';
  } else if (propertyShare > natPropertyShare * 1.15) {
    if (profile.mvtPct > natProfile.mvtPct * 2) personality = 'Auto Theft Zone';
    else if (profile.larcenyPct > natProfile.larcenyPct * 1.2) personality = 'Theft Magnet';
    else personality = 'Property Target';
  }

  dnaProfiles.push({
    slug: c.slug,
    city: c.city,
    state: c.state,
    population: c.population,
    profile,
    personality,
    deviations,
  });
}

fs.writeFileSync(path.join(dataDir, 'crime-dna-profiles.json'), JSON.stringify(dnaProfiles));
console.log(`  → ${dnaProfiles.length} city DNA profiles`);

// ========================
// D. Hidden Crime Estimates
// ========================
console.log('Computing Hidden Crime Estimates...');
const reportingRates = {
  'Rape / Sexual Assault': { reported: nat.rape, rate: 0.22 },
  'Robbery': { reported: nat.robbery, rate: 0.48 },
  'Aggravated Assault': { reported: nat.aggravatedAssault, rate: 0.50 },
  'Burglary': { reported: nat.burglary, rate: 0.42 },
  'Larceny / Theft': { reported: nat.larceny, rate: 0.27 },
  'Motor Vehicle Theft': { reported: nat.motorVehicleTheft, rate: 0.79 },
  'Homicide': { reported: nat.homicide, rate: 0.99 }, // Nearly all reported
};

const hiddenCrime = [];
let totalReported = 0;
let totalEstimated = 0;

for (const [crimeType, data] of Object.entries(reportingRates)) {
  const estimatedActual = Math.round(data.reported / data.rate);
  const unreported = estimatedActual - data.reported;
  hiddenCrime.push({
    crimeType,
    reported: data.reported,
    estimatedActual,
    unreported,
    reportingRate: data.rate,
  });
  totalReported += data.reported;
  totalEstimated += estimatedActual;
}

const hiddenOutput = {
  year: 2024,
  source: 'NCVS Reporting Rates applied to FBI UCR 2024 data',
  crimes: hiddenCrime,
  totals: {
    reported: totalReported,
    estimatedActual: totalEstimated,
    unreported: totalEstimated - totalReported,
    overallReportingRate: Math.round(totalReported / totalEstimated * 1000) / 10,
  },
};

fs.writeFileSync(path.join(dataDir, 'hidden-crime.json'), JSON.stringify(hiddenOutput));
console.log(`  → Hidden crime: ${hiddenOutput.totals.unreported.toLocaleString()} estimated unreported crimes`);

// ========================
// E. Decade Summaries
// ========================
console.log('Computing Decade Summaries...');
const decadeEvents = {
  '1980s': ['Crack cocaine epidemic sweeps cities', 'War on drugs escalates under Reagan', 'Violent crime surges 25%+ in major cities'],
  '1990s': ['Violent crime peaks in 1991 then plummets', 'CompStat revolutionizes policing in NYC', 'Three-strikes laws and tough-on-crime era', 'Crime drops 30%+ — cause still debated'],
  '2000s': ['9/11 reshapes policing priorities', 'Continued decline in violent crime', 'Great Recession hits — property crime ticks up', 'Mass incarceration peaks'],
  '2010s': ['Ferguson effect debate', 'BLM movement reshapes criminal justice conversation', 'Opioid crisis fuels property crime', 'Crime at historic lows by mid-decade'],
  '2020s': ['COVID-19 triggers murder spike (+30% in 2020)', 'Defund the police debate', '2023-2024: Historic crime decline, fastest drop in decades'],
};

const decades = {};
for (const entry of nationalTrends) {
  const decade = `${Math.floor(entry.year / 10) * 10}s`;
  if (!decades[decade]) decades[decade] = [];
  decades[decade].push(entry);
}

const decadeSummaries = [];
for (const [decade, entries] of Object.entries(decades)) {
  if (!decadeEvents[decade]) continue; // skip 1970s partial
  entries.sort((a, b) => a.year - b.year);

  const startRate = entries[0].violentRate;
  const endRate = entries[entries.length - 1].violentRate;
  const peakEntry = entries.reduce((max, e) => e.violentRate > max.violentRate ? e : max, entries[0]);
  const avgRate = Math.round(entries.reduce((s, e) => s + e.violentRate, 0) / entries.length * 10) / 10;
  const totalCrimes = entries.reduce((s, e) => s + e.violentCrime, 0);
  const pctChange = Math.round((endRate - startRate) / startRate * 1000) / 10;

  decadeSummaries.push({
    decade,
    startYear: entries[0].year,
    endYear: entries[entries.length - 1].year,
    startRate: Math.round(startRate * 10) / 10,
    endRate: Math.round(endRate * 10) / 10,
    peakYear: peakEntry.year,
    peakRate: Math.round(peakEntry.violentRate * 10) / 10,
    avgRate,
    totalViolentCrimes: totalCrimes,
    pctChange,
    definingEvents: decadeEvents[decade],
    yearlyData: entries.map(e => ({ year: e.year, violentRate: e.violentRate, propertyRate: e.propertyRate, homicideRate: e.homicideRate })),
  });
}

fs.writeFileSync(path.join(dataDir, 'decades.json'), JSON.stringify(decadeSummaries));
console.log(`  → ${decadeSummaries.length} decade summaries`);

console.log('\nAll analytics computed successfully!');
