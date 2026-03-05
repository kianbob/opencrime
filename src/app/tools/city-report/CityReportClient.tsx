'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

type CityLite = { s: string; c: string; st: string; p: number; vr: number; mr: number; pr: number; sp: number; tr: string };
type CityDetail = {
  slug: string; city: string; state: string;
  years: Record<string, {
    population: number; violentCrime: number; violentRate: number;
    murder: number; murderRate: number; rape: number; robbery: number;
    aggravatedAssault: number; propertyCrime: number; propertyRate: number;
    burglary: number; larceny: number; motorVehicleTheft: number; arson: number;
  }>;
};

const NATIONAL_VIOLENT_RATE = 359.1;
const NATIONAL_PROPERTY_RATE = 1760.1;

function getGrade(violentRatio: number, propertyRatio: number): string {
  const avg = (violentRatio + propertyRatio) / 2;
  if (avg <= 0.4) return 'A';
  if (avg <= 0.7) return 'B';
  if (avg <= 1.0) return 'C';
  if (avg <= 1.5) return 'D';
  return 'F';
}

function gradeColor(grade: string): string {
  switch (grade) {
    case 'A': return 'text-green-600 bg-green-50 border-green-200';
    case 'B': return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'C': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'D': return 'text-orange-600 bg-orange-50 border-orange-200';
    default: return 'text-red-600 bg-red-50 border-red-200';
  }
}

export default function CityReportClient({ cities }: { cities: CityLite[] }) {
  const [query, setQuery] = useState('');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [cityData, setCityData] = useState<CityDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return cities.filter(c => `${c.c} ${c.st}`.toLowerCase().includes(q)).slice(0, 15);
  }, [query, cities]);

  const selectedCity = useMemo(() => cities.find(c => c.s === selectedSlug), [selectedSlug, cities]);

  useEffect(() => {
    if (!selectedSlug) return;
    setLoading(true);
    fetch(`/data/cities/${selectedSlug}.json`)
      .then(r => r.json())
      .then(d => { setCityData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [selectedSlug]);

  const latestYear = cityData ? Object.keys(cityData.years).sort().pop() : null;
  const latest = latestYear ? cityData?.years[latestYear] : null;

  const violentRatio = selectedCity ? selectedCity.vr / NATIONAL_VIOLENT_RATE : 0;
  const propertyRatio = selectedCity ? selectedCity.pr / NATIONAL_PROPERTY_RATE : 0;
  const grade = selectedCity ? getGrade(violentRatio, propertyRatio) : '';

  // Find top crime concerns
  const concerns: string[] = [];
  if (latest) {
    const crimes = [
      { name: 'Aggravated Assault', val: latest.aggravatedAssault },
      { name: 'Larceny/Theft', val: latest.larceny },
      { name: 'Burglary', val: latest.burglary },
      { name: 'Motor Vehicle Theft', val: latest.motorVehicleTheft },
      { name: 'Robbery', val: latest.robbery },
      { name: 'Murder', val: latest.murder },
    ].sort((a, b) => b.val - a.val);
    concerns.push(...crimes.filter(c => c.val > 0).slice(0, 3).map(c => c.name));
  }

  return (
    <div>
      <div className="relative mb-8">
        <label htmlFor="city-search" className="block text-sm font-medium text-gray-700 mb-2">Search for a city</label>
        <input
          id="city-search"
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShowDropdown(true); }}
          onFocus={() => setShowDropdown(true)}
          placeholder="e.g. Los Angeles, Chicago, Houston..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
        />
        {showDropdown && filtered.length > 0 && (
          <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
            {filtered.map(c => (
              <button
                key={c.s}
                onClick={() => { setSelectedSlug(c.s); setQuery(`${c.c}, ${c.st}`); setShowDropdown(false); }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
              >
                <span className="font-medium">{c.c}</span>
                <span className="text-gray-400 ml-1">{c.st}</span>
                <span className="text-gray-400 text-xs ml-2">pop. {c.p.toLocaleString()}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {loading && <p className="text-gray-500">Loading city data...</p>}

      {selectedCity && !loading && (
        <div className="space-y-6">
          <div className="flex items-start gap-6 flex-wrap">
            <div className={`border-2 rounded-2xl p-6 text-center min-w-[120px] ${gradeColor(grade)}`}>
              <div className="text-5xl font-bold">{grade}</div>
              <div className="text-sm font-medium mt-1">Safety Grade</div>
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold">{selectedCity.c}, {selectedCity.st}</h2>
              <p className="text-gray-500">Population: {selectedCity.p.toLocaleString()} · Safer than {selectedCity.sp}% of cities</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-500 mb-3">Violent Crime Rate</h3>
              <div className="text-3xl font-bold">{selectedCity.vr.toFixed(1)}</div>
              <div className="text-sm text-gray-500">per 100K · National avg: {NATIONAL_VIOLENT_RATE}</div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${violentRatio > 1 ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{ width: `${Math.min(violentRatio * 50, 100)}%` }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">{violentRatio > 1 ? `${((violentRatio - 1) * 100).toFixed(0)}% above` : `${((1 - violentRatio) * 100).toFixed(0)}% below`} national average</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-500 mb-3">Property Crime Rate</h3>
              <div className="text-3xl font-bold">{selectedCity.pr.toFixed(1)}</div>
              <div className="text-sm text-gray-500">per 100K · National avg: {NATIONAL_PROPERTY_RATE}</div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${propertyRatio > 1 ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{ width: `${Math.min(propertyRatio * 50, 100)}%` }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">{propertyRatio > 1 ? `${((propertyRatio - 1) * 100).toFixed(0)}% above` : `${((1 - propertyRatio) * 100).toFixed(0)}% below`} national average</div>
            </div>
          </div>

          {concerns.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-500 mb-3">Top Crime Concerns</h3>
              <div className="flex flex-wrap gap-2">
                {concerns.map(c => (
                  <span key={c} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium">{c}</span>
                ))}
              </div>
            </div>
          )}

          <Link
            href={`/cities/${selectedCity.s}`}
            className="inline-block bg-[#1e3a5f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2a4d7a] transition"
          >
            View Full City Profile →
          </Link>
        </div>
      )}
    </div>
  );
}
