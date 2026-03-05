import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import RelatedAnalysis from '@/components/RelatedAnalysis';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hate Crimes in America: A Deep Dive Into FBI Data (2024)',
  description:
    'Analysis of 11,679 hate crime incidents in 2024. Breakdown by bias motivation, offense type, state, and demographic patterns using FBI hate crime statistics.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/hate-crimes-america' },
  openGraph: {
    title: 'Hate Crimes in America: A Deep Dive Into FBI Data (2024)',
    description:
      'Analysis of 11,679 hate crime incidents in 2024. Breakdown by bias motivation, offense type, state, and demographic patterns.',
    url: 'https://www.opencrime.us/analysis/hate-crimes-america',
  },
};

export default function HateCrimesAmericaPage() {
  const aiInsights = [
    '11,679 hate crime incidents reported in 2024 with 14,243 victims',
    'Race/ethnicity bias accounts for 50.2% of all hate crime incidents',
    'Anti-Black hate crimes (3,004 incidents) are the single largest category',
    'Anti-Jewish incidents (1,938) dominate religious bias — 69.6% of religion-motivated crimes',
    'Only ~60% of law enforcement agencies actively report hate crime data to the FBI',
    'California reported the most incidents (2,365), while Mississippi reported just 9',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Analysis', href: '/analysis' },
          { label: 'Hate Crimes in America' },
        ]}
      />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">
          DEEP DIVE
        </span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
        Hate Crimes in America: A Deep Dive Into FBI Data
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        In 2024, the FBI recorded 11,679 hate crime incidents across the United States — crimes
        motivated by prejudice based on race, religion, sexual orientation, gender identity, or
        disability. Behind every number is a person targeted for who they are. This analysis breaks
        down the data to show the full picture of bias-motivated crime in America.
      </p>

      <AIOverview insights={aiInsights} />

      {/* Key stats hero */}
      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">11,679</div>
            <div className="text-blue-200 text-sm">Total Incidents</div>
          </div>
          <div>
            <div className="text-3xl font-bold">14,243</div>
            <div className="text-blue-200 text-sm">Total Victims</div>
          </div>
          <div>
            <div className="text-3xl font-bold">13,683</div>
            <div className="text-blue-200 text-sm">Total Offenses</div>
          </div>
          <div>
            <div className="text-3xl font-bold">10,096</div>
            <div className="text-blue-200 text-sm">Known Offenders</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Scale of Hate Crime in 2024</h2>
        <p>
          The FBI&apos;s Hate Crime Statistics program documented 11,679 criminal incidents motivated
          by bias in 2024. These incidents involved 13,683 separate offenses, 14,243 victims, and
          10,096 known offenders. The vast majority — 11,323 incidents — involved a single bias
          motivation, while 356 were classified as multiple-bias incidents.
        </p>
        <p>
          These numbers almost certainly represent an undercount. The FBI&apos;s data relies on
          voluntary reporting by law enforcement agencies, and only about 60% of the nation&apos;s
          roughly 18,000 agencies actively participate. Many agencies that do participate report
          zero hate crimes, which may reflect genuine absence but more likely indicates inadequate
          identification, training, or reporting infrastructure.
        </p>
        <p>
          To understand the real scope, consider: the Bureau of Justice Statistics&apos; National Crime
          Victimization Survey, which surveys victims directly, consistently estimates 250,000 or more
          hate crime victimizations per year — more than 20 times the FBI&apos;s reported figure. The
          gap between the two data sources highlights the massive underreporting challenge.
        </p>

        <h2 className="font-heading">Bias Motivation Breakdown</h2>
        <p>
          Hate crimes are classified by the bias motivation behind the offense. The five major
          categories in FBI data are race/ethnicity/ancestry, religion, sexual orientation, gender
          identity, and disability. Here is how 2024 incidents break down:
        </p>
      </div>

      {/* Bias motivation table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Bias Category</th>
              <th className="text-right px-4 py-2">Incidents</th>
              <th className="text-right px-4 py-2">Victims</th>
              <th className="text-right px-4 py-2">% of Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Race/Ethnicity/Ancestry</td>
              <td className="px-4 py-2 text-right font-mono">5,866</td>
              <td className="px-4 py-2 text-right font-mono">7,323</td>
              <td className="px-4 py-2 text-right font-mono">50.2%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Religion</td>
              <td className="px-4 py-2 text-right font-mono">2,783</td>
              <td className="px-4 py-2 text-right font-mono">3,235</td>
              <td className="px-4 py-2 text-right font-mono">23.8%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Sexual Orientation</td>
              <td className="px-4 py-2 text-right font-mono">1,950</td>
              <td className="px-4 py-2 text-right font-mono">2,373</td>
              <td className="px-4 py-2 text-right font-mono">16.7%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Gender Identity</td>
              <td className="px-4 py-2 text-right font-mono">463</td>
              <td className="px-4 py-2 text-right font-mono">536</td>
              <td className="px-4 py-2 text-right font-mono">4.0%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Disability</td>
              <td className="px-4 py-2 text-right font-mono">163</td>
              <td className="px-4 py-2 text-right font-mono">182</td>
              <td className="px-4 py-2 text-right font-mono">1.4%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Gender</td>
              <td className="px-4 py-2 text-right font-mono">98</td>
              <td className="px-4 py-2 text-right font-mono">119</td>
              <td className="px-4 py-2 text-right font-mono">0.8%</td>
            </tr>
            <tr className="border-t bg-gray-50 font-semibold">
              <td className="px-4 py-2">Multiple-Bias Incidents</td>
              <td className="px-4 py-2 text-right font-mono">356</td>
              <td className="px-4 py-2 text-right font-mono">475</td>
              <td className="px-4 py-2 text-right font-mono">3.0%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <p>
          Race and ethnicity remain the dominant motivation for hate crimes, accounting for more than
          half of all incidents. Religious bias is the second-largest category at nearly 24%, followed
          by sexual orientation at 16.7%. Gender identity bias, while a smaller share, has been growing
          as a category in recent years amid heightened political focus on transgender issues.
        </p>

        <h2 className="font-heading">Race-Based Hate Crimes: Anti-Black Leads All Categories</h2>
        <p>
          Within the race/ethnicity category, anti-Black or African American bias is by far the most
          prevalent, with 3,004 incidents — representing 25.7% of all hate crimes and 51.2% of all
          race-based hate crimes. This reflects a pattern that has been consistent for decades in FBI
          data: Black Americans are the most targeted racial group.
        </p>
      </div>

      {/* Race breakdown table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Race/Ethnicity Bias</th>
              <th className="text-right px-4 py-2">Incidents</th>
              <th className="text-right px-4 py-2">Offenses</th>
              <th className="text-right px-4 py-2">% of Race Category</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-Black or African American</td>
              <td className="px-4 py-2 text-right font-mono">3,004</td>
              <td className="px-4 py-2 text-right font-mono">3,552</td>
              <td className="px-4 py-2 text-right font-mono">51.2%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-White</td>
              <td className="px-4 py-2 text-right font-mono">815</td>
              <td className="px-4 py-2 text-right font-mono">977</td>
              <td className="px-4 py-2 text-right font-mono">13.9%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-Hispanic or Latino</td>
              <td className="px-4 py-2 text-right font-mono">797</td>
              <td className="px-4 py-2 text-right font-mono">1,050</td>
              <td className="px-4 py-2 text-right font-mono">13.6%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-Other Race/Ethnicity</td>
              <td className="px-4 py-2 text-right font-mono">427</td>
              <td className="px-4 py-2 text-right font-mono">503</td>
              <td className="px-4 py-2 text-right font-mono">7.3%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-Asian</td>
              <td className="px-4 py-2 text-right font-mono">379</td>
              <td className="px-4 py-2 text-right font-mono">451</td>
              <td className="px-4 py-2 text-right font-mono">6.5%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-Multiple Races, Group</td>
              <td className="px-4 py-2 text-right font-mono">162</td>
              <td className="px-4 py-2 text-right font-mono">191</td>
              <td className="px-4 py-2 text-right font-mono">2.8%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-Arab</td>
              <td className="px-4 py-2 text-right font-mono">137</td>
              <td className="px-4 py-2 text-right font-mono">159</td>
              <td className="px-4 py-2 text-right font-mono">2.3%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-American Indian/Alaska Native</td>
              <td className="px-4 py-2 text-right font-mono">116</td>
              <td className="px-4 py-2 text-right font-mono">131</td>
              <td className="px-4 py-2 text-right font-mono">2.0%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-Native Hawaiian/Pacific Islander</td>
              <td className="px-4 py-2 text-right font-mono">29</td>
              <td className="px-4 py-2 text-right font-mono">29</td>
              <td className="px-4 py-2 text-right font-mono">0.5%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <p>
          Anti-Black hate crimes outnumber the next two racial categories combined (anti-White at 815
          and anti-Hispanic at 797). When adjusted for population, the disparity is even starker:
          Black Americans are roughly 13.7% of the population but account for over half of
          race-motivated hate crime victims. For deeper analysis on racial dimensions, see our{' '}
          <Link href="/crime-by-race" className="text-[#1e3a5f] hover:underline">
            crime by race breakdown
          </Link>{' '}
          and{' '}
          <Link href="/analysis/racial-disparities" className="text-[#1e3a5f] hover:underline">
            racial disparities analysis
          </Link>.
        </p>
        <p>
          Anti-Asian hate crimes remain elevated at 379 incidents. While down from the peak during
          the COVID-19 pandemic when anti-Asian violence surged dramatically, the numbers remain
          substantially higher than pre-pandemic levels. Anti-Arab incidents (137) also remain a
          persistent concern, particularly in the context of Middle East geopolitical tensions.
        </p>

        <h2 className="font-heading">Religious Bias: Anti-Jewish Hate Crimes Dominate</h2>
        <p>
          Religious bias motivated 2,783 hate crime incidents in 2024 — the second-largest category
          overall. The distribution within this category is striking:
        </p>
      </div>

      {/* Religion breakdown table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Religious Bias</th>
              <th className="text-right px-4 py-2">Incidents</th>
              <th className="text-right px-4 py-2">% of Religion Category</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-Jewish</td>
              <td className="px-4 py-2 text-right font-mono">1,938</td>
              <td className="px-4 py-2 text-right font-mono">69.6%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-Islamic (Muslim)</td>
              <td className="px-4 py-2 text-right font-mono">228</td>
              <td className="px-4 py-2 text-right font-mono">8.2%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-Sikh</td>
              <td className="px-4 py-2 text-right font-mono">142</td>
              <td className="px-4 py-2 text-right font-mono">5.1%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-Other Religion</td>
              <td className="px-4 py-2 text-right font-mono">104</td>
              <td className="px-4 py-2 text-right font-mono">3.7%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-Other Christian</td>
              <td className="px-4 py-2 text-right font-mono">71</td>
              <td className="px-4 py-2 text-right font-mono">2.6%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-Catholic</td>
              <td className="px-4 py-2 text-right font-mono">55</td>
              <td className="px-4 py-2 text-right font-mono">2.0%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-Multiple Religions</td>
              <td className="px-4 py-2 text-right font-mono">55</td>
              <td className="px-4 py-2 text-right font-mono">2.0%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-Eastern Orthodox</td>
              <td className="px-4 py-2 text-right font-mono">46</td>
              <td className="px-4 py-2 text-right font-mono">1.7%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-Protestant</td>
              <td className="px-4 py-2 text-right font-mono">46</td>
              <td className="px-4 py-2 text-right font-mono">1.7%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <p>
          Anti-Jewish hate crimes constitute a staggering 69.6% of all religion-motivated incidents —
          1,938 incidents in 2024. Jewish Americans represent roughly 2.4% of the US population but
          are the target of nearly 17% of all hate crimes. This makes anti-Jewish bias the second
          most common specific motivation after anti-Black bias.
        </p>
        <p>
          The 2024 figures reflect a significant increase in anti-Jewish incidents compared to
          historical averages, likely influenced by the Israel-Hamas conflict that began in October
          2023 and the resulting surge in antisemitic rhetoric and violence both online and offline.
          Anti-Islamic incidents (228) also remain a serious concern.
        </p>
        <p>
          Anti-Sikh hate crimes (142) are notably elevated, partly due to misidentification — Sikh
          Americans wearing turbans are sometimes targeted by perpetrators who mistake them for
          Muslims. This phenomenon has been documented since the post-9/11 era.
        </p>

        <h2 className="font-heading">Sexual Orientation and Gender Identity</h2>
        <p>
          Sexual orientation bias motivated 1,950 hate crime incidents in 2024, while gender identity
          bias accounted for 463. Together, LGBTQ+ individuals face 2,413 bias-motivated incidents —
          approximately 20.7% of all hate crimes.
        </p>
        <p>
          Within sexual orientation categories, anti-gay (male) bias is the largest subcategory with
          1,010 incidents, followed by anti-LGBTQ mixed group (728 incidents), and anti-lesbian (152
          incidents). Anti-transgender incidents totaled 335, with an additional 128 anti-gender
          non-conforming incidents.
        </p>
        <p>
          LGBTQ+ hate crimes are particularly concerning because they are more likely to involve
          violence. Research consistently shows that hate crimes targeting sexual orientation and
          gender identity involve physical assault at higher rates than those motivated by racial or
          religious bias, which more often involve property crimes like vandalism.
        </p>

        <h2 className="font-heading">The Big Three: Anti-Black vs. Anti-Jewish vs. Anti-LGBTQ+</h2>
        <p>
          The three largest targeted groups in FBI hate crime data tell very different stories about
          bias in America:
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Target Group</th>
              <th className="text-right px-4 py-2">Incidents</th>
              <th className="text-right px-4 py-2">US Pop. %</th>
              <th className="text-right px-4 py-2">HC Share</th>
              <th className="text-right px-4 py-2">Disparity</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-Black</td>
              <td className="px-4 py-2 text-right font-mono">3,004</td>
              <td className="px-4 py-2 text-right font-mono">13.7%</td>
              <td className="px-4 py-2 text-right font-mono">25.7%</td>
              <td className="px-4 py-2 text-right font-mono text-red-600">1.9x</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-Jewish</td>
              <td className="px-4 py-2 text-right font-mono">1,938</td>
              <td className="px-4 py-2 text-right font-mono">2.4%</td>
              <td className="px-4 py-2 text-right font-mono">16.6%</td>
              <td className="px-4 py-2 text-right font-mono text-red-600">6.9x</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Anti-LGBTQ+ (all)</td>
              <td className="px-4 py-2 text-right font-mono">2,413</td>
              <td className="px-4 py-2 text-right font-mono">~7.6%</td>
              <td className="px-4 py-2 text-right font-mono">20.7%</td>
              <td className="px-4 py-2 text-right font-mono text-red-600">2.7x</td>
            </tr>
          </tbody>
        </table>
        <p className="text-sm text-gray-500 px-4 py-3">
          Disparity = share of hate crimes / share of population. Higher = more disproportionately targeted.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <p>
          Per capita, Jewish Americans face the highest rate of hate crime victimization — nearly 7
          times their population share. Black Americans face the highest absolute number of incidents.
          LGBTQ+ individuals collectively face more than 2,400 incidents, with transgender people
          facing particularly elevated per-capita risk.
        </p>

        <h2 className="font-heading">State-by-State Variation</h2>
        <p>
          Hate crime reporting varies dramatically by state, driven by differences in reporting
          practices, state hate crime laws, agency participation, and population:
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">State</th>
              <th className="text-right px-4 py-2">Total Incidents</th>
              <th className="text-right px-4 py-2">Sexual Orientation</th>
            </tr>
          </thead>
          <tbody>
            {[
              { state: 'California', total: 2365, so: 510 },
              { state: 'New Jersey', total: 1325, so: 11 },
              { state: 'New York', total: 1048, so: 88 },
              { state: 'Michigan', total: 563, so: 90 },
              { state: 'Washington', total: 578, so: 73 },
              { state: 'Massachusetts', total: 539, so: 79 },
              { state: 'Texas', total: 515, so: 63 },
              { state: 'Illinois', total: 443, so: 14 },
              { state: 'Ohio', total: 408, so: 32 },
              { state: 'Oregon', total: 402, so: 80 },
            ].map((s) => (
              <tr key={s.state} className="border-t">
                <td className="px-4 py-2 font-medium">{s.state}</td>
                <td className="px-4 py-2 text-right font-mono">{s.total.toLocaleString()}</td>
                <td className="px-4 py-2 text-right font-mono">{s.so}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-sm text-gray-500 px-4 py-3">
          Top 10 states by total reported incidents. For full data, see our{' '}
          <Link href="/hate-crimes" className="text-[#1e3a5f] hover:underline">
            hate crimes page
          </Link>.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <p>
          California leads the nation with 2,365 reported incidents — more than the next two states
          combined. However, California also has excellent reporting infrastructure and a large
          population. New Jersey (1,325) and New York (1,048) round out the top three.
        </p>
        <p>
          At the other extreme, Mississippi reported just 9 incidents, and Montana reported 13. These
          low numbers almost certainly reflect underreporting rather than an absence of bias-motivated
          crime. States with weaker hate crime laws or less robust reporting mandates consistently show
          lower numbers regardless of their actual hate crime prevalence.
        </p>
        <p>
          The disparity between states highlights a fundamental challenge: hate crime data is only as
          good as the agencies collecting it. When the FBI transitioned to the National Incident-Based
          Reporting System (NIBRS), many agencies fell behind in reporting, creating temporary gaps.
          Advocacy organizations estimate that full reporting would likely show 30-50% more incidents
          than currently captured.
        </p>

        <h2 className="font-heading">Who Commits Hate Crimes?</h2>
        <p>
          The FBI identified 10,096 known offenders in 2024 hate crime incidents. The demographic
          breakdown reveals important patterns:
        </p>
        <ul>
          <li>
            <strong>Race:</strong> 52.3% of known offenders were White (5,281), 20.8% were Black
            (2,103), 6.3% were multiple races group (635), and 17.8% were unknown race (1,797).
          </li>
          <li>
            <strong>Age:</strong> Of 8,385 offenders with age data, 78.7% were adults (6,601) and
            21.3% were juveniles (1,784). The high juvenile share is concerning and may reflect both
            school-based incidents and online radicalization.
          </li>
          <li>
            <strong>Ethnicity:</strong> Among those with ethnicity data, Hispanic or Latino offenders
            accounted for 788 known offenders.
          </li>
        </ul>
        <p>
          The overrepresentation of White offenders relative to the general population tracks with
          research showing that racial and religious hate crimes are disproportionately committed by
          White perpetrators, while anti-White and anti-LGBTQ+ hate crimes have more diverse offender
          pools. For more on{' '}
          <Link href="/arrest-demographics" className="text-[#1e3a5f] hover:underline">
            arrest demographics
          </Link>, see our dedicated page.
        </p>

        <h2 className="font-heading">Historical Trends and Context</h2>
        <p>
          Hate crime reporting has gone through several phases since the FBI began collecting data
          under the Hate Crime Statistics Act of 1990:
        </p>
        <ul>
          <li>
            <strong>1990s–2000s:</strong> Initial reporting was sporadic. Annual totals fluctuated
            between 6,000 and 10,000 incidents as more agencies participated.
          </li>
          <li>
            <strong>Post-9/11 (2001):</strong> Anti-Islamic hate crimes surged 1,600% in the
            immediate aftermath. While they declined from the initial spike, they never returned to
            pre-9/11 levels.
          </li>
          <li>
            <strong>2015–2019:</strong> A general upward trend coincided with heightened political
            polarization. The FBI recorded 7,175 incidents in 2017, rising to 8,559 in 2019.
          </li>
          <li>
            <strong>2020–2021:</strong> Anti-Asian hate crimes surged during the COVID-19 pandemic.
            Overall hate crime reporting was disrupted by the NIBRS transition.
          </li>
          <li>
            <strong>2022–2024:</strong> With improved NIBRS adoption, reported numbers jumped
            significantly. The 2024 figure of 11,679 reflects both genuine trends and expanded
            reporting capacity.
          </li>
        </ul>
        <p>
          It is important to note that changes in reported hate crimes reflect a combination of actual
          changes in bias-motivated behavior, changes in victim willingness to report, changes in law
          enforcement training and identification, and changes in reporting infrastructure. Separating
          these factors is extremely difficult.
        </p>

        <h2 className="font-heading">The Reporting Challenge</h2>
        <p>
          The single biggest problem with hate crime data is underreporting. Multiple layers of
          undercount exist:
        </p>
        <ol>
          <li>
            <strong>Victim non-reporting:</strong> Many hate crime victims never contact law
            enforcement. LGBTQ+ individuals, undocumented immigrants, and communities with strained
            police relations are especially unlikely to report. BJS surveys suggest only about 40-50%
            of hate crime victims report to police.
          </li>
          <li>
            <strong>Misclassification:</strong> Even when victims report, responding officers may not
            recognize or document the bias motivation. Hate crime identification requires specific
            training that many officers lack.
          </li>
          <li>
            <strong>Agency non-participation:</strong> Roughly 40% of law enforcement agencies either
            don&apos;t participate in hate crime reporting or report zero incidents. Major cities like
            some in Florida have historically underreported.
          </li>
          <li>
            <strong>Definitional issues:</strong> Not all bias-motivated behavior meets the legal
            threshold. Online harassment, discriminatory incidents that don&apos;t involve criminal
            conduct, and microaggressions are not captured.
          </li>
        </ol>
        <p>
          Several states have enacted mandatory hate crime reporting laws to address these gaps.
          California, Massachusetts, and Washington — all states with high reported numbers — have
          among the strongest reporting mandates. Conversely, states without such mandates tend to
          show suspiciously low numbers.
        </p>

        <h2 className="font-heading">Policy Implications</h2>
        <p>
          The data points to several policy priorities:
        </p>
        <ul>
          <li>
            <strong>Improve reporting infrastructure.</strong> Federal funding for NIBRS adoption and
            hate crime reporting training would close data gaps. The 2021 COVID-19 Hate Crimes Act
            was a step in this direction but more is needed.
          </li>
          <li>
            <strong>Strengthen state hate crime laws.</strong> As of 2024, Wyoming and South Carolina
            still lack hate crime statutes. Comprehensive state laws improve both deterrence and data
            collection.
          </li>
          <li>
            <strong>Address anti-Black and anti-Jewish bias.</strong> The two largest specific
            categories require targeted prevention strategies — community-based violence intervention
            for race-based crimes and enhanced security and educational programs for religious
            institutions.
          </li>
          <li>
            <strong>Protect LGBTQ+ communities.</strong> With over 2,400 incidents and
            disproportionately violent offenses, LGBTQ+ protections including federal civil rights
            coverage and school safety measures are critical.
          </li>
          <li>
            <strong>Combat online radicalization.</strong> The 21.3% juvenile offender rate suggests
            that young people are being radicalized. Media literacy, counter-extremism programs, and
            platform accountability are needed.
          </li>
        </ul>

        <h2 className="font-heading">Frequently Asked Questions</h2>
        <h3>How many hate crimes happen in the US each year?</h3>
        <p>
          The FBI recorded 11,679 hate crime incidents in 2024. However, due to massive underreporting,
          the Bureau of Justice Statistics estimates the true number may be 250,000+ victimizations per
          year — more than 20 times the FBI count.
        </p>
        <h3>What is the most common type of hate crime?</h3>
        <p>
          Race-based hate crimes are the most common category (50.2% of incidents). Within that
          category, anti-Black hate crimes are the single largest motivation with 3,004 incidents in
          2024. Anti-Jewish bias is the second most common specific motivation with 1,938 incidents.
        </p>
        <h3>Which state has the most hate crimes?</h3>
        <p>
          California reported the most hate crime incidents in 2024 (2,365), followed by New Jersey
          (1,325) and New York (1,048). However, high numbers partly reflect better reporting
          infrastructure. States with low reported numbers often have weaker reporting mandates.
        </p>
        <h3>Are hate crimes increasing?</h3>
        <p>
          Reported hate crimes have increased significantly in recent years, from around 8,500 in 2019
          to 11,679 in 2024. However, much of this increase reflects improved reporting through NIBRS
          adoption rather than purely an increase in bias-motivated behavior. Both factors likely
          contribute.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link
          href="/hate-crimes"
          className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition"
        >
          Hate Crimes Data
        </Link>
        <Link
          href="/arrest-demographics"
          className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Arrest Demographics
        </Link>
        <Link
          href="/crime-by-race"
          className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Crime by Race
        </Link>
        <Link
          href="/analysis/racial-disparities"
          className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Racial Disparities
        </Link>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="hate-crimes-america" />
        <ShareButtons title="Hate Crimes in America: A Deep Dive Into FBI Data (2024)" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Hate Crimes in America: A Deep Dive Into FBI Data (2024)',
            description:
              'Analysis of 11,679 hate crime incidents in 2024. Breakdown by bias motivation, offense type, state, and demographic patterns.',
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
                name: 'How many hate crimes happen in the US each year?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The FBI recorded 11,679 hate crime incidents in 2024. Due to underreporting, the true number may be 250,000+ victimizations per year.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the most common type of hate crime?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Race-based hate crimes are the most common (50.2%). Anti-Black bias is the single largest motivation with 3,004 incidents in 2024.',
                },
              },
              {
                '@type': 'Question',
                name: 'Which state has the most hate crimes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'California reported the most incidents (2,365) in 2024, followed by New Jersey (1,325) and New York (1,048).',
                },
              },
              {
                '@type': 'Question',
                name: 'Are hate crimes increasing?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Reported hate crimes rose from ~8,500 in 2019 to 11,679 in 2024. Both increased reporting and genuine increases likely contribute.',
                },
              },
            ],
          }),
        }}
      />

      <p className="text-sm text-gray-500 mt-8">
        Source: FBI Crime Data Explorer, Hate Crime Statistics 2024.
      </p>
    </div>
  );
}
