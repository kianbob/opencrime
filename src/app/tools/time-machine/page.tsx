import type { Metadata } from 'next';
import { loadData } from '@/lib/utils';
import type { NationalTrend } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import TimeMachineClient from './TimeMachineClient';

export const metadata: Metadata = {
  title: 'Crime When You Were Born — Time Machine Tool | OpenCrime',
  description: 'Enter your birth year and see what the crime rate was, how it compares to today, and whether crime was rising or falling. Interactive crime history tool with data from 1979-2024.',
  keywords: ['crime rate in year', 'crime when I was born', 'crime rate history', 'historical crime data', 'violent crime by year'],
  alternates: { canonical: 'https://www.opencrime.us/tools/time-machine' },
  openGraph: {
    title: 'Crime When You Were Born — Time Machine',
    description: 'Enter your birth year and discover what crime looked like. Was it safer then or now?',
    url: 'https://www.opencrime.us/tools/time-machine',
  },
};

export default function TimeMachinePage() {
  const national = loadData<NationalTrend[]>('national-trends.json');
  const data = national.map(n => ({
    year: n.year,
    violentRate: n.violentRate,
    homicideRate: n.homicideRate,
    propertyRate: n.propertyRate,
    violentCrime: n.violentCrime,
    homicide: n.homicide,
    population: n.population,
  }));

  const faqData = [
    { question: 'What years does the Crime Time Machine cover?', answer: 'Our tool covers 1979 to 2024 using FBI Uniform Crime Reporting data. Years 2017-2020 use interpolated estimates due to a reporting transition.' },
    { question: 'How does crime today compare to the 1990s?', answer: 'Violent crime has fallen dramatically. The 2024 rate of 359.1 per 100,000 is about 53% lower than the 1991 peak of 758.2 per 100,000.' },
    { question: 'Was crime higher when I was born?', answer: 'For most people born before 2014, yes — crime was significantly higher. The violent crime rate peaked in 1991 and has generally declined since.' },
    { question: 'What was the most dangerous year in US history?', answer: '1991 had the highest violent crime rate at 758.2 per 100,000 people, during the crack cocaine epidemic.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Crime Time Machine' }]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">🕰️ Crime When You Were Born</h1>
      <p className="text-lg text-gray-600 mb-6">
        Enter your birth year and travel back in time to see what crime looked like the year you arrived.
        Was America safer or more dangerous? The answer might surprise you.
      </p>

      <AIOverview insights={[
        'Violent crime peaked in 1991 at 758.2 per 100K — the height of the crack epidemic',
        'Today\'s rate of 359.1 per 100K is 53% lower than the peak',
        'Murder rates have fallen from 9.8 (1991) to 5.5 (2024) per 100K',
        'Most people born after 1960 were born into a more dangerous America than today',
      ]} />

      <ShareButtons title="Crime When You Were Born — Time Machine" />

      <div className="mt-8">
        <TimeMachineClient data={data} />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Crime Time Machine',
        description: 'Interactive tool to see crime rates for any year from 1979-2024',
        url: 'https://www.opencrime.us/tools/time-machine',
        applicationCategory: 'DataVisualization',
        operatingSystem: 'Any',
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      })}} />
    </div>
  );
}
