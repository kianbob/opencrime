import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { CityIndex } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import AIOverview from '@/components/AIOverview';

export const metadata: Metadata = {
  title: 'Rural vs Urban Crime: Shattering the Myths',
  description: 'Crime isn\'t just a big-city problem. Data analysis shows small cities often have higher per-capita violent crime than major metros. FBI data for 9,700+ cities.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/rural-vs-urban' },
};

type RaceRow = { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number; pacificIslander: number };
type EthRow = { offense: string; totalEthnicity: number; hispanic: number; notHispanic: number; hispanicPct: number; notHispanicPct: number };
type VictimRace = { race: string; total: number; male: number; female: number };

export default function RuralVsUrbanPage() {
  const cities = loadData<CityIndex[]>('city-index.json');
  const arrestData = loadData<{ byRace: RaceRow[]; byEthnicity: EthRow[]; cityArrestsByRace: RaceRow[] }>('arrest-data.json');
  const homData = loadData<{ victimRace: VictimRace[]; victimSex: { sex: string; count: number }[] }>('homicide-data.json');

  const large = cities.filter(c => c.population >= 250000);
  const midsize = cities.filter(c => c.population >= 100000 && c.population < 250000);
  const small = cities.filter(c => c.population >= 25000 && c.population < 100000);
  const tiny = cities.filter(c => c.population < 25000 && c.population > 0);

  const avg = (arr: CityIndex[]) => arr.length > 0 ? arr.reduce((s, c) => s + c.violentRate, 0) / arr.length : 0;
  const avgMurder = (arr: CityIndex[]) => arr.length > 0 ? arr.reduce((s, c) => s + c.murderRate, 0) / arr.length : 0;
  const avgProp = (arr: CityIndex[]) => arr.length > 0 ? arr.reduce((s, c) => s + c.propertyRate, 0) / arr.length : 0;

  const categories = [
    { label: 'Large cities (250K+)', cities: large, count: large.length },
    { label: 'Mid-size (100K–250K)', cities: midsize, count: midsize.length },
    { label: 'Small cities (25K–100K)', cities: small, count: small.length },
    { label: 'Towns (under 25K)', cities: tiny, count: tiny.length },
  ];

  const largeCityAvg = avg(large);
  const dangerousSmall = small.filter(c => c.violentRate > largeCityAvg).sort((a, b) => b.violentRate - a.violentRate);
  const safeLarge = large.filter(c => c.violentRate < avg(small)).sort((a, b) => a.violentRate - b.violentRate);

  const vcRace = arrestData.byRace.find(r => r.offense === 'Violent crime');
  const cityVcRace = arrestData.cityArrestsByRace?.find(r => r.offense === 'Violent crime');
  const totalVictims = homData.victimSex.reduce((s, v) => s + v.count, 0);

  const aiInsights = [
    "Many small and mid-size cities have higher per-capita violent crime rates than major metros like NYC and LA",
    `${dangerousSmall.length} cities under 100K population have violent crime rates above the large-city average of ${fmtRate(largeCityAvg)}`,
    "Cities with 25K-100K population often face concentrated poverty and resource constraints that drive higher crime rates",
    "Scale effects mean a few active offenders can dramatically impact a small city's crime rate",
    "The highest per-capita crime rates often belong to mid-size cities like Memphis, St. Louis, and Birmingham",
    "True rural areas have lower crime than cities, but face domestic violence and drug-related issues with limited law enforcement"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{label:'Analysis',href:'/analysis'},{label:'Rural vs Urban Crime'}]} />
      <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">Rural vs Urban Crime: Shattering the Myths</h1>
      <p className="text-lg text-gray-600 mb-8">
        The popular image of crime as a big-city problem is misleading. Smaller cities often have
        higher per-capita violence than major metros. Here&apos;s what the data actually shows across
        {fmtNum(cities.length)} cities in the FBI database.
      </p>

      <AIOverview insights={aiInsights} />

      {/* Summary Stats */}
      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{fmtNum(cities.length)}</div>
            <div className="text-blue-200 text-sm">Cities in Database</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtRate(avg(large))}</div>
            <div className="text-blue-200 text-sm">Avg Large City Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtRate(avg(midsize))}</div>
            <div className="text-blue-200 text-sm">Avg Mid-Size Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{dangerousSmall.length}</div>
            <div className="text-blue-200 text-sm">Small Cities Above Large Avg</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3">City Size</th>
              <th className="text-right px-4 py-3">Count</th>
              <th className="text-right px-4 py-3">Avg Violent Rate</th>
              <th className="text-right px-4 py-3">Avg Murder Rate</th>
              <th className="text-right px-4 py-3">Avg Property Rate</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.label} className="border-t">
                <td className="px-4 py-3 font-medium">{cat.label}</td>
                <td className="px-4 py-3 text-right font-mono">{fmtNum(cat.count)}</td>
                <td className="px-4 py-3 text-right font-mono text-red-600">{fmtRate(avg(cat.cities))}</td>
                <td className="px-4 py-3 text-right font-mono">{avgMurder(cat.cities).toFixed(2)}</td>
                <td className="px-4 py-3 text-right font-mono text-[#1e3a5f]">{fmtRate(avgProp(cat.cities))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Big-City Myth</h2>
        <p>
          When people think about crime, they think about New York, Chicago, Los Angeles. But the data tells
          a more nuanced story. Large cities with 250,000+ residents have an average violent crime rate
          of {fmtRate(avg(large))} per 100,000. Mid-size cities (100K–250K) average {fmtRate(avg(midsize))}.
        </p>
        <p>
          Many of the highest per-capita violent crime rates belong to mid-size and small cities — places like
          Memphis, St. Louis, Birmingham, and Shreveport. These cities often have higher crime rates than
          much larger metros like New York ({fmtRate(cities.find(c => c.city === 'New York')?.violentRate ?? 0)})
          or Los Angeles ({fmtRate(cities.find(c => c.city === 'Los Angeles')?.violentRate ?? 0)}).
        </p>
        <p>
          New York City, despite being America&apos;s largest city with 8.3 million residents, has a violent
          crime rate well below many cities a fraction of its size. This defies the intuition that bigger
          equals more dangerous.
        </p>

        <h2 className="font-heading">Why Small Cities Can Be More Dangerous</h2>
        <p>
          Several factors explain why smaller cities sometimes have higher crime rates:
        </p>
        <ul>
          <li><strong>Concentrated poverty.</strong> Small cities with declining industries face concentrated
          poverty without the diversified economies that large metros offer. A shuttered factory can devastate
          a town of 50,000 in ways that a city of 5 million absorbs. Deindustrialization hit mid-size cities
          in the Rust Belt and South particularly hard.</li>
          <li><strong>Resource constraints.</strong> Smaller police departments may lack the specialized units,
          technology, and investigative resources that big-city departments deploy. A 50-officer department
          can&apos;t run a gang task force, a cold case unit, and a community policing program simultaneously.</li>
          <li><strong>Brain drain.</strong> Talented residents leave for bigger cities, hollowing out the
          professional and tax base. This reduces both economic opportunity and the social capital that
          informally suppresses crime.</li>
          <li><strong>Scale effects.</strong> A few active offenders can dramatically affect a small city&apos;s
          crime rate in ways that would be invisible in a large metro. Ten shootings in a city of 30,000
          produces a rate equivalent to 2,500 shootings in New York.</li>
          <li><strong>Limited social services.</strong> Mental health treatment, substance abuse programs,
          and youth services are often concentrated in larger metros, leaving smaller cities without the
          infrastructure to address root causes of crime.</li>
          <li><strong>Drug trafficking routes.</strong> Some small cities sit on major drug trafficking corridors,
          inheriting violence from the drug trade without the law enforcement resources to address it.</li>
        </ul>

        {dangerousSmall.length > 0 && (
          <>
            <h2 className="font-heading">Small Cities More Dangerous Than Average Large City</h2>
            <p>
              {dangerousSmall.length} cities with populations under 100,000 have violent crime rates
              above the average for cities over 250,000 ({fmtRate(largeCityAvg)}):
            </p>
          </>
        )}
      </div>

      {dangerousSmall.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border overflow-x-auto my-6">
          <table className="w-full text-sm">
            <thead className="bg-red-50">
              <tr>
                <th className="text-left px-3 py-2">City</th>
                <th className="text-right px-3 py-2">Pop</th>
                <th className="text-right px-3 py-2">Violent Rate</th>
                <th className="text-right px-3 py-2">Murder Rate</th>
              </tr>
            </thead>
            <tbody>
              {dangerousSmall.slice(0, 25).map(c => (
                <tr key={c.slug} className="border-t">
                  <td className="px-3 py-2">
                    <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city}, {c.state}</Link>
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
                  <td className="px-3 py-2 text-right font-mono text-red-600 font-semibold">{fmtRate(c.violentRate)}</td>
                  <td className="px-3 py-2 text-right font-mono">{c.murderRate.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {safeLarge.length > 0 && (
        <>
          <div className="prose prose-lg max-w-none">
            <h2 className="font-heading">Large Cities Safer Than Average Small City</h2>
            <p>
              Conversely, these large cities (250K+) have violent crime rates <em>below</em> the average
              for cities with 25K-100K population ({fmtRate(avg(small))}):
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border overflow-x-auto my-6">
            <table className="w-full text-sm">
              <thead className="bg-green-50">
                <tr>
                  <th className="text-left px-3 py-2">City</th>
                  <th className="text-right px-3 py-2">Pop</th>
                  <th className="text-right px-3 py-2">Violent Rate</th>
                </tr>
              </thead>
              <tbody>
                {safeLarge.slice(0, 15).map(c => (
                  <tr key={c.slug} className="border-t">
                    <td className="px-3 py-2">
                      <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city}, {c.state}</Link>
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
                    <td className="px-3 py-2 text-right font-mono text-green-600 font-semibold">{fmtRate(c.violentRate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Demographic Dimension</h2>
        <p>
          Crime concentration by city size intersects with demographic patterns. The FBI tracks arrest
          demographics for city agencies specifically, revealing how racial patterns vary across urban
          environments of different sizes.
        </p>
      </div>

      {/* City arrest demographics */}
      {(cityVcRace || vcRace) && (() => {
        const r = cityVcRace || vcRace!;
        return (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
            <div className="bg-gray-50 px-4 py-2 font-semibold text-sm">
              {cityVcRace ? 'City Agency' : 'National'} Violent Crime Arrests by Race
            </div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">Race</th>
                  <th className="text-right px-4 py-2">Arrests</th>
                  <th className="text-right px-4 py-2">%</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'White', value: r.white },
                  { label: 'Black', value: r.black },
                  { label: 'Native American', value: r.nativeAmerican },
                  { label: 'Asian', value: r.asian },
                  { label: 'Pacific Islander', value: r.pacificIslander },
                ].map(row => (
                  <tr key={row.label} className="border-t">
                    <td className="px-4 py-2">{row.label}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtNum(row.value)}</td>
                    <td className="px-4 py-2 text-right font-mono">{(row.value / r.total * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })()}

      <div className="prose prose-lg max-w-none">
        <p>
          Homicide victimization also concentrates geographically and demographically. Of the {fmtNum(totalVictims)} murder
          victims nationally, Black Americans account for {fmtNum(homData.victimRace.find(r => r.race === 'Black')?.total ?? 0)} —
          a disproportionate share that reflects the concentration of violence in specific urban neighborhoods
          regardless of city size. This victimization burden falls most heavily on young Black men in
          mid-size cities where violence is concentrated and resources are limited.
        </p>

        <h2 className="font-heading">The Rural Exception</h2>
        <p>
          True rural areas — unincorporated counties, farming communities, remote towns — generally do have
          lower crime rates than cities. But the difference is smaller than most people assume, and some rural
          areas have surprisingly high violence, often driven by domestic violence, drug-related disputes, and
          limited law enforcement presence.
        </p>
        <p>
          Rural crime has distinct characteristics:
        </p>
        <ul>
          <li><strong>Domestic violence</strong> is a larger share of rural violent crime. Geographic isolation
          makes it harder for victims to access services, and smaller communities may create social pressure
          to keep abuse private.</li>
          <li><strong>Drug-related crime</strong> has increased in rural areas, particularly methamphetamine
          production and opioid-related offenses. The fentanyl crisis has hit rural communities hard.</li>
          <li><strong>Response times</strong> for law enforcement are much longer in rural areas — sometimes
          30-60 minutes — which affects both crime deterrence and victim outcomes.</li>
          <li><strong>Property crime</strong> in rural areas often goes unreported due to distance from
          law enforcement and a culture of self-reliance.</li>
          <li><strong>Native American reservations</strong> face some of the highest crime rates in the country,
          compounded by jurisdictional complexity and chronic underfunding of tribal police.</li>
        </ul>

        <h2 className="font-heading">The Suburban Sweet Spot?</h2>
        <p>
          Suburbs tend to have the lowest crime rates, benefiting from proximity to urban employment
          and services without the concentrated poverty that drives urban violence. But this is partly
          a function of selection — suburbs tend to have higher incomes, better-funded schools, and more
          residential stability. When suburbs experience economic decline, their crime rates can rise
          to urban levels.
        </p>
        <p>
          Inner-ring suburbs that border high-crime urban areas often have intermediate crime rates.
          The geographic spread of crime doesn&apos;t respect municipal boundaries — violence in one
          jurisdiction affects neighboring ones through shared social networks and drug markets.
        </p>

        <h2 className="font-heading">The Real Story: Concentrated Disadvantage</h2>
        <p>
          The real story isn&apos;t urban vs. rural — it&apos;s concentrated disadvantage vs. opportunity.
          Crime clusters in specific neighborhoods regardless of whether the overall city is large or small.
          A few blocks in a small city can drive its entire crime rate while most of the town remains safe.
        </p>
        <p>
          Research by Robert Sampson and others has shown that neighborhood-level factors — poverty rate,
          residential instability, social cohesion, and institutional resources — predict crime far better
          than city size. A poor, unstable neighborhood in a small city faces similar crime challenges to
          a poor, unstable neighborhood in a large metro.
        </p>
        <p>
          This means the urban/rural dichotomy is largely a distraction from the real determinants of crime.
          What matters is not how many people live in a place, but whether that place has economic opportunity,
          stable housing, functional institutions, and social capital.
        </p>

        <h2 className="font-heading">Policy Implications</h2>
        <p>
          If crime were purely a big-city problem, the solution would be simple: more big-city policing and
          programs. But the data shows that violence and disorder affect communities of all sizes. Effective
          crime reduction requires:
        </p>
        <ul>
          <li><strong>Place-based strategies</strong> that address the specific conditions driving crime
          in each community — not one-size-fits-all approaches based on city size</li>
          <li><strong>Resource allocation</strong> that accounts for the unique challenges of smaller departments
          and rural areas, not just per-capita funding that favors large cities</li>
          <li><strong>Regional approaches</strong> that recognize crime crosses jurisdictional boundaries,
          requiring cooperation between city, county, and state agencies</li>
          <li><strong>Economic development</strong> in struggling small and mid-size cities — the places
          most likely to have high crime and least likely to have the resources to address it</li>
          <li><strong>Technology sharing</strong> to give smaller departments access to the investigative
          tools and data systems that help larger departments solve crimes more effectively</li>
          <li><strong>Addressing demographic disparities</strong> across all community types — the racial
          concentration of violence is present in cities of every size</li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/states" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Browse by State</Link>
        <Link href="/rankings" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">City Rankings</Link>
        <Link href="/arrest-demographics" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Arrest Demographics</Link>
        <Link href="/analysis/racial-disparities" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Racial Disparities</Link>
      </div>

      <div className="mt-8"><RelatedAnalysis currentSlug="rural-vs-urban" />

      <ShareButtons title="Rural vs Urban Crime: Shattering the Myths" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Rural vs Urban Crime: Shattering the Myths',
        publisher: { '@type': 'Organization', name: 'OpenCrime' },
        datePublished: '2026-03-04',
      })}} />
    </div>
  );
}
