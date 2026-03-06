'use client';
import { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type City = { s: string; c: string; st: string; p: number; vr: number; mr: number; pr: number };

export default function CompareClient() {
  const [cities, setCities] = useState<City[]>([]);
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [city1, setCity1] = useState<City | null>(null);
  const [city2, setCity2] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/city-index-lite.json').then(r => r.json()).then(d => { setCities(d); setLoading(false); });
  }, []);

  const results1 = useMemo(() => q1.length >= 2 ? cities.filter(c => c.c.toLowerCase().includes(q1.toLowerCase()) || c.st.toLowerCase().includes(q1.toLowerCase())).slice(0, 8) : [], [q1, cities]);
  const results2 = useMemo(() => q2.length >= 2 ? cities.filter(c => c.c.toLowerCase().includes(q2.toLowerCase()) || c.st.toLowerCase().includes(q2.toLowerCase())).slice(0, 8) : [], [q2, cities]);

  const chartData = city1 && city2 ? [
    { name: 'Violent Rate', [city1.c]: city1.vr, [city2.c]: city2.vr },
    { name: 'Murder Rate', [city1.c]: city1.mr, [city2.c]: city2.mr },
    { name: 'Property Rate', [city1.c]: city1.pr, [city2.c]: city2.pr },
  ] : [];

  const renderPicker = (q: string, setQ: (s: string) => void, results: City[], selected: City | null, setSelected: (c: City) => void, label: string) => (
    <div className="flex-1">
      <label className="text-sm font-semibold text-gray-500 mb-1 block">{label}</label>
      <input
        type="text"
        placeholder="Type city name..."
        value={selected ? `${selected.c}, ${selected.st}` : q}
        onChange={e => { setQ(e.target.value); if (selected) setSelected(null as unknown as City); }}
        onFocus={() => { if (selected) { setQ(''); setSelected(null as unknown as City); }}}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#1e3a5f] focus:outline-none"
      />
      {!selected && results.length > 0 && (
        <div className="bg-white border rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto z-10 relative">
          {results.map(c => (
            <button key={c.s} onClick={() => { setSelected(c); setQ(''); }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm border-b last:border-0">
              <span className="font-medium">{c.c}</span>
              <span className="text-gray-400 ml-1">{c.st} · Pop: {c.p.toLocaleString()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  if (loading) return <p className="text-gray-500">Loading city data...</p>;

  return (
    <div>
      <div className="flex gap-4 mb-8 flex-col md:flex-row">
        {renderPicker(q1, setQ1, results1, city1, setCity1, 'City 1')}
        <div className="flex items-end pb-3 text-2xl font-bold text-gray-300">vs</div>
        {renderPicker(q2, setQ2, results2, city2, setCity2, 'City 2')}
      </div>

      {city1 && city2 && (
        <div>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Violent Crime Rate', v1: city1.vr, v2: city2.vr, fmt: (n: number) => n.toFixed(1), better: 'lower' as const },
              { label: 'Murder Rate', v1: city1.mr, v2: city2.mr, fmt: (n: number) => n.toFixed(2), better: 'lower' as const },
              { label: 'Property Crime Rate', v1: city1.pr, v2: city2.pr, fmt: (n: number) => n.toFixed(1), better: 'lower' as const },
            ].map(metric => {
              const winner = metric.better === 'lower' ? (metric.v1 < metric.v2 ? 1 : 2) : (metric.v1 > metric.v2 ? 1 : 2);
              return (
                <div key={metric.label} className="bg-white rounded-xl shadow-sm border p-4">
                  <div className="text-sm text-gray-500 mb-2">{metric.label}</div>
                  <div className="flex justify-between items-center">
                    <div className={`text-xl font-bold ${winner === 1 ? 'text-green-600' : 'text-red-600'}`}>{metric.fmt(metric.v1)}</div>
                    <div className="text-gray-400 text-sm">vs</div>
                    <div className={`text-xl font-bold ${winner === 2 ? 'text-green-600' : 'text-red-600'}`}>{metric.fmt(metric.v2)}</div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{city1.c}</span>
                    <span>{city2.c}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4 mb-8">
            <div className="flex justify-between items-center">
              <div><span className="font-semibold">{city1.c}</span>: {city1.p.toLocaleString()} residents</div>
              <div><span className="font-semibold">{city2.c}</span>: {city2.p.toLocaleString()} residents</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h2 className="font-heading text-xl font-bold mb-4">Side-by-Side Comparison</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={city1.c} fill="#1e3a5f" radius={[4, 4, 0, 0]} />
                <Bar dataKey={city2.c} fill="#dc2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
            <h3 className="font-heading text-lg font-bold mb-2">Safety Comparison</h3>
            {city1.vr < city2.vr ? (
              <p className="text-lg"><strong className="text-green-600">{city1.c}</strong> is {((1 - city1.vr / city2.vr) * 100).toFixed(0)}% safer than <strong className="text-red-600">{city2.c}</strong> based on violent crime rate</p>
            ) : city2.vr < city1.vr ? (
              <p className="text-lg"><strong className="text-green-600">{city2.c}</strong> is {((1 - city2.vr / city1.vr) * 100).toFixed(0)}% safer than <strong className="text-red-600">{city1.c}</strong> based on violent crime rate</p>
            ) : (
              <p className="text-lg">Both cities have the same violent crime rate</p>
            )}
          </div>
        </div>
      )}

      {!city1 && !city2 && (
        <div className="mt-8">
          <h2 className="font-heading text-xl font-bold mb-4">Popular Comparisons</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              ['New York', 'Los Angeles'], ['Chicago', 'Houston'], ['Miami', 'Atlanta'],
              ['Seattle', 'Portland'], ['San Francisco', 'Austin'], ['Phoenix', 'Denver'],
            ].map(([a, b]) => {
              const ca = cities.find(c => c.c === a);
              const cb = cities.find(c => c.c === b);
              if (!ca || !cb) return null;
              return (
                <button key={a + b} onClick={() => { setCity1(ca); setCity2(cb); }}
                  className="text-left bg-white rounded-lg border p-3 hover:shadow-sm transition">
                  <span className="font-medium text-[#1e3a5f]">{a}</span>
                  <span className="text-gray-400 mx-2">vs</span>
                  <span className="font-medium text-red-600">{b}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
