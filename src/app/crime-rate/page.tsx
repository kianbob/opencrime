import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { NationalTrend, StateSummary } from '@/lib/utils';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';

type RaceRow = { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number; pacificIslander: number };
type EthRow = { offense: string; totalEthnicity: number; hispanic: number; notHispanic: number; hispanicPct: number; notHispanicPct: number };

export const metadata: Metadata = {
  title: 'US Crime Rate 2024 — National Statistics, Trends & Data',
  description: 'The US crime rate in 2024: 359.1 violent crimes per 100K people, down 5.4% from 2023. 45 years of FBI crime statistics, state comparisons, and historical trends.',
  openGraph: { url: 'https://www.opencrime.us/crime-rate' },
  alternates: { canonical: 'https://www.opencrime.us/crime-rate' },
};

export default function CrimeRatePage() {
  const national = loadData<NationalTrend[]>('national-trends.json');
  const states = loadData<StateSummary[]>('state-summary.json');
  const n = national[national.length - 1];
  const prev = national[national.length - 2];
  const peak = national.find(y => y.year === 1991);
  const low = national.reduce((min, y) => y.violentRate > 0 && y.violentRate < (min.violentRate || Infinity) ? y : min, national[0]);
  const arrestData = loadData<{ byRace: RaceRow[]; byEthnicity: EthRow[] }>('arrest-data.json');
  const raceTotal = arrestData.byRace.find(r => r.offense === 'TOTAL');
  const ethTotal = arrestData.byEthnicity.find(e => e.offense === 'TOTAL');
  const raceRows = raceTotal ? [
    { label: 'White', value: raceTotal.white },
    { label: 'Black or African American', value: raceTotal.black },
    { label: 'American Indian/Alaska Native', value: raceTotal.nativeAmerican },
    { label: 'Asian', value: raceTotal.asian },
    { label: 'Native Hawaiian/Pacific Islander', value: raceTotal.pacificIslander },
  ] : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'US Crime Rate 2024' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">US Crime Rate 2024</h1>

      <div className="bg-[#1e3a5f] text-white rounded-xl p-8 mb-8">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold">{fmtRate(n.violentRate)}</div>
            <div className="text-blue-200 text-sm">Violent Crime Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold">{fmtRate(n.homicideRate)}</div>
            <div className="text-blue-200 text-sm">Murder Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-400">-5.4%</div>
            <div className="text-blue-200 text-sm">vs 2023</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-400">-52.6%</div>
            <div className="text-blue-200 text-sm">Since 1991 Peak</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">National Crime Statistics at a Glance</h2>
        <p>
          In 2024, the United States recorded {fmtNum(n.violentCrime)} violent crimes — a rate of {fmtRate(n.violentRate)} per 
          100,000 residents. This represents a <strong>5.4% decline</strong> from 2023 and continues the long-term 
          downward trend in American crime.
        </p>
        <p>
          The murder rate fell to {fmtRate(n.homicideRate)} per 100,000 — a <strong>15.7% drop</strong> from the previous year 
          and the lowest rate in over a decade. The US population was {fmtNum(n.population)}.
        </p>

        <h2 className="font-heading">2024 Crime Breakdown</h2>
        <table>
          <thead><tr><th>Crime Type</th><th>Total</th><th>Rate per 100K</th></tr></thead>
          <tbody>
            <tr><td><strong>Violent Crime (Total)</strong></td><td>{fmtNum(n.violentCrime)}</td><td>{fmtRate(n.violentRate)}</td></tr>
            <tr><td>Murder</td><td>{fmtNum(n.homicide)}</td><td>{fmtRate(n.homicideRate)}</td></tr>
            <tr><td>Rape</td><td>{fmtNum(n.rape)}</td><td>{fmtRate(n.rape / n.population * 100000)}</td></tr>
            <tr><td>Robbery</td><td>{fmtNum(n.robbery)}</td><td>{fmtRate(n.robbery / n.population * 100000)}</td></tr>
            <tr><td>Aggravated Assault</td><td>{fmtNum(n.aggravatedAssault)}</td><td>{fmtRate(n.aggravatedAssault / n.population * 100000)}</td></tr>
            <tr><td><strong>Property Crime (Total)</strong></td><td>{fmtNum(n.propertyCrime)}</td><td>{fmtRate(n.propertyRate)}</td></tr>
            <tr><td>Burglary</td><td>{fmtNum(n.burglary)}</td><td>{fmtRate(n.burglary / n.population * 100000)}</td></tr>
            <tr><td>Larceny-Theft</td><td>{fmtNum(n.larceny)}</td><td>{fmtRate(n.larceny / n.population * 100000)}</td></tr>
            <tr><td>Motor Vehicle Theft</td><td>{fmtNum(n.motorVehicleTheft)}</td><td>{fmtRate(n.motorVehicleTheft / n.population * 100000)}</td></tr>
          </tbody>
        </table>

        <h2 className="font-heading">Historical Context</h2>
        <p>
          US violent crime peaked in 1991 at {fmtRate(peak?.violentRate ?? 0)} per 100,000, with a murder rate of {fmtRate(peak?.homicideRate ?? 0)}. 
          Since then, violent crime has fallen by more than half. The 2024 rate of {fmtRate(n.violentRate)} is roughly 
          comparable to rates last seen in the late 1960s.
        </p>
        <p>
          There was a notable spike in 2020-2021, widely attributed to pandemic-related disruptions, 
          but rates have since fallen below pre-pandemic levels and continue to decline.
        </p>

        <h2 className="font-heading">Who Gets Arrested? Demographics by Race</h2>
        <p>
          The FBI tracks the race and ethnicity of individuals arrested nationwide. These figures reflect
          arrest patterns — not conviction rates or the true distribution of criminal behavior. Policing
          intensity, socioeconomic factors, and systemic inequities all influence who gets arrested.
        </p>
      </div>

      {raceTotal && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Race</th>
                <th className="text-right px-4 py-2">Arrests</th>
                <th className="text-right px-4 py-2">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {raceRows.map(row => (
                <tr key={row.label} className="border-t">
                  <td className="px-4 py-2">{row.label}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtNum(row.value)}</td>
                  <td className="px-4 py-2 text-right font-mono">{(row.value / raceTotal.total * 100).toFixed(1)}%</td>
                </tr>
              ))}
              <tr className="border-t font-semibold bg-gray-50">
                <td className="px-4 py-2">Total</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(raceTotal.total)}</td>
                <td className="px-4 py-2 text-right font-mono">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {ethTotal && (
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#1e3a5f] text-white rounded-xl p-5 text-center">
            <div className="text-3xl font-bold">{ethTotal.hispanicPct}%</div>
            <div className="text-blue-200 text-sm">Hispanic or Latino</div>
            <div className="text-blue-300 text-xs mt-1">{fmtNum(ethTotal.hispanic)} arrests</div>
          </div>
          <div className="bg-[#1e3a5f] text-white rounded-xl p-5 text-center">
            <div className="text-3xl font-bold">{ethTotal.notHispanicPct}%</div>
            <div className="text-blue-200 text-sm">Not Hispanic or Latino</div>
            <div className="text-blue-300 text-xs mt-1">{fmtNum(ethTotal.notHispanic)} arrests</div>
          </div>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
        <strong>Important context:</strong> Arrest data reflects policing patterns, not just criminal behavior.
        Factors including concentrated poverty, policing intensity in certain neighborhoods, and systemic inequities
        affect who gets arrested. For a deeper analysis, see our <Link href="/analysis/racial-disparities" className="underline">racial disparities</Link> and{' '}
        <Link href="/analysis/crime-by-race" className="underline">crime by race</Link> articles.
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">Crime Rate by State</h2>
        <p>Crime rates vary enormously by state. The top 5 states by violent crime rate in 2024:</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Rank</th>
              <th className="text-left px-4 py-2">State</th>
              <th className="text-right px-4 py-2">Violent Rate</th>
              <th className="text-right px-4 py-2">Murder Rate</th>
            </tr>
          </thead>
          <tbody>
            {states.slice(0, 10).map((s, i) => (
              <tr key={s.abbr} className="border-t">
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2"><Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link></td>
                <td className="px-4 py-2 text-right font-mono text-red-600">{fmtRate(s.violentRate)}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtRate(s.homicideRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link href="/states" className="block text-center text-sm text-[#1e3a5f] py-3 border-t hover:bg-gray-50">All 50 States →</Link>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">Explore More</h2>
        <ul>
          <li><Link href="/dashboard">Interactive Crime Dashboard</Link> — 45 years of trends with charts</li>
          <li><Link href="/safest-cities">Safest Cities in America</Link> — Complete safety rankings</li>
          <li><Link href="/most-dangerous-cities">Most Dangerous Cities</Link> — Highest crime rate cities</li>
          <li><Link href="/tools/compare">Compare Cities</Link> — Side-by-side comparison tool</li>
          <li><Link href="/tools/safety-score">City Safety Score</Link> — Get a safety grade for any city</li>
        </ul>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the US crime rate in 2024?', acceptedAnswer: { '@type': 'Answer', text: `The US violent crime rate in 2024 is ${n.violentRate.toFixed(1)} per 100,000 residents, based on ${n.violentCrime.toLocaleString()} reported violent crimes.` }},
          { '@type': 'Question', name: 'Is crime going up or down in America?', acceptedAnswer: { '@type': 'Answer', text: 'Crime is going down. Violent crime dropped 5.4% from 2023 to 2024 and is down 52.6% from the 1991 peak. The US is safer now than at any point since the 1960s.' }},
          { '@type': 'Question', name: 'What is the US murder rate?', acceptedAnswer: { '@type': 'Answer', text: `The US murder rate in 2024 is ${n.homicideRate.toFixed(2)} per 100,000, with ${n.homicide.toLocaleString()} total murders. This is a 15.7% decline from 2023.` }},
        ]
      })}} />

      <p className="text-sm text-gray-500 mt-8">
        Source: FBI Crime Data Explorer, SRS Estimated Crimes. Last updated August 2025.
      </p>
    </div>
  );
}
