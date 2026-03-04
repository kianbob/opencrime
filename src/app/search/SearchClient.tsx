'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

type City = { s: string; c: string; st: string; p: number; vr: number; mr: number; pr: number; vc: number | null };

export default function SearchClient() {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [results, setResults] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/city-index-lite.json')
      .then(r => r.json())
      .then((data: City[]) => { setCities(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    const matches = cities.filter(c =>
      c.c.toLowerCase().includes(q) || c.st.toLowerCase().includes(q)
    ).slice(0, 50);
    setResults(matches);
  }, [query, cities]);

  return (
    <div>
      <input
        type="text"
        placeholder="Type a city or state name..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-[#1e3a5f] focus:outline-none mb-6"
        autoFocus
      />

      {loading && <p className="text-gray-500">Loading city data...</p>}

      {!loading && query && results.length === 0 && (
        <p className="text-gray-500">No cities found matching &ldquo;{query}&rdquo;</p>
      )}

      {results.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">City</th>
                <th className="text-left px-4 py-2">State</th>
                <th className="text-right px-4 py-2">Population</th>
                <th className="text-right px-4 py-2">Violent Rate</th>
                <th className="text-right px-4 py-2">Murder Rate</th>
              </tr>
            </thead>
            <tbody>
              {results.map(c => (
                <tr key={c.s} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <Link href={`/cities/${c.s}`} className="text-[#1e3a5f] hover:underline font-medium">{c.c}</Link>
                  </td>
                  <td className="px-4 py-2 text-gray-500">{c.st}</td>
                  <td className="px-4 py-2 text-right font-mono text-gray-500">{c.p.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right font-mono text-red-600">{(c.vr ?? 0).toFixed(1)}</td>
                  <td className="px-4 py-2 text-right font-mono">{(c.mr ?? 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {results.length >= 50 && <p className="text-center text-sm text-gray-400 py-2">Showing first 50 results. Refine your search.</p>}
        </div>
      )}

      {!loading && !query && (
        <div className="text-gray-500 text-center py-8">
          <p className="text-lg mb-2">Search for any city</p>
          <p className="text-sm">Try &ldquo;Los Angeles&rdquo;, &ldquo;Chicago&rdquo;, &ldquo;Texas&rdquo;, or any city name</p>
        </div>
      )}
    </div>
  );
}
