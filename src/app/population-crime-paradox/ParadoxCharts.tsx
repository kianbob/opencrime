'use client';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell } from 'recharts';

type Props = {
  scatter: { pop: number; rate: number; city: string; state: string }[];
  popBins: { label: string; count: number; avgViolentRate: number; avgMurderRate: number }[];
};

const COLORS = ['#22c55e', '#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444', '#dc2626', '#991b1b'];

export default function ParadoxCharts({ scatter, popBins }: Props) {
  return (
    <div className="space-y-10">
      {/* Scatter: Population vs Violent Rate */}
      <section>
        <h2 className="font-display text-2xl font-bold text-[#1e3a5f] mb-2">Population vs. Violent Crime Rate</h2>
        <p className="text-sm text-gray-600 mb-4">Each dot is a city (10K+ pop, sample of 500). If population predicted crime, dots would trend upward. Instead, the pattern is messy — proving the paradox.</p>
        <div className="bg-white border rounded-xl p-4" style={{ height: 450 }}>
          <ResponsiveContainer>
            <ScatterChart margin={{ bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="pop" name="Population" tickFormatter={(v) => v >= 1000000 ? `${(v/1000000).toFixed(1)}M` : `${Math.round(v/1000)}K`} label={{ value: 'Population', position: 'insideBottom', offset: -10 }} />
              <YAxis type="number" dataKey="rate" name="Violent Crime Rate" label={{ value: 'Violent Rate per 100K', angle: -90, position: 'insideLeft' }} />
              <Tooltip content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-white border rounded-lg shadow-lg p-3 text-sm">
                    <p className="font-bold">{d.city}, {d.state}</p>
                    <p>Population: {d.pop.toLocaleString()}</p>
                    <p>Violent Rate: {d.rate.toFixed(1)}</p>
                  </div>
                );
              }} />
              <Scatter data={scatter} fill="#1e3a5f" fillOpacity={0.5} r={3} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Average violent rate by city size */}
      <section>
        <h2 className="font-display text-2xl font-bold text-[#1e3a5f] mb-2">Average Violent Crime Rate by City Size</h2>
        <p className="text-sm text-gray-600 mb-4">Larger cities do have higher average rates — but notice the drop for cities over 1M. The relationship isn&apos;t linear.</p>
        <div className="bg-white border rounded-xl p-4" style={{ height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={popBins}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis label={{ value: 'Avg Violent Rate per 100K', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(v) => Number(v).toFixed(1)} />
              <Bar dataKey="avgViolentRate" name="Avg Violent Rate" radius={[4, 4, 0, 0]}>
                {popBins.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
