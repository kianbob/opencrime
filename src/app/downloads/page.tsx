import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Download Crime Data — Free FBI Crime Statistics',
  description: 'Download FBI crime data files. City-level crime rates, state trends, national statistics, arrest data, hate crime data, and homicide details.',
  openGraph: { url: 'https://www.opencrime.us/downloads' },
  alternates: { canonical: 'https://www.opencrime.us/downloads' },
};

const datasets = [
  { name: 'City Crime Index', file: '/data/city-index.json', size: '3.6 MB', desc: '9,739 cities with violent/property crime rates, murder rates, population, YoY change' },
  { name: 'State Summary', file: '/data/state-summary.json', size: '15 KB', desc: '51 states ranked by violent crime rate with murder and property rates' },
  { name: 'State Trends', file: '/data/state-trends.json', size: '964 KB', desc: '51 states with 42 years of annual crime data (1979-2024)' },
  { name: 'National Trends', file: '/data/national-trends.json', size: '15 KB', desc: 'National crime estimates 1979-2024: violent, property, murder, rape, robbery, assault' },
  { name: 'Crime Types', file: '/data/crime-types.json', size: '34 KB', desc: '9 crime types with 42 years of rate and volume data' },
  { name: 'Arrest Data', file: '/data/arrest-data.json', size: '~80 KB', desc: 'National arrest estimates, 10-year trends, by age/sex/race, by state, juvenile' },
  { name: 'Homicide Data', file: '/data/homicide-data.json', size: '~15 KB', desc: 'Expanded homicide: weapon types, victim demographics, circumstances, relationships' },
  { name: 'Hate Crime by State', file: '/data/hate-crime-by-state.json', size: '~10 KB', desc: 'Hate crime incidents by state and bias motivation (race, religion, sexual orientation)' },
  { name: 'Aggregate Stats', file: '/data/stats.json', size: '14 KB', desc: 'Computed statistics: rankings, changes, top/bottom cities and states' },
];

export default function DownloadsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-bold mb-4">Download Crime Data</h1>
      <p className="text-lg text-gray-600 mb-8">
        All data on OpenCrime is free to download and use. Files are JSON format, processed from 
        official FBI Crime Data Explorer datasets.
      </p>

      <div className="space-y-4 mb-8">
        {datasets.map(d => (
          <div key={d.name} className="bg-white rounded-xl shadow-sm border p-4 flex items-center justify-between">
            <div className="flex-1">
              <h2 className="font-semibold">{d.name}</h2>
              <p className="text-sm text-gray-500">{d.desc}</p>
              <span className="text-xs text-gray-400">{d.size} · JSON</span>
            </div>
            <a href={d.file} download className="bg-[#1e3a5f] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#2a4d7a] transition ml-4 whitespace-nowrap">
              Download
            </a>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <h2 className="font-heading text-lg font-bold mb-2">Individual City Files</h2>
        <p className="text-sm text-gray-600 mb-3">
          12,826 individual city JSON files are available at <code className="bg-blue-100 px-1 rounded">/data/cities/[slug].json</code>. 
          Each contains multi-year crime breakdowns (violent, property, murder, rape, robbery, assault, burglary, larceny, MV theft, arson).
        </p>
        <p className="text-sm text-gray-500">
          Use the <Link href="/search" className="text-[#1e3a5f] hover:underline">city search</Link> to find city slugs, 
          then download at <code className="bg-blue-100 px-1 rounded">opencrime.us/data/cities/[slug].json</code>
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">Original Data Sources</h2>
        <p>Our processed data is derived from these FBI sources:</p>
        <ul>
          <li><a href="https://cde.ucr.cjis.gov/" className="text-[#1e3a5f]">FBI Crime Data Explorer</a> — Primary source for all crime statistics</li>
          <li><strong>SRS Estimated Crimes 1979-2024</strong> — National and state estimates</li>
          <li><strong>Table 8: Offenses Known to Law Enforcement</strong> — City-level data by state</li>
          <li><strong>Expanded Homicide Data</strong> — Victim/offender demographics, weapons, circumstances</li>
          <li><strong>Persons Arrested</strong> — Arrest data by offense, demographics, state</li>
          <li><strong>Hate Crime Statistics</strong> — Bias-motivated incidents</li>
        </ul>
        <h2 className="font-heading">License</h2>
        <p>
          FBI data is in the public domain. Our processed JSON files are released under 
          <strong> CC0 (public domain)</strong> — use them for any purpose without restriction.
          Attribution to OpenCrime is appreciated but not required.
        </p>
      </div>
    </div>
  );
}
