import { Metadata } from 'next';
import { loadData, fmtNum, fmtRate, stateAbbr } from '@/lib/utils';
import type { CityIndex, StateSummary } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import AIOverview from '@/components/AIOverview';
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
    title: `Most Dangerous Cities in ${name} (2024) — Crime Rates & Rankings | OpenCrime`,
    description: `The most dangerous cities in ${name} ranked by violent crime rate. 2024 FBI data on murder, assault, robbery, and property crime for every city.`,
    openGraph: {
      title: `Most Dangerous Cities in ${name} (2024)`,
      description: `Complete ranking of the most dangerous cities in ${name} based on FBI data. Violent crime rates, murder rates, and safety grades.`,
      url: `https://www.opencrime.us/most-dangerous-cities-in/${abbr.toLowerCase()}`,
    },
    alternates: { canonical: `https://www.opencrime.us/most-dangerous-cities-in/${abbr.toLowerCase()}` },
  };
}

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

export default async function MostDangerousCitiesInStatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state: abbr } = await params;
  const st = states.find(s => s.abbr.toLowerCase() === abbr.toLowerCase());
  if (!st) return <div className="max-w-4xl mx-auto px-4 py-10"><h1>State not found</h1></div>;

  const stateCities = allCities
    .filter(c => stateAbbr(c.state) === st.abbr && c.violentRate >= 0)
    .sort((a, b) => b.violentRate - a.violentRate);

  // Use population floor to avoid tiny cities with extreme per-capita rates
  const rankable = stateCities.filter(c => c.population >= 10000);
  const useRankable = rankable.length >= 10 ? rankable : stateCities.filter(c => c.population >= 1000);
  const dangerous = useRankable.sort((a, b) => b.violentRate - a.violentRate).slice(0, 25);
  const totalCities = stateCities.length;
  const avgRate = stateCities.length > 0
    ? Math.round(stateCities.reduce((s, c) => s + c.violentRate, 0) / stateCities.length * 10) / 10
    : 0;

  const nationalAvg = 359.1;
  const aboveNational = dangerous.filter(c => c.violentRate > nationalAvg).length;

  const insights = [
    dangerous[0] ? `${dangerous[0].city} has the highest violent crime rate in ${st.name} at ${fmtRate(dangerous[0].violentRate)} per 100K — ${(dangerous[0].violentRate / nationalAvg).toFixed(1)}x the national average.` : '',
    `${aboveNational} of the top 25 most dangerous cities in ${st.name} exceed the national average violent crime rate of ${nationalAvg}/100K.`,
    dangerous.length >= 3 ? `The top 3 — ${dangerous.slice(0, 3).map(c => c.city).join(', ')} — account for a combined ${fmtNum(dangerous.slice(0, 3).reduce((s, c) => s + c.violentCrime, 0))} violent crimes.` : '',
    `${st.name}'s statewide violent crime rate is ${fmtRate(st.violentRate)}/100K, ${st.violentRate > nationalAvg ? `${((st.violentRate / nationalAvg - 1) * 100).toFixed(0)}% above` : `${((1 - st.violentRate / nationalAvg) * 100).toFixed(0)}% below`} the national average.`,
  ].filter(Boolean);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'States', href: '/states' }, { label: st.name, href: `/states/${st.abbr.toLowerCase()}` }, { label: 'Most Dangerous Cities' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Most Dangerous Cities in {st.name} (2024)</h1>
      <p className="text-lg text-gray-600 mb-6">
        The {dangerous.length} most dangerous cities in {st.name} ranked by violent crime rate per 100,000 residents, based on 2024 FBI data.
        {st.name} has {fmtNum(totalCities)} cities reporting crime data.
      </p>

      <AIOverview insights={insights} />

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-700">{fmtRate(dangerous[0]?.violentRate)}</p>
          <p className="text-sm text-gray-600">Highest Rate</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-orange-700">{fmtRate(st.violentRate)}</p>
          <p className="text-sm text-gray-600">State Average</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-[#1e3a5f]">{fmtRate(nationalAvg)}</p>
          <p className="text-sm text-gray-600">National Average</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-700">{aboveNational}</p>
          <p className="text-sm text-gray-600">Above National Avg</p>
        </div>
      </div>

      {/* Main table */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">Top 25 Most Dangerous Cities in {st.name}</h2>
        <p className="text-sm text-gray-500 mb-4">Ranked by violent crime rate per 100,000 residents. Only cities with 10,000+ residents are included to avoid statistical distortion from tiny populations.</p>
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
              {dangerous.map((c, i) => (
                <tr key={c.slug} className={`border-b border-gray-100 hover:bg-gray-50 ${i < 3 ? 'bg-red-50/30' : ''}`}>
                  <td className="p-3 text-gray-400 font-bold">{i + 1}</td>
                  <td className="p-3"><Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline font-medium">{c.city}</Link></td>
                  <td className="p-3 text-right font-mono">{fmtNum(c.population)}</td>
                  <td className="p-3 text-right font-mono text-red-600 font-bold">{fmtRate(c.violentRate)}</td>
                  <td className="p-3 text-right font-mono">{fmtRate(c.murderRate)}</td>
                  <td className="p-3 text-right font-mono">{fmtRate(c.propertyRate)}</td>
                  <td className="p-3 text-center"><span className={`text-xs font-bold px-2 py-1 rounded-full ${gradeColor(c.safetyPercentile)}`}>{grade(c.safetyPercentile)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Context section */}
      <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-3">Understanding the Data</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>Violent crime</strong> includes murder, rape, robbery, and aggravated assault as defined by the FBI&apos;s Uniform Crime Reporting (UCR) program.
            Rates are per 100,000 residents and based on the latest 2024 data.
          </p>
          <p>
            <strong>Why population matters:</strong> Cities under 10,000 are excluded from this ranking because a single incident
            can produce an extremely high per-capita rate. A city of 500 with one murder has a &quot;murder rate&quot; of 200/100K —
            statistically meaningless.
          </p>
          <p>
            <strong>Not all crime is reported.</strong> FBI data only captures crimes reported to police. The Bureau of Justice
            Statistics estimates only ~40% of violent crimes are reported.{' '}
            <Link href="/hidden-crime" className="text-[#1e3a5f] hover:underline">See our hidden crime estimates →</Link>
          </p>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href={`/safest-cities-in/${st.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline font-medium">→ Safest Cities in {st.name}</Link>
        <Link href={`/states/${st.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">→ {st.name} Crime Overview</Link>
        <Link href="/most-dangerous-cities" className="text-[#1e3a5f] hover:underline">→ Most Dangerous Cities in America</Link>
        <Link href="/rankings" className="text-[#1e3a5f] hover:underline">→ National Rankings</Link>
      </div>

      <ShareButtons title={`Most Dangerous Cities in ${st.name} (2024)`} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: `What is the most dangerous city in ${st.name}?`, acceptedAnswer: { '@type': 'Answer', text: dangerous[0] ? `Based on 2024 FBI data, ${dangerous[0].city} is the most dangerous city in ${st.name} with a violent crime rate of ${dangerous[0].violentRate.toFixed(1)} per 100,000 residents.` : 'Data not available.' } },
          { '@type': 'Question', name: `How does ${st.name}'s crime rate compare to the national average?`, acceptedAnswer: { '@type': 'Answer', text: `${st.name}'s statewide violent crime rate is ${st.violentRate.toFixed(1)} per 100K, ${st.violentRate > nationalAvg ? 'above' : 'below'} the national average of ${nationalAvg}/100K.` } },
          { '@type': 'Question', name: `How many cities in ${st.name} have high crime rates?`, acceptedAnswer: { '@type': 'Answer', text: `${aboveNational} cities in ${st.name} with 10K+ population have violent crime rates above the national average of ${nationalAvg}/100K.` } },
        ]
      })}} />
    </main>
  );
}
