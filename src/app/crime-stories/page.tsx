import { Metadata } from 'next';
import { loadData, fmtNum, fmtRate, stateAbbr } from '@/lib/utils';
import type { CityIndex } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import Link from 'next/link';
import AIOverview from '@/components/AIOverview';

export const metadata: Metadata = {
  title: 'Crime Stories — Data-Driven City Profiles That Tell a Story | OpenCrime',
  description: 'Every city has a crime story. From dramatic turnarounds to crisis spirals, explore data-driven narratives for America\'s most interesting crime profiles.',
  openGraph: {
    title: 'Crime Stories — The Data Behind Every City',
    description: 'Dramatic turnarounds, crisis spirals, and surprising safety stories told through FBI data.',
    url: 'https://www.opencrime.us/crime-stories',
  },
  alternates: { canonical: 'https://www.opencrime.us/crime-stories' },
};

export default function CrimeStoriesPage() {
  const cities = loadData<CityIndex[]>('city-index.json');

  // Biggest turnarounds: improving with large pop
  const turnarounds = cities
    .filter(c => c.trajectory === 'improving' && c.population >= 50000 && (c.violentChange ?? 0) < -10)
    .sort((a, b) => (a.violentChange ?? 0) - (b.violentChange ?? 0))
    .slice(0, 10);

  // Crisis cities: worsening with high rates
  const crisis = cities
    .filter(c => c.trajectory === 'worsening' && c.population >= 25000)
    .sort((a, b) => b.violentRate - a.violentRate)
    .slice(0, 10);

  // Surprisingly safe big cities
  const surpriseSafe = cities
    .filter(c => c.population >= 200000 && c.violentRate < 250 && c.safetyPercentile <= 30)
    .sort((a, b) => a.violentRate - b.violentRate)
    .slice(0, 10);

  // Small town dangers
  const smallDanger = cities
    .filter(c => c.population >= 5000 && c.population < 25000 && c.violentRate > 1500)
    .sort((a, b) => b.violentRate - a.violentRate)
    .slice(0, 10);

  // Volatile: biggest swings
  const volatile = cities
    .filter(c => c.trajectory === 'volatile' && c.population >= 50000 && c.violentChange != null)
    .sort((a, b) => Math.abs(b.violentChange ?? 0) - Math.abs(a.violentChange ?? 0))
    .slice(0, 10);

  const sections = [
    {
      title: 'The Great Turnarounds',
      subtitle: 'Cities making dramatic progress in reducing violent crime',
      emoji: '🏆',
      color: '#22c55e',
      cities: turnarounds,
      insight: 'These cities prove that high crime is not destiny. Focused interventions, economic development, and community policing can produce double-digit crime drops in just a few years.',
    },
    {
      title: 'Cities in Crisis',
      subtitle: 'Where crime is getting worse year after year',
      emoji: '🚨',
      color: '#dc2626',
      cities: crisis,
      insight: 'Rising crime is often linked to economic disruption, drug market shifts, policing changes, or population loss. These cities face compounding challenges that feed on each other.',
    },
    {
      title: 'Surprisingly Safe Big Cities',
      subtitle: 'Large cities (200K+) that defy the "big city crime" stereotype',
      emoji: '🛡️',
      color: '#0ea5e9',
      cities: surpriseSafe,
      insight: 'Strong economies, geographic advantages, and well-funded public services help these large cities maintain crime rates well below the national average.',
    },
    {
      title: 'Small Town Danger Zones',
      subtitle: 'Towns under 25,000 with shockingly high violent crime',
      emoji: '⚠️',
      color: '#f59e0b',
      cities: smallDanger,
      insight: 'Economic collapse, drug corridors, and limited policing resources create pockets of extreme violence in places most Americans would never expect.',
    },
    {
      title: 'The Wild Swings',
      subtitle: 'Volatile cities with the biggest year-to-year crime changes',
      emoji: '📊',
      color: '#8b5cf6',
      cities: volatile,
      insight: 'Some cities experience dramatic crime swings from year to year. This volatility often reflects changing drug markets, gang conflicts, or major policy shifts.',
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"Dataset","name":"Crime Stories — Data-Driven City Profiles That Tell a Story | OpenCrime","description":"Every city has a crime story. From dramatic turnarounds to crisis spirals, explore data-driven narratives for America\\","url":"https://www.opencrime.us/crime-stories","creator":{"@type":"Organization","name":"OpenCrime","url":"https://www.opencrime.us"},"license":"https://www.opencrime.us/about","sourceOrganization":"FBI Crime Data Explorer"}` }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Crime Stories' }]} />
      <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">Crime Stories</h1>
      <p className="text-lg text-gray-600 mb-10">
        Behind every crime statistic is a story — of a city fighting back, falling apart, or defying expectations.
        These data-driven profiles highlight the most interesting crime narratives across America.
      </p>

      {sections.map(section => (
        <section key={section.title} className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{section.emoji}</span>
            <div>
              <h2 className="font-display text-2xl font-bold" style={{ color: section.color }}>{section.title}</h2>
              <p className="text-gray-500 text-sm">{section.subtitle}</p>

      <AIOverview insights={[
        "Behind every statistic is a story: cities that transformed, crises that erupted, and trends that defied expectations.",
        "Some of the most dramatic crime stories are turnarounds — cities that cut murder rates 50%+ in a decade.",
        "The data reveals surprises: tourist cities with hidden violence, college towns with assault problems, and wealthy suburbs with drug crime."
      ]} />
            </div>
          </div>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-2 font-semibold">City</th>
                  <th className="text-right p-2 font-semibold">Population</th>
                  <th className="text-right p-2 font-semibold">Violent Rate</th>
                  <th className="text-right p-2 font-semibold">YoY Change</th>
                  <th className="text-center p-2 font-semibold">Safety</th>
                </tr>
              </thead>
              <tbody>
                {section.cities.map(c => (
                  <tr key={c.slug} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-2"><Link href={`/cities/${c.slug}`} className="text-primary hover:underline font-medium">{c.city}, {stateAbbr(c.state)}</Link></td>
                    <td className="p-2 text-right font-mono">{fmtNum(c.population)}</td>
                    <td className="p-2 text-right font-mono">{fmtRate(c.violentRate)}</td>
                    <td className={`p-2 text-right font-mono ${(c.violentChange ?? 0) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {c.violentChange != null ? `${c.violentChange > 0 ? '+' : ''}${c.violentChange.toFixed(1)}%` : '—'}
                    </td>
                    <td className="p-2 text-center text-xs">{c.safetyPercentile}th pctl</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 italic bg-gray-50 rounded-lg p-3">{section.insight}</p>
        </section>
      ))}

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/city-trajectories" className="text-primary hover:underline">→ All City Trajectories</Link>
        <Link href="/crime-dna" className="text-primary hover:underline">→ Crime DNA</Link>
        <Link href="/most-improved" className="text-primary hover:underline">→ Most Improved Cities</Link>
        <Link href="/population-crime-paradox" className="text-primary hover:underline">→ Population-Crime Paradox</Link>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mt-6 mb-4">
        <p className="text-sm text-gray-600">
          <strong>Demographic angle:</strong> Each city&apos;s crime story has a demographic dimension — who is most
          affected varies by location. Nationally, Black Americans bear a disproportionate burden of violence.{' '}
          <a href="/arrest-demographics" className="text-primary hover:underline">Arrest demographics</a> |{' '}
          <a href="/analysis/racial-disparities" className="text-primary hover:underline">Racial disparities</a>
        </p>
      </div>

      <ShareButtons title="Crime Stories — Data-Driven City Profiles" />
    </main>
  );
}
