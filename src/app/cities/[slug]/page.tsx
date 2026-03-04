import { loadData, fmtNum, fmtRate, fmtPct, stateAbbr } from '@/lib/utils';
import type { CityDetail, NationalTrend, CityIndex } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import CityCharts from './CityCharts';
import ShareButtons from '@/components/ShareButtons';
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
    title: `${city.city}, ${city.state} Crime Rate & Safety — Is ${city.city} Safe?`,
    description: `Is ${city.city}, ${city.state} safe? Violent crime rate: ${latest.violentRate.toFixed(1)} per 100K. ${latest.murder} murders in ${years[years.length - 1]}. Safety grade, trends, and detailed statistics.`,
    openGraph: {
      title: `${city.city}, ${city.state} Crime Rate`,
      description: `Violent crime rate: ${latest.violentRate.toFixed(1)}/100K · Murder rate: ${(latest.murder / latest.population * 100000).toFixed(1)}/100K · Pop: ${latest.population.toLocaleString()}`,
    },
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
  const allCities = loadData<CityIndex[]>('city-index.json');
  const cityIdx = allCities.find(c => c.slug === slug);
  const similarCities = cityIdx?.similarCities || [];

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

      {/* Safety Grade */}
      {(() => {
        const vr = latest.violentRate;
        const grade = vr < 100 ? 'A+' : vr < 200 ? 'A' : vr < 300 ? 'B' : vr < 400 ? 'C' : vr < 600 ? 'D' : vr < 1000 ? 'F' : 'F-';
        const color = vr < 300 ? 'text-green-600 bg-green-50' : vr < 400 ? 'text-yellow-600 bg-yellow-50' : vr < 600 ? 'text-orange-600 bg-orange-50' : 'text-red-600 bg-red-50';
        return (
          <div className={`rounded-xl p-6 mb-8 text-center ${color.split(' ')[1]}`}>
            <div className={`text-5xl font-bold ${color.split(' ')[0]}`}>{grade}</div>
            <div className="text-lg font-semibold mt-1">Safety Grade for {city.city}</div>
            <p className="text-sm text-gray-500 mt-2">Based on violent crime rate of {fmtRate(vr)} per 100K (national avg: {fmtRate(natLatest?.violentRate ?? 359.1)})</p>
          </div>
        );
      })()}

      {/* Trajectory & Percentile — from enhanced city index */}
      {(() => {
        const allCities = loadData<{ slug: string; safetyPercentile: number; trajectory: string }[]>('city-index.json');
        const meta = allCities.find(c => c.slug === slug);
        if (!meta || meta.trajectory === 'unknown') return null;
        const trajLabels: Record<string, { label: string; color: string }> = {
          'improving': { label: '📈 Improving', color: 'text-green-600' },
          'worsening': { label: '📉 Worsening', color: 'text-red-600' },
          'volatile': { label: '↕️ Volatile', color: 'text-amber-600' },
          'stable-safe': { label: '✅ Stable Safe', color: 'text-green-700' },
          'stable-dangerous': { label: '⚠️ Stable Dangerous', color: 'text-red-700' },
        };
        const t = trajLabels[meta.trajectory] || { label: meta.trajectory, color: 'text-gray-600' };
        return (
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
              <div className="text-sm text-gray-500">Crime Trajectory</div>
              <div className={`text-xl font-bold ${t.color}`}>{t.label}</div>
              <Link href="/city-trajectories" className="text-xs text-[#1e3a5f] hover:underline">How is this calculated? →</Link>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
              <div className="text-sm text-gray-500">Safety Percentile</div>
              <div className="text-xl font-bold">Safer than {100 - meta.safetyPercentile}% of cities</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${100 - meta.safetyPercentile}%` }} />
              </div>
            </div>
          </div>
        );
      })()}

      {/* Quick Links */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link href={`/tools/compare`} className="bg-[#1e3a5f] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#2a4d7a] transition">Compare {city.city} →</Link>
        <Link href={`/states/${abbr.toLowerCase()}`} className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">{city.state} Overview →</Link>
        <Link href="/rankings" className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">City Rankings →</Link>
        <Link href="/tools/safety-score" className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">Safety Score Tool →</Link>
      </div>

      {similarCities.length > 0 && (
        <div className="bg-blue-50 rounded-xl p-6 mb-6">
          <h3 className="font-heading text-lg font-bold mb-3">Similar Cities</h3>
          <p className="text-sm text-gray-600 mb-3">Cities with similar population and crime profile (in different states):</p>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            {similarCities.map(sc => (
              <Link key={sc.slug} href={`/cities/${sc.slug}`} className="text-[#1e3a5f] hover:underline">{sc.city}, {sc.state} →</Link>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <h3 className="font-heading text-lg font-bold mb-3">Related Analysis</h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <Link href="/analysis/crime-decline" className="text-[#1e3a5f] hover:underline">The Great Crime Decline →</Link>
          <Link href="/analysis/gun-violence" className="text-[#1e3a5f] hover:underline">Gun Violence Data →</Link>
          <Link href="/violent-crime" className="text-[#1e3a5f] hover:underline">Violent Crime Overview →</Link>
          <Link href="/property-crime" className="text-[#1e3a5f] hover:underline">Property Crime →</Link>
        </div>
      </div>

      <ShareButtons title={`${city.city}, ${city.state} Crime Rate`} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: `${city.city}, ${city.state} Crime Rate ${latestYear}`,
        description: `Crime statistics for ${city.city}, ${city.state}. Violent crime rate: ${latest.violentRate.toFixed(1)} per 100K.`,
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
      })}} />

      <p className="text-sm text-gray-500 mt-8">
        Source: FBI Crime Data Explorer, Table 8 — Offenses Known to Law Enforcement by State by City. 
        Rates per 100,000 residents.
      </p>
    </div>
  );
}
