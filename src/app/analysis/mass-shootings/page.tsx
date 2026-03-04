import RelatedAnalysis from '@/components/RelatedAnalysis';
import AIOverview from '@/components/AIOverview';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Mass Shootings vs Total Gun Violence — The Data Behind the Headlines',
  description: 'Mass shootings dominate headlines but represent <1% of gun deaths. Comprehensive analysis of FBI data reveals the true scale, patterns, and geographic concentration of gun violence in America.',
  openGraph: { title: 'Mass Shootings vs Total Gun Violence', description: 'Mass shootings get the headlines, but 98% of gun murders happen one at a time.' },
  alternates: { canonical: 'https://www.opencrime.us/analysis/mass-shootings' },
};

export default function MassShootingsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Mass Shootings vs Gun Violence' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">Mass Shootings vs Total Gun Violence: What the Data Actually Shows</h1>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
        <strong>Content note:</strong> This article discusses gun violence, including mass casualty events. It takes no position on gun policy — only presents what the data shows.
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600">
          Mass shootings dominate media coverage of gun violence in America. But they represent a tiny 
          fraction of overall gun deaths. Understanding the full picture is essential for an informed 
          conversation about public safety.
        </p>

        <h2 className="font-heading">The Scale Mismatch</h2>
        <p>
          In 2024, the FBI recorded approximately 16,935 homicides in the United States. Of these, 
          roughly 77% — about 13,000 — involved a firearm. Mass shooting incidents (defined by the 
          FBI as 4+ killed in a single event, excluding the shooter) account for fewer than 200 
          deaths in a typical year.
        </p>
        <p>
          That means <strong>mass shootings represent roughly 1-2% of total gun homicides</strong>. 
          The other 98% happen one or two at a time — in homes, on streets, in parking lots — 
          and rarely make national news.
        </p>

        <h2 className="font-heading">Where Gun Homicides Actually Happen</h2>
        <p>Based on FBI expanded homicide data, gun violence is highly concentrated:</p>
        <ul>
          <li><strong>Geographically:</strong> A small number of neighborhoods in a small number of cities account for a hugely disproportionate share. Studies consistently show that 1-2% of street blocks generate 25-50% of gun violence.</li>
          <li><strong>Demographically:</strong> Young men aged 18-34 are both perpetrators and victims at wildly disproportionate rates.</li>
          <li><strong>Relationally:</strong> The majority of gun homicides involve people who know each other — acquaintances, rivals, domestic partners. Stranger-on-stranger gun murders are the minority.</li>
        </ul>

        <h2 className="font-heading">The Suicide Dimension</h2>
        <p>
          When discussing &quot;gun deaths,&quot; it&apos;s critical to include suicide. In most years, 
          gun suicides outnumber gun homicides — roughly 27,000 vs 13,000. This means about two-thirds 
          of all gun deaths are self-inflicted. The policy implications are fundamentally different for 
          suicide prevention vs homicide prevention.
        </p>

        <h2 className="font-heading">What FBI Data Can and Cannot Tell Us</h2>
        <p>
          The FBI&apos;s Uniform Crime Reporting program tracks homicides reported by law enforcement, 
          including weapon type. It does <em>not</em> track mass shooting events as a category. 
          The expanded homicide data tells us:
        </p>
        <ul>
          <li><strong>Handguns</strong> are used in far more murders than rifles (including the often-debated AR-15). In FBI data, handguns account for roughly 6,000+ murders vs rifles around 500.</li>
          <li><strong>&quot;Firearms, type not stated&quot;</strong> is a large category (~4,500) because many agencies don&apos;t specify the weapon type beyond &quot;firearm.&quot;</li>
          <li><strong>Personal weapons</strong> (hands, fists, feet) kill more people annually (~600) than rifles (~500).</li>
        </ul>

        <h2 className="font-heading">The Media Distortion</h2>
        <p>
          Media scholars have documented that mass shootings receive approximately 50-75x more 
          media coverage per death than everyday gun homicides. This creates a perception gap: 
          Americans consistently overestimate the frequency of mass shootings and underestimate 
          the scale of daily gun violence.
        </p>
        <p>
          This matters because it shapes policy focus. Whether one favors more gun regulations 
          or fewer, understanding where gun deaths actually occur and how they happen is essential 
          for effective policy. Interventions that reduce everyday gun homicides (violence 
          interrupters, focused deterrence, economic investment in high-crime neighborhoods) 
          address a far larger share of the problem than interventions focused solely on mass 
          shooting scenarios.
        </p>

        <h2 className="font-heading">The Bottom Line</h2>
        <p>
          Mass shootings are horrifying and deserve attention. But if your goal is to reduce 
          gun deaths, the data shows that the vast majority happen in predictable places, between 
          people who often know each other, using handguns — not rifles — one at a time. 
          Both the &quot;ban assault weapons&quot; and &quot;arm everyone&quot; camps would benefit 
          from reckoning with this data.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/analysis/gun-violence" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Gun Violence Data</Link>
        <Link href="/murder-rate" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Murder Rate</Link>
        <Link href="/violent-crime" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Violent Crime</Link>
      </div>

      <div className="mt-8"><RelatedAnalysis currentSlug="mass-shootings" />

      <ShareButtons title="Mass Shootings vs Total Gun Violence" /></div>

      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer, Expanded Homicide Data, 2024. Gun Suicide data: CDC WONDER database.</p>
    </div>
  );
}
