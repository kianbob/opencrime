'use client';
import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

type YearData = {
  year: number; violentRate: number; homicideRate: number; propertyRate: number;
  violentCrime: number; homicide: number; population: number;
};

const ERAS: { range: [number, number]; label: string; color: string }[] = [
  { range: [1979, 1984], label: 'Rising crime, heroin epidemic', color: '#ef4444' },
  { range: [1985, 1991], label: 'Crack epidemic, crime peaks', color: '#dc2626' },
  { range: [1992, 2000], label: 'The Great Crime Decline begins', color: '#22c55e' },
  { range: [2001, 2008], label: 'Post-9/11 era, continued decline', color: '#3b82f6' },
  { range: [2009, 2014], label: 'Historic lows, Great Recession', color: '#8b5cf6' },
  { range: [2015, 2019], label: 'Slight uptick debate', color: '#f59e0b' },
  { range: [2020, 2021], label: 'COVID crime spike', color: '#ef4444' },
  { range: [2022, 2024], label: 'Historic decline resumes', color: '#22c55e' },
];

const CURRENT_YEAR = 2024;
const CURRENT_VIOLENT_RATE = 359.1;
const GAP_YEARS = [2017, 2018, 2019, 2020];

function getEra(year: number) {
  return ERAS.find(e => year >= e.range[0] && year <= e.range[1]);
}

function getFunFact(year: number, data: YearData[], yearData: YearData | null): string[] {
  const facts: string[] = [];
  const era = getEra(year);
  if (era) facts.push(`You were born during: ${era.label}`);

  if (yearData) {
    const pctChange = ((CURRENT_VIOLENT_RATE - yearData.violentRate) / yearData.violentRate * 100);
    if (pctChange < 0) {
      facts.push(`Crime is ${Math.abs(pctChange).toFixed(0)}% higher now than when you were born`);
    } else {
      facts.push(`Crime is ${pctChange.toFixed(0)}% lower now than when you were born`);
    }
  }

  // Check trend direction
  const idx = data.findIndex(d => d.year === year);
  if (idx > 0) {
    const prev = data[idx - 1];
    const curr = data[idx];
    if (curr && prev) {
      if (curr.violentRate > prev.violentRate) facts.push('Crime was going UP when you were born');
      else facts.push('Crime was going DOWN when you were born');
    }
  }

  // Declining streak
  if (yearData && year >= 1992) {
    const peak = data.find(d => d.year === 1991);
    if (peak) {
      const yearsSincePeak = year - 1991;
      if (yearsSincePeak > 0 && yearData.violentRate < peak.violentRate) {
        facts.push(`Crime had been declining for ${yearsSincePeak} years when you were born`);
      }
    }
  }

  if (year >= 1985 && year <= 1991) facts.push('You were born during the crack epidemic — the most violent era in modern US history');
  if (year === 1991) facts.push('1991 was the absolute peak of violent crime in America');
  if (year >= 2020 && year <= 2021) facts.push('You were born during the COVID-era crime spike');
  if (year >= 2022) facts.push('You were born as crime hit historic lows');

  return facts;
}

export default function TimeMachineClient({ data }: { data: YearData[] }) {
  const [birthYear, setBirthYear] = useState<number | null>(null);
  const [inputVal, setInputVal] = useState('');

  const yearData = useMemo(() => {
    if (!birthYear) return null;
    const exact = data.find(d => d.year === birthYear);
    if (exact) return exact;
    // Interpolate for gap years
    if (GAP_YEARS.includes(birthYear)) {
      const before = data.filter(d => d.year < birthYear).pop();
      const after = data.find(d => d.year > birthYear);
      if (before && after) {
        const t = (birthYear - before.year) / (after.year - before.year);
        return {
          year: birthYear,
          violentRate: before.violentRate + t * (after.violentRate - before.violentRate),
          homicideRate: before.homicideRate + t * (after.homicideRate - before.homicideRate),
          propertyRate: before.propertyRate + t * (after.propertyRate - before.propertyRate),
          violentCrime: Math.round(before.violentCrime + t * (after.violentCrime - before.violentCrime)),
          homicide: Math.round(before.homicide + t * (after.homicide - before.homicide)),
          population: Math.round(before.population + t * (after.population - before.population)),
        };
      }
    }
    return null;
  }, [birthYear, data]);

  const chartData = useMemo(() => {
    if (!birthYear) return data;
    return data.filter(d => d.year >= birthYear);
  }, [birthYear, data]);

  const funFacts = useMemo(() => {
    if (!birthYear) return [];
    return getFunFact(birthYear, data, yearData);
  }, [birthYear, data, yearData]);

  const era = birthYear ? getEra(birthYear) : null;
  const currentData = data.find(d => d.year === CURRENT_YEAR);

  function handleSubmit() {
    const y = parseInt(inputVal);
    if (y >= 1979 && y <= CURRENT_YEAR) setBirthYear(y);
  }

  return (
    <div>
      {/* Input */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4">Enter Your Birth Year</h2>
        <div className="flex gap-3 items-end">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Birth Year (1979–{CURRENT_YEAR})</label>
            <input
              type="number"
              min={1979}
              max={CURRENT_YEAR}
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              className="border rounded-lg px-4 py-2 w-32 text-lg"
              placeholder="1990"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-[#1e3a5f] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#2a4a6f] transition"
          >
            Time Travel
          </button>
        </div>
      </div>

      {birthYear && yearData && (
        <>
          {/* Era badge */}
          {era && (
            <div className="mb-6 inline-block px-4 py-2 rounded-full text-white text-sm font-bold" style={{ backgroundColor: era.color }}>
              {era.label}
            </div>
          )}

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
              <div className="text-sm text-gray-500">Violent Crime Rate</div>
              <div className="text-2xl font-bold text-red-600">{yearData.violentRate.toFixed(1)}</div>
              <div className="text-xs text-gray-400">per 100K in {birthYear}</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
              <div className="text-sm text-gray-500">Today&apos;s Rate</div>
              <div className="text-2xl font-bold text-green-600">{CURRENT_VIOLENT_RATE}</div>
              <div className="text-xs text-gray-400">per 100K in {CURRENT_YEAR}</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
              <div className="text-sm text-gray-500">Murder Rate</div>
              <div className="text-2xl font-bold">{yearData.homicideRate.toFixed(1)}</div>
              <div className="text-xs text-gray-400">per 100K in {birthYear}</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
              <div className="text-sm text-gray-500">Change</div>
              <div className={`text-2xl font-bold ${CURRENT_VIOLENT_RATE < yearData.violentRate ? 'text-green-600' : 'text-red-600'}`}>
                {CURRENT_VIOLENT_RATE < yearData.violentRate ? '↓' : '↑'} {Math.abs(((CURRENT_VIOLENT_RATE - yearData.violentRate) / yearData.violentRate * 100)).toFixed(0)}%
              </div>
              <div className="text-xs text-gray-400">since {birthYear}</div>
            </div>
          </div>

          {GAP_YEARS.includes(birthYear) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-sm text-yellow-800">
              ⚠️ {birthYear} falls in a data gap (2017–2020) when the FBI transitioned reporting systems. Values are interpolated estimates.
            </div>
          )}

          {/* Fun facts */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <h3 className="font-heading text-lg font-bold mb-3">🕰️ Fun Facts About {birthYear}</h3>
            <ul className="space-y-2">
              {funFacts.map((fact, i) => (
                <li key={i} className="flex gap-2 text-gray-700">
                  <span className="text-blue-500 font-bold">→</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h3 className="font-heading text-lg font-bold mb-4">Violent Crime Rate: {birthYear} to Today</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(v) => typeof v === "number" ? v.toFixed(1) : v} />
                <ReferenceLine y={CURRENT_VIOLENT_RATE} stroke="#22c55e" strokeDasharray="5 5" label="2024" />
                {yearData && <ReferenceLine y={yearData.violentRate} stroke="#ef4444" strokeDasharray="5 5" label={String(birthYear)} />}
                <Line type="monotone" dataKey="violentRate" stroke="#1e3a5f" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Era timeline */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="font-heading text-lg font-bold mb-4">Crime Eras in Your Lifetime</h3>
            <div className="space-y-3">
              {ERAS.filter(e => e.range[1] >= birthYear).map(e => (
                <div key={e.label} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: e.color }} />
                  <div className="text-sm">
                    <span className="font-bold">{e.range[0]}–{e.range[1]}:</span>{' '}
                    <span className={e.range[0] <= birthYear && birthYear <= e.range[1] ? 'font-bold underline' : ''}>{e.label}</span>
                    {e.range[0] <= birthYear && birthYear <= e.range[1] && <span className="ml-2 text-xs bg-yellow-100 px-2 py-0.5 rounded">← You were born here</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {birthYear && !yearData && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          No data available for {birthYear}. Please enter a year between 1979 and {CURRENT_YEAR}.
        </div>
      )}
    </div>
  );
}
