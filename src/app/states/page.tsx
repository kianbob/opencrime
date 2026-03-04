import { loadData, fmtNum, fmtRate, fmtPct } from '@/lib/utils';
import type { StateSummary } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Crime by State — All 50 States + DC',
  description: 'Compare crime rates across all 50 US states and Washington DC. Violent crime, murder, property crime rates and year-over-year trends.',
};

export default function StatesPage() {
  const states = loadData<StateSummary[]>('state-summary.json');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-bold mb-2">Crime by State</h1>
      <p className="text-gray-600 mb-6">
        {states.length} states ranked by violent crime rate per 100,000 residents ({states[0]?.year} data)
      </p>

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="text-left px-4 py-3">#</th>
              <th className="text-left px-4 py-3">State</th>
              <th className="text-right px-4 py-3">Population</th>
              <th className="text-right px-4 py-3">Violent Rate</th>
              <th className="text-right px-4 py-3">Murder Rate</th>
              <th className="text-right px-4 py-3">Property Rate</th>
              <th className="text-right px-4 py-3">YoY Change</th>
            </tr>
          </thead>
          <tbody>
            {states.map((s, i) => (
              <tr key={s.abbr} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                <td className="px-4 py-3">
                  <Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline font-medium">
                    {s.name}
                  </Link>
                  <span className="text-gray-400 text-xs ml-1">({s.abbr})</span>
                </td>
                <td className="px-4 py-3 text-right font-mono text-gray-500">{fmtNum(s.population)}</td>
                <td className="px-4 py-3 text-right font-mono font-semibold text-red-600">{fmtRate(s.violentRate)}</td>
                <td className="px-4 py-3 text-right font-mono">{fmtRate(s.homicideRate)}</td>
                <td className="px-4 py-3 text-right font-mono">{fmtRate(s.propertyRate)}</td>
                <td className={`px-4 py-3 text-right font-mono ${s.violentChange != null && s.violentChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {fmtPct(s.violentChange)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        Source: FBI Crime Data Explorer, SRS Estimated Crimes. Rates are per 100,000 residents. 
        Year-over-year change compares violent crime rates.
      </p>
    </div>
  );
}
