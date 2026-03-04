'use client';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';

type StateSummary = { abbr: string; name: string; violentRate: number; homicideRate: number; propertyRate: number; population: number };
type StateTrend = { abbr: string; name: string; years: { year: number; violentRate: number; homicideRate: number; propertyRate: number }[] };

export default function StateCompareClient() {
  const [states, setStates] = useState<StateSummary[]>([]);
  const [trends, setTrends] = useState<StateTrend[]>([]);
  const [s1, setS1] = useState('');
  const [s2, setS2] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/data/state-summary.json').then(r => r.json()),
      fetch('/data/state-trends.json').then(r => r.json()),
    ]).then(([sum, tr]) => { setStates(sum); setTrends(tr); setLoading(false); });
  }, []);

  const st1 = states.find(s => s.abbr === s1);
  const st2 = states.find(s => s.abbr === s2);
  const tr1 = trends.find(t => t.abbr === s1);
  const tr2 = trends.find(t => t.abbr === s2);

  const chartData = st1 && st2 ? [
    { name: 'Violent Rate', [st1.name]: st1.violentRate, [st2.name]: st2.violentRate },
    { name: 'Murder Rate', [st1.name]: st1.homicideRate, [st2.name]: st2.homicideRate },
    { name: 'Property Rate', [st1.name]: st1.propertyRate, [st2.name]: st2.propertyRate },
  ] : [];

  // Build trend comparison
  const trendData = (tr1 && tr2) ? (() => {
    const n1 = tr1.name, n2 = tr2.name;
    return tr1.years.map(y => {
      const y2 = tr2.years.find(t => t.year === y.year);
      return { year: y.year, [n1]: y.violentRate, [n2]: y2?.violentRate ?? null };
    }).filter(d => (d[n1] ?? 0) > 0 || (d[n2] ?? 0) > 0);
  })() : [];

  if (loading) return <p className="text-gray-500">Loading state data...</p>;

  return (
    <div>
      <div className="flex gap-4 mb-8 flex-col md:flex-row">
        <div className="flex-1">
          <label className="text-sm font-semibold text-gray-500 mb-1 block">State 1</label>
          <select value={s1} onChange={e => setS1(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#1e3a5f] focus:outline-none">
            <option value="">Select state...</option>
            {states.map(s => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
          </select>
        </div>
        <div className="flex items-end pb-3 text-2xl font-bold text-gray-300">vs</div>
        <div className="flex-1">
          <label className="text-sm font-semibold text-gray-500 mb-1 block">State 2</label>
          <select value={s2} onChange={e => setS2(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#1e3a5f] focus:outline-none">
            <option value="">Select state...</option>
            {states.map(s => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
          </select>
        </div>
      </div>

      {st1 && st2 && (
        <div>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Violent Crime Rate', v1: st1.violentRate, v2: st2.violentRate, fmt: (n: number) => n.toFixed(1) },
              { label: 'Murder Rate', v1: st1.homicideRate, v2: st2.homicideRate, fmt: (n: number) => n.toFixed(2) },
              { label: 'Property Crime Rate', v1: st1.propertyRate, v2: st2.propertyRate, fmt: (n: number) => n.toFixed(1) },
            ].map(m => {
              const winner = m.v1 < m.v2 ? 1 : 2;
              return (
                <div key={m.label} className="bg-white rounded-xl shadow-sm border p-4">
                  <div className="text-sm text-gray-500 mb-2">{m.label}</div>
                  <div className="flex justify-between items-center">
                    <div className={`text-xl font-bold ${winner === 1 ? 'text-green-600' : 'text-red-600'}`}>{m.fmt(m.v1)}</div>
                    <div className="text-gray-400 text-sm">vs</div>
                    <div className={`text-xl font-bold ${winner === 2 ? 'text-green-600' : 'text-red-600'}`}>{m.fmt(m.v2)}</div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{st1.name}</span><span>{st2.name}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h2 className="font-heading text-xl font-bold mb-4">Crime Rate Comparison</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={st1.name} fill="#1e3a5f" radius={[4, 4, 0, 0]} />
                <Bar dataKey={st2.name} fill="#dc2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {trendData.length > 5 && (
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
              <h2 className="font-heading text-xl font-bold mb-4">Violent Crime Rate Over Time</h2>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey={tr1!.name} stroke="#1e3a5f" strokeWidth={2} dot={false} connectNulls />
                  <Line type="monotone" dataKey={tr2!.name} stroke="#dc2626" strokeWidth={2} dot={false} connectNulls />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
            <h3 className="font-heading text-lg font-bold mb-2">Safety Comparison</h3>
            {st1.violentRate < st2.violentRate ? (
              <p className="text-lg"><strong className="text-green-600">{st1.name}</strong> is {((1 - st1.violentRate / st2.violentRate) * 100).toFixed(0)}% safer than <strong className="text-red-600">{st2.name}</strong></p>
            ) : (
              <p className="text-lg"><strong className="text-green-600">{st2.name}</strong> is {((1 - st2.violentRate / st1.violentRate) * 100).toFixed(0)}% safer than <strong className="text-red-600">{st1.name}</strong></p>
            )}
          </div>
        </div>
      )}

      {!s1 && !s2 && (
        <div className="mt-8">
          <h2 className="font-heading text-xl font-bold mb-4">Popular Comparisons</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[['CA', 'TX'], ['NY', 'FL'], ['IL', 'OH'], ['WA', 'OR'], ['GA', 'NC'], ['PA', 'NJ']].map(([a, b]) => {
              const sa = states.find(s => s.abbr === a);
              const sb = states.find(s => s.abbr === b);
              if (!sa || !sb) return null;
              return (
                <button key={a+b} onClick={() => { setS1(a); setS2(b); }}
                  className="text-left bg-white rounded-lg border p-3 hover:shadow-sm transition">
                  <span className="font-medium text-[#1e3a5f]">{sa.name}</span>
                  <span className="text-gray-400 mx-2">vs</span>
                  <span className="font-medium text-red-600">{sb.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
