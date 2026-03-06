import { Metadata } from 'next';
import { loadData, fmtNum, fmtRate, stateAbbr } from '@/lib/utils';
import type { CityIndex, Analytics } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import ParadoxCharts from './ParadoxCharts';
import AIOverview from '@/components/AIOverview';

export const metadata: Metadata = {
  title: 'Population-Crime Paradox — Small Cities With Big Crime Problems | OpenCrime',
  description: 'Some small cities have violent crime rates rivaling major metros, while some large cities are remarkably safe. Explore the surprising disconnect between population and crime.',
  openGraph: {
    title: 'Population-Crime Paradox — Small Cities With Big Crime Problems',
    description: 'Population doesn\'t predict crime. Some towns of 20,000 have murder rates higher than Chicago.',
    url: 'https://www.opencrime.us/population-crime-paradox',
  },
  alternates: { canonical: 'https://www.opencrime.us/population-crime-paradox' },
};

export default function ParadoxPage() {
  const cities = loadData<CityIndex[]>('city-index.json');
  const analytics = loadData<Analytics>('analytics.json');

  // Small cities (10-50K) with extremely high violent crime rates
  const smallDangerous = cities
    .filter(c => c.population >= 10000 && c.population < 50000 && c.violentRate > 800)
    .sort((a, b) => b.violentRate - a.violentRate)
    .slice(0, 25);

  // Large cities (250K+) that are surprisingly safe
  const largeSafe = cities
    .filter(c => c.population >= 250000 && c.violentRate > 0)
    .sort((a, b) => a.violentRate - b.violentRate)
    .slice(0, 15);

  // Biggest outliers: highest ratio of violent rate vs expected for population
  const popBins = analytics.popCrimeBins;
  const getExpectedRate = (pop: number) => {
    const bin = popBins.find(b => {
      if (b.label === 'Under 10K') return pop < 10000;
      if (b.label === '10-25K') return pop >= 10000 && pop < 25000;
      if (b.label === '25-50K') return pop >= 25000 && pop < 50000;
      if (b.label === '50-100K') return pop >= 50000 && pop < 100000;
      if (b.label === '100-250K') return pop >= 100000 && pop < 250000;
      if (b.label === '250-500K') return pop >= 250000 && pop < 500000;
      if (b.label === '500K-1M') return pop >= 500000 && pop < 1000000;
      return pop >= 1000000;
    });
    return bin?.avgViolentRate || 300;
  };

  const outliers = cities
    .filter(c => c.population >= 10000 && c.violentRate > 0)
    .map(c => ({ ...c, expected: getExpectedRate(c.population), ratio: c.violentRate / getExpectedRate(c.population) }))
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, 20);

  // Safe outliers: much less crime than expected
  const safeOutliers = cities
    .filter(c => c.population >= 25000 && c.violentRate > 0)
    .map(c => ({ ...c, expected: getExpectedRate(c.population), ratio: c.violentRate / getExpectedRate(c.population) }))
    .sort((a, b) => a.ratio - b.ratio)
    .slice(0, 20);

  // Scatter data for chart: sample of cities
  const scatter = cities
    .filter(c => c.population >= 10000 && c.violentRate > 0)
    .sort(() => Math.random() - 0.5)
    .slice(0, 500)
    .map(c => ({ pop: c.population, rate: c.violentRate, city: c.city, state: c.state }));

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"WebPage","name":"Population-Crime Paradox — Small Cities With Big Crime Problems | OpenCrime","description":"Some small cities have violent crime rates rivaling major metros, while some large cities are remarkably safe. Explore the surprising disconnect between population and crime.","url":"https://www.opencrime.us/population-crime-paradox","publisher":{"@type":"Organization","name":"OpenCrime","url":"https://www.opencrime.us"}}` }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Population-Crime Paradox' }]} />
      <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">The Population-Crime Paradox</h1>
      <p className="text-lg text-gray-600 mb-8">
        Common sense says bigger cities have more crime. The data says it&apos;s not that simple. Some towns 
        of 20,000 have violent crime rates higher than New York City, while some cities of 500,000+ are 
        safer than the national average.
      </p>

      <ParadoxCharts scatter={scatter} popBins={popBins} />

      {/* Small but dangerous */}
      <section className="mt-10 mb-10">
        <h2 className="font-display text-2xl font-bold text-primary mb-2">Small Cities, Big Crime</h2>
        <p className="text-gray-600 mb-4">Cities under 50,000 population with violent crime rates above 800 per 100K — rivaling or exceeding major metros.</p>

      <AIOverview insights={[
        "The most dangerous cities in America are NOT the biggest. Mid-size cities (100K-300K) consistently have higher violent crime rates.",
        "New York City's violent crime rate is lower than dozens of cities a fraction of its size.",
        "The paradox exists because large cities have more resources for policing, economic opportunity, and dilution of concentrated poverty."
      ]} />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">City</th>
                <th className="text-right p-3 font-semibold">Population</th>
                <th className="text-right p-3 font-semibold">Violent Rate</th>
                <th className="text-right p-3 font-semibold">Murder Rate</th>
                <th className="text-center p-3 font-semibold">Safety</th>
              </tr>
            </thead>
            <tbody>
              {smallDangerous.map(c => (
                <tr key={c.slug} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3"><a href={`/cities/${c.slug}`} className="text-primary hover:underline font-medium">{c.city}, {stateAbbr(c.state)}</a></td>
                  <td className="p-3 text-right font-mono">{fmtNum(c.population)}</td>
                  <td className="p-3 text-right font-mono text-red-600">{fmtRate(c.violentRate)}</td>
                  <td className="p-3 text-right font-mono">{fmtRate(c.murderRate)}</td>
                  <td className="p-3 text-center"><span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">{c.safetyPercentile}th</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Large but safe */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-primary mb-2">Big Cities, Low Crime</h2>
        <p className="text-gray-600 mb-4">Large cities (250K+) with the lowest violent crime rates — proof that size doesn&apos;t determine safety.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">City</th>
                <th className="text-right p-3 font-semibold">Population</th>
                <th className="text-right p-3 font-semibold">Violent Rate</th>
                <th className="text-right p-3 font-semibold">Murder Rate</th>
                <th className="text-center p-3 font-semibold">Safety</th>
              </tr>
            </thead>
            <tbody>
              {largeSafe.map(c => (
                <tr key={c.slug} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3"><a href={`/cities/${c.slug}`} className="text-primary hover:underline font-medium">{c.city}, {stateAbbr(c.state)}</a></td>
                  <td className="p-3 text-right font-mono">{fmtNum(c.population)}</td>
                  <td className="p-3 text-right font-mono text-green-600">{fmtRate(c.violentRate)}</td>
                  <td className="p-3 text-right font-mono">{fmtRate(c.murderRate)}</td>
                  <td className="p-3 text-center"><span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">{c.safetyPercentile}th</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Biggest outliers */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-primary mb-2">Biggest Outliers: More Crime Than Expected</h2>
        <p className="text-gray-600 mb-4">Cities with the highest violent crime rate relative to what&apos;s typical for their population size.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">City</th>
                <th className="text-right p-3 font-semibold">Population</th>
                <th className="text-right p-3 font-semibold">Actual Rate</th>
                <th className="text-right p-3 font-semibold">Expected Rate</th>
                <th className="text-right p-3 font-semibold">Ratio</th>
              </tr>
            </thead>
            <tbody>
              {outliers.map(c => (
                <tr key={c.slug} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3"><a href={`/cities/${c.slug}`} className="text-primary hover:underline font-medium">{c.city}, {stateAbbr(c.state)}</a></td>
                  <td className="p-3 text-right font-mono">{fmtNum(c.population)}</td>
                  <td className="p-3 text-right font-mono text-red-600">{fmtRate(c.violentRate)}</td>
                  <td className="p-3 text-right font-mono text-gray-500">{fmtRate(c.expected)}</td>
                  <td className="p-3 text-right font-mono font-bold text-red-700">{c.ratio.toFixed(1)}×</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="prose prose-gray max-w-none">
        <h2 className="font-display text-2xl font-bold text-primary">Why Small Cities Can Be So Dangerous</h2>
        <p>
          Several factors explain why some small cities have disproportionately high crime rates:
        </p>
        <ul>
          <li><strong>Economic distress:</strong> Small cities hit by factory closures, mining collapses, or agricultural decline often see crime spike as opportunities vanish.</li>
          <li><strong>Drug corridors:</strong> Small cities along interstate highways can become drug distribution hubs, bringing associated violence.</li>
          <li><strong>Limited resources:</strong> Smaller police departments have fewer investigators, less technology, and lower clearance rates — reducing deterrence.</li>
          <li><strong>Statistical amplification:</strong> In a city of 15,000, a single murder produces a rate of 6.7 per 100K — higher than New York City. Small populations make rates volatile.</li>
          <li><strong>Regional effects:</strong> Small cities in high-crime states tend to reflect broader patterns of their region.</li>
        </ul>

        <h2 className="font-display text-2xl font-bold text-primary">Why Some Big Cities Are Safe</h2>
        <p>
          Conversely, large cities with low crime rates often share characteristics: strong economies with diverse employment, 
          higher median incomes, well-funded public services, and in some cases geographic advantages (climate, isolation, 
          university presence). Cities like Honolulu, Irvine, and Virginia Beach demonstrate that scale and safety can coexist.
        </p>
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <a href="/violence-concentration" className="text-primary hover:underline">→ Violence Concentration</a>
        <a href="/city-trajectories" className="text-primary hover:underline">→ City Trajectories</a>
        <a href="/rankings" className="text-primary hover:underline">→ City Rankings</a>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mt-6 mb-4">
        <p className="text-sm text-gray-600">
          <strong>Race &amp; the paradox:</strong> Small high-crime cities often have higher concentrations of poverty
          and racial segregation. The demographic patterns of violence — where young Black men are disproportionately
          affected — hold across city sizes.{' '}
          <a href="/arrest-demographics" className="text-primary hover:underline">Arrest demographics</a> |{' '}
          <a href="/analysis/racial-disparities" className="text-primary hover:underline">Racial disparities</a> |{' '}
          <a href="/analysis/rural-vs-urban" className="text-primary hover:underline">Rural vs urban crime</a>
        </p>
      </div>

      <ShareButtons title="The Population-Crime Paradox — Small Cities With Big Crime" />
    </main>
  );
}
