import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import RelatedAnalysis from '@/components/RelatedAnalysis';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Incarceration Nation: Why America Locks Up More People Than Any Country on Earth',
  description:
    'The US has 5% of the world\'s population but 20% of its prisoners. ~1.9M incarcerated, $81B annual cost, massive racial disparities. Full data analysis.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/incarceration-nation' },
  openGraph: {
    title: 'Incarceration Nation: Why America Locks Up More People Than Any Country on Earth',
    description:
      'The US has 5% of the world population but 20% of its prisoners. Analysis of mass incarceration by the numbers.',
    url: 'https://www.opencrime.us/analysis/incarceration-nation',
  },
};

export default function IncarcerationNationPage() {
  const aiInsights = [
    'The US incarcerates ~1.9 million people — more than any country on Earth',
    'America has 5% of the world\'s population but roughly 20% of its prisoners',
    'Annual cost: ~$81 billion on corrections, or ~$40,000+ per prisoner per year',
    'Black Americans are incarcerated at roughly 5x the rate of White Americans',
    'US incarceration rate has declined ~25% from its 2009 peak but remains #1 globally',
    'Private prisons hold ~8% of prisoners and generate $7.4B in annual revenue',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Analysis', href: '/analysis' },
          { label: 'Incarceration Nation' },
        ]}
      />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">
          DEEP DIVE
        </span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
        Incarceration Nation: Why America Locks Up More People Than Any Country on Earth
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        The United States is home to 4.2% of the world&apos;s population — and roughly 20% of its
        prisoners. With approximately 1.9 million people behind bars, America incarcerates more
        human beings than any other country in absolute numbers and at one of the highest rates
        per capita. This is not a recent phenomenon. It is the product of four decades of policy
        choices that created the world&apos;s largest prison system. This analysis examines the
        numbers, the costs, the disparities, and the reform efforts.
      </p>

      <AIOverview insights={aiInsights} />

      {/* Key stats hero */}
      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">~1.9M</div>
            <div className="text-blue-200 text-sm">People Incarcerated</div>
          </div>
          <div>
            <div className="text-3xl font-bold">$81B</div>
            <div className="text-blue-200 text-sm">Annual Cost</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-400">5x</div>
            <div className="text-blue-200 text-sm">Black vs White Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold">#1</div>
            <div className="text-blue-200 text-sm">World Ranking</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Numbers: America&apos;s Incarceration Complex</h2>
        <p>
          As of 2023, approximately 1.9 million people are incarcerated in the United States. This
          figure includes:
        </p>
        <ul>
          <li>
            <strong>~1.2 million</strong> in state prisons (serving sentences of typically 1+ years)
          </li>
          <li>
            <strong>~145,000</strong> in federal prisons (federal offenses including drug
            trafficking, immigration, white-collar crime)
          </li>
          <li>
            <strong>~550,000</strong> in local jails (pre-trial detainees and those serving short
            sentences)
          </li>
        </ul>
        <p>
          But the 1.9 million figure understates the full scope of the criminal justice system&apos;s
          reach. Adding people on probation and parole, the total under correctional supervision
          exceeds 5.5 million Americans — roughly 1 in 60 adults. Including those with criminal
          records who have completed their sentences, the number of Americans affected by the
          system reaches into the tens of millions.
        </p>
        <p>
          The US incarceration rate stands at approximately 531 per 100,000 residents. While this
          has declined from the peak of roughly 710 per 100,000 in 2009, it remains far higher
          than any other developed nation and most countries worldwide.
        </p>

        <h2 className="font-heading">International Comparison: An Outlier Among Outliers</h2>
        <p>
          America&apos;s incarceration rate is not just high — it is in a category by itself
          among developed democracies:
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Country</th>
              <th className="text-right px-4 py-2">Rate per 100K</th>
              <th className="text-right px-4 py-2">vs US Rate</th>
              <th className="text-left px-4 py-2">Context</th>
            </tr>
          </thead>
          <tbody>
            {[
              { country: 'United States', rate: '~531', vs: '—', ctx: 'World leader in incarceration' },
              { country: 'El Salvador', rate: '~600+', vs: 'Higher', ctx: 'Post-gang crackdown surge' },
              { country: 'Rwanda', rate: '~580', vs: 'Comparable', ctx: 'Post-genocide detentions' },
              { country: 'Turkmenistan', rate: '~552', vs: 'Comparable', ctx: 'Authoritarian regime' },
              { country: 'Cuba', rate: '~510', vs: '0.96x', ctx: 'Authoritarian regime' },
              { country: 'United Kingdom', rate: '~130', vs: '0.24x', ctx: 'Highest in Western Europe' },
              { country: 'Canada', rate: '~104', vs: '0.20x', ctx: 'US neighbor' },
              { country: 'France', rate: '~93', vs: '0.18x', ctx: 'Major EU country' },
              { country: 'Germany', rate: '~69', vs: '0.13x', ctx: 'Europe\'s largest economy' },
              { country: 'Japan', rate: '~38', vs: '0.07x', ctx: 'Lowest among G7 nations' },
              { country: 'Norway', rate: '~54', vs: '0.10x', ctx: 'Rehabilitation-focused model' },
              { country: 'India', rate: '~36', vs: '0.07x', ctx: 'World\'s most populous country' },
            ].map((c) => (
              <tr key={c.country} className={`border-t ${c.country === 'United States' ? 'bg-red-50 font-semibold' : ''}`}>
                <td className="px-4 py-2">{c.country}</td>
                <td className="px-4 py-2 text-right font-mono">{c.rate}</td>
                <td className="px-4 py-2 text-right font-mono">{c.vs}</td>
                <td className="px-4 py-2 text-gray-600 text-xs">{c.ctx}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-sm text-gray-500 px-4 py-3">
          The US incarcerates people at roughly 4x the rate of the UK, 5x Canada, and 8x Germany.
          The only countries with comparable rates are authoritarian regimes or nations in crisis.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <p>
          This comparison is stark. The United States locks up people at 4-8 times the rate of
          other wealthy democracies with similar crime profiles. Even adjusting for America&apos;s
          higher violent crime rate, the incarceration rate far exceeds what crime differences
          would explain. The difference is primarily a function of policy: longer sentences, more
          mandatory minimums, broader criminalization, and less use of alternatives to incarceration.
        </p>

        <h2 className="font-heading">How We Got Here: The Rise of Mass Incarceration</h2>
        <p>
          America&apos;s prison population was relatively stable from the 1920s through the early
          1970s, hovering around 200,000-300,000. Then it began a dramatic, four-decade expansion:
        </p>
        <ul>
          <li>
            <strong>1972:</strong> ~200,000 incarcerated (rate: ~97 per 100K)
          </li>
          <li>
            <strong>1980:</strong> ~320,000 — the &quot;War on Drugs&quot; begins under Nixon/Reagan
          </li>
          <li>
            <strong>1990:</strong> ~740,000 — crack epidemic fuels punitive sentencing
          </li>
          <li>
            <strong>2000:</strong> ~1.4 million — &quot;three strikes&quot; laws and truth-in-sentencing
          </li>
          <li>
            <strong>2009:</strong> ~1.6 million — the peak, rate of ~710 per 100K
          </li>
          <li>
            <strong>2023:</strong> ~1.9 million total (incl. jails) — declining from peak but still enormous
          </li>
        </ul>
        <p>
          The drivers of this expansion included:
        </p>
        <ol>
          <li>
            <strong>The War on Drugs.</strong> Drug offenses drove a massive share of prison growth.
            The number of people incarcerated for drug offenses increased roughly tenfold between
            1980 and 2000. Mandatory minimum sentences for drug possession meant that non-violent
            offenders received lengthy prison terms. See our{' '}
            <Link href="/drug-arrests" className="text-[#1e3a5f] hover:underline">
              drug arrest data
            </Link>{' '}
            for current figures.
          </li>
          <li>
            <strong>Mandatory minimum sentences.</strong> Federal and state mandatory minimums
            removed judicial discretion, forcing judges to impose long sentences regardless of
            circumstances. The 1986 Anti-Drug Abuse Act, with its infamous 100:1 crack-to-powder
            cocaine sentencing disparity, was particularly devastating.
          </li>
          <li>
            <strong>Three strikes and truth-in-sentencing laws.</strong> By the mid-1990s, 28
            states had enacted &quot;three strikes&quot; laws mandating life sentences for third
            felony convictions, sometimes for non-violent offenses. Truth-in-sentencing laws
            required inmates to serve at least 85% of their sentences.
          </li>
          <li>
            <strong>Tough-on-crime politics.</strong> From the late 1980s through the 2000s,
            being &quot;tough on crime&quot; was a political imperative for candidates of both
            parties. The 1994 Crime Bill, signed by President Clinton, provided $9.7 billion for
            prison construction and incentivized states to adopt longer sentences.
          </li>
          <li>
            <strong>Plea bargaining pressure.</strong> Roughly 95% of criminal cases are resolved
            through plea bargains, not trials. Prosecutors wield enormous power through charging
            decisions and mandatory minimums, often pressuring defendants to accept plea deals
            regardless of guilt.
          </li>
        </ol>

        <h2 className="font-heading">Racial Disparities: The Defining Feature</h2>
        <p>
          Race is the defining lens through which American incarceration must be understood. The
          disparities are enormous and well-documented:
        </p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-xl p-5 my-6">
        <h3 className="font-semibold text-red-800 mb-3">Racial Disparities in Incarceration</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="text-red-600 font-bold mt-0.5">→</span>
            <span>
              Black Americans are incarcerated at roughly <strong>5 times</strong> the rate of
              White Americans
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-600 font-bold mt-0.5">→</span>
            <span>
              Hispanic Americans are incarcerated at roughly <strong>1.3 times</strong> the rate
              of White Americans
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-600 font-bold mt-0.5">→</span>
            <span>
              1 in 3 Black men born today can expect to be incarcerated at some point, compared
              to 1 in 17 White men (Sentencing Project estimate)
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-600 font-bold mt-0.5">→</span>
            <span>
              Black Americans are 13.7% of the US population but approximately 38% of the
              prison population
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-600 font-bold mt-0.5">→</span>
            <span>
              The disparity is worst for drug offenses — Black and White Americans use drugs at
              similar rates, but Black Americans are arrested and incarcerated for drug offenses
              at 3-4x the rate
            </span>
          </li>
        </ul>
      </div>

      <div className="prose prose-lg max-w-none">
        <p>
          These disparities are the product of multiple factors: differential policing (more police
          presence in Black neighborhoods), prosecutorial discretion (harsher charging decisions
          for Black defendants), wealth-based pretrial detention (inability to post bail), sentencing
          disparities, and the cumulative effects of systemic racism across every stage of the
          criminal justice system.
        </p>
        <p>
          For a comprehensive analysis, see our{' '}
          <Link href="/analysis/racial-disparities" className="text-[#1e3a5f] hover:underline">
            racial disparities deep dive
          </Link>{' '}
          and{' '}
          <Link href="/arrests" className="text-[#1e3a5f] hover:underline">
            arrest data
          </Link>.
        </p>

        <h2 className="font-heading">The Cost: $81 Billion and Counting</h2>
        <p>
          Mass incarceration carries an enormous financial cost. Direct spending on corrections —
          prisons, jails, and community supervision — totals approximately $81 billion per year
          at the federal, state, and local levels combined.
        </p>
        <p>
          The per-prisoner cost varies dramatically by state:
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">State</th>
              <th className="text-right px-4 py-2">Annual Cost/Prisoner</th>
              <th className="text-right px-4 py-2">Incarceration Rate</th>
              <th className="text-left px-4 py-2">Note</th>
            </tr>
          </thead>
          <tbody>
            {[
              { state: 'New York', cost: '~$106,000', rate: '~221', note: 'Highest per-prisoner cost' },
              { state: 'California', cost: '~$132,000', rate: '~310', note: 'Very high cost, declining population' },
              { state: 'Massachusetts', cost: '~$75,000', rate: '~146', note: 'Low rate, high cost' },
              { state: 'Texas', cost: '~$25,000', rate: '~529', note: 'Low cost, high rate' },
              { state: 'Louisiana', cost: '~$24,000', rate: '~680', note: 'Highest incarceration rate' },
              { state: 'Mississippi', cost: '~$20,000', rate: '~636', note: 'Among lowest cost and highest rate' },
              { state: 'Minnesota', cost: '~$52,000', rate: '~176', note: 'Low rate, moderate cost' },
              { state: 'Alabama', cost: '~$18,000', rate: '~572', note: 'Lowest per-prisoner spending' },
            ].map((s) => (
              <tr key={s.state} className="border-t">
                <td className="px-4 py-2 font-medium">{s.state}</td>
                <td className="px-4 py-2 text-right font-mono">{s.cost}</td>
                <td className="px-4 py-2 text-right font-mono">{s.rate}</td>
                <td className="px-4 py-2 text-gray-600 text-xs">{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-sm text-gray-500 px-4 py-3">
          Cost figures are approximate and include housing, healthcare, administration, and
          staffing. Rates per 100,000 residents.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <p>
          But $81 billion in direct corrections spending understates the true economic cost.
          The Vera Institute of Justice estimates that when you include policing, courts,
          prosecution, public defense, and the economic impact of removing millions of working-age
          adults from the labor force, the total cost of the criminal justice system exceeds $300
          billion annually.
        </p>
        <p>
          Additional hidden costs include:
        </p>
        <ul>
          <li>
            <strong>Lost wages and tax revenue:</strong> Incarcerated people earn nothing or
            near-nothing. Their lost economic productivity and tax contributions are estimated at
            $70-$100 billion per year.
          </li>
          <li>
            <strong>Family impact:</strong> An estimated 2.7 million children have an incarcerated
            parent. These children face elevated risks of poverty, behavioral problems, and future
            incarceration themselves.
          </li>
          <li>
            <strong>Healthcare:</strong> Incarcerated people have constitutionally guaranteed
            healthcare — often better than what they received in their communities. Aging prison
            populations are driving costs up as chronic disease and dementia care increase.
          </li>
          <li>
            <strong>Post-release barriers:</strong> Criminal records create lifelong barriers to
            employment, housing, education, and voting. These barriers contribute directly to
            recidivism — see our{' '}
            <Link href="/analysis/recidivism-crisis" className="text-[#1e3a5f] hover:underline">
              recidivism analysis
            </Link>.
          </li>
        </ul>

        <h2 className="font-heading">State Variation: Louisiana vs. Minnesota</h2>
        <p>
          The variation in incarceration rates among US states is as dramatic as the variation
          between countries. Louisiana, long known as the &quot;incarceration capital of the
          world,&quot; has an incarceration rate of approximately 680 per 100,000 — higher than
          any country except El Salvador. Minnesota, by contrast, incarcerates at a rate of about
          176 per 100,000 — still higher than most European nations but less than one-quarter of
          Louisiana&apos;s rate.
        </p>
        <p>
          What explains the gap? The two states have different crime rates, but the difference in
          incarceration rates far exceeds the difference in crime. The primary drivers are policy
          choices:
        </p>
        <ul>
          <li>
            <strong>Sentencing length:</strong> Southern states generally impose longer sentences
            for equivalent offenses
          </li>
          <li>
            <strong>Parole and probation:</strong> States like Minnesota make greater use of
            community supervision as an alternative to incarceration
          </li>
          <li>
            <strong>Drug policy:</strong> Some states have decriminalized or reduced penalties
            for drug possession; others maintain harsh mandatory minimums
          </li>
          <li>
            <strong>Bail reform:</strong> States with cash bail systems disproportionately
            incarcerate poor defendants who cannot afford bail
          </li>
          <li>
            <strong>Political culture:</strong> Punitive attitudes toward crime correlate with
            higher incarceration rates, independent of actual crime levels
          </li>
        </ul>
        <p>
          For state-by-state crime data and how it relates to poverty and economic conditions,
          see our{' '}
          <Link href="/analysis/crime-and-poverty" className="text-[#1e3a5f] hover:underline">
            crime and poverty analysis
          </Link>.
        </p>

        <h2 className="font-heading">Private Prisons: The $7.4 Billion Industry</h2>
        <p>
          Approximately 8% of US prisoners are held in privately operated facilities. The private
          prison industry, dominated by CoreCivic (formerly Corrections Corporation of America)
          and GEO Group, generates approximately $7.4 billion in annual revenue.
        </p>
        <p>
          Private prisons are controversial for several reasons:
        </p>
        <ul>
          <li>
            <strong>Financial incentive to incarcerate:</strong> Private prison companies profit
            from keeping beds full, creating a structural incentive to lobby for tough sentencing
            and against reforms that reduce incarceration.
          </li>
          <li>
            <strong>Quality concerns:</strong> Studies have found that private prisons often have
            higher rates of violence, fewer programming opportunities, and worse conditions than
            publicly operated facilities.
          </li>
          <li>
            <strong>Political influence:</strong> Private prison companies spend millions on
            lobbying and campaign contributions. Between 2000 and 2020, the industry spent over
            $25 million on federal lobbying alone.
          </li>
          <li>
            <strong>Immigration detention:</strong> Private companies operate the majority of
            immigration detention facilities, which house an additional 30,000-50,000 people
            not counted in standard incarceration figures.
          </li>
        </ul>
        <p>
          The Biden administration issued an executive order in 2021 to phase out federal use of
          private prisons, though this did not affect state facilities or immigration detention.
          Several states have banned private prisons entirely.
        </p>

        <h2 className="font-heading">The Decline: Progress Since 2009</h2>
        <p>
          After four decades of relentless growth, the US prison population has been declining
          since 2009. The incarceration rate has dropped approximately 25% from its peak, driven
          by:
        </p>
        <ul>
          <li>
            <strong>Bipartisan reform:</strong> Criminal justice reform has become one of the
            rare issues with bipartisan support. The 2018 First Step Act (signed by President
            Trump) reduced some federal mandatory minimums and expanded early release programs.
          </li>
          <li>
            <strong>State-level reforms:</strong> States from Texas to California to New Jersey
            have reduced incarceration through sentencing reform, drug court expansion, and
            alternatives to incarceration.
          </li>
          <li>
            <strong>Declining crime:</strong> As crime has fallen (see our{' '}
            <Link href="/crime-rate" className="text-[#1e3a5f] hover:underline">
              crime rate data
            </Link>
            ), fewer people are entering the system.
          </li>
          <li>
            <strong>Drug policy reform:</strong> Marijuana legalization in 24+ states has
            eliminated a major source of arrests and incarceration.
          </li>
          <li>
            <strong>Bail reform:</strong> Several states and cities have reformed cash bail
            systems, reducing pretrial detention of people who cannot afford bail.
          </li>
        </ul>
        <p>
          However, the pace of decline is slow. At current rates, it would take decades to bring
          US incarceration in line with other developed nations. And the decline has been uneven —
          some states continue to increase their prison populations even as others shrink.
        </p>

        <h2 className="font-heading">The Recidivism Problem</h2>
        <p>
          Mass incarceration is self-perpetuating in part because the system fails at its stated
          goal of rehabilitation. Bureau of Justice Statistics data shows that 83% of released
          prisoners are rearrested within 9 years. Within 3 years of release, 68% are rearrested.
          Within 1 year, 44% are rearrested.
        </p>
        <p>
          These staggering recidivism rates reflect the barriers that formerly incarcerated people
          face: criminal records that block employment, housing discrimination, loss of social
          connections, untreated mental health and substance abuse issues, and the disorientation
          of reentry after years of institutionalization.
        </p>
        <p>
          Countries with lower incarceration rates often have dramatically lower recidivism.
          Norway, which focuses on rehabilitation with a prison system designed to mimic normal
          life, has a recidivism rate of approximately 20% — compared to America&apos;s 83%.
          For our full analysis, see the{' '}
          <Link href="/analysis/recidivism-crisis" className="text-[#1e3a5f] hover:underline">
            recidivism crisis
          </Link>{' '}
          article.
        </p>

        <h2 className="font-heading">Does Incarceration Reduce Crime?</h2>
        <p>
          The central question: does mass incarceration make America safer? The answer is
          complicated:
        </p>
        <ul>
          <li>
            <strong>Incapacitation works — to a point.</strong> Locking up people who commit
            crimes prevents them from committing more crimes while incarcerated. Research
            estimates that incarceration explains 10-25% of the crime decline since the 1990s.
          </li>
          <li>
            <strong>Diminishing returns.</strong> Beyond a certain point, incarcerating more
            people produces diminishing safety returns. The &quot;marginal prisoner&quot; at
            today&apos;s incarceration levels is increasingly a non-violent offender whose
            imprisonment has minimal public safety benefit.
          </li>
          <li>
            <strong>Criminogenic effects.</strong> Prison can make people worse. Exposure to
            violent offenders, gang recruitment, institutional trauma, and the development of
            criminal skills and networks mean that some people leave prison more dangerous than
            when they entered.
          </li>
          <li>
            <strong>Community effects.</strong> High incarceration rates destabilize communities.
            When large numbers of men are removed from neighborhoods, it disrupts families,
            reduces collective efficacy, and can actually increase crime in the long run.
          </li>
        </ul>
        <p>
          The consensus among criminologists is that the US is well past the point of diminishing
          returns. The prison population could be reduced significantly — perhaps by 30-40% —
          without meaningfully increasing crime, particularly if reductions focus on non-violent
          offenders and are accompanied by community-based alternatives.
        </p>

        <h2 className="font-heading">Reform Efforts and What Works</h2>
        <p>
          Promising reforms include:
        </p>
        <ul>
          <li>
            <strong>Sentencing reform:</strong> Reducing mandatory minimums, expanding judicial
            discretion, and creating sentencing alternatives for non-violent offenses
          </li>
          <li>
            <strong>Drug policy reform:</strong> Treatment over incarceration for drug offenses,
            marijuana legalization, and drug court diversion programs
          </li>
          <li>
            <strong>Bail reform:</strong> Eliminating cash bail for non-violent offenses to
            reduce pretrial detention of the poor
          </li>
          <li>
            <strong>Reentry programs:</strong> Housing support, job training, education, and
            mental health services for people leaving prison
          </li>
          <li>
            <strong>Restorative justice:</strong> Programs that focus on repairing harm rather
            than punishment, particularly for juvenile and non-violent offenders
          </li>
          <li>
            <strong>Record expungement:</strong> &quot;Ban the box&quot; laws and record
            expungement help formerly incarcerated people reintegrate into society
          </li>
        </ul>

        <h2 className="font-heading">The Bottom Line</h2>
        <p>
          America&apos;s incarceration rate is an anomaly among democracies. It is not explained
          by crime rates — countries with similar or higher crime rates incarcerate at a fraction
          of the US rate. It is the product of policy choices: the War on Drugs, mandatory
          minimums, three-strikes laws, cash bail, and a punitive political culture.
        </p>
        <p>
          The costs — $81+ billion annually, destroyed families, devastated communities, massive
          racial disparities — are borne disproportionately by Black and brown Americans. The
          system has been declining from its peak, but the US remains the world&apos;s leading
          incarcerator by a wide margin.
        </p>
        <p>
          Reform is possible. It is happening, slowly, in states across the country. But the
          scale of the challenge — reducing a prison population that took 40 years to build —
          will require sustained political will and a fundamental rethinking of America&apos;s
          approach to crime and punishment.
        </p>

        <h2 className="font-heading">Frequently Asked Questions</h2>
        <h3>How many people are incarcerated in the US?</h3>
        <p>
          Approximately 1.9 million people are incarcerated in the US as of 2023, including
          ~1.2 million in state prisons, ~145,000 in federal prisons, and ~550,000 in local
          jails. Over 5.5 million are under some form of correctional supervision.
        </p>
        <h3>Why does the US incarcerate so many people?</h3>
        <p>
          The primary drivers are policy choices: the War on Drugs, mandatory minimum sentences,
          three-strikes laws, cash bail, and a political culture that has prioritized punishment
          over rehabilitation for four decades. The US incarcerates at 4-8x the rate of other
          developed democracies.
        </p>
        <h3>How much does incarceration cost?</h3>
        <p>
          Direct corrections spending totals approximately $81 billion per year. When including
          policing, courts, lost economic productivity, and family impacts, the total cost of
          the criminal justice system exceeds $300 billion annually.
        </p>
        <h3>Are racial disparities in incarceration improving?</h3>
        <p>
          The Black-White incarceration gap has narrowed somewhat — from roughly 8:1 in the early
          2000s to about 5:1 today. However, Black Americans remain dramatically overrepresented,
          comprising about 38% of the prison population while being 13.7% of the general population.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link
          href="/analysis/recidivism-crisis"
          className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition"
        >
          Recidivism Crisis
        </Link>
        <Link
          href="/analysis/racial-disparities"
          className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Racial Disparities
        </Link>
        <Link
          href="/analysis/crime-and-poverty"
          className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Crime & Poverty
        </Link>
        <Link
          href="/drug-arrests"
          className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Drug Arrests
        </Link>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="incarceration-nation" />
        <ShareButtons title="Incarceration Nation: Why America Locks Up More People Than Any Country on Earth" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline:
              'Incarceration Nation: Why America Locks Up More People Than Any Country on Earth',
            description:
              'The US has 5% of the world population but 20% of its prisoners. Analysis of mass incarceration, costs, and racial disparities.',
            publisher: {
              '@type': 'Organization',
              name: 'OpenCrime',
              url: 'https://www.opencrime.us',
            },
            datePublished: '2026-03-05',
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How many people are incarcerated in the US?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Approximately 1.9 million as of 2023, including state prisons, federal prisons, and local jails. Over 5.5 million are under correctional supervision.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why does the US incarcerate so many people?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Policy choices: the War on Drugs, mandatory minimums, three-strikes laws, cash bail, and punitive political culture. The US incarcerates at 4-8x the rate of peer democracies.',
                },
              },
              {
                '@type': 'Question',
                name: 'How much does incarceration cost?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Direct corrections spending: ~$81 billion/year. Total system costs including courts, policing, and lost productivity exceed $300 billion.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are racial disparities in incarceration improving?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Black-White gap has narrowed from ~8:1 to ~5:1, but Black Americans remain 38% of prisoners while being 13.7% of the population.',
                },
              },
            ],
          }),
        }}
      />

      <p className="text-sm text-gray-500 mt-8">
        Sources: Bureau of Justice Statistics, The Sentencing Project, Prison Policy Initiative,
        Vera Institute of Justice.
      </p>
    </div>
  );
}
