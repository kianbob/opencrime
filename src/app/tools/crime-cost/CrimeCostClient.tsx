'use client';

import { useState, useMemo } from 'react';

// Per-crime cost estimates (2024 dollars, DOJ/RAND/McCollister et al.)
const COSTS = {
  murder: 9_900_000,
  rape: 280_000,
  robbery: 42_000,
  assault: 107_000,
  burglary: 6_400,
  larceny: 3_500,
  mvt: 10_800,
  arson: 21_000,
};

type City = {
  slug: string; city: string; state: string; population: number;
  violentCrime: number; propertyCrime: number; murder: number;
  violentRate: number; propertyRate: number;
};

function fmtMoney(n: number): string {
  if (n >= 1_000_000_000) return '$' + (n / 1_000_000_000).toFixed(1) + 'B';
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return '$' + (n / 1_000).toFixed(0) + 'K';
  return '$' + n.toFixed(0);
}

function fmtNum(n: number): string {
  return n.toLocaleString();
}

export default function CrimeCostClient({ cities }: { cities: City[] }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<City | null>(null);

  const filtered = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return cities.filter(c => 
      c.city.toLowerCase().includes(q) || 
      `${c.city} ${c.state}`.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [query, cities]);

  // Estimate crime breakdown (FBI doesn't give us individual crime counts for most cities,
  // so we use national proportions for violent crime subcategories)
  // National proportions (2024): murder ~1.4%, rape ~8%, robbery ~16%, assault ~74.6%
  // Property: burglary ~15%, larceny ~67%, MVT ~18%
  const estimate = useMemo(() => {
    if (!selected) return null;
    const murders = selected.murder || Math.round(selected.violentCrime * 0.014);
    const rapes = Math.round(selected.violentCrime * 0.08);
    const robberies = Math.round(selected.violentCrime * 0.16);
    const assaults = Math.round(selected.violentCrime * 0.746);
    const burglaries = Math.round(selected.propertyCrime * 0.15);
    const larcenies = Math.round(selected.propertyCrime * 0.67);
    const mvts = Math.round(selected.propertyCrime * 0.18);

    const murderCost = murders * COSTS.murder;
    const rapeCost = rapes * COSTS.rape;
    const robberyCost = robberies * COSTS.robbery;
    const assaultCost = assaults * COSTS.assault;
    const burglaryCost = burglaries * COSTS.burglary;
    const larcenyCost = larcenies * COSTS.larceny;
    const mvtCost = mvts * COSTS.mvt;

    const totalCost = murderCost + rapeCost + robberyCost + assaultCost + burglaryCost + larcenyCost + mvtCost;
    const perCapita = selected.population > 0 ? totalCost / selected.population : 0;
    const perHousehold = perCapita * 2.5; // avg household size

    return {
      murders, rapes, robberies, assaults, burglaries, larcenies, mvts,
      murderCost, rapeCost, robberyCost, assaultCost, burglaryCost, larcenyCost, mvtCost,
      totalCost, perCapita, perHousehold,
      breakdown: [
        { label: 'Murder', count: murders, cost: murderCost, color: '#1e1e1e' },
        { label: 'Assault', count: assaults, cost: assaultCost, color: '#dc2626' },
        { label: 'Robbery', count: robberies, cost: robberyCost, color: '#ea580c' },
        { label: 'Rape', count: rapes, cost: rapeCost, color: '#d97706' },
        { label: 'Burglary', count: burglaries, cost: burglaryCost, color: '#2563eb' },
        { label: 'Larceny', count: larcenies, cost: larcenyCost, color: '#7c3aed' },
        { label: 'Vehicle Theft', count: mvts, cost: mvtCost, color: '#0891b2' },
      ],
    };
  }, [selected]);

  return (
    <div>
      {/* Search */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search for a city (e.g., Chicago, Miami, Dallas)..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-[#1e3a5f] focus:outline-none"
          value={query}
          onChange={e => { setQuery(e.target.value); setSelected(null); }}
        />
        {filtered.length > 0 && !selected && (
          <div className="absolute z-10 w-full bg-white border rounded-xl shadow-lg mt-1 max-h-60 overflow-y-auto">
            {filtered.map(c => (
              <button
                key={c.slug}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-b-0"
                onClick={() => { setSelected(c); setQuery(`${c.city}, ${c.state}`); }}
              >
                <span className="font-medium">{c.city}</span>
                <span className="text-gray-500 ml-1">{c.state}</span>
                <span className="text-gray-400 ml-2 text-sm">Pop. {fmtNum(c.population)}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      {estimate && selected && (
        <div className="space-y-6">
          {/* Hero cost */}
          <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a5a8f] rounded-2xl p-8 text-white text-center">
            <p className="text-sm opacity-80 mb-1">Estimated Annual Cost of Crime in</p>
            <h2 className="text-2xl font-bold mb-4">{selected.city}, {selected.state}</h2>
            <p className="text-5xl md:text-6xl font-bold mb-4">{fmtMoney(estimate.totalCost)}</p>
            <div className="flex justify-center gap-8 text-sm opacity-90">
              <div>
                <p className="text-2xl font-bold">{fmtMoney(estimate.perCapita)}</p>
                <p>per resident</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{fmtMoney(estimate.perHousehold)}</p>
                <p>per household</p>
              </div>
            </div>
          </div>

          {/* Cost breakdown bar */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-bold text-lg mb-4">Cost Breakdown by Crime Type</h3>
            <div className="flex h-8 rounded-full overflow-hidden mb-4">
              {estimate.breakdown.map(b => {
                const pct = estimate.totalCost > 0 ? (b.cost / estimate.totalCost) * 100 : 0;
                if (pct < 1) return null;
                return (
                  <div key={b.label} style={{ width: `${pct}%`, backgroundColor: b.color }} title={`${b.label}: ${fmtMoney(b.cost)}`} />
                );
              })}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {estimate.breakdown.map(b => (
                <div key={b.label} className="flex items-start gap-2">
                  <span className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: b.color }} />
                  <div>
                    <p className="font-medium text-sm">{b.label}</p>
                    <p className="text-lg font-bold">{fmtMoney(b.cost)}</p>
                    <p className="text-xs text-gray-500">{fmtNum(b.count)} incidents</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Context */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
            <p className="font-bold text-amber-800 mb-1">⚠️ Important Context</p>
            <p className="text-amber-700">
              These are estimates based on average per-crime cost studies. Actual costs vary enormously by incident severity.
              Where individual crime type counts aren&apos;t available, national proportions are used. Murder dominates the total
              cost despite being the rarest crime because each incident carries ~$9.9M in societal costs.
            </p>
          </div>

          {/* Comparison */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-3">What Could That Money Buy?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4 border">
                <p className="text-2xl mb-1">🏫</p>
                <p className="font-bold">{fmtNum(Math.round(estimate.totalCost / 15_000_000))} schools</p>
                <p className="text-gray-500">at $15M per school</p>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <p className="text-2xl mb-1">👮</p>
                <p className="font-bold">{fmtNum(Math.round(estimate.totalCost / 75_000))} police officers</p>
                <p className="text-gray-500">at $75K salary</p>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <p className="text-2xl mb-1">🏥</p>
                <p className="font-bold">{fmtNum(Math.round(estimate.totalCost / 500_000_000))} hospitals</p>
                <p className="text-gray-500">at $500M per hospital</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Default state */}
      {!selected && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-xl font-bold text-gray-700 mb-2">Search for any city above</p>
          <p className="text-gray-500">We&apos;ll calculate the estimated annual economic cost of crime using DOJ per-crime cost data.</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['Chicago', 'Miami', 'Los Angeles', 'New York', 'Houston'].map(city => (
              <button
                key={city}
                className="px-3 py-1 bg-white border rounded-full text-sm text-[#1e3a5f] hover:bg-blue-50"
                onClick={() => {
                  setQuery(city);
                  const match = cities.find(c => c.city === city);
                  if (match) { setSelected(match); setQuery(`${match.city}, ${match.state}`); }
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
