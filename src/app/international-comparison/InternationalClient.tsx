'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const homicideData = [
  { country: 'South Africa', rate: 41.1, color: '#dc2626' },
  { country: 'Mexico', rate: 25.2, color: '#dc2626' },
  { country: 'Brazil', rate: 22.4, color: '#dc2626' },
  { country: 'Russia', rate: 6.8, color: '#ef4444' },
  { country: 'United States', rate: 6.4, color: '#1e3a5f', highlight: true },
  { country: 'India', rate: 2.9, color: '#3b82f6' },
  { country: 'Canada', rate: 2.3, color: '#3b82f6' },
  { country: 'France', rate: 1.3, color: '#3b82f6' },
  { country: 'UK', rate: 1.2, color: '#3b82f6' },
  { country: 'Sweden', rate: 1.2, color: '#3b82f6' },
  { country: 'Australia', rate: 0.9, color: '#3b82f6' },
  { country: 'Germany', rate: 0.8, color: '#3b82f6' },
  { country: 'South Korea', rate: 0.6, color: '#3b82f6' },
  { country: 'Italy', rate: 0.5, color: '#3b82f6' },
  { country: 'Japan', rate: 0.3, color: '#3b82f6' },
].sort((a, b) => b.rate - a.rate);

const incarcerationData = [
  { country: 'United States', rate: 531, color: '#1e3a5f', highlight: true },
  { country: 'Brazil', rate: 381, color: '#dc2626' },
  { country: 'Russia', rate: 300, color: '#ef4444' },
  { country: 'South Africa', rate: 238, color: '#ef4444' },
  { country: 'Australia', rate: 160, color: '#3b82f6' },
  { country: 'Mexico', rate: 153, color: '#3b82f6' },
  { country: 'UK', rate: 129, color: '#3b82f6' },
  { country: 'China', rate: 121, color: '#3b82f6' },
  { country: 'Canada', rate: 104, color: '#3b82f6' },
  { country: 'France', rate: 93, color: '#3b82f6' },
  { country: 'South Korea', rate: 90, color: '#3b82f6' },
  { country: 'Sweden', rate: 74, color: '#3b82f6' },
  { country: 'Germany', rate: 69, color: '#3b82f6' },
  { country: 'India', rate: 39, color: '#3b82f6' },
  { country: 'Japan', rate: 38, color: '#3b82f6' },
].sort((a, b) => b.rate - a.rate);

const gunHomicideData = [
  { country: 'United States', rate: 4.30, color: '#1e3a5f', highlight: true },
  { country: 'Canada', rate: 0.50, color: '#3b82f6' },
  { country: 'Australia', rate: 0.13, color: '#3b82f6' },
  { country: 'France', rate: 0.12, color: '#3b82f6' },
  { country: 'Germany', rate: 0.06, color: '#3b82f6' },
  { country: 'UK', rate: 0.02, color: '#3b82f6' },
  { country: 'Japan', rate: 0.01, color: '#3b82f6' },
].sort((a, b) => b.rate - a.rate);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border rounded shadow-lg">
        <p className="font-medium">{label}</p>
        <p className="text-sm">
          <span className="font-mono">{payload[0].value}</span> per 100K
          {data.highlight && <span className="text-blue-600 font-semibold"> (US)</span>}
        </p>
      </div>
    );
  }
  return null;
};

export default function InternationalClient() {
  return (
    <div className="space-y-8 my-8">
      {/* Homicide Rates Chart */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="font-heading text-xl font-bold mb-4">Homicide Rates by Country (per 100K people)</h3>
        <p className="text-sm text-gray-600 mb-4">
          2022-2023 data from UNODC and WHO. The US rate is high among developed nations but moderate globally.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={homicideData} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="country" 
              angle={-45} 
              textAnchor="end" 
              height={80}
              fontSize={12}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
              {homicideData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.highlight ? '#1e3a5f' : entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Incarceration Rates Chart */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="font-heading text-xl font-bold mb-4">Incarceration Rates by Country (per 100K people)</h3>
        <p className="text-sm text-gray-600 mb-4">
          2023 data from World Prison Brief. The US incarcerates at rates 5-10x higher than peer nations.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={incarcerationData} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="country" 
              angle={-45} 
              textAnchor="end" 
              height={80}
              fontSize={12}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
              {incarcerationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.highlight ? '#1e3a5f' : entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gun Homicide Rates Chart */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="font-heading text-xl font-bold mb-4">Gun Homicide Rates by Country (per 100K people)</h3>
        <p className="text-sm text-gray-600 mb-4">
          The US gun homicide rate is orders of magnitude higher than other developed nations.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={gunHomicideData} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="country" 
              angle={-45} 
              textAnchor="end" 
              height={80}
              fontSize={12}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
              {gunHomicideData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.highlight ? '#1e3a5f' : entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Key Insights */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-heading text-lg font-bold mb-3 text-amber-800">Key Insights from the Data</h3>
        <ul className="space-y-2 text-sm text-amber-700">
          <li>• <strong>US homicide rate (6.4):</strong> 21x higher than Japan, 5x higher than Canada, but lower than Brazil/Mexico</li>
          <li>• <strong>US incarceration rate (531):</strong> 14x higher than Germany, 8x higher than Sweden, 5x higher than Canada</li>
          <li>• <strong>US gun homicide rate (4.3):</strong> 430x higher than Japan, 215x higher than UK, 9x higher than Canada</li>
          <li>• The US is an extreme outlier among wealthy democracies but moderate compared to developing nations</li>
          <li>• Both high violence AND high incarceration distinguish the US from peer nations</li>
        </ul>
      </div>
    </div>
  );
}