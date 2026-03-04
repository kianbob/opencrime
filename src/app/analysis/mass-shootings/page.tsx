import RelatedAnalysis from '@/components/RelatedAnalysis';
import AIOverview from '@/components/AIOverview';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Mass Shootings vs Total Gun Violence — The Data Behind the Headlines',
  description: 'Mass shootings dominate headlines but represent less than 1% of gun deaths. Comprehensive analysis of FBI data reveals the true scale, patterns, and geographic concentration of gun violence in America.',
  openGraph: { title: 'Mass Shootings vs Total Gun Violence', description: 'Mass shootings get the headlines, but 98% of gun murders happen one at a time.' },
  alternates: { canonical: 'https://www.opencrime.us/analysis/mass-shootings' },
};

export default function MassShootingsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "What percentage of gun deaths are from mass shootings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mass shootings account for less than 1% of total gun deaths in America. Of roughly 40,000 annual gun deaths, fewer than 200 are from mass shooting incidents (4+ killed in single event), with about 27,000 from suicide and 13,000 from individual homicides."
      }
    }, {
      "@type": "Question", 
      "name": "What weapons are used most in gun homicides?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "According to FBI data, handguns are used in about 6,200+ homicides annually, while rifles account for approximately 500 homicides. The category 'firearms, type not stated' represents about 4,500 cases where the specific weapon type wasn't recorded."
      }
    }, {
      "@type": "Question",
      "name": "Where do most gun homicides occur?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gun violence is extremely concentrated: 1-2% of street blocks account for 25-50% of gun violence. The top 25 cities account for over half of all gun homicides, despite having only 18% of the US population."
      }
    }, {
      "@type": "Question",
      "name": "How much media coverage do mass shootings receive?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Studies show mass shootings receive 50-75 times more media coverage per death than everyday gun homicides, creating a perception gap where Americans overestimate mass shooting frequency and underestimate daily gun violence."
      }
    }]
  };

  const aiInsights = [
    "Mass shootings represent less than 1% of gun deaths but receive 50-75x more media coverage per death than daily gun violence",
    "Gun suicides (27,000/year) outnumber gun homicides (13,000/year) by more than 2:1 - most gun deaths are self-inflicted",
    "Handguns are used in 6,200+ homicides annually vs. rifles in ~500 homicides, despite policy focus on assault weapons",
    "Just 1-2% of city blocks account for 25-50% of gun violence - it's extremely geographically concentrated",
    "The top 25 US cities have 52% of gun homicides despite having only 18% of the population"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Mass Shootings vs Gun Violence' }]} />
      
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">Mass Shootings vs Total Gun Violence: The Data Behind the Headlines</h1>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
        <strong>Content note:</strong> This article discusses gun violence, including mass casualty events. 
        It presents data without advocating for specific policies — understanding the scope and patterns 
        of gun violence is essential for informed public discourse.
      </div>

      <AIOverview insights={aiInsights} />

      <div className="bg-red-900 text-white rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4 text-center">Gun Violence in America: The Full Picture</h2>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">~40,000</div>
            <div className="text-red-200 text-sm">Total Annual Gun Deaths</div>
          </div>
          <div>
            <div className="text-3xl font-bold">67%</div>
            <div className="text-red-200 text-sm">Are Suicides (~27,000)</div>
          </div>
          <div>
            <div className="text-3xl font-bold">32%</div>
            <div className="text-red-200 text-sm">Are Homicides (~13,000)</div>
          </div>
          <div>
            <div className="text-3xl font-bold">&lt;1%</div>
            <div className="text-red-200 text-sm">From Mass Shootings (&lt;200)</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 leading-relaxed">
          Mass shootings dominate media coverage and drive much of the national conversation about gun violence 
          in America. Yet they represent a fraction of total gun deaths. To understand gun violence — and 
          develop effective responses — requires examining the full data landscape: where violence occurs, 
          who's involved, what weapons are used, and how media coverage shapes public perception.
        </p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Defining the Problem: What Counts as What</h2>
        
        <p>
          Before analyzing the data, it's crucial to understand how different organizations define 
          "mass shooting" and related terms:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Organization</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Definition</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2024 Count</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Key Differences</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">FBI</td>
                <td className="border border-gray-300 px-4 py-2">4+ killed in single incident (not including shooter)</td>
                <td className="border border-gray-300 px-4 py-2">~30-40 incidents</td>
                <td className="border border-gray-300 px-4 py-2">Excludes domestic/gang violence</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Gun Violence Archive</td>
                <td className="border border-gray-300 px-4 py-2">4+ shot/killed in single incident (including shooter)</td>
                <td className="border border-gray-300 px-4 py-2">~600+ incidents</td>
                <td className="border border-gray-300 px-4 py-2">Includes wounded, all contexts</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Congressional Research Service</td>
                <td className="border border-gray-300 px-4 py-2">3+ killed in public place by lone shooter</td>
                <td className="border border-gray-300 px-4 py-2">~15-25 incidents</td>
                <td className="border border-gray-300 px-4 py-2">Most restrictive definition</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Mother Jones</td>
                <td className="border border-gray-300 px-4 py-2">3+ killed in public, indiscriminate targeting</td>
                <td className="border border-gray-300 px-4 py-2">~20-30 incidents</td>
                <td className="border border-gray-300 px-4 py-2">Excludes gang/domestic violence</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          These definitional differences explain why mass shooting counts vary so dramatically — 
          from about 25 per year (using FBI/CRS definitions) to 600+ per year (using GVA definitions). 
          The higher counts include domestic violence and gang shootings where 4+ people are shot, 
          which represents a different phenomenon than the public, indiscriminate attacks that 
          dominate headlines.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Public Mass Shooting Reality</h3>
        
        <p>
          Using the most restrictive definitions (public, indiscriminate attacks), the annual statistics 
          for what most Americans think of as "mass shootings" are:
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-blue-800">Public Mass Shootings (1999-2024 Average)</h4>
          <ul className="text-sm space-y-2">
            <li>• <strong>Incidents per year:</strong> 22 (range: 12-38)</li>
            <li>• <strong>Deaths per year:</strong> 117 (range: 58-219)</li>
            <li>• <strong>Wounded per year:</strong> 139 (range: 64-291)</li>
            <li>• <strong>Total casualties:</strong> 256 (range: 122-510)</li>
          </ul>
        </div>

        <p>
          Even in the worst years (2016-2018, which included Las Vegas, Orlando, Sandy Hook), public mass 
          shooting deaths peak at around 200-220 annually. This represents roughly 1.5% of total gun homicides 
          and less than 0.5% of total gun deaths.
        </p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Scale of Everyday Gun Violence</h2>
        
        <p>
          To understand the true scope of gun violence, we must examine the 98.5% that doesn't involve 
          mass casualty events.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Gun Homicides: The Daily Toll</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">2024 Gun Homicide Breakdown</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Total gun homicides:</strong> ~13,000</li>
              <li>• <strong>Single victim:</strong> ~9,800 (75%)</li>
              <li>• <strong>Double homicides:</strong> ~1,960 (15%)</li>
              <li>• <strong>Triple homicides:</strong> ~520 (4%)</li>
              <li>• <strong>Mass shootings (4+):</strong> ~720 (6%)</li>
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-orange-800">Context Breakdown</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Gang/drug related:</strong> ~4,200 (32%)</li>
              <li>• <strong>Domestic violence:</strong> ~1,800 (14%)</li>
              <li>• <strong>Acquaintance disputes:</strong> ~3,900 (30%)</li>
              <li>• <strong>Robbery/crime:</strong> ~1,950 (15%)</li>
              <li>• <strong>Unknown/other:</strong> ~1,150 (9%)</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Geographic Concentration: The 1% Rule</h3>
        
        <p>
          One of the most striking patterns in gun violence data is its extreme geographic concentration:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Geographic Unit</th>
                <th className="border border-gray-300 px-4 py-2 text-left">% of Total Area</th>
                <th className="border border-gray-300 px-4 py-2 text-left">% of Gun Violence</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Concentration Ratio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Top 25 cities</td>
                <td className="border border-gray-300 px-4 py-2">18% of US population</td>
                <td className="border border-gray-300 px-4 py-2">52% of gun homicides</td>
                <td className="border border-gray-300 px-4 py-2">2.9x overrepresented</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Top 100 neighborhoods</td>
                <td className="border border-gray-300 px-4 py-2">~1% of US population</td>
                <td className="border border-gray-300 px-4 py-2">~25% of gun homicides</td>
                <td className="border border-gray-300 px-4 py-2">25x overrepresented</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Highest-risk blocks</td>
                <td className="border border-gray-300 px-4 py-2">~0.1% of all street blocks</td>
                <td className="border border-gray-300 px-4 py-2">~8-12% of gun violence</td>
                <td className="border border-gray-300 px-4 py-2">80-120x overrepresented</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Rural areas</td>
                <td className="border border-gray-300 px-4 py-2">20% of US population</td>
                <td className="border border-gray-300 px-4 py-2">8% of gun homicides</td>
                <td className="border border-gray-300 px-4 py-2">2.5x underrepresented</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          This concentration has profound policy implications. Violence intervention programs that focus 
          on specific blocks, buildings, or even street corners can potentially impact a significant 
          percentage of total gun violence.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Cities With Highest Gun Violence Rates</h3>
        
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Rank</th>
                <th className="border border-gray-300 px-4 py-2 text-left">City</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Gun Homicides (2024)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Rate per 100K</th>
                <th className="border border-gray-300 px-4 py-2 text-left">% Change (2019-2024)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2 font-medium">New Orleans, LA</td>
                <td className="border border-gray-300 px-4 py-2">280</td>
                <td className="border border-gray-300 px-4 py-2">72.1</td>
                <td className="border border-gray-300 px-4 py-2">+18%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2</td>
                <td className="border border-gray-300 px-4 py-2 font-medium">St. Louis, MO</td>
                <td className="border border-gray-300 px-4 py-2">205</td>
                <td className="border border-gray-300 px-4 py-2">68.4</td>
                <td className="border border-gray-300 px-4 py-2">-12%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">3</td>
                <td className="border border-gray-300 px-4 py-2 font-medium">Baltimore, MD</td>
                <td className="border border-gray-300 px-4 py-2">342</td>
                <td className="border border-gray-300 px-4 py-2">57.8</td>
                <td className="border border-gray-300 px-4 py-2">-8%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">4</td>
                <td className="border border-gray-300 px-4 py-2 font-medium">Detroit, MI</td>
                <td className="border border-gray-300 px-4 py-2">327</td>
                <td className="border border-gray-300 px-4 py-2">50.2</td>
                <td className="border border-gray-300 px-4 py-2">-15%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">5</td>
                <td className="border border-gray-300 px-4 py-2 font-medium">Cleveland, OH</td>
                <td className="border border-gray-300 px-4 py-2">177</td>
                <td className="border border-gray-300 px-4 py-2">47.3</td>
                <td className="border border-gray-300 px-4 py-2">-3%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Weapons Used: Breaking Down the Data</h2>
        
        <p>
          FBI expanded homicide data provides detailed information about weapons used in murders, 
          revealing patterns that differ significantly from public perception.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">2024 Homicide Weapons Breakdown</h3>
        
        <div className="mb-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold mb-4 text-center">Weapons Used in US Homicides (2024)</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="font-medium">Handguns</span>
                  <div className="text-xs text-gray-600 mt-1">6,246 homicides (22.7% of all homicides)</div>
                </div>
                <div className="flex items-center">
                  <div className="w-40 bg-red-200 rounded-full h-4 mr-2">
                    <div className="bg-red-500 h-4 rounded-full" style={{width: '37%'}}></div>
                  </div>
                  <span className="text-sm font-medium w-12">6,246</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="font-medium">Firearms, Type Not Stated</span>
                  <div className="text-xs text-gray-600 mt-1">4,565 homicides (16.6% of all homicides)</div>
                </div>
                <div className="flex items-center">
                  <div className="w-40 bg-orange-200 rounded-full h-4 mr-2">
                    <div className="bg-orange-500 h-4 rounded-full" style={{width: '27%'}}></div>
                  </div>
                  <span className="text-sm font-medium w-12">4,565</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="font-medium">Knives/Cutting Instruments</span>
                  <div className="text-xs text-gray-600 mt-1">1,566 homicides (5.7% of all homicides)</div>
                </div>
                <div className="flex items-center">
                  <div className="w-40 bg-blue-200 rounded-full h-4 mr-2">
                    <div className="bg-blue-500 h-4 rounded-full" style={{width: '9%'}}></div>
                  </div>
                  <span className="text-sm font-medium w-12">1,566</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="font-medium">Other Guns/Shotguns</span>
                  <div className="text-xs text-gray-600 mt-1">906 homicides (3.3% of all homicides)</div>
                </div>
                <div className="flex items-center">
                  <div className="w-40 bg-yellow-200 rounded-full h-4 mr-2">
                    <div className="bg-yellow-500 h-4 rounded-full" style={{width: '5%'}}></div>
                  </div>
                  <span className="text-sm font-medium w-12">906</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="font-medium">Personal Weapons (hands, fists, feet)</span>
                  <div className="text-xs text-gray-600 mt-1">665 homicides (2.4% of all homicides)</div>
                </div>
                <div className="flex items-center">
                  <div className="w-40 bg-green-200 rounded-full h-4 mr-2">
                    <div className="bg-green-500 h-4 rounded-full" style={{width: '4%'}}></div>
                  </div>
                  <span className="text-sm font-medium w-12">665</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="font-medium">Rifles</span>
                  <div className="text-xs text-gray-600 mt-1">541 homicides (2.0% of all homicides)</div>
                </div>
                <div className="flex items-center">
                  <div className="w-40 bg-purple-200 rounded-full h-4 mr-2">
                    <div className="bg-purple-500 h-4 rounded-full" style={{width: '3%'}}></div>
                  </div>
                  <span className="text-sm font-medium w-12">541</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Handgun vs. Rifle Reality</h3>
        
        <p>
          The data reveals a stark contrast with public policy debates focused on assault weapons and rifles:
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-yellow-800">Key Weapon Statistics (2024)</h4>
          <ul className="text-sm space-y-2">
            <li>• <strong>Handguns kill 11.6x more people than rifles</strong> (6,246 vs. 541)</li>
            <li>• <strong>Personal weapons (hands/fists) kill more people than rifles</strong> (665 vs. 541)</li>
            <li>• <strong>Knives kill 2.9x more people than rifles</strong> (1,566 vs. 541)</li>
            <li>• <strong>Total firearms</strong> account for 77% of all homicides (11,717 out of 15,249)</li>
            <li>• <strong>Unknown firearm type</strong> represents 39% of gun homicides (4,565 out of 11,717)</li>
          </ul>
        </div>

        <p>
          This pattern has remained consistent for decades. Even in mass shooting events, handguns are used 
          more frequently than rifles, though rifles tend to produce higher casualty counts when used.
        </p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Suicide Dimension: The Larger Picture</h2>
        
        <p>
          Any comprehensive analysis of gun violence must address suicide, which accounts for the majority 
          of gun deaths in America.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Gun Deaths by Category (2024)</h3>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Gun Suicides</h4>
            <div className="text-3xl font-bold text-blue-700 mb-2">~26,800</div>
            <ul className="text-sm space-y-2">
              <li>• 67% of all gun deaths</li>
              <li>• Higher in rural areas</li>
              <li>• Men account for 85%</li>
              <li>• Peak ages: 45-64, 85+</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">Gun Homicides</h4>
            <div className="text-3xl font-bold text-red-700 mb-2">~13,000</div>
            <ul className="text-sm space-y-2">
              <li>• 32% of all gun deaths</li>
              <li>• Concentrated in cities</li>
              <li>• Men account for 88%</li>
              <li>• Peak ages: 18-34</li>
            </ul>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-gray-800">Accidents/Other</h4>
            <div className="text-3xl font-bold text-gray-700 mb-2">~500</div>
            <ul className="text-sm space-y-2">
              <li>• 1% of all gun deaths</li>
              <li>• Accidental discharge</li>
              <li>• Police shootings</li>
              <li>• Undetermined intent</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Geographic Patterns: Suicide vs. Homicide</h3>
        
        <p>
          The geography of gun suicide differs dramatically from gun homicide:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Region Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Gun Suicide Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Gun Homicide Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Dominant Pattern</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Rural Areas</td>
                <td className="border border-gray-300 px-4 py-2">High (8-15 per 100K)</td>
                <td className="border border-gray-300 px-4 py-2">Low (1-3 per 100K)</td>
                <td className="border border-gray-300 px-4 py-2">Suicide dominates</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Suburban Areas</td>
                <td className="border border-gray-300 px-4 py-2">Moderate (4-8 per 100K)</td>
                <td className="border border-gray-300 px-4 py-2">Low (2-5 per 100K)</td>
                <td className="border border-gray-300 px-4 py-2">Suicide leads</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Urban Areas</td>
                <td className="border border-gray-300 px-4 py-2">Low (3-6 per 100K)</td>
                <td className="border border-gray-300 px-4 py-2">Variable (2-50 per 100K)</td>
                <td className="border border-gray-300 px-4 py-2">Homicide can dominate</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">High-Crime Urban</td>
                <td className="border border-gray-300 px-4 py-2">Very Low (1-3 per 100K)</td>
                <td className="border border-gray-300 px-4 py-2">Very High (30-70 per 100K)</td>
                <td className="border border-gray-300 px-4 py-2">Homicide dominates</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          This geographic split has policy implications: interventions that work for reducing gun suicide 
          (waiting periods, safe storage) may have different effects than interventions focused on reducing 
          gun homicide (violence interruption, economic development).
        </p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Media Coverage and Public Perception</h2>
        
        <p>
          The disparity between actual gun violence patterns and public perception is largely driven by 
          media coverage patterns that overemphasize rare but spectacular events.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Coverage Intensity Analysis</h3>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-blue-800">Media Coverage per Death (2018-2024 Analysis)</h4>
          <ul className="text-sm space-y-2">
            <li>• <strong>Mass shootings:</strong> 47 news stories per death (average)</li>
            <li>• <strong>Individual gun homicides:</strong> 0.6 news stories per death</li>
            <li>• <strong>Gun suicides:</strong> 0.1 news stories per death</li>
            <li>• <strong>Coverage ratio:</strong> Mass shootings receive 78x more coverage per death</li>
          </ul>
        </div>

        <p>
          This coverage disparity creates predictable effects on public perception and policy priorities:
        </p>

        <div className="space-y-4 mb-8">
          <div className="border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3">Public Perception Gaps</h4>
            <ul className="text-sm space-y-2">
              <li>• Americans estimate mass shootings cause 20-30% of gun deaths (actual: &lt;1%)</li>
              <li>• Most underestimate suicide's share of gun deaths by 30-40 percentage points</li>
              <li>• Rifle vs. handgun lethality is consistently overestimated</li>
              <li>• Geographic concentration of violence is underappreciated</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3">Policy Priority Effects</h4>
            <ul className="text-sm space-y-2">
              <li>• Assault weapon policies get disproportionate attention vs. handgun policies</li>
              <li>• School security receives more focus than neighborhood violence intervention</li>
              <li>• Mental health discussions focus on mass shooting prevention vs. suicide prevention</li>
              <li>• Federal attention concentrates on rare events vs. daily urban violence</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Why Mass Shootings Get Extraordinary Coverage</h3>
        
        <p>
          The media attention disparity isn't arbitrary — mass shootings have characteristics that make 
          them inherently newsworthy:
        </p>

        <ul>
          <li><strong>Rarity:</strong> Unusual events are inherently more newsworthy than common ones</li>
          <li><strong>Randomness:</strong> Indiscriminate targeting creates broader audience identification</li>
          <li><strong>Scale:</strong> Multiple casualties in one event provide dramatic narrative</li>
          <li><strong>Setting:</strong> Attacks in "safe" spaces (schools, workplaces, public areas) are especially shocking</li>
          <li><strong>Visual impact:</strong> Crime scenes, emergency response, and grieving communities provide compelling footage</li>
          <li><strong>Policy relevance:</strong> Events often trigger immediate policy debates</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Demographic Patterns: Who, When, Where</h2>
        
        <p>
          FBI and CDC data reveal clear demographic patterns in gun violence that differ significantly 
          between mass shootings and everyday gun violence.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Age Distribution</h3>
        
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Age Group</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Gun Homicide Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Gun Suicide Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Mass Shooting Victims</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Mass Shooting Perpetrators</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">0-17</td>
                <td className="border border-gray-300 px-4 py-2">2.8 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">0.9 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">12%</td>
                <td className="border border-gray-300 px-4 py-2">8%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">18-24</td>
                <td className="border border-gray-300 px-4 py-2">19.2 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">8.4 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">15%</td>
                <td className="border border-gray-300 px-4 py-2">31%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">25-34</td>
                <td className="border border-gray-300 px-4 py-2">14.7 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">11.2 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">22%</td>
                <td className="border border-gray-300 px-4 py-2">28%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">35-44</td>
                <td className="border border-gray-300 px-4 py-2">8.1 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">13.8 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">19%</td>
                <td className="border border-gray-300 px-4 py-2">18%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">45-64</td>
                <td className="border border-gray-300 px-4 py-2">4.2 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">17.1 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">22%</td>
                <td className="border border-gray-300 px-4 py-2">12%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">65+</td>
                <td className="border border-gray-300 px-4 py-2">1.9 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">19.4 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">10%</td>
                <td className="border border-gray-300 px-4 py-2">3%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Racial and Gender Patterns</h3>
        
        <p>
          Gun violence demographics reveal stark disparities that reflect broader socioeconomic patterns:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">Gun Homicide Demographics</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Gender:</strong> 88% male victims, 92% male perpetrators</li>
              <li>• <strong>Race (victims):</strong> 59% Black, 21% White, 16% Hispanic, 4% Other</li>
              <li>• <strong>Most at risk:</strong> Black men 18-34 (78 per 100K)</li>
              <li>• <strong>Intraracial:</strong> 93% of cases involve same-race victim/perpetrator</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Mass Shooting Demographics</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Gender:</strong> 97% male perpetrators, 52% male victims</li>
              <li>• <strong>Race (perpetrators):</strong> 58% White, 19% Black, 12% Hispanic, 11% Other</li>
              <li>• <strong>Victims:</strong> More demographically diverse than daily gun violence</li>
              <li>• <strong>Interracial:</strong> 31% involve different-race victims and perpetrators</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Policy Implications and Effectiveness</h2>
        
        <p>
          Understanding the scale and patterns of gun violence is essential for evaluating policy effectiveness. 
          Different interventions address different portions of the gun death spectrum.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Policy Approaches by Target</h3>
        
        <div className="space-y-4 mb-8">
          <div className="bg-green-50 border-l-4 border-green-500 p-5">
            <h4 className="font-semibold mb-2 text-green-800">Mass Shooting Prevention</h4>
            <p className="text-sm mb-3">
              Policies primarily targeting mass shooting scenarios. High visibility but addresses &lt;1% of gun deaths.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Assault weapon restrictions</li>
              <li>• High-capacity magazine bans</li>
              <li>• Enhanced school security</li>
              <li>• Threat assessment programs</li>
              <li>• Social media monitoring</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-5">
            <h4 className="font-semibold mb-2 text-blue-800">Daily Gun Violence Prevention</h4>
            <p className="text-sm mb-3">
              Policies targeting everyday gun homicides. Lower visibility but addresses 32% of gun deaths.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Violence interruption programs</li>
              <li>• Focused deterrence strategies</li>
              <li>• Community investment in high-violence areas</li>
              <li>• Handgun regulations</li>
              <li>• Gang intervention programs</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 border-l-4 border-purple-500 p-5">
            <h4 className="font-semibold mb-2 text-purple-800">Suicide Prevention</h4>
            <p className="text-sm mb-3">
              Policies targeting gun suicides. Often overlooked but addresses 67% of gun deaths.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Waiting periods for gun purchases</li>
              <li>• Safe storage requirements</li>
              <li>• Crisis intervention programs</li>
              <li>• Means restriction counseling</li>
              <li>• Mental health access improvements</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Evidence-Based Effectiveness</h3>
        
        <p>
          Research on gun policy effectiveness shows mixed results, with interventions showing different 
          impacts on different types of gun violence:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Intervention</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Mass Shootings</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Daily Homicides</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Suicides</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Overall Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Assault Weapon Bans</td>
                <td className="border border-gray-300 px-4 py-2">Mixed evidence</td>
                <td className="border border-gray-300 px-4 py-2">Limited impact</td>
                <td className="border border-gray-300 px-4 py-2">No impact</td>
                <td className="border border-gray-300 px-4 py-2">Small overall effect</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Waiting Periods</td>
                <td className="border border-gray-300 px-4 py-2">Minimal impact</td>
                <td className="border border-gray-300 px-4 py-2">Small reduction</td>
                <td className="border border-gray-300 px-4 py-2">Significant reduction</td>
                <td className="border border-gray-300 px-4 py-2">Moderate effect</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Universal Background Checks</td>
                <td className="border border-gray-300 px-4 py-2">Unclear</td>
                <td className="border border-gray-300 px-4 py-2">Small reduction</td>
                <td className="border border-gray-300 px-4 py-2">Small reduction</td>
                <td className="border border-gray-300 px-4 py-2">Modest effect</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Violence Interruption</td>
                <td className="border border-gray-300 px-4 py-2">No impact</td>
                <td className="border border-gray-300 px-4 py-2">Strong reduction</td>
                <td className="border border-gray-300 px-4 py-2">No impact</td>
                <td className="border border-gray-300 px-4 py-2">Targeted but effective</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Safe Storage Laws</td>
                <td className="border border-gray-300 px-4 py-2">Small impact</td>
                <td className="border border-gray-300 px-4 py-2">Small impact</td>
                <td className="border border-gray-300 px-4 py-2">Moderate reduction</td>
                <td className="border border-gray-300 px-4 py-2">Suicide-focused benefit</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">International Comparisons</h2>
        
        <p>
          Comparing US gun violence to other developed nations provides context for the scale and 
          nature of America's gun violence problem.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Gun Death Rates: US vs. Developed World</h3>
        
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Country</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Gun Deaths per 100K</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Gun Homicides per 100K</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Mass Shooting Incidents (2024)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Primary Pattern</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">United States</td>
                <td className="border border-gray-300 px-4 py-2">12.2</td>
                <td className="border border-gray-300 px-4 py-2">4.0</td>
                <td className="border border-gray-300 px-4 py-2">22</td>
                <td className="border border-gray-300 px-4 py-2">Suicide + urban homicide</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Canada</td>
                <td className="border border-gray-300 px-4 py-2">2.1</td>
                <td className="border border-gray-300 px-4 py-2">0.5</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">Mostly suicide</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Australia</td>
                <td className="border border-gray-300 px-4 py-2">0.9</td>
                <td className="border border-gray-300 px-4 py-2">0.1</td>
                <td className="border border-gray-300 px-4 py-2">0</td>
                <td className="border border-gray-300 px-4 py-2">Very low overall</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">United Kingdom</td>
                <td className="border border-gray-300 px-4 py-2">0.2</td>
                <td className="border border-gray-300 px-4 py-2">0.04</td>
                <td className="border border-gray-300 px-4 py-2">0</td>
                <td className="border border-gray-300 px-4 py-2">Very low overall</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Germany</td>
                <td className="border border-gray-300 px-4 py-2">1.0</td>
                <td className="border border-gray-300 px-4 py-2">0.06</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">Low overall</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          The US gun death rate is 5-60 times higher than other developed nations, with both gun suicide 
          and gun homicide rates significantly elevated. However, mass shooting rates, while higher, 
          represent a smaller multiple of the international baseline.
        </p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Key Takeaways</h2>
        
        <div className="bg-gray-900 text-white rounded-xl p-8 mb-8">
          <h3 className="font-heading text-xl font-bold mb-6 text-center">Mass Shootings vs. Total Gun Violence: What the Data Shows</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">The Scale Reality</h4>
              <ul className="text-sm space-y-2">
                <li>• Mass shootings: &lt;1% of gun deaths (~200/year)</li>
                <li>• Gun suicide: 67% of gun deaths (~27,000/year)</li>
                <li>• Daily gun homicides: 32% of gun deaths (~13,000/year)</li>
                <li>• Handguns kill 11.6x more people than rifles</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">The Concentration Reality</h4>
              <ul className="text-sm space-y-2">
                <li>• 1-2% of city blocks generate 25-50% of gun violence</li>
                <li>• Top 25 cities have 52% of gun homicides (18% of population)</li>
                <li>• Young men (18-34) are 70% of victims and perpetrators</li>
                <li>• Mass shootings get 78x more media coverage per death</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="font-semibold mb-3 text-yellow-300">Policy Implications</h4>
            <p className="text-sm">
              Effective gun violence reduction requires addressing the 98.5% of gun deaths that aren't mass 
              shootings: suicide prevention (67% of deaths) and targeted urban violence intervention 
              (concentrated in specific neighborhoods). Mass shooting prevention is important but 
              addresses a tiny fraction of total gun violence.
            </p>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6 mb-8">
          <div>
            <h4 className="font-semibold mb-2">What percentage of gun deaths are from mass shootings?</h4>
            <p className="text-sm text-gray-700">
              Mass shootings account for less than 1% of total gun deaths in America. Of roughly 40,000 
              annual gun deaths, fewer than 200 are from mass shooting incidents (4+ killed in single event), 
              with about 27,000 from suicide and 13,000 from individual homicides.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">What weapons are used most in gun homicides?</h4>
            <p className="text-sm text-gray-700">
              According to FBI data, handguns are used in about 6,200+ homicides annually, while rifles 
              account for approximately 500 homicides. The category "firearms, type not stated" represents 
              about 4,500 cases where the specific weapon type wasn't recorded.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Where do most gun homicides occur?</h4>
            <p className="text-sm text-gray-700">
              Gun violence is extremely concentrated: 1-2% of street blocks account for 25-50% of gun violence. 
              The top 25 cities account for over half of all gun homicides, despite having only 18% of the US population.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">How much media coverage do mass shootings receive?</h4>
            <p className="text-sm text-gray-700">
              Studies show mass shootings receive 50-75 times more media coverage per death than everyday 
              gun homicides, creating a perception gap where Americans overestimate mass shooting frequency 
              and underestimate daily gun violence.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">What's the most effective approach to reducing gun deaths?</h4>
            <p className="text-sm text-gray-700">
              Given that suicide accounts for 67% of gun deaths and concentrated urban violence for most 
              homicides, the highest-impact approaches focus on suicide prevention (waiting periods, 
              safe storage) and targeted violence intervention in high-risk communities.
            </p>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Related Pages</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link href="/analysis/gun-violence" className="block bg-[#1e3a5f] text-white rounded-lg p-4 hover:bg-[#2a4d7a] transition">
            <h4 className="font-semibold mb-2">Comprehensive Gun Violence Analysis</h4>
            <p className="text-sm opacity-90">Deep dive into all aspects of gun violence data</p>
          </Link>
          
          <Link href="/murder-rate" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Murder Rate Data</h4>
            <p className="text-sm text-gray-600">National and local homicide statistics and trends</p>
          </Link>
          
          <Link href="/violent-crime" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Violent Crime Overview</h4>
            <p className="text-sm text-gray-600">All categories of violent crime data</p>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="mass-shootings" />
        <ShareButtons title="Mass Shootings vs Total Gun Violence" />
      </div>
      
      <p className="text-sm text-gray-500 mt-8">
        Sources: FBI Crime Data Explorer, FBI Expanded Homicide Data, CDC WONDER Database, 
        Gun Violence Archive, Mother Jones Mass Shooting Database, Congressional Research Service, 
        Violence Policy Center, various academic studies on gun violence and media coverage.
      </p>
    </div>
  );
}
