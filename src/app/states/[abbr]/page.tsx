import { loadData, fmtNum, fmtRate, fmtPct, slugify } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import StateCharts from './StateCharts';
import ShareButtons from '@/components/ShareButtons';
import AIOverview from '@/components/AIOverview';

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

type VelocityCity = {
  slug: string; city: string; state: string; velocityScore: number;
  violentTrend: number; propertyTrend: number; category: string; years: number;
};

type HateCrimeState = {
  state: string; totalIncidents: number; raceEthnicity: number;
  religion: number; sexualOrientation: number;
};

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
    openGraph: {
      title: `${state.name} Crime Statistics`,
      description: `Violent: ${latest.violentRate.toFixed(1)}/100K · Murder: ${latest.homicideRate.toFixed(1)}/100K · ${state.years.length} years of data`,
      url: `https://www.opencrime.us/states/${abbr}`,
    },
    alternates: { canonical: `https://www.opencrime.us/states/${abbr}` },
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
  // Use 10K+ pop for rankings to avoid tiny cities with extreme per-capita rates
  const rankable = stateCities.filter(c => c.population >= 10000);
  const fallback = rankable.length >= 5 ? rankable : stateCities.filter(c => c.population >= 1000);
  const dangerousCities = [...fallback].sort((a, b) => b.violentRate - a.violentRate).slice(0, 10);
  const safestCities = [...fallback].sort((a, b) => a.violentRate - b.violentRate).filter(c => c.propertyRate > 0).slice(0, 10);

  // AI Overview insights
  const allStates = loadData<{ abbr: string; name: string; violentRate: number }[]>('state-summary.json');
  const stateRank = [...allStates].sort((a, b) => b.violentRate - a.violentRate).findIndex(s => s.abbr === state.abbr) + 1;
  const insights: string[] = [];
  insights.push(`${state.name} ranks #${stateRank} out of ${allStates.length} states for violent crime rate (${latest.violentRate.toFixed(1)} per 100K).`);
  if (violentChange != null) insights.push(`Violent crime ${violentChange < 0 ? 'decreased' : 'increased'} ${Math.abs(violentChange)}% from ${prev!.year} to ${latest.year}.`);
  if (stateCities.length > 0) insights.push(`${stateCities.length} cities report crime data. Safest: ${safestCities[0]?.city} (${safestCities[0]?.violentRate.toFixed(1)}/100K). Most dangerous: ${dangerousCities[0]?.city} (${dangerousCities[0]?.violentRate.toFixed(1)}/100K).`);
  if (latest.homicide > 0) insights.push(`${fmtNum(latest.homicide)} murders in ${latest.year} — a rate of ${latest.homicideRate.toFixed(1)} per 100K residents.`);
  if (state.years.length > 10) {
    const oldest = state.years[0];
    const longChange = ((latest.violentRate - oldest.violentRate) / oldest.violentRate * 100).toFixed(0);
    insights.push(`Since ${oldest.year}, ${state.name}'s violent crime rate has changed by ${+longChange > 0 ? '+' : ''}${longChange}%.`);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/states" className="hover:underline">States</Link> / <span className="text-gray-800">{state.name}</span>
      </nav>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">{state.name} Crime Statistics</h1>
      <p className="text-gray-600 mb-6">{state.years.length} years of data ({state.years[0].year}–{latest.year})</p>

      <AIOverview insights={insights} />

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

      {/* Crime Velocity */}
      {(() => {
        const velocityAll = loadData<VelocityCity[]>('crime-velocity.json');
        const stateVelocity = velocityAll.filter(c => c.state === state.name);
        if (stateVelocity.length === 0) return null;
        const improving = stateVelocity.filter(c => c.velocityScore < 0).sort((a, b) => a.velocityScore - b.velocityScore).slice(0, 3);
        const worsening = stateVelocity.filter(c => c.velocityScore > 0).sort((a, b) => b.velocityScore - a.velocityScore).slice(0, 3);
        if (improving.length === 0 && worsening.length === 0) return null;
        return (
          <section className="mt-8">
            <h2 className="font-heading text-2xl font-bold mb-4">Crime Velocity — Which Cities Are Changing Fastest</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {improving.length > 0 && (
                <div>
                  <h3 className="font-semibold text-green-700 mb-2">Fastest Improving</h3>
                  <div className="space-y-2">
                    {improving.map(c => (
                      <Link key={c.slug} href={`/cities/${c.slug}`} className="block bg-green-50 border border-green-200 rounded-lg p-3 hover:bg-green-100 transition">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{c.city}</span>
                          <span className="text-green-700 font-mono text-sm">{c.velocityScore.toFixed(1)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {worsening.length > 0 && (
                <div>
                  <h3 className="font-semibold text-red-700 mb-2">Fastest Worsening</h3>
                  <div className="space-y-2">
                    {worsening.map(c => (
                      <Link key={c.slug} href={`/cities/${c.slug}`} className="block bg-red-50 border border-red-200 rounded-lg p-3 hover:bg-red-100 transition">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{c.city}</span>
                          <span className="text-red-700 font-mono text-sm">+{c.velocityScore.toFixed(1)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">Velocity scores measure the direction and speed of crime changes. Negative = improving, positive = worsening. <Link href="/crime-velocity" className="text-[#1e3a5f] hover:underline">Full methodology →</Link></p>
          </section>
        );
      })()}

      {/* Hate Crime Data */}
      {(() => {
        const hateCrimes = loadData<HateCrimeState[]>('hate-crime-by-state.json');
        const stateHate = hateCrimes.find(h => h.state === state.name);
        if (!stateHate || stateHate.totalIncidents === 0) return null;
        const biases: { label: string; count: number }[] = [];
        if (stateHate.raceEthnicity > 0) biases.push({ label: 'Race/Ethnicity', count: stateHate.raceEthnicity });
        if (stateHate.religion > 0) biases.push({ label: 'Religion', count: stateHate.religion });
        if (stateHate.sexualOrientation > 0) biases.push({ label: 'Sexual Orientation', count: stateHate.sexualOrientation });
        biases.sort((a, b) => b.count - a.count);
        return (
          <section className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h2 className="font-heading text-xl font-bold mb-3">Hate Crimes in {state.name}</h2>
            <p className="text-2xl font-bold text-orange-700 mb-2">{fmtNum(stateHate.totalIncidents)} incidents reported</p>
            {biases.length > 0 && (
              <div className="text-sm text-gray-700 mb-3">
                <span className="font-semibold">Top bias motivations:</span>{' '}
                {biases.map((b, i) => (
                  <span key={b.label}>{i > 0 ? ', ' : ''}{b.label} ({fmtNum(b.count)})</span>
                ))}
              </div>
            )}
            <Link href="/hate-crimes" className="text-sm text-[#1e3a5f] hover:underline font-medium">Explore full hate crime data →</Link>
          </section>
        );
      })()}

      {/* Explore More */}
      <div className="flex flex-wrap gap-3 mt-8 mb-4">
        <Link href="/states" className="bg-[#1e3a5f] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#2a4d7a] transition">All States</Link>
        <Link href={`/safest-cities-in/${state.abbr.toLowerCase()}`} className="border border-green-600 text-green-700 px-4 py-2 rounded-lg text-sm hover:bg-green-50 transition">Safest Cities in {state.name}</Link>
        <Link href={`/most-dangerous-cities-in/${state.abbr.toLowerCase()}`} className="border border-red-600 text-red-700 px-4 py-2 rounded-lg text-sm hover:bg-red-50 transition">Most Dangerous in {state.name}</Link>
        <Link href="/tools/compare" className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">Compare Cities</Link>
        <Link href="/arrests" className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">Arrest Data</Link>
        <Link href="/hate-crimes" className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">Hate Crimes</Link>
      </div>

      {/* National Demographics Context */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <h3 className="font-heading text-lg font-bold mb-2">Arrest Demographics (National)</h3>
        <p className="text-sm text-gray-600 mb-3">
          The FBI publishes state-level total arrest counts but does not break down arrest demographics
          by race at the state level in the same detail as national data. For national arrest demographic
          patterns, see our dedicated pages:
        </p>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <Link href="/arrest-demographics" className="text-[#1e3a5f] hover:underline font-medium">National Arrest Demographics →</Link>
          <Link href="/analysis/racial-disparities" className="text-[#1e3a5f] hover:underline font-medium">Racial Disparities Analysis →</Link>
          <Link href="/analysis/crime-by-race" className="text-[#1e3a5f] hover:underline font-medium">Crime by Race →</Link>
          <Link href="/analysis/who-commits-crime" className="text-[#1e3a5f] hover:underline font-medium">Who Commits Crime? →</Link>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <h3 className="font-heading text-lg font-bold mb-3">Related Analysis</h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <Link href="/analysis/crime-decline" className="text-[#1e3a5f] hover:underline">The Great Crime Decline →</Link>
          <Link href="/analysis/rural-vs-urban" className="text-[#1e3a5f] hover:underline">Rural vs Urban Crime →</Link>
          <Link href="/analysis/defund-police" className="text-[#1e3a5f] hover:underline">Police Funding &amp; Crime →</Link>
          <Link href="/tools/state-compare" className="text-[#1e3a5f] hover:underline">Compare States Tool →</Link>
        </div>
      </div>

      {/* Cross-links */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
        <h3 className="font-heading text-lg font-bold mb-3 text-[#1e3a5f]">More for {state.name}</h3>
        <div className="flex flex-wrap gap-3">
          <Link href={`/state-report-card/${state.abbr.toLowerCase()}`} className="bg-[#1e3a5f] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2a4d7a] transition">
            {state.name} Report Card →
          </Link>
          <Link href="/tools/state-compare" className="border border-[#1e3a5f] text-[#1e3a5f] px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition">
            Compare with Other States →
          </Link>
          <Link href={`/safest-cities-in/${state.abbr.toLowerCase()}`} className="border border-green-600 text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition">
            Safest Cities in {state.name} →
          </Link>
        </div>
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
