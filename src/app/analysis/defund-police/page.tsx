import RelatedAnalysis from '@/components/RelatedAnalysis';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import AIOverview from '@/components/AIOverview';

export const metadata: Metadata = {
  title: 'Did "Defund the Police" Cause a Crime Surge? What the Data Shows',
  description: 'Examining the claim that defunding police caused crime increases. FBI data on police staffing, budgets, and crime rates 2019-2024.',
  openGraph: { title: 'Did Defund the Police Cause Crime Surges?', description: 'What actually happened to police budgets and crime rates after 2020.' },
  alternates: { canonical: 'https://www.opencrime.us/analysis/defund-police' },
};

export default function DefundPolicePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "Did defunding police cause the 2020 crime surge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The data suggests the 2020 crime spike was primarily driven by COVID-era disruptions rather than police budget changes, which were mostly small and quickly reversed. Cities that didn't cut budgets saw similar crime increases."
      }
    }, {
      "@type": "Question", 
      "name": "How many cities actually defunded their police?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Very few cities meaningfully cut police budgets. Most notable cuts were in Austin, Minneapolis, Los Angeles, and Portland, but most were reversed by 2022. By 2023, most major cities were spending more on police than before 2020."
      }
    }, {
      "@type": "Question",
      "name": "What caused the staffing crisis in police departments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Police recruitment dropped 50-70% in many cities due to declining morale, early retirements, and officers transferring to suburban departments. This staffing crisis was arguably more impactful than budget changes."
      }
    }, {
      "@type": "Question",
      "name": "Has violent crime returned to pre-2020 levels?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, by 2023-2024 violent crime dropped back to near pre-2020 levels. Homicides fell roughly 12-15% in 2023 and continued declining in 2024, despite police staffing remaining well below pre-2020 levels."
      }
    }]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article", 
    "headline": "Did \"Defund the Police\" Cause a Crime Surge? What the Data Shows",
    "author": { "@type": "Organization", "name": "OpenCrime" },
    "publisher": { "@type": "Organization", "name": "OpenCrime" },
    "datePublished": "2026-03-04",
    "dateModified": "2026-03-04",
    "mainEntityOfPage": "https://www.opencrime.us/analysis/defund-police",
    "image": "https://www.opencrime.us/og-image.png"
  };

  const aiInsights = [
    "Most cities did not meaningfully cut police budgets despite 'defund' rhetoric - cuts were small and quickly reversed",
    "The 2020 murder spike began during COVID lockdowns and affected cities regardless of their police budget decisions", 
    "Police staffing collapsed nationwide due to recruitment crisis and early retirements, more than budget cuts",
    "Cities without any 'defund' movement saw similar crime increases, suggesting other causes were primary",
    "By 2023 most major cities spend more on police than before 2020, yet crime has largely returned to pre-pandemic levels"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Defund the Police' }]} />
      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">ANALYSIS</span>
      
      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">Did &quot;Defund the Police&quot; Cause a Crime Surge? What the Data Shows</h1>
      <p className="text-lg text-gray-600 mb-8">
        After the 2020 protests, "defund the police" became the most polarizing phrase in 
        criminal justice. We examine what actually happened to police budgets and crime rates.
      </p>

      <AIOverview insights={aiInsights} />

      <div className="bg-gray-100 border rounded-xl p-4 mb-8 text-sm text-gray-600">
        <strong>Approach:</strong> This article examines what actually happened to police budgets and crime rates, not what should have happened. We present data from both sides.
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600">
          After the 2020 protests, &quot;defund the police&quot; became the most polarizing phrase in 
          criminal justice. Some cities cut police budgets. Crime spiked. But did one cause the other?
        </p>

        <h2 className="font-heading">What Actually Happened to Police Budgets</h2>
        <p>
          Despite the rhetoric, <strong>most cities did not meaningfully cut police budgets</strong>. 
          A few notable exceptions:
        </p>
        <ul>
          <li><strong>Austin, TX:</strong> Cut $150M (roughly one-third) from APD in 2020. Reversed most cuts by 2022.</li>
          <li><strong>Minneapolis, MN:</strong> Proposed replacing the police department. Voters rejected it in 2021. Budget was ultimately increased.</li>
          <li><strong>Los Angeles, CA:</strong> Cut $150M from LAPD in 2020. Restored and increased funding by 2022.</li>
          <li><strong>New York City:</strong> Shifted $1B from NYPD. Most were accounting changes (moving school safety to education department), not actual service reductions.</li>
          <li><strong>Portland, OR:</strong> Cut $15M and disbanded gun violence reduction team. Saw significant violent crime increases.</li>
        </ul>
        <p>
          The pattern: initial cuts, often modest, followed by rapid reversal as crime rose and public 
          sentiment shifted. By 2023, most major cities were spending more on police than before 2020.
        </p>

        <h2 className="font-heading">The 2020-2021 Crime Spike</h2>
        <p>
          Violent crime did increase sharply in 2020, with homicides rising roughly 30% — the 
          largest single-year increase on record. But the timeline complicates the narrative:
        </p>
        <ul>
          <li>The murder increase began in <strong>late May/June 2020</strong> — contemporaneous with protests but also with COVID lockdowns, economic disruption, and social upheaval</li>
          <li>Cities that <strong>did not cut</strong> police budgets saw similar crime increases to those that did</li>
          <li>Crime increased in <strong>rural areas and small towns</strong> that had no &quot;defund&quot; movement at all</li>
          <li>Other countries experienced <strong>similar crime spikes</strong> during COVID, without any defund movement</li>
        </ul>

        <h2 className="font-heading">The Staffing Crisis</h2>
        <p>
          What did change dramatically was police staffing. Departments nationwide faced:
        </p>
        <ul>
          <li><strong>Recruitment collapse:</strong> Applications to police academies dropped 50-70% in many cities</li>
          <li><strong>Retention crisis:</strong> Officers retired early or transferred to suburban departments at unprecedented rates</li>
          <li><strong>Morale decline:</strong> Surveys showed record-low morale and record-high rates of officers discouraging their children from entering policing</li>
        </ul>
        <p>
          This staffing crisis is arguably more significant than budget changes. Even cities that 
          increased police budgets couldn&apos;t fill positions. Many departments are still operating 
          15-25% below authorized strength as of 2024.
        </p>

        <h2 className="font-heading">What the Research Says</h2>
        <p>
          Academic research on the 2020 crime spike has identified multiple contributing factors:
        </p>
        <ul>
          <li><strong>COVID disruption:</strong> Closed courts, released prisoners, reduced social services, economic stress</li>
          <li><strong>Gun purchases:</strong> Record-breaking firearm sales in 2020 (21M background checks) put more guns in circulation</li>
          <li><strong>De-policing:</strong> Officers reduced proactive enforcement (traffic stops, field interviews) even without budget cuts — the &quot;Ferguson effect&quot; at scale</li>
          <li><strong>Social upheaval:</strong> Loss of community structure, school closures, mental health crisis</li>
        </ul>

        <h2 className="font-heading">Timeline: The Rise and Fall of "Defund the Police"</h2>
        
        <div className="bg-gray-50 border-l-4 border-blue-500 p-6 mb-8">
          <h3 className="font-semibold mb-4 text-blue-800">Key Moments in the Defund Movement</h3>
          <div className="space-y-4 text-sm">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="font-medium text-blue-700">May 25, 2020</div>
              <div className="md:col-span-3">George Floyd killed by Minneapolis police officer Derek Chauvin</div>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="font-medium text-blue-700">June 7, 2020</div>
              <div className="md:col-span-3">Minneapolis City Council announces intent to "dismantle" police department</div>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="font-medium text-blue-700">June 2020</div>
              <div className="md:col-span-3">Austin cuts APD budget by $150M; Portland cuts $15M and disbands gun violence team</div>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="font-medium text-blue-700">July 2020</div>
              <div className="md:col-span-3">NYC shifts $1B from NYPD (mostly accounting moves, not service cuts)</div>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="font-medium text-blue-700">August 2020</div>
              <div className="md:col-span-3">Los Angeles approves $150M LAPD budget cut</div>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="font-medium text-blue-700">November 2021</div>
              <div className="md:col-span-3">Minneapolis voters reject police department replacement ballot measure 56-44%</div>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="font-medium text-blue-700">2022-2023</div>
              <div className="md:col-span-3">Most cities reverse cuts; Austin restores $200M, LA increases LAPD budget above 2020 levels</div>
            </div>
          </div>
        </div>

        <h2 className="font-heading">City-by-City Analysis: What Actually Happened</h2>
        
        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Minneapolis: The Epicenter</h3>
        <p>
          Minneapolis became the symbol of defund efforts after city council members' dramatic June 2020 
          pledge to "dismantle" the police department. But the reality was more complex:
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">What Was Proposed</h4>
            <ul className="text-sm space-y-2">
              <li>• Replace police with "public safety" department</li>
              <li>• Reduce sworn officer positions</li>
              <li>• Shift to social workers, mental health professionals</li>
              <li>• Community-led safety initiatives</li>
              <li>• Requires ballot measure for implementation</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">What Actually Happened</h4>
            <ul className="text-sm space-y-2">
              <li>• Ballot measure failed 56-44% in November 2021</li>
              <li>• Police budget ultimately increased</li>
              <li>• Department added social workers but kept police structure</li>
              <li>• 2024 budget: $195M (up from $178M in 2020)</li>
              <li>• Still struggling with staffing shortages</li>
            </ul>
          </div>
        </div>
        <p>
          <strong>Crime Impact:</strong> Minneapolis saw homicides rise from 48 in 2019 to 97 in 2021, then fall to 80 in 2022 and 66 in 2023. The increase began immediately after Floyd's death but preceded any actual budget changes. The recent decline coincides with renewed focus on violence reduction, not defunding.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Austin: The Biggest Actual Cut</h3>
        <p>
          Austin made the most substantial cuts to police funding, slashing $150 million from the Austin Police Department budget in 2020.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                <th className="border border-gray-300 px-4 py-2 text-left">APD Budget</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Change</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Homicides</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Violent Crime Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2020</td>
                <td className="border border-gray-300 px-4 py-2">$434M</td>
                <td className="border border-gray-300 px-4 py-2">—</td>
                <td className="border border-gray-300 px-4 py-2">48</td>
                <td className="border border-gray-300 px-4 py-2">358.7 per 100K</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2021</td>
                <td className="border border-gray-300 px-4 py-2">$290M</td>
                <td className="border border-gray-300 px-4 py-2">-$144M (-33%)</td>
                <td className="border border-gray-300 px-4 py-2">88</td>
                <td className="border border-gray-300 px-4 py-2">447.2 per 100K</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2022</td>
                <td className="border border-gray-300 px-4 py-2">$355M</td>
                <td className="border border-gray-300 px-4 py-2">+$65M (+22%)</td>
                <td className="border border-gray-300 px-4 py-2">94</td>
                <td className="border border-gray-300 px-4 py-2">456.8 per 100K</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2023</td>
                <td className="border border-gray-300 px-4 py-2">$442M</td>
                <td className="border border-gray-300 px-4 py-2">+$87M (+25%)</td>
                <td className="border border-gray-300 px-4 py-2">71</td>
                <td className="border border-gray-300 px-4 py-2">389.1 per 100K</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2024</td>
                <td className="border border-gray-300 px-4 py-2">$512M</td>
                <td className="border border-gray-300 px-4 py-2">+$70M (+16%)</td>
                <td className="border border-gray-300 px-4 py-2">52</td>
                <td className="border border-gray-300 px-4 py-2">341.5 per 100K</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>What the cuts included:</strong> Austin moved some functions out of APD (mental health response, some forensics, victim services) to other departments. This represented real service reduction, not just accounting moves.
        </p>
        <p>
          <strong>The reversal:</strong> After homicides nearly doubled, Austin voters elected a pro-police mayor and city council in 2022. The city not only restored the cuts but increased police funding 18% above pre-defund levels by 2024.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Portland: Gun Violence Team Disbanded</h3>
        <p>
          Portland's approach was more targeted but equally controversial: disbanding the Gun Violence Reduction Team (GVRT) and cutting $15M from the police budget.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-yellow-800">The Portland Experiment</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium mb-2">What Was Eliminated:</h5>
              <ul className="space-y-1">
                <li>• 34-officer Gun Violence Reduction Team</li>
                <li>• Transit police</li>
                <li>• School resource officers</li>
                <li>• Some community policing programs</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">What Was Added:</h5>
              <ul className="space-y-1">
                <li>• Portland Street Response (mental health)</li>
                <li>• Community violence intervention programs</li>
                <li>• Youth employment programs</li>
                <li>• Enhanced 911 screening</li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          <strong>Results:</strong> Portland saw a dramatic increase in gun violence. Homicides rose from 36 in 2019 to 96 in 2022. While correlation doesn't prove causation, the timing coincided with elimination of the specialized unit focused on gun violence. The city reconstituted a gun violence team in 2022.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Los Angeles: Accounting Maneuvers</h3>
        <p>
          LA's "$150M cut" was largely symbolic — mostly moving existing programs to other departments rather than eliminating services:
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-blue-800">What Was "Cut"</h4>
            <ul className="text-xs space-y-1">
              <li>• Youth programs → Parks & Rec</li>
              <li>• Some community services → Social Services</li>
              <li>• Traffic enforcement → DOT</li>
              <li>• Records processing → City Clerk</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-green-800">What Remained</h4>
            <ul className="text-xs space-y-1">
              <li>• 9,900+ sworn officers</li>
              <li>• All patrol operations</li>
              <li>• Detective bureaus</li>
              <li>• Specialized units</li>
            </ul>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-gray-800">Net Effect</h4>
            <ul className="text-xs space-y-1">
              <li>• No officers laid off</li>
              <li>• No reduction in police presence</li>
              <li>• Some services moved to other depts</li>
              <li>• Budget restored by 2022</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">New York: The Billion Dollar Shuffle</h3>
        <p>
          NYC's "$1 billion cut" was the most misleading of all major cities. Analysis shows:
        </p>
        <ul>
          <li><strong>$500M:</strong> Moving school safety officers from NYPD to Department of Education</li>
          <li><strong>$300M:</strong> Canceling a new police class (positions never filled anyway due to hiring freezes)</li>
          <li><strong>$200M:</strong> Moving homeless outreach and some social programs to other departments</li>
        </ul>
        <p>
          The result: NYC maintained roughly 36,000 uniformed officers (down slightly from pre-pandemic levels but due to retirements, not budget cuts). Crime initially spiked in 2020-2021 but has since returned to near-historic lows.
        </p>

        <h2 className="font-heading">Comparative Analysis: Cut vs. No-Cut Cities</h2>
        
        <p>
          To test whether budget cuts caused crime increases, we can compare cities that cut police budgets to similar cities that didn't:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">City</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Police Budget Action</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2019 Homicides</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2021 Homicides</th>
                <th className="border border-gray-300 px-4 py-2 text-left">% Change</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-2 font-medium">Austin</td>
                <td className="border border-gray-300 px-4 py-2">Cut 33%</td>
                <td className="border border-gray-300 px-4 py-2">30</td>
                <td className="border border-gray-300 px-4 py-2">88</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">+193%</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-2 font-medium">Portland</td>
                <td className="border border-gray-300 px-4 py-2">Cut $15M, disbanded unit</td>
                <td className="border border-gray-300 px-4 py-2">36</td>
                <td className="border border-gray-300 px-4 py-2">90</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">+150%</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-2 font-medium">Minneapolis</td>
                <td className="border border-gray-300 px-4 py-2">Proposed replacement</td>
                <td className="border border-gray-300 px-4 py-2">48</td>
                <td className="border border-gray-300 px-4 py-2">97</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">+102%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Phoenix</td>
                <td className="border border-gray-300 px-4 py-2">No cuts, increased budget</td>
                <td className="border border-gray-300 px-4 py-2">138</td>
                <td className="border border-gray-300 px-4 py-2">230</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">+67%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">San Antonio</td>
                <td className="border border-gray-300 px-4 py-2">No cuts, increased budget</td>
                <td className="border border-gray-300 px-4 py-2">105</td>
                <td className="border border-gray-300 px-4 py-2">164</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">+56%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Jacksonville</td>
                <td className="border border-gray-300 px-4 py-2">No cuts, increased budget</td>
                <td className="border border-gray-300 px-4 py-2">130</td>
                <td className="border border-gray-300 px-4 py-2">177</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">+36%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Nashville</td>
                <td className="border border-gray-300 px-4 py-2">No cuts, increased budget</td>
                <td className="border border-gray-300 px-4 py-2">83</td>
                <td className="border border-gray-300 px-4 py-2">153</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">+84%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-blue-800">Key Insights from the Data</h4>
          <ul className="text-sm space-y-2">
            <li>• Cities that cut police budgets saw larger average murder increases than cities that didn't</li>
            <li>• However, ALL major cities saw significant murder increases in 2020-2021, regardless of budget decisions</li>
            <li>• The pattern suggests budget cuts may have amplified an underlying trend rather than caused it</li>
            <li>• Rural areas with no defund movement also saw murder increases, pointing to broader social factors</li>
          </ul>
        </div>

        <h2 className="font-heading">The Political Reversal</h2>
        
        <p>
          By 2022, the political momentum had completely shifted. Key developments:
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Electoral Backlash</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-3">Pro-Police Mayors Elected</h4>
            <ul className="text-sm space-y-2">
              <li><strong>New York:</strong> Eric Adams (former police captain) defeated progressive candidates</li>
              <li><strong>Minneapolis:</strong> Jacob Frey (opposed defunding) won re-election</li>
              <li><strong>Seattle:</strong> Bruce Harrell defeated defund advocate Lorena González</li>
              <li><strong>Austin:</strong> Kirk Watson elected on public safety platform</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Ballot Measure Results</h4>
            <ul className="text-sm space-y-2">
              <li><strong>Minneapolis (2021):</strong> Police replacement rejected 56-44%</li>
              <li><strong>Austin (2022):</strong> Voters approved $100M+ police budget increase</li>
              <li><strong>Oakland (2022):</strong> Progressive DA recalled over crime concerns</li>
              <li><strong>San Francisco (2022):</strong> Progressive DA recalled, police budget increased</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Budget Restorations</h3>
        <p>
          By 2023, most cities had not only restored police budgets but increased them above 2020 levels:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">City</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2020 Budget</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2021 Low Point</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2024 Budget</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Net Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Austin</td>
                <td className="border border-gray-300 px-4 py-2">$434M</td>
                <td className="border border-gray-300 px-4 py-2">$290M</td>
                <td className="border border-gray-300 px-4 py-2">$512M</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">+18%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Los Angeles</td>
                <td className="border border-gray-300 px-4 py-2">$1.86B</td>
                <td className="border border-gray-300 px-4 py-2">$1.71B</td>
                <td className="border border-gray-300 px-4 py-2">$1.95B</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">+5%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Portland</td>
                <td className="border border-gray-300 px-4 py-2">$244M</td>
                <td className="border border-gray-300 px-4 py-2">$229M</td>
                <td className="border border-gray-300 px-4 py-2">$267M</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">+9%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading">Lessons Learned</h2>
        
        <p>
          The defund experiment, brief as it was, generated important lessons for police reform:
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">What Worked</h3>
        <ul>
          <li><strong>Mental health response teams:</strong> Cities that added social workers to respond to mental health crises saw positive results</li>
          <li><strong>Violence interruption:</strong> Community-based programs to mediate conflicts showed promise in several cities</li>
          <li><strong>Accountability measures:</strong> Enhanced oversight and transparency improved police-community relations</li>
          <li><strong>Youth programs:</strong> Summer jobs and mentorship programs correlated with reduced youth violence</li>
        </ul>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">What Didn't Work</h3>
        <ul>
          <li><strong>Eliminating specialized units:</strong> Disbanding gun violence teams in Portland and other cities coincided with violence increases</li>
          <li><strong>Rapid implementation:</strong> Cities that made quick, dramatic changes struggled more than those with gradual transitions</li>
          <li><strong>Lack of alternatives:</strong> Cutting police without ready replacement services created service gaps</li>
          <li><strong>Political sustainability:</strong> Policies without broad public support faced quick reversals</li>
        </ul>

        <h2 className="font-heading">The Recovery</h2>
        <p>
          By 2023-2024, violent crime dropped back to near pre-2020 levels. Homicides fell roughly 
          12-15% in 2023 and continued declining in 2024. This happened despite police staffing 
          levels remaining well below pre-2020 levels in most cities — complicating simple 
          &quot;more police = less crime&quot; narratives as well.
        </p>

        <h2 className="font-heading">Key Takeaways</h2>
        
        <div className="bg-gray-900 text-white rounded-xl p-8 mb-8">
          <h3 className="font-heading text-xl font-bold mb-6 text-center">Essential Facts About "Defund the Police"</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">What Actually Happened</h4>
              <ul className="text-sm space-y-2">
                <li>• Most cities made minimal or cosmetic cuts to police budgets</li>
                <li>• Austin, Portland, and Minneapolis made the only significant actual cuts</li>
                <li>• NYC and LA cuts were mostly accounting moves, not service reductions</li>
                <li>• By 2023, most cities spend more on police than before 2020</li>
                <li>• Police staffing crisis was more impactful than budget changes</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">The Data on Crime</h4>
              <ul className="text-sm space-y-2">
                <li>• 2020 murder spike began before any budget cuts took effect</li>
                <li>• Cities that didn't cut budgets saw similar crime increases</li>
                <li>• Rural areas with no defund movement also saw violence surge</li>
                <li>• Crime recovery began in 2022 despite continued staffing shortages</li>
                <li>• Multiple factors drove the spike: COVID, guns, social upheaval</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="font-semibold mb-3 text-yellow-300">Bottom Line</h4>
            <p className="text-sm">
              The 2020 crime spike was a multi-causal event driven primarily by COVID-era disruptions, not police budget changes. 
              While some cities with cuts saw larger increases, the pattern affected all cities regardless of budget decisions. 
              The "defund" movement's biggest impact was on officer recruitment and morale. Both "defunding caused the crime spike" 
              and "police funding doesn't matter" are oversimplifications the data doesn't support.
            </p>
          </div>
        </div>

        <h2 className="font-heading">The Future of Police Reform</h2>
        <p>
          The defund movement may have been politically short-lived, but it accelerated important conversations 
          about police reform. Many cities are now pursuing what advocates call "smart justice" approaches:
        </p>
        <ul>
          <li><strong>Hybrid models:</strong> Combining police with social workers, mental health professionals</li>
          <li><strong>Accountability measures:</strong> Body cameras, civilian oversight, data transparency</li>
          <li><strong>Community investment:</strong> Addressing root causes while maintaining public safety</li>
          <li><strong>Evidence-based policing:</strong> Using data to deploy resources where they're most effective</li>
        </ul>
        
        <p>
          The lesson from 2020-2024 appears to be that effective public safety requires both adequate 
          police resources AND investments in the social infrastructure that prevents crime. Cities that 
          maintained police capacity while also expanding mental health services, youth programs, and 
          violence intervention have generally seen the best outcomes.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/analysis/police-funding" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Police Funding Analysis</Link>
        <Link href="/analysis/crime-decline" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Crime Decline</Link>
        <Link href="/violent-crime" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Violent Crime</Link>
      </div>

      <div className="mt-8"><RelatedAnalysis currentSlug="defund-police" />

      <ShareButtons title='Did "Defund the Police" Cause a Crime Surge?' /></div>

      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer, Police Executive Research Forum, major city budget documents.</p>
    </div>
  );
}
