import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import GunCharts from './GunCharts';

export const metadata: Metadata = {
  title: 'Gun Violence by the Numbers: What FBI Data Actually Shows',
  description: 'Firearms are used in 77% of US murders. Comprehensive analysis of FBI expanded homicide data: weapon types, trends, victim/offender demographics by race, and policy implications.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/gun-violence' },
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

type HomicideData = {
  weaponBreakdown: { weapon: string; count: number; pct: number }[];
  circumstanceBreakdown: { circumstance: string; count: number }[];
  victimAge: { range: string; count: number }[];
  victimSex: { sex: string; count: number }[];
  victimRace: VictimRace[];
  victimEthnicity: VictimEth[];
  offenderRace: OffenderRace[];
  offenderEthnicity: OffenderEth[];
  offenderAge: OffenderAge[];
  victimOffenderRace: VictimOffenderRace;
  totalVictims: number;
  totalOffenders: number;
  yearlyWeapons: { year: number; firearm: number; knife: number; other: number; hands: number }[];
  relationship: { relationship: string; count: number }[];
};

export default function GunViolencePage() {
  const data = loadData<HomicideData>('homicide-data.json');
  const totalMurders = data.weaponBreakdown.reduce((s, w) => s + w.count, 0);
  const firearms = data.weaponBreakdown.filter(w => w.weapon.toLowerCase().includes('firearm') || w.weapon.toLowerCase().includes('handgun') || w.weapon.toLowerCase().includes('rifle') || w.weapon.toLowerCase().includes('shotgun') || w.weapon.toLowerCase().includes('gun'));
  const firearmTotal = firearms.reduce((s, w) => s + w.count, 0);
  const firearmPct = (firearmTotal / totalMurders * 100).toFixed(1);
  const knives = data.weaponBreakdown.find(w => w.weapon.toLowerCase().includes('kniv') || w.weapon.toLowerCase().includes('cutting'));
  const hands = data.weaponBreakdown.find(w => w.weapon.toLowerCase().includes('hands') || w.weapon.toLowerCase().includes('personal'));

  const totalVictims = data.victimSex.reduce((s, v) => s + v.count, 0);
  const maleVictimPct = data.victimSex.find(v => v.sex === 'Male') ? ((data.victimSex.find(v => v.sex === 'Male')!.count / totalVictims) * 100).toFixed(0) : '78';
  const vor = data.victimOffenderRace;

  const aiInsights = [
    `Firearms are used in ${firearmPct}% of all US murders, far higher than any other weapon type`,
    `${fmtNum(firearmTotal)} Americans were murdered with firearms in 2024`,
    `Black Americans account for ${fmtNum(data.victimRace.find(r => r.race === 'Black')?.total ?? 0)} of ${fmtNum(totalVictims)} murder victims — a vastly disproportionate burden`,
    `Known offenders: White 31.2%, Black 43.1%, Unknown 23.6% — unsolved cases skew these numbers`,
    `Handguns account for the majority of firearm homicides; rifles represent a small fraction`,
    `The US firearm homicide rate is 25x higher than other high-income countries`,
    `Young men 18-24 account for the largest share of both victims and offenders`
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{label:'Analysis',href:'/analysis'},{label:'Gun Violence by the Numbers'}]} />
      <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">ANALYSIS</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">Gun Violence by the Numbers: What FBI Data Actually Shows</h1>
      <p className="text-lg text-gray-600 mb-8">
        Firearms dominate American homicide in a way unique among developed nations. Here&apos;s what
        the FBI&apos;s expanded homicide data reveals about weapon types, circumstances, victim and
        offender demographics by race, and what the numbers mean for policy.
      </p>

      <AIOverview insights={aiInsights} />

      <div className="bg-red-900 text-white rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{fmtNum(totalMurders)}</div>
            <div className="text-red-200 text-sm">Total Murders (2024)</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{firearmPct}%</div>
            <div className="text-red-200 text-sm">Committed with Firearms</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtNum(firearmTotal)}</div>
            <div className="text-red-200 text-sm">Firearm Murders</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{maleVictimPct}%</div>
            <div className="text-red-200 text-sm">Victims Are Male</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Firearm Dominance</h2>
        <p>
          In 2024, firearms were used in {firearmPct}% of all murders in the United States — {fmtNum(firearmTotal)} out
          of {fmtNum(totalMurders)} total. No other weapon category comes close. Knives and cutting instruments account
          for roughly {knives ? (knives.count / totalMurders * 100).toFixed(0) : '10'}%, while personal weapons
          (hands, fists, feet) account for about {hands ? (hands.count / totalMurders * 100).toFixed(0) : '4'}%.
        </p>
        <p>
          This ratio has been remarkably stable over decades. Firearms have consistently been the weapon of
          choice in 65-80% of US murders since the FBI began detailed tracking. The shift over time has been
          slightly toward handguns and away from rifles and shotguns.
        </p>

        <h2 className="font-heading">Weapon Breakdown</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Weapon Type</th>
              <th className="text-right px-4 py-2">Count</th>
              <th className="text-right px-4 py-2">%</th>
              <th className="px-4 py-2">Share</th>
            </tr>
          </thead>
          <tbody>
            {data.weaponBreakdown.slice(0, 12).map(w => (
              <tr key={w.weapon} className="border-t">
                <td className="px-4 py-2 font-medium">{w.weapon}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(w.count)}</td>
                <td className="px-4 py-2 text-right font-mono">{(w.count / totalMurders * 100).toFixed(1)}%</td>
                <td className="px-4 py-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: `${Math.min(100, w.count / totalMurders * 100)}%` }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GunCharts data={data} />

      <div className="prose prose-lg max-w-none mt-8">
        <h2 className="font-heading">Victim Demographics by Race &amp; Ethnicity</h2>
        <p>
          Gun violence — and homicide more broadly — falls disproportionately on specific communities.
          The FBI&apos;s demographic data reveals the devastating concentration of violence:
        </p>
      </div>

      {/* Victim Race Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <div className="bg-red-50 px-4 py-2 font-semibold text-sm">Murder Victims by Race (2024)</div>
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
                <td className="px-4 py-2 text-right font-mono">{(r.total / totalVictims * 100).toFixed(1)}%</td>
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
          Black Americans make up roughly 13.6% of the US population but account for over half of all
          murder victims. For young Black men aged 15-34, homicide — overwhelmingly by firearm — is the
          leading cause of death. This is not a statistic about inherent characteristics; it reflects
          the concentration of poverty, lack of opportunity, and historical disinvestment in specific
          communities.
        </p>
        <p>
          Hispanic or Latino victims account for {fmtNum(data.victimEthnicity.find(e => /Hispanic/i.test(e.ethnicity))?.total ?? 0)} homicides.
          Note that ethnicity (Hispanic/Latino) is tracked separately from race in FBI data — a Hispanic
          victim may also be counted as White or Black in the race category.
        </p>

        <h2 className="font-heading">Offender Demographics</h2>
        <p>
          The FBI tracks the race of known offenders. A critical caveat: {data.offenderRace.find(r => r.race === 'Unknown')?.pct.toFixed(1) ?? '23.6'}%
          of offenders are classified as &quot;Unknown&quot; because many homicides remain unsolved. Clearance rates
          are lower in communities with less trust in police — predominantly Black neighborhoods — which means
          the known-offender data systematically underrepresents offenders in those communities relative to
          communities with higher clearance rates.
        </p>
      </div>

      {/* Offender Race & Ethnicity */}
      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 font-semibold text-sm">Known Offenders by Race</div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr><th className="text-left px-4 py-2">Race</th><th className="text-right px-4 py-2">Total</th><th className="text-right px-4 py-2">%</th></tr>
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
              <tr><th className="text-left px-4 py-2">Ethnicity</th><th className="text-right px-4 py-2">Total</th><th className="text-right px-4 py-2">%</th></tr>
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
              <tr><th className="text-left px-4 py-2">Age</th><th className="text-right px-4 py-2">Total</th><th className="text-right px-4 py-2">%</th></tr>
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

      {/* Victim-Offender Cross Tab */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <div className="bg-red-50 px-4 py-2 font-semibold text-sm">Victim–Offender Race Cross-Tabulation</div>
        <p className="px-4 py-2 text-sm text-gray-600">Single-victim/single-offender incidents where both races are known.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-red-50">
              <tr>
                <th className="text-left px-3 py-2">Victim</th>
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
        <p>
          The cross-tabulation confirms that most homicide is intraracial: {vor.whiteVictim.total > 0 ? (vor.whiteVictim.byWhite / vor.whiteVictim.total * 100).toFixed(0) : '77'}%
          of white victims were killed by white offenders, and {vor.blackVictim.total > 0 ? (vor.blackVictim.byBlack / vor.blackVictim.total * 100).toFixed(0) : '85'}%
          of Black victims were killed by Black offenders. This reflects residential segregation — people are
          victimized by people they know and live near.
        </p>

        <h2 className="font-heading">Circumstances of Murder</h2>
        <p>
          The FBI also tracks the circumstances surrounding homicides. The most common are arguments and altercations,
          followed by felonies in progress (robbery, drug dealing, burglary). This challenges the popular image of
          premeditated, stranger-on-stranger murder — most murders arise from conflicts between people who know each other.
        </p>

        {data.circumstanceBreakdown.length > 0 && (
          <div className="not-prose bg-white rounded-xl shadow-sm border overflow-hidden my-6">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr><th className="text-left px-4 py-2">Circumstance</th><th className="text-right px-4 py-2">Count</th></tr>
              </thead>
              <tbody>
                {data.circumstanceBreakdown.slice(0, 12).map(c => (
                  <tr key={c.circumstance} className="border-t">
                    <td className="px-4 py-2">{c.circumstance}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtNum(c.count)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <h2 className="font-heading">The Rifle Myth</h2>
        <p>
          Despite outsized media attention on rifles (including so-called &quot;assault weapons&quot;), they account
          for a small fraction of gun murders. Handguns are used in the vast majority of firearm homicides.
          More people are killed with knives, or even bare hands, than with rifles in a typical year.
        </p>
        <p>
          This doesn&apos;t diminish the horror of mass shootings — which often involve rifles — but it does
          provide important context for policy discussions. The weapon doing the most damage in American
          communities, day in and day out, is the handgun.
        </p>

        <h2 className="font-heading">The Age Factor</h2>
        <p>
          Both victims and offenders skew young. The 18-24 age group accounts for
          {data.offenderAge.find(a => /18-24|18 to 24/i.test(a.range))?.pct.toFixed(1) ?? '22'}% of known offenders,
          despite being only about 9% of the population. Under-18 offenders represent
          {data.offenderAge.find(a => /Under 18/i.test(a.range))?.pct.toFixed(1) ?? '8'}% — a troubling number
          that underscores the importance of youth intervention programs.
        </p>
        <p>
          This age concentration creates both a challenge and an opportunity. Challenge: violence is deeply
          embedded in the social dynamics of young men in specific neighborhoods. Opportunity: targeted
          programs that reach this demographic can prevent significant violence. Evidence-based programs
          like Cure Violence, Becoming a Man (BAM), and READI Chicago have shown 30-70% reductions in
          violence among participants.
        </p>

        <h2 className="font-heading">International Context</h2>
        <p>
          The US firearm homicide rate is roughly 25 times higher than other high-income countries.
          This disparity is driven almost entirely by gun availability — the US has more civilian-owned
          firearms (approximately 400 million) than any other nation, both in total and per capita.
        </p>
        <p>
          However, the US non-firearm homicide rate is also higher than the total homicide rate of most
          peer nations, suggesting that gun availability is not the only factor. Poverty, inequality,
          the drug trade, and cultural factors all contribute to higher baseline violence — guns then
          make that violence far more lethal.
        </p>

        <h2 className="font-heading">What the Data Suggests for Policy</h2>
        <p>
          The demographic data points to several policy directions:
        </p>
        <ul>
          <li><strong>Community violence intervention</strong> targeting young men (18-24) in the highest-violence neighborhoods — the demographic driving the bulk of gun homicide</li>
          <li><strong>Handgun regulation</strong> as the weapon category responsible for the vast majority of gun murders — not just rifle-focused legislation</li>
          <li><strong>Addressing racial disparities</strong> in victimization through investment in the communities that bear the heaviest burden</li>
          <li><strong>Improving homicide clearance rates</strong> in Black communities, where unsolved murders erode trust and fuel retaliation cycles</li>
          <li><strong>Hospital-based violence intervention</strong> that reaches gunshot survivors (who are at extremely high risk of re-injury) at the point of care</li>
          <li><strong>Economic opportunity</strong> for young men in high-violence areas as an alternative to the illegal economies that generate conflicts</li>
        </ul>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-6 text-sm text-amber-800">
        <strong>Important context:</strong> Demographic patterns in crime data reflect structural factors — poverty,
        segregation, historical disinvestment, policing patterns — not inherent characteristics of any racial group.
        The offender data includes a large &quot;Unknown&quot; category from unsolved cases, and clearance rates are
        lower in disadvantaged communities, which skews the known-offender demographics.
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/murder-rate" className="bg-red-700 text-white px-5 py-2 rounded-lg hover:bg-red-800 transition">Murder Rate Data</Link>
        <Link href="/arrest-demographics" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Arrest Demographics</Link>
        <Link href="/analysis/racial-disparities" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Racial Disparities</Link>
        <Link href="/analysis/crime-by-race" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Crime by Race</Link>
        <Link href="/analysis/who-commits-crime" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Who Commits Crime?</Link>
      </div>

      <div className="mt-8"><RelatedAnalysis currentSlug="gun-violence" />

      <ShareButtons title="Gun Violence by the Numbers" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What percentage of US murders involve firearms?', acceptedAnswer: { '@type': 'Answer', text: `Firearms are used in ${firearmPct}% of all US murders (${fmtNum(firearmTotal)} out of ${fmtNum(totalMurders)}).` }},
          { '@type': 'Question', name: 'Who is most affected by gun violence?', acceptedAnswer: { '@type': 'Answer', text: 'Young Black males aged 15-34 are disproportionately affected. Black Americans account for over half of murder victims despite being 13.6% of the population. Males represent 78% of all victims.' }},
          { '@type': 'Question', name: 'What types of guns are used most in murders?', acceptedAnswer: { '@type': 'Answer', text: 'Handguns account for the vast majority of firearm murders. Rifles, including assault weapons, account for only about 3-5% of gun murders annually.' }},
        ]
      })}} />
    </div>
  );
}
