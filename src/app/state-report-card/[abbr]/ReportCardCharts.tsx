'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type YearData = { year: number; violentRate: number; propertyRate: number; homicideRate: number };

export default function ReportCardCharts({ years }: { years: YearData[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="font-heading text-lg font-bold mb-4">Historical Crime Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={years}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="violentRate" stroke="#ef4444" name="Violent Rate" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="propertyRate" stroke="#3b82f6" name="Property Rate" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
