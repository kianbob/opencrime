import { Metadata } from 'next';
import { loadData, fmtNum } from '@/lib/utils';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import NumbersClient from './NumbersClient';

type Analytics = {
  crimeClock: {
    violentCrime: number;
    murder: number;
    assault: number;
    robbery: number;
    rape: number;
    propertyCrime: number;
    burglary: number;
    larceny: number;
    motorVehicleTheft: number;
  };
};

type Stats = {
  national2024: {
    violentCrime: number;
    propertyCrime: number;
    homicide: number;
    population: number;
  };
};

const analytics = loadData<Analytics>('analytics.json');
const stats = loadData<Stats>('stats.json');

export const metadata: Metadata = {
  title: 'Crime by the Numbers — Live Interactive Dashboard | OpenCrime',
  description: 'Watch crime happen in real time. Animated counters, the crime clock, cost of crime, and shocking statistics from FBI data — all in one interactive dashboard.',
  openGraph: {
    title: 'Crime by the Numbers — Watch It Happen in Real Time',
    description: 'A violent crime every 26 seconds. A murder every 31 minutes. $2.6 trillion per year. See the numbers tick.',
    url: 'https://www.opencrime.us/numbers',
  },
  alternates: { canonical: 'https://www.opencrime.us/numbers' },
};

export default function NumbersPage() {
  return (
    <main>
      <div className="max-w-5xl mx-auto px-4 pt-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Crime by the Numbers' }]} />
      </div>

      {/* Dark hero section */}
      <section className="bg-gray-950 text-white py-12 md:py-20 px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Crime by the Numbers</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Every number is a person. Every second, another crime. This page updates in real time based on FBI data.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <NumbersClient
            crimeClock={analytics.crimeClock}
            national={stats.national2024}
          />
        </div>
      </section>

      {/* Light section for SEO text */}
      <section className="max-w-4xl mx-auto px-4 py-12 prose prose-gray max-w-none">
        <h2 className="font-display text-2xl font-bold text-primary">Understanding the Scale of Crime in America</h2>
        <p>
          The United States recorded over {fmtNum(stats.national2024.violentCrime + stats.national2024.propertyCrime)} crimes
          in 2024, including {fmtNum(stats.national2024.violentCrime)} violent crimes and {fmtNum(stats.national2024.propertyCrime)} property
          crimes. The economic cost of crime exceeds $2.6 trillion annually when accounting for victim costs, criminal
          justice expenses, lost productivity, and reduced quality of life.
        </p>
        <p>
          The &quot;crime clock&quot; above is derived from FBI Uniform Crime Report data — dividing the total number of
          each crime type by the seconds in a year to show how frequently they occur. While useful for illustrating
          scale, the FBI notes that the crime clock should not be interpreted as a regularity in crime occurrence.
        </p>

        <h2 className="font-display text-2xl font-bold text-primary">Frequently Asked Questions</h2>
        <h3>How often does a violent crime happen in the US?</h3>
        <p>Based on 2024 FBI data, a violent crime occurs approximately every 26 seconds in the United States.</p>
        <h3>What is the economic cost of crime?</h3>
        <p>The total economic cost of crime in the United States is estimated at $2.6 trillion per year, or about $82,000 per second. This includes direct victim losses, medical costs, criminal justice system costs, and lost productivity.</p>
        <h3>How many crimes happen per day in America?</h3>
        <p>Approximately {fmtNum(Math.round((stats.national2024.violentCrime + stats.national2024.propertyCrime) / 365))} crimes are reported per day in the US, and experts estimate the true number (including unreported crimes) may be 2-3 times higher.</p>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-10">
        <section className="mt-12 pt-8 border-t">
          <h2 className="font-heading text-2xl font-bold mb-4">Related Analysis</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/crime-clock" className="block border rounded-lg p-4 hover:bg-gray-50 transition">
              <h3 className="font-semibold">The Crime Clock</h3>
              <p className="text-sm text-gray-600">Watch crimes tick in real time based on FBI frequency data.</p>
            </Link>
            <Link href="/hidden-crime" className="block border rounded-lg p-4 hover:bg-gray-50 transition">
              <h3 className="font-semibold">Hidden Crime</h3>
              <p className="text-sm text-gray-600">For every reported crime, 1-3 more go unreported. See the true scale.</p>
            </Link>
            <Link href="/analysis/cost-of-crime" className="block border rounded-lg p-4 hover:bg-gray-50 transition">
              <h3 className="font-semibold">The Cost of Crime</h3>
              <p className="text-sm text-gray-600">Crime costs America $2.6 trillion per year. See the full breakdown.</p>
            </Link>
            <Link href="/dashboard" className="block border rounded-lg p-4 hover:bg-gray-50 transition">
              <h3 className="font-semibold">Crime Dashboard</h3>
              <p className="text-sm text-gray-600">Interactive dashboard with national crime trends and statistics.</p>
            </Link>
          </div>
        </section>

        <ShareButtons title="Crime by the Numbers — Live Dashboard" />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How often does a violent crime happen in the US?', acceptedAnswer: { '@type': 'Answer', text: 'Based on 2024 FBI data, a violent crime occurs approximately every 26 seconds in the United States.' } },
          { '@type': 'Question', name: 'What is the economic cost of crime in America?', acceptedAnswer: { '@type': 'Answer', text: 'The total economic cost of crime in the United States is estimated at $2.6 trillion per year, or about $82,000 per second.' } },
          { '@type': 'Question', name: 'How many crimes happen per day in America?', acceptedAnswer: { '@type': 'Answer', text: `Approximately ${Math.round((stats.national2024.violentCrime + stats.national2024.propertyCrime) / 365).toLocaleString()} crimes are reported per day in the US.` } },
        ]
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Crime by the Numbers — Live Dashboard',
        description: 'Interactive real-time crime statistics dashboard with animated counters.',
        url: 'https://www.opencrime.us/numbers',
        applicationCategory: 'ReferenceApplication',
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
      })}} />
    </main>
  );
}
