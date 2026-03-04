import { loadData, fmtNum, fmtRate, fmtPct } from '@/lib/utils';
import type { NationalTrend } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import DashboardCharts from './DashboardCharts';

export const metadata: Metadata = {
  title: 'Crime Dashboard — National Crime Trends 1979–2024',
  description: 'Interactive dashboard showing 45 years of US crime data. Violent crime, property crime, murder rates with charts and trends from FBI statistics.',
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-bold mb-2">National Crime Dashboard</h1>
      <p className="text-gray-600 mb-8">
        {national.length} years of FBI crime data ({national[0].year}–{national[national.length - 1].year})
      </p>

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

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/states" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Browse States</Link>
        <Link href="/rankings" className="bg-red-700 text-white px-5 py-2 rounded-lg hover:bg-red-800 transition">City Rankings</Link>
        <Link href="/crimes" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Crime Types</Link>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        Source: FBI Crime Data Explorer, SRS Estimated Crimes. National data gap 2017–2020 due to FBI transition from SRS to NIBRS reporting system.
      </p>
    </div>
  );
}
