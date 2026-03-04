import { Metadata } from 'next';
import { loadData, fmtNum, fmtRate, fmtPct, stateAbbr } from '@/lib/utils';
import type { CityIndex } from '@/lib/utils';
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

export default function ArrestEfficiencyPage() {
  const arrestData = loadData<{
    national: {
      totalArrests: number;
      totalAdult: number;
      totalJuvenile: number;
      byOffense: { offense: string; total: number; adult: number; juvenile: number }[];
    };
    byState: { state: string; totalArrests: number; drugArrests: number; duiArrests: number; violentArrests: number }[];
  }>('arrest-data.json');

  const homicideData = loadData<{
    weaponBreakdown: { weapon: string; count: number }[];
    victimAge: { group: string; count: number }[];
    victimSex: { sex: string; count: number }[];
    circumstance: { circumstance: string; count: number }[];
    relationship: { relationship: string; count: number }[];
  }>('homicide-data.json');

  // Key stats from arrest data
  const nat = arrestData.national;
  const violentOffenses = nat.byOffense.filter(o => 
    ['Murder and nonnegligent manslaughter', 'Aggravated assault', 'Robbery', 'Rape'].includes(o.offense)
  );
  const violentArrests = violentOffenses.reduce((s, o) => s + o.total, 0);
  const propertyOffenses = nat.byOffense.filter(o =>
    ['Burglary', 'Larceny-theft', 'Motor vehicle theft', 'Arson'].includes(o.offense)
  );
  const propertyArrests = propertyOffenses.reduce((s, o) => s + o.total, 0);

  const drugArrests = nat.byOffense.find(o => o.offense.includes('Drug'))?.total ?? 0;
  const duiArrests = nat.byOffense.find(o => o.offense.includes('Driving under'))?.total ?? 0;

  // State comparison
  const statesByViolent = [...arrestData.byState]
    .filter(s => s.violentArrests > 0)
    .sort((a, b) => b.violentArrests - a.violentArrests)
    .slice(0, 20);

  // Clearance-like analysis
  const murderArrests = nat.byOffense.find(o => o.offense.includes('Murder'))?.total ?? 0;
  const totalMurders = 16935; // From stats

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
          <p className="text-3xl font-bold text-primary">{fmtNum(nat.totalArrests)}</p>
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
          <p className="text-3xl font-bold text-green-700">{Math.round(murderArrests / totalMurders * 100)}%</p>
          <p className="text-sm text-gray-600">Murder &quot;Clearance&quot; Rate</p>
        </div>
      </div>

      {/* Arrest by offense type */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-primary mb-4">Arrests by Offense Type</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Offense</th>
                <th className="text-right p-3 font-semibold">Total Arrests</th>
                <th className="text-right p-3 font-semibold">Adult</th>
                <th className="text-right p-3 font-semibold">Juvenile</th>
                <th className="text-right p-3 font-semibold">% Juvenile</th>
              </tr>
            </thead>
            <tbody>
              {nat.byOffense.filter(o => o.total > 1000).sort((a, b) => b.total - a.total).slice(0, 20).map(o => (
                <tr key={o.offense} className="border-b border-gray-100">
                  <td className="p-3 font-medium">{o.offense}</td>
                  <td className="p-3 text-right font-mono">{fmtNum(o.total)}</td>
                  <td className="p-3 text-right font-mono">{fmtNum(o.adult)}</td>
                  <td className="p-3 text-right font-mono">{fmtNum(o.juvenile)}</td>
                  <td className="p-3 text-right font-mono">{o.total > 0 ? (o.juvenile / o.total * 100).toFixed(1) + '%' : '—'}</td>
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
          a rough clearance rate of {Math.round(murderArrests / totalMurders * 100)}%. This means approximately 
          {fmtNum(totalMurders - murderArrests)} murders went without an arrest.
        </p>
        <p className="text-gray-600 text-sm">
          Note: Arrest counts don&apos;t perfectly equal clearance rates (one arrest can clear multiple cases, or 
          cases can be cleared by exceptional means). But the gap illustrates a fundamental challenge: for every 
          3 murders in America, roughly 1 goes without anyone being arrested.
        </p>
      </section>

      {/* Drug vs violent arrests */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-primary mb-3">Where Police Focus Their Efforts</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border rounded-xl p-5">
            <p className="text-3xl font-bold text-purple-700">{fmtNum(drugArrests)}</p>
            <p className="font-semibold">Drug Arrests</p>
            <p className="text-xs text-gray-500">{(drugArrests / nat.totalArrests * 100).toFixed(1)}% of all arrests</p>
          </div>
          <div className="bg-white border rounded-xl p-5">
            <p className="text-3xl font-bold text-amber-700">{fmtNum(duiArrests)}</p>
            <p className="font-semibold">DUI Arrests</p>
            <p className="text-xs text-gray-500">{(duiArrests / nat.totalArrests * 100).toFixed(1)}% of all arrests</p>
          </div>
          <div className="bg-white border rounded-xl p-5">
            <p className="text-3xl font-bold text-red-700">{fmtNum(violentArrests)}</p>
            <p className="font-semibold">Violent Crime Arrests</p>
            <p className="text-xs text-gray-500">{(violentArrests / nat.totalArrests * 100).toFixed(1)}% of all arrests</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Drug and DUI arrests together often exceed violent crime arrests — raising questions about policing 
          priorities and resource allocation. Are we arresting our way to safety, or just keeping officers busy?
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
                <th className="text-right p-2 font-semibold">Violent Arrests</th>
                <th className="text-right p-2 font-semibold">Drug Arrests</th>
                <th className="text-right p-2 font-semibold">DUI Arrests</th>
                <th className="text-right p-2 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {statesByViolent.map(s => (
                <tr key={s.state} className="border-b border-gray-100">
                  <td className="p-2 font-medium">{s.state}</td>
                  <td className="p-2 text-right font-mono text-red-600">{fmtNum(s.violentArrests)}</td>
                  <td className="p-2 text-right font-mono">{fmtNum(s.drugArrests)}</td>
                  <td className="p-2 text-right font-mono">{fmtNum(s.duiArrests)}</td>
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
          Juvenile arrests deserve special attention. High juvenile arrest rates for certain offenses (larceny, 
          aggravated assault) often indicate underlying community issues — school quality, economic opportunity, 
          family stability — rather than simply &quot;youth crime.&quot;
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
