'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

type NT = { year: number; violentRate: number; homicideRate: number; propertyRate: number };

export default function DeclineCharts({ data }: { data: NT[] }) {
  return (
    <div className="space-y-8 my-8">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="font-heading text-xl font-bold mb-4">Violent Crime Rate 1979–2024</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(v) => Number(v ?? 0).toFixed(1)} />
            <Area type="monotone" dataKey="violentRate" stroke="#1e3a5f" fill="#1e3a5f20" name="Violent Rate" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 mt-2">Gap in 2017–2020 due to FBI SRS→NIBRS transition</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="font-heading text-xl font-bold mb-4">Murder vs Property Rate (Indexed to 1979=100)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data.map(d => ({
            year: d.year,
            murder: d.homicideRate > 0 ? Math.round(d.homicideRate / data[0].homicideRate * 100) : null,
            property: d.propertyRate > 0 ? Math.round(d.propertyRate / data[0].propertyRate * 100) : null,
          }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="murder" stroke="#dc2626" name="Murder Rate (indexed)" strokeWidth={2} dot={false} connectNulls />
            <Line type="monotone" dataKey="property" stroke="#1e3a5f" name="Property Rate (indexed)" strokeWidth={2} dot={false} connectNulls />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
