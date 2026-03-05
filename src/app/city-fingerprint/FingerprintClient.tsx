'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

type Profile = { murderPct: number; rapePct: number; robberyPct: number; assaultPct: number; burglaryPct: number; larcenyPct: number; mvtPct: number };
type CityDNA = { slug: string; city: string; state: string; population: number; profile: Profile; personality: string; deviations: Record<string, number> };

const PERSONALITY_COLORS: Record<string, string> = {
  'Violent Hub': '#dc2626',
  'Assault Capital': '#ea580c',
  'Robbery Hotspot': '#d97706',
  'Homicide Zone': '#991b1b',
  'Property Target': '#2563eb',
  'Auto Theft Zone': '#7c3aed',
  'Theft Magnet': '#0891b2',
  'Balanced': '#6b7280',
};

const FIELDS = ['murder', 'rape', 'robbery', 'assault', 'burglary', 'larceny', 'mvt'] as const;
const FIELD_LABELS: Record<string, string> = {
  murder: 'Murder', rape: 'Rape', robbery: 'Robbery', assault: 'Assault',
  burglary: 'Burglary', larceny: 'Larceny', mvt: 'Auto Theft',
};

export default function FingerprintClient({ cities, nationalAvg }: { cities: CityDNA[]; nationalAvg: Profile }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<CityDNA | null>(null);

  const filtered = useMemo(() => {
    if (!search || search.length < 2) return [];
    return cities.filter(c => `${c.city} ${c.state}`.toLowerCase().includes(search.toLowerCase())).slice(0, 20);
  }, [cities, search]);

  const radarData = selected ? FIELDS.map(f => ({
    field: FIELD_LABELS[f],
    City: selected.profile[`${f}Pct` as keyof Profile],
    National: nationalAvg[`${f}Pct` as keyof Profile],
  })) : null;

  // Find similar cities
  const similar = useMemo(() => {
    if (!selected) return [];
    return cities
      .filter(c => c.slug !== selected.slug && c.personality === selected.personality)
      .map(c => {
        const dist = FIELDS.reduce((sum, f) => {
          const diff = c.profile[`${f}Pct` as keyof Profile] - selected.profile[`${f}Pct` as keyof Profile];
          return sum + diff * diff;
        }, 0);
        return { ...c, dist };
      })
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 10);
  }, [cities, selected]);

  // Personality distribution
  const personalities = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of cities) {
      counts[c.personality] = (counts[c.personality] || 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [cities]);

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-primary mb-4">Search Your City</h2>
      <input
        type="text" placeholder="Type a city name..."
        value={search} onChange={e => { setSearch(e.target.value); setSelected(null); }}
        className="border rounded-lg px-4 py-3 w-full text-lg mb-2"
      />
      {filtered.length > 0 && !selected && (
        <div className="border rounded-lg bg-white shadow-lg max-h-60 overflow-y-auto mb-6">
          {filtered.map(c => (
            <button key={c.slug} onClick={() => { setSelected(c); setSearch(`${c.city}, ${c.state}`); }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 flex justify-between items-center">
              <span>{c.city}, {c.state}</span>
              <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: PERSONALITY_COLORS[c.personality] || '#6b7280' }}>{c.personality}</span>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="mt-6">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="font-display text-3xl font-bold">{selected.city}, {selected.state}</h2>
            <span className="px-3 py-1 rounded-full text-white text-sm font-semibold" style={{ backgroundColor: PERSONALITY_COLORS[selected.personality] || '#6b7280' }}>
              {selected.personality}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData!}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="field" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend />
                  <Radar name={selected.city} dataKey="City" stroke="#dc2626" fill="#dc2626" fillOpacity={0.3} />
                  <Radar name="National Avg" dataKey="National" stroke="#6b7280" fill="#6b7280" fillOpacity={0.1} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Crime Profile vs National Average</h3>
              <div className="space-y-2">
                {FIELDS.map(f => {
                  const dev = selected.deviations[f] || 0;
                  return (
                    <div key={f} className="flex items-center gap-3">
                      <span className="w-20 text-sm text-gray-600">{FIELD_LABELS[f]}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-4 relative">
                        <div className={`h-4 rounded-full ${dev > 0 ? 'bg-red-400' : 'bg-green-400'}`}
                          style={{ width: `${Math.min(Math.abs(dev) * 5, 100)}%` }} />
                      </div>
                      <span className={`text-sm font-mono w-16 text-right ${dev > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {dev > 0 ? '+' : ''}{dev.toFixed(1)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <h3 className="font-semibold mt-6 mb-3">Similar Cities (Same Crime DNA)</h3>
              <div className="space-y-1">
                {similar.map(c => (
                  <Link key={c.slug} href={`/cities/${c.slug}`} className="flex justify-between text-sm py-1 hover:text-primary">
                    <span>{c.city}, {c.state}</span>
                    <span className="text-gray-400">Pop: {c.population.toLocaleString()}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <h2 className="font-display text-2xl font-bold text-primary mt-10 mb-4">Crime Personality Distribution</h2>
      <p className="text-gray-500 text-sm mb-4">Among the top 500 US cities by population:</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {personalities.map(([personality, count]) => (
          <div key={personality} className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: PERSONALITY_COLORS[personality] || '#6b7280' }}>{count}</div>
            <div className="text-sm text-gray-600">{personality}</div>
            <div className="text-xs text-gray-400">{Math.round(count / cities.length * 100)}%</div>
          </div>
        ))}
      </div>

      <h2 className="font-display text-2xl font-bold text-primary mb-4">All City Profiles</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">City</th>
              <th className="text-left p-2">State</th>
              <th className="text-center p-2">Personality</th>
              <th className="text-right p-2">Murder%</th>
              <th className="text-right p-2">Robbery%</th>
              <th className="text-right p-2">Assault%</th>
              <th className="text-right p-2">Larceny%</th>
              <th className="text-right p-2">Auto%</th>
            </tr>
          </thead>
          <tbody>
            {cities.slice(0, 100).map(c => (
              <tr key={c.slug} className="border-t hover:bg-gray-50">
                <td className="p-2"><Link href={`/cities/${c.slug}`} className="text-primary hover:underline">{c.city}</Link></td>
                <td className="p-2 text-gray-500">{c.state}</td>
                <td className="p-2 text-center"><span className="px-2 py-0.5 rounded-full text-xs text-white" style={{ backgroundColor: PERSONALITY_COLORS[c.personality] || '#6b7280' }}>{c.personality}</span></td>
                <td className="p-2 text-right font-mono">{c.profile.murderPct.toFixed(1)}</td>
                <td className="p-2 text-right font-mono">{c.profile.robberyPct.toFixed(1)}</td>
                <td className="p-2 text-right font-mono">{c.profile.assaultPct.toFixed(1)}</td>
                <td className="p-2 text-right font-mono">{c.profile.larcenyPct.toFixed(1)}</td>
                <td className="p-2 text-right font-mono">{c.profile.mvtPct.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
