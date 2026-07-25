import RelatedAnalysis from '@/components/RelatedAnalysis';
import type { Metadata } from 'next';
import Link from 'next/link';
import { loadData, fmtRate, fmtNum } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Safest States to Live In 2026 — Ranked by Crime Rate | OpenCrime',
  description: 'The 25 safest US states in 2026, ranked by violent crime rate. New England dominates the list with rates 60-70% below the national average. See the full rankings.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/safest-states-2026' },
  openGraph: {
    title: 'Safest States to Live In 2026',
    description: 'The 25 safest US states ranked by violent crime rate using FBI data.',
    url: 'https://www.opencrime.us/analysis/safest-states-2026',
  },
};

type StateSummary = {
  abbr: string; name: string; population: number;
  violentRate: number; propertyRate: number; homicideRate: number;
  violentChange: number; propertyChange: number;
  violentCrime: number; propertyCrime: number; homicide: number;
};

export default function SafestStates2026Page() {
  const states = loadData<StateSummary[]>('state-summary.json');
  const safest = [...states].sort((a, b) => a.violentRate - b.violentRate);
  const sorted = [...states].sort((a, b) => b.violentRate - a.violentRate);

  const totalPop = states.reduce((s, st) => s + st.population, 0);
  const totalViolent = states.reduce((s, st) => s + (st.violentCrime || 0), 0);
  const natRate = totalViolent / totalPop * 100000;

  const top25 = safest.slice(0, 25);

  // States safe on both violent and property
  const byCombo = [...states].sort((a, b) => (a.violentRate + a.propertyRate) - (b.violentRate + b.propertyRate));
  const improving = safest.filter(s => s.violentChange < 0);

  // New England states
  const newEngland = ['CT','ME','MA','NH','RI','VT'];
  const neStates = states.filter(s => newEngland.includes(s.abbr));
  const nePop = neStates.reduce((s, st) => s + st.population, 0);
  const neViolent = neStates.reduce((s, st) => s + (st.violentCrime || 0), 0);
  const neRate = neViolent / nePop * 100000;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Safest States 2026' }]} />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Safest States to Live In 2026: Complete Rankings</h1>
      <p className="text-lg text-gray-600 mb-6">
        Looking for a safe state? We ranked all 50 states by violent crime rate using FBI data.
        The safest states have rates 60-70% below the national average — and they share some
        interesting characteristics.
      </p>

      <AIOverview insights={[
        `Safest state: ${safest[0].name} at just ${fmtRate(safest[0].violentRate)} violent crimes per 100K`,
        `That's ${((1 - safest[0].violentRate / natRate) * 100).toFixed(0)}% below the national rate of ${fmtRate(natRate)} per 100K`,
        `New England's combined violent crime rate is ${fmtRate(neRate)} — well below the national average`,
        `${improving.length} of the 25 safest states saw crime decrease year-over-year`,
        `The gap between the safest and most dangerous state is ${(sorted[0].violentRate / safest[0].violentRate).toFixed(1)}x`,
        `Lowest murder rate: ${[...states].sort((a, b) => a.homicideRate - b.homicideRate)[0].name} at ${fmtRate([...states].sort((a, b) => a.homicideRate - b.homicideRate)[0].homicideRate)} per 100K`,
      ]} />

      <ShareButtons title="Safest States to Live In 2026" />

      {/* Highlight box */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-700">{safest[0].name}</div>
            <div className="text-sm text-gray-600">#1 Safest State</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-700">{fmtRate(safest[0].violentRate)}</div>
            <div className="text-sm text-gray-600">Lowest Rate /100K</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{fmtRate(natRate)}</div>
            <div className="text-sm text-gray-600">National Average</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-700">{((1 - safest[0].violentRate / natRate) * 100).toFixed(0)}%</div>
            <div className="text-sm text-gray-600">Below Average</div>
          </div>
        </div>
      </div>

      {/* Top 25 safest states */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">The 25 Safest States</h2>
      <p className="text-gray-700 mb-4">
        Ranked by violent crime rate per 100,000 residents. Lower is safer.
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">State</th><th className="py-2 text-right">Violent Rate</th><th className="py-2 text-right">Murder Rate</th><th className="py-2 text-right">Property Rate</th><th className="py-2 text-center">vs National</th></tr></thead>
          <tbody>
            {top25.map((s, i) => (
              <tr key={s.abbr} className="border-b hover:bg-gray-50">
                <td className="py-1">{i + 1}</td>
                <td><Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link></td>
                <td className="text-right font-mono font-bold text-green-700">{fmtRate(s.violentRate)}</td>
                <td className="text-right font-mono">{fmtRate(s.homicideRate)}</td>
                <td className="text-right font-mono">{fmtRate(s.propertyRate)}</td>
                <td className="text-center font-mono text-green-600">-{((1 - s.violentRate / natRate) * 100).toFixed(0)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* What makes states safe */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">What Makes a State Safe?</h2>
      <p className="text-gray-700 mb-4">
        The safest states in America share several common characteristics beyond just low crime numbers:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
        <li><strong>Higher median incomes:</strong> Economic stability reduces the desperation that drives crime. Most of the safest states have above-average household incomes.</li>
        <li><strong>Lower poverty rates:</strong> The <Link href="/analysis/crime-and-poverty" className="text-[#1e3a5f] hover:underline">poverty-crime connection</Link> is well-documented. States with less concentrated poverty tend to be safer.</li>
        <li><strong>Education:</strong> States with higher rates of college education consistently rank among the safest.</li>
        <li><strong>Lower population density:</strong> Rural and suburban states tend to have lower crime rates, though this isn&apos;t universal.</li>
        <li><strong>Community cohesion:</strong> Smaller states with strong community bonds and social networks tend to report less crime.</li>
        <li><strong>Climate:</strong> Northern states tend to have lower crime rates, partly because cold weather reduces outdoor activity and associated crime.</li>
      </ul>

      {/* Safest by combined score */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Safest States Overall (Violent + Property Crime)</h2>
      <p className="text-gray-700 mb-4">
        Property crime affects daily quality of life even more than violent crime statistics suggest. Here are
        the states with the lowest combined violent and property crime rates:
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">State</th><th className="py-2 text-right">Violent Rate</th><th className="py-2 text-right">Property Rate</th><th className="py-2 text-right">Combined</th></tr></thead>
          <tbody>
            {byCombo.slice(0, 10).map((s, i) => (
              <tr key={s.abbr} className="border-b">
                <td className="py-1">{i + 1}</td>
                <td><Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link></td>
                <td className="text-right font-mono text-green-700">{fmtRate(s.violentRate)}</td>
                <td className="text-right font-mono">{fmtRate(s.propertyRate)}</td>
                <td className="text-right font-mono font-bold">{fmtRate(s.violentRate + s.propertyRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New England spotlight */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">New England: America&apos;s Safest Region</h2>
      <p className="text-gray-700 mb-4">
        New England states consistently dominate the safest states list. With a combined violent crime rate
        of {fmtRate(neRate)} per 100,000 across {fmtNum(nePop)} residents, the region is significantly safer
        than the national average. Every New England state ranks in the top half of safest states.
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">State</th><th className="py-2 text-right">Violent Rate</th><th className="py-2 text-right">Murder Rate</th><th className="py-2 text-right">YoY Change</th></tr></thead>
          <tbody>
            {neStates.sort((a, b) => a.violentRate - b.violentRate).map(s => (
              <tr key={s.abbr} className="border-b">
                <td><Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link></td>
                <td className="text-right font-mono">{fmtRate(s.violentRate)}</td>
                <td className="text-right font-mono">{fmtRate(s.homicideRate)}</td>
                <td className={`text-right font-mono ${s.violentChange < 0 ? 'text-green-600' : 'text-red-600'}`}>{s.violentChange > 0 ? '+' : ''}{fmtRate(s.violentChange)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Beyond crime rates */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Beyond Crime: Quality of Life Factors</h2>
      <p className="text-gray-700 mb-4">
        When choosing where to live, crime rates are just one piece of the puzzle. The safest states also
        tend to score well on other quality-of-life measures:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
        <li><strong>Healthcare access:</strong> Many of the safest states have above-average healthcare systems and insurance coverage rates.</li>
        <li><strong>Education quality:</strong> Top-performing school systems correlate with safer communities.</li>
        <li><strong>Employment:</strong> Low unemployment rates and diverse economies provide stability.</li>
        <li><strong>Natural environment:</strong> Many safest states offer abundant outdoor recreation, which contributes to community wellbeing.</li>
        <li><strong>Cost of living trade-offs:</strong> Some of the safest states (like New Hampshire) have relatively high costs of living, while others (like Idaho) remain affordable.</li>
      </ul>

      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Important Caveats</h2>
      <p className="text-gray-700 mb-4">
        State-level crime data can be misleading. Even the safest states have dangerous neighborhoods, and
        the most dangerous states have perfectly safe communities. For more specific data, explore our{' '}
        <Link href="/cities" className="text-[#1e3a5f] hover:underline">city-level crime database</Link> or use
        our <Link href="/is-it-safe" className="text-[#1e3a5f] hover:underline">&quot;Is It Safe?&quot; tool</Link> to
        check specific locations.
      </p>

      <div className="bg-gray-50 rounded-xl p-6 mt-10">
        <h3 className="font-heading text-lg font-bold mb-3">Related</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <Link href="/analysis/crime-rates-by-state-2026" className="text-[#1e3a5f] hover:underline">Crime Rates by State 2026 →</Link>
          <Link href="/analysis/crime-statistics-by-state" className="text-[#1e3a5f] hover:underline">Crime Statistics by State →</Link>
          <Link href="/analysis/safest-cities-america" className="text-[#1e3a5f] hover:underline">Safest Cities in America →</Link>
          <Link href="/analysis/safest-places-to-live" className="text-[#1e3a5f] hover:underline">Safest Places to Live →</Link>
          <Link href="/safest-cities" className="text-[#1e3a5f] hover:underline">Safest Cities Rankings →</Link>
          <Link href="/states" className="text-[#1e3a5f] hover:underline">Browse All States →</Link>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Safest States to Live In 2026',
        description: 'The 25 safest US states ranked by violent crime rate using FBI data.',
        url: 'https://www.opencrime.us/analysis/safest-states-2026',
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the safest state in America 2026?', acceptedAnswer: { '@type': 'Answer', text: `${safest[0].name} has the lowest violent crime rate at ${fmtRate(safest[0].violentRate)} per 100,000 residents — ${((1 - safest[0].violentRate / natRate) * 100).toFixed(0)}% below the national average.` }},
          { '@type': 'Question', name: 'Which region of the US is safest?', acceptedAnswer: { '@type': 'Answer', text: `New England is the safest region with a combined violent crime rate of ${fmtRate(neRate)} per 100,000 — well below the national average.` }},
          { '@type': 'Question', name: 'Are safe states also affordable?', acceptedAnswer: { '@type': 'Answer', text: 'Some of the safest states like Idaho, Maine, and Vermont have moderate costs of living, while others like New Hampshire and Connecticut are more expensive. Safety and affordability don\'t always go hand in hand.' }},
        ],
      })}} />

      <RelatedAnalysis currentSlug="safest-states-2026" />
    </div>
  );
}
