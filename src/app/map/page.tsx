import type { Metadata } from 'next';
import Link from 'next/link';
import { loadData, fmtNum } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import CrimeMapClient from './CrimeMapClient';

type StateSummary = {
  abbr: string; name: string; population: number;
  violentCrime: number; violentRate: number;
  homicide: number; homicideRate: number;
  propertyCrime: number; propertyRate: number;
  year: number; violentChange: number; propertyChange: number;
};

export const metadata: Metadata = {
  title: 'Interactive US Crime Map — Crime Rates by State (2024) | OpenCrime',
  description: 'Interactive map of crime rates across all 50 US states + DC. Color-coded by violent crime, murder, or property crime rates. Click any state for details.',
  alternates: { canonical: 'https://www.opencrime.us/map' },
  openGraph: {
    title: 'Interactive US Crime Map — Crime Rates by State',
    description: 'Explore crime rates across America with our interactive color-coded map. 2024 FBI data for all 50 states.',
    url: 'https://www.opencrime.us/map',
  },
};

export default function CrimeMapPage() {
  const states = loadData<StateSummary[]>('state-summary.json');

  const totalViolent = states.reduce((s, st) => s + st.violentCrime, 0);
  const totalPop = states.reduce((s, st) => s + st.population, 0);
  const sorted = [...states].sort((a, b) => b.violentRate - a.violentRate);

  const insights = [
    `${sorted[0].name} has the highest violent crime rate at ${sorted[0].violentRate.toFixed(1)}/100K. ${sorted[sorted.length - 1].name} has the lowest at ${sorted[sorted.length - 1].violentRate.toFixed(1)}/100K.`,
    `National violent crime rate: ${(totalViolent / totalPop * 100000).toFixed(1)} per 100K (${fmtNum(totalViolent)} total crimes, ${fmtNum(totalPop)} population).`,
    `${states.filter(s => s.violentChange < 0).length} states saw violent crime decrease in 2024, while ${states.filter(s => s.violentChange > 0).length} saw increases.`,
    `The gap between safest and most dangerous states is ${(sorted[0].violentRate / sorted[sorted.length - 1].violentRate).toFixed(1)}x — a massive disparity within one country.`,
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Crime Map' }]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Interactive US Crime Map</h1>
      <p className="text-lg text-gray-600 mb-6">
        Explore crime rates across all 50 states and DC. Color intensity shows crime severity — 
        darker means higher rates. Click any state for detailed data. Toggle between violent crime,
        murder rate, and property crime.
      </p>

      <AIOverview insights={insights} />
      <ShareButtons title="Interactive US Crime Map — Crime Rates by State (2024)" />

      <div className="flex flex-wrap gap-3 mt-6 mb-6">
        <Link href="/states" className="border border-[#1e3a5f] text-[#1e3a5f] px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition">All States Data</Link>
        <Link href="/rankings" className="border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">City Rankings</Link>
        <Link href="/violence-inequality" className="border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">Violence Inequality</Link>
        <Link href="/international-comparison" className="border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">US vs World</Link>
        <Link href="/tools/state-compare" className="border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">Compare States</Link>
      </div>

      <div>
        <CrimeMapClient states={states.map(s => ({
          abbr: s.abbr, name: s.name, population: s.population,
          violentRate: s.violentRate, homicideRate: s.homicideRate,
          propertyRate: s.propertyRate, violentChange: s.violentChange,
          violentCrime: s.violentCrime, homicide: s.homicide,
          propertyCrime: s.propertyCrime,
        }))} />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'WebApplication',
        name: 'Interactive US Crime Map',
        description: 'Interactive map of crime rates by state with 2024 FBI data.',
        url: 'https://www.opencrime.us/map',
        applicationCategory: 'DataVisualization',
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Which state has the highest crime rate?', acceptedAnswer: { '@type': 'Answer', text: `${sorted[0].name} has the highest violent crime rate at ${sorted[0].violentRate.toFixed(1)} per 100,000 residents in 2024.` }},
          { '@type': 'Question', name: 'Which state has the lowest crime rate?', acceptedAnswer: { '@type': 'Answer', text: `${sorted[sorted.length - 1].name} has the lowest violent crime rate at ${sorted[sorted.length - 1].violentRate.toFixed(1)} per 100,000 residents in 2024.` }},
          { '@type': 'Question', name: 'Is crime going up or down in the US?', acceptedAnswer: { '@type': 'Answer', text: `In 2024, ${states.filter(s => s.violentChange < 0).length} states saw decreases in violent crime while ${states.filter(s => s.violentChange > 0).length} saw increases. Nationally, violent crime continues a long-term decline from its 1991 peak.` }},
        ],
      })}} />
    </main>
  );
}
