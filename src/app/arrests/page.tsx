import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import ArrestCharts from './ArrestCharts';
import LastUpdated from '@/components/LastUpdated';
import AIOverview from '@/components/AIOverview';

export const metadata: Metadata = {
  title: 'US Arrest Statistics 2024 — 7.5 Million Arrests by Offense, State, Demographics',
  description: 'FBI arrest data: 7.5 million arrests in 2024. Breakdown by offense type, state, age, sex, and race. DUI arrests, drug arrests, juvenile data. Complete FBI statistics.',
  openGraph: { url: 'https://www.opencrime.us/arrests' },
  alternates: { canonical: 'https://www.opencrime.us/arrests' },
};

type ArrestData = {
  nationalEstimates: { offense: string; total: number }[];
  tenYearTrends: { offense: string; year1: number; year2: number; pctChange: number | null }[];
  bySex: { offense: string; total: number; male: number; female: number; malePct: number; femalePct: number }[];
  byRace: { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number }[];
  byAge: { age: string; count: number }[];
  byState: { state: string; totalArrests: number; violent: number; property: number; dui: number; drugAbuse: number; murder: number }[];
  juvenile: { group: string; totalDispositions: number; handledInDepartment: number; referredToJuvenileCourt: number }[];
};

export default function ArrestsPage() {
  const data = loadData<ArrestData>('arrest-data.json');
  const totalArrests = data.nationalEstimates.find(e => e.offense === 'Total')?.total ?? 0;
  const dui = data.nationalEstimates.find(e => /Driving under/i.test(e.offense))?.total ?? 0;
  const drugs = data.nationalEstimates.find(e => /Drug abuse/i.test(e.offense))?.total ?? 0;
  const violent = data.nationalEstimates.find(e => e.offense === 'Violent crime')?.total ?? 0;
  const offenses = data.nationalEstimates.filter(e => e.offense !== 'Total' && e.total > 1000);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">US Arrest Statistics 2024</h1>
      <p className="text-lg text-gray-600 mb-8">
        FBI estimated arrest data for the United States. Who gets arrested, for what, and where.
      </p>

      <AIOverview insights={[
        "Police made 6.45 million arrests nationwide — roughly 1 arrest for every 53 Americans.",
        "Drug abuse violations are the #1 arrest category at 1.15 million — more than all violent crime arrests combined.",
        "Male arrestees outnumber female 3-to-1 (72.5% vs 27.5%), a ratio that has remained remarkably stable for decades.",
        "Larceny-theft leads property crime arrests, but only 1 in 6 thefts results in an arrest.",
      ]} />

      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{(totalArrests / 1000000).toFixed(1)}M</div>
            <div className="text-blue-200 text-sm">Total Arrests</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtNum(dui)}</div>
            <div className="text-blue-200 text-sm">DUI Arrests</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtNum(drugs)}</div>
            <div className="text-blue-200 text-sm">Drug Arrests</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtNum(violent)}</div>
            <div className="text-blue-200 text-sm">Violent Crime Arrests</div>
          </div>
        </div>
      </div>

      <h2 className="font-heading text-2xl font-bold mb-4">Arrests by Offense Type</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Offense</th>
              <th className="text-right px-4 py-2">Arrests</th>
              <th className="text-right px-4 py-2">% of Total</th>
              <th className="px-4 py-2">Share</th>
            </tr>
          </thead>
          <tbody>
            {offenses.slice(0, 20).map(o => (
              <tr key={o.offense} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{o.offense}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(o.total)}</td>
                <td className="px-4 py-2 text-right font-mono text-gray-500">{(o.total / totalArrests * 100).toFixed(1)}%</td>
                <td className="px-4 py-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#1e3a5f] h-2 rounded-full" style={{ width: `${Math.min(100, o.total / offenses[0].total * 100)}%` }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ArrestCharts data={data} />

      {/* Arrests by State */}
      <h2 className="font-heading text-2xl font-bold mb-4 mt-8">Arrests by State (Top 20)</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-3 py-2">#</th>
              <th className="text-left px-3 py-2">State</th>
              <th className="text-right px-3 py-2">Total</th>
              <th className="text-right px-3 py-2">Violent</th>
              <th className="text-right px-3 py-2">Property</th>
              <th className="text-right px-3 py-2">DUI</th>
              <th className="text-right px-3 py-2">Drugs</th>
            </tr>
          </thead>
          <tbody>
            {data.byState.slice(0, 20).map((s, i) => (
              <tr key={s.state} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                <td className="px-3 py-2 font-medium">{s.state}</td>
                <td className="px-3 py-2 text-right font-mono font-semibold">{fmtNum(s.totalArrests)}</td>
                <td className="px-3 py-2 text-right font-mono text-red-600">{fmtNum(s.violent)}</td>
                <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(s.property)}</td>
                <td className="px-3 py-2 text-right font-mono text-amber-600">{fmtNum(s.dui)}</td>
                <td className="px-3 py-2 text-right font-mono text-purple-600">{fmtNum(s.drugAbuse)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 10-Year Trends */}
      <h2 className="font-heading text-2xl font-bold mb-4">10-Year Arrest Trends</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Offense</th>
              <th className="text-right px-4 py-2">2015</th>
              <th className="text-right px-4 py-2">2024</th>
              <th className="text-right px-4 py-2">Change</th>
            </tr>
          </thead>
          <tbody>
            {data.tenYearTrends.filter(t => t.year1 > 0).slice(0, 15).map(t => (
              <tr key={t.offense} className="border-t">
                <td className="px-4 py-2">{t.offense}</td>
                <td className="px-4 py-2 text-right font-mono text-gray-500">{fmtNum(t.year1)}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(t.year2)}</td>
                <td className={`px-4 py-2 text-right font-mono ${(t.pctChange ?? 0) < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {t.pctChange != null ? `${t.pctChange > 0 ? '+' : ''}${t.pctChange.toFixed(1)}%` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gender breakdown */}
      <h2 className="font-heading text-2xl font-bold mb-4">Arrests by Sex</h2>
      <div className="prose prose-lg max-w-none mb-4">
        <p>Men account for the vast majority of arrests across nearly all offense categories. The gender gap is most extreme for violent crime and sex offenses, and smallest for larceny-theft and fraud.</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Offense</th>
              <th className="text-right px-4 py-2">Total</th>
              <th className="text-right px-4 py-2">Male %</th>
              <th className="text-right px-4 py-2">Female %</th>
            </tr>
          </thead>
          <tbody>
            {data.bySex.filter(s => s.total > 5000).slice(0, 15).map(s => (
              <tr key={s.offense} className="border-t">
                <td className="px-4 py-2">{s.offense}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(s.total)}</td>
                <td className="px-4 py-2 text-right font-mono text-blue-600">{s.malePct}%</td>
                <td className="px-4 py-2 text-right font-mono text-pink-600">{s.femalePct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/dashboard" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Dashboard</Link>
        <Link href="/crime-rate" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Crime Rate</Link>
        <Link href="/hate-crimes" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Hate Crimes</Link>
      </div>

      <div className="mt-8"><ShareButtons title="US Arrest Statistics 2024" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How many people are arrested in the US each year?', acceptedAnswer: { '@type': 'Answer', text: `The FBI estimated ${totalArrests.toLocaleString()} total arrests in the US in 2024.` }},
          { '@type': 'Question', name: 'What is the most common arrest?', acceptedAnswer: { '@type': 'Answer', text: `The most common specific arrest category is "other assaults" (simple assaults), followed by property crime and drug abuse violations.` }},
          { '@type': 'Question', name: 'How many DUI arrests are there per year?', acceptedAnswer: { '@type': 'Answer', text: `There were ${dui.toLocaleString()} DUI arrests in the US in 2024.` }},
        ]
      })}} />

      <p className="text-sm text-gray-500 mt-8">Source: FBI Persons Arrested tables, 2024. Based on data from ~14,000 reporting agencies.</p>
      <LastUpdated />
    </div>
  );
}
