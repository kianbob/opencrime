import { Metadata } from 'next';
import { loadData, fmtNum, fmtRate, stateAbbr, slugify } from '@/lib/utils';
import type { CityIndex, StateSummary } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import Link from 'next/link';

const states = loadData<StateSummary[]>('state-summary.json');
const allCities = loadData<CityIndex[]>('city-index.json');

export async function generateStaticParams() {
  return states.map(s => ({ state: s.abbr.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state: abbr } = await params;
  const st = states.find(s => s.abbr.toLowerCase() === abbr.toLowerCase());
  const name = st?.name || abbr.toUpperCase();
  return {
    title: `Safest Cities in ${name} (2024) — Crime Rates & Rankings | OpenCrime`,
    description: `Ranked list of the safest cities in ${name} based on 2024 FBI crime data. See violent crime rates, murder rates, property crime, and safety scores for every city.`,
    openGraph: {
      title: `Safest Cities in ${name} (2024)`,
      description: `Complete ranking of the safest and most dangerous cities in ${name} based on FBI data.`,
      url: `https://www.opencrime.us/safest-cities-in/${abbr.toLowerCase()}`,
    },
    alternates: { canonical: `https://www.opencrime.us/safest-cities-in/${abbr.toLowerCase()}` },
  };
}

// safetyPercentile: 0 = safest, 100 = most dangerous. Invert for grades.
function gradeColor(pct: number): string {
  if (pct <= 20) return 'bg-green-100 text-green-700';
  if (pct <= 40) return 'bg-lime-100 text-lime-700';
  if (pct <= 60) return 'bg-yellow-100 text-yellow-700';
  if (pct <= 80) return 'bg-orange-100 text-orange-700';
  return 'bg-red-100 text-red-700';
}

function grade(pct: number): string {
  if (pct <= 10) return 'A+';
  if (pct <= 20) return 'A';
  if (pct <= 30) return 'B+';
  if (pct <= 40) return 'B';
  if (pct <= 50) return 'C+';
  if (pct <= 60) return 'C';
  if (pct <= 70) return 'D+';
  if (pct <= 80) return 'D';
  return 'F';
}

export default async function SafestCitiesInStatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state: abbr } = await params;
  const st = states.find(s => s.abbr.toLowerCase() === abbr.toLowerCase());
  if (!st) return <div className="max-w-4xl mx-auto px-4 py-10"><h1>State not found</h1></div>;

  const stateCities = allCities
    .filter(c => stateAbbr(c.state) === st.abbr && c.violentRate >= 0)
    .sort((a, b) => a.violentRate - b.violentRate);

  const safest = stateCities.slice(0, 25);
  const dangerous = [...stateCities].reverse().slice(0, 15);
  const totalCities = stateCities.length;
  const medianRate = stateCities[Math.floor(totalCities / 2)]?.violentRate || 0;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'States', href: '/states' }, { label: st.name, href: `/states/${st.abbr.toLowerCase()}` }, { label: 'Safest Cities' }]} />
      <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">Safest Cities in {st.name} (2024)</h1>
      <p className="text-lg text-gray-600 mb-8">
        Ranked by violent crime rate per 100,000 residents from 2024 FBI data. {st.name} has {fmtNum(totalCities)} cities
        reporting crime data, with a statewide violent crime rate of {fmtRate(st.violentRate)} per 100K.
      </p>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-primary">{fmtNum(totalCities)}</p>
          <p className="text-sm text-gray-600">Cities Tracked</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{fmtRate(safest[0]?.violentRate)}</p>
          <p className="text-sm text-gray-600">Safest City Rate</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-yellow-700">{fmtRate(medianRate)}</p>
          <p className="text-sm text-gray-600">Median City Rate</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-700">{fmtRate(dangerous[0]?.violentRate)}</p>
          <p className="text-sm text-gray-600">Highest Rate</p>
        </div>
      </div>

      {/* Safest cities table */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-primary mb-4">Top 25 Safest Cities in {st.name}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">#</th>
                <th className="text-left p-3 font-semibold">City</th>
                <th className="text-right p-3 font-semibold">Population</th>
                <th className="text-right p-3 font-semibold">Violent Rate</th>
                <th className="text-right p-3 font-semibold">Murder Rate</th>
                <th className="text-right p-3 font-semibold">Property Rate</th>
                <th className="text-center p-3 font-semibold">Grade</th>
              </tr>
            </thead>
            <tbody>
              {safest.map((c, i) => (
                <tr key={c.slug} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 text-gray-400">{i + 1}</td>
                  <td className="p-3"><Link href={`/cities/${c.slug}`} className="text-primary hover:underline font-medium">{c.city}</Link></td>
                  <td className="p-3 text-right font-mono">{fmtNum(c.population)}</td>
                  <td className="p-3 text-right font-mono text-green-600">{fmtRate(c.violentRate)}</td>
                  <td className="p-3 text-right font-mono">{fmtRate(c.murderRate)}</td>
                  <td className="p-3 text-right font-mono">{fmtRate(c.propertyRate)}</td>
                  <td className="p-3 text-center"><span className={`text-xs font-bold px-2 py-1 rounded-full ${gradeColor(c.safetyPercentile)}`}>{grade(c.safetyPercentile)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Most dangerous */}
      {dangerous.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-4">Most Dangerous Cities in {st.name}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-semibold">#</th>
                  <th className="text-left p-3 font-semibold">City</th>
                  <th className="text-right p-3 font-semibold">Population</th>
                  <th className="text-right p-3 font-semibold">Violent Rate</th>
                  <th className="text-right p-3 font-semibold">Murder Rate</th>
                  <th className="text-center p-3 font-semibold">Grade</th>
                </tr>
              </thead>
              <tbody>
                {dangerous.map((c, i) => (
                  <tr key={c.slug} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 text-gray-400">{i + 1}</td>
                    <td className="p-3"><Link href={`/cities/${c.slug}`} className="text-primary hover:underline font-medium">{c.city}</Link></td>
                    <td className="p-3 text-right font-mono">{fmtNum(c.population)}</td>
                    <td className="p-3 text-right font-mono text-red-600">{fmtRate(c.violentRate)}</td>
                    <td className="p-3 text-right font-mono">{fmtRate(c.murderRate)}</td>
                    <td className="p-3 text-center"><span className={`text-xs font-bold px-2 py-1 rounded-full ${gradeColor(c.safetyPercentile)}`}>{grade(c.safetyPercentile)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* All cities */}
      {totalCities > 25 && (
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-4">All {fmtNum(totalCities)} Cities in {st.name}</h2>
          <p className="text-sm text-gray-500 mb-4">Complete list ranked from safest to most dangerous.</p>
          <details>
            <summary className="cursor-pointer text-primary hover:underline font-medium">Show all {fmtNum(totalCities)} cities</summary>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-2 font-semibold">#</th>
                    <th className="text-left p-2 font-semibold">City</th>
                    <th className="text-right p-2 font-semibold">Pop.</th>
                    <th className="text-right p-2 font-semibold">Violent Rate</th>
                    <th className="text-center p-2 font-semibold">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {stateCities.map((c, i) => (
                    <tr key={c.slug} className="border-b border-gray-100">
                      <td className="p-2 text-gray-400">{i + 1}</td>
                      <td className="p-2"><Link href={`/cities/${c.slug}`} className="text-primary hover:underline">{c.city}</Link></td>
                      <td className="p-2 text-right font-mono">{fmtNum(c.population)}</td>
                      <td className="p-2 text-right font-mono">{fmtRate(c.violentRate)}</td>
                      <td className="p-2 text-center"><span className={`text-xs px-2 py-1 rounded-full ${gradeColor(c.safetyPercentile)}`}>{grade(c.safetyPercentile)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </section>
      )}

      {/* Crime Composition for State */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-primary mb-4">Crime Composition in {st.name}</h2>
        <p className="text-sm text-gray-500 mb-4">How violent crime breaks down across cities reporting data in {st.name}.</p>
        {(() => {
          const citiesWithComp = stateCities.filter(c => c.composition && (c.composition.murderPct + c.composition.rapePct + c.composition.robberyPct + c.composition.assaultPct) > 0);
          const totalV = citiesWithComp.reduce((s, c) => s + c.violentCrime, 0);
          if (totalV === 0) return <p className="text-gray-500">Insufficient data for composition breakdown.</p>;
          const mPct = citiesWithComp.reduce((s, c) => s + c.murder, 0) / totalV * 100;
          const rPct = citiesWithComp.reduce((s, c) => s + (c.violentCrime * (c.composition?.robberyPct || 0) / 100), 0) / totalV * 100;
          const aPct = citiesWithComp.reduce((s, c) => s + (c.violentCrime * (c.composition?.assaultPct || 0) / 100), 0) / totalV * 100;
          const rpPct = 100 - mPct - rPct - aPct;
          const bars = [
            { label: 'Agg. Assault', pct: aPct, color: 'bg-red-500' },
            { label: 'Robbery', pct: rPct, color: 'bg-orange-500' },
            { label: 'Rape', pct: rpPct > 0 ? rpPct : 0, color: 'bg-yellow-500' },
            { label: 'Murder', pct: mPct, color: 'bg-gray-900' },
          ];
          return (
            <div>
              <div className="flex h-6 rounded-full overflow-hidden mb-3">
                {bars.map(b => b.pct > 0.5 && <div key={b.label} className={`${b.color}`} style={{ width: `${b.pct}%` }} />)}
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                {bars.map(b => (
                  <div key={b.label} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${b.color}`} />
                    <span>{b.label}: {b.pct.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                State violent crime rate: {fmtRate(st.violentRate)}/100K vs national average: 359.1/100K
                ({st.violentRate > 359.1 ? `${((st.violentRate / 359.1 - 1) * 100).toFixed(0)}% above` : `${((1 - st.violentRate / 359.1) * 100).toFixed(0)}% below`} national average)
              </p>
            </div>
          );
        })()}
      </section>

      <section className="prose prose-gray max-w-none">
        <h2 className="font-display text-2xl font-bold text-primary">About This Data</h2>
        <p>
          Crime rates are from the FBI&apos;s 2024 Uniform Crime Report, the most recent data available. Rates are per 100,000
          residents. Safety grades are based on national percentile ranking — an &quot;A&quot; means the city is safer than 80%+
          of all US cities in our database.
        </p>
        <p>
          Not all cities report to the FBI. Small agencies may have incomplete data. Always consider multiple years of data 
          before drawing conclusions about a city&apos;s safety.
        </p>
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href={`/states/${st.abbr.toLowerCase()}`} className="text-primary hover:underline">→ {st.name} Crime Overview</Link>
        <Link href="/safest-cities" className="text-primary hover:underline">→ Safest Cities in America</Link>
        <Link href="/rankings" className="text-primary hover:underline">→ National Rankings</Link>
        <Link href="/tools/safety-score" className="text-primary hover:underline">→ Safety Score Calculator</Link>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <p className="text-sm text-gray-600">
          <strong>National demographic context:</strong> Crime and safety vary across racial and ethnic groups.
          Per-city demographic data is not published by the FBI, but national patterns show significant disparities.{' '}
          <Link href="/arrest-demographics" className="text-[#1e3a5f] hover:underline">Full demographics</Link> |{' '}
          <Link href="/analysis/racial-disparities" className="text-[#1e3a5f] hover:underline">Racial disparities</Link>
        </p>
      </div>

      <ShareButtons title={`Safest Cities in ${st.name} (2024)`} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: `What is the safest city in ${st.name}?`, acceptedAnswer: { '@type': 'Answer', text: safest[0] ? `Based on 2024 FBI data, ${safest[0].city} is the safest city in ${st.name} with a violent crime rate of ${safest[0].violentRate.toFixed(1)} per 100,000 residents.` : 'Data not available.' } },
          { '@type': 'Question', name: `What is the most dangerous city in ${st.name}?`, acceptedAnswer: { '@type': 'Answer', text: dangerous[0] ? `${dangerous[0].city} has the highest violent crime rate in ${st.name} at ${dangerous[0].violentRate.toFixed(1)} per 100,000 residents in 2024.` : 'Data not available.' } },
          { '@type': 'Question', name: `How many cities in ${st.name} report crime data?`, acceptedAnswer: { '@type': 'Answer', text: `${totalCities} cities in ${st.name} reported crime data to the FBI in 2024.` } },
        ]
      })}} />
    </main>
  );
}
