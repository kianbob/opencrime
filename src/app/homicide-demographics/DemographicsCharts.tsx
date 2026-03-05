'use client';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#1e3a5f', '#dc2626', '#f59e0b', '#6b7280', '#10b981'];

type VictimRace = { race: string; total: number; male: number; female: number };
type OffenderRace = { race: string; total: number; pct: number };
type OffenderAge = { range: string; total: number; pct: number };

export function VictimRaceChart({ data }: { data: VictimRace[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Homicide Victims by Race</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="race" />
          <Tooltip formatter={(v) => Number(v ?? 0).toLocaleString()} />
          <Legend />
          <Bar dataKey="male" name="Male" fill="#1e3a5f" stackId="a" />
          <Bar dataKey="female" name="Female" fill="#dc2626" stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function OffenderRaceChart({ data }: { data: OffenderRace[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Offender Race Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="pct" nameKey="race" cx="50%" cy="50%" outerRadius={100} label={({ name, value }) => `${name}: ${value}%`}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(v) => `${Number(v ?? 0)}%`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function OffenderAgeChart({ data }: { data: OffenderAge[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Offender Age Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip formatter={(v) => Number(v ?? 0).toLocaleString()} />
          <Bar dataKey="total" name="Offenders" fill="#1e3a5f" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function GenderPieChart({ male, female, unknown, label }: { male: number; female: number; unknown?: number; label: string }) {
  const data = [
    { name: 'Male', value: male },
    { name: 'Female', value: female },
    ...(unknown && unknown > 0 ? [{ name: 'Unknown', value: unknown }] : []),
  ];
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="font-heading text-xl font-bold mb-4">{label} by Gender</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name}: ${value.toLocaleString()}`}>
            <Cell fill="#1e3a5f" />
            <Cell fill="#dc2626" />
            {unknown && unknown > 0 && <Cell fill="#6b7280" />}
          </Pie>
          <Tooltip formatter={(v) => Number(v ?? 0).toLocaleString()} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
