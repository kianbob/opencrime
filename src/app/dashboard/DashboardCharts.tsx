'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';

type NationalTrend = {
  year: number; population: number;
  violentCrime: number; violentRate: number;
  homicide: number; homicideRate: number;
  rape: number; robbery: number; aggravatedAssault: number;
  propertyCrime: number; propertyRate: number;
  burglary: number; larceny: number; motorVehicleTheft: number;
};

export default function DashboardCharts({ data }: { data: NationalTrend[] }) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="font-heading text-xl font-bold mb-4">Violent Crime Rate (1979–2024)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(v) => Number(v ?? 0).toFixed(1)} />
            <Area type="monotone" dataKey="violentRate" stroke="#dc2626" fill="#dc262620" name="Violent Crime Rate" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="font-heading text-xl font-bold mb-4">Homicide Rate (1979–2024)</h2>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(v) => Number(v ?? 0).toFixed(2)} />
            <Area type="monotone" dataKey="homicideRate" stroke="#991b1b" fill="#991b1b20" name="Homicide Rate" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="font-heading text-xl font-bold mb-4">Property Crime Rate (1979–2024)</h2>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(v) => Number(v ?? 0).toFixed(1)} />
            <Area type="monotone" dataKey="propertyRate" stroke="#1e3a5f" fill="#1e3a5f20" name="Property Crime Rate" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="font-heading text-xl font-bold mb-4">Crime Type Comparison</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(v) => Number(v ?? 0).toFixed(1)} />
            <Legend />
            <Line type="monotone" dataKey="homicideRate" stroke="#991b1b" name="Murder" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="robbery" stroke="#ea580c" name="Robbery" strokeWidth={1.5} dot={false} />
            <Line type="monotone" dataKey="aggravatedAssault" stroke="#dc2626" name="Agg. Assault" strokeWidth={1.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 mt-2">Note: Murder shown as rate per 100K; robbery and assault shown as raw counts (different scales)</p>
      </div>
    </div>
  );
}
