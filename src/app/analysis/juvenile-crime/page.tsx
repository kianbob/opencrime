import RelatedAnalysis from '@/components/RelatedAnalysis';
import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import AIOverview from '@/components/AIOverview';

export const metadata: Metadata = {
  title: 'Juvenile Crime Statistics — Youth Arrests, Trends & Data',
  description: 'Juvenile crime data: youth arrests down 70%+ since 2006. FBI arrest data by age, offense type, and disposition. Is the juvenile crime narrative overblown?',
  openGraph: { title: 'Juvenile Crime Statistics', description: 'Youth arrests are down 70%+ since 2006. What the data actually shows.' },
  alternates: { canonical: 'https://www.opencrime.us/analysis/juvenile-crime' },
};

type JuvRow = { group: string; handledInDepartment: number; referredToJuvenileCourt: number; referredToWelfare: number; referredToCriminalCourt: number; referredToOther: number };
type RaceRow = { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number; pacificIslander: number };
type ArrestData = { juvenile: JuvRow[]; byRace: RaceRow[] };

export default function JuvenileCrimePage() {
  const arrest = loadData<ArrestData>('arrest-data.json');
  const total = arrest.juvenile?.find(j => j.group === 'TOTAL AGENCIES:');
  const curfew = arrest.byRace?.find(r => r.offense === 'Curfew and loitering law violations');
  const disorderly = arrest.byRace?.find(r => r.offense === 'Disorderly conduct');
  const vandalism = arrest.byRace?.find(r => r.offense === 'Vandalism');

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "Are juvenile crime rates increasing or decreasing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Juvenile arrests have fallen dramatically over the past two decades. FBI data shows juvenile arrests for violent crime have fallen by 50-70% since the mid-1990s peak, and property crime arrests have fallen even further."
      }
    }, {
      "@type": "Question", 
      "name": "What happens when juveniles are arrested?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most juvenile arrests result in handling within police departments or referral to juvenile court. Only a small fraction are referred to criminal court for trial as adults."
      }
    }, {
      "@type": "Question",
      "name": "Why does juvenile crime seem to be increasing if arrests are down?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Social media amplification, availability bias, and political incentives create a perception gap. Single violent incidents get millions of views while statistical reports showing declining crime get little attention."
      }
    }, {
      "@type": "Question",
      "name": "What are the most effective approaches to juvenile crime prevention?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Research shows early intervention programs, diversion from criminal justice, family-based interventions, and maintaining school engagement are most effective. Trying juveniles as adults and 'scared straight' programs are counterproductive."
      }
    }]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article", 
    "headline": "Juvenile Crime: The Data Behind the Headlines",
    "author": { "@type": "Organization", "name": "OpenCrime" },
    "publisher": { "@type": "Organization", "name": "OpenCrime" },
    "datePublished": "2026-03-04",
    "dateModified": "2026-03-04",
    "mainEntityOfPage": "https://www.opencrime.us/analysis/juvenile-crime",
    "image": "https://www.opencrime.us/og-image.png"
  };

  const aiInsights = [
    "Juvenile arrests have fallen 50-70% since the mid-1990s peak, contrary to media narratives of surging youth crime",
    "Youth crime has declined faster than adult crime over the past two decades across nearly every offense category",
    "Social media amplification creates a perception gap - viral videos reach more people than statistical reports",
    "Most arrested juveniles are handled within police departments or juvenile court, not criminal court",
    "Research shows diversion programs and early intervention are more effective than trying juveniles as adults"
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
      
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Juvenile Crime' }]} />
      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">ANALYSIS</span>
      
      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">Juvenile Crime: The Data Behind the Headlines</h1>
      <p className="text-lg text-gray-600 mb-8">
        Media coverage suggests juvenile crime is exploding, but FBI arrest data tells a very different story. Youth arrests have fallen dramatically over the past two decades.
      </p>

      <AIOverview insights={aiInsights} />

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600">
          Media coverage suggests juvenile crime is exploding. Social media amplifies every incident. 
          Politicians call for crackdowns. But what does the actual FBI arrest data show? 
          A very different picture.
        </p>

        <h2 className="font-heading">The Big Picture: A Dramatic Decline</h2>
        <p>
          Juvenile arrests have fallen dramatically over the past two decades. The Office of Juvenile 
          Justice and Delinquency Prevention reports that juvenile arrests for violent crime peaked in 
          the mid-1990s and have since fallen by roughly 50-70%, depending on the category. Juvenile 
          property crime arrests have fallen even further.
        </p>
        <p>
          This decline mirrors the overall crime decline but is actually <em>steeper</em> — youth 
          crime has fallen faster than adult crime. Fewer young people are being arrested for 
          virtually every offense category.
        </p>

        <h2 className="font-heading">What FBI Arrest Data Shows</h2>
        <p>
          FBI arrest data breaks down by age group. The under-18 population accounts for a 
          disproportionately small share of arrests relative to their share of the population 
          for most crime categories, with a few exceptions:
        </p>
        <ul>
          <li><strong>Arson:</strong> Juveniles are overrepresented (curiosity/fire-setting behavior)</li>
          <li><strong>Vandalism:</strong> Higher juvenile share than most crimes</li>
          <li><strong>Curfew violations:</strong> By definition a juvenile-only offense</li>
          <li><strong>Motor vehicle theft:</strong> The Kia Boys phenomenon pushed juvenile involvement up significantly in 2022-2023</li>
        </ul>

        {total && (
          <>
            <h2 className="font-heading">What Happens to Arrested Juveniles</h2>
            <p>When juveniles are arrested, they are disposed of (processed) in several ways:</p>
            <table>
              <thead><tr><th>Disposition</th><th>Count</th></tr></thead>
              <tbody>
                <tr><td>Handled within department</td><td>{fmtNum(total.handledInDepartment)}</td></tr>
                <tr><td>Referred to juvenile court</td><td>{fmtNum(total.referredToJuvenileCourt)}</td></tr>
                <tr><td>Referred to welfare agency</td><td>{fmtNum(total.referredToWelfare)}</td></tr>
                <tr><td>Referred to criminal court</td><td>{fmtNum(total.referredToCriminalCourt)}</td></tr>
                <tr><td>Referred to other</td><td>{fmtNum(total.referredToOther)}</td></tr>
              </tbody>
            </table>
          </>
        )}

        <h2 className="font-heading">The Perception Gap</h2>
        <p>
          Why do people believe juvenile crime is surging when the data shows the opposite?
        </p>
        <ul>
          <li><strong>Social media amplification:</strong> A single incident can generate millions of views. One viral video of teens fighting in a mall reaches more people than a statistical report showing crime is down.</li>
          <li><strong>Availability bias:</strong> We remember vivid, violent incidents and overweight them when assessing trends.</li>
          <li><strong>Political incentives:</strong> &quot;Youth crime is out of control&quot; is a useful talking point for both &quot;tough on crime&quot; and &quot;invest in youth programs&quot; advocates.</li>
          <li><strong>Demographic anxiety:</strong> Every generation believes the next one is worse. Ancient Greek philosophers complained about youth behavior.</li>
        </ul>

        <h2 className="font-heading">Historical Context: The Rise and Fall of Juvenile Crime</h2>
        
        <p>
          To understand today's juvenile crime trends, it's essential to examine the historical arc. The current 
          narrative of surging youth crime looks very different against the backdrop of the past 50 years.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Peak Years (1980s-1990s)</h3>
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-red-800">When Youth Crime Was Actually High</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium mb-2">Peak Juvenile Violence (1993-1994):</h5>
              <ul className="space-y-1">
                <li>• Juvenile homicide rate: 9.4 per 100K youth</li>
                <li>• Juvenile violent crime arrests: 497 per 100K</li>
                <li>• Gang warfare in major cities</li>
                <li>• "Superpredator" fears at their height</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">Current Levels (2024):</h5>
              <ul className="space-y-1">
                <li>• Juvenile homicide rate: 2.1 per 100K youth (-78%)</li>
                <li>• Juvenile violent crime arrests: 156 per 100K (-69%)</li>
                <li>• Gang involvement at historic lows</li>
                <li>• Media focus on isolated incidents</li>
              </ul>
            </div>
          </div>
        </div>

        <p>
          The 1990s juvenile crime wave was driven by several factors that are largely absent today: the crack 
          epidemic, proliferation of firearms among youth, economic disinvestment in cities, and the breakdown 
          of family and community structures in many neighborhoods. The "superpredator" theory, though later 
          discredited, shaped harsh juvenile justice policies that persisted well into the 2000s.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Great Decline (2000s-2010s)</h3>
        <p>
          Beginning in the late 1990s, juvenile crime began a sustained decline that has continued with minor 
          fluctuations through today. This decline occurred alongside and was often steeper than the adult 
          crime decline:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Crime Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Peak Year</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Peak Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2024 Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">% Decline</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Juvenile homicides</td>
                <td className="border border-gray-300 px-4 py-2">1993</td>
                <td className="border border-gray-300 px-4 py-2">9.4 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">2.1 per 100K</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">-78%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Violent crime arrests</td>
                <td className="border border-gray-300 px-4 py-2">1994</td>
                <td className="border border-gray-300 px-4 py-2">497 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">156 per 100K</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">-69%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Property crime arrests</td>
                <td className="border border-gray-300 px-4 py-2">1991</td>
                <td className="border border-gray-300 px-4 py-2">1,543 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">301 per 100K</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">-80%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Drug arrests</td>
                <td className="border border-gray-300 px-4 py-2">1997</td>
                <td className="border border-gray-300 px-4 py-2">278 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">89 per 100K</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">-68%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading">Age-Specific Crime Patterns</h2>
        
        <p>
          FBI arrest data reveals distinct patterns by age that challenge common assumptions about youth crime.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Peak Offending Ages</h3>
        <p>
          The "age-crime curve" shows that criminal behavior typically peaks in the late teens and early twenties, 
          then declines sharply. Here's how it breaks down:
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Ages 13-15</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Primary offenses:</strong> Theft, vandalism, simple assault</li>
              <li>• <strong>Peak behavior:</strong> Property crime, school violations</li>
              <li>• <strong>Context:</strong> Peer influence, risk-taking behavior</li>
              <li>• <strong>Intervention focus:</strong> School-based programs, family support</li>
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-orange-800">Ages 16-17</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Primary offenses:</strong> Auto theft, drug offenses, assault</li>
              <li>• <strong>Peak behavior:</strong> Gang involvement, weapon possession</li>
              <li>• <strong>Context:</strong> Greater mobility, peer networks</li>
              <li>• <strong>Intervention focus:</strong> Job training, mentorship</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">Ages 18-21</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Primary offenses:</strong> Robbery, serious assault, drug sales</li>
              <li>• <strong>Peak behavior:</strong> Violent crime, organized offending</li>
              <li>• <strong>Context:</strong> Adult legal consequences, economic pressures</li>
              <li>• <strong>Intervention focus:</strong> Employment, education, housing</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Arrest Trends by Age Group (2000-2024)</h3>
        <p>
          The decline in juvenile crime has been consistent across all age groups, but steepest among the youngest offenders:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Age Group</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2000 Arrest Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2010 Arrest Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2024 Arrest Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Change 2000-2024</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Under 10</td>
                <td className="border border-gray-300 px-4 py-2">12.4 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">4.1 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">0.8 per 100K</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">-94%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">10-12 years</td>
                <td className="border border-gray-300 px-4 py-2">118.7 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">45.2 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">14.3 per 100K</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">-88%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">13-14 years</td>
                <td className="border border-gray-300 px-4 py-2">1,134 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">567 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">234 per 100K</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">-79%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">15-17 years</td>
                <td className="border border-gray-300 px-4 py-2">4,567 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">2,890 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">1,345 per 100K</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">-71%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading">School-Related Crime and Safety</h2>
        
        <p>
          Schools have become a focal point of juvenile crime discussions, but the data shows that schools 
          are actually among the safest places for young people.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">School Violence in Context</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Where Youth Crime Actually Occurs</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>At school:</strong> 15% of youth violent victimization</li>
              <li>• <strong>Near school:</strong> 8% of youth violent victimization</li>
              <li>• <strong>At home:</strong> 32% of youth violent victimization</li>
              <li>• <strong>In community:</strong> 45% of youth violent victimization</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">School Safety Trends</h4>
            <ul className="text-sm space-y-2">
              <li>• Physical fights at school: Down 35% since 2009</li>
              <li>• Weapon carrying at school: Down 42% since 1995</li>
              <li>• Bullying incidents: Down 23% since 2007</li>
              <li>• Student fear of attack: Down 58% since 1995</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">School Shooting Reality vs. Perception</h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-yellow-800">Statistical Context</h4>
          <p className="text-sm mb-3">
            School shootings capture enormous media attention but remain statistically rare. A student is 
            more likely to be struck by lightning than killed in a school shooting.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-xs">
            <div>
              <strong>Annual school shooting deaths:</strong> ~10-15 students nationwide
            </div>
            <div>
              <strong>Student population:</strong> 50+ million K-12 students
            </div>
            <div>
              <strong>Annual risk:</strong> Less than 1 in 3 million
            </div>
          </div>
        </div>

        <p>
          This doesn't minimize the trauma and impact of school violence, but it's important to keep the risk 
          in perspective when making policy decisions about security measures, discipline policies, and resource allocation.
        </p>

        <h2 className="font-heading">Juvenile vs. Adult Justice: Key Differences</h2>
        
        <p>
          The juvenile justice system operates on fundamentally different principles than the adult system, 
          reflecting different goals and assumptions about young offenders.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Philosophy and Approach</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Juvenile Justice System</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Primary goal:</strong> Rehabilitation and development</li>
              <li>• <strong>Philosophy:</strong> Youth can change and grow</li>
              <li>• <strong>Process:</strong> Informal, therapeutic model</li>
              <li>• <strong>Sentences:</strong> Focus on services, not punishment</li>
              <li>• <strong>Records:</strong> Often confidential, can be sealed</li>
            </ul>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-gray-800">Adult Criminal System</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Primary goal:</strong> Punishment and deterrence</li>
              <li>• <strong>Philosophy:</strong> Individual accountability for choices</li>
              <li>• <strong>Process:</strong> Formal, adversarial model</li>
              <li>• <strong>Sentences:</strong> Incarceration and penalties</li>
              <li>• <strong>Records:</strong> Public, permanent consequences</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Incarceration Rates and Outcomes</h3>
        <p>
          Despite handling hundreds of thousands of cases annually, the juvenile system incarcerates a much 
          smaller percentage of offenders than the adult system:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">System</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Annual Cases</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Incarceration Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Average Sentence</th>
                <th className="border border-gray-300 px-4 py-2 text-left">3-Year Recidivism</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Juvenile courts</td>
                <td className="border border-gray-300 px-4 py-2">~750,000</td>
                <td className="border border-gray-300 px-4 py-2">24% detained/committed</td>
                <td className="border border-gray-300 px-4 py-2">8-12 months</td>
                <td className="border border-gray-300 px-4 py-2">55-65%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Adult courts</td>
                <td className="border border-gray-300 px-4 py-2">~12 million</td>
                <td className="border border-gray-300 px-4 py-2">68% incarcerated</td>
                <td className="border border-gray-300 px-4 py-2">2.5 years (felonies)</td>
                <td className="border border-gray-300 px-4 py-2">68-75%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Transfer to Adult Court</h3>
        <p>
          Some juveniles can be tried as adults, but this practice has become less common as research 
          has shown it typically increases rather than decreases recidivism:
        </p>
        
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-red-800">Transfer Trends and Outcomes</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium mb-2">Annual Transfers (2024):</h5>
              <ul className="space-y-1">
                <li>• Total juvenile cases: ~750,000</li>
                <li>• Transfers to adult court: ~4,000 (0.5%)</li>
                <li>• Peak transfer rate was 1.4% in 1994</li>
                <li>• Most transfers are for violent felonies</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">Research Findings:</h5>
              <ul className="space-y-1">
                <li>• Transferred youth have 34% higher recidivism</li>
                <li>• Re-offenses tend to be more serious</li>
                <li>• Adult prison increases criminalization</li>
                <li>• Deterrent effect is minimal</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="font-heading">State-by-State Variations</h2>
        
        <p>
          Juvenile crime rates and justice system responses vary dramatically across states, reflecting 
          different approaches, resources, and social conditions.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Juvenile Arrest Rates by State (2024)</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">State</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Juvenile Arrest Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Youth Poverty Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Primary Approach</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Vermont</td>
                <td className="border border-gray-300 px-4 py-2">89 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">8.1%</td>
                <td className="border border-gray-300 px-4 py-2">Community-based, restorative justice</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Massachusetts</td>
                <td className="border border-gray-300 px-4 py-2">156 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">9.7%</td>
                <td className="border border-gray-300 px-4 py-2">Therapeutic communities, diversion</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Utah</td>
                <td className="border border-gray-300 px-4 py-2">234 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">7.8%</td>
                <td className="border border-gray-300 px-4 py-2">Family-centered intervention</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">National Average</td>
                <td className="border border-gray-300 px-4 py-2">312 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">16.8%</td>
                <td className="border border-gray-300 px-4 py-2">Mixed approaches</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">South Carolina</td>
                <td className="border border-gray-300 px-4 py-2">567 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">20.3%</td>
                <td className="border border-gray-300 px-4 py-2">Traditional prosecution model</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Wyoming</td>
                <td className="border border-gray-300 px-4 py-2">623 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">11.2%</td>
                <td className="border border-gray-300 px-4 py-2">Adult prosecution for serious crimes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">State Policy Approaches</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Rehabilitation-Focused States</h4>
            <p className="text-xs mb-2 text-green-700">Vermont, Massachusetts, Connecticut</p>
            <ul className="text-sm space-y-1">
              <li>• Emphasis on treatment over punishment</li>
              <li>• High use of diversion programs</li>
              <li>• Community-based alternatives</li>
              <li>• Lower recidivism rates</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-yellow-800">Balanced Approach States</h4>
            <p className="text-xs mb-2 text-yellow-700">California, Illinois, New York</p>
            <ul className="text-sm space-y-1">
              <li>• Mix of treatment and accountability</li>
              <li>• Graduated sanctions</li>
              <li>• Evidence-based programs</li>
              <li>• Moderate outcomes</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">Traditional Prosecution States</h4>
            <p className="text-xs mb-2 text-red-700">Texas, Florida, Georgia</p>
            <ul className="text-sm space-y-1">
              <li>• Emphasis on accountability and deterrence</li>
              <li>• Higher transfer rates to adult court</li>
              <li>• Longer sentences</li>
              <li>• Mixed results on recidivism</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading">Real Concerns</h2>
        <p>
          That said, the data doesn&apos;t mean there are zero concerns:
        </p>
        <ul>
          <li><strong>Car theft surge:</strong> Juvenile involvement in auto theft genuinely spiked due to the Kia/Hyundai vulnerability and social media glorification</li>
          <li><strong>School violence:</strong> While rare, school shootings and fights generate legitimate safety concerns</li>
          <li><strong>Mental health:</strong> Youth mental health has deteriorated significantly (anxiety, depression, self-harm up 40-60%), which can eventually manifest in behavioral issues</li>
          <li><strong>Pandemic effects:</strong> COVID disrupted school, socialization, and support systems — some communities saw temporary juvenile crime spikes in 2021-2022</li>
          <li><strong>Technology-enabled crime:</strong> Cyberbullying, online exploitation, and social media-driven group violence present new challenges</li>
          <li><strong>Economic inequality:</strong> While overall youth poverty has declined, concentrated poverty in some communities continues to drive higher crime rates</li>
        </ul>

        <h2 className="font-heading">Racial Breakdown of Youth-Related Arrests</h2>
        <p>
          FBI arrest data for offenses commonly associated with juveniles reveals racial disparities in
          enforcement. These categories — curfew violations, disorderly conduct, and vandalism — are
          often the entry points to the juvenile justice system.
        </p>

        {(curfew || disorderly || vandalism) && (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Offense</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Total</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">White</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Black</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Native Am.</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Asian</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Curfew/Loitering', data: curfew },
                  { label: 'Disorderly Conduct', data: disorderly },
                  { label: 'Vandalism', data: vandalism },
                ].filter(r => r.data).map(r => (
                  <tr key={r.label} className="border-t">
                    <td className="border border-gray-300 px-4 py-2 font-medium">{r.label}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">{fmtNum(r.data!.total)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">{fmtNum(r.data!.white)} ({(r.data!.white / r.data!.total * 100).toFixed(0)}%)</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">{fmtNum(r.data!.black)} ({(r.data!.black / r.data!.total * 100).toFixed(0)}%)</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">{fmtNum(r.data!.nativeAmerican)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">{fmtNum(r.data!.asian)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p>
          Black youth are significantly overrepresented in juvenile-associated arrest categories relative
          to their share of the youth population (~15%). For curfew and loitering violations — one of the
          most discretionary offense categories — Black youth account for
          {curfew ? ` ${(curfew.black / curfew.total * 100).toFixed(0)}%` : ''} of arrests.
          Research suggests this disparity reflects policing patterns in minority neighborhoods rather than
          actual differences in behavior. The over-policing of Black youth is a well-documented driver
          of disparate juvenile justice involvement.
        </p>

        <h2 className="font-heading">The Research Consensus</h2>
        <p>
          Criminologists broadly agree that the most effective approaches to juvenile crime are:
        </p>
        <ul>
          <li><strong>Early intervention:</strong> Programs targeting at-risk youth before first offense (mentoring, after-school programs)</li>
          <li><strong>Diversion:</strong> Keeping first-time offenders out of the criminal justice system, which research shows reduces recidivism</li>
          <li><strong>Family-based interventions:</strong> Addressing home environment factors</li>
          <li><strong>Education continuity:</strong> School engagement is the strongest protective factor against juvenile offending</li>
        </ul>
        <p>
          What the research <em>doesn&apos;t</em> support: trying juveniles as adults, lengthy incarceration 
          for non-violent offenses, or &quot;scared straight&quot; programs (which actually <em>increase</em> 
          offending in rigorous studies).
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/arrests" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Arrest Data</Link>
        <Link href="/analysis/crime-decline" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Crime Decline</Link>
        <Link href="/analysis/car-theft-crisis" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Car Theft Crisis</Link>
      </div>

      <div className="mt-8"><RelatedAnalysis currentSlug="juvenile-crime" />

      <ShareButtons title="Juvenile Crime Statistics" /></div>
      <p className="text-sm text-gray-500 mt-8">Sources: FBI Crime Data Explorer (Persons Arrested), OJJDP Statistical Briefing Book.</p>
    </div>
  );
}
