import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { CityIndex, StateSummary } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import AIOverview from '@/components/AIOverview';

export const metadata: Metadata = {
  title: 'Rural vs Urban Crime: Shattering the Myths | OpenCrime',
  description: 'Crime isn\'t just a big-city problem. FBI data for 9,700+ cities shows small and mid-size cities often have higher per-capita violent crime than major metros.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/rural-vs-urban' },
  openGraph: {
    title: 'Rural vs Urban Crime: Shattering the Myths',
    description: 'Small cities often out-crime big metros. FBI data analysis of 9,700+ US cities.',
    url: 'https://www.opencrime.us/analysis/rural-vs-urban',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rural vs Urban Crime: Shattering the Myths',
    description: 'Small cities often out-crime big metros. FBI data analysis of 9,700+ US cities.',
  },
};

export default function RuralVsUrbanPage() {
  const cities = loadData<CityIndex[]>('city-index.json');
  const states = loadData<StateSummary[]>('state-summary.json');

  const large = cities.filter(c => c.population >= 250000);
  const midsize = cities.filter(c => c.population >= 100000 && c.population < 250000);
  const small = cities.filter(c => c.population >= 25000 && c.population < 100000);
  const tiny = cities.filter(c => c.population >= 10000 && c.population < 25000);
  const micro = cities.filter(c => c.population > 0 && c.population < 10000);

  const avg = (arr: CityIndex[]) => arr.length > 0 ? arr.reduce((s, c) => s + c.violentRate, 0) / arr.length : 0;
  const avgMurder = (arr: CityIndex[]) => arr.length > 0 ? arr.reduce((s, c) => s + c.murderRate, 0) / arr.length : 0;
  const avgProperty = (arr: CityIndex[]) => arr.length > 0 ? arr.reduce((s, c) => s + c.propertyRate, 0) / arr.length : 0;
  const median = (arr: CityIndex[], key: 'violentRate' | 'murderRate' | 'propertyRate') => {
    if (arr.length === 0) return 0;
    const sorted = [...arr].sort((a, b) => a[key] - b[key]);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid][key] : (sorted[mid - 1][key] + sorted[mid][key]) / 2;
  };

  const categories = [
    { label: 'Large cities (250K+)', cities: large, count: large.length },
    { label: 'Mid-size (100K–250K)', cities: midsize, count: midsize.length },
    { label: 'Small cities (25K–100K)', cities: small, count: small.length },
    { label: 'Towns (10K–25K)', cities: tiny, count: tiny.length },
    { label: 'Micro cities (under 10K)', cities: micro, count: micro.length },
  ];

  // Find small cities with higher violence than big cities avg
  const largeCityAvg = avg(large);
  const dangerousSmall = small.filter(c => c.violentRate > largeCityAvg).sort((a, b) => b.violentRate - a.violentRate);
  const dangerousTiny = tiny.filter(c => c.violentRate > largeCityAvg).sort((a, b) => b.violentRate - a.violentRate);

  // Safest large cities
  const safestLarge = [...large].sort((a, b) => a.violentRate - b.violentRate).slice(0, 10);
  // Most dangerous mid-size
  const dangerousMid = [...midsize].sort((a, b) => b.violentRate - a.violentRate).slice(0, 15);
  // Most dangerous small
  const topDangerousSmall = dangerousSmall.slice(0, 20);

  // State-level rural vs urban analysis
  const ruralStates = states.filter(s => ['Wyoming', 'Vermont', 'Montana', 'North Dakota', 'South Dakota', 'Maine', 'Idaho', 'West Virginia', 'Nebraska', 'Iowa'].includes(s.name));
  const urbanStates = states.filter(s => ['California', 'New York', 'New Jersey', 'Massachusetts', 'Connecticut', 'Illinois', 'Maryland', 'Rhode Island'].includes(s.name));

  // Property crime comparison
  const largePropAvg = avgProperty(large);
  const smallPropAvg = avgProperty(small);
  const tinyPropAvg = avgProperty(tiny);

  const ny = cities.find(c => c.city === 'New York');
  const la = cities.find(c => c.city === 'Los Angeles');
  const chicago = cities.find(c => c.city === 'Chicago');

  const totalCities = cities.length;
  const citiesAbove500 = cities.filter(c => c.violentRate > 500).length;
  const citiesAbove1000 = cities.filter(c => c.violentRate > 1000).length;

  const aiInsights = [
    'Many small and mid-size cities have higher per-capita violent crime rates than major metros like NYC and LA',
    'Cities with 25K-100K population often face concentrated poverty and resource constraints that drive higher crime rates',
    'Scale effects mean a few active offenders can dramatically impact a small city\'s crime rate',
    'The highest per-capita crime rates often belong to mid-size cities like Memphis, St. Louis, and Birmingham',
    'True rural areas have lower crime than cities, but some face domestic violence and drug-related issues with limited law enforcement',
    `Of ${fmtNum(totalCities)} cities tracked, ${fmtNum(citiesAbove500)} have violent crime rates above 500 per 100K`,
    'Property crime follows a different pattern — smaller cities often have lower property crime than metros',
    'The "rural safety" narrative breaks down when examining specific types of crime like domestic violence and drug offenses',
  ];

  const faqItems = [
    {
      question: 'Are big cities more dangerous than small towns?',
      answer: `Not necessarily. FBI data shows that mid-size cities (100K-250K population) often have the highest average violent crime rates. Large cities (250K+) average ${fmtRate(avg(large))} violent crimes per 100K, while mid-size cities average ${fmtRate(avg(midsize))}.`,
    },
    {
      question: 'Which size city has the most crime per capita?',
      answer: `Mid-size cities (100K-250K) tend to have the highest average violent crime rates. However, individual small cities can have extremely high rates due to concentrated poverty and scale effects.`,
    },
    {
      question: 'Is rural America safer than urban America?',
      answer: 'True rural areas generally have lower violent crime rates, but they face unique challenges including domestic violence, drug-related crime, and limited law enforcement. The safety gap is smaller than most people assume.',
    },
    {
      question: 'Why do small cities have high crime rates?',
      answer: 'Small cities with high crime often face concentrated poverty, industrial decline, brain drain, limited police resources, and scale effects where a few active offenders dramatically impact per-capita statistics.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{label:'Analysis',href:'/analysis'},{label:'Rural vs Urban Crime'}]} />
      <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">Rural vs Urban Crime: Shattering the Myths</h1>
      <p className="text-lg text-gray-600 mb-2">
        The popular image of crime as a big-city problem is misleading. Smaller cities often have 
        higher per-capita violence than major metros. Here&apos;s what the data actually shows across {fmtNum(totalCities)} American cities.
      </p>
      <p className="text-sm text-gray-400 mb-8">Updated March 2026 · Source: FBI Crime Data Explorer 2024</p>

      <AIOverview insights={aiInsights} />

      {/* === Hero Stats === */}
      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{fmtNum(totalCities)}</div>
            <div className="text-blue-200 text-sm">Cities Tracked</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtRate(avg(midsize))}</div>
            <div className="text-blue-200 text-sm">Mid-Size Avg Violent Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtRate(avg(large))}</div>
            <div className="text-blue-200 text-sm">Large City Avg</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-400">{fmtNum(dangerousSmall.length)}</div>
            <div className="text-blue-200 text-sm">Small Cities Beat Big-City Avg</div>
          </div>
        </div>
      </div>

      {/* === Main Comparison Table === */}
      <h2 className="font-heading text-2xl font-bold mb-4">Crime by City Size: The Full Picture</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3">City Size</th>
              <th className="text-right px-4 py-3">Count</th>
              <th className="text-right px-4 py-3">Avg Violent Rate</th>
              <th className="text-right px-4 py-3">Median Violent</th>
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
                <td className="px-4 py-3 text-right font-mono text-gray-600">{fmtRate(median(cat.cities, 'violentRate'))}</td>
                <td className="px-4 py-3 text-right font-mono">{avgMurder(cat.cities).toFixed(2)}</td>
                <td className="px-4 py-3 text-right font-mono text-blue-700">{fmtRate(avgProperty(cat.cities))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Big-City Myth</h2>
        <p>
          When Americans think about crime, they think about New York, Chicago, Los Angeles — sprawling 
          metros with millions of people. Cable news reinforces this image nightly. Politicians campaign 
          on it. But the data tells a story that would surprise most voters.
        </p>
        <p>
          Large cities with 250,000+ residents have an average violent crime rate 
          of {fmtRate(avg(large))} per 100,000 residents. Mid-size cities (100K–250K) average {fmtRate(avg(midsize))} — 
          often higher. And many individual small cities dramatically exceed even the worst big-city numbers.
        </p>
        <p>
          Consider the specifics: New York City, America&apos;s largest city with over 8 million people, 
          has a violent crime rate of {fmtRate(ny?.violentRate ?? 0)} and a murder rate 
          of {(ny?.murderRate ?? 0).toFixed(2)}. Los Angeles 
          ({fmtRate(la?.violentRate ?? 0)} violent, {(la?.murderRate ?? 0).toFixed(2)} murder) and 
          Chicago ({fmtRate(chicago?.violentRate ?? 0)} violent, {(chicago?.murderRate ?? 0).toFixed(2)} murder) 
          follow similar patterns. These are not the most dangerous cities in America by rate — not even close.
        </p>

        <h2 className="font-heading">The Most Dangerous Mid-Size Cities</h2>
        <p>
          The cities with the highest per-capita violent crime rates are overwhelmingly mid-size — 
          places with 100,000 to 250,000 residents. These are cities large enough to have serious 
          crime problems but often too small to have the resources, tax base, and diversified economies 
          that help larger metros manage public safety.
        </p>
      </div>

      {/* === Most Dangerous Mid-Size Table === */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <div className="bg-red-50 px-4 py-2 font-semibold text-sm">Most Dangerous Mid-Size Cities (100K–250K)</div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-3 py-2">City</th>
              <th className="text-right px-3 py-2">Population</th>
              <th className="text-right px-3 py-2">Violent Rate</th>
              <th className="text-right px-3 py-2">Murder Rate</th>
              <th className="text-right px-3 py-2">Property Rate</th>
            </tr>
          </thead>
          <tbody>
            {dangerousMid.map(c => (
              <tr key={c.slug} className="border-t">
                <td className="px-3 py-2">
                  <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city}, {c.state}</Link>
                </td>
                <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
                <td className="px-3 py-2 text-right font-mono text-red-600 font-semibold">{fmtRate(c.violentRate)}</td>
                <td className="px-3 py-2 text-right font-mono">{c.murderRate.toFixed(2)}</td>
                <td className="px-3 py-2 text-right font-mono text-blue-700">{fmtRate(c.propertyRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">Why Small Cities Can Be More Dangerous</h2>
        <p>
          The counterintuitive reality of small-city crime has deep structural roots. Understanding 
          why a city of 50,000 can be more dangerous per capita than a metro of 5 million requires 
          looking beyond the surface numbers.
        </p>
        <ul>
          <li><strong>Concentrated poverty.</strong> Small cities with declining industries face concentrated 
          poverty without the diversified economies that large metros offer. When a factory closes in a town 
          of 50,000, it can devastate the entire local economy. When the same happens in New York, other 
          industries absorb the shock. This is the story of the Rust Belt — cities like Flint, Gary, 
          Camden, and East St. Louis that never recovered from deindustrialization.</li>
          <li><strong>Resource constraints.</strong> Smaller police departments lack specialized units, 
          forensic labs, gang intelligence, and the investigative capacity that big-city departments deploy. 
          A city of 40,000 might have 60-80 officers covering all shifts. NYPD has over 35,000.</li>
          <li><strong>Brain drain.</strong> Talented, ambitious residents leave small and mid-size cities 
          for metros with better opportunities. This hollows out the professional and tax base, reducing 
          the community&apos;s capacity for self-governance, mentorship, and civic engagement.</li>
          <li><strong>Scale effects.</strong> A few active offenders can dramatically affect a small city&apos;s 
          crime rate. Ten additional murders in a city of 50,000 adds 20 points to the murder rate per 100K. 
          In New York City, those same 10 murders barely register statistically.</li>
          <li><strong>Drug market dynamics.</strong> Small cities that sit on major drug trafficking corridors — 
          especially along interstate highways — can become distribution hubs with violence that far exceeds 
          what their size would predict. See our <Link href="/analysis/opioid-crime-connection">opioid-crime analysis</Link> for 
          more on how drug markets drive small-city violence.</li>
          <li><strong>Limited social infrastructure.</strong> Big cities have hospitals, mental health services, 
          after-school programs, workforce development, and community organizations. Small cities often lack 
          these buffers against crime.</li>
        </ul>

        <h2 className="font-heading">Small Cities That Out-Crime Major Metros</h2>
        <p>
          {fmtNum(dangerousSmall.length)} cities with populations between 25,000 and 100,000 have violent 
          crime rates above the average for cities over 250,000 ({fmtRate(largeCityAvg)} per 100K). 
          That&apos;s not a rounding error — it&apos;s a systemic pattern.
        </p>
      </div>

      {topDangerousSmall.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
          <div className="bg-red-50 px-4 py-2 font-semibold text-sm">Small Cities (25K–100K) with Violent Rate Above Large-City Average</div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2">City</th>
                <th className="text-right px-3 py-2">Pop</th>
                <th className="text-right px-3 py-2">Violent Rate</th>
                <th className="text-right px-3 py-2">Murder Rate</th>
                <th className="text-right px-3 py-2">Property Rate</th>
              </tr>
            </thead>
            <tbody>
              {topDangerousSmall.map(c => (
                <tr key={c.slug} className="border-t">
                  <td className="px-3 py-2">
                    <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city}, {c.state}</Link>
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
                  <td className="px-3 py-2 text-right font-mono text-red-600 font-semibold">{fmtRate(c.violentRate)}</td>
                  <td className="px-3 py-2 text-right font-mono">{c.murderRate.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right font-mono text-blue-700">{fmtRate(c.propertyRate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">Property Crime: A Different Pattern</h2>
        <p>
          While violent crime patterns sometimes favor big cities, property crime tells a different story. 
          Large cities average a property crime rate of {fmtRate(largePropAvg)} per 100K, compared 
          to {fmtRate(smallPropAvg)} for small cities and {fmtRate(tinyPropAvg)} for towns.
        </p>
        <p>
          Property crime — larceny, burglary, motor vehicle theft — tends to concentrate where there 
          are more targets of opportunity. Dense urban areas with more cars, more retail, and more foot 
          traffic create more opportunities for theft. But the gap is narrower than most assume, and 
          some small cities have remarkably high property crime driven by methamphetamine and opioid addiction.
        </p>
        <p>
          The <Link href="/analysis/car-theft-crisis">car theft crisis</Link> has also hit mid-size cities 
          disproportionately, with some recording per-capita motor vehicle theft rates that rival or 
          exceed major metros.
        </p>

        <h2 className="font-heading">The Safest Large Cities</h2>
        <p>
          Not all big cities are dangerous. Some of America&apos;s largest cities have remarkably low 
          crime rates — lower than many small towns. This undermines the narrative that size alone 
          drives crime.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <div className="bg-green-50 px-4 py-2 font-semibold text-sm">Safest Large Cities (250K+ Population)</div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-3 py-2">City</th>
              <th className="text-right px-3 py-2">Population</th>
              <th className="text-right px-3 py-2">Violent Rate</th>
              <th className="text-right px-3 py-2">Murder Rate</th>
            </tr>
          </thead>
          <tbody>
            {safestLarge.map(c => (
              <tr key={c.slug} className="border-t">
                <td className="px-3 py-2">
                  <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline">{c.city}, {c.state}</Link>
                </td>
                <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
                <td className="px-3 py-2 text-right font-mono text-green-600 font-semibold">{fmtRate(c.violentRate)}</td>
                <td className="px-3 py-2 text-right font-mono">{c.murderRate.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">State-Level: Rural vs Urban States</h2>
        <p>
          Another way to test the urban-rural divide is to compare the most rural states against the most 
          urbanized states. The results are nuanced. Heavily rural states like Wyoming, Vermont, and Montana 
          generally have lower violent crime rates. But some rural states — particularly in the South — have 
          surprisingly high violence driven by factors including poverty, domestic violence, and limited 
          law enforcement coverage over vast areas.
        </p>
      </div>

      {ruralStates.length > 0 && urbanStates.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="bg-green-50 px-4 py-2 font-semibold text-sm">Most Rural States</div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2">State</th>
                  <th className="text-right px-3 py-2">Violent Rate</th>
                  <th className="text-right px-3 py-2">Murder Rate</th>
                </tr>
              </thead>
              <tbody>
                {ruralStates.sort((a, b) => a.violentRate - b.violentRate).map(s => (
                  <tr key={s.abbr} className="border-t">
                    <td className="px-3 py-2">
                      <Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link>
                    </td>
                    <td className="px-3 py-2 text-right font-mono">{fmtRate(s.violentRate)}</td>
                    <td className="px-3 py-2 text-right font-mono">{fmtRate(s.homicideRate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="bg-blue-50 px-4 py-2 font-semibold text-sm">Most Urbanized States</div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2">State</th>
                  <th className="text-right px-3 py-2">Violent Rate</th>
                  <th className="text-right px-3 py-2">Murder Rate</th>
                </tr>
              </thead>
              <tbody>
                {urbanStates.sort((a, b) => a.violentRate - b.violentRate).map(s => (
                  <tr key={s.abbr} className="border-t">
                    <td className="px-3 py-2">
                      <Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link>
                    </td>
                    <td className="px-3 py-2 text-right font-mono">{fmtRate(s.violentRate)}</td>
                    <td className="px-3 py-2 text-right font-mono">{fmtRate(s.homicideRate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Rural Exception — And Its Limits</h2>
        <p>
          True rural areas — unincorporated counties, farming communities, remote towns — generally do have 
          lower crime rates than cities. But the difference is smaller than most people assume, and the 
          &quot;rural safety&quot; narrative breaks down when you dig into specific crime types.
        </p>
        <p>
          <strong>Domestic violence</strong> is a major issue in rural areas, where isolation, distance from 
          services, and cultural norms around not involving outsiders can keep victims trapped. A woman in a 
          rural county may be 45 minutes from the nearest shelter and an hour from a hospital.
        </p>
        <p>
          <strong>Drug crime</strong> has increasingly affected rural America. The methamphetamine epidemic 
          hit rural communities especially hard in the 2000s, and the opioid crisis followed. Rural counties 
          along interstate corridors can become drug distribution nodes with violence that seems incongruous 
          with their population size. See our <Link href="/analysis/opioid-crime-connection">opioid-crime analysis</Link> for 
          detailed data on this pattern.
        </p>
        <p>
          <strong>Clearance rates</strong> — the percentage of crimes that result in arrest — can be lower 
          in rural areas simply because departments have fewer detectives covering larger territories. A 
          county sheriff with 15 deputies covering 1,500 square miles can&apos;t investigate crimes the way 
          a city detective bureau can.
        </p>

        <h2 className="font-heading">The Concentration Effect</h2>
        <p>
          The real story isn&apos;t urban vs. rural — it&apos;s concentrated disadvantage vs. opportunity. 
          Crime clusters in specific neighborhoods regardless of whether the overall city is large or small. 
          A few blocks in a small city can drive its entire crime rate while most of the town remains safe.
        </p>
        <p>
          Research consistently shows that roughly 1-2% of street segments in any city account for 25-50% 
          of its crime. This &quot;law of crime concentration&quot; holds in cities of every size. The 
          implication: the average crime rate for a city is a poor measure of what life is actually like 
          in most of its neighborhoods. For more on this concentration effect, see 
          our <Link href="/analysis/murder-map">murder map analysis</Link>.
        </p>

        <h2 className="font-heading">Who&apos;s Affected Across City Sizes</h2>
        <p>
          The demographic patterns of crime victimization are remarkably consistent across city sizes. 
          Young men aged 18-34 are disproportionately both perpetrators and victims whether you&apos;re 
          looking at Memphis or a town of 30,000. The <Link href="/analysis/racial-disparities">racial 
          disparities in victimization</Link> persist across all city sizes, though they can be even 
          more extreme in small cities with highly segregated neighborhoods.
        </p>
        <p>
          For a detailed breakdown of who commits crime across demographics, see 
          our <Link href="/analysis/who-commits-crime">demographic deep dive</Link> and 
          the <Link href="/analysis/crime-by-race">crime by race data analysis</Link>.
        </p>

        <h2 className="font-heading">Poverty: The Common Thread</h2>
        <p>
          Whether a city has 15,000 residents or 1.5 million, poverty is the strongest predictor of 
          violent crime rates. Cities with high poverty rates have high crime rates — regardless of size, 
          region, or demographics. This is the finding that should dominate the policy conversation 
          but rarely does because it&apos;s not politically convenient for anyone.
        </p>
        <p>
          Our <Link href="/analysis/crime-and-poverty">crime and poverty analysis</Link> digs into this 
          relationship with detailed data showing how economic conditions drive crime regardless of 
          city size or location.
        </p>

        <h2 className="font-heading">Policy Implications</h2>
        <p>
          If crime were purely a big-city problem, the solution would be simple: more big-city policing and 
          programs. But the data shows that violence and disorder affect communities of all sizes. Effective 
          crime reduction requires:
        </p>
        <ul>
          <li><strong>Place-based strategies</strong> that address the specific conditions driving crime 
          in each community — not one-size-fits-all approaches based on city size.</li>
          <li><strong>State and federal support for small departments.</strong> A city of 40,000 with a 
          serious violent crime problem needs investigative resources, forensic capacity, and training 
          that it can&apos;t fund from its tax base alone.</li>
          <li><strong>Economic development in struggling communities.</strong> The data consistently shows 
          that crime tracks poverty. Sustainable crime reduction requires creating legitimate economic 
          opportunity — something government has a mixed record on, but market-based approaches like 
          Opportunity Zones have shown promise in some areas.</li>
          <li><strong>Drug market disruption.</strong> Small cities that serve as drug distribution hubs 
          need targeted interdiction strategies that account for their position in regional trafficking 
          networks.</li>
          <li><strong>Honest acknowledgment</strong> that crime is not just a &quot;big city problem&quot; 
          and that rural and small-town America faces real public safety challenges that deserve attention 
          and resources.</li>
        </ul>

        <h2 className="font-heading">The Bottom Line</h2>
        <p>
          The data demolishes the simplistic urban vs. rural crime narrative. Crime is driven by poverty, 
          lack of opportunity, drug markets, and institutional failure — not by city size. Some of 
          America&apos;s largest cities are among its safest. Some of its smallest are among its most 
          dangerous. Understanding this reality is the first step toward policies that actually work.
        </p>
        <p>
          The government and media focus on big-city crime is not just inaccurate — it&apos;s harmful. 
          It directs resources and attention away from the small and mid-size cities that often need 
          it most. It also fuels a political narrative about &quot;urban decay&quot; that obscures the 
          real, data-driven story: crime is a problem of specific conditions, not specific types of places.
        </p>
      </div>

      {/* === Cross-Links === */}
      <div className="bg-gray-50 rounded-xl p-6 my-8">
        <h3 className="font-heading text-lg font-bold mb-3">Explore Related Data</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <Link href="/analysis/murder-map" className="text-[#1e3a5f] hover:underline text-sm">America&apos;s Murder Map — Where Homicides Happen →</Link>
          <Link href="/analysis/crime-and-poverty" className="text-[#1e3a5f] hover:underline text-sm">Crime and Poverty — What the Data Shows →</Link>
          <Link href="/analysis/opioid-crime-connection" className="text-[#1e3a5f] hover:underline text-sm">The Opioid-Crime Connection →</Link>
          <Link href="/analysis/crime-decline" className="text-[#1e3a5f] hover:underline text-sm">The Great Crime Decline →</Link>
          <Link href="/analysis/who-commits-crime" className="text-[#1e3a5f] hover:underline text-sm">Who Commits Crime in America →</Link>
          <Link href="/analysis/crime-by-race" className="text-[#1e3a5f] hover:underline text-sm">Crime by Race — FBI Data Breakdown →</Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/states" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Browse by State</Link>
        <Link href="/rankings" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">City Rankings</Link>
        <Link href="/dashboard" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Dashboard</Link>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="rural-vs-urban" tags={['geography', 'economics']} />
        <ShareButtons title="Rural vs Urban Crime: Shattering the Myths" />
      </div>

      {/* FAQ Section */}
      <div className="mt-10 border-t pt-8">
        <h2 className="font-heading text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        {faqItems.map((faq, i) => (
          <div key={i} className="mb-6">
            <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Rural vs Urban Crime: Shattering the Myths',
        description: 'Crime isn\'t just a big-city problem. FBI data shows small cities often have higher per-capita violent crime than major metros.',
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        datePublished: '2026-03-04',
        dateModified: '2026-03-04',
        mainEntityOfPage: 'https://www.opencrime.us/analysis/rural-vs-urban',
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqItems.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      })}} />
    </div>
  );
}
