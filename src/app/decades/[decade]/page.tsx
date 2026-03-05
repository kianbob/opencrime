import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { NationalTrend } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type DecadeInfo = {
  label: string;
  startYear: number;
  endYear: number;
  description: string;
  keyEvents: string[];
  policyChanges: string[];
  notableCases: string[];
  defining: string;
};

const DECADES: Record<string, DecadeInfo> = {
  '1980s': {
    label: '1980s',
    startYear: 1980,
    endYear: 1989,
    description: 'The decade of the crack epidemic, "tough on crime" politics, and the beginning of mass incarceration. Violent crime surged dramatically.',
    keyEvents: [
      'Crack cocaine epidemic hits major cities (mid-1980s)',
      'War on Drugs escalated under Reagan administration',
      'Anti-Drug Abuse Act of 1986 creates mandatory minimums',
      'Gun violence surges in inner cities',
      'Serial killer panic (Night Stalker, Green River Killer)',
    ],
    policyChanges: [
      'Comprehensive Crime Control Act (1984)',
      'Sentencing Reform Act creates federal sentencing guidelines',
      'Anti-Drug Abuse Act (1986) — 100:1 crack/powder cocaine disparity',
      'Death penalty reinstated in many states',
      'Three-strikes laws begin emerging',
    ],
    notableCases: [
      'Central Park Five (1989)',
      'Night Stalker — Richard Ramirez terrorizes LA (1984-85)',
      'Howard Beach racial attack (1986)',
      'Bernhard Goetz subway shooting (1984)',
    ],
    defining: 'The crack epidemic defined the 1980s crime landscape. Cheap, highly addictive crack cocaine flooded inner cities, fueling turf wars and gun violence. Homicide rates among young Black men skyrocketed. The political response — harsh mandatory minimums and the "War on Drugs" — set the stage for mass incarceration.',
  },
  '1990s': {
    label: '1990s',
    startYear: 1990,
    endYear: 1999,
    description: 'The decade started with crime at historic peaks and ended with the beginning of the Great Crime Decline — one of the most significant social changes in modern history.',
    keyEvents: [
      'Violent crime peaks in 1991-1993',
      'The Great Crime Decline begins (~1993)',
      'CompStat policing revolution in NYC',
      'Community policing movement grows',
      'Columbine school shooting (1999)',
    ],
    policyChanges: [
      'Violent Crime Control and Law Enforcement Act (1994)',
      '100,000 new police officers funded (COPS program)',
      'Federal Assault Weapons Ban (1994-2004)',
      'Brady Bill — background checks for gun purchases (1993)',
      'Three-strikes laws spread nationally',
      'Megan\'s Law — sex offender registries (1996)',
    ],
    notableCases: [
      'O.J. Simpson trial (1995)',
      'Oklahoma City bombing (1995)',
      'Columbine school shooting (1999)',
      'Unabomber captured (1996)',
      'World Trade Center bombing (1993)',
    ],
    defining: 'The 1990s witnessed the most dramatic crime decline in American history. After peaking around 1991, violent crime began a sustained drop that would continue for two decades. Theories abound: better policing (CompStat), mass incarceration, the fading crack epidemic, economic boom, demographic shifts, and the controversial lead-crime hypothesis.',
  },
  '2000s': {
    label: '2000s',
    startYear: 2000,
    endYear: 2009,
    description: 'The crime decline continued through the 2000s despite 9/11, the Iraq War, and the Great Recession. America became measurably safer every year.',
    keyEvents: [
      '9/11 attacks reshape law enforcement priorities (2001)',
      'Department of Homeland Security created (2002)',
      'Great Recession (2007-2009)',
      'Crime continues declining despite economic crisis',
      'Rise of DNA evidence and forensic technology',
    ],
    policyChanges: [
      'USA PATRIOT Act (2001)',
      'Creation of Department of Homeland Security',
      'Federal Assault Weapons Ban expires (2004)',
      'Adam Walsh Child Protection Act (2006)',
      'Second Chance Act for prisoner reentry (2008)',
    ],
    notableCases: [
      'DC Sniper attacks (2002)',
      'BTK Killer captured (2005)',
      'Virginia Tech shooting (2007)',
      'Bernie Madoff arrested (2008)',
    ],
    defining: 'The 2000s proved the crime decline was not a fluke. Even as America faced terrorism, wars, and economic collapse, crime kept falling. Law enforcement shifted resources toward counterterrorism post-9/11, yet domestic crime continued its downward trajectory. The decade saw the rise of surveillance technology and data-driven policing.',
  },
  '2010s': {
    label: '2010s',
    startYear: 2010,
    endYear: 2019,
    description: 'Crime reached historic lows, but the decade ended with rising tensions around policing, mass shootings, and the opioid epidemic.',
    keyEvents: [
      'Crime reaches 50-year lows (2014)',
      'Ferguson protests and Black Lives Matter movement (2014)',
      'Opioid epidemic declared a public health emergency',
      'Mass shootings: Sandy Hook, Pulse, Las Vegas, Parkland',
      'Slight uptick in violent crime (2015-2016), the "Ferguson Effect" debate',
    ],
    policyChanges: [
      'First Step Act — federal criminal justice reform (2018)',
      'Marijuana legalization spreads (Colorado, Washington first in 2012)',
      'Police body camera adoption accelerates',
      'Ban the Box movement for employment applications',
      'Bail reform efforts in multiple states',
    ],
    notableCases: [
      'Sandy Hook school shooting (2012)',
      'Boston Marathon bombing (2013)',
      'Charleston church shooting (2015)',
      'Pulse nightclub shooting (2016)',
      'Las Vegas mass shooting (2017)',
      'Parkland school shooting (2018)',
    ],
    defining: 'The 2010s brought crime to generational lows but also exposed deep fractures in the relationship between police and communities. The killings of Trayvon Martin, Michael Brown, Eric Garner, and others sparked a national reckoning. Mass shootings became grimly routine. The opioid epidemic killed tens of thousands annually, reshaping drug-related crime.',
  },
  '2020s': {
    label: '2020s',
    startYear: 2020,
    endYear: 2024,
    description: 'The pandemic disrupted everything, including crime. Murder surged 30% in 2020 — the largest single-year increase ever — then began declining.',
    keyEvents: [
      'COVID-19 pandemic disrupts society (2020)',
      'George Floyd murder and nationwide protests (2020)',
      'Murder surges 30% in 2020 — largest one-year increase on record',
      'Organized retail theft becomes national concern',
      'Crime begins declining again (2023-2024)',
    ],
    policyChanges: [
      'Defund the Police movement and backlash',
      'Bipartisan Safer Communities Act — first federal gun law in decades (2022)',
      'Bail reform debates intensify',
      'Police reform legislation in multiple cities',
      'Fentanyl-related sentencing changes',
    ],
    notableCases: [
      'George Floyd murder and Derek Chauvin trial (2020-2021)',
      'Capitol riot (January 6, 2021)',
      'Uvalde school shooting (2022)',
      'FTX crypto fraud (2022)',
      'Idaho student murders (2022)',
    ],
    defining: 'The 2020s opened with an unprecedented disruption. COVID-19 closed courts, reduced police patrols, and strained social services. The murder of George Floyd ignited the largest protest movement in US history. Murder spiked 30% in 2020 — the biggest one-year increase ever recorded. But by 2023-2024, crime was falling again, with some cities reaching pre-pandemic or even historic lows.',
  },
};

export async function generateStaticParams() {
  return Object.keys(DECADES).map(decade => ({ decade }));
}

type Props = { params: Promise<{ decade: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { decade } = await params;
  const info = DECADES[decade];
  if (!info) return {};
  return {
    title: `Crime in the ${info.label}: What Happened to Crime in America`,
    description: `Crime trends, key events, and policy changes of the ${info.label}. How violent crime, murder rates, and property crime changed during this era.`,
    alternates: { canonical: `https://www.opencrime.us/decades/${decade}` },
    openGraph: {
      title: `Crime in the ${info.label}`,
      description: info.description,
      url: `https://www.opencrime.us/decades/${decade}`,
    },
  };
}

export default async function DecadePage({ params }: Props) {
  const { decade } = await params;
  const info = DECADES[decade];
  if (!info) notFound();

  const national = loadData<NationalTrend[]>('national-trends.json');
  const decadeData = national.filter(n => n.year >= info.startYear && n.year <= info.endYear);

  const first = decadeData[0];
  const last = decadeData[decadeData.length - 1];

  const violentChange = first && last ? ((last.violentRate - first.violentRate) / first.violentRate * 100) : 0;
  const propertyChange = first && last ? ((last.propertyRate - first.propertyRate) / first.propertyRate * 100) : 0;
  const homicideChange = first && last ? ((last.homicideRate - first.homicideRate) / first.homicideRate * 100) : 0;

  const aiInsights = [
    first && last ? `Violent crime rate: ${fmtRate(first.violentRate)} (${first.year}) → ${fmtRate(last.violentRate)} (${last.year}) — ${violentChange > 0 ? '+' : ''}${violentChange.toFixed(1)}%` : '',
    first && last ? `Homicide rate: ${fmtRate(first.homicideRate)} → ${fmtRate(last.homicideRate)} per 100K — ${homicideChange > 0 ? '+' : ''}${homicideChange.toFixed(1)}%` : '',
    first && last ? `Property crime rate: ${fmtRate(first.propertyRate)} → ${fmtRate(last.propertyRate)} — ${propertyChange > 0 ? '+' : ''}${propertyChange.toFixed(1)}%` : '',
    info.keyEvents[0],
  ].filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Decades', href: '/decades' }, { label: info.label }]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
        Crime in the {info.label}
      </h1>
      <p className="text-lg text-gray-600 mb-6">{info.description}</p>

      <AIOverview insights={aiInsights} />

      {/* Start vs End */}
      {first && last && (
        <section className="mb-10">
          <h2 className="font-heading text-2xl font-bold mb-4">Start vs End of Decade</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: 'Violent Crime Rate', start: first.violentRate, end: last.violentRate, change: violentChange },
              { label: 'Homicide Rate', start: first.homicideRate, end: last.homicideRate, change: homicideChange },
              { label: 'Property Crime Rate', start: first.propertyRate, end: last.propertyRate, change: propertyChange },
            ].map(m => (
              <div key={m.label} className="bg-white rounded-xl border p-5">
                <div className="text-sm text-gray-500 mb-2">{m.label}</div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs text-gray-400">{first.year}</div>
                    <div className="text-xl font-bold">{fmtRate(m.start)}</div>
                  </div>
                  <div className={`text-lg font-bold ${m.change < 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {m.change > 0 ? '↑' : '↓'} {Math.abs(m.change).toFixed(1)}%
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">{last.year}</div>
                    <div className="text-xl font-bold">{fmtRate(m.end)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Year-by-Year Data */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">Year-by-Year Crime Rates</h2>
        <div className="bg-white rounded-xl border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Year</th>
                <th className="text-right p-3 font-semibold">Violent Rate</th>
                <th className="text-right p-3 font-semibold">Homicide Rate</th>
                <th className="text-right p-3 font-semibold">Property Rate</th>
                <th className="text-right p-3 font-semibold">Population</th>
              </tr>
            </thead>
            <tbody>
              {decadeData.map(d => (
                <tr key={d.year} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <Link href={`/years/${d.year}`} className="text-[#1e3a5f] hover:underline font-medium">{d.year}</Link>
                  </td>
                  <td className="text-right p-3">{fmtRate(d.violentRate)}</td>
                  <td className="text-right p-3">{fmtRate(d.homicideRate)}</td>
                  <td className="text-right p-3">{fmtRate(d.propertyRate)}</td>
                  <td className="text-right p-3">{fmtNum(d.population)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* What Defined This Era */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">What Defined This Era</h2>
        <div className="bg-gray-50 rounded-xl border p-6">
          <p className="text-gray-800 leading-relaxed">{info.defining}</p>
        </div>
      </section>

      {/* Key Events */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">Key Events</h2>
        <ul className="space-y-2">
          {info.keyEvents.map((e, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="text-[#1e3a5f] font-bold mt-0.5">•</span>
              <span className="text-gray-700">{e}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Policy Changes */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">Policy Changes</h2>
        <ul className="space-y-2">
          {info.policyChanges.map((p, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="text-amber-600 font-bold mt-0.5">⚖</span>
              <span className="text-gray-700">{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Notable Cases */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">Notable Cases & Events</h2>
        <ul className="space-y-2">
          {info.notableCases.map((c, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="text-red-600 font-bold mt-0.5">▸</span>
              <span className="text-gray-700">{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <ShareButtons title={`Crime in the ${info.label}`} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `Crime in the ${info.label}`,
        description: info.description,
        url: `https://www.opencrime.us/decades/${decade}`,
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: `What happened to crime in the ${info.label}?`, acceptedAnswer: { '@type': 'Answer', text: info.defining }},
          { '@type': 'Question', name: `Did crime go up or down in the ${info.label}?`, acceptedAnswer: { '@type': 'Answer', text: first && last ? `Violent crime ${violentChange > 0 ? 'increased' : 'decreased'} ${Math.abs(violentChange).toFixed(1)}% from ${fmtRate(first.violentRate)} to ${fmtRate(last.violentRate)} per 100K between ${first.year} and ${last.year}.` : '' }},
          { '@type': 'Question', name: `What were the major crime events of the ${info.label}?`, acceptedAnswer: { '@type': 'Answer', text: info.keyEvents.join('. ') }},
        ],
      })}} />
    </div>
  );
}
