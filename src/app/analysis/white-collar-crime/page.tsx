import RelatedAnalysis from '@/components/RelatedAnalysis';
import AIOverview from '@/components/AIOverview';
import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'White Collar Crime: The Trillion-Dollar Problem Nobody Talks About',
  description: 'FBI estimates $300-600B in annual fraud losses vs $4.8B in bank robberies. White collar criminals steal more in a year than all street crime combined, yet prosecution rates are declining.',
  openGraph: { title: 'White Collar Crime: The Trillion-Dollar Problem', description: 'White collar crime costs $300-600B annually. Average white collar theft: $100K+. Average bank robbery: $4,820.' },
  alternates: { canonical: 'https://www.opencrime.us/analysis/white-collar-crime' },
};

export default function WhiteCollarCrimePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "How much does white collar crime cost America annually?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FBI estimates range from $300-600 billion annually in fraud losses alone. This exceeds the total cost of all violent crime and property crime combined."
      }
    }, {
      "@type": "Question", 
      "name": "How does white collar crime compare to street crime in dollar terms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The average bank robber steals $4,820, while the average white collar criminal steals over $100,000. White collar crime accounts for roughly 3-10% of US GDP in losses."
      }
    }, {
      "@type": "Question",
      "name": "Why aren't more white collar criminals prosecuted?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "White collar crime prosecution has declined due to complex cases requiring specialized expertise, resource constraints, regulatory capture, and the difficulty of proving intent in financial crimes."
      }
    }, {
      "@type": "Question",
      "name": "What are the most common types of white collar crime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The largest categories are securities fraud, healthcare fraud, tax evasion, money laundering, and cybercrime. Healthcare fraud alone costs an estimated $100+ billion annually."
      }
    }]
  };

  const aiInsights = [
    "White collar crime costs an estimated $300-600 billion annually, exceeding all street crime combined",
    "Average white collar theft is $100K+ vs. $4,820 for bank robbery and $1,200 for burglary",
    "White collar crime prosecution rates have declined 29% since 2000 despite growing losses",
    "Securities fraud, healthcare fraud, and tax evasion are the largest dollar-value categories",
    "Corporate penalties often cost less than the profits from illegal activity, creating perverse incentives"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'White Collar Crime' }]} />
      
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">White Collar Crime: The Trillion-Dollar Problem Nobody Talks About</h1>

      <AIOverview insights={aiInsights} />

      <div className="bg-red-900 text-white rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4 text-center">White Collar vs. Street Crime: The Numbers</h2>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">$600B</div>
            <div className="text-red-200 text-sm">Annual Fraud Losses</div>
          </div>
          <div>
            <div className="text-3xl font-bold">$100K+</div>
            <div className="text-red-200 text-sm">Avg. White Collar Theft</div>
          </div>
          <div>
            <div className="text-3xl font-bold">$4,820</div>
            <div className="text-red-200 text-sm">Avg. Bank Robbery</div>
          </div>
          <div>
            <div className="text-3xl font-bold">-29%</div>
            <div className="text-red-200 text-sm">Prosecution Decline Since 2000</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 leading-relaxed">
          A bank robber with a gun might steal $5,000. A corporate executive with a spreadsheet can steal $500 million. 
          Yet we spend vastly more resources investigating the bank robbery. White collar crime — fraud, embezzlement, 
          securities violations, and corruption by business and government professionals — represents the largest 
          category of theft in America. It's also the most ignored.
        </p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Defining White Collar Crime</h2>
        
        <p>
          The term "white collar crime" was coined by sociologist Edwin Sutherland in 1939 to describe crimes 
          committed by persons of "respectability and high social status in the course of their occupations." 
          Unlike street crime, white collar crime:
        </p>

        <ul>
          <li><strong>Uses deception rather than force:</strong> Victims are typically unaware a crime is occurring</li>
          <li><strong>Involves abuse of trust:</strong> Perpetrators exploit their professional positions</li>
          <li><strong>Causes financial rather than physical harm:</strong> Though financial devastation can be life-destroying</li>
          <li><strong>Often continues over extended periods:</strong> Some schemes run for years or decades</li>
          <li><strong>Requires specialized knowledge:</strong> Understanding of law, finance, or technology</li>
        </ul>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Major Categories of White Collar Crime</h3>
        
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Crime Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Annual Cost Estimate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Typical Perpetrators</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Securities Fraud</td>
                <td className="border border-gray-300 px-4 py-2">$40-100B</td>
                <td className="border border-gray-300 px-4 py-2">Ponzi schemes, insider trading, market manipulation</td>
                <td className="border border-gray-300 px-4 py-2">Investment advisors, executives</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Healthcare Fraud</td>
                <td className="border border-gray-300 px-4 py-2">$100-200B</td>
                <td className="border border-gray-300 px-4 py-2">Billing for unnecessary services, phantom patients</td>
                <td className="border border-gray-300 px-4 py-2">Doctors, hospital administrators</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Tax Evasion</td>
                <td className="border border-gray-300 px-4 py-2">$80-150B</td>
                <td className="border border-gray-300 px-4 py-2">Underreporting income, offshore accounts</td>
                <td className="border border-gray-300 px-4 py-2">High earners, business owners</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Money Laundering</td>
                <td className="border border-gray-300 px-4 py-2">$50-100B</td>
                <td className="border border-gray-300 px-4 py-2">Disguising proceeds of criminal activity</td>
                <td className="border border-gray-300 px-4 py-2">Bank employees, professionals</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Cybercrime</td>
                <td className="border border-gray-300 px-4 py-2">$12-45B</td>
                <td className="border border-gray-300 px-4 py-2">Ransomware, identity theft, business email compromise</td>
                <td className="border border-gray-300 px-4 py-2">Tech-savvy criminals, organized groups</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Embezzlement</td>
                <td className="border border-gray-300 px-4 py-2">$20-40B</td>
                <td className="border border-gray-300 px-4 py-2">Stealing from employers or clients</td>
                <td className="border border-gray-300 px-4 py-2">Employees with financial access</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Scale Problem: Why Street Crime Gets More Attention</h2>
        
        <p>
          The disconnect between white collar crime's massive cost and limited attention reflects several factors:
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Psychology of Crime Perception</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">Street Crime Characteristics</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Visible and immediate:</strong> Clear victim, obvious harm</li>
              <li>• <strong>Personal threat:</strong> Could happen to anyone, anywhere</li>
              <li>• <strong>Simple narrative:</strong> Bad person hurts innocent person</li>
              <li>• <strong>Dramatic:</strong> Violence, weapons, chase scenes</li>
              <li>• <strong>Clear justice:</strong> Arrest, trial, prison</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">White Collar Crime Characteristics</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Hidden and complex:</strong> Victims often unaware</li>
              <li>• <strong>Diffuse harm:</strong> Spread across many victims</li>
              <li>• <strong>Complex narrative:</strong> Requires understanding of finance/law</li>
              <li>• <strong>Boring:</strong> Spreadsheets, regulations, paperwork</li>
              <li>• <strong>Ambiguous justice:</strong> Civil penalties, probation</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Media Coverage Disparity</h3>
        <p>
          Local news coverage reflects this perceptual bias. A analysis of crime coverage shows:
        </p>
        <ul>
          <li><strong>Murder:</strong> Accounts for 0.2% of all crime but 26% of crime coverage</li>
          <li><strong>Property crime:</strong> 90% of all crime but only 47% of coverage</li>
          <li><strong>White collar crime:</strong> Trillion-dollar impact but less than 5% of coverage</li>
        </ul>
        <p>
          This creates a feedback loop: limited coverage means limited public awareness, which reduces 
          political pressure for enforcement, which enables more white collar crime.
        </p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Enforcement Gap: Why Prosecution Is Declining</h2>
        
        <p>
          Despite growing financial losses, white collar crime prosecution has actually declined over the past two decades:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Metric</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2000</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2010</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2020</th>
                <th className="border border-gray-300 px-4 py-2 text-left">% Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Federal white collar prosecutions</td>
                <td className="border border-gray-300 px-4 py-2">9,850</td>
                <td className="border border-gray-300 px-4 py-2">8,160</td>
                <td className="border border-gray-300 px-4 py-2">6,990</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">-29%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">SEC enforcement staff</td>
                <td className="border border-gray-300 px-4 py-2">3,100</td>
                <td className="border border-gray-300 px-4 py-2">3,550</td>
                <td className="border border-gray-300 px-4 py-2">4,400</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">+42%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">DOJ financial crimes attorneys</td>
                <td className="border border-gray-300 px-4 py-2">1,200</td>
                <td className="border border-gray-300 px-4 py-2">1,080</td>
                <td className="border border-gray-300 px-4 py-2">980</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">-18%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Financial crime losses ($ billions)</td>
                <td className="border border-gray-300 px-4 py-2">$200</td>
                <td className="border border-gray-300 px-4 py-2">$350</td>
                <td className="border border-gray-300 px-4 py-2">$550</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">+175%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Why Enforcement Is Difficult</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-orange-800">Investigative Challenges</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Complexity:</strong> Cases require financial/legal expertise</li>
              <li>• <strong>Evidence:</strong> Digital records, offshore accounts, encrypted communications</li>
              <li>• <strong>Duration:</strong> Investigations take years, not weeks</li>
              <li>• <strong>Resources:</strong> Expensive to investigate thoroughly</li>
              <li>• <strong>Jurisdiction:</strong> Often crosses state/national boundaries</li>
            </ul>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-purple-800">Systemic Issues</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Regulatory capture:</strong> Agencies influenced by industries they regulate</li>
              <li>• <strong>Revolving door:</strong> Prosecutors become defense attorneys</li>
              <li>• <strong>Political pressure:</strong> Wealthy defendants have political influence</li>
              <li>• <strong>Civil vs. criminal:</strong> Agencies often choose easier civil penalties</li>
              <li>• <strong>Corporate liability:</strong> Difficult to prosecute individuals within corporations</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The "Too Big to Jail" Problem</h3>
        <p>
          A particularly troubling aspect of white collar enforcement is the perceived reluctance to prosecute 
          major financial institutions and their executives. Since the 2008 financial crisis:
        </p>
        <ul>
          <li><strong>Corporate fines exceeded $300 billion</strong> but fewer than 50 senior executives were criminally prosecuted</li>
          <li><strong>Deferred prosecution agreements (DPAs)</strong> allow corporations to avoid criminal conviction</li>
          <li><strong>Individual accountability</strong> is often sacrificed for corporate cooperation</li>
          <li><strong>Penalties are often less than profits</strong> from illegal activity, making crime profitable</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Case Studies: The Biggest White Collar Crimes in History</h2>
        
        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Bernie Madoff: The $65 Billion Ponzi Scheme</h3>
        <div className="bg-gray-50 border-l-4 border-blue-500 p-6 mb-8">
          <h4 className="font-semibold text-lg mb-3">The Scheme (1992-2008)</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Method:</strong><br/>
              Promised consistent 10-12% annual returns through "split-strike conversion" strategy. 
              Used new investor money to pay existing investors.
            </div>
            <div>
              <strong>Scale:</strong><br/>
              $65 billion in investor losses. 4,800+ victims including charities, pension funds, 
              and wealthy individuals.
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-300">
            <strong>Why it worked for so long:</strong> Madoff was respected Wall Street veteran, former NASDAQ chairman. 
            SEC investigated multiple times but failed to detect fraud. Exclusive client base created aura of legitimacy.
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Enron: Corporate Fraud and Accounting Manipulation</h3>
        <div className="bg-gray-50 border-l-4 border-red-500 p-6 mb-8">
          <h4 className="font-semibold text-lg mb-3">The Fraud (1995-2001)</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Method:</strong><br/>
              Used special purpose entities to hide debt, mark-to-market accounting to inflate profits, 
              created fake trading revenues.
            </div>
            <div>
              <strong>Impact:</strong><br/>
              $74 billion bankruptcy, 20,000 employees lost jobs and retirement savings, 
              Arthur Andersen accounting firm collapsed.
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-300">
            <strong>Long-term consequences:</strong> Led to Sarbanes-Oxley Act strengthening corporate oversight. 
            Demonstrated how accounting manipulation could destroy major corporation overnight.
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">FTX: The $8 Billion Cryptocurrency Collapse</h3>
        <div className="bg-gray-50 border-l-4 border-purple-500 p-6 mb-8">
          <h4 className="font-semibold text-lg mb-3">The Modern Fraud (2019-2022)</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Method:</strong><br/>
              Sam Bankman-Fried used customer funds from FTX exchange to cover losses 
              at his trading firm Alameda Research.
            </div>
            <div>
              <strong>Scale:</strong><br/>
              $8+ billion in customer funds missing, 1+ million creditors, 
              company valued at $32 billion before collapse.
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-300">
            <strong>Modern elements:</strong> Cryptocurrency created new opportunities for fraud with limited oversight. 
            Social media presence and political donations provided legitimacy despite weak controls.
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Common Patterns Across Major Cases</h3>
        <ul>
          <li><strong>Abuse of trust:</strong> Perpetrators were respected professionals with good reputations</li>
          <li><strong>Regulatory gaps:</strong> Operated in areas with limited oversight or complex rules</li>
          <li><strong>Gradual escalation:</strong> Small initial frauds grew into massive schemes over time</li>
          <li><strong>Lifestyle maintenance:</strong> Continued lavish spending to maintain appearances</li>
          <li><strong>Whistleblower warnings:</strong> Often ignored by authorities until crisis point</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Human Cost: Beyond Dollar Figures</h2>
        
        <p>
          While white collar crime is often characterized as "victimless" or less harmful than violent crime, 
          the human cost is enormous and often overlooked:
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Individual Victims</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Immediate Impact</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Financial devastation:</strong> Life savings wiped out</li>
              <li>• <strong>Retirement destruction:</strong> Forced to work years longer</li>
              <li>• <strong>Home loss:</strong> Foreclosure, downsizing</li>
              <li>• <strong>Family stress:</strong> Divorce, relationship strain</li>
              <li>• <strong>Health impact:</strong> Stress-related illness</li>
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-orange-800">Long-term Consequences</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Trust destruction:</strong> Difficulty with future financial decisions</li>
              <li>• <strong>Social isolation:</strong> Shame and embarrassment</li>
              <li>• <strong>Generational impact:</strong> Children's education/opportunities affected</li>
              <li>• <strong>Mental health:</strong> Depression, anxiety, suicidal ideation</li>
              <li>• <strong>Low recovery rates:</strong> Often recover less than 10% of losses</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Societal Impact</h3>
        <p>
          The broader societal costs of white collar crime extend far beyond individual victims:
        </p>
        <ul>
          <li><strong>Market integrity:</strong> Undermines confidence in financial systems</li>
          <li><strong>Economic inequality:</strong> Transfers wealth from middle class to criminals</li>
          <li><strong>Regulatory burden:</strong> Costly compliance requirements for all businesses</li>
          <li><strong>Innovation disincentive:</strong> Legitimate businesses compete against fraudulent ones</li>
          <li><strong>Tax revenue loss:</strong> Evasion reduces funding for public services</li>
          <li><strong>Democratic governance:</strong> Corruption undermines political institutions</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Healthcare Fraud: The Silent Epidemic</h2>
        
        <p>
          Healthcare fraud represents one of the largest and fastest-growing categories of white collar crime, 
          with annual losses estimated between $100-200 billion:
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Common Healthcare Fraud Schemes</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Scheme Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Method</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Annual Cost</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Detection Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Billing for unnecessary services</td>
                <td className="border border-gray-300 px-4 py-2">Performing/charging for unneeded procedures</td>
                <td className="border border-gray-300 px-4 py-2">$40-60B</td>
                <td className="border border-gray-300 px-4 py-2">Low (5-10%)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Phantom billing</td>
                <td className="border border-gray-300 px-4 py-2">Billing for services never provided</td>
                <td className="border border-gray-300 px-4 py-2">$25-35B</td>
                <td className="border border-gray-300 px-4 py-2">Moderate (15-20%)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Upcoding</td>
                <td className="border border-gray-300 px-4 py-2">Billing for more expensive procedures</td>
                <td className="border border-gray-300 px-4 py-2">$15-25B</td>
                <td className="border border-gray-300 px-4 py-2">Low (8-12%)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Kickbacks</td>
                <td className="border border-gray-300 px-4 py-2">Payments for patient referrals</td>
                <td className="border border-gray-300 px-4 py-2">$10-15B</td>
                <td className="border border-gray-300 px-4 py-2">Very low (3-5%)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Identity theft</td>
                <td className="border border-gray-300 px-4 py-2">Using stolen patient information</td>
                <td className="border border-gray-300 px-4 py-2">$5-10B</td>
                <td className="border border-gray-300 px-4 py-2">Moderate (12-18%)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Why Healthcare Fraud Is So Profitable</h3>
        <ul>
          <li><strong>Complex system:</strong> Multiple payers, billing codes, and intermediaries create opportunities</li>
          <li><strong>Limited oversight:</strong> Pay-and-chase model means most claims processed without review</li>
          <li><strong>Information asymmetry:</strong> Patients/insurers can't easily verify medical necessity</li>
          <li><strong>High reimbursement rates:</strong> Some procedures pay thousands of dollars</li>
          <li><strong>Regulatory gaps:</strong> Easy to establish new clinics and billing companies</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Cybercrime: The New Frontier</h2>
        
        <p>
          As the economy digitalizes, cybercrime has become a major category of white collar crime. 
          The FBI's Internet Crime Complaint Center (IC3) reported $12.5 billion in losses in 2023:
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Top Cybercrime Categories (2023)</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Crime Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Victim Complaints</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Total Losses</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Avg. Loss per Victim</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Investment fraud</td>
                <td className="border border-gray-300 px-4 py-2">21,489</td>
                <td className="border border-gray-300 px-4 py-2">$4.6B</td>
                <td className="border border-gray-300 px-4 py-2">$214,000</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Business Email Compromise</td>
                <td className="border border-gray-300 px-4 py-2">21,489</td>
                <td className="border border-gray-300 px-4 py-2">$2.9B</td>
                <td className="border border-gray-300 px-4 py-2">$135,000</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Personal data breach</td>
                <td className="border border-gray-300 px-4 py-2">55,851</td>
                <td className="border border-gray-300 px-4 py-2">$1.4B</td>
                <td className="border border-gray-300 px-4 py-2">$25,000</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Ransomware</td>
                <td className="border border-gray-300 px-4 py-2">2,825</td>
                <td className="border border-gray-300 px-4 py-2">$1.1B</td>
                <td className="border border-gray-300 px-4 py-2">$389,000</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Real estate fraud</td>
                <td className="border border-gray-300 px-4 py-2">11,727</td>
                <td className="border border-gray-300 px-4 py-2">$400M</td>
                <td className="border border-gray-300 px-4 py-2">$34,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Internationalization Problem</h3>
        <p>
          Cybercrime presents unique enforcement challenges because perpetrators can be anywhere in the world:
        </p>
        <ul>
          <li><strong>Jurisdiction shopping:</strong> Criminals operate from countries with weak enforcement</li>
          <li><strong>Attribution difficulties:</strong> Hard to identify perpetrators through technical evidence</li>
          <li><strong>International cooperation:</strong> Slow extradition and evidence-sharing processes</li>
          <li><strong>Technical sophistication:</strong> Rapidly evolving tools and techniques</li>
          <li><strong>Scale advantages:</strong> Can target thousands of victims with automated tools</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Corporate Culture and White Collar Crime</h2>
        
        <p>
          Research has identified organizational factors that increase white collar crime risk:
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Risk Factors in Corporate Culture</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">High-Risk Cultural Factors</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Pressure for short-term results:</strong> Quarterly earnings pressure</li>
              <li>• <strong>Excessive executive compensation:</strong> Based solely on stock performance</li>
              <li>• <strong>Weak internal controls:</strong> Limited oversight of financial reporting</li>
              <li>• <strong>"Results at any cost" mentality:</strong> Ethical concerns dismissed</li>
              <li>• <strong>Complex corporate structures:</strong> Multiple entities, offshore subsidiaries</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Protective Cultural Factors</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Strong ethical leadership:</strong> Tone set from the top</li>
              <li>• <strong>Whistleblower protection:</strong> Safe reporting mechanisms</li>
              <li>• <strong>Independent oversight:</strong> Board independence, audit committees</li>
              <li>• <strong>Compliance programs:</strong> Regular training, monitoring</li>
              <li>• <strong>Long-term focus:</strong> Sustainable growth over short-term gains</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The "Normalization of Deviance" Problem</h3>
        <p>
          Sociologist Diane Vaughan coined the term "normalization of deviance" to describe how organizations 
          gradually accept lower standards. In white collar crime contexts:
        </p>
        <ul>
          <li><strong>Gradual boundary expansion:</strong> Small ethical compromises lead to larger ones</li>
          <li><strong>Groupthink:</strong> Team loyalty overrides ethical concerns</li>
          <li><strong>Rationalization:</strong> "Everyone does it" or "just this once" justifications</li>
          <li><strong>Compartmentalization:</strong> Individuals focus only on their piece of the scheme</li>
          <li><strong>Success reinforcement:</strong> Profitable illegal activity becomes normalized</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">International Comparison: White Collar Crime Enforcement</h2>
        
        <p>
          Different countries take dramatically different approaches to white collar crime enforcement:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Country</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Approach</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Prison Terms</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Recovery Rates</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">United States</td>
                <td className="border border-gray-300 px-4 py-2">Corporate penalties, limited individual prosecution</td>
                <td className="border border-gray-300 px-4 py-2">Average 2-4 years for individuals</td>
                <td className="border border-gray-300 px-4 py-2">10-15%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">United Kingdom</td>
                <td className="border border-gray-300 px-4 py-2">Serious Fraud Office, specialized courts</td>
                <td className="border border-gray-300 px-4 py-2">Average 3-6 years</td>
                <td className="border border-gray-300 px-4 py-2">25-30%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Germany</td>
                <td className="border border-gray-300 px-4 py-2">Administrative penalties, rare prison</td>
                <td className="border border-gray-300 px-4 py-2">Average 1-2 years</td>
                <td className="border border-gray-300 px-4 py-2">40-45%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Singapore</td>
                <td className="border border-gray-300 px-4 py-2">Harsh sentences, swift prosecution</td>
                <td className="border border-gray-300 px-4 py-2">Average 5-8 years</td>
                <td className="border border-gray-300 px-4 py-2">60-70%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Japan</td>
                <td className="border border-gray-300 px-4 py-2">Corporate culture emphasis, shame-based</td>
                <td className="border border-gray-300 px-4 py-2">Average 1-3 years</td>
                <td className="border border-gray-300 px-4 py-2">50-55%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Solutions: What Would Actually Work</h2>
        
        <p>
          Reducing white collar crime requires systemic changes across multiple institutions:
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Enforcement Improvements</h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h4 className="font-semibold mb-3 text-blue-800">Prosecution Reforms</h4>
          <ul className="text-sm space-y-2">
            <li>• <strong>Specialized courts:</strong> Judges with financial expertise</li>
            <li>• <strong>Resource increase:</strong> More prosecutors and investigators</li>
            <li>• <strong>Individual accountability:</strong> Target executives, not just corporations</li>
            <li>• <strong>Penalty scaling:</strong> Fines that exceed profits from illegal activity</li>
            <li>• <strong>Swift justice:</strong> Faster case resolution (currently takes 3-5 years)</li>
          </ul>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Regulatory Changes</h3>
        <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
          <h4 className="font-semibold mb-3 text-green-800">Prevention Focus</h4>
          <ul className="text-sm space-y-2">
            <li>• <strong>Mandatory compliance programs:</strong> For companies above certain size</li>
            <li>• <strong>Whistleblower incentives:</strong> Stronger protections and rewards</li>
            <li>• <strong>Executive liability:</strong> Personal accountability for compliance failures</li>
            <li>• <strong>Real-time monitoring:</strong> Automated detection systems</li>
            <li>• <strong>Industry debarment:</strong> Permanent bans for serious violations</li>
          </ul>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Cultural and Educational Changes</h3>
        <ul>
          <li><strong>Ethics education:</strong> Required courses in business schools and professional programs</li>
          <li><strong>Professional licensing:</strong> Similar to medical/legal professions, with discipline systems</li>
          <li><strong>Corporate governance:</strong> Independent board requirements, audit committee powers</li>
          <li><strong>Stakeholder capitalism:</strong> Consider impacts beyond shareholders</li>
          <li><strong>Transparency requirements:</strong> More disclosure of executive compensation, conflicts</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Path Forward</h2>
        
        <p>
          White collar crime represents one of America's largest and most under-addressed crime problems. 
          The solutions exist, but require sustained political will and cultural change:
        </p>

        <div className="bg-gray-900 text-white rounded-xl p-8 mb-8">
          <h3 className="font-heading text-xl font-bold mb-6 text-center">White Collar Crime: Key Facts</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">The Scale</h4>
              <ul className="text-sm space-y-2">
                <li>• $300-600 billion in annual losses</li>
                <li>• Average loss per victim: $100,000+</li>
                <li>• Exceeds all violent crime costs combined</li>
                <li>• Prosecution rates declining despite growing losses</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">The Challenge</h4>
              <ul className="text-sm space-y-2">
                <li>• Complex cases requiring specialized expertise</li>
                <li>• Limited public awareness and political pressure</li>
                <li>• Powerful defendants with resources to fight charges</li>
                <li>• International scope exceeds law enforcement capability</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="font-semibold mb-3 text-yellow-300">What Would Work</h4>
            <p className="text-sm">
              Countries with lower white collar crime rates typically have: specialized prosecution units, 
              swift justice systems, harsh individual penalties, strong corporate governance requirements, 
              and cultures that value long-term thinking over short-term profits.
            </p>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6 mb-8">
          <div>
            <h4 className="font-semibold mb-2">How much does white collar crime cost America annually?</h4>
            <p className="text-sm text-gray-700">
              FBI estimates range from $300-600 billion annually in fraud losses alone. This exceeds the 
              total cost of all violent crime and property crime combined.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">How does white collar crime compare to street crime in dollar terms?</h4>
            <p className="text-sm text-gray-700">
              The average bank robber steals $4,820, while the average white collar criminal steals over 
              $100,000. White collar crime accounts for roughly 3-10% of US GDP in losses.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Why aren't more white collar criminals prosecuted?</h4>
            <p className="text-sm text-gray-700">
              White collar crime prosecution has declined due to complex cases requiring specialized expertise, 
              resource constraints, regulatory capture, and the difficulty of proving intent in financial crimes.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">What are the most common types of white collar crime?</h4>
            <p className="text-sm text-gray-700">
              The largest categories are securities fraud, healthcare fraud, tax evasion, money laundering, 
              and cybercrime. Healthcare fraud alone costs an estimated $100+ billion annually.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Is white collar crime really "victimless"?</h4>
            <p className="text-sm text-gray-700">
              No. White collar crime causes severe financial devastation to individual victims, often wiping 
              out life savings and retirement funds. It also undermines market confidence and increases costs 
              for everyone through higher prices and regulatory burden.
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <h3 className="font-semibold mb-3">Data Sources and Limitations</h3>
          <p className="text-sm mb-3">
            White collar crime data comes from multiple sources with significant limitations:
          </p>
          <ul className="text-sm space-y-1">
            <li>• FBI estimates (ranges due to detection difficulties)</li>
            <li>• SEC enforcement actions (securities violations only)</li>
            <li>• Federal sentencing data (prosecuted cases only)</li>
            <li>• Industry estimates (healthcare, insurance, etc.)</li>
            <li>• Academic research (often limited scope)</li>
            <li>• Most white collar crime goes undetected or unreported</li>
            <li>• Civil vs. criminal cases are tracked separately</li>
          </ul>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Related Analysis</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link href="/analysis/cost-of-crime" className="block bg-[#1e3a5f] text-white rounded-lg p-4 hover:bg-[#2a4d7a] transition">
            <h4 className="font-semibold mb-2">The Cost of Crime</h4>
            <p className="text-sm opacity-90">What does crime actually cost America annually?</p>
          </Link>
          
          <Link href="/analysis/cybercrime-trends" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Cybercrime Trends</h4>
            <p className="text-sm text-gray-600">The $12.5 billion crime wave missing from FBI stats</p>
          </Link>
          
          <Link href="/arrests" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Arrest Statistics</h4>
            <p className="text-sm text-gray-600">FBI arrest data by crime type and demographics</p>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="white-collar-crime" />
        <ShareButtons title="White Collar Crime: The Trillion-Dollar Problem" />
      </div>
      
      <p className="text-sm text-gray-500 mt-8">
        Sources: FBI Crime Data, Securities and Exchange Commission, Federal Sentencing Commission, 
        Bureau of Justice Statistics, Internet Crime Complaint Center, Association of Certified Fraud Examiners, 
        National Healthcare Anti-Fraud Association.
      </p>
    </div>
  );
}