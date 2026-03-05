import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import AIOverview from '@/components/AIOverview';
import { VictimRaceChart, OffenderRaceChart, OffenderAgeChart, GenderPieChart } from './DemographicsCharts';

type VictimRace = { race: string; total: number; male: number; female: number };
type VictimEthnicity = { ethnicity: string; total: number; male: number; female: number };
type OffenderRace = { race: string; total: number; pct: number };
type OffenderEthnicity = { ethnicity: string; total: number; pct: number };
type OffenderAge = { range: string; total: number; pct: number };
type VORaceGroup = { total: number; byWhite: number; byBlack: number; byOther: number; unknown: number };
type DemographicsData = {
  victimRace: VictimRace[];
  victimEthnicity: VictimEthnicity[];
  totalVictims: { total: number; male: number; female: number; unknown: number };
  offenderRace: OffenderRace[];
  offenderEthnicity: OffenderEthnicity[];
  totalOffenders: { total: number; male: number; female: number; unknown: number };
  offenderAge: OffenderAge[];
  victimOffenderRace: {
    whiteVictim: VORaceGroup;
    blackVictim: VORaceGroup;
    otherVictim: VORaceGroup;
    unknownVictim: VORaceGroup;
  };
};

export const metadata: Metadata = {
  title: 'Homicide Demographics 2023 — Victim & Offender Data by Race, Age, Gender',
  description: 'FBI Supplementary Homicide Report demographics: 15,795 victims (77% male), offender race, age, gender, and victim-offender racial cross-tabulation. 2023 data.',
  openGraph: {
    url: 'https://www.opencrime.us/homicide-demographics',
    title: 'Homicide Demographics 2023 — Victim & Offender Data',
    description: 'Complete FBI data on who kills whom in America. 15,795 homicide victims analyzed by race, gender, ethnicity, and relationship to offender.',
  },
  alternates: { canonical: 'https://www.opencrime.us/homicide-demographics' },
};

export default function HomicideDemographicsPage() {
  const d = loadData<DemographicsData>('homicide-demographics.json');
  const malePct = ((d.totalVictims.male / d.totalVictims.total) * 100).toFixed(0);
  const femalePct = ((d.totalVictims.female / d.totalVictims.total) * 100).toFixed(0);
  const offMalePct = ((d.totalOffenders.male / (d.totalOffenders.total - d.totalOffenders.unknown)) * 100).toFixed(0);

  const vo = d.victimOffenderRace;
  const whiteIntra = ((vo.whiteVictim.byWhite / vo.whiteVictim.total) * 100).toFixed(0);
  const blackIntra = ((vo.blackVictim.byBlack / vo.blackVictim.total) * 100).toFixed(0);

  const insights = [
    `${fmtNum(d.totalVictims.total)} homicide victims in 2023 — ${malePct}% male, ${femalePct}% female`,
    `Black Americans are 51.6% of victims despite being ~13.7% of the population`,
    `${whiteIntra}% of white victims were killed by white offenders; ${blackIntra}% of Black victims by Black offenders`,
    `22% of known offenders are aged 18–24 — the peak offending age group`,
    `${fmtNum(d.totalOffenders.unknown)} offenders (${((d.totalOffenders.unknown / d.totalOffenders.total) * 100).toFixed(0)}%) have unknown demographics — reflecting unsolved cases`,
  ];

  const crossTab = [
    { victimRace: 'White', ...vo.whiteVictim },
    { victimRace: 'Black', ...vo.blackVictim },
    { victimRace: 'Other', ...vo.otherVictim },
    { victimRace: 'Unknown', ...vo.unknownVictim },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Homicide Demographics 2023' }]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Homicide Demographics 2023</h1>
      <p className="text-lg text-gray-600 mb-6">
        A comprehensive breakdown of homicide victims and offenders in the United States by race, gender, ethnicity, and age —
        plus who kills whom across racial lines. Based on FBI Supplementary Homicide Reports (SHR).
      </p>

      <ShareButtons title="Homicide Demographics 2023 — FBI Data" />

      <AIOverview insights={insights} />

      {/* Hero Stats */}
      <div className="bg-[#1e3a5f] text-white rounded-xl p-8 mb-8 mt-6">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold">{fmtNum(d.totalVictims.total)}</div>
            <div className="text-blue-200 text-sm">Total Victims</div>
          </div>
          <div>
            <div className="text-4xl font-bold">{malePct}%</div>
            <div className="text-blue-200 text-sm">Male Victims</div>
          </div>
          <div>
            <div className="text-4xl font-bold">{fmtNum(d.totalOffenders.total)}</div>
            <div className="text-blue-200 text-sm">Total Offenders</div>
          </div>
          <div>
            <div className="text-4xl font-bold">{offMalePct}%</div>
            <div className="text-blue-200 text-sm">Male Offenders (known)</div>
          </div>
        </div>
      </div>

      {/* Victim Demographics */}
      <h2 className="font-heading text-2xl font-bold mb-4">Victim Demographics</h2>
      <p className="text-gray-600 mb-6">
        Of the {fmtNum(d.totalVictims.total)} homicide victims reported in the FBI&apos;s 2023 Supplementary Homicide Reports,
        {' '}{fmtNum(d.totalVictims.male)} ({malePct}%) were male and {fmtNum(d.totalVictims.female)} ({femalePct}%) were female.
        Black Americans were disproportionately represented, comprising {fmtNum(d.victimRace.find(r => r.race === 'Black')?.total ?? 0)} victims
        ({((d.victimRace.find(r => r.race === 'Black')?.total ?? 0) / d.totalVictims.total * 100).toFixed(1)}% of all victims).
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <VictimRaceChart data={d.victimRace} />
        <GenderPieChart male={d.totalVictims.male} female={d.totalVictims.female} unknown={d.totalVictims.unknown} label="Victims" />
      </div>

      {/* Victim Race Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
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
            {d.victimRace.map(r => (
              <tr key={r.race} className="border-t">
                <td className="px-4 py-2 font-medium">{r.race}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(r.total)}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(r.male)}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(r.female)}</td>
                <td className="px-4 py-2 text-right font-mono">{(r.total / d.totalVictims.total * 100).toFixed(1)}%</td>
              </tr>
            ))}
            <tr className="border-t font-semibold bg-gray-50">
              <td className="px-4 py-2">Total</td>
              <td className="px-4 py-2 text-right font-mono">{fmtNum(d.totalVictims.total)}</td>
              <td className="px-4 py-2 text-right font-mono">{fmtNum(d.totalVictims.male)}</td>
              <td className="px-4 py-2 text-right font-mono">{fmtNum(d.totalVictims.female)}</td>
              <td className="px-4 py-2 text-right font-mono">100%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Victim Ethnicity */}
      <h3 className="font-heading text-xl font-bold mb-3">Victim Ethnicity</h3>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Ethnicity</th>
              <th className="text-right px-4 py-2">Total</th>
              <th className="text-right px-4 py-2">Male</th>
              <th className="text-right px-4 py-2">Female</th>
              <th className="text-right px-4 py-2">% of Known</th>
            </tr>
          </thead>
          <tbody>
            {d.victimEthnicity.map(e => (
              <tr key={e.ethnicity} className="border-t">
                <td className="px-4 py-2 font-medium">{e.ethnicity}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(e.total)}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(e.male)}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(e.female)}</td>
                <td className="px-4 py-2 text-right font-mono">{(e.total / d.victimEthnicity.reduce((s, x) => s + x.total, 0) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Offender Demographics */}
      <h2 className="font-heading text-2xl font-bold mb-4">Offender Demographics</h2>
      <p className="text-gray-600 mb-6">
        The FBI recorded {fmtNum(d.totalOffenders.total)} offenders in homicide incidents. Of those with known gender,
        {' '}{offMalePct}% were male. A significant {fmtNum(d.totalOffenders.unknown)} offenders have unknown demographics,
        largely reflecting cases where no arrest was made.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <OffenderRaceChart data={d.offenderRace} />
        <GenderPieChart male={d.totalOffenders.male} female={d.totalOffenders.female} unknown={d.totalOffenders.unknown} label="Offenders" />
      </div>

      {/* Offender Race Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Race</th>
              <th className="text-right px-4 py-2">Total</th>
              <th className="text-right px-4 py-2">% of All</th>
            </tr>
          </thead>
          <tbody>
            {d.offenderRace.map(r => (
              <tr key={r.race} className="border-t">
                <td className="px-4 py-2 font-medium">{r.race}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(r.total)}</td>
                <td className="px-4 py-2 text-right font-mono">{r.pct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Offender Age */}
      <h3 className="font-heading text-xl font-bold mb-3">Offender Age Distribution</h3>
      <OffenderAgeChart data={d.offenderAge} />

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Age Range</th>
              <th className="text-right px-4 py-2">Total</th>
              <th className="text-right px-4 py-2">% of All</th>
            </tr>
          </thead>
          <tbody>
            {d.offenderAge.map(a => (
              <tr key={a.range} className="border-t">
                <td className="px-4 py-2 font-medium">{a.range}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(a.total)}</td>
                <td className="px-4 py-2 text-right font-mono">{a.pct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Offender Ethnicity */}
      <h3 className="font-heading text-xl font-bold mb-3">Offender Ethnicity</h3>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Ethnicity</th>
              <th className="text-right px-4 py-2">Total</th>
              <th className="text-right px-4 py-2">% of All</th>
            </tr>
          </thead>
          <tbody>
            {d.offenderEthnicity.map(e => (
              <tr key={e.ethnicity} className="border-t">
                <td className="px-4 py-2 font-medium">{e.ethnicity}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(e.total)}</td>
                <td className="px-4 py-2 text-right font-mono">{e.pct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Victim-Offender Racial Cross-Tab */}
      <h2 className="font-heading text-2xl font-bold mb-4">Victim–Offender Race Matrix</h2>
      <p className="text-gray-600 mb-4">
        This cross-tabulation shows who kills whom by race, for single-victim/single-offender homicides where both races are known.
        The data overwhelmingly shows that homicide is <strong>intraracial</strong>: {whiteIntra}% of white victims were killed
        by white offenders, and {blackIntra}% of Black victims were killed by Black offenders.
      </p>

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Victim Race</th>
              <th className="text-right px-4 py-2">By White</th>
              <th className="text-right px-4 py-2">By Black</th>
              <th className="text-right px-4 py-2">By Other</th>
              <th className="text-right px-4 py-2">Unknown</th>
              <th className="text-right px-4 py-2 font-bold">Total</th>
            </tr>
          </thead>
          <tbody>
            {crossTab.map(r => (
              <tr key={r.victimRace} className="border-t">
                <td className="px-4 py-2 font-medium">{r.victimRace}</td>
                <td className={`px-4 py-2 text-right font-mono ${r.victimRace === 'White' ? 'bg-blue-50 font-bold' : ''}`}>{fmtNum(r.byWhite)}</td>
                <td className={`px-4 py-2 text-right font-mono ${r.victimRace === 'Black' ? 'bg-blue-50 font-bold' : ''}`}>{fmtNum(r.byBlack)}</td>
                <td className={`px-4 py-2 text-right font-mono ${r.victimRace === 'Other' ? 'bg-blue-50 font-bold' : ''}`}>{fmtNum(r.byOther)}</td>
                <td className="px-4 py-2 text-right font-mono text-gray-400">{fmtNum(r.unknown)}</td>
                <td className="px-4 py-2 text-right font-mono font-bold">{fmtNum(r.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key Insights */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <h3 className="font-heading font-bold text-red-800 mb-2">Disproportionate Victimization</h3>
          <p className="text-sm text-red-700">
            Black Americans make up ~13.7% of the US population but account for {((d.victimRace.find(r => r.race === 'Black')?.total ?? 0) / d.totalVictims.total * 100).toFixed(1)}%
            of homicide victims. Homicide is the leading cause of death for Black males aged 15–34.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-heading font-bold text-[#1e3a5f] mb-2">Intraracial Pattern</h3>
          <p className="text-sm text-gray-700">
            Most homicide is intraracial. {whiteIntra}% of white victims were killed by white offenders.
            {' '}{blackIntra}% of Black victims were killed by Black offenders. This reflects residential segregation and social networks.
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="font-heading font-bold text-amber-800 mb-2">Young Male Offenders</h3>
          <p className="text-sm text-amber-700">
            22% of known offenders are aged 18–24, making this the single largest age group. Combined with under-18 offenders,
            30% of homicide offenders are under 25 years old.
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
          <h3 className="font-heading font-bold text-gray-800 mb-2">The Unknown Problem</h3>
          <p className="text-sm text-gray-600">
            {fmtNum(d.totalOffenders.unknown)} offenders ({((d.totalOffenders.unknown / d.totalOffenders.total) * 100).toFixed(0)}%)
            have unknown demographics. This reflects the ~50% homicide clearance rate — many killers are never identified.
          </p>
        </div>
      </div>

      {/* Related Pages */}
      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">Related Pages</h2>
        <ul>
          <li><Link href="/analysis/homicide-in-america">Homicide in America — Deep Analysis</Link></li>
          <li><Link href="/murder-rate">US Murder Rate 2024</Link></li>
          <li><Link href="/analysis/murder-map">America&apos;s Murder Map</Link></li>
          <li><Link href="/who-are-victims">Who Are the Victims?</Link></li>
          <li><Link href="/analysis/crime-by-race">Crime by Race — FBI Data Breakdown</Link></li>
          <li><Link href="/analysis/who-commits-crime">Who Commits Crime in America</Link></li>
          <li><Link href="/analysis/women-and-crime">Women and Crime</Link></li>
        </ul>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        Source: FBI Supplementary Homicide Reports (SHR), 2023. Data reflects reported incidents and may undercount total homicides.
      </p>

      {/* JSON-LD Dataset Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: 'US Homicide Demographics 2023',
        description: 'FBI Supplementary Homicide Report data on victim and offender demographics including race, gender, ethnicity, and age.',
        url: 'https://www.opencrime.us/homicide-demographics',
        creator: { '@type': 'Organization', name: 'FBI', url: 'https://www.fbi.gov' },
        temporalCoverage: '2023',
        spatialCoverage: 'United States',
        license: 'https://creativecommons.org/publicdomain/zero/1.0/',
      })}} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How many homicide victims were there in the US in 2023?',
            acceptedAnswer: { '@type': 'Answer', text: `The FBI's Supplementary Homicide Reports recorded ${d.totalVictims.total.toLocaleString()} homicide victims in 2023. ${d.totalVictims.male.toLocaleString()} (${malePct}%) were male and ${d.totalVictims.female.toLocaleString()} (${femalePct}%) were female.` },
          },
          {
            '@type': 'Question',
            name: 'What race is most likely to be a homicide victim?',
            acceptedAnswer: { '@type': 'Answer', text: 'Black Americans are disproportionately victimized. They comprised 51.6% of homicide victims in 2023 (8,158 victims) despite being approximately 13.7% of the US population. White victims numbered 6,753 (42.8%).' },
          },
          {
            '@type': 'Question',
            name: 'Is most homicide intraracial?',
            acceptedAnswer: { '@type': 'Answer', text: `Yes. In single-victim/single-offender homicides, ${whiteIntra}% of white victims were killed by white offenders and ${blackIntra}% of Black victims were killed by Black offenders. Most homicide occurs within racial groups.` },
          },
          {
            '@type': 'Question',
            name: 'What age group commits the most homicides?',
            acceptedAnswer: { '@type': 'Answer', text: 'The 18–24 age group is the largest single offender group at 22% of all known offenders (4,263 individuals). Combined with under-18 offenders, 30% of homicide offenders are under 25.' },
          },
        ],
      })}} />
    </div>
  );
}
