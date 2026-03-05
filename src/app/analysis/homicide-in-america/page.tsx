import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';

type VictimRace = { race: string; total: number; male: number; female: number };
type OffenderRace = { race: string; total: number; pct: number };
type OffenderAge = { range: string; total: number; pct: number };
type VORaceGroup = { total: number; byWhite: number; byBlack: number; byOther: number; unknown: number };
type DemographicsData = {
  victimRace: VictimRace[];
  victimEthnicity: { ethnicity: string; total: number; male: number; female: number }[];
  totalVictims: { total: number; male: number; female: number; unknown: number };
  offenderRace: OffenderRace[];
  offenderEthnicity: { ethnicity: string; total: number; pct: number }[];
  totalOffenders: { total: number; male: number; female: number; unknown: number };
  offenderAge: OffenderAge[];
  victimOffenderRace: { whiteVictim: VORaceGroup; blackVictim: VORaceGroup; otherVictim: VORaceGroup; unknownVictim: VORaceGroup };
};

export const metadata: Metadata = {
  title: 'Homicide in America — Who Kills Whom and Why',
  description: 'Deep analysis of US homicide patterns: 77% male victims, intraracial violence (85% of Black victims killed by Black offenders), age and gender gaps. FBI 2023 data.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/homicide-in-america' },
  openGraph: {
    url: 'https://www.opencrime.us/analysis/homicide-in-america',
    title: 'Homicide in America — Who Kills Whom',
    description: 'A data-driven deep dive into who kills whom in America. Race, gender, age, and the intraracial reality of homicide.',
  },
};

export default function HomicideInAmericaPage() {
  const d = loadData<DemographicsData>('homicide-demographics.json');
  const malePct = ((d.totalVictims.male / d.totalVictims.total) * 100).toFixed(0);
  const femalePct = ((d.totalVictims.female / d.totalVictims.total) * 100).toFixed(0);
  const knownOffenders = d.totalOffenders.total - d.totalOffenders.unknown;
  const offMalePct = ((d.totalOffenders.male / knownOffenders) * 100).toFixed(0);
  const offFemalePct = ((d.totalOffenders.female / knownOffenders) * 100).toFixed(0);

  const vo = d.victimOffenderRace;
  const whiteIntra = ((vo.whiteVictim.byWhite / vo.whiteVictim.total) * 100).toFixed(0);
  const blackIntra = ((vo.blackVictim.byBlack / vo.blackVictim.total) * 100).toFixed(0);

  const blackVictims = d.victimRace.find(r => r.race === 'Black')!;
  const whiteVictims = d.victimRace.find(r => r.race === 'White')!;

  const insights = [
    `${fmtNum(d.totalVictims.total)} Americans were murdered in 2023 — ${malePct}% were male`,
    `Black Americans are 51.6% of victims despite being ~13.7% of population`,
    `${whiteIntra}% of white victims killed by white offenders; ${blackIntra}% of Black victims by Black offenders`,
    `22% of offenders are aged 18–24 — the peak killing years`,
    `The gender gap: men are ${malePct}% of victims and ${offMalePct}% of known offenders`,
    `${fmtNum(d.totalOffenders.unknown)} offenders remain unidentified — reflecting low clearance rates`,
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Homicide in America' }]} />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Homicide in America: Who Kills Whom and Why</h1>
      <p className="text-lg text-gray-600 mb-6">
        Murder is the most tracked, most feared, and most misunderstood crime in America. The data tells a story
        that rarely matches the narrative: homicide is overwhelmingly intraracial, concentrated among young males,
        and deeply tied to geography and socioeconomic conditions.
      </p>

      <ShareButtons title="Homicide in America — Who Kills Whom" />

      <AIOverview insights={insights} />

      {/* The Scale */}
      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">The Scale of American Homicide</h2>
        <p>
          In 2023, the FBI&apos;s Supplementary Homicide Reports recorded <strong>{fmtNum(d.totalVictims.total)} murder victims</strong> in
          the United States. That&apos;s roughly 43 people killed every day — one every 33 minutes. While this number
          has declined significantly from the early 1990s peak, the United States still has a murder rate 5–10 times
          higher than most other developed nations.
        </p>
        <p>
          Behind every number is a person. But understanding the patterns — who is killed, who kills, and the
          relationship between victim and offender — is essential for effective prevention. The data reveals
          stark disparities that demand attention.
        </p>

        <h2 className="font-heading">The Gender Gap: A Male-Dominated Tragedy</h2>
        <p>
          The most consistent finding in homicide research worldwide is the gender gap. In the US in 2023:
        </p>
        <ul>
          <li><strong>{fmtNum(d.totalVictims.male)} male victims</strong> ({malePct}% of all homicides)</li>
          <li><strong>{fmtNum(d.totalVictims.female)} female victims</strong> ({femalePct}% of all homicides)</li>
          <li>{fmtNum(d.totalVictims.unknown)} victims with unknown gender</li>
        </ul>
        <p>
          Men are not just more likely to be killed — they are overwhelmingly more likely to kill. Among offenders
          with known gender, <strong>{offMalePct}% were male</strong> and only {offFemalePct}% were female. This means men are
          roughly {(d.totalOffenders.male / d.totalOffenders.female).toFixed(0)}x more likely than women to commit homicide.
        </p>
        <p>
          This gender disparity is not unique to the US — it appears in virtually every country and historical period.
          Criminologists attribute it to a combination of testosterone-linked aggression, socialization around violence,
          involvement in street crime and drug markets, and greater access to firearms among men.
        </p>
        <p>
          However, the female victimization pattern tells a different story. While men are typically killed by acquaintances
          or strangers in street violence, <Link href="/analysis/domestic-violence" className="text-[#1e3a5f] underline">over 40% of female murder victims</Link> are killed by intimate partners.
          Women&apos;s homicide risk is concentrated in the home, not on the street.
        </p>

        <h2 className="font-heading">Race and Victimization: The Unequal Burden</h2>
        <p>
          The racial disparity in homicide victimization is one of the starkest inequalities in American life:
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Victim Race</th>
              <th className="text-right px-4 py-2">Total</th>
              <th className="text-right px-4 py-2">% of Victims</th>
              <th className="text-right px-4 py-2">% of US Population</th>
              <th className="text-right px-4 py-2">Disparity Ratio</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">White</td>
              <td className="px-4 py-2 text-right font-mono">{fmtNum(whiteVictims.total)}</td>
              <td className="px-4 py-2 text-right font-mono">{(whiteVictims.total / d.totalVictims.total * 100).toFixed(1)}%</td>
              <td className="px-4 py-2 text-right font-mono">~61.6%</td>
              <td className="px-4 py-2 text-right font-mono">0.7x</td>
            </tr>
            <tr className="border-t bg-red-50">
              <td className="px-4 py-2 font-medium">Black</td>
              <td className="px-4 py-2 text-right font-mono">{fmtNum(blackVictims.total)}</td>
              <td className="px-4 py-2 text-right font-mono">{(blackVictims.total / d.totalVictims.total * 100).toFixed(1)}%</td>
              <td className="px-4 py-2 text-right font-mono">~13.7%</td>
              <td className="px-4 py-2 text-right font-mono text-red-600 font-bold">3.8x</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Other</td>
              <td className="px-4 py-2 text-right font-mono">{fmtNum(d.victimRace.find(r => r.race === 'Other')?.total ?? 0)}</td>
              <td className="px-4 py-2 text-right font-mono">{((d.victimRace.find(r => r.race === 'Other')?.total ?? 0) / d.totalVictims.total * 100).toFixed(1)}%</td>
              <td className="px-4 py-2 text-right font-mono">~24.7%</td>
              <td className="px-4 py-2 text-right font-mono">0.1x</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <p>
          Black Americans are murdered at roughly <strong>3.8 times</strong> their share of the population. This is not
          just a statistic — homicide is the <Link href="/who-are-victims" className="text-[#1e3a5f] underline">leading cause of death</Link> for Black males aged 15–34.
          For young Black men specifically, the homicide rate is approximately 10 times the national average.
        </p>
        <p>
          This disparity is driven by a complex web of factors: concentrated poverty, residential segregation,
          limited economic opportunity, historical disinvestment in Black communities, and unequal access to
          education and healthcare. As our <Link href="/analysis/crime-and-poverty" className="text-[#1e3a5f] underline">crime and poverty analysis</Link> shows,
          the correlation between economic conditions and violence is strong.
        </p>

        <h2 className="font-heading">The Intraracial Reality</h2>
        <p>
          One of the most important — and most politically misused — facts about homicide is that it is
          overwhelmingly <strong>intraracial</strong>. People are most likely to be killed by someone of the same race:
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Victim Race</th>
              <th className="text-right px-4 py-2">By White Offender</th>
              <th className="text-right px-4 py-2">By Black Offender</th>
              <th className="text-right px-4 py-2">By Other</th>
              <th className="text-right px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">White Victim</td>
              <td className="px-4 py-2 text-right font-mono bg-blue-50 font-bold">{fmtNum(vo.whiteVictim.byWhite)} ({whiteIntra}%)</td>
              <td className="px-4 py-2 text-right font-mono">{fmtNum(vo.whiteVictim.byBlack)}</td>
              <td className="px-4 py-2 text-right font-mono">{fmtNum(vo.whiteVictim.byOther)}</td>
              <td className="px-4 py-2 text-right font-mono font-bold">{fmtNum(vo.whiteVictim.total)}</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Black Victim</td>
              <td className="px-4 py-2 text-right font-mono">{fmtNum(vo.blackVictim.byWhite)}</td>
              <td className="px-4 py-2 text-right font-mono bg-blue-50 font-bold">{fmtNum(vo.blackVictim.byBlack)} ({blackIntra}%)</td>
              <td className="px-4 py-2 text-right font-mono">{fmtNum(vo.blackVictim.byOther)}</td>
              <td className="px-4 py-2 text-right font-mono font-bold">{fmtNum(vo.blackVictim.total)}</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Other Victim</td>
              <td className="px-4 py-2 text-right font-mono">{fmtNum(vo.otherVictim.byWhite)}</td>
              <td className="px-4 py-2 text-right font-mono">{fmtNum(vo.otherVictim.byBlack)}</td>
              <td className="px-4 py-2 text-right font-mono bg-blue-50 font-bold">{fmtNum(vo.otherVictim.byOther)}</td>
              <td className="px-4 py-2 text-right font-mono font-bold">{fmtNum(vo.otherVictim.total)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <p>
          <strong>{whiteIntra}% of white victims</strong> were killed by white offenders. <strong>{blackIntra}% of Black victims</strong> were
          killed by Black offenders. This pattern holds because homicide typically occurs between people who know each other
          and live in proximity — and America remains deeply residentially segregated.
        </p>
        <p>
          Cross-racial homicide does occur: {fmtNum(vo.whiteVictim.byBlack)} white victims were killed by Black offenders, and
          {' '}{fmtNum(vo.blackVictim.byWhite)} Black victims were killed by white offenders. But these represent minorities of
          each group&apos;s total. The narrative of interracial violence dominating American homicide is not supported by the data.
        </p>

        <h2 className="font-heading">The Age Profile: Young Men Killing Young Men</h2>
        <p>
          Homicide offending is heavily concentrated among young adults:
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Age Range</th>
              <th className="text-right px-4 py-2">Offenders</th>
              <th className="text-right px-4 py-2">% of Total</th>
            </tr>
          </thead>
          <tbody>
            {d.offenderAge.map(a => (
              <tr key={a.range} className={`border-t ${a.range === '18-24' ? 'bg-red-50 font-semibold' : ''}`}>
                <td className="px-4 py-2">{a.range}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(a.total)}</td>
                <td className="px-4 py-2 text-right font-mono">{a.pct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <p>
          The 18–24 age group accounts for <strong>22% of all offenders</strong> — the single largest group.
          When combined with the under-18 group, <strong>30% of homicide offenders are under 25</strong>.
          This age-crime curve is well-documented in criminology: criminal behavior peaks in late adolescence
          and early adulthood, then declines with age.
        </p>
        <p>
          This has profound policy implications. Interventions targeting young men — particularly in
          high-violence neighborhoods — have the greatest potential to reduce homicide. Programs like
          Cure Violence, Becoming a Man (BAM), and focused deterrence strategies have shown promising results
          precisely because they target this demographic peak.
        </p>

        <h2 className="font-heading">The Offender Race Profile</h2>
        <p>
          Offender demographics mirror victim demographics, reinforcing the intraracial pattern:
        </p>
        <ul>
          {d.offenderRace.map(r => (
            <li key={r.race}><strong>{r.race}:</strong> {fmtNum(r.total)} offenders ({r.pct}%)</li>
          ))}
        </ul>
        <p>
          The {fmtNum(d.offenderRace.find(r => r.race === 'Unknown')?.total ?? 0)} unknown offenders ({d.offenderRace.find(r => r.race === 'Unknown')?.pct}%)
          reflect a critical problem: the declining <Link href="/analysis/clearance-rates" className="text-[#1e3a5f] underline">homicide clearance rate</Link>.
          When roughly half of murders go unsolved, nearly a quarter of the offender data is missing entirely. This means the
          known offender demographics may not perfectly represent the true distribution.
        </p>

        <h2 className="font-heading">Ethnicity: The Hispanic Dimension</h2>
        <p>
          The FBI also tracks ethnicity separately from race. Among victims:
        </p>
        <ul>
          {d.victimEthnicity.map(e => (
            <li key={e.ethnicity}><strong>{e.ethnicity}:</strong> {fmtNum(e.total)} ({(e.total / d.totalVictims.total * 100).toFixed(1)}%)</li>
          ))}
        </ul>
        <p>
          Hispanic or Latino individuals represent about 19.1% of the US population and {(d.victimEthnicity.find(e => e.ethnicity === 'Hispanic or Latino')?.total ?? 0) / d.totalVictims.total * 100 > 0 ? ((d.victimEthnicity.find(e => e.ethnicity === 'Hispanic or Latino')?.total ?? 0) / d.totalVictims.total * 100).toFixed(1) : '?'}%
          of homicide victims — a moderate overrepresentation. However, ethnicity data has significant &quot;unknown&quot; rates,
          making definitive comparisons difficult.
        </p>

        <h2 className="font-heading">What the Data Cannot Tell Us</h2>
        <p>
          The FBI&apos;s Supplementary Homicide Reports are invaluable, but they have important limitations:
        </p>
        <ul>
          <li><strong>Reporting gaps:</strong> Not all agencies submit SHR data. The 15,795 victims here may undercount total US homicides.</li>
          <li><strong>Unknown offenders:</strong> With ~50% clearance rates, offender demographics are incomplete.</li>
          <li><strong>Context missing:</strong> The data shows who but not why. Gang involvement, domestic violence, drug markets, and random violence all look the same in aggregate tables.</li>
          <li><strong>Circumstance:</strong> We don&apos;t see whether a homicide was self-defense, gang-related, or a domestic killing from this demographic data alone.</li>
        </ul>

        <h2 className="font-heading">Policy Implications</h2>
        <p>
          The demographic patterns in homicide data point toward specific interventions:
        </p>
        <ol>
          <li><strong>Community violence intervention (CVI)</strong> programs that target young men in high-risk areas — because the age and gender concentration is extreme</li>
          <li><strong>Domestic violence prevention</strong> — because female homicide follows a fundamentally different pattern than male homicide (<Link href="/analysis/women-and-crime" className="text-[#1e3a5f] underline">see our analysis</Link>)</li>
          <li><strong>Economic investment</strong> in communities with concentrated poverty and violence — because the racial disparity is primarily driven by socioeconomic conditions, not race itself</li>
          <li><strong>Improving clearance rates</strong> — because the {((d.totalOffenders.unknown / d.totalOffenders.total) * 100).toFixed(0)}% unknown offender rate means thousands of killers face no consequences, eroding deterrence</li>
          <li><strong>Firearm policy</strong> — because guns are involved in roughly 77% of US homicides (<Link href="/analysis/gun-violence" className="text-[#1e3a5f] underline">see gun violence analysis</Link>)</li>
        </ol>

        <h2 className="font-heading">The Bottom Line</h2>
        <p>
          American homicide is not random. It is concentrated among young males, disproportionately affects Black communities,
          and is overwhelmingly intraracial. Understanding these patterns is not about assigning blame — it&apos;s about
          directing resources where they can save the most lives.
        </p>
        <p>
          The good news: <Link href="/analysis/crime-decline" className="text-[#1e3a5f] underline">homicide rates have fallen dramatically</Link> since the 1990s, and
          the 2024 data shows continued decline. The bad news: the racial disparity in victimization has barely narrowed.
          A Black man is still roughly 8 times more likely to be murdered than a white man. Until that gap closes,
          America cannot claim to have solved its homicide problem.
        </p>

        <h2 className="font-heading">Explore the Data</h2>
        <ul>
          <li><Link href="/homicide-demographics">Homicide Demographics — Full Data Tables</Link></li>
          <li><Link href="/murder-rate">US Murder Rate 2024</Link></li>
          <li><Link href="/analysis/murder-map">America&apos;s Murder Map</Link></li>
          <li><Link href="/analysis/who-commits-crime">Who Commits Crime in America</Link></li>
          <li><Link href="/who-are-victims">Who Are the Victims?</Link></li>
          <li><Link href="/analysis/women-and-crime">Women and Crime</Link></li>
          <li><Link href="/analysis/clearance-rates">Crime Clearance Rates</Link></li>
        </ul>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        Source: FBI Supplementary Homicide Reports (SHR), 2023. Population estimates from US Census Bureau.
      </p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Homicide in America: Who Kills Whom and Why',
        description: 'Deep analysis of US homicide demographics using FBI 2023 data. Race, gender, age, and intraracial patterns.',
        url: 'https://www.opencrime.us/analysis/homicide-in-america',
        author: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        datePublished: '2025-03-01',
        dateModified: '2025-03-01',
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What percentage of homicide victims are male?', acceptedAnswer: { '@type': 'Answer', text: `${malePct}% of homicide victims in 2023 were male (${d.totalVictims.male.toLocaleString()} out of ${d.totalVictims.total.toLocaleString()}). Men are also ${offMalePct}% of known offenders.` }},
          { '@type': 'Question', name: 'Is homicide mostly intraracial?', acceptedAnswer: { '@type': 'Answer', text: `Yes. ${whiteIntra}% of white victims were killed by white offenders and ${blackIntra}% of Black victims were killed by Black offenders. Most homicide occurs within racial groups due to residential proximity.` }},
          { '@type': 'Question', name: 'What age group commits the most murders?', acceptedAnswer: { '@type': 'Answer', text: 'The 18-24 age group commits 22% of all homicides, making it the peak offending age. 30% of homicide offenders are under 25 years old.' }},
          { '@type': 'Question', name: 'Why are Black Americans disproportionately affected by homicide?', acceptedAnswer: { '@type': 'Answer', text: 'Black Americans are 51.6% of homicide victims despite being ~13.7% of the population. This disparity is driven by concentrated poverty, residential segregation, historical disinvestment, and unequal access to economic opportunity — not race itself.' }},
        ],
      })}} />
    </div>
  );
}
