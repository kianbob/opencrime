import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'America\'s Murder Map — Where Homicides Actually Happen',
  description: 'Geographic analysis of murder in America. Top 10 cities account for 21% of all homicides, state murder rates vary 25x, weapon patterns, and victim-offender relationships.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/murder-map' },
};

type Analytics = {
  concentration: {
    top10: {
      murders: number;
      murderPct: number;
      popPct: number;
      cities: Array<{
        city: string;
        state: string;
        murders: number;
      }>;
    };
  };
};

type StateSummary = {
  abbr: string;
  name: string;
  population: number;
  homicide: number;
  homicideRate: number;
  violentCrime: number;
  violentRate: number;
};

type HomicideData = {
  weaponBreakdown: Array<{
    weapon: string;
    count: number;
    pct: number;
  }>;
  circumstanceBreakdown: Array<{
    circumstance: string;
    count: number;
  }>;
  relationship: Array<{
    relationship: string;
    count: number;
  }>;
  victimAge: Array<{
    age: string;
    count: number;
  }>;
  victimSex: Array<{
    sex: string;
    count: number;
  }>;
  victimRace: Array<{
    race: string;
    count: number;
  }>;
};

export default function MurderMapPage() {
  const analytics = loadData<Analytics>('analytics.json');
  const stateData = loadData<StateSummary[]>('state-summary.json');
  const homicideData = loadData<HomicideData>('homicide-data.json');
  
  // Sort states by murder rate
  const highestMurderStates = stateData
    .filter(state => state.population > 300000) // Filter out very small states
    .sort((a, b) => b.homicideRate - a.homicideRate)
    .slice(0, 15);
    
  const lowestMurderStates = stateData
    .filter(state => state.population > 300000)
    .sort((a, b) => a.homicideRate - b.homicideRate)
    .slice(0, 15);
    
  const totalHomicides = stateData.reduce((sum, state) => sum + state.homicide, 0);
  const totalVictims = homicideData.victimSex.reduce((sum, v) => sum + v.count, 0);
  
  // Get weapons data
  const firearms = homicideData.weaponBreakdown.filter(w => 
    w.weapon.toLowerCase().includes('firearm') || 
    w.weapon.toLowerCase().includes('handgun') || 
    w.weapon.toLowerCase().includes('rifle') || 
    w.weapon.toLowerCase().includes('shotgun')
  );
  const firearmTotal = firearms.reduce((sum, f) => sum + f.count, 0);
  
  // Get relationship data
  const knownRelationships = homicideData.relationship.filter(r => 
    !r.relationship.toLowerCase().includes('unknown')
  );
  const totalKnownRelationships = knownRelationships.reduce((sum, r) => sum + r.count, 0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "Which cities have the most murders?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `The top 10 cities account for ${analytics.concentration.top10.murderPct}% of all US murders (${fmtNum(analytics.concentration.top10.murders)} homicides) despite having only ${analytics.concentration.top10.popPct}% of the population. Chicago leads with ${fmtNum(analytics.concentration.top10.cities[0]?.murders || 0)} murders.`
      }
    }, {
      "@type": "Question",
      "name": "Which states have the highest murder rates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${highestMurderStates[0]?.name} has the highest murder rate at ${highestMurderStates[0]?.homicideRate.toFixed(1)} per 100,000, followed by ${highestMurderStates[1]?.name} and ${highestMurderStates[2]?.name}. Southern states are overrepresented among high-murder states.`
      }
    }, {
      "@type": "Question",
      "name": "What weapons are used most in murders?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Firearms are used in ${((firearmTotal / totalVictims) * 100).toFixed(1)}% of murders, making them by far the most common murder weapon. Handguns account for the majority of firearm murders.`
      }
    }, {
      "@type": "Question",
      "name": "Are most murders committed by strangers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, most murders are committed by people known to the victim. Among cases with known relationships, acquaintances, family members, and intimate partners account for the majority of murders."
      }
    }]
  };

  const aiInsights = [
    `Top 10 cities = ${analytics.concentration.top10.murderPct}% of all US murders but only ${analytics.concentration.top10.popPct}% of population`,
    `Murder rates vary ${(highestMurderStates[0]?.homicideRate / lowestMurderStates[0]?.homicideRate).toFixed(0)}x between highest and lowest states`,
    `${((firearmTotal / totalVictims) * 100).toFixed(1)}% of murders involve firearms, mostly handguns`,
    `Most murders occur between people who know each other`,
    `Southern and Western states dominate high-murder rankings`,
    `Urban concentration: Most murder happens in specific city neighborhoods`
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <Breadcrumbs items={[{label:'Analysis',href:'/analysis'},{label:'America\'s Murder Map'}]} />
      <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">ANALYSIS</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">America's Murder Map — Where Homicides Actually Happen</h1>
      <p className="text-lg text-gray-600 mb-8">
        Murder in America isn't randomly distributed. It concentrates in specific cities, states, and even 
        neighborhoods. Here's where homicides actually occur and what the patterns reveal about violence in America.
      </p>

      <AIOverview insights={aiInsights} />

      <div className="bg-red-900 text-white rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4 text-center">America's Murder Geography</h2>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{fmtNum(totalHomicides)}</div>
            <div className="text-red-200 text-sm">Total US Murders (2024)</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{analytics.concentration.top10.murderPct}%</div>
            <div className="text-red-200 text-sm">Top 10 Cities' Share</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{(highestMurderStates[0]?.homicideRate / lowestMurderStates[0]?.homicideRate).toFixed(0)}x</div>
            <div className="text-red-200 text-sm">State Rate Variation</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{((firearmTotal / totalVictims) * 100).toFixed(1)}%</div>
            <div className="text-red-200 text-sm">Firearm Murders</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 leading-relaxed">
          If you want to understand murder in America, you need to understand geography. Homicide isn't evenly spread 
          across the country — it concentrates in specific places that account for vastly disproportionate shares of 
          the national total. This concentration has profound implications for both understanding and preventing violence.
        </p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Urban Concentration of Murder</h2>
        
        <p>
          Perhaps the most striking feature of American homicide is its concentration in a small number of cities. 
          Just 10 cities account for more than one-fifth of all murders in the United States.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Top 10 Murder Cities (2024)</h3>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">City</th>
              <th className="text-right px-4 py-2">Murders</th>
              <th className="text-right px-4 py-2">% of US Total</th>
              <th className="px-4 py-2">Share Visual</th>
              <th className="px-4 py-2">Primary Factors</th>
            </tr>
          </thead>
          <tbody>
            {analytics.concentration.top10.cities.map((city, index) => {
              const cityPct = (city.murders / totalHomicides) * 100;
              return (
                <tr key={`${city.city}-${city.state}`} className="border-t">
                  <td className="px-4 py-2 font-medium">{city.city}, {city.state}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtNum(city.murders)}</td>
                  <td className="px-4 py-2 text-right font-mono">{cityPct.toFixed(2)}%</td>
                  <td className="px-4 py-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, cityPct * 3)}%` }} 
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2 text-xs">
                    {city.city === 'Chicago' && 'Gang violence, segregation, poverty concentration'}
                    {city.city === 'New York' && 'Large population base, specific high-crime areas'}
                    {city.city === 'Los Angeles' && 'Gang territories, drug markets, size'}
                    {city.city === 'Houston' && 'Rapid growth, economic inequality'}
                    {city.city === 'Philadelphia' && 'Drug markets, neighborhood violence'}
                    {city.city === 'Memphis' && 'High poverty, limited opportunities'}
                    {city.city === 'Detroit' && 'Economic decline, population loss'}
                    {city.city === 'Baltimore' && 'Drug trade, institutional breakdown'}
                    {city.city === 'Washington' && 'Historical drug markets, inequality'}
                    {city.city === 'Milwaukee' && 'Segregation, concentrated poverty'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
          <h4 className="font-semibold mb-3 text-red-800">The Concentration Effect</h4>
          <p className="text-sm mb-3">
            These top 10 cities contain {analytics.concentration.top10.popPct}% of the US population but account for 
            {analytics.concentration.top10.murderPct}% of murders. This means the murder rate in these cities is 
            roughly {(analytics.concentration.top10.murderPct / analytics.concentration.top10.popPct).toFixed(1)} times 
            the national average.
          </p>
          <p className="text-sm">
            Within these cities, murder is further concentrated in specific neighborhoods, often accounting for the 
            majority of a city's homicides despite representing small fractions of the population.
          </p>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Neighborhood-Level Concentration</h3>
        
        <p>
          Even within high-murder cities, homicide is extremely concentrated at the neighborhood level. Research 
          consistently shows that:
        </p>

        <ul>
          <li><strong>1% of street segments</strong> typically account for 25% of a city's crime</li>
          <li><strong>5% of neighborhoods</strong> often account for 50% of homicides</li>
          <li><strong>Specific blocks</strong> can have murder rates 100x higher than other areas in the same city</li>
          <li><strong>Hot spots</strong> remain remarkably stable over time — the same corners stay dangerous for years</li>
        </ul>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-orange-800">High-Violence Neighborhoods</h4>
            <ul className="text-sm space-y-2">
              <li>• Concentrated poverty (often 30%+ poverty rate)</li>
              <li>• High vacancy rates and abandoned buildings</li>
              <li>• Limited legitimate businesses</li>
              <li>• Drug markets and territorial disputes</li>
              <li>• Weak institutional presence</li>
              <li>• Historical disinvestment</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Low-Violence Neighborhoods</h4>
            <ul className="text-sm space-y-2">
              <li>• Mixed-income or middle-class residents</li>
              <li>• Strong informal social control</li>
              <li>• Active community organizations</li>
              <li>• Quality schools and services</li>
              <li>• Well-maintained public spaces</li>
              <li>• Economic investment and stability</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">State-by-State Murder Patterns</h2>
        
        <p>
          Murder rates vary dramatically across US states, with the highest-rate states having murder rates more than 
          25 times higher than the lowest.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Highest Murder Rate States</h3>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">State</th>
              <th className="text-right px-4 py-2">Murder Rate</th>
              <th className="text-right px-4 py-2">Total Murders</th>
              <th className="text-right px-4 py-2">Violent Rate</th>
              <th className="px-4 py-2">Regional Pattern</th>
            </tr>
          </thead>
          <tbody>
            {highestMurderStates.slice(0, 12).map(state => (
              <tr key={state.abbr} className="border-t">
                <td className="px-4 py-2 font-medium">{state.name}</td>
                <td className="px-4 py-2 text-right font-mono">{state.homicideRate.toFixed(1)}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(state.homicide)}</td>
                <td className="px-4 py-2 text-right font-mono">{state.violentRate.toFixed(1)}</td>
                <td className="px-4 py-2 text-xs">
                  {['DC', 'LA', 'MS', 'AL', 'MO', 'AR', 'SC', 'TN', 'MD', 'GA', 'NC', 'FL'].includes(state.abbr) ? 
                    'South/Border' : 'Other'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Lowest Murder Rate States</h3>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">State</th>
              <th className="text-right px-4 py-2">Murder Rate</th>
              <th className="text-right px-4 py-2">Total Murders</th>
              <th className="text-right px-4 py-2">Violent Rate</th>
              <th className="px-4 py-2">Regional Pattern</th>
            </tr>
          </thead>
          <tbody>
            {lowestMurderStates.slice(0, 12).map(state => (
              <tr key={state.abbr} className="border-t">
                <td className="px-4 py-2 font-medium">{state.name}</td>
                <td className="px-4 py-2 text-right font-mono">{state.homicideRate.toFixed(1)}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(state.homicide)}</td>
                <td className="px-4 py-2 text-right font-mono">{state.violentRate.toFixed(1)}</td>
                <td className="px-4 py-2 text-xs">
                  {['ME', 'NH', 'VT', 'MA', 'RI', 'CT', 'HI'].includes(state.abbr) ? 
                    'Northeast/Island' : 
                    ['UT', 'ID', 'WY', 'MT', 'ND', 'SD', 'IA'].includes(state.abbr) ?
                    'Mountain/Plains' : 'Other'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Regional Patterns in Murder</h3>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-blue-800">The Southern Pattern</h4>
          <p className="text-sm mb-3">
            Southern states are dramatically overrepresented among high-murder states. Of the top 15 states for murder 
            rate, roughly 75% are in the South or Border regions. This pattern has persisted for decades and reflects 
            complex historical, cultural, and economic factors.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">South/Border States</h4>
            <ul className="text-sm space-y-2">
              <li>• Higher poverty rates</li>
              <li>• Greater income inequality</li>
              <li>• Historical culture of honor/violence</li>
              <li>• Weaker social safety nets</li>
              <li>• Legacy of institutional racism</li>
              <li>• Higher gun ownership</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Northeast/New England</h4>
            <ul className="text-sm space-y-2">
              <li>• Lower poverty rates</li>
              <li>• Better social institutions</li>
              <li>• Higher education levels</li>
              <li>• Stronger social cohesion</li>
              <li>• More restrictive gun laws</li>
              <li>• Better economic opportunity</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Mountain/Plains States</h4>
            <ul className="text-sm space-y-2">
              <li>• Lower population density</li>
              <li>• Stronger social cohesion</li>
              <li>• Less concentrated poverty</li>
              <li>• Lower racial/ethnic diversity</li>
              <li>• Rural/small town social control</li>
              <li>• Economic stability</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Urban vs. Rural Murder Patterns</h2>
        
        <p>
          The relationship between urbanization and murder is complex. While cities have higher murder rates overall, 
          the patterns and causes differ significantly from rural homicide.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Urban Murder Characteristics</h3>
        
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Factor</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Urban Pattern</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Rural Pattern</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Explanation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Rate</td>
                <td className="border border-gray-300 px-4 py-2">Higher overall</td>
                <td className="border border-gray-300 px-4 py-2">Lower overall</td>
                <td className="border border-gray-300 px-4 py-2">Concentrated disadvantage vs. social control</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Victim Age</td>
                <td className="border border-gray-300 px-4 py-2">Younger (18-34)</td>
                <td className="border border-gray-300 px-4 py-2">More varied</td>
                <td className="border border-gray-300 px-4 py-2">Gang/street violence vs. domestic/personal</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Weapons</td>
                <td className="border border-gray-300 px-4 py-2">Primarily handguns</td>
                <td className="border border-gray-300 px-4 py-2">Mix of firearms</td>
                <td className="border border-gray-300 px-4 py-2">Concealment vs. availability</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Motive</td>
                <td className="border border-gray-300 px-4 py-2">Disputes, drugs, gangs</td>
                <td className="border border-gray-300 px-4 py-2">Domestic, arguments</td>
                <td className="border border-gray-300 px-4 py-2">Anonymous vs. personal conflicts</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Clearance Rate</td>
                <td className="border border-gray-300 px-4 py-2">Lower (50-60%)</td>
                <td className="border border-gray-300 px-4 py-2">Higher (70-80%)</td>
                <td className="border border-gray-300 px-4 py-2">Witness cooperation vs. community knowledge</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Location</td>
                <td className="border border-gray-300 px-4 py-2">Public spaces, streets</td>
                <td className="border border-gray-300 px-4 py-2">Homes, private property</td>
                <td className="border border-gray-300 px-4 py-2">Activity patterns and social spaces</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Murder Weapons and Methods</h2>
        
        <p>
          Understanding the weapons used in murder provides insights into the nature of homicidal violence and has 
          important policy implications.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Weapon Distribution in US Murders</h3>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Weapon Type</th>
              <th className="text-right px-4 py-2">Count</th>
              <th className="text-right px-4 py-2">% of Total</th>
              <th className="px-4 py-2">Share</th>
            </tr>
          </thead>
          <tbody>
            {homicideData.weaponBreakdown.slice(0, 10).map(weapon => (
              <tr key={weapon.weapon} className="border-t">
                <td className="px-4 py-2 font-medium">{weapon.weapon}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(weapon.count)}</td>
                <td className="px-4 py-2 text-right font-mono">{weapon.pct}%</td>
                <td className="px-4 py-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full" 
                      style={{ width: `${weapon.pct * 2}%` }} 
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-yellow-800">Firearm Dominance</h4>
          <p className="text-sm mb-3">
            Firearms account for {((firearmTotal / totalVictims) * 100).toFixed(1)}% of all murders, with handguns being 
            the most common specific weapon type. This concentration has important implications for both prevention and 
            policy approaches.
          </p>
          <p className="text-sm">
            The high lethality rate of firearms compared to other weapons means that gun availability can turn non-fatal 
            disputes into homicides.
          </p>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Geographic Patterns in Weapon Use</h3>
        
        <ul>
          <li><strong>Urban areas:</strong> Handguns dominate due to concealment needs and availability through illegal markets</li>
          <li><strong>Rural areas:</strong> More diverse weapon use including rifles, shotguns, and other implements</li>
          <li><strong>Southern states:</strong> Higher overall firearm use in homicides correlates with gun ownership rates</li>
          <li><strong>Gang-related:</strong> Almost exclusively firearms, particularly semi-automatic handguns</li>
          <li><strong>Domestic violence:</strong> Mixed weapon patterns depending on what's available in the home</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Victim-Offender Relationships</h2>
        
        <p>
          One of the most important and misunderstood aspects of murder is the relationship between victims and offenders. 
          Contrary to popular perception, most murders are not random stranger violence.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Who Kills Whom</h3>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Relationship</th>
              <th className="text-right px-4 py-2">Count</th>
              <th className="text-right px-4 py-2">% of Known</th>
              <th className="px-4 py-2">Implications</th>
            </tr>
          </thead>
          <tbody>
            {homicideData.relationship.slice(0, 10).map(rel => {
              const pct = rel.relationship.toLowerCase().includes('unknown') ? 
                'N/A' : 
                ((rel.count / totalKnownRelationships) * 100).toFixed(1) + '%';
              return (
                <tr key={rel.relationship} className="border-t">
                  <td className="px-4 py-2 font-medium">{rel.relationship}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtNum(rel.count)}</td>
                  <td className="px-4 py-2 text-right font-mono">{pct}</td>
                  <td className="px-4 py-2 text-xs">
                    {rel.relationship === 'Acquaintance' && 'Most common known relationship'}
                    {rel.relationship === 'Stranger' && 'True random violence is uncommon'}
                    {rel.relationship.includes('Wife') && 'Domestic violence prevention'}
                    {rel.relationship.includes('Son') && 'Family intervention opportunities'}
                    {rel.relationship.includes('Friend') && 'Dispute mediation potential'}
                    {rel.relationship === 'Unknown' && 'Investigation/clearance issue'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-green-800">The "Stranger Danger" Myth</h4>
          <p className="text-sm mb-3">
            Among murders with known victim-offender relationships, stranger homicides account for a minority of cases. 
            Most murders involve people who know each other — acquaintances, family members, intimate partners, or 
            friends who turned violent.
          </p>
          <p className="text-sm">
            This has important implications for prevention: many murders might be preventable through conflict resolution, 
            domestic violence intervention, and community mediation programs.
          </p>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Circumstances of Murder</h3>
        
        <p>
          Understanding the circumstances that lead to murder provides insights into prevention opportunities.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Circumstance</th>
              <th className="text-right px-4 py-2">Count</th>
              <th className="text-right px-4 py-2">% of Total</th>
              <th className="px-4 py-2">Prevention Angle</th>
            </tr>
          </thead>
          <tbody>
            {homicideData.circumstanceBreakdown.slice(0, 8).map(circ => {
              const pct = ((circ.count / totalVictims) * 100).toFixed(1);
              return (
                <tr key={circ.circumstance} className="border-t">
                  <td className="px-4 py-2 font-medium">{circ.circumstance}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtNum(circ.count)}</td>
                  <td className="px-4 py-2 text-right font-mono">{pct}%</td>
                  <td className="px-4 py-2 text-xs">
                    {circ.circumstance.includes('argument') && 'Conflict resolution, de-escalation training'}
                    {circ.circumstance.includes('Unknown') && 'Better investigation, clearance rates'}
                    {circ.circumstance.includes('drug') && 'Treatment, harm reduction, market disruption'}
                    {circ.circumstance.includes('gang') && 'Violence interruption, gang intervention'}
                    {circ.circumstance.includes('robbery') && 'Economic opportunity, target hardening'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Temporal and Seasonal Patterns</h2>
        
        <p>
          Murder doesn't occur randomly in time. There are predictable patterns by season, day of week, and time of 
          day that provide insights into the social contexts of homicidal violence.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">When Murder Happens</h3>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">Seasonal Patterns</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Summer peak:</strong> July-August highest murder months</li>
              <li>• <strong>Heat effect:</strong> Higher temperatures correlate with violence</li>
              <li>• <strong>School calendar:</strong> Youth violence peaks when school's out</li>
              <li>• <strong>Holiday effects:</strong> Some holidays see violence spikes</li>
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-orange-800">Weekly Patterns</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Weekend peak:</strong> Friday-Sunday highest risk days</li>
              <li>• <strong>Party violence:</strong> Social gatherings and alcohol</li>
              <li>• <strong>Domestic violence:</strong> Family time increases contact</li>
              <li>• <strong>Reduced services:</strong> Fewer interventions available</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-yellow-800">Daily Patterns</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Evening peak:</strong> 6 PM - midnight highest risk</li>
              <li>• <strong>Social hours:</strong> When people interact most</li>
              <li>• <strong>Alcohol factor:</strong> Peak drinking hours</li>
              <li>• <strong>Police shifts:</strong> Fewer officers on some shifts</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">International Context: How America Compares</h2>
        
        <p>
          America's murder rate is dramatically higher than other developed countries, but how does it compare to global 
          patterns and what does this tell us about solutions?
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Global Murder Rates</h3>
        
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Country</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Murder Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Region</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Primary Factors</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">El Salvador</td>
                <td className="border border-gray-300 px-4 py-2">52.0</td>
                <td className="border border-gray-300 px-4 py-2">Central America</td>
                <td className="border border-gray-300 px-4 py-2">Gang violence, drug trade, weak institutions</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Jamaica</td>
                <td className="border border-gray-300 px-4 py-2">48.0</td>
                <td className="border border-gray-300 px-4 py-2">Caribbean</td>
                <td className="border border-gray-300 px-4 py-2">Drug trafficking, gang activity</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">South Africa</td>
                <td className="border border-gray-300 px-4 py-2">36.4</td>
                <td className="border border-gray-300 px-4 py-2">Southern Africa</td>
                <td className="border border-gray-300 px-4 py-2">Inequality, apartheid legacy, crime</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Brazil</td>
                <td className="border border-gray-300 px-4 py-2">27.4</td>
                <td className="border border-gray-300 px-4 py-2">South America</td>
                <td className="border border-gray-300 px-4 py-2">Urban violence, inequality, favelas</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">United States</td>
                <td className="border border-gray-300 px-4 py-2">5.4</td>
                <td className="border border-gray-300 px-4 py-2">North America</td>
                <td className="border border-gray-300 px-4 py-2">Urban violence, guns, inequality</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Russia</td>
                <td className="border border-gray-300 px-4 py-2">4.3</td>
                <td className="border border-gray-300 px-4 py-2">Eastern Europe</td>
                <td className="border border-gray-300 px-4 py-2">Organized crime, alcohol, instability</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Canada</td>
                <td className="border border-gray-300 px-4 py-2">1.8</td>
                <td className="border border-gray-300 px-4 py-2">North America</td>
                <td className="border border-gray-300 px-4 py-2">Strong institutions, less inequality</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">United Kingdom</td>
                <td className="border border-gray-300 px-4 py-2">1.2</td>
                <td className="border border-gray-300 px-4 py-2">Western Europe</td>
                <td className="border border-gray-300 px-4 py-2">Gun control, strong institutions</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Germany</td>
                <td className="border border-gray-300 px-4 py-2">0.9</td>
                <td className="border border-gray-300 px-4 py-2">Western Europe</td>
                <td className="border border-gray-300 px-4 py-2">Social cohesion, economic opportunity</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Japan</td>
                <td className="border border-gray-300 px-4 py-2">0.3</td>
                <td className="border border-gray-300 px-4 py-2">East Asia</td>
                <td className="border border-gray-300 px-4 py-2">Low inequality, social conformity, gun control</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Prevention and Policy Implications</h2>
        
        <p>
          Understanding the geographic, temporal, and social patterns of murder provides crucial insights for prevention 
          strategies and resource allocation.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Place-Based Prevention</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Hot Spot Policing</h4>
            <ul className="text-sm space-y-2">
              <li>• Focus resources on specific high-crime locations</li>
              <li>• Evidence shows 10-15% reductions possible</li>
              <li>• Can be combined with community services</li>
              <li>• More efficient than random patrol</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Environmental Design</h4>
            <ul className="text-sm space-y-2">
              <li>• Improve lighting in high-crime areas</li>
              <li>• Remove abandoned buildings and vacant lots</li>
              <li>• Create legitimate activity in problem areas</li>
              <li>• Design spaces for natural surveillance</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Relationship-Based Prevention</h3>
        
        <ul>
          <li><strong>Domestic violence intervention:</strong> Address intimate partner and family violence before it escalates</li>
          <li><strong>Conflict mediation:</strong> Community programs to resolve disputes before they turn violent</li>
          <li><strong>Violence interruption:</strong> Credible messengers intervening in brewing conflicts</li>
          <li><strong>Social network approaches:</strong> Identify and work with high-risk social networks</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Key Takeaways</h2>
        
        <div className="bg-gray-900 text-white rounded-xl p-8 mb-8">
          <h3 className="font-heading text-xl font-bold mb-6 text-center">America's Murder Map: Essential Patterns</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">Geographic Concentration</h4>
              <ul className="text-sm space-y-2">
                <li>• Top 10 cities = {analytics.concentration.top10.murderPct}% of US murders</li>
                <li>• Murder rates vary {(highestMurderStates[0]?.homicideRate / lowestMurderStates[0]?.homicideRate).toFixed(0)}x between states</li>
                <li>• Southern states dominate high-murder rankings</li>
                <li>• Within cities, extreme neighborhood concentration</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">Victim-Offender Patterns</h4>
              <ul className="text-sm space-y-2">
                <li>• Most murders involve people who know each other</li>
                <li>• Firearms used in {((firearmTotal / totalVictims) * 100).toFixed(1)}% of murders</li>
                <li>• Arguments and disputes are leading circumstances</li>
                <li>• Summer and weekend peaks in violence</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="font-semibold mb-3 text-yellow-300">Policy Implications</h4>
            <p className="text-sm">
              Murder prevention should focus on specific places (hot spots), relationships (conflict mediation, domestic 
              violence), and times (summer/weekend interventions). The extreme geographic concentration means targeted 
              interventions can have disproportionate impact on national murder rates.
            </p>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6 mb-8">
          <div>
            <h4 className="font-semibold mb-2">Which cities have the most murders?</h4>
            <p className="text-sm text-gray-700">
              The top 10 cities account for {analytics.concentration.top10.murderPct}% of all US murders ({fmtNum(analytics.concentration.top10.murders)} homicides) 
              despite having only {analytics.concentration.top10.popPct}% of the population. Chicago leads with {fmtNum(analytics.concentration.top10.cities[0]?.murders || 0)} murders.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Which states have the highest murder rates?</h4>
            <p className="text-sm text-gray-700">
              {highestMurderStates[0]?.name} has the highest murder rate at {highestMurderStates[0]?.homicideRate.toFixed(1)} per 100,000, 
              followed by {highestMurderStates[1]?.name} and {highestMurderStates[2]?.name}. Southern states are overrepresented among high-murder states.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">What weapons are used most in murders?</h4>
            <p className="text-sm text-gray-700">
              Firearms are used in {((firearmTotal / totalVictims) * 100).toFixed(1)}% of murders, making them by far the most common murder weapon. 
              Handguns account for the majority of firearm murders.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Are most murders committed by strangers?</h4>
            <p className="text-sm text-gray-700">
              No, most murders are committed by people known to the victim. Among cases with known relationships, 
              acquaintances, family members, and intimate partners account for the majority of murders.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">How does America's murder rate compare globally?</h4>
            <p className="text-sm text-gray-700">
              The US murder rate (5.4 per 100,000) is much higher than other developed countries like Canada (1.8), 
              UK (1.2), or Japan (0.3), but lower than many Latin American and African countries with rates of 20-50+ per 100,000.
            </p>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Related Analysis</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link href="/analysis/gun-violence" className="block bg-[#1e3a5f] text-white rounded-lg p-4 hover:bg-[#2a4d7a] transition">
            <h4 className="font-semibold mb-2">Gun Violence Analysis</h4>
            <p className="text-sm opacity-90">Comprehensive analysis of firearms in US homicide</p>
          </Link>
          
          <Link href="/most-dangerous-cities" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Most Dangerous Cities</h4>
            <p className="text-sm text-gray-600">City-by-city crime rates and murder statistics</p>
          </Link>
          
          <Link href="/states" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">State Crime Data</h4>
            <p className="text-sm text-gray-600">Complete state-by-state crime and murder data</p>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="murder-map" />
        <ShareButtons title="America's Murder Map — Where Homicides Actually Happen" />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'America\'s Murder Map — Where Homicides Actually Happen',
        publisher: { '@type': 'Organization', name: 'OpenCrime' },
        datePublished: '2026-03-04',
      })}} />
    </div>
  );
}