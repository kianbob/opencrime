import { Metadata } from 'next';
import { loadData, fmtRate, stateAbbr } from '@/lib/utils';
import type { CityIndex } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import CrimeDNAClient from './CrimeDNAClient';

export const metadata: Metadata = {
  title: 'Crime Composition DNA — Every City Has a Unique Crime Fingerprint | OpenCrime',
  description: 'Every city has a unique mix of violent crime types. See visual "DNA fingerprints" showing whether a city\'s crime is dominated by assault, robbery, murder, or rape.',
  openGraph: {
    title: 'Crime DNA — Every City Has a Unique Crime Fingerprint',
    description: 'Some cities are assault-heavy, others robbery-heavy. Visualize the unique crime composition of every US city.',
    url: 'https://www.opencrime.us/crime-dna',
  },
  alternates: { canonical: 'https://www.opencrime.us/crime-dna' },
};

export default function CrimeDNAPage() {
  const cities = loadData<CityIndex[]>('city-index.json');

  // Cities with composition data, 25K+ pop
  const withComp = cities.filter(c => c.composition && c.population >= 25000).sort((a, b) => b.population - a.population);

  // Extreme profiles
  const assaultDominated = withComp.filter(c => c.composition!.assaultPct > 75).sort((a, b) => b.composition!.assaultPct - a.composition!.assaultPct).slice(0, 10);
  const robberyDominated = withComp.filter(c => c.composition!.robberyPct > 30).sort((a, b) => b.composition!.robberyPct - a.composition!.robberyPct).slice(0, 10);
  const murderHigh = withComp.filter(c => c.composition!.murderPct > 5).sort((a, b) => b.composition!.murderPct - a.composition!.murderPct).slice(0, 10);

  // Top 50 for visual grid
  const top50 = withComp.slice(0, 50).map(c => ({
    city: c.city, state: stateAbbr(c.state), slug: c.slug, population: c.population,
    violentRate: c.violentRate,
    ...c.composition!,
  }));

  // National average composition
  const natComp = withComp.reduce((acc, c) => {
    acc.murder += c.composition!.murderPct;
    acc.rape += c.composition!.rapePct;
    acc.robbery += c.composition!.robberyPct;
    acc.assault += c.composition!.assaultPct;
    acc.n++;
    return acc;
  }, { murder: 0, rape: 0, robbery: 0, assault: 0, n: 0 });

  const avg = {
    murderPct: Math.round(natComp.murder / natComp.n * 10) / 10,
    rapePct: Math.round(natComp.rape / natComp.n * 10) / 10,
    robberyPct: Math.round(natComp.robbery / natComp.n * 10) / 10,
    assaultPct: Math.round(natComp.assault / natComp.n * 10) / 10,
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"Dataset","name":"Crime Composition DNA — Every City Has a Unique Crime Fingerprint | OpenCrime","description":"Every city has a unique mix of violent crime types. See visual ","url":"https://www.opencrime.us/crime-dna","creator":{"@type":"Organization","name":"OpenCrime","url":"https://www.opencrime.us"},"license":"https://www.opencrime.us/about","sourceOrganization":"FBI Crime Data Explorer"}` }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Crime DNA' }]} />
      <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">Crime Composition DNA</h1>
      <p className="text-lg text-gray-600 mb-4">
        Every city has a unique &quot;crime fingerprint&quot; — the mix of murder, rape, robbery, and assault that makes up its
        violent crime profile. Two cities can have identical crime rates but radically different compositions.
      </p>
      <p className="text-gray-500 mb-8">
        National average: {avg.assaultPct}% assault, {avg.robberyPct}% robbery, {avg.rapePct}% rape, {avg.murderPct}% murder
      </p>

      <CrimeDNAClient top50={top50} avg={avg} />

      {/* Assault-dominated cities */}
      <section className="mt-10 mb-8">
        <h2 className="font-display text-2xl font-bold text-primary mb-2">Assault-Dominated Cities (&gt;75% Assault)</h2>
        <p className="text-gray-600 text-sm mb-3">These cities&apos; violent crime is overwhelmingly aggravated assault — often alcohol-fueled bar fights, domestic violence, or road rage.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-2 font-semibold">City</th>
                <th className="text-right p-2 font-semibold">Assault %</th>
                <th className="text-right p-2 font-semibold">Robbery %</th>
                <th className="text-right p-2 font-semibold">Murder %</th>
                <th className="text-right p-2 font-semibold">Violent Rate</th>
              </tr>
            </thead>
            <tbody>
              {assaultDominated.map(c => (
                <tr key={c.slug} className="border-b border-gray-100">
                  <td className="p-2"><a href={`/cities/${c.slug}`} className="text-primary hover:underline">{c.city}, {stateAbbr(c.state)}</a></td>
                  <td className="p-2 text-right font-mono font-bold text-orange-600">{c.composition!.assaultPct}%</td>
                  <td className="p-2 text-right font-mono">{c.composition!.robberyPct}%</td>
                  <td className="p-2 text-right font-mono">{c.composition!.murderPct}%</td>
                  <td className="p-2 text-right font-mono">{fmtRate(c.violentRate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Robbery-dominated */}
      <section className="mb-8">
        <h2 className="font-display text-2xl font-bold text-primary mb-2">Robbery-Heavy Cities (&gt;30% Robbery)</h2>
        <p className="text-gray-600 text-sm mb-3">Higher robbery proportions often indicate economic inequality, transit crime, or organized theft rings.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-2 font-semibold">City</th>
                <th className="text-right p-2 font-semibold">Robbery %</th>
                <th className="text-right p-2 font-semibold">Assault %</th>
                <th className="text-right p-2 font-semibold">Murder %</th>
                <th className="text-right p-2 font-semibold">Violent Rate</th>
              </tr>
            </thead>
            <tbody>
              {robberyDominated.map(c => (
                <tr key={c.slug} className="border-b border-gray-100">
                  <td className="p-2"><a href={`/cities/${c.slug}`} className="text-primary hover:underline">{c.city}, {stateAbbr(c.state)}</a></td>
                  <td className="p-2 text-right font-mono font-bold text-blue-600">{c.composition!.robberyPct}%</td>
                  <td className="p-2 text-right font-mono">{c.composition!.assaultPct}%</td>
                  <td className="p-2 text-right font-mono">{c.composition!.murderPct}%</td>
                  <td className="p-2 text-right font-mono">{fmtRate(c.violentRate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* High murder proportion */}
      <section className="mb-8">
        <h2 className="font-display text-2xl font-bold text-primary mb-2">Highest Murder Proportion (&gt;5%)</h2>
        <p className="text-gray-600 text-sm mb-3">In the average city, murder is ~1.5% of violent crime. These cities have 3-5× that proportion — a deadlier mix of violence.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-2 font-semibold">City</th>
                <th className="text-right p-2 font-semibold">Murder %</th>
                <th className="text-right p-2 font-semibold">Assault %</th>
                <th className="text-right p-2 font-semibold">Robbery %</th>
                <th className="text-right p-2 font-semibold">Murder Rate</th>
              </tr>
            </thead>
            <tbody>
              {murderHigh.map(c => (
                <tr key={c.slug} className="border-b border-gray-100">
                  <td className="p-2"><a href={`/cities/${c.slug}`} className="text-primary hover:underline">{c.city}, {stateAbbr(c.state)}</a></td>
                  <td className="p-2 text-right font-mono font-bold text-red-700">{c.composition!.murderPct}%</td>
                  <td className="p-2 text-right font-mono">{c.composition!.assaultPct}%</td>
                  <td className="p-2 text-right font-mono">{c.composition!.robberyPct}%</td>
                  <td className="p-2 text-right font-mono">{fmtRate(c.murderRate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="prose prose-gray max-w-none">
        <h2 className="font-display text-2xl font-bold text-primary">Why Crime Composition Matters</h2>
        <p>
          Two cities with a violent crime rate of 500 per 100,000 can have completely different public safety challenges.
          If City A is 90% aggravated assault and City B is 40% robbery with 8% murder, they need fundamentally different
          interventions.
        </p>
        <p>
          Assault-heavy cities often have alcohol, domestic violence, or gang-related issues. Robbery-heavy cities face economic 
          inequality and street crime. High murder proportions suggest gun accessibility and gang warfare. Understanding
          the DNA of a city&apos;s crime helps design better solutions.
        </p>
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <a href="/city-trajectories" className="text-primary hover:underline">→ City Trajectories</a>
        <a href="/violence-concentration" className="text-primary hover:underline">→ Violence Concentration</a>
        <a href="/tools/compare" className="text-primary hover:underline">→ Compare Cities</a>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mt-6 mb-4">
        <p className="text-sm text-gray-600">
          <strong>Race &amp; crime DNA:</strong> A city&apos;s crime composition intersects with demographics.
          Murder-heavy cities see disproportionate impact on young Black men; assault-heavy cities often reflect
          domestic violence and alcohol-related patterns across all demographics.{' '}
          <a href="/arrest-demographics" className="text-primary hover:underline">Arrest demographics</a> |{' '}
          <a href="/analysis/racial-disparities" className="text-primary hover:underline">Racial disparities</a>
        </p>
      </div>

      <ShareButtons title="Crime DNA — Every City Has a Unique Crime Fingerprint" />
    </main>
  );
}
