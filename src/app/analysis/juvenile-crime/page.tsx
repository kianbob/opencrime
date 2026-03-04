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
type ArrestData = { juvenile: JuvRow[] };

export default function JuvenileCrimePage() {
  const arrest = loadData<ArrestData>('arrest-data.json');
  const total = arrest.juvenile?.find(j => j.group === 'TOTAL AGENCIES:');

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

        <h2 className="font-heading">Real Concerns</h2>
        <p>
          That said, the data doesn&apos;t mean there are zero concerns:
        </p>
        <ul>
          <li><strong>Car theft surge:</strong> Juvenile involvement in auto theft genuinely spiked due to the Kia/Hyundai vulnerability and social media glorification</li>
          <li><strong>School violence:</strong> While rare, school shootings and fights generate legitimate safety concerns</li>
          <li><strong>Mental health:</strong> Youth mental health has deteriorated significantly (anxiety, depression, self-harm up 40-60%), which can eventually manifest in behavioral issues</li>
          <li><strong>Pandemic effects:</strong> COVID disrupted school, socialization, and support systems — some communities saw temporary juvenile crime spikes in 2021-2022</li>
        </ul>

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
