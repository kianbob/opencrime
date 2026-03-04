'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

type ArrestData = {
  byAge: { age: string; count: number }[];
  byRace: { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number }[];
};

const COLORS = ['#1e3a5f', '#dc2626', '#f59e0b', '#10b981', '#6366f1', '#9ca3af'];

export default function ArrestCharts({ data }: { data: ArrestData }) {
  const raceTotal = data.byRace.find(r => r.offense === 'TOTAL');
  const raceData = raceTotal ? [
    { name: 'White', value: raceTotal.white },
    { name: 'Black', value: raceTotal.black },
    { name: 'Native American', value: raceTotal.nativeAmerican },
    { name: 'Asian', value: raceTotal.asian },
  ].filter(r => r.value > 0) : [];

  return (
    <div className="space-y-8 my-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-heading text-lg font-bold mb-4">Arrests by Age Group</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data.byAge.filter(a => a.count > 10000).slice(0, 15)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={v => `${(Number(v) / 1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="age" width={80} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => Number(v ?? 0).toLocaleString()} />
              <Bar dataKey="count" fill="#1e3a5f" name="Arrests" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-heading text-lg font-bold mb-4">Arrests by Race</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie data={raceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110}
                label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                {raceData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => Number(v ?? 0).toLocaleString()} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-400 mt-2">
            Based on 6.5M arrests from 14,000 reporting agencies. Proportions reflect arrest rates, not offending rates — significant disparities exist in policing patterns.
          </p>
        </div>
      </div>
    </div>
  );
}
