import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Compare State Crime Rates — Side-by-Side State Crime Comparison',
  description: 'Compare crime rates between US states. Side-by-side violent crime, property crime, and homicide rate comparisons using FBI data.',
  alternates: { canonical: 'https://www.opencrime.us/compare-states' },
  openGraph: {
    title: 'Compare State Crime Rates',
    description: 'Side-by-side crime comparisons for popular US state matchups.',
    url: 'https://www.opencrime.us/compare-states',
  },
};

const comparisons = [
  { slug: 'california-vs-texas', label: 'California vs Texas', desc: 'The two biggest states go head-to-head on crime.' },
  { slug: 'new-york-vs-florida', label: 'New York vs Florida', desc: 'East Coast rivals compared on safety.' },
  { slug: 'illinois-vs-ohio', label: 'Illinois vs Ohio', desc: 'Midwest neighbors with very different crime profiles.' },
  { slug: 'california-vs-florida', label: 'California vs Florida', desc: 'Two sunshine states, two different crime stories.' },
  { slug: 'texas-vs-florida', label: 'Texas vs Florida', desc: 'Top migration destinations compared.' },
  { slug: 'new-york-vs-california', label: 'New York vs California', desc: 'The two most iconic states on crime.' },
  { slug: 'pennsylvania-vs-ohio', label: 'Pennsylvania vs Ohio', desc: 'Rust Belt neighbors compared.' },
  { slug: 'georgia-vs-north-carolina', label: 'Georgia vs North Carolina', desc: 'Southeast growth states face off.' },
  { slug: 'washington-vs-oregon', label: 'Washington vs Oregon', desc: 'Pacific Northwest crime comparison.' },
  { slug: 'arizona-vs-nevada', label: 'Arizona vs Nevada', desc: 'Desert Southwest crime showdown.' },
];

export default function CompareStatesIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Compare States' }]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
        Compare State Crime Rates
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Side-by-side crime comparisons for popular US state matchups. See which state is safer
        based on FBI crime statistics.
      </p>

      <AIOverview insights={[
        '10 popular state-vs-state crime comparisons',
        'Each comparison includes violent crime, property crime, homicide rates, and historical trends',
        'All data from FBI Uniform Crime Reporting program',
      ]} />

      <div className="space-y-3 mb-8">
        {comparisons.map(c => (
          <Link
            key={c.slug}
            href={`/compare-states/${c.slug}`}
            className="block bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition group"
          >
            <h2 className="font-heading text-lg font-bold group-hover:text-[#1e3a5f] transition">{c.label}</h2>
            <p className="text-sm text-gray-500 mt-1">{c.desc}</p>
          </Link>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl border p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-2">Custom Comparison</h2>
        <p className="text-gray-600 mb-4">Want to compare any two states? Use our interactive state comparison tool.</p>
        <Link href="/tools/state-compare" className="inline-block bg-[#1e3a5f] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#2a4a6f] transition">
          Compare Any Two States →
        </Link>
      </div>

      <ShareButtons title="Compare State Crime Rates" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Compare State Crime Rates',
        description: 'Side-by-side crime comparisons for popular US state matchups',
        url: 'https://www.opencrime.us/compare-states',
      })}} />
    </div>
  );
}
