import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Who Are the Victims? — The Human Face of Crime Statistics',
  description: 'Behind every crime statistic is a real person. FBI homicide data reveals who is most victimized: by age, sex, race, and relationship to their killer.',
  openGraph: { title: 'Who Are the Victims?', description: 'The human face behind FBI crime statistics. Victim demographics that will surprise you.' },
};

type HomicideData = {
  victimAge: { age: string; count: number }[];
  victimSex: { sex: string; count: number }[];
  victimRace: { race: string; count: number }[];
  relationship: { relationship: string; count: number }[];
  circumstanceBreakdown: { circumstance: string; count: number }[];
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
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Who Are the Victims?' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Who Are the Victims?</h1>
      <p className="text-xl text-gray-600 mb-8">
        Behind every number in a crime report is a real person. FBI expanded homicide data 
        reveals the demographics, relationships, and circumstances of murder victims in America.
      </p>

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
