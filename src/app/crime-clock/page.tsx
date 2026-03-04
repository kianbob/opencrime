import { Metadata } from 'next';
import { loadData } from '@/lib/utils';
import type { Analytics } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import CrimeClockClient from './CrimeClockClient';

export const metadata: Metadata = {
  title: 'Crime Clock — How Often Crimes Occur in America | OpenCrime',
  description: 'A real-time visualization of how frequently crimes occur across the United States. One violent crime every 26 seconds, one murder every 31 minutes.',
  openGraph: {
    title: 'Crime Clock — How Often Crimes Occur in America',
    description: 'A real-time visualization showing one violent crime every 26 seconds in America.',
    url: 'https://www.opencrime.us/crime-clock',
  },
  alternates: { canonical: 'https://www.opencrime.us/crime-clock' },
};

export default function CrimeClockPage() {
  const analytics = loadData<Analytics>('analytics.json');
  const { crimeClock } = analytics;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Crime Clock' }]} />
      <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">Crime Clock</h1>
      <p className="text-lg text-gray-600 mb-8">
        How often do crimes happen in the United States? Based on 2024 FBI data, this clock shows the
        frequency of reported crimes across the country. These numbers represent real crimes reported to
        law enforcement — the actual rate is higher due to unreported crimes.
      </p>

      <CrimeClockClient crimeClock={crimeClock} />

      <section className="mt-12 prose prose-gray max-w-none">
        <h2 className="font-display text-2xl font-bold text-primary">Understanding the Crime Clock</h2>
        <p>
          The FBI Crime Clock has been a staple of crime reporting since the 1950s. It translates raw annual
          crime statistics into frequencies that are easier to understand — instead of saying &quot;1.22 million
          violent crimes per year,&quot; it shows that a violent crime occurs approximately every {crimeClock.violentCrime} seconds.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg my-6 not-prose">
          <p className="text-amber-800 text-sm">
            <strong>Important:</strong> The Crime Clock should not be taken to imply regularity in the occurrence of crimes.
            It simply represents the annual ratio between crime totals and the number of seconds in a year. Crime does not
            occur at fixed intervals — it is influenced by time of day, geography, weather, and many other factors.
          </p>
        </div>

        <h2 className="font-display text-2xl font-bold text-primary">What the Data Shows</h2>
        <ul>
          <li><strong>Property crime dominates:</strong> A property crime occurs every {crimeClock.propertyCrime} seconds — roughly 5× more frequent than violent crime.</li>
          <li><strong>Assault is the most common violent crime:</strong> One every {crimeClock.assault} seconds, making up over 60% of all violent crime.</li>
          <li><strong>Motor vehicle theft surged:</strong> One every {crimeClock.motorVehicleTheft} seconds — the fastest-growing crime category in recent years.</li>
          <li><strong>Murder remains relatively rare:</strong> While every murder is a tragedy, it occurs once every {Math.round(crimeClock.murder / 60)} minutes — a rate that has dropped 15.7% from 2023 to 2024.</li>
        </ul>

        <h2 className="font-display text-2xl font-bold text-primary">Historical Context</h2>
        <p>
          The 2024 crime clock shows a significantly safer America compared to the early 1990s. At the peak in 1991,
          a violent crime occurred every 17 seconds. Today that figure is {crimeClock.violentCrime} seconds — a testament to
          decades of declining crime rates, though the story varies significantly by city and crime type.
        </p>
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <a href="/dashboard" className="text-primary hover:underline">→ Crime Dashboard</a>
        <a href="/crimes" className="text-primary hover:underline">→ Crime Types</a>
        <a href="/rankings" className="text-primary hover:underline">→ City Rankings</a>
      </div>

      <ShareButtons title="Crime Clock — How Often Crimes Occur in America" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How often does a violent crime occur in the US?', acceptedAnswer: { '@type': 'Answer', text: `Based on 2024 FBI data, a violent crime occurs approximately every ${crimeClock.violentCrime} seconds in the United States.` } },
          { '@type': 'Question', name: 'How often does a murder happen in America?', acceptedAnswer: { '@type': 'Answer', text: `A murder occurs approximately every ${Math.round(crimeClock.murder / 60)} minutes based on 2024 FBI data, or about ${Math.round(365.25 * 24 * 3600 / crimeClock.murder).toLocaleString()} per year.` } },
          { '@type': 'Question', name: 'What is the most common crime in America?', acceptedAnswer: { '@type': 'Answer', text: `Larceny-theft is the most common crime, occurring every ${crimeClock.larceny} seconds. Among violent crimes, aggravated assault is most common at one every ${crimeClock.assault} seconds.` } },
        ]
      })}} />
    </main>
  );
}
