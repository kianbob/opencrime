import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import CargoCharts from './CargoCharts';

export const metadata: Metadata = {
  title: 'Cargo Theft Statistics 2012–2024 — 272K Incidents by State & Year',
  description: 'FBI cargo theft data: 272,000+ incidents from 2012-2024. Trends, state rankings, offense types. The hidden cost of freight crime in America.',
};

type CargoData = {
  totalIncidents: number;
  byYear: { year: number; count: number }[];
  byState: { state: string; count: number }[];
  byOffense: { offense: string; count: number }[];
};

export default function CargoTheftPage() {
  const data = loadData<CargoData>('cargo-theft.json');
  const latest = data.byYear[data.byYear.length - 1];
  const prev = data.byYear[data.byYear.length - 2];
  const yoyChange = prev ? ((latest.count - prev.count) / prev.count * 100).toFixed(1) : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Cargo Theft Statistics</h1>
      <p className="text-lg text-gray-600 mb-8">
        FBI cargo theft data: {fmtNum(data.totalIncidents)} reported incidents from 2012 to 2024. 
        Freight crime is a growing problem that costs businesses billions annually.
      </p>

      <div className="bg-amber-900 text-white rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{fmtNum(data.totalIncidents)}</div>
            <div className="text-amber-200 text-sm">Total Incidents (2012-2024)</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtNum(latest.count)}</div>
            <div className="text-amber-200 text-sm">{latest.year} Incidents</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{yoyChange != null ? `${+yoyChange > 0 ? '+' : ''}${yoyChange}%` : '—'}</div>
            <div className="text-amber-200 text-sm">Year-over-Year Change</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{data.byState.length}</div>
            <div className="text-amber-200 text-sm">States Reporting</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">The Growing Cargo Theft Problem</h2>
        <p>
          Cargo theft — the stealing of freight in transit, at distribution centers, or from truck 
          stops — is one of the fastest-growing property crimes in America. The FBI tracks cargo theft 
          through a dedicated reporting program, capturing incidents from law enforcement agencies nationwide.
        </p>
        <p>
          Reported incidents have more than tripled from {fmtNum(data.byYear[0].count)} in {data.byYear[0].year} to {fmtNum(latest.count)} in {latest.year}. 
          The true cost is likely much higher — industry estimates put annual cargo theft losses at 
          $15-35 billion, as many thefts go unreported or are classified under other offense categories.
        </p>
        <p>
          Cargo theft has evolved from opportunistic trailer break-ins to sophisticated operations 
          involving fictitious pickups, identity fraud, and organized crime rings. The rise of 
          e-commerce has created more targets and more opportunities for theft throughout the 
          supply chain.
        </p>
      </div>

      <CargoCharts data={data} />

      <h2 className="font-heading text-2xl font-bold mb-4 mt-8">Cargo Theft by State</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead className="bg-amber-50 sticky top-0">
            <tr>
              <th className="text-left px-3 py-2">#</th>
              <th className="text-left px-3 py-2">State</th>
              <th className="text-right px-3 py-2">Total Incidents</th>
              <th className="text-right px-3 py-2">% of National</th>
            </tr>
          </thead>
          <tbody>
            {data.byState.slice(0, 30).map((s, i) => (
              <tr key={s.state} className="border-t hover:bg-amber-50/50">
                <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                <td className="px-3 py-2 font-medium">{s.state}</td>
                <td className="px-3 py-2 text-right font-mono font-semibold">{fmtNum(s.count)}</td>
                <td className="px-3 py-2 text-right font-mono text-gray-500">{(s.count / data.totalIncidents * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.byOffense.length > 0 && (
        <>
          <h2 className="font-heading text-2xl font-bold mb-4">By Offense Type</h2>
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">Offense</th>
                  <th className="text-right px-4 py-2">Incidents</th>
                  <th className="text-right px-4 py-2">%</th>
                </tr>
              </thead>
              <tbody>
                {data.byOffense.slice(0, 10).map(o => (
                  <tr key={o.offense} className="border-t">
                    <td className="px-4 py-2">{o.offense}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtNum(o.count)}</td>
                    <td className="px-4 py-2 text-right font-mono text-gray-500">{(o.count / data.totalIncidents * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/crimes" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Crime Types</Link>
        <Link href="/analysis/property-crime-surge" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Property Crime Analysis</Link>
      </div>

      <div className="mt-8"><ShareButtons title="Cargo Theft Statistics" /></div>

      <p className="text-sm text-gray-500 mt-8">Source: FBI Cargo Theft program, 2012-2024. Not all agencies report; actual numbers are higher.</p>
    </div>
  );
}
