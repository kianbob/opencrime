import { Metadata } from 'next';
import { loadData } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import AIOverview from '@/components/AIOverview';
import InequalityClient from './InequalityClient';

type StateData = {
  state: string; abbr: string; giniIndex: number; topCityPct: number;
  top3Pct: number; topCity: string; numCities: number; avgRate: number; maxRate: number; minRate: number;
};

export const metadata: Metadata = {
  title: 'Violence Inequality Index — How Concentrated Is Crime in Your State? | OpenCrime',
  description: 'In some states, one city has ALL the violent crime. In others, it\'s spread everywhere. See the Gini coefficient of violence across US states.',
  openGraph: {
    title: 'Violence Inequality Index — How Concentrated Is Crime?',
    description: 'In some states, one city has ALL the crime. In others, it\'s everywhere. Explore the Gini coefficient of violence.',
    url: 'https://www.opencrime.us/violence-inequality',
  },
  alternates: { canonical: 'https://www.opencrime.us/violence-inequality' },
};

export default function ViolenceInequalityPage() {
  const data = loadData<StateData[]>('violence-inequality.json');
  const highGini = data.filter(d => d.giniIndex > 0.6);
  const lowGini = data.filter(d => d.giniIndex < 0.4);

  const faqItems = [
    { q: 'What is the Violence Inequality Index?', a: 'It measures how unevenly violent crime is distributed across cities within a state using the Gini coefficient. A score of 1.0 means all crime is in one city; 0.0 means perfectly even distribution.' },
    { q: 'Why does crime concentration matter?', a: 'States with high concentration may need targeted interventions in specific cities, while evenly distributed crime requires statewide approaches. It also affects how "safe" a state feels overall.' },
    { q: 'What is a Gini coefficient?', a: 'Originally used to measure income inequality, the Gini coefficient ranges from 0 (perfect equality) to 1 (maximum inequality). We apply it to violent crime rates across cities in each state.' },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Dataset',
        name: 'Violence Inequality Index by US State',
        description: 'Gini coefficient of violent crime distribution across cities in each US state.',
        url: 'https://www.opencrime.us/violence-inequality',
        creator: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqItems.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      })}} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Violence Inequality' }]} />

      <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">The Violence Inequality Index</h1>
      <p className="text-xl text-gray-600 mb-2">In some states, one city has ALL the crime. In others, it&apos;s everywhere.</p>
      <p className="text-gray-500 mb-6">Using the Gini coefficient — the same tool economists use to measure wealth inequality — we measure how concentrated violent crime is within each state.</p>

      <ShareButtons title="Violence Inequality Index" />

      <AIOverview insights={[
        `${data[0].state} has the highest crime concentration (Gini: ${data[0].giniIndex.toFixed(3)}) — ${data[0].topCityPct}% of violent crime is in ${data[0].topCity}.`,
        `${highGini.length} states have a Gini above 0.6, meaning crime is highly concentrated in a few cities.`,
        `${lowGini.length} states have relatively even crime distribution (Gini below 0.4).`,
        `On average, the top 3 cities in each state account for ${Math.round(data.reduce((s, d) => s + d.top3Pct, 0) / data.length)}% of violent crime.`,
      ]} />

      <InequalityClient data={data} />

      <section className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h2 className="font-display text-xl font-bold mb-3">💡 Why This Matters</h2>
        <p className="text-sm text-gray-700 mb-2">When a state has a high Gini index, it means most of the state is relatively safe, but a few cities carry an outsized burden of violence. This has implications for:</p>
        <ul className="text-sm text-gray-700 list-disc ml-6 space-y-1">
          <li><strong>Policy:</strong> Statewide averages can be misleading — targeted city-level interventions may be more effective</li>
          <li><strong>Perception:</strong> People may avoid an entire state because of one city&apos;s reputation</li>
          <li><strong>Resources:</strong> Concentrated crime means concentrated demand for services</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold mb-4">FAQ</h2>
        <div className="space-y-4">
          {faqItems.map((f, i) => (
            <div key={i}>
              <h3 className="font-semibold text-gray-800">{f.q}</h3>
              <p className="text-sm text-gray-600 mt-1">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
