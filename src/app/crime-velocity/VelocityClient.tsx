'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

type City = {
  slug: string; city: string; state: string; velocityScore: number;
  violentTrend: number; propertyTrend: number; category: string; years: number;
};

const CATEGORY_COLORS: Record<string, string> = {
  'rapidly-improving': '#16a34a',
  'improving': '#65a30d',
  'stable': '#6b7280',
  'worsening': '#ea580c',
  'rapidly-worsening': '#dc2626',
};

const CATEGORY_LABELS: Record<string, string> = {
  'rapidly-improving': 'Rapidly Improving',
  'improving': 'Improving',
  'stable': 'Stable',
  'worsening': 'Worsening',
  'rapidly-worsening': 'Rapidly Worsening',
};

export default function VelocityClient({ worst25, best25, all }: { worst25: City[]; best25: City[]; all: City[] }) {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');

  const filtered = useMemo(() => {
    let list = all;
    if (search) list = list.filter(c => `${c.city} ${c.state}`.toLowerCase().includes(search.toLowerCase()));
    if (filterCat !== 'all') list = list.filter(c => c.category === filterCat);
    return list.slice(0, 100);
  }, [all, search, filterCat]);

  const chartData = [...worst25.slice(0, 15)].reverse().concat(best25.slice(0, 15)).map(c => ({
    name: `${c.city}, ${c.state}`.substring(0, 20),
    score: c.velocityScore,
    category: c.category,
  }));

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-primary mb-4">Crime Direction: Best & Worst</h2>
      <div className="h-[500px] mb-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 120, right: 20 }}>
            <XAxis type="number" domain={[-100, 100]} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={120} />
            <Tooltip formatter={(val) => [String(Number(val).toFixed(1)), 'Velocity Score']} />
            <ReferenceLine x={0} stroke="#374151" />
            <Bar dataKey="score">
              {chartData.map((d, i) => (
                <Cell key={i} fill={CATEGORY_COLORS[d.category] || '#6b7280'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="font-display text-xl font-bold text-red-700 mb-3">🔴 Top 25 Fastest-Worsening</h3>
          <div className="space-y-1">
            {worst25.map((c, i) => (
              <Link key={c.slug} href={`/cities/${c.slug}`} className="flex justify-between items-center py-1.5 px-2 rounded hover:bg-red-50 text-sm">
                <span>{i + 1}. {c.city}, {c.state}</span>
                <span className="font-mono text-red-600 font-semibold">+{c.velocityScore}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-green-700 mb-3">🟢 Top 25 Fastest-Improving</h3>
          <div className="space-y-1">
            {best25.map((c, i) => (
              <Link key={c.slug} href={`/cities/${c.slug}`} className="flex justify-between items-center py-1.5 px-2 rounded hover:bg-green-50 text-sm">
                <span>{i + 1}. {c.city}, {c.state}</span>
                <span className="font-mono text-green-600 font-semibold">{c.velocityScore}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <h2 className="font-display text-2xl font-bold text-primary mb-4">Search All Cities</h2>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text" placeholder="Search city or state..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 flex-1"
        />
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="border rounded-lg px-3 py-2">
          <option value="all">All Categories</option>
          {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">City</th>
              <th className="text-left p-2">State</th>
              <th className="text-right p-2">Score</th>
              <th className="text-right p-2">Violent Trend</th>
              <th className="text-right p-2">Property Trend</th>
              <th className="text-center p-2">Category</th>
              <th className="text-center p-2">Years</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.slug} className="border-t hover:bg-gray-50">
                <td className="p-2"><Link href={`/cities/${c.slug}`} className="text-primary hover:underline">{c.city}</Link></td>
                <td className="p-2 text-gray-500">{c.state}</td>
                <td className="p-2 text-right font-mono" style={{ color: CATEGORY_COLORS[c.category] }}>{c.velocityScore > 0 ? '+' : ''}{c.velocityScore}</td>
                <td className="p-2 text-right font-mono">{c.violentTrend > 0 ? '+' : ''}{c.violentTrend}</td>
                <td className="p-2 text-right font-mono">{c.propertyTrend > 0 ? '+' : ''}{c.propertyTrend}</td>
                <td className="p-2 text-center"><span className="px-2 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: CATEGORY_COLORS[c.category] }}>{CATEGORY_LABELS[c.category]}</span></td>
                <td className="p-2 text-center text-gray-500">{c.years}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 100 && <p className="text-sm text-gray-400 mt-2">Showing first 100 results. Refine your search to see more.</p>}
      </div>
    </div>
  );
}
