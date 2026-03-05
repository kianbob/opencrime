import type { Metadata } from 'next';
import SearchClient from './SearchClient';

export const metadata: Metadata = {
  title: 'Search Cities — Find Crime Data for Any US City',
  description: 'Search crime statistics for any US city. Find violent crime rates, murder rates, property crime data for 9,700+ cities.',
  openGraph: { url: 'https://www.opencrime.us/search' },
  alternates: { canonical: 'https://www.opencrime.us/search' },
};

export default function SearchPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"WebPage","name":"Search Cities — Find Crime Data for Any US City","description":"Search crime statistics for any US city. Find violent crime rates, murder rates, property crime data for 9,700+ cities.","url":"https://www.opencrime.us/search","publisher":{"@type":"Organization","name":"OpenCrime","url":"https://www.opencrime.us"}}` }} />
      <h1 className="font-heading text-3xl font-bold mb-2">Search Cities</h1>
      <p className="text-gray-600 mb-6">Find crime data for any of 9,700+ US cities</p>
      <SearchClient />
    </div>
  );
}
