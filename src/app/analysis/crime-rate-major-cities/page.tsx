import RelatedAnalysis from '@/components/RelatedAnalysis';
import type { Metadata } from 'next';
import Link from 'next/link';
import { loadData, fmtRate, fmtNum } from '@/lib/utils';
import type { CityIndex, NationalTrend } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Crime Rates in Major US Cities 2025 — Chicago, LA, NYC, Houston, Philadelphia | OpenCrime',
  description: 'Crime rate comparison for America\'s biggest cities: Chicago, Los Angeles, New York, Houston, and Philadelphia. See violent crime, murder rates, and how each city compares to the national average.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/crime-rate-major-cities' },
  openGraph: {
    title: 'Crime Rates in Major US Cities 2025',
    description: 'How do Chicago, LA, NYC, Houston, and Philly compare? FBI data reveals surprising answers.',
    url: 'https://www.opencrime.us/analysis/crime-rate-major-cities',
  },
};

export default function CrimeRateMajorCitiesPage() {
  const allCities = loadData<CityIndex[]>('city-index.json');
  const national = loadData<NationalTrend[]>('national-trends.json');
  const n = national[national.length - 1];
  const natRate = n.violentRate;
  const natMurder = n.homicideRate;

  // Target cities
  const targetSlugs = ['chicago-illinois', 'los-angeles-california', 'new-york-new-york', 'houston-texas', 'philadelphia-pennsylvania'];
  const targetNames = ['Chicago', 'Los Angeles', 'New York', 'Houston', 'Philadelphia'];

  const majorCities = targetSlugs.map(slug => allCities.find(c => c.slug === slug)).filter(Boolean) as CityIndex[];

  // Also get other big cities for context
  const bigCities = allCities.filter(c => c.population >= 500000 && c.violentRate > 0).sort((a, b) => b.violentRate - a.violentRate);
  const rankOf = (slug: string) => bigCities.findIndex(c => c.slug === slug) + 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Crime Rates in Major Cities' }]} />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Crime Rates in America&apos;s Biggest Cities: Chicago, LA, NYC, Houston &amp; Philadelphia</h1>
      <p className="text-lg text-gray-600 mb-6">
        These five cities are among the most talked-about when it comes to crime — but the data often
        contradicts the headlines. Here&apos;s how each actually compares using FBI crime statistics,
        and which city is really the most dangerous.
      </p>

      <AIOverview insights={majorCities.length >= 5 ? [
        `${majorCities.sort((a, b) => b.violentRate - a.violentRate)[0].city} has the highest violent crime rate: ${fmtRate(majorCities.sort((a, b) => b.violentRate - a.violentRate)[0].violentRate)} per 100K`,
        `${majorCities.sort((a, b) => a.violentRate - b.violentRate)[0].city} has the lowest: ${fmtRate(majorCities.sort((a, b) => a.violentRate - b.violentRate)[0].violentRate)} per 100K`,
        `National average: ${fmtRate(natRate)} violent crimes per 100K`,
        `${majorCities.filter(c => c.violentRate > natRate).length} of 5 cities have above-average violent crime rates`,
        `${majorCities.sort((a, b) => b.murderRate - a.murderRate)[0].city} has the highest murder rate at ${fmtRate(majorCities.sort((a, b) => b.murderRate - a.murderRate)[0].murderRate)} per 100K`,
      ] : ['Data loading...']} />

      <ShareButtons title="Crime Rates in Major US Cities 2025" />

      {/* Side by side comparison */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Head-to-Head Comparison</h2>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">City</th>
              <th className="py-2 text-right">Population</th>
              <th className="py-2 text-right">Violent Rate</th>
              <th className="py-2 text-right">Murder Rate</th>
              <th className="py-2 text-right">Property Rate</th>
              <th className="py-2 text-center">Rank (500K+)</th>
            </tr>
          </thead>
          <tbody>
            {majorCities.sort((a, b) => b.violentRate - a.violentRate).map(c => (
              <tr key={c.slug} className="border-b hover:bg-gray-50">
                <td className="py-2 font-bold"><Link href={`/crime-rate-in/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city}</Link></td>
                <td className="text-right font-mono">{fmtNum(c.population)}</td>
                <td className={`text-right font-mono font-bold ${c.violentRate > natRate ? 'text-red-600' : 'text-green-600'}`}>{fmtRate(c.violentRate)}</td>
                <td className={`text-right font-mono ${c.murderRate > natMurder ? 'text-red-600' : 'text-green-600'}`}>{fmtRate(c.murderRate)}</td>
                <td className="text-right font-mono">{fmtRate(c.propertyRate)}</td>
                <td className="text-center font-mono">#{rankOf(c.slug)} of {bigCities.length}</td>
              </tr>
            ))}
            <tr className="border-t-2 bg-gray-50">
              <td className="py-2 font-bold text-gray-600">National Avg</td>
              <td className="text-right"></td>
              <td className="text-right font-mono font-bold">{fmtRate(natRate)}</td>
              <td className="text-right font-mono">{fmtRate(natMurder)}</td>
              <td className="text-right font-mono">{fmtRate(n.propertyRate)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Individual city profiles */}
      {majorCities.sort((a, b) => b.population - a.population).map(city => {
        const aboveAvg = city.violentRate > natRate;
        const murderAbove = city.murderRate > natMurder;
        const vsNat = ((city.violentRate / natRate - 1) * 100);

        return (
          <div key={city.slug} className="mb-10">
            <h2 className="font-heading text-2xl font-bold mt-8 mb-4">
              <Link href={`/crime-rate-in/${city.slug}`} className="text-[#1e3a5f] hover:underline">{city.city}, {city.state}</Link>
            </h2>

            <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{fmtNum(city.population)}</div>
                  <div className="text-sm text-gray-600">Population</div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${aboveAvg ? 'text-red-600' : 'text-green-600'}`}>{fmtRate(city.violentRate)}</div>
                  <div className="text-sm text-gray-600">Violent Rate /100K</div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${murderAbove ? 'text-red-600' : 'text-green-600'}`}>{fmtRate(city.murderRate)}</div>
                  <div className="text-sm text-gray-600">Murder Rate /100K</div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${aboveAvg ? 'text-red-600' : 'text-green-600'}`}>{vsNat > 0 ? '+' : ''}{vsNat.toFixed(0)}%</div>
                  <div className="text-sm text-gray-600">vs National Avg</div>
                </div>
              </div>
            </div>

            {city.slug === 'chicago-illinois' && (
              <p className="text-gray-700 mb-4">
                Chicago dominates crime headlines, but the data tells a more complex story. While the city&apos;s
                total murder count is high due to its large population, its per-capita violent crime rate
                is {aboveAvg ? `${vsNat.toFixed(0)}% above` : `${Math.abs(vsNat).toFixed(0)}% below`} the national
                average. Crime is heavily concentrated in specific South and West Side neighborhoods — most of
                the city is reasonably safe. Chicago ranks #{rankOf(city.slug)} among {bigCities.length} large
                cities by violent crime rate.
              </p>
            )}
            {city.slug === 'los-angeles-california' && (
              <p className="text-gray-700 mb-4">
                Los Angeles, despite its reputation from movies and media, has a violent crime rate
                of {fmtRate(city.violentRate)} per 100K — {aboveAvg ? `${vsNat.toFixed(0)}% above` : `${Math.abs(vsNat).toFixed(0)}% below`} the
                national average. LA has seen significant crime reduction since the 1990s, when it was one of
                America&apos;s most dangerous cities. Property crime, particularly car theft, remains a bigger
                concern than violent crime for most residents.
              </p>
            )}
            {city.slug === 'new-york-new-york' && (
              <p className="text-gray-700 mb-4">
                New York City is America&apos;s great crime success story. Once the poster child for urban
                violence in the 1990s, NYC now has a violent crime rate
                of {fmtRate(city.violentRate)} per 100K — {aboveAvg ? `${vsNat.toFixed(0)}% above` : `${Math.abs(vsNat).toFixed(0)}% below`} the
                national average. For a city of {fmtNum(city.population)}, that&apos;s remarkable. NYC is
                consistently one of the safest large cities in America per capita, ranking
                #{rankOf(city.slug)} of {bigCities.length} big cities.
              </p>
            )}
            {city.slug === 'houston-texas' && (
              <p className="text-gray-700 mb-4">
                Houston, the fourth-largest US city, has a violent crime rate of {fmtRate(city.violentRate)} per
                100K — {aboveAvg ? `${vsNat.toFixed(0)}% above` : `${Math.abs(vsNat).toFixed(0)}% below`} the
                national average. Houston&apos;s sprawling geography means crime varies enormously by neighborhood.
                The city&apos;s murder rate of {fmtRate(city.murderRate)} per 100K places it
                #{bigCities.sort((a, b) => b.murderRate - a.murderRate).findIndex(c => c.slug === city.slug) + 1} among
                large cities for homicides.
              </p>
            )}
            {city.slug === 'philadelphia-pennsylvania' && (
              <p className="text-gray-700 mb-4">
                Philadelphia has one of the higher violent crime rates among America&apos;s biggest cities,
                at {fmtRate(city.violentRate)} per 100K — {aboveAvg ? `${vsNat.toFixed(0)}% above` : `${Math.abs(vsNat).toFixed(0)}% below`} the
                national average. The city has struggled with gun violence in particular, and its murder rate
                of {fmtRate(city.murderRate)} per 100K ranks among the highest of major US cities. However,
                recent initiatives have shown some progress in reducing shootings.
              </p>
            )}
          </div>
        );
      })}

      {/* All big cities for context */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">All Large US Cities (500K+) Ranked</h2>
      <p className="text-gray-700 mb-4">
        For full context, here&apos;s how every US city with 500,000+ residents ranks by violent crime rate:
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">City</th><th className="py-2 text-right">Pop.</th><th className="py-2 text-right">Violent Rate</th><th className="py-2 text-right">Murder Rate</th></tr></thead>
          <tbody>
            {bigCities.map((c, i) => {
              const isTarget = targetSlugs.includes(c.slug);
              return (
                <tr key={c.slug} className={`border-b ${isTarget ? 'bg-blue-50 font-bold' : 'hover:bg-gray-50'}`}>
                  <td className="py-1">{i + 1}</td>
                  <td><Link href={`/crime-rate-in/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city}, {c.state}</Link></td>
                  <td className="text-right font-mono">{fmtNum(c.population)}</td>
                  <td className={`text-right font-mono ${c.violentRate > natRate ? 'text-red-600' : 'text-green-600'}`}>{fmtRate(c.violentRate)}</td>
                  <td className="text-right font-mono">{fmtRate(c.murderRate)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Takeaways */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Key Takeaways</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
        <li><strong>Headlines don&apos;t match data:</strong> The cities that dominate crime coverage aren&apos;t always the most dangerous per capita. Media attention correlates with total crime counts (driven by population) more than crime rates.</li>
        <li><strong>NYC is remarkably safe:</strong> For a city of {fmtNum(majorCities.find(c => c.slug === 'new-york-new-york')?.population || 0)}, New York&apos;s crime transformation is one of the great urban success stories.</li>
        <li><strong>Crime is hyperlocal:</strong> In every major city, crime concentrates in specific neighborhoods. Citywide rates don&apos;t tell you about the block you&apos;d live on. See our <Link href="/analysis/murder-map" className="text-[#1e3a5f] hover:underline">murder concentration analysis</Link>.</li>
        <li><strong>Property crime matters too:</strong> For day-to-day quality of life, <Link href="/analysis/property-crime-surge" className="text-[#1e3a5f] hover:underline">property crime</Link> — break-ins, car theft, package theft — may affect you more than violent crime statistics suggest.</li>
      </ul>

      <div className="bg-gray-50 rounded-xl p-6 mt-10">
        <h3 className="font-heading text-lg font-bold mb-3">Explore Individual Cities</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {majorCities.map(c => (
            <Link key={c.slug} href={`/crime-rate-in/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city} Crime Data →</Link>
          ))}
          <Link href="/cities" className="text-[#1e3a5f] hover:underline">Browse All Cities →</Link>
          <Link href="/analysis/most-dangerous-cities-2025" className="text-[#1e3a5f] hover:underline">Most Dangerous Cities 2025 →</Link>
          <Link href="/analysis/safest-cities-america" className="text-[#1e3a5f] hover:underline">Safest Cities in America →</Link>
          <Link href="/analysis/violent-crime-trends" className="text-[#1e3a5f] hover:underline">Violent Crime Trends →</Link>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Crime Rates in Major US Cities 2025',
        description: 'Crime rate comparison for Chicago, Los Angeles, New York, Houston, and Philadelphia using FBI data.',
        url: 'https://www.opencrime.us/analysis/crime-rate-major-cities',
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the crime rate in Chicago?', acceptedAnswer: { '@type': 'Answer', text: `Chicago has a violent crime rate of ${fmtRate(majorCities.find(c => c.slug === 'chicago-illinois')?.violentRate || 0)} per 100,000 residents and a murder rate of ${fmtRate(majorCities.find(c => c.slug === 'chicago-illinois')?.murderRate || 0)} per 100,000.` }},
          { '@type': 'Question', name: 'Is New York City safe?', acceptedAnswer: { '@type': 'Answer', text: `Yes, relatively. NYC has a violent crime rate of ${fmtRate(majorCities.find(c => c.slug === 'new-york-new-york')?.violentRate || 0)} per 100,000 — making it one of the safest large cities in America per capita.` }},
          { '@type': 'Question', name: 'Which major US city has the highest crime rate?', acceptedAnswer: { '@type': 'Answer', text: `Among the five largest US cities, ${majorCities.sort((a, b) => b.violentRate - a.violentRate)[0]?.city || 'N/A'} has the highest violent crime rate.` }},
          { '@type': 'Question', name: 'What is the crime rate in Los Angeles?', acceptedAnswer: { '@type': 'Answer', text: `Los Angeles has a violent crime rate of ${fmtRate(majorCities.find(c => c.slug === 'los-angeles-california')?.violentRate || 0)} per 100,000 residents.` }},
        ],
      })}} />

      <RelatedAnalysis currentSlug="crime-rate-major-cities" />
    </div>
  );
}
