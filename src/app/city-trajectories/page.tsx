import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import TrajectoryCharts from './TrajectoryCharts';

export const metadata: Metadata = {
  title: 'City Crime Trajectories — Which Cities Are Getting Safer or More Dangerous?',
  description: 'Every US city classified by crime trajectory: improving, worsening, volatile, stable-safe, or stable-dangerous. See which direction your city is heading.',
  openGraph: { title: 'City Crime Trajectories', description: 'Every US city classified: improving, worsening, volatile, stable-safe, or stable-dangerous.' },
};

type City = { slug: string; city: string; state: string; population: number; violentRate: number; murderRate: number; trajectory: string; safetyPercentile: number };
type Analytics = { trajectoryCount: Record<string, number> };

const TRAJ_META: Record<string, { label: string; color: string; bg: string; desc: string }> = {
  'stable-safe': { label: 'Stable Safe', color: 'text-green-700', bg: 'bg-green-50', desc: 'Consistently low crime' },
  'improving': { label: 'Improving', color: 'text-emerald-600', bg: 'bg-emerald-50', desc: 'Crime declining year over year' },
  'volatile': { label: 'Volatile', color: 'text-amber-600', bg: 'bg-amber-50', desc: 'Crime fluctuating up and down' },
  'worsening': { label: 'Worsening', color: 'text-red-600', bg: 'bg-red-50', desc: 'Crime increasing year over year' },
  'stable-dangerous': { label: 'Stable Dangerous', color: 'text-red-800', bg: 'bg-red-100', desc: 'Consistently high crime' },
};

export default function TrajectoryPage() {
  const cities = loadData<City[]>('city-index.json');
  const analytics = loadData<Analytics>('analytics.json');
  const large = cities.filter(c => c.population >= 100000 && c.trajectory !== 'unknown');

  const groups = Object.entries(TRAJ_META).map(([key, meta]) => ({
    key,
    ...meta,
    cities: large.filter(c => c.trajectory === key).sort((a, b) => b.population - a.population),
    count: analytics.trajectoryCount[key] || 0,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'City Trajectories' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">City Crime Trajectories</h1>
      <p className="text-lg text-gray-600 mb-8">
        Every city classified by its multi-year crime trend: is it getting safer, more dangerous, 
        or staying the same? Based on 3-5 years of FBI data.
      </p>

      <TrajectoryCharts trajectoryCount={analytics.trajectoryCount} />

      <div className="grid md:grid-cols-5 gap-3 mb-8 mt-8">
        {groups.map(g => (
          <div key={g.key} className={`${g.bg} rounded-xl p-4 text-center`}>
            <div className={`text-3xl font-bold ${g.color}`}>{fmtNum(g.count)}</div>
            <div className="text-sm font-semibold">{g.label}</div>
            <div className="text-xs text-gray-500">{g.desc}</div>
          </div>
        ))}
      </div>

      {groups.map(g => g.cities.length > 0 && (
        <div key={g.key} className="mb-8">
          <h2 className={`font-heading text-2xl font-bold mb-3 ${g.color}`}>
            {g.label} Cities <span className="text-sm font-normal text-gray-500">(100K+ pop, {g.cities.length} cities)</span>
          </h2>
          <div className={`${g.bg} rounded-xl border overflow-x-auto`}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left px-3 py-2">City</th>
                  <th className="text-right px-3 py-2">Population</th>
                  <th className="text-right px-3 py-2">Violent Rate</th>
                  <th className="text-right px-3 py-2">Safety Pctile</th>
                </tr>
              </thead>
              <tbody>
                {g.cities.slice(0, 15).map(c => (
                  <tr key={c.slug} className="border-t">
                    <td className="px-3 py-2">
                      <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline font-medium">{c.city}</Link>
                      <span className="text-gray-400 text-xs ml-1">{c.state}</span>
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
                    <td className="px-3 py-2 text-right font-mono font-semibold">{fmtRate(c.violentRate)}</td>
                    <td className="px-3 py-2 text-right font-mono">{c.safetyPercentile}th</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div className="prose prose-lg max-w-none mt-8 mb-8">
        <h2 className="font-heading">How We Classify Trajectories</h2>
        <ul>
          <li><strong>Improving:</strong> Violent crime rate has declined every year for 3+ years</li>
          <li><strong>Worsening:</strong> Rate has increased every year for 3+ years</li>
          <li><strong>Stable Safe:</strong> Consistently low rate (under 150/100K) with no increasing trend</li>
          <li><strong>Stable Dangerous:</strong> Consistently high rate (over 800/100K) with no declining trend</li>
          <li><strong>Volatile:</strong> Rate goes up some years and down others — the most common pattern</li>
        </ul>
        <p>
          Most cities are classified as <strong>volatile</strong> — crime rates naturally fluctuate 
          year to year. Only cities with consistent multi-year trends earn an &quot;improving&quot; 
          or &quot;worsening&quot; label. This makes the cities classified as truly improving or 
          worsening particularly notable.
        </p>
      </div>

      <div className="mt-8"><ShareButtons title="City Crime Trajectories" /></div>
      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer, 2020-2024. Trajectory calculated from multi-year violent crime rate trends.</p>
    </div>
  );
}
