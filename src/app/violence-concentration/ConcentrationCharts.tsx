'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, ReferenceLine } from 'recharts';

type Props = {
  cumulative: { rank: number; city: string; state: string; murders: number; cumPct: number }[];
  stateConc: { state: string; murders: number; pop: number; rate: number }[];
  analytics: { popCrimeBins: { label: string; count: number; avgViolentRate: number; avgMurderRate: number }[] };
};

export default function ConcentrationCharts({ cumulative, stateConc, analytics }: Props) {
  return (
    <div className="space-y-10">
      {/* Cumulative murder concentration curve */}
      <section>
        <h2 className="font-display text-2xl font-bold text-primary mb-4">Cumulative Murder Concentration</h2>
        <p className="text-sm text-gray-600 mb-4">As you add cities (ranked by murder count), what percentage of all murders do they account for?</p>
        <div className="bg-white border rounded-xl p-4" style={{ height: 400 }}>
          <ResponsiveContainer>
            <LineChart data={cumulative}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rank" label={{ value: 'Cities (ranked by murders)', position: 'insideBottom', offset: -5 }} />
              <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} label={{ value: 'Cumulative % of Murders', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(v) => `${Number(v).toFixed(1)}%`} labelFormatter={(v) => `Top ${v} cities`} />
              <ReferenceLine y={50} stroke="#dc2626" strokeDasharray="5 5" label={{ value: '50%', position: 'right' }} />
              <Line type="monotone" dataKey="cumPct" stroke="#1e3a5f" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* State murder totals */}
      <section>
        <h2 className="font-display text-2xl font-bold text-primary mb-4">Murder Totals by State (Top 20)</h2>
        <div className="bg-white border rounded-xl p-4" style={{ height: 500 }}>
          <ResponsiveContainer>
            <BarChart data={stateConc} layout="vertical" margin={{ left: 100 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="state" width={95} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => Number(v).toLocaleString()} />
              <Bar dataKey="murders" fill="#dc2626" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Population size vs crime rate */}
      <section>
        <h2 className="font-display text-2xl font-bold text-primary mb-4">Crime Rate by City Size</h2>
        <p className="text-sm text-gray-600 mb-4">Average violent crime rate by population bin — bigger cities tend to have higher crime rates, but with important exceptions.</p>
        <div className="bg-white border rounded-xl p-4" style={{ height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={analytics.popCrimeBins}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis label={{ value: 'Avg Violent Rate per 100K', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(v) => Number(v).toFixed(1)} />
              <Bar dataKey="avgViolentRate" fill="#1e3a5f" radius={[4, 4, 0, 0]} name="Avg Violent Rate" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
