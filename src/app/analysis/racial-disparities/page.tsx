import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Crime Victimization: Who Bears the Burden?',
  description: 'Homicide is the leading cause of death for Black males 15-34. FBI data reveals the stark geographic and demographic concentration of violent crime in America.',
};

type HomicideData = {
  victimRace: { race: string; count: number }[];
  victimAge: { range: string; count: number }[];
  victimSex: { sex: string; count: number }[];
};

export default function RacialDisparitiesPage() {
  const data = loadData<HomicideData>('homicide-data.json');
  const totalVictims = data.victimSex.reduce((s, v) => s + v.count, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/analysis" className="hover:underline">Analysis</Link> / <span className="text-gray-800">Crime Victimization</span>
      </nav>
      <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">ANALYSIS</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">Crime Victimization: Who Bears the Burden?</h1>
      <p className="text-lg text-gray-600 mb-8">
        Crime in America is not distributed equally. It concentrates in specific neighborhoods, among 
        specific demographics, with devastating consequences for the communities that bear the heaviest burden.
      </p>

      <div className="bg-gray-900 text-white rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">#1</div>
            <div className="text-gray-300 text-sm">Cause of Death for Black Males 15-34</div>
          </div>
          <div>
            <div className="text-3xl font-bold">78%</div>
            <div className="text-gray-300 text-sm">of Murder Victims Are Male</div>
          </div>
          <div>
            <div className="text-3xl font-bold">18-34</div>
            <div className="text-gray-300 text-sm">Peak Victimization Age Range</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Geography of Violence</h2>
        <p>
          Perhaps the most important fact about American crime is how concentrated it is. Studies consistently 
          show that roughly 1-2% of street segments in a city account for 25-50% of its crime. In most cities, 
          a handful of neighborhoods drive the vast majority of violence while most areas remain safe.
        </p>
        <p>
          This concentration is not random. It maps onto patterns of historical disinvestment, poverty, 
          segregation, and lack of economic opportunity. The neighborhoods with the highest violence are 
          overwhelmingly those that have experienced decades of redlining, white flight, industrial 
          abandonment, and government neglect.
        </p>

        <h2 className="font-heading">Victim Demographics</h2>
        <p>
          The FBI&apos;s expanded homicide data reveals stark demographic patterns:
        </p>

        {data.victimRace && data.victimRace.length > 0 && (
          <div className="not-prose bg-white rounded-xl shadow-sm border overflow-hidden my-6">
            <div className="bg-gray-50 px-4 py-2 font-semibold text-sm">Murder Victims by Race (2024)</div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">Race</th>
                  <th className="text-right px-4 py-2">Count</th>
                  <th className="text-right px-4 py-2">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {data.victimRace.map(r => (
                  <tr key={r.race} className="border-t">
                    <td className="px-4 py-2">{r.race}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtNum(r.count)}</td>
                    <td className="px-4 py-2 text-right font-mono">{totalVictims > 0 ? (r.count / totalVictims * 100).toFixed(1) : '—'}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {data.victimAge && data.victimAge.length > 0 && (
          <div className="not-prose bg-white rounded-xl shadow-sm border overflow-hidden my-6">
            <div className="bg-gray-50 px-4 py-2 font-semibold text-sm">Murder Victims by Age</div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">Age Range</th>
                  <th className="text-right px-4 py-2">Count</th>
                  <th className="text-right px-4 py-2">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {data.victimAge.map(a => (
                  <tr key={a.range} className="border-t">
                    <td className="px-4 py-2">{a.range}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtNum(a.count)}</td>
                    <td className="px-4 py-2 text-right font-mono">{totalVictims > 0 ? (a.count / totalVictims * 100).toFixed(1) : '—'}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <h2 className="font-heading">The Age-Crime Curve</h2>
        <p>
          Both offending and victimization peak sharply in the late teens and early twenties — what 
          criminologists call the &quot;age-crime curve.&quot; This pattern holds across all races, genders, 
          and countries. Young men aged 18-24 are both the most likely perpetrators and the most likely 
          victims of violent crime.
        </p>
        <p>
          This has profound implications. Anything that keeps young men alive and out of trouble through 
          their mid-twenties dramatically reduces their lifetime risk of both committing and suffering 
          violence. Programs like Cure Violence, READI Chicago, and Advance Peace target this exact 
          population — high-risk young men in high-violence neighborhoods — with mentoring, employment, 
          and conflict mediation.
        </p>

        <h2 className="font-heading">Racial Disparities in Context</h2>
        <p>
          Black Americans are disproportionately affected by homicide. The Black homicide victimization 
          rate is roughly 6-8 times the white rate — a disparity that has persisted for decades. For 
          young Black men specifically, homicide is the leading cause of death, surpassing accidents, 
          suicide, and disease.
        </p>
        <p>
          This disparity is not explained by any inherent characteristic. It maps precisely onto 
          structural factors:
        </p>
        <ul>
          <li><strong>Concentrated poverty.</strong> Black Americans are 2.5 times more likely to live in poverty. Poverty concentrates crime regardless of race — poor white neighborhoods also have elevated crime rates.</li>
          <li><strong>Historical segregation.</strong> Redlining, restrictive covenants, and discriminatory housing policy concentrated Black Americans in specific neighborhoods, then systematically disinvested from those neighborhoods.</li>
          <li><strong>Lack of economic opportunity.</strong> Unemployment among young Black men is roughly double the rate for white counterparts. Limited legal economic opportunity increases the pull of illegal markets.</li>
          <li><strong>Criminal justice feedback loops.</strong> Mass incarceration removed fathers from homes, reduced community supervision of youth, and created barriers to employment that perpetuate the conditions that generate crime.</li>
          <li><strong>Gun availability.</strong> The neighborhoods with the highest gun violence also tend to have the highest rates of illegal gun possession, driven by both self-protection and criminal enterprise.</li>
        </ul>

        <h2 className="font-heading">The Victimization Gap Is Closing</h2>
        <p>
          There is encouraging news in the data. The racial disparity in homicide victimization, while 
          still enormous, has been narrowing. The Black homicide rate has fallen more steeply than the 
          white rate since the 1990s. The crack epidemic hit Black communities hardest, and its end 
          brought the greatest relief to those same communities.
        </p>
        <p>
          The 2020 murder spike temporarily widened the gap again, but the 2022-2024 decline has been 
          especially pronounced in historically high-violence cities like Chicago, Philadelphia, and 
          Atlanta. If current trends continue, the disparity could narrow to its lowest point on record.
        </p>

        <h2 className="font-heading">What This Means for Policy</h2>
        <p>
          The concentration of violence means that targeted, place-based interventions can have outsized 
          impact. Rather than broad, expensive policies that spread resources thinly, the data argues for:
        </p>
        <ul>
          <li><strong>Investing in the most affected neighborhoods</strong> — not just policing but jobs, housing, schools, and infrastructure</li>
          <li><strong>Violence interruption programs</strong> that work with the highest-risk individuals</li>
          <li><strong>Victim services</strong> in communities where reporting to police is low due to mistrust</li>
          <li><strong>Addressing root causes</strong> — poverty, segregation, lack of opportunity — that create the conditions for violence</li>
        </ul>
        <p>
          The goal isn&apos;t to excuse violence but to understand its causes clearly enough to prevent it. 
          The data shows both the scale of the problem and, in its declining trends, the possibility 
          of continued progress.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/analysis/gun-violence" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Gun Violence</Link>
        <Link href="/analysis/domestic-violence" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Domestic Violence</Link>
      </div>

      <div className="mt-8"><ShareButtons title="Crime Victimization: Who Bears the Burden?" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Crime Victimization: Who Bears the Burden?',
        publisher: { '@type': 'Organization', name: 'OpenCrime' },
        datePublished: '2026-03-04',
      })}} />
    </div>
  );
}
