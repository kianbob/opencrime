import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Crime by Decade — How Crime Changed Across 5 Decades in America',
  description: 'Explore crime trends by decade from the 1980s to 2020s. Key events, policy changes, and how violent crime, murder, and property crime evolved.',
  alternates: { canonical: 'https://www.opencrime.us/decades' },
  openGraph: {
    title: 'Crime by Decade',
    description: 'How crime changed across 5 decades in America — from crack epidemic to COVID.',
    url: 'https://www.opencrime.us/decades',
  },
};

const decades = [
  { slug: '1980s', label: 'The 1980s', subtitle: 'The Crack Epidemic & War on Drugs', trend: '↑ Rising', color: 'text-red-600' },
  { slug: '1990s', label: 'The 1990s', subtitle: 'Peak Crime → The Great Decline Begins', trend: '↓ Declining', color: 'text-green-600' },
  { slug: '2000s', label: 'The 2000s', subtitle: '9/11, Recession & Continued Decline', trend: '↓ Declining', color: 'text-green-600' },
  { slug: '2010s', label: 'The 2010s', subtitle: 'Historic Lows, Mass Shootings & BLM', trend: '↓ Near Lows', color: 'text-green-600' },
  { slug: '2020s', label: 'The 2020s', subtitle: 'COVID Spike → Recovery', trend: '↑↓ Volatile', color: 'text-amber-600' },
];

export default function DecadesIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Decades' }]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
        Crime by Decade
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        How crime changed across five decades of American history. From the crack epidemic of the 1980s
        to the COVID disruption of the 2020s — the data tells the story.
      </p>

      <AIOverview insights={[
        'Violent crime peaked in 1991 at 758.2 per 100K, then fell ~50% by 2014',
        'The 2020 COVID year saw murder spike 30% — the largest single-year increase ever',
        'Property crime has fallen even more dramatically than violent crime since the 1990s',
        'By 2024, crime rates are approaching or surpassing pre-pandemic lows',
      ]} />

      <div className="space-y-4 mb-8">
        {decades.map(d => (
          <Link
            key={d.slug}
            href={`/decades/${d.slug}`}
            className="block bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition group"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-heading text-xl font-bold group-hover:text-[#1e3a5f] transition">{d.label}</h2>
                <p className="text-gray-500 mt-1">{d.subtitle}</p>
              </div>
              <span className={`font-bold text-sm ${d.color}`}>{d.trend}</span>
            </div>
          </Link>
        ))}
      </div>

      <ShareButtons title="Crime by Decade" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Crime by Decade',
        description: 'How crime changed across five decades of American history',
        url: 'https://www.opencrime.us/decades',
      })}} />
    </div>
  );
}
