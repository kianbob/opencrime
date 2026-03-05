'use client';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';

type CargoData = {
  totalIncidents: number;
  byYear: { year: number; count: number }[];
  byState: { state: string; count: number }[];
  byLocation: { location: string; count: number }[];
};

const COLORS = ['#92400e', '#b45309', '#d97706', '#f59e0b', '#fbbf24', '#fcd34d', '#fde68a', '#fef3c7', '#a16207', '#ca8a04'];

export default function CargoCharts({ data }: { data: CargoData }) {
  const topStates = data.byState.slice(0, 10);
  const topLocations = data.byLocation
    .filter(l => l.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <>
      {/* Historical Trend Line Chart */}
      <div className="bg-white rounded-xl shadow-sm border p-6 my-8">
        <h3 className="font-heading text-xl font-bold mb-4">Cargo Theft Trend (2012–2024)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data.byYear}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(v) => Number(v ?? 0).toLocaleString()} />
            <Line type="monotone" dataKey="count" stroke="#92400e" strokeWidth={3} dot={{ r: 5 }} name="Incidents" />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-500 mt-3">
          Incidents surged from ~12,000 in 2012 to over 41,000 in 2024 — driven by e-commerce growth,
          expanded reporting, and increasingly sophisticated theft operations.
        </p>
      </div>

      {/* Top States Horizontal Bar */}
      <div className="bg-white rounded-xl shadow-sm border p-6 my-8">
        <h3 className="font-heading text-xl font-bold mb-4">Top 10 States for Cargo Theft</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={topStates} layout="vertical" margin={{ left: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(v) => v.toLocaleString()} />
            <YAxis type="category" dataKey="state" width={110} tick={{ fontSize: 13 }} />
            <Tooltip formatter={(v) => Number(v ?? 0).toLocaleString()} />
            <Bar dataKey="count" name="Incidents" radius={[0, 4, 4, 0]}>
              {topStates.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Where It Happens */}
      <div className="bg-white rounded-xl shadow-sm border p-6 my-8">
        <h3 className="font-heading text-xl font-bold mb-4">Where Cargo Gets Stolen — Top Locations</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={topLocations} layout="vertical" margin={{ left: 160 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(v) => v.toLocaleString()} />
            <YAxis type="category" dataKey="location" width={150} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => Number(v ?? 0).toLocaleString()} />
            <Bar dataKey="count" fill="#d97706" name="Incidents" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
