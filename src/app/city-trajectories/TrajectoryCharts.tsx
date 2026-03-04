'use client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type Props = {
  chartData: { name: string; count: number; color: string }[];
};

export default function TrajectoryCharts({ chartData }: Props) {
  return (
    <section className="mb-10">
      <h2 className="font-display text-2xl font-bold text-[#1e3a5f] mb-4">Trajectory Distribution</h2>
      <div className="bg-white border rounded-xl p-4" style={{ height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={chartData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={140} label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}>
              {chartData.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Pie>
            <Tooltip formatter={(v) => Number(v).toLocaleString()} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
