'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type CargoData = {
  byYear: { year: number; count: number }[];
};

export default function CargoCharts({ data }: { data: CargoData }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 my-8">
      <h3 className="font-heading text-xl font-bold mb-4">Cargo Theft Incidents by Year</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data.byYear}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip formatter={(v) => Number(v ?? 0).toLocaleString()} />
          <Bar dataKey="count" fill="#92400e" name="Incidents" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
