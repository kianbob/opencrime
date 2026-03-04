'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

type Weapon = { weapon: string; count: number };
type Yearly = { year: number; firearm: number; knife: number; hands: number; other: number };

const PIE_COLORS = ['#dc2626', '#ea580c', '#d97706', '#65a30d', '#0284c7', '#7c3aed', '#be185d', '#525252'];

export default function WeaponCharts({ yearly, weapons }: { yearly: Yearly[]; weapons: Weapon[] }) {
  const pieData = weapons.slice(0, 8).map(w => ({ name: w.weapon.replace(/[12,]/g, '').trim(), value: w.count }));

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="font-heading text-xl font-bold mb-4">Murder Weapons Over Time (2020-2024)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={yearly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(v) => Number(v ?? 0).toLocaleString()} />
            <Legend />
            <Area type="monotone" dataKey="firearm" stackId="1" fill="#dc2626" stroke="#dc2626" name="Firearms" />
            <Area type="monotone" dataKey="knife" stackId="1" fill="#ea580c" stroke="#ea580c" name="Knives" />
            <Area type="monotone" dataKey="hands" stackId="1" fill="#d97706" stroke="#d97706" name="Hands/Fists" />
            <Area type="monotone" dataKey="other" stackId="1" fill="#6b7280" stroke="#6b7280" name="Other" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="font-heading text-xl font-bold mb-4">2024 Weapon Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={110} dataKey="value"
              label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
              {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
            </Pie>
            <Tooltip formatter={(v) => Number(v ?? 0).toLocaleString()} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
