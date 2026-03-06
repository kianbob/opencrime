import RelatedAnalysis from '@/components/RelatedAnalysis';
import AIOverview from '@/components/AIOverview';
import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'School Shootings in America: The Data Behind the Crisis',
  description: 'K-12 school shooting incidents surged from 32 in 2013 to 171 in 2023. A comprehensive analysis of school violence data, geographic patterns, and international comparisons.',
  openGraph: { title: 'School Shootings in America: The Data Behind the Crisis', description: 'School shooting incidents up 434% since 2013. The data behind America\'s uniquely deadly school violence problem.' },
  alternates: { canonical: 'https://www.opencrime.us/analysis/school-shootings' },
};

export default function SchoolShootingsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "How many school shootings occur in America each year?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "According to Everytown for Gun Safety data, there were 171 incidents of gunfire on K-12 school property in 2023, up from 32 in 2013. However, definitions vary widely between organizations tracking school shootings."
      }
    }, {
      "@type": "Question", 
      "name": "How does America compare to other countries for school shootings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "America has dramatically more school shootings than other developed nations. Most developed countries have had zero or single-digit school shooting fatalities in the past decade, while the US has had hundreds."
      }
    }, {
      "@type": "Question",
      "name": "What age groups are most affected by school shootings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "High schools (grades 9-12) experience the most incidents, followed by elementary schools. Middle schools have the fewest incidents. The majority of shooters are current or former students."
      }
    }, {
      "@type": "Question",
      "name": "What are the most effective school shooting prevention strategies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Research shows threat assessment programs, improved school climate, mental health support, secure storage of firearms, and extreme risk protection orders are most effective. Physical security measures have limited evidence of effectiveness."
      }
    }]
  };

  const aiInsights = [
    "School shooting incidents increased 434% from 2013 to 2023, from 32 to 171 incidents per year",
    "America has more school shootings than the rest of the developed world combined",
    "Sandy Hook remains the deadliest elementary school shooting in US history with 26 victims",
    "Most school shooters are current or former students, not outside intruders",
    "Threat assessment programs and secure firearm storage are more effective than armed security"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'School Shootings' }]} />
      
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">School Shootings in America: The Data Behind the Crisis</h1>

      <AIOverview insights={aiInsights} />

      <div className="bg-red-900 text-white rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4 text-center">School Violence by the Numbers</h2>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">171</div>
            <div className="text-red-200 text-sm">Incidents in 2023</div>
          </div>
          <div>
            <div className="text-3xl font-bold">434%</div>
            <div className="text-red-200 text-sm">Increase Since 2013</div>
          </div>
          <div>
            <div className="text-3xl font-bold">360+</div>
            <div className="text-red-200 text-sm">Deaths Since Columbine</div>
          </div>
          <div>
            <div className="text-3xl font-bold">130K+</div>
            <div className="text-red-200 text-sm">Students Exposed to Violence</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 leading-relaxed">
          School shootings occupy a unique place in the American consciousness — relatively rare statistically, 
          but devastating in their impact on communities and the national psyche. While a child is more likely 
          to be struck by lightning than killed in a school shooting, the frequency of these incidents has 
          increased dramatically over the past decade, and America's experience stands out starkly from other nations.
        </p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Defining the Problem: What Counts as a School Shooting?</h2>
        
        <p>
          One of the first challenges in analyzing school shootings is definition. Different organizations 
          use different criteria, leading to dramatically different counts:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Organization</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Definition</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2023 Count</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Everytown for Gun Safety</td>
                <td className="border border-gray-300 px-4 py-2">Any gunfire on school property</td>
                <td className="border border-gray-300 px-4 py-2">171</td>
                <td className="border border-gray-300 px-4 py-2">Includes accidents, suicides, sports events</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">K-12 School Shooting Database</td>
                <td className="border border-gray-300 px-4 py-2">Gun discharged on school property during hours</td>
                <td className="border border-gray-300 px-4 py-2">89</td>
                <td className="border border-gray-300 px-4 py-2">More restrictive criteria</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Gun Violence Archive</td>
                <td className="border border-gray-300 px-4 py-2">4+ shot (killed or injured) at school</td>
                <td className="border border-gray-300 px-4 py-2">5</td>
                <td className="border border-gray-300 px-4 py-2">Mass shooting threshold</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Washington Post</td>
                <td className="border border-gray-300 px-4 py-2">Shooting during school hours, on campus</td>
                <td className="border border-gray-300 px-4 py-2">67</td>
                <td className="border border-gray-300 px-4 py-2">Excludes off-hours, sports events</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          This analysis primarily uses Everytown data for trend analysis (the most comprehensive), while noting 
          where different definitions would change conclusions. The fundamental trend — increasing frequency — 
          remains consistent across all databases.
        </p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Historical Timeline: From Rare to Regular</h2>
        
        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Pre-Columbine Era (Before 1999)</h3>
        <p>
          School shootings existed before Columbine, but were extremely rare. The most notable incidents:
        </p>
        <ul>
          <li><strong>1966: University of Texas Tower:</strong> 17 killed (college campus)</li>
          <li><strong>1989: Cleveland Elementary (Stockton, CA):</strong> 6 killed (elementary)</li>
          <li><strong>1997: Heath High School (Kentucky):</strong> 3 killed</li>
          <li><strong>1998: Westside Middle School (Arkansas):</strong> 5 killed</li>
        </ul>
        <p>
          These incidents were shocking precisely because they were so unusual. Total K-12 school shooting 
          deaths averaged fewer than 10 per year nationally.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Columbine Effect (1999-2012)</h3>
        <div className="bg-gray-50 border-l-4 border-blue-500 p-6 mb-8">
          <h4 className="font-semibold text-lg mb-3">April 20, 1999: Columbine High School</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>The Incident:</strong><br/>
              Eric Harris and Dylan Klebold killed 12 students and 1 teacher before dying by suicide. 
              The attack was planned for months and included bombs (which failed to detonate).
            </div>
            <div>
              <strong>The Impact:</strong><br/>
              Columbine became the template for future attackers. It introduced "lockdown drills," 
              changed police response tactics, and sparked nationwide anxiety about school safety.
            </div>
          </div>
        </div>

        <p>
          Post-Columbine (1999-2012), school shootings remained relatively rare but gained enormous media 
          attention. Notable incidents during this period:
        </p>
        <ul>
          <li><strong>2005: Red Lake High School (Minnesota):</strong> 7 killed</li>
          <li><strong>2006: West Nickel Mines School (Pennsylvania):</strong> 6 killed (Amish schoolhouse)</li>
          <li><strong>2007: Virginia Tech:</strong> 33 killed (college campus, deadliest in US history)</li>
          <li><strong>2008: Northern Illinois University:</strong> 6 killed (college campus)</li>
        </ul>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Sandy Hook Watershed (2012)</h3>
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
          <h4 className="font-semibold text-lg mb-3 text-red-800">December 14, 2012: Sandy Hook Elementary</h4>
          <p className="text-sm mb-3">
            Adam Lanza killed 20 children (ages 6-7) and 6 adults at Sandy Hook Elementary School in 
            Newtown, Connecticut. The attack on such young children marked a new level of horror and 
            became a defining moment in American gun policy debates.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-xs">
            <div>
              <strong>Immediate Response:</strong> Renewed calls for gun control, enhanced school security nationwide
            </div>
            <div>
              <strong>Policy Changes:</strong> Some states enacted assault weapon restrictions, others armed teachers
            </div>
            <div>
              <strong>Long-term Impact:</strong> Catalyzed gun safety movement, influenced election outcomes
            </div>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Current Era (2013-Present): Acceleration</h3>
        <p>
          Since Sandy Hook, school shooting frequency has increased dramatically. Key data points:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Incidents (Everytown)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Deaths</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Major Incidents</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2013</td>
                <td className="border border-gray-300 px-4 py-2">32</td>
                <td className="border border-gray-300 px-4 py-2">8</td>
                <td className="border border-gray-300 px-4 py-2">—</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2014</td>
                <td className="border border-gray-300 px-4 py-2">58</td>
                <td className="border border-gray-300 px-4 py-2">12</td>
                <td className="border border-gray-300 px-4 py-2">Marysville-Pilchuck HS (5 killed)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2015</td>
                <td className="border border-gray-300 px-4 py-2">65</td>
                <td className="border border-gray-300 px-4 py-2">19</td>
                <td className="border border-gray-300 px-4 py-2">Umpqua Community College (10 killed)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2018</td>
                <td className="border border-gray-300 px-4 py-2">113</td>
                <td className="border border-gray-300 px-4 py-2">36</td>
                <td className="border border-gray-300 px-4 py-2">Marjory Stoneman Douglas HS (17 killed)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2019</td>
                <td className="border border-gray-300 px-4 py-2">118</td>
                <td className="border border-gray-300 px-4 py-2">15</td>
                <td className="border border-gray-300 px-4 py-2">STEM School Highlands Ranch</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2020</td>
                <td className="border border-gray-300 px-4 py-2">93</td>
                <td className="border border-gray-300 px-4 py-2">8</td>
                <td className="border border-gray-300 px-4 py-2">COVID-19 school closures</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2021</td>
                <td className="border border-gray-300 px-4 py-2">148</td>
                <td className="border border-gray-300 px-4 py-2">20</td>
                <td className="border border-gray-300 px-4 py-2">Oxford High School, MI (4 killed)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2022</td>
                <td className="border border-gray-300 px-4 py-2">175</td>
                <td className="border border-gray-300 px-4 py-2">40</td>
                <td className="border border-gray-300 px-4 py-2">Robb Elementary, TX (21 killed)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2023</td>
                <td className="border border-gray-300 px-4 py-2">171</td>
                <td className="border border-gray-300 px-4 py-2">28</td>
                <td className="border border-gray-300 px-4 py-2">Covenant School, TN (6 killed)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Geographic and Demographic Patterns</h2>
        
        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">State-Level Analysis</h3>
        <p>
          School shootings occur nationwide but show some geographic clustering. States with the highest 
          incident counts (2013-2023):
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Highest Incident States</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>California:</strong> 89 incidents (large population)</li>
              <li>• <strong>Texas:</strong> 78 incidents (large population)</li>
              <li>• <strong>Florida:</strong> 43 incidents</li>
              <li>• <strong>Illinois:</strong> 41 incidents</li>
              <li>• <strong>Georgia:</strong> 39 incidents</li>
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-orange-800">Highest Per-Capita Rates</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Alaska:</strong> 2.8 per 100K students</li>
              <li>• <strong>Delaware:</strong> 2.1 per 100K students</li>
              <li>• <strong>Louisiana:</strong> 1.9 per 100K students</li>
              <li>• <strong>Alabama:</strong> 1.7 per 100K students</li>
              <li>• <strong>Tennessee:</strong> 1.6 per 100K students</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">School Level Patterns</h3>
        <p>
          The distribution of incidents by school level reveals important patterns:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">School Level</th>
                <th className="border border-gray-300 px-4 py-2 text-left">% of Incidents</th>
                <th className="border border-gray-300 px-4 py-2 text-left">% of Deaths</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Common Factors</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">High School (9-12)</td>
                <td className="border border-gray-300 px-4 py-2">52%</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
                <td className="border border-gray-300 px-4 py-2">Student conflicts, dating violence, planned attacks</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Elementary (K-5)</td>
                <td className="border border-gray-300 px-4 py-2">23%</td>
                <td className="border border-gray-300 px-4 py-2">38%</td>
                <td className="border border-gray-300 px-4 py-2">Adult perpetrators, family disputes, higher lethality</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Middle School (6-8)</td>
                <td className="border border-gray-300 px-4 py-2">18%</td>
                <td className="border border-gray-300 px-4 py-2">12%</td>
                <td className="border border-gray-300 px-4 py-2">Student conflicts, bullying-related, accidents</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Multi-level/Other</td>
                <td className="border border-gray-300 px-4 py-2">7%</td>
                <td className="border border-gray-300 px-4 py-2">5%</td>
                <td className="border border-gray-300 px-4 py-2">Administrative buildings, buses, varied contexts</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Shooter Profiles</h3>
        <p>
          Analysis of school shooter characteristics reveals several consistent patterns:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-gray-800">Demographics</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Age:</strong> 95% are under 25, peak at ages 15-17</li>
              <li>• <strong>Gender:</strong> 87% male</li>
              <li>• <strong>Race:</strong> 61% white, 19% Black, 12% Hispanic</li>
              <li>• <strong>Relationship:</strong> 76% current or former students</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-yellow-800">Warning Signs</h4>
            <ul className="text-sm space-y-2">
              <li>• 81% told someone about their plan beforehand</li>
              <li>• 59% showed concerning behavior in weeks prior</li>
              <li>• 48% had documented mental health struggles</li>
              <li>• 76% had access to the weapon at home</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">International Comparison: America vs. the World</h2>
        
        <p>
          America's school shooting problem is unique among developed nations. The contrast is stark:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Country</th>
                <th className="border border-gray-300 px-4 py-2 text-left">School Shooting Deaths (2013-2023)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Student Population (millions)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Deaths per Million Students</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">United States</td>
                <td className="border border-gray-300 px-4 py-2">196</td>
                <td className="border border-gray-300 px-4 py-2">50.8</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">3.86</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Germany</td>
                <td className="border border-gray-300 px-4 py-2">2</td>
                <td className="border border-gray-300 px-4 py-2">11.0</td>
                <td className="border border-gray-300 px-4 py-2">0.18</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Canada</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">5.2</td>
                <td className="border border-gray-300 px-4 py-2">0.19</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">France</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">12.3</td>
                <td className="border border-gray-300 px-4 py-2">0.08</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">United Kingdom</td>
                <td className="border border-gray-300 px-4 py-2">0</td>
                <td className="border border-gray-300 px-4 py-2">8.9</td>
                <td className="border border-gray-300 px-4 py-2">0.00</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Japan</td>
                <td className="border border-gray-300 px-4 py-2">0</td>
                <td className="border border-gray-300 px-4 py-2">13.2</td>
                <td className="border border-gray-300 px-4 py-2">0.00</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Australia</td>
                <td className="border border-gray-300 px-4 py-2">0</td>
                <td className="border border-gray-300 px-4 py-2">4.0</td>
                <td className="border border-gray-300 px-4 py-2">0.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Why Is America Different?</h3>
        <p>
          Several factors distinguish America from other developed nations:
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">Gun Access</h4>
            <ul className="text-sm space-y-2">
              <li>• 393 million civilian guns (1.2 per person)</li>
              <li>• 42% of households have guns</li>
              <li>• Weak secure storage requirements</li>
              <li>• Easy access for youth via family guns</li>
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-orange-800">Cultural Factors</h4>
            <ul className="text-sm space-y-2">
              <li>• Media contagion effect ("copycat" shootings)</li>
              <li>• Glorification of violence in media</li>
              <li>• "Notoriety" seeking behavior</li>
              <li>• Weak social safety nets</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Systemic Issues</h4>
            <ul className="text-sm space-y-2">
              <li>• Limited mental health services for youth</li>
              <li>• School discipline disparities</li>
              <li>• Social media bullying/isolation</li>
              <li>• Weak threat assessment systems</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Policy Responses: What Has and Hasn't Worked</h2>
        
        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Security Measures: Mixed Results</h3>
        <p>
          Since Columbine, schools have invested billions in security infrastructure. The evidence on 
          effectiveness is mixed:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Security Measure</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Prevalence</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Research Evidence</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Trade-offs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Controlled access/locked doors</td>
                <td className="border border-gray-300 px-4 py-2">95% of schools</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">Effective for external threats</td>
                <td className="border border-gray-300 px-4 py-2">Minimal negative impact</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Security cameras</td>
                <td className="border border-gray-300 px-4 py-2">83% of schools</td>
                <td className="border border-gray-300 px-4 py-2 text-yellow-600">Limited prevention value</td>
                <td className="border border-gray-300 px-4 py-2">Privacy concerns, cost</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Metal detectors</td>
                <td className="border border-gray-300 px-4 py-2">10% of schools</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">No clear benefit for shootings</td>
                <td className="border border-gray-300 px-4 py-2">Prison-like atmosphere, delays</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Armed security/SROs</td>
                <td className="border border-gray-300 px-4 py-2">42% of schools</td>
                <td className="border border-gray-300 px-4 py-2 text-yellow-600">Mixed results</td>
                <td className="border border-gray-300 px-4 py-2">School-to-prison pipeline concerns</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Armed teachers</td>
                <td className="border border-gray-300 px-4 py-2">&lt;5% of schools</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">No evidence of effectiveness</td>
                <td className="border border-gray-300 px-4 py-2">Safety risks, teacher opposition</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Evidence-Based Prevention Approaches</h3>
        <p>
          Research identifies several approaches with strong evidence of effectiveness:
        </p>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
          <h4 className="font-semibold mb-3 text-green-800">Threat Assessment Programs</h4>
          <p className="text-sm mb-3">
            Systematic processes to identify, assess, and manage students who pose risks. Key elements:
          </p>
          <ul className="text-sm space-y-1">
            <li>• Multi-disciplinary teams (counselors, administrators, law enforcement)</li>
            <li>• Clear reporting mechanisms for concerning behavior</li>
            <li>• Focus on getting help for troubled students, not just punishment</li>
            <li>• Evidence: Virginia's program associated with significant reduction in incidents</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h4 className="font-semibold mb-3 text-blue-800">School Climate and Mental Health</h4>
          <p className="text-sm mb-3">
            Positive school climate reduces risk factors associated with violence:
          </p>
          <ul className="text-sm space-y-1">
            <li>• Anti-bullying programs with strong enforcement</li>
            <li>• Mental health support and counseling services</li>
            <li>• Social-emotional learning curricula</li>
            <li>• Strong relationships between students and adults</li>
          </ul>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8">
          <h4 className="font-semibold mb-3 text-orange-800">Secure Firearm Storage</h4>
          <p className="text-sm mb-3">
            Since most school shooters access guns from home, secure storage is critical:
          </p>
          <ul className="text-sm space-y-1">
            <li>• Gun safes and trigger locks can prevent youth access</li>
            <li>• Child Access Prevention (CAP) laws show measurable impact</li>
            <li>• Education campaigns for gun-owning families</li>
            <li>• Evidence: States with CAP laws have 10% lower youth gun deaths</li>
          </ul>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Media Contagion Effect</h2>
        
        <p>
          Research has identified a "contagion effect" where media coverage of school shootings can 
          inspire copycat incidents. Key findings:
        </p>

        <ul>
          <li><strong>Temporal clustering:</strong> School shootings are more likely in the weeks following heavily covered incidents</li>
          <li><strong>Geographic spread:</strong> Coverage can inspire incidents in distant locations</li>
          <li><strong>Method imitation:</strong> Subsequent shooters often copy tactics and weapons used in previous attacks</li>
          <li><strong>Fame seeking:</strong> Some shooters explicitly cite desire for notoriety in manifestos</li>
        </ul>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Responsible Reporting Guidelines</h3>
        <p>
          Journalism organizations have developed guidelines to reduce contagion risk while maintaining 
          news value:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">Avoid:</h4>
            <ul className="text-sm space-y-1">
              <li>• Excessive focus on shooter's identity/background</li>
              <li>• Detailed descriptions of weapons and tactics</li>
              <li>• Sensationalized headlines</li>
              <li>• Repeated use of shooter's name/photo</li>
              <li>• Speculation about motives</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Emphasize:</h4>
            <ul className="text-sm space-y-1">
              <li>• Victims and community response</li>
              <li>• Facts about prevention and resources</li>
              <li>• Context about rarity of such events</li>
              <li>• Heroes and helpers in the response</li>
              <li>• Prevention and mental health resources</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Economic and Social Costs</h2>
        
        <p>
          The impact of school shootings extends far beyond immediate casualties:
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Direct Economic Costs</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Cost Category</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Annual Estimate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">School security measures</td>
                <td className="border border-gray-300 px-4 py-2">$3.2 billion</td>
                <td className="border border-gray-300 px-4 py-2">Guards, equipment, infrastructure</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Emergency response/investigation</td>
                <td className="border border-gray-300 px-4 py-2">$180 million</td>
                <td className="border border-gray-300 px-4 py-2">Police, FBI, court costs</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Medical treatment</td>
                <td className="border border-gray-300 px-4 py-2">$85 million</td>
                <td className="border border-gray-300 px-4 py-2">Immediate and long-term care</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Mental health services</td>
                <td className="border border-gray-300 px-4 py-2">$400 million</td>
                <td className="border border-gray-300 px-4 py-2">Trauma counseling, therapy</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Lost productivity</td>
                <td className="border border-gray-300 px-4 py-2">$1.8 billion</td>
                <td className="border border-gray-300 px-4 py-2">Lifetime earnings of victims</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Broader Social Impact</h3>
        <ul>
          <li><strong>Student anxiety:</strong> 57% of teens worry about school shootings (Pew Research)</li>
          <li><strong>Learning environment:</strong> Security measures can create prison-like atmosphere</li>
          <li><strong>Teacher stress:</strong> 30% of teachers report increased job stress due to safety concerns</li>
          <li><strong>Community trauma:</strong> Entire communities experience lasting psychological effects</li>
          <li><strong>Policy paralysis:</strong> Political deadlock prevents evidence-based prevention measures</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">What Can Be Done: Evidence-Based Solutions</h2>
        
        <p>
          While no single measure can eliminate school shootings entirely, research points to several 
          evidence-based approaches that could significantly reduce risk:
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Federal Policy Options</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Gun Policy Measures</h4>
            <ul className="text-sm space-y-2">
              <li>• Universal background checks (90% public support)</li>
              <li>• Extreme risk protection orders ("red flag" laws)</li>
              <li>• Child Access Prevention laws</li>
              <li>• Assault weapon restrictions</li>
              <li>• Safe storage requirements</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Education/Health Measures</h4>
            <ul className="text-sm space-y-2">
              <li>• Increased school mental health funding</li>
              <li>• National threat assessment training</li>
              <li>• Anti-bullying program standards</li>
              <li>• Media responsibility guidelines</li>
              <li>• Research funding (CDC gun violence research)</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">State and Local Actions</h3>
        <ul>
          <li><strong>Threat assessment:</strong> Implement evidence-based programs in all districts</li>
          <li><strong>Mental health:</strong> Increase counselor-to-student ratios (currently 1:464 nationally, recommended 1:250)</li>
          <li><strong>Climate:</strong> Focus on creating positive, inclusive school environments</li>
          <li><strong>Training:</strong> Regular lockdown drills without traumatizing younger students</li>
          <li><strong>Community:</strong> Engage parents, faith communities, and local organizations</li>
        </ul>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Individual Actions</h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <h4 className="font-semibold mb-3 text-yellow-800">What Parents and Community Members Can Do</h4>
          <ul className="text-sm space-y-2">
            <li>• <strong>Secure firearms:</strong> Use gun safes, trigger locks, separate ammunition storage</li>
            <li>• <strong>Monitor warning signs:</strong> Social isolation, fascination with violence, access to weapons</li>
            <li>• <strong>Report concerns:</strong> Use school reporting systems, don't assume someone else will act</li>
            <li>• <strong>Support mental health:</strong> Reduce stigma, connect troubled youth with resources</li>
            <li>• <strong>Engage schools:</strong> Participate in school safety committees, volunteer</li>
            <li>• <strong>Media consumption:</strong> Limit young people's exposure to graphic coverage</li>
          </ul>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Looking Forward: Hope Despite the Horror</h2>
        
        <p>
          While the statistics are sobering and the trends concerning, there are reasons for cautious optimism:
        </p>

        <ul>
          <li><strong>Improved awareness:</strong> More adults recognize warning signs and know how to report concerns</li>
          <li><strong>Better intervention:</strong> Threat assessment programs are preventing planned attacks</li>
          <li><strong>Technology solutions:</strong> Anonymous reporting apps, threat detection software</li>
          <li><strong>Community mobilization:</strong> Parents, students, and communities are demanding action</li>
          <li><strong>Research growth:</strong> More study of prevention approaches and risk factors</li>
        </ul>

        <div className="bg-gray-900 text-white rounded-xl p-8 mb-8">
          <h3 className="font-heading text-xl font-bold mb-6 text-center">School Shootings: Key Facts</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">The Scale</h4>
              <ul className="text-sm space-y-2">
                <li>• 171 incidents in 2023, up 434% since 2013</li>
                <li>• 360+ deaths since Columbine (1999)</li>
                <li>• America has more school shootings than rest of developed world combined</li>
                <li>• Risk to individual student remains statistically low (1 in 3 million annually)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">What Works</h4>
              <ul className="text-sm space-y-2">
                <li>• Threat assessment programs (Virginia saw 50% reduction)</li>
                <li>• Secure firearm storage (prevents 70%+ of youth access)</li>
                <li>• Improved school climate and mental health support</li>
                <li>• Community-wide prevention approach</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="font-semibold mb-3 text-yellow-300">The Challenge</h4>
            <p className="text-sm">
              School shootings represent a uniquely American tragedy, requiring uniquely American solutions. 
              The problem is solvable with evidence-based approaches, but requires political will and sustained commitment 
              from all levels of society.
            </p>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6 mb-8">
          <div>
            <h4 className="font-semibold mb-2">How many school shootings occur in America each year?</h4>
            <p className="text-sm text-gray-700">
              According to Everytown for Gun Safety data, there were 171 incidents of gunfire on K-12 school 
              property in 2023, up from 32 in 2013. However, definitions vary widely between organizations 
              tracking school shootings.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">How does America compare to other countries for school shootings?</h4>
            <p className="text-sm text-gray-700">
              America has dramatically more school shootings than other developed nations. Most developed countries 
              have had zero or single-digit school shooting fatalities in the past decade, while the US has had hundreds.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">What age groups are most affected by school shootings?</h4>
            <p className="text-sm text-gray-700">
              High schools (grades 9-12) experience the most incidents, followed by elementary schools. Middle schools 
              have the fewest incidents. The majority of shooters are current or former students.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">What are the most effective school shooting prevention strategies?</h4>
            <p className="text-sm text-gray-700">
              Research shows threat assessment programs, improved school climate, mental health support, secure 
              storage of firearms, and extreme risk protection orders are most effective. Physical security 
              measures have limited evidence of effectiveness.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Is my child actually at risk of being in a school shooting?</h4>
            <p className="text-sm text-gray-700">
              The statistical risk remains very low — about 1 in 3 million annually. A child is more likely to 
              be struck by lightning. However, the psychological impact and trauma extend far beyond direct victims 
              to entire school communities.
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <h3 className="font-semibold mb-3">Data Sources and Limitations</h3>
          <p className="text-sm mb-3">
            School shooting data comes from multiple sources with different definitions:
          </p>
          <ul className="text-sm space-y-1">
            <li>• Everytown for Gun Safety (most comprehensive, includes all gunfire on school property)</li>
            <li>• K-12 School Shooting Database (more restrictive criteria, during school hours only)</li>
            <li>• Gun Violence Archive (mass shooting threshold of 4+ casualties)</li>
            <li>• Washington Post (targeted tracking of incidents during school hours)</li>
            <li>• International data from various governmental and NGO sources</li>
            <li>• Media reporting may miss incidents or include non-shooting violence</li>
          </ul>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Related Analysis</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link href="/analysis/gun-violence" className="block bg-[#1e3a5f] text-white rounded-lg p-4 hover:bg-[#2a4d7a] transition">
            <h4 className="font-semibold mb-2">Gun Violence by the Numbers</h4>
            <p className="text-sm opacity-90">Comprehensive analysis of firearm violence in America</p>
          </Link>
          
          <Link href="/analysis/juvenile-crime" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Juvenile Crime Statistics</h4>
            <p className="text-sm text-gray-600">Youth arrests and crime trends data</p>
          </Link>
          
          <Link href="/analysis/mass-shootings" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Mass Shootings vs Total Gun Violence</h4>
            <p className="text-sm text-gray-600">Context for mass shooting incidents in broader violence picture</p>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="school-shootings" />
        <ShareButtons title="School Shootings in America" />
      </div>
      
      <p className="text-sm text-gray-500 mt-8">
        Sources: Everytown for Gun Safety, K-12 School Shooting Database, Gun Violence Archive, Washington Post, 
        CDC WISQARS, FBI Crime Data, National Center for Education Statistics, Pew Research Center.
      </p>
    </div>
  );
}