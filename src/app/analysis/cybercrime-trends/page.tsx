import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cybercrime Trends — The $12.5 Billion Crime Wave Missing from FBI Stats',
  description: 'FBI IC3 reported $12.5B in cybercrime losses in 2023. Analysis of how cybercrime intersects with traditional crime data and why UCR/NIBRS miss the digital picture.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/cybercrime-trends' },
  openGraph: {
    url: 'https://www.opencrime.us/analysis/cybercrime-trends',
    title: 'Cybercrime Trends — The Crime Wave Missing from FBI Stats',
    description: 'FBI IC3 reported $12.5 billion in cybercrime losses in 2023. Why traditional crime statistics dramatically undercount digital crime.',
  },
};

export default function CybercrimeTrendsPage() {
  const insights = [
    'FBI IC3 received 880,418 complaints in 2023 with $12.5 billion in reported losses — a 22% increase from 2022',
    'Investment fraud alone caused $4.57B in losses — the costliest cybercrime category',
    'Business email compromise (BEC) scams cost $2.9B despite only 21,489 complaints',
    'UCR and NIBRS capture virtually none of this — traditional crime stats miss the digital economy of crime',
    'Americans over 60 lost $3.4B to cybercrime in 2023 — the most victimized age group by dollar amount',
    'Ransomware attacks increased 18% year-over-year, with critical infrastructure as a primary target',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Cybercrime Trends' }]} />

      <div className="mb-6">
        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">ANALYSIS</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Cybercrime Trends: The $12.5 Billion Crime Wave Missing from FBI Stats</h1>
      <p className="text-lg text-gray-600 mb-6">
        The FBI tracks millions of traditional crimes through UCR and NIBRS. But the fastest-growing category of crime —
        cybercrime — barely appears in those statistics. Here&apos;s why the traditional crime picture is incomplete.
      </p>

      <ShareButtons title="Cybercrime Trends — The $12.5B Crime Wave" />

      <AIOverview insights={insights} />

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">The Scale of Cybercrime in 2023</h2>
        <p>
          The FBI&apos;s Internet Crime Complaint Center (IC3) — a separate reporting system from the Uniform Crime Reports —
          received <strong>880,418 complaints</strong> in 2023, with total reported losses of <strong>$12.5 billion</strong>.
          That&apos;s a 22% increase in losses from the $10.3 billion reported in 2022, and a nearly 100% increase from the
          $6.9 billion in 2021.
        </p>
        <p>
          To put this in context: total reported losses from <Link href="/property-crime" className="text-[#1e3a5f] underline">property crime</Link> in
          the traditional FBI statistics — burglary, larceny-theft, motor vehicle theft combined — are estimated at roughly
          $16–18 billion annually. Cybercrime losses are now approaching parity with all traditional property crime combined.
        </p>

        <h2 className="font-heading">Top Cybercrime Categories by Losses (2023)</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Crime Type</th>
              <th className="text-right px-4 py-2">Complaints</th>
              <th className="text-right px-4 py-2">Losses</th>
              <th className="text-right px-4 py-2">Avg Loss</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: 'Investment Fraud', complaints: '39,570', losses: '$4.57B', avg: '$115,494' },
              { type: 'Business Email Compromise', complaints: '21,489', losses: '$2.9B', avg: '$134,952' },
              { type: 'Tech Support Scams', complaints: '37,560', losses: '$924M', avg: '$24,602' },
              { type: 'Personal Data Breach', complaints: '55,851', losses: '$744M', avg: '$13,322' },
              { type: 'Romance/Confidence Fraud', complaints: '17,823', losses: '$652M', avg: '$36,589' },
              { type: 'Ransomware', complaints: '2,825', losses: '$59.6M*', avg: '$21,097' },
              { type: 'Cryptocurrency Fraud', complaints: '69,468', losses: '$3.94B', avg: '$56,721' },
            ].map(r => (
              <tr key={r.type} className="border-t">
                <td className="px-4 py-2 font-medium">{r.type}</td>
                <td className="px-4 py-2 text-right font-mono">{r.complaints}</td>
                <td className="px-4 py-2 text-right font-mono text-red-600 font-semibold">{r.losses}</td>
                <td className="px-4 py-2 text-right font-mono">{r.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-400 p-3">*Ransomware losses are drastically underreported; many organizations pay without reporting. Source: FBI IC3 Annual Report 2023.</p>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">Why Traditional Crime Stats Miss Cybercrime</h2>
        <p>
          When you look at crime data from the FBI&apos;s Uniform Crime Reporting (UCR) program or the newer National
          Incident-Based Reporting System (NIBRS), cybercrime is essentially invisible. Here&apos;s why:
        </p>
        <ol>
          <li>
            <strong>UCR was designed in 1930</strong> for street crime. Its categories — murder, rape, robbery, assault,
            burglary, larceny, motor vehicle theft, arson — were defined when &quot;crime&quot; meant physical acts in physical places.
            There is no category for &quot;phishing&quot; or &quot;ransomware.&quot;
          </li>
          <li>
            <strong>NIBRS is better but still limited.</strong> While NIBRS added fraud and identity theft categories, most
            cybercrime crosses jurisdictions in ways that local police departments — the primary NIBRS reporters — cannot
            track. A victim in Ohio scammed by an offender in Nigeria using servers in Romania doesn&apos;t fit neatly into
            any local agency&apos;s report.
          </li>
          <li>
            <strong>Victims don&apos;t report to police.</strong> Most cybercrime victims report to IC3, the FTC, their bank,
            or nobody at all — not their local police department. The estimated reporting rate for cybercrime is under 15%.
          </li>
          <li>
            <strong>Businesses hide breaches.</strong> Companies that suffer data breaches or ransomware attacks often settle
            quietly rather than report to law enforcement. Mandatory breach reporting laws have helped, but vast underreporting
            persists.
          </li>
        </ol>

        <h2 className="font-heading">The Real Scale: IC3 Only Scratches the Surface</h2>
        <p>
          If IC3&apos;s $12.5 billion seems large, consider that it likely represents a fraction of true losses. The FBI
          estimates that only about 10–15% of cybercrime victims file IC3 complaints. Adjusted for underreporting, true
          US cybercrime losses may exceed <strong>$80–100 billion annually</strong>.
        </p>
        <p>
          Global estimates are even more staggering. Cybersecurity Ventures projects global cybercrime costs at $8 trillion
          in 2023, projected to reach $10.5 trillion by 2025. This would make cybercrime the third-largest &quot;economy&quot; in the
          world after the US and China.
        </p>

        <h2 className="font-heading">Identity Theft: The Bridge Between Digital and Traditional Crime</h2>
        <p>
          Identity theft illustrates how cybercrime fuels traditional crime and vice versa:
        </p>
        <ul>
          <li>The FTC received <strong>1.4 million identity theft reports</strong> in 2023</li>
          <li>Stolen identities are used to open fraudulent credit accounts, file false tax returns, and obtain benefits</li>
          <li>Identity data stolen in breaches fuels <Link href="/analysis/organized-retail-theft" className="text-[#1e3a5f] underline">organized retail theft</Link> — stolen credit card data is used to purchase goods for resale</li>
          <li>Synthetic identity fraud — combining real and fake information — costs lenders an estimated $6 billion annually</li>
        </ul>
        <p>
          The <Link href="/property-crime" className="text-[#1e3a5f] underline">property crime statistics</Link> on this site capture
          burglary, larceny, and car theft. They do not capture the fact that a single data breach can expose millions of
          people to financial loss. The SolarWinds hack (2020), the Colonial Pipeline ransomware attack (2021), and the
          MOVEit breach (2023) each caused more aggregate financial damage than many cities&apos; entire annual property crime totals.
        </p>

        <h2 className="font-heading">Ransomware: The Corporate Hostage Crisis</h2>
        <p>
          Ransomware attacks — where criminals encrypt an organization&apos;s data and demand payment — have become one of the
          most disruptive forms of crime:
        </p>
        <ul>
          <li>IC3 received 2,825 ransomware complaints in 2023, up 18% from 2022</li>
          <li>The average ransom payment exceeded $1.5 million in 2023 (Sophos survey)</li>
          <li>Total estimated ransomware costs including downtime, recovery, and ransom: $20+ billion globally</li>
          <li>Critical infrastructure — hospitals, water systems, schools — are increasingly targeted</li>
          <li>The Change Healthcare attack (2024) disrupted prescription processing for millions of Americans</li>
        </ul>
        <p>
          Yet in the FBI&apos;s traditional crime reports, none of this appears. A hospital that pays $10 million in ransom
          and spends $50 million recovering doesn&apos;t show up in UCR or NIBRS data.
        </p>

        <h2 className="font-heading">Cryptocurrency and the New Fraud Economy</h2>
        <p>
          Cryptocurrency-related fraud has exploded, with IC3 reporting $3.94 billion in losses across 69,468 complaints
          in 2023. The most common schemes include:
        </p>
        <ul>
          <li><strong>&quot;Pig butchering&quot; scams:</strong> Romance or investment scams where victims are gradually encouraged to invest larger amounts in fake cryptocurrency platforms</li>
          <li><strong>Fake exchanges:</strong> Sophisticated websites mimicking legitimate crypto exchanges</li>
          <li><strong>DeFi exploits:</strong> Hackers exploiting vulnerabilities in decentralized finance protocols</li>
          <li><strong>Money laundering:</strong> Crypto used to move proceeds from drug trafficking and other crimes</li>
        </ul>
        <p>
          Many of these victims are educated professionals. The average loss in investment fraud was $115,494 — these are
          not small-dollar crimes.
        </p>

        <h2 className="font-heading">Age and Victimization: Elders Hit Hardest</h2>
        <p>
          The IC3 data reveals a clear age pattern in cybercrime victimization:
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Age Group</th>
              <th className="text-right px-4 py-2">Complaints</th>
              <th className="text-right px-4 py-2">Total Losses</th>
            </tr>
          </thead>
          <tbody>
            {[
              { age: 'Under 20', complaints: '18,068', losses: '$40.7M' },
              { age: '20–29', complaints: '68,462', losses: '$539M' },
              { age: '30–39', complaints: '107,419', losses: '$1.26B' },
              { age: '40–49', complaints: '112,962', losses: '$1.69B' },
              { age: '50–59', complaints: '104,890', losses: '$2.18B' },
              { age: '60+', complaints: '101,068', losses: '$3.4B' },
            ].map(r => (
              <tr key={r.age} className={`border-t ${r.age === '60+' ? 'bg-red-50 font-semibold' : ''}`}>
                <td className="px-4 py-2">{r.age}</td>
                <td className="px-4 py-2 text-right font-mono">{r.complaints}</td>
                <td className="px-4 py-2 text-right font-mono">{r.losses}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-400 p-3">Source: FBI IC3 Annual Report 2023.</p>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <p>
          Americans over 60 reported <strong>$3.4 billion in losses</strong> — more than any other age group. Elder fraud
          is particularly devastating because victims often lose retirement savings with no way to recover. Tech support
          scams and romance fraud disproportionately target older adults.
        </p>

        <h2 className="font-heading">The Measurement Gap: What We Need</h2>
        <p>
          The disconnect between cybercrime reality and traditional crime statistics creates a dangerous blind spot:
        </p>
        <ul>
          <li><strong>Resource allocation:</strong> Police departments and legislators allocate resources based on UCR/NIBRS data — data that excludes the fastest-growing crime category</li>
          <li><strong>Public perception:</strong> When people say &quot;crime is down,&quot; they&apos;re right about street crime. But they&apos;re ignoring the $12.5B+ in cybercrime losses</li>
          <li><strong>The <Link href="/analysis/crime-decline" className="text-[#1e3a5f] underline">great crime decline</Link> narrative:</strong> The 52% drop in violent crime since 1991 is real and significant. But some crime hasn&apos;t declined — it has migrated online</li>
        </ul>
        <p>
          A more complete picture of American crime would integrate IC3 data, FTC fraud reports, SEC enforcement actions,
          and CISA incident reports with traditional UCR/NIBRS data. Until then, we&apos;re measuring 20th-century crime with
          20th-century tools while 21st-century crime surges past us.
        </p>

        <h2 className="font-heading">The Bottom Line</h2>
        <p>
          Cybercrime is not a niche concern — it&apos;s a $12.5 billion (reported) and potentially $100 billion (actual) annual
          problem that barely appears in the FBI&apos;s primary crime statistics. The UCR program that generates the data on this
          site was designed for a world of street robberies and home burglaries. That world still exists, but it&apos;s increasingly
          overshadowed by a digital crime economy that traditional measurement systems cannot capture.
        </p>
        <p>
          When you browse the crime data on OpenCrime, remember: you&apos;re seeing the crimes that police departments report.
          The online crimes — the $4.57B in investment fraud, the $2.9B in business email compromise, the billions in
          ransomware costs — are largely invisible here. The full picture of American crime is bigger than any single
          dataset can show.
        </p>

        <h2 className="font-heading">Related Analysis</h2>
        <ul>
          <li><Link href="/property-crime">Property Crime Statistics 2024</Link></li>
          <li><Link href="/analysis/crime-decline">The Great Crime Decline</Link></li>
          <li><Link href="/analysis/organized-retail-theft">Organized Retail Theft</Link></li>
          <li><Link href="/analysis/property-crime-surge">The Property Crime Paradox</Link></li>
          <li><Link href="/crime-rate">US Crime Rate 2024</Link></li>
        </ul>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        Sources: FBI Internet Crime Complaint Center (IC3) Annual Report 2023; Federal Trade Commission Consumer Sentinel
        Network; Cybersecurity &amp; Infrastructure Security Agency (CISA). Traditional crime data from FBI UCR/NIBRS.
      </p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Cybercrime Trends: The $12.5 Billion Crime Wave Missing from FBI Stats',
        description: 'Analysis of how cybercrime intersects with traditional crime data, and why UCR/NIBRS miss the digital crime picture.',
        url: 'https://www.opencrime.us/analysis/cybercrime-trends',
        author: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        datePublished: '2025-03-01',
        dateModified: '2025-03-01',
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How much money is lost to cybercrime annually?', acceptedAnswer: { '@type': 'Answer', text: 'The FBI IC3 reported $12.5 billion in cybercrime losses in 2023, up 22% from 2022. However, with estimated reporting rates of only 10-15%, true losses may exceed $80-100 billion annually in the US alone.' }},
          { '@type': 'Question', name: 'Why doesn\'t cybercrime appear in FBI crime statistics?', acceptedAnswer: { '@type': 'Answer', text: 'The FBI UCR/NIBRS system was designed for traditional street crime (murder, robbery, burglary, etc.). Cybercrime crosses jurisdictions, victims report to IC3 rather than local police, and there are no UCR categories for phishing, ransomware, or cryptocurrency fraud.' }},
          { '@type': 'Question', name: 'What is the most costly type of cybercrime?', acceptedAnswer: { '@type': 'Answer', text: 'Investment fraud was the costliest category in 2023 at $4.57 billion in losses. Cryptocurrency-related fraud totaled $3.94 billion. Business email compromise caused $2.9 billion in losses despite relatively few complaints.' }},
          { '@type': 'Question', name: 'Who is most vulnerable to cybercrime?', acceptedAnswer: { '@type': 'Answer', text: 'Americans over 60 lost $3.4 billion to cybercrime in 2023 — the highest dollar amount of any age group. They are particularly targeted by tech support scams and romance fraud.' }},
        ],
      })}} />

      <RelatedAnalysis currentSlug="cybercrime-trends" />
    </div>
  );
}
