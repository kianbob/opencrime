'use client';
import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

type YearCount = { year: number; count: number };
type Profession = { profession: string; rate: number };
type CircumstanceData = { name: string; value: number };

export default function OfficerSafetyCharts({
  killed,
  accidental,
  assaulted,
  professions,
  circumstances,
}: {
  killed: YearCount[];
  accidental: YearCount[];
  assaulted: YearCount[];
  professions: Profession[];
  circumstances: CircumstanceData[];
}) {
  const [tab, setTab] = useState<'killed' | 'assaulted' | 'accidental'>('killed');

  const trendData = killed.map((k, i) => ({
    year: k.year,
    killed: k.count,
    accidental: accidental[i]?.count || 0,
    assaulted: assaulted[i]?.count || 0,
  }));

  const CIRCUMSTANCE_COLORS = ['#dc2626', '#ea580c', '#d97706', '#2563eb', '#7c3aed', '#6b7280'];

  return (
    <div className="space-y-12">
      {/* Trend chart */}
      <section>
        <h2 className="font-display text-2xl font-bold text-primary mb-4">Officer Deaths &amp; Assaults Over Time</h2>
        <div className="flex gap-2 mb-4">
          {(['killed', 'assaulted', 'accidental'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${tab === t ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {t === 'killed' ? 'Feloniously Killed' : t === 'assaulted' ? 'Assaulted' : 'Accidentally Killed'}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-xl border p-4" style={{ height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            {tab === 'assaulted' ? (
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(v) => typeof v === 'number' ? v.toLocaleString() : v} />
                <Bar dataKey="assaulted" fill="#dc2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey={tab === 'killed' ? 'killed' : 'accidental'} stroke={tab === 'killed' ? '#dc2626' : '#f59e0b'} strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </section>

      {/* Killed by circumstance */}
      <section>
        <h2 className="font-display text-2xl font-bold text-primary mb-4">How Officers Are Killed</h2>
        <p className="text-gray-600 mb-4">Average annual felonious killings by circumstance (2019–2023)</p>
        <div className="bg-white rounded-xl border p-4" style={{ height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={circumstances} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={160} tick={{ fontSize: 13 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {circumstances.map((_, i) => (
                  <Cell key={i} fill={CIRCUMSTANCE_COLORS[i % CIRCUMSTANCE_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Dangerous professions comparison */}
      <section>
        <h2 className="font-display text-2xl font-bold text-primary mb-4">Officer Death Rate vs. Other Professions</h2>
        <p className="text-gray-600 mb-4">On-the-job fatality rate per 100,000 workers</p>
        <div className="bg-white rounded-xl border p-4" style={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={professions} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="profession" width={140} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="rate" radius={[0, 4, 4, 0]}>
                {professions.map((p, i) => (
                  <Cell key={i} fill={p.profession === 'Law enforcement' ? '#dc2626' : '#94a3b8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
