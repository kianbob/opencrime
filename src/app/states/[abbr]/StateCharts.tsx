'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';

type YearData = {
  year: number; violentRate: number; homicideRate: number; propertyRate: number;
  violentCrime: number; homicide: number; rape: number; robbery: number; aggravatedAssault: number;
  propertyCrime: number; burglary: number; larceny: number; motorVehicleTheft: number;
};

export default function StateCharts({ years, stateName }: { years: YearData[]; stateName: string }) {
  const latest = years[years.length - 1];
  const violentBreakdown = [
    { name: 'Agg. Assault', value: latest.aggravatedAssault },
    { name: 'Robbery', value: latest.robbery },
    { name: 'Rape', value: latest.rape },
    { name: 'Murder', value: latest.homicide },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="font-heading text-xl font-bold mb-4">Violent Crime Rate Trend</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={years}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(v) => Number(v ?? 0).toFixed(1)} />
            <Legend />
            <Line type="monotone" dataKey="violentRate" stroke="#dc2626" name="Violent Crime Rate" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="propertyRate" stroke="#1e3a5f" name="Property Crime Rate" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="font-heading text-xl font-bold mb-4">Homicide Rate Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={years}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(v) => Number(v ?? 0).toFixed(2)} />
            <Line type="monotone" dataKey="homicideRate" stroke="#991b1b" name="Homicide Rate" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="font-heading text-xl font-bold mb-4">Violent Crime Breakdown ({latest.year})</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={violentBreakdown} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={100} />
            <Tooltip formatter={(v) => Number(v ?? 0).toLocaleString()} />
            <Bar dataKey="value" fill="#dc2626" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
