import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { NationalTrend, CityIndex } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

type RaceRow = { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number; pacificIslander: number };
type EthRow = { offense: string; totalEthnicity: number; hispanic: number; notHispanic: number; hispanicPct: number; notHispanicPct: number };

export const metadata: Metadata = {
  title: 'Violent Crime Statistics 2024 — US Rates, Trends & City Rankings',
  description: 'US violent crime statistics 2024: murder, assault, robbery, rape rates. 45 years of FBI data. City rankings, state comparisons, historical trends.',
  openGraph: { url: 'https://www.opencrime.us/violent-crime' },
  alternates: { canonical: 'https://www.opencrime.us/violent-crime' },
};

export default function ViolentCrimePage() {
  const national = loadData<NationalTrend[]>('national-trends.json');
  const cities = loadData<CityIndex[]>('city-index.json');
  const n = national[national.length - 1];
  const large = cities.filter(c => c.population >= 100000);
  const topViolent = [...large].sort((a, b) => b.violentRate - a.violentRate).slice(0, 20);
  const safest = [...large].sort((a, b) => a.violentRate - b.violentRate).slice(0, 10);
  const peak = national.reduce((max, y) => y.violentRate > max.violentRate ? y : max, national[0]);

  const arrestData = loadData<{ byRace: RaceRow[]; byEthnicity: EthRow[] }>('arrest-data.json');
  const vcRace = arrestData.byRace.find(r => r.offense === 'Violent crime');
  const vcEth = arrestData.byEthnicity.find(e => /Violent crime/i.test(e.offense));
  const murderRace = arrestData.byRace.find(r => /Murder/i.test(r.offense));
  const robberyRace = arrestData.byRace.find(r => r.offense === 'Robbery');
  const assaultRace = arrestData.byRace.find(r => r.offense === 'Aggravated assault');

  const rapeRate = n.rape / n.population * 100000;
  const robberyRate = n.robbery / n.population * 100000;
  const assaultRate = n.aggravatedAssault / n.population * 100000;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Violent Crime Statistics 2024' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Violent Crime Statistics 2024</h1>
      <p className="text-lg text-gray-600 mb-8">
        Comprehensive overview of violent crime in the United States using the latest FBI data.
      </p>

      <div className="bg-red-900 text-white rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div>
            <div className="text-2xl md:text-3xl font-bold">{fmtNum(n.violentCrime)}</div>
            <div className="text-red-200 text-sm">Violent Crimes</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold">{fmtRate(n.violentRate)}</div>
            <div className="text-red-200 text-sm">Rate per 100K</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold">{fmtNum(n.homicide)}</div>
            <div className="text-red-200 text-sm">Murders</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold">{fmtNum(n.aggravatedAssault)}</div>
            <div className="text-red-200 text-sm">Assaults</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-green-400">-{((1 - n.violentRate / peak.violentRate) * 100).toFixed(0)}%</div>
            <div className="text-red-200 text-sm">Since {peak.year} Peak</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">2024 Violent Crime Breakdown</h2>
        <p>
          The FBI classifies four offenses as violent crime: murder/non-negligent manslaughter, 
          rape, robbery, and aggravated assault. In 2024, there were {fmtNum(n.violentCrime)} violent 
          crimes — a rate of {fmtRate(n.violentRate)} per 100,000 residents.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Murder', count: n.homicide, rate: n.homicideRate, href: '/murder-rate', color: 'bg-red-800' },
          { label: 'Agg. Assault', count: n.aggravatedAssault, rate: assaultRate, href: '/assault-statistics', color: 'bg-red-700' },
          { label: 'Robbery', count: n.robbery, rate: robberyRate, href: '/robbery-statistics', color: 'bg-red-600' },
          { label: 'Rape', count: n.rape, rate: rapeRate, href: '/crime-rate', color: 'bg-red-500' },
        ].map(c => (
          <Link key={c.label} href={c.href} className={`${c.color} text-white rounded-xl p-4 text-center hover:opacity-90 transition`}>
            <div className="text-2xl font-bold">{fmtNum(c.count)}</div>
            <div className="text-sm opacity-80">{c.label}</div>
            <div className="text-xs opacity-60 mt-1">{fmtRate(c.rate)} / 100K</div>
          </Link>
        ))}
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">The Great Crime Decline</h2>
        <p>
          Violent crime peaked at a rate of {fmtRate(peak.violentRate)} per 100,000 in {peak.year} and 
          has since fallen by {((1 - n.violentRate / peak.violentRate) * 100).toFixed(0)}%. This decline — 
          sometimes called the &quot;Great American Crime Decline&quot; — is one of the most significant 
          social trends of the past three decades, yet its causes are still debated.
        </p>
        <p>Proposed explanations include:</p>
        <ul>
          <li><strong>Lead removal</strong> — Phasing out leaded gasoline (1970s-1990s) reduced childhood lead exposure, which is linked to impulsivity and aggression</li>
          <li><strong>Mass incarceration</strong> — The prison population quintupled from 1980-2010, though this likely explains only 10-25% of the decline</li>
          <li><strong>Policing innovations</strong> — CompStat, hot-spot policing, and data-driven strategies</li>
          <li><strong>Demographic shifts</strong> — An aging population with fewer people in the peak crime-committing years (16-24)</li>
          <li><strong>Technology</strong> — Better surveillance, alarm systems, and communication</li>
          <li><strong>Economic factors</strong> — Lower unemployment and rising incomes in the late 1990s and 2010s</li>
        </ul>
      </div>

      {/* Violent Crime Arrest Demographics */}
      {vcRace && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="font-heading text-xl font-bold mb-4">Violent Crime Arrests by Race &amp; Ethnicity</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2">Race</th>
                  <th className="text-right px-3 py-2">Violent Crime</th>
                  <th className="text-right px-3 py-2">%</th>
                  <th className="text-right px-3 py-2">Murder</th>
                  <th className="text-right px-3 py-2">Robbery</th>
                  <th className="text-right px-3 py-2">Agg. Assault</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'White', k: 'white' as const },
                  { label: 'Black', k: 'black' as const },
                  { label: 'Native American', k: 'nativeAmerican' as const },
                  { label: 'Asian', k: 'asian' as const },
                  { label: 'Pacific Islander', k: 'pacificIslander' as const },
                ].map(row => (
                  <tr key={row.label} className="border-t">
                    <td className="px-3 py-2">{row.label}</td>
                    <td className="px-3 py-2 text-right font-mono">{fmtNum(vcRace[row.k])}</td>
                    <td className="px-3 py-2 text-right font-mono">{(vcRace[row.k] / vcRace.total * 100).toFixed(1)}%</td>
                    <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(murderRace?.[row.k] ?? 0)}</td>
                    <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(robberyRace?.[row.k] ?? 0)}</td>
                    <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(assaultRace?.[row.k] ?? 0)}</td>
                  </tr>
                ))}
                <tr className="border-t font-semibold bg-gray-50">
                  <td className="px-3 py-2">Total</td>
                  <td className="px-3 py-2 text-right font-mono">{fmtNum(vcRace.total)}</td>
                  <td className="px-3 py-2 text-right font-mono">100%</td>
                  <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(murderRace?.total ?? 0)}</td>
                  <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(robberyRace?.total ?? 0)}</td>
                  <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(assaultRace?.total ?? 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {vcEth && (
            <div className="mt-4 flex gap-4">
              <div className="bg-red-50 rounded-lg p-3 flex-1 text-center">
                <div className="text-xl font-bold text-red-700">{vcEth.hispanicPct}%</div>
                <div className="text-xs text-gray-600">Hispanic/Latino</div>
              </div>
              <div className="bg-red-50 rounded-lg p-3 flex-1 text-center">
                <div className="text-xl font-bold text-red-700">{vcEth.notHispanicPct}%</div>
                <div className="text-xs text-gray-600">Not Hispanic/Latino</div>
              </div>
            </div>
          )}
          <p className="text-sm text-gray-500 mt-4">
            Arrest data reflects policing patterns, not the true distribution of criminal behavior. Poverty,
            policing intensity, and systemic factors affect arrest rates across racial groups.
            See <Link href="/arrest-demographics" className="text-[#1e3a5f] hover:underline">full arrest demographics</Link> |{' '}
            <Link href="/analysis/racial-disparities" className="text-[#1e3a5f] hover:underline">racial disparities analysis</Link> |{' '}
            <Link href="/analysis/who-commits-crime" className="text-[#1e3a5f] hover:underline">who commits crime</Link>
          </p>
        </div>
      )}

      <h2 className="font-heading text-2xl font-bold mb-4">Most Dangerous Cities (100K+)</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead className="bg-red-50">
            <tr>
              <th className="text-left px-3 py-2">#</th>
              <th className="text-left px-3 py-2">City</th>
              <th className="text-right px-3 py-2">Violent Rate</th>
              <th className="text-right px-3 py-2">Murder Rate</th>
              <th className="text-right px-3 py-2">Population</th>
            </tr>
          </thead>
          <tbody>
            {topViolent.map((c, i) => (
              <tr key={c.slug} className="border-t hover:bg-red-50/50">
                <td className="px-3 py-2 text-red-700 font-bold">{i + 1}</td>
                <td className="px-3 py-2">
                  <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline font-medium">{c.city}</Link>
                  <span className="text-gray-400 text-xs ml-1">{c.state}</span>
                </td>
                <td className="px-3 py-2 text-right font-mono text-red-600 font-semibold">{fmtRate(c.violentRate)}</td>
                <td className="px-3 py-2 text-right font-mono">{fmtRate(c.murderRate)}</td>
                <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-heading text-2xl font-bold mb-4">Safest Large Cities (100K+)</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead className="bg-green-50">
            <tr>
              <th className="text-left px-3 py-2">#</th>
              <th className="text-left px-3 py-2">City</th>
              <th className="text-right px-3 py-2">Violent Rate</th>
              <th className="text-right px-3 py-2">Population</th>
            </tr>
          </thead>
          <tbody>
            {safest.map((c, i) => (
              <tr key={c.slug} className="border-t hover:bg-green-50/50">
                <td className="px-3 py-2 text-green-700 font-bold">{i + 1}</td>
                <td className="px-3 py-2">
                  <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline font-medium">{c.city}</Link>
                  <span className="text-gray-400 text-xs ml-1">{c.state}</span>
                </td>
                <td className="px-3 py-2 text-right font-mono text-green-600 font-semibold">{fmtRate(c.violentRate)}</td>
                <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <h3 className="font-heading text-lg font-bold mb-2">Explore More</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <Link href="/murder-rate" className="text-[#1e3a5f] hover:underline">Murder Rate Analysis →</Link>
          <Link href="/assault-statistics" className="text-[#1e3a5f] hover:underline">Assault Statistics →</Link>
          <Link href="/robbery-statistics" className="text-[#1e3a5f] hover:underline">Robbery Statistics →</Link>
          <Link href="/analysis/crime-decline" className="text-[#1e3a5f] hover:underline">Why Crime Declined →</Link>
          <Link href="/analysis/gun-violence" className="text-[#1e3a5f] hover:underline">Gun Violence Data →</Link>
          <Link href="/analysis/domestic-violence" className="text-[#1e3a5f] hover:underline">Domestic Violence →</Link>
        </div>
      </div>

      <div className="mt-8"><ShareButtons title="Violent Crime Statistics 2024" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the violent crime rate in the US?', acceptedAnswer: { '@type': 'Answer', text: `The US violent crime rate in 2024 was ${n.violentRate.toFixed(1)} per 100,000 — a ${((1 - n.violentRate / peak.violentRate) * 100).toFixed(0)}% decline from the ${peak.year} peak.` }},
          { '@type': 'Question', name: 'What are the 4 types of violent crime?', acceptedAnswer: { '@type': 'Answer', text: 'The FBI classifies four offenses as violent crime: murder/non-negligent manslaughter, rape, robbery, and aggravated assault.' }},
          { '@type': 'Question', name: 'Is violent crime increasing or decreasing?', acceptedAnswer: { '@type': 'Answer', text: 'Violent crime has been on a long-term decline since the early 1990s. There was a temporary increase during 2020-2021 (COVID pandemic), but rates have since resumed their downward trend.' }},
        ]
      })}} />

      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer, 2024.</p>
    </div>
  );
}
