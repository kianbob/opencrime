import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import QuizClient from './QuizClient';
import { loadData } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'How Safe Is Your City? Crime Safety Quiz | OpenCrime',
  description: 'Take our crime safety quiz to find out how your city compares to the national average. Test your knowledge of crime statistics and discover surprising facts.',
  alternates: { canonical: 'https://www.opencrime.us/tools/quiz' },
  openGraph: {
    title: 'Crime Safety Quiz — Test Your Knowledge',
    description: 'Think you know how safe your city is? Take the quiz and find out.',
    url: 'https://www.opencrime.us/tools/quiz',
  },
};

type CityData = {
  slug: string; city: string; state: string; population: number;
  violentRate: number; murderRate: number; propertyRate: number;
};

export default function QuizPage() {
  const allCities = loadData<CityData[]>('city-index.json');
  // Pick interesting cities for quiz questions
  const quizCities = allCities
    .filter(c => c.population >= 100000)
    .sort((a, b) => b.population - a.population)
    .slice(0, 100)
    .map(c => ({ slug: c.slug, city: c.city, state: c.state, violentRate: c.violentRate, murderRate: c.murderRate, propertyRate: c.propertyRate, population: c.population }));

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Crime Safety Quiz' }]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">🧠 Crime Safety Quiz</h1>
      <p className="text-lg text-gray-600 mb-6">
        How well do you know American crime statistics? Take our 10-question quiz to test your knowledge
        and discover some surprising facts about crime in the US.
      </p>

      <ShareButtons title="Crime Safety Quiz" />

      <div className="mt-8">
        <QuizClient cities={quizCities} />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'WebApplication',
        name: 'Crime Safety Quiz', url: 'https://www.opencrime.us/tools/quiz',
        applicationCategory: 'Quiz', operatingSystem: 'Any',
      })}} />
    </div>
  );
}
