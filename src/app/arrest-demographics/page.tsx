import { Metadata } from 'next';
import { loadData, fmtNum } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import ArrestDemoCharts from './ArrestDemoCharts';
import Link from 'next/link';
import AIOverview from '@/components/AIOverview';

export const metadata: Metadata = {
  title: 'Arrest Demographics — Who Gets Arrested in America? | OpenCrime',
  description: 'FBI arrest data broken down by race, sex, and age. 72.5% of arrests are male. Racial disparities in arrest rates vary dramatically by offense type.',
  openGraph: {
    title: 'Arrest Demographics — Who Gets Arrested in America?',
    description: '6.5M arrests analyzed by race, sex, age, and offense. The data reveals stark disparities.',
    url: 'https://www.opencrime.us/arrest-demographics',
  },
  alternates: { canonical: 'https://www.opencrime.us/arrest-demographics' },
};

type RaceRow = { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number; pacificIslander: number };
type SexRow = { offense: string; total: number; male: number; female: number; malePct: number; femalePct: number };
type TrendRow = { offense: string; year1: number; year2: number; pctChange: number };

export default function ArrestDemographicsPage() {
  const data = loadData<{
    byRace: RaceRow[];
    bySex: SexRow[];
    byAge: { age: string; count: number }[];
    tenYearTrends: TrendRow[];
    juvenile: { group: string; handledInDepartment: number; referredToJuvenileCourt: number; referredToWelfare: number; referredToCriminalCourt: number; referredToOther: number }[];
  }>('arrest-data.json');

  const byRace = data?.byRace ?? [];
  const bySex = data?.bySex ?? [];
  const trends = data?.tenYearTrends ?? [];
  const juvenile = data?.juvenile ?? [];

  const raceTotal = byRace.find(r => r.offense === 'TOTAL');
  const sexTotal = bySex.find(s => s.offense === 'TOTAL');

  // Key violent crime race breakdowns
  const violentRace = byRace.filter(r => ['Murder and nonnegligent manslaughter', 'Rape', 'Robbery', 'Aggravated assault'].includes(r.offense));

  // Most female-heavy offenses
  const femaleHeavy = [...bySex].filter(s => s.total > 5000 && s.offense !== 'TOTAL').sort((a, b) => b.femalePct - a.femalePct).slice(0, 10);

  // Most male-heavy
  const maleHeavy = [...bySex].filter(s => s.total > 5000 && s.offense !== 'TOTAL').sort((a, b) => b.malePct - a.malePct).slice(0, 10);

  // Biggest 10yr changes
  const bigDrops = [...trends].filter(t => t.offense !== 'TOTAL1' && t.year2 > 100).sort((a, b) => a.pctChange - b.pctChange).slice(0, 10);
  const bigRises = [...trends].filter(t => t.offense !== 'TOTAL1' && t.pctChange > 0 && t.year2 > 100).sort((a, b) => b.pctChange - a.pctChange).slice(0, 10);

  // Race chart data
  const raceChartData = raceTotal ? [
    { name: 'White', value: raceTotal.white, pct: (raceTotal.white / raceTotal.total * 100).toFixed(1) },
    { name: 'Black', value: raceTotal.black, pct: (raceTotal.black / raceTotal.total * 100).toFixed(1) },
    { name: 'Native American', value: raceTotal.nativeAmerican, pct: (raceTotal.nativeAmerican / raceTotal.total * 100).toFixed(1) },
    { name: 'Asian', value: raceTotal.asian, pct: (raceTotal.asian / raceTotal.total * 100).toFixed(1) },
    { name: 'Pacific Islander', value: raceTotal.pacificIslander, pct: (raceTotal.pacificIslander / raceTotal.total * 100).toFixed(1) },
  ] : [];

  const sexChartData = sexTotal ? [
    { name: 'Male', value: sexTotal.male },
    { name: 'Female', value: sexTotal.female },
  ] : [];

  // Juvenile data
  const juvTotal = juvenile.find(j => j.group.includes('TOTAL AGENCIES'));

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"Dataset","name":"Arrest Demographics — Who Gets Arrested in America? | OpenCrime","description":"FBI arrest data broken down by race, sex, and age. 72.5% of arrests are male. Racial disparities in arrest rates vary dramatically by offense type.","url":"https://www.opencrime.us/arrest-demographics","creator":{"@type":"Organization","name":"OpenCrime","url":"https://www.opencrime.us"},"license":"https://www.opencrime.us/about","sourceOrganization":"FBI Crime Data Explorer"}` }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Arrest Demographics' }]} />
      <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">Who Gets Arrested in America?</h1>
      <p className="text-lg text-gray-600 mb-8">
        FBI arrest data reveals significant demographic patterns. {sexTotal ? `${sexTotal.malePct}% of all arrests are male.` : ''} {raceTotal ? `White individuals account for ${(raceTotal.white / raceTotal.total * 100).toFixed(1)}% of arrests, Black individuals ${(raceTotal.black / raceTotal.total * 100).toFixed(1)}%.` : ''} But these numbers vary dramatically by offense type.
      </p>

      <AIOverview insights={[
        "White individuals account for 65.5% of all arrests, Black individuals 30.5% — but these figures must be read alongside population share and policing intensity.",
        "Hispanic ethnicity is tracked separately from race — 22.3% of arrests where ethnicity was recorded were Hispanic or Latino.",
        "Arrest rates reflect where police are deployed, not just where crime occurs — high-policing neighborhoods generate more arrests regardless of actual crime levels.",
        "The racial composition of arrests varies dramatically by offense type: drug arrests skew differently than violent crime arrests.",
      ]} />

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-8">
        <p className="text-amber-800 text-sm">
          <strong>Important context:</strong> Arrest data reflects policing patterns, not just criminal behavior. Disparities in
          arrest rates can result from differential policing, over-policing of certain communities, socioeconomic factors,
          and systemic inequalities — not solely differences in offending rates.
        </p>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-primary">{fmtNum(raceTotal?.total ?? 0)}</p>
          <p className="text-sm text-gray-600">Total Arrests Analyzed</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-indigo-700">{sexTotal?.malePct ?? 0}%</p>
          <p className="text-sm text-gray-600">Male</p>
        </div>
        <div className="bg-pink-50 border border-pink-200 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-pink-700">{sexTotal?.femalePct ?? 0}%</p>
          <p className="text-sm text-gray-600">Female</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-green-700">-31.1%</p>
          <p className="text-sm text-gray-600">10-Year Arrest Decline</p>
        </div>
      </div>

      <ArrestDemoCharts raceData={raceChartData} sexData={sexChartData} />

      {/* Violent crime by race */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-primary mb-4">Violent Crime Arrests by Race</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Offense</th>
                <th className="text-right p-3 font-semibold">Total</th>
                <th className="text-right p-3 font-semibold">White</th>
                <th className="text-right p-3 font-semibold">Black</th>
                <th className="text-right p-3 font-semibold">Native Am.</th>
                <th className="text-right p-3 font-semibold">Asian</th>
              </tr>
            </thead>
            <tbody>
              {violentRace.map(r => (
                <tr key={r.offense} className="border-b border-gray-100">
                  <td className="p-3 font-medium">{r.offense}</td>
                  <td className="p-3 text-right font-mono">{fmtNum(r.total)}</td>
                  <td className="p-3 text-right font-mono">{fmtNum(r.white)} <span className="text-gray-400 text-xs">({(r.white/r.total*100).toFixed(1)}%)</span></td>
                  <td className="p-3 text-right font-mono">{fmtNum(r.black)} <span className="text-gray-400 text-xs">({(r.black/r.total*100).toFixed(1)}%)</span></td>
                  <td className="p-3 text-right font-mono">{fmtNum(r.nativeAmerican)}</td>
                  <td className="p-3 text-right font-mono">{fmtNum(r.asian)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Gender gap */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-primary mb-4">The Gender Gap in Arrests</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-gray-700">Most Female-Heavy Offenses</h3>
            <div className="space-y-2">
              {femaleHeavy.map(s => (
                <div key={s.offense} className="flex items-center gap-2">
                  <div className="w-48 text-sm truncate">{s.offense}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div className="bg-pink-500 h-4 rounded-full" style={{ width: `${s.femalePct}%` }} />
                  </div>
                  <span className="text-sm font-mono w-14 text-right">{s.femalePct}%</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-gray-700">Most Male-Heavy Offenses</h3>
            <div className="space-y-2">
              {maleHeavy.map(s => (
                <div key={s.offense} className="flex items-center gap-2">
                  <div className="w-48 text-sm truncate">{s.offense}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div className="bg-indigo-500 h-4 rounded-full" style={{ width: `${s.malePct}%` }} />
                  </div>
                  <span className="text-sm font-mono w-14 text-right">{s.malePct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10 year trends */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-primary mb-4">10-Year Arrest Trends</h2>
        <p className="text-gray-600 mb-4">Total arrests dropped 31.1% over the past decade. But the changes vary wildly by offense.</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-green-700">Biggest Drops</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50"><tr><th className="text-left p-2 font-semibold">Offense</th><th className="text-right p-2 font-semibold">Change</th></tr></thead>
                <tbody>
                  {bigDrops.map(t => (
                    <tr key={t.offense} className="border-b border-gray-100">
                      <td className="p-2">{t.offense}</td>
                      <td className="p-2 text-right font-mono text-green-600">{t.pctChange.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-red-700">Biggest Increases</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50"><tr><th className="text-left p-2 font-semibold">Offense</th><th className="text-right p-2 font-semibold">Change</th></tr></thead>
                <tbody>
                  {bigRises.map(t => (
                    <tr key={t.offense} className="border-b border-gray-100">
                      <td className="p-2">{t.offense}</td>
                      <td className="p-2 text-right font-mono text-red-600">+{t.pctChange.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Juvenile dispositions */}
      {juvTotal && (
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-4">Juvenile Dispositions</h2>
          <p className="text-gray-600 mb-4">When juveniles are arrested, what happens to them? Most are handled within the police department rather than referred to court.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-primary">{fmtNum(juvTotal.handledInDepartment)}</p>
              <p className="text-xs text-gray-600">Handled in Department</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-amber-700">{fmtNum(juvTotal.referredToJuvenileCourt)}</p>
              <p className="text-xs text-gray-600">Referred to Juvenile Court</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-700">{fmtNum(juvTotal.referredToWelfare)}</p>
              <p className="text-xs text-gray-600">Referred to Welfare</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-red-700">{fmtNum(juvTotal.referredToCriminalCourt)}</p>
              <p className="text-xs text-gray-600">Referred to Criminal Court</p>
            </div>
          </div>
        </section>
      )}

      <section className="prose prose-gray max-w-none">
        <h2 className="font-display text-2xl font-bold text-primary">Reading This Data Responsibly</h2>
        <p>
          Arrest demographics are among the most misused statistics in public discourse. Key context:
        </p>
        <ul>
          <li><strong>Arrests ≠ guilt.</strong> An arrest means police believed probable cause existed. Many arrests don&apos;t lead to charges or convictions.</li>
          <li><strong>Policing patterns matter.</strong> Communities with more police presence generate more arrests for low-level offenses, regardless of actual crime rates.</li>
          <li><strong>Socioeconomic factors drive disparities.</strong> Poverty, unemployment, housing instability, and lack of opportunity correlate with crime — and these factors are not evenly distributed across racial groups due to historical and ongoing systemic inequalities.</li>
          <li><strong>Population proportions are critical.</strong> Raw arrest numbers must be compared against population demographics to understand rates, not just totals.</li>
        </ul>
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/arrests" className="text-primary hover:underline">→ Full Arrests Overview</Link>
        <Link href="/arrest-efficiency" className="text-primary hover:underline">→ Arrest Efficiency</Link>
        <Link href="/analysis/racial-disparities" className="text-primary hover:underline">→ Crime Victimization Analysis</Link>
        <Link href="/analysis/juvenile-crime" className="text-primary hover:underline">→ Juvenile Crime</Link>
      </div>

      <ShareButtons title="Arrest Demographics — Who Gets Arrested in America?" />
    </main>
  );
}
