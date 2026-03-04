'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS: Record<string, string> = {
  'stable-safe': '#15803d',
  'improving': '#059669',
  'volatile': '#d97706',
  'worsening': '#dc2626',
  'stable-dangerous': '#991b1b',
  'unknown': '#9ca3af',
};

const LABELS: Record<string, string> = {
  'stable-safe': 'Stable Safe',
  'improving': 'Improving',
  'volatile': 'Volatile',
  'worsening': 'Worsening',
  'stable-dangerous': 'Stable Dangerous',
  'unknown': 'Insufficient Data',
};

export default function TrajectoryCharts({ trajectoryCount }: { trajectoryCount: Record<string, number> }) {
  const data = Object.entries(trajectoryCount)
    .filter(([k]) => k !== 'unknown')
    .map(([key, value]) => ({ name: LABELS[key] || key, value, color: COLORS[key] || '#999' }));

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="font-heading text-xl font-bold mb-4 text-center">All 9,739 Cities by Trajectory</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={110} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
            {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
          </Pie>
          <Tooltip formatter={(v) => Number(v ?? 0).toLocaleString()} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
