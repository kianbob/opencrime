import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import CrimeTypeCharts from './CrimeTypeCharts';

export const metadata: Metadata = {
  title: 'Crime Types — Violent Crime, Property Crime, Murder, Robbery & More',
  description: 'Explore all major crime types tracked by the FBI. Violent crime, property crime, murder, rape, robbery, assault, burglary, larceny, motor vehicle theft — with 45 years of national trends.',
};

type CrimeType = {
  slug: string; name: string; key: string;
  nationalHistory: { year: number; count: number; rate: number }[];
  latest: { year: number; count: number; rate: number };
};

export default function CrimesPage() {
  const crimeTypes = loadData<CrimeType[]>('crime-types.json');
  const violent = crimeTypes.filter(c => ['violent-crime', 'murder', 'rape', 'robbery', 'aggravated-assault'].includes(c.slug));
  const property = crimeTypes.filter(c => ['property-crime', 'burglary', 'larceny', 'motor-vehicle-theft'].includes(c.slug));

  const renderCard = (ct: CrimeType, color: string) => (
    <div key={ct.slug} className="bg-white rounded-xl shadow-sm border p-5">
      <h3 className="font-heading text-lg font-bold mb-1">{ct.name}</h3>
      <div className={`text-2xl font-bold ${color} mb-1`}>{fmtNum(ct.latest.count)}</div>
      <div className="text-sm text-gray-500">Rate: {fmtRate(ct.latest.rate)} per 100K ({ct.latest.year})</div>
      {ct.nationalHistory.length > 5 && (() => {
        const first = ct.nationalHistory[0];
        const change = first.rate ? +((ct.latest.rate - first.rate) / first.rate * 100).toFixed(1) : null;
        return change != null ? (
          <div className={`text-sm mt-1 ${change < 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change > 0 ? '+' : ''}{change}% since {first.year}
          </div>
        ) : null;
      })()}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-bold mb-2">Crime Types</h1>
      <p className="text-gray-600 mb-8">
        All major crime categories tracked by the FBI&apos;s Uniform Crime Reporting program, with national trends since 1979.
      </p>

      <h2 className="font-heading text-2xl font-bold mb-4 text-red-700">Violent Crime</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {violent.map(ct => renderCard(ct, 'text-red-600'))}
      </div>

      <h2 className="font-heading text-2xl font-bold mb-4 text-[#1e3a5f]">Property Crime</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {property.map(ct => renderCard(ct, 'text-[#1e3a5f]'))}
      </div>

      <CrimeTypeCharts crimeTypes={crimeTypes} />

      <p className="text-sm text-gray-500 mt-8">
        Source: FBI Crime Data Explorer, SRS Estimated Crimes. Rates per 100,000 residents.
        The FBI transitioned from SRS to NIBRS between 2017-2020, causing a gap in national estimates.
      </p>
    </div>
  );
}
