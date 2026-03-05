'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type CrimeItem = { crimeType: string; reported: number; estimatedActual: number; unreported: number; reportingRate: number };
type HiddenData = { year: number; source: string; crimes: CrimeItem[]; totals: { reported: number; estimatedActual: number; unreported: number; overallReportingRate: number } };

function fmt(n: number) { return n.toLocaleString('en-US'); }

export default function HiddenCrimeClient({ data }: { data: HiddenData }) {
  const chartData = data.crimes.map(c => ({
    name: c.crimeType.length > 18 ? c.crimeType.substring(0, 16) + '…' : c.crimeType,
    Reported: c.reported,
    Unreported: c.unreported,
  }));

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-red-700">{fmt(data.totals.unreported)}</div>
          <div className="text-sm text-gray-600 mt-1">Estimated Unreported Crimes</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-primary">{fmt(data.totals.reported)}</div>
          <div className="text-sm text-gray-600 mt-1">Reported to Police</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-amber-700">{data.totals.overallReportingRate}%</div>
          <div className="text-sm text-gray-600 mt-1">Overall Reporting Rate</div>
        </div>
      </div>

      <h2 className="font-display text-2xl font-bold text-primary mb-4">Reported vs. Estimated Actual Crime ({data.year})</h2>
      <div className="h-[400px] mb-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ bottom: 60 }}>
            <XAxis dataKey="name" angle={-35} textAnchor="end" tick={{ fontSize: 11 }} interval={0} />
            <YAxis tickFormatter={(v: number) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)} />
            <Tooltip formatter={(v) => fmt(Number(v))} />
            <Legend />
            <Bar dataKey="Reported" fill="#3b82f6" stackId="a" />
            <Bar dataKey="Unreported" fill="#ef4444" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2 className="font-display text-2xl font-bold text-primary mb-4">Crime-by-Crime Breakdown</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">Crime Type</th>
              <th className="text-right p-2">Reported</th>
              <th className="text-right p-2">Est. Actual</th>
              <th className="text-right p-2">Unreported</th>
              <th className="text-right p-2">Reporting Rate</th>
            </tr>
          </thead>
          <tbody>
            {data.crimes.map(c => (
              <tr key={c.crimeType} className="border-t hover:bg-gray-50">
                <td className="p-2 font-medium">{c.crimeType}</td>
                <td className="p-2 text-right font-mono">{fmt(c.reported)}</td>
                <td className="p-2 text-right font-mono">{fmt(c.estimatedActual)}</td>
                <td className="p-2 text-right font-mono text-red-600">{fmt(c.unreported)}</td>
                <td className="p-2 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${c.reportingRate * 100}%` }} />
                    </div>
                    <span className="font-mono">{(c.reportingRate * 100).toFixed(0)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
