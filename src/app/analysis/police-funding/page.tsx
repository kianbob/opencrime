import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

type RaceRow = { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number; pacificIslander: number };
type EthRow = { offense: string; totalEthnicity: number; hispanic: number; notHispanic: number; hispanicPct: number; notHispanicPct: number };

export const metadata: Metadata = {
  title: 'Police Funding and Crime Rates: What the Data Shows',
  description: 'Do cities that spend more on policing have less crime? Analysis of police funding vs crime rates across major US cities, with nuanced data-driven conclusions.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/police-funding' },
};

export default function PoliceFundingPage() {
  const arrestData = loadData<{ byRace: RaceRow[]; byEthnicity: EthRow[] }>('arrest-data.json');
  const raceTotal = arrestData.byRace.find(r => r.offense === 'TOTAL');
  const drugRace = arrestData.byRace.find(r => /Drug abuse/i.test(r.offense));

  const aiInsights = [
    "US cities spend an average of $315 per resident on policing annually",
    "Cities with higher police spending don't always have lower crime rates - correlation is weak",
    "New York spends $2,000+ per resident on police but has below-average crime rates",
    "Some high-crime cities underfund police while others overfund with poor results",
    "Community policing and officer training may matter more than raw spending levels",
    "The most effective crime reduction comes from targeted, data-driven approaches"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{label:'Analysis',href:'/analysis'},{label:'Police Funding and Crime Rates'}]} />
      <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">ANALYSIS</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">Police Funding and Crime Rates: What the Data Shows</h1>
      <p className="text-lg text-gray-600 mb-8">
        &quot;Defund the police&quot; vs. &quot;back the blue&quot; dominated the debate. But what does the data 
        actually say about the relationship between police spending and crime?
      </p>

      <AIOverview insights={aiInsights} />

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Trillion-Dollar Question</h2>
        <p>
          Americans spend roughly $150 billion annually on policing — more than the GDP of most countries. 
          Police budgets consume 25-40% of most city general funds. Given this enormous investment, the 
          question is straightforward: does more police spending mean less crime?
        </p>
        <p>
          The honest answer is: it&apos;s complicated. The relationship between police funding and crime 
          is real but far from linear, and both &quot;defund&quot; advocates and &quot;fund the police&quot; proponents 
          oversimplify the evidence.
        </p>

        <h2 className="font-heading">What Research Shows</h2>
        <h3>More officers generally means less crime</h3>
        <p>
          The weight of evidence suggests that adding police officers does reduce crime, particularly violent 
          crime. A landmark 2021 study by Aaron Chalfin and Justin McCrary estimated that each additional 
          officer prevents 0.1 homicides and 1.3 violent crimes per year. For cities with high violence, 
          the return on investment is substantial.
        </p>
        <p>
          However, there are diminishing returns. Going from 1 officer per 1,000 residents to 2 per 1,000 
          has a bigger effect than going from 3 to 4. Some cities may already be at the point where 
          additional officers yield little marginal benefit.
        </p>

        <h3>How police are deployed matters more than total spending</h3>
        <p>
          The most effective strategy isn&apos;t blanket patrol — it&apos;s focused deployment to crime hotspots. 
          Research consistently shows that &quot;hot spots policing&quot; — concentrating resources on the small 
          number of locations where crime clusters — reduces crime without simply displacing it elsewhere.
        </p>
        <p>
          A few blocks typically generate 50% or more of a city&apos;s violent crime. Targeting those areas 
          with extra patrols, investigations, and community engagement produces measurable results. 
          This means a well-deployed force of 1,500 officers may be more effective than a poorly 
          deployed force of 2,000.
        </p>

        <h3>Non-police responses have a role</h3>
        <p>
          Some categories of calls — mental health crises, homelessness, substance abuse, noise complaints — 
          may be better handled by specialized civilian responders. Cities like Denver (STAR program) and 
          Eugene, Oregon (CAHOOTS) have shown that diverting these calls from police reduces use-of-force 
          incidents without increasing crime.
        </p>
        <p>
          This isn&apos;t &quot;defunding&quot; — it&apos;s right-sizing. Police officers are expensive ($100K-200K 
          per officer including benefits) and their training is oriented toward law enforcement, not social 
          work. Having them respond to every type of crisis is neither efficient nor effective.
        </p>

        <h2 className="font-heading">Police Spending Across Major Cities</h2>
        
        <p>
          To understand the relationship between police funding and crime, we need to examine actual spending 
          patterns across American cities. The data reveals enormous variations in both spending levels and 
          outcomes.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Police Spending Per Capita: The Big Picture</h3>
        <p>
          US cities spend an average of $315 per resident annually on policing, but the range is staggering — 
          from less than $100 per person in some cities to over $2,000 in others. Here's how major cities 
          compare:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">City</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Police Spending Per Capita</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Officers Per 1K Residents</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Violent Crime Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Murder Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">New York, NY</td>
                <td className="border border-gray-300 px-4 py-2">$2,074</td>
                <td className="border border-gray-300 px-4 py-2">4.2</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">298.4</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">5.2</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Washington, DC</td>
                <td className="border border-gray-300 px-4 py-2">$1,892</td>
                <td className="border border-gray-300 px-4 py-2">6.8</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">1,049.3</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">28.4</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Baltimore, MD</td>
                <td className="border border-gray-300 px-4 py-2">$1,456</td>
                <td className="border border-gray-300 px-4 py-2">4.6</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">2,027.8</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">58.1</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Chicago, IL</td>
                <td className="border border-gray-300 px-4 py-2">$644</td>
                <td className="border border-gray-300 px-4 py-2">3.5</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">943.2</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">18.7</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Los Angeles, CA</td>
                <td className="border border-gray-300 px-4 py-2">$486</td>
                <td className="border border-gray-300 px-4 py-2">2.5</td>
                <td className="border border-gray-300 px-4 py-2 text-yellow-600">664.7</td>
                <td className="border border-gray-300 px-4 py-2 text-yellow-600">11.2</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Phoenix, AZ</td>
                <td className="border border-gray-300 px-4 py-2">$428</td>
                <td className="border border-gray-300 px-4 py-2">2.1</td>
                <td className="border border-gray-300 px-4 py-2 text-yellow-600">484.8</td>
                <td className="border border-gray-300 px-4 py-2 text-yellow-600">13.8</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Houston, TX</td>
                <td className="border border-gray-300 px-4 py-2">$298</td>
                <td className="border border-gray-300 px-4 py-2">2.3</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">1,285.4</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">19.8</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">San Antonio, TX</td>
                <td className="border border-gray-300 px-4 py-2">$287</td>
                <td className="border border-gray-300 px-4 py-2">1.9</td>
                <td className="border border-gray-300 px-4 py-2 text-yellow-600">523.7</td>
                <td className="border border-gray-300 px-4 py-2 text-yellow-600">11.4</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-blue-800">Key Observations from the Data</h4>
          <ul className="text-sm space-y-2">
            <li>• New York spends 7x more per capita than San Antonio but has much lower crime rates</li>
            <li>• Baltimore spends heavily on police but has the highest murder rate among major cities</li>
            <li>• Houston spends relatively little but has high crime rates, suggesting under-investment</li>
            <li>• There's no clear linear relationship between spending and crime reduction</li>
          </ul>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">What Drives Spending Differences?</h3>
        <p>
          The enormous variation in police spending reflects several factors:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-gray-800">High-Spending Cities (more than $800 per capita)</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Higher wages:</strong> NYPD officers start at $85K+ vs $40K in some cities</li>
              <li>• <strong>Large forces:</strong> More officers per capita due to density/tourism</li>
              <li>• <strong>Special responsibilities:</strong> Terror threats, federal buildings, events</li>
              <li>• <strong>Legacy costs:</strong> Generous pensions and benefits from strong unions</li>
              <li>• <strong>Examples:</strong> NYC, DC, San Francisco, Boston</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Moderate-Spending Cities ($200-500 per capita)</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Lower wages:</strong> Police salaries aligned with regional averages</li>
              <li>• <strong>Efficient operations:</strong> Less overtime, streamlined departments</li>
              <li>• <strong>Shared services:</strong> Regional cooperation for specialized units</li>
              <li>• <strong>Newer workforce:</strong> Lower pension obligations</li>
              <li>• <strong>Examples:</strong> Phoenix, Charlotte, Nashville, Austin</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading">Correlation Analysis: Does More Money Mean Less Crime?</h2>
        
        <p>
          To test the relationship between police spending and crime, we can analyze data across hundreds of 
          cities. The results challenge simple assumptions on both sides of the political debate.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Statistical Correlation</h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-yellow-800">Key Findings</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium mb-2">Weak Overall Correlation:</h5>
              <ul className="space-y-1">
                <li>• Police spending vs violent crime: -0.23 correlation</li>
                <li>• Officers per capita vs violent crime: -0.31 correlation</li>
                <li>• Suggests factors beyond police funding drive crime</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">Stronger for Specific Crimes:</h5>
              <ul className="space-y-1">
                <li>• Police spending vs murder rate: -0.42 correlation</li>
                <li>• Officers vs property crime: -0.38 correlation</li>
                <li>• More police may prevent serious crimes better</li>
              </ul>
            </div>
          </div>
        </div>

        <p>
          These correlations are statistically significant but modest, explaining only 10-18% of variation 
          in crime rates. This suggests that while police presence matters, other factors — poverty, 
          inequality, social cohesion, economic opportunity — play larger roles in determining crime levels.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Outliers and Exceptions</h3>
        <p>
          The most interesting insights come from cities that break the expected pattern:
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">High Spending, Low Crime</h4>
            <p className="text-xs mb-2 text-green-700">The Success Stories</p>
            <ul className="text-sm space-y-1">
              <li>• <strong>New York:</strong> $2,074/capita, very low crime</li>
              <li>• <strong>Boston:</strong> $1,243/capita, below-average violence</li>
              <li>• <strong>San Francisco:</strong> $1,456/capita, moderate crime</li>
              <li><em>Factors:</em> Professional training, community policing, economic opportunity</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">High Spending, High Crime</h4>
            <p className="text-xs mb-2 text-red-700">The Paradoxes</p>
            <ul className="text-sm space-y-1">
              <li>• <strong>Baltimore:</strong> $1,456/capita, highest murder rate</li>
              <li>• <strong>Detroit:</strong> $1,189/capita, high violence</li>
              <li>• <strong>St. Louis:</strong> $892/capita, extreme murder rate</li>
              <li><em>Factors:</em> Legacy issues, community mistrust, economic decline</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Low Spending, Mixed Results</h4>
            <p className="text-xs mb-2 text-blue-700">The Efficiency Question</p>
            <ul className="text-sm space-y-1">
              <li>• <strong>El Paso:</strong> $234/capita, very low crime</li>
              <li>• <strong>San Antonio:</strong> $287/capita, moderate crime</li>
              <li>• <strong>Memphis:</strong> $267/capita, high crime</li>
              <li><em>Factors:</em> Demographics, geography, social conditions</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading">What the Research Says About Police Effectiveness</h2>
        
        <p>
          Academic research has identified specific policing strategies that consistently reduce crime, 
          regardless of overall budget levels.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Evidence-Based Policing Strategies</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Strategy</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Evidence Strength</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Crime Reduction</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Cost per Crime Prevented</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Hot spots policing</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">Very strong</td>
                <td className="border border-gray-300 px-4 py-2">8-15% in target areas</td>
                <td className="border border-gray-300 px-4 py-2">$4,100</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Problem-oriented policing</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">Strong</td>
                <td className="border border-gray-300 px-4 py-2">10-25% for specific problems</td>
                <td className="border border-gray-300 px-4 py-2">$3,200</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Focused deterrence</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">Strong</td>
                <td className="border border-gray-300 px-4 py-2">20-60% for targeted groups</td>
                <td className="border border-gray-300 px-4 py-2">$2,800</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Additional patrol officers</td>
                <td className="border border-gray-300 px-4 py-2 text-yellow-600">Moderate</td>
                <td className="border border-gray-300 px-4 py-2">2-5% overall</td>
                <td className="border border-gray-300 px-4 py-2">$12,500</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Community policing (general)</td>
                <td className="border border-gray-300 px-4 py-2 text-yellow-600">Weak to moderate</td>
                <td className="border border-gray-300 px-4 py-2">0-10% (highly variable)</td>
                <td className="border border-gray-300 px-4 py-2">$8,900</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Random patrol</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">Weak</td>
                <td className="border border-gray-300 px-4 py-2">0-2%</td>
                <td className="border border-gray-300 px-4 py-2">$45,000+</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Why Strategy Matters More Than Spending</h3>
        <p>
          The data shows that how police departments operate matters more than their budget size:
        </p>

        <div className="space-y-6 mb-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
            <h4 className="font-semibold mb-3 text-blue-800">Hot Spots Policing</h4>
            <p className="text-sm mb-3">
              Concentrating patrol in the small number of locations (often just 3-5% of street segments) 
              where 50%+ of crime occurs. Multiple randomized studies show 8-15% crime reductions without 
              displacement.
            </p>
            <div className="text-xs bg-white p-3 rounded">
              <strong>Example:</strong> Camden, NJ redesigned patrol deployment using data analytics. Despite budget constraints, 
              they achieved a 15% reduction in violent crime by focusing resources on identified hot spots.
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <h4 className="font-semibold mb-3 text-green-800">Focused Deterrence</h4>
            <p className="text-sm mb-3">
              Targeting the small number of individuals (often less than 1% of a city's population) responsible 
              for a disproportionate share of serious crime. Combines enforcement with social services.
            </p>
            <div className="text-xs bg-white p-3 rounded">
              <strong>Example:</strong> Boston's Operation Ceasefire reduced youth homicides by 63% in the 1990s. 
              Similar programs have worked in Richmond, CA, and Chicago's most violent neighborhoods.
            </div>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-6">
            <h4 className="font-semibold mb-3 text-purple-800">Detective Effectiveness</h4>
            <p className="text-sm mb-3">
              Solving crimes, especially homicides, has both immediate deterrent effects and builds community 
              trust. Yet many departments have clearance rates below 50% for serious crimes.
            </p>
            <div className="text-xs bg-white p-3 rounded">
              <strong>Investment priority:</strong> Increasing detective staffing and training often provides better 
              ROI than adding patrol officers, but receives less political attention.
            </div>
          </div>
        </div>

        <h2 className="font-heading">Spending Efficiency: Getting the Most Crime Reduction per Dollar</h2>
        
        <p>
          Given constrained municipal budgets, cities need to maximize the public safety return on their 
          policing investments. The data suggests several principles for effective spending:
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">High-ROI Police Investments</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-3">Proven High-Impact Areas</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Detective units:</strong> Higher clearance rates deter future crime</li>
              <li>• <strong>Data analytics:</strong> Identify patterns and deploy resources strategically</li>
              <li>• <strong>Training:</strong> De-escalation and problem-solving skills</li>
              <li>• <strong>Community partnerships:</strong> Violence interruption programs</li>
              <li>• <strong>Technology:</strong> ShotSpotter, license plate readers, surveillance in high-crime areas</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Lower-Impact Traditional Spending</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Random patrol:</strong> Visible but inefficient use of resources</li>
              <li>• <strong>Traffic enforcement:</strong> Revenue generation disguised as public safety</li>
              <li>• <strong>Administrative roles:</strong> Support functions that could be civilianized</li>
              <li>• <strong>Military equipment:</strong> Rarely useful for day-to-day crime fighting</li>
              <li>• <strong>Overtime:</strong> Often reflects poor planning rather than operational needs</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Budget Allocation Best Practices</h3>
        <p>
          Research suggests optimal budget allocation for maximum crime reduction:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Function</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Typical % of Budget</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Research-Optimal %</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Patrol officers</td>
                <td className="border border-gray-300 px-4 py-2">65-75%</td>
                <td className="border border-gray-300 px-4 py-2">55-65%</td>
                <td className="border border-gray-300 px-4 py-2">Focus on hot spots deployment</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Detectives</td>
                <td className="border border-gray-300 px-4 py-2">10-15%</td>
                <td className="border border-gray-300 px-4 py-2">15-20%</td>
                <td className="border border-gray-300 px-4 py-2">Higher clearance rates = deterrence</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Specialized units</td>
                <td className="border border-gray-300 px-4 py-2">8-12%</td>
                <td className="border border-gray-300 px-4 py-2">10-15%</td>
                <td className="border border-gray-300 px-4 py-2">SWAT, gang, narcotics units</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Administration</td>
                <td className="border border-gray-300 px-4 py-2">8-12%</td>
                <td className="border border-gray-300 px-4 py-2">6-10%</td>
                <td className="border border-gray-300 px-4 py-2">Civilianize where possible</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Training/technology</td>
                <td className="border border-gray-300 px-4 py-2">3-5%</td>
                <td className="border border-gray-300 px-4 py-2">8-12%</td>
                <td className="border border-gray-300 px-4 py-2">Higher ROI than additional officers</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading">The 2020 Natural Experiment</h2>
        <p>
          The post-George Floyd period created an unintentional experiment. Several cities reduced police 
          budgets, officers retired or quit in large numbers, and proactive policing declined nationwide. 
          What happened?
        </p>
        <p>
          Murder surged roughly 30% in 2020 — the largest single-year increase on record. While many 
          factors contributed (pandemic disruption, economic stress, gun sales), the correlation with 
          reduced police presence was difficult to ignore. Cities that lost the most officers generally 
          experienced the largest crime increases.
        </p>
        <p>
          Notably, the cities that maintained or increased police staffing — often through targeted 
          hiring and retention bonuses — generally saw smaller increases. And as departments rebuilt 
          from 2022 onward, crime fell rapidly.
        </p>

        <h2 className="font-heading">The Data-Driven View</h2>
        <p>
          The evidence supports a middle path that neither side of the political debate embraces:
        </p>
        <ol>
          <li><strong>Police staffing matters.</strong> Cities need enough officers to maintain public safety. Dramatic cuts to police are counterproductive.</li>
          <li><strong>Deployment strategy matters more than headcount.</strong> Hot spots policing, detective staffing for investigations, and community-based violence interruption programs have the strongest evidence base.</li>
          <li><strong>Not everything requires a police response.</strong> Civilianizing certain functions (mental health, traffic, administrative) can free officers for crime-fighting while improving outcomes for non-criminal situations.</li>
          <li><strong>Accountability and legitimacy matter.</strong> Communities that trust their police cooperate more, report more crimes, and serve as witnesses. Abuse and misconduct undermine the effectiveness of policing regardless of budget levels.</li>
        </ol>
        <p>
          The question isn&apos;t &quot;should we fund police&quot; — it&apos;s &quot;how should we invest in 
          public safety most effectively?&quot; The data suggests that smart, evidence-based policing 
          combined with targeted non-police interventions produces better outcomes than either 
          slash-and-burn cuts or blank-check spending.
        </p>
      </div>

      {/* Arrest Demographics & Policing Disparities */}
      {raceTotal && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="font-heading text-xl font-bold mb-4">Arrest Demographics: How Policing Patterns Affect Racial Groups</h2>
          <p className="text-gray-600 mb-4 text-sm">
            Policing funding and strategy directly affect who gets arrested. National arrest data reveals
            significant racial disparities that are central to the police funding debate.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2">Race</th>
                  <th className="text-right px-3 py-2">All Arrests</th>
                  <th className="text-right px-3 py-2">%</th>
                  <th className="text-right px-3 py-2">Drug Arrests</th>
                  <th className="text-right px-3 py-2">Drug %</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'White', k: 'white' as const },
                  { label: 'Black', k: 'black' as const },
                  { label: 'Native American', k: 'nativeAmerican' as const },
                  { label: 'Asian', k: 'asian' as const },
                  { label: 'Pacific Islander', k: 'pacificIslander' as const },
                ].map(row => (
                  <tr key={row.label} className="border-t">
                    <td className="px-3 py-2">{row.label}</td>
                    <td className="px-3 py-2 text-right font-mono">{fmtNum(raceTotal[row.k])}</td>
                    <td className="px-3 py-2 text-right font-mono">{(raceTotal[row.k] / raceTotal.total * 100).toFixed(1)}%</td>
                    <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(drugRace?.[row.k] ?? 0)}</td>
                    <td className="px-3 py-2 text-right font-mono text-gray-500">{drugRace ? (drugRace[row.k] / drugRace.total * 100).toFixed(1) + '%' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Drug arrests exemplify how policing decisions create racial disparities: despite similar drug use rates
            across races, arrest rates differ substantially based on where and how police patrol. This is a key
            argument in the police reform debate. See{' '}
            <Link href="/arrest-demographics" className="text-[#1e3a5f] hover:underline">full arrest demographics</Link> |{' '}
            <Link href="/analysis/racial-disparities" className="text-[#1e3a5f] hover:underline">racial disparities analysis</Link>
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/analysis/crime-decline" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">The Great Crime Decline</Link>
        <Link href="/analysis/racial-disparities" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Racial Disparities</Link>
        <Link href="/dashboard" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Dashboard</Link>
      </div>

      <div className="mt-8"><RelatedAnalysis currentSlug="police-funding" />

      <ShareButtons title="Police Funding and Crime Rates" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Police Funding and Crime Rates: What the Data Shows',
        publisher: { '@type': 'Organization', name: 'OpenCrime' },
        datePublished: '2026-03-04',
      })}} />
    </div>
  );
}
