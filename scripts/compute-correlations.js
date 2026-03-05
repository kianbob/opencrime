#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const states = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'data', 'state-summary.json'), 'utf8'));

const poverty = {MS:19.4,LA:18.6,NM:18.2,WV:17.8,AR:16.3,KY:16.1,AL:15.5,OK:15.3,SC:14.8,TN:13.9,GA:13.5,NC:13.4,TX:13.4,AZ:13.1,NY:12.7,MI:12.6,OH:12.5,MO:12.1,IN:11.9,FL:11.6,PA:11.5,OR:11.2,CA:11.0,IL:10.8,NV:10.6,RI:10.3,WA:10.0,ID:9.9,ME:9.8,MT:9.7,SD:9.6,NE:9.5,IA:9.4,KS:9.3,WI:9.2,DE:9.1,CO:8.9,VT:8.8,AK:8.7,CT:8.5,WY:8.3,VA:8.2,HI:8.1,MN:8.0,ND:7.9,MA:7.8,MD:7.4,NJ:7.2,UT:7.1,NH:5.3,DC:15.0};
const guns = {AK:64,AR:58,ID:60,WV:59,WY:66,MT:66,SD:56,ND:55,AL:55,MS:55,OK:54,LA:53,TN:52,KY:51,KS:50,MO:48,SC:49,IN:45,TX:46,GA:43,NC:43,OH:40,PA:40,NE:40,IA:39,WI:45,MI:42,MN:37,OR:40,AZ:42,CO:38,VA:36,NV:37,FL:32,WA:33,ME:47,VT:50,NH:41,NM:46,UT:46,DE:25,MD:22,IL:28,RI:14,CT:17,NY:19,NJ:15,MA:14,HI:14,CA:20,DC:9};
const income = {MD:98,NJ:97,MA:96,HI:92,CT:91,NH:90,WA:90,CA:88,CO:87,VA:87,MN:84,UT:84,AK:83,IL:79,NY:78,RI:76,DE:75,OR:75,VT:74,WI:73,NE:73,PA:73,ND:72,AZ:72,TX:72,IA:72,MI:68,OH:67,GA:67,NV:67,IN:67,SD:66,MO:65,FL:65,NC:65,MT:64,ID:64,ME:64,TN:63,KS:63,WY:63,KY:61,SC:61,OK:60,AL:59,NM:58,LA:57,AR:56,WV:53,MS:52,DC:101};

function pearson(pairs) {
  const n = pairs.length;
  if (n < 3) return { r: 0, rSquared: 0 };
  const mx = pairs.reduce((s, p) => s + p.x, 0) / n;
  const my = pairs.reduce((s, p) => s + p.y, 0) / n;
  let num = 0, dx2 = 0, dy2 = 0;
  for (const p of pairs) {
    const dx = p.x - mx, dy = p.y - my;
    num += dx * dy; dx2 += dx * dx; dy2 += dy * dy;
  }
  const den = Math.sqrt(dx2 * dy2);
  const r = den === 0 ? 0 : num / den;
  return { r: Math.round(r * 1000) / 1000, rSquared: Math.round(r * r * 1000) / 1000 };
}

function makeCorrelation(xLabel, yLabel, xFn, yFn) {
  const points = [];
  for (const s of states) {
    const x = xFn(s);
    const y = yFn(s);
    if (x != null && y != null) points.push({ state: s.abbr, x, y });
  }
  const { r, rSquared } = pearson(points);
  let interpretation;
  const ar = Math.abs(r);
  if (ar > 0.7) interpretation = 'Strong correlation';
  else if (ar > 0.4) interpretation = 'Moderate correlation';
  else if (ar > 0.2) interpretation = 'Weak correlation';
  else interpretation = 'Very weak / no correlation';
  interpretation += r > 0 ? ' (positive)' : ' (negative)';
  return { xLabel, yLabel, r, rSquared, interpretation, points };
}

const correlations = [
  makeCorrelation('Poverty Rate (%)', 'Violent Crime Rate', s => poverty[s.abbr], s => s.violentRate),
  makeCorrelation('Gun Ownership (%)', 'Violent Crime Rate', s => guns[s.abbr], s => s.violentRate),
  makeCorrelation('Median Income ($K)', 'Violent Crime Rate', s => income[s.abbr], s => s.violentRate),
  makeCorrelation('Poverty Rate (%)', 'Property Crime Rate', s => poverty[s.abbr], s => s.propertyRate),
  makeCorrelation('Gun Ownership (%)', 'Murder Rate', s => guns[s.abbr], s => s.homicideRate),
  makeCorrelation('Poverty Rate (%)', 'Murder Rate', s => poverty[s.abbr], s => s.homicideRate),
];

const output = {
  generated: new Date().toISOString(),
  note: 'Correlations between state-level crime rates and socioeconomic factors. Correlation does not imply causation.',
  correlations,
};

fs.writeFileSync(path.join(__dirname, '..', 'public', 'data', 'correlations.json'), JSON.stringify(output, null, 2));
console.log('Generated correlations.json with', correlations.length, 'correlations');
correlations.forEach(c => console.log(`  ${c.xLabel} vs ${c.yLabel}: r=${c.r}, r²=${c.rSquared} — ${c.interpretation}`));
