import RelatedAnalysis from '@/components/RelatedAnalysis';
import type { Metadata } from 'next';
import Link from 'next/link';
import { loadData, fmtRate, fmtNum } from '@/lib/utils';
import type { CityIndex, NationalTrend } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Safest Cities in America 2025 — Low Crime Rankings | OpenCrime',
  description: 'The 50 safest cities in the US with populations over 100K, ranked by violent crime rate. Find cities with crime rates 70-90% below the national average.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/safest-cities-america' },
  openGraph: {
    title: 'Safest Cities in America 2025',
    description: 'The 50 safest US cities ranked by crime rate — some have rates 90% below the national average.',
    url: 'https://www.opencrime.us/analysis/safest-cities-america',
  },
};

type StateSummary = {
  abbr: string; name: string; population: number;
  violentRate: number; propertyRate: number; homicideRate: number;
  violentChange: number; propertyChange: number;
};

export default function SafestCitiesAmericaPage() {
  const allCities = loadData<CityIndex[]>('city-index.json');
  const national = loadData<NationalTrend[]>('national-trends.json');
  const states = loadData<StateSummary[]>('state-summary.json');
  const n = national[national.length - 1];
  const natRate = n.violentRate;

  const large = allCities.filter(c => c.population >= 100000 && c.violentRate > 0);
  const safest = [...large].sort((a, b) => a.violentRate - b.violentRate);
  const safestByProperty = [...large].sort((a, b) => a.propertyRate - b.propertyRate);
  const top50 = safest.slice(0, 50);

  const safestState = (state: string) => safest.filter(c => c.state === state);

  // State with most safe cities
  const stateCounts: Record<string, number> = {};
  top50.forEach(c => { stateCounts[c.state] = (stateCounts[c.state] || 0) + 1; });
  const topSafeStates = Object.entries(stateCounts).sort((a, b) => b[1] - a[1]);

  // Big cities that are safe
  const safeBigCities = large.filter(c => c.population >= 300000 && c.violentRate < natRate)
    .sort((a, b) => a.violentRate - b.violentRate);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Safest Cities in America 2025' }]} />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Safest Cities in America 2025: Complete Rankings</h1>
      <p className="text-lg text-gray-600 mb-6">
        Looking for a safe place to live? We ranked {large.length} US cities with populations over 100,000
        by their violent crime rates. The safest cities have rates 70-90% below the national average —
        proving that low crime and city living aren&apos;t mutually exclusive.
      </p>

      <AIOverview insights={[
        `Safest large city: ${safest[0].city}, ${safest[0].state} at just ${fmtRate(safest[0].violentRate)} violent crimes per 100K`,
        `That's ${((1 - safest[0].violentRate / natRate) * 100).toFixed(0)}% below the national rate of ${fmtRate(natRate)} per 100K`,
        `${topSafeStates[0] ? `${topSafeStates[0][0]} has the most cities in the top 50 safest (${topSafeStates[0][1]})` : 'Safe cities are spread across many states'}`,
        `${safeBigCities.length} cities over 300K population have below-average crime rates`,
        `The safest city's violent crime rate is ${(safest[0].violentRate).toFixed(0)} per 100K — safer than many European capitals`,
      ]} />

      <ShareButtons title="Safest Cities in America 2025" />

      {/* Highlight box */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-700">{safest[0].city}</div>
            <div className="text-sm text-gray-600">#1 Safest City</div>
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

      {/* Top 25 safest */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">The 25 Safest Large Cities</h2>
      <p className="text-gray-700 mb-4">
        These cities combine the benefits of urban living (jobs, amenities, infrastructure) with remarkably
        low crime rates. All have populations over 100,000.
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">City</th><th className="py-2 text-right">Population</th><th className="py-2 text-right">Violent Rate</th><th className="py-2 text-right">Property Rate</th><th className="py-2 text-center">vs National</th></tr></thead>
          <tbody>
            {safest.slice(0, 25).map((c, i) => (
              <tr key={c.slug} className="border-b hover:bg-gray-50">
                <td className="py-1">{i + 1}</td>
                <td><Link href={`/crime-rate-in/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city}, {c.state}</Link></td>
                <td className="text-right font-mono">{fmtNum(c.population)}</td>
                <td className="text-right font-mono font-bold text-green-700">{fmtRate(c.violentRate)}</td>
                <td className="text-right font-mono">{fmtRate(c.propertyRate)}</td>
                <td className="text-center font-mono text-green-600">-{((1 - c.violentRate / natRate) * 100).toFixed(0)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Safe big cities */}
      {safeBigCities.length > 0 && (
        <>
          <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Safe Big Cities (300K+ Population)</h2>
          <p className="text-gray-700 mb-4">
            You don&apos;t have to live in a small city to feel safe. These major cities with 300,000+
            residents have violent crime rates below the national average:
          </p>
          <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
            <table className="w-full text-sm">
              <thead><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">City</th><th className="py-2 text-right">Population</th><th className="py-2 text-right">Violent Rate</th><th className="py-2 text-right">Murder Rate</th></tr></thead>
              <tbody>
                {safeBigCities.slice(0, 15).map((c, i) => (
                  <tr key={c.slug} className="border-b">
                    <td className="py-1">{i + 1}</td>
                    <td><Link href={`/crime-rate-in/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city}, {c.state}</Link></td>
                    <td className="text-right font-mono">{fmtNum(c.population)}</td>
                    <td className="text-right font-mono text-green-700">{fmtRate(c.violentRate)}</td>
                    <td className="text-right font-mono">{fmtRate(c.murderRate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Safest by property crime */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Lowest Property Crime Rates</h2>
      <p className="text-gray-700 mb-4">
        Property crime — burglary, theft, car break-ins — affects daily quality of life more than violent crime
        statistics. These cities have the lowest property crime rates:
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">City</th><th className="py-2 text-right">Property Rate</th><th className="py-2 text-right">Violent Rate</th></tr></thead>
          <tbody>
            {safestByProperty.slice(0, 10).map((c, i) => (
              <tr key={c.slug} className="border-b">
                <td className="py-1">{i + 1}</td>
                <td><Link href={`/crime-rate-in/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city}, {c.state}</Link></td>
                <td className="text-right font-mono text-green-700">{fmtRate(c.propertyRate)}</td>
                <td className="text-right font-mono">{fmtRate(c.violentRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Which states have the most safe cities */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Which States Have the Most Safe Cities?</h2>
      <p className="text-gray-700 mb-4">
        Some states dominate the safest cities list. Here&apos;s how many of the top 50 safest large cities each
        state claims:
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {topSafeStates.slice(0, 9).map(([state, count]) => (
          <div key={state} className="bg-white rounded-xl shadow-sm border p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{count}</div>
            <div className="text-sm text-gray-600">{state}</div>
          </div>
        ))}
      </div>
      <p className="text-gray-700 mb-4">
        For state-level safety rankings, see our <Link href="/safest-cities-in/florida" className="text-[#1e3a5f] hover:underline">safest cities in Florida</Link>,{' '}
        <Link href="/safest-cities-in/texas" className="text-[#1e3a5f] hover:underline">Texas</Link>, and{' '}
        <Link href="/safest-cities-in/california" className="text-[#1e3a5f] hover:underline">California</Link> pages,
        or explore <Link href="/analysis/crime-statistics-by-state" className="text-[#1e3a5f] hover:underline">crime statistics by state</Link>.
      </p>

      {/* What makes cities safe */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">What Makes a City Safe?</h2>
      <p className="text-gray-700 mb-4">
        The safest cities in America share several common characteristics:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
        <li><strong>Economic stability:</strong> Low unemployment, higher median incomes, and less income inequality. The <Link href="/analysis/crime-and-poverty" className="text-[#1e3a5f] hover:underline">poverty-crime link</Link> works in reverse too — prosperity reduces crime.</li>
        <li><strong>Education levels:</strong> Cities with higher rates of college education consistently appear on safe city lists.</li>
        <li><strong>Suburban character:</strong> Many of the safest &quot;cities&quot; are actually suburban communities near major metros — they benefit from metro amenities while maintaining lower density.</li>
        <li><strong>Adequate policing:</strong> Effective community policing and adequate <Link href="/analysis/police-staffing-crisis" className="text-[#1e3a5f] hover:underline">police staffing</Link> correlate with lower crime rates.</li>
        <li><strong>Community cohesion:</strong> Areas with strong social networks, community organizations, and civic engagement tend to be safer.</li>
      </ul>

      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">A Word of Caution</h2>
      <p className="text-gray-700 mb-4">
        &quot;Safe&quot; is relative. Even the safest cities on this list experience some crime. And city boundaries can
        be misleading — a &quot;safe&quot; city surrounded by higher-crime areas may feel different than its statistics
        suggest. Always research specific neighborhoods and visit in person before making relocation decisions.
      </p>
      <p className="text-gray-700 mb-4">
        Also remember that property crime rates don&apos;t always track with violent crime rates. A city can be
        very safe from violence but still have high rates of car break-ins or package theft. Use our{' '}
        <Link href="/is-it-safe" className="text-[#1e3a5f] hover:underline">&quot;Is It Safe?&quot; tool</Link> to check
        specific cities across multiple dimensions.
      </p>

      {/* Full top 50 */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Full Top 50 Safest Cities</h2>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6 max-h-[500px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-white"><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">City</th><th className="py-2 text-right">Pop.</th><th className="py-2 text-right">Violent</th><th className="py-2 text-right">Property</th></tr></thead>
          <tbody>
            {top50.map((c, i) => (
              <tr key={c.slug} className="border-b hover:bg-gray-50">
                <td className="py-1">{i + 1}</td>
                <td><Link href={`/crime-rate-in/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city}, {c.state}</Link></td>
                <td className="text-right font-mono">{fmtNum(c.population)}</td>
                <td className="text-right font-mono text-green-700">{fmtRate(c.violentRate)}</td>
                <td className="text-right font-mono">{fmtRate(c.propertyRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mt-10">
        <h3 className="font-heading text-lg font-bold mb-3">Related</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <Link href="/safest-cities" className="text-[#1e3a5f] hover:underline">Safest Cities Rankings →</Link>
          <Link href="/most-dangerous-cities" className="text-[#1e3a5f] hover:underline">Most Dangerous Cities →</Link>
          <Link href="/analysis/safest-places-to-live" className="text-[#1e3a5f] hover:underline">Safest Places to Live →</Link>
          <Link href="/is-it-safe" className="text-[#1e3a5f] hover:underline">Is It Safe? Tool →</Link>
          <Link href="/analysis/crime-statistics-by-state" className="text-[#1e3a5f] hover:underline">Crime by State →</Link>
          <Link href="/cities" className="text-[#1e3a5f] hover:underline">Browse All Cities →</Link>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Safest Cities in America 2025',
        description: 'The 50 safest US cities ranked by violent crime rate using FBI data.',
        url: 'https://www.opencrime.us/analysis/safest-cities-america',
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the safest city in America?', acceptedAnswer: { '@type': 'Answer', text: `${safest[0].city}, ${safest[0].state} has the lowest violent crime rate among large US cities at ${fmtRate(safest[0].violentRate)} per 100,000 — ${((1 - safest[0].violentRate / natRate) * 100).toFixed(0)}% below the national average.` }},
          { '@type': 'Question', name: 'Which states have the safest cities?', acceptedAnswer: { '@type': 'Answer', text: `${topSafeStates.slice(0, 3).map(([s, c]) => `${s} (${c} cities)`).join(', ')} have the most cities in the top 50 safest.` }},
          { '@type': 'Question', name: 'Can big cities be safe?', acceptedAnswer: { '@type': 'Answer', text: `Yes — ${safeBigCities.length} cities with 300,000+ residents have below-average violent crime rates.` }},
        ],
      })}} />

      <RelatedAnalysis currentSlug="safest-cities-america" />
    </div>
  );
}
