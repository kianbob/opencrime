'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type NationalTrend = { year: number; homicide: number; homicideRate: number; population: number };

export default function MurderCharts({ data }: { data: NationalTrend[] }) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="font-heading text-xl font-bold mb-4">US Murder Rate 1979–2024</h2>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(v) => Number(v ?? 0).toFixed(2)} />
            <Area type="monotone" dataKey="homicideRate" stroke="#991b1b" fill="#991b1b20" name="Murder Rate per 100K" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="font-heading text-xl font-bold mb-4">Total Murders by Year</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(v) => Number(v ?? 0).toLocaleString()} />
            <Area type="monotone" dataKey="homicide" stroke="#dc2626" fill="#dc262620" name="Total Murders" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
