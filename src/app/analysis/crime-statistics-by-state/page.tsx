import RelatedAnalysis from '@/components/RelatedAnalysis';
import type { Metadata } from 'next';
import Link from 'next/link';
import { loadData, fmtRate, fmtNum } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Crime Statistics by State 2026 — Rankings, Rates & FBI Data | OpenCrime',
  description: 'Compare crime rates across all 50 states with the latest FBI data. See which states have the highest violent crime, lowest murder rates, and biggest year-over-year changes.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/crime-statistics-by-state' },
  openGraph: {
    title: 'Crime Statistics by State 2026 — Complete Rankings',
    description: 'All 50 states ranked by violent crime, murder, and property crime rates using FBI data.',
    url: 'https://www.opencrime.us/analysis/crime-statistics-by-state',
  },
};

type StateSummary = {
  abbr: string; name: string; population: number;
  violentRate: number; propertyRate: number; homicideRate: number;
  violentChange: number; propertyChange: number;
  violentCrime: number; propertyCrime: number; homicide: number;
};

export default function CrimeStatsByStatePage() {
  const states = loadData<StateSummary[]>('state-summary.json');
  const sorted = [...states].sort((a, b) => b.violentRate - a.violentRate);
  const safest = [...states].sort((a, b) => a.violentRate - b.violentRate);
  const byMurder = [...states].sort((a, b) => b.homicideRate - a.homicideRate);
  const byProperty = [...states].sort((a, b) => b.propertyRate - a.propertyRate);
  const improving = [...states].filter(s => s.violentChange < 0).sort((a, b) => a.violentChange - b.violentChange);
  const worsening = [...states].filter(s => s.violentChange > 0).sort((a, b) => b.violentChange - a.violentChange);

  const totalPop = states.reduce((s, st) => s + st.population, 0);
  const totalViolent = states.reduce((s, st) => s + (st.violentCrime || 0), 0);
  const totalMurder = states.reduce((s, st) => s + (st.homicide || 0), 0);
  const natViolentRate = totalViolent / totalPop * 100000;
  const natMurderRate = totalMurder / totalPop * 100000;

  const medianViolent = sorted[Math.floor(sorted.length / 2)].violentRate;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Crime Statistics by State' }]} />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Crime Statistics by State 2026: Complete Rankings & Analysis</h1>
      <p className="text-lg text-gray-600 mb-6">
        How does your state compare? We ranked all 50 states (plus DC) using the latest FBI Uniform Crime
        Reporting data — covering violent crime, murder, and property crime rates per 100,000 residents.
      </p>

      <AIOverview insights={[
        `National violent crime rate: ${fmtRate(natViolentRate)} per 100,000 residents`,
        `National murder rate: ${fmtRate(natMurderRate)} per 100,000 residents`,
        `Most dangerous state: ${sorted[0].name} at ${fmtRate(sorted[0].violentRate)} violent crimes per 100K`,
        `Safest state: ${safest[0].name} at ${fmtRate(safest[0].violentRate)} violent crimes per 100K`,
        `${improving.length} states saw violent crime decrease year-over-year`,
        `The gap between the most and least dangerous state is ${fmtRate(sorted[0].violentRate - safest[0].violentRate)} per 100K — a ${(sorted[0].violentRate / safest[0].violentRate).toFixed(1)}x difference`,
      ]} />

      <ShareButtons title="Crime Statistics by State 2026" />

      {/* National overview */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">National Overview</h2>
      <p className="text-gray-700 mb-4">
        The United States recorded approximately {fmtNum(totalViolent)} violent crimes and {fmtNum(totalMurder)} murders
        across a population of {fmtNum(totalPop)}. But these national numbers mask enormous variation from state to
        state. The most dangerous state has a violent crime rate {(sorted[0].violentRate / safest[0].violentRate).toFixed(1)}x
        higher than the safest — meaning where you live matters far more than national averages suggest.
      </p>
      <p className="text-gray-700 mb-4">
        The median state violent crime rate is {fmtRate(medianViolent)} per 100,000 — meaning half of all states
        fall above this line and half below. If your state is significantly above the median, it&apos;s worth
        understanding why.
      </p>

      {/* Top 10 most violent */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Top 10 Most Violent States</h2>
      <p className="text-gray-700 mb-4">
        These states have the highest rates of violent crime (murder, rape, robbery, and aggravated assault combined)
        per 100,000 residents:
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">State</th><th className="py-2 text-right">Violent Rate</th><th className="py-2 text-right">Murder Rate</th><th className="py-2 text-right">YoY Change</th></tr></thead>
          <tbody>
            {sorted.slice(0, 10).map((s, i) => (
              <tr key={s.abbr} className="border-b">
                <td className="py-1">{i + 1}</td>
                <td><Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link></td>
                <td className="text-right font-mono">{fmtRate(s.violentRate)}</td>
                <td className="text-right font-mono">{fmtRate(s.homicideRate)}</td>
                <td className={`text-right font-mono ${s.violentChange < 0 ? 'text-green-600' : 'text-red-600'}`}>{s.violentChange > 0 ? '+' : ''}{fmtRate(s.violentChange)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top 10 safest */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Top 10 Safest States</h2>
      <p className="text-gray-700 mb-4">
        On the other end of the spectrum, these states have the lowest violent crime rates in the country:
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">State</th><th className="py-2 text-right">Violent Rate</th><th className="py-2 text-right">Murder Rate</th><th className="py-2 text-right">YoY Change</th></tr></thead>
          <tbody>
            {safest.slice(0, 10).map((s, i) => (
              <tr key={s.abbr} className="border-b">
                <td className="py-1">{i + 1}</td>
                <td><Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link></td>
                <td className="text-right font-mono">{fmtRate(s.violentRate)}</td>
                <td className="text-right font-mono">{fmtRate(s.homicideRate)}</td>
                <td className={`text-right font-mono ${s.violentChange < 0 ? 'text-green-600' : 'text-red-600'}`}>{s.violentChange > 0 ? '+' : ''}{fmtRate(s.violentChange)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Murder rankings */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">States with the Highest Murder Rates</h2>
      <p className="text-gray-700 mb-4">
        Murder is the most reliably reported crime statistic — nearly every homicide gets recorded, unlike
        property crimes or assaults where underreporting is common. These are the 10 states with the highest
        murder rates:
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">State</th><th className="py-2 text-right">Murder Rate</th><th className="py-2 text-right">Total Murders</th></tr></thead>
          <tbody>
            {byMurder.slice(0, 10).map((s, i) => (
              <tr key={s.abbr} className="border-b">
                <td className="py-1">{i + 1}</td>
                <td><Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link></td>
                <td className="text-right font-mono">{fmtRate(s.homicideRate)}</td>
                <td className="text-right font-mono">{fmtNum(s.homicide)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Property crime */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Property Crime by State</h2>
      <p className="text-gray-700 mb-4">
        Property crime — burglary, larceny, and motor vehicle theft — affects far more people than violent crime.
        These states have the highest property crime rates:
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">State</th><th className="py-2 text-right">Property Rate</th><th className="py-2 text-right">YoY Change</th></tr></thead>
          <tbody>
            {byProperty.slice(0, 10).map((s, i) => (
              <tr key={s.abbr} className="border-b">
                <td className="py-1">{i + 1}</td>
                <td><Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link></td>
                <td className="text-right font-mono">{fmtRate(s.propertyRate)}</td>
                <td className={`text-right font-mono ${s.propertyChange < 0 ? 'text-green-600' : 'text-red-600'}`}>{s.propertyChange > 0 ? '+' : ''}{fmtRate(s.propertyChange)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Improving vs worsening */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Which States Are Getting Safer — and Which Aren&apos;t?</h2>
      <p className="text-gray-700 mb-4">
        Year-over-year changes reveal which states are making progress and which are moving in the wrong direction.
        {improving.length > worsening.length
          ? ` Good news: ${improving.length} states saw violent crime decrease, compared to ${worsening.length} that saw increases.`
          : ` Concerning: ${worsening.length} states saw violent crime increase year-over-year.`}
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-green-50 rounded-xl p-6">
          <h3 className="font-heading text-lg font-bold text-green-800 mb-3">📉 Most Improved</h3>
          <ul className="space-y-1 text-sm">
            {improving.slice(0, 5).map(s => (
              <li key={s.abbr}>
                <Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link>: {fmtRate(s.violentChange)}%
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 rounded-xl p-6">
          <h3 className="font-heading text-lg font-bold text-red-800 mb-3">📈 Biggest Increases</h3>
          <ul className="space-y-1 text-sm">
            {worsening.slice(0, 5).map(s => (
              <li key={s.abbr}>
                <Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link>: +{fmtRate(s.violentChange)}%
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Why states differ */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Why Do Crime Rates Vary So Much Between States?</h2>
      <p className="text-gray-700 mb-4">
        The {(sorted[0].violentRate / safest[0].violentRate).toFixed(1)}x gap between the most and least dangerous states
        isn&apos;t random. Research consistently points to several key factors:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
        <li><strong>Urbanization:</strong> States with large, dense metro areas tend to have higher crime rates. Our <Link href="/analysis/rural-vs-urban" className="text-[#1e3a5f] hover:underline">rural vs. urban analysis</Link> explores this in depth.</li>
        <li><strong>Poverty and inequality:</strong> The <Link href="/analysis/crime-and-poverty" className="text-[#1e3a5f] hover:underline">poverty-crime connection</Link> is one of the strongest predictors of violent crime rates.</li>
        <li><strong>Policing levels:</strong> States with higher <Link href="/analysis/police-staffing-crisis" className="text-[#1e3a5f] hover:underline">police staffing levels</Link> per capita tend to have different crime dynamics.</li>
        <li><strong>Drug markets:</strong> The <Link href="/analysis/fentanyl-crisis" className="text-[#1e3a5f] hover:underline">fentanyl crisis</Link> and other drug trafficking routes heavily influence violent crime geography.</li>
        <li><strong>Demographics and age:</strong> States with younger populations tend to have higher crime rates, since crime peaks between ages 18-24.</li>
      </ul>

      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">How to Use This Data</h2>
      <p className="text-gray-700 mb-4">
        State-level statistics are useful for broad comparisons, but they can be misleading. A &quot;safe state&quot; can
        have very dangerous cities, and a &quot;dangerous state&quot; can have towns where people never lock their doors.
        For more granular data, explore our <Link href="/cities" className="text-[#1e3a5f] hover:underline">city-level crime data</Link> or
        check specific cities with our <Link href="/is-it-safe" className="text-[#1e3a5f] hover:underline">&quot;Is It Safe?&quot; tool</Link>.
      </p>
      <p className="text-gray-700 mb-4">
        If you&apos;re comparing states for relocation, remember that property crime rates matter too — they affect
        your daily life more than violent crime statistics suggest. And don&apos;t forget to check
        our <Link href="/most-dangerous-cities" className="text-[#1e3a5f] hover:underline">most dangerous cities</Link> list
        to see which specific cities drive each state&apos;s numbers.
      </p>

      {/* Full rankings */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">All States Ranked by Violent Crime Rate</h2>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6 max-h-[600px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-white"><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">State</th><th className="py-2 text-right">Violent</th><th className="py-2 text-right">Murder</th><th className="py-2 text-right">Property</th><th className="py-2 text-right">Change</th></tr></thead>
          <tbody>
            {sorted.map((s, i) => (
              <tr key={s.abbr} className="border-b hover:bg-gray-50">
                <td className="py-1">{i + 1}</td>
                <td><Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link></td>
                <td className="text-right font-mono">{fmtRate(s.violentRate)}</td>
                <td className="text-right font-mono">{fmtRate(s.homicideRate)}</td>
                <td className="text-right font-mono">{fmtRate(s.propertyRate)}</td>
                <td className={`text-right font-mono ${s.violentChange < 0 ? 'text-green-600' : 'text-red-600'}`}>{s.violentChange > 0 ? '+' : ''}{fmtRate(s.violentChange)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mt-10">
        <h3 className="font-heading text-lg font-bold mb-3">Explore More</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <Link href="/rankings" className="text-[#1e3a5f] hover:underline">Interactive State Rankings →</Link>
          <Link href="/compare-states" className="text-[#1e3a5f] hover:underline">Compare Two States →</Link>
          <Link href="/state-report-card" className="text-[#1e3a5f] hover:underline">State Report Cards →</Link>
          <Link href="/analysis/crime-and-politics" className="text-[#1e3a5f] hover:underline">Crime and Politics →</Link>
          <Link href="/most-dangerous-cities" className="text-[#1e3a5f] hover:underline">Most Dangerous Cities →</Link>
          <Link href="/analysis/rural-vs-urban" className="text-[#1e3a5f] hover:underline">Rural vs Urban Crime →</Link>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Crime Statistics by State 2026 — Complete Rankings & Analysis',
        description: 'All 50 states ranked by violent crime, murder, and property crime rates using FBI data.',
        url: 'https://www.opencrime.us/analysis/crime-statistics-by-state',
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What state has the highest crime rate?', acceptedAnswer: { '@type': 'Answer', text: `${sorted[0].name} has the highest violent crime rate at ${fmtRate(sorted[0].violentRate)} per 100,000 residents.` }},
          { '@type': 'Question', name: 'What is the safest state in the US?', acceptedAnswer: { '@type': 'Answer', text: `${safest[0].name} has the lowest violent crime rate at ${fmtRate(safest[0].violentRate)} per 100,000 residents.` }},
          { '@type': 'Question', name: 'Which state has the highest murder rate?', acceptedAnswer: { '@type': 'Answer', text: `${byMurder[0].name} has the highest murder rate at ${fmtRate(byMurder[0].homicideRate)} per 100,000 residents.` }},
          { '@type': 'Question', name: 'How many states saw crime decrease?', acceptedAnswer: { '@type': 'Answer', text: `${improving.length} states saw violent crime decrease year-over-year in the latest FBI data.` }},
        ],
      })}} />

      <RelatedAnalysis currentSlug="crime-statistics-by-state" />
    </div>
  );
}
