import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import ParadoxCharts from './ParadoxCharts';

export const metadata: Metadata = {
  title: 'The Population-Crime Paradox — Big Cities Aren\'t the Most Dangerous',
  description: 'Mid-size cities (250-500K) have HIGHER violent crime rates than cities over 1 million. The data challenges everything you think about city size and safety.',
  openGraph: { title: 'The Population-Crime Paradox', description: 'Mid-size cities are more dangerous than mega-cities. The data will surprise you.' },
};

type Analytics = {
  popCrimeBins: { label: string; count: number; avgViolentRate: number; avgMurderRate: number; avgPropertyRate: number; medianViolentRate?: number }[];
};

export default function PopulationParadoxPage() {
  const analytics = loadData<Analytics>('analytics.json');
  const bins = analytics.popCrimeBins;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Population-Crime Paradox' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">The Population-Crime Paradox</h1>
      <p className="text-xl text-gray-600 mb-8">
        Bigger cities aren&apos;t always more dangerous. In fact, the data shows something surprising: 
        mid-size cities have the <em>highest</em> violent crime rates.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-2">The Key Finding</h2>
        <p className="text-lg">
          Cities with 500K-1M residents have an average violent crime rate 
          of <strong className="text-red-600">{fmtRate(bins.find(b => b.label === '500K-1M')?.avgViolentRate ?? 0)}</strong> per 100K — 
          while cities over 1 million average just <strong className="text-green-700">{fmtRate(bins.find(b => b.label === 'Over 1M')?.avgViolentRate ?? 0)}</strong>.
        </p>
      </div>

      <ParadoxCharts bins={bins} />

      <h2 className="font-heading text-2xl font-bold mb-4 mt-8">Crime Rate by City Size</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">City Size</th>
              <th className="text-right px-4 py-2">Cities</th>
              <th className="text-right px-4 py-2">Avg Violent Rate</th>
              <th className="text-right px-4 py-2">Avg Murder Rate</th>
              <th className="text-right px-4 py-2">Avg Property Rate</th>
            </tr>
          </thead>
          <tbody>
            {bins.map(b => (
              <tr key={b.label} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{b.label}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(b.count)}</td>
                <td className="px-4 py-2 text-right font-mono text-red-600 font-semibold">{fmtRate(b.avgViolentRate)}</td>
                <td className="px-4 py-2 text-right font-mono">{b.avgMurderRate.toFixed(2)}</td>
                <td className="px-4 py-2 text-right font-mono text-blue-700">{fmtRate(b.avgPropertyRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">Why This Happens</h2>
        <p>
          The intuitive assumption is that bigger cities = more crime. Media reinforces this — 
          New York, Los Angeles, and Chicago dominate crime coverage. But the data reveals a more 
          nuanced story:
        </p>
        <ul>
          <li><strong>Resources:</strong> The largest cities (1M+) have massive police departments, specialized units, advanced technology, and bigger budgets per capita. They can afford CompStat, ShotSpotter, gang task forces, and violence intervention programs.</li>
          <li><strong>Diversity of neighborhoods:</strong> Mega-cities have huge affluent populations that dilute the overall rate. Manhattan&apos;s Upper East Side and South Central LA are in the same city but might as well be different planets.</li>
          <li><strong>Economic diversity:</strong> The largest cities have diverse economies with more job opportunities, higher wages, and more social services.</li>
          <li><strong>Mid-size city challenges:</strong> Cities of 250K-1M often have big-city problems (poverty, gangs, drugs) but small-city resources. Many are former industrial centers (Memphis, St. Louis, Detroit, Baltimore, Cleveland) hit hard by deindustrialization.</li>
          <li><strong>Suburban effect:</strong> Smaller cities under 100K benefit from being embedded in metro areas with additional resources, while mid-size cities are often stand-alone urban cores.</li>
        </ul>

        <h2 className="font-heading">The Real Safety Pattern</h2>
        <p>
          The safest population bracket is actually <strong>10-25K</strong> with an average 
          violent crime rate of just {fmtRate(bins.find(b => b.label === '10-25K')?.avgViolentRate ?? 0)}. 
          Small cities under 10K have a <em>higher</em> average rate 
          of {fmtRate(bins.find(b => b.label === 'Under 10K')?.avgViolentRate ?? 0)} — partly because 
          small populations make rates volatile (one bar fight can spike the rate dramatically), 
          and partly because some very small towns have genuine crime problems that fly under the radar.
        </p>

        <h2 className="font-heading">What This Means for You</h2>
        <p>
          If you&apos;re evaluating cities for safety, don&apos;t assume bigger = more dangerous. 
          A suburb of 150,000 might be far safer than a city of 300,000. And a mega-city of 2 million 
          might be safer than both — depending on which neighborhood you&apos;re in.
        </p>
        <p>
          The takeaway: <strong>city size is a poor predictor of safety. Neighborhood matters more 
          than city size. Resources and economic health matter more than population.</strong>
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/rankings" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">City Rankings</Link>
        <Link href="/analysis/rural-vs-urban" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Rural vs Urban</Link>
        <Link href="/tools/risk-calculator" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Risk Calculator</Link>
      </div>

      <div className="mt-8"><ShareButtons title="The Population-Crime Paradox" /></div>
      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer, 2024. Analysis of 9,739 reporting cities.</p>
    </div>
  );
}
