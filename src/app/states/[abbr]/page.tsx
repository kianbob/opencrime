import { loadData, fmtNum, fmtRate, fmtPct, slugify } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import StateCharts from './StateCharts';
import ShareButtons from '@/components/ShareButtons';

type StateData = {
  abbr: string; name: string;
  years: {
    year: number; population: number;
    violentCrime: number; violentRate: number;
    homicide: number; homicideRate: number;
    rape: number; robbery: number; aggravatedAssault: number;
    propertyCrime: number; propertyRate: number;
    burglary: number; larceny: number; motorVehicleTheft: number;
  }[];
};

type CityIdx = { slug: string; city: string; state: string; population: number; violentRate: number; murderRate: number; propertyRate: number };

export async function generateStaticParams() {
  const states = loadData<StateData[]>('state-trends.json');
  return states.map(s => ({ abbr: s.abbr.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ abbr: string }> }): Promise<Metadata> {
  const { abbr } = await params;
  const states = loadData<StateData[]>('state-trends.json');
  const state = states.find(s => s.abbr.toLowerCase() === abbr);
  if (!state) return { title: 'State Not Found' };
  const latest = state.years[state.years.length - 1];
  return {
    title: `${state.name} Crime Statistics — Rates, Trends & Data`,
    description: `Crime statistics for ${state.name}. Violent crime rate: ${latest.violentRate} per 100K. Murder rate: ${latest.homicideRate}. ${state.years.length} years of trend data.`,
  };
}

export default async function StateDetailPage({ params }: { params: Promise<{ abbr: string }> }) {
  const { abbr } = await params;
  const states = loadData<StateData[]>('state-trends.json');
  const state = states.find(s => s.abbr.toLowerCase() === abbr);
  if (!state) return <div className="max-w-4xl mx-auto px-4 py-16 text-center"><h1 className="text-2xl font-bold">State not found</h1></div>;

  const latest = state.years[state.years.length - 1];
  const prev = state.years.length > 1 ? state.years[state.years.length - 2] : null;
  const violentChange = prev ? +((latest.violentRate - prev.violentRate) / prev.violentRate * 100).toFixed(1) : null;

  // Get cities in this state
  const allCities = loadData<CityIdx[]>('city-index.json');
  const stateCities = allCities.filter(c => c.state === state.name).sort((a, b) => b.population - a.population);
  const dangerousCities = [...stateCities].sort((a, b) => b.violentRate - a.violentRate).slice(0, 10);
  const safestCities = [...stateCities].sort((a, b) => a.violentRate - b.violentRate).slice(0, 10);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/states" className="hover:underline">States</Link> / <span className="text-gray-800">{state.name}</span>
      </nav>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">{state.name} Crime Statistics</h1>
      <p className="text-gray-600 mb-8">{state.years.length} years of data ({state.years[0].year}–{latest.year})</p>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="text-sm text-gray-500">Violent Crime Rate</div>
          <div className="text-2xl font-bold text-red-600">{fmtRate(latest.violentRate)}</div>
          {violentChange != null && <div className={`text-sm ${violentChange < 0 ? 'text-green-600' : 'text-red-600'}`}>{fmtPct(violentChange)} YoY</div>}
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="text-sm text-gray-500">Murder Rate</div>
          <div className="text-2xl font-bold text-red-700">{fmtRate(latest.homicideRate)}</div>
          <div className="text-sm text-gray-400">{fmtNum(latest.homicide)} total</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="text-sm text-gray-500">Property Crime Rate</div>
          <div className="text-2xl font-bold text-[#1e3a5f]">{fmtRate(latest.propertyRate)}</div>
          <div className="text-sm text-gray-400">{fmtNum(latest.propertyCrime)} total</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="text-sm text-gray-500">Population</div>
          <div className="text-2xl font-bold">{fmtNum(latest.population)}</div>
          <div className="text-sm text-gray-400">{latest.year}</div>
        </div>
      </div>

      {/* Crime Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4">{latest.year} Crime Breakdown</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-red-700 mb-2">Violent Crime: {fmtNum(latest.violentCrime)}</h3>
            <div className="space-y-2">
              {[
                { label: 'Murder', value: latest.homicide },
                { label: 'Rape', value: latest.rape },
                { label: 'Robbery', value: latest.robbery },
                { label: 'Aggravated Assault', value: latest.aggravatedAssault },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-mono">{fmtNum(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-[#1e3a5f] mb-2">Property Crime: {fmtNum(latest.propertyCrime)}</h3>
            <div className="space-y-2">
              {[
                { label: 'Burglary', value: latest.burglary },
                { label: 'Larceny-Theft', value: latest.larceny },
                { label: 'Motor Vehicle Theft', value: latest.motorVehicleTheft },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-mono">{fmtNum(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <StateCharts years={state.years} stateName={state.name} />

      {/* Cities */}
      {stateCities.length > 0 && (
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div>
            <h2 className="font-heading text-xl font-bold mb-4 text-red-700">Most Dangerous Cities</h2>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-3 py-2">City</th>
                    <th className="text-right px-3 py-2">Violent Rate</th>
                    <th className="text-right px-3 py-2">Population</th>
                  </tr>
                </thead>
                <tbody>
                  {dangerousCities.map(c => (
                    <tr key={c.slug} className="border-t hover:bg-gray-50">
                      <td className="px-3 py-2">
                        <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city}</Link>
                      </td>
                      <td className="px-3 py-2 text-right font-mono text-red-600">{fmtRate(c.violentRate)}</td>
                      <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold mb-4 text-green-700">Safest Cities</h2>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-3 py-2">City</th>
                    <th className="text-right px-3 py-2">Violent Rate</th>
                    <th className="text-right px-3 py-2">Population</th>
                  </tr>
                </thead>
                <tbody>
                  {safestCities.map(c => (
                    <tr key={c.slug} className="border-t hover:bg-gray-50">
                      <td className="px-3 py-2">
                        <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city}</Link>
                      </td>
                      <td className="px-3 py-2 text-right font-mono text-green-600">{fmtRate(c.violentRate)}</td>
                      <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Explore More */}
      <div className="flex flex-wrap gap-3 mt-8 mb-4">
        <Link href="/states" className="bg-[#1e3a5f] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#2a4d7a] transition">All States</Link>
        <Link href="/tools/compare" className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">Compare Cities</Link>
        <Link href="/arrests" className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">Arrest Data</Link>
        <Link href="/hate-crimes" className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">Hate Crimes</Link>
      </div>

      <ShareButtons title={`${state.name} Crime Statistics`} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: `${state.name} Crime Statistics ${latest.year}`,
        description: `Crime data for ${state.name}. Violent crime rate: ${latest.violentRate.toFixed(1)} per 100K.`,
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
      })}} />

      <p className="text-sm text-gray-500 mt-8">
        Source: FBI Crime Data Explorer. Rates per 100,000 residents. City data from Table 8.
      </p>
    </div>
  );
}
