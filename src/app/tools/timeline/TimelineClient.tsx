'use client';

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

type YearData = {
  year: number;
  population: number;
  violentRate: number;
  homicideRate: number;
  rape: number;
  robbery: number;
  aggravatedAssault: number;
  propertyRate: number;
  burglary: number;
  larceny: number;
  motorVehicleTheft: number;
};

const CRIME_TYPES = [
  { key: 'violentRate', label: 'Violent Crime', rateKey: 'violentRate' as const },
  { key: 'homicideRate', label: 'Homicide', rateKey: 'homicideRate' as const },
  { key: 'rape', label: 'Rape', computeRate: true },
  { key: 'robbery', label: 'Robbery', computeRate: true },
  { key: 'aggravatedAssault', label: 'Aggravated Assault', computeRate: true },
  { key: 'propertyRate', label: 'Property Crime', rateKey: 'propertyRate' as const },
  { key: 'burglary', label: 'Burglary', computeRate: true },
  { key: 'larceny', label: 'Larceny', computeRate: true },
  { key: 'motorVehicleTheft', label: 'Motor Vehicle Theft', computeRate: true },
] as const;

export default function TimelineClient({ data }: { data: YearData[] }) {
  const [selected, setSelected] = useState(0);
  const crimeType = CRIME_TYPES[selected];

  const chartData = useMemo(() => {
    return data.map((d) => {
      let rate: number;
      if ('rateKey' in crimeType && crimeType.rateKey) {
        rate = d[crimeType.rateKey];
      } else {
        rate = ((d[crimeType.key as keyof YearData] as number) / d.population) * 100000;
      }
      return { year: d.year, rate: Math.round(rate * 10) / 10 };
    });
  }, [data, selected]);

  const peak = chartData.reduce((a, b) => (b.rate > a.rate ? b : a));
  const lowest = chartData.reduce((a, b) => (b.rate < a.rate ? b : a));
  const current = chartData[chartData.length - 1];
  const pctFromPeak = ((current.rate - peak.rate) / peak.rate) * 100;

  return (
    <div>
      <div className="mb-6">
        <label htmlFor="crime-type" className="block text-sm font-medium text-gray-700 mb-2">Select Crime Type</label>
        <select
          id="crime-type"
          value={selected}
          onChange={(e) => setSelected(Number(e.target.value))}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
        >
          {CRIME_TYPES.map((ct, i) => (
            <option key={ct.key} value={i}>{ct.label}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4">{CRIME_TYPES[selected].label} Rate (1979–2024)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => [Number(value).toFixed(1), 'Rate per 100K']} />
            <Line type="monotone" dataKey="rate" stroke="#1e3a5f" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <div className="text-sm text-gray-500">Peak Year</div>
          <div className="text-2xl font-bold text-red-600">{peak.year}</div>
          <div className="text-sm text-gray-600">{peak.rate.toFixed(1)} per 100K</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <div className="text-sm text-gray-500">Lowest Year</div>
          <div className="text-2xl font-bold text-green-600">{lowest.year}</div>
          <div className="text-sm text-gray-600">{lowest.rate.toFixed(1)} per 100K</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <div className="text-sm text-gray-500">Current (2024)</div>
          <div className="text-2xl font-bold text-[#1e3a5f]">{current.rate.toFixed(1)}</div>
          <div className="text-sm text-gray-600">per 100K</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <div className="text-sm text-gray-500">% Change from Peak</div>
          <div className={`text-2xl font-bold ${pctFromPeak < 0 ? 'text-green-600' : 'text-red-600'}`}>
            {pctFromPeak > 0 ? '+' : ''}{pctFromPeak.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">since {peak.year}</div>
        </div>
      </div>
    </div>
  );
}
