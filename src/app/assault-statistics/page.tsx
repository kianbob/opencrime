import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { NationalTrend } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

type RaceRow = { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number; pacificIslander: number };
type EthRow = { offense: string; totalEthnicity: number; hispanic: number; notHispanic: number; hispanicPct: number; notHispanicPct: number };

export const metadata: Metadata = {
  title: 'Aggravated Assault Statistics 2024 — US Assault Rates & Trends',
  description: 'US aggravated assault statistics: rates, trends, weapon data. FBI 2024 data shows assault is the most common violent crime.',
  openGraph: { url: 'https://www.opencrime.us/assault-statistics' },
  alternates: { canonical: 'https://www.opencrime.us/assault-statistics' },
};

export default function AssaultPage() {
  const national = loadData<NationalTrend[]>('national-trends.json');
  const n = national[national.length - 1];
  const assaultRate = n.aggravatedAssault / n.population * 100000;
  const pctOfViolent = (n.aggravatedAssault / n.violentCrime * 100).toFixed(0);
  const peak = national.reduce((max, y) => (y.aggravatedAssault / y.population * 100000) > (max.aggravatedAssault / max.population * 100000) ? y : max, national[0]);
  const peakRate = peak.aggravatedAssault / peak.population * 100000;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Aggravated Assault Statistics 2024' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Aggravated Assault Statistics 2024</h1>

      <div className="bg-red-700 text-white rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{fmtNum(n.aggravatedAssault)}</div>
            <div className="text-red-200 text-sm">Aggravated Assaults</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtRate(assaultRate)}</div>
            <div className="text-red-200 text-sm">per 100K People</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{pctOfViolent}%</div>
            <div className="text-red-200 text-sm">of All Violent Crime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">-{((1 - assaultRate / peakRate) * 100).toFixed(0)}%</div>
            <div className="text-red-200 text-sm">Since {peak.year} Peak</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <p>
          Aggravated assault is the most common violent crime in America, accounting for {pctOfViolent}% 
          of all violent crimes reported in 2024. There were {fmtNum(n.aggravatedAssault)} aggravated 
          assaults, at a rate of {fmtRate(assaultRate)} per 100,000 residents.
        </p>
        <p>
          Unlike simple assault, aggravated assault involves the use of a weapon or circumstances 
          likely to cause serious bodily injury. The crime includes attacks with firearms, knives, 
          blunt objects, and other dangerous weapons.
        </p>

        <h2 className="font-heading">Historical Trends</h2>
        <p>
          Aggravated assault peaked at a rate of {fmtRate(peakRate)} per 100,000 in {peak.year} and 
          has since declined by {((1 - assaultRate / peakRate) * 100).toFixed(0)}%. The decline mirrors 
          the broader violent crime decline, though assault has not fallen as dramatically as robbery 
          or burglary.
        </p>

        <h2 className="font-heading">Weapons Used in Aggravated Assault</h2>
        <p>Based on FBI expanded data, the weapons breakdown in aggravated assaults is approximately:</p>
        <ul>
          <li><strong>Personal weapons</strong> (hands, fists, feet): ~25%</li>
          <li><strong>Firearms:</strong> ~25%</li>
          <li><strong>Knives/cutting instruments:</strong> ~17%</li>
          <li><strong>Other weapons</strong> (clubs, bats, bottles, etc.): ~33%</li>
        </ul>

        <h2 className="font-heading">Key Patterns</h2>
        <ul>
          <li><strong>Domestic violence</strong> accounts for a significant portion of aggravated assaults — many occur between people who know each other</li>
          <li><strong>Alcohol involvement</strong> is a factor in roughly 40% of aggravated assaults, making it the crime most associated with drinking</li>
          <li><strong>Summer months</strong> see higher assault rates — hot weather increases interpersonal contact and aggression</li>
          <li><strong>Nighttime hours</strong> (10 PM - 3 AM) are peak times, especially on weekends</li>
          <li><strong>Males</strong> are both perpetrators and victims at rates roughly 3-4x higher than females</li>
        </ul>

        <h2 className="font-heading">Assault vs. Murder</h2>
        <p>
          The line between aggravated assault and murder is often just a matter of medical response time 
          and aim. Improvements in trauma medicine have likely prevented many assaults from becoming 
          homicides — some researchers argue that the murder rate would be 3-4x higher without modern 
          emergency medicine. This suggests the &quot;intent to harm&quot; hasn&apos;t declined as much as 
          murder statistics suggest.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/crime-rate" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">All Crime Data</Link>
        <Link href="/analysis/domestic-violence" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Domestic Violence</Link>
        <Link href="/analysis/gun-violence" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Gun Violence</Link>
      </div>

      <div className="mt-8"><ShareButtons title="Aggravated Assault Statistics 2024" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is aggravated assault?', acceptedAnswer: { '@type': 'Answer', text: 'Aggravated assault is an unlawful attack upon a person for the purpose of inflicting severe or aggravated bodily injury, usually involving a weapon or means likely to produce death or great bodily harm.' }},
          { '@type': 'Question', name: 'How common is aggravated assault?', acceptedAnswer: { '@type': 'Answer', text: `There were ${n.aggravatedAssault.toLocaleString()} aggravated assaults in 2024, making it the most common violent crime (${pctOfViolent}% of all violent crime).` }},
        ]
      })}} />

      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer, 2024.</p>
    </div>
  );
}
