import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { loadData, fmtNum, fmtRate, fmtPct, stateAbbr } from '@/lib/utils';
import type { CityIndex, CityDetail, StateSummary } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import AIOverview from '@/components/AIOverview';
import Link from 'next/link';

const allCities = loadData<CityIndex[]>('city-index.json');
const states = loadData<StateSummary[]>('state-summary.json');
const nationalViolentRate = 359.1;
const nationalPropertyRate = 1955;

// Get top 100 cities by population first
const top100Cities = allCities
  .filter(c => c.population >= 100000)
  .sort((a, b) => b.population - a.population)
  .slice(0, 100);

// Create a mapping from simple slug to full data slug for only top 100 cities
const CITY_SLUG_MAP: Record<string, string> = {};

// Build the mapping by processing only the top 100 cities
top100Cities.forEach(city => {
  // Handle special cases
  if (city.slug === 'las-vegas-metropolitan-police-department-nevada') {
    CITY_SLUG_MAP['las-vegas'] = city.slug;
    return;
  }
  
  // General case: take city name, clean it up
  let simpleSlug = city.city.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
  
  // Handle conflicts by checking if slug already exists
  let finalSlug = simpleSlug;
  let counter = 1;
  while (CITY_SLUG_MAP[finalSlug] && CITY_SLUG_MAP[finalSlug] !== city.slug) {
    finalSlug = `${simpleSlug}-${counter}`;
    counter++;
  }
  
  CITY_SLUG_MAP[finalSlug] = city.slug;
});

export async function generateStaticParams() {
  return Object.keys(CITY_SLUG_MAP).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = CITY_SLUG_MAP[slug];
  
  if (!fullSlug) return { title: 'City Not Found' };
  
  const city = allCities.find(c => c.slug === fullSlug);
  if (!city) return { title: 'City Not Found' };

  const title = `Crime Rate in ${city.city}, ${city.state} (2024) — Statistics & Data | OpenCrime`;
  const description = `Current crime rate in ${city.city}, ${city.state}: ${city.violentRate} violent crimes per 100K residents. Murder rate, property crime, safety grade, and year-over-year trends.`;

  return {
    title,
    description,
    openGraph: {
      title: `Crime Rate in ${city.city}, ${city.state} (2024)`,
      description,
      url: `https://www.opencrime.us/crime-rate-in/${slug}`,
    },
    alternates: { 
      canonical: `https://www.opencrime.us/crime-rate-in/${slug}` 
    },
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

function changeColor(change: number | null): string {
  if (change === null || change === 0) return 'text-gray-600';
  return change < 0 ? 'text-green-600' : 'text-red-600';
}

export default async function CrimeRateInCityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fullSlug = CITY_SLUG_MAP[slug];
  
  if (!fullSlug) return notFound();
  
  const city = allCities.find(c => c.slug === fullSlug);
  if (!city) return notFound();

  // Get state info
  const stateInfo = states.find(s => s.abbr === stateAbbr(city.state));
  
  // Try to load city detail file for multi-year data
  let cityDetail: CityDetail | null = null;
  try {
    cityDetail = loadData<CityDetail>(`cities/${fullSlug}.json`);
  } catch (e) {
    // City detail file doesn't exist, that's ok
  }

  const safetyGrade = grade(city.safetyPercentile);
  const safetyGradeColor = gradeColor(city.safetyPercentile);
  
  // Generate insights
  const insights = [
    `${city.city} has a violent crime rate of ${fmtRate(city.violentRate)} per 100,000 residents, ${city.violentRate > nationalViolentRate ? `${((city.violentRate / nationalViolentRate - 1) * 100).toFixed(0)}% above` : `${((1 - city.violentRate / nationalViolentRate) * 100).toFixed(0)}% below`} the national average.`,
    `The murder rate in ${city.city} is ${fmtRate(city.murderRate)} per 100K, with ${fmtNum(city.murder)} homicides reported in ${city.year}.`,
    city.violentChange !== null ? `Violent crime ${city.violentChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(city.violentChange).toFixed(1)}% compared to the previous year.` : '',
    stateInfo ? `${city.city}'s violent crime rate is ${city.violentRate > stateInfo.violentRate ? 'above' : 'below'} the ${city.state} state average of ${fmtRate(stateInfo.violentRate)}/100K.` : '',
  ].filter(Boolean);

  // Get years data if available
  const yearsData = cityDetail?.years ? Object.entries(cityDetail.years)
    .map(([year, data]) => ({ year: parseInt(year), ...data }))
    .sort((a, b) => b.year - a.year)
    : [];

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'States', href: '/states' },
        { label: city.state, href: `/states/${stateAbbr(city.state).toLowerCase()}` },
        { label: `Crime Rate in ${city.city}` }
      ]} />
      
      <div className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
          Crime Rate in {city.city}, {city.state} (2024)
        </h1>
        <p className="text-lg text-gray-600">
          Current crime statistics, safety grade, and trends for {city.city} based on FBI data.
        </p>
      </div>

      <AIOverview insights={insights} />

      {/* Hero stats */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-[#1e3a5f]">{fmtNum(city.population)}</p>
          <p className="text-sm text-gray-600">Population</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-700">{fmtRate(city.violentRate)}</p>
          <p className="text-sm text-gray-600">Violent Rate</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-orange-700">{fmtRate(city.murderRate)}</p>
          <p className="text-sm text-gray-600">Murder Rate</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-purple-700">{fmtRate(city.propertyRate)}</p>
          <p className="text-sm text-gray-600">Property Rate</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
          <span className={`text-lg font-bold px-3 py-1 rounded-full ${safetyGradeColor}`}>
            {safetyGrade}
          </span>
          <p className="text-sm text-gray-600 mt-1">Safety Grade</p>
        </div>
      </section>

      {/* Year-over-year change */}
      {city.violentChange !== null && (
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="font-heading text-xl font-bold mb-3">Year-over-Year Change</h2>
          <p className="text-lg">
            Violent crime in {city.city} {city.violentChange > 0 ? 'increased' : 'decreased'} by{' '}
            <span className={`font-bold ${changeColor(city.violentChange)}`}>
              {fmtPct(city.violentChange)}
            </span>{' '}
            from the previous year. The city is currently on a{' '}
            <strong>{city.trajectory}</strong> trajectory.
          </p>
        </section>
      )}

      {/* Crime composition */}
      {city.composition && (
        <section className="mb-8">
          <h2 className="font-heading text-2xl font-bold mb-4">Crime Composition</h2>
          <p className="text-gray-600 mb-4">
            Breakdown of violent crimes in {city.city} by type:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-red-700">{city.composition.murderPct.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">Murder</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-orange-700">{city.composition.rapePct.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">Rape</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-yellow-700">{city.composition.robberyPct.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">Robbery</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-purple-700">{city.composition.assaultPct.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">Assault</p>
            </div>
          </div>
        </section>
      )}

      {/* National/State comparison */}
      <section className="mb-8">
        <h2 className="font-heading text-2xl font-bold mb-4">How {city.city} Compares</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <span>National Average (Violent)</span>
            <span className="font-bold">{fmtRate(nationalViolentRate)}/100K</span>
          </div>
          {stateInfo && (
            <div className="flex justify-between items-center p-4 bg-green-50 border border-green-200 rounded-xl">
              <span>{city.state} State Average (Violent)</span>
              <span className="font-bold">{fmtRate(stateInfo.violentRate)}/100K</span>
            </div>
          )}
          <div className="flex justify-between items-center p-4 bg-red-50 border border-red-200 rounded-xl">
            <span>{city.city} (Violent)</span>
            <span className="font-bold">{fmtRate(city.violentRate)}/100K</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <span>National Average (Property)</span>
            <span className="font-bold">{fmtRate(nationalPropertyRate)}/100K</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-purple-50 border border-purple-200 rounded-xl">
            <span>{city.city} (Property)</span>
            <span className="font-bold">{fmtRate(city.propertyRate)}/100K</span>
          </div>
        </div>
      </section>

      {/* Multi-year trend */}
      {yearsData.length > 1 && (
        <section className="mb-8">
          <h2 className="font-heading text-2xl font-bold mb-4">Multi-Year Trend</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-semibold">Year</th>
                  <th className="text-right p-3 font-semibold">Population</th>
                  <th className="text-right p-3 font-semibold">Violent Rate</th>
                  <th className="text-right p-3 font-semibold">Murder Rate</th>
                  <th className="text-right p-3 font-semibold">Property Rate</th>
                </tr>
              </thead>
              <tbody>
                {yearsData.map(yearData => (
                  <tr key={yearData.year} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-bold">{yearData.year}</td>
                    <td className="p-3 text-right font-mono">{fmtNum(yearData.population)}</td>
                    <td className="p-3 text-right font-mono">{fmtRate(yearData.violentRate)}</td>
                    <td className="p-3 text-right font-mono">{fmtRate(yearData.murderRate)}</td>
                    <td className="p-3 text-right font-mono">{fmtRate(yearData.propertyRate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Related links */}
      <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-3">Related Pages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <Link href={`/is-it-safe/${slug}`} className="text-[#1e3a5f] hover:underline">
            → Is {city.city} Safe?
          </Link>
          <Link href={`/states/${stateAbbr(city.state).toLowerCase()}`} className="text-[#1e3a5f] hover:underline">
            → {city.state} Crime Overview
          </Link>
          <Link href={`/cities/${fullSlug}`} className="text-[#1e3a5f] hover:underline">
            → {city.city} Detailed Crime Data
          </Link>
          <Link href="/crime-rate" className="text-[#1e3a5f] hover:underline">
            → National Crime Rate Overview
          </Link>
          <Link href="/map" className="text-[#1e3a5f] hover:underline">
            → Interactive Crime Map
          </Link>
          <Link href="/tools/crime-cost" className="text-[#1e3a5f] hover:underline">
            → Crime Cost Calculator
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-8">
        <h2 className="font-heading text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">What is the crime rate in {city.city}?</h3>
            <p className="text-gray-700">
              {city.city} has a violent crime rate of {fmtRate(city.violentRate)} per 100,000 residents and a property crime rate of {fmtRate(city.propertyRate)} per 100,000 residents, based on {city.year} FBI data.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Is {city.city} safe?</h3>
            <p className="text-gray-700">
              {city.city} receives a safety grade of <strong>{safetyGrade}</strong> based on its crime rates compared to other US cities. The city ranks in the {city.safetyPercentile}th percentile for safety.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">How does {city.city} compare to the national average?</h3>
            <p className="text-gray-700">
              {city.city}'s violent crime rate of {fmtRate(city.violentRate)}/100K is {city.violentRate > nationalViolentRate ? 'above' : 'below'} the national average of {fmtRate(nationalViolentRate)}/100K. Its property crime rate is {city.propertyRate > nationalPropertyRate ? 'above' : 'below'} the national average of {fmtRate(nationalPropertyRate)}/100K.
            </p>
          </div>
        </div>
      </section>

      <ShareButtons title={`Crime Rate in ${city.city}, ${city.state} (2024)`} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the crime rate in ${city.city}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${city.city} has a violent crime rate of ${city.violentRate.toFixed(1)} per 100,000 residents and a property crime rate of ${city.propertyRate.toFixed(1)} per 100,000 residents, based on ${city.year} FBI data.`
            }
          },
          {
            '@type': 'Question',
            name: `Is ${city.city} safe?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${city.city} receives a safety grade of ${safetyGrade} based on its crime rates compared to other US cities. The city ranks in the ${city.safetyPercentile}th percentile for safety.`
            }
          },
          {
            '@type': 'Question',
            name: `How does ${city.city} compare to the national average?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${city.city}'s violent crime rate of ${city.violentRate.toFixed(1)}/100K is ${city.violentRate > nationalViolentRate ? 'above' : 'below'} the national average of ${nationalViolentRate}/100K.`
            }
          }
        ]
      })}} />
    </main>
  );
}