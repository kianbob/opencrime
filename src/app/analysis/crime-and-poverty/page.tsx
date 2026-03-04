import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import { loadData, fmtNum, fmtPct, fmtRate } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Crime and Poverty — What the Data Actually Shows',
  description: 'Deep analysis of the relationship between economic conditions and crime rates. State-by-state data, international comparisons, and why poverty concentration drives crime patterns.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/crime-and-poverty' },
};

type StateSummary = {
  abbr: string;
  name: string;
  population: number;
  violentCrime: number;
  violentRate: number;
  homicide: number;
  homicideRate: number;
  propertyCrime: number;
  propertyRate: number;
};

type ArrestData = {
  byRace: Array<{
    offense: string;
    total: number;
    white: number;
    black: number;
  }>;
};

export default function CrimeAndPovertyPage() {
  const stateData = loadData<StateSummary[]>('state-summary.json');
  const arrestData = loadData<ArrestData>('arrest-data.json');
  
  // Get top states by violent crime rate
  const topViolentStates = stateData
    .filter(state => state.population > 500000) // Filter out very small states
    .sort((a, b) => b.violentRate - a.violentRate)
    .slice(0, 10);
    
  // Get lowest crime states
  const lowestViolentStates = stateData
    .filter(state => state.population > 500000)
    .sort((a, b) => a.violentRate - b.violentRate)
    .slice(0, 10);
    
  // Get property crime leaders
  const topPropertyStates = stateData
    .filter(state => state.population > 500000)
    .sort((a, b) => b.propertyRate - a.propertyRate)
    .slice(0, 10);

  const totalViolentCrime = stateData.reduce((sum, state) => sum + state.violentCrime, 0);
  const totalPropertyCrime = stateData.reduce((sum, state) => sum + state.propertyCrime, 0);
  const totalHomicides = stateData.reduce((sum, state) => sum + state.homicide, 0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "Does poverty cause crime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The relationship between poverty and crime is complex. While individual poverty doesn't directly cause crime, concentrated poverty in neighborhoods creates conditions that increase crime risk: limited opportunities, weakened social institutions, and reduced informal social control."
      }
    }, {
      "@type": "Question",
      "name": "Which states have the highest crime rates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `The highest violent crime rates are found in ${topViolentStates[0]?.name} (${topViolentStates[0]?.violentRate.toFixed(1)} per 100K), ${topViolentStates[1]?.name}, and ${topViolentStates[2]?.name}. These often correlate with higher poverty rates and urban concentration.`
      }
    }, {
      "@type": "Question",
      "name": "Why do some poor countries have low crime rates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Crime isn't just about absolute poverty but relative deprivation, inequality, and social cohesion. Countries with strong social institutions, cultural cohesion, and less inequality can have low crime despite lower incomes."
      }
    }, {
      "@type": "Question",
      "name": "How does inequality affect crime differently than poverty?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Income inequality may be more predictive of crime than absolute poverty levels. Large gaps between rich and poor, especially when visible and concentrated geographically, can increase crime rates even in relatively wealthy areas."
      }
    }]
  };

  const aiInsights = [
    `States with highest poverty rates often have elevated violent crime rates`,
    `Property crime shows different patterns — sometimes higher in wealthy areas`,
    `Concentrated poverty matters more than individual poverty for crime rates`,
    `International data shows inequality may matter more than absolute poverty`,
    `Rural poverty has different crime patterns than urban poverty`,
    `Economic opportunity and social mobility are key factors in crime prevention`
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <Breadcrumbs items={[{label:'Analysis',href:'/analysis'},{label:'Crime and Poverty'}]} />
      <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">ANALYSIS</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">Crime and Poverty — What the Data Actually Shows</h1>
      <p className="text-lg text-gray-600 mb-8">
        The relationship between economic conditions and crime is more complex than simple causation. Here's what 
        state-by-state data, international comparisons, and decades of research reveal about poverty, inequality, and crime.
      </p>

      <AIOverview insights={aiInsights} />

      <div className="bg-gray-900 text-white rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4 text-center">Crime and Economics: Key Statistics</h2>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{fmtNum(totalViolentCrime)}</div>
            <div className="text-gray-300 text-sm">US Violent Crimes (2024)</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtNum(totalPropertyCrime)}</div>
            <div className="text-gray-300 text-sm">Property Crimes</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{topViolentStates[0]?.violentRate.toFixed(0)}</div>
            <div className="text-gray-300 text-sm">Highest State Rate (per 100K)</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{(topViolentStates[0]?.violentRate / lowestViolentStates[0]?.violentRate).toFixed(1)}x</div>
            <div className="text-gray-300 text-sm">High vs Low State Gap</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 leading-relaxed">
          "Poverty causes crime" is one of the most common assumptions in criminal justice policy. But the actual 
          relationship between economic conditions and crime is far more nuanced than this simple formula suggests. 
          Understanding what the data actually shows is crucial for effective anti-crime strategies.
        </p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Poverty-Crime Connection: What We Know</h2>
        
        <p>
          Research consistently shows relationships between economic conditions and crime, but the mechanisms are 
          complex and the patterns vary significantly by crime type, geography, and social context.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Individual vs. Concentrated Poverty</h3>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h4 className="font-semibold mb-3 text-blue-800">Key Distinction</h4>
          <p className="text-sm mb-3">
            Individual poverty (one poor person in a middle-class neighborhood) has different effects than concentrated 
            poverty (entire neighborhoods with high poverty rates). The concentration effect is often more important 
            for understanding crime patterns.
          </p>
          <div className="text-xs bg-white p-3 rounded">
            <strong>Research finding:</strong> A poor person in a wealthy neighborhood has much lower crime risk than an identical person in a high-poverty neighborhood.
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">How Individual Poverty Affects Crime</h4>
            <ul className="text-sm space-y-2">
              <li>• Limited legitimate opportunities for income</li>
              <li>• Stress and family instability</li>
              <li>• Reduced access to quality education</li>
              <li>• Health and mental health impacts</li>
              <li>• But: most poor people don't commit crimes</li>
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-orange-800">How Concentrated Poverty Affects Crime</h4>
            <ul className="text-sm space-y-2">
              <li>• Weak social institutions (schools, businesses)</li>
              <li>• Reduced informal social control</li>
              <li>• Limited role models for legitimate success</li>
              <li>• Physical environment deterioration</li>
              <li>• Concentration of social problems</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">State-by-State Analysis: Crime and Economic Patterns</h2>
        
        <p>
          Examining crime rates across US states provides insights into how economic conditions relate to different 
          types of criminal activity.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Highest Violent Crime Rate States</h3>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">State</th>
              <th className="text-right px-4 py-2">Violent Rate</th>
              <th className="text-right px-4 py-2">Murder Rate</th>
              <th className="text-right px-4 py-2">Property Rate</th>
              <th className="px-4 py-2">Economic Factors</th>
            </tr>
          </thead>
          <tbody>
            {topViolentStates.slice(0, 10).map(state => (
              <tr key={state.abbr} className="border-t">
                <td className="px-4 py-2 font-medium">{state.name}</td>
                <td className="px-4 py-2 text-right font-mono">{state.violentRate.toFixed(1)}</td>
                <td className="px-4 py-2 text-right font-mono">{state.homicideRate.toFixed(1)}</td>
                <td className="px-4 py-2 text-right font-mono">{state.propertyRate.toFixed(1)}</td>
                <td className="px-4 py-2 text-xs">
                  {state.abbr === 'DC' && 'High inequality, urban concentration'}
                  {state.abbr === 'AK' && 'High cost of living, isolation'}
                  {state.abbr === 'NM' && 'High poverty, rural challenges'}
                  {state.abbr === 'TN' && 'Mixed urban/rural, moderate poverty'}
                  {state.abbr === 'AR' && 'High poverty, rural areas'}
                  {state.abbr === 'LA' && 'High poverty, urban concentration'}
                  {state.abbr === 'MO' && 'Urban violence, economic decline'}
                  {state.abbr === 'SC' && 'Rural/urban mix, moderate poverty'}
                  {state.abbr === 'AL' && 'High poverty, rural challenges'}
                  {state.abbr === 'MD' && 'Urban concentration, high inequality'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Lowest Violent Crime Rate States</h3>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">State</th>
              <th className="text-right px-4 py-2">Violent Rate</th>
              <th className="text-right px-4 py-2">Murder Rate</th>
              <th className="text-right px-4 py-2">Property Rate</th>
              <th className="px-4 py-2">Economic Profile</th>
            </tr>
          </thead>
          <tbody>
            {lowestViolentStates.slice(0, 10).map(state => (
              <tr key={state.abbr} className="border-t">
                <td className="px-4 py-2 font-medium">{state.name}</td>
                <td className="px-4 py-2 text-right font-mono">{state.violentRate.toFixed(1)}</td>
                <td className="px-4 py-2 text-right font-mono">{state.homicideRate.toFixed(1)}</td>
                <td className="px-4 py-2 text-right font-mono">{state.propertyRate.toFixed(1)}</td>
                <td className="px-4 py-2 text-xs">
                  {state.abbr === 'ME' && 'Low inequality, rural, older population'}
                  {state.abbr === 'NH' && 'Low poverty, high education'}
                  {state.abbr === 'VT' && 'Low inequality, strong institutions'}
                  {state.abbr === 'UT' && 'Strong social cohesion, low inequality'}
                  {state.abbr === 'CT' && 'High income, good institutions'}
                  {state.abbr === 'RI' && 'Small state, stable communities'}
                  {state.abbr === 'MA' && 'High education, strong economy'}
                  {state.abbr === 'HI' && 'Geographic isolation, tourism economy'}
                  {state.abbr === 'WY' && 'Low density, resource economy'}
                  {state.abbr === 'ID' && 'Low density, stable communities'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Property Crime Patterns</h3>
        
        <p>
          Property crime shows different relationships to economic conditions than violent crime. Sometimes, property 
          crime is higher in wealthier areas where there are more valuable targets.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Highest Property Crime States</th>
              <th className="text-right px-4 py-2">Property Rate</th>
              <th className="text-right px-4 py-2">Violent Rate</th>
              <th className="px-4 py-2">Pattern</th>
            </tr>
          </thead>
          <tbody>
            {topPropertyStates.slice(0, 8).map(state => (
              <tr key={state.abbr} className="border-t">
                <td className="px-4 py-2 font-medium">{state.name}</td>
                <td className="px-4 py-2 text-right font-mono">{state.propertyRate.toFixed(1)}</td>
                <td className="px-4 py-2 text-right font-mono">{state.violentRate.toFixed(1)}</td>
                <td className="px-4 py-2 text-xs">
                  {state.propertyRate > state.violentRate * 5 ? 'High property, lower violent' : 'High property and violent'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-yellow-800">Property vs. Violent Crime Patterns</h4>
          <p className="text-sm mb-3">
            Notice that some states with high property crime rates have relatively low violent crime rates. This reflects 
            different underlying causes: property crime is often more opportunistic and economically motivated, while 
            violent crime is more closely tied to social disorganization and interpersonal conflict.
          </p>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Understanding the Mechanisms</h2>
        
        <p>
          How exactly do economic conditions influence crime? Research has identified several pathways through which 
          poverty and inequality can affect criminal behavior.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Direct Economic Pathways</h3>
        
        <div className="space-y-4 mb-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-5">
            <h4 className="font-semibold mb-2 text-red-800">Strain Theory</h4>
            <p className="text-sm">
              When legitimate opportunities for achieving economic success are blocked, some people turn to illegitimate 
              means. This is especially relevant for property crime and drug dealing, where the economic motivation is direct.
            </p>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-5">
            <h4 className="font-semibold mb-2 text-blue-800">Relative Deprivation</h4>
            <p className="text-sm">
              Crime may be more influenced by relative poverty (being poor compared to others nearby) than absolute 
              poverty. Visible inequality can increase feelings of injustice and resentment that motivate criminal behavior.
            </p>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-500 p-5">
            <h4 className="font-semibold mb-2 text-green-800">Opportunity Cost</h4>
            <p className="text-sm">
              When legitimate work pays very little or is unavailable, the opportunity cost of crime decreases. 
              If someone can't earn a living wage legally, illegal activities become more attractive by comparison.
            </p>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Indirect Social Pathways</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-purple-800">Social Disorganization</h4>
            <ul className="text-sm space-y-2">
              <li>• Poverty weakens community institutions</li>
              <li>• High residential mobility disrupts social bonds</li>
              <li>• Families under stress provide less supervision</li>
              <li>• Informal social control mechanisms break down</li>
              <li>• Collective efficacy (neighbors working together) declines</li>
            </ul>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-indigo-800">Cultural/Social Learning</h4>
            <ul className="text-sm space-y-2">
              <li>• Limited exposure to conventional role models</li>
              <li>• Subcultures that normalize rule-breaking</li>
              <li>• Peer groups with higher crime involvement</li>
              <li>• Reduced investment in conventional activities</li>
              <li>• Different risk-benefit calculations become normal</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">International Perspective: Poverty vs. Inequality</h2>
        
        <p>
          Looking at crime patterns across different countries reveals that absolute poverty may be less important than 
          inequality and social cohesion in explaining crime rates.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Crime and Economics Around the World</h3>
        
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Country</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Homicide Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Income Level</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Inequality (Gini)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Pattern</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Japan</td>
                <td className="border border-gray-300 px-4 py-2">0.26</td>
                <td className="border border-gray-300 px-4 py-2">High</td>
                <td className="border border-gray-300 px-4 py-2">32.9</td>
                <td className="border border-gray-300 px-4 py-2">Low inequality, low crime</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">South Korea</td>
                <td className="border border-gray-300 px-4 py-2">0.60</td>
                <td className="border border-gray-300 px-4 py-2">High</td>
                <td className="border border-gray-300 px-4 py-2">35.4</td>
                <td className="border border-gray-300 px-4 py-2">Moderate inequality, low crime</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Germany</td>
                <td className="border border-gray-300 px-4 py-2">0.95</td>
                <td className="border border-gray-300 px-4 py-2">High</td>
                <td className="border border-gray-300 px-4 py-2">31.9</td>
                <td className="border border-gray-300 px-4 py-2">Low inequality, low crime</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">United States</td>
                <td className="border border-gray-300 px-4 py-2">5.35</td>
                <td className="border border-gray-300 px-4 py-2">High</td>
                <td className="border border-gray-300 px-4 py-2">41.4</td>
                <td className="border border-gray-300 px-4 py-2">High inequality, high crime</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Brazil</td>
                <td className="border border-gray-300 px-4 py-2">27.4</td>
                <td className="border border-gray-300 px-4 py-2">Middle</td>
                <td className="border border-gray-300 px-4 py-2">53.4</td>
                <td className="border border-gray-300 px-4 py-2">Very high inequality, very high crime</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">South Africa</td>
                <td className="border border-gray-300 px-4 py-2">36.4</td>
                <td className="border border-gray-300 px-4 py-2">Middle</td>
                <td className="border border-gray-300 px-4 py-2">63.0</td>
                <td className="border border-gray-300 px-4 py-2">Extreme inequality, extreme crime</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Bangladesh</td>
                <td className="border border-gray-300 px-4 py-2">2.1</td>
                <td className="border border-gray-300 px-4 py-2">Low</td>
                <td className="border border-gray-300 px-4 py-2">32.4</td>
                <td className="border border-gray-300 px-4 py-2">Low income, low inequality, moderate crime</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">India</td>
                <td className="border border-gray-300 px-4 py-2">2.8</td>
                <td className="border border-gray-300 px-4 py-2">Lower-middle</td>
                <td className="border border-gray-300 px-4 py-2">35.7</td>
                <td className="border border-gray-300 px-4 py-2">Low income, moderate inequality, moderate crime</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Key International Lessons</h3>
        
        <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-teal-800">Inequality vs. Absolute Poverty</h4>
          <p className="text-sm mb-3">
            Countries like Japan and Germany have much lower crime rates than the US despite similar wealth levels. 
            The key difference appears to be inequality: countries with more equal income distributions tend to have 
            lower crime rates, regardless of absolute income levels.
          </p>
          <p className="text-sm">
            Conversely, some very poor countries have lower crime rates than much wealthier but more unequal societies.
          </p>
        </div>

        <ul>
          <li><strong>Social cohesion matters:</strong> Countries with strong social institutions, cultural homogeneity, and collective values often have low crime despite economic challenges</li>
          <li><strong>Visible inequality is problematic:</strong> When rich and poor live in close proximity, inequality becomes more salient and potentially crime-inducing</li>
          <li><strong>Institutional quality is crucial:</strong> Countries with corruption, weak rule of law, and poor governance have higher crime regardless of income levels</li>
          <li><strong>Safety nets reduce crime:</strong> Strong social welfare systems may reduce the crime-inducing effects of poverty and inequality</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Urban vs. Rural Poverty and Crime</h2>
        
        <p>
          The relationship between poverty and crime plays out differently in urban and rural environments, with distinct 
          patterns and underlying mechanisms.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Urban Poverty and Crime</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">Urban Poverty Characteristics</h4>
            <ul className="text-sm space-y-2">
              <li>• High population density</li>
              <li>• Concentrated disadvantage</li>
              <li>• Visible inequality</li>
              <li>• Anonymous social environments</li>
              <li>• Drug markets and gangs</li>
              <li>• Stressed institutions (schools, police)</li>
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-orange-800">Resulting Crime Patterns</h4>
            <ul className="text-sm space-y-2">
              <li>• High violent crime rates</li>
              <li>• Drug-related violence</li>
              <li>• Gang activity</li>
              <li>• Property crime (theft, burglary)</li>
              <li>• Homicide concentrated in specific areas</li>
              <li>• Cyclical violence patterns</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Rural Poverty and Crime</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Rural Poverty Characteristics</h4>
            <ul className="text-sm space-y-2">
              <li>• Geographic isolation</li>
              <li>• Economic dependence on single industries</li>
              <li>• Limited social services</li>
              <li>• Strong informal social control</li>
              <li>• Fewer legitimate opportunities</li>
              <li>• Substance abuse issues</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Resulting Crime Patterns</h4>
            <ul className="text-sm space-y-2">
              <li>• Lower violent crime rates overall</li>
              <li>• Domestic violence</li>
              <li>• Property crime (theft, burglary)</li>
              <li>• Drug production and trafficking</li>
              <li>• Environmental crime</li>
              <li>• Higher suicide rates</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Role of Economic Opportunity</h2>
        
        <p>
          Beyond simple measures of poverty, the availability of legitimate economic opportunities appears crucial 
          for understanding crime patterns.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Labor Markets and Crime</h3>
        
        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 border-l-4 border-gray-500 p-5">
            <h4 className="font-semibold mb-2 text-gray-800">Employment Quality Matters</h4>
            <p className="text-sm mb-3">
              Research shows that not just unemployment but the quality of available jobs affects crime rates. Areas 
              with only low-wage, unstable employment may have higher crime rates than areas with good-paying, stable jobs.
            </p>
          </div>
          
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5">
            <h4 className="font-semibold mb-2 text-indigo-800">Economic Transitions</h4>
            <p className="text-sm mb-3">
              Communities experiencing rapid economic change — whether boom or bust — often see temporary increases in 
              crime as social structures adjust. The "resource curse" and boomtown effects are examples of how even 
              economic growth can temporarily increase crime.
            </p>
          </div>
          
          <div className="bg-teal-50 border-l-4 border-teal-500 p-5">
            <h4 className="font-semibold mb-2 text-teal-800">Economic Mobility</h4>
            <p className="text-sm mb-3">
              Areas with good opportunities for economic advancement — through education, entrepreneurship, or career 
              ladders — tend to have lower crime rates than areas where people feel trapped in poverty regardless of effort.
            </p>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Underground Economy</h3>
        
        <p>
          In many high-crime areas, illegal economic activities create alternative opportunity structures that can 
          perpetuate crime patterns.
        </p>

        <ul>
          <li><strong>Drug markets:</strong> Provide income opportunities but generate violence through competition and enforcement</li>
          <li><strong>Theft and fencing:</strong> Create informal economies around stolen goods</li>
          <li><strong>Protection rackets:</strong> Fill gaps left by weak formal institutions</li>
          <li><strong>Informal lending:</strong> High-interest lending and debt collection through intimidation</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Environmental and Contextual Factors</h2>
        
        <p>
          The physical and social environment mediates the relationship between poverty and crime in important ways.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Built Environment</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-yellow-800">Crime-Promoting Environments</h4>
            <ul className="text-sm space-y-2">
              <li>• Abandoned buildings and vacant lots</li>
              <li>• Poor lighting and limited visibility</li>
              <li>• Lack of public spaces and activities</li>
              <li>• Physical disorder (graffiti, litter)</li>
              <li>• Limited legitimate businesses</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Crime-Reducing Environments</h4>
            <ul className="text-sm space-y-2">
              <li>• Well-maintained public spaces</li>
              <li>• Mixed-use development</li>
              <li>• "Eyes on the street" (natural surveillance)</li>
              <li>• Community gathering places</li>
              <li>• Investment in local businesses</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Lead Exposure and Environmental Toxins</h3>
        
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-red-800">The Lead-Crime Connection</h4>
          <p className="text-sm mb-3">
            Researchers have found correlations between childhood lead exposure and later criminal behavior. Lead exposure 
            was historically higher in poor, urban areas due to lead paint and industrial pollution. The phase-out of 
            leaded gasoline coincided with crime declines in many countries.
          </p>
          <p className="text-sm">
            While not definitively proven, this suggests that environmental factors associated with poverty may have 
            biological effects that influence behavior.
          </p>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Policy Implications</h2>
        
        <p>
          Understanding the complex relationship between economic conditions and crime suggests that effective anti-crime 
          policies must address both immediate security needs and underlying economic and social conditions.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Economic Development Approaches</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Direct Economic Interventions</h4>
            <ul className="text-sm space-y-2">
              <li>• Job training and placement programs</li>
              <li>• Small business development and microfinance</li>
              <li>• Living wage initiatives</li>
              <li>• Infrastructure investment</li>
              <li>• Attract businesses to high-crime areas</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Social and Human Capital</h4>
            <ul className="text-sm space-y-2">
              <li>• Education quality improvements</li>
              <li>• Early childhood development programs</li>
              <li>• Mental health and addiction services</li>
              <li>• Community organization support</li>
              <li>• Mentorship and role model programs</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Place-Based Strategies</h3>
        
        <ul>
          <li><strong>Comprehensive community initiatives:</strong> Coordinate multiple interventions in specific high-crime neighborhoods</li>
          <li><strong>Mixed-income housing:</strong> Reduce concentrated poverty through housing policy</li>
          <li><strong>Business district revitalization:</strong> Create legitimate economic activity in high-crime areas</li>
          <li><strong>Environmental improvements:</strong> Address physical disorder and improve public spaces</li>
          <li><strong>Transit and mobility:</strong> Connect isolated poor neighborhoods to job opportunities</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Key Takeaways</h2>
        
        <div className="bg-gray-900 text-white rounded-xl p-8 mb-8">
          <h3 className="font-heading text-xl font-bold mb-6 text-center">Crime and Poverty: What the Data Shows</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">The Complex Relationship</h4>
              <ul className="text-sm space-y-2">
                <li>• Poverty doesn't directly "cause" crime, but creates risk factors</li>
                <li>• Concentrated poverty is more important than individual poverty</li>
                <li>• Inequality may matter more than absolute poverty levels</li>
                <li>• Economic opportunity quality affects crime more than just income</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">Geographic Patterns</h4>
              <ul className="text-sm space-y-2">
                <li>• High-crime states often have higher poverty and inequality</li>
                <li>• Property crime patterns differ from violent crime patterns</li>
                <li>• Urban and rural poverty create different crime patterns</li>
                <li>• International data shows inequality is key factor</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="font-semibold mb-3 text-yellow-300">Policy Implications</h4>
            <p className="text-sm">
              Effective crime reduction requires addressing both immediate public safety needs and underlying economic 
              and social conditions. This includes improving legitimate economic opportunities, strengthening community 
              institutions, and reducing concentrated disadvantage through comprehensive, place-based approaches.
            </p>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6 mb-8">
          <div>
            <h4 className="font-semibold mb-2">Does poverty cause crime?</h4>
            <p className="text-sm text-gray-700">
              The relationship between poverty and crime is complex. While individual poverty doesn't directly cause crime, 
              concentrated poverty in neighborhoods creates conditions that increase crime risk: limited opportunities, 
              weakened social institutions, and reduced informal social control.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Which states have the highest crime rates?</h4>
            <p className="text-sm text-gray-700">
              The highest violent crime rates are found in {topViolentStates[0]?.name} ({topViolentStates[0]?.violentRate.toFixed(1)} per 100K), 
              {topViolentStates[1]?.name}, and {topViolentStates[2]?.name}. These often correlate with higher poverty rates and urban concentration.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Why do some poor countries have low crime rates?</h4>
            <p className="text-sm text-gray-700">
              Crime isn't just about absolute poverty but relative deprivation, inequality, and social cohesion. Countries 
              with strong social institutions, cultural cohesion, and less inequality can have low crime despite lower incomes.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">How does inequality affect crime differently than poverty?</h4>
            <p className="text-sm text-gray-700">
              Income inequality may be more predictive of crime than absolute poverty levels. Large gaps between rich and poor, 
              especially when visible and concentrated geographically, can increase crime rates even in relatively wealthy areas.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">What's the most effective way to reduce poverty-related crime?</h4>
            <p className="text-sm text-gray-700">
              Research suggests comprehensive approaches work best: improving legitimate economic opportunities, strengthening 
              community institutions, investing in education and social services, and addressing concentrated disadvantage 
              through place-based strategies.
            </p>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Related Analysis</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link href="/analysis/rural-vs-urban" className="block bg-[#1e3a5f] text-white rounded-lg p-4 hover:bg-[#2a4d7a] transition">
            <h4 className="font-semibold mb-2">Rural vs Urban Crime</h4>
            <p className="text-sm opacity-90">How crime patterns differ between urban and rural areas</p>
          </Link>
          
          <Link href="/analysis/crime-by-race" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Crime by Race</h4>
            <p className="text-sm text-gray-600">Racial disparities and socioeconomic factors in crime</p>
          </Link>
          
          <Link href="/states" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">State Crime Profiles</h4>
            <p className="text-sm text-gray-600">Detailed crime statistics for all 50 states</p>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="crime-and-poverty" />
        <ShareButtons title="Crime and Poverty — What the Data Actually Shows" />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Crime and Poverty — What the Data Actually Shows',
        publisher: { '@type': 'Organization', name: 'OpenCrime' },
        datePublished: '2026-03-04',
      })}} />
    </div>
  );
}