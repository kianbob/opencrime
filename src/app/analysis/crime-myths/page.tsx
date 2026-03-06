import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '10 Things Everyone Gets Wrong About Crime — Common Crime Myths Debunked',
  description:
    '10 widely believed myths about crime debunked with data. Crime is NOT at an all-time high, immigrants DON\'T cause more crime, and other facts that challenge assumptions.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/crime-myths' },
  openGraph: {
    title: '10 Things Everyone Gets Wrong About Crime',
    description: 'Crime myths debunked with data: crime is near historic lows, immigrants commit less crime, and 9 more facts.',
    url: 'https://www.opencrime.us/analysis/crime-myths',
  },
};

type Myth = {
  number: number;
  myth: string;
  fact: string;
  detail: string;
  sources: string[];
  links: { text: string; href: string }[];
};

const myths: Myth[] = [
  {
    number: 1,
    myth: 'Crime is at an all-time high',
    fact: 'Crime is near historic lows — down ~50% from its 1991 peak',
    detail: `This is perhaps the most widely believed myth about crime. Polls consistently show that 60-70% of Americans believe crime is rising, even during years when it\'s falling. The violent crime rate peaked at 758.2 per 100,000 in 1991. By 2014, it had fallen to 361.6 — a 52% decline. Even after the 2020 pandemic spike, crime rates in 2024 are near or below pre-pandemic levels and far below the 1990s peaks. Property crime has fallen even more dramatically — down over 60% from its 1991 peak. The gap between perception and reality is driven by media coverage, social media virality, and the psychological availability heuristic: we remember vivid crimes we see on the news, not the statistical trends.`,
    sources: ['FBI UCR/NIBRS data 1979-2024', 'Gallup crime perception polls'],
    links: [{ text: 'The Great Crime Decline', href: '/analysis/crime-decline' }, { text: 'US Crime Rate', href: '/crime-rate' }],
  },
  {
    number: 2,
    myth: 'Immigrants cause more crime',
    fact: 'Immigrants commit crime at lower rates than native-born citizens',
    detail: `Multiple large-scale studies consistently find that immigrants — including undocumented immigrants — commit crimes at lower rates than native-born Americans. A Cato Institute analysis found that undocumented immigrants are 37% less likely to be convicted of a crime than native-born citizens. Legal immigrants are 65% less likely. Cities with larger immigrant populations tend to have lower crime rates, not higher ones. This pattern has been documented since the early 1900s. The reasons include selection effects (immigrants are often highly motivated), the deterrent effect of deportation, and stronger community and family bonds. This doesn\'t mean no immigrant ever commits a crime — they do. But as a population, immigrants are safer neighbors than the native-born population.`,
    sources: ['Cato Institute immigration studies', 'National Academy of Sciences', 'Alex Nowrasteh, "Immigration and Crime" (2023)'],
    links: [{ text: 'Crime and Poverty Analysis', href: '/analysis/crime-and-poverty' }],
  },
  {
    number: 3,
    myth: 'Most murders are committed by strangers',
    fact: 'The majority of murder victims know their killer',
    detail: `FBI Supplementary Homicide Report data consistently shows that the majority of homicide victims knew their killer. Approximately 54% of homicides where the relationship is known involve someone the victim knew — a family member, friend, acquaintance, or intimate partner. Only about 10-15% of murders are committed by complete strangers. The remaining ~30% have an unknown relationship. Intimate partner homicides account for about 15% of all murders. The "stranger danger" narrative, while psychologically compelling, doesn\'t match the data. You are statistically far more likely to be killed by someone you know than by a random stranger. This has profound implications for prevention — domestic violence intervention, conflict resolution programs, and community-based approaches address the actual patterns of violence better than stranger-focused security measures.`,
    sources: ['FBI Supplementary Homicide Reports', 'Bureau of Justice Statistics'],
    links: [{ text: 'Homicide in America', href: '/analysis/homicide-in-america' }, { text: 'Domestic Violence', href: '/analysis/domestic-violence' }],
  },
  {
    number: 4,
    myth: 'The death penalty deters murder',
    fact: 'No measurable deterrent effect has been found in decades of research',
    detail: `Despite intuitive appeal, the overwhelming weight of empirical evidence finds no measurable deterrent effect of the death penalty on murder rates. A 2012 National Research Council review — the most comprehensive meta-analysis conducted — concluded that existing studies are "fundamentally flawed" and should not be used to inform judgments about the effect of the death penalty on homicide rates. States without the death penalty consistently have lower murder rates than states with it. The national murder rate declined dramatically from 1993-2014 even as executions remained relatively constant. The most likely explanation: the deterrent effect of punishment depends primarily on the certainty and swiftness of being caught, not the severity of punishment. When the murder clearance rate is only ~50%, most killers reasonably expect to get away with it regardless of the potential sentence.`,
    sources: ['National Research Council, "Deterrence and the Death Penalty" (2012)', 'Death Penalty Information Center'],
    links: [{ text: 'Murder Rate Trends', href: '/murder-rate' }, { text: 'Clearance Rates', href: '/analysis/clearance-rates' }],
  },
  {
    number: 5,
    myth: 'More police = less crime',
    fact: 'It\'s complicated — deployment strategy matters more than raw numbers',
    detail: `The relationship between police staffing and crime is more nuanced than either "more cops = less crime" or "police don\'t matter." Research shows that adding police officers can reduce crime — but the effect depends heavily on HOW those officers are deployed. A RAND study of NYC\'s Operation Impact found that flooding high-crime areas with officers reduced crime significantly. But simply having more officers on the payroll, without strategic deployment, shows weaker effects. The "Kansas City Preventive Patrol Experiment" (1974) famously found that random patrol had no measurable impact on crime — it was the FOCUSED use of police resources that mattered. Modern evidence supports "hot spots policing" — concentrating resources in the specific micro-locations where crime clusters. Crime is extremely concentrated: in most cities, 5% of street segments produce 50%+ of crime. Putting officers in those exact locations works. Spreading them randomly across the city doesn\'t.`,
    sources: ['RAND Corporation studies', 'Kansas City Preventive Patrol Experiment', 'Braga et al., "Hot spots policing effects"'],
    links: [{ text: 'Police Staffing Crisis', href: '/analysis/police-staffing-crisis' }, { text: 'Police Funding', href: '/analysis/police-funding' }],
  },
  {
    number: 6,
    myth: 'Property crime is victimless',
    fact: '$17B+ in annual losses, plus lasting psychological impact',
    detail: `Property crime is often dismissed as a minor inconvenience. The data says otherwise. Americans suffer over $17 billion in direct property crime losses annually. But the financial loss is only part of the story. Burglary victims report lasting psychological effects similar to (though less severe than) violent crime victims: anxiety, sleep disturbance, feeling unsafe in their own home, and PTSD symptoms. Studies show that 25-40% of burglary victims report significant emotional distress lasting months or years. Motor vehicle theft — which surged 25% since 2019 — causes enormous disruption to people who depend on their cars for work. For low-income victims, a stolen car can mean lost employment, missed medical appointments, and cascading financial crises. Property crime also has community-level effects: it reduces property values, drives businesses out of neighborhoods, and erodes trust.`,
    sources: ['FBI UCR property crime data', 'British Crime Survey victim studies', 'National Crime Victimization Survey'],
    links: [{ text: 'Property Crime Trends', href: '/analysis/property-crime-surge' }, { text: 'Car Theft Crisis', href: '/analysis/car-theft-crisis' }],
  },
  {
    number: 7,
    myth: 'Crime is random',
    fact: 'Crime is highly concentrated in specific micro-locations',
    detail: `Crime is anything but random. Research consistently finds extreme geographic concentration. In most cities, approximately 5% of street segments produce about 50% of all crime. These "hot spots" are remarkably stable over time — the dangerous block this year was dangerous last year and will likely be dangerous next year. Temporal patterns are equally striking: violent crime peaks between 8 PM and 2 AM, on weekends, and during summer months. Homicides cluster around holidays (New Year\'s Eve, July 4th) and paydays. At the individual level, crime is concentrated among a tiny fraction of the population. About 5% of offenders commit roughly 50% of crimes. And victims are concentrated too — prior victimization is one of the strongest predictors of future victimization. This concentration has a silver lining: because crime is predictable, it is preventable. Hot spots policing, focused deterrence, and place-based interventions can target the specific people, places, and times where crime concentrates.`,
    sources: ['Weisburd, "The Law of Crime Concentration" (2015)', 'Sherman et al., "Hot Spots of Crime"'],
    links: [{ text: 'Violence Concentration', href: '/violence-concentration' }, { text: 'Seasonal Crime', href: '/analysis/seasonal-crime' }],
  },
  {
    number: 8,
    myth: 'Violent crime is primarily interracial',
    fact: 'Violence is overwhelmingly intraracial — within the same racial group',
    detail: `Despite media portrayals and political narratives, the vast majority of violent crime occurs within racial groups, not between them. FBI data consistently shows that about 80-90% of homicides are intraracial: White victims are most commonly killed by White offenders, and Black victims are most commonly killed by Black offenders. This pattern holds for other violent crimes as well. The reason is straightforward: crime follows social networks and geography. People tend to live near, socialize with, and therefore be victimized by people of their own race. The narrative of widespread interracial violence — in either direction — is not supported by the data. This doesn\'t minimize the reality of hate crimes, which do involve interracial violence. But hate crimes represent a small fraction of total violence.`,
    sources: ['FBI Supplementary Homicide Reports', 'Bureau of Justice Statistics, "Criminal Victimization"'],
    links: [{ text: 'Homicide Demographics', href: '/homicide-demographics' }, { text: 'Hate Crimes', href: '/analysis/hate-crimes-america' }],
  },
  {
    number: 9,
    myth: 'Mental illness causes violence',
    fact: 'Less than 5% of violence is attributable to mental illness',
    detail: `The association between mental illness and violence is far weaker than commonly believed. The American Psychiatric Association estimates that people with mental illness account for less than 5% of violent acts. People with serious mental illness are actually 10 times MORE likely to be VICTIMS of violent crime than perpetrators. The overlap between mental illness and violence largely disappears when controlling for substance abuse and socioeconomic factors. When someone with schizophrenia commits violence, it\'s more often related to co-occurring substance abuse, homelessness, or victimization history than to the mental illness itself. The mental illness-violence myth is perpetuated by media coverage of mass shootings, where perpetrators are often described as mentally ill. But mass shootings are statistically rare, and most people with mental illness never commit violence. Stigmatizing mental illness actually makes the problem worse — it discourages people from seeking treatment.`,
    sources: ['American Psychiatric Association', 'MacArthur Violence Risk Assessment Study', 'Fazel et al., "Schizophrenia and Violence" (Lancet, 2009)'],
    links: [{ text: 'Mass Shootings', href: '/analysis/mass-shootings' }, { text: 'Who Commits Crime', href: '/analysis/who-commits-crime' }],
  },
  {
    number: 10,
    myth: 'The criminal justice system effectively prevents crime',
    fact: '83% recidivism rate within 9 years — the system doesn\'t rehabilitate',
    detail: `If the criminal justice system effectively prevented crime, we wouldn\'t see an 83% rearrest rate within 9 years of release. Bureau of Justice Statistics data shows that 44% of released prisoners are rearrested within the first year. Within 3 years, it\'s 68%. Within 9 years, 83%. America incarcerates more people than any country on Earth — about 1.9 million at any given time — yet recidivism rates remain stubbornly high. The system is extraordinarily expensive ($81 billion per year on corrections) and demonstrably ineffective at its stated goal of reducing crime through rehabilitation and deterrence. Countries with lower incarceration rates and more rehabilitation-focused systems (Norway, Netherlands, Germany) have dramatically lower recidivism rates — often 20-30%. The evidence suggests that long prison sentences, without education, job training, and reentry support, actually INCREASE the likelihood of reoffending by destroying social bonds, reducing employability, and immersing people in criminal networks.`,
    sources: ['Bureau of Justice Statistics, "Recidivism of Prisoners Released" (2021)', 'Vera Institute of Justice'],
    links: [{ text: 'Recidivism Crisis', href: '/analysis/recidivism-crisis' }, { text: 'Incarceration Nation', href: '/analysis/incarceration-nation' }],
  },
];

export default function CrimeMythsPage() {
  const aiInsights = [
    'Crime is near 50-year lows — not at an all-time high as most Americans believe',
    'Immigrants commit crime at lower rates than native-born citizens',
    'Most murder victims know their killer — stranger murders are relatively rare',
    'Less than 5% of violence is attributable to mental illness',
    '83% of released prisoners are rearrested within 9 years',
    'Crime is highly concentrated: 5% of street segments produce 50% of crime',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Analysis', href: '/analysis' },
          { label: '10 Crime Myths Debunked' },
        ]}
      />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
        10 Things Everyone Gets Wrong About Crime
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Crime is one of the most misunderstood topics in America. Media coverage, political rhetoric,
        and our own cognitive biases create a picture of crime that often doesn&apos;t match reality.
        Here are 10 widely believed myths — and what the data actually shows.
      </p>

      <AIOverview insights={aiInsights} />

      {/* Table of Contents */}
      <div className="bg-gray-50 rounded-xl border p-6 mb-10">
        <h2 className="font-bold text-gray-900 mb-3">The 10 Myths</h2>
        <ol className="space-y-2 text-sm">
          {myths.map(m => (
            <li key={m.number}>
              <a href={`#myth-${m.number}`} className="text-[#1e3a5f] hover:underline">
                <strong>Myth #{m.number}:</strong> {m.myth}
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* Each Myth */}
      {myths.map(m => (
        <section key={m.number} id={`myth-${m.number}`} className="mb-12">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-red-100 text-red-700 font-bold text-lg rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
              {m.number}
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold">
                <span className="text-red-600">Myth:</span> {m.myth}
              </h2>
              <p className="text-green-700 font-semibold mt-1">
                <span className="text-green-600">Fact:</span> {m.fact}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border p-6 mb-4">
            <p className="text-gray-700 leading-relaxed">{m.detail}</p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <span className="text-gray-500 font-semibold">Sources: </span>
              <span className="text-gray-600">{m.sources.join('; ')}</span>
            </div>
          </div>
          {m.links.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {m.links.map(l => (
                <Link key={l.href} href={l.href} className="text-sm text-[#1e3a5f] font-semibold hover:underline bg-blue-50 px-3 py-1 rounded-lg">
                  {l.text} →
                </Link>
              ))}
            </div>
          )}
        </section>
      ))}

      {/* Conclusion */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">Why These Myths Persist</h2>
        <div className="bg-gray-50 rounded-xl border p-6">
          <p className="text-gray-800 mb-4">
            Crime myths persist for several reasons: media incentives (crime coverage drives ratings),
            political utility (fear motivates voters), cognitive biases (we overweight vivid examples),
            and the gap between personal experience and statistical reality.
          </p>
          <p className="text-gray-800 mb-4">
            The consequences of believing these myths are real. They lead to misallocated resources,
            counterproductive policies, discriminatory practices, and unnecessary fear. When we believe
            crime is at an all-time high, we support harsher sentences that increase recidivism.
            When we blame immigrants, we ignore the actual drivers of violence. When we fear strangers,
            we neglect domestic violence prevention.
          </p>
          <p className="text-gray-800">
            Better data leads to better policy. That&apos;s why we built OpenCrime — to make FBI
            crime statistics accessible to everyone, so the public conversation about crime can be
            grounded in facts rather than fear.
          </p>
        </div>
      </section>

      <ShareButtons title="10 Things Everyone Gets Wrong About Crime" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '10 Things Everyone Gets Wrong About Crime',
        description: '10 widely believed myths about crime debunked with data.',
        url: 'https://www.opencrime.us/analysis/crime-myths',
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        datePublished: '2024-12-01',
        dateModified: new Date().toISOString().split('T')[0],
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Is crime at an all-time high in America?', acceptedAnswer: { '@type': 'Answer', text: 'No. Crime is near historic lows. The violent crime rate peaked at 758.2 per 100K in 1991 and has since fallen roughly 50%. Even after the 2020 pandemic spike, 2024 crime rates are near or below pre-pandemic levels.' }},
          { '@type': 'Question', name: 'Do immigrants commit more crime?', acceptedAnswer: { '@type': 'Answer', text: 'No. Multiple studies, including from the Cato Institute, find that immigrants — including undocumented immigrants — commit crimes at lower rates than native-born citizens. Undocumented immigrants are 37% less likely to be convicted of a crime.' }},
          { '@type': 'Question', name: 'Does mental illness cause violence?', acceptedAnswer: { '@type': 'Answer', text: 'Less than 5% of violence is attributable to mental illness. People with serious mental illness are actually 10x more likely to be victims of crime than perpetrators. The association largely disappears when controlling for substance abuse.' }},
          { '@type': 'Question', name: 'Does the death penalty deter murder?', acceptedAnswer: { '@type': 'Answer', text: 'No measurable deterrent effect has been found. The National Research Council concluded in 2012 that studies claiming a deterrent effect are "fundamentally flawed." States without the death penalty consistently have lower murder rates.' }},
        ],
      })}} />

      <RelatedAnalysis currentSlug="crime-myths" />
    </div>
  );
}
