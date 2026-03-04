import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Did "Defund the Police" Cause a Crime Surge? What the Data Shows',
  description: 'Examining the claim that defunding police caused crime increases. FBI data on police staffing, budgets, and crime rates 2019-2024.',
  openGraph: { title: 'Did Defund the Police Cause Crime Surges?', description: 'What actually happened to police budgets and crime rates after 2020.' },
};

export default function DefundPolicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Defund the Police' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">Did &quot;Defund the Police&quot; Cause a Crime Surge? What the Data Shows</h1>

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

        <h2 className="font-heading">The Recovery</h2>
        <p>
          By 2023-2024, violent crime dropped back to near pre-2020 levels. Homicides fell roughly 
          12-15% in 2023 and continued declining in 2024. This happened despite police staffing 
          levels remaining well below pre-2020 levels in most cities — complicating simple 
          &quot;more police = less crime&quot; narratives as well.
        </p>

        <h2 className="font-heading">The Bottom Line</h2>
        <p>
          The data suggests the 2020 crime spike was a multi-causal event driven primarily by 
          COVID-era disruptions, not by police budget changes (which were mostly small and quickly 
          reversed). The &quot;defund&quot; movement&apos;s biggest impact was likely on officer 
          recruitment and morale rather than actual budgets. Both &quot;defunding caused the crime 
          spike&quot; and &quot;police funding doesn&apos;t matter&quot; are oversimplifications 
          that the data doesn&apos;t fully support.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/analysis/police-funding" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Police Funding Analysis</Link>
        <Link href="/analysis/crime-decline" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Crime Decline</Link>
        <Link href="/violent-crime" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Violent Crime</Link>
      </div>

      <div className="mt-8"><ShareButtons title='Did "Defund the Police" Cause a Crime Surge?' /></div>

      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer, Police Executive Research Forum, major city budget documents.</p>
    </div>
  );
}
