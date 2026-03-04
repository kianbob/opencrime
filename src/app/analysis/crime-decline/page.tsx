import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { NationalTrend } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import DeclineCharts from './DeclineCharts';

export const metadata: Metadata = {
  title: 'The Great Crime Decline: Why America Is Safer Than You Think',
  description: 'Violent crime has fallen 52.6% since 1991. An in-depth analysis of 45 years of FBI crime data showing how and why America became dramatically safer.',
};

export default function CrimeDeclinePage() {
  const national = loadData<NationalTrend[]>('national-trends.json');
  const n2024 = national[national.length - 1];
  const peak = national.find(y => y.year === 1991)!;
  const n1979 = national[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/analysis" className="hover:underline">Analysis</Link> / <span className="text-gray-800">The Great Crime Decline</span>
      </nav>

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">The Great Crime Decline: Why America Is Safer Than You Think</h1>
      <p className="text-lg text-gray-600 mb-8">
        Despite what you see on the news, violent crime in America has fallen by more than half since its peak. 
        This is one of the most important — and most ignored — public safety stories of our time.
      </p>

      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4 text-center">
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

        <h2 className="font-heading">The Shape of the Decline</h2>
        <p>The decline happened in distinct phases:</p>
        <ul>
          <li><strong>1991–2000: The Great Drop.</strong> Violent crime fell nearly 30% in a single decade. Every category dropped — murder, robbery, assault, rape. New York City&apos;s murder count fell from 2,245 to 673.</li>
          <li><strong>2000–2014: The Plateau.</strong> Crime continued a slow, steady decline. The violent crime rate fell another 20%. This phase attracted less attention because the drops were gradual.</li>
          <li><strong>2014–2019: Stability.</strong> Crime rates leveled off at historically low levels, with minor fluctuations.</li>
          <li><strong>2020–2021: The Pandemic Spike.</strong> Murder surged roughly 30% in 2020, the largest single-year increase on record. This was widely attributed to pandemic disruptions, police pullbacks, and social upheaval. Other violent crimes increased more modestly.</li>
          <li><strong>2022–2024: The Snapback.</strong> Crime fell rapidly back to — and below — pre-pandemic levels. The 2024 murder rate is lower than 2019. The spike was real but temporary.</li>
        </ul>
      </div>

      <DeclineCharts data={national} />

      <div className="prose prose-lg max-w-none mt-8">
        <h2 className="font-heading">Why Did Crime Fall?</h2>
        <p>
          Criminologists have proposed over a dozen theories for the decline. The honest answer is: nobody knows 
          for certain, and it was probably a combination of factors. The leading theories include:
        </p>
        <ol>
          <li><strong>Demographics.</strong> The baby boom generation aged out of the prime crime years (15-25). Fewer young men meant fewer potential offenders.</li>
          <li><strong>Mass incarceration.</strong> The US prison population quadrupled from 1980 to 2010. Incarcerating more offenders reduced crime through incapacitation, though at enormous social and fiscal cost.</li>
          <li><strong>The end of the crack epidemic.</strong> The crack cocaine market of the late 1980s generated extreme violence. As the market matured and consolidated, violence dropped.</li>
          <li><strong>Economic growth.</strong> The 1990s boom created jobs and opportunities, particularly for young men who might otherwise have turned to crime.</li>
          <li><strong>Policing strategies.</strong> CompStat, community policing, and targeted enforcement helped police become more effective, particularly in high-crime areas.</li>
          <li><strong>Technology.</strong> Cell phones, surveillance cameras, DNA evidence, and other technology made crimes harder to commit and easier to solve.</li>
          <li><strong>Lead removal.</strong> The phase-out of leaded gasoline (completed in 1996) may have reduced lead exposure in children, which is linked to aggression and impulsivity. This theory, proposed by economist Jessica Wolpaw Reyes, fits the timing remarkably well.</li>
          <li><strong>Cultural shifts.</strong> Americans drink less, use drugs differently, and have different attitudes toward violence than in the early 1990s.</li>
        </ol>

        <h2 className="font-heading">The Perception Gap</h2>
        <p>
          Perhaps the most remarkable aspect of the crime decline is how few Americans believe it happened. 
          Gallup polls consistently show that 60-70% of Americans believe crime is getting worse nationally, 
          even during years when crime fell significantly. This &quot;perception gap&quot; is driven by media coverage 
          that emphasizes violent incidents, political rhetoric that amplifies fear, and social media that 
          spreads viral crime stories.
        </p>
        <p>
          The data is unambiguous: America in 2024 is dramatically safer than America in 1991. The violent crime 
          rate has been cut in half. The murder rate has been cut in half. Property crime has fallen even more. 
          This is a genuine achievement — one that happened under both Democratic and Republican administrations, 
          in cities and suburbs, across all regions.
        </p>

        <h2 className="font-heading">What Comes Next?</h2>
        <p>
          The post-pandemic crime snapback suggests that the long-term decline remains intact. The 2024 data 
          shows violent crime 5.4% below 2023 and murder 15.7% below 2023. If these trends continue, the 
          US could see its lowest crime rates since the 1960s within a few years.
        </p>
        <p>
          However, challenges remain. Property crime — particularly motor vehicle theft — has risen significantly 
          since 2019. Some cities continue to struggle with concentrated violence. And the rise of unreported 
          &quot;quality of life&quot; crimes in some urban areas may not be fully captured in FBI statistics.
        </p>
        <p>
          The bottom line: America is much safer than most people realize, and getting safer. That&apos;s worth 
          knowing — and worth celebrating — even as we continue working on the problems that remain.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/dashboard" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Explore Dashboard</Link>
        <Link href="/crime-rate" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">2024 Crime Statistics</Link>
      </div>

      <div className="mt-8">
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
