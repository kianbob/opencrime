import RelatedAnalysis from '@/components/RelatedAnalysis';
import type { Metadata } from 'next';
import Link from 'next/link';
import { loadData, fmtRate, fmtNum } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Crime Rates by State 2026 — All 50 States Ranked by FBI Data | OpenCrime',
  description: 'Every US state ranked by violent crime rate in 2026. Compare murder, assault, robbery, and property crime rates across all 50 states using the latest FBI data.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/crime-rates-by-state-2026' },
  openGraph: {
    title: 'Crime Rates by State 2026 — All 50 States Ranked',
    description: 'Complete state-by-state crime rate rankings using FBI data. See where your state falls.',
    url: 'https://www.opencrime.us/analysis/crime-rates-by-state-2026',
  },
};

type StateSummary = {
  abbr: string; name: string; population: number;
  violentRate: number; propertyRate: number; homicideRate: number;
  violentChange: number; propertyChange: number;
  violentCrime: number; propertyCrime: number; homicide: number;
};

type NationalTrend = {
  year: number; population: number;
  violentCrime: number; violentRate: number;
  homicide: number; homicideRate: number;
  propertyCrime: number; propertyRate: number;
};

export default function CrimeRatesByState2026Page() {
  const states = loadData<StateSummary[]>('state-summary.json');
  const national = loadData<NationalTrend[]>('national-trends.json');
  const n = national[national.length - 1];

  const sorted = [...states].sort((a, b) => b.violentRate - a.violentRate);
  const safest = [...states].sort((a, b) => a.violentRate - b.violentRate);
  const byMurder = [...states].sort((a, b) => b.homicideRate - a.homicideRate);
  const byProperty = [...states].sort((a, b) => b.propertyRate - a.propertyRate);
  const improving = states.filter(s => s.violentChange < 0).sort((a, b) => a.violentChange - b.violentChange);
  const worsening = states.filter(s => s.violentChange > 0).sort((a, b) => b.violentChange - a.violentChange);

  const totalPop = states.reduce((s, st) => s + st.population, 0);
  const totalViolent = states.reduce((s, st) => s + (st.violentCrime || 0), 0);
  const natViolentRate = totalViolent / totalPop * 100000;

  // Regional groupings
  const regionMap: Record<string, string[]> = {
    'Northeast': ['CT','ME','MA','NH','NJ','NY','PA','RI','VT'],
    'Midwest': ['IL','IN','IA','KS','MI','MN','MO','NE','ND','OH','SD','WI'],
    'South': ['AL','AR','DE','DC','FL','GA','KY','LA','MD','MS','NC','OK','SC','TN','TX','VA','WV'],
    'West': ['AK','AZ','CA','CO','HI','ID','MT','NV','NM','OR','UT','WA','WY'],
  };

  const regionStats = Object.entries(regionMap).map(([region, abbrs]) => {
    const regionStates = states.filter(s => abbrs.includes(s.abbr));
    const pop = regionStates.reduce((s, st) => s + st.population, 0);
    const vc = regionStates.reduce((s, st) => s + (st.violentCrime || 0), 0);
    return { region, rate: vc / pop * 100000, count: regionStates.length };
  }).sort((a, b) => b.rate - a.rate);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Crime Rates by State 2026' }]} />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Crime Rates by State 2026: All 50 States Ranked</h1>
      <p className="text-lg text-gray-600 mb-6">
        How does your state compare? We ranked every US state (plus DC) by violent crime rate using the latest
        FBI Uniform Crime Reporting data. The difference between the safest and most dangerous states is staggering —
        a {(sorted[0].violentRate / safest[0].violentRate).toFixed(1)}x gap.
      </p>

      <AIOverview insights={[
        `National violent crime rate: ${fmtRate(natViolentRate)} per 100,000 residents`,
        `Most dangerous state: ${sorted[0].name} at ${fmtRate(sorted[0].violentRate)} per 100K`,
        `Safest state: ${safest[0].name} at ${fmtRate(safest[0].violentRate)} per 100K`,
        `${improving.length} states saw violent crime decrease, ${worsening.length} saw increases`,
        `Highest murder rate: ${byMurder[0].name} at ${fmtRate(byMurder[0].homicideRate)} per 100K`,
        `The South has the highest regional violent crime rate among the four Census regions`,
      ]} />

      <ShareButtons title="Crime Rates by State 2026" />

      {/* Key stats */}
      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{fmtRate(natViolentRate)}</div>
            <div className="text-blue-200 text-sm">National Rate /100K</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-300">{sorted[0].name}</div>
            <div className="text-blue-200 text-sm">Highest Rate ({fmtRate(sorted[0].violentRate)})</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-300">{safest[0].name}</div>
            <div className="text-blue-200 text-sm">Lowest Rate ({fmtRate(safest[0].violentRate)})</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{(sorted[0].violentRate / safest[0].violentRate).toFixed(1)}x</div>
            <div className="text-blue-200 text-sm">Gap Top vs Bottom</div>
          </div>
        </div>
      </div>

      {/* All states ranked */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">All States Ranked by Violent Crime Rate</h2>
      <p className="text-gray-700 mb-4">
        Complete rankings of all 50 states and Washington DC by violent crime rate per 100,000 residents.
        Violent crime includes murder, rape, robbery, and aggravated assault.
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6 max-h-[700px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-white"><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">State</th><th className="py-2 text-right">Violent Rate</th><th className="py-2 text-right">Murder Rate</th><th className="py-2 text-right">Property Rate</th><th className="py-2 text-right">YoY Change</th></tr></thead>
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

      {/* Regional breakdown */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Crime Rates by Region</h2>
      <p className="text-gray-700 mb-4">
        The US Census Bureau divides states into four regions. Crime rates vary significantly by geography,
        with the South consistently recording higher violent crime rates than other regions.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {regionStats.map(r => (
          <div key={r.region} className="bg-white rounded-xl shadow-sm border p-4 text-center">
            <div className="text-xl font-bold text-[#1e3a5f]">{fmtRate(r.rate)}</div>
            <div className="text-sm text-gray-600">{r.region}</div>
            <div className="text-xs text-gray-400">{r.count} states</div>
          </div>
        ))}
      </div>

      {/* Top 10 most dangerous */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">10 Most Dangerous States</h2>
      <p className="text-gray-700 mb-4">
        These states have the highest rates of violent crime per 100,000 residents:
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">State</th><th className="py-2 text-right">Violent Rate</th><th className="py-2 text-right">Violent Crimes</th><th className="py-2 text-right">Population</th></tr></thead>
          <tbody>
            {sorted.slice(0, 10).map((s, i) => (
              <tr key={s.abbr} className="border-b">
                <td className="py-1">{i + 1}</td>
                <td><Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link></td>
                <td className="text-right font-mono font-bold">{fmtRate(s.violentRate)}</td>
                <td className="text-right font-mono">{fmtNum(s.violentCrime)}</td>
                <td className="text-right font-mono">{fmtNum(s.population)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top 10 safest */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">10 Safest States</h2>
      <p className="text-gray-700 mb-4">
        These states have the lowest violent crime rates. Many are in the Northeast and Midwest:
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">State</th><th className="py-2 text-right">Violent Rate</th><th className="py-2 text-right">Violent Crimes</th><th className="py-2 text-right">Population</th></tr></thead>
          <tbody>
            {safest.slice(0, 10).map((s, i) => (
              <tr key={s.abbr} className="border-b">
                <td className="py-1">{i + 1}</td>
                <td><Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link></td>
                <td className="text-right font-mono font-bold text-green-700">{fmtRate(s.violentRate)}</td>
                <td className="text-right font-mono">{fmtNum(s.violentCrime)}</td>
                <td className="text-right font-mono">{fmtNum(s.population)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Murder rate rankings */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">States with Highest Murder Rates</h2>
      <p className="text-gray-700 mb-4">
        Murder is the most reliably reported crime — nearly every homicide is recorded. These 10 states
        have the highest murder rates per 100,000 residents:
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">State</th><th className="py-2 text-right">Murder Rate</th><th className="py-2 text-right">Total Murders</th></tr></thead>
          <tbody>
            {byMurder.slice(0, 10).map((s, i) => (
              <tr key={s.abbr} className="border-b">
                <td className="py-1">{i + 1}</td>
                <td><Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link></td>
                <td className="text-right font-mono font-bold">{fmtRate(s.homicideRate)}</td>
                <td className="text-right font-mono">{fmtNum(s.homicide)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Property crime */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Property Crime Rates by State</h2>
      <p className="text-gray-700 mb-4">
        Property crime — burglary, larceny-theft, and motor vehicle theft — affects far more people than
        violent crime. Here are the 10 states with the highest property crime rates:
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

      {/* Year-over-year changes */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Which States Are Improving?</h2>
      <p className="text-gray-700 mb-4">
        {improving.length} states saw their violent crime rates decrease year-over-year, while {worsening.length} saw increases.
      </p>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-green-50 rounded-xl p-6">
          <h3 className="font-heading text-lg font-bold text-green-800 mb-3">📉 Biggest Drops</h3>
          <ul className="space-y-1 text-sm">
            {improving.slice(0, 7).map(s => (
              <li key={s.abbr}>
                <Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link>: {fmtRate(s.violentChange)}%
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 rounded-xl p-6">
          <h3 className="font-heading text-lg font-bold text-red-800 mb-3">📈 Biggest Increases</h3>
          <ul className="space-y-1 text-sm">
            {worsening.slice(0, 7).map(s => (
              <li key={s.abbr}>
                <Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link>: +{fmtRate(s.violentChange)}%
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key takeaways */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Key Takeaways</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
        <li>State-level crime data is useful for broad comparisons but masks city-level variation. A &quot;safe state&quot; can have very dangerous cities.</li>
        <li>The South consistently has the highest regional crime rates, driven by a combination of urbanization patterns, poverty concentration, and demographics.</li>
        <li>Small, rural states in New England tend to have the lowest crime rates, though they also have small populations that can cause rate volatility.</li>
        <li>Year-over-year changes can be misleading for small states where a handful of incidents can swing the rate significantly.</li>
        <li>For city-level data, see our <Link href="/cities" className="text-[#1e3a5f] hover:underline">city crime database</Link> or <Link href="/analysis/most-dangerous-cities-2026" className="text-[#1e3a5f] hover:underline">most dangerous cities ranking</Link>.</li>
      </ul>

      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Methodology</h2>
      <p className="text-gray-700 mb-4">
        Crime rates are calculated per 100,000 residents using population estimates from the FBI&apos;s Uniform Crime
        Reporting program. All data comes from the FBI Crime Data Explorer. Year-over-year changes compare the most
        recent full reporting year to the previous year. Washington DC is included as a state-equivalent for ranking purposes.
      </p>

      <div className="bg-gray-50 rounded-xl p-6 mt-10">
        <h3 className="font-heading text-lg font-bold mb-3">Explore More</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <Link href="/analysis/crime-statistics-by-state" className="text-[#1e3a5f] hover:underline">Crime Statistics by State →</Link>
          <Link href="/analysis/safest-states-2026" className="text-[#1e3a5f] hover:underline">Safest States 2026 →</Link>
          <Link href="/analysis/most-dangerous-cities-2026" className="text-[#1e3a5f] hover:underline">Most Dangerous Cities 2026 →</Link>
          <Link href="/states" className="text-[#1e3a5f] hover:underline">Browse All States →</Link>
          <Link href="/rankings" className="text-[#1e3a5f] hover:underline">Full Rankings →</Link>
          <Link href="/analysis/violent-crime-statistics-2026" className="text-[#1e3a5f] hover:underline">Violent Crime Statistics 2026 →</Link>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Crime Rates by State 2026 — All 50 States Ranked',
        description: 'Every US state ranked by violent crime rate using FBI data.',
        url: 'https://www.opencrime.us/analysis/crime-rates-by-state-2026',
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What state has the highest crime rate in 2026?', acceptedAnswer: { '@type': 'Answer', text: `${sorted[0].name} has the highest violent crime rate at ${fmtRate(sorted[0].violentRate)} per 100,000 residents.` }},
          { '@type': 'Question', name: 'What is the safest state in 2026?', acceptedAnswer: { '@type': 'Answer', text: `${safest[0].name} has the lowest violent crime rate at ${fmtRate(safest[0].violentRate)} per 100,000 residents.` }},
          { '@type': 'Question', name: 'How many states saw crime decrease?', acceptedAnswer: { '@type': 'Answer', text: `${improving.length} states saw their violent crime rate decrease year-over-year in the latest FBI data.` }},
        ],
      })}} />

      <RelatedAnalysis currentSlug="crime-rates-by-state-2026" />
    </div>
  );
}
