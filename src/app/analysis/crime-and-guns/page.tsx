import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crime and Guns: What Does the Data Actually Say About Guns and Crime?',
  description:
    'A data-driven analysis of the relationship between gun ownership and crime in America. Gun homicide data, state comparisons, international context, and what the evidence shows.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/crime-and-guns' },
  openGraph: {
    title: 'Crime and Guns: What Does the Data Actually Say?',
    description: 'Firearms are involved in 77% of US homicides. A data-driven, non-partisan look at guns and crime.',
    url: 'https://www.opencrime.us/analysis/crime-and-guns',
  },
};

export default function CrimeAndGunsPage() {
  const aiInsights = [
    'Firearms are involved in approximately 77% of US homicides',
    'Handguns account for ~59% of gun homicides where weapon type is known',
    'The US gun homicide rate is ~25x higher than other high-income countries',
    'States with highest gun ownership don\'t always have the highest gun crime',
    'Rifles (including "assault weapons") account for ~3% of gun homicides',
    'Two-thirds of gun deaths are suicides, not homicides',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Analysis', href: '/analysis' },
          { label: 'Crime and Guns' },
        ]}
      />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
        Crime and Guns: What Does the Data Actually Say?
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Few topics in American life are more contentious than guns and crime. Both sides cherry-pick
        statistics. This analysis presents the data — all of it — and lets the numbers speak. We draw
        from FBI homicide data, CDC mortality statistics, state-level gun ownership estimates, and
        international comparisons. Our goal is not to advocate for any policy position, but to
        present what the evidence actually shows.
      </p>

      <AIOverview insights={aiInsights} />

      {/* The Scale of Gun Violence */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">The Scale of Gun Violence in America</h2>
        <p className="text-gray-700 mb-4">
          In a typical year, approximately <strong>45,000 Americans die from firearms</strong>. But
          that headline number obscures a critical distinction:
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <div className="text-3xl font-bold text-red-700">~20,000</div>
            <div className="text-sm text-red-600 font-semibold">Gun Homicides per year</div>
            <div className="text-xs text-red-500 mt-1">~44% of gun deaths</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="text-3xl font-bold text-amber-700">~26,000</div>
            <div className="text-sm text-amber-600 font-semibold">Gun Suicides per year</div>
            <div className="text-xs text-amber-500 mt-1">~56% of gun deaths</div>
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          <strong>Most gun deaths are suicides, not homicides.</strong> This is critically important
          for policy discussions because the interventions for preventing suicide are very different
          from those for preventing homicide. Approximately 85% of suicide attempts with a firearm
          are fatal, compared to ~5% with other methods — suggesting that access to firearms may
          significantly affect suicide completion rates.
        </p>
        <p className="text-gray-700">
          When people say &quot;gun violence,&quot; they usually mean homicide. But the suicide toll
          is actually larger — and often ignored in the debate.
        </p>
      </section>

      {/* Homicide Weapon Data */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">Murder Weapons: What the FBI Data Shows</h2>
        <p className="text-gray-700 mb-4">
          FBI Supplementary Homicide Reports provide detailed weapon data for murders. Here&apos;s
          the breakdown:
        </p>
        <div className="bg-white rounded-xl border overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Weapon Type</th>
                <th className="text-right p-3 font-semibold">Homicides</th>
                <th className="text-right p-3 font-semibold">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {[
                { weapon: 'Handguns', count: '6,246', pct: '22.7%', bold: false },
                { weapon: 'Firearms (type not stated)', count: '4,565', pct: '16.6%', bold: false },
                { weapon: 'Rifles', count: '401', pct: '1.5%', bold: false },
                { weapon: 'Shotguns', count: '149', pct: '0.5%', bold: false },
                { weapon: 'Other guns', count: '356', pct: '1.3%', bold: false },
                { weapon: 'Total Firearms', count: '11,717', pct: '42.6%', bold: true },
                { weapon: 'Knives/Cutting Instruments', count: '1,566', pct: '5.7%', bold: false },
                { weapon: 'Personal Weapons (hands, fists)', count: '633', pct: '2.3%', bold: false },
                { weapon: 'Blunt Objects (clubs, hammers)', count: '283', pct: '1.0%', bold: false },
                { weapon: 'Other/Not Stated', count: '1,400', pct: '5.1%', bold: false },
              ].map(r => (
                <tr key={r.weapon} className={`border-t ${r.bold ? 'bg-red-50 font-bold' : ''}`}>
                  <td className="p-3">{r.weapon}</td>
                  <td className="text-right p-3">{r.count}</td>
                  <td className="text-right p-3">{r.pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-blue-800 mb-2">The Rifle Reality</h3>
          <p className="text-blue-700">
            Rifles — the category that includes AR-15s and other so-called &quot;assault weapons&quot; —
            account for approximately <strong>401 homicides</strong>, or about <strong>1.5%</strong> of
            all murders. More people are killed with knives (1,566), personal weapons like hands and feet
            (633), and blunt objects (283) than with rifles. This doesn&apos;t mean rifles aren&apos;t
            involved in high-profile mass shootings — they are. But in terms of total homicide volume,
            handguns are overwhelmingly the weapon of choice.
          </p>
        </div>

        <p className="text-gray-700">
          <strong>Handguns are the primary murder weapon in America.</strong> Where weapon type is known,
          handguns outnumber rifles roughly 15-to-1 in homicides. The &quot;assault weapon&quot; debate,
          while emotionally charged, addresses a small fraction of overall gun violence.
        </p>
      </section>

      {/* Gun Ownership vs Crime */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">Gun Ownership Rates vs Violent Crime</h2>
        <p className="text-gray-700 mb-4">
          Does more gun ownership lead to more crime? The answer is not straightforward. Using RAND
          survey data on gun ownership and FBI crime statistics:
        </p>
        <div className="bg-white rounded-xl border overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">State</th>
                <th className="text-right p-3 font-semibold">Gun Ownership</th>
                <th className="text-right p-3 font-semibold">Violent Crime Rate</th>
                <th className="text-right p-3 font-semibold">Homicide Rate</th>
              </tr>
            </thead>
            <tbody>
              {[
                { state: 'Montana', ownership: '66%', violent: '469.8', homicide: '5.0' },
                { state: 'Wyoming', ownership: '66%', violent: '234.1', homicide: '3.1' },
                { state: 'Alaska', ownership: '65%', violent: '724.1', homicide: '6.9' },
                { state: 'Idaho', ownership: '60%', violent: '242.6', homicide: '2.5' },
                { state: 'West Virginia', ownership: '59%', violent: '355.8', homicide: '5.4' },
                { state: 'New Hampshire', ownership: '41%', violent: '146.4', homicide: '1.1' },
                { state: 'Massachusetts', ownership: '14%', violent: '308.8', homicide: '2.4' },
                { state: 'New Jersey', ownership: '12%', violent: '195.4', homicide: '3.1' },
                { state: 'Hawaii', ownership: '9%', violent: '280.6', homicide: '2.8' },
                { state: 'New York', ownership: '19%', violent: '363.7', homicide: '3.6' },
              ].map(r => (
                <tr key={r.state} className="border-t">
                  <td className="p-3 font-medium">{r.state}</td>
                  <td className="text-right p-3">{r.ownership}</td>
                  <td className="text-right p-3">{r.violent}</td>
                  <td className="text-right p-3">{r.homicide}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-gray-700 mb-4">
          <strong>The correlation is weak and inconsistent.</strong> Wyoming has one of the highest
          gun ownership rates (66%) but a relatively low violent crime rate. Alaska has high ownership
          AND high violence. New Hampshire has moderate ownership and very low crime. Massachusetts has
          very low ownership but moderate crime.
        </p>
        <p className="text-gray-700 mb-4">
          This suggests that gun ownership alone is not the primary driver of violent crime. Other
          factors — poverty, urbanization, gang activity, drug markets, social cohesion — appear
          to be stronger predictors. However, this doesn&apos;t mean guns have no effect on crime
          outcomes. The <em>lethality</em> of crime is clearly affected by firearm availability.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-bold text-amber-800 mb-2">The Nuance</h3>
          <p className="text-amber-700">
            Gun ownership may not predict whether someone will commit a crime, but it strongly predicts
            whether a violent encounter will be fatal. An aggravated assault with a gun is far more
            likely to become a homicide than one with a knife or fists. The presence of firearms
            doesn&apos;t create criminals — but it makes violent encounters more deadly.
          </p>
        </div>
      </section>

      {/* Strict vs Permissive Gun Laws */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">Strict vs Permissive Gun Law States</h2>
        <p className="text-gray-700 mb-4">
          States are often divided into &quot;strict&quot; and &quot;permissive&quot; gun law categories.
          Comparing crime rates between them is illuminating — but complicated:
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl border p-5">
            <h3 className="font-bold text-gray-900 mb-3">Strictest Gun Laws</h3>
            <ul className="text-sm space-y-2 text-gray-700">
              <li><strong>California:</strong> Violent rate 486.0, Homicide 4.5</li>
              <li><strong>New York:</strong> Violent rate 363.7, Homicide 3.6</li>
              <li><strong>New Jersey:</strong> Violent rate 195.4, Homicide 3.1</li>
              <li><strong>Massachusetts:</strong> Violent rate 308.8, Homicide 2.4</li>
              <li><strong>Hawaii:</strong> Violent rate 280.6, Homicide 2.8</li>
              <li className="text-xs text-gray-500 pt-2">Average homicide: ~3.3 per 100K</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl border p-5">
            <h3 className="font-bold text-gray-900 mb-3">Most Permissive Gun Laws</h3>
            <ul className="text-sm space-y-2 text-gray-700">
              <li><strong>Mississippi:</strong> Violent rate 291.2, Homicide 13.9</li>
              <li><strong>Louisiana:</strong> Violent rate 519.8, Homicide 10.8</li>
              <li><strong>Alabama:</strong> Violent rate 453.4, Homicide 8.7</li>
              <li><strong>Missouri:</strong> Violent rate 495.0, Homicide 9.8</li>
              <li><strong>Arkansas:</strong> Violent rate 579.4, Homicide 7.3</li>
              <li className="text-xs text-gray-500 pt-2">Average homicide: ~10.1 per 100K</li>
            </ul>
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          States with stricter gun laws generally have <strong>lower homicide rates</strong> — but
          they also tend to be wealthier, more urban, and have different demographic profiles. Disentangling
          the effect of gun laws from poverty, urbanization, and other factors is methodologically
          challenging.
        </p>
        <p className="text-gray-700">
          <strong>Both sides have a point:</strong> Gun control advocates are correct that strict-law
          states have lower homicide rates. Gun rights advocates are correct that many factors beyond
          gun laws drive these differences. The honest answer is that gun laws likely have <em>some</em>
          effect, but they&apos;re far from the only — or even the primary — determinant of crime rates.
        </p>
      </section>

      {/* International Comparison */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">International Comparison</h2>
        <p className="text-gray-700 mb-4">
          The US gun homicide rate stands out starkly among high-income peer nations:
        </p>
        <div className="bg-white rounded-xl border overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Country</th>
                <th className="text-right p-3 font-semibold">Gun Homicide Rate</th>
                <th className="text-right p-3 font-semibold">vs US</th>
              </tr>
            </thead>
            <tbody>
              {[
                { country: 'United States', rate: '4.12', vs: '—' },
                { country: 'Canada', rate: '0.52', vs: '8x lower' },
                { country: 'Australia', rate: '0.15', vs: '27x lower' },
                { country: 'United Kingdom', rate: '0.04', vs: '103x lower' },
                { country: 'Germany', rate: '0.06', vs: '69x lower' },
                { country: 'France', rate: '0.12', vs: '34x lower' },
                { country: 'Japan', rate: '0.01', vs: '412x lower' },
              ].map(r => (
                <tr key={r.country} className={`border-t ${r.country === 'United States' ? 'bg-red-50 font-bold' : ''}`}>
                  <td className="p-3">{r.country}</td>
                  <td className="text-right p-3">{r.rate}</td>
                  <td className="text-right p-3 text-gray-500">{r.vs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-700 mb-4">
          The US gun homicide rate is approximately <strong>25 times higher</strong> than the average
          of other high-income countries. This is the single most striking statistic in the
          guns-and-crime debate. It doesn&apos;t prove causation — America differs from these countries
          in many ways beyond gun policy — but the gap is enormous and difficult to explain without
          accounting for firearm availability.
        </p>
        <p className="text-gray-700">
          However, America&apos;s <em>non-gun</em> homicide rate is also higher than most peer nations,
          suggesting that factors beyond firearms contribute to America&apos;s violence problem.
        </p>
      </section>

      {/* The Handgun vs Assault Weapon Distinction */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">The Handgun vs &quot;Assault Weapon&quot; Distinction</h2>
        <p className="text-gray-700 mb-4">
          Much of the political debate focuses on so-called &quot;assault weapons&quot; — typically
          semi-automatic rifles like the AR-15. But the data tells a different story about where
          gun violence actually occurs:
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <div className="text-3xl font-bold text-red-700">~6,246</div>
            <div className="text-sm text-red-600 font-semibold">Handgun homicides</div>
            <div className="text-xs text-red-500 mt-1">The everyday weapon of gun violence</div>
          </div>
          <div className="bg-gray-50 border rounded-xl p-5">
            <div className="text-3xl font-bold text-gray-700">~401</div>
            <div className="text-sm text-gray-600 font-semibold">Rifle homicides (all types)</div>
            <div className="text-xs text-gray-500 mt-1">Includes AR-15s and all other rifles</div>
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          Handguns kill <strong>15 times more people</strong> than rifles in America. The focus on
          &quot;assault weapons&quot; in the political debate is driven by mass shootings — which are
          horrifying but statistically rare. The daily toll of gun violence is overwhelmingly a
          handgun problem, concentrated in specific urban neighborhoods with high poverty and gang activity.
        </p>
        <p className="text-gray-700">
          This doesn&apos;t mean assault weapon restrictions have no merit — mass shootings cause
          immense psychological harm beyond the body count. But if the goal is reducing total gun
          homicides, handgun policy matters far more than rifle policy.
        </p>
      </section>

      {/* What Works */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">What the Evidence Says Works</h2>
        <p className="text-gray-700 mb-4">
          Setting aside political ideology, what does the evidence suggest actually reduces gun violence?
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-4">
          <li>
            <strong>Focused deterrence / violence interruption:</strong> Programs like CeaseFire/CURE Violence
            that target specific high-risk individuals have shown 30-60% reductions in shootings in multiple cities.
          </li>
          <li>
            <strong>Extreme risk protection orders (red flag laws):</strong> Evidence suggests these
            prevent some suicides and potentially some mass shootings, though data is limited.
          </li>
          <li>
            <strong>Universal background checks:</strong> States with universal background checks have
            ~15% lower firearm homicide rates, though causation is debated.
          </li>
          <li>
            <strong>Hospital-based violence intervention:</strong> Programs that reach shooting survivors
            in the hospital reduce re-injury rates by 60-70%.
          </li>
          <li>
            <strong>Addressing root causes:</strong> Poverty reduction, employment programs, mental health
            access, and community investment reduce violence regardless of gun policy.
          </li>
        </ul>
      </section>

      {/* Conclusion */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">The Bottom Line</h2>
        <div className="bg-gray-50 rounded-xl border p-6">
          <p className="text-gray-800 mb-4">
            The guns-and-crime relationship is real but complicated. Firearms don&apos;t cause crime —
            poverty, inequality, drug markets, and gang activity are stronger predictors of violence.
            But firearms make violent encounters far more lethal, and America&apos;s gun homicide rate
            is an extreme outlier among wealthy nations.
          </p>
          <p className="text-gray-800 mb-4">
            The most effective approaches address both gun access (for high-risk individuals) and root
            causes of violence simultaneously. Neither &quot;more guns&quot; nor &quot;ban all guns&quot;
            reflects what the data actually supports.
          </p>
          <p className="text-gray-800">
            The data is clear on one thing: America&apos;s gun violence problem is overwhelmingly a
            handgun problem, concentrated in specific communities, driven by specific risk factors,
            and addressable through targeted interventions — if we have the political will.
          </p>
        </div>
      </section>

      {/* Cross-links */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">Related Analysis</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/analysis/gun-violence" className="block bg-white rounded-xl border p-4 hover:shadow-md transition">
            <div className="font-bold text-[#1e3a5f]">Gun Violence by the Numbers →</div>
            <div className="text-sm text-gray-500">FBI data on firearm homicides</div>
          </Link>
          <Link href="/murder-rate" className="block bg-white rounded-xl border p-4 hover:shadow-md transition">
            <div className="font-bold text-[#1e3a5f]">US Murder Rate →</div>
            <div className="text-sm text-gray-500">Historical homicide trends</div>
          </Link>
          <Link href="/homicide-demographics" className="block bg-white rounded-xl border p-4 hover:shadow-md transition">
            <div className="font-bold text-[#1e3a5f]">Homicide Demographics →</div>
            <div className="text-sm text-gray-500">Victim and offender demographics</div>
          </Link>
          <Link href="/analysis/mass-shootings" className="block bg-white rounded-xl border p-4 hover:shadow-md transition">
            <div className="font-bold text-[#1e3a5f]">Mass Shootings vs Total Gun Violence →</div>
            <div className="text-sm text-gray-500">Putting mass shootings in context</div>
          </Link>
        </div>
      </section>

      <ShareButtons title="Crime and Guns: What Does the Data Actually Say?" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Crime and Guns: What Does the Data Actually Say About Guns and Crime?',
        description: 'A data-driven, non-partisan analysis of the relationship between gun ownership and crime in America.',
        url: 'https://www.opencrime.us/analysis/crime-and-guns',
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        datePublished: '2024-12-01',
        dateModified: new Date().toISOString().split('T')[0],
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What percentage of murders involve guns?', acceptedAnswer: { '@type': 'Answer', text: 'Approximately 77% of US homicides involve firearms. Handguns are the most common weapon type, accounting for about 59% of gun homicides where the weapon type is known.' }},
          { '@type': 'Question', name: 'Do states with more guns have more crime?', acceptedAnswer: { '@type': 'Answer', text: 'The correlation between gun ownership rates and violent crime is weak and inconsistent. Some high-ownership states have low crime (Wyoming, Idaho) while others have high crime (Alaska, Louisiana). Poverty, urbanization, and social factors appear to be stronger predictors.' }},
          { '@type': 'Question', name: 'How does US gun violence compare to other countries?', acceptedAnswer: { '@type': 'Answer', text: 'The US gun homicide rate (~4.12 per 100K) is approximately 25 times higher than the average of other high-income countries. The UK rate is about 0.04 per 100K, Japan is 0.01.' }},
          { '@type': 'Question', name: 'Are assault weapons the main gun violence problem?', acceptedAnswer: { '@type': 'Answer', text: 'No. Rifles (including AR-15s) account for about 401 homicides per year, or ~1.5% of all murders. Handguns kill approximately 6,246 people per year — about 15x more. The everyday toll of gun violence is overwhelmingly a handgun problem.' }},
        ],
      })}} />
    </div>
  );
}
