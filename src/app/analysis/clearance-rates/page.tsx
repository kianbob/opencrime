import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import { loadData, fmtNum } from '@/lib/utils';
import type { NationalTrend } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Crime Clearance Rates — How Many Crimes Actually Get Solved?',
  description: 'Only ~50% of violent crimes and ~15% of property crimes are "cleared" by police. Murder clearance has dropped from 90%+ in the 1960s to ~50% today. Full analysis.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/clearance-rates' },
  openGraph: {
    url: 'https://www.opencrime.us/analysis/clearance-rates',
    title: 'Crime Clearance Rates — How Many Crimes Get Solved?',
    description: 'Murder clearance has dropped from 90% to ~50%. Only 15% of property crimes are cleared. Inside policing\'s accountability gap.',
  },
};

export default function ClearanceRatesPage() {
  const national = loadData<NationalTrend[]>('national-trends.json');
  const n = national[national.length - 1];

  const insights = [
    'Only about 50% of violent crimes in the US are "cleared" — meaning an arrest is made or the case is exceptionally cleared',
    'Murder clearance rates have dropped from over 90% in the 1960s to approximately 50% today',
    'Property crime clearance is far worse: only ~15% of burglaries, larcenies, and auto thefts are cleared',
    '"Cleared" doesn\'t mean convicted — it means an arrest was made OR the case was closed for prosecutorial reasons',
    'Large cities tend to have lower clearance rates than small departments, partly due to caseload volume',
    'Thousands of homicides go unsolved every year, eroding community trust and enabling future violence',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Crime Clearance Rates' }]} />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Crime Clearance Rates: How Many Crimes Actually Get Solved?</h1>
      <p className="text-lg text-gray-600 mb-6">
        Americans assume that when a crime is reported, police investigate and catch the perpetrator. The reality is
        far different. For most crimes, no one is ever arrested. And even for murder — the crime that receives the
        most investigative attention — the odds of getting away with it are now close to a coin flip.
      </p>

      <ShareButtons title="Crime Clearance Rates — How Many Get Solved?" />

      <AIOverview insights={insights} />

      {/* Hero Stats */}
      <div className="bg-[#1e3a5f] text-white rounded-xl p-8 mb-8">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold text-red-400">~50%</div>
            <div className="text-blue-200 text-sm">Violent Crime Cleared</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-red-400">~50%</div>
            <div className="text-blue-200 text-sm">Murder Clearance Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-red-400">~30%</div>
            <div className="text-blue-200 text-sm">Rape Clearance Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-red-400">~15%</div>
            <div className="text-blue-200 text-sm">Property Crime Cleared</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">What Does &quot;Cleared&quot; Mean?</h2>
        <p>
          Before diving into the numbers, it&apos;s important to understand what the FBI means by &quot;cleared.&quot; A crime is
          considered cleared in two ways:
        </p>
        <ol>
          <li><strong>Cleared by arrest:</strong> At least one person is arrested, charged, and turned over to the court for prosecution. This is the most common type — but an arrest doesn&apos;t mean conviction. Many arrested individuals are never convicted.</li>
          <li><strong>Cleared by exceptional means:</strong> The agency identified the offender, has enough evidence to make an arrest, knows the offender&apos;s location, but cannot make an arrest due to circumstances outside their control. Examples include: the offender died (including suicide), the victim refused to cooperate, extradition was denied, or prosecution was declined.</li>
        </ol>
        <p>
          This means that a &quot;50% clearance rate&quot; for murder does <em>not</em> mean 50% of murders result in conviction.
          The actual conviction rate for reported murders is estimated at 30–35%. For property crime, conviction rates
          are in the single digits.
        </p>

        <h2 className="font-heading">Clearance Rates by Crime Type</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Crime Type</th>
              <th className="text-right px-4 py-2">Approx. Clearance Rate</th>
              <th className="text-right px-4 py-2">Reported Annually</th>
              <th className="text-right px-4 py-2">Est. Unsolved</th>
            </tr>
          </thead>
          <tbody>
            {[
              { crime: 'Murder & Nonnegligent Manslaughter', rate: '~52%', reported: fmtNum(n.homicide), unsolved: fmtNum(Math.round(n.homicide * 0.48)) },
              { crime: 'Aggravated Assault', rate: '~52%', reported: fmtNum(n.aggravatedAssault), unsolved: fmtNum(Math.round(n.aggravatedAssault * 0.48)) },
              { crime: 'Rape', rate: '~30%', reported: fmtNum(n.rape), unsolved: fmtNum(Math.round(n.rape * 0.70)) },
              { crime: 'Robbery', rate: '~30%', reported: fmtNum(n.robbery), unsolved: fmtNum(Math.round(n.robbery * 0.70)) },
              { crime: 'Burglary', rate: '~14%', reported: fmtNum(n.burglary), unsolved: fmtNum(Math.round(n.burglary * 0.86)) },
              { crime: 'Larceny-Theft', rate: '~18%', reported: fmtNum(n.larceny), unsolved: fmtNum(Math.round(n.larceny * 0.82)) },
              { crime: 'Motor Vehicle Theft', rate: '~12%', reported: fmtNum(n.motorVehicleTheft), unsolved: fmtNum(Math.round(n.motorVehicleTheft * 0.88)) },
              { crime: 'Arson', rate: '~20%', reported: '—', unsolved: '—' },
            ].map(r => (
              <tr key={r.crime} className="border-t">
                <td className="px-4 py-2 font-medium">{r.crime}</td>
                <td className="px-4 py-2 text-right font-mono text-red-600 font-semibold">{r.rate}</td>
                <td className="px-4 py-2 text-right font-mono">{r.reported}</td>
                <td className="px-4 py-2 text-right font-mono text-gray-500">{r.unsolved}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-400 p-3">Clearance rates are approximate averages based on recent FBI data. Actual rates vary by year, agency, and jurisdiction.</p>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <p>
          The estimated &quot;unsolved&quot; column is staggering. In a single year, approximately {fmtNum(Math.round(n.homicide * 0.48))} murders
          go unsolved. Over {fmtNum(Math.round(n.rape * 0.70))} rapes result in no arrest. And the vast majority of property
          crime — hundreds of thousands of burglaries, thefts, and car thefts — go completely uninvestigated.
        </p>

        <h2 className="font-heading">The Murder Clearance Crisis: From 90% to 50%</h2>
        <p>
          The decline in murder clearance rates is one of the most troubling trends in American policing:
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Era</th>
              <th className="text-right px-4 py-2">Murder Clearance Rate</th>
              <th className="text-left px-4 py-2">Context</th>
            </tr>
          </thead>
          <tbody>
            {[
              { era: '1960s', rate: '~91-93%', ctx: 'Most murders were between family/acquaintances, easy to solve' },
              { era: '1970s', rate: '~80%', ctx: 'Rise of drug-related and stranger killings' },
              { era: '1980s', rate: '~72%', ctx: 'Crack epidemic, gang violence, urban murder surge' },
              { era: '1990s', rate: '~65%', ctx: 'Crime wave peak; overwhelmed departments' },
              { era: '2000s', rate: '~62%', ctx: 'Gradual decline; forensic advances partially offset by witness intimidation' },
              { era: '2010s', rate: '~60%', ctx: 'Continued decline; DNA backlogs' },
              { era: '2020–2024', rate: '~50-54%', ctx: 'COVID disruption, staffing shortages, community distrust' },
            ].map(r => (
              <tr key={r.era} className="border-t">
                <td className="px-4 py-2 font-medium">{r.era}</td>
                <td className="px-4 py-2 text-right font-mono">{r.rate}</td>
                <td className="px-4 py-2 text-gray-600 text-sm">{r.ctx}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <p>
          What changed? Several factors drove the decline:
        </p>
        <ol>
          <li>
            <strong>The nature of murder changed.</strong> In the 1960s, most murders involved family members or close
            acquaintances — cases where the suspect was obvious. Today, a larger share of murders involve acquaintances
            in drug markets, gang conflicts, and street disputes where witnesses are reluctant to cooperate.
          </li>
          <li>
            <strong>Witness intimidation.</strong> In high-violence communities, cooperating with police can be dangerous.
            The &quot;no snitching&quot; culture is not a preference — it&apos;s often a survival strategy where witnesses fear retaliation.
          </li>
          <li>
            <strong>Community-police distrust.</strong> Decades of aggressive policing, racial profiling, and high-profile
            police killings have eroded trust. When communities don&apos;t trust police, they don&apos;t provide tips, don&apos;t
            identify suspects, and don&apos;t testify.
          </li>
          <li>
            <strong>Staffing and caseloads.</strong> Many homicide units are understaffed. The recommended caseload is
            4–6 active cases per detective; many carry 15+. Overworked detectives cannot give each case adequate attention.
          </li>
          <li>
            <strong>The &quot;CSI effect&quot; irony.</strong> Juries now expect DNA and forensic evidence in every case. But
            the reality is that physical evidence is available in only a minority of cases, and DNA backlogs can
            stretch months or years.
          </li>
        </ol>

        <h2 className="font-heading">City-Level Variation</h2>
        <p>
          Clearance rates vary dramatically by city. Some departments solve 70%+ of murders; others solve less than 30%:
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">City</th>
              <th className="text-right px-4 py-2">Approx. Murder Clearance</th>
              <th className="text-left px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              { city: 'Louisville, KY', rate: '~70%', notes: 'Smaller caseload, community policing focus' },
              { city: 'San Diego, CA', rate: '~68%', notes: 'Dedicated cold case unit, good forensic resources' },
              { city: 'Denver, CO', rate: '~55%', notes: 'Mid-range, typical of mid-size cities' },
              { city: 'Houston, TX', rate: '~48%', notes: 'Large volume, ~350+ murders/year' },
              { city: 'Chicago, IL', rate: '~45%', notes: 'High volume, witness cooperation challenges' },
              { city: 'Baltimore, MD', rate: '~38%', notes: 'Deep community distrust, high volume' },
              { city: 'Detroit, MI', rate: '~35%', notes: 'Resource constraints, high murder rate' },
              { city: 'New Orleans, LA', rate: '~30%', notes: 'Among the lowest; staffing crises' },
            ].map(r => (
              <tr key={r.city} className="border-t">
                <td className="px-4 py-2 font-medium">{r.city}</td>
                <td className="px-4 py-2 text-right font-mono">{r.rate}</td>
                <td className="px-4 py-2 text-gray-600 text-sm">{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-400 p-3">Approximate rates from recent years. Exact figures vary annually. Sources: FBI UCR, city police reports, Murder Accountability Project.</p>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <p>
          The <Link href="/most-dangerous-cities" className="text-[#1e3a5f] underline">most dangerous cities</Link> tend
          to also have the lowest clearance rates — creating a vicious cycle. Low clearance rates reduce deterrence,
          encouraging more violence. More violence overwhelms investigators, further reducing clearance rates.
        </p>

        <h2 className="font-heading">Property Crime: The Uninvestigated Majority</h2>
        <p>
          While low murder clearance rates get attention, the property crime picture is even bleaker. With clearance
          rates of 12–18%, the vast majority of property crimes are never investigated at all:
        </p>
        <ul>
          <li><strong>Burglary (~14% clearance):</strong> Most burglaries receive a report number and nothing else. Unless there is video evidence or a serial pattern, investigation is rare.</li>
          <li><strong>Larceny-theft (~18%):</strong> Shoplifting, package theft, and petty theft are essentially risk-free crimes in most jurisdictions.</li>
          <li><strong>Motor vehicle theft (~12%):</strong> Despite the <Link href="/analysis/car-theft-crisis" className="text-[#1e3a5f] underline">surge in car theft</Link>, recovery rates are moderate (~60%) but arrest rates are abysmal. Most stolen cars are recovered abandoned; the thief is rarely identified.</li>
        </ul>
        <p>
          This matters beyond the individual victim. When people learn that reporting crime is futile — that nothing
          will happen — they stop reporting. This creates a spiral of underreporting that makes official crime statistics
          increasingly disconnected from reality.
        </p>

        <h2 className="font-heading">The Rape Clearance Crisis</h2>
        <p>
          Sexual assault clearance rates deserve special attention. At approximately 30%, the rape clearance rate is
          the lowest of any violent crime except robbery. But the true picture is worse:
        </p>
        <ul>
          <li>Only about 25% of rapes are reported to police in the first place (NCVS data)</li>
          <li>Of those reported, ~30% are cleared</li>
          <li>Of those cleared, not all result in conviction</li>
          <li>Net result: an estimated <strong>5–7%</strong> of rapes result in any criminal conviction</li>
        </ul>
        <p>
          Rape kit backlogs remain a persistent problem. As of recent audits, hundreds of thousands of rape kits sit
          untested in police evidence rooms. When jurisdictions have committed to testing backlogs (e.g., Detroit&apos;s
          initiative testing 11,000+ kits), they consistently identify serial offenders — rapists who went on to
          commit additional assaults while their first victim&apos;s evidence sat untouched.
        </p>

        <h2 className="font-heading">What &quot;Exceptionally Cleared&quot; Hides</h2>
        <p>
          The &quot;exceptional clearance&quot; category deserves scrutiny. Some departments have been found to abuse this
          classification to inflate their numbers:
        </p>
        <ul>
          <li>Classifying cases as &quot;exceptionally cleared&quot; when the suspect died, even if the identification was uncertain</li>
          <li>Clearing cases when the victim refused to cooperate — which can mean the victim was intimidated or felt the case was hopeless</li>
          <li>Clearing cold cases based on DNA matches to deceased individuals without thorough investigation</li>
        </ul>
        <p>
          ProPublica and other investigative outlets have found significant irregularities in how some departments
          classify clearances. The Murder Accountability Project has documented that some cities&apos; clearance rates
          include a high proportion of exceptional clearances, which inflates the apparent solve rate.
        </p>

        <h2 className="font-heading">The <Link href="/arrest-efficiency" className="text-[#1e3a5f] underline">Arrest Efficiency</Link> Connection</h2>
        <p>
          Our arrest efficiency analysis examines the ratio of arrests to reported crimes. For violent crime,
          the picture aligns with clearance data: roughly one arrest for every two violent crimes. But this analysis
          also reveals that while arrests for drug offenses remain high (police actively seek these out), arrests
          for property crime are remarkably low relative to the volume of offenses.
        </p>
        <p>
          This suggests a fundamental resource allocation question: Are police departments spending too much time on
          drug enforcement and not enough on investigating crimes with actual victims?
        </p>

        <h2 className="font-heading">Improving Clearance Rates: What Works</h2>
        <p>
          Some jurisdictions have successfully improved clearance rates through specific strategies:
        </p>
        <ol>
          <li><strong>Rapid response:</strong> Departments that assign homicide detectives within the first hour have significantly higher clearance rates. The first 48 hours are critical.</li>
          <li><strong>Witness protection:</strong> Formal and informal witness protection programs increase cooperation. The cost is a fraction of the cost of unsolved murders.</li>
          <li><strong>Technology:</strong> ShotSpotter/gunshot detection, real-time camera networks, and improved forensic tools help — but are no substitute for human detective work.</li>
          <li><strong>Community trust:</strong> Departments that invest in community policing, reduce use-of-force incidents, and practice procedural justice see better cooperation rates.</li>
          <li><strong>Caseload management:</strong> Keeping detective caseloads at recommended levels (4-6 active cases) is the single most impactful staffing decision.</li>
          <li><strong>Cold case units:</strong> Dedicated units can solve cases that were initially unworkable, especially with new DNA technology.</li>
        </ol>

        <h2 className="font-heading">The Bottom Line</h2>
        <p>
          The crime data on this site — <Link href="/violent-crime" className="text-[#1e3a5f] underline">violent crime rates</Link>,
          {' '}<Link href="/rankings" className="text-[#1e3a5f] underline">city rankings</Link>,
          {' '}<Link href="/most-dangerous-cities" className="text-[#1e3a5f] underline">most dangerous cities</Link> — shows
          how much crime occurs. Clearance rates show how much crime is actually addressed. The gap is enormous.
        </p>
        <p>
          When half of murders, 70% of rapes, and 85% of property crimes go unsolved, the criminal justice system
          is not functioning as most Americans assume. This has profound implications for deterrence, community trust,
          and the legitimacy of the entire system. Improving clearance rates — not just arrest numbers — should be
          a central metric for police accountability.
        </p>

        <h2 className="font-heading">Related Pages</h2>
        <ul>
          <li><Link href="/arrest-efficiency">Arrest Efficiency — How Effective Is Policing?</Link></li>
          <li><Link href="/most-dangerous-cities">Most Dangerous Cities in America</Link></li>
          <li><Link href="/rankings">City Crime Rankings</Link></li>
          <li><Link href="/violent-crime">Violent Crime Statistics 2024</Link></li>
          <li><Link href="/analysis/homicide-in-america">Homicide in America</Link></li>
          <li><Link href="/analysis/defund-police">Did &quot;Defund the Police&quot; Cause a Crime Surge?</Link></li>
        </ul>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        Sources: FBI Uniform Crime Reports; FBI Crime Data Explorer; Bureau of Justice Statistics; Murder Accountability Project;
        National Crime Victimization Survey (NCVS); ProPublica investigative reporting.
      </p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Crime Clearance Rates: How Many Crimes Actually Get Solved?',
        description: 'Analysis of US crime clearance rates. Only ~50% of violent crimes and ~15% of property crimes are cleared. Murder clearance has dropped from 90% to 50%.',
        url: 'https://www.opencrime.us/analysis/clearance-rates',
        author: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        datePublished: '2025-03-01',
        dateModified: '2025-03-01',
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What percentage of crimes are solved in the US?', acceptedAnswer: { '@type': 'Answer', text: 'Approximately 50% of violent crimes are cleared (arrest made or exceptionally cleared). For property crime, only about 15% are cleared. The overall clearance rate across all crimes is roughly 40%.' }},
          { '@type': 'Question', name: 'What is the murder clearance rate?', acceptedAnswer: { '@type': 'Answer', text: 'The US murder clearance rate is approximately 50-54%, down from over 90% in the 1960s. This means roughly half of all murders go unsolved. The decline reflects changes in the nature of homicide, witness intimidation, and community-police distrust.' }},
          { '@type': 'Question', name: 'What does "cleared" mean in crime statistics?', acceptedAnswer: { '@type': 'Answer', text: 'A crime is "cleared" when at least one person is arrested and charged, OR when the case is "exceptionally cleared" — meaning the suspect was identified but couldn\'t be arrested (e.g., suspect died, victim refused to cooperate). Clearance does NOT mean conviction.' }},
          { '@type': 'Question', name: 'Which cities have the worst murder clearance rates?', acceptedAnswer: { '@type': 'Answer', text: 'Cities like New Orleans (~30%), Detroit (~35%), and Baltimore (~38%) have among the lowest murder clearance rates. High-violence cities tend to have lower clearance rates due to high caseloads, witness intimidation, and community distrust.' }},
        ],
      })}} />
    </div>
  );
}
