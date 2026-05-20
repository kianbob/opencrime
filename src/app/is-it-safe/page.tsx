import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Is It Safe? — City Safety Guides for America\'s Biggest Cities',
  description: 'Is your city safe? Data-driven safety guides for America\'s 10 largest cities. Crime rates, safety grades, and neighborhood analysis using FBI data.',
  alternates: { canonical: 'https://www.opencrime.us/is-it-safe' },
  openGraph: {
    title: 'Is It Safe? — City Safety Guides',
    description: 'Data-driven safety analysis for America\'s biggest cities. Crime rates, safety grades, and more.',
    url: 'https://www.opencrime.us/is-it-safe',
  },
};

const cities = [
  { slug: 'new-york', city: 'New York', state: 'NY', pop: '8.3M' },
  { slug: 'los-angeles', city: 'Los Angeles', state: 'CA', pop: '3.9M' },
  { slug: 'chicago', city: 'Chicago', state: 'IL', pop: '2.7M' },
  { slug: 'houston', city: 'Houston', state: 'TX', pop: '2.3M' },
  { slug: 'phoenix', city: 'Phoenix', state: 'AZ', pop: '1.6M' },
  { slug: 'philadelphia', city: 'Philadelphia', state: 'PA', pop: '1.6M' },
  { slug: 'san-antonio', city: 'San Antonio', state: 'TX', pop: '1.5M' },
  { slug: 'san-diego', city: 'San Diego', state: 'CA', pop: '1.4M' },
  { slug: 'dallas', city: 'Dallas', state: 'TX', pop: '1.3M' },
  { slug: 'austin', city: 'Austin', state: 'TX', pop: '1.0M' },
];

export default function IsItSafeIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Is It Safe?' }]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
        Is It Safe? City Safety Guides
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Data-driven safety guides for America&apos;s biggest cities. Each guide includes a safety grade,
        crime statistics, neighborhood context, and a verdict on whether the city is safe to visit or live in.
      </p>

      <AIOverview insights={[
        'Safety guides for America\'s 10 largest cities by population',
        'Each guide includes a safety grade (A-F), crime breakdown, and year-over-year trends',
        'All data sourced from FBI crime statistics',
        'Search 9,700+ cities using the full city database for other locations',
      ]} />

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {cities.map(c => (
          <Link
            key={c.slug}
            href={`/is-it-safe/${c.slug}`}
            className="block bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition group"
          >
            <h2 className="font-heading text-lg font-bold group-hover:text-[#1e3a5f] transition">
              Is {c.city} Safe?
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {c.city}, {c.state} · Pop. {c.pop} · Crime rate, safety grade & guide
            </p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4">Understanding Crime in America</h2>
        <p className="text-gray-600 mb-3">
          In 2024, the US recorded approximately <strong>1.22 million violent crimes</strong> — a rate of 359.1 per 100,000 residents.
          That&apos;s a <strong>5.4% decrease</strong> from the prior year, continuing a multi-year decline from the pandemic-era spike.
        </p>
        <p className="text-gray-600 mb-3">
          Homicides fell to 16,935 (4.98 per 100K) — significantly below the 2020 peak of 6.8 per 100K.
          Property crime also declined, with theft, burglary, and motor vehicle theft all trending downward.
        </p>
        <p className="text-gray-600 mb-3">
          However, crime varies enormously by city. Some cities with populations under 100,000 have violent crime rates
          10× the national average, while many mid-sized cities are safer than the average suburb.
        </p>
        <p className="text-sm text-gray-500">Source: FBI Crime Data Explorer (CDE), Uniform Crime Reporting Program</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Link href="/analysis/murder-map" className="block bg-white rounded-xl border p-5 hover:shadow-md transition">
          <h3 className="font-heading font-bold mb-1">🗺️ Murder Map</h3>
          <p className="text-sm text-gray-500">Where homicides are concentrated across America</p>
        </Link>
        <Link href="/analysis/safest-places-to-live" className="block bg-white rounded-xl border p-5 hover:shadow-md transition">
          <h3 className="font-heading font-bold mb-1">🏡 Safest Places to Live</h3>
          <p className="text-sm text-gray-500">The lowest-crime cities in every state</p>
        </Link>
        <Link href="/analysis/crime-decline" className="block bg-white rounded-xl border p-5 hover:shadow-md transition">
          <h3 className="font-heading font-bold mb-1">📉 The Crime Decline</h3>
          <p className="text-sm text-gray-500">Why crime has been falling for 30 years</p>
        </Link>
        <Link href="/tools/compare" className="block bg-white rounded-xl border p-5 hover:shadow-md transition">
          <h3 className="font-heading font-bold mb-1">⚖️ Compare Cities</h3>
          <p className="text-sm text-gray-500">Side-by-side crime comparison for any two cities</p>
        </Link>
        <Link href="/tools/safety-score" className="block bg-white rounded-xl border p-5 hover:shadow-md transition">
          <h3 className="font-heading font-bold mb-1">📊 Safety Score</h3>
          <p className="text-sm text-gray-500">Calculate a composite safety rating for any city</p>
        </Link>
        <Link href="/states" className="block bg-white rounded-xl border p-5 hover:shadow-md transition">
          <h3 className="font-heading font-bold mb-1">🏛️ State Rankings</h3>
          <p className="text-sm text-gray-500">All 50 states ranked by crime rate</p>
        </Link>
      </div>

      <div className="bg-gray-50 rounded-xl border p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-2">Looking for another city?</h2>
        <p className="text-gray-600 mb-4">
          We have crime data for over 9,700 US cities. Search for any city to see its crime profile.
        </p>
        <Link href="/search" className="inline-block bg-[#1e3a5f] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#2a4a6f] transition">
          Search All Cities →
        </Link>
      </div>

      <ShareButtons title="Is It Safe? City Safety Guides" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Is It Safe? City Safety Guides',
        description: 'Data-driven safety guides for America\'s biggest cities',
        url: 'https://www.opencrime.us/is-it-safe',
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What cities are included in the safety guides?', acceptedAnswer: { '@type': 'Answer', text: 'We provide detailed safety guides for America\'s 10 largest cities: New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, and Austin.' }},
          { '@type': 'Question', name: 'How are safety grades calculated?', acceptedAnswer: { '@type': 'Answer', text: 'Safety grades (A-F) are based primarily on violent crime rates per 100,000 residents, compared to national averages. A = very safe, F = significantly above average crime.' }},
          { '@type': 'Question', name: 'Where does the crime data come from?', acceptedAnswer: { '@type': 'Answer', text: 'All crime data comes from the FBI\'s Uniform Crime Reporting (UCR) program, which collects data from law enforcement agencies across the US.' }},
        ],
      })}} />
    </div>
  );
}
