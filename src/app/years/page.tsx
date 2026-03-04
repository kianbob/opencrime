import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { NationalTrend } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Crime Statistics by Year — 1979 to 2024',
  description: 'Browse US crime statistics by year from 1979 to 2024. See how violent crime, murder, property crime, and individual offenses changed over 45 years.',
  openGraph: { url: 'https://www.opencrime.us/years' },
  alternates: { canonical: 'https://www.opencrime.us/years' },
};

export default function YearsPage() {
  const national = loadData<NationalTrend[]>('national-trends.json');
  const sorted = [...national].sort((a, b) => b.year - a.year);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Crime by Year' }]} />
      <h1 className="font-heading text-3xl font-bold mb-2">Crime Statistics by Year</h1>
      <p className="text-gray-600 mb-8">45 years of FBI crime data, from 1979 to 2024. Click any year for details.</p>

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="text-left px-3 py-2">Year</th>
              <th className="text-right px-3 py-2">Population</th>
              <th className="text-right px-3 py-2">Violent Crime</th>
              <th className="text-right px-3 py-2">Rate</th>
              <th className="text-right px-3 py-2">Murders</th>
              <th className="text-right px-3 py-2">Rate</th>
              <th className="text-right px-3 py-2">Property Crime</th>
              <th className="text-right px-3 py-2">Rate</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((n, i) => {
              const prev = sorted[i + 1];
              const vChange = prev ? ((n.violentRate - prev.violentRate) / prev.violentRate * 100) : null;
              return (
                <tr key={n.year} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2">
                    <Link href={`/years/${n.year}`} className="text-[#1e3a5f] hover:underline font-bold">{n.year}</Link>
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(n.population)}</td>
                  <td className="px-3 py-2 text-right font-mono">{fmtNum(n.violentCrime)}</td>
                  <td className="px-3 py-2 text-right font-mono text-red-600">
                    {fmtRate(n.violentRate)}
                    {vChange != null && (
                      <span className={`ml-1 text-xs ${vChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {vChange > 0 ? '+' : ''}{vChange.toFixed(1)}%
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right font-mono">{fmtNum(n.homicide)}</td>
                  <td className="px-3 py-2 text-right font-mono">{fmtRate(n.homicideRate)}</td>
                  <td className="px-3 py-2 text-right font-mono">{fmtNum(n.propertyCrime)}</td>
                  <td className="px-3 py-2 text-right font-mono text-blue-700">{fmtRate(n.propertyRate)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <p><strong>Note:</strong> National estimates are not available for 2017-2020 due to the FBI&apos;s transition from SRS to NIBRS. State and city data may still be available for those years.</p>
      </div>
    </div>
  );
}
