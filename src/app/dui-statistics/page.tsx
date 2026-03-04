import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'DUI Statistics 2024 — Drunk Driving Arrests by State',
  description: 'DUI arrest statistics for every US state. Total DUI arrests, state-by-state rankings, and trends. FBI data from persons arrested reports.',
  openGraph: { url: 'https://www.opencrime.us/dui-statistics' },
  alternates: { canonical: 'https://www.opencrime.us/dui-statistics' },
};

type RaceRow = { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number; pacificIslander: number };
type EthRow = { offense: string; totalEthnicity: number; hispanic: number; notHispanic: number; hispanicPct: number; notHispanicPct: number };

type ArrestData = {
  nationalEstimates: { offense: string; total: number }[];
  byState: { state: string; totalArrests: number; dui: number; drugAbuse: number }[];
  bySex: { offense: string; total: number; male: number; female: number; malePct: number; femalePct: number }[];
  tenYearTrends: { offense: string; year1: number; year2: number; pctChange: number | null }[];
  byRace: RaceRow[];
  byEthnicity: EthRow[];
};

export default function DUIPage() {
  const data = loadData<ArrestData>('arrest-data.json');
  const totalDUI = data.nationalEstimates.find(e => /Driving under/i.test(e.offense))?.total ?? 0;
  const duiStates = data.byState.filter(s => s.dui > 0).sort((a, b) => b.dui - a.dui);
  const duiSex = data.bySex.find(s => /Driving under/i.test(s.offense));
  const duiTrend = data.tenYearTrends.find(t => /Driving under/i.test(t.offense));
  const duiRace = data.byRace.find(r => /Driving under/i.test(r.offense));
  const duiEth = data.byEthnicity.find(e => /Driving under/i.test(e.offense));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">DUI Statistics 2024</h1>
      <p className="text-lg text-gray-600 mb-8">
        Drunk driving arrest data from the FBI&apos;s Uniform Crime Reporting program. 
        State-by-state breakdown of DUI arrests across the United States.
      </p>

      <div className="bg-amber-900 text-white rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{fmtNum(totalDUI)}</div>
            <div className="text-amber-200 text-sm">Total DUI Arrests</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{duiSex ? `${duiSex.malePct}%` : '—'}</div>
            <div className="text-amber-200 text-sm">Male Arrestees</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{duiSex ? `${duiSex.femalePct}%` : '—'}</div>
            <div className="text-amber-200 text-sm">Female Arrestees</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{duiTrend?.pctChange != null ? `${duiTrend.pctChange > 0 ? '+' : ''}${duiTrend.pctChange.toFixed(0)}%` : '—'}</div>
            <div className="text-amber-200 text-sm">10-Year Change</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">DUI Arrests in Context</h2>
        <p>
          Driving under the influence remains one of the most commonly prosecuted crimes in the United States.
          In 2024, there were {fmtNum(totalDUI)} DUI arrests nationwide. While this represents a significant number,
          DUI arrests have been declining for decades — down from over 1.4 million per year in the early 2000s.
        </p>
        <p>
          DUI encompasses both alcohol and drug impairment. With the legalization of marijuana in many states,
          drug-impaired driving has become an increasing focus of law enforcement, though alcohol remains the
          primary factor in most DUI arrests.
        </p>
        <p>
          According to NHTSA, approximately 13,500 people die annually in alcohol-impaired driving crashes —
          roughly 37 per day, or one every 39 minutes. Despite declining arrest numbers, impaired driving
          remains one of the leading causes of preventable death in America.
        </p>
      </div>

      {/* DUI Arrest Demographics */}
      {duiRace && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="font-heading text-xl font-bold mb-4">DUI Arrests by Race &amp; Ethnicity</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-amber-50">
                <tr>
                  <th className="text-left px-3 py-2">Race</th>
                  <th className="text-right px-3 py-2">Arrests</th>
                  <th className="text-right px-3 py-2">%</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'White', value: duiRace.white },
                  { label: 'Black or African American', value: duiRace.black },
                  { label: 'American Indian/Alaska Native', value: duiRace.nativeAmerican },
                  { label: 'Asian', value: duiRace.asian },
                  { label: 'Native Hawaiian/Pacific Islander', value: duiRace.pacificIslander },
                ].map(row => (
                  <tr key={row.label} className="border-t">
                    <td className="px-3 py-2">{row.label}</td>
                    <td className="px-3 py-2 text-right font-mono">{fmtNum(row.value)}</td>
                    <td className="px-3 py-2 text-right font-mono">{(row.value / duiRace.total * 100).toFixed(1)}%</td>
                  </tr>
                ))}
                <tr className="border-t font-semibold bg-gray-50">
                  <td className="px-3 py-2">Total</td>
                  <td className="px-3 py-2 text-right font-mono">{fmtNum(duiRace.total)}</td>
                  <td className="px-3 py-2 text-right font-mono">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
          {duiEth && (
            <div className="mt-4 flex gap-4">
              <div className="bg-amber-50 rounded-lg p-3 flex-1 text-center">
                <div className="text-xl font-bold text-amber-700">{duiEth.hispanicPct}%</div>
                <div className="text-xs text-gray-600">Hispanic/Latino</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-3 flex-1 text-center">
                <div className="text-xl font-bold text-amber-700">{duiEth.notHispanicPct}%</div>
                <div className="text-xs text-gray-600">Not Hispanic/Latino</div>
              </div>
            </div>
          )}
          <p className="text-sm text-gray-500 mt-4">
            DUI arrest demographics differ from other crime categories, with White drivers representing the
            majority of arrests. Enforcement patterns, traffic stop practices, and geographic coverage all
            influence these numbers. See <Link href="/arrest-demographics" className="text-[#1e3a5f] hover:underline">full demographics</Link>.
          </p>
        </div>
      )}

      <h2 className="font-heading text-2xl font-bold mb-4">DUI Arrests by State</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead className="bg-amber-50 sticky top-0">
            <tr>
              <th className="text-left px-3 py-2">#</th>
              <th className="text-left px-3 py-2">State</th>
              <th className="text-right px-3 py-2">DUI Arrests</th>
              <th className="text-right px-3 py-2">Drug Arrests</th>
              <th className="text-right px-3 py-2">Total Arrests</th>
              <th className="text-right px-3 py-2">DUI % of Total</th>
            </tr>
          </thead>
          <tbody>
            {duiStates.map((s, i) => (
              <tr key={s.state} className="border-t hover:bg-amber-50/50">
                <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                <td className="px-3 py-2 font-medium">{s.state}</td>
                <td className="px-3 py-2 text-right font-mono text-amber-700 font-semibold">{fmtNum(s.dui)}</td>
                <td className="px-3 py-2 text-right font-mono text-purple-600">{fmtNum(s.drugAbuse)}</td>
                <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(s.totalArrests)}</td>
                <td className="px-3 py-2 text-right font-mono">{s.totalArrests > 0 ? (s.dui / s.totalArrests * 100).toFixed(1) : '—'}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">Frequently Asked Questions</h2>
        <h3>How many DUI arrests happen each year?</h3>
        <p>In 2024, the FBI estimated {fmtNum(totalDUI)} DUI arrests in the United States.</p>
        <h3>Are DUI arrests increasing or decreasing?</h3>
        <p>DUI arrests have been declining long-term. {duiTrend ? `Over the past 10 years, DUI arrests changed by ${duiTrend.pctChange?.toFixed(0)}%.` : ''} Factors include ride-sharing services, increased awareness, and stricter enforcement.</p>
        <h3>Which state has the most DUI arrests?</h3>
        <p>{duiStates[0]?.state} leads the nation with {fmtNum(duiStates[0]?.dui)} DUI arrests, though this partly reflects population size and reporting coverage.</p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/arrests" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">All Arrest Data</Link>
        <Link href="/crime-rate" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Crime Rate</Link>
      </div>

      <div className="mt-8"><ShareButtons title="DUI Statistics 2024" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How many DUI arrests are there in the US?', acceptedAnswer: { '@type': 'Answer', text: `There were ${totalDUI.toLocaleString()} DUI arrests in the US in 2024.` }},
          { '@type': 'Question', name: 'Which state has the most DUI arrests?', acceptedAnswer: { '@type': 'Answer', text: `${duiStates[0]?.state} has the most DUI arrests with ${duiStates[0]?.dui.toLocaleString()}.` }},
        ]
      })}} />

      <p className="text-sm text-gray-500 mt-8">Source: FBI Persons Arrested, 2024. Not all agencies report; actual DUI numbers may be higher.</p>
    </div>
  );
}
