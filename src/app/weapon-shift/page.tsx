import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import WeaponCharts from './WeaponCharts';

export const metadata: Metadata = {
  title: 'The Weapon Shift — How Americans Are Killed Is Changing',
  description: 'FBI data shows firearms account for a growing share of murders while knives and personal weapons decline. 5 years of weapon trend data visualized.',
  openGraph: { title: 'The Weapon Shift', description: 'How murder weapons have changed: firearms rising, everything else falling.' },
  alternates: { canonical: 'https://www.opencrime.us/weapon-shift' },
};

type HomicideData = {
  weaponBreakdown: { weapon: string; count: number }[];
  yearlyWeapons: { year: number; firearm: number; knife: number; hands: number; other: number }[];
};

export default function WeaponShiftPage() {
  const data = loadData<HomicideData>('homicide-data.json');
  const weapons = data.weaponBreakdown.filter(w => w.count > 0 && !w.weapon.includes('total') && !w.weapon.includes('Total'));
  const yearly = data.yearlyWeapons;
  const latest = yearly[yearly.length - 1];
  const total = latest.firearm + latest.knife + latest.hands + latest.other;
  const firearmPct = (latest.firearm / total * 100).toFixed(0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Weapon Shift' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">The Weapon Shift: How Murder Weapons Are Changing</h1>

      <div className="bg-red-900 text-white rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{firearmPct}%</div>
            <div className="text-red-200 text-sm">Murders by Firearm ({latest.year})</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtNum(latest.firearm)}</div>
            <div className="text-red-200 text-sm">Gun Murders</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtNum(latest.knife)}</div>
            <div className="text-red-200 text-sm">Knife Murders</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtNum(latest.hands)}</div>
            <div className="text-red-200 text-sm">Hands/Fists/Feet</div>
          </div>
        </div>
      </div>

      <WeaponCharts yearly={yearly} weapons={weapons} />

      <div className="prose prose-lg max-w-none mt-8 mb-8">
        <h2 className="font-heading">What the Data Shows</h2>
        <p>
          The share of murders committed with firearms has remained stubbornly high — around {firearmPct}% 
          in {latest.year}. But the composition of murder weapons has shifted in important ways over 
          the past five years:
        </p>
        <ul>
          <li><strong>Handguns dominate:</strong> Among gun murders where the type is specified, 
            handguns account for the vast majority. Rifles (including all semi-automatic rifles) 
            account for roughly 3% of gun murders.</li>
          <li><strong>Knives declining:</strong> Knife murders fell from {fmtNum(yearly[0]?.knife ?? 0)} in {yearly[0]?.year} to {fmtNum(latest.knife)} in {latest.year}.</li>
          <li><strong>Personal weapons declining:</strong> Murders by hands, fists, and feet dropped similarly.</li>
          <li><strong>&quot;Other&quot; category:</strong> Includes blunt objects, poison, narcotics, fire, and other means.</li>
        </ul>

        <h2 className="font-heading">2024 Weapon Breakdown</h2>
        <table>
          <thead><tr><th>Weapon</th><th>Count</th></tr></thead>
          <tbody>
            {weapons.slice(0, 12).map(w => (
              <tr key={w.weapon}><td>{w.weapon}</td><td>{fmtNum(w.count)}</td></tr>
            ))}
          </tbody>
        </table>

        <h2 className="font-heading">The Rifle Question</h2>
        <p>
          One of the most politically contentious data points: rifles of all types (bolt-action, 
          lever-action, semi-automatic including AR-15-style) account for roughly 400-500 murders 
          per year. This is fewer than knives (~1,500), blunt objects (~280), or even personal 
          weapons (~630). Mass shootings with rifles receive enormous media attention, but by volume, 
          handguns are the overwhelmingly dominant murder weapon.
        </p>
        <p>
          This doesn&apos;t settle the gun policy debate — mass casualty potential, lethality at 
          distance, and rate of fire are all relevant considerations beyond raw counts. But anyone 
          discussing gun violence policy should be aware of these numbers.
        </p>

        <h2 className="font-heading">The Narcotics Factor</h2>
        <p>
          An emerging category: murders by narcotics (poisoning with drugs, often fentanyl) numbered 
          {fmtNum(weapons.find(w => w.weapon.toLowerCase().includes('narcotic'))?.count ?? 0)} in {latest.year}. 
          Some legal scholars argue that fentanyl dealers whose product kills users should be charged 
          with murder — and indeed, &quot;drug-induced homicide&quot; prosecutions have increased dramatically.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link href="/analysis/gun-violence" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Gun Violence Data</Link>
        <Link href="/murder-rate" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Murder Rate</Link>
        <Link href="/analysis/mass-shootings" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Mass Shootings</Link>
      </div>

      <div className="mt-8"><ShareButtons title="The Weapon Shift" /></div>
      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer, Expanded Homicide Data, 2020-2024.</p>
    </div>
  );
}
