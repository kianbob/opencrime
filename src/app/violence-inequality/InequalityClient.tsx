'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

type StateData = {
  state: string; abbr: string; giniIndex: number; topCityPct: number;
  top3Pct: number; topCity: string; numCities: number; avgRate: number; maxRate: number; minRate: number;
};

export default function InequalityClient({ data }: { data: StateData[] }) {
  const chartData = data.slice(0, 30).map(d => ({
    name: d.abbr,
    gini: d.giniIndex,
  }));

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-primary mb-4">Violence Inequality by State (Gini Coefficient)</h2>
      <div className="h-[600px] mb-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 40, right: 20 }}>
            <XAxis type="number" domain={[0, 1]} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={40} />
            <Tooltip formatter={(val) => [Number(val).toFixed(3), 'Gini Index']} />
            <Bar dataKey="gini">
              {chartData.map((d, i) => (
                <Cell key={i} fill={d.gini > 0.7 ? '#dc2626' : d.gini > 0.5 ? '#ea580c' : d.gini > 0.3 ? '#ca8a04' : '#16a34a'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2 className="font-display text-2xl font-bold text-primary mb-4">All States</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">#</th>
              <th className="text-left p-2">State</th>
              <th className="text-right p-2">Gini Index</th>
              <th className="text-right p-2">Top City %</th>
              <th className="text-right p-2">Top 3 %</th>
              <th className="text-left p-2">Top City</th>
              <th className="text-right p-2">Cities</th>
              <th className="text-right p-2">Avg Rate</th>
              <th className="text-right p-2">Max Rate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={d.abbr} className="border-t hover:bg-gray-50">
                <td className="p-2 text-gray-400">{i + 1}</td>
                <td className="p-2 font-medium">{d.state}</td>
                <td className="p-2 text-right font-mono">{d.giniIndex.toFixed(3)}</td>
                <td className="p-2 text-right">{d.topCityPct}%</td>
                <td className="p-2 text-right">{d.top3Pct}%</td>
                <td className="p-2 text-gray-600">{d.topCity}</td>
                <td className="p-2 text-right text-gray-500">{d.numCities}</td>
                <td className="p-2 text-right font-mono">{d.avgRate}</td>
                <td className="p-2 text-right font-mono text-red-600">{d.maxRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
