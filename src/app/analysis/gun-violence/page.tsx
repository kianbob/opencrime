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
  description: 'Firearms are used in 77% of US murders. Analysis of FBI expanded homicide data: weapon types, trends, circumstances, and geographic patterns.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/gun-violence' },
};

type HomicideData = {
  weaponBreakdown: { weapon: string; count: number; pct: number }[];
  circumstanceBreakdown: { circumstance: string; count: number }[];
  victimAge: { range: string; count: number }[];
  victimSex: { sex: string; count: number }[];
  yearlyWeapons: { year: number; firearm: number; knife: number; other: number; hands: number }[];
  alternates: { canonical: 'https://www.opencrime.us/analysis/gun-violence' },
};

export default function GunViolencePage() {
  const data = loadData<HomicideData>('homicide-data.json');
  const totalMurders = data.weaponBreakdown.reduce((s, w) => s + w.count, 0);
  const firearms = data.weaponBreakdown.filter(w => w.weapon.toLowerCase().includes('firearm') || w.weapon.toLowerCase().includes('handgun') || w.weapon.toLowerCase().includes('rifle') || w.weapon.toLowerCase().includes('shotgun') || w.weapon.toLowerCase().includes('gun'));
  const firearmTotal = firearms.reduce((s, w) => s + w.count, 0);
  const firearmPct = (firearmTotal / totalMurders * 100).toFixed(1);
  const knives = data.weaponBreakdown.find(w => w.weapon.toLowerCase().includes('kniv') || w.weapon.toLowerCase().includes('cutting'));
  const hands = data.weaponBreakdown.find(w => w.weapon.toLowerCase().includes('hands') || w.weapon.toLowerCase().includes('personal'));

  const aiInsights = [
    `Firearms are used in ${firearmPct}% of all US murders, far higher than any other weapon type`,
    `${fmtNum(firearmTotal)} Americans were murdered with firearms in the most recent data year`,
    `Gun homicides outnumber knife homicides by more than 4-to-1 in the United States`,
    `Handguns account for the majority of firearm homicides, with rifles representing a small fraction`,
    `The US firearm homicide rate is 25x higher than other high-income countries`,
    `Gun violence disproportionately affects young Black males aged 15-34 in urban areas`
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{label:'Analysis',href:'/analysis'},{label:'Gun Violence by the Numbers'}]} />
      <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">ANALYSIS</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">Gun Violence by the Numbers: What FBI Data Actually Shows</h1>
      <p className="text-lg text-gray-600 mb-8">
        Firearms dominate American homicide in a way unique among developed nations. Here&apos;s what 
        the FBI&apos;s expanded homicide data reveals about weapon types, circumstances, and victims.
      </p>

      <AIOverview insights={aiInsights} />

      <div className="bg-red-900 text-white rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4 text-center">
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
            <div className="text-3xl font-bold">{fmtNum(knives?.count ?? 0)}</div>
            <div className="text-red-200 text-sm">Knife Murders</div>
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
              <th className="text-right px-4 py-2">% of Total</th>
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
                <tr>
                  <th className="text-left px-4 py-2">Circumstance</th>
                  <th className="text-right px-4 py-2">Count</th>
                </tr>
              </thead>
              <tbody>
                {data.circumstanceBreakdown.slice(0, 10).map(c => (
                  <tr key={c.circumstance} className="border-t">
                    <td className="px-4 py-2">{c.circumstance}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtNum(c.count)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <h2 className="font-heading">Victim Demographics</h2>
        <p>
          Murder victimization is not evenly distributed. Young men aged 18-34 are disproportionately 
          represented among victims. Males account for roughly {data.victimSex.find(v => v.sex === 'Male') ? ((data.victimSex.find(v => v.sex === 'Male')!.count / data.victimSex.reduce((s, v) => s + v.count, 0)) * 100).toFixed(0) : '78'}% of 
          all murder victims. This pattern has held for decades.
        </p>

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

        <h2 className="font-heading">International Context</h2>
        <p>
          The US firearm homicide rate is roughly 25 times higher than other high-income countries. 
          This disparity is driven almost entirely by gun availability — the US has more civilian-owned 
          firearms (approximately 400 million) than any other nation, both in total and per capita. 
          Whether this correlation implies causation is one of the most contested questions in criminology.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/murder-rate" className="bg-red-700 text-white px-5 py-2 rounded-lg hover:bg-red-800 transition">Murder Rate Data</Link>
        <Link href="/most-dangerous-cities" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Most Dangerous Cities</Link>
      </div>

      <div className="mt-8"><RelatedAnalysis currentSlug="gun-violence" />

      <ShareButtons title="Gun Violence by the Numbers" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Gun Violence by the Numbers: What FBI Data Actually Shows',
        publisher: { '@type': 'Organization', name: 'OpenCrime' },
        datePublished: '2026-03-04',
      })}} />
    </div>
  );
}
