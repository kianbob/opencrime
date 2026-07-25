import RelatedAnalysis from '@/components/RelatedAnalysis';
import type { Metadata } from 'next';
import Link from 'next/link';
import { loadData, fmtRate, fmtNum } from '@/lib/utils';
import type { CityIndex, NationalTrend } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Most Dangerous Cities in America 2026 — Updated FBI Rankings | OpenCrime',
  description: 'The 25 most dangerous cities in the US for 2026, ranked by violent crime rate. See which cities top the list, how they compare to the national average, and which are improving.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/most-dangerous-cities-2026' },
  openGraph: {
    title: 'Most Dangerous Cities in America 2026',
    description: 'Updated FBI rankings: the 25 most dangerous US cities by violent crime rate.',
    url: 'https://www.opencrime.us/analysis/most-dangerous-cities-2026',
  },
};

export default function MostDangerousCities2026Page() {
  const allCities = loadData<CityIndex[]>('city-index.json');
  const national = loadData<NationalTrend[]>('national-trends.json');
  const n = national[national.length - 1];
  const natRate = n.violentRate;

  const large = allCities.filter(c => c.population >= 100000 && c.violentRate > 0);
  const dangerous = [...large].sort((a, b) => b.violentRate - a.violentRate);
  const deadliest = [...large].sort((a, b) => b.murderRate - a.murderRate);
  const top25 = dangerous.slice(0, 25);

  const avgTop10Rate = top25.slice(0, 10).reduce((s, c) => s + c.violentRate, 0) / 10;
  const megaCities = large.filter(c => c.population >= 500000).sort((a, b) => b.violentRate - a.violentRate);

  // Regional breakdown
  const south = top25.filter(c => ['AL','AR','FL','GA','KY','LA','MS','NC','SC','TN','TX','VA','WV','MD','DE','DC','OK'].includes(stateAbbr(c.state)));
  const midwest = top25.filter(c => ['IL','IN','IA','KS','MI','MN','MO','NE','ND','OH','SD','WI'].includes(stateAbbr(c.state)));

  function stateAbbr(name: string): string {
    const map: Record<string, string> = {
      'Alabama':'AL','Alaska':'AK','Arizona':'AZ','Arkansas':'AR','California':'CA','Colorado':'CO','Connecticut':'CT','Delaware':'DE','Florida':'FL','Georgia':'GA','Hawaii':'HI','Idaho':'ID','Illinois':'IL','Indiana':'IN','Iowa':'IA','Kansas':'KS','Kentucky':'KY','Louisiana':'LA','Maine':'ME','Maryland':'MD','Massachusetts':'MA','Michigan':'MI','Minnesota':'MN','Mississippi':'MS','Missouri':'MO','Montana':'MT','Nebraska':'NE','Nevada':'NV','New Hampshire':'NH','New Jersey':'NJ','New Mexico':'NM','New York':'NY','North Carolina':'NC','North Dakota':'ND','Ohio':'OH','Oklahoma':'OK','Oregon':'OR','Pennsylvania':'PA','Rhode Island':'RI','South Carolina':'SC','South Dakota':'SD','Tennessee':'TN','Texas':'TX','Utah':'UT','Vermont':'VT','Virginia':'VA','Washington':'WA','West Virginia':'WV','Wisconsin':'WI','Wyoming':'WY','District of Columbia':'DC',
    };
    return map[name] || name;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Most Dangerous Cities 2026' }]} />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Most Dangerous Cities in America 2026</h1>
      <p className="text-lg text-gray-600 mb-6">
        Which American cities have the highest crime rates? We analyzed FBI data for {large.length} cities
        with populations over 100,000 to identify the most dangerous places in the country — and uncover
        which cities are getting better or worse.
      </p>

      <AIOverview insights={[
        `#1 most dangerous: ${dangerous[0].city}, ${dangerous[0].state} at ${fmtRate(dangerous[0].violentRate)} violent crimes per 100K`,
        `The top 10 average ${fmtRate(avgTop10Rate)} per 100K — ${(avgTop10Rate / natRate).toFixed(1)}x the national rate of ${fmtRate(natRate)}`,
        `Deadliest city by murder rate: ${deadliest[0].city}, ${deadliest[0].state} at ${fmtRate(deadliest[0].murderRate)} per 100K`,
        `${south.length} of the top 25 most dangerous cities are in the South`,
        `Among mega-cities (500K+), ${megaCities[0].city} ranks worst at ${fmtRate(megaCities[0].violentRate)} per 100K`,
      ]} />

      <ShareButtons title="Most Dangerous Cities in America 2026" />

      {/* Key stat boxes */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-600">{dangerous[0].city}</div>
            <div className="text-sm text-gray-600">#1 Most Dangerous</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{fmtRate(dangerous[0].violentRate)}</div>
            <div className="text-sm text-gray-600">Highest Rate /100K</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{fmtRate(natRate)}</div>
            <div className="text-sm text-gray-600">National Average</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{(dangerous[0].violentRate / natRate).toFixed(1)}x</div>
            <div className="text-sm text-gray-600">Above National Avg</div>
          </div>
        </div>
      </div>

      {/* Top 25 table */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">The 25 Most Dangerous Cities</h2>
      <p className="text-gray-700 mb-4">
        Ranked by violent crime rate (murders, rapes, robberies, and aggravated assaults per 100,000 residents).
        All cities have populations over 100,000.
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">City</th><th className="py-2 text-right">Population</th><th className="py-2 text-right">Violent Rate</th><th className="py-2 text-right">Murder Rate</th></tr></thead>
          <tbody>
            {top25.map((c, i) => (
              <tr key={c.slug} className="border-b hover:bg-gray-50">
                <td className="py-1">{i + 1}</td>
                <td><Link href={`/crime-rate-in/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city}, {c.state}</Link></td>
                <td className="text-right font-mono">{fmtNum(c.population)}</td>
                <td className="text-right font-mono font-bold">{fmtRate(c.violentRate)}</td>
                <td className="text-right font-mono">{fmtRate(c.murderRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Deadliest by murder */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Deadliest Cities: Highest Murder Rates</h2>
      <p className="text-gray-700 mb-4">
        Murder rate is the most reliable crime metric — it&apos;s hardest to underreport. These 10 cities have
        the highest homicide rates in America:
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">City</th><th className="py-2 text-right">Murder Rate</th><th className="py-2 text-right">Total Murders</th></tr></thead>
          <tbody>
            {deadliest.slice(0, 10).map((c, i) => (
              <tr key={c.slug} className="border-b">
                <td className="py-1">{i + 1}</td>
                <td><Link href={`/crime-rate-in/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city}, {c.state}</Link></td>
                <td className="text-right font-mono font-bold">{fmtRate(c.murderRate)}</td>
                <td className="text-right font-mono">{fmtNum(c.murder)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Major cities */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">America&apos;s Biggest Cities: How Safe Are They?</h2>
      <p className="text-gray-700 mb-4">
        Large cities get outsized media attention. Here&apos;s how every US city with 500,000+ residents actually
        ranks by violent crime rate:
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">City</th><th className="py-2 text-right">Population</th><th className="py-2 text-right">Violent Rate</th><th className="py-2 text-center">vs National</th></tr></thead>
          <tbody>
            {megaCities.map((c, i) => {
              const ratio = c.violentRate / natRate;
              return (
                <tr key={c.slug} className="border-b">
                  <td className="py-1">{i + 1}</td>
                  <td><Link href={`/crime-rate-in/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city}, {c.state}</Link></td>
                  <td className="text-right font-mono">{fmtNum(c.population)}</td>
                  <td className="text-right font-mono">{fmtRate(c.violentRate)}</td>
                  <td className={`text-center font-mono ${ratio > 1 ? 'text-red-600' : 'text-green-600'}`}>{ratio > 1 ? '+' : ''}{((ratio - 1) * 100).toFixed(0)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Analysis */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">What Makes a City Dangerous?</h2>
      <p className="text-gray-700 mb-4">
        Being on this list isn&apos;t inevitable. Cities cycle on and off. New York City, once America&apos;s most
        dangerous large city, has transformed into one of the safest big cities per capita. The factors that
        drive a city onto this list are well-documented:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
        <li><strong>Concentrated poverty:</strong> The <Link href="/analysis/crime-and-poverty" className="text-[#1e3a5f] hover:underline">poverty-crime connection</Link> is strongest in cities where poverty is concentrated in specific neighborhoods.</li>
        <li><strong>Gang activity and drug markets:</strong> Many of the most dangerous cities are major <Link href="/analysis/drug-crime" className="text-[#1e3a5f] hover:underline">drug trafficking hubs</Link>.</li>
        <li><strong>Police staffing:</strong> Cities facing a <Link href="/analysis/police-staffing-crisis" className="text-[#1e3a5f] hover:underline">police staffing crisis</Link> often see crime spikes.</li>
        <li><strong>Economic decline:</strong> Shrinking cities that lost major industries often appear on this list — Detroit, St. Louis, and Memphis share this pattern.</li>
      </ul>

      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Important Context</h2>
      <p className="text-gray-700 mb-4">
        Crime rates describe averages across an entire city. Even in the most dangerous cities, most neighborhoods
        are reasonably safe. Crime tends to concentrate in specific areas — our <Link href="/analysis/murder-map" className="text-[#1e3a5f] hover:underline">murder map analysis</Link> shows
        that most homicides cluster in a small fraction of city blocks.
      </p>
      <p className="text-gray-700 mb-4">
        Also note that city boundaries matter. Some cities have boundaries that include suburban areas (lowering
        their rates), while others are tightly drawn around urban cores (raising them). This can make direct
        city-to-city comparisons misleading.
      </p>

      <div className="bg-gray-50 rounded-xl p-6 mt-10">
        <h3 className="font-heading text-lg font-bold mb-3">Related Analysis</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <Link href="/most-dangerous-cities" className="text-[#1e3a5f] hover:underline">Full Dangerous Cities Rankings →</Link>
          <Link href="/safest-cities" className="text-[#1e3a5f] hover:underline">Safest Cities in America →</Link>
          <Link href="/analysis/safest-cities-america" className="text-[#1e3a5f] hover:underline">Safest Cities Analysis →</Link>
          <Link href="/analysis/crime-decline" className="text-[#1e3a5f] hover:underline">The Great Crime Decline →</Link>
          <Link href="/analysis/homicide-in-america" className="text-[#1e3a5f] hover:underline">Homicide in America →</Link>
          <Link href="/cities" className="text-[#1e3a5f] hover:underline">Browse All Cities →</Link>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Most Dangerous Cities in America 2026',
        description: 'The 25 most dangerous US cities ranked by violent crime rate using FBI data.',
        url: 'https://www.opencrime.us/analysis/most-dangerous-cities-2026',
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the most dangerous city in America 2026?', acceptedAnswer: { '@type': 'Answer', text: `${dangerous[0].city}, ${dangerous[0].state} has the highest violent crime rate at ${fmtRate(dangerous[0].violentRate)} per 100,000 residents — ${(dangerous[0].violentRate / natRate).toFixed(1)}x the national average.` }},
          { '@type': 'Question', name: 'What city has the highest murder rate?', acceptedAnswer: { '@type': 'Answer', text: `${deadliest[0].city}, ${deadliest[0].state} has the highest murder rate at ${fmtRate(deadliest[0].murderRate)} per 100,000 residents.` }},
          { '@type': 'Question', name: 'Is crime getting worse in American cities?', acceptedAnswer: { '@type': 'Answer', text: 'Overall, violent crime has declined significantly from its 1991 peak. However, some cities have seen recent increases while others continue to improve.' }},
        ],
      })}} />

      <RelatedAnalysis currentSlug="most-dangerous-cities-2026" />
    </div>
  );
}
