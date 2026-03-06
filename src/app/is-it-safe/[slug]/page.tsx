import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { CityDetail, CityIndex } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const CITY_MAP: Record<string, { fullSlug: string; city: string; state: string }> = {
  'new-york': { fullSlug: 'new-york-new-york', city: 'New York', state: 'New York' },
  'los-angeles': { fullSlug: 'los-angeles-california', city: 'Los Angeles', state: 'California' },
  'chicago': { fullSlug: 'chicago-illinois', city: 'Chicago', state: 'Illinois' },
  'houston': { fullSlug: 'houston-texas', city: 'Houston', state: 'Texas' },
  'phoenix': { fullSlug: 'phoenix-arizona', city: 'Phoenix', state: 'Arizona' },
  'philadelphia': { fullSlug: 'philadelphia-pennsylvania', city: 'Philadelphia', state: 'Pennsylvania' },
  'san-antonio': { fullSlug: 'san-antonio-texas', city: 'San Antonio', state: 'Texas' },
  'san-diego': { fullSlug: 'san-diego-california', city: 'San Diego', state: 'California' },
  'dallas': { fullSlug: 'dallas-texas', city: 'Dallas', state: 'Texas' },
  'austin': { fullSlug: 'austin-texas', city: 'Austin', state: 'Texas' },
  'miami': { fullSlug: 'miami-florida', city: 'Miami', state: 'Florida' },
  'san-francisco': { fullSlug: 'san-francisco-california', city: 'San Francisco', state: 'California' },
  'seattle': { fullSlug: 'seattle-washington', city: 'Seattle', state: 'Washington' },
  'denver': { fullSlug: 'denver-colorado', city: 'Denver', state: 'Colorado' },
  'detroit': { fullSlug: 'detroit-michigan', city: 'Detroit', state: 'Michigan' },
  'nashville': { fullSlug: 'metropolitan-nashville-police-department-tennessee', city: 'Nashville', state: 'Tennessee' },
  'portland': { fullSlug: 'portland-oregon', city: 'Portland', state: 'Oregon' },
  'las-vegas': { fullSlug: 'las-vegas-metropolitan-police-department-nevada', city: 'Las Vegas', state: 'Nevada' },
  'memphis': { fullSlug: 'memphis-tennessee', city: 'Memphis', state: 'Tennessee' },
  'baltimore': { fullSlug: 'baltimore-maryland', city: 'Baltimore', state: 'Maryland' },
  'minneapolis': { fullSlug: 'minneapolis-minnesota', city: 'Minneapolis', state: 'Minnesota' },
  'boston': { fullSlug: 'boston-massachusetts', city: 'Boston', state: 'Massachusetts' },
  'atlanta': { fullSlug: 'atlanta-georgia', city: 'Atlanta', state: 'Georgia' },
  'charlotte': { fullSlug: 'charlotte-mecklenburg-north-carolina', city: 'Charlotte', state: 'North Carolina' },
  'san-jose': { fullSlug: 'san-jose-california', city: 'San Jose', state: 'California' },
  'columbus': { fullSlug: 'columbus-ohio', city: 'Columbus', state: 'Ohio' },
  'jacksonville': { fullSlug: 'jacksonville-florida', city: 'Jacksonville', state: 'Florida' },
  'indianapolis': { fullSlug: 'indianapolis-indiana', city: 'Indianapolis', state: 'Indiana' },
  'milwaukee': { fullSlug: 'milwaukee-wisconsin', city: 'Milwaukee', state: 'Wisconsin' },
  'kansas-city-missouri': { fullSlug: 'kansas-city-missouri', city: 'Kansas City', state: 'Missouri' },
  'new-orleans': { fullSlug: 'new-orleans-louisiana', city: 'New Orleans', state: 'Louisiana' },
  'tampa': { fullSlug: 'tampa-florida', city: 'Tampa', state: 'Florida' },
  'pittsburgh': { fullSlug: 'pittsburgh-pennsylvania', city: 'Pittsburgh', state: 'Pennsylvania' },
  'st-louis-missouri': { fullSlug: 'st-louis-missouri', city: 'St. Louis', state: 'Missouri' },
  'oakland': { fullSlug: 'oakland-california', city: 'Oakland', state: 'California' },
  'raleigh': { fullSlug: 'raleigh-north-carolina', city: 'Raleigh', state: 'North Carolina' },
  'sacramento': { fullSlug: 'sacramento-california', city: 'Sacramento', state: 'California' },
  'tucson': { fullSlug: 'tucson-arizona', city: 'Tucson', state: 'Arizona' },
  'oklahoma-city': { fullSlug: 'oklahoma-city-oklahoma', city: 'Oklahoma City', state: 'Oklahoma' },
  'albuquerque': { fullSlug: 'albuquerque-new-mexico', city: 'Albuquerque', state: 'New Mexico' },
  'louisville': { fullSlug: 'louisville-metro-kentucky', city: 'Louisville', state: 'Kentucky' },
  'richmond': { fullSlug: 'richmond-virginia', city: 'Richmond', state: 'Virginia' },
  'birmingham': { fullSlug: 'birmingham-alabama', city: 'Birmingham', state: 'Alabama' },
  'buffalo': { fullSlug: 'buffalo-new-york', city: 'Buffalo', state: 'New York' },
  'salt-lake-city': { fullSlug: 'salt-lake-city-utah', city: 'Salt Lake City', state: 'Utah' },
  'omaha': { fullSlug: 'omaha-nebraska', city: 'Omaha', state: 'Nebraska' },
  'el-paso': { fullSlug: 'el-paso-texas', city: 'El Paso', state: 'Texas' },
  'tulsa': { fullSlug: 'tulsa-oklahoma', city: 'Tulsa', state: 'Oklahoma' },
  'cleveland': { fullSlug: 'cleveland-ohio', city: 'Cleveland', state: 'Ohio' },
  'cincinnati': { fullSlug: 'cincinnati-ohio', city: 'Cincinnati', state: 'Ohio' },
};

export async function generateStaticParams() {
  return Object.keys(CITY_MAP).map(slug => ({ slug }));
}

function getSafetyGrade(violentRate: number): string {
  if (violentRate < 150) return 'A';
  if (violentRate < 300) return 'B';
  if (violentRate < 450) return 'C';
  if (violentRate < 600) return 'D';
  return 'F';
}

function getGradeColor(grade: string): string {
  const colors: Record<string, string> = {
    A: 'text-green-600 bg-green-50 border-green-200',
    B: 'text-blue-600 bg-blue-50 border-blue-200',
    C: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    D: 'text-orange-600 bg-orange-50 border-orange-200',
    F: 'text-red-600 bg-red-50 border-red-200',
  };
  return colors[grade] || colors.C;
}

const NATIONAL_VIOLENT = 359.1;
const NATIONAL_PROPERTY = 1760.1;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const info = CITY_MAP[slug];
  if (!info) return {};
  const { city, state } = info;
  return {
    title: `Is ${city} Safe? ${city}, ${state} Crime Rate & Safety Guide (2024)`,
    description: `Is ${city} safe? See ${city}'s crime rate, safety grade, violent crime stats, and how it compares to the national average. Data-backed safety analysis.`,
    alternates: { canonical: `https://www.opencrime.us/is-it-safe/${slug}` },
    openGraph: {
      title: `Is ${city} Safe? Crime Rate & Safety Analysis`,
      description: `${city} crime rate, safety grade, and neighborhood safety analysis. Updated 2024 FBI data.`,
      url: `https://www.opencrime.us/is-it-safe/${slug}`,
    },
  };
}

export default async function IsItSafePage({ params }: Props) {
  const { slug } = await params;
  const info = CITY_MAP[slug];
  if (!info) notFound();

  const { fullSlug, city, state } = info;
  const detail = loadData<CityDetail>(`cities/${fullSlug}.json`);
  const years = Object.keys(detail.years).map(Number).sort((a, b) => b - a);
  const latestYear = years[0];
  const latest = detail.years[String(latestYear)];
  const prevYear = years.length > 1 ? years[1] : null;
  const prev = prevYear ? detail.years[String(prevYear)] : null;

  const violentRate = latest.violentRate;
  const propertyRate = latest.propertyRate;
  const grade = getSafetyGrade(violentRate);
  const gradeColor = getGradeColor(grade);

  // Safety percentile from city-index
  const cityIndex = loadData<CityIndex[]>('city-index.json');
  const cityEntry = cityIndex.find(c => c.slug === fullSlug);
  const safetyPercentile = cityEntry?.safetyPercentile ?? 50;
  const saferThan = 100 - safetyPercentile;

  // Crime breakdown
  const murderPct = latest.murder > 0 ? ((latest.murder / latest.violentCrime) * 100) : 0;
  const rapePct = latest.rape > 0 ? ((latest.rape / latest.violentCrime) * 100) : 0;
  const robberyPct = latest.robbery > 0 ? ((latest.robbery / latest.violentCrime) * 100) : 0;
  const assaultPct = latest.aggravatedAssault > 0 ? ((latest.aggravatedAssault / latest.violentCrime) * 100) : 0;

  // YoY trend
  const violentChange = prev ? ((violentRate - prev.violentRate) / prev.violentRate * 100) : null;
  const propertyChange = prev ? ((propertyRate - prev.propertyRate) / prev.propertyRate * 100) : null;

  const violentVsNational = ((violentRate / NATIONAL_VIOLENT) * 100 - 100);
  const propertyVsNational = ((propertyRate / NATIONAL_PROPERTY) * 100 - 100);

  // Determine worst crime type
  const crimeBreakdown = [
    { name: 'Aggravated Assault', count: latest.aggravatedAssault, rate: (latest.aggravatedAssault / latest.population * 100000) },
    { name: 'Robbery', count: latest.robbery, rate: (latest.robbery / latest.population * 100000) },
    { name: 'Rape', count: latest.rape, rate: (latest.rape / latest.population * 100000) },
    { name: 'Murder', count: latest.murder, rate: (latest.murder / latest.population * 100000) },
    { name: 'Burglary', count: latest.burglary, rate: (latest.burglary / latest.population * 100000) },
    { name: 'Larceny-Theft', count: latest.larceny, rate: (latest.larceny / latest.population * 100000) },
    { name: 'Motor Vehicle Theft', count: latest.motorVehicleTheft, rate: (latest.motorVehicleTheft / latest.population * 100000) },
  ].sort((a, b) => b.count - a.count);

  // Verdict
  let verdict = '';
  if (grade === 'A' || grade === 'B') {
    verdict = `${city} is generally a safe city. With a violent crime rate ${violentVsNational > 0 ? 'above' : 'below'} the national average, most visitors and residents can feel secure in most neighborhoods. Standard urban precautions apply.`;
  } else if (grade === 'C') {
    verdict = `${city} has a moderate crime rate. While not among the most dangerous cities, crime rates are notable. Most areas are safe during the day, but some neighborhoods require extra caution, especially at night.`;
  } else {
    verdict = `${city} has a higher-than-average crime rate. Visitors should research specific neighborhoods before visiting. Many areas are perfectly safe, but concentrated pockets of violence do exist. The city has been working on crime reduction initiatives.`;
  }

  const aiInsights = [
    `${city}'s violent crime rate is ${fmtRate(violentRate)} per 100K — ${violentVsNational > 0 ? `${violentVsNational.toFixed(0)}% above` : `${Math.abs(violentVsNational).toFixed(0)}% below`} the national average`,
    `Safety Grade: ${grade} — Safer than ${saferThan}% of US cities`,
    `${fmtNum(latest.violentCrime)} violent crimes and ${fmtNum(latest.propertyCrime)} property crimes reported in ${latestYear}`,
    violentChange !== null ? `Violent crime ${violentChange > 0 ? 'increased' : 'decreased'} ${Math.abs(violentChange).toFixed(1)}% from ${prevYear}` : `Single year of data available`,
    `Most common violent crime: ${crimeBreakdown[0].name} (${fmtNum(crimeBreakdown[0].count)} incidents)`,
  ];

  const faqItems = [
    { q: `Is ${city} safe to visit?`, a: verdict },
    { q: `What is the crime rate in ${city}?`, a: `${city}'s violent crime rate is ${fmtRate(violentRate)} per 100,000 residents (${latestYear}). The property crime rate is ${fmtRate(propertyRate)} per 100,000. The national violent crime rate is ${NATIONAL_VIOLENT} per 100,000.` },
    { q: `Is ${city} safe at night?`, a: `Like any major city, safety at night varies by neighborhood. Tourist areas and well-trafficked neighborhoods are generally safe. Research specific neighborhoods before going out at night and use standard urban safety precautions.` },
    { q: `How does ${city} crime compare to the national average?`, a: `${city}'s violent crime rate is ${violentVsNational > 0 ? `${violentVsNational.toFixed(0)}% above` : `${Math.abs(violentVsNational).toFixed(0)}% below`} the national average of ${NATIONAL_VIOLENT} per 100K. Property crime is ${propertyVsNational > 0 ? `${propertyVsNational.toFixed(0)}% above` : `${Math.abs(propertyVsNational).toFixed(0)}% below`} the national average.` },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Is It Safe?', href: '/is-it-safe' }, { label: city }]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
        Is {city} Safe? {latestYear} Crime Data & Safety Guide
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        A data-driven look at {city}, {state} safety using FBI crime statistics.
        Last updated with {latestYear} data.
      </p>

      <AIOverview insights={aiInsights} />

      {/* Safety Grade Hero */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className={`rounded-xl border-2 p-6 text-center ${gradeColor}`}>
          <div className="text-6xl font-bold">{grade}</div>
          <div className="text-sm font-semibold mt-1">Safety Grade</div>
          <div className="text-xs mt-1">Safer than {saferThan}% of cities</div>
        </div>
        <div className="bg-white rounded-xl border p-6 text-center">
          <div className="text-3xl font-bold text-gray-900">{fmtRate(violentRate)}</div>
          <div className="text-sm text-gray-500">Violent Crime Rate</div>
          <div className={`text-xs mt-1 font-semibold ${violentVsNational > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {violentVsNational > 0 ? '+' : ''}{violentVsNational.toFixed(0)}% vs national avg
          </div>
        </div>
        <div className="bg-white rounded-xl border p-6 text-center">
          <div className="text-3xl font-bold text-gray-900">{fmtRate(propertyRate)}</div>
          <div className="text-sm text-gray-500">Property Crime Rate</div>
          <div className={`text-xs mt-1 font-semibold ${propertyVsNational > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {propertyVsNational > 0 ? '+' : ''}{propertyVsNational.toFixed(0)}% vs national avg
          </div>
        </div>
      </div>

      {/* Crime Numbers */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">{city} Crime Statistics ({latestYear})</h2>
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Crime Type</th>
                <th className="text-right p-3 font-semibold">Count</th>
                <th className="text-right p-3 font-semibold">Rate per 100K</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t font-semibold bg-red-50">
                <td className="p-3">Total Violent Crime</td>
                <td className="text-right p-3">{fmtNum(latest.violentCrime)}</td>
                <td className="text-right p-3">{fmtRate(violentRate)}</td>
              </tr>
              <tr className="border-t"><td className="p-3 pl-6">Murder</td><td className="text-right p-3">{fmtNum(latest.murder)}</td><td className="text-right p-3">{fmtRate(latest.murderRate)}</td></tr>
              <tr className="border-t"><td className="p-3 pl-6">Rape</td><td className="text-right p-3">{fmtNum(latest.rape)}</td><td className="text-right p-3">{fmtRate(latest.rape / latest.population * 100000)}</td></tr>
              <tr className="border-t"><td className="p-3 pl-6">Robbery</td><td className="text-right p-3">{fmtNum(latest.robbery)}</td><td className="text-right p-3">{fmtRate(latest.robbery / latest.population * 100000)}</td></tr>
              <tr className="border-t"><td className="p-3 pl-6">Aggravated Assault</td><td className="text-right p-3">{fmtNum(latest.aggravatedAssault)}</td><td className="text-right p-3">{fmtRate(latest.aggravatedAssault / latest.population * 100000)}</td></tr>
              <tr className="border-t font-semibold bg-amber-50">
                <td className="p-3">Total Property Crime</td>
                <td className="text-right p-3">{fmtNum(latest.propertyCrime)}</td>
                <td className="text-right p-3">{fmtRate(propertyRate)}</td>
              </tr>
              <tr className="border-t"><td className="p-3 pl-6">Burglary</td><td className="text-right p-3">{fmtNum(latest.burglary)}</td><td className="text-right p-3">{fmtRate(latest.burglary / latest.population * 100000)}</td></tr>
              <tr className="border-t"><td className="p-3 pl-6">Larceny-Theft</td><td className="text-right p-3">{fmtNum(latest.larceny)}</td><td className="text-right p-3">{fmtRate(latest.larceny / latest.population * 100000)}</td></tr>
              <tr className="border-t"><td className="p-3 pl-6">Motor Vehicle Theft</td><td className="text-right p-3">{fmtNum(latest.motorVehicleTheft)}</td><td className="text-right p-3">{fmtRate(latest.motorVehicleTheft / latest.population * 100000)}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Crime Breakdown */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">Violent Crime Breakdown</h2>
        <div className="bg-white rounded-xl border p-6">
          <div className="space-y-3">
            {[
              { label: 'Aggravated Assault', pct: assaultPct, color: 'bg-red-500' },
              { label: 'Robbery', pct: robberyPct, color: 'bg-orange-500' },
              { label: 'Rape', pct: rapePct, color: 'bg-yellow-500' },
              { label: 'Murder', pct: murderPct, color: 'bg-red-800' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.label}</span>
                  <span className="font-semibold">{item.pct.toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Year-over-Year Trend */}
      {violentChange !== null && prev && (
        <section className="mb-10">
          <h2 className="font-heading text-2xl font-bold mb-4">Year-over-Year Trend</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-semibold text-sm text-gray-500 mb-2">Violent Crime</h3>
              <div className={`text-2xl font-bold ${violentChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {violentChange > 0 ? '↑' : '↓'} {Math.abs(violentChange).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {fmtRate(prev.violentRate)} → {fmtRate(violentRate)} per 100K
              </div>
            </div>
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-semibold text-sm text-gray-500 mb-2">Property Crime</h3>
              <div className={`text-2xl font-bold ${(propertyChange ?? 0) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {(propertyChange ?? 0) > 0 ? '↑' : '↓'} {Math.abs(propertyChange ?? 0).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {fmtRate(prev.propertyRate)} → {fmtRate(propertyRate)} per 100K
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Neighborhood Context */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">Neighborhood Safety Context</h2>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-gray-700 mb-4">
            Like all major cities, {city}&apos;s crime is not evenly distributed. Crime tends to concentrate
            in specific neighborhoods — often those with higher poverty rates and fewer resources. Tourist areas,
            business districts, and affluent residential neighborhoods typically have significantly lower crime rates
            than the city average suggests.
          </p>
          <p className="text-gray-700">
            The citywide crime rate of {fmtRate(violentRate)} per 100K is an average across a population of{' '}
            {fmtNum(latest.population)}. Some neighborhoods may be 5-10x safer than the average, while others
            may be significantly more dangerous. Always research specific neighborhoods when evaluating safety.
          </p>
        </div>
      </section>

      {/* Verdict */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">Verdict: Is {city} Safe?</h2>
        <div className="bg-gray-50 rounded-xl border p-6">
          <p className="text-gray-800 text-lg">{verdict}</p>
        </div>
      </section>

      {/* Link to full profile */}
      <div className="mb-10">
        <Link href={`/cities/${fullSlug}`} className="inline-block bg-[#1e3a5f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2a4a6f] transition">
          View Full {city} Crime Profile →
        </Link>
      </div>

      <ShareButtons title={`Is ${city} Safe? Crime Data & Safety Guide`} />

      {/* FAQ JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      })}} />

      {/* WebPage JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `Is ${city} Safe? ${latestYear} Crime Data & Safety Guide`,
        description: `Data-driven safety analysis for ${city}, ${state}`,
        url: `https://www.opencrime.us/is-it-safe/${slug}`,
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        dateModified: new Date().toISOString().split('T')[0],
      })}} />
    </div>
  );
}
