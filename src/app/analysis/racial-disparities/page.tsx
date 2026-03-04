import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import { loadData, fmtNum, fmtPct } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import AIOverview from '@/components/AIOverview';

export const metadata: Metadata = {
  title: 'Crime Victimization: Who Bears the Burden? | OpenCrime',
  description: 'Homicide is the leading cause of death for Black males 15-34. FBI data reveals the stark geographic and demographic concentration of violent crime in America.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/racial-disparities' },
  openGraph: {
    title: 'Crime Victimization: Who Bears the Burden?',
    description: 'FBI data on demographic concentration of violent crime in America.',
    url: 'https://www.opencrime.us/analysis/racial-disparities',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crime Victimization: Who Bears the Burden?',
    description: 'FBI data on demographic concentration of violent crime in America.',
  },
};

type HomicideData = {
  victimRace: { race: string; count: number }[];
  victimAge: { range: string; count: number }[];
  victimSex: { sex: string; count: number }[];
  weaponBreakdown: { weapon: string; count: number }[];
  circumstanceBreakdown: { circumstance: string; count: number }[];
  relationship: { relationship: string; count: number }[];
};

type ArrestRaceRow = {
  offense: string;
  total: number;
  white: number;
  black: number;
  nativeAmerican: number;
  asian: number;
  pacificIslander: number;
};

type ArrestSexRow = {
  offense: string;
  total: number;
  male: number;
  female: number;
  malePct: number;
  femalePct: number;
};

type ArrestData = {
  byRace: ArrestRaceRow[];
  bySex: ArrestSexRow[];
};

export default function RacialDisparitiesPage() {
  const data = loadData<HomicideData>('homicide-data.json');
  const arrests = loadData<ArrestData>('arrest-data.json');
  const totalVictims = data.victimSex.reduce((s, v) => s + v.count, 0);

  // Arrest race data
  const raceTotal = arrests.byRace.find(r => r.offense === 'TOTAL');
  const raceMurder = arrests.byRace.find(r => r.offense === 'Murder and nonnegligent manslaughter');
  const raceRobbery = arrests.byRace.find(r => r.offense === 'Robbery');
  const raceAssault = arrests.byRace.find(r => r.offense === 'Aggravated assault');
  const raceViolent = arrests.byRace.find(r => r.offense === 'Violent crime');
  const raceProperty = arrests.byRace.find(r => r.offense === 'Property crime');
  const raceDrug = arrests.byRace.find(r => r.offense === 'Drug abuse violations');
  const raceDUI = arrests.byRace.find(r => r.offense === 'Driving under the influence');

  // Sex data
  const sexTotal = arrests.bySex.find(r => r.offense === 'TOTAL');
  const sexMurder = arrests.bySex.find(r => r.offense.includes('Murder'));
  const sexViolent = arrests.bySex.find(r => r.offense === 'Violent crime');

  // Key offense categories for race breakdown table
  const raceOffenses = [
    { label: 'All Arrests', data: raceTotal },
    { label: 'Violent Crime', data: raceViolent },
    { label: 'Murder', data: raceMurder },
    { label: 'Robbery', data: raceRobbery },
    { label: 'Aggravated Assault', data: raceAssault },
    { label: 'Property Crime', data: raceProperty },
    { label: 'Drug Violations', data: raceDrug },
    { label: 'DUI', data: raceDUI },
  ].filter(o => o.data);

  const pctOf = (part: number, whole: number) => whole > 0 ? (part / whole * 100).toFixed(1) : '—';

  // US population shares (2024 Census estimates) for per-capita context
  const popShares = { white: 58.9, black: 13.7, nativeAmerican: 1.3, asian: 6.3, pacificIslander: 0.3 };

  const maleVictimPct = data.victimSex.find(s => s.sex === 'Male');
  const maleVictimPctVal = maleVictimPct ? (maleVictimPct.count / totalVictims * 100).toFixed(0) : '78';

  const aiInsights = [
    'Roughly 1-2% of street segments in a city account for 25-50% of its crime, showing extreme geographic concentration',
    'Black Americans face 6-8x higher homicide victimization rates than whites, with homicide being the leading cause of death for Black males 15-34',
    'Young men aged 18-24 are both the most likely perpetrators and victims of violent crime across all demographics',
    'The racial disparity in homicide victimization has been narrowing since the 1990s as Black homicide rates fell more steeply',
    'Violence concentration maps precisely onto historical disinvestment, segregation, and lack of economic opportunity',
    `${maleVictimPctVal}% of murder victims are male — this gender disparity is the largest demographic gap in crime data`,
    'Arrest data shows racial disparities vary significantly by offense type — DUI arrests are 83% white, while robbery arrests are disproportionately Black',
    'Per-capita arrest rates must be understood in the context of poverty, policing patterns, and systemic factors — not as measures of inherent criminality',
  ];

  const faqItems = [
    {
      question: 'What race has the highest crime rate in America?',
      answer: 'Per-capita arrest rates are highest for Black Americans, but this reflects concentrated poverty, historical segregation, and policing patterns rather than inherent criminality. When controlling for poverty and neighborhood conditions, racial disparities in offending shrink dramatically.',
    },
    {
      question: 'Who are the most common murder victims in the US?',
      answer: `Young men aged 18-34 account for the largest share of murder victims. ${maleVictimPctVal}% of victims are male. Black Americans are disproportionately victimized, with homicide being the #1 cause of death for Black males 15-34.`,
    },
    {
      question: 'Why is there a racial disparity in crime statistics?',
      answer: 'Racial disparities in crime statistics reflect structural factors: concentrated poverty, historical segregation, lack of economic opportunity, and differential policing. Neighborhoods with the highest violence are those with decades of disinvestment regardless of predominant race.',
    },
    {
      question: 'Are crime statistics biased by race?',
      answer: 'Arrest statistics reflect both actual offending and policing decisions. Drug arrests, for example, show racial disparities that don\'t match self-reported drug use rates, suggesting enforcement bias. Victimization data (which relies on victim reports) is generally considered more reliable for violent crime patterns.',
    },
    {
      question: 'Is the racial gap in crime rates narrowing?',
      answer: 'Yes. The Black homicide rate has fallen more steeply than the white rate since the 1990s. The crack epidemic hit Black communities hardest, and its end brought the greatest relief to those same communities. The 2022-2024 decline has been especially pronounced in historically high-violence cities.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{label:'Analysis',href:'/analysis'},{label:'Crime Victimization'}]} />
      <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">ANALYSIS</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">Crime Victimization: Who Bears the Burden?</h1>
      <p className="text-lg text-gray-600 mb-2">
        Crime in America is not distributed equally. It concentrates in specific neighborhoods, among 
        specific demographics, with devastating consequences for the communities that bear the heaviest burden.
        Here&apos;s what the FBI data actually shows — and what it means.
      </p>
      <p className="text-sm text-gray-400 mb-8">Updated March 2026 · Source: FBI Crime Data Explorer, Expanded Homicide Data, Arrest Tables 2024</p>

      <AIOverview insights={aiInsights} />

      {/* === Hero Stats === */}
      <div className="bg-gray-900 text-white rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">#1</div>
            <div className="text-gray-300 text-sm">Cause of Death, Black Males 15-34</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{maleVictimPctVal}%</div>
            <div className="text-gray-300 text-sm">Murder Victims Are Male</div>
          </div>
          <div>
            <div className="text-3xl font-bold">18-34</div>
            <div className="text-gray-300 text-sm">Peak Victimization Age</div>
          </div>
          <div>
            <div className="text-3xl font-bold">6-8×</div>
            <div className="text-gray-300 text-sm">Black vs White Homicide Rate</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Geography of Violence</h2>
        <p>
          Perhaps the most important fact about American crime is how concentrated it is. Studies consistently 
          show that roughly 1-2% of street segments in a city account for 25-50% of its crime. In most cities, 
          a handful of neighborhoods drive the vast majority of violence while most areas remain safe.
        </p>
        <p>
          This concentration is not random. It maps onto patterns of historical disinvestment, poverty, 
          segregation, and lack of economic opportunity. The neighborhoods with the highest violence are 
          overwhelmingly those that have experienced decades of redlining, white flight, industrial 
          abandonment, and government neglect. For a visual exploration, see 
          our <Link href="/analysis/murder-map">murder map</Link> showing exactly where homicides concentrate.
        </p>
        <p>
          This geographic concentration is why city-level crime rates can be misleading. Chicago&apos;s 
          South and West sides have homicide rates comparable to some of the most violent places on earth, 
          while the North Side and downtown are as safe as Copenhagen. Averaging them together obscures 
          the reality that specific communities bear almost all of the burden.
        </p>

        <h2 className="font-heading">Victim Demographics: The FBI Data</h2>
        <p>
          The FBI&apos;s expanded homicide data reveals stark demographic patterns. These numbers represent 
          the victims of homicide — the people whose lives are taken:
        </p>
      </div>

      {/* === Victim Race Table === */}
      {data.victimRace && data.victimRace.length > 0 && (
        <div className="not-prose bg-white rounded-xl shadow-sm border overflow-hidden my-6">
          <div className="bg-gray-50 px-4 py-2 font-semibold text-sm">Murder Victims by Race (2024 Expanded Homicide Data)</div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Race</th>
                <th className="text-right px-4 py-2">Victims</th>
                <th className="text-right px-4 py-2">% of Victims</th>
                <th className="text-right px-4 py-2">% of US Pop</th>
              </tr>
            </thead>
            <tbody>
              {data.victimRace.map(r => {
                const popPct = r.race === 'White' ? popShares.white : r.race === 'Black' ? popShares.black : r.race === 'Asian' ? popShares.asian : null;
                return (
                  <tr key={r.race} className="border-t">
                    <td className="px-4 py-2">{r.race}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtNum(r.count)}</td>
                    <td className="px-4 py-2 text-right font-mono">{pctOf(r.count, totalVictims)}%</td>
                    <td className="px-4 py-2 text-right font-mono text-gray-500">{popPct ? `${popPct}%` : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* === Victim Age Table === */}
      {data.victimAge && data.victimAge.length > 0 && (
        <div className="not-prose bg-white rounded-xl shadow-sm border overflow-hidden my-6">
          <div className="bg-gray-50 px-4 py-2 font-semibold text-sm">Murder Victims by Age</div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Age Range</th>
                <th className="text-right px-4 py-2">Victims</th>
                <th className="text-right px-4 py-2">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {data.victimAge.map(a => (
                <tr key={a.range} className="border-t">
                  <td className="px-4 py-2">{a.range}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtNum(a.count)}</td>
                  <td className="px-4 py-2 text-right font-mono">{pctOf(a.count, totalVictims)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* === Victim Sex Table === */}
      {data.victimSex && data.victimSex.length > 0 && (
        <div className="not-prose bg-white rounded-xl shadow-sm border overflow-hidden my-6">
          <div className="bg-gray-50 px-4 py-2 font-semibold text-sm">Murder Victims by Sex</div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Sex</th>
                <th className="text-right px-4 py-2">Victims</th>
                <th className="text-right px-4 py-2">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {data.victimSex.map(s => (
                <tr key={s.sex} className="border-t">
                  <td className="px-4 py-2">{s.sex}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtNum(s.count)}</td>
                  <td className="px-4 py-2 text-right font-mono">{pctOf(s.count, totalVictims)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Age-Crime Curve</h2>
        <p>
          Both offending and victimization peak sharply in the late teens and early twenties — what 
          criminologists call the &quot;age-crime curve.&quot; This pattern holds across all races, genders, 
          and countries. Young men aged 18-24 are both the most likely perpetrators and the most likely 
          victims of violent crime.
        </p>
        <p>
          This has profound implications. Anything that keeps young men alive and out of trouble through 
          their mid-twenties dramatically reduces their lifetime risk of both committing and suffering 
          violence. Programs like Cure Violence, READI Chicago, and Advance Peace target this exact 
          population — high-risk young men in high-violence neighborhoods — with mentoring, employment, 
          and conflict mediation.
        </p>
        <p>
          The age-crime curve also means that demographic shifts affect crime rates. When a city has a 
          bulge of 15-24 year old males, crime tends to rise. When that cohort ages into their 30s, 
          crime falls. This is one factor behind the <Link href="/analysis/crime-decline">Great Crime Decline</Link> — 
          the baby boomers aged out of peak crime years.
        </p>

        <h2 className="font-heading">Arrest Data by Race: The Full Picture</h2>
        <p>
          Beyond victimization, the FBI publishes arrest data broken down by race. These numbers are 
          important — but they must be understood in context. Arrests reflect both actual offending 
          and policing decisions about where and how aggressively to enforce. For a comprehensive 
          breakdown, see our <Link href="/analysis/crime-by-race">crime by race data analysis</Link>.
        </p>
      </div>

      {/* === Arrest Race Breakdown Table === */}
      <div className="not-prose bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <div className="bg-[#1e3a5f] text-white px-4 py-2 font-semibold text-sm">Arrests by Race — Key Offense Categories (2024)</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2">Offense</th>
                <th className="text-right px-3 py-2">Total</th>
                <th className="text-right px-3 py-2">White %</th>
                <th className="text-right px-3 py-2">Black %</th>
                <th className="text-right px-3 py-2">Native Am %</th>
                <th className="text-right px-3 py-2">Asian %</th>
                <th className="text-right px-3 py-2">Pac. Isl. %</th>
              </tr>
            </thead>
            <tbody>
              {raceOffenses.map(o => (
                <tr key={o.label} className={`border-t ${o.label === 'All Arrests' ? 'bg-gray-50 font-semibold' : ''}`}>
                  <td className="px-3 py-2">{o.label}</td>
                  <td className="px-3 py-2 text-right font-mono">{fmtNum(o.data!.total)}</td>
                  <td className="px-3 py-2 text-right font-mono">{pctOf(o.data!.white, o.data!.total)}%</td>
                  <td className="px-3 py-2 text-right font-mono">{pctOf(o.data!.black, o.data!.total)}%</td>
                  <td className="px-3 py-2 text-right font-mono text-gray-500">{pctOf(o.data!.nativeAmerican, o.data!.total)}%</td>
                  <td className="px-3 py-2 text-right font-mono text-gray-500">{pctOf(o.data!.asian, o.data!.total)}%</td>
                  <td className="px-3 py-2 text-right font-mono text-gray-500">{pctOf(o.data!.pacificIslander, o.data!.total)}%</td>
                </tr>
              ))}
              <tr className="border-t bg-blue-50 text-xs">
                <td className="px-3 py-2 italic">US Population Share</td>
                <td className="px-3 py-2"></td>
                <td className="px-3 py-2 text-right font-mono">{popShares.white}%</td>
                <td className="px-3 py-2 text-right font-mono">{popShares.black}%</td>
                <td className="px-3 py-2 text-right font-mono">{popShares.nativeAmerican}%</td>
                <td className="px-3 py-2 text-right font-mono">{popShares.asian}%</td>
                <td className="px-3 py-2 text-right font-mono">{popShares.pacificIslander}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <p>
          The arrest data reveals important patterns that vary dramatically by offense type:
        </p>
        <ul>
          <li><strong>DUI arrests</strong> are overwhelmingly white — reflecting both suburban driving patterns 
          and where DUI enforcement is concentrated.</li>
          <li><strong>Drug arrests</strong> show a racial composition closer to the overall population, though 
          research consistently shows that drug use rates are similar across races while arrest rates differ — 
          a strong indicator of enforcement bias.</li>
          <li><strong>Violent crime arrests</strong> show a significant Black overrepresentation relative 
          to population share, particularly for robbery and murder.</li>
          <li><strong>Property crime arrests</strong> are majority white, roughly proportional to population.</li>
        </ul>

        <h2 className="font-heading">The Gender Gap: The Biggest Disparity Nobody Talks About</h2>
        <p>
          The largest demographic disparity in crime data isn&apos;t race — it&apos;s sex. 
          {sexTotal && ` Males account for ${sexTotal.malePct}% of all arrests`}
          {sexMurder && ` and ${sexMurder.malePct}% of murder arrests`}. 
          On the victimization side, {maleVictimPctVal}% of murder victims are male.
        </p>
        <p>
          This gender gap dwarfs all racial disparities combined. Males are roughly 3-4 times more likely 
          to be arrested for any crime, and 8-10 times more likely to be arrested for murder, compared 
          to females. This pattern holds across every race, every country, and every historical period 
          for which we have data.
        </p>
        <p>
          The gender gap in crime is likely driven by a combination of testosterone, socialization, 
          risk-taking behavior, and social structures. For a deeper dive into the demographic 
          patterns, see our <Link href="/analysis/who-commits-crime">who commits crime analysis</Link>.
        </p>

        <h2 className="font-heading">Racial Disparities in Context</h2>
        <p>
          Black Americans are disproportionately affected by homicide — both as victims and as 
          arrested offenders. The Black homicide victimization rate is roughly 6-8 times the white 
          rate. For young Black men specifically, homicide is the leading cause of death.
        </p>
        <p>
          These numbers are real and devastating. But they require context to understand properly. 
          The disparity is not explained by any inherent characteristic. It maps precisely onto 
          structural factors — and we know this because the disparity <em>changes</em> when 
          conditions change:
        </p>
        <ul>
          <li><strong>Concentrated poverty.</strong> Black Americans are 2.5 times more likely to live 
          in poverty. When you compare crime rates in poor white neighborhoods vs. poor Black neighborhoods, 
          the gap shrinks dramatically. Poverty concentrates crime regardless of race. 
          See our <Link href="/analysis/crime-and-poverty">crime and poverty analysis</Link> for the data.</li>
          <li><strong>Historical segregation.</strong> Redlining, restrictive covenants, and discriminatory 
          housing policy concentrated Black Americans in specific neighborhoods, then systematically 
          disinvested from those neighborhoods for decades. The resulting lack of wealth, homeownership, 
          and intergenerational resources is directly linked to higher crime rates.</li>
          <li><strong>Lack of economic opportunity.</strong> Unemployment among young Black men is roughly 
          double the rate for white counterparts. Limited legal economic opportunity increases the pull 
          of illegal markets — drug dealing, theft, robbery — as alternatives.</li>
          <li><strong>Criminal justice feedback loops.</strong> Mass incarceration removed fathers from 
          homes, reduced community supervision of youth, and created barriers to employment that 
          perpetuate the conditions that generate crime. A man with a felony record faces dramatically 
          reduced job prospects, making recidivism more likely.</li>
          <li><strong>Policing patterns.</strong> Higher police presence in Black neighborhoods leads 
          to more arrests for the same behavior. Studies consistently show that Black and white Americans 
          use drugs at similar rates, but Black Americans are 3-4 times more likely to be arrested 
          for drug offenses.</li>
          <li><strong>Gun availability.</strong> The neighborhoods with the highest gun violence also 
          tend to have the highest rates of illegal gun possession, driven by both self-protection 
          in dangerous environments and criminal enterprise.</li>
        </ul>

        <h2 className="font-heading">The Victimization Gap Is Closing</h2>
        <p>
          There is encouraging news in the data. The racial disparity in homicide victimization, while 
          still enormous, has been narrowing. The Black homicide rate has fallen more steeply than the 
          white rate since the 1990s. The crack epidemic hit Black communities hardest, and its end 
          brought the greatest relief to those same communities.
        </p>
        <p>
          The 2020 murder spike temporarily widened the gap again — the pandemic-era violence increase 
          was concentrated in historically high-violence Black neighborhoods. But the 2022-2024 decline 
          has been especially pronounced in cities like Chicago, Philadelphia, Atlanta, and Detroit. 
          If current trends continue, the disparity could narrow to its lowest point on record.
        </p>
        <p>
          This trend fits the broader pattern of the <Link href="/analysis/crime-decline">Great Crime 
          Decline</Link> — the communities that suffered most during the crime wave of the late 1980s 
          and early 1990s have experienced the largest improvements.
        </p>

        <h2 className="font-heading">Weapon and Circumstance Data</h2>
        <p>
          The FBI&apos;s expanded homicide data also reveals how and why homicides occur:
        </p>
      </div>

      {/* === Weapon Breakdown === */}
      {data.weaponBreakdown && data.weaponBreakdown.length > 0 && (
        <div className="not-prose bg-white rounded-xl shadow-sm border overflow-hidden my-6">
          <div className="bg-gray-50 px-4 py-2 font-semibold text-sm">Homicide by Weapon Type</div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Weapon</th>
                <th className="text-right px-4 py-2">Count</th>
                <th className="text-right px-4 py-2">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {data.weaponBreakdown.slice(0, 10).map(w => (
                <tr key={w.weapon} className="border-t">
                  <td className="px-4 py-2">{w.weapon}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtNum(w.count)}</td>
                  <td className="px-4 py-2 text-right font-mono">{pctOf(w.count, totalVictims)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* === Relationship === */}
      {data.relationship && data.relationship.length > 0 && (
        <div className="not-prose bg-white rounded-xl shadow-sm border overflow-hidden my-6">
          <div className="bg-gray-50 px-4 py-2 font-semibold text-sm">Victim-Offender Relationship</div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Relationship</th>
                <th className="text-right px-4 py-2">Count</th>
                <th className="text-right px-4 py-2">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {data.relationship.slice(0, 10).map(r => (
                <tr key={r.relationship} className="border-t">
                  <td className="px-4 py-2">{r.relationship}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtNum(r.count)}</td>
                  <td className="px-4 py-2 text-right font-mono">{pctOf(r.count, totalVictims)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Uncomfortable Truth About Crime Data</h2>
        <p>
          Crime statistics are simultaneously the most important and the most abused data in public policy. 
          Both political sides cherry-pick the numbers that serve their narrative:
        </p>
        <ul>
          <li><strong>The right</strong> points to racial disparities in arrest data to argue that certain 
          communities are inherently more criminal, ignoring the structural factors that drive those 
          disparities and the evidence that disparities shrink when poverty is controlled for.</li>
          <li><strong>The left</strong> sometimes minimizes the reality that victimization patterns are 
          concentrated in specific communities, making it harder to direct resources where they&apos;re 
          needed most.</li>
        </ul>
        <p>
          The data-driven position is neither: crime patterns reflect structural conditions, not inherent 
          characteristics — but the patterns are real and have devastating consequences for the communities 
          affected. Pretending the disparities don&apos;t exist is as harmful as pretending they&apos;re 
          biological.
        </p>

        <h2 className="font-heading">Native American Crime: The Overlooked Crisis</h2>
        <p>
          Native Americans, who make up about {popShares.nativeAmerican}% of the US population, are 
          significantly overrepresented in arrest data 
          ({raceTotal ? pctOf(raceTotal.nativeAmerican, raceTotal.total) : '—'}% of all arrests). 
          This reflects extreme poverty on many reservations, jurisdictional chaos between tribal, 
          state, and federal law enforcement, and the legacy of deliberate government policy to 
          destroy Native communities.
        </p>
        <p>
          Violent victimization rates for Native Americans are among the highest of any demographic 
          group. The crisis of missing and murdered Indigenous women (MMIW) has received increased 
          attention in recent years, but the broader pattern of Native American victimization 
          remains underreported.
        </p>

        <h2 className="font-heading">What This Means for Policy</h2>
        <p>
          The concentration of violence means that targeted, place-based interventions can have outsized 
          impact. Rather than broad, expensive policies that spread resources thinly, the data argues for:
        </p>
        <ul>
          <li><strong>Investing in the most affected neighborhoods</strong> — not just policing but jobs, 
          housing, schools, and infrastructure. This isn&apos;t about government spending for its own 
          sake — it&apos;s about removing the conditions that generate crime.</li>
          <li><strong>Violence interruption programs</strong> that work with the highest-risk individuals. 
          These programs have shown 30-60% reductions in gun violence in targeted areas.</li>
          <li><strong>Victim services</strong> in communities where reporting to police is low due to 
          mistrust. Many victims in high-violence neighborhoods don&apos;t report because they don&apos;t 
          trust the system — a rational response to historical experience.</li>
          <li><strong>Economic opportunity.</strong> The strongest long-term crime reduction strategy is 
          creating legitimate pathways to economic success. This is where market-based approaches — 
          reducing regulatory barriers, improving schools through competition, creating enterprise 
          zones — can have the most impact.</li>
          <li><strong>Criminal justice reform</strong> that reduces the feedback loops. Shorter sentences 
          for non-violent offenses, better reentry programs, ban-the-box hiring policies, and expungement 
          of old records can reduce recidivism and break the cycle.</li>
        </ul>
        <p>
          The goal isn&apos;t to excuse violence but to understand its causes clearly enough to prevent it. 
          The data shows both the scale of the problem and, in its declining trends, the possibility 
          of continued progress.
        </p>

        <h2 className="font-heading">The Bottom Line</h2>
        <p>
          Crime victimization in America is concentrated — by geography, by age, by sex, and by race. 
          Young men in disadvantaged neighborhoods bear an extraordinary burden of violence. The data 
          demands both honest acknowledgment of these patterns and honest analysis of their causes.
        </p>
        <p>
          The government has spent trillions on crime over the decades — on policing, prisons, courts, 
          and bureaucracy. Yet the most effective crime reduction in American history (the post-1991 
          decline) happened largely despite government policy, not because of it. The lesson: create 
          conditions for human flourishing — economic opportunity, stable families, functional 
          communities — and crime takes care of itself.
        </p>
      </div>

      {/* === Cross-Links === */}
      <div className="bg-gray-50 rounded-xl p-6 my-8">
        <h3 className="font-heading text-lg font-bold mb-3">Explore Related Data</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <Link href="/analysis/crime-by-race" className="text-[#1e3a5f] hover:underline text-sm">Crime by Race — Complete FBI Data Breakdown →</Link>
          <Link href="/analysis/who-commits-crime" className="text-[#1e3a5f] hover:underline text-sm">Who Commits Crime in America →</Link>
          <Link href="/analysis/crime-and-poverty" className="text-[#1e3a5f] hover:underline text-sm">Crime and Poverty — What the Data Shows →</Link>
          <Link href="/analysis/murder-map" className="text-[#1e3a5f] hover:underline text-sm">America&apos;s Murder Map →</Link>
          <Link href="/analysis/gun-violence" className="text-[#1e3a5f] hover:underline text-sm">Gun Violence by the Numbers →</Link>
          <Link href="/analysis/crime-decline" className="text-[#1e3a5f] hover:underline text-sm">The Great Crime Decline →</Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/analysis/gun-violence" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Gun Violence</Link>
        <Link href="/analysis/domestic-violence" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Domestic Violence</Link>
        <Link href="/dashboard" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Dashboard</Link>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="racial-disparities" tags={['demographics', 'violence']} />
        <ShareButtons title="Crime Victimization: Who Bears the Burden?" />
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
        headline: 'Crime Victimization: Who Bears the Burden?',
        description: 'FBI data reveals the stark geographic and demographic concentration of violent crime in America.',
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        datePublished: '2026-03-04',
        dateModified: '2026-03-04',
        mainEntityOfPage: 'https://www.opencrime.us/analysis/racial-disparities',
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
