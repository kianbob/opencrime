import RelatedAnalysis from '@/components/RelatedAnalysis';
import type { Metadata } from 'next';
import Link from 'next/link';
import { loadData, fmtRate, fmtNum } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'The Safest Places to Live in America (2025) — Data-Driven Guide | OpenCrime',
  description: 'Top 50 safest cities, 25 safest small towns, and safest states ranked by FBI crime data. Find the safest places to live based on violent crime rates.',
  keywords: ['safest places to live', 'safest cities in America', 'safest states', 'safest small towns', 'low crime cities'],
  alternates: { canonical: 'https://www.opencrime.us/analysis/safest-places-to-live' },
  openGraph: {
    title: 'The Safest Places to Live in America — A Data-Driven Guide',
    description: 'Top 50 safest cities, 25 safest small towns, and safest states based on FBI data.',
    url: 'https://www.opencrime.us/analysis/safest-places-to-live',
  },
};

type CityIndex = {
  slug: string; city: string; state: string; population: number;
  violentRate: number; murderRate: number; propertyRate: number;
};
type StateSummary = {
  abbr: string; name: string; population: number;
  violentRate: number; propertyRate: number; homicideRate: number;
};

export default function SafestPlacesToLivePage() {
  const cities = loadData<CityIndex[]>('city-index.json');
  const states = loadData<StateSummary[]>('state-summary.json');

  // Top 50 safest cities (pop > 25K)
  const safestCities = cities
    .filter(c => c.population >= 25000 && c.violentRate >= 0)
    .sort((a, b) => a.violentRate - b.violentRate)
    .slice(0, 50);

  // Top 25 safest small towns (pop 10K-25K)
  const safestTowns = cities
    .filter(c => c.population >= 10000 && c.population < 25000 && c.violentRate >= 0)
    .sort((a, b) => a.violentRate - b.violentRate)
    .slice(0, 25);

  // Safest states
  const safestStates = [...states].sort((a, b) => a.violentRate - b.violentRate).slice(0, 10);

  // Regional analysis
  const regionMap: Record<string, string[]> = {
    'Northeast': ['CT','ME','MA','NH','NJ','NY','PA','RI','VT'],
    'Midwest': ['IL','IN','IA','KS','MI','MN','MO','NE','ND','OH','SD','WI'],
    'South': ['AL','AR','DE','FL','GA','KY','LA','MD','MS','NC','OK','SC','TN','TX','VA','WV','DC'],
    'West': ['AK','AZ','CA','CO','HI','ID','MT','NV','NM','OR','UT','WA','WY'],
  };

  const regionStats = Object.entries(regionMap).map(([region, abbrs]) => {
    const regionStates = states.filter(s => abbrs.includes(s.abbr));
    const totalPop = regionStates.reduce((s, st) => s + st.population, 0);
    const avgViolent = regionStates.reduce((s, st) => s + st.violentRate * st.population, 0) / totalPop;
    return { region, avgViolent, count: regionStates.length };
  }).sort((a, b) => a.avgViolent - b.avgViolent);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Safest Places to Live' }]} />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">The Safest Places to Live in America: A Data-Driven Guide</h1>
      <p className="text-lg text-gray-600 mb-6">
        Looking for a safe place to live? We ranked every city and town in our database by violent crime rate
        using the latest FBI data. Here are the safest places in America — from cities to small towns to
        entire states.
      </p>

      <AIOverview insights={[
        `${safestCities[0]?.city}, ${safestCities[0]?.state} is the safest city (25K+ pop) with just ${fmtRate(safestCities[0]?.violentRate || 0)} violent crimes per 100K`,
        `${safestStates[0]?.name} is the safest state with a violent crime rate of ${fmtRate(safestStates[0]?.violentRate || 0)}`,
        'Northeast suburbs and Midwest college towns dominate the safest cities list',
        `The national average violent crime rate is 359.1 per 100K — the safest cities are 90%+ below this`,
        'Property crime often tells a different story than violent crime',
      ]} />

      <ShareButtons title="The Safest Places to Live in America" />

      {/* Table of Contents */}
      <div className="bg-gray-50 rounded-xl p-6 mt-8 mb-10">
        <h2 className="font-heading text-lg font-bold mb-3">Contents</h2>
        <ul className="space-y-1 text-sm">
          <li><a href="#safest-cities" className="text-[#1e3a5f] hover:underline">Top 50 Safest Cities (population 25K+)</a></li>
          <li><a href="#safest-towns" className="text-[#1e3a5f] hover:underline">Top 25 Safest Small Towns (10K-25K)</a></li>
          <li><a href="#safest-states" className="text-[#1e3a5f] hover:underline">Top 10 Safest States</a></li>
          <li><a href="#regional" className="text-[#1e3a5f] hover:underline">Regional Patterns</a></li>
          <li><a href="#what-makes-safe" className="text-[#1e3a5f] hover:underline">What Makes a Place Safe?</a></li>
          <li><a href="#methodology" className="text-[#1e3a5f] hover:underline">Methodology</a></li>
        </ul>
      </div>

      {/* Top 50 Safest Cities */}
      <h2 id="safest-cities" className="font-heading text-2xl font-bold mt-10 mb-4">Top 50 Safest Cities (Population 25,000+)</h2>
      <p className="text-gray-700 mb-4">
        These cities all have populations over 25,000 and the lowest violent crime rates in the nation.
        Many are suburban communities near major metros, college towns, or affluent bedroom communities.
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 text-left">
              <th className="py-2 pr-2">#</th>
              <th className="py-2">City</th>
              <th className="py-2">State</th>
              <th className="py-2 text-right">Population</th>
              <th className="py-2 text-right">Violent Rate</th>
              <th className="py-2 text-right">Property Rate</th>
            </tr>
          </thead>
          <tbody>
            {safestCities.map((c, i) => (
              <tr key={c.slug} className="border-b hover:bg-gray-50">
                <td className="py-1.5 pr-2 text-gray-500">{i + 1}</td>
                <td>
                  <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city}</Link>
                </td>
                <td className="text-gray-600">{c.state}</td>
                <td className="text-right">{fmtNum(c.population)}</td>
                <td className="text-right font-medium text-green-700">{fmtRate(c.violentRate)}</td>
                <td className="text-right text-gray-600">{fmtRate(c.propertyRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top 25 Safest Small Towns */}
      <h2 id="safest-towns" className="font-heading text-2xl font-bold mt-10 mb-4">Top 25 Safest Small Towns (Population 10,000–25,000)</h2>
      <p className="text-gray-700 mb-4">
        Small towns often fly under the radar, but many offer exceptional safety combined with
        lower cost of living. These are the safest small communities in America.
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 text-left">
              <th className="py-2 pr-2">#</th>
              <th className="py-2">Town</th>
              <th className="py-2">State</th>
              <th className="py-2 text-right">Population</th>
              <th className="py-2 text-right">Violent Rate</th>
            </tr>
          </thead>
          <tbody>
            {safestTowns.map((c, i) => (
              <tr key={c.slug} className="border-b hover:bg-gray-50">
                <td className="py-1.5 pr-2 text-gray-500">{i + 1}</td>
                <td>
                  <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city}</Link>
                </td>
                <td className="text-gray-600">{c.state}</td>
                <td className="text-right">{fmtNum(c.population)}</td>
                <td className="text-right font-medium text-green-700">{fmtRate(c.violentRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Safest States */}
      <h2 id="safest-states" className="font-heading text-2xl font-bold mt-10 mb-4">Top 10 Safest States</h2>
      <p className="text-gray-700 mb-4">
        State-level rankings give a broader picture. These states consistently rank among the safest
        in America across multiple metrics.
      </p>

      <div className="grid gap-3 mb-8">
        {safestStates.map((s, i) => (
          <div key={s.abbr} className="bg-white rounded-lg shadow-sm border p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-gray-300 w-8">#{i + 1}</span>
              <div>
                <Link href={`/states/${s.abbr.toLowerCase()}`} className="font-bold text-[#1e3a5f] hover:underline">{s.name}</Link>
                <div className="text-xs text-gray-500">Pop: {fmtNum(s.population)}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-green-700">{fmtRate(s.violentRate)}/100K</div>
              <div className="text-xs text-gray-500">Murder: {fmtRate(s.homicideRate)}/100K</div>
            </div>
          </div>
        ))}
      </div>

      {/* Regional Patterns */}
      <h2 id="regional" className="font-heading text-2xl font-bold mt-10 mb-4">Regional Patterns</h2>
      <p className="text-gray-700 mb-4">
        Safety varies significantly by region. Here&apos;s how the four major US regions compare:
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {regionStats.map(r => (
          <div key={r.region} className="bg-white rounded-xl shadow-sm border p-4 text-center">
            <div className="font-bold">{r.region}</div>
            <div className="text-2xl font-bold mt-1">{fmtRate(r.avgViolent)}</div>
            <div className="text-xs text-gray-500">violent per 100K</div>
          </div>
        ))}
      </div>

      <p className="text-gray-700 mb-4">
        <strong>Northeast suburbs</strong> are particularly safe. Communities in Connecticut, New Jersey,
        Massachusetts, and New York&apos;s suburban counties consistently rank among the safest in the nation.
        Many offer excellent schools, walkable downtowns, and easy access to major cities.
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Midwest college towns</strong> are another safe haven. University communities tend to have
        strong local economies, younger demographics, and active community engagement that correlates
        with lower crime.
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Mountain West communities</strong> in states like Idaho, Utah, and Wyoming offer extremely
        low crime rates combined with outdoor recreation and growing economies.
      </p>

      {/* What Makes a Place Safe */}
      <h2 id="what-makes-safe" className="font-heading text-2xl font-bold mt-10 mb-4">What Makes a Place Safe?</h2>
      <p className="text-gray-700 mb-4">
        Safety isn&apos;t random. Research consistently identifies several factors that correlate with lower crime:
      </p>

      <div className="space-y-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-heading text-lg font-bold mb-2">💰 Economic Stability</h3>
          <p className="text-gray-700 text-sm">
            Communities with higher median incomes, lower poverty rates, and lower unemployment tend to
            have less crime. Economic opportunity gives people alternatives to criminal activity, and
            stable communities invest more in social infrastructure.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-heading text-lg font-bold mb-2">🏫 Education</h3>
          <p className="text-gray-700 text-sm">
            Areas with higher educational attainment consistently show lower crime rates. College towns
            appear frequently on safest-cities lists. Education correlates with employment, income,
            and social engagement — all protective against crime.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-heading text-lg font-bold mb-2">👮 Policing & Community Investment</h3>
          <p className="text-gray-700 text-sm">
            Well-funded, community-oriented policing contributes to safety. But policing alone isn&apos;t
            enough — the safest communities combine good policing with strong schools, community programs,
            and economic opportunity.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-heading text-lg font-bold mb-2">🏘️ Community Cohesion</h3>
          <p className="text-gray-700 text-sm">
            Social cohesion — neighbors knowing each other, community organizations, civic participation —
            is one of the strongest predictors of safety. Places where people are invested in their
            community tend to be safer.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-heading text-lg font-bold mb-2">🏗️ Housing Stability</h3>
          <p className="text-gray-700 text-sm">
            High homeownership rates and housing stability correlate with lower crime. Transient populations
            and housing instability create conditions where crime is more likely to occur. The safest
            communities tend to have stable, long-term residents.
          </p>
        </div>
      </div>

      <h2 id="methodology" className="font-heading text-2xl font-bold mt-10 mb-4">Methodology</h2>
      <p className="text-gray-700 mb-4">
        Rankings are based on FBI Uniform Crime Reporting data for the most recent available year (2024).
        Cities are ranked by violent crime rate per 100,000 residents. We filtered for cities with
        populations of 25,000+ for the main list and 10,000-25,000 for the small towns list.
      </p>
      <p className="text-gray-700 mb-4">
        Important caveats: not all agencies report to the FBI. Some very safe communities may be
        missing from our data. Additionally, crime rates can change year to year — a city&apos;s ranking
        in one year may differ from the next. Use these rankings as a guide, not a guarantee.
      </p>

      <div className="bg-gray-50 rounded-xl p-6 mt-10">
        <h3 className="font-heading text-lg font-bold mb-3">Related</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <Link href="/safest-cities" className="text-[#1e3a5f] hover:underline">Safest Cities Rankings →</Link>
          <Link href="/rankings" className="text-[#1e3a5f] hover:underline">Full State Rankings →</Link>
          <Link href="/tools/city-report" className="text-[#1e3a5f] hover:underline">City Safety Report Tool →</Link>
          <Link href="/is-it-safe" className="text-[#1e3a5f] hover:underline">Is It Safe? Guides →</Link>
          <Link href="/state-report-card" className="text-[#1e3a5f] hover:underline">State Report Cards →</Link>
          <Link href="/crime-correlations" className="text-[#1e3a5f] hover:underline">Crime Correlations →</Link>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'The Safest Places to Live in America: A Data-Driven Guide',
        description: 'Top 50 safest cities, 25 safest small towns, and safest states based on FBI crime data.',
        url: 'https://www.opencrime.us/analysis/safest-places-to-live',
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the safest city in America?', acceptedAnswer: { '@type': 'Answer', text: `Based on violent crime rates for cities with 25,000+ population, ${safestCities[0]?.city}, ${safestCities[0]?.state} is the safest with a rate of just ${fmtRate(safestCities[0]?.violentRate || 0)} per 100,000.` }},
          { '@type': 'Question', name: 'What is the safest state to live in?', acceptedAnswer: { '@type': 'Answer', text: `${safestStates[0]?.name} has the lowest violent crime rate at ${fmtRate(safestStates[0]?.violentRate || 0)} per 100,000, making it the safest state by this measure.` }},
          { '@type': 'Question', name: 'What makes a city safe?', acceptedAnswer: { '@type': 'Answer', text: 'Economic stability, high education levels, community cohesion, housing stability, and effective policing all contribute to lower crime rates. The safest cities typically combine multiple protective factors.' }},
          { '@type': 'Question', name: 'Are small towns safer than cities?', acceptedAnswer: { '@type': 'Answer', text: 'Many small towns are extremely safe, but not all. Rural crime has been rising in recent years. The safest places tend to be suburban communities and college towns rather than remote rural areas.' }},
        ],
      })}} />

      <RelatedAnalysis currentSlug="safest-places-to-live" />
    </div>
  );
}
