'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

type City = { s: string; c: string; st: string; p: number; vr: number; mr: number; pr: number };

export default function RiskCalcClient() {
  const [cities, setCities] = useState<City[]>([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<City | null>(null);
  const [years, setYears] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/city-index-lite.json').then(r => r.json()).then(d => { setCities(d); setLoading(false); });
  }, []);

  const results = useMemo(() => query.length >= 2 ? cities.filter(c => c.c.toLowerCase().includes(query.toLowerCase())).slice(0, 8) : [], [query, cities]);

  const calc = (rate: number, yrs: number) => {
    const annual = rate / 100000;
    const lifetime = 1 - Math.pow(1 - annual, yrs);
    return { annual, lifetime, oneIn: Math.round(1 / annual), lifetimeOneIn: Math.round(1 / lifetime) };
  };

  return (
    <div>
      <div className="relative mb-6">
        <input type="text" placeholder="Type a city name..."
          value={selected ? `${selected.c}, ${selected.st}` : query}
          onChange={e => { setQuery(e.target.value); if (selected) setSelected(null); }}
          onFocus={() => { if (selected) { setQuery(''); setSelected(null); }}}
          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-[#1e3a5f] focus:outline-none" autoFocus />
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

      {selected && (
        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-500 block mb-2">Time period: {years} years</label>
          <input type="range" min={1} max={50} value={years} onChange={e => setYears(+e.target.value)}
            className="w-full" />
          <div className="flex justify-between text-xs text-gray-400"><span>1 year</span><span>50 years</span></div>
        </div>
      )}

      {selected && (() => {
        const v = calc(selected.vr, years);
        const m = calc(selected.mr, years);
        const p = calc(selected.pr, years);
        const natV = calc(359.1, years);

        return (
          <div>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-red-50 rounded-xl p-6 text-center">
                <div className="text-sm text-gray-500 mb-1">Violent Crime</div>
                <div className="text-4xl font-bold text-red-600">1 in {v.oneIn}</div>
                <div className="text-sm text-gray-500">chance per year</div>
                <div className="border-t mt-3 pt-3">
                  <div className="text-lg font-bold text-red-700">{(v.lifetime * 100).toFixed(1)}%</div>
                  <div className="text-xs text-gray-400">chance over {years} years</div>
                </div>
              </div>
              <div className="bg-red-100 rounded-xl p-6 text-center">
                <div className="text-sm text-gray-500 mb-1">Murder</div>
                <div className="text-4xl font-bold text-red-800">1 in {m.oneIn.toLocaleString()}</div>
                <div className="text-sm text-gray-500">chance per year</div>
                <div className="border-t mt-3 pt-3">
                  <div className="text-lg font-bold text-red-900">{(m.lifetime * 100).toFixed(3)}%</div>
                  <div className="text-xs text-gray-400">chance over {years} years</div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="text-sm text-gray-500 mb-1">Property Crime</div>
                <div className="text-4xl font-bold text-[#1e3a5f]">1 in {p.oneIn}</div>
                <div className="text-sm text-gray-500">chance per year</div>
                <div className="border-t mt-3 pt-3">
                  <div className="text-lg font-bold text-blue-800">{(p.lifetime * 100).toFixed(1)}%</div>
                  <div className="text-xs text-gray-400">chance over {years} years</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
              <h2 className="font-heading text-lg font-bold mb-4">Compared to National Average</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Your city: {selected.c}</div>
                  <div className="text-xl font-bold">1 in {v.oneIn} <span className="text-sm text-gray-400">violent crime/year</span></div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">National average</div>
                  <div className="text-xl font-bold">1 in {natV.oneIn} <span className="text-sm text-gray-400">violent crime/year</span></div>
                </div>
              </div>
              <div className={`mt-4 text-center text-lg font-semibold ${selected.vr > 359.1 ? 'text-red-600' : 'text-green-600'}`}>
                {selected.vr > 359.1
                  ? `${(selected.vr / 359.1).toFixed(1)}x more likely than average`
                  : `${(359.1 / selected.vr).toFixed(1)}x safer than average`}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <strong>Important:</strong> These are statistical averages for the entire city. Actual risk varies 
              enormously by neighborhood, time of day, lifestyle, and other factors. Crime is highly concentrated — 
              most of a city&apos;s crime occurs in a small number of locations. Your personal risk may be much 
              higher or lower than these averages suggest.
            </div>

            <div className="mt-6 text-center">
              <Link href={`/cities/${selected.s}`} className="text-[#1e3a5f] hover:underline font-medium">
                View full crime data for {selected.c} →
              </Link>
            </div>
          </div>
        );
      })()}

      {loading && <p className="text-gray-500 text-center">Loading...</p>}
    </div>
  );
}
