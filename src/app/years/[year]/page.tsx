import { loadData, fmtNum, fmtRate, fmtPct } from '@/lib/utils';
import type { NationalTrend } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import { notFound } from 'next/navigation';

export const dynamicParams = true;

export function generateStaticParams() {
  const national = loadData<NationalTrend[]>('national-trends.json');
  return national.map(n => ({ year: String(n.year) }));
}

export async function generateMetadata({ params }: { params: Promise<{ year: string }> }): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `${year} Crime Statistics — US Crime Rate in ${year} | OpenCrime`,
    description: `US crime statistics for ${year}. Violent crime rate, murder rate, property crime, and all offense types from FBI data.`,
    openGraph: { title: `${year} US Crime Statistics`, description: `FBI crime data for ${year}` },
    alternates: { canonical: `https://www.opencrime.us/years/${year}` },
  };
}

// Notable events that shaped crime in each year
const notableEvents: Record<number, string[]> = {
  1979: ['Iran hostage crisis begins', 'Three Mile Island nuclear accident', 'Sony Walkman introduced — street crime shifts'],
  1980: ['Ronald Reagan elected president', 'John Lennon assassinated in NYC', 'US begins prison-building boom'],
  1981: ['Reagan assassination attempt', 'First year of "War on Drugs" escalation', 'Sandra Day O\'Connor joins Supreme Court'],
  1982: ['Recession drives unemployment to 10.8%', 'Anti-Drug Abuse Act discussions begin', 'Tylenol murders in Chicago'],
  1983: ['Crack cocaine begins appearing in major cities', 'Beirut barracks bombing', 'Economy begins recovery'],
  1984: ['Bernhard Goetz "Subway Vigilante" incident in NYC', 'Comprehensive Crime Control Act signed', 'Los Angeles Olympics'],
  1985: ['Crack epidemic accelerates in NYC, LA, Miami', 'MOVE bombing in Philadelphia', 'FBI begins tracking hate crimes'],
  1986: ['Anti-Drug Abuse Act creates mandatory minimums', 'Len Bias dies from cocaine — sparks legislative action', 'Iran-Contra affair emerges'],
  1987: ['Stock market crash (Black Monday)', 'Crack wars intensify in DC, NYC', 'Prison population tops 500,000'],
  1988: ['George H.W. Bush "Willie Horton" campaign ad', 'Anti-Drug Abuse Act strengthened', 'Crack epidemic peaks in several cities'],
  1989: ['Central Park jogger case (later exonerees)', 'DC becomes "Murder Capital" with 434 homicides', 'Berlin Wall falls'],
  1990: ['NYC records 2,245 murders — all-time high', 'Crime Bill debate begins in Congress', 'Recession starts'],
  1991: ['PEAK YEAR: Violent crime hits all-time high', 'Rodney King beating in LA', 'Soviet Union collapses'],
  1992: ['LA Riots after Rodney King verdict — 63 dead', 'Ruby Ridge standoff', 'Bill Clinton elected on "tough on crime" platform'],
  1993: ['World Trade Center bombing', 'Brady Handgun Violence Prevention Act signed', 'Three-strikes laws gain momentum'],
  1994: ['Federal Assault Weapons Ban signed', 'Violent Crime Control Act — largest crime bill in history', 'O.J. Simpson case dominates media'],
  1995: ['Oklahoma City bombing — 168 killed', 'CompStat policing begins transforming NYPD', 'Million Man March'],
  1996: ['Welfare reform signed into law', 'Leaded gasoline completely phased out', 'Crime decline accelerates nationally'],
  1997: ['Dot-com boom drives economic growth', 'NYC murder rate falls below 1,000 for first time since 1968', 'North Hollywood shootout'],
  1998: ['Columbine-era school safety debates begin', 'Economic boom continues — unemployment at 4.5%', 'Matthew Shepard hate crime murder'],
  1999: ['Columbine High School massacre — 13 killed', 'Violent crime down 28% from 1991 peak', 'Y2K preparations'],
  2000: ['Crime reaches lowest point in a generation', 'Dot-com bust begins', 'Bush v. Gore election decided by Supreme Court'],
  2001: ['9/11 terrorist attacks — 2,977 killed', 'Patriot Act signed — surveillance expansion', 'Anthrax attacks'],
  2002: ['Department of Homeland Security created', 'DC sniper attacks — 10 killed', 'Corporate fraud scandals (Enron, WorldCom)'],
  2003: ['Iraq War begins', 'BTK serial killer resurfaces', 'National crime decline continues quietly'],
  2004: ['Abu Ghraib prison scandal', 'Assault Weapons Ban expires', 'Boston Red Sox break curse (reduced Boston crime during celebrations)'],
  2005: ['Hurricane Katrina devastates New Orleans — crime displacement', 'New Orleans murder rate skyrockets post-Katrina', 'London bombings'],
  2006: ['Immigration debate intensifies', 'Amish school shooting', 'Housing bubble nearing peak'],
  2007: ['Virginia Tech massacre — 32 killed', 'Subprime mortgage crisis begins', 'iPhone introduced — surveillance implications'],
  2008: ['Great Recession — worst financial crisis since 1930s', 'Barack Obama elected president', 'Bernie Madoff fraud exposed'],
  2009: ['Recession deepens — unemployment hits 10%', 'Fort Hood shooting', 'Despite recession, crime continues to fall — challenging poverty-crime link'],
  2010: ['Deepwater Horizon oil spill', 'Affordable Care Act signed', 'Crime rates hit new modern lows'],
  2011: ['Osama bin Laden killed', 'Occupy Wall Street movement', 'Gabrielle Giffords shooting in Tucson'],
  2012: ['Sandy Hook Elementary shooting — 26 killed', 'Trayvon Martin killing sparks debate', 'Aurora theater shooting'],
  2013: ['Boston Marathon bombing', 'George Zimmerman acquitted', 'Edward Snowden NSA revelations'],
  2014: ['Ferguson, MO — Michael Brown killing sparks protests', 'Eric Garner "I can\'t breathe" incident in NYC', '"Ferguson Effect" debate begins'],
  2015: ['Charleston church massacre — 9 killed', 'San Bernardino terrorist attack', 'Murder rate ticks up in several major cities'],
  2016: ['Pulse nightclub shooting — 49 killed', 'Murder rate rises ~8% nationally', 'Donald Trump campaigns on "American carnage"'],
  2021: ['January 6 Capitol attack', 'Derek Chauvin convicted of George Floyd\'s murder', 'Murder remains elevated from 2020 spike'],
  2022: ['Uvalde school shooting — 21 killed', 'Buffalo supermarket shooting', 'Murder begins significant decline from 2020-2021 spike'],
  2023: ['Crime decline accelerates — murder down ~12%', 'AI and surveillance technology expand in policing', 'FBI completes NIBRS transition'],
  2024: ['Crime falls to lowest rates in decades', 'Murder rate drops to pre-pandemic levels and below', 'Presidential election features crime as key issue despite declining rates'],
};

// Relevant analysis articles for different eras
function getRelevantArticles(year: number): { href: string; title: string }[] {
  const articles: { href: string; title: string }[] = [];
  
  // Always relevant
  articles.push({ href: '/analysis/crime-decline', title: 'The Great Crime Decline' });
  
  if (year >= 1985 && year <= 2000) {
    articles.push({ href: '/analysis/racial-disparities', title: 'Crime Victimization: Who Bears the Burden?' });
    articles.push({ href: '/analysis/drug-crime', title: 'The Drug-Crime Connection' });
  }
  if (year >= 2000) {
    articles.push({ href: '/analysis/murder-map', title: "America's Murder Map" });
    articles.push({ href: '/analysis/who-commits-crime', title: 'Who Commits Crime in America' });
  }
  if (year >= 2015) {
    articles.push({ href: '/analysis/defund-police', title: 'Did "Defund the Police" Cause a Crime Surge?' });
    articles.push({ href: '/analysis/car-theft-crisis', title: 'The Car Theft Crisis' });
  }
  if (year >= 2010) {
    articles.push({ href: '/analysis/opioid-crime-connection', title: 'The Opioid-Crime Connection' });
    articles.push({ href: '/analysis/fentanyl-crisis', title: 'The Fentanyl Crisis' });
  }
  if (year >= 2020) {
    articles.push({ href: '/analysis/crime-by-race', title: 'Crime by Race — FBI Data Breakdown' });
    articles.push({ href: '/analysis/crime-and-poverty', title: 'Crime and Poverty' });
  }
  
  articles.push({ href: '/analysis/rural-vs-urban', title: 'Rural vs Urban Crime' });
  articles.push({ href: '/analysis/gun-violence', title: 'Gun Violence by the Numbers' });
  
  // Deduplicate and limit
  const seen = new Set<string>();
  return articles.filter(a => {
    if (seen.has(a.href)) return false;
    seen.add(a.href);
    return true;
  }).slice(0, 6);
}

function getEraContext(year: number, n: NationalTrend, peak: NationalTrend): string {
  if (year <= 1984) return 'The early 1980s saw rising crime as the crack cocaine epidemic began taking hold in major cities. The "War on Drugs" was escalating, and prison populations were growing rapidly.';
  if (year <= 1991) return `The late 1980s and early 1990s were the peak of American violent crime, driven by the crack epidemic and gang wars. Violence reached levels that led many to question whether cities were governable.`;
  if (year <= 2000) return `The 1990s saw the beginning of the Great Crime Decline — one of the most significant social improvements in modern American history. Every category of crime fell as the economy boomed and the crack epidemic faded.`;
  if (year <= 2007) return 'The early 2000s saw continued steady crime decline, though at a slower pace. The post-9/11 era shifted law enforcement resources toward counterterrorism, yet crime continued falling.';
  if (year <= 2014) return 'The Great Recession tested but didn\'t reverse the crime decline — an important finding that complicated simple poverty-causes-crime narratives. Crime reached new modern lows.';
  if (year <= 2019) return 'The mid-to-late 2010s saw mostly stable crime rates with minor fluctuations. The "Ferguson Effect" debate highlighted tensions between policing reform and public safety.';
  if (year <= 2021) return 'The pandemic era brought the largest single-year murder increase on record in 2020, driven by pandemic disruptions, police pullbacks, and social upheaval. The spike was concentrated in specific communities.';
  return 'The post-pandemic era has seen a rapid crime decline, with rates falling back to and below pre-pandemic levels. The 2020 spike appears to have been temporary rather than structural.';
}

export default async function YearDetailPage({ params }: { params: Promise<{ year: string }> }) {
  const { year: yearStr } = await params;
  const yearNum = parseInt(yearStr);
  const national = loadData<NationalTrend[]>('national-trends.json');
  const n = national.find(y => y.year === yearNum);
  const peak = national.find(y => y.year === 1991)!;
  
  // Handle missing years due to SRS → NIBRS transition
  const missingYears = [2017, 2018, 2019, 2020];
  if (!n && missingYears.includes(yearNum)) {
    const availableYears = national.map(y => y.year).sort((a, b) => b - a);
    
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Years', href: '/years' }, { label: String(yearNum) }]} />

        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">{yearNum} Crime Statistics</h1>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 max-w-3xl mx-auto">
            <div className="text-amber-800">
              <div className="text-5xl mb-4">📊</div>
              <h2 className="text-xl font-semibold mb-3">No Data Available for {yearNum}</h2>
              <p className="text-left mb-4">
                Crime data for {yearNum} is not available due to the FBI&apos;s transition from the Summary 
                Reporting System (SRS) to the National Incident-Based Reporting System (NIBRS).
              </p>
              <p className="text-left mb-4">
                The NIBRS system provides more detailed and comprehensive crime data, but required time for 
                law enforcement agencies nationwide to adopt the new reporting standards.
              </p>
            </div>
          </div>
        </div>

        {/* Notable events even for missing data years */}
        {notableEvents[yearNum] && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h3 className="font-heading text-xl font-semibold mb-4">Notable Events in {yearNum}</h3>
            <ul className="space-y-2 text-gray-700">
              {notableEvents[yearNum].map((evt, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[#1e3a5f]">•</span>
                  <span>{evt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h3 className="font-heading text-xl font-semibold mb-4">Browse Available Years</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {availableYears.slice(0, 18).map(year => (
              <Link key={year} href={`/years/${year}`} 
                    className="text-center py-2 px-3 bg-[#1e3a5f] text-white rounded hover:bg-[#2a4d7a] transition text-sm">
                {year}
              </Link>
            ))}
          </div>
          {availableYears.length > 18 && (
            <div className="mt-4 text-center">
              <Link href="/years" className="text-[#1e3a5f] hover:underline">View all {availableYears.length} years →</Link>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/years" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">All Years</Link>
          <Link href="/dashboard" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Dashboard</Link>
          <Link href="/analysis/crime-decline" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">The Great Crime Decline</Link>
        </div>

        <div className="mt-8"><ShareButtons title={`${yearNum} Crime Statistics`} /></div>
      </div>
    );
  }
  
  if (!n) return notFound();

  const idx = national.findIndex(y => y.year === yearNum);
  const prev = idx > 0 ? national[idx - 1] : null;
  const next = idx < national.length - 1 ? national[idx + 1] : null;

  const vChange = prev ? ((n.violentRate - prev.violentRate) / prev.violentRate * 100) : null;
  const mChange = prev ? ((n.homicideRate - prev.homicideRate) / prev.homicideRate * 100) : null;
  const pChange = prev ? ((n.propertyRate - prev.propertyRate) / prev.propertyRate * 100) : null;

  const robberyRate = n.robbery / n.population * 100000;
  const assaultRate = n.aggravatedAssault / n.population * 100000;
  const rapeRate = n.rape / n.population * 100000;
  const burglaryRate = n.burglary / n.population * 100000;
  const larcenyRate = n.larceny / n.population * 100000;
  const mvtRate = n.motorVehicleTheft / n.population * 100000;

  // Compare to peak and latest
  const vsPeak = ((n.violentRate - peak.violentRate) / peak.violentRate * 100);
  const relevantArticles = getRelevantArticles(yearNum);
  const events = notableEvents[yearNum] || [];
  const eraContext = getEraContext(yearNum, n, peak);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Years', href: '/years' }, { label: String(yearNum) }]} />

      <div className="flex items-center justify-between mb-6">
        <div>
          {prev && <Link href={`/years/${prev.year}`} className="text-[#1e3a5f] hover:underline text-sm">← {prev.year}</Link>}
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-bold">{yearNum} Crime Statistics</h1>
        <div>
          {next && <Link href={`/years/${next.year}`} className="text-[#1e3a5f] hover:underline text-sm">{next.year} →</Link>}
        </div>
      </div>

      {/* Era Context */}
      <div className="bg-gray-50 border rounded-xl p-4 mb-6 text-gray-700">
        <p>{eraContext}</p>
      </div>

      {/* Hero Stats */}
      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-sm text-blue-200">Population</div>
            <div className="text-2xl font-bold">{fmtNum(n.population)}</div>
          </div>
          <div>
            <div className="text-sm text-blue-200">Violent Crime Rate</div>
            <div className="text-2xl font-bold">{fmtRate(n.violentRate)}</div>
            {vChange != null && <div className={`text-sm ${vChange < 0 ? 'text-green-400' : 'text-red-400'}`}>{fmtPct(vChange)} YoY</div>}
          </div>
          <div>
            <div className="text-sm text-blue-200">Murder Rate</div>
            <div className="text-2xl font-bold">{fmtRate(n.homicideRate)}</div>
            {mChange != null && <div className={`text-sm ${mChange < 0 ? 'text-green-400' : 'text-red-400'}`}>{fmtPct(mChange)} YoY</div>}
          </div>
          <div>
            <div className="text-sm text-blue-200">Property Crime Rate</div>
            <div className="text-2xl font-bold">{fmtRate(n.propertyRate)}</div>
            {pChange != null && <div className={`text-sm ${pChange < 0 ? 'text-green-400' : 'text-red-400'}`}>{fmtPct(pChange)} YoY</div>}
          </div>
        </div>
        {/* Comparison to 1991 peak */}
        <div className="mt-4 pt-4 border-t border-blue-400/30 text-center text-sm text-blue-200">
          Compared to 1991 peak: Violent crime rate {vsPeak < 0 ? `${Math.abs(vsPeak).toFixed(0)}% lower` : `${vsPeak.toFixed(0)}% higher`} · 
          Murder rate {((n.homicideRate - peak.homicideRate) / peak.homicideRate * 100) < 0 ? `${Math.abs((n.homicideRate - peak.homicideRate) / peak.homicideRate * 100).toFixed(0)}% lower` : `${((n.homicideRate - peak.homicideRate) / peak.homicideRate * 100).toFixed(0)}% higher`}
        </div>
      </div>

      {/* Notable Events */}
      {events.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="font-heading text-xl font-semibold mb-4">Notable Events in {yearNum}</h2>
          <ul className="space-y-2 text-gray-700">
            {events.map((evt, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[#1e3a5f] font-bold">•</span>
                <span>{evt}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2 className="font-heading text-2xl font-bold mb-4">Violent Crime Breakdown</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full">
          <thead className="bg-red-50">
            <tr>
              <th className="text-left px-4 py-2">Offense</th>
              <th className="text-right px-4 py-2">Total</th>
              <th className="text-right px-4 py-2">Rate per 100K</th>
              <th className="text-right px-4 py-2">% of Violent</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-t font-bold bg-red-50/50">
              <td className="px-4 py-2">Total Violent Crime</td>
              <td className="px-4 py-2 text-right font-mono">{fmtNum(n.violentCrime)}</td>
              <td className="px-4 py-2 text-right font-mono text-red-600">{fmtRate(n.violentRate)}</td>
              <td className="px-4 py-2 text-right">100%</td>
            </tr>
            {[
              { name: 'Aggravated Assault', count: n.aggravatedAssault, rate: assaultRate },
              { name: 'Robbery', count: n.robbery, rate: robberyRate },
              { name: 'Rape', count: n.rape, rate: rapeRate },
              { name: 'Murder', count: n.homicide, rate: n.homicideRate },
            ].map(o => (
              <tr key={o.name} className="border-t">
                <td className="px-4 py-2">{o.name}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(o.count)}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtRate(o.rate)}</td>
                <td className="px-4 py-2 text-right font-mono text-gray-500">{(o.count / n.violentCrime * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-heading text-2xl font-bold mb-4">Property Crime Breakdown</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full">
          <thead className="bg-blue-50">
            <tr>
              <th className="text-left px-4 py-2">Offense</th>
              <th className="text-right px-4 py-2">Total</th>
              <th className="text-right px-4 py-2">Rate per 100K</th>
              <th className="text-right px-4 py-2">% of Property</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-t font-bold bg-blue-50/50">
              <td className="px-4 py-2">Total Property Crime</td>
              <td className="px-4 py-2 text-right font-mono">{fmtNum(n.propertyCrime)}</td>
              <td className="px-4 py-2 text-right font-mono text-blue-700">{fmtRate(n.propertyRate)}</td>
              <td className="px-4 py-2 text-right">100%</td>
            </tr>
            {[
              { name: 'Larceny-Theft', count: n.larceny, rate: larcenyRate },
              { name: 'Burglary', count: n.burglary, rate: burglaryRate },
              { name: 'Motor Vehicle Theft', count: n.motorVehicleTheft, rate: mvtRate },
            ].map(o => (
              <tr key={o.name} className="border-t">
                <td className="px-4 py-2">{o.name}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(o.count)}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtRate(o.rate)}</td>
                <td className="px-4 py-2 text-right font-mono text-gray-500">{(o.count / n.propertyCrime * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Related Analysis */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="font-heading text-lg font-bold mb-3">Related Analysis</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {relevantArticles.map(a => (
            <Link key={a.href} href={a.href} className="text-[#1e3a5f] hover:underline text-sm">
              {a.title} →
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link href="/years" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">All Years</Link>
        <Link href="/dashboard" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Dashboard</Link>
        <Link href="/states" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">By State</Link>
        <Link href="/analysis/crime-decline" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">The Great Crime Decline</Link>
      </div>

      <div className="mt-8"><ShareButtons title={`${yearNum} Crime Statistics`} /></div>
      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer, {yearNum} national estimates.</p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: `${yearNum} US Crime Statistics`,
        description: `FBI crime data for ${yearNum}. Violent crime rate: ${fmtRate(n.violentRate)}, Murder rate: ${fmtRate(n.homicideRate)}.`,
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        datePublished: '2026-03-04',
        mainEntityOfPage: `https://www.opencrime.us/years/${yearNum}`,
      })}} />
    </div>
  );
}
