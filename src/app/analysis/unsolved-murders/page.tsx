import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import RelatedAnalysis from '@/components/RelatedAnalysis';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unsolved Murders in America: The Epidemic of Cases That Never Close',
  description:
    'Murder clearance rates dropped from 90%+ in the 1960s to roughly 50% today. An estimated 250,000+ murders have gone unsolved since 2000. Data-driven analysis.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/unsolved-murders' },
  openGraph: {
    title: 'Unsolved Murders in America: The Epidemic of Cases That Never Close',
    description:
      'Murder clearance rates dropped from 90%+ in the 1960s to roughly 50% today. An estimated 250,000+ unsolved murders since 2000.',
    url: 'https://www.opencrime.us/analysis/unsolved-murders',
  },
};

export default function UnsolvedMurdersPage() {
  const aiInsights = [
    'Murder clearance rate has dropped from ~93% in the 1960s to roughly 50% today',
    'Approximately 8,000–9,000 murders per year go unsolved in the United States',
    'An estimated 250,000+ murders have gone unsolved since 2000',
    'Black victims\' homicide cases are significantly less likely to be solved than White victims\' cases',
    'Cold case backlogs in major cities number in the tens of thousands',
    'DNA and forensic technology solve only a fraction of the backlog despite advances',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Analysis', href: '/analysis' },
          { label: 'Unsolved Murders in America' },
        ]}
      />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">
          DEEP DIVE
        </span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
        Unsolved Murders in America: The Epidemic of Cases That Never Close
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        In the 1960s, American law enforcement solved more than 90% of murders. Today, that figure
        hovers around 50%. For every killer brought to justice, another walks free. The cumulative
        toll is staggering: an estimated quarter-million unsolved murders since the turn of the
        millennium. This is the story of how America lost the ability to solve its most serious
        crime.
      </p>

      <AIOverview insights={aiInsights} />

      {/* Key stats hero */}
      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">~50%</div>
            <div className="text-blue-200 text-sm">Current Clearance Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold">93%</div>
            <div className="text-blue-200 text-sm">1960s Clearance Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-400">~9,000</div>
            <div className="text-blue-200 text-sm">Unsolved Per Year</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-400">250,000+</div>
            <div className="text-blue-200 text-sm">Unsolved Since 2000</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Clearance Rate Collapse</h2>
        <p>
          The &quot;clearance rate&quot; — the percentage of reported crimes that result in an arrest
          or exceptional clearance — is the primary measure of how effectively police solve crimes.
          For murder, this metric tells a deeply troubling story.
        </p>
        <p>
          In 1965, American police departments cleared approximately 93% of all reported homicides.
          Nearly every murder led to an arrest. By 1980, the rate had fallen to about 72%. By 2000,
          it was 65%. By 2020, it dropped to approximately 50% — and in some estimates dipped below
          that threshold for the first time in recorded history.
        </p>
        <p>
          The 2020 pandemic year was particularly devastating: the murder count surged roughly 30%
          while police resources were stretched thin, witnesses were harder to locate, and court
          systems ground to a halt. The result was a clearance rate that some researchers estimated
          fell as low as 47% — meaning more murders went unsolved than solved for the first time.
        </p>
        <p>
          For a comprehensive look at clearance rates across all crime types, see our{' '}
          <Link href="/analysis/clearance-rates" className="text-[#1e3a5f] hover:underline">
            clearance rates analysis
          </Link>.
        </p>
      </div>

      {/* Clearance rate timeline */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Era</th>
              <th className="text-right px-4 py-2">Approx. Clearance Rate</th>
              <th className="text-right px-4 py-2">Approx. Annual Unsolved</th>
              <th className="text-left px-4 py-2">Context</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">1960s</td>
              <td className="px-4 py-2 text-right font-mono text-green-600">~93%</td>
              <td className="px-4 py-2 text-right font-mono">~700</td>
              <td className="px-4 py-2 text-gray-600">Low murder count, close community ties</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">1970s</td>
              <td className="px-4 py-2 text-right font-mono text-yellow-600">~79%</td>
              <td className="px-4 py-2 text-right font-mono">~4,200</td>
              <td className="px-4 py-2 text-gray-600">Rising crime, urbanization</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">1980s</td>
              <td className="px-4 py-2 text-right font-mono text-yellow-600">~72%</td>
              <td className="px-4 py-2 text-right font-mono">~5,600</td>
              <td className="px-4 py-2 text-gray-600">Crack epidemic begins</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">1990s</td>
              <td className="px-4 py-2 text-right font-mono text-orange-600">~65%</td>
              <td className="px-4 py-2 text-right font-mono">~7,500</td>
              <td className="px-4 py-2 text-gray-600">Peak murder, gang violence</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">2000s</td>
              <td className="px-4 py-2 text-right font-mono text-orange-600">~63%</td>
              <td className="px-4 py-2 text-right font-mono">~5,900</td>
              <td className="px-4 py-2 text-gray-600">DNA era begins, murders declining</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">2010s</td>
              <td className="px-4 py-2 text-right font-mono text-red-600">~61%</td>
              <td className="px-4 py-2 text-right font-mono">~5,700</td>
              <td className="px-4 py-2 text-gray-600">Continued slow decline</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">2020–2024</td>
              <td className="px-4 py-2 text-right font-mono text-red-600">~50%</td>
              <td className="px-4 py-2 text-right font-mono">~8,500</td>
              <td className="px-4 py-2 text-gray-600">Pandemic surge, staffing crisis</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">Why Did Clearance Rates Fall?</h2>
        <p>
          The decline in murder clearance rates is driven by multiple interconnected factors. No
          single explanation accounts for the full drop, but criminologists have identified several
          key contributors:
        </p>

        <h3 className="font-heading">1. The Nature of Murder Changed</h3>
        <p>
          In the 1960s, most murders involved people who knew each other — domestic disputes, bar
          fights, arguments between acquaintances. These cases are relatively easy to solve because
          the suspect pool is small and obvious. Today, a growing share of murders involve stranger
          violence, gang conflicts, and drug-market disputes where the victim-offender relationship
          is harder to establish. Street shootings with no witnesses and no forensic evidence are
          inherently harder to clear.
        </p>

        <h3 className="font-heading">2. The Witness Cooperation Crisis</h3>
        <p>
          Perhaps the single biggest factor is the erosion of witness cooperation. In communities
          with high homicide rates — overwhelmingly poor, predominantly Black neighborhoods — the
          &quot;stop snitching&quot; culture reflects a rational calculation: witnesses who cooperate
          with police face real risks of retaliation, and many have experienced police misconduct
          that destroys trust.
        </p>
        <p>
          Research by criminologist David Kennedy found that in high-violence communities, witnesses
          are aware of 70-80% of shootings but cooperate with police in fewer than 20% of cases. The
          result is a devastating cycle: low clearance rates mean killers face little consequence,
          which emboldens further violence, which further erodes community trust.
        </p>

        <h3 className="font-heading">3. Caseload and Resource Constraints</h3>
        <p>
          The FBI recommends that homicide detectives carry no more than 4-5 active cases
          simultaneously. In many major cities, detectives carry 10-15 or more. High caseloads
          mean less time per investigation, more missed leads, and more cases that go cold within
          the critical first 48-72 hours.
        </p>
        <p>
          The{' '}
          <Link href="/analysis/police-staffing-crisis" className="text-[#1e3a5f] hover:underline">
            police staffing crisis
          </Link>{' '}
          has worsened this problem significantly. As departments lose experienced detectives to
          retirement and struggle to recruit replacements, institutional knowledge disappears and
          caseloads balloon further.
        </p>

        <h3 className="font-heading">4. Gun Violence Is Harder to Solve</h3>
        <p>
          Firearms are used in roughly 77% of US murders. Gun homicides are significantly harder to
          solve than killings by other means because they can be committed at distance, leave fewer
          forensic traces linking specific suspects, and often occur in drive-by or ambush scenarios
          with limited witnesses. As the share of gun murders has increased over time, the overall
          clearance rate has declined.
        </p>

        <h3 className="font-heading">5. Forensic Limitations</h3>
        <p>
          Despite popular perception driven by shows like CSI, forensic evidence plays a role in
          only a minority of murder investigations. DNA evidence is available in perhaps 10-15% of
          cases. Ballistic matching, while improving, cannot identify a specific shooter. Many
          shooting scenes in urban environments yield little usable physical evidence.
        </p>

        <h2 className="font-heading">The Geography of Unsolved Murder</h2>
        <p>
          Clearance rates vary enormously by city. Some jurisdictions maintain rates above 70%, while
          others — particularly cities with high homicide volumes — struggle to clear even 30-40% of
          cases. The worst performers tend to share common characteristics: high murder counts,
          understaffed detective units, and deep community distrust of police.
        </p>
        <p>
          Cities like Chicago, Baltimore, and Detroit have historically had among the lowest clearance
          rates for major cities. Baltimore&apos;s clearance rate dropped below 30% in several recent
          years. Chicago, which sees 500-800 murders annually, has struggled with clearance rates in
          the 40-50% range.
        </p>
        <p>
          For data on the most violent cities, see our{' '}
          <Link href="/most-dangerous-cities" className="text-[#1e3a5f] hover:underline">
            most dangerous cities
          </Link>{' '}
          ranking and{' '}
          <Link href="/analysis/murder-map" className="text-[#1e3a5f] hover:underline">
            murder map analysis
          </Link>.
        </p>

        <h2 className="font-heading">Racial Disparities in Case Resolution</h2>
        <p>
          One of the most troubling aspects of the unsolved murder epidemic is its racial dimension.
          Multiple studies have found that homicide cases with Black victims are significantly less
          likely to be solved than cases with White victims.
        </p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-xl p-5 my-6">
        <h3 className="font-semibold text-red-800 mb-3">The Racial Clearance Gap</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="text-red-600 font-bold mt-0.5">→</span>
            <span>
              A Washington Post analysis found that cases with Black victims are about 30% less
              likely to be solved than cases with White victims nationally.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-600 font-bold mt-0.5">→</span>
            <span>
              In some cities, the gap is even larger. In Chicago, cases with Black male victims
              have historically had clearance rates below 25%.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-600 font-bold mt-0.5">→</span>
            <span>
              The gap persists after controlling for case characteristics like weapon type and
              location, suggesting systemic factors in investigative resource allocation.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-600 font-bold mt-0.5">→</span>
            <span>
              Given that Black Americans are disproportionately murder victims (see our{' '}
              <Link href="/analysis/racial-disparities" className="text-[#1e3a5f] hover:underline">
                racial disparities analysis
              </Link>
              ), the clearance gap means the communities most affected by violence receive the
              least justice.
            </span>
          </li>
        </ul>
      </div>

      <div className="prose prose-lg max-w-none">
        <p>
          The reasons for the racial clearance gap are multiple: cases in predominantly Black
          neighborhoods often involve street shootings that are harder to solve, witness cooperation
          is lower in communities with adversarial police relationships, and historically, some
          departments have allocated fewer detective resources to cases in minority communities.
        </p>
        <p>
          This disparity creates a devastating feedback loop. When killers in Black communities face
          little chance of arrest, it signals that violence will go unpunished, encouraging more
          violence. Community members see that police don&apos;t solve murders in their neighborhood,
          further eroding trust and cooperation. The cycle perpetuates itself.
        </p>

        <h2 className="font-heading">The Cold Case Mountain</h2>
        <p>
          Every unsolved murder becomes a cold case — and the backlog is enormous. The Murder
          Accountability Project, a nonprofit that tracks unsolved homicides, estimates that there
          are more than 250,000 unsolved murders in the United States since 2000 alone. Going back
          further, the cumulative total may exceed 500,000 unsolved cases since 1980.
        </p>
        <p>
          Major cities carry staggering cold case loads:
        </p>
        <ul>
          <li>
            <strong>Los Angeles:</strong> Estimated 10,000+ unsolved homicides in its cold case
            files
          </li>
          <li>
            <strong>Chicago:</strong> An estimated 15,000+ unsolved murders since the 1960s
          </li>
          <li>
            <strong>Detroit:</strong> Thousands of unsolved cases dating back decades
          </li>
          <li>
            <strong>Philadelphia:</strong> More than 5,000 estimated unsolved homicides
          </li>
          <li>
            <strong>Baltimore:</strong> Approximately 3,000+ unsolved murders since 2000
          </li>
        </ul>
        <p>
          Most cold case units are severely understaffed. A typical cold case squad might have 3-5
          detectives responsible for thousands of cases. They can realistically review only a handful
          per year, prioritizing cases where new evidence emerges or forensic technology advances
          offer a breakthrough.
        </p>

        <h2 className="font-heading">DNA and Technology: Promise and Limitations</h2>
        <p>
          Advances in forensic technology — particularly DNA analysis and genetic genealogy — have
          generated significant breakthroughs in cold cases. The 2018 arrest of the Golden State
          Killer through genetic genealogy databases demonstrated the power of combining DNA evidence
          with consumer ancestry databases.
        </p>
        <p>
          However, technology is not a silver bullet:
        </p>
        <ul>
          <li>
            <strong>DNA availability:</strong> Usable DNA evidence exists in only 10-15% of
            homicide cases. Street shootings, which constitute the bulk of unsolved murders, rarely
            yield DNA from the perpetrator.
          </li>
          <li>
            <strong>Testing backlogs:</strong> Many jurisdictions have enormous backlogs of untested
            evidence kits. Some cities have thousands of rape kits alone that have never been
            processed.
          </li>
          <li>
            <strong>Genetic genealogy limitations:</strong> The technique requires high-quality DNA
            and works best when the perpetrator has relatives in consumer DNA databases. It is
            resource-intensive, taking weeks to months per case.
          </li>
          <li>
            <strong>ShotSpotter and surveillance:</strong> Technologies like gunshot detection
            systems and surveillance cameras help with evidence collection but have limited impact
            on overall clearance rates. Studies of ShotSpotter in major cities show minimal
            improvement in case resolution.
          </li>
          <li>
            <strong>Social media intelligence:</strong> Monitoring social media can generate leads
            in gang-related cases, but raises significant civil liberties concerns and has
            inconsistent results.
          </li>
        </ul>
        <p>
          The fundamental truth is that most murders are solved through witness testimony, not
          forensic evidence. Until the witness cooperation problem is addressed, technology alone
          will not dramatically improve clearance rates.
        </p>

        <h2 className="font-heading">The Human Cost</h2>
        <p>
          Behind every unsolved murder is a family without answers. The psychological toll on
          survivors of homicide victims whose cases remain open is enormous: prolonged grief,
          inability to achieve closure, and the knowledge that the person who killed their loved one
          faces no consequences.
        </p>
        <p>
          Research on &quot;co-victims&quot; — the family and friends of homicide victims — shows
          elevated rates of PTSD, depression, substance abuse, and health problems. When cases go
          unsolved, these effects are amplified. Families describe a sense of being forgotten by the
          justice system, particularly in communities where unsolved murders are the norm rather than
          the exception.
        </p>
        <p>
          The economic cost is also substantial. Each unsolved murder represents a failed
          investigation that may have cost $100,000-$500,000 in police resources. The downstream
          costs — continued violence by unpunished perpetrators, community health impacts, reduced
          property values, economic disinvestment — are incalculable.
        </p>

        <h2 className="font-heading">What Would Fix This?</h2>
        <p>
          Criminologists and police reform advocates have proposed several evidence-based strategies
          to improve murder clearance rates:
        </p>
        <ol>
          <li>
            <strong>Reduce detective caseloads.</strong> The single most effective intervention may
            be simply hiring more homicide detectives. Research consistently shows that clearance
            rates improve when detectives have manageable caseloads.
          </li>
          <li>
            <strong>Invest in witness protection and cooperation.</strong> Robust witness protection
            programs, community-based violence intervention (CVI) programs, and restorative justice
            practices can rebuild trust and improve cooperation.
          </li>
          <li>
            <strong>Community-based violence intervention.</strong> Programs like CURE Violence
            (now Health Alliance for Violence Intervention) use credible messengers from
            communities to mediate conflicts, reduce retaliation, and encourage cooperation with
            investigations.
          </li>
          <li>
            <strong>Process forensic evidence faster.</strong> Eliminating testing backlogs and
            ensuring all homicide evidence is processed within 30 days would improve both current
            investigations and cold case reviews.
          </li>
          <li>
            <strong>Rebuild police-community trust.</strong> Addressing police misconduct,
            implementing accountability measures, and engaging in genuine community policing can
            slowly repair the relationships needed for witness cooperation.
          </li>
          <li>
            <strong>Federal cold case funding.</strong> Dedicated federal grants for cold case units
            could address the staffing shortage. The Emmett Till Unsolved Civil Rights Crimes Act
            was a model, but broader funding is needed.
          </li>
        </ol>
        <p>
          The unsolved murder epidemic is not inevitable. Other countries maintain clearance rates
          above 80-90%. Japan clears over 95% of homicides. The UK maintains rates around 85%.
          What these countries share is not superior technology but better investigative resources,
          stronger community relationships, and lower murder volumes that allow thorough
          investigation of each case.
        </p>
        <p>
          For the United States, solving this problem requires both reducing the volume of murders
          (which has been happening — see our{' '}
          <Link href="/murder-rate" className="text-[#1e3a5f] hover:underline">
            murder rate data
          </Link>
          ) and improving the capacity and effectiveness of investigations. The{' '}
          <Link href="/arrest-efficiency" className="text-[#1e3a5f] hover:underline">
            arrest efficiency
          </Link>{' '}
          of American policing must improve dramatically to close the justice gap.
        </p>

        <h2 className="font-heading">The Bottom Line</h2>
        <p>
          America has a murder accountability crisis. When half of all killers face no arrest, the
          justice system fails in its most fundamental obligation. The victims are disproportionately
          Black, poor, and young. The unsolved cases number in the hundreds of thousands. The cold
          case backlog grows every year.
        </p>
        <p>
          This is not a problem that can be solved by technology alone, policing alone, or community
          programs alone. It requires a comprehensive approach: more detectives, better community
          relationships, faster forensic processing, and a recognition that every unsolved murder
          represents not just a failed investigation but a failure of the social contract.
        </p>

        <h2 className="font-heading">Frequently Asked Questions</h2>
        <h3>What percentage of murders go unsolved in the US?</h3>
        <p>
          Approximately 50% of murders in the US currently go unsolved, meaning no arrest is made.
          This is down from a clearance rate of over 90% in the 1960s. In some major cities, the
          unsolved rate exceeds 60-70%.
        </p>
        <h3>How many total unsolved murders are there in America?</h3>
        <p>
          An estimated 250,000+ murders have gone unsolved since 2000. Including cases going back to
          1980, the cumulative total may exceed 500,000 unsolved homicides in the United States.
        </p>
        <h3>Why are so many murders unsolved?</h3>
        <p>
          Key factors include the shift from domestic/acquaintance murders to stranger/gang violence,
          witness non-cooperation (especially in high-crime communities), detective caseload overload,
          the difficulty of solving gun homicides, and eroded police-community trust.
        </p>
        <h3>Are Black victims&apos; murder cases less likely to be solved?</h3>
        <p>
          Yes. Multiple studies show that cases with Black victims are roughly 30% less likely to
          result in an arrest than cases with White victims. This disparity reflects resource
          allocation, community trust issues, and the nature of violence in segregated neighborhoods.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link
          href="/analysis/clearance-rates"
          className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition"
        >
          Clearance Rates
        </Link>
        <Link
          href="/murder-rate"
          className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Murder Rate Data
        </Link>
        <Link
          href="/most-dangerous-cities"
          className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Most Dangerous Cities
        </Link>
        <Link
          href="/arrest-efficiency"
          className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Arrest Efficiency
        </Link>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="unsolved-murders" />
        <ShareButtons title="Unsolved Murders in America: The Epidemic of Cases That Never Close" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Unsolved Murders in America: The Epidemic of Cases That Never Close',
            description:
              'Murder clearance rates dropped from 90%+ in the 1960s to roughly 50% today. Analysis of the unsolved homicide crisis.',
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
                name: 'What percentage of murders go unsolved in the US?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Approximately 50% of murders currently go unsolved. This is down from a 90%+ clearance rate in the 1960s.',
                },
              },
              {
                '@type': 'Question',
                name: 'How many total unsolved murders are there in America?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'An estimated 250,000+ murders have gone unsolved since 2000. The cumulative total since 1980 may exceed 500,000.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why are so many murders unsolved?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Key factors include the shift to stranger/gang violence, witness non-cooperation, detective caseload overload, and eroded police-community trust.',
                },
              },
              {
                '@type': 'Question',
                name: "Are Black victims' murder cases less likely to be solved?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Cases with Black victims are roughly 30% less likely to result in an arrest than cases with White victims.',
                },
              },
            ],
          }),
        }}
      />

      <p className="text-sm text-gray-500 mt-8">
        Sources: FBI Uniform Crime Reporting, Murder Accountability Project, Bureau of Justice
        Statistics.
      </p>
    </div>
  );
}
