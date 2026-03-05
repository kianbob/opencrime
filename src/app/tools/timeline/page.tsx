import { loadData } from '@/lib/utils';
import type { Metadata } from 'next';
import type { NationalTrend } from '@/lib/utils';
import Link from 'next/link';
import TimelineClient from './TimelineClient';
import LastUpdated from '@/components/LastUpdated';

export const metadata: Metadata = {
  title: 'Crime Timeline Explorer — 45 Years of US Crime Trends | OpenCrime',
  description: 'Interactive timeline of US crime rates from 1979 to 2024. Explore trends for violent crime, homicide, robbery, assault, property crime, and more.',
  openGraph: { url: 'https://www.opencrime.us/tools/timeline' },
  alternates: { canonical: 'https://www.opencrime.us/tools/timeline' },
};

export default function TimelinePage() {
  const data = loadData<NationalTrend[]>('national-trends.json');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#1e3a5f]">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/tools" className="hover:text-[#1e3a5f]">Tools</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">Timeline Explorer</span>
      </nav>

      <h1 className="font-heading text-4xl font-bold mb-2">Crime Timeline Explorer</h1>
      <p className="text-lg text-gray-600 mb-8">
        Explore 45 years of crime trends in the United States. Select a crime type to see how rates have changed from 1979 to 2024.
      </p>

      <TimelineClient data={data} />

      <LastUpdated />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Crime Timeline Explorer',
        url: 'https://www.opencrime.us/tools/timeline',
        description: 'Interactive timeline of US crime rates from 1979 to 2024.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
      })}} />
    </div>
  );
}
