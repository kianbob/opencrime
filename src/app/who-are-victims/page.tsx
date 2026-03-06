import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import AIOverview from '@/components/AIOverview';

export const metadata: Metadata = {
  title: 'Who Are the Victims? — The Human Face of Crime Statistics',
  description: 'Behind every crime statistic is a real person. FBI homicide data reveals who is most victimized: by age, sex, race, and relationship to their killer.',
  openGraph: { title: 'Who Are the Victims?', description: 'The human face behind FBI crime statistics. Victim demographics that will surprise you.' },
  alternates: { canonical: 'https://www.opencrime.us/who-are-victims' },
};

type HomicideData = {
  victimAge: { age: string; count: number }[];
  victimSex: { sex: string; count: number }[];
  victimRace: { race: string; count: number }[];
  relationship: { relationship: string; count: number }[];
  circumstanceBreakdown: { circumstance: string; count: number }[];
  weaponTrends: { year: number; total: number; firearms: number; handguns: number; rifles: number; shotguns: number; knives: number; blunt: number; hands: number; narcotics: number }[];
  justifiableHomicides: { lawEnforcement: { year: number; total: number; firearms: number }[]; privateCitizen: { year: number; total: number; firearms: number }[] };
  circumstanceTrends: { year: number; total: number; felonyType: number; otherThanFelony: number; robbery: number; narcoticDrugLaws: number; domesticViolence: number }[];
};

export default function VictimsPage() {
  const data = loadData<HomicideData>('homicide-data.json');

  const totalVictims = data.victimSex.reduce((s, v) => s + v.count, 0);
  const male = data.victimSex.find(v => v.sex === 'Male')?.count ?? 0;
  const female = data.victimSex.find(v => v.sex === 'Female')?.count ?? 0;
  const malePct = (male / totalVictims * 100).toFixed(0);
  
  const knownRel = data.relationship.filter(r => r.relationship !== 'Unknown');
  const stranger = knownRel.find(r => r.relationship === 'Stranger')?.count ?? 0;
  const knownTotal = knownRel.reduce((s, r) => s + r.count, 0);
  const strangerPct = (stranger / knownTotal * 100).toFixed(0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"Dataset","name":"Who Are the Victims? — The Human Face of Crime Statistics","description":"Behind every crime statistic is a real person. FBI homicide data reveals who is most victimized: by age, sex, race, and relationship to their killer.","url":"https://www.opencrime.us/who-are-victims","creator":{"@type":"Organization","name":"OpenCrime","url":"https://www.opencrime.us"},"license":"https://www.opencrime.us/about","sourceOrganization":"FBI Crime Data Explorer"}` }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Who Are the Victims?' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Who Are the Victims?</h1>
      <p className="text-xl text-gray-600 mb-8">
        Behind every number in a crime report is a real person. FBI expanded homicide data 
        reveals the demographics, relationships, and circumstances of murder victims in America.
      </p>

      <AIOverview insights={[
        "77% of murder victims are male, but women are disproportionately killed by intimate partners (over 40% of female victims).",
        "Young adults 18-34 face the highest homicide risk — a rate roughly 3x the national average.",
        "Black Americans are murdered at 6x the rate of white Americans — the single largest demographic disparity in crime data.",
        "Most victims knew their killer: stranger homicides are the minority despite dominating public fear."
      ]} />

      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{fmtNum(totalVictims)}</div>
            <div className="text-blue-200 text-sm">Murder Victims (2024)</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{malePct}%</div>
            <div className="text-blue-200 text-sm">Are Male</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{strangerPct}%</div>
            <div className="text-blue-200 text-sm">Killed by Strangers</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtNum(female)}</div>
            <div className="text-blue-200 text-sm">Female Victims</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="font-heading text-xl font-bold mb-3">Victim Sex</h2>
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50"><tr><th className="text-left px-4 py-2">Sex</th><th className="text-right px-4 py-2">Count</th><th className="text-right px-4 py-2">%</th></tr></thead>
              <tbody>
                {data.victimSex.map(v => (
                  <tr key={v.sex} className="border-t"><td className="px-4 py-2">{v.sex}</td><td className="px-4 py-2 text-right font-mono">{fmtNum(v.count)}</td><td className="px-4 py-2 text-right font-mono">{(v.count / totalVictims * 100).toFixed(1)}%</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2 className="font-heading text-xl font-bold mb-3">Victim Race</h2>
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50"><tr><th className="text-left px-4 py-2">Race</th><th className="text-right px-4 py-2">Count</th><th className="text-right px-4 py-2">%</th></tr></thead>
              <tbody>
                {data.victimRace.map(v => (
                  <tr key={v.race} className="border-t"><td className="px-4 py-2">{v.race}</td><td className="px-4 py-2 text-right font-mono">{fmtNum(v.count)}</td><td className="px-4 py-2 text-right font-mono">{(v.count / totalVictims * 100).toFixed(1)}%</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <h2 className="font-heading text-xl font-bold mb-3">Victim-Killer Relationship</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50"><tr><th className="text-left px-4 py-2">Relationship</th><th className="text-right px-4 py-2">Count</th><th className="text-right px-4 py-2">%</th></tr></thead>
          <tbody>
            {data.relationship.slice(0, 15).map(r => (
              <tr key={r.relationship} className="border-t"><td className="px-4 py-2">{r.relationship}</td><td className="px-4 py-2 text-right font-mono">{fmtNum(r.count)}</td><td className="px-4 py-2 text-right font-mono">{(r.count / totalVictims * 100).toFixed(1)}%</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-heading text-xl font-bold mb-3">Circumstances of Murder</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50"><tr><th className="text-left px-4 py-2">Circumstance</th><th className="text-right px-4 py-2">Count</th></tr></thead>
          <tbody>
            {data.circumstanceBreakdown.filter(c => c.count > 50).map(c => (
              <tr key={c.circumstance} className="border-t"><td className="px-4 py-2">{c.circumstance}</td><td className="px-4 py-2 text-right font-mono">{fmtNum(c.count)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">Key Insights</h2>
        <ul>
          <li><strong>Murder is overwhelmingly male.</strong> {malePct}% of murder victims are men. This is the single most dramatic demographic skew in crime data.</li>
          <li><strong>Most victims know their killer.</strong> Only {strangerPct}% of murders (where relationship is known) are committed by strangers. The majority involve acquaintances, family, or romantic partners.</li>
          <li><strong>Arguments are the top motive.</strong> &quot;Other arguments&quot; is the leading circumstance — not robbery, not drugs, not gang activity. Ordinary arguments that escalate.</li>
          <li><strong>Black Americans are disproportionately victimized.</strong> While comprising ~13% of the population, Black individuals account for {(((data.victimRace.find(v => v.race === 'Black')?.count ?? 0) / totalVictims) * 100).toFixed(0)}% of murder victims. This is the starkest racial disparity in American public safety.</li>
          <li><strong>Women face a specific pattern.</strong> While women are fewer victims overall, they are far more likely to be killed by intimate partners (husbands, boyfriends, ex-partners).</li>
        </ul>
      </div>

      {data.circumstanceTrends && data.circumstanceTrends.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="font-heading text-xl font-bold mb-4">Homicide Circumstances Over Time</h2>
          <p className="text-sm text-gray-600 mb-4">How the reasons behind homicides have shifted in recent years.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2">Year</th>
                  <th className="text-right px-3 py-2">Total</th>
                  <th className="text-right px-3 py-2">Felony-Type</th>
                  <th className="text-right px-3 py-2">Other Than Felony</th>
                  <th className="text-right px-3 py-2">Robbery</th>
                  <th className="text-right px-3 py-2">Narcotic Laws</th>
                  <th className="text-right px-3 py-2">Domestic Violence</th>
                </tr>
              </thead>
              <tbody>
                {data.circumstanceTrends.map(ct => (
                  <tr key={ct.year} className="border-t hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium">{ct.year}</td>
                    <td className="px-3 py-2 text-right font-mono">{fmtNum(ct.total)}</td>
                    <td className="px-3 py-2 text-right font-mono">{fmtNum(ct.felonyType)}</td>
                    <td className="px-3 py-2 text-right font-mono">{fmtNum(ct.otherThanFelony)}</td>
                    <td className="px-3 py-2 text-right font-mono">{fmtNum(ct.robbery)}</td>
                    <td className="px-3 py-2 text-right font-mono">{fmtNum(ct.narcoticDrugLaws)}</td>
                    <td className="px-3 py-2 text-right font-mono">{fmtNum(ct.domesticViolence)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        <Link href="/murder-rate" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Murder Rate</Link>
        <Link href="/weapon-shift" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Weapon Shift</Link>
        <Link href="/analysis/domestic-violence" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Domestic Violence</Link>
      </div>

      <div className="mt-8"><ShareButtons title="Who Are the Victims?" /></div>
      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer, Expanded Homicide Data, 2024.</p>
    </div>
  );
}
