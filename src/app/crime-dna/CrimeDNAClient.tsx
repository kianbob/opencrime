'use client';
import { useState } from 'react';

type CityComp = {
  city: string; state: string; slug: string; population: number; violentRate: number;
  murderPct: number; rapePct: number; robberyPct: number; assaultPct: number;
};

const COLORS = { murder: '#991b1b', rape: '#9333ea', robbery: '#0369a1', assault: '#ea580c' };

function DNABar({ c, avg }: { c: CityComp; avg: { murderPct: number; rapePct: number; robberyPct: number; assaultPct: number } }) {
  return (
    <a href={`/cities/${c.slug}`} className="block bg-white border rounded-lg p-3 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-1">
        <p className="font-semibold text-sm truncate">{c.city}, {c.state}</p>
        <p className="text-xs text-gray-500">{c.violentRate.toFixed(0)}/100K</p>
      </div>
      {/* Stacked bar */}
      <div className="w-full h-6 rounded-full overflow-hidden flex">
        <div style={{ width: `${c.assaultPct}%`, backgroundColor: COLORS.assault }} title={`Assault: ${c.assaultPct}%`} />
        <div style={{ width: `${c.robberyPct}%`, backgroundColor: COLORS.robbery }} title={`Robbery: ${c.robberyPct}%`} />
        <div style={{ width: `${c.rapePct}%`, backgroundColor: COLORS.rape }} title={`Rape: ${c.rapePct}%`} />
        <div style={{ width: `${c.murderPct}%`, backgroundColor: COLORS.murder }} title={`Murder: ${c.murderPct}%`} />
      </div>
      <div className="flex gap-2 mt-1 text-[10px] text-gray-500">
        <span style={{ color: COLORS.assault }}>■ Assault {c.assaultPct}%</span>
        <span style={{ color: COLORS.robbery }}>■ Robbery {c.robberyPct}%</span>
        <span style={{ color: COLORS.rape }}>■ Rape {c.rapePct}%</span>
        <span style={{ color: COLORS.murder }}>■ Murder {c.murderPct}%</span>
      </div>
    </a>
  );
}

export default function CrimeDNAClient({ top50, avg }: { top50: CityComp[]; avg: { murderPct: number; rapePct: number; robberyPct: number; assaultPct: number } }) {
  const [sortBy, setSortBy] = useState<'population' | 'assault' | 'robbery' | 'murder'>('population');

  const sorted = [...top50].sort((a, b) => {
    if (sortBy === 'assault') return b.assaultPct - a.assaultPct;
    if (sortBy === 'robbery') return b.robberyPct - a.robberyPct;
    if (sortBy === 'murder') return b.murderPct - a.murderPct;
    return b.population - a.population;
  });

  return (
    <div>
      {/* National average bar */}
      <div className="bg-gray-100 rounded-xl p-4 mb-6">
        <p className="font-semibold text-sm mb-2">National Average Crime DNA</p>
        <div className="w-full h-8 rounded-full overflow-hidden flex">
          <div style={{ width: `${avg.assaultPct}%`, backgroundColor: COLORS.assault }} />
          <div style={{ width: `${avg.robberyPct}%`, backgroundColor: COLORS.robbery }} />
          <div style={{ width: `${avg.rapePct}%`, backgroundColor: COLORS.rape }} />
          <div style={{ width: `${avg.murderPct}%`, backgroundColor: COLORS.murder }} />
        </div>
        <div className="flex gap-3 mt-2 text-xs text-gray-600">
          <span style={{ color: COLORS.assault }}>■ Assault {avg.assaultPct}%</span>
          <span style={{ color: COLORS.robbery }}>■ Robbery {avg.robberyPct}%</span>
          <span style={{ color: COLORS.rape }}>■ Rape {avg.rapePct}%</span>
          <span style={{ color: COLORS.murder }}>■ Murder {avg.murderPct}%</span>
        </div>
      </div>

      {/* Sort controls */}
      <div className="flex gap-2 mb-4 text-sm">
        <span className="text-gray-500">Sort by:</span>
        {(['population', 'assault', 'robbery', 'murder'] as const).map(s => (
          <button key={s} onClick={() => setSortBy(s)} className={`px-3 py-1 rounded-full ${sortBy === s ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* DNA grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sorted.map(c => <DNABar key={c.slug} c={c} avg={avg} />)}
      </div>
    </div>
  );
}
