import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { CityIndex } from '@/lib/utils';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';

type RaceRow = { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number; pacificIslander: number };
import ShareButtons from '@/components/ShareButtons';
import AIOverview from '@/components/AIOverview';

export const metadata: Metadata = {
  title: 'Safest Cities in America 2024 — Complete Rankings by Crime Rate',
  description: 'The safest cities in America ranked by violent crime rate. Based on FBI 2024 data for 332 cities with 100,000+ population. Updated with the latest FBI statistics.',
  openGraph: { url: 'https://www.opencrime.us/safest-cities' },
  alternates: { canonical: 'https://www.opencrime.us/safest-cities' },
};

export default function SafestCitiesPage() {
  const allCities = loadData<CityIndex[]>('city-index.json');
  const large = allCities.filter(c => c.population >= 100000);
  const safest = [...large].sort((a, b) => a.violentRate - b.violentRate);
  const mid = allCities.filter(c => c.population >= 25000 && c.population < 100000);
  const safestMid = [...mid].sort((a, b) => a.violentRate - b.violentRate);
  const avgRate = large.reduce((s, c) => s + c.violentRate, 0) / large.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Safest Cities in America 2024' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Safest Cities in America 2024</h1>
      <p className="text-lg text-gray-600 mb-8">
        Complete rankings based on FBI Uniform Crime Reporting data. We analyzed violent crime rates
        for {large.length} US cities with 100,000+ residents to determine the safest places to live.
      </p>

      <AIOverview insights={[
        "The safest large cities have violent crime rates under 100 per 100K — less than a third of the national average.",
        "Texas suburbs dominate the safest list: Sugar Land, Frisco, League City, Allen, and McKinney all appear in the top 20.",
        "Irvine, CA proves that large cities (316K) can be among the safest — its rate of 84 per 100K rivals small suburbs.",
        "The gap between safest and most dangerous is staggering: you're 38x more likely to be a violent crime victim in Memphis than in Carmel, IN.",
      ]} />

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-3">Key Findings</h2>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">{safest[0].city}</div>
            <div className="text-sm text-gray-600">Safest Large City (rate: {fmtRate(safest[0].violentRate)})</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#1e3a5f]">{fmtRate(avgRate)}</div>
            <div className="text-sm text-gray-600">Average Violent Crime Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{safest.filter(c => c.violentRate < 200).length}</div>
            <div className="text-sm text-gray-600">Cities Below 200 per 100K</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">What Makes a City Safe?</h2>
        <p>
          Safety is measured by the FBI&apos;s violent crime rate — the number of violent crimes (murder, rape, 
          robbery, and aggravated assault) per 100,000 residents. The national average in 2024 was 359.1. 
          Cities well below this threshold are considered among the safest in America.
        </p>
        <p>
          Many of the safest cities share common characteristics: strong local economies, high median 
          household incomes, well-funded police departments, and suburban or planned community layouts. 
          Cities in the Midwest and Northeast tend to dominate the safest-cities rankings.
        </p>
      </div>

      <h2 className="font-heading text-2xl font-bold mb-4">Top 50 Safest Large Cities (100K+ Population)</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto mb-12">
        <table className="w-full text-sm">
          <thead className="bg-green-50 sticky top-0">
            <tr>
              <th className="text-left px-3 py-3">Rank</th>
              <th className="text-left px-3 py-3">City</th>
              <th className="text-left px-3 py-3">State</th>
              <th className="text-right px-3 py-3">Violent Rate</th>
              <th className="text-right px-3 py-3">Murder Rate</th>
              <th className="text-right px-3 py-3">Property Rate</th>
              <th className="text-right px-3 py-3">Population</th>
            </tr>
          </thead>
          <tbody>
            {safest.slice(0, 50).map((c, i) => (
              <tr key={c.slug} className="border-t hover:bg-green-50/50">
                <td className="px-3 py-2 font-bold text-green-700">{i + 1}</td>
                <td className="px-3 py-2">
                  <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline font-medium">{c.city}</Link>
                </td>
                <td className="px-3 py-2 text-gray-500">{c.state}</td>
                <td className="px-3 py-2 text-right font-mono text-green-600 font-semibold">{fmtRate(c.violentRate)}</td>
                <td className="px-3 py-2 text-right font-mono">{fmtRate(c.murderRate)}</td>
                <td className="px-3 py-2 text-right font-mono">{fmtRate(c.propertyRate)}</td>
                <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-heading text-2xl font-bold mb-4">Safest Mid-Size Cities (25K–100K Population)</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto mb-12">
        <table className="w-full text-sm">
          <thead className="bg-green-50 sticky top-0">
            <tr>
              <th className="text-left px-3 py-3">Rank</th>
              <th className="text-left px-3 py-3">City</th>
              <th className="text-left px-3 py-3">State</th>
              <th className="text-right px-3 py-3">Violent Rate</th>
              <th className="text-right px-3 py-3">Population</th>
            </tr>
          </thead>
          <tbody>
            {safestMid.slice(0, 30).map((c, i) => (
              <tr key={c.slug} className="border-t hover:bg-green-50/50">
                <td className="px-3 py-2 font-bold text-green-700">{i + 1}</td>
                <td className="px-3 py-2">
                  <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline font-medium">{c.city}</Link>
                </td>
                <td className="px-3 py-2 text-gray-500">{c.state}</td>
                <td className="px-3 py-2 text-right font-mono text-green-600">{fmtRate(c.violentRate)}</td>
                <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">How We Calculate Safety Rankings</h2>
        <p>
          Our rankings are based on the FBI&apos;s annual Uniform Crime Reporting (UCR) data, specifically 
          the violent crime rate per 100,000 residents. This includes four categories of violent crime: 
          murder and nonnegligent manslaughter, rape, robbery, and aggravated assault.
        </p>
        <p>
          We focus on per-capita rates rather than raw numbers because a large city with more total crimes 
          may actually be safer per resident than a smaller city. Only cities with reliable reporting data 
          are included in our rankings.
        </p>
        <h2 className="font-heading">Frequently Asked Questions</h2>
        <h3>What is the safest city in America?</h3>
        <p>Based on 2024 FBI data, {safest[0].city}, {safest[0].state} has the lowest violent crime rate among cities with 100,000+ residents, at just {fmtRate(safest[0].violentRate)} per 100,000 people.</p>
        <h3>What violent crime rate is considered safe?</h3>
        <p>The national average violent crime rate in 2024 was 359.1 per 100,000. Cities below 200 are generally considered very safe, while cities below 100 are exceptionally safe.</p>
        <h3>Are suburban cities safer than urban cities?</h3>
        <p>Generally yes. Many of the safest cities on this list are suburban communities near major metro areas. However, some mid-size cities and even some larger urban areas also rank among the safest.</p>
      </div>

      {/* Demographic Context */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="font-heading text-lg font-bold mb-2">Demographic Context</h3>
        <p className="text-sm text-gray-600 mb-3">
          Safety varies significantly across demographic groups. While these cities have the lowest overall
          crime rates, national data shows that victimization is not equally distributed — Black Americans
          face homicide rates 6-8x higher than white Americans nationally.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/arrest-demographics" className="text-[#1e3a5f] hover:underline">Arrest Demographics →</Link>
          <Link href="/analysis/racial-disparities" className="text-[#1e3a5f] hover:underline">Racial Disparities →</Link>
          <Link href="/analysis/crime-by-race" className="text-[#1e3a5f] hover:underline">Crime by Race →</Link>
        </div>
      </div>

      <ShareButtons title="Safest Cities in America 2024" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the safest city in America?', acceptedAnswer: { '@type': 'Answer', text: `Based on 2024 FBI data, ${safest[0].city}, ${safest[0].state} has the lowest violent crime rate among cities with 100,000+ residents.` }},
          { '@type': 'Question', name: 'What violent crime rate is considered safe?', acceptedAnswer: { '@type': 'Answer', text: 'The national average violent crime rate in 2024 was 359.1 per 100,000. Cities below 200 are generally considered very safe.' }},
          { '@type': 'Question', name: 'How many cities have crime data?', acceptedAnswer: { '@type': 'Answer', text: `OpenCrime has FBI crime data for ${allCities.length.toLocaleString()} US cities.` }},
        ]
      })}} />

      <p className="text-sm text-gray-500 mt-8">
        Source: FBI Crime Data Explorer, 2024 Offenses Known to Law Enforcement. Rates per 100,000 residents.
        The FBI cautions against using crime data to rank or compare communities due to varying factors.
      </p>
    </div>
  );
}
