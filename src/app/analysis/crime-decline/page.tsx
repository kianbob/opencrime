import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import { loadData, fmtNum, fmtRate, fmtPct } from '@/lib/utils';
import type { NationalTrend } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import DeclineCharts from './DeclineCharts';

export const metadata: Metadata = {
  title: 'The Great Crime Decline: Why America Is Safer Than You Think | OpenCrime',
  description: 'Violent crime has fallen 52.6% since 1991. An in-depth analysis of 45 years of FBI crime data showing how and why America became dramatically safer.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/crime-decline' },
  openGraph: {
    title: 'The Great Crime Decline: Why America Is Safer Than You Think',
    description: 'Violent crime fell 52.6% since 1991. 45 years of FBI data analyzed.',
    url: 'https://www.opencrime.us/analysis/crime-decline',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Great Crime Decline: Why America Is Safer Than You Think',
    description: 'Violent crime fell 52.6% since 1991. 45 years of FBI data analyzed.',
  },
};

export default function CrimeDeclinePage() {
  const national = loadData<NationalTrend[]>('national-trends.json');
  const n2024 = national[national.length - 1];
  const peak = national.find(y => y.year === 1991)!;
  const n1979 = national[0];
  const n2000 = national.find(y => y.year === 2000);
  const n2010 = national.find(y => y.year === 2010);
  const n2014 = national.find(y => y.year === 2014);
  const n2016 = national.find(y => y.year === 2016);
  const n2023 = national.find(y => y.year === 2023);

  const violentDecline = ((1 - n2024.violentRate / peak.violentRate) * 100).toFixed(1);
  const murderDecline = ((1 - n2024.homicideRate / peak.homicideRate) * 100).toFixed(0);
  const propertyDecline = n1979 ? ((1 - n2024.propertyRate / n1979.propertyRate) * 100).toFixed(0) : '68';
  const popGrowth = n2024.population - peak.population;

  // Calculate fewer crimes at 1991 rates vs actual
  const fewerViolent = Math.round(peak.violentRate / 100000 * n2024.population) - n2024.violentCrime;
  const fewerMurders = Math.round(peak.homicideRate / 100000 * n2024.population) - n2024.homicide;

  // Decade-by-decade breakdown
  const decades = [
    n1979 && n2000 ? { period: '1979–1991', startRate: n1979.violentRate, endRate: peak.violentRate, change: ((peak.violentRate - n1979.violentRate) / n1979.violentRate * 100) } : null,
    peak && n2000 ? { period: '1991–2000', startRate: peak.violentRate, endRate: n2000.violentRate, change: ((n2000.violentRate - peak.violentRate) / peak.violentRate * 100) } : null,
    n2000 && n2010 ? { period: '2000–2010', startRate: n2000.violentRate, endRate: n2010.violentRate, change: ((n2010.violentRate - n2000.violentRate) / n2000.violentRate * 100) } : null,
    n2010 && n2016 ? { period: '2010–2016', startRate: n2010.violentRate, endRate: n2016.violentRate, change: ((n2016.violentRate - n2010.violentRate) / n2010.violentRate * 100) } : null,
    { period: 'Latest', startRate: n2023?.violentRate ?? 0, endRate: n2024.violentRate, change: n2023 ? ((n2024.violentRate - n2023.violentRate) / n2023.violentRate * 100) : 0 },
  ].filter(Boolean) as { period: string; startRate: number; endRate: number; change: number }[];

  // Property crime trend
  const propPeak = national.reduce((max, n) => n.propertyRate > max.propertyRate ? n : max, national[0]);

  const aiInsights = [
    `Violent crime has fallen ${violentDecline}% since 1991, from ${fmtRate(peak.violentRate)} to ${fmtRate(n2024.violentRate)} per 100,000 people`,
    `Murder rates dropped ${murderDecline}% from the 1991 peak, despite population growing by ${fmtNum(popGrowth)}`,
    `Property crime declined even more dramatically — down ${propertyDecline}% since ${propPeak.year}`,
    'The US is safer now than at any point since the early 1960s',
    'Crime decline occurred across all demographics, regions, and city sizes',
    `At 1991 rates, the US would have ${fmtNum(fewerViolent)} more violent crimes and ${fmtNum(fewerMurders)} more murders per year`,
    'The 2020 pandemic spike was real but temporary — 2024 rates are below pre-pandemic levels',
    '60-70% of Americans believe crime is getting worse, despite decades of decline — a massive perception gap',
  ];

  const faqItems = [
    {
      question: 'Is crime actually going down in America?',
      answer: `Yes. Violent crime has fallen ${violentDecline}% since its 1991 peak. The 2024 violent crime rate of ${fmtRate(n2024.violentRate)} per 100,000 is less than half the 1991 rate of ${fmtRate(peak.violentRate)}. Murder rates dropped ${murderDecline}%.`,
    },
    {
      question: 'Why do people think crime is getting worse?',
      answer: 'Gallup polls consistently show 60-70% of Americans believe crime is increasing nationally. This perception gap is driven by media coverage that emphasizes violent incidents, political rhetoric, and social media that amplifies crime stories.',
    },
    {
      question: 'What caused the crime decline?',
      answer: 'No single cause. Leading theories include demographics (baby boomers aging out), the end of the crack epidemic, economic growth, improved policing strategies, lead removal from gasoline, mass incarceration (at enormous cost), and cultural shifts.',
    },
    {
      question: 'Did the 2020 crime spike reverse the decline?',
      answer: 'No. Murder surged roughly 30% in 2020, the largest single-year increase on record. But crime fell rapidly in 2022-2024, returning to below pre-pandemic levels. The spike was real but temporary.',
    },
    {
      question: 'Is property crime also declining?',
      answer: `Yes. Property crime has fallen ${propertyDecline}% since its peak. However, motor vehicle theft has risen significantly since 2019, and some categories of retail theft may be underreported.`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{label:'Analysis',href:'/analysis'},{label:'The Great Crime Decline'}]} />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">The Great Crime Decline: Why America Is Safer Than You Think</h1>
      <p className="text-lg text-gray-600 mb-2">
        Despite what you see on the news, violent crime in America has fallen by more than half since its peak. 
        This is one of the most important — and most ignored — public safety stories of our time.
      </p>
      <p className="text-sm text-gray-400 mb-8">Updated March 2026 · Source: FBI Crime Data Explorer, SRS Estimated Crimes 1979–2024</p>

      <AIOverview insights={aiInsights} />

      {/* === Hero Stats === */}
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
            <div className="text-3xl font-bold text-green-400">-{violentDecline}%</div>
            <div className="text-blue-200 text-sm">Violent Crime Decline</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">-{murderDecline}%</div>
            <div className="text-blue-200 text-sm">Murder Rate Decline</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Numbers Don&apos;t Lie</h2>
        <p>
          In 1991, the United States recorded {fmtNum(peak.violentCrime)} violent crimes — a rate 
          of {fmtRate(peak.violentRate)} per 100,000 people. The murder rate stood 
          at {fmtRate(peak.homicideRate)} per 100,000, meaning roughly 1 in 10,000 Americans 
          was murdered that year. Cities like New York, Los Angeles, and Washington DC were in the 
          grip of a crack cocaine epidemic that drove violence to apocalyptic levels.
        </p>
        <p>
          Fast forward to 2024: the violent crime rate has fallen to {fmtRate(n2024.violentRate)} — a 
          decline of {violentDecline}%. The murder rate dropped to {fmtRate(n2024.homicideRate)}, 
          a {murderDecline}% decline from 1991. {fmtNum(n2024.homicide)} people were murdered in 2024, 
          compared to roughly 24,700 in 1991. This happened while the US population grew 
          from {fmtNum(peak.population)} to {fmtNum(n2024.population)} — an increase 
          of {fmtNum(popGrowth)} people.
        </p>
        <p>
          To put this in concrete terms: if the US still had 1991 crime rates applied to today&apos;s 
          larger population, there would be roughly <strong>{fmtNum(fewerViolent)} more violent 
          crimes</strong> per year and <strong>{fmtNum(fewerMurders)} more murders</strong>. The 
          decline represents an enormous amount of human suffering that didn&apos;t happen.
        </p>
      </div>

      {/* === Decade Breakdown Table === */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-8">
        <div className="bg-gray-50 px-4 py-2 font-semibold text-sm">Violent Crime Rate by Period</div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Period</th>
              <th className="text-right px-4 py-2">Start Rate</th>
              <th className="text-right px-4 py-2">End Rate</th>
              <th className="text-right px-4 py-2">Change</th>
            </tr>
          </thead>
          <tbody>
            {decades.map(d => (
              <tr key={d.period} className="border-t">
                <td className="px-4 py-2 font-medium">{d.period}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtRate(d.startRate)}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtRate(d.endRate)}</td>
                <td className={`px-4 py-2 text-right font-mono font-semibold ${d.change < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {fmtPct(d.change)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Shape of the Decline</h2>
        <p>The decline happened in distinct phases, each with its own dynamics:</p>
        <ul>
          <li><strong>1979–1991: The Surge.</strong> Crime rose dramatically through the 1980s, driven by the 
          crack cocaine epidemic, demographic shifts, and economic dislocation. The violent crime rate 
          climbed from {fmtRate(n1979.violentRate)} to {fmtRate(peak.violentRate)} — a 
          {((peak.violentRate - n1979.violentRate) / n1979.violentRate * 100).toFixed(0)}% increase.</li>
          <li><strong>1991–2000: The Great Drop.</strong> Violent crime fell nearly 30% in a single decade. 
          Every category dropped — murder, robbery, assault, rape. New York City&apos;s murder count fell 
          from 2,245 to 673. This was the most dramatic peacetime crime reduction in American history.</li>
          <li><strong>2000–2014: The Slow Burn.</strong> Crime continued a steady decline, falling another 
          20%. This phase attracted less attention because the drops were gradual — a few percentage points 
          per year, year after year. But compounded over 14 years, it was substantial.</li>
          <li><strong>2014–2016: The Ferguson Effect?</strong> Crime rates ticked up slightly in some cities, 
          leading to debate about whether the &quot;Ferguson Effect&quot; — police pulling back after 
          high-profile shootings — was responsible. The data is ambiguous; the increase was real but modest.</li>
          <li><strong>2020–2021: The Pandemic Spike.</strong> Murder surged roughly 30% in 2020, the largest 
          single-year increase on record. This was widely attributed to pandemic disruptions, police 
          pullbacks during the George Floyd protests, court system shutdowns, and social upheaval. Other 
          violent crimes increased more modestly. The spike was concentrated 
          in <Link href="/analysis/murder-map">specific neighborhoods</Link> and demographics.</li>
          <li><strong>2022–2024: The Snapback.</strong> Crime fell rapidly back to — and below — pre-pandemic 
          levels. The 2024 murder rate is lower than 2019. The spike was real but temporary, suggesting 
          it was caused by disruption rather than structural change.</li>
        </ul>
      </div>

      <DeclineCharts data={national} />

      <div className="prose prose-lg max-w-none mt-8">
        <h2 className="font-heading">Property Crime: An Even Bigger Decline</h2>
        <p>
          While violent crime gets all the attention, property crime has declined even more dramatically. 
          The property crime rate peaked at {fmtRate(propPeak.propertyRate)} per 100K 
          in {propPeak.year} and has fallen to {fmtRate(n2024.propertyRate)} — a decline 
          of {((1 - n2024.propertyRate / propPeak.propertyRate) * 100).toFixed(0)}%.
        </p>
        <p>
          Burglary has fallen the most — down roughly 75% from its peak. This is likely driven by 
          better security technology (alarm systems, cameras, smart locks), changes in daily patterns 
          (more people working from home), and the shift toward a cashless economy that makes stolen 
          goods harder to fence.
        </p>
        <p>
          The major exception is motor vehicle theft, which surged 25-30% from 2019-2023 before 
          beginning to decline. The <Link href="/analysis/car-theft-crisis">car theft crisis</Link> was 
          driven partly by social media trends (the &quot;Kia Boys&quot; phenomenon) and partly by 
          pandemic-era disruptions to policing and prosecution.
        </p>

        <h2 className="font-heading">Why Did Crime Fall?</h2>
        <p>
          Criminologists have proposed over a dozen theories for the decline. The honest answer is: nobody 
          knows for certain, and it was probably a combination of factors. The leading theories, ranked 
          by evidence strength:
        </p>
        <ol>
          <li>
            <strong>Demographics.</strong> The baby boom generation aged out of the prime crime years (15-25). 
            Fewer young men meant fewer potential offenders. This is the most universally accepted factor, 
            though it can only explain a portion of the decline. See 
            our <Link href="/analysis/who-commits-crime">demographic analysis</Link> for how age drives crime.
          </li>
          <li>
            <strong>The end of the crack epidemic.</strong> The crack cocaine market of the late 1980s 
            generated extreme violence as dealers fought over territory. As the market matured, consolidated, 
            and users aged out, violence dropped. This particularly affected 
            the <Link href="/analysis/racial-disparities">communities hit hardest</Link> by the epidemic.
          </li>
          <li>
            <strong>Economic growth.</strong> The 1990s boom created jobs and opportunities, particularly for 
            young men who might otherwise have turned to crime. The correlation between 
            <Link href="/analysis/crime-and-poverty"> poverty and crime</Link> is strong, and the booming 
            economy of the 1990s lifted many out of the conditions that generate violence.
          </li>
          <li>
            <strong>Policing strategies.</strong> CompStat, community policing, and targeted enforcement 
            helped police become more effective, particularly in high-crime areas. New York&apos;s dramatic 
            crime drop coincided with CompStat implementation. However, correlation isn&apos;t causation, 
            and cities without these programs also saw crime fall.
          </li>
          <li>
            <strong>Mass incarceration.</strong> The US prison population quadrupled from 1980 to 2010. 
            Incarcerating more offenders reduced crime through incapacitation — but at enormous social 
            and fiscal cost. Estimates suggest each 10% increase in incarceration reduced crime by 2-4%, 
            a diminishing return that has turned negative in many analyses.
          </li>
          <li>
            <strong>Lead removal.</strong> The phase-out of leaded gasoline (completed in 1996) reduced 
            lead exposure in children. Lead is linked to aggression, impulsivity, and cognitive deficits. 
            This theory, proposed by economist Jessica Wolpaw Reyes, fits the timing remarkably well — 
            the generation that grew up without lead reached prime crime age in the early 2000s.
          </li>
          <li>
            <strong>Technology.</strong> Cell phones, surveillance cameras, DNA evidence, and other technology 
            made crimes harder to commit and easier to solve. The ATM reduced the amount of cash people 
            carry, making robbery less profitable. The cell phone enabled witnesses to call 911 instantly.
          </li>
          <li>
            <strong>Cultural shifts.</strong> Americans drink less, use drugs differently (the shift from 
            crack to marijuana and prescription drugs involved less territorial violence), and have different 
            attitudes toward violence than in the early 1990s.
          </li>
          <li>
            <strong>Immigration.</strong> Counterintuitively, increased immigration correlates with 
            decreased crime. Immigrant neighborhoods consistently have lower crime rates than comparable 
            native-born neighborhoods, a finding that challenges popular narratives.
          </li>
        </ol>
        <p>
          The most honest assessment: all of these factors contributed something, none explains the whole 
          decline, and we don&apos;t know the precise contribution of each. Anyone claiming one simple 
          explanation — whether it&apos;s &quot;more police,&quot; &quot;more prisons,&quot; or 
          &quot;the economy&quot; — is oversimplifying.
        </p>

        <h2 className="font-heading">The Perception Gap</h2>
        <p>
          Perhaps the most remarkable aspect of the crime decline is how few Americans believe it happened. 
          Gallup polls consistently show that 60-70% of Americans believe crime is getting worse nationally, 
          even during years when crime fell significantly. This &quot;perception gap&quot; is one of the 
          largest disconnects between reality and public opinion in American life.
        </p>
        <p>Why the gap?</p>
        <ul>
          <li><strong>Media coverage.</strong> Local TV news is built on the &quot;if it bleeds, it leads&quot; 
          model. Violent crime coverage has increased even as crime has decreased. A single dramatic incident 
          gets more airtime than years of steady decline.</li>
          <li><strong>Political incentives.</strong> Both parties benefit from fear. Republicans use crime 
          fears to argue for tougher enforcement. Democrats use them to argue for more social spending. 
          Neither has much incentive to say &quot;actually, things are getting better.&quot;</li>
          <li><strong>Social media.</strong> Ring doorbell cameras, Citizen app alerts, and viral crime 
          videos create the impression that crime is everywhere. A shoplifting video from San Francisco 
          gets seen by 10 million people who have never been to San Francisco.</li>
          <li><strong>Cognitive bias.</strong> Humans are wired to overweight threatening information. 
          We remember the scary story; we don&apos;t notice the absence of crime in our daily lives.</li>
          <li><strong>Local vs. national.</strong> Americans often rate their own neighborhood as safe 
          while believing the country is dangerous — a classic availability bias driven by national 
          media consumption.</li>
        </ul>

        <h2 className="font-heading">The 2020 Spike: What Happened and What It Means</h2>
        <p>
          The 2020 murder spike demands serious attention. Murder increased roughly 30% in a single year — 
          the largest annual increase since reliable records began. This wasn&apos;t a statistical artifact; 
          thousands of additional people were killed.
        </p>
        <p>Contributing factors included:</p>
        <ul>
          <li><strong>Pandemic disruption.</strong> School closures, job losses, and social isolation 
          removed the structures that keep potential offenders occupied. The social safety net frayed.</li>
          <li><strong>Police pullback.</strong> After the George Floyd protests, many police departments 
          saw reduced proactive policing — fewer stops, fewer patrols in high-crime areas. See 
          our <Link href="/analysis/defund-police">defund the police analysis</Link> for data.</li>
          <li><strong>Court system shutdown.</strong> Criminal courts closed for months, meaning offenders 
          who would normally be in jail were on the street. The deterrent effect of swift punishment evaporated.</li>
          <li><strong>Gun sales surge.</strong> Americans bought roughly 23 million firearms in 2020, a 64% 
          increase over 2019. More guns in circulation, particularly among first-time owners, meant more 
          opportunities for gun violence.</li>
          <li><strong>Social upheaval.</strong> The combination of pandemic stress, political polarization, 
          and racial tension created conditions ripe for interpersonal violence.</li>
        </ul>
        <p>
          The good news: the spike reversed rapidly. The 2022-2024 decline brought crime back below 
          pre-pandemic levels, suggesting the spike was caused by temporary disruptions rather than 
          structural change. The long-term decline trend appears intact.
        </p>

        <h2 className="font-heading">Who Benefited Most from the Decline?</h2>
        <p>
          The crime decline was not experienced equally. The communities that suffered most during 
          the crime wave — primarily poor, Black, urban neighborhoods — experienced the largest 
          absolute improvements. This is especially true for homicide: the Black homicide rate 
          has fallen more steeply than the white rate since the 1990s.
        </p>
        <p>
          Cities that were considered unlivable in 1990 — New York, Los Angeles, Washington DC — 
          became desirable, driving gentrification and housing price increases. The crime decline 
          enabled urban revival, which in turn created new economic opportunities but also 
          displacement pressures on the original residents.
        </p>
        <p>
          For detailed data on who is most affected by crime across demographics, see 
          our <Link href="/analysis/racial-disparities">racial disparities analysis</Link> and 
          the <Link href="/analysis/crime-by-race">crime by race breakdown</Link>.
        </p>

        <h2 className="font-heading">International Comparison</h2>
        <p>
          The US crime decline is not unique — it happened across the entire developed world. Canada, the UK, 
          France, Germany, Australia, and Japan all experienced significant crime declines starting in the 
          early-to-mid 1990s. This simultaneity suggests that country-specific explanations (US policing 
          strategies, US incarceration rates) can only explain part of the story. Something global was 
          happening — likely a combination of demographic shifts, the lead removal effect, and economic 
          modernization.
        </p>
        <p>
          However, the US still has significantly higher violent crime rates than other wealthy nations, 
          primarily driven by higher homicide rates. The US murder rate is roughly 4-5 times higher than 
          Western Europe, largely due to the prevalence of firearms. See 
          our <Link href="/analysis/gun-violence">gun violence analysis</Link> for the data.
        </p>

        <h2 className="font-heading">What Comes Next?</h2>
        <p>
          The post-pandemic crime snapback suggests that the long-term decline remains intact. 
          The 2024 data shows violent crime {n2023 ? fmtPct((n2024.violentRate - n2023.violentRate) / n2023.violentRate * 100) : 'down'} from 
          2023 and murder {n2023 ? fmtPct((n2024.homicideRate - n2023.homicideRate) / n2023.homicideRate * 100) : 'down significantly'} from 
          2023. If these trends continue, the US could see its lowest crime rates since the 1960s 
          within a few years.
        </p>
        <p>
          However, challenges remain:
        </p>
        <ul>
          <li><strong>Motor vehicle theft</strong> rose significantly since 2019, though it began declining in 2024.</li>
          <li><strong>Geographic concentration.</strong> While most of America gets safer, some neighborhoods 
          remain trapped in cycles of violence. The <Link href="/analysis/murder-map">murder map</Link> shows 
          this concentration starkly.</li>
          <li><strong>Quality-of-life crimes</strong> in some urban areas — shoplifting, public drug use, 
          encampments — may not be fully captured in FBI statistics but affect residents&apos; 
          sense of safety.</li>
          <li><strong>The opioid crisis</strong> continues to drive drug-related crime in many communities, 
          particularly <Link href="/analysis/rural-vs-urban">rural and small-city</Link> areas. See 
          our <Link href="/analysis/opioid-crime-connection">opioid-crime analysis</Link>.</li>
          <li><strong>Reporting gaps.</strong> The FBI&apos;s transition from SRS to NIBRS created data 
          gaps in 2017-2020. Some agencies still don&apos;t participate fully in the new system.</li>
        </ul>

        <h2 className="font-heading">The Libertarian Lesson</h2>
        <p>
          The Great Crime Decline offers a profound lesson about government competence — or the lack 
          thereof. The government spent hundreds of billions on the War on Crime and the War on Drugs. 
          It built the largest prison system in the world. It militarized police forces. And crime 
          fell — but it fell everywhere, including in countries that did none of those things.
        </p>
        <p>
          The most effective crime reduction was not the result of any single government program. It 
          was the result of economic growth, technological change, demographic shifts, and cultural 
          evolution. The government programs that contributed (lead removal, some policing innovations) 
          were modest in scale compared to these broader forces.
        </p>
        <p>
          Meanwhile, the costs of the government&apos;s approach — mass incarceration, broken families, 
          destroyed communities, a criminal justice bureaucracy that costs $300+ billion per year — 
          are staggering. The lesson: government is better at creating conditions for human flourishing 
          (removing lead from gasoline, maintaining basic order) than at engineering outcomes through 
          force (mandatory minimums, three-strikes laws, drug prohibition).
        </p>

        <h2 className="font-heading">The Bottom Line</h2>
        <p>
          The data is unambiguous: America in 2024 is dramatically safer than America in 1991. 
          Violent crime has been cut in half. Murder has been cut in half. Property crime has fallen 
          even more. This happened under both Democratic and Republican administrations, in cities 
          and suburbs, across all regions.
        </p>
        <p>
          This is a genuine achievement — one that almost nobody acknowledges because fear is more 
          politically useful than progress. Every politician who tells you crime is &quot;out of 
          control&quot; is either ignorant of the data or deliberately misleading you. The data 
          is right here. Decide for yourself.
        </p>
      </div>

      {/* === Cross-Links === */}
      <div className="bg-gray-50 rounded-xl p-6 my-8">
        <h3 className="font-heading text-lg font-bold mb-3">Explore Related Data</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <Link href="/analysis/who-commits-crime" className="text-[#1e3a5f] hover:underline text-sm">Who Commits Crime in America →</Link>
          <Link href="/analysis/crime-by-race" className="text-[#1e3a5f] hover:underline text-sm">Crime by Race — FBI Data Breakdown →</Link>
          <Link href="/analysis/murder-map" className="text-[#1e3a5f] hover:underline text-sm">America&apos;s Murder Map →</Link>
          <Link href="/analysis/crime-and-poverty" className="text-[#1e3a5f] hover:underline text-sm">Crime and Poverty →</Link>
          <Link href="/analysis/opioid-crime-connection" className="text-[#1e3a5f] hover:underline text-sm">The Opioid-Crime Connection →</Link>
          <Link href="/analysis/rural-vs-urban" className="text-[#1e3a5f] hover:underline text-sm">Rural vs Urban Crime →</Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/dashboard" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Explore Dashboard</Link>
        <Link href="/crime-rate" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">2024 Crime Statistics</Link>
        <Link href="/years" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Browse by Year</Link>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="crime-decline" tags={['trends', 'policy']} />
        <ShareButtons title="The Great Crime Decline: Why America Is Safer Than You Think" />
      </div>

      {/* FAQ Section */}
      <div className="mt-10 border-t pt-8">
        <h2 className="font-heading text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        {faqItems.map((faq, i) => (
          <div key={i} className="mb-6">
            <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The Great Crime Decline: Why America Is Safer Than You Think',
        description: `Violent crime has fallen ${violentDecline}% since 1991. An in-depth analysis of 45 years of FBI data.`,
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        datePublished: '2026-03-04',
        dateModified: '2026-03-04',
        mainEntityOfPage: 'https://www.opencrime.us/analysis/crime-decline',
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqItems.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      })}} />

      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer, SRS Estimated Crimes 1979–2024.</p>
    </div>
  );
}
