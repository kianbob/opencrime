import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { NationalTrend } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import DeclineCharts from './DeclineCharts';

export const metadata: Metadata = {
  title: 'The Great Crime Decline: Why America Is Safer Than You Think',
  description: 'Violent crime has fallen 52.6% since 1991. An in-depth analysis of 45 years of FBI crime data showing how and why America became dramatically safer.',
  openGraph: { title: 'The Great Crime Decline', description: 'Violent crime fell 52.6% since 1991. 45 years of FBI data show how America became dramatically safer.', url: 'https://www.opencrime.us/analysis/crime-decline' },
  alternates: { canonical: 'https://www.opencrime.us/analysis/crime-decline' },
};

type RaceRow = { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number; pacificIslander: number };
type VictimRace = { race: string; total: number; male: number; female: number };

export default function CrimeDeclinePage() {
  const national = loadData<NationalTrend[]>('national-trends.json');
  const n2024 = national[national.length - 1];
  const peak = national.find(y => y.year === 1991)!;
  const n2000 = national.find(y => y.year === 2000);
  const n2014 = national.find(y => y.year === 2014);
  const n2019 = national.find(y => y.year === 2019);
  const n2020 = national.find(y => y.year === 2020);

  const arrestData = loadData<{ byRace: RaceRow[] }>('arrest-data.json');
  const homData = loadData<{ victimRace: VictimRace[]; victimSex: { sex: string; count: number }[] }>('homicide-data.json');
  const vcRace = arrestData.byRace.find(r => r.offense === 'Violent crime');
  const totalVictims = homData.victimSex.reduce((s, v) => s + v.count, 0);

  const fewerCrimes = Math.round((peak.violentRate - n2024.violentRate) / 100000 * n2024.population);

  const aiInsights = [
    `Violent crime has fallen 52.6% since 1991, from ${fmtRate(peak.violentRate)} to ${fmtRate(n2024.violentRate)} per 100,000`,
    `Murder rates dropped ${((1 - n2024.homicideRate / peak.homicideRate) * 100).toFixed(0)}% from the 1991 peak`,
    "Property crime declined even more dramatically — down 68% since 1980",
    "The US is safer now than at any point since the early 1960s",
    "Crime decline occurred across all demographics, regions, and city sizes",
    `The drop represents roughly ${fmtNum(fewerCrimes)} fewer violent crimes per year compared to 1991 rates`
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{label:'Analysis',href:'/analysis'},{label:'The Great Crime Decline'}]} />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">The Great Crime Decline: Why America Is Safer Than You Think</h1>
      <p className="text-lg text-gray-600 mb-8">
        Despite what you see on the news, violent crime in America has fallen by more than half since its peak.
        This is one of the most important — and most ignored — public safety stories of our time.
      </p>

      <AIOverview insights={aiInsights} />

      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{fmtRate(peak.violentRate)}</div>
            <div className="text-blue-200 text-sm">1991 Peak Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtRate(n2024.violentRate)}</div>
            <div className="text-blue-200 text-sm">2024 Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">-52.6%</div>
            <div className="text-blue-200 text-sm">Total Decline</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">-{((1 - n2024.homicideRate / peak.homicideRate) * 100).toFixed(0)}%</div>
            <div className="text-blue-200 text-sm">Murder Rate Decline</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Numbers Don&apos;t Lie</h2>
        <p>
          In 1991, the United States recorded {fmtNum(peak.violentCrime)} violent crimes — a rate of {fmtRate(peak.violentRate)} per
          100,000 people. The murder rate stood at {fmtRate(peak.homicideRate)} per 100,000, meaning roughly 1 in 10,000 Americans
          was murdered that year. Cities like New York, Los Angeles, and Washington DC were in the grip of a crack cocaine
          epidemic that drove violence to apocalyptic levels.
        </p>
        <p>
          Fast forward to 2024: the violent crime rate has fallen to {fmtRate(n2024.violentRate)} — a decline of more than
          half. The murder rate dropped to {fmtRate(n2024.homicideRate)}, less than half its 1991 peak. {fmtNum(n2024.homicide)} people
          were murdered in 2024, compared to roughly 24,700 in 1991. This happened while the US population grew
          from 253 million to {fmtNum(n2024.population)}.
        </p>
        <p>
          To put the scale of the decline in perspective: if America still had its 1991 violent crime rate,
          there would be roughly {fmtNum(fewerCrimes)} more violent crimes every year. That&apos;s
          {fmtNum(fewerCrimes)} fewer assaults, robberies, rapes, and murders annually. Millions of Americans
          who would have been victims of violent crime are instead living their lives unharmed.
        </p>

        <h2 className="font-heading">The Shape of the Decline</h2>
        <p>The decline happened in distinct phases:</p>
      </div>

      {/* Phase breakdown table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Phase</th>
              <th className="text-right px-4 py-2">Start Rate</th>
              <th className="text-right px-4 py-2">End Rate</th>
              <th className="text-right px-4 py-2">Change</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: '1991–2000: The Great Drop', start: peak.violentRate, end: n2000?.violentRate ?? 0 },
              { label: '2000–2014: Slow Decline', start: n2000?.violentRate ?? 0, end: n2014?.violentRate ?? 0 },
              { label: '2014–2019: Stability', start: n2014?.violentRate ?? 0, end: n2019?.violentRate ?? 0 },
              { label: '2020–2021: Pandemic Spike', start: n2019?.violentRate ?? 0, end: n2020?.violentRate ?? 0 },
              { label: '2022–2024: Snapback', start: n2020?.violentRate ?? 0, end: n2024.violentRate },
            ].map(p => (
              <tr key={p.label} className="border-t">
                <td className="px-4 py-2 font-medium">{p.label}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtRate(p.start)}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtRate(p.end)}</td>
                <td className={`px-4 py-2 text-right font-mono font-semibold ${p.end < p.start ? 'text-green-600' : 'text-red-600'}`}>
                  {p.start > 0 ? ((p.end - p.start) / p.start * 100).toFixed(1) + '%' : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <ul>
          <li><strong>1991–2000: The Great Drop.</strong> Violent crime fell nearly 30% in a single decade. Every category dropped — murder, robbery, assault, rape. New York City&apos;s murder count fell from 2,245 to 673. This was the most dramatic peacetime crime reduction in American history.</li>
          <li><strong>2000–2014: The Plateau.</strong> Crime continued a slow, steady decline. The violent crime rate fell another 20%. This phase attracted less attention because the drops were gradual.</li>
          <li><strong>2014–2019: Stability.</strong> Crime rates leveled off at historically low levels, with minor fluctuations. Some cities saw increases while others continued declining.</li>
          <li><strong>2020–2021: The Pandemic Spike.</strong> Murder surged roughly 30% in 2020, the largest single-year increase on record. This was widely attributed to pandemic disruptions, police pullbacks, and social upheaval. Other violent crimes increased more modestly.</li>
          <li><strong>2022–2024: The Snapback.</strong> Crime fell rapidly back to — and below — pre-pandemic levels. The 2024 murder rate is lower than 2019. The spike was real but temporary.</li>
        </ul>
      </div>

      <DeclineCharts data={national} />

      <div className="prose prose-lg max-w-none mt-8">
        <h2 className="font-heading">Why Did Crime Fall?</h2>
        <p>
          Criminologists have proposed over a dozen theories for the decline. The honest answer is: nobody knows
          for certain, and it was probably a combination of factors. Here are the leading theories, roughly ordered
          by the strength of evidence:
        </p>
        <ol>
          <li><strong>The end of the crack epidemic.</strong> The crack cocaine market of the late 1980s generated extreme violence as dealers competed for territory. As the market matured, consolidated, and eventually shrank, the associated violence dropped. This theory best explains the timing and geographic pattern of the decline — cities hit hardest by crack saw the biggest drops.</li>
          <li><strong>Lead removal.</strong> The phase-out of leaded gasoline (completed in 1996) reduced childhood lead exposure, which is strongly linked to aggression, impulsivity, and cognitive impairment. This theory, proposed by economist Jessica Wolpaw Reyes, fits the timing remarkably well — crime began falling about 20 years after lead was removed from gasoline, corresponding to the first cohort raised without lead exposure reaching crime-committing age.</li>
          <li><strong>Demographics.</strong> The baby boom generation aged out of the prime crime years (15-25). An aging population means fewer people in the highest-risk age bracket. However, demographics alone explain only about 10-15% of the decline.</li>
          <li><strong>Mass incarceration.</strong> The US prison population quadrupled from 1980 to 2010. Incarcerating more offenders reduced crime through incapacitation — people in prison cannot commit street crime. Estimates suggest incarceration explains 10-25% of the decline, though at enormous social and fiscal cost ($80+ billion per year).</li>
          <li><strong>Policing strategies.</strong> CompStat, community policing, hot-spot policing, and targeted enforcement helped police become more effective, particularly in high-crime areas. New York City&apos;s dramatic decline is often attributed in part to these innovations.</li>
          <li><strong>Economic growth.</strong> The 1990s boom created jobs and opportunities, particularly for young men who might otherwise have turned to crime. Unemployment dropped significantly during the initial crime decline period.</li>
          <li><strong>Technology.</strong> Cell phones, surveillance cameras, DNA evidence, and other technology made crimes harder to commit and easier to solve. The ubiquity of cameras in the smartphone era may have a continuing deterrent effect.</li>
          <li><strong>Cultural shifts.</strong> Americans drink less, use drugs differently, and have different attitudes toward violence than in the early 1990s. The glorification of violence that characterized some cultural movements has diminished.</li>
        </ol>
        <p>
          No single theory explains the decline. The most likely answer is that multiple factors converged —
          a &quot;perfect storm&quot; in reverse. What caused the crime wave of the late 1980s (crack, lead,
          demographics, economic distress) unwound simultaneously, producing an equally dramatic decline.
        </p>

        <h2 className="font-heading">The Decline Across Demographics</h2>
        <p>
          Critically, the crime decline benefited all demographic groups, though not equally. The
          communities hardest hit by the crime wave of the late 1980s and early 1990s saw the largest
          improvements.
        </p>
      </div>

      {/* Demographic context */}
      <div className="bg-white rounded-xl shadow-sm border p-6 my-6">
        <h3 className="font-semibold mb-3">Current Homicide Victim Demographics (2024)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2">Race</th>
                <th className="text-right px-3 py-2">Victims</th>
                <th className="text-right px-3 py-2">Male</th>
                <th className="text-right px-3 py-2">Female</th>
                <th className="text-right px-3 py-2">%</th>
              </tr>
            </thead>
            <tbody>
              {homData.victimRace.map(r => (
                <tr key={r.race} className="border-t">
                  <td className="px-3 py-2">{r.race}</td>
                  <td className="px-3 py-2 text-right font-mono">{fmtNum(r.total)}</td>
                  <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(r.male)}</td>
                  <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(r.female)}</td>
                  <td className="px-3 py-2 text-right font-mono">{(r.total / totalVictims * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-3">
          While all groups have benefited from the decline, Black Americans still bear a disproportionate burden
          of homicide victimization — a disparity rooted in concentrated poverty, segregation, and historical
          disinvestment. See <Link href="/analysis/racial-disparities" className="text-[#1e3a5f] hover:underline">our full analysis</Link>.
        </p>
      </div>

      {vcRace && (
        <div className="bg-white rounded-xl shadow-sm border p-6 my-6">
          <h3 className="font-semibold mb-3">Current Violent Crime Arrests by Race</h3>
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
                  { label: 'White', value: vcRace.white },
                  { label: 'Black', value: vcRace.black },
                  { label: 'Native American', value: vcRace.nativeAmerican },
                  { label: 'Asian', value: vcRace.asian },
                  { label: 'Pacific Islander', value: vcRace.pacificIslander },
                ].map(row => (
                  <tr key={row.label} className="border-t">
                    <td className="px-3 py-2">{row.label}</td>
                    <td className="px-3 py-2 text-right font-mono">{fmtNum(row.value)}</td>
                    <td className="px-3 py-2 text-right font-mono">{(row.value / vcRace.total * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Arrest data reflects policing patterns as well as criminal behavior. See{' '}
            <Link href="/arrest-demographics" className="text-[#1e3a5f] hover:underline">full arrest demographics</Link>.
          </p>
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <p>
          The Black homicide victimization rate has fallen more steeply than the white rate since the 1990s —
          the crack epidemic hit Black communities hardest, and its end brought the greatest relief to those
          same communities. The 2020 spike temporarily reversed progress, but 2022-2024 declines have been
          especially pronounced in historically high-violence cities.
        </p>

        <h2 className="font-heading">The Perception Gap</h2>
        <p>
          Perhaps the most remarkable aspect of the crime decline is how few Americans believe it happened.
          Gallup polls consistently show that 60-70% of Americans believe crime is getting worse nationally,
          even during years when crime fell significantly. This &quot;perception gap&quot; is driven by:
        </p>
        <ul>
          <li><strong>Media coverage</strong> that emphasizes violent incidents and crime waves while underreporting declines</li>
          <li><strong>Political rhetoric</strong> that amplifies fear for electoral advantage — candidates of both parties invoke crime fears</li>
          <li><strong>Social media</strong> that spreads viral crime videos and creates the impression of ubiquitous danger</li>
          <li><strong>Availability bias</strong> — dramatic events (mass shootings, high-profile murders) are easy to recall, making crime seem more common</li>
          <li><strong>Local vs. national confusion</strong> — crime can increase in a specific neighborhood while declining nationally</li>
        </ul>
        <p>
          The data is unambiguous: America in 2024 is dramatically safer than America in 1991. The violent crime
          rate has been cut in half. The murder rate has been cut in half. Property crime has fallen even more.
          This is a genuine achievement — one that happened under both Democratic and Republican administrations,
          in cities and suburbs, across all regions.
        </p>

        <h2 className="font-heading">The Pandemic Spike and Recovery</h2>
        <p>
          The 2020 murder spike — roughly a 30% increase in a single year — was the largest since reliable
          record-keeping began. Multiple factors contributed:
        </p>
        <ul>
          <li><strong>COVID disruptions</strong> closed courts, schools, employment programs, and community organizations that serve as informal crime prevention</li>
          <li><strong>Economic stress</strong> from lockdowns and job losses, especially in communities with limited savings</li>
          <li><strong>Reduced police activity</strong> following the George Floyd protests — both voluntary pullbacks and staffing shortages</li>
          <li><strong>Social upheaval</strong> that disrupted informal social controls and conflict resolution</li>
          <li><strong>Gun purchases</strong> surged to record levels in 2020-2021, increasing the lethality of conflicts</li>
        </ul>
        <p>
          The recovery has been equally dramatic. Murder fell roughly 12% in 2022, another 12% in 2023, and
          15.7% in 2024. The 2024 murder rate of {fmtRate(n2024.homicideRate)} is below the 2019 pre-pandemic level.
          The spike was real and devastating, but it was temporary — reinforcing the underlying downward trend
          rather than reversing it.
        </p>

        <h2 className="font-heading">What Comes Next?</h2>
        <p>
          The post-pandemic crime snapback suggests that the long-term decline remains intact. If current
          trends continue, the US could see its lowest crime rates since the 1960s within a few years.
        </p>
        <p>
          However, challenges remain:
        </p>
        <ul>
          <li><strong>Property crime</strong> — particularly motor vehicle theft — has risen significantly since 2019 and has not followed the violent crime decline</li>
          <li><strong>Demographic disparities</strong> persist. The gap between Black and white victimization rates, while narrowing, remains enormous. See our <Link href="/analysis/racial-disparities">racial disparities analysis</Link>.</li>
          <li><strong>Geographic concentration</strong> means that national improvements can mask persistent crisis in specific neighborhoods</li>
          <li><strong>Public perception</strong> remains disconnected from reality, making evidence-based policy difficult</li>
          <li><strong>Fentanyl and the opioid crisis</strong> continue to drive drug-related violence and overdose deaths</li>
        </ul>
        <p>
          The bottom line: America is much safer than most people realize, and getting safer. That&apos;s worth
          knowing — and worth celebrating — even as we continue working on the problems that remain.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/dashboard" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Explore Dashboard</Link>
        <Link href="/crime-rate" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">2024 Crime Statistics</Link>
        <Link href="/arrest-demographics" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Arrest Demographics</Link>
        <Link href="/analysis/racial-disparities" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Racial Disparities</Link>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="crime-decline" />

      <ShareButtons title="The Great Crime Decline: Why America Is Safer Than You Think" />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The Great Crime Decline: Why America Is Safer Than You Think',
        description: 'Violent crime has fallen 52.6% since 1991. An in-depth analysis of 45 years of FBI data.',
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        datePublished: '2026-03-04',
      })}} />

      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer, SRS Estimated Crimes 1979–2024.</p>
    </div>
  );
}
