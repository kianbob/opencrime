'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type YearData = {
  year: number; violentRate: number; murderRate: number; propertyRate: number;
  violentCrime: number; propertyCrime: number;
};

export default function CityCharts({ yearData, cityName }: { yearData: YearData[]; cityName: string }) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="font-heading text-xl font-bold mb-4">Crime Rate Trends</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={yearData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(v) => Number(v ?? 0).toFixed(1)} />
            <Legend />
            <Line type="monotone" dataKey="violentRate" stroke="#dc2626" name="Violent Crime Rate" strokeWidth={2} />
            <Line type="monotone" dataKey="propertyRate" stroke="#1e3a5f" name="Property Crime Rate" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="font-heading text-xl font-bold mb-4">Murder Rate Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={yearData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(v) => Number(v ?? 0).toFixed(2)} />
            <Line type="monotone" dataKey="murderRate" stroke="#991b1b" name="Murder Rate" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
