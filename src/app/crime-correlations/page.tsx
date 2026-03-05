import type { Metadata } from 'next';
import { loadData } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import CorrelationCharts from './CorrelationCharts';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Crime vs Everything — Correlation Dashboard | OpenCrime',
  description: 'Do poverty, gun ownership, or income predict crime? Scatter plots and Pearson correlations for all 50 states + DC. Data-driven, not political.',
  alternates: { canonical: 'https://www.opencrime.us/crime-correlations' },
  openGraph: {
    title: 'Crime vs Everything — What Actually Correlates with Crime?',
    url: 'https://www.opencrime.us/crime-correlations',
  },
};

type CorrelationData = {
  correlations: {
    xLabel: string; yLabel: string; r: number; rSquared: number;
    interpretation: string; points: { state: string; x: number; y: number }[];
  }[];
};

export default function CrimeCorrelationsPage() {
  const data = loadData<CorrelationData>('correlations.json');

  const strongest = [...data.correlations].sort((a, b) => Math.abs(b.r) - Math.abs(a.r));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Crime Correlations' }]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Crime vs Everything</h1>
      <p className="text-lg text-gray-600 mb-6">
        What actually correlates with crime? We computed Pearson correlations across all 50 states + DC
        between crime rates and poverty, gun ownership, and median income. Click any dot to see the state.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
        ⚠️ <strong>Correlation does not equal causation.</strong> These scatter plots show statistical relationships
        between state-level variables. Many confounding factors (urbanization, demographics, policing, history)
        are not captured here. Use this as a starting point for understanding, not as proof of causation.
      </div>

      <AIOverview insights={[
        `Strongest correlation: ${strongest[0].xLabel} vs ${strongest[0].yLabel} (r=${strongest[0].r.toFixed(2)})`,
        `Poverty shows the clearest link to murder rates (r²=${data.correlations.find(c => c.yLabel === 'Murder Rate' && c.xLabel.includes('Poverty'))?.rSquared.toFixed(2)})`,
        'Gun ownership shows essentially no correlation with violent crime rates at the state level',
        'Median income shows almost no linear relationship with violent crime',
        'State-level data masks huge variation within states (urban vs rural)',
      ]} />

      <ShareButtons title="Crime vs Everything — Correlation Dashboard" />

      <div className="mt-8">
        <CorrelationCharts correlations={data.correlations} />
      </div>

      {/* Key findings */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mt-10">
        <h2 className="font-heading text-xl font-bold mb-4">Key Findings</h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-bold">🔴 Poverty is the strongest predictor of murder</h3>
            <p className="text-sm mt-1">With r={data.correlations.find(c => c.yLabel === 'Murder Rate' && c.xLabel.includes('Poverty'))?.r.toFixed(2)}, poverty rate explains about {((data.correlations.find(c => c.yLabel === 'Murder Rate' && c.xLabel.includes('Poverty'))?.rSquared || 0) * 100).toFixed(0)}% of the variation in state murder rates. Still, that means {(100 - (data.correlations.find(c => c.yLabel === 'Murder Rate' && c.xLabel.includes('Poverty'))?.rSquared || 0) * 100).toFixed(0)}% is explained by other factors.</p>
          </div>
          <div>
            <h3 className="font-bold">🔵 Gun ownership doesn&apos;t predict violent crime at the state level</h3>
            <p className="text-sm mt-1">The correlation between gun ownership and violent crime is essentially zero (r≈0). This doesn&apos;t mean guns don&apos;t matter — it means the relationship is far more complex than &quot;more guns = more crime&quot; or &quot;more guns = less crime.&quot;</p>
          </div>
          <div>
            <h3 className="font-bold">💰 Income doesn&apos;t linearly predict crime</h3>
            <p className="text-sm mt-1">Median income shows almost no correlation with violent crime. Some wealthy states (Maryland, Alaska) have high crime rates, while some lower-income states (Maine, Idaho) are very safe.</p>
          </div>
          <div>
            <h3 className="font-bold">🏙️ The hidden variable: urbanization</h3>
            <p className="text-sm mt-1">Much of the variation in state crime rates is driven by urbanization levels and the presence of large cities — a factor not captured in these simple correlations.</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mt-8">
        <h3 className="font-heading text-lg font-bold mb-3">Related</h3>
        <div className="flex flex-wrap gap-4">
          <Link href="/analysis/crime-and-poverty" className="text-[#1e3a5f] hover:underline">Crime & Poverty Analysis →</Link>
          <Link href="/analysis/crime-and-guns" className="text-[#1e3a5f] hover:underline">Crime & Guns Analysis →</Link>
          <Link href="/state-report-card" className="text-[#1e3a5f] hover:underline">State Report Cards →</Link>
          <Link href="/rankings" className="text-[#1e3a5f] hover:underline">State Rankings →</Link>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Crime vs Everything — Correlation Dashboard',
        description: 'Interactive scatter plots showing correlations between crime and poverty, gun ownership, and income across US states.',
        url: 'https://www.opencrime.us/crime-correlations',
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Does poverty cause crime?', acceptedAnswer: { '@type': 'Answer', text: 'Poverty shows a moderate positive correlation with violent crime and murder rates at the state level (r≈0.58 for murder). However, correlation does not prove causation — many other factors are involved.' }},
          { '@type': 'Question', name: 'Do states with more guns have more crime?', acceptedAnswer: { '@type': 'Answer', text: 'At the state level, gun ownership shows essentially no correlation with violent crime rates (r≈0.03). The relationship between guns and crime is far more complex than simple state-level comparisons suggest.' }},
          { '@type': 'Question', name: 'What is the biggest predictor of crime?', acceptedAnswer: { '@type': 'Answer', text: 'Among the factors analyzed, poverty rate shows the strongest correlation with murder rates (r≈0.58). However, urbanization, demographics, policing, and many other factors also play important roles.' }},
        ],
      })}} />
    </div>
  );
}
