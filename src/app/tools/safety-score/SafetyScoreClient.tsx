'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

type City = { s: string; c: string; st: string; p: number; vr: number; mr: number; pr: number };

function getGrade(violentRate: number): { grade: string; color: string; bg: string; desc: string } {
  if (violentRate < 100) return { grade: 'A+', color: 'text-green-700', bg: 'bg-green-100', desc: 'Exceptionally safe' };
  if (violentRate < 200) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-50', desc: 'Very safe' };
  if (violentRate < 300) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-50', desc: 'Safer than average' };
  if (violentRate < 400) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-50', desc: 'Near national average' };
  if (violentRate < 600) return { grade: 'D', color: 'text-orange-600', bg: 'bg-orange-50', desc: 'Above average crime' };
  if (violentRate < 1000) return { grade: 'F', color: 'text-red-600', bg: 'bg-red-50', desc: 'High crime rate' };
  return { grade: 'F-', color: 'text-red-800', bg: 'bg-red-100', desc: 'Extremely high crime' };
}

export default function SafetyScoreClient() {
  const [cities, setCities] = useState<City[]>([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/city-index-lite.json').then(r => r.json()).then(d => { setCities(d); setLoading(false); });
  }, []);

  const results = useMemo(() => query.length >= 2 ? cities.filter(c => c.c.toLowerCase().includes(query.toLowerCase())).slice(0, 8) : [], [query, cities]);
  const natAvg = 359.1;

  return (
    <div>
      <div className="relative mb-8">
        <input
          type="text" placeholder="Type a city name..."
          value={selected ? `${selected.c}, ${selected.st}` : query}
          onChange={e => { setQuery(e.target.value); if (selected) setSelected(null); }}
          onFocus={() => { if (selected) { setQuery(''); setSelected(null); }}}
          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-[#1e3a5f] focus:outline-none"
          autoFocus
        />
        {!selected && results.length > 0 && (
          <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
            {results.map(c => (
              <button key={c.s} onClick={() => { setSelected(c); setQuery(''); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm border-b last:border-0">
                <span className="font-medium">{c.c}</span>
                <span className="text-gray-400 ml-1">{c.st} · {c.p.toLocaleString()}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (() => {
        const g = getGrade(selected.vr);
        const pctVsNat = ((selected.vr / natAvg - 1) * 100);
        const percentile = Math.round(cities.filter(c => c.vr <= selected.vr).length / cities.length * 100);
        return (
          <div className={`${g.bg} rounded-xl p-8 text-center mb-8`}>
            <div className={`text-8xl font-bold ${g.color} mb-2`}>{g.grade}</div>
            <div className="text-xl font-semibold mb-1">{selected.c}, {selected.st}</div>
            <div className="text-gray-600 mb-4">{g.desc}</div>

            <div className="grid md:grid-cols-4 gap-4 mt-6 text-left">
              <div className="bg-white/60 rounded-lg p-3">
                <div className="text-sm text-gray-500">Violent Crime Rate</div>
                <div className={`text-xl font-bold ${g.color}`}>{selected.vr.toFixed(1)}</div>
                <div className="text-xs text-gray-400">per 100K residents</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="text-sm text-gray-500">Murder Rate</div>
                <div className="text-xl font-bold">{selected.mr.toFixed(2)}</div>
                <div className="text-xs text-gray-400">per 100K residents</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="text-sm text-gray-500">vs National Average</div>
                <div className={`text-xl font-bold ${pctVsNat < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {pctVsNat > 0 ? '+' : ''}{pctVsNat.toFixed(0)}%
                </div>
                <div className="text-xs text-gray-400">National: {natAvg}</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="text-sm text-gray-500">Safer Than</div>
                <div className="text-xl font-bold">{100 - percentile}%</div>
                <div className="text-xs text-gray-400">of US cities</div>
              </div>
            </div>

            <Link href={`/cities/${selected.s}`} className="inline-block mt-6 bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition text-sm">
              View Full Crime Data →
            </Link>
          </div>
        );
      })()}

      {loading && <p className="text-gray-500 text-center">Loading...</p>}

      <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
        <h2 className="font-heading text-xl font-bold mb-4">How Safety Grades Work</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {[
            { grade: 'A+', range: '< 100', desc: 'Exceptionally safe' },
            { grade: 'A', range: '100–199', desc: 'Very safe' },
            { grade: 'B', range: '200–299', desc: 'Safer than average' },
            { grade: 'C', range: '300–399', desc: 'Near average' },
            { grade: 'D', range: '400–599', desc: 'Above average crime' },
            { grade: 'F', range: '600–999', desc: 'High crime' },
            { grade: 'F-', range: '1,000+', desc: 'Extremely high' },
          ].map(g => (
            <div key={g.grade} className="border rounded-lg p-2 text-center">
              <div className="font-bold text-lg">{g.grade}</div>
              <div className="text-gray-500">{g.range}</div>
              <div className="text-xs text-gray-400">{g.desc}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Grades based on violent crime rate per 100,000 residents. National average (2024): 359.1.
        </p>
      </div>
    </div>
  );
}
