import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { CityIndex } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Most Dangerous & Safest Cities in America — 2024 Rankings',
  description: 'Complete rankings of the most dangerous and safest cities in America by violent crime rate. Based on FBI 2024 data for 9,700+ cities.',
};

export default function RankingsPage() {
  const allCities = loadData<CityIndex[]>('city-index.json');
  const large = allCities.filter(c => c.population >= 100000);
  const dangerous = [...large].sort((a, b) => b.violentRate - a.violentRate);
  const safest = [...large].sort((a, b) => a.violentRate - b.violentRate);
  const deadliest = [...large].sort((a, b) => b.murderRate - a.murderRate);

  const renderTable = (cities: CityIndex[], label: string, rateField: 'violentRate' | 'murderRate', color: string) => (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className={`px-4 py-3 ${color} text-white font-semibold`}>{label}</div>
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left px-3 py-2">#</th>
            <th className="text-left px-3 py-2">City</th>
            <th className="text-right px-3 py-2">Rate</th>
            <th className="text-right px-3 py-2">Population</th>
          </tr>
        </thead>
        <tbody>
          {cities.slice(0, 50).map((c, i) => (
            <tr key={c.slug} className="border-t hover:bg-gray-50">
              <td className="px-3 py-2 text-gray-400">{i + 1}</td>
              <td className="px-3 py-2">
                <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline font-medium">{c.city}</Link>
                <span className="text-gray-400 text-xs ml-1">{c.state}</span>
              </td>
              <td className="px-3 py-2 text-right font-mono">{fmtRate(c[rateField])}</td>
              <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-bold mb-2">City Crime Rankings</h1>
      <p className="text-gray-600 mb-8">
        {large.length} US cities with 100,000+ population, ranked by crime rate per 100,000 residents
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {renderTable(dangerous, 'Most Dangerous — Violent Crime Rate', 'violentRate', 'bg-red-700')}
        {renderTable(safest, 'Safest — Lowest Violent Crime Rate', 'violentRate', 'bg-green-700')}
      </div>

      <div className="mb-12">
        {renderTable(deadliest, 'Highest Murder Rate', 'murderRate', 'bg-red-900')}
      </div>

      <p className="text-sm text-gray-500">
        Source: FBI Crime Data Explorer. Rankings based on reported offenses per 100,000 residents. 
        Only cities with 100,000+ population included. Crime rates can be affected by reporting practices, 
        transient populations, and other factors.
      </p>
    </div>
  );
}
