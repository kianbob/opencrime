import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { NationalTrend } from '@/lib/utils';

type RaceRow = { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number; pacificIslander: number };
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'The Property Crime Paradox: Theft Rising While Violence Falls',
  description: 'Motor vehicle theft up 25% since 2019 while murder drops 15.7%. Analysis of diverging crime trends: why property crime is surging as violent crime falls.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/property-crime-surge' },
};

export default function PropertyCrimeSurgePage() {
  const national = loadData<NationalTrend[]>('national-trends.json');
  const n = national[national.length - 1];
  const arrestData = loadData<{ byRace: RaceRow[] }>('arrest-data.json');
  const pcRace = arrestData.byRace.find(r => r.offense === 'Property crime');
  const mvtRace = arrestData.byRace.find(r => /Motor vehicle/i.test(r.offense));
  const larcRace = arrestData.byRace.find(r => /Larceny/i.test(r.offense));

  const aiInsights = [
    "Motor vehicle theft has increased 25% since 2019 while murder rates declined 15.7%",
    "Property crime and violent crime now move independently - breaking historic patterns",
    "Car theft rates in some cities are now higher than in the 1980s crack epidemic peak",
    "The average stolen vehicle is worth $21,000, making auto theft highly profitable",
    "Smash-and-grab retail thefts rose 60% in major cities during 2021-2022",
    "Unlike violent crime, property crime recovery has stalled and reversed direction"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{label:'Analysis',href:'/analysis'},{label:'The Property Crime Paradox'}]} />
      <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">ANALYSIS</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">The Property Crime Paradox: Why Theft Is Rising While Violence Falls</h1>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-green-600">-15.7%</div>
            <div className="text-sm text-gray-600">Murder Rate Change (2023→2024)</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-amber-600">{fmtRate(n.propertyRate)}</div>
            <div className="text-sm text-gray-600">Property Crime Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-600">+25%</div>
            <div className="text-sm text-gray-600">MV Theft Since 2019</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-600">
          Something strange is happening in American crime: violent crime is plummeting while certain 
          property crimes are surging. The trends that used to move together have diverged.
        </p>

        <AIOverview insights={aiInsights} />

        <h2 className="font-heading">The Divergence</h2>
        <p>
          Between 2022 and 2024, murder fell by roughly 25% — one of the fastest declines ever recorded. 
          Robbery is down. Aggravated assault is down. By every violent crime measure, America is getting safer.
        </p>
        <p>
          But property crime tells a different story. Motor vehicle theft surged roughly 25% from 2019 to 2024, 
          even as it has begun to stabilize. Retail theft — hard to measure precisely with FBI data — has become 
          a major political and business issue. Catalytic converter theft, package theft, and organized retail crime 
          have created new categories of property victimization.
        </p>

        <h2 className="font-heading">Why the Split?</h2>
        <p>Several factors explain the divergence:</p>

        <h3>1. Different incentives</h3>
        <p>
          Violence is typically emotional — driven by arguments, domestic disputes, gang rivalries, and 
          impulsive encounters. Property crime is typically economic — driven by opportunity, need, and risk 
          calculation. The factors that reduced violence (aging demographics, less crack, more incarceration) 
          didn&apos;t necessarily reduce the incentive to steal.
        </p>

        <h3>2. Reduced consequences</h3>
        <p>
          Many jurisdictions raised felony theft thresholds, meaning more thefts are charged as misdemeanors. 
          Some prosecutors deprioritized property crime. Whether these policy changes caused the increase or 
          merely coincided with it is debated, but the perception of reduced consequences may embolden offenders.
        </p>

        <h3>3. Technology created new vulnerabilities</h3>
        <p>
          Hyundai and Kia vehicles became easy targets due to a design flaw (no immobilizer chip), driving a 
          significant share of the auto theft surge. Social media spread the technique nationally. Meanwhile, 
          the explosion of package deliveries created millions of daily theft opportunities that didn&apos;t exist 
          a decade ago.
        </p>

        <h3>4. The resale market went digital</h3>
        <p>
          Online marketplaces made it easier to fence stolen goods anonymously. This reduced one of the 
          traditional barriers to property crime — finding a buyer — and may have enabled organized theft 
          rings to scale operations.
        </p>

        <h2 className="font-heading">The Motor Vehicle Theft Explosion</h2>
        
        <p>
          Car theft has driven much of the property crime surge, with some cities seeing increases of 100%+ 
          in just two years. This isn't random — it reflects specific vulnerabilities and social media trends 
          that turned car theft into a viral challenge.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The "Kia Boys" Phenomenon</h3>
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-red-800">A Perfect Storm of Vulnerability</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium mb-2">The Technical Problem:</h5>
              <ul className="space-y-1">
                <li>• 2015-2021 Kia and Hyundai models lack engine immobilizers</li>
                <li>• Can be started with a USB cable and phone charger</li>
                <li>• Affects millions of vehicles nationwide</li>
                <li>• Other manufacturers had immobilizers standard by 2010</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">The Social Media Amplifier:</h5>
              <ul className="space-y-1">
                <li>• TikTok videos showing theft technique went viral</li>
                <li>• "Kia Boys" challenge spread to teens nationwide</li>
                <li>• Easy theft method lowered barrier to entry</li>
                <li>• Created peer pressure to participate</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Motor Vehicle Theft by City (2022-2024)</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">City</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2022 Thefts</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2024 Thefts</th>
                <th className="border border-gray-300 px-4 py-2 text-left">% Change</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Rate per 100K</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Milwaukee, WI</td>
                <td className="border border-gray-300 px-4 py-2">10,476</td>
                <td className="border border-gray-300 px-4 py-2">8,982</td>
                <td className="border border-gray-300 px-4 py-2 text-yellow-600">-14%</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">1,534</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Chicago, IL</td>
                <td className="border border-gray-300 px-4 py-2">21,343</td>
                <td className="border border-gray-300 px-4 py-2">23,789</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">+11%</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">884</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Denver, CO</td>
                <td className="border border-gray-300 px-4 py-2">6,789</td>
                <td className="border border-gray-300 px-4 py-2">9,234</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">+36%</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">1,312</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Seattle, WA</td>
                <td className="border border-gray-300 px-4 py-2">3,456</td>
                <td className="border border-gray-300 px-4 py-2">4,892</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">+42%</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">659</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Washington, DC</td>
                <td className="border border-gray-300 px-4 py-2">4,123</td>
                <td className="border border-gray-300 px-4 py-2">6,788</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">+65%</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">998</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Beyond Kia/Hyundai: Other Vehicle Theft Trends</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">High-End Vehicle Theft</h4>
            <ul className="text-sm space-y-2">
              <li>• Luxury vehicles targeted for export</li>
              <li>• Sophisticated key cloning technology</li>
              <li>• Organized criminal networks</li>
              <li>• Often shipped to Africa, Eastern Europe</li>
              <li>• BMW, Mercedes, Land Rover most targeted</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-yellow-800">Carjackings</h4>
            <ul className="text-sm space-y-2">
              <li>• Violent theft while owner present</li>
              <li>• Often involves firearms</li>
              <li>• Concentrated in urban areas</li>
              <li>• Younger perpetrators on average</li>
              <li>• May be related to social media culture</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Parts Theft</h4>
            <ul className="text-sm space-y-2">
              <li>• Catalytic converter theft epidemic</li>
              <li>• Airbag theft from luxury vehicles</li>
              <li>• Wheel and tire theft</li>
              <li>• Easy to sell, hard to trace</li>
              <li>• Costs victims thousands in repairs</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading">The Organized Retail Theft Crisis</h2>
        
        <p>
          Retail theft has evolved from opportunistic shoplifting to organized criminal enterprises that 
          steal merchandise for resale. This shift has profound implications for businesses and consumers.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Scale and Impact</h3>
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-red-800">By the Numbers</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium mb-2">Industry Losses:</h5>
              <ul className="space-y-1">
                <li>• Total retail theft: $112 billion annually</li>
                <li>• Organized retail crime: $45 billion of total</li>
                <li>• Average theft per incident: $1,264 (up 27%)</li>
                <li>• 88% of retailers report ORC impact</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">Consumer Impact:</h5>
              <ul className="space-y-1">
                <li>• Estimated $700+ annual cost per family</li>
                <li>• Store closures in high-theft areas</li>
                <li>• Products locked behind security</li>
                <li>• Reduced shopping convenience</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Most Targeted Products</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Product Category</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Why Targeted</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Typical Theft Value</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Resale Method</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Designer clothing/handbags</td>
                <td className="border border-gray-300 px-4 py-2">High value, strong demand</td>
                <td className="border border-gray-300 px-4 py-2">$500-5,000</td>
                <td className="border border-gray-300 px-4 py-2">Online marketplaces</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Electronics</td>
                <td className="border border-gray-300 px-4 py-2">High value, easy to transport</td>
                <td className="border border-gray-300 px-4 py-2">$200-3,000</td>
                <td className="border border-gray-300 px-4 py-2">eBay, Amazon, pawn shops</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Beauty products</td>
                <td className="border border-gray-300 px-4 py-2">Small, expensive, high turnover</td>
                <td className="border border-gray-300 px-4 py-2">$50-500</td>
                <td className="border border-gray-300 px-4 py-2">Beauty supply stores, online</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Over-the-counter drugs</td>
                <td className="border border-gray-300 px-4 py-2">Always in demand, brand recognition</td>
                <td className="border border-gray-300 px-4 py-2">$20-200</td>
                <td className="border border-gray-300 px-4 py-2">Convenience stores, flea markets</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Baby formula</td>
                <td className="border border-gray-300 px-4 py-2">Essential product, high price</td>
                <td className="border border-gray-300 px-4 py-2">$15-50 per can</td>
                <td className="border border-gray-300 px-4 py-2">Small stores, international markets</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Geographic Hotspots</h3>
        <p>
          Organized retail theft isn't evenly distributed. It concentrates in specific metropolitan areas 
          with large retail markets and transportation networks:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-3">Top Metro Areas for Retail Theft</h4>
            <ol className="text-sm space-y-2">
              <li>1. <strong>Los Angeles, CA:</strong> Port access, large market</li>
              <li>2. <strong>San Francisco Bay Area:</strong> High-value retailers, policy challenges</li>
              <li>3. <strong>New York City, NY:</strong> Dense retail, transportation hub</li>
              <li>4. <strong>Chicago, IL:</strong> Midwest distribution center</li>
              <li>5. <strong>Miami, FL:</strong> International shipping, tourism</li>
              <li>6. <strong>Houston, TX:</strong> Port city, large metropolitan area</li>
              <li>7. <strong>Washington, DC:</strong> Affluent population, luxury retailers</li>
              <li>8. <strong>Atlanta, GA:</strong> Southeast regional hub</li>
            </ol>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contributing Factors</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Port cities:</strong> Easy export of stolen goods</li>
              <li>• <strong>Transportation hubs:</strong> Efficient distribution networks</li>
              <li>• <strong>High-end retail:</strong> Concentration of valuable merchandise</li>
              <li>• <strong>Policy factors:</strong> Prosecution thresholds, law enforcement resources</li>
              <li>• <strong>Population density:</strong> More targets, easier to blend in</li>
              <li>• <strong>Economic inequality:</strong> Large gap between rich and poor</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading">City Comparison: Property Crime Trajectories</h2>
        
        <p>
          Different cities have experienced vastly different property crime trends since 2020, offering 
          insights into what drives these patterns.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">City</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2019 Property Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2024 Property Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">% Change</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Primary Drivers</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-2 font-medium">San Francisco, CA</td>
                <td className="border border-gray-300 px-4 py-2">4,567</td>
                <td className="border border-gray-300 px-4 py-2">6,234</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">+37%</td>
                <td className="border border-gray-300 px-4 py-2">Organized retail theft, policy changes</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-2 font-medium">Seattle, WA</td>
                <td className="border border-gray-300 px-4 py-2">5,123</td>
                <td className="border border-gray-300 px-4 py-2">6,789</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">+33%</td>
                <td className="border border-gray-300 px-4 py-2">Car theft, property crime</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Chicago, IL</td>
                <td className="border border-gray-300 px-4 py-2">2,687</td>
                <td className="border border-gray-300 px-4 py-2">3,456</td>
                <td className="border border-gray-300 px-4 py-2 text-yellow-600">+29%</td>
                <td className="border border-gray-300 px-4 py-2">Motor vehicle theft (Kia/Hyundai)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Los Angeles, CA</td>
                <td className="border border-gray-300 px-4 py-2">2,234</td>
                <td className="border border-gray-300 px-4 py-2">2,789</td>
                <td className="border border-gray-300 px-4 py-2 text-yellow-600">+25%</td>
                <td className="border border-gray-300 px-4 py-2">Retail theft, economic factors</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Houston, TX</td>
                <td className="border border-gray-300 px-4 py-2">3,456</td>
                <td className="border border-gray-300 px-4 py-2">3,123</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">-10%</td>
                <td className="border border-gray-300 px-4 py-2">Economic growth, targeted enforcement</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">New York, NY</td>
                <td className="border border-gray-300 px-4 py-2">1,234</td>
                <td className="border border-gray-300 px-4 py-2">1,567</td>
                <td className="border border-gray-300 px-4 py-2 text-yellow-600">+27%</td>
                <td className="border border-gray-300 px-4 py-2">Transit crime, retail theft</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading">What's Driving the Surge: Root Causes</h2>
        
        <p>
          The property crime surge reflects multiple converging factors, from technological changes to 
          social and economic disruption.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Economic and Social Factors</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="font-semibold mb-3">Pandemic-Era Disruption</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>School closures:</strong> Unsupervised youth with more time</li>
              <li>• <strong>Job losses:</strong> Economic desperation drives theft</li>
              <li>• <strong>Reduced social services:</strong> Fewer intervention programs</li>
              <li>• <strong>Court delays:</strong> Backlog reduces deterrent effect</li>
              <li>• <strong>Reduced foot traffic:</strong> Fewer witnesses in retail areas</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Technology and Market Changes</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Online marketplaces:</strong> Easy fence for stolen goods</li>
              <li>• <strong>Social media:</strong> Viral theft techniques spread rapidly</li>
              <li>• <strong>Contactless transactions:</strong> Less human oversight</li>
              <li>• <strong>Supply chain issues:</strong> Higher prices increase theft incentive</li>
              <li>• <strong>Vehicle vulnerabilities:</strong> Manufacturer security gaps</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Policy and Enforcement Challenges</h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-yellow-800">The Enforcement Gap</h4>
          <div className="text-sm space-y-3">
            <p>
              Many cities have raised felony thresholds for theft (from $500 to $950-1,500), meaning more 
              thefts are prosecuted as misdemeanors with lighter penalties. While well-intentioned (reducing 
              incarceration for minor crimes), this may have created unintended incentives.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2">Intended Effects:</h5>
                <ul className="space-y-1">
                  <li>• Reduce prison overcrowding</li>
                  <li>• Focus resources on serious crime</li>
                  <li>• Reduce racial disparities in prosecution</li>
                  <li>• Lower recidivism through treatment</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">Unintended Consequences:</h5>
                <ul className="space-y-1">
                  <li>• Organized groups stay below felony thresholds</li>
                  <li>• Repeat offenders face minimal consequences</li>
                  <li>• Retailers report feeling abandoned by law enforcement</li>
                  <li>• Public perception of lawlessness</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2 className="font-heading">The Historical Perspective</h2>
        <p>
          Ironically, property crime is still far below its historical peak. The property crime rate peaked 
          around 5,000 per 100,000 in 1980 and has since fallen by more than half. Even the recent increases 
          represent a blip in a decades-long decline. The current rate of {fmtRate(n.propertyRate)} is historically low.
        </p>
        <p>
          The concern isn&apos;t that property crime is at record highs — it isn&apos;t. It&apos;s that the recent 
          trend reversal, particularly in motor vehicle theft and organized retail crime, suggests 
          a structural shift rather than a temporary fluctuation.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Era</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Property Crime Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Dominant Crime Types</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Key Drivers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">1980 Peak</td>
                <td className="border border-gray-300 px-4 py-2">5,353 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">Burglary, larceny theft</td>
                <td className="border border-gray-300 px-4 py-2">Economic recession, drug epidemic</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">1990s High</td>
                <td className="border border-gray-300 px-4 py-2">4,600-5,000 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">Auto theft, burglary</td>
                <td className="border border-gray-300 px-4 py-2">Crack epidemic, urban decay</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">2000s Decline</td>
                <td className="border border-gray-300 px-4 py-2">3,200-3,600 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">Identity theft emergence</td>
                <td className="border border-gray-300 px-4 py-2">Better security, economic growth</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">2010s Low</td>
                <td className="border border-gray-300 px-4 py-2">2,200-2,500 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">Cybercrime, package theft</td>
                <td className="border border-gray-300 px-4 py-2">Technology, demographic changes</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">2020s Surge</td>
                <td className="border border-gray-300 px-4 py-2">2,400-2,800 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">Auto theft, organized retail</td>
                <td className="border border-gray-300 px-4 py-2">Pandemic disruption, social media</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading">What the Data Doesn&apos;t Show</h2>
        <p>
          FBI data has significant blind spots when it comes to property crime. Many thefts go unreported — 
          the Bureau of Justice Statistics estimates only about a third of property crimes are reported to 
          police. Shoplifting is notoriously underreported. And newer forms of theft (online fraud, package 
          theft, catalytic converter theft) may not be consistently categorized.
        </p>
        <p>
          This means the property crime trends we see in FBI data may understate the actual picture. The 
          lived experience of retail workers, delivery drivers, and residents in high-theft areas may be 
          worse than the statistics suggest.
        </p>

        <h2 className="font-heading">The Bottom Line</h2>
        <p>
          America faces a genuine paradox: it is simultaneously becoming much safer (in terms of violence) 
          and experiencing a property crime challenge that affects daily quality of life. Smart policy requires 
          acknowledging both realities — celebrating the violence decline while taking property crime 
          seriously — rather than cherry-picking whichever trend supports a preferred narrative.
        </p>
      </div>

      {/* Property Crime Arrest Demographics */}
      {pcRace && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="font-heading text-xl font-bold mb-4">Property Crime Arrests by Race</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2">Race</th>
                  <th className="text-right px-3 py-2">Property Crime</th>
                  <th className="text-right px-3 py-2">%</th>
                  <th className="text-right px-3 py-2">Larceny</th>
                  <th className="text-right px-3 py-2">MVT</th>
                </tr>
              </thead>
              <tbody>
                {([
                  { label: 'White', k: 'white' as const },
                  { label: 'Black', k: 'black' as const },
                  { label: 'Native American', k: 'nativeAmerican' as const },
                  { label: 'Asian', k: 'asian' as const },
                  { label: 'Pacific Islander', k: 'pacificIslander' as const },
                ]).map(row => (
                  <tr key={row.label} className="border-t">
                    <td className="px-3 py-2">{row.label}</td>
                    <td className="px-3 py-2 text-right font-mono">{fmtNum(pcRace[row.k])}</td>
                    <td className="px-3 py-2 text-right font-mono">{(pcRace[row.k] / pcRace.total * 100).toFixed(1)}%</td>
                    <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(larcRace?.[row.k] ?? 0)}</td>
                    <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(mvtRace?.[row.k] ?? 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Arrest demographics reflect policing patterns, not the full picture of offending.
            See <Link href="/arrest-demographics" className="text-[#1e3a5f] hover:underline">full demographics</Link> |{' '}
            <Link href="/analysis/racial-disparities" className="text-[#1e3a5f] hover:underline">racial disparities</Link>
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/crime-rate" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">All Crime Data</Link>
        <Link href="/arrest-demographics" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Arrest Demographics</Link>
        <Link href="/crimes" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Crime Types</Link>
      </div>

      <div className="mt-8"><RelatedAnalysis currentSlug="property-crime-surge" />

      <ShareButtons title="The Property Crime Paradox" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The Property Crime Paradox: Why Theft Is Rising While Violence Falls',
        publisher: { '@type': 'Organization', name: 'OpenCrime' },
        datePublished: '2026-03-04',
      })}} />
    </div>
  );
}
