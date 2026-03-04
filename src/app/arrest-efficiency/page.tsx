import { Metadata } from 'next';
import { loadData, fmtNum } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Arrest Efficiency — How Effective Is Policing in Your City? | OpenCrime',
  description: 'Compare the ratio of arrests to reported crimes across cities. Some cities arrest at high rates while others solve a fraction of their cases.',
  openGraph: {
    title: 'Arrest Efficiency — How Effective Is Your City\'s Policing?',
    description: 'Data-driven analysis of arrest-to-crime ratios across 9,700+ US cities.',
    url: 'https://www.opencrime.us/arrest-efficiency',
  },
  alternates: { canonical: 'https://www.opencrime.us/arrest-efficiency' },
};

type NatEstimate = { offense: string; total: number };
type StateArrest = { state: string; totalArrests: number; violent: number; property: number; murder: number; rape: number; robbery: number; aggAssault: number; burglary: number; larceny: number; mvTheft: number; drug: number; dui: number };

export default function ArrestEfficiencyPage() {
  const arrestData = loadData<{
    nationalEstimates: NatEstimate[];
    byState: StateArrest[];
    juvenile?: { group: string; handledInDepartment?: number; referredToJuvenileCourt?: number }[];
  }>('arrest-data.json');

  const nat = arrestData?.nationalEstimates ?? [];
  const byState = arrestData?.byState ?? [];

  const find = (name: string) => nat.find(n => n.offense === name)?.total ?? 0;

  const totalArrests = find('Total');
  const violentArrests = find('Violent crime');
  const propertyArrests = find('Property crime');
  const drugArrests = find('Drug abuse violations');
  const duiArrests = find('Driving under the influence');
  const murderArrests = find('Murder and nonnegligent manslaughter');
  const assaultArrests = find('Aggravated assault');
  const robberyArrests = find('Robbery');

  const totalMurders = 16935; // From 2024 FBI stats
  const clearanceEst = totalMurders > 0 ? Math.round(murderArrests / totalMurders * 100) : 0;

  const statesByViolent = [...byState].sort((a, b) => b.violent - a.violent).slice(0, 20);

  const topOffenses = [...nat].filter(n => n.offense !== 'Total' && n.total > 0).sort((a, b) => b.total - a.total).slice(0, 20);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Arrest Efficiency' }]} />
      <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">Arrest Efficiency</h1>
      <p className="text-lg text-gray-600 mb-8">
        How effective is law enforcement at catching criminals? The ratio of arrests to reported crimes 
        reveals how well different types of crimes are being addressed — and where the biggest gaps exist.
      </p>

      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-primary">{fmtNum(totalArrests)}</p>
          <p className="text-sm text-gray-600">Total Arrests (2024)</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-red-700">{fmtNum(violentArrests)}</p>
          <p className="text-sm text-gray-600">Violent Crime Arrests</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-amber-700">{fmtNum(propertyArrests)}</p>
          <p className="text-sm text-gray-600">Property Crime Arrests</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-green-700">{clearanceEst}%</p>
          <p className="text-sm text-gray-600">Murder &quot;Clearance&quot; Rate</p>
        </div>
      </div>

      {/* Top offenses table */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-primary mb-4">Arrests by Offense Type (Top 20)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Offense</th>
                <th className="text-right p-3 font-semibold">Total Arrests</th>
                <th className="text-right p-3 font-semibold">% of All</th>
              </tr>
            </thead>
            <tbody>
              {topOffenses.map(o => (
                <tr key={o.offense} className="border-b border-gray-100">
                  <td className="p-3 font-medium">{o.offense}</td>
                  <td className="p-3 text-right font-mono">{fmtNum(o.total)}</td>
                  <td className="p-3 text-right font-mono text-gray-500">{totalArrests > 0 ? (o.total / totalArrests * 100).toFixed(1) + '%' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Murder clearance analysis */}
      <section className="mb-10 bg-red-50 rounded-xl p-6">
        <h2 className="font-display text-2xl font-bold text-red-800 mb-3">The Murder Clearance Gap</h2>
        <p className="text-gray-700 mb-4">
          In 2024, there were {fmtNum(totalMurders)} murders but only {fmtNum(murderArrests)} murder arrests — 
          a rough clearance rate of {clearanceEst}%. This means approximately 
          {fmtNum(totalMurders - murderArrests)} murders went without an arrest.
        </p>
        <p className="text-gray-600 text-sm">
          Note: Arrest counts don&apos;t perfectly equal clearance rates (one arrest can clear multiple cases, or 
          cases can be cleared by exceptional means). But the gap illustrates a fundamental challenge: for roughly 
          every 3 murders in America, about 1 goes without anyone being arrested.
        </p>
      </section>

      {/* Drug vs violent arrests */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-primary mb-3">Where Police Focus Their Efforts</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border rounded-xl p-5">
            <p className="text-3xl font-bold text-purple-700">{fmtNum(drugArrests)}</p>
            <p className="font-semibold">Drug Arrests</p>
            <p className="text-xs text-gray-500">{totalArrests > 0 ? (drugArrests / totalArrests * 100).toFixed(1) : 0}% of all arrests</p>
          </div>
          <div className="bg-white border rounded-xl p-5">
            <p className="text-3xl font-bold text-amber-700">{fmtNum(duiArrests)}</p>
            <p className="font-semibold">DUI Arrests</p>
            <p className="text-xs text-gray-500">{totalArrests > 0 ? (duiArrests / totalArrests * 100).toFixed(1) : 0}% of all arrests</p>
          </div>
          <div className="bg-white border rounded-xl p-5">
            <p className="text-3xl font-bold text-red-700">{fmtNum(violentArrests)}</p>
            <p className="font-semibold">Violent Crime Arrests</p>
            <p className="text-xs text-gray-500">{totalArrests > 0 ? (violentArrests / totalArrests * 100).toFixed(1) : 0}% of all arrests</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Drug and DUI arrests together often exceed violent crime arrests — raising questions about policing 
          priorities and resource allocation.
        </p>
      </section>

      {/* States by violent arrests */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-primary mb-4">Violent Crime Arrests by State (Top 20)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-2 font-semibold">State</th>
                <th className="text-right p-2 font-semibold">Violent</th>
                <th className="text-right p-2 font-semibold">Drug</th>
                <th className="text-right p-2 font-semibold">DUI</th>
                <th className="text-right p-2 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {statesByViolent.map(s => (
                <tr key={s.state} className="border-b border-gray-100">
                  <td className="p-2 font-medium">{s.state}</td>
                  <td className="p-2 text-right font-mono text-red-600">{fmtNum(s.violent)}</td>
                  <td className="p-2 text-right font-mono">{fmtNum(s.drug)}</td>
                  <td className="p-2 text-right font-mono">{fmtNum(s.dui)}</td>
                  <td className="p-2 text-right font-mono">{fmtNum(s.totalArrests)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="prose prose-gray max-w-none">
        <h2 className="font-display text-2xl font-bold text-primary">Understanding Arrest Data</h2>
        <p>
          Arrest data tells us what police <em>do</em>, not necessarily what crimes <em>occur</em>. Arrests reflect 
          policing priorities, department resources, and local policies. A city with few drug arrests might have less 
          drug crime — or it might have a department that doesn&apos;t prioritize drug enforcement.
        </p>
        <p>
          The gap between crimes reported and arrests made is particularly stark for property crime. 
          With a property crime occurring every 5 seconds but limited detective resources, most theft, 
          burglary, and auto theft goes unsolved.
        </p>
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/arrests" className="text-primary hover:underline">→ Full Arrests Overview</Link>
        <Link href="/drug-arrests" className="text-primary hover:underline">→ Drug Arrests</Link>
        <Link href="/dui-statistics" className="text-primary hover:underline">→ DUI Statistics</Link>
        <Link href="/analysis/gun-violence" className="text-primary hover:underline">→ Gun Violence Analysis</Link>
      </div>

      <ShareButtons title="Arrest Efficiency — How Effective Is Policing in America?" />
    </main>
  );
}
