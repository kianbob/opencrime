import { loadData, fmtNum, fmtRate, fmtPct, stateAbbr } from '@/lib/utils';
import type { CityDetail, NationalTrend } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import CityCharts from './CityCharts';
import fs from 'fs';
import path from 'path';

export const dynamicParams = true;

export async function generateStaticParams() {
  // Pre-render top 100 cities by population
  const cities = loadData<{ slug: string; population: number }[]>('city-index.json');
  return cities.sort((a, b) => b.population - a.population).slice(0, 100).map(c => ({ slug: c.slug }));
}

function loadCity(slug: string): CityDetail | null {
  const filePath = path.join(process.cwd(), 'public', 'data', 'cities', slug + '.json');
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const city = loadCity(slug);
  if (!city) return { title: 'City Not Found' };
  const years = Object.keys(city.years).sort();
  const latest = city.years[years[years.length - 1]];
  return {
    title: `${city.city}, ${city.state} Crime Rate — Statistics & Safety Data`,
    description: `Crime rate in ${city.city}, ${city.state}. Violent crime rate: ${latest.violentRate} per 100K. ${latest.murder} murders. Population: ${latest.population.toLocaleString()}.`,
  };
}

export default async function CityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = loadCity(slug);
  if (!city) return <div className="max-w-4xl mx-auto px-4 py-16 text-center"><h1 className="text-2xl font-bold">City not found</h1></div>;

  const years = Object.keys(city.years).sort();
  const latestYear = years[years.length - 1];
  const latest = city.years[latestYear];
  const prevYear = years.length > 1 ? years[years.length - 2] : null;
  const prev = prevYear ? city.years[prevYear] : null;
  const violentChange = prev ? +((latest.violentRate - prev.violentRate) / prev.violentRate * 100).toFixed(1) : null;

  const national = loadData<NationalTrend[]>('national-trends.json');
  const natLatest = national.find(n => n.year === +latestYear);
  const abbr = stateAbbr(city.state);

  const yearData = years.map(y => ({ year: +y, ...city.years[y] }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/states" className="hover:underline">States</Link>
        {' / '}
        <Link href={`/states/${abbr.toLowerCase()}`} className="hover:underline">{city.state}</Link>
        {' / '}
        <span className="text-gray-800">{city.city}</span>
      </nav>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
        {city.city}, {city.state} Crime Rate
      </h1>
      <p className="text-gray-600 mb-8">
        {years.length} years of data ({years[0]}–{latestYear}) · Population: {fmtNum(latest.population)}
      </p>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="text-sm text-gray-500">Violent Crime Rate</div>
          <div className="text-2xl font-bold text-red-600">{fmtRate(latest.violentRate)}</div>
          {violentChange != null && (
            <div className={`text-sm ${violentChange < 0 ? 'text-green-600' : 'text-red-600'}`}>{fmtPct(violentChange)} YoY</div>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="text-sm text-gray-500">Murder Rate</div>
          <div className="text-2xl font-bold text-red-700">{fmtRate(latest.murderRate)}</div>
          <div className="text-sm text-gray-400">{latest.murder} murders</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="text-sm text-gray-500">Property Crime Rate</div>
          <div className="text-2xl font-bold text-[#1e3a5f]">{fmtRate(latest.propertyRate)}</div>
          <div className="text-sm text-gray-400">{fmtNum(latest.propertyCrime)} total</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="text-sm text-gray-500">vs National Avg</div>
          {natLatest ? (
            <>
              <div className={`text-2xl font-bold ${latest.violentRate > natLatest.violentRate ? 'text-red-600' : 'text-green-600'}`}>
                {latest.violentRate > natLatest.violentRate ? '↑' : '↓'} {((latest.violentRate / natLatest.violentRate - 1) * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-gray-400">National: {fmtRate(natLatest.violentRate)}</div>
            </>
          ) : (
            <div className="text-lg text-gray-400">N/A</div>
          )}
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4">{latestYear} Crime Breakdown</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-red-700 mb-2">Violent Crime: {fmtNum(latest.violentCrime)}</h3>
            {[
              { label: 'Murder', value: latest.murder },
              { label: 'Rape', value: latest.rape },
              { label: 'Robbery', value: latest.robbery },
              { label: 'Aggravated Assault', value: latest.aggravatedAssault },
            ].map(item => (
              <div key={item.label} className="flex justify-between text-sm py-1">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-mono">{fmtNum(item.value)}</span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-semibold text-[#1e3a5f] mb-2">Property Crime: {fmtNum(latest.propertyCrime)}</h3>
            {[
              { label: 'Burglary', value: latest.burglary },
              { label: 'Larceny-Theft', value: latest.larceny },
              { label: 'Motor Vehicle Theft', value: latest.motorVehicleTheft },
              { label: 'Arson', value: latest.arson },
            ].map(item => (
              <div key={item.label} className="flex justify-between text-sm py-1">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-mono">{fmtNum(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Year-over-Year Table */}
      {years.length > 1 && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8 overflow-x-auto">
          <h2 className="font-heading text-xl font-bold mb-4">Year-over-Year Comparison</h2>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2">Year</th>
                <th className="text-right px-3 py-2">Population</th>
                <th className="text-right px-3 py-2">Violent Crime</th>
                <th className="text-right px-3 py-2">Violent Rate</th>
                <th className="text-right px-3 py-2">Murders</th>
                <th className="text-right px-3 py-2">Property Crime</th>
                <th className="text-right px-3 py-2">Property Rate</th>
              </tr>
            </thead>
            <tbody>
              {yearData.reverse().map(y => (
                <tr key={y.year} className="border-t">
                  <td className="px-3 py-2 font-semibold">{y.year}</td>
                  <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(y.population)}</td>
                  <td className="px-3 py-2 text-right font-mono">{fmtNum(y.violentCrime)}</td>
                  <td className="px-3 py-2 text-right font-mono text-red-600">{fmtRate(y.violentRate)}</td>
                  <td className="px-3 py-2 text-right font-mono">{y.murder}</td>
                  <td className="px-3 py-2 text-right font-mono">{fmtNum(y.propertyCrime)}</td>
                  <td className="px-3 py-2 text-right font-mono text-[#1e3a5f]">{fmtRate(y.propertyRate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Charts */}
      {years.length > 1 && <CityCharts yearData={yearData.reverse()} cityName={city.city} />}

      <p className="text-sm text-gray-500 mt-8">
        Source: FBI Crime Data Explorer, Table 8 — Offenses Known to Law Enforcement by State by City. 
        Rates per 100,000 residents.
      </p>
    </div>
  );
}
