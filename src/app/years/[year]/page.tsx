import { loadData, fmtNum, fmtRate, fmtPct } from '@/lib/utils';
import type { NationalTrend } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import { notFound } from 'next/navigation';

export const dynamicParams = true;

export function generateStaticParams() {
  const national = loadData<NationalTrend[]>('national-trends.json');
  return national.map(n => ({ year: String(n.year) }));
}

export async function generateMetadata({ params }: { params: Promise<{ year: string }> }): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `${year} Crime Statistics — US Crime Rate in ${year}`,
    description: `US crime statistics for ${year}. Violent crime rate, murder rate, property crime, and all offense types from FBI data.`,
    openGraph: { title: `${year} US Crime Statistics`, description: `FBI crime data for ${year}` },
  };
}

export default async function YearDetailPage({ params }: { params: Promise<{ year: string }> }) {
  const { year: yearStr } = await params;
  const yearNum = parseInt(yearStr);
  const national = loadData<NationalTrend[]>('national-trends.json');
  const n = national.find(y => y.year === yearNum);
  if (!n) return notFound();

  const idx = national.findIndex(y => y.year === yearNum);
  const prev = idx > 0 ? national[idx - 1] : null;
  const next = idx < national.length - 1 ? national[idx + 1] : null;

  const vChange = prev ? ((n.violentRate - prev.violentRate) / prev.violentRate * 100) : null;
  const mChange = prev ? ((n.homicideRate - prev.homicideRate) / prev.homicideRate * 100) : null;
  const pChange = prev ? ((n.propertyRate - prev.propertyRate) / prev.propertyRate * 100) : null;

  const robberyRate = n.robbery / n.population * 100000;
  const assaultRate = n.aggravatedAssault / n.population * 100000;
  const rapeRate = n.rape / n.population * 100000;
  const burglaryRate = n.burglary / n.population * 100000;
  const larcenyRate = n.larceny / n.population * 100000;
  const mvtRate = n.motorVehicleTheft / n.population * 100000;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Years', href: '/years' }, { label: String(yearNum) }]} />

      <div className="flex items-center justify-between mb-6">
        <div>
          {prev && <Link href={`/years/${prev.year}`} className="text-[#1e3a5f] hover:underline text-sm">← {prev.year}</Link>}
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-bold">{yearNum} Crime Statistics</h1>
        <div>
          {next && <Link href={`/years/${next.year}`} className="text-[#1e3a5f] hover:underline text-sm">{next.year} →</Link>}
        </div>
      </div>

      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-sm text-blue-200">Population</div>
            <div className="text-2xl font-bold">{fmtNum(n.population)}</div>
          </div>
          <div>
            <div className="text-sm text-blue-200">Violent Crime Rate</div>
            <div className="text-2xl font-bold">{fmtRate(n.violentRate)}</div>
            {vChange != null && <div className={`text-sm ${vChange < 0 ? 'text-green-400' : 'text-red-400'}`}>{fmtPct(vChange)} YoY</div>}
          </div>
          <div>
            <div className="text-sm text-blue-200">Murder Rate</div>
            <div className="text-2xl font-bold">{fmtRate(n.homicideRate)}</div>
            {mChange != null && <div className={`text-sm ${mChange < 0 ? 'text-green-400' : 'text-red-400'}`}>{fmtPct(mChange)} YoY</div>}
          </div>
          <div>
            <div className="text-sm text-blue-200">Property Crime Rate</div>
            <div className="text-2xl font-bold">{fmtRate(n.propertyRate)}</div>
            {pChange != null && <div className={`text-sm ${pChange < 0 ? 'text-green-400' : 'text-red-400'}`}>{fmtPct(pChange)} YoY</div>}
          </div>
        </div>
      </div>

      <h2 className="font-heading text-2xl font-bold mb-4">Violent Crime Breakdown</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full">
          <thead className="bg-red-50">
            <tr>
              <th className="text-left px-4 py-2">Offense</th>
              <th className="text-right px-4 py-2">Total</th>
              <th className="text-right px-4 py-2">Rate per 100K</th>
              <th className="text-right px-4 py-2">% of Violent</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-t font-bold bg-red-50/50">
              <td className="px-4 py-2">Total Violent Crime</td>
              <td className="px-4 py-2 text-right font-mono">{fmtNum(n.violentCrime)}</td>
              <td className="px-4 py-2 text-right font-mono text-red-600">{fmtRate(n.violentRate)}</td>
              <td className="px-4 py-2 text-right">100%</td>
            </tr>
            {[
              { name: 'Aggravated Assault', count: n.aggravatedAssault, rate: assaultRate },
              { name: 'Robbery', count: n.robbery, rate: robberyRate },
              { name: 'Rape', count: n.rape, rate: rapeRate },
              { name: 'Murder', count: n.homicide, rate: n.homicideRate },
            ].map(o => (
              <tr key={o.name} className="border-t">
                <td className="px-4 py-2">{o.name}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(o.count)}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtRate(o.rate)}</td>
                <td className="px-4 py-2 text-right font-mono text-gray-500">{(o.count / n.violentCrime * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-heading text-2xl font-bold mb-4">Property Crime Breakdown</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full">
          <thead className="bg-blue-50">
            <tr>
              <th className="text-left px-4 py-2">Offense</th>
              <th className="text-right px-4 py-2">Total</th>
              <th className="text-right px-4 py-2">Rate per 100K</th>
              <th className="text-right px-4 py-2">% of Property</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-t font-bold bg-blue-50/50">
              <td className="px-4 py-2">Total Property Crime</td>
              <td className="px-4 py-2 text-right font-mono">{fmtNum(n.propertyCrime)}</td>
              <td className="px-4 py-2 text-right font-mono text-blue-700">{fmtRate(n.propertyRate)}</td>
              <td className="px-4 py-2 text-right">100%</td>
            </tr>
            {[
              { name: 'Larceny-Theft', count: n.larceny, rate: larcenyRate },
              { name: 'Burglary', count: n.burglary, rate: burglaryRate },
              { name: 'Motor Vehicle Theft', count: n.motorVehicleTheft, rate: mvtRate },
            ].map(o => (
              <tr key={o.name} className="border-t">
                <td className="px-4 py-2">{o.name}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(o.count)}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtRate(o.rate)}</td>
                <td className="px-4 py-2 text-right font-mono text-gray-500">{(o.count / n.propertyCrime * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link href="/years" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">All Years</Link>
        <Link href="/dashboard" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Dashboard</Link>
        <Link href="/states" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">By State</Link>
      </div>

      <div className="mt-8"><ShareButtons title={`${yearNum} Crime Statistics`} /></div>
      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer, {yearNum} national estimates.</p>
    </div>
  );
}
