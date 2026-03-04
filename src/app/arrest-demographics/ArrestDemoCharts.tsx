'use client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const RACE_COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#22c55e', '#8b5cf6'];
const SEX_COLORS = ['#6366f1', '#ec4899'];

type Props = {
  raceData: { name: string; value: number; pct: string }[];
  sexData: { name: string; value: number }[];
};

export default function ArrestDemoCharts({ raceData, sexData }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-10">
      <div>
        <h2 className="font-display text-xl font-bold text-[#1e3a5f] mb-2">Arrests by Race</h2>
        <div className="bg-white border rounded-xl p-4" style={{ height: 320 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={raceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(1)}%`} labelLine={true}>
                {raceData.map((_, i) => <Cell key={i} fill={RACE_COLORS[i % RACE_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => Number(v).toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <h2 className="font-display text-xl font-bold text-[#1e3a5f] mb-2">Arrests by Sex</h2>
        <div className="bg-white border rounded-xl p-4" style={{ height: 320 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={sexData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(1)}%`}>
                {sexData.map((_, i) => <Cell key={i} fill={SEX_COLORS[i % SEX_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => Number(v).toLocaleString()} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
