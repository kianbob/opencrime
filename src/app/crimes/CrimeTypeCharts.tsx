'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type CrimeType = {
  slug: string; name: string;
  nationalHistory: { year: number; count: number; rate: number }[];
};

const COLORS: Record<string, string> = {
  'violent-crime': '#dc2626',
  'murder': '#991b1b',
  'rape': '#ea580c',
  'robbery': '#d97706',
  'aggravated-assault': '#b91c1c',
  'property-crime': '#1e3a5f',
  'burglary': '#2563eb',
  'larceny': '#0891b2',
  'motor-vehicle-theft': '#6366f1',
};

export default function CrimeTypeCharts({ crimeTypes }: { crimeTypes: CrimeType[] }) {
  const violent = crimeTypes.filter(c => ['murder', 'rape', 'robbery', 'aggravated-assault'].includes(c.slug));
  const property = crimeTypes.filter(c => ['burglary', 'larceny', 'motor-vehicle-theft'].includes(c.slug));

  // Build combined dataset by year
  const years = new Set<number>();
  crimeTypes.forEach(ct => ct.nationalHistory.forEach(h => years.add(h.year)));
  const sortedYears = [...years].sort();

  const violentData = sortedYears.map(year => {
    const row: Record<string, number> = { year };
    violent.forEach(ct => {
      const h = ct.nationalHistory.find(x => x.year === year);
      if (h) row[ct.slug] = h.rate;
    });
    return row;
  });

  const propertyData = sortedYears.map(year => {
    const row: Record<string, number> = { year };
    property.forEach(ct => {
      const h = ct.nationalHistory.find(x => x.year === year);
      if (h) row[ct.slug] = h.rate;
    });
    return row;
  });

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="font-heading text-xl font-bold mb-4">Violent Crime Types — Rate Trends</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={violentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(v) => Number(v ?? 0).toFixed(1)} />
            <Legend />
            {violent.map(ct => (
              <Line key={ct.slug} type="monotone" dataKey={ct.slug} stroke={COLORS[ct.slug]} name={ct.name} strokeWidth={2} dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="font-heading text-xl font-bold mb-4">Property Crime Types — Rate Trends</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={propertyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(v) => Number(v ?? 0).toFixed(1)} />
            <Legend />
            {property.map(ct => (
              <Line key={ct.slug} type="monotone" dataKey={ct.slug} stroke={COLORS[ct.slug]} name={ct.name} strokeWidth={2} dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
