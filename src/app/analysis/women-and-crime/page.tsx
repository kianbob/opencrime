import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';

type DemographicsData = {
  totalVictims: { total: number; male: number; female: number; unknown: number };
  totalOffenders: { total: number; male: number; female: number; unknown: number };
  victimRace: { race: string; total: number; male: number; female: number }[];
  offenderRace: { race: string; total: number; pct: number }[];
};

type RaceRow = { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number; pacificIslander: number };

export const metadata: Metadata = {
  title: 'Women and Crime — The Gender Gap in Victims, Offenders & Incarceration',
  description: 'Women are 22% of arrests but 3,538 female homicide victims and 1,902 female offenders in 2023. Analysis of gender disparities in crime, domestic violence, and incarceration.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/women-and-crime' },
  openGraph: {
    url: 'https://www.opencrime.us/analysis/women-and-crime',
    title: 'Women and Crime — The Gender Gap',
    description: 'The gender gap in crime: women as victims, offenders, and prisoners. Data-driven analysis of how crime affects women differently.',
  },
};

export default function WomenAndCrimePage() {
  const d = loadData<DemographicsData>('homicide-demographics.json');
  const arrestData = loadData<{ byRace: RaceRow[] }>('arrest-data.json');
  const totalRow = arrestData.byRace.find(r => r.offense === 'TOTAL');

  const femaleVictims = d.totalVictims.female;
  const femaleOffenders = d.totalOffenders.female;
  const femalePctVictims = ((femaleVictims / d.totalVictims.total) * 100).toFixed(1);
  const knownOffenders = d.totalOffenders.total - d.totalOffenders.unknown;
  const femalePctOffenders = ((femaleOffenders / knownOffenders) * 100).toFixed(1);

  const femaleVictimsByRace = d.victimRace.map(r => ({
    race: r.race,
    female: r.female,
    pct: ((r.female / femaleVictims) * 100).toFixed(1),
  }));

  const insights = [
    `${fmtNum(femaleVictims)} women were murdered in 2023 — ${femalePctVictims}% of all homicide victims`,
    `Only ${fmtNum(femaleOffenders)} women were homicide offenders — ${femalePctOffenders}% of known offenders`,
    'Women are approximately 22% of all arrests but rising — up from ~15% in the 1980s',
    'Over 40% of female murder victims are killed by intimate partners vs ~6% of male victims',
    'Female incarceration has risen 475% since 1980 — faster growth than male incarceration',
    'Women are the majority of victims for certain crimes: stalking (78%), domestic violence (76%), sex trafficking (96%)',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Women and Crime' }]} />

      <div className="mb-6">
        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">ANALYSIS</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Women and Crime: The Gender Gap in Victims, Offenders, and Incarceration</h1>
      <p className="text-lg text-gray-600 mb-6">
        Crime is gendered. Men commit the vast majority of crime and are the majority of victims. But women&apos;s
        experience of crime — as victims, as offenders, and as prisoners — follows fundamentally different patterns
        that are often overlooked in aggregate statistics.
      </p>

      <ShareButtons title="Women and Crime — The Gender Gap" />

      <AIOverview insights={insights} />

      {/* Hero Stats */}
      <div className="bg-[#1e3a5f] text-white rounded-xl p-8 mb-8">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold">{fmtNum(femaleVictims)}</div>
            <div className="text-blue-200 text-sm">Female Murder Victims</div>
          </div>
          <div>
            <div className="text-4xl font-bold">{fmtNum(femaleOffenders)}</div>
            <div className="text-blue-200 text-sm">Female Offenders</div>
          </div>
          <div>
            <div className="text-4xl font-bold">~22%</div>
            <div className="text-blue-200 text-sm">Share of All Arrests</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-red-400">+475%</div>
            <div className="text-blue-200 text-sm">Incarceration Growth Since 1980</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">Women as Victims: A Different Kind of Violence</h2>
        <p>
          In 2023, <strong>{fmtNum(femaleVictims)} women</strong> were murdered in the United States, according to the FBI&apos;s
          Supplementary Homicide Reports. That&apos;s {femalePctVictims}% of all {fmtNum(d.totalVictims.total)} homicide victims. While men
          face a far higher overall murder rate, women&apos;s homicide victimization follows starkly different patterns:
        </p>
        <ul>
          <li><strong>Intimate partner violence:</strong> Over 40% of female murder victims are killed by a current or former intimate partner. For men, this figure is approximately 6%.</li>
          <li><strong>Location:</strong> Women are far more likely to be killed at home. Men are more often killed on streets, in parking lots, and in other public spaces.</li>
          <li><strong>Weapon:</strong> While firearms dominate both genders, women are more likely to be killed by strangulation, blunt force, or stabbing — methods associated with domestic violence.</li>
          <li><strong>Relationship to offender:</strong> Women are much more likely to know their killer. Stranger-on-stranger homicide is predominantly a male phenomenon.</li>
        </ul>
        <p>
          This means that the policy solutions for female homicide are fundamentally different from those for male homicide.
          Reducing female murder requires addressing <Link href="/analysis/domestic-violence" className="text-[#1e3a5f] underline">domestic violence</Link>,
          strengthening protective orders, and supporting victims who try to leave abusive relationships — the most
          dangerous moment is often the attempt to leave.
        </p>

        <h2 className="font-heading">Female Murder Victims by Race</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Race</th>
              <th className="text-right px-4 py-2">Female Victims</th>
              <th className="text-right px-4 py-2">% of Female Total</th>
            </tr>
          </thead>
          <tbody>
            {femaleVictimsByRace.map(r => (
              <tr key={r.race} className="border-t">
                <td className="px-4 py-2 font-medium">{r.race}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(r.female)}</td>
                <td className="px-4 py-2 text-right font-mono">{r.pct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <p>
          White women account for the largest share of female homicide victims at 55.2%, followed by Black women at 38.3%.
          While Black women are murdered at a lower rate than Black men, they are still approximately 2.5 times more likely
          to be murdered than white women — a disparity rooted in the same socioeconomic factors that drive the overall
          <Link href="/homicide-demographics" className="text-[#1e3a5f] underline"> racial disparities in homicide</Link>.
        </p>

        <h2 className="font-heading">Beyond Homicide: Crimes That Disproportionately Affect Women</h2>
        <p>
          Homicide is the most extreme form of violence, but women bear disproportionate burdens across several crime categories:
        </p>
        <ul>
          <li><strong>Domestic violence:</strong> Women are 76% of domestic violence victims. An estimated 1 in 4 women will experience intimate partner violence in their lifetime. <Link href="/analysis/domestic-violence" className="text-[#1e3a5f] underline">See our full analysis</Link>.</li>
          <li><strong>Sexual assault:</strong> Women are approximately 90% of rape and sexual assault victims. The NCVS estimates 459,310 rapes/sexual assaults against women annually, though reporting rates remain below 25%.</li>
          <li><strong>Stalking:</strong> 78% of stalking victims are female. An estimated 7.5 million women are stalked annually.</li>
          <li><strong>Human trafficking:</strong> 96% of sex trafficking victims identified by the National Human Trafficking Hotline are female.</li>
          <li><strong>Workplace harassment:</strong> 81% of women report experiencing some form of sexual harassment.</li>
        </ul>
        <p>
          These crimes are systematically underrepresented in UCR/NIBRS data because they are dramatically underreported
          to police. The gap between victimization surveys (like NCVS) and police reports is largest for crimes that
          disproportionately affect women.
        </p>

        <h2 className="font-heading">Women as Offenders: The Minority in the System</h2>
        <p>
          Women account for approximately <strong>22% of all arrests</strong> in the United States — a figure that has been
          steadily rising from about 15% in the 1980s. In homicide specifically, only {fmtNum(femaleOffenders)} women were
          identified as offenders in 2023 ({femalePctOffenders}% of known offenders).
        </p>
        <p>
          The crimes women commit look different from men&apos;s crimes:
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Offense Type</th>
              <th className="text-right px-4 py-2">Est. Female % of Arrests</th>
              <th className="text-left px-4 py-2">Context</th>
            </tr>
          </thead>
          <tbody>
            {[
              { offense: 'Prostitution & Commercialized Vice', pct: '54%', ctx: 'Highest female share — though buyers (mostly male) are less likely to be arrested' },
              { offense: 'Embezzlement', pct: '48%', ctx: 'Near-parity — women have access to financial positions' },
              { offense: 'Fraud', pct: '39%', ctx: 'Check fraud, identity fraud, benefits fraud' },
              { offense: 'Larceny-Theft', pct: '37%', ctx: 'Shoplifting drives the high female share' },
              { offense: 'Forgery/Counterfeiting', pct: '35%', ctx: 'Often linked to identity crimes' },
              { offense: 'DUI', pct: '24%', ctx: 'Rising — female DUI arrests have doubled since 1998' },
              { offense: 'Aggravated Assault', pct: '22%', ctx: 'Often domestic contexts' },
              { offense: 'Drug Abuse Violations', pct: '20%', ctx: 'Lower arrest share despite similar usage rates' },
              { offense: 'Murder', pct: '~12%', ctx: 'Often intimate partner or family contexts' },
              { offense: 'Robbery', pct: '11%', ctx: 'Lowest female share among violent crimes' },
            ].map(r => (
              <tr key={r.offense} className="border-t">
                <td className="px-4 py-2 font-medium">{r.offense}</td>
                <td className="px-4 py-2 text-right font-mono">{r.pct}</td>
                <td className="px-4 py-2 text-gray-600 text-sm">{r.ctx}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-400 p-3">Estimates based on FBI UCR arrest data and BJS reports. Exact percentages vary by year.</p>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <p>
          The pattern is clear: women&apos;s offending concentrates in property crime, fraud, and survival-related offenses.
          Violent crime by women is relatively rare and, when it occurs, is often in the context of domestic relationships
          or self-defense. Studies consistently find that 60–80% of incarcerated women have histories of physical or sexual
          abuse — suggesting that for many, crime is the downstream consequence of victimization.
        </p>

        <h2 className="font-heading">The Rise of Female Incarceration</h2>
        <p>
          While women remain a small share of the prison population, their incarceration rate has grown faster than men&apos;s:
        </p>
        <ul>
          <li><strong>1980:</strong> ~13,000 women in state and federal prisons</li>
          <li><strong>2000:</strong> ~85,000 women incarcerated</li>
          <li><strong>2019 (pre-COVID peak):</strong> ~110,000 women incarcerated</li>
          <li><strong>2023:</strong> ~97,000 women (down from peak but still a 475% increase from 1980)</li>
        </ul>
        <p>
          Several factors drove this explosion:
        </p>
        <ol>
          <li><strong>War on Drugs:</strong> Mandatory minimum sentences for drug offenses swept in many women who were low-level participants — often girlfriends or partners of male dealers who were charged as co-conspirators.</li>
          <li><strong>Changing arrest practices:</strong> Domestic violence mandatory arrest policies, while well-intentioned, led to increased dual arrests where women defending themselves were also arrested.</li>
          <li><strong>Poverty:</strong> Women living in poverty are more likely to shoplift, commit benefit fraud, or engage in survival sex work — all crimes heavily policed in low-income areas.</li>
          <li><strong>Net-widening:</strong> As the criminal justice system expanded, women who would previously have received warnings or diversions were formally processed.</li>
        </ol>

        <h2 className="font-heading">The Impact on Families</h2>
        <p>
          Female incarceration has cascading effects on families that male incarceration, while devastating, often does
          not replicate:
        </p>
        <ul>
          <li><strong>80% of incarcerated women are mothers.</strong> The majority were primary caregivers before incarceration.</li>
          <li><strong>Children of incarcerated mothers</strong> are 5x more likely to be placed in foster care than children of incarcerated fathers.</li>
          <li><strong>Intergenerational impact:</strong> Children of incarcerated parents are 6x more likely to be incarcerated themselves.</li>
          <li><strong>Housing:</strong> Women are more likely than men to lose housing during incarceration, making reentry more difficult.</li>
        </ul>
        <p>
          The connection to crime rates is cyclical: incarcerating mothers destabilizes families, increases foster care
          placement, raises the risk of child behavioral problems, and ultimately increases the probability that those
          children will enter the criminal justice system. The <Link href="/analysis/recidivism-crisis" className="text-[#1e3a5f] underline">recidivism crisis</Link> is
          partly perpetuated through this intergenerational mechanism.
        </p>

        <h2 className="font-heading">Domestic Violence: Where Victimization and Offending Intersect</h2>
        <p>
          For women, the categories of &quot;victim&quot; and &quot;offender&quot; frequently overlap. Research on incarcerated women
          consistently finds:
        </p>
        <ul>
          <li>60–80% report histories of physical or sexual abuse</li>
          <li>30–40% of women convicted of killing a partner had documented histories of being abused by that partner</li>
          <li>Many women&apos;s property and drug crimes are committed under coercion or duress from male partners</li>
          <li>Trafficking victims are sometimes arrested for the very crimes they were forced to commit</li>
        </ul>
        <p>
          This intersection challenges the clean victim/offender binary that crime statistics present. The
          <Link href="/analysis/domestic-violence" className="text-[#1e3a5f] underline"> domestic violence data</Link> on this
          site shows the scale of the problem, but it cannot capture these blurred lines between victimization and
          criminal behavior.
        </p>

        <h2 className="font-heading">Policy Implications</h2>
        <p>
          The gender gap in crime has concrete policy implications:
        </p>
        <ol>
          <li><strong>Gender-responsive programming:</strong> Prisons and reentry programs designed for men don&apos;t work well for women. Women need trauma-informed care, parenting support, and domestic violence services.</li>
          <li><strong>Alternatives to incarceration:</strong> For non-violent property and drug offenses, community-based programs are cheaper and more effective than prison — especially for women with children.</li>
          <li><strong>Protective order enforcement:</strong> Better enforcement of domestic violence protective orders could prevent a significant share of female homicides.</li>
          <li><strong>Addressing the reporting gap:</strong> Crimes that disproportionately affect women (sexual assault, stalking, DV) are the most underreported. This means resources are misallocated because the data understates the problem.</li>
          <li><strong>Coercive control legislation:</strong> Recognizing that many women&apos;s criminal behavior occurs under duress from abusive partners.</li>
        </ol>

        <h2 className="font-heading">The Bottom Line</h2>
        <p>
          The gender gap in crime is one of the most robust findings in criminology: men commit the vast majority of crime,
          particularly violent crime. But within that gap lies a complex story. Women are disproportionately affected by
          intimate partner violence, sexual assault, stalking, and trafficking. When women do offend, it is often in the
          context of poverty, addiction, and prior victimization.
        </p>
        <p>
          The {fmtNum(femaleVictims)} women murdered in 2023 are a reminder that gender-specific approaches to violence
          prevention are essential. The {fmtNum(femaleOffenders)} female offenders are a reminder that the criminal justice
          system needs to understand the pathways that lead women to crime — pathways that frequently begin with being
          victimized themselves.
        </p>

        <h2 className="font-heading">Related Analysis</h2>
        <ul>
          <li><Link href="/analysis/domestic-violence">Domestic Violence in America</Link></li>
          <li><Link href="/who-are-victims">Who Are the Victims?</Link></li>
          <li><Link href="/homicide-demographics">Homicide Demographics</Link></li>
          <li><Link href="/arrest-demographics">Arrest Demographics</Link></li>
          <li><Link href="/analysis/homicide-in-america">Homicide in America</Link></li>
          <li><Link href="/analysis/recidivism-crisis">The Recidivism Crisis</Link></li>
        </ul>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        Sources: FBI Supplementary Homicide Reports (SHR), 2023; FBI UCR Arrest Data; Bureau of Justice Statistics;
        National Crime Victimization Survey (NCVS); The Sentencing Project; National Domestic Violence Hotline;
        National Human Trafficking Hotline.
      </p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Women and Crime: The Gender Gap in Victims, Offenders, and Incarceration',
        description: 'Analysis of gender disparities in crime: women as victims, offenders, and prisoners. FBI 2023 data.',
        url: 'https://www.opencrime.us/analysis/women-and-crime',
        author: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        datePublished: '2025-03-01',
        dateModified: '2025-03-01',
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How many women are murdered in the US each year?', acceptedAnswer: { '@type': 'Answer', text: `The FBI recorded ${femaleVictims.toLocaleString()} female homicide victims in 2023 (${femalePctVictims}% of all victims). Over 40% of female victims are killed by intimate partners.` }},
          { '@type': 'Question', name: 'What percentage of arrests are women?', acceptedAnswer: { '@type': 'Answer', text: 'Women account for approximately 22% of all arrests, up from about 15% in the 1980s. Female arrest shares are highest for prostitution (54%), embezzlement (48%), and fraud (39%).' }},
          { '@type': 'Question', name: 'How much has female incarceration grown?', acceptedAnswer: { '@type': 'Answer', text: 'Female incarceration has increased 475% since 1980, from ~13,000 to ~97,000 women in state and federal prisons. This growth rate outpaces male incarceration and was driven largely by drug war policies.' }},
          { '@type': 'Question', name: 'What percentage of incarcerated women have abuse histories?', acceptedAnswer: { '@type': 'Answer', text: 'Research consistently finds that 60-80% of incarcerated women report histories of physical or sexual abuse, suggesting that for many women, criminal behavior is a downstream consequence of victimization.' }},
        ],
      })}} />

      <RelatedAnalysis currentSlug="women-and-crime" />
    </div>
  );
}
