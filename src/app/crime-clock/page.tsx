import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import CrimeClockClient from './CrimeClockClient';

export const metadata: Metadata = {
  title: 'Crime Clock — How Often Does Crime Happen in America?',
  description: 'A violent crime occurs every 26 seconds. A murder every 31 minutes. See the real-time frequency of crime in the United States, based on FBI 2024 data.',
  openGraph: { title: 'Crime Clock', description: 'A violent crime every 26 seconds. A murder every 31 minutes. See crime frequency in real time.' },
};

type Analytics = {
  crimeClock: Record<string, number>;
  concentration: { top10: { murders: number; murderPct: number; popPct: number; cities: { city: string; state: string; murders: number }[] }; top50: { murders: number; murderPct: number }; totalCityMurders: number };
};

export default function CrimeClockPage() {
  const analytics = loadData<Analytics>('analytics.json');
  const cc = analytics.crimeClock;

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    return `${(seconds / 3600).toFixed(1)} hours`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Crime Clock' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">The Crime Clock</h1>
      <p className="text-lg text-gray-600 mb-8">
        How often does crime actually happen in America? Based on FBI 2024 data, 
        here&apos;s the real frequency of crime — one number at a time.
      </p>

      <CrimeClockClient crimeClock={cc} />

      <div className="grid md:grid-cols-2 gap-4 mt-8 mb-8">
        <div className="bg-red-900 text-white rounded-xl p-6">
          <h3 className="font-heading text-lg font-bold mb-4 text-red-200">Violent Crime</h3>
          <div className="space-y-3">
            {[
              { label: 'Violent crime', seconds: cc.violentCrime, color: 'text-red-300' },
              { label: 'Aggravated assault', seconds: cc.assault, color: 'text-red-300' },
              { label: 'Robbery', seconds: cc.robbery, color: 'text-red-300' },
              { label: 'Rape', seconds: cc.rape, color: 'text-red-300' },
              { label: 'Murder', seconds: cc.murder, color: 'text-red-300' },
            ].map(c => (
              <div key={c.label} className="flex justify-between items-center border-b border-red-800 pb-2">
                <span>{c.label}</span>
                <span className={`font-mono font-bold ${c.color}`}>every {formatTime(c.seconds)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#1e3a5f] text-white rounded-xl p-6">
          <h3 className="font-heading text-lg font-bold mb-4 text-blue-200">Property Crime</h3>
          <div className="space-y-3">
            {[
              { label: 'Property crime', seconds: cc.propertyCrime },
              { label: 'Larceny-theft', seconds: cc.larceny },
              { label: 'Motor vehicle theft', seconds: cc.motorVehicleTheft },
              { label: 'Burglary', seconds: cc.burglary },
            ].map(c => (
              <div key={c.label} className="flex justify-between items-center border-b border-blue-800 pb-2">
                <span>{c.label}</span>
                <span className="font-mono font-bold text-blue-200">every {formatTime(c.seconds)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">Putting It in Perspective</h2>
        <p>
          While you&apos;ve been reading this page (roughly 2 minutes), approximately {Math.round(120 / cc.violentCrime)} violent 
          crimes and {Math.round(120 / cc.propertyCrime)} property crimes were reported somewhere in America. 
          In the time it takes to watch a movie (~2 hours), roughly {Math.round(7200 / cc.murder)} people will be murdered.
        </p>
        <p>
          But context matters enormously. These crimes are not randomly distributed — they are 
          hyper-concentrated in specific neighborhoods, among specific demographics, at specific 
          times. Your personal risk depends far more on where you live and your circumstances 
          than on national averages.
        </p>

        <h2 className="font-heading">The Concentration of Violence</h2>
        <p>
          Just <strong>10 cities</strong> account for <strong>{analytics.concentration.top10.murderPct}% of all reported murders</strong> while 
          containing only {analytics.concentration.top10.popPct}% of the population. The top 50 cities 
          account for {analytics.concentration.top50.murderPct}%.
        </p>
        <p>
          Within those cities, violence is even more concentrated. Research consistently shows that 
          1-2% of street blocks generate 25-50% of all violent crime. This means that for most 
          Americans in most neighborhoods, the crime clock ticks much, much more slowly than 
          the national average suggests.
        </p>
      </div>

      <h3 className="font-heading text-xl font-bold mb-4">Cities With the Most Murders (2024)</h3>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-red-50"><tr><th className="text-left px-4 py-2">#</th><th className="text-left px-4 py-2">City</th><th className="text-right px-4 py-2">Murders</th></tr></thead>
          <tbody>
            {analytics.concentration.top10.cities.map((c, i) => (
              <tr key={i} className="border-t"><td className="px-4 py-2 text-gray-400">{i+1}</td><td className="px-4 py-2 font-medium">{c.city}, {c.state}</td><td className="px-4 py-2 text-right font-mono text-red-600 font-bold">{fmtNum(c.murders)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8"><ShareButtons title="Crime Clock — How Often Does Crime Happen?" /></div>
      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer, 2024 national estimates. Crime clock calculated by dividing seconds in a year by total offenses.</p>
    </div>
  );
}
