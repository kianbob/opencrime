'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, CartesianGrid } from 'recharts';

type TrendPoint = { year: number; violentRate: number };
type CrimeBreakdown = { name: string; value: number; isViolent: boolean };

export default function HomepageCharts({
  trendData,
  breakdownData,
}: {
  trendData: TrendPoint[];
  breakdownData: CrimeBreakdown[];
}) {
  const peakYear = 1991;
  const currentYear = 2024;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Chart A: Violent Crime Trend */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-heading text-xl font-bold mb-1 text-center">45 Years of Violent Crime in America</h3>
          <p className="text-sm text-gray-500 text-center mb-4">Violent crime rate per 100K (1979–2024)</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <XAxis dataKey="year" tick={{ fontSize: 12 }} tickFormatter={(v) => v % 10 === 0 || v === 1979 ? String(v) : ''} />
              <YAxis tick={{ fontSize: 12 }} domain={[0, 'auto']} />
              <Tooltip formatter={(value) => [Number(value).toFixed(1), 'Rate per 100K']} />
              <Line
                type="monotone"
                dataKey="violentRate"
                stroke="#1e3a5f"
                strokeWidth={2}
                dot={(props: Record<string, unknown>) => {
                  const { cx, cy, payload } = props as { cx: number; cy: number; payload: TrendPoint };
                  if (payload.year === peakYear) {
                    return <circle key="peak" cx={cx} cy={cy} r={5} fill="#dc2626" stroke="#fff" strokeWidth={2} />;
                  }
                  if (payload.year === currentYear) {
                    return <circle key="current" cx={cx} cy={cy} r={5} fill="#16a34a" stroke="#fff" strokeWidth={2} />;
                  }
                  return <circle key={payload.year} cx={cx} cy={cy} r={0} />;
                }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-600 inline-block" /> 1991 Peak</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-600 inline-block" /> 2024 Current</span>
          </div>
        </div>

        {/* Chart B: Crime Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-heading text-xl font-bold mb-1 text-center">2024 Crime Breakdown</h3>
          <p className="text-sm text-gray-500 text-center mb-4">Reported incidents by type</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={breakdownData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
              <Tooltip formatter={(value) => [Number(value).toLocaleString(), 'Incidents']} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {breakdownData.map((entry, index) => (
                  <Cell key={index} fill={entry.isViolent ? '#dc2626' : '#1e3a5f'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-600 inline-block" /> Violent</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#1e3a5f] inline-block" /> Property</span>
          </div>
        </div>
      </div>
    </section>
  );
}
