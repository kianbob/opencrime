import fs from 'fs';
import path from 'path';

export function loadData<T>(filename: string): T {
  const filePath = path.join(process.cwd(), 'public', 'data', filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').substring(0, 80);
}

export function fmtNum(n: number | null | undefined): string {
  if (n == null) return '—';
  return n.toLocaleString('en-US');
}

export function fmtRate(n: number | null | undefined): string {
  if (n == null) return '—';
  return n.toFixed(1);
}

export function fmtPct(n: number | null | undefined): string {
  if (n == null) return '—';
  const sign = n > 0 ? '+' : '';
  return `${sign}${n.toFixed(1)}%`;
}

export function stateAbbr(name: string): string {
  const map: Record<string, string> = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
    'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'District Of Columbia': 'DC',
    'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL',
    'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA',
    'Maine': 'ME', 'Maryland': 'MD', 'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN',
    'Mississippi': 'MS', 'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV',
    'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
    'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR',
    'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC', 'South Dakota': 'SD',
    'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT', 'Virginia': 'VA',
    'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
    'Puerto Rico': 'PR', 'Guam': 'GU'
  };
  return map[name] || name.substring(0, 2).toUpperCase();
}

export type StateSummary = {
  abbr: string; name: string; population: number;
  violentCrime: number; violentRate: number;
  homicide: number; homicideRate: number;
  propertyCrime: number; propertyRate: number;
  year: number; violentChange: number | null; propertyChange: number | null;
};

export type CityIndex = {
  slug: string; city: string; state: string; population: number;
  violentCrime: number; violentRate: number;
  murder: number; murderRate: number;
  propertyCrime: number; propertyRate: number;
  year: number; yearsAvailable: number[];
  violentChange: number | null;
  safetyPercentile: number;
  trajectory: string;
  violentToPropertyRatio: number | null;
  composition?: { murderPct: number; rapePct: number; robberyPct: number; assaultPct: number };
  similarCities?: { slug: string; city: string; state: string }[];
};

export type Analytics = {
  crimeClock: Record<string, number>;
  concentration: {
    top10: { murders: number; murderPct: number; popPct: number; cities: { city: string; state: string; murders: number }[] };
    top50: { murders: number; murderPct: number; popPct: number };
    totalCityMurders: number;
  };
  popCrimeBins: { label: string; count: number; avgViolentRate: number; avgMurderRate: number; avgPropertyRate: number; medianViolentRate?: number }[];
  trajectoryCount: Record<string, number>;
};

export type NationalTrend = {
  year: number; population: number;
  violentCrime: number; violentRate: number;
  homicide: number; homicideRate: number;
  rape: number; robbery: number; aggravatedAssault: number;
  propertyCrime: number; propertyRate: number;
  burglary: number; larceny: number; motorVehicleTheft: number;
};

export type CityDetail = {
  slug: string; city: string; state: string;
  years: Record<string, {
    population: number; violentCrime: number; violentRate: number;
    murder: number; murderRate: number; rape: number; robbery: number;
    aggravatedAssault: number; propertyCrime: number; propertyRate: number;
    burglary: number; larceny: number; motorVehicleTheft: number; arson: number;
  }>;
};
