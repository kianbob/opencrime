import { loadData, fmtNum, fmtRate, fmtPct } from '@/lib/utils';
import type { CityIndex } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Most Improved Cities 2024 — Biggest Crime Rate Drops',
  description: 'Which US cities saw the biggest crime rate improvements? Rankings of cities with the largest violent crime decreases, based on FBI 2024 data.',
  openGraph: { url: 'https://www.opencrime.us/most-improved' },
  alternates: { canonical: 'https://www.opencrime.us/most-improved' },
};

export default function MostImprovedPage() {
  const allCities = loadData<CityIndex[]>('city-index.json');
  const large = allCities.filter(c => c.population >= 100000 && c.violentChange != null && c.violentChange !== 0);
  const improved = [...large].sort((a, b) => (a.violentChange ?? 0) - (b.violentChange ?? 0));
  const worsened = [...large].sort((a, b) => (b.violentChange ?? 0) - (a.violentChange ?? 0));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Most Improved Cities 2024' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Most Improved & Most Worsened Cities 2024</h1>
      <p className="text-lg text-gray-600 mb-8">
        Year-over-year change in violent crime rate for cities with 100,000+ population.
        Which cities got safer — and which got more dangerous?
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Most Improved */}
        <div>
          <h2 className="font-heading text-2xl font-bold mb-4 text-green-700">Most Improved (Biggest Drops)</h2>
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-green-50">
                <tr>
                  <th className="text-left px-3 py-2">#</th>
                  <th className="text-left px-3 py-2">City</th>
                  <th className="text-right px-3 py-2">Change</th>
                  <th className="text-right px-3 py-2">Rate</th>
                </tr>
              </thead>
              <tbody>
                {improved.slice(0, 25).map((c, i) => (
                  <tr key={c.slug} className="border-t hover:bg-green-50/50">
                    <td className="px-3 py-2 text-green-700 font-bold">{i + 1}</td>
                    <td className="px-3 py-2">
                      <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline font-medium">{c.city}</Link>
                      <span className="text-gray-400 text-xs ml-1">{c.state}</span>
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-green-600 font-semibold">{fmtPct(c.violentChange ?? 0)}</td>
                    <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtRate(c.violentRate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Most Worsened */}
        <div>
          <h2 className="font-heading text-2xl font-bold mb-4 text-red-700">Most Worsened (Biggest Increases)</h2>
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-red-50">
                <tr>
                  <th className="text-left px-3 py-2">#</th>
                  <th className="text-left px-3 py-2">City</th>
                  <th className="text-right px-3 py-2">Change</th>
                  <th className="text-right px-3 py-2">Rate</th>
                </tr>
              </thead>
              <tbody>
                {worsened.filter(c => (c.violentChange ?? 0) > 0).slice(0, 25).map((c, i) => (
                  <tr key={c.slug} className="border-t hover:bg-red-50/50">
                    <td className="px-3 py-2 text-red-700 font-bold">{i + 1}</td>
                    <td className="px-3 py-2">
                      <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline font-medium">{c.city}</Link>
                      <span className="text-gray-400 text-xs ml-1">{c.state}</span>
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-red-600 font-semibold">{fmtPct(c.violentChange ?? 0)}</td>
                    <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtRate(c.violentRate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">What Drives Improvement?</h2>
        <p>
          Cities that see the biggest crime drops often share common factors: targeted violence intervention 
          programs, economic development in high-crime areas, improved community-police relations, or simply 
          regression to the mean after an unusually violent year.
        </p>
        <p>
          Conversely, cities with rising crime often face specific challenges: gang conflicts, drug market 
          disruptions, police staffing shortages, or economic shocks. Single-year changes can also be 
          driven by statistical noise in smaller cities where a handful of incidents can swing the rate.
        </p>
        <p>
          <strong>Important caveat:</strong> Year-over-year changes in smaller cities can be volatile. 
          A city of 100,000 can see its murder rate double from 5 to 10 murders — a 100% increase that 
          sounds alarming but represents just 5 additional incidents. Multi-year trends are more 
          reliable indicators than single-year swings.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/rankings" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">City Rankings</Link>
        <Link href="/dashboard" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">National Trends</Link>
      </div>

      <div className="mt-8"><ShareButtons title="Most Improved & Most Worsened Cities 2024" /></div>

      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer, 2024 vs 2023. Cities with 100K+ population only.</p>
    </div>
  );
}
