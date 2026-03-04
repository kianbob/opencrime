'use client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

type HomicideData = {
  weaponBreakdown: { weapon: string; count: number }[];
  victimAge: { range: string; count: number }[];
  yearlyWeapons: { year: number; firearm: number; knife: number; other: number; hands: number }[];
};

const COLORS = ['#dc2626', '#ef4444', '#f87171', '#1e3a5f', '#3b82f6', '#6b7280', '#9ca3af', '#d1d5db'];

export default function GunCharts({ data }: { data: HomicideData }) {
  const top = data.weaponBreakdown.slice(0, 6);

  return (
    <div className="space-y-8 my-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-heading text-lg font-bold mb-4">Murder Weapons Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={top} dataKey="count" nameKey="weapon" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                {top.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-heading text-lg font-bold mb-4">Victim Age Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.victimAge}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#dc2626" name="Victims" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {data.yearlyWeapons.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-heading text-lg font-bold mb-4">Murder Weapons by Year</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data.yearlyWeapons}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="firearm" stackId="a" fill="#dc2626" name="Firearms" />
              <Bar dataKey="knife" stackId="a" fill="#1e3a5f" name="Knives" />
              <Bar dataKey="hands" stackId="a" fill="#6b7280" name="Hands/Fists" />
              <Bar dataKey="other" stackId="a" fill="#d1d5db" name="Other" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
