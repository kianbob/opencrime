import { Metadata } from 'next';
import { loadData } from '@/lib/utils';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import AIOverview from '@/components/AIOverview';
import VelocityClient from './VelocityClient';

type VelocityCity = {
  slug: string; city: string; state: string; velocityScore: number;
  violentTrend: number; propertyTrend: number; category: string; years: number;
};

export const metadata: Metadata = {
  title: 'Crime Velocity Index — Which Cities Are Getting Worse Fastest? | OpenCrime',
  description: 'Crime isn\'t just about rates — it\'s about direction. See which US cities are getting worse fastest and which are improving, based on multi-year trend analysis.',
  openGraph: {
    title: 'Crime Velocity Index — Which Cities Are Getting Worse Fastest?',
    description: 'See which US cities are getting worse fastest and which are improving, based on multi-year trend analysis of violent and property crime rates.',
    url: 'https://www.opencrime.us/crime-velocity',
  },
  alternates: { canonical: 'https://www.opencrime.us/crime-velocity' },
};

export default function CrimeVelocityPage() {
  const all = loadData<VelocityCity[]>('crime-velocity.json');
  const worst25 = all.filter(c => c.velocityScore > 0).slice(0, 25);
  const best25 = [...all].reverse().filter(c => c.velocityScore < 0).slice(0, 25);

  const faqItems = [
    { q: 'What is the Crime Velocity Index?', a: 'The Crime Velocity Index measures the direction and speed of crime changes in a city using linear regression on multi-year crime rate data. A positive score means crime is worsening; negative means improving.' },
    { q: 'How is the velocity score calculated?', a: 'We compute the linear regression slope of violent and property crime rates over all available years (minimum 3). Violent crime is weighted 2x. Scores are normalized to -100 to +100.' },
    { q: 'Why might a city with low crime still have a bad velocity score?', a: 'Velocity measures direction, not level. A safe city could be worsening fast while a dangerous city improves. Both matter for understanding trends.' },
    { q: 'How many years of data are needed?', a: 'A minimum of 3 years of data is required for a meaningful trend. Cities with more years produce more reliable scores.' },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Dataset',
        name: 'Crime Velocity Index — Which Cities Are Getting Worse Fastest?',
        description: 'Multi-year trend analysis showing which US cities are getting worse or better fastest.',
        url: 'https://www.opencrime.us/crime-velocity',
        creator: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        license: 'https://www.opencrime.us/about',
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqItems.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      })}} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Crime Velocity' }]} />

      <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">Crime Velocity Index</h1>
      <p className="text-xl text-gray-600 mb-2">Which Cities Are Getting Worse Fastest?</p>
      <p className="text-gray-500 mb-6">Crime isn&apos;t just about rates — it&apos;s about <strong>direction</strong>. A city with moderate crime getting worse fast is more concerning than a high-crime city that&apos;s improving.</p>

      <ShareButtons title="Crime Velocity Index" />

      <AIOverview insights={[
        `${all.filter(c => c.category === 'rapidly-worsening').length} cities are rapidly worsening while ${all.filter(c => c.category === 'rapidly-improving').length} are rapidly improving.`,
        `The worst velocity score is ${worst25[0]?.velocityScore} (${worst25[0]?.city}, ${worst25[0]?.state}).`,
        `${all.filter(c => c.category === 'stable').length} cities (${Math.round(all.filter(c => c.category === 'stable').length / all.length * 100)}%) are stable.`,
        `Analysis covers ${all.length.toLocaleString()} cities with 3+ years of crime data.`,
      ]} />

      <VelocityClient worst25={worst25} best25={best25} all={all} />

      <section className="mt-12 bg-gray-50 rounded-xl p-6">
        <h2 className="font-display text-xl font-bold mb-4">Methodology</h2>
        <p className="text-sm text-gray-600 mb-3">The Crime Velocity Index uses <strong>linear regression</strong> on each city&apos;s violent and property crime rates over all available years (2020-2024). The slope measures the annual rate of change.</p>
        <p className="text-sm text-gray-600 mb-3">Violent crime trends are weighted 2x relative to property crime in the composite score. Scores are normalized to a -100 to +100 scale where negative = improving, positive = worsening.</p>
        <p className="text-sm text-gray-600">Cities require a minimum of 3 years of data. More years = more reliable scores. Data from FBI Crime Data Explorer.</p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqItems.map((f, i) => (
            <div key={i}>
              <h3 className="font-semibold text-gray-800">{f.q}</h3>
              <p className="text-sm text-gray-600 mt-1">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 pt-8 border-t">
        <h2 className="font-heading text-2xl font-bold mb-4">Related Analysis</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/analysis/safest-places-to-live" className="block border rounded-lg p-4 hover:bg-gray-50 transition">
            <h3 className="font-semibold">Safest Places to Live</h3>
            <p className="text-sm text-gray-600">Find the safest cities and states in America based on crime data.</p>
          </Link>
          <Link href="/rankings" className="block border rounded-lg p-4 hover:bg-gray-50 transition">
            <h3 className="font-semibold">City Crime Rankings</h3>
            <p className="text-sm text-gray-600">See how cities rank by violent and property crime rates.</p>
          </Link>
          <Link href="/most-improved" className="block border rounded-lg p-4 hover:bg-gray-50 transition">
            <h3 className="font-semibold">Most Improved Cities</h3>
            <p className="text-sm text-gray-600">Cities that have made the biggest improvements in public safety.</p>
          </Link>
          <Link href="/city-trajectories" className="block border rounded-lg p-4 hover:bg-gray-50 transition">
            <h3 className="font-semibold">City Crime Trajectories</h3>
            <p className="text-sm text-gray-600">Long-term crime direction for every city — improving, worsening, or stable.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
