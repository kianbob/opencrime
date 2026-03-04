import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import AIOverview from '@/components/AIOverview';

export const metadata: Metadata = {
  title: 'Crime Victimization: Who Bears the Burden? — Race, Age & Gender Data',
  description: 'Homicide is the leading cause of death for Black males 15-34. FBI data reveals the stark geographic and demographic concentration of violent crime in America.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/racial-disparities' },
};

type VictimRace = { race: string; total: number; male: number; female: number };
type OffenderRace = { race: string; total: number; pct: number };
type VictimEth = { ethnicity: string; total: number; male: number; female: number };
type OffenderEth = { ethnicity: string; total: number; pct: number };
type OffenderAge = { range: string; total: number; pct: number };
type VictimOffenderRace = {
  whiteVictim: { total: number; byWhite: number; byBlack: number; byOther: number; unknown: number };
  blackVictim: { total: number; byWhite: number; byBlack: number; byOther: number; unknown: number };
  otherVictim: { total: number; byWhite: number; byBlack: number; byOther: number; unknown: number };
  unknownVictim: { total: number; byWhite: number; byBlack: number; byOther: number; unknown: number };
};
type RaceRow = { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number; pacificIslander: number };
type EthRow = { offense: string; totalEthnicity: number; hispanic: number; notHispanic: number; hispanicPct: number; notHispanicPct: number };

type HomicideData = {
  victimRace: VictimRace[];
  victimAge: { range: string; count: number }[];
  victimSex: { sex: string; count: number }[];
  victimEthnicity: VictimEth[];
  offenderRace: OffenderRace[];
  offenderEthnicity: OffenderEth[];
  offenderAge: OffenderAge[];
  victimOffenderRace: VictimOffenderRace;
  totalVictims: number;
  totalOffenders: number;
  relationship: { relationship: string; count: number }[];
};

export default function RacialDisparitiesPage() {
  const data = loadData<HomicideData>('homicide-data.json');
  const arrestData = loadData<{ byRace: RaceRow[]; byEthnicity: EthRow[] }>('arrest-data.json');
  const totalVictims = data.victimSex.reduce((s, v) => s + v.count, 0);
  const vor = data.victimOffenderRace;

  const raceTotal = arrestData.byRace.find(r => r.offense === 'TOTAL');
  const vcRace = arrestData.byRace.find(r => r.offense === 'Violent crime');
  const drugRace = arrestData.byRace.find(r => /Drug abuse/i.test(r.offense));
  const ethTotal = arrestData.byEthnicity.find(e => e.offense === 'TOTAL');

  const aiInsights = [
    "Roughly 1-2% of street segments in a city account for 25-50% of its crime, showing extreme geographic concentration",
    "Black Americans face 6-8x higher homicide victimization rates than whites, with homicide being the leading cause of death for Black males 15-34",
    `Black victims account for ${data.victimRace.find(r => r.race === 'Black')?.total ? fmtNum(data.victimRace.find(r => r.race === 'Black')!.total) : '8,158'} of ${fmtNum(totalVictims)} murder victims`,
    "Young men aged 18-24 are both the most likely perpetrators and victims of violent crime across all demographics",
    "Most homicide is intraracial: 77% of white victims killed by white offenders, 85% of Black victims killed by Black offenders",
    "Violence concentration maps precisely onto historical disinvestment, segregation, and lack of economic opportunity"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{label:'Analysis',href:'/analysis'},{label:'Crime Victimization'}]} />
      <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">ANALYSIS</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">Crime Victimization: Who Bears the Burden?</h1>
      <p className="text-lg text-gray-600 mb-8">
        Crime in America is not distributed equally. It concentrates in specific neighborhoods, among
        specific demographics, with devastating consequences for the communities that bear the heaviest burden.
        This analysis uses FBI expanded homicide data and national arrest statistics to map who is most affected.
      </p>

      <AIOverview insights={aiInsights} />

      <div className="bg-gray-900 text-white rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">#1</div>
            <div className="text-gray-300 text-sm">Cause of Death for Black Males 15-34</div>
          </div>
          <div>
            <div className="text-3xl font-bold">78%</div>
            <div className="text-gray-300 text-sm">of Murder Victims Are Male</div>
          </div>
          <div>
            <div className="text-3xl font-bold">18-34</div>
            <div className="text-gray-300 text-sm">Peak Victimization Age</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtNum(totalVictims)}</div>
            <div className="text-gray-300 text-sm">Total Murder Victims</div>
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
          abandonment, and government neglect.
        </p>
        <p>
          A landmark study by David Weisburd found that in Seattle, just 4.5% of street segments produced
          50% of crime. Similar concentrations have been documented in Boston, New York, Chicago, and
          virtually every city studied. This extreme concentration means that broad, citywide statistics
          can be misleading — most residents of even high-crime cities live in relatively safe neighborhoods.
        </p>

        <h2 className="font-heading">Murder Victim Demographics by Race</h2>
        <p>
          The FBI&apos;s Supplementary Homicide Report provides detailed demographic data on murder victims.
          The racial disparities are stark:
        </p>
      </div>

      {/* Victim Race Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <div className="bg-gray-50 px-4 py-2 font-semibold text-sm">Murder Victims by Race (2024)</div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Race</th>
              <th className="text-right px-4 py-2">Total</th>
              <th className="text-right px-4 py-2">Male</th>
              <th className="text-right px-4 py-2">Female</th>
              <th className="text-right px-4 py-2">% of Total</th>
            </tr>
          </thead>
          <tbody>
            {data.victimRace.map(r => (
              <tr key={r.race} className="border-t">
                <td className="px-4 py-2 font-medium">{r.race}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(r.total)}</td>
                <td className="px-4 py-2 text-right font-mono text-gray-500">{fmtNum(r.male)}</td>
                <td className="px-4 py-2 text-right font-mono text-gray-500">{fmtNum(r.female)}</td>
                <td className="px-4 py-2 text-right font-mono">{totalVictims > 0 ? (r.total / totalVictims * 100).toFixed(1) : '—'}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Victim Ethnicity */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <div className="bg-gray-50 px-4 py-2 font-semibold text-sm">Murder Victims by Ethnicity</div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Ethnicity</th>
              <th className="text-right px-4 py-2">Total</th>
              <th className="text-right px-4 py-2">Male</th>
              <th className="text-right px-4 py-2">Female</th>
            </tr>
          </thead>
          <tbody>
            {data.victimEthnicity.map(e => (
              <tr key={e.ethnicity} className="border-t">
                <td className="px-4 py-2">{e.ethnicity}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(e.total)}</td>
                <td className="px-4 py-2 text-right font-mono text-gray-500">{fmtNum(e.male)}</td>
                <td className="px-4 py-2 text-right font-mono text-gray-500">{fmtNum(e.female)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <p>
          Black Americans make up approximately 13.6% of the US population but account for
          over half of murder victims. White Americans make up about 59% of the population and
          represent roughly 43% of victims. This disparity — a roughly 6-8x higher victimization
          rate for Black Americans — has persisted for decades and is one of the most consequential
          public health facts in America.
        </p>
        <p>
          Hispanic or Latino victims account for {fmtNum(data.victimEthnicity.find(e => /Hispanic/i.test(e.ethnicity))?.total ?? 0)} murders —
          a significant number, though the Hispanic victimization rate is lower than the Black rate
          and closer to the white rate in many jurisdictions.
        </p>

        <h2 className="font-heading">Offender Demographics</h2>
        <p>
          The FBI also tracks the race of known offenders. A critical caveat: the &quot;Unknown&quot; category
          is large because many homicides remain unsolved. Clearance rates are lower in communities
          with less trust in police, which skews the known-offender data.
        </p>
      </div>

      {/* Offender Race */}
      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 font-semibold text-sm">Known Offenders by Race</div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Race</th>
                <th className="text-right px-4 py-2">Total</th>
                <th className="text-right px-4 py-2">%</th>
              </tr>
            </thead>
            <tbody>
              {data.offenderRace.map(r => (
                <tr key={r.race} className="border-t">
                  <td className="px-4 py-2">{r.race}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtNum(r.total)}</td>
                  <td className="px-4 py-2 text-right font-mono">{r.pct.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 font-semibold text-sm">Known Offenders by Ethnicity</div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Ethnicity</th>
                <th className="text-right px-4 py-2">Total</th>
                <th className="text-right px-4 py-2">%</th>
              </tr>
            </thead>
            <tbody>
              {data.offenderEthnicity.map(e => (
                <tr key={e.ethnicity} className="border-t">
                  <td className="px-4 py-2">{e.ethnicity}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtNum(e.total)}</td>
                  <td className="px-4 py-2 text-right font-mono">{e.pct.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Offender Age */}
      {data.offenderAge && data.offenderAge.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
          <div className="bg-gray-50 px-4 py-2 font-semibold text-sm">Offender Age Distribution</div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Age Range</th>
                <th className="text-right px-4 py-2">Total</th>
                <th className="text-right px-4 py-2">%</th>
              </tr>
            </thead>
            <tbody>
              {data.offenderAge.map(a => (
                <tr key={a.range} className="border-t">
                  <td className="px-4 py-2">{a.range}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtNum(a.total)}</td>
                  <td className="px-4 py-2 text-right font-mono">{a.pct.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Victim-Offender Cross-Tab */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <div className="bg-red-50 px-4 py-2 font-semibold text-sm">Victim–Offender Race Cross-Tabulation (Single Victim/Single Offender)</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-red-50">
              <tr>
                <th className="text-left px-3 py-2">Victim Race</th>
                <th className="text-right px-3 py-2">By White</th>
                <th className="text-right px-3 py-2">By Black</th>
                <th className="text-right px-3 py-2">By Other</th>
                <th className="text-right px-3 py-2">Unknown</th>
                <th className="text-right px-3 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'White Victim', d: vor.whiteVictim },
                { label: 'Black Victim', d: vor.blackVictim },
                { label: 'Other Race', d: vor.otherVictim },
                { label: 'Unknown Race', d: vor.unknownVictim },
              ].map(row => (
                <tr key={row.label} className="border-t">
                  <td className="px-3 py-2 font-medium">{row.label}</td>
                  <td className="px-3 py-2 text-right font-mono">{fmtNum(row.d.byWhite)}</td>
                  <td className="px-3 py-2 text-right font-mono">{fmtNum(row.d.byBlack)}</td>
                  <td className="px-3 py-2 text-right font-mono">{fmtNum(row.d.byOther)}</td>
                  <td className="px-3 py-2 text-right font-mono">{fmtNum(row.d.unknown)}</td>
                  <td className="px-3 py-2 text-right font-mono font-semibold">{fmtNum(row.d.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">Most Homicide Is Intraracial</h2>
        <p>
          The cross-tabulation reveals a critical fact: most homicide is intraracial. Of white victims
          in single-victim/single-offender incidents, {vor.whiteVictim.total > 0 ? (vor.whiteVictim.byWhite / vor.whiteVictim.total * 100).toFixed(0) : '77'}%
          were killed by white offenders. Of Black victims, {vor.blackVictim.total > 0 ? (vor.blackVictim.byBlack / vor.blackVictim.total * 100).toFixed(0) : '85'}%
          were killed by Black offenders.
        </p>
        <p>
          This pattern — people are most often victimized by people of their own race — holds across all
          racial groups and reflects the reality that most violence occurs between people who know each other
          and live in the same communities. Residential segregation means that social networks, and therefore
          conflicts, are often racially homogeneous.
        </p>
        <p>
          Interracial homicide does occur but represents a minority of cases. {fmtNum(vor.whiteVictim.byBlack)} white
          victims were killed by Black offenders, and {fmtNum(vor.blackVictim.byWhite)} Black victims were killed by
          white offenders. These numbers are often cited selectively to support narratives about interracial
          violence, but they must be understood in context: they represent a small fraction of total homicides.
        </p>

        <h2 className="font-heading">The Age-Crime Curve</h2>
        <p>
          Both offending and victimization peak sharply in the late teens and early twenties — what
          criminologists call the &quot;age-crime curve.&quot; This pattern holds across all races, genders,
          and countries. Young men aged 18-24 are both the most likely perpetrators and the most likely
          victims of violent crime.
        </p>
        <p>
          The offender age data shows this clearly: the 18-24 age group accounts for a disproportionate
          share of known offenders. Under-18 offenders account for {data.offenderAge.find(a => /Under 18/i.test(a.range))?.pct.toFixed(1) ?? '8'}%
          of known offenders — a significant number that underscores the importance of youth violence
          prevention programs.
        </p>
        <p>
          This has profound implications. Anything that keeps young men alive and out of trouble through
          their mid-twenties dramatically reduces their lifetime risk of both committing and suffering
          violence. Programs like Cure Violence, READI Chicago, and Advance Peace target this exact
          population — high-risk young men in high-violence neighborhoods — with mentoring, employment,
          and conflict mediation.
        </p>

        <h2 className="font-heading">Arrest Demographics: A Broader Picture</h2>
        <p>
          Beyond homicide, the FBI tracks the race of all individuals arrested. These numbers reveal
          patterns across all crime categories — and also reflect the significant influence of policing
          decisions on who gets counted.
        </p>
      </div>

      {/* National Arrest Demographics */}
      {raceTotal && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
          <div className="bg-gray-50 px-4 py-2 font-semibold text-sm">National Arrests by Race (All Offenses)</div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Race</th>
                <th className="text-right px-4 py-2">Total Arrests</th>
                <th className="text-right px-4 py-2">%</th>
                <th className="text-right px-4 py-2">Violent Crime</th>
                <th className="text-right px-4 py-2">Drug Offenses</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'White', k: 'white' as const },
                { label: 'Black', k: 'black' as const },
                { label: 'Native American', k: 'nativeAmerican' as const },
                { label: 'Asian', k: 'asian' as const },
                { label: 'Pacific Islander', k: 'pacificIslander' as const },
              ].map(row => (
                <tr key={row.label} className="border-t">
                  <td className="px-4 py-2">{row.label}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtNum(raceTotal[row.k])}</td>
                  <td className="px-4 py-2 text-right font-mono">{(raceTotal[row.k] / raceTotal.total * 100).toFixed(1)}%</td>
                  <td className="px-4 py-2 text-right font-mono text-gray-500">{fmtNum(vcRace?.[row.k] ?? 0)}</td>
                  <td className="px-4 py-2 text-right font-mono text-gray-500">{fmtNum(drugRace?.[row.k] ?? 0)}</td>
                </tr>
              ))}
              <tr className="border-t font-semibold bg-gray-50">
                <td className="px-4 py-2">Total</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(raceTotal.total)}</td>
                <td className="px-4 py-2 text-right font-mono">100%</td>
                <td className="px-4 py-2 text-right font-mono text-gray-500">{fmtNum(vcRace?.total ?? 0)}</td>
                <td className="px-4 py-2 text-right font-mono text-gray-500">{fmtNum(drugRace?.total ?? 0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {ethTotal && (
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-gray-900 text-white rounded-xl p-5 text-center">
            <div className="text-3xl font-bold">{ethTotal.hispanicPct}%</div>
            <div className="text-gray-300 text-sm">Hispanic/Latino Arrests</div>
            <div className="text-gray-400 text-xs mt-1">{fmtNum(ethTotal.hispanic)} of {fmtNum(ethTotal.totalEthnicity)}</div>
          </div>
          <div className="bg-gray-900 text-white rounded-xl p-5 text-center">
            <div className="text-3xl font-bold">{ethTotal.notHispanicPct}%</div>
            <div className="text-gray-300 text-sm">Not Hispanic/Latino</div>
            <div className="text-gray-400 text-xs mt-1">{fmtNum(ethTotal.notHispanic)} of {fmtNum(ethTotal.totalEthnicity)}</div>
          </div>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-6 text-sm text-amber-800">
        <strong>Critical context on arrest data:</strong> Arrest statistics reflect who police arrest, not who
        commits crime. Research consistently documents racial disparities in policing — including higher stop
        rates, search rates, and arrest rates for Black Americans even after controlling for crime rates.
        Drug arrests are a prime example: despite similar drug use rates across racial groups, Black Americans
        are arrested for drug offenses at 2-3x the rate of white Americans. These numbers must be interpreted
        with this context in mind.
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">Racial Disparities in Context</h2>
        <p>
          Black Americans are disproportionately affected by homicide. The Black homicide victimization
          rate is roughly 6-8 times the white rate — a disparity that has persisted for decades. For
          young Black men specifically, homicide is the leading cause of death, surpassing accidents,
          suicide, and disease.
        </p>
        <p>
          This disparity is not explained by any inherent characteristic. It maps precisely onto
          structural factors:
        </p>
        <ul>
          <li><strong>Concentrated poverty.</strong> Black Americans are 2.5 times more likely to live in poverty. Poverty concentrates crime regardless of race — poor white neighborhoods also have elevated crime rates.</li>
          <li><strong>Historical segregation.</strong> Redlining, restrictive covenants, and discriminatory housing policy concentrated Black Americans in specific neighborhoods, then systematically disinvested from those neighborhoods.</li>
          <li><strong>Lack of economic opportunity.</strong> Unemployment among young Black men is roughly double the rate for white counterparts. Limited legal economic opportunity increases the pull of illegal markets.</li>
          <li><strong>Criminal justice feedback loops.</strong> Mass incarceration removed fathers from homes, reduced community supervision of youth, and created barriers to employment that perpetuate the conditions that generate crime.</li>
          <li><strong>Gun availability.</strong> The neighborhoods with the highest gun violence also tend to have the highest rates of illegal gun possession, driven by both self-protection and criminal enterprise.</li>
          <li><strong>Policing disparities.</strong> Over-policing of minor offenses in Black neighborhoods creates criminal records that limit employment, while under-investigation of serious crimes leaves violence unchecked. Homicide clearance rates are lower in predominantly Black neighborhoods.</li>
        </ul>

        <h2 className="font-heading">The Hispanic/Latino Experience</h2>
        <p>
          Hispanic Americans have a homicide victimization rate that falls between the white and Black rates.
          The FBI data shows {fmtNum(data.victimEthnicity.find(e => /Hispanic/i.test(e.ethnicity))?.total ?? 0)} Hispanic
          murder victims, predominantly male. The Hispanic experience with crime and the criminal justice system
          is distinct — shaped by immigration status, language barriers, varying levels of trust in law enforcement,
          and geographic concentration in both high-opportunity and high-poverty areas.
        </p>
        <p>
          Notably, Hispanic arrest rates ({ethTotal?.hispanicPct ?? 22}% of total arrests) are roughly proportional
          to the Hispanic share of the US population (~19%), though this varies significantly by offense type
          and jurisdiction.
        </p>

        <h2 className="font-heading">Native American Communities</h2>
        <p>
          Native Americans face unique challenges that are often invisible in national crime statistics.
          Victimization rates on reservations are among the highest in the country, driven by jurisdictional
          complexity (tribal, state, and federal authority overlap), chronic underfunding of tribal law
          enforcement, and the legacy of forced displacement and cultural destruction.
        </p>
        <p>
          The Missing and Murdered Indigenous Women (MMIW) crisis has drawn attention to the
          disproportionate violence faced by Native women, who experience murder at rates 10 times
          the national average in some communities.
        </p>

        <h2 className="font-heading">The Drug Arrest Disparity</h2>
        <p>
          Drug enforcement illustrates how policing decisions — not just criminal behavior — shape arrest
          demographics. National household surveys consistently find that drug use rates are similar across
          racial groups (roughly 10-12% for whites, 12-14% for Blacks, 10-11% for Hispanics in the past year).
        </p>
        <p>
          Yet Black Americans are arrested for drug offenses at roughly 2.5 times the rate of white Americans.
          This disparity is driven by where police patrol, what neighborhoods receive saturation enforcement,
          and whether drug transactions happen in public spaces (more visible and easier to police) versus
          private residences.
        </p>
        <p>
          Marijuana legalization has reduced this disparity somewhat, as marijuana possession was the single
          most common drug arrest and one of the most racially disparate. But significant disparities remain
          for other drug categories.
        </p>

        <h2 className="font-heading">The Victimization Gap Is Closing</h2>
        <p>
          There is encouraging news in the data. The racial disparity in homicide victimization, while
          still enormous, has been narrowing. The Black homicide rate has fallen more steeply than the
          white rate since the 1990s. The crack epidemic hit Black communities hardest, and its end
          brought the greatest relief to those same communities.
        </p>
        <p>
          The 2020 murder spike temporarily widened the gap again, but the 2022-2024 decline has been
          especially pronounced in historically high-violence cities like Chicago, Philadelphia, and
          Atlanta. If current trends continue, the disparity could narrow to its lowest point on record.
        </p>

        <h2 className="font-heading">Understanding the Data Without Distortion</h2>
        <p>
          Crime statistics by race are among the most misused data in public discourse. Both sides of
          the political spectrum cherry-pick numbers to support predetermined conclusions. Some important
          principles for honest interpretation:
        </p>
        <ul>
          <li><strong>Correlation is not causation.</strong> Higher arrest rates among a demographic group do not mean that group is inherently more criminal. They reflect the intersection of poverty, opportunity, policing, and historical policy.</li>
          <li><strong>Arrests are not convictions.</strong> Being arrested does not mean someone committed a crime. Arrest rates reflect police behavior as much as criminal behavior.</li>
          <li><strong>Aggregate data masks individual experience.</strong> The vast majority of people in every racial group never commit a violent crime. Statistics about group rates say nothing about any individual.</li>
          <li><strong>Victimization matters most.</strong> The most important racial disparity in crime is not who commits it but who suffers from it. Black communities bear a disproportionate burden of violence — a public health crisis that deserves the same urgency as any other health disparity.</li>
          <li><strong>Context is everything.</strong> Raw percentages without population context, poverty rates, or historical background are misleading. Always ask: compared to what?</li>
        </ul>

        <h2 className="font-heading">What This Means for Policy</h2>
        <p>
          The concentration of violence means that targeted, place-based interventions can have outsized
          impact. Rather than broad, expensive policies that spread resources thinly, the data argues for:
        </p>
        <ul>
          <li><strong>Investing in the most affected neighborhoods</strong> — not just policing but jobs, housing, schools, and infrastructure</li>
          <li><strong>Violence interruption programs</strong> that work with the highest-risk individuals in the highest-risk age groups</li>
          <li><strong>Victim services</strong> in communities where reporting to police is low due to mistrust</li>
          <li><strong>Reforming drug enforcement</strong> to reduce racial disparities that undermine community trust</li>
          <li><strong>Improving homicide clearance rates</strong> in Black communities, where unsolved murders fuel cycles of retaliation</li>
          <li><strong>Addressing root causes</strong> — poverty, segregation, lack of opportunity — that create the conditions for violence</li>
          <li><strong>Supporting community-based organizations</strong> that have credibility and relationships in high-violence areas</li>
        </ul>
        <p>
          The goal isn&apos;t to excuse violence but to understand its causes clearly enough to prevent it.
          The data shows both the scale of the problem and, in its declining trends, the possibility
          of continued progress.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/arrest-demographics" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Full Arrest Demographics</Link>
        <Link href="/analysis/crime-by-race" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Crime by Race</Link>
        <Link href="/analysis/who-commits-crime" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Who Commits Crime?</Link>
        <Link href="/analysis/gun-violence" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Gun Violence</Link>
      </div>

      <div className="mt-8"><RelatedAnalysis currentSlug="racial-disparities" />

      <ShareButtons title="Crime Victimization: Who Bears the Burden?" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Crime Victimization: Who Bears the Burden?',
        publisher: { '@type': 'Organization', name: 'OpenCrime' },
        datePublished: '2026-03-04',
      })}} />
    </div>
  );
}
