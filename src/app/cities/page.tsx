import { loadData, fmtNum, fmtRate, fmtPct } from '@/lib/utils';
import type { CityIndex } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Crime by City — 9,700+ US Cities',
  description: 'Browse crime statistics for 9,700+ US cities. Search, sort, and compare violent crime, murder, and property crime rates.',
  openGraph: { url: 'https://www.opencrime.us/cities' },
  alternates: { canonical: 'https://www.opencrime.us/cities' },
};

export default function CitiesPage() {
  const cities = loadData<CityIndex[]>('city-index.json');
  const topByPop = cities.slice(0, 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"Dataset","name":"Crime by City — 9,700+ US Cities","description":"Browse crime statistics for 9,700+ US cities. Search, sort, and compare violent crime, murder, and property crime rates.","url":"https://www.opencrime.us/cities","creator":{"@type":"Organization","name":"OpenCrime","url":"https://www.opencrime.us"},"license":"https://www.opencrime.us/about","sourceOrganization":"FBI Crime Data Explorer"}` }} />
      <h1 className="font-heading text-3xl font-bold mb-2">Crime by City</h1>
      <p className="text-gray-600 mb-6">
        {fmtNum(cities.length)} cities with FBI crime data. Showing largest 100 by population.
      </p>

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="text-left px-3 py-3">#</th>
              <th className="text-left px-3 py-3">City</th>
              <th className="text-left px-3 py-3">State</th>
              <th className="text-right px-3 py-3">Population</th>
              <th className="text-right px-3 py-3">Violent Rate</th>
              <th className="text-right px-3 py-3">Murder Rate</th>
              <th className="text-right px-3 py-3">Property Rate</th>
              <th className="text-right px-3 py-3">YoY</th>
            </tr>
          </thead>
          <tbody>
            {topByPop.map((c, i) => (
              <tr key={c.slug} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                <td className="px-3 py-2">
                  <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline font-medium">{c.city}</Link>
                </td>
                <td className="px-3 py-2 text-gray-500">{c.state}</td>
                <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
                <td className="px-3 py-2 text-right font-mono text-red-600">{fmtRate(c.violentRate)}</td>
                <td className="px-3 py-2 text-right font-mono">{fmtRate(c.murderRate)}</td>
                <td className="px-3 py-2 text-right font-mono">{fmtRate(c.propertyRate)}</td>
                <td className={`px-3 py-2 text-right font-mono ${c.violentChange != null && c.violentChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {fmtPct(c.violentChange)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center">
        <Link href="/search" className="text-[#1e3a5f] hover:underline font-medium">
          Search all {fmtNum(cities.length)} cities →
        </Link>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        Source: FBI Crime Data Explorer, Table 8. Rates per 100,000 residents.
      </p>
    </div>
  );
}
