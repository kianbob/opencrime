import { loadData } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import CityReportClient from './CityReportClient';
import LastUpdated from '@/components/LastUpdated';

type CityLite = { s: string; c: string; st: string; p: number; vr: number; mr: number; pr: number; sp: number; tr: string };

export const metadata: Metadata = {
  title: 'City Safety Report — Get a Safety Grade for Any US City | OpenCrime',
  description: 'Search any US city and get an instant safety report card with crime rates, letter grades, percentile rankings, and top crime concerns.',
  openGraph: { url: 'https://www.opencrime.us/tools/city-report' },
  alternates: { canonical: 'https://www.opencrime.us/tools/city-report' },
};

export default function CityReportPage() {
  const cities = loadData<CityLite[]>('city-index-lite.json');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#1e3a5f]">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/tools" className="hover:text-[#1e3a5f]">Tools</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">City Safety Report</span>
      </nav>

      <h1 className="font-heading text-4xl font-bold mb-2">City Safety Report</h1>
      <p className="text-lg text-gray-600 mb-8">
        Search for any US city to get an instant safety report card with crime rates compared to the national average, 
        a letter grade, and percentile ranking among all cities.
      </p>

      <CityReportClient cities={cities} />

      <LastUpdated />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'City Safety Report',
        url: 'https://www.opencrime.us/tools/city-report',
        description: 'Get a safety grade for any US city based on FBI crime data.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
      })}} />
    </div>
  );
}
