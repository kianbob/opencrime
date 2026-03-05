import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Recidivism Crisis — 83% Rearrested Within 9 Years',
  description: 'Bureau of Justice Statistics data shows 44% of released prisoners are rearrested within 1 year and 83% within 9 years. Analysis of the revolving door of criminal justice.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/recidivism-crisis' },
  openGraph: {
    url: 'https://www.opencrime.us/analysis/recidivism-crisis',
    title: 'The Recidivism Crisis — America\'s Revolving Door',
    description: '83% of released prisoners rearrested within 9 years. Inside the criminal justice system\'s most persistent failure.',
  },
};

export default function RecidivismCrisisPage() {
  const insights = [
    '44% of released state prisoners are rearrested within the first year — Bureau of Justice Statistics',
    '83% are rearrested within 9 years of release from state prison',
    'Property crime and drug offenses drive the highest recidivism rates — over 70% rearrest within 5 years',
    'The US spends ~$182 billion annually on corrections — $81B on incarceration alone',
    'States with robust reentry programs (e.g., Texas, Georgia) have seen 10-20% recidivism reductions',
    'Black individuals face higher recidivism rates partly due to employment discrimination post-release',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'The Recidivism Crisis' }]} />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">The Recidivism Crisis: America&apos;s Revolving Door of Crime</h1>
      <p className="text-lg text-gray-600 mb-6">
        The US locks up more people than any other nation. But what happens when they get out? The data is stark:
        the vast majority end up back in the system. This is the story of America&apos;s most expensive failure.
      </p>

      <ShareButtons title="The Recidivism Crisis — 83% Rearrested" />

      <AIOverview insights={insights} />

      {/* Hero Stats */}
      <div className="bg-[#1e3a5f] text-white rounded-xl p-8 mb-8">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold text-red-400">44%</div>
            <div className="text-blue-200 text-sm">Rearrested in 1 Year</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-red-400">68%</div>
            <div className="text-blue-200 text-sm">Rearrested in 3 Years</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-red-400">79%</div>
            <div className="text-blue-200 text-sm">Rearrested in 6 Years</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-red-400">83%</div>
            <div className="text-blue-200 text-sm">Rearrested in 9 Years</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">The Numbers: A Cascade of Failure</h2>
        <p>
          The Bureau of Justice Statistics (BJS) conducted the most comprehensive recidivism study to date, tracking
          401,288 state prisoners released in 2005 across 30 states for 9 years. The findings are damning:
        </p>
        <ul>
          <li><strong>Within 1 year:</strong> 44% were rearrested for a new crime</li>
          <li><strong>Within 3 years:</strong> 68% were rearrested</li>
          <li><strong>Within 5 years:</strong> 77% were rearrested</li>
          <li><strong>Within 9 years:</strong> 83% were rearrested</li>
        </ul>
        <p>
          These are not just technical violations or minor infractions. Among those rearrested within 9 years,
          the majority faced new charges for serious offenses including property crime, drug offenses, and violent crime.
          An estimated 44% of those rearrested were also reconvicted, and about a third returned to prison.
        </p>

        <h2 className="font-heading">Recidivism by Offense Type</h2>
        <p>
          Not all crimes produce equal recidivism rates. The pattern connects directly to the
          <Link href="/analysis/drug-crime" className="text-[#1e3a5f] underline"> drug-crime</Link> and
          <Link href="/property-crime" className="text-[#1e3a5f] underline"> property crime</Link> cycles that
          dominate American criminal justice:
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Original Offense</th>
              <th className="text-right px-4 py-2">% Rearrested (5 yr)</th>
              <th className="text-right px-4 py-2">% Rearrested (9 yr)</th>
              <th className="text-left px-4 py-2">Most Common New Charge</th>
            </tr>
          </thead>
          <tbody>
            {[
              { offense: 'Property Crime', r5: '82%', r9: '89%', common: 'Property crime, drug offense' },
              { offense: 'Drug Offense', r5: '77%', r9: '86%', common: 'Drug offense, property crime' },
              { offense: 'Public Order', r5: '74%', r9: '82%', common: 'Public order, property crime' },
              { offense: 'Violent Crime', r5: '72%', r9: '79%', common: 'Property crime, violent crime' },
              { offense: 'DUI', r5: '73%', r9: '82%', common: 'DUI, public order' },
            ].map(r => (
              <tr key={r.offense} className={`border-t ${r.offense === 'Property Crime' ? 'bg-red-50' : ''}`}>
                <td className="px-4 py-2 font-medium">{r.offense}</td>
                <td className="px-4 py-2 text-right font-mono text-red-600">{r.r5}</td>
                <td className="px-4 py-2 text-right font-mono text-red-600 font-semibold">{r.r9}</td>
                <td className="px-4 py-2 text-gray-600">{r.common}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-400 p-3">Source: Bureau of Justice Statistics, 2018 (updated 2021). Based on 2005 release cohort.</p>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <p>
          Property crime offenders have the highest recidivism rate at <strong>89% within 9 years</strong>. This is not
          coincidental — property crime is often driven by addiction, poverty, and lack of employment opportunities, all of
          which persist or worsen after incarceration. The <Link href="/analysis/crime-and-poverty" className="text-[#1e3a5f] underline">poverty-crime connection</Link> is
          particularly stark here.
        </p>
        <p>
          Drug offenders follow closely at 86%. The connection between <Link href="/analysis/drug-crime" className="text-[#1e3a5f] underline">drug crime</Link> and
          recidivism is cyclical: addiction drives crime, incarceration rarely treats addiction, and release back into the
          same environment restarts the cycle. With over <Link href="/drug-arrests" className="text-[#1e3a5f] underline">1.5 million drug arrests</Link> annually,
          this cycle churns through millions of lives.
        </p>

        <h2 className="font-heading">The Cost: $182 Billion Per Year</h2>
        <p>
          America&apos;s criminal justice system costs approximately <strong>$182 billion annually</strong>:
        </p>
        <ul>
          <li><strong>$81 billion</strong> on incarceration (federal, state, and local jails/prisons)</li>
          <li><strong>$47 billion</strong> on policing</li>
          <li><strong>$29 billion</strong> on judicial and legal services</li>
          <li><strong>$25 billion</strong> on collateral costs (lost wages, family disruption, health impacts)</li>
        </ul>
        <p>
          The average annual cost per incarcerated person varies dramatically by state — from $14,000 in Alabama to
          $69,000 in New York to over $100,000 in California. With an 83% recidivism rate, much of this spending
          produces no lasting public safety benefit. A RAND Corporation study estimated that for every dollar spent on
          prison-based education, $4–5 is saved in reduced reincarceration costs.
        </p>

        <h2 className="font-heading">The First 72 Hours: When Recidivism Begins</h2>
        <p>
          Research consistently shows that the highest-risk period for reoffending is immediately after release.
          Released prisoners often face:
        </p>
        <ul>
          <li><strong>No housing:</strong> Many shelters don&apos;t accept people with felony records. 10–15% of released prisoners experience homelessness within the first year.</li>
          <li><strong>No employment:</strong> Studies show that having a criminal record reduces callback rates from employers by 50%. For Black applicants with records, the penalty is even steeper — a 60–70% reduction.</li>
          <li><strong>No identification:</strong> Many leave prison without a valid ID, making it impossible to open bank accounts, rent apartments, or get hired.</li>
          <li><strong>Disrupted social networks:</strong> Years of incarceration sever ties with family, community, and pro-social contacts.</li>
          <li><strong>Substance access:</strong> For those with addiction histories, the return to familiar environments with drug access is extremely high-risk — post-release overdose deaths spike dramatically in the first two weeks.</li>
        </ul>

        <h2 className="font-heading">State-by-State Variation</h2>
        <p>
          Recidivism rates vary significantly across states, reflecting different policies, programs, and demographics:
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">State</th>
              <th className="text-right px-4 py-2">3-Year Rearrest Rate</th>
              <th className="text-left px-4 py-2">Notable Programs</th>
            </tr>
          </thead>
          <tbody>
            {[
              { state: 'Alaska', rate: '78%', programs: 'Limited reentry infrastructure' },
              { state: 'California', rate: '65%', programs: 'Prop 47, realignment, earned time credits' },
              { state: 'Texas', rate: '46%', programs: 'Extensive reentry programs since 2007 reform' },
              { state: 'Georgia', rate: '49%', programs: 'Accountability courts, reentry services' },
              { state: 'Oregon', rate: '56%', programs: 'Measure 110 (drug decrim), reentry councils' },
              { state: 'New York', rate: '59%', programs: 'RSAT, education, work release' },
              { state: 'Virginia', rate: '54%', programs: 'Day reporting centers, job training' },
            ].map(r => (
              <tr key={r.state} className="border-t">
                <td className="px-4 py-2 font-medium">{r.state}</td>
                <td className="px-4 py-2 text-right font-mono">{r.rate}</td>
                <td className="px-4 py-2 text-gray-600 text-sm">{r.programs}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-400 p-3">Note: State recidivism rates use different definitions and measurement periods, making direct comparisons imperfect. Data from state corrections departments and BJS.</p>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <p>
          Texas stands out as a reform success story. After facing a projected need for 17,000 new prison beds in 2007,
          the state instead invested $241 million in treatment and diversion programs. The result: prison population
          declined, crime rates dropped, and recidivism fell by nearly 20%. Georgia followed a similar path in 2012–2017
          with its Criminal Justice Reform Council.
        </p>

        <h2 className="font-heading">The Racial Dimension</h2>
        <p>
          Recidivism rates are not equal across racial groups:
        </p>
        <ul>
          <li>Black individuals have a 5-year rearrest rate of <strong>81%</strong>, compared to 73% for white individuals (BJS data)</li>
          <li>This gap is not primarily explained by criminal history — it reflects post-release barriers</li>
          <li>Employment discrimination against people with records is more severe for Black applicants</li>
          <li>Black returning citizens are more likely to be released into high-poverty, high-surveillance neighborhoods</li>
          <li>Parole supervision intensity is often higher for Black parolees, increasing the probability of technical violations</li>
        </ul>
        <p>
          The <Link href="/arrests" className="text-[#1e3a5f] underline">arrest data</Link> already shows racial disparities
          at the front end of the system. Recidivism data shows those disparities compounding at the back end.
        </p>

        <h2 className="font-heading">What Works: Evidence-Based Approaches</h2>
        <p>
          Research has identified several interventions that genuinely reduce recidivism:
        </p>
        <ol>
          <li>
            <strong>Cognitive Behavioral Therapy (CBT):</strong> Programs like Thinking for a Change reduce recidivism by
            20–30% by addressing criminal thinking patterns. Meta-analyses consistently rank CBT as the most effective
            prison-based intervention.
          </li>
          <li>
            <strong>Education and vocational training:</strong> RAND Corporation found that inmates who participate in
            educational programs are 43% less likely to recidivate. GED programs, college courses, and trade certifications
            all show positive effects.
          </li>
          <li>
            <strong>Substance abuse treatment:</strong> For the large share of offenders with addiction histories, therapeutic
            communities and medication-assisted treatment (MAT) reduce recidivism by 15–25%.
          </li>
          <li>
            <strong>Transitional employment:</strong> Programs that provide immediate, subsidized employment post-release
            (like the Center for Employment Opportunities) reduce recidivism and increase earnings.
          </li>
          <li>
            <strong>Mentoring and case management:</strong> Assigning reentry navigators who help with housing, ID, benefits,
            and employment significantly improves outcomes — especially in the critical first 90 days.
          </li>
          <li>
            <strong>Ban the Box / Fair Chance hiring:</strong> Delaying criminal history questions on job applications
            increases callback rates for people with records by 30–40%.
          </li>
        </ol>

        <h2 className="font-heading">The Connection to Crime Rates</h2>
        <p>
          Recidivism is not just a corrections problem — it directly drives crime rates. Consider:
        </p>
        <ul>
          <li>About 600,000 people are released from state and federal prisons annually</li>
          <li>If 83% are rearrested within 9 years, that&apos;s ~498,000 people cycling back into the arrest pipeline</li>
          <li>Property crime and drug crime account for the bulk of recidivist offenses — matching the patterns in our <Link href="/arrests" className="text-[#1e3a5f] underline">arrest data</Link></li>
          <li>High-recidivism cities tend to be the same cities with the highest crime rates</li>
        </ul>
        <p>
          Reducing recidivism by even 10% would prevent tens of thousands of crimes annually and save billions in
          criminal justice costs. The <Link href="/analysis/crime-decline" className="text-[#1e3a5f] underline">great crime decline</Link> was achieved
          partly through incapacitation (keeping people locked up longer). But with 95% of prisoners eventually released,
          incapacitation is a temporary solution. Genuine, lasting crime reduction requires addressing what happens after release.
        </p>

        <h2 className="font-heading">The Bottom Line</h2>
        <p>
          America&apos;s 83% recidivism rate is not inevitable — it is a policy choice. States like Texas and Georgia have proven
          that investing in evidence-based programs can break the cycle while saving money and reducing crime. The federal
          First Step Act (2018) took modest steps in this direction, but the scale of the problem dwarfs the response.
        </p>
        <p>
          With 2 million people currently incarcerated and 600,000 released every year, recidivism is one of the most
          consequential criminal justice issues in America. Every percentage point reduction in recidivism means
          thousands fewer victims, thousands fewer broken families, and billions in saved costs. The data shows what
          works. The question is whether we&apos;ll fund it.
        </p>

        <h2 className="font-heading">Related Analysis</h2>
        <ul>
          <li><Link href="/analysis/drug-crime">The Drug-Crime Connection</Link></li>
          <li><Link href="/analysis/crime-and-poverty">Crime and Poverty</Link></li>
          <li><Link href="/arrests">US Arrest Statistics</Link></li>
          <li><Link href="/drug-arrests">Drug Arrest Data</Link></li>
          <li><Link href="/arrest-demographics">Arrest Demographics</Link></li>
          <li><Link href="/property-crime">Property Crime Statistics</Link></li>
        </ul>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        Sources: Bureau of Justice Statistics, &quot;2018 Update on Prisoner Recidivism: A 9-Year Follow-Up Period (2005–2014)&quot;;
        RAND Corporation, &quot;Evaluating the Effectiveness of Correctional Education&quot;; Vera Institute of Justice;
        Prison Policy Initiative; state corrections departments.
      </p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'The Recidivism Crisis: America\'s Revolving Door of Crime',
        description: 'Analysis of US recidivism rates: 83% rearrested within 9 years. BJS data, state variation, what works, and policy implications.',
        url: 'https://www.opencrime.us/analysis/recidivism-crisis',
        author: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        datePublished: '2025-03-01',
        dateModified: '2025-03-01',
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the recidivism rate in the US?', acceptedAnswer: { '@type': 'Answer', text: 'According to the Bureau of Justice Statistics, 83% of released state prisoners are rearrested within 9 years. 44% are rearrested within just the first year.' }},
          { '@type': 'Question', name: 'Which crimes have the highest recidivism rates?', acceptedAnswer: { '@type': 'Answer', text: 'Property crime offenders have the highest recidivism rate at 89% rearrested within 9 years, followed by drug offenders at 86%. This reflects the addiction and poverty cycles that drive these crimes.' }},
          { '@type': 'Question', name: 'How much does incarceration cost the US?', acceptedAnswer: { '@type': 'Answer', text: 'The US spends approximately $182 billion annually on its criminal justice system, with $81 billion on incarceration alone. The average cost per prisoner ranges from $14,000 (Alabama) to over $100,000 (California) per year.' }},
          { '@type': 'Question', name: 'What reduces recidivism?', acceptedAnswer: { '@type': 'Answer', text: 'Evidence-based approaches include cognitive behavioral therapy (20-30% reduction), education programs (43% less likely to recidivate per RAND), substance abuse treatment (15-25% reduction), and transitional employment. Texas reduced recidivism by ~20% through comprehensive reform.' }},
        ],
      })}} />
    </div>
  );
}
