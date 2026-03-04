import RelatedAnalysis from '@/components/RelatedAnalysis';
import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { CityIndex, StateSummary } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Rural vs Urban Crime: Shattering the Myths',
  description: 'Crime isn\'t just a big-city problem. Data analysis shows small cities often have higher per-capita violent crime than major metros. FBI data for 9,700+ cities.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/rural-vs-urban' },
};

export default function RuralVsUrbanPage() {
  const cities = loadData<CityIndex[]>('city-index.json');
  const large = cities.filter(c => c.population >= 250000);
  const midsize = cities.filter(c => c.population >= 100000 && c.population < 250000);
  const small = cities.filter(c => c.population >= 25000 && c.population < 100000);
  const tiny = cities.filter(c => c.population < 25000 && c.population > 0);

  const avg = (arr: CityIndex[]) => arr.length > 0 ? arr.reduce((s, c) => s + c.violentRate, 0) / arr.length : 0;
  const avgMurder = (arr: CityIndex[]) => arr.length > 0 ? arr.reduce((s, c) => s + c.murderRate, 0) / arr.length : 0;

  const categories = [
    { label: 'Large cities (250K+)', cities: large, count: large.length },
    { label: 'Mid-size (100K–250K)', cities: midsize, count: midsize.length },
    { label: 'Small cities (25K–100K)', cities: small, count: small.length },
    { label: 'Towns (<25K)', cities: tiny, count: tiny.length },
  ];

  // Find small cities with higher violence than big cities avg
  const largeCityAvg = avg(large);
  const dangerousSmall = small.filter(c => c.violentRate > largeCityAvg).sort((a, b) => b.violentRate - a.violentRate);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/analysis" className="hover:underline">Analysis</Link> / <span className="text-gray-800">Rural vs Urban</span>
      </nav>
      <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">Rural vs Urban Crime: Shattering the Myths</h1>
      <p className="text-lg text-gray-600 mb-8">
        The popular image of crime as a big-city problem is misleading. Smaller cities often have 
        higher per-capita violence than major metros. Here&apos;s what the data actually shows.
      </p>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3">City Size</th>
              <th className="text-right px-4 py-3">Count</th>
              <th className="text-right px-4 py-3">Avg Violent Rate</th>
              <th className="text-right px-4 py-3">Avg Murder Rate</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.label} className="border-t">
                <td className="px-4 py-3 font-medium">{cat.label}</td>
                <td className="px-4 py-3 text-right font-mono">{fmtNum(cat.count)}</td>
                <td className="px-4 py-3 text-right font-mono text-red-600">{fmtRate(avg(cat.cities))}</td>
                <td className="px-4 py-3 text-right font-mono">{avgMurder(cat.cities).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Big-City Myth</h2>
        <p>
          When people think about crime, they think about New York, Chicago, Los Angeles. But the data tells 
          a more nuanced story. Large cities with 250,000+ residents have an average violent crime rate 
          of {fmtRate(avg(large))} per 100,000. Mid-size cities (100K–250K) average {fmtRate(avg(midsize))}.
        </p>
        <p>
          Many of the highest per-capita violent crime rates belong to mid-size and small cities — places like 
          Memphis, St. Louis, Birmingham, and Shreveport. These cities often have higher crime rates than 
          much larger metros like New York ({fmtRate(cities.find(c => c.city === 'New York')?.violentRate ?? 0)}) 
          or Los Angeles ({fmtRate(cities.find(c => c.city === 'Los Angeles')?.violentRate ?? 0)}).
        </p>

        <h2 className="font-heading">Why Small Cities Can Be More Dangerous</h2>
        <ul>
          <li><strong>Concentrated poverty.</strong> Small cities with declining industries face concentrated 
          poverty without the diversified economies that large metros offer. A shuttered factory can devastate 
          a town of 50,000 in ways that a city of 5 million absorbs.</li>
          <li><strong>Resource constraints.</strong> Smaller police departments may lack the specialized units, 
          technology, and investigative resources that big-city departments deploy.</li>
          <li><strong>Brain drain.</strong> Talented residents leave for bigger cities, hollowing out the 
          professional and tax base.</li>
          <li><strong>Scale effects.</strong> A few active offenders can dramatically affect a small city&apos;s 
          crime rate in ways that would be invisible in a large metro.</li>
        </ul>

        {dangerousSmall.length > 0 && (
          <>
            <h2 className="font-heading">Small Cities More Dangerous Than Average Large City</h2>
            <p>
              {dangerousSmall.length} cities with populations under 100,000 have violent crime rates 
              above the average for cities over 250,000 ({fmtRate(largeCityAvg)}):
            </p>
          </>
        )}
      </div>

      {dangerousSmall.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
          <table className="w-full text-sm">
            <thead className="bg-red-50">
              <tr>
                <th className="text-left px-3 py-2">City</th>
                <th className="text-right px-3 py-2">Pop</th>
                <th className="text-right px-3 py-2">Violent Rate</th>
                <th className="text-right px-3 py-2">Murder Rate</th>
              </tr>
            </thead>
            <tbody>
              {dangerousSmall.slice(0, 20).map(c => (
                <tr key={c.slug} className="border-t">
                  <td className="px-3 py-2">
                    <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city}, {c.state}</Link>
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
                  <td className="px-3 py-2 text-right font-mono text-red-600 font-semibold">{fmtRate(c.violentRate)}</td>
                  <td className="px-3 py-2 text-right font-mono">{c.murderRate.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Rural Exception</h2>
        <p>
          True rural areas — unincorporated counties, farming communities, remote towns — generally do have 
          lower crime rates than cities. But the difference is smaller than most people assume, and some rural 
          areas have surprisingly high violence, often driven by domestic violence, drug-related disputes, and 
          limited law enforcement presence.
        </p>
        <p>
          The real story isn&apos;t urban vs. rural — it&apos;s concentrated disadvantage vs. opportunity. 
          Crime clusters in specific neighborhoods regardless of whether the overall city is large or small. 
          A few blocks in a small city can drive its entire crime rate while most of the town remains safe.
        </p>

        <h2 className="font-heading">Policy Implications</h2>
        <p>
          If crime were purely a big-city problem, the solution would be simple: more big-city policing and 
          programs. But the data shows that violence and disorder affect communities of all sizes. Effective 
          crime reduction requires place-based strategies that address the specific conditions driving crime 
          in each community — not one-size-fits-all approaches based on city size.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/states" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Browse by State</Link>
        <Link href="/rankings" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">City Rankings</Link>
      </div>

      <div className="mt-8"><RelatedAnalysis currentSlug="rural-vs-urban" />

      <ShareButtons title="Rural vs Urban Crime: Shattering the Myths" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Rural vs Urban Crime: Shattering the Myths',
        publisher: { '@type': 'Organization', name: 'OpenCrime' },
        datePublished: '2026-03-04',
      })}} />
    </div>
  );
}
