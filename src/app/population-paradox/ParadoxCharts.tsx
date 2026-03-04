'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type Bin = { label: string; count: number; avgViolentRate: number; avgMurderRate: number; avgPropertyRate: number };

export default function ParadoxCharts({ bins }: { bins: Bin[] }) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="font-heading text-xl font-bold mb-4">Average Violent Crime Rate by City Size</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={bins}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" angle={-25} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip formatter={(v) => Number(v ?? 0).toFixed(1)} />
            <Bar dataKey="avgViolentRate" fill="#dc2626" name="Avg Violent Rate" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-500 mt-2 text-center">
          Note the peak at 500K-1M — larger than mega-cities over 1M
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="font-heading text-xl font-bold mb-4">Murder Rate by City Size</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bins}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" angle={-25} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip formatter={(v) => Number(v ?? 0).toFixed(2)} />
            <Bar dataKey="avgMurderRate" fill="#991b1b" name="Avg Murder Rate" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
