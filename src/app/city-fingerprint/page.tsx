import { Metadata } from 'next';
import { loadData } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import AIOverview from '@/components/AIOverview';
import FingerprintClient from './FingerprintClient';

type Profile = { murderPct: number; rapePct: number; robberyPct: number; assaultPct: number; burglaryPct: number; larcenyPct: number; mvtPct: number };
type CityDNA = { slug: string; city: string; state: string; population: number; profile: Profile; personality: string; deviations: Record<string, number> };

export const metadata: Metadata = {
  title: 'Your City\'s Crime DNA — Crime Fingerprint Analysis | OpenCrime',
  description: 'Every city has a unique crime "fingerprint." Search for any city to see its crime DNA profile, radar chart comparison to national averages, and similar cities.',
  openGraph: {
    title: 'Your City\'s Crime DNA — Fingerprint Analysis',
    description: 'Search for any city to see its crime DNA profile with radar chart and similar cities.',
    url: 'https://www.opencrime.us/city-fingerprint',
  },
  alternates: { canonical: 'https://www.opencrime.us/city-fingerprint' },
};

export default function CityFingerprintPage() {
  const cities = loadData<CityDNA[]>('crime-dna-profiles.json');

  // Compute national average from stats
  const stats = loadData<{ national2024: { homicide: number; rape: number; robbery: number; aggravatedAssault: number; burglary: number; larceny: number; motorVehicleTheft: number; violentCrime: number; propertyCrime: number } }>('stats.json');
  const nat = stats.national2024;
  const total = nat.violentCrime + nat.propertyCrime;
  const nationalAvg: Profile = {
    murderPct: Math.round(nat.homicide / total * 10000) / 100,
    rapePct: Math.round(nat.rape / total * 10000) / 100,
    robberyPct: Math.round(nat.robbery / total * 10000) / 100,
    assaultPct: Math.round(nat.aggravatedAssault / total * 10000) / 100,
    burglaryPct: Math.round(nat.burglary / total * 10000) / 100,
    larcenyPct: Math.round(nat.larceny / total * 10000) / 100,
    mvtPct: Math.round(nat.motorVehicleTheft / total * 10000) / 100,
  };

  const personalities = cities.reduce((acc, c) => { acc[c.personality] = (acc[c.personality] || 0) + 1; return acc; }, {} as Record<string, number>);
  const topPersonality = Object.entries(personalities).sort((a, b) => b[1] - a[1])[0];

  const faqItems = [
    { q: 'What is a city\'s Crime DNA?', a: 'Crime DNA is the normalized breakdown of crime types in a city — what percentage is murder, rape, robbery, assault, burglary, larceny, and auto theft. It reveals the unique "personality" of crime in each city.' },
    { q: 'How are crime personalities assigned?', a: 'We compare each city\'s crime mix to the national average. If violent crime share is much higher than average, it might be a "Violent Hub." If property crime dominates, it\'s a "Property Target." Cities close to national averages are "Balanced."' },
    { q: 'Why do some cities have such different crime profiles?', a: 'Local factors like economic conditions, demographics, geography, policing strategies, drug markets, and social services all influence what types of crime occur. A tourist city may see more theft; an economically depressed area may see more assault.' },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Dataset',
        name: 'City Crime DNA Profiles — Crime Fingerprint Analysis',
        description: 'Normalized crime profiles for the top 500 US cities showing crime composition and personality.',
        url: 'https://www.opencrime.us/city-fingerprint',
        creator: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqItems.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      })}} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'City Crime DNA' }]} />

      <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">Your City&apos;s Crime DNA</h1>
      <p className="text-xl text-gray-600 mb-2">Every city has a unique crime fingerprint.</p>
      <p className="text-gray-500 mb-6">Two cities can have the same crime rate but completely different crime profiles. Search for your city to see its radar chart, &quot;crime personality,&quot; and find similar cities.</p>

      <ShareButtons title="Your City's Crime DNA" />

      <AIOverview insights={[
        `${cities.length} cities profiled — the most common personality is "${topPersonality[0]}" (${topPersonality[1]} cities).`,
        `Crime DNA reveals why total crime rate alone is misleading — a "Theft Magnet" and "Assault Capital" require different interventions.`,
        `National average: ${nationalAvg.larcenyPct.toFixed(1)}% larceny, ${nationalAvg.assaultPct.toFixed(1)}% assault, ${nationalAvg.mvtPct.toFixed(1)}% auto theft.`,
      ]} />

      <FingerprintClient cities={cities} nationalAvg={nationalAvg} />

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
