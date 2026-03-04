import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { NationalTrend } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

type RaceRow = { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number; pacificIslander: number };
type EthRow = { offense: string; totalEthnicity: number; hispanic: number; notHispanic: number; hispanicPct: number; notHispanicPct: number };

export const metadata: Metadata = {
  title: 'Robbery Statistics 2024 — US Robbery Rates, Trends & Data',
  description: 'US robbery statistics: rates, trends, and data from FBI 2024 reports. National robbery figures, historical context, and analysis.',
  openGraph: { url: 'https://www.opencrime.us/robbery-statistics' },
  alternates: { canonical: 'https://www.opencrime.us/robbery-statistics' },
};

export default function RobberyPage() {
  const national = loadData<NationalTrend[]>('national-trends.json');
  const n = national[national.length - 1];
  const robberyRate = n.robbery / n.population * 100000;
  const peak = national.reduce((max, y) => (y.robbery / y.population * 100000) > (max.robbery / max.population * 100000) ? y : max, national[0]);
  const peakRate = peak.robbery / peak.population * 100000;
  const arrestData = loadData<{ byRace: RaceRow[]; byEthnicity: EthRow[] }>('arrest-data.json');
  const robRace = arrestData.byRace.find(r => r.offense === 'Robbery');
  const robEth = arrestData.byEthnicity.find(e => e.offense === 'Robbery');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Robbery Statistics 2024' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Robbery Statistics 2024</h1>

      <div className="bg-red-800 text-white rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{fmtNum(n.robbery)}</div>
            <div className="text-red-200 text-sm">Total Robberies</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtRate(robberyRate)}</div>
            <div className="text-red-200 text-sm">per 100K People</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">-{((1 - robberyRate / peakRate) * 100).toFixed(0)}%</div>
            <div className="text-red-200 text-sm">Since {peak.year} Peak</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <p>
          In 2024, there were {fmtNum(n.robbery)} reported robberies in the United States — a rate 
          of {fmtRate(robberyRate)} per 100,000 residents. Robbery is the taking of property from a person 
          by force or threat of force, making it both a violent crime and a property crime.
        </p>
        <p>
          Robbery has declined dramatically from its peak of {fmtRate(peakRate)} per 100,000 in {peak.year}. 
          The current rate is {((1 - robberyRate / peakRate) * 100).toFixed(0)}% lower — one of the largest 
          declines among violent crime categories.
        </p>

        <h2 className="font-heading">Key Facts About Robbery</h2>
        <ul>
          <li><strong>Street robbery</strong> (mugging) accounts for the largest share of incidents</li>
          <li><strong>Commercial robbery</strong> (convenience stores, banks, gas stations) has declined with improved security</li>
          <li><strong>Firearms</strong> are used in about 40% of robberies; strong-arm (no weapon) accounts for roughly 40%</li>
          <li><strong>Young males aged 15-24</strong> commit and are victimized by robbery at the highest rates</li>
          <li><strong>Urban areas</strong> have robbery rates several times higher than suburban or rural areas</li>
          <li><strong>Bank robbery</strong> has declined dramatically since the 1990s due to surveillance, GPS-tracked dye packs, and reduced cash on hand</li>
        </ul>

        <h2 className="font-heading">Why Has Robbery Declined?</h2>
        <p>
          The decline in robbery mirrors the broader crime decline, but several factors are specific to robbery:
        </p>
        <ul>
          <li><strong>The cashless economy.</strong> Fewer people carry significant cash, reducing the payoff for street robbery.</li>
          <li><strong>Surveillance technology.</strong> Ubiquitous cameras, GPS tracking, and smartphone location data make robbery much riskier.</li>
          <li><strong>Improved security.</strong> Banks, convenience stores, and commercial establishments have invested heavily in deterrence.</li>
          <li><strong>Demographic shifts.</strong> The aging of the population means fewer people in the prime robbery-committing age range.</li>
        </ul>
      </div>

      {/* Robbery Arrest Demographics */}
      {robRace && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="font-heading text-xl font-bold mb-4">Robbery Arrests by Race &amp; Ethnicity</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2">Race</th>
                  <th className="text-right px-3 py-2">Arrests</th>
                  <th className="text-right px-3 py-2">%</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'White', value: robRace.white },
                  { label: 'Black or African American', value: robRace.black },
                  { label: 'American Indian/Alaska Native', value: robRace.nativeAmerican },
                  { label: 'Asian', value: robRace.asian },
                  { label: 'Native Hawaiian/Pacific Islander', value: robRace.pacificIslander },
                ].map(row => (
                  <tr key={row.label} className="border-t">
                    <td className="px-3 py-2">{row.label}</td>
                    <td className="px-3 py-2 text-right font-mono">{fmtNum(row.value)}</td>
                    <td className="px-3 py-2 text-right font-mono">{(row.value / robRace.total * 100).toFixed(1)}%</td>
                  </tr>
                ))}
                <tr className="border-t font-semibold bg-gray-50">
                  <td className="px-3 py-2">Total</td>
                  <td className="px-3 py-2 text-right font-mono">{fmtNum(robRace.total)}</td>
                  <td className="px-3 py-2 text-right font-mono">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
          {robEth && (
            <div className="mt-4 flex gap-4">
              <div className="bg-red-50 rounded-lg p-3 flex-1 text-center">
                <div className="text-xl font-bold text-red-700">{robEth.hispanicPct}%</div>
                <div className="text-xs text-gray-600">Hispanic/Latino</div>
              </div>
              <div className="bg-red-50 rounded-lg p-3 flex-1 text-center">
                <div className="text-xl font-bold text-red-700">{robEth.notHispanicPct}%</div>
                <div className="text-xs text-gray-600">Not Hispanic/Latino</div>
              </div>
            </div>
          )}
          <p className="text-sm text-gray-500 mt-4">
            Arrest data reflects policing patterns, not the true distribution of criminal behavior.
            See <Link href="/arrest-demographics" className="text-[#1e3a5f] hover:underline">full demographics</Link> |{' '}
            <Link href="/analysis/racial-disparities" className="text-[#1e3a5f] hover:underline">racial disparities</Link> |{' '}
            <Link href="/analysis/who-commits-crime" className="text-[#1e3a5f] hover:underline">who commits crime</Link>
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/crime-rate" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">All Crime Data</Link>
        <Link href="/analysis/gun-violence" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Gun Violence</Link>
        <Link href="/crimes" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Crime Types</Link>
      </div>

      <div className="mt-8"><ShareButtons title="Robbery Statistics 2024" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How many robberies happen in the US each year?', acceptedAnswer: { '@type': 'Answer', text: `There were ${n.robbery.toLocaleString()} robberies in the US in 2024, a rate of ${robberyRate.toFixed(1)} per 100,000.` }},
        ]
      })}} />

      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer, 2024.</p>
    </div>
  );
}
