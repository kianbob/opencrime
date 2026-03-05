'use client';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

type DecadeData = {
  decade: string; startYear: number; endYear: number;
  startRate: number; endRate: number; peakYear: number; peakRate: number;
  avgRate: number; totalViolentCrimes: number; pctChange: number;
  definingEvents: string[];
  yearlyData: { year: number; violentRate: number; propertyRate: number; homicideRate: number }[];
};

const DECADE_COLORS: Record<string, string> = {
  '1980s': '#7c3aed',
  '1990s': '#dc2626',
  '2000s': '#ea580c',
  '2010s': '#2563eb',
  '2020s': '#16a34a',
};

const DECADE_EMOJI: Record<string, string> = {
  '1980s': '💊',
  '1990s': '📈',
  '2000s': '🏛️',
  '2010s': '📱',
  '2020s': '😷',
};

export default function DecadesClient({ decades }: { decades: DecadeData[] }) {
  // Combined chart data
  const allYears = decades.flatMap(d => d.yearlyData);

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-primary mb-4">Violent Crime Rate: 1980-2024</h2>
      <div className="h-[350px] mb-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={allYears}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="violentRate" stroke="#dc2626" strokeWidth={2} dot={false} name="Violent Crime Rate" />
            <Line type="monotone" dataKey="homicideRate" stroke="#7c3aed" strokeWidth={2} dot={false} name="Homicide Rate" yAxisId={0} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {decades.map(d => (
        <section key={d.decade} className="mb-12 border-l-4 pl-6" style={{ borderColor: DECADE_COLORS[d.decade] || '#6b7280' }}>
          <h2 className="font-display text-3xl font-bold mb-2" style={{ color: DECADE_COLORS[d.decade] }}>
            {DECADE_EMOJI[d.decade]} The {d.decade}
          </h2>
          <p className="text-gray-500 text-sm mb-4">{d.startYear}–{d.endYear}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{d.startRate}</div>
              <div className="text-xs text-gray-500">Start Rate</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{d.endRate}</div>
              <div className="text-xs text-gray-500">End Rate</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{d.peakRate}</div>
              <div className="text-xs text-gray-500">Peak ({d.peakYear})</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className={`text-2xl font-bold ${d.pctChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {d.pctChange > 0 ? '+' : ''}{d.pctChange}%
              </div>
              <div className="text-xs text-gray-500">Change</div>
            </div>
          </div>

          <div className="h-[200px] mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={d.yearlyData}>
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="violentRate" stroke={DECADE_COLORS[d.decade]} strokeWidth={2} dot={{ r: 3 }} name="Violent Rate" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">What Shaped Crime in This Era</h3>
            <ul className="space-y-1">
              {d.definingEvents.map((event, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-600">
                  <span className="text-primary font-bold">→</span>
                  <span>{event}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm text-gray-500">
            Total violent crimes this decade: <strong>{d.totalViolentCrimes.toLocaleString()}</strong> · Average rate: <strong>{d.avgRate}</strong> per 100K
          </div>

          <div className="mt-3 flex gap-2 flex-wrap">
            {d.yearlyData.map(y => (
              <Link key={y.year} href={`/years/${y.year}`} className="text-xs text-primary hover:underline">{y.year}</Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
