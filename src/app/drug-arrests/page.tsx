import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Drug Arrest Statistics 2024 — Arrests by State & Trends',
  description: 'US drug arrest statistics: 822K+ drug abuse violation arrests in 2024. State-by-state breakdown, 10-year trends, demographics. FBI data.',
  openGraph: { url: 'https://www.opencrime.us/drug-arrests' },
  alternates: { canonical: 'https://www.opencrime.us/drug-arrests' },
};

type ArrestData = {
  nationalEstimates: { offense: string; total: number }[];
  byState: { state: string; totalArrests: number; dui: number; drugAbuse: number }[];
  bySex: { offense: string; total: number; male: number; female: number; malePct: number; femalePct: number }[];
  tenYearTrends: { offense: string; year1: number; year2: number; pctChange: number | null }[];
};

export default function DrugArrestsPage() {
  const data = loadData<ArrestData>('arrest-data.json');
  const totalDrugs = data.nationalEstimates.find(e => /Drug abuse/i.test(e.offense))?.total ?? 0;
  const drugStates = data.byState.filter(s => s.drugAbuse > 0).sort((a, b) => b.drugAbuse - a.drugAbuse);
  const drugSex = data.bySex.find(s => /Drug abuse/i.test(s.offense));
  const drugTrend = data.tenYearTrends.find(t => /Drug abuse/i.test(t.offense));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Drug Arrest Statistics 2024</h1>
      <p className="text-lg text-gray-600 mb-8">
        FBI data on drug abuse violation arrests across the United States.
      </p>

      <div className="bg-purple-900 text-white rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{fmtNum(totalDrugs)}</div>
            <div className="text-purple-200 text-sm">Drug Arrests (2024)</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{drugSex ? `${drugSex.malePct}%` : '—'}</div>
            <div className="text-purple-200 text-sm">Male</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{drugSex ? `${drugSex.femalePct}%` : '—'}</div>
            <div className="text-purple-200 text-sm">Female</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{drugTrend?.pctChange != null ? `${drugTrend.pctChange > 0 ? '+' : ''}${drugTrend.pctChange.toFixed(0)}%` : '—'}</div>
            <div className="text-purple-200 text-sm">10-Year Change</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">The Changing Landscape of Drug Enforcement</h2>
        <p>
          In 2024, law enforcement made an estimated {fmtNum(totalDrugs)} arrests for drug abuse violations.
          This represents a significant shift from the peak of the War on Drugs, when drug arrests exceeded
          1.8 million per year.
        </p>
        <p>
          The decline reflects several trends: marijuana legalization in 24 states plus DC has removed the
          most common drug arrest category in many jurisdictions. Meanwhile, the fentanyl crisis has shifted
          enforcement focus from users to traffickers. Many cities have adopted diversion programs that route
          low-level drug offenders to treatment rather than arrest.
        </p>
        <p>
          Drug arrests still represent roughly {totalDrugs > 0 ? (totalDrugs / (data.nationalEstimates.find(e => e.offense === 'Total')?.total ?? 1) * 100).toFixed(0) : '11'}% of all
          arrests — making drug offenses one of the most common arrest categories despite the decline.
        </p>
      </div>

      <h2 className="font-heading text-2xl font-bold mb-4">Drug Arrests by State</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead className="bg-purple-50 sticky top-0">
            <tr>
              <th className="text-left px-3 py-2">#</th>
              <th className="text-left px-3 py-2">State</th>
              <th className="text-right px-3 py-2">Drug Arrests</th>
              <th className="text-right px-3 py-2">% of State Total</th>
              <th className="text-right px-3 py-2">Total Arrests</th>
            </tr>
          </thead>
          <tbody>
            {drugStates.map((s, i) => (
              <tr key={s.state} className="border-t hover:bg-purple-50/50">
                <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                <td className="px-3 py-2 font-medium">{s.state}</td>
                <td className="px-3 py-2 text-right font-mono text-purple-700 font-semibold">{fmtNum(s.drugAbuse)}</td>
                <td className="px-3 py-2 text-right font-mono">{s.totalArrests > 0 ? (s.drugAbuse / s.totalArrests * 100).toFixed(1) : '—'}%</td>
                <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(s.totalArrests)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/arrests" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">All Arrest Data</Link>
        <Link href="/analysis/drug-crime" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Drug-Crime Connection</Link>
      </div>

      <div className="mt-8"><ShareButtons title="Drug Arrest Statistics 2024" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How many drug arrests are there in the US?', acceptedAnswer: { '@type': 'Answer', text: `There were ${totalDrugs.toLocaleString()} drug arrests in the US in 2024.` }},
          { '@type': 'Question', name: 'Are drug arrests increasing?', acceptedAnswer: { '@type': 'Answer', text: `Drug arrests have generally declined over the past decade${drugTrend ? `, changing by ${drugTrend.pctChange?.toFixed(0)}% over 10 years` : ''}. Marijuana legalization and diversion programs are major factors.` }},
        ]
      })}} />

      <p className="text-sm text-gray-500 mt-8">Source: FBI Persons Arrested, 2024.</p>
    </div>
  );
}
