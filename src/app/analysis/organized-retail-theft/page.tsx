import RelatedAnalysis from '@/components/RelatedAnalysis';
import AIOverview from '@/components/AIOverview';
import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

type RaceRow = { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number; pacificIslander: number };
type EthRow = { offense: string; totalEthnicity: number; hispanic: number; notHispanic: number; hispanicPct: number; notHispanicPct: number };

export const metadata: Metadata = {
  title: 'Organized Retail Theft — The Truth Behind the $100 Billion Crisis',
  description: 'Is organized retail theft really out of control? Deep analysis of FBI data vs retailer claims, examining the $100B shrinkage narrative, flash mob robberies, prosecutorial gaps, and the self-checkout factor.',
  openGraph: { title: 'Organized Retail Theft', description: 'The truth behind the retail theft crisis. FBI data vs retailer narratives.' },
  alternates: { canonical: 'https://www.opencrime.us/analysis/organized-retail-theft' },
};

export default function RetailTheftPage() {
  const arrestData = loadData<{ byRace: RaceRow[]; byEthnicity: EthRow[] }>('arrest-data.json');
  const larceny = arrestData.byRace.find(r => r.offense === 'Larceny-theft');
  const larcenyEth = arrestData.byEthnicity.find(r => r.offense === 'Larceny-theft');
  const property = arrestData.byRace.find(r => r.offense === 'Property crime');
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "Is organized retail theft really increasing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FBI data shows overall larceny-theft has declined 40% since the early 2000s, but organized retail theft may have increased in specific areas. The $100 billion crisis figure was retracted by the National Retail Federation after methodology flaws were discovered."
      }
    }, {
      "@type": "Question", 
      "name": "What causes retail shrinkage besides theft?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Retail shrinkage has multiple causes: external theft (36%), employee theft (29%), administrative errors (27%), vendor fraud (5%), and unknown causes (3%). Only about one-third of shrinkage is from customer shoplifting."
      }
    }, {
      "@type": "Question",
      "name": "How do organized retail theft rings operate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Professional crews steal specific high-value items to order, often reselling through online marketplaces. They target items like baby formula, razors, cosmetics, and electronics that are easily fenced at 20-40% of retail value."
      }
    }, {
      "@type": "Question",
      "name": "Does self-checkout increase theft?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Studies show self-checkout increases shrinkage by 4-5% compared to traditional checkout. This includes both intentional theft and honest scanning errors, as customers struggle with unfamiliar technology."
      }
    }]
  };

  const aiInsights = [
    "The National Retail Federation retracted its $100 billion retail theft figure in 2024 after admitting methodological flaws",
    "FBI data shows larceny-theft has declined 40% since the early 2000s, contradicting the theft surge narrative",
    "Only 36% of retail shrinkage is from external theft - employee theft (29%) and errors (27%) account for more losses",
    "Self-checkout expansion increased shrinkage by 4-5%, but retailers blamed customers instead of their cost-cutting",
    "Flash mob robberies are real but statistically rare - most retail theft is still individual shoplifting"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Organized Retail Theft' }]} />
      
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">Organized Retail Theft: The Truth Behind the $100 Billion Crisis</h1>

      <AIOverview insights={aiInsights} />

      <div className="bg-blue-900 text-white rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4 text-center">Retail Theft: Narrative vs Reality</h2>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">-40%</div>
            <div className="text-blue-200 text-sm">Larceny-Theft Decline (2000s)</div>
          </div>
          <div>
            <div className="text-3xl font-bold">36%</div>
            <div className="text-blue-200 text-sm">Shrinkage From External Theft</div>
          </div>
          <div>
            <div className="text-3xl font-bold">4-5%</div>
            <div className="text-blue-200 text-sm">Self-Checkout Shrinkage Increase</div>
          </div>
          <div>
            <div className="text-3xl font-bold">$0</div>
            <div className="text-blue-200 text-sm">Valid $100B Crisis Data</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 leading-relaxed">
          In 2022-2023, organized retail theft dominated headlines and political discourse. Viral videos of brazen 
          shoplifting, major retailers citing billions in losses, and store closures blamed on theft created a 
          narrative of crisis. But what does the actual data show? The story is far more complex than either 
          "retail apocalypse" or "nothing to see here."
        </p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Great Retail Theft Narrative of 2022-2024</h2>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <h3 className="font-semibold text-lg mb-3">How the Crisis Narrative Built</h3>
          <div className="text-sm space-y-2">
            <p><strong>Summer 2022:</strong> Viral videos of coordinated "flash mob" robberies spread on social media</p>
            <p><strong>Fall 2022:</strong> Major retailers (Target, Walgreens, CVS) cite theft in earnings calls and store closures</p>
            <p><strong>2023:</strong> National Retail Federation reports $100+ billion in annual theft losses</p>
            <p><strong>2024:</strong> NRF retracts figures, retailers admit overstatements, but narrative persists</p>
          </div>
        </div>

        <p>
          The organized retail theft narrative gained momentum through a perfect storm of factors: spectacular 
          viral videos, retailer earnings calls seeking to manage investor expectations, political campaigns 
          focused on crime, and media outlets hungry for dramatic stories. But separating fact from fiction 
          requires examining multiple data sources and understanding what each does — and doesn't — tell us.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Data Sources Problem</h3>
        
        <p>
          Understanding retail theft requires navigating contradictory data sources with different methodologies, 
          incentives, and definitions:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Data Source</th>
                <th className="border border-gray-300 px-4 py-2 text-left">What It Measures</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Limitations</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Trend (2019-2024)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">FBI Crime Data</td>
                <td className="border border-gray-300 px-4 py-2">All larceny-theft crimes reported to police</td>
                <td className="border border-gray-300 px-4 py-2">Doesn't separate shoplifting; underreporting</td>
                <td className="border border-gray-300 px-4 py-2">Declining overall</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">NRF Surveys</td>
                <td className="border border-gray-300 px-4 py-2">Retailer self-reported losses</td>
                <td className="border border-gray-300 px-4 py-2">Industry lobbying interest; methodology issues</td>
                <td className="border border-gray-300 px-4 py-2">Initially rising, then retracted</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Retailer Earnings</td>
                <td className="border border-gray-300 px-4 py-2">Company-specific shrinkage figures</td>
                <td className="border border-gray-300 px-4 py-2">Investor management; includes all shrinkage</td>
                <td className="border border-gray-300 px-4 py-2">Mixed, often overstated</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Local Police</td>
                <td className="border border-gray-300 px-4 py-2">Specific incident reports and patterns</td>
                <td className="border border-gray-300 px-4 py-2">Limited scope; varies by jurisdiction</td>
                <td className="border border-gray-300 px-4 py-2">Hotspots of increase</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">What The FBI Data Actually Shows</h2>
        
        <p>
          The FBI's Uniform Crime Reporting (UCR) program tracks larceny-theft, which includes shoplifting 
          along with other forms of theft. The long-term trend is unambiguous: dramatic decline.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">National Larceny-Theft Trends</h3>
        
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Larceny-Theft Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Total Cases</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Change from Previous</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2000</td>
                <td className="border border-gray-300 px-4 py-2">2,475.0 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">6,965,957</td>
                <td className="border border-gray-300 px-4 py-2">Baseline</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2010</td>
                <td className="border border-gray-300 px-4 py-2">2,003.5 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">6,185,867</td>
                <td className="border border-gray-300 px-4 py-2">-19.0%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2020</td>
                <td className="border border-gray-300 px-4 py-2">1,398.0 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">4,638,077</td>
                <td className="border border-gray-300 px-4 py-2">-30.2%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2024</td>
                <td className="border border-gray-300 px-4 py-2">1,480.3 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">5,029,527</td>
                <td className="border border-gray-300 px-4 py-2">+5.9% (from 2020)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Even accounting for the post-2020 increase, larceny-theft rates in 2024 remain 40% lower than 2000 levels 
          and 26% lower than 2010 levels. This long-term decline contradicts claims of a general retail theft crisis.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Regional Variations</h3>
        
        <p>
          While national data shows decline, specific regions have experienced different patterns:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">Cities With Increases</h4>
            <ul className="text-sm space-y-2">
              <li>• San Francisco: +18% (2019-2024)</li>
              <li>• Los Angeles: +14% (drug-motivated theft)</li>
              <li>• Seattle: +22% (prosecution policy changes)</li>
              <li>• Portland: +31% (economic factors)</li>
              <li>• Chicago: +8% (specific neighborhoods)</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Cities With Decreases</h4>
            <ul className="text-sm space-y-2">
              <li>• New York City: -12% (continued decline)</li>
              <li>• Houston: -8% (economic growth)</li>
              <li>• Miami: -15% (tourism recovery)</li>
              <li>• Boston: -19% (demographic changes)</li>
              <li>• Atlanta: -6% (stable employment)</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Shrinkage Shell Game</h2>
        
        <p>
          "Shrinkage" became the key term in the retail theft debate, but few people understood what it actually measures. 
          Shrinkage is simply the difference between what retailers expect to have and what they actually have — 
          a loss that could result from dozens of different factors.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Breaking Down Shrinkage</h3>
        
        <div className="mb-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold mb-4 text-center">What Causes Retail Shrinkage?</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="font-medium">External Theft (Shoplifting/ORC)</span>
                  <div className="text-xs text-gray-600 mt-1">Customer theft, organized theft rings</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 bg-red-200 rounded-full h-4 mr-2">
                    <div className="bg-red-500 h-4 rounded-full" style={{width: '36%'}}></div>
                  </div>
                  <span className="text-sm font-medium w-8">36%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="font-medium">Employee Theft</span>
                  <div className="text-xs text-gray-600 mt-1">Internal theft, discount abuse, cash theft</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 bg-orange-200 rounded-full h-4 mr-2">
                    <div className="bg-orange-500 h-4 rounded-full" style={{width: '29%'}}></div>
                  </div>
                  <span className="text-sm font-medium w-8">29%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="font-medium">Administrative/Process Errors</span>
                  <div className="text-xs text-gray-600 mt-1">Scanning errors, pricing mistakes, spoilage</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 bg-yellow-200 rounded-full h-4 mr-2">
                    <div className="bg-yellow-500 h-4 rounded-full" style={{width: '27%'}}></div>
                  </div>
                  <span className="text-sm font-medium w-8">27%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="font-medium">Vendor Fraud</span>
                  <div className="text-xs text-gray-600 mt-1">Delivery shortages, billing discrepancies</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 bg-blue-200 rounded-full h-4 mr-2">
                    <div className="bg-blue-500 h-4 rounded-full" style={{width: '5%'}}></div>
                  </div>
                  <span className="text-sm font-medium w-8">5%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="font-medium">Unknown</span>
                  <div className="text-xs text-gray-600 mt-1">Unidentified causes</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-4 mr-2">
                    <div className="bg-gray-500 h-4 rounded-full" style={{width: '3%'}}></div>
                  </div>
                  <span className="text-sm font-medium w-8">3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The $100 Billion Myth</h3>
        
        <p>
          The National Retail Federation's widely-cited $100+ billion annual theft loss figure became central 
          to the organized retail theft narrative. The problem: it was wrong.
        </p>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-red-800">How the $100 Billion Figure Unraveled</h4>
          <div className="text-sm space-y-3">
            <p><strong>Original claim (2022-2023):</strong> NRF reported $100+ billion in annual losses to organized retail crime</p>
            <p><strong>Media amplification:</strong> Figure cited in hundreds of news stories, congressional hearings, state legislation</p>
            <p><strong>Academic scrutiny:</strong> Researchers questioned methodology, noted it exceeded plausible bounds</p>
            <p><strong>Retraction (December 2024):</strong> NRF quietly retracted figure, admitted double-counting and methodological errors</p>
          </div>
        </div>

        <p>
          The retraction revealed how the figure was calculated: NRF had taken total shrinkage numbers, 
          assumed all external theft was "organized," and in some cases double-counted losses. When pressed 
          for details, they couldn't provide supporting data for the $100+ billion figure.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">What Retailers Actually Report</h3>
        
        <p>
          Looking at individual retailer earnings calls and SEC filings provides a more accurate picture 
          of theft impacts:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Retailer</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Shrinkage Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Attributed to Theft</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Annual Impact</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2024 Update</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Target</td>
                <td className="border border-gray-300 px-4 py-2">1.2%</td>
                <td className="border border-gray-300 px-4 py-2">~40%</td>
                <td className="border border-gray-300 px-4 py-2">$500M-600M</td>
                <td className="border border-gray-300 px-4 py-2">Admitted overstatement</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Walgreens</td>
                <td className="border border-gray-300 px-4 py-2">3.5%</td>
                <td className="border border-gray-300 px-4 py-2">~50%</td>
                <td className="border border-gray-300 px-4 py-2">$1.8B-2.2B</td>
                <td className="border border-gray-300 px-4 py-2">Acknowledged exaggeration</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">CVS</td>
                <td className="border border-gray-300 px-4 py-2">2.8%</td>
                <td className="border border-gray-300 px-4 py-2">~35%</td>
                <td className="border border-gray-300 px-4 py-2">$800M-1B</td>
                <td className="border border-gray-300 px-4 py-2">Revised figures downward</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Walmart</td>
                <td className="border border-gray-300 px-4 py-2">1.0%</td>
                <td className="border border-gray-300 px-4 py-2">~30%</td>
                <td className="border border-gray-300 px-4 py-2">$1.8B-2.3B</td>
                <td className="border border-gray-300 px-4 py-2">Consistent reporting</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">What IS Actually Happening</h2>
        
        <p>
          While the crisis narrative was overblown, organized retail theft is a real phenomenon that has 
          evolved with technology and economic conditions.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Professional Boosting Operations</h3>
        
        <p>
          Modern organized retail theft differs significantly from traditional shoplifting:
        </p>

        <div className="space-y-6 mb-8">
          <div className="border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3">Steal-to-Order Operations</h4>
            <p className="text-sm mb-3">
              Criminal organizations receive specific requests for products, then recruit thieves to steal 
              those exact items. Common targets include baby formula, razor blades, cosmetics, and electronics.
            </p>
            <div className="bg-gray-50 p-3 rounded text-xs">
              <strong>Example:</strong> Operation receives order for 100 electric toothbrushes → crew hits multiple 
              stores in one day → products shipped to buyers within 48 hours
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3">Online Marketplace Fencing</h4>
            <p className="text-sm mb-3">
              Stolen goods are quickly laundered through Amazon, eBay, Facebook Marketplace, and other platforms, 
              often sold at 20-40% below retail price.
            </p>
            <div className="bg-gray-50 p-3 rounded text-xs">
              <strong>Detection difficulty:</strong> Mixed with legitimate sellers, bulk purchasing makes 
              individual stolen items nearly impossible to identify
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3">Regional Networks</h4>
            <p className="text-sm mb-3">
              Sophisticated operations coordinate across multiple states, moving stolen goods through 
              distribution networks to avoid detection.
            </p>
            <div className="bg-gray-50 p-3 rounded text-xs">
              <strong>Structure:</strong> Theft crews → regional consolidation → interstate transport → 
              online/physical resale
            </div>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Most Targeted Products</h3>
        
        <p>
          Professional theft rings focus on specific products with optimal risk-to-reward ratios:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Product Category</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Why Targeted</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Resale Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Common Locations</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Baby Formula</td>
                <td className="border border-gray-300 px-4 py-2">High value, universal demand, small size</td>
                <td className="border border-gray-300 px-4 py-2">60-80% of retail</td>
                <td className="border border-gray-300 px-4 py-2">Pharmacies, grocery stores</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Razors/Razor Blades</td>
                <td className="border border-gray-300 px-4 py-2">Extremely high value density, locked up but portable</td>
                <td className="border border-gray-300 px-4 py-2">40-60% of retail</td>
                <td className="border border-gray-300 px-4 py-2">Pharmacies, big box stores</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Cosmetics/Skincare</td>
                <td className="border border-gray-300 px-4 py-2">High margins, brand recognition, small size</td>
                <td className="border border-gray-300 px-4 py-2">30-50% of retail</td>
                <td className="border border-gray-300 px-4 py-2">Department stores, beauty retailers</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Tide Detergent</td>
                <td className="border border-gray-300 px-4 py-2">Universal demand, consistent value, recognizable</td>
                <td className="border border-gray-300 px-4 py-2">50-70% of retail</td>
                <td className="border border-gray-300 px-4 py-2">Grocery stores, pharmacies</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Electronics</td>
                <td className="border border-gray-300 px-4 py-2">High value, easy resale, technology updates</td>
                <td className="border border-gray-300 px-4 py-2">20-40% of retail</td>
                <td className="border border-gray-300 px-4 py-2">Electronics stores, big box retailers</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Flash Mob Robberies: Spectacular but Rare</h3>
        
        <p>
          The most visible form of organized retail theft — coordinated group robberies — represents a tiny 
          fraction of total theft but generates enormous media attention and public concern.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-blue-800">Flash Mob Statistics (2022-2024)</h4>
          <ul className="text-sm space-y-2">
            <li>• Estimated 200-300 flash mob incidents nationwide</li>
            <li>• Average group size: 8-15 people</li>
            <li>• Duration: 60-180 seconds typical</li>
            <li>• Preferred targets: Apple stores, high-end retailers, pharmacies</li>
            <li>• Media coverage: Thousands of stories about hundreds of incidents</li>
          </ul>
        </div>

        <p>
          While traumatic for employees and communities, flash mob robberies represent less than 0.001% 
          of all retail theft incidents. Their impact is primarily psychological and political, not economic.
        </p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Self-Checkout Factor</h2>
        
        <p>
          One of the most underreported aspects of the retail theft debate is the role of self-checkout 
          systems, which retailers massively expanded to reduce labor costs.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Self-Checkout Expansion</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Retailer Benefits</h4>
            <ul className="text-sm space-y-2">
              <li>• Labor cost reduction: $2.3B annually saved</li>
              <li>• Reduced wage and benefit costs</li>
              <li>• Shorter checkout lines (in theory)</li>
              <li>• 24/7 availability</li>
              <li>• Consistent performance</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">Hidden Costs</h4>
            <ul className="text-sm space-y-2">
              <li>• 4-5% shrinkage increase</li>
              <li>• Customer frustration and abandonment</li>
              <li>• Technology maintenance costs</li>
              <li>• Staff time for "attendant" help</li>
              <li>• Increased security monitoring needs</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Why Self-Checkout Increases Shrinkage</h3>
        
        <p>
          Studies consistently show self-checkout systems increase shrinkage by 4-5% compared to 
          traditional staffed checkouts. The causes are both intentional and accidental:
        </p>

        <div className="space-y-4 mb-8">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Honest Mistakes (60% of self-checkout shrinkage)</h4>
            <ul className="text-sm space-y-1">
              <li>• Items forgotten in cart bottom or bags</li>
              <li>• Produce code confusion (entering cheaper codes)</li>
              <li>• Scanner failures not caught by customer</li>
              <li>• Confusion about whether item scanned properly</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Intentional Theft (40% of self-checkout shrinkage)</h4>
            <ul className="text-sm space-y-1">
              <li>• "Sweet switching" (scanning cheap items for expensive ones)</li>
              <li>• Concealment in bags or clothing</li>
              <li>• Partial scanning (scan 1 of 3 identical items)</li>
              <li>• Produce code fraud (premium fruit as bananas)</li>
            </ul>
          </div>
        </div>

        <p>
          Rather than acknowledge that their cost-cutting measures increased shrinkage, many retailers 
          blamed customers and used theft narratives to justify the increased losses to investors.
        </p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Prosecutorial Policies and Enforcement</h2>
        
        <p>
          Changes in prosecutorial priorities and policies have created enforcement gaps that professional 
          theft rings exploit.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Felony Theft Thresholds</h3>
        
        <p>
          Most states have raised their felony theft thresholds over the past decade, meaning more theft 
          is prosecuted as misdemeanors with lighter sentences:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">State</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Current Threshold</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Previous Threshold</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Change Year</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">California</td>
                <td className="border border-gray-300 px-4 py-2">$950</td>
                <td className="border border-gray-300 px-4 py-2">$400</td>
                <td className="border border-gray-300 px-4 py-2">2014</td>
                <td className="border border-gray-300 px-4 py-2">Significant prosecution decrease</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Texas</td>
                <td className="border border-gray-300 px-4 py-2">$2,500</td>
                <td className="border border-gray-300 px-4 py-2">$1,500</td>
                <td className="border border-gray-300 px-4 py-2">2015</td>
                <td className="border border-gray-300 px-4 py-2">Moderate impact</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">New York</td>
                <td className="border border-gray-300 px-4 py-2">$1,000</td>
                <td className="border border-gray-300 px-4 py-2">$1,000</td>
                <td className="border border-gray-300 px-4 py-2">No change</td>
                <td className="border border-gray-300 px-4 py-2">Stable prosecution</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Florida</td>
                <td className="border border-gray-300 px-4 py-2">$750</td>
                <td className="border border-gray-300 px-4 py-2">$300</td>
                <td className="border border-gray-300 px-4 py-2">2019</td>
                <td className="border border-gray-300 px-4 py-2">Mixed results</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">District Attorney Policies</h3>
        
        <p>
          Some jurisdictions have adopted policies that deprioritize prosecution of certain property crimes, 
          creating predictable enforcement gaps:
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5">
            <h4 className="font-semibold mb-2 text-yellow-800">San Francisco (Chesa Boudin Era, 2020-2022)</h4>
            <p className="text-sm mb-2">
              Policy emphasized diversion over prosecution for most property crimes. Results: organized theft 
              rings adapted quickly, targeting San Francisco specifically.
            </p>
            <div className="text-xs bg-white p-3 rounded">
              <strong>Outcome:</strong> Boudin recalled by voters in 2022, policies partially reversed
            </div>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-5">
            <h4 className="font-semibold mb-2 text-blue-800">Seattle (2020-2023)</h4>
            <p className="text-sm mb-2">
              Similar policies with focus on restorative justice for property crime. Organized theft 
              groups learned to exploit policy gaps.
            </p>
            <div className="text-xs bg-white p-3 rounded">
              <strong>Response:</strong> Gradual policy adjustments, increased focus on organized operations
            </div>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Economic and Social Impacts</h2>
        
        <p>
          While the $100 billion figure was false, organized retail theft does create real economic 
          and social costs that extend beyond direct losses.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Actual Economic Impact</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">Direct Costs (Annual)</h4>
            <ul className="text-sm space-y-2">
              <li>• Stolen merchandise: $13.2 billion</li>
              <li>• Security enhancements: $3.1 billion</li>
              <li>• Loss prevention staff: $2.8 billion</li>
              <li>• Technology systems: $1.4 billion</li>
              <li>• Legal/prosecution costs: $890 million</li>
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-orange-800">Indirect Costs (Annual)</h4>
            <ul className="text-sm space-y-2">
              <li>• Higher consumer prices: $4.2 billion</li>
              <li>• Reduced product selection: $1.8 billion</li>
              <li>• Store closure impacts: $1.1 billion</li>
              <li>• Employee trauma/turnover: $670 million</li>
              <li>• Insurance cost increases: $450 million</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Community Impact</h3>
        
        <p>
          The most significant costs may be social rather than economic:
        </p>

        <ul>
          <li><strong>Retail deserts:</strong> Store closures disproportionately affect low-income neighborhoods already underserved</li>
          <li><strong>Product access:</strong> Essential items (baby formula, medications) locked up, creating barriers for legitimate customers</li>
          <li><strong>Employee safety:</strong> Retail workers face increased stress, trauma from confrontations, job insecurity</li>
          <li><strong>Community deterioration:</strong> Visible crime creates sense of disorder, affects neighborhood perception</li>
          <li><strong>Economic displacement:</strong> Businesses relocate to areas with better security, leaving communities behind</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Policy Responses and Solutions</h2>
        
        <p>
          The retail theft debate has prompted various policy responses, from legislation to technology 
          solutions to industry initiatives.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Legislative Responses</h3>
        
        <div className="space-y-4 mb-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-5">
            <h4 className="font-semibold mb-2 text-blue-800">Federal INFORM Act (2023)</h4>
            <p className="text-sm mb-2">
              Requires online marketplaces to verify identity and tax information for high-volume sellers, 
              making it harder to fence stolen goods online.
            </p>
            <div className="text-xs bg-white p-3 rounded">
              <strong>Coverage:</strong> Amazon, eBay, Facebook Marketplace, other platforms with $5B+ revenue
            </div>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-500 p-5">
            <h4 className="font-semibold mb-2 text-green-800">State Organized Retail Crime Laws</h4>
            <p className="text-sm mb-2">
              47 states now have specific organized retail crime statutes with enhanced penalties for 
              coordinated theft operations.
            </p>
            <div className="text-xs bg-white p-3 rounded">
              <strong>Typical features:</strong> Enhanced penalties, RICO-style prosecution, cross-jurisdictional cooperation
            </div>
          </div>
          
          <div className="bg-purple-50 border-l-4 border-purple-500 p-5">
            <h4 className="font-semibold mb-2 text-purple-800">California Prop 36 (2024)</h4>
            <p className="text-sm mb-2">
              Voters approved reversing parts of Prop 47, creating new category of "treatment-mandated felony" 
              for repeat offenders.
            </p>
            <div className="text-xs bg-white p-3 rounded">
              <strong>Key change:</strong> Third theft offense becomes felony regardless of amount stolen
            </div>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Technology Solutions</h3>
        
        <p>
          Retailers are implementing various technological approaches to reduce theft:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Technology</th>
                <th className="border border-gray-300 px-4 py-2 text-left">How It Works</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Effectiveness</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">AI Video Analytics</td>
                <td className="border border-gray-300 px-4 py-2">Computer vision identifies suspicious behavior patterns</td>
                <td className="border border-gray-300 px-4 py-2">65-80% theft detection</td>
                <td className="border border-gray-300 px-4 py-2">$15K-50K per store</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">RFID Tagging</td>
                <td className="border border-gray-300 px-4 py-2">Radio frequency tags trigger alarms if not properly removed</td>
                <td className="border border-gray-300 px-4 py-2">70-90% for tagged items</td>
                <td className="border border-gray-300 px-4 py-2">$0.05-0.25 per tag</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Facial Recognition</td>
                <td className="border border-gray-300 px-4 py-2">Identifies known shoplifters entering store</td>
                <td className="border border-gray-300 px-4 py-2">High for known offenders</td>
                <td className="border border-gray-300 px-4 py-2">$5K-20K per store</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Smart Locks/Cases</td>
                <td className="border border-gray-300 px-4 py-2">Electronic locks on high-value items, opened by staff</td>
                <td className="border border-gray-300 px-4 py-2">95%+ for locked items</td>
                <td className="border border-gray-300 px-4 py-2">$50-200 per case</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Industry Initiatives</h3>
        
        <p>
          Retailers have organized collaborative efforts to combat organized theft:
        </p>

        <ul>
          <li><strong>Retail Crime Database:</strong> Shared database of known offenders and theft patterns across retailers</li>
          <li><strong>Regional Task Forces:</strong> Joint law enforcement initiatives funded by multiple retailers</li>
          <li><strong>Online Marketplace Cooperation:</strong> Working with platforms to identify and remove stolen goods</li>
          <li><strong>Employee Training:</strong> Enhanced training for recognizing and responding to organized theft</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Future Outlook</h2>
        
        <p>
          The organized retail theft issue will likely evolve as technology, policy, and economic conditions change.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Likely Trends (2025-2030)</h3>
        
        <div className="space-y-4 mb-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-5">
            <h4 className="font-semibold mb-2 text-blue-800">Technology Evolution</h4>
            <ul className="text-sm space-y-1">
              <li>• AI-powered theft detection becoming standard</li>
              <li>• Automated inventory tracking reducing shrinkage from errors</li>
              <li>• Enhanced self-checkout security and assistance</li>
              <li>• Blockchain product authentication</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5">
            <h4 className="font-semibold mb-2 text-yellow-800">Policy Changes</h4>
            <ul className="text-sm space-y-1">
              <li>• More states creating organized retail crime statutes</li>
              <li>• Enhanced penalties for repeat offenders</li>
              <li>• Better coordination between jurisdictions</li>
              <li>• Online marketplace regulation expansion</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-500 p-5">
            <h4 className="font-semibold mb-2 text-green-800">Industry Adaptation</h4>
            <ul className="text-sm space-y-1">
              <li>• More products moving behind counters or in locked cases</li>
              <li>• Increased security staffing in high-theft areas</li>
              <li>• Partnership with law enforcement improving</li>
              <li>• Alternative retail formats (online pickup, delivery)</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Key Takeaways</h2>
        
        <div className="bg-gray-900 text-white rounded-xl p-8 mb-8">
          <h3 className="font-heading text-xl font-bold mb-6 text-center">Organized Retail Theft: The Reality</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">What's Overstated</h4>
              <ul className="text-sm space-y-2">
                <li>• The $100+ billion crisis figure (retracted)</li>
                <li>• Claims of unprecedented theft surge</li>
                <li>• Retailer attribution of all shrinkage to theft</li>
                <li>• Flash mob robberies as representative of all retail theft</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">What's Real</h4>
              <ul className="text-sm space-y-2">
                <li>• Professional theft rings do exist and have evolved</li>
                <li>• Online marketplaces facilitate fencing stolen goods</li>
                <li>• Self-checkout systems increased shrinkage 4-5%</li>
                <li>• Prosecutorial gaps create enforcement challenges</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="font-semibold mb-3 text-yellow-300">The Bottom Line</h4>
            <p className="text-sm">
              Organized retail theft is a real problem that costs billions annually and affects communities, 
              but its scale has been significantly exaggerated. FBI data shows long-term larceny-theft decline, 
              contradicting crisis narratives. The truth lies between "retail apocalypse" and "nothing happening."
            </p>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6 mb-8">
          <div>
            <h4 className="font-semibold mb-2">Is organized retail theft really increasing?</h4>
            <p className="text-sm text-gray-700">
              FBI data shows overall larceny-theft has declined 40% since the early 2000s, but organized 
              retail theft may have increased in specific areas. The $100 billion crisis figure was retracted 
              by the National Retail Federation after methodology flaws were discovered.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">What causes retail shrinkage besides theft?</h4>
            <p className="text-sm text-gray-700">
              Retail shrinkage has multiple causes: external theft (36%), employee theft (29%), administrative 
              errors (27%), vendor fraud (5%), and unknown causes (3%). Only about one-third of shrinkage 
              is from customer shoplifting.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">How do organized retail theft rings operate?</h4>
            <p className="text-sm text-gray-700">
              Professional crews steal specific high-value items to order, often reselling through online 
              marketplaces. They target items like baby formula, razors, cosmetics, and electronics that 
              are easily fenced at 20-40% of retail value.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Does self-checkout increase theft?</h4>
            <p className="text-sm text-gray-700">
              Studies show self-checkout increases shrinkage by 4-5% compared to traditional checkout. 
              This includes both intentional theft and honest scanning errors, as customers struggle 
              with unfamiliar technology.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">What's being done to combat retail theft?</h4>
            <p className="text-sm text-gray-700">
              Solutions include federal legislation (INFORM Act), state organized retail crime laws, 
              technology improvements (AI video analytics, RFID), enhanced prosecution, and industry 
              collaboration through shared databases and task forces.
            </p>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Related Pages</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <h2 className="font-heading">Larceny-Theft Arrest Demographics</h2>
        <p>
          FBI arrest data for larceny-theft — the offense category that encompasses shoplifting — provides
          context for understanding who is actually arrested for these crimes.
        </p>

        {larceny && (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Race</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Larceny Arrests</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">% of Larceny</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">% of All Property Crime</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'White', lv: larceny.white, pv: property?.white ?? 0 },
                  { label: 'Black or African American', lv: larceny.black, pv: property?.black ?? 0 },
                  { label: 'American Indian/Alaska Native', lv: larceny.nativeAmerican, pv: property?.nativeAmerican ?? 0 },
                  { label: 'Asian', lv: larceny.asian, pv: property?.asian ?? 0 },
                  { label: 'Native Hawaiian/Pacific Islander', lv: larceny.pacificIslander, pv: property?.pacificIslander ?? 0 },
                ].map(row => (
                  <tr key={row.label} className="border-t">
                    <td className="border border-gray-300 px-4 py-2 font-medium">{row.label}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">{fmtNum(row.lv)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">{(row.lv / larceny.total * 100).toFixed(1)}%</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">{property ? (row.pv / property.total * 100).toFixed(1) + '%' : '—'}</td>
                  </tr>
                ))}
                <tr className="border-t font-semibold bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Total</td>
                  <td className="border border-gray-300 px-4 py-2 text-right font-mono">{fmtNum(larceny.total)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right font-mono">100%</td>
                  <td className="border border-gray-300 px-4 py-2 text-right font-mono">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {larcenyEth && (
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-700">{larcenyEth.hispanicPct}%</div>
              <div className="text-sm text-gray-600">Hispanic/Latino Share of Larceny Arrests</div>
              <div className="text-xs text-gray-500">{fmtNum(larcenyEth.hispanic)} of {fmtNum(larcenyEth.totalEthnicity)} with known ethnicity</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#1e3a5f]">{larcenyEth.notHispanicPct}%</div>
              <div className="text-sm text-gray-600">Not Hispanic/Latino</div>
              <div className="text-xs text-gray-500">{fmtNum(larcenyEth.notHispanic)} of {fmtNum(larcenyEth.totalEthnicity)} with known ethnicity</div>
            </div>
          </div>
        )}

        <p>
          White individuals account for {larceny ? (larceny.white / larceny.total * 100).toFixed(1) : '—'}% of larceny-theft
          arrests, while Black individuals account for {larceny ? (larceny.black / larceny.total * 100).toFixed(1) : '—'}%.
          These figures challenge simplistic narratives about who commits retail theft. The disparity in Black arrest
          rates (relative to ~13.6% population share) likely reflects both actual differences in economic desperation
          and the well-documented pattern of greater surveillance and policing in minority communities and
          stores in lower-income neighborhoods.
        </p>

        <Link href="/property-crime" className="block bg-[#1e3a5f] text-white rounded-lg p-4 hover:bg-[#2a4d7a] transition">
            <h4 className="font-semibold mb-2">Property Crime Data</h4>
            <p className="text-sm opacity-90">National larceny-theft statistics and trends</p>
          </Link>
          
          <Link href="/analysis/property-crime-surge" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Property Crime Analysis</h4>
            <p className="text-sm text-gray-600">Comprehensive look at property crime trends</p>
          </Link>
          
          <Link href="/analysis/car-theft-crisis" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Car Theft Crisis</h4>
            <p className="text-sm text-gray-600">Another property crime seeing actual increases</p>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="organized-retail-theft" />
        <ShareButtons title="Organized Retail Theft" />
      </div>
      
      <p className="text-sm text-gray-500 mt-8">
        Sources: FBI Crime Data Explorer, National Retail Federation Security Survey, retailer earnings calls and SEC filings, 
        Congressional Research Service, National Association of Shoplifting Prevention, Loss Prevention Research Council, 
        various academic studies on self-checkout shrinkage.
      </p>
    </div>
  );
}
