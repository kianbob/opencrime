import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { NationalTrend, CityIndex } from '@/lib/utils';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import MurderCharts from './MurderCharts';

export const metadata: Metadata = {
  title: 'US Murder Rate 2024 — Statistics, Trends & City Rankings',
  description: 'The US murder rate in 2024: 4.98 per 100K, down 15.7% from 2023. City-by-city murder rankings, 45-year trends, and state comparisons from FBI data.',
  openGraph: { url: 'https://www.opencrime.us/murder-rate' },
  alternates: { canonical: 'https://www.opencrime.us/murder-rate' },
};

export default function MurderRatePage() {
  const national = loadData<NationalTrend[]>('national-trends.json');
  const cities = loadData<CityIndex[]>('city-index.json');
  const n = national[national.length - 1];
  const large = cities.filter(c => c.population >= 100000);
  const deadliest = [...large].sort((a, b) => b.murderRate - a.murderRate).slice(0, 25);
  const safest = [...large].filter(c => c.murderRate === 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'US Murder Rate 2024' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">US Murder Rate 2024</h1>

      <div className="bg-red-900 text-white rounded-xl p-8 mb-8">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold">{fmtNum(n.homicide)}</div>
            <div className="text-red-200 text-sm">Total Murders</div>
          </div>
          <div>
            <div className="text-4xl font-bold">{fmtRate(n.homicideRate)}</div>
            <div className="text-red-200 text-sm">per 100K People</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-400">-15.7%</div>
            <div className="text-red-200 text-sm">vs 2023</div>
          </div>
          <div>
            <div className="text-4xl font-bold">{safest.length}</div>
            <div className="text-red-200 text-sm">Large Cities with 0 Murders</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <p>
          In 2024, {fmtNum(n.homicide)} people were murdered in the United States — a rate of {fmtRate(n.homicideRate)} per 
          100,000 residents. This represents a <strong>15.7% decline</strong> from 2023, the steepest single-year 
          drop in murder in decades. The rate is now well below pre-pandemic levels and at the lowest point 
          since the early 2010s.
        </p>
        <p>
          At its peak in 1991, the US murder rate was 9.8 per 100,000 — nearly double the current rate. 
          The dramatic decline in murder over the past three decades is one of the most significant 
          public safety achievements in American history, though the reasons remain debated.
        </p>
      </div>

      <MurderCharts data={national} />

      <h2 className="font-heading text-2xl font-bold mb-4 mt-8 text-red-800">Cities with Highest Murder Rates (100K+ Pop)</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead className="bg-red-50">
            <tr>
              <th className="text-left px-3 py-2">#</th>
              <th className="text-left px-3 py-2">City</th>
              <th className="text-right px-3 py-2">Murder Rate</th>
              <th className="text-right px-3 py-2">Total Murders</th>
              <th className="text-right px-3 py-2">Population</th>
            </tr>
          </thead>
          <tbody>
            {deadliest.map((c, i) => (
              <tr key={c.slug} className="border-t hover:bg-red-50/50">
                <td className="px-3 py-2 font-bold text-red-800">{i + 1}</td>
                <td className="px-3 py-2">
                  <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline font-medium">{c.city}</Link>
                  <span className="text-gray-400 text-xs ml-1">{c.state}</span>
                </td>
                <td className="px-3 py-2 text-right font-mono text-red-700 font-semibold">{fmtRate(c.murderRate)}</td>
                <td className="px-3 py-2 text-right font-mono">{c.murder}</td>
                <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {safest.length > 0 && (
        <>
          <h2 className="font-heading text-2xl font-bold mb-4 text-green-700">Large Cities with Zero Murders</h2>
          <div className="grid md:grid-cols-3 gap-2 mb-8">
            {safest.slice(0, 15).map(c => (
              <Link key={c.slug} href={`/cities/${c.slug}`} className="bg-green-50 rounded-lg px-3 py-2 text-sm hover:bg-green-100 transition">
                <span className="font-medium">{c.city}</span>, <span className="text-gray-500">{c.state}</span>
                <span className="text-gray-400 ml-1">({fmtNum(c.population)})</span>
              </Link>
            ))}
          </div>
        </>
      )}

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/dashboard" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Full Dashboard</Link>
        <Link href="/most-dangerous-cities" className="bg-red-700 text-white px-5 py-2 rounded-lg hover:bg-red-800 transition">Most Dangerous Cities</Link>
        <Link href="/crime-rate" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">All Crime Statistics</Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the US murder rate in 2024?', acceptedAnswer: { '@type': 'Answer', text: `The US murder rate in 2024 is ${n.homicideRate.toFixed(2)} per 100,000 with ${n.homicide.toLocaleString()} total murders, down 15.7% from 2023.` }},
          { '@type': 'Question', name: 'Which US city has the highest murder rate?', acceptedAnswer: { '@type': 'Answer', text: `${deadliest[0].city}, ${deadliest[0].state} has the highest murder rate at ${deadliest[0].murderRate.toFixed(2)} per 100,000.` }},
        ]
      })}} />

      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer, 2024.</p>
    </div>
  );
}
