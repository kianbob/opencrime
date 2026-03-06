import { loadData, fmtNum, fmtRate, fmtPct } from '@/lib/utils';
import type { NationalTrend } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import DashboardCharts from './DashboardCharts';
import LastUpdated from '@/components/LastUpdated';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import AIOverview from '@/components/AIOverview';

type RaceRow = { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number; pacificIslander: number };
type EthRow = { offense: string; totalEthnicity: number; hispanic: number; notHispanic: number; hispanicPct: number; notHispanicPct: number };

export const metadata: Metadata = {
  title: 'Crime Dashboard — National Crime Trends 1979–2024',
  description: 'Interactive dashboard showing 45 years of US crime data. Violent crime, property crime, murder rates with charts and trends from FBI statistics.',
  openGraph: { url: 'https://www.opencrime.us/dashboard' },
  alternates: { canonical: 'https://www.opencrime.us/dashboard' },
};

type Stats = {
  national2024: NationalTrend;
  peakYear: { year: number; violentRate: number; homicideRate: number };
  trends: { violentCrimeChange1yr: number; violentCrimeChange3yr: number; violentCrimeChangeSincePeak: number; homicideChange1yr: number };
};

export default function DashboardPage() {
  const national = loadData<NationalTrend[]>('national-trends.json');
  const stats = loadData<Stats>('stats.json');
  const n = stats.national2024;
  const arrestData = loadData<{ byRace: RaceRow[]; byEthnicity: EthRow[] }>('arrest-data.json');
  const raceTotal = arrestData.byRace.find(r => r.offense === 'TOTAL');
  const ethTotal = arrestData.byEthnicity.find(e => e.offense === 'TOTAL');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{label:'Dashboard'}]} />
      <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
        <h1 className="font-heading text-3xl font-bold">National Crime Dashboard</h1>
        <ShareButtons title="National Crime Dashboard — FBI Data 1979–2024" />
      </div>
      <p className="text-gray-600 mb-8">
        {national.length} years of FBI crime data ({national[0].year}–{national[national.length - 1].year})
      </p>

      <AIOverview insights={[
        "Violent crime is down 52.6% from the 1991 peak of 758.2 per 100K — the longest sustained decline in American history.",
        "The U.S. recorded 16,935 homicides in 2024 at a rate of 5.0 per 100K — below the 45-year average of 7.4.",
        "Property crime accounts for 83% of all reported crime, yet receives a fraction of media attention compared to violent offenses.",
        "The 2017–2020 data gap in national estimates reflects the FBI's troubled transition from SRS to NIBRS — the largest disruption in crime data since the UCR began in 1930.",
      ]} />

      {/* Hero Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Violent Crimes', value: fmtNum(n.violentCrime), sub: `Rate: ${fmtRate(n.violentRate)}`, color: 'text-red-600' },
          { label: 'Homicides', value: fmtNum(n.homicide), sub: `Rate: ${fmtRate(n.homicideRate)}`, color: 'text-red-700' },
          { label: 'Property Crimes', value: fmtNum(n.propertyCrime), sub: `Rate: ${fmtRate(n.propertyRate)}`, color: 'text-[#1e3a5f]' },
          { label: 'Since 1991 Peak', value: fmtPct(stats.trends.violentCrimeChangeSincePeak), sub: `Peak: ${fmtRate(stats.peakYear.violentRate)}`, color: 'text-green-600' },
          { label: 'YoY Change', value: fmtPct(stats.trends.violentCrimeChange1yr), sub: '2023 → 2024', color: stats.trends.violentCrimeChange1yr < 0 ? 'text-green-600' : 'text-red-600' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm border p-4">
            <div className="text-sm text-gray-500">{stat.label}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* 2024 Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4">2024 Crime Breakdown</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-red-700 mb-2">Violent Crime: {fmtNum(n.violentCrime)}</h3>
            {[
              { label: 'Murder', value: n.homicide, rate: n.homicideRate },
              { label: 'Rape', value: n.rape },
              { label: 'Robbery', value: n.robbery },
              { label: 'Aggravated Assault', value: n.aggravatedAssault },
            ].map(item => (
              <div key={item.label} className="flex justify-between text-sm py-1 border-b border-gray-100">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-mono">{fmtNum(item.value)}</span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-semibold text-[#1e3a5f] mb-2">Property Crime: {fmtNum(n.propertyCrime)}</h3>
            {[
              { label: 'Burglary', value: n.burglary },
              { label: 'Larceny-Theft', value: n.larceny },
              { label: 'Motor Vehicle Theft', value: n.motorVehicleTheft },
            ].map(item => (
              <div key={item.label} className="flex justify-between text-sm py-1 border-b border-gray-100">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-mono">{fmtNum(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DashboardCharts data={national} />

      {/* Arrest Demographics by Race */}
      {raceTotal && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="font-heading text-xl font-bold mb-4">National Arrest Demographics by Race</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">Race</th>
                  <th className="text-right px-4 py-2">Arrests</th>
                  <th className="text-right px-4 py-2">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'White', value: raceTotal.white },
                  { label: 'Black or African American', value: raceTotal.black },
                  { label: 'American Indian/Alaska Native', value: raceTotal.nativeAmerican },
                  { label: 'Asian', value: raceTotal.asian },
                  { label: 'Native Hawaiian/Pacific Islander', value: raceTotal.pacificIslander },
                ].map(row => (
                  <tr key={row.label} className="border-t">
                    <td className="px-4 py-2">{row.label}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtNum(row.value)}</td>
                    <td className="px-4 py-2 text-right font-mono">{(row.value / raceTotal.total * 100).toFixed(1)}%</td>
                  </tr>
                ))}
                <tr className="border-t font-semibold bg-gray-50">
                  <td className="px-4 py-2">Total</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtNum(raceTotal.total)}</td>
                  <td className="px-4 py-2 text-right font-mono">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
          {ethTotal && (
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-[#1e3a5f]">{ethTotal.hispanicPct}%</div>
                <div className="text-sm text-gray-600">Hispanic or Latino</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-[#1e3a5f]">{ethTotal.notHispanicPct}%</div>
                <div className="text-sm text-gray-600">Not Hispanic or Latino</div>
              </div>
            </div>
          )}
          <p className="text-sm text-gray-500 mt-4">
            Arrest data reflects law enforcement activity and policing patterns, not necessarily the distribution
            of criminal behavior. Factors including poverty, policing intensity, and systemic inequities affect arrest rates.
            See <Link href="/arrest-demographics" className="text-[#1e3a5f] hover:underline">full demographic breakdown</Link> and
            our <Link href="/analysis/racial-disparities" className="text-[#1e3a5f] hover:underline">analysis of racial disparities</Link>.
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/states" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Browse States</Link>
        <Link href="/rankings" className="bg-red-700 text-white px-5 py-2 rounded-lg hover:bg-red-800 transition">City Rankings</Link>
        <Link href="/crimes" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Crime Types</Link>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        Source: FBI Crime Data Explorer, SRS Estimated Crimes. National data gap 2017–2020 due to FBI transition from SRS to NIBRS reporting system.
      </p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'National Crime Dashboard — US Crime Trends 1979–2024',
        description: `Interactive dashboard showing 45 years of US crime data. ${fmtNum(n.violentCrime)} violent crimes and ${fmtNum(n.homicide)} homicides in 2024.`,
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        datePublished: '2025-01-01',
        dateModified: '2026-03-04',
        mainEntityOfPage: 'https://www.opencrime.us/dashboard',
      })}} />
      <LastUpdated />
    </div>
  );
}
