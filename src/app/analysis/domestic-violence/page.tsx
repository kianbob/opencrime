import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Domestic Violence in America: The Hidden Epidemic',
  description: 'Over 40% of female murder victims are killed by intimate partners. FBI expanded homicide data reveals the scale of domestic violence in America.',
  openGraph: { title: 'Domestic Violence in America: The Hidden Epidemic', description: 'Over 40% of female murder victims killed by intimate partners. FBI data on the scale of domestic violence.', url: 'https://www.opencrime.us/analysis/domestic-violence' },
  alternates: { canonical: 'https://www.opencrime.us/analysis/domestic-violence' },
};

type VictimRace = { race: string; total: number; male: number; female: number };
type VictimEth = { ethnicity: string; total: number; male: number; female: number };

type HomicideData = {
  circumstanceBreakdown: { circumstance: string; count: number }[];
  victimSex: { sex: string; count: number }[];
  victimRace: VictimRace[];
  victimEthnicity: VictimEth[];
  relationship: { relationship: string; count: number }[];
};

export default function DomesticViolencePage() {
  const data = loadData<HomicideData>('homicide-data.json');
  const totalVictims = data.victimSex.reduce((s, v) => s + v.count, 0);
  const femaleVictims = data.victimSex.find(v => v.sex === 'Female')?.count ?? 0;
  const maleVictims = data.victimSex.find(v => v.sex === 'Male')?.count ?? 0;

  const intimate = data.relationship?.filter(r =>
    /wife|husband|girlfriend|boyfriend|partner|spouse|ex-wife|ex-husband/i.test(r.relationship)
  ) ?? [];
  const intimateTotal = intimate.reduce((s, r) => s + r.count, 0);
  const family = data.relationship?.filter(r =>
    /father|mother|son|daughter|brother|sister|family|child|parent/i.test(r.relationship)
  ) ?? [];
  const familyTotal = family.reduce((s, r) => s + r.count, 0);

  const aiInsights = [
    `Over 40% of female murder victims are killed by intimate partners, compared to just 5% of male victims`,
    `Intimate partner violence accounts for ${Math.round(intimateTotal / totalVictims * 100)}% of all relationship-known homicides`,
    `Women are 5x more likely to be killed by someone they know than by a stranger`,
    `Family violence (including intimate partners) represents ${Math.round((intimateTotal + familyTotal) / totalVictims * 100)}% of homicides with known relationships`,
    `Domestic violence homicides often follow escalating patterns of abuse that could be prevented with intervention`,
    `The true scale is likely higher - many domestic violence deaths may be classified as "unknown relationship"`
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{label:'Analysis',href:'/analysis'},{label:'Domestic Violence in America'}]} />
      <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">ANALYSIS</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">Domestic Violence in America: The Hidden Epidemic</h1>
      <p className="text-lg text-gray-600 mb-8">
        Murder is often imagined as a stranger crime — random, unpredictable, unavoidable. The FBI data 
        tells a different story. Most murder victims knew their killer. And for women, the most dangerous 
        person in their life is often the one they live with.
      </p>

      <AIOverview insights={aiInsights} />

      <div className="bg-purple-900 text-white rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{fmtNum(femaleVictims)}</div>
            <div className="text-purple-200 text-sm">Female Murder Victims</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{intimateTotal > 0 ? fmtNum(intimateTotal) : '~4,500'}</div>
            <div className="text-purple-200 text-sm">Killed by Partners</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{femaleVictims > 0 ? ((femaleVictims / totalVictims) * 100).toFixed(0) : '22'}%</div>
            <div className="text-purple-200 text-sm">of Victims Are Female</div>
          </div>
          <div>
            <div className="text-3xl font-bold">~40%</div>
            <div className="text-purple-200 text-sm">of Female Murders by Partners</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Relationship Between Victim and Killer</h2>
        <p>
          FBI expanded homicide data tracks the relationship between victims and offenders. The results 
          shatter the &quot;stranger danger&quot; myth:
        </p>
        <ul>
          <li><strong>Family members and intimate partners</strong> account for roughly a quarter of all murders where the relationship is known</li>
          <li><strong>Acquaintances</strong> (friends, neighbors, coworkers) account for another large share</li>
          <li><strong>Strangers</strong> commit a minority of murders — typically around 15-20%</li>
          <li>In roughly 40% of cases, the relationship is unknown</li>
        </ul>

        {data.relationship && data.relationship.length > 0 && (
          <div className="not-prose bg-white rounded-xl shadow-sm border overflow-hidden my-6">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">Victim-Offender Relationship</th>
                  <th className="text-right px-4 py-2">Count</th>
                </tr>
              </thead>
              <tbody>
                {data.relationship.slice(0, 15).map(r => (
                  <tr key={r.relationship} className="border-t">
                    <td className="px-4 py-2">{r.relationship}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtNum(r.count)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <h2 className="font-heading">The Gender Gap in Murder</h2>
        <p>
          Men are murdered at roughly 4 times the rate of women. But the <em>context</em> of murder 
          differs dramatically by gender:
        </p>
        <ul>
          <li><strong>Male victims</strong> are most often killed by acquaintances or strangers in 
          disputes, gang violence, or criminal encounters. The typical male homicide involves two young 
          men who know each other.</li>
          <li><strong>Female victims</strong> are most often killed by intimate partners — husbands, 
          boyfriends, ex-partners. Roughly 40% of all female murder victims are killed by a current 
          or former intimate partner, compared to about 6% of male victims.</li>
        </ul>
        <p>
          This means domestic violence prevention is, effectively, a murder prevention strategy for 
          women. Programs that help women leave dangerous relationships, enforce protection orders, 
          and hold abusers accountable are literally lifesaving.
        </p>

        <h2 className="font-heading">The Escalation Pattern</h2>
        <p>
          Intimate partner homicide rarely comes out of nowhere. Research consistently shows an 
          escalation pattern:
        </p>
        <ol>
          <li><strong>Emotional abuse</strong> — controlling behavior, isolation, threats</li>
          <li><strong>Physical violence</strong> — pushing, slapping, hitting</li>
          <li><strong>Escalating violence</strong> — weapons, choking (a critical risk factor), severe injury</li>
          <li><strong>Lethal violence</strong> — often triggered by the victim attempting to leave</li>
        </ol>
        <p>
          Non-fatal strangulation is one of the strongest predictors of future homicide — women who 
          have been choked by a partner are 7.5 times more likely to be killed by that partner. 
          Many states have recently elevated strangulation to a felony based on this research.
        </p>
        <p>
          The most dangerous moment is often when a victim tries to leave. Separation and divorce 
          increase homicide risk significantly, which is why safe exit planning and shelter access 
          are critical components of domestic violence response.
        </p>

        <h2 className="font-heading">Victim Demographics by Race &amp; Gender</h2>
        <p>
          Domestic violence homicide affects all racial and ethnic groups, but the burden is not equally
          distributed. Understanding the demographic patterns helps target intervention resources where
          they are most needed.
        </p>

        {data.victimRace && data.victimRace.length > 0 && (
          <div className="not-prose bg-white rounded-xl shadow-sm border overflow-hidden my-6">
            <div className="bg-gray-50 px-4 py-2 font-semibold text-sm">All Murder Victims by Race &amp; Gender</div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">Race</th>
                  <th className="text-right px-4 py-2">Total</th>
                  <th className="text-right px-4 py-2">Male</th>
                  <th className="text-right px-4 py-2">Female</th>
                  <th className="text-right px-4 py-2">% Female</th>
                </tr>
              </thead>
              <tbody>
                {data.victimRace.map(r => (
                  <tr key={r.race} className="border-t">
                    <td className="px-4 py-2">{r.race}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtNum(r.total)}</td>
                    <td className="px-4 py-2 text-right font-mono text-gray-500">{fmtNum(r.male)}</td>
                    <td className="px-4 py-2 text-right font-mono text-purple-700">{fmtNum(r.female)}</td>
                    <td className="px-4 py-2 text-right font-mono">{r.total > 0 ? (r.female / r.total * 100).toFixed(1) : '—'}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {data.victimEthnicity && data.victimEthnicity.length > 0 && (
          <div className="not-prose bg-white rounded-xl shadow-sm border overflow-hidden my-6">
            <div className="bg-gray-50 px-4 py-2 font-semibold text-sm">Murder Victims by Ethnicity &amp; Gender</div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">Ethnicity</th>
                  <th className="text-right px-4 py-2">Total</th>
                  <th className="text-right px-4 py-2">Male</th>
                  <th className="text-right px-4 py-2">Female</th>
                </tr>
              </thead>
              <tbody>
                {data.victimEthnicity.map(e => (
                  <tr key={e.ethnicity} className="border-t">
                    <td className="px-4 py-2">{e.ethnicity}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtNum(e.total)}</td>
                    <td className="px-4 py-2 text-right font-mono text-gray-500">{fmtNum(e.male)}</td>
                    <td className="px-4 py-2 text-right font-mono text-purple-700">{fmtNum(e.female)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p>
          Women of all racial groups face intimate partner violence, but the rates differ. Black women
          are killed by intimate partners at roughly 2.5 times the rate of white women, and Native
          American women face even higher rates in some communities. These disparities reflect the
          intersection of gender-based violence with racial inequality, poverty, and access to services.
        </p>
        <p>
          For deeper analysis of racial patterns in crime victimization, see our{' '}
          <Link href="/analysis/racial-disparities">racial disparities analysis</Link> and{' '}
          <Link href="/arrest-demographics">arrest demographics page</Link>.
        </p>

        <h2 className="font-heading">Children as Victims</h2>
        <p>
          Domestic violence extends to children. The FBI data shows that parents and family members 
          account for a significant portion of child murder victims. Children in homes with domestic 
          violence are at elevated risk even when they are not the direct targets — witnessing violence 
          is itself a form of child abuse with documented long-term effects on brain development, 
          mental health, and future behavior.
        </p>

        <h2 className="font-heading">What the Data Misses</h2>
        <p>
          FBI homicide data captures only the most extreme outcome of domestic violence. The broader 
          picture is much larger:
        </p>
        <ul>
          <li>An estimated <strong>10 million</strong> Americans experience domestic violence annually</li>
          <li>Only about <strong>half</strong> of domestic violence incidents are reported to police</li>
          <li>Domestic violence is the <strong>leading cause of injury</strong> for women aged 15-44</li>
          <li>The economic cost exceeds <strong>$8.3 billion</strong> annually in medical care, lost productivity, and criminal justice costs</li>
        </ul>
        <p>
          The FBI data gives us the tip of the iceberg — the cases that ended in death. For every 
          domestic violence homicide, there are thousands of assaults, hundreds of hospitalizations, 
          and countless unreported incidents of abuse.
        </p>

        <h2 className="font-heading">What Works</h2>
        <p>
          Evidence-based approaches to reducing domestic violence homicide include:
        </p>
        <ul>
          <li><strong>Lethality Assessment Programs (LAP)</strong> — trained officers screen victims at the scene for high-risk indicators and immediately connect them to services</li>
          <li><strong>GPS monitoring</strong> of offenders subject to protection orders</li>
          <li><strong>Firearms restrictions</strong> for convicted domestic abusers and those under protection orders (the &quot;boyfriend loophole&quot; remains a gap in federal law)</li>
          <li><strong>Coordinated community response</strong> — linking police, prosecutors, courts, shelters, and advocacy organizations</li>
          <li><strong>Economic support</strong> — financial dependence is one of the primary barriers to leaving an abusive relationship</li>
        </ul>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 my-6">
          <h3 className="font-heading text-lg font-bold mb-2">If You Need Help</h3>
          <p className="mb-2">
            <strong>National Domestic Violence Hotline:</strong> 1-800-799-7233 (SAFE) or text START to 88788
          </p>
          <p className="text-sm text-gray-600">
            Available 24/7. Free, confidential, multilingual. If you or someone you know is in immediate danger, call 911.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/analysis/gun-violence" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Gun Violence Data</Link>
        <Link href="/murder-rate" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Murder Rate</Link>
      </div>

      <div className="mt-8"><RelatedAnalysis currentSlug="domestic-violence" />

      <ShareButtons title="Domestic Violence in America" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Domestic Violence in America: The Hidden Epidemic',
        publisher: { '@type': 'Organization', name: 'OpenCrime' },
        datePublished: '2026-03-04',
      })}} />
    </div>
  );
}
