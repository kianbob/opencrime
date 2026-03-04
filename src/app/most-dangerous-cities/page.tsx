import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { CityIndex } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Most Dangerous Cities in America 2024 — Crime Rate Rankings',
  description: 'The most dangerous cities in America ranked by violent crime rate. Complete rankings based on FBI 2024 data for 332 cities with 100,000+ population.',
};

export default function DangerousCitiesPage() {
  const allCities = loadData<CityIndex[]>('city-index.json');
  const large = allCities.filter(c => c.population >= 100000);
  const dangerous = [...large].sort((a, b) => b.violentRate - a.violentRate);
  const deadliest = [...large].sort((a, b) => b.murderRate - a.murderRate);
  const natRate = 359.1;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Most Dangerous Cities in America 2024</h1>
      <p className="text-lg text-gray-600 mb-8">
        Complete rankings of US cities by violent crime rate, based on FBI Uniform Crime Reporting data. 
        These {large.length} cities all have populations over 100,000.
      </p>

      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-3">Key Statistics</h2>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-600">{dangerous[0].city}</div>
            <div className="text-sm text-gray-600">Highest Violent Rate ({fmtRate(dangerous[0].violentRate)})</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-700">{deadliest[0].city}</div>
            <div className="text-sm text-gray-600">Highest Murder Rate ({fmtRate(deadliest[0].murderRate)})</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#1e3a5f]">{fmtRate(natRate)}</div>
            <div className="text-sm text-gray-600">National Average Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{large.filter(c => c.violentRate > natRate * 2).length}</div>
            <div className="text-sm text-gray-600">Cities 2x National Avg</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">Understanding Dangerous City Rankings</h2>
        <p>
          A city&apos;s &quot;danger&quot; is measured by its violent crime rate — the number of murders, rapes, robberies, 
          and aggravated assaults per 100,000 residents. The national average in 2024 was {fmtRate(natRate)}.
        </p>
        <p>
          Cities at the top of this list have violent crime rates 4-7 times the national average. These rates are 
          driven by complex factors including poverty, inequality, gang activity, drug markets, and historical 
          disinvestment. A high crime rate does not mean every neighborhood in a city is dangerous — crime is 
          often concentrated in specific areas.
        </p>
      </div>

      <h2 className="font-heading text-2xl font-bold mb-4 text-red-700">Top 50 Most Dangerous Cities by Violent Crime Rate</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto mb-12">
        <table className="w-full text-sm">
          <thead className="bg-red-50 sticky top-0">
            <tr>
              <th className="text-left px-3 py-3">Rank</th>
              <th className="text-left px-3 py-3">City</th>
              <th className="text-left px-3 py-3">State</th>
              <th className="text-right px-3 py-3">Violent Rate</th>
              <th className="text-right px-3 py-3">Murder Rate</th>
              <th className="text-right px-3 py-3">Robberies</th>
              <th className="text-right px-3 py-3">Population</th>
              <th className="text-right px-3 py-3">vs National</th>
            </tr>
          </thead>
          <tbody>
            {dangerous.slice(0, 50).map((c, i) => (
              <tr key={c.slug} className="border-t hover:bg-red-50/50">
                <td className="px-3 py-2 font-bold text-red-700">{i + 1}</td>
                <td className="px-3 py-2">
                  <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline font-medium">{c.city}</Link>
                </td>
                <td className="px-3 py-2 text-gray-500">{c.state}</td>
                <td className="px-3 py-2 text-right font-mono text-red-600 font-semibold">{fmtRate(c.violentRate)}</td>
                <td className="px-3 py-2 text-right font-mono">{fmtRate(c.murderRate)}</td>
                <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.violentCrime)}</td>
                <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
                <td className="px-3 py-2 text-right font-mono text-red-600">{((c.violentRate / natRate)).toFixed(1)}x</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-heading text-2xl font-bold mb-4 text-red-900">Top 25 by Murder Rate</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto mb-12">
        <table className="w-full text-sm">
          <thead className="bg-red-50 sticky top-0">
            <tr>
              <th className="text-left px-3 py-3">Rank</th>
              <th className="text-left px-3 py-3">City</th>
              <th className="text-left px-3 py-3">State</th>
              <th className="text-right px-3 py-3">Murder Rate</th>
              <th className="text-right px-3 py-3">Total Murders</th>
              <th className="text-right px-3 py-3">Population</th>
            </tr>
          </thead>
          <tbody>
            {deadliest.slice(0, 25).map((c, i) => (
              <tr key={c.slug} className="border-t hover:bg-red-50/50">
                <td className="px-3 py-2 font-bold text-red-900">{i + 1}</td>
                <td className="px-3 py-2">
                  <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline font-medium">{c.city}</Link>
                </td>
                <td className="px-3 py-2 text-gray-500">{c.state}</td>
                <td className="px-3 py-2 text-right font-mono text-red-700 font-semibold">{fmtRate(c.murderRate)}</td>
                <td className="px-3 py-2 text-right font-mono">{c.murder}</td>
                <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">Frequently Asked Questions</h2>
        <h3>What is the most dangerous city in America?</h3>
        <p>Based on 2024 FBI violent crime data, {dangerous[0].city}, {dangerous[0].state} has the highest violent crime rate at {fmtRate(dangerous[0].violentRate)} per 100,000 residents — {(dangerous[0].violentRate / natRate).toFixed(1)}x the national average.</p>
        <h3>Which city has the highest murder rate?</h3>
        <p>{deadliest[0].city}, {deadliest[0].state} has the highest murder rate at {fmtRate(deadliest[0].murderRate)} per 100,000 residents.</p>
        <h3>Is crime getting worse in America?</h3>
        <p>No. Violent crime in 2024 dropped 5.4% from 2023 and is down 52.6% from the 1991 peak. The current violent crime rate of 359.1 per 100K is historically low — comparable to the late 1960s.</p>
      </div>

      <ShareButtons title="Most Dangerous Cities in America 2024" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the most dangerous city in America?', acceptedAnswer: { '@type': 'Answer', text: `Based on 2024 FBI data, ${dangerous[0].city}, ${dangerous[0].state} has the highest violent crime rate at ${dangerous[0].violentRate.toFixed(1)} per 100,000.` }},
          { '@type': 'Question', name: 'Which city has the highest murder rate?', acceptedAnswer: { '@type': 'Answer', text: `${deadliest[0].city}, ${deadliest[0].state} has the highest murder rate at ${deadliest[0].murderRate.toFixed(2)} per 100,000.` }},
          { '@type': 'Question', name: 'Is crime getting worse in America?', acceptedAnswer: { '@type': 'Answer', text: 'No. Violent crime in 2024 dropped 5.4% from 2023 and is down 52.6% from the 1991 peak.' }},
        ]
      })}} />

      <p className="text-sm text-gray-500 mt-8">
        Source: FBI Crime Data Explorer, 2024. The FBI cautions against using data to rank communities.
        Crime rates reflect reported offenses and may be affected by reporting practices.
      </p>
    </div>
  );
}
