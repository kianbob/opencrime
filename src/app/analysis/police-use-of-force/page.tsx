import RelatedAnalysis from '@/components/RelatedAnalysis';
import AIOverview from '@/components/AIOverview';
import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Police Use of Force: What the Data Actually Shows',
  description: 'About 1,100 fatal police shootings annually in the US. Black Americans 2.5x more likely per capita. Body cameras reduced use-of-force complaints 93% in Rialto study.',
  openGraph: { title: 'Police Use of Force: What the Data Actually Shows', description: 'Data-driven analysis of police use of force: 1,100+ fatal shootings/year, racial disparities, body cam impact.' },
  alternates: { canonical: 'https://www.opencrime.us/analysis/police-use-of-force' },
};

export default function PoliceUseOfForcePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "How many people are killed by police each year in America?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Approximately 1,100 people are fatally shot by police annually, according to databases maintained by The Washington Post and other organizations tracking police shootings."
      }
    }, {
      "@type": "Question", 
      "name": "Do police kill Black Americans at higher rates than other groups?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Black Americans are killed by police at about 2.5 times the rate of white Americans when adjusted for population. However, the interpretation of this disparity is debated."
      }
    }, {
      "@type": "Question",
      "name": "Do body cameras reduce police use of force?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Research shows mixed results, but the famous Rialto study found a 93% reduction in use-of-force complaints. However, results vary significantly across different departments and implementations."
      }
    }, {
      "@type": "Question",
      "name": "How does US police use of force compare internationally?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "US police kill civilians at dramatically higher rates than other developed nations. For example, UK police killed 3 people in 2022 compared to over 1,100 in the US."
      }
    }]
  };

  const aiInsights = [
    "About 1,100 Americans are fatally shot by police annually, a relatively stable number since 2015",
    "Black Americans are killed by police at 2.5x the rate of white Americans per capita",
    "Armed subjects account for roughly 95% of police shooting victims",
    "Body cameras showed 93% reduction in use-of-force complaints in landmark Rialto study",
    "US police kill civilians at 30-50x higher rates than police in UK, Germany, or Japan"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Police Use of Force' }]} />
      
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">Police Use of Force: What the Data Actually Shows</h1>

      <AIOverview insights={aiInsights} />

      <div className="bg-red-900 text-white rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4 text-center">Police Use of Force by the Numbers</h2>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">1,100+</div>
            <div className="text-red-200 text-sm">Fatal Shootings/Year</div>
          </div>
          <div>
            <div className="text-3xl font-bold">2.5x</div>
            <div className="text-red-200 text-sm">Black vs White Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold">95%</div>
            <div className="text-red-200 text-sm">Victims Were Armed</div>
          </div>
          <div>
            <div className="text-3xl font-bold">-93%</div>
            <div className="text-red-200 text-sm">Force Complaints (Rialto)</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 leading-relaxed">
          Police use of force represents one of the most contentious issues in American criminal justice. 
          High-profile incidents captured on video have sparked nationwide protests and calls for reform, 
          while police argue they face unique dangers requiring split-second decisions. What does the data 
          actually reveal about how often, why, and against whom police use force?
        </p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Data Challenge: What We Track vs. What We Don't</h2>
        
        <p>
          Before analyzing police use of force data, it's crucial to understand its limitations. 
          Unlike most crime statistics, there is no comprehensive national database for police use of force:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">What We Track Well</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Fatal shootings:</strong> Media attention ensures most are documented</li>
              <li>• <strong>Officer deaths:</strong> FBI tracks line-of-duty fatalities comprehensively</li>
              <li>• <strong>Major incidents:</strong> High-profile cases get extensive investigation</li>
              <li>• <strong>Some complaint systems:</strong> Larger departments have formal processes</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-yellow-800">What We Track Poorly</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Non-fatal force:</strong> No national database for less-lethal incidents</li>
              <li>• <strong>Traffic stops:</strong> Limited data on stop outcomes</li>
              <li>• <strong>Encounters without force:</strong> Vast majority of police interactions</li>
              <li>• <strong>Context/justification:</strong> Circumstances often undocumented</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Major Data Sources</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Source</th>
                <th className="border border-gray-300 px-4 py-2 text-left">What It Tracks</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Coverage</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Limitations</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Washington Post Database</td>
                <td className="border border-gray-300 px-4 py-2">Fatal police shootings</td>
                <td className="border border-gray-300 px-4 py-2">~98% of fatal shootings since 2015</td>
                <td className="border border-gray-300 px-4 py-2">Fatal incidents only</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">FBI's NICS</td>
                <td className="border border-gray-300 px-4 py-2">Officer-involved shootings</td>
                <td className="border border-gray-300 px-4 py-2">Voluntary reporting, ~40% participation</td>
                <td className="border border-gray-300 px-4 py-2">Inconsistent reporting</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Mapping Police Violence</td>
                <td className="border border-gray-300 px-4 py-2">All police killings (not just shootings)</td>
                <td className="border border-gray-300 px-4 py-2">Comprehensive for fatal incidents</td>
                <td className="border border-gray-300 px-4 py-2">Fatal incidents only</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Individual Department Reports</td>
                <td className="border border-gray-300 px-4 py-2">Varies widely by department</td>
                <td className="border border-gray-300 px-4 py-2">Varies, major cities better</td>
                <td className="border border-gray-300 px-4 py-2">No standardization</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Fatal Police Shootings: The Most Comprehensive Data</h2>
        
        <p>
          Thanks to The Washington Post's database (launched in 2015), we have the most complete picture 
          ever of fatal police shootings in America:
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Annual Trends (2015-2024)</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Total Fatal Shootings</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Rate per Million Population</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Notable Context</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2015</td>
                <td className="border border-gray-300 px-4 py-2">990</td>
                <td className="border border-gray-300 px-4 py-2">3.1</td>
                <td className="border border-gray-300 px-4 py-2">First year of tracking</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2016</td>
                <td className="border border-gray-300 px-4 py-2">963</td>
                <td className="border border-gray-300 px-4 py-2">3.0</td>
                <td className="border border-gray-300 px-4 py-2">Dallas police shooting</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2017</td>
                <td className="border border-gray-300 px-4 py-2">987</td>
                <td className="border border-gray-300 px-4 py-2">3.0</td>
                <td className="border border-gray-300 px-4 py-2">Trump administration begins</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2018</td>
                <td className="border border-gray-300 px-4 py-2">992</td>
                <td className="border border-gray-300 px-4 py-2">3.0</td>
                <td className="border border-gray-300 px-4 py-2">Relatively stable</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2019</td>
                <td className="border border-gray-300 px-4 py-2">1,004</td>
                <td className="border border-gray-300 px-4 py-2">3.1</td>
                <td className="border border-gray-300 px-4 py-2">Crosses 1,000 threshold</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2020</td>
                <td className="border border-gray-300 px-4 py-2">1,021</td>
                <td className="border border-gray-300 px-4 py-2">3.1</td>
                <td className="border border-gray-300 px-4 py-2">Floyd protests, COVID-19</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2021</td>
                <td className="border border-gray-300 px-4 py-2">1,048</td>
                <td className="border border-gray-300 px-4 py-2">3.2</td>
                <td className="border border-gray-300 px-4 py-2">Highest total</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2022</td>
                <td className="border border-gray-300 px-4 py-2">1,096</td>
                <td className="border border-gray-300 px-4 py-2">3.3</td>
                <td className="border border-gray-300 px-4 py-2">Record high</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2023</td>
                <td className="border border-gray-300 px-4 py-2">1,124</td>
                <td className="border border-gray-300 px-4 py-2">3.4</td>
                <td className="border border-gray-300 px-4 py-2">Continued increase</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          The data reveals remarkable consistency: fatal police shootings have remained around 1,000 per year, 
          with a slight upward trend. This challenges both narratives of a recent "surge" in police violence 
          and claims of significant improvement.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Victim Demographics and Circumstances</h3>
        
        <p>
          Analysis of victim characteristics reveals important patterns:
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Demographics (2015-2023)</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Race:</strong> 48% White, 26% Black, 18% Hispanic</li>
              <li>• <strong>Age:</strong> Median age 33, 95% adults</li>
              <li>• <strong>Gender:</strong> 96% male, 4% female</li>
              <li>• <strong>Location:</strong> 35% in suburbs, 33% in cities</li>
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-orange-800">Circumstances</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Armed:</strong> 95% had weapon (gun, knife, other)</li>
              <li>• <strong>Mental health:</strong> 22% showed signs of mental illness</li>
              <li>• <strong>Fleeing:</strong> 18% were fleeing police</li>
              <li>• <strong>Unarmed:</strong> ~5% had no weapon</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Context</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Call type:</strong> 32% domestic disturbance/violence</li>
              <li>• <strong>Time:</strong> Peak between 8 PM - 2 AM</li>
              <li>• <strong>Day:</strong> Slightly higher on weekends</li>
              <li>• <strong>Body camera:</strong> 45% of incidents recorded</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Racial Disparities: The Most Controversial Aspect</h2>
        
        <p>
          The racial breakdown of police shooting victims is the most scrutinized aspect of use-of-force data. 
          The raw numbers show clear disparities, but their interpretation is heavily debated:
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Per-Capita Rates by Race</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Race/Ethnicity</th>
                <th className="border border-gray-300 px-4 py-2 text-left">% of US Population</th>
                <th className="border border-gray-300 px-4 py-2 text-left">% of Police Shooting Victims</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Rate per Million</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Rate Ratio (vs. White)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">White</td>
                <td className="border border-gray-300 px-4 py-2">61.6%</td>
                <td className="border border-gray-300 px-4 py-2">48%</td>
                <td className="border border-gray-300 px-4 py-2">2.4</td>
                <td className="border border-gray-300 px-4 py-2">1.0 (baseline)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Black or African American</td>
                <td className="border border-gray-300 px-4 py-2">13.6%</td>
                <td className="border border-gray-300 px-4 py-2">26%</td>
                <td className="border border-gray-300 px-4 py-2">6.2</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">2.6</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Hispanic or Latino</td>
                <td className="border border-gray-300 px-4 py-2">18.9%</td>
                <td className="border border-gray-300 px-4 py-2">18%</td>
                <td className="border border-gray-300 px-4 py-2">3.0</td>
                <td className="border border-gray-300 px-4 py-2 text-orange-600 font-semibold">1.3</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">American Indian/Alaska Native</td>
                <td className="border border-gray-300 px-4 py-2">1.3%</td>
                <td className="border border-gray-300 px-4 py-2">1.8%</td>
                <td className="border border-gray-300 px-4 py-2">4.4</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">1.8</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Asian</td>
                <td className="border border-gray-300 px-4 py-2">6.3%</td>
                <td className="border border-gray-300 px-4 py-2">2.2%</td>
                <td className="border border-gray-300 px-4 py-2">1.1</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">0.5</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Competing Explanations for Disparities</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">Bias/Discrimination Explanations</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Implicit bias:</strong> Unconscious associations affect split-second decisions</li>
              <li>• <strong>Over-policing:</strong> More police presence in minority communities</li>
              <li>• <strong>Threat perception:</strong> Black suspects perceived as more dangerous</li>
              <li>• <strong>Historical context:</strong> Legacy of discriminatory policing practices</li>
              <li>• <strong>Training deficits:</strong> Inadequate bias training for officers</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Situational/Structural Explanations</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Crime rate differences:</strong> Higher violent crime rates in some communities</li>
              <li>• <strong>Arrest patterns:</strong> More police encounters = more opportunities for force</li>
              <li>• <strong>Poverty correlation:</strong> Concentrated disadvantage increases police contact</li>
              <li>• <strong>Geographic factors:</strong> Urban vs. rural policing differences</li>
              <li>• <strong>Suspect behavior:</strong> Compliance rates during encounters</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Research on Bias in Police Shootings</h3>
        <p>
          Academic research has produced mixed findings on racial bias in police shootings:
        </p>

        <div className="bg-gray-50 border-l-4 border-gray-400 p-6 mb-8">
          <h4 className="font-semibold mb-3">Key Research Findings</h4>
          <ul className="text-sm space-y-3">
            <li>• <strong>Fryer (2016):</strong> Found no racial bias in police shootings when controlling for encounter circumstances, but significant bias in non-lethal force</li>
            <li>• <strong>Johnson et al. (2019):</strong> Critiqued Fryer's methodology, found evidence of bias when using different statistical approaches</li>
            <li>• <strong>Knox & Mummolo (2020):</strong> Showed benchmark problems make it difficult to measure bias definitively</li>
            <li>• <strong>Simulation studies:</strong> Lab experiments show implicit bias affects shooting decisions in controlled settings</li>
            <li>• <strong>Body camera studies:</strong> Mixed results on whether cameras reveal biased decision-making</li>
          </ul>
          <p className="text-sm mt-3 font-medium">
            <strong>Scientific consensus:</strong> Measuring bias in police shootings is methodologically challenging, 
            but most evidence suggests some level of disparate impact, with debate over whether it reflects bias, 
            structural factors, or both.
          </p>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Use of Force Beyond Fatal Shootings</h2>
        
        <p>
          Fatal shootings represent only a small fraction of police use of force. Understanding the broader 
          picture requires examining non-fatal incidents:
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Types and Frequency of Force</h3>
        <p>
          Based on available data from larger police departments that track use of force:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Force Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Estimated Annual Incidents</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Rate per 1,000 Officers</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Injury Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Physical force (hands/fists)</td>
                <td className="border border-gray-300 px-4 py-2">200,000-300,000</td>
                <td className="border border-gray-300 px-4 py-2">250-375</td>
                <td className="border border-gray-300 px-4 py-2">15-25%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">TASER deployment</td>
                <td className="border border-gray-300 px-4 py-2">400,000-500,000</td>
                <td className="border border-gray-300 px-4 py-2">500-625</td>
                <td className="border border-gray-300 px-4 py-2">5-10%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Baton/impact weapon</td>
                <td className="border border-gray-300 px-4 py-2">15,000-25,000</td>
                <td className="border border-gray-300 px-4 py-2">19-31</td>
                <td className="border border-gray-300 px-4 py-2">20-35%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Pepper spray/OC</td>
                <td className="border border-gray-300 px-4 py-2">100,000-150,000</td>
                <td className="border border-gray-300 px-4 py-2">125-188</td>
                <td className="border border-gray-300 px-4 py-2">5-8%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Firearm (non-fatal)</td>
                <td className="border border-gray-300 px-4 py-2">2,000-3,000</td>
                <td className="border border-gray-300 px-4 py-2">2.5-3.8</td>
                <td className="border border-gray-300 px-4 py-2">85-95%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Firearm (fatal)</td>
                <td className="border border-gray-300 px-4 py-2">~1,100</td>
                <td className="border border-gray-300 px-4 py-2">1.4</td>
                <td className="border border-gray-300 px-4 py-2">100%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Force in Context: Police Encounters</h3>
        <p>
          To understand use of force rates, it's important to consider the total volume of police-public interactions:
        </p>
        <ul>
          <li><strong>Total police-public contacts:</strong> Estimated 60-70 million annually</li>
          <li><strong>Traffic stops:</strong> ~20 million annually</li>
          <li><strong>Arrests:</strong> ~10 million annually</li>
          <li><strong>Use of force incidents:</strong> ~700,000-1,000,000 annually (all types)</li>
          <li><strong>Force rate:</strong> Approximately 1-1.5% of all police encounters involve any use of force</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Body Cameras and Use of Force: The Evidence</h2>
        
        <p>
          Body-worn cameras have been promoted as a solution to reduce police use of force and increase accountability. 
          The research shows mixed but generally positive results:
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Landmark Rialto Study (2012-2013)</h3>
        <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
          <h4 className="font-semibold text-lg mb-3 text-green-800">Methodology and Results</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Study Design:</strong><br/>
              Randomized controlled trial in Rialto, CA Police Department. Officers randomly assigned body 
              cameras on some shifts, not others.
            </div>
            <div>
              <strong>Key Findings:</strong><br/>
              • 93% reduction in use-of-force complaints<br/>
              • 50% reduction in use-of-force incidents<br/>
              • Significant reduction in citizen complaints
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-green-300">
            <strong>Impact:</strong> This study drove widespread adoption of body cameras across US police departments 
            and influenced federal funding programs.
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Subsequent Research: More Complex Picture</h3>
        <p>
          Follow-up studies have shown more mixed results, suggesting the impact varies by implementation 
          and department culture:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Study</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Use of Force Change</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Complaint Change</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Ariel et al. (2016)</td>
                <td className="border border-gray-300 px-4 py-2">Washington DC</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">No significant change</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">+3%</td>
                <td className="border border-gray-300 px-4 py-2">Large department, different context</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Yokum et al. (2019)</td>
                <td className="border border-gray-300 px-4 py-2">Washington DC</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">No significant change</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">No significant change</td>
                <td className="border border-gray-300 px-4 py-2">Largest RCT to date</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Lum et al. (2019)</td>
                <td className="border border-gray-300 px-4 py-2">Spokane, WA</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">-15%</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">-25%</td>
                <td className="border border-gray-300 px-4 py-2">Medium-sized department</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Headley et al. (2017)</td>
                <td className="border border-gray-300 px-4 py-2">Orlando, FL</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">-53%</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">-65%</td>
                <td className="border border-gray-300 px-4 py-2">Strong departmental support</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Peterson et al. (2018)</td>
                <td className="border border-gray-300 px-4 py-2">Milwaukee, WI</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">+14%</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">No change</td>
                <td className="border border-gray-300 px-4 py-2">Officer resistance to program</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Factors Affecting Body Camera Effectiveness</h3>
        <p>
          Research has identified several factors that influence whether body cameras reduce use of force:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Success Factors</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Leadership support:</strong> Chiefs and supervisors actively promote program</li>
              <li>• <strong>Clear policies:</strong> When cameras must be activated</li>
              <li>• <strong>Officer buy-in:</strong> Training that emphasizes benefits</li>
              <li>• <strong>Accountability:</strong> Consequences for policy violations</li>
              <li>• <strong>Regular review:</strong> Footage used for training and oversight</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">Failure Factors</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Officer resistance:</strong> Perception of surveillance/distrust</li>
              <li>• <strong>Weak policies:</strong> Too much discretion about activation</li>
              <li>• <strong>Technical problems:</strong> Equipment failures, poor video quality</li>
              <li>• <strong>Limited oversight:</strong> Footage not regularly reviewed</li>
              <li>• <strong>Union opposition:</strong> Collective bargaining resistance</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">De-escalation Training: What Works</h2>
        
        <p>
          De-escalation training has gained prominence as a strategy to reduce police use of force. 
          The approach emphasizes verbal techniques and tactical patience to resolve situations without force:
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Core De-escalation Principles</h3>
        <ul>
          <li><strong>Slow down the situation:</strong> Create time and space when tactically feasible</li>
          <li><strong>Effective communication:</strong> Active listening, calm tone, clear instructions</li>
          <li><strong>Tactical positioning:</strong> Maintain safety while allowing subject space</li>
          <li><strong>Recognizing mental health crisis:</strong> Identifying and responding to mental illness</li>
          <li><strong>Officer wellness:</strong> Managing stress and emotional responses</li>
        </ul>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Research on De-escalation Effectiveness</h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h4 className="font-semibold mb-3 text-blue-800">Louisville Metro Police Study (2020)</h4>
          <p className="text-sm mb-3">
            After implementing comprehensive de-escalation training:
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Use of Force:</strong><br/>
              28% reduction in overall use of force incidents
            </div>
            <div>
              <strong>Injuries:</strong><br/>
              36% reduction in officer injuries, 26% reduction in civilian injuries
            </div>
            <div>
              <strong>Complaints:</strong><br/>
              15% reduction in excessive force complaints
            </div>
          </div>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
          <h4 className="font-semibold mb-3 text-green-800">Seattle Police Department Study (2019)</h4>
          <p className="text-sm mb-3">
            Following federal consent decree and de-escalation training:
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Use of Force:</strong><br/>
              60% reduction in use of force incidents (2011-2018)
            </div>
            <div>
              <strong>Officer Safety:</strong><br/>
              No increase in officer injuries despite force reduction
            </div>
            <div>
              <strong>Public Trust:</strong><br/>
              Improved community satisfaction scores
            </div>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">International Comparison: US vs. Other Developed Nations</h2>
        
        <p>
          The US police use of force rates are dramatically higher than other developed nations, 
          even when accounting for higher crime rates and gun ownership:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Country</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Population (millions)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Police Killings (2022)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Rate per 10M Population</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Primary Weapons</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">United States</td>
                <td className="border border-gray-300 px-4 py-2">331</td>
                <td className="border border-gray-300 px-4 py-2">1,096</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">33.1</td>
                <td className="border border-gray-300 px-4 py-2">Firearms (standard equipment)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">United Kingdom</td>
                <td className="border border-gray-300 px-4 py-2">67</td>
                <td className="border border-gray-300 px-4 py-2">3</td>
                <td className="border border-gray-300 px-4 py-2">4.5</td>
                <td className="border border-gray-300 px-4 py-2">Specialized armed units only</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Germany</td>
                <td className="border border-gray-300 px-4 py-2">84</td>
                <td className="border border-gray-300 px-4 py-2">11</td>
                <td className="border border-gray-300 px-4 py-2">13.1</td>
                <td className="border border-gray-300 px-4 py-2">Firearms with strict protocols</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">France</td>
                <td className="border border-gray-300 px-4 py-2">68</td>
                <td className="border border-gray-300 px-4 py-2">38</td>
                <td className="border border-gray-300 px-4 py-2">55.9</td>
                <td className="border border-gray-300 px-4 py-2">Firearms with administrative review</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Canada</td>
                <td className="border border-gray-300 px-4 py-2">39</td>
                <td className="border border-gray-300 px-4 py-2">36</td>
                <td className="border border-gray-300 px-4 py-2">92.3</td>
                <td className="border border-gray-300 px-4 py-2">Firearms with independent investigation</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Japan</td>
                <td className="border border-gray-300 px-4 py-2">125</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">0.8</td>
                <td className="border border-gray-300 px-4 py-2">Firearms rarely drawn</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Australia</td>
                <td className="border border-gray-300 px-4 py-2">26</td>
                <td className="border border-gray-300 px-4 py-2">4</td>
                <td className="border border-gray-300 px-4 py-2">15.4</td>
                <td className="border border-gray-300 px-4 py-2">Firearms with mandatory investigation</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Factors in International Differences</h3>
        <p>
          Several factors contribute to lower police use of force in other developed nations:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Training and Culture</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Longer training:</strong> 2-3 years vs. 6 months in US</li>
              <li>• <strong>De-escalation emphasis:</strong> Primary training focus</li>
              <li>• <strong>Service orientation:</strong> "Guardian" vs. "warrior" mindset</li>
              <li>• <strong>Community policing:</strong> Stronger community relationships</li>
              <li>• <strong>Mental health training:</strong> Extensive crisis intervention</li>
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-orange-800">Legal and Structural Factors</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Strict use of force laws:</strong> Higher legal standards</li>
              <li>• <strong>Independent investigation:</strong> External oversight of shootings</li>
              <li>• <strong>Limited gun access:</strong> Fewer firearms in civilian population</li>
              <li>• <strong>Social safety nets:</strong> Fewer desperation-driven crimes</li>
              <li>• <strong>Centralized standards:</strong> National training and policies</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Officer Safety: The Other Side of the Equation</h2>
        
        <p>
          Understanding police use of force requires examining officer safety concerns. 
          Police work does involve genuine risks that influence tactical decisions:
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Officer Fatality Data</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Total Officer Deaths</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Felonious Deaths</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Accidental Deaths</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Rate per 100K Officers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2019</td>
                <td className="border border-gray-300 px-4 py-2">147</td>
                <td className="border border-gray-300 px-4 py-2">89</td>
                <td className="border border-gray-300 px-4 py-2">58</td>
                <td className="border border-gray-300 px-4 py-2">18.2</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2020</td>
                <td className="border border-gray-300 px-4 py-2">264</td>
                <td className="border border-gray-300 px-4 py-2">46</td>
                <td className="border border-gray-300 px-4 py-2">218 (COVID-19)</td>
                <td className="border border-gray-300 px-4 py-2">32.7</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2021</td>
                <td className="border border-gray-300 px-4 py-2">484</td>
                <td className="border border-gray-300 px-4 py-2">73</td>
                <td className="border border-gray-300 px-4 py-2">411 (COVID-19)</td>
                <td className="border border-gray-300 px-4 py-2">60.0</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2022</td>
                <td className="border border-gray-300 px-4 py-2">244</td>
                <td className="border border-gray-300 px-4 py-2">61</td>
                <td className="border border-gray-300 px-4 py-2">183 (COVID-19, traffic)</td>
                <td className="border border-gray-300 px-4 py-2">30.2</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2023</td>
                <td className="border border-gray-300 px-4 py-2">184</td>
                <td className="border border-gray-300 px-4 py-2">60</td>
                <td className="border border-gray-300 px-4 py-2">124</td>
                <td className="border border-gray-300 px-4 py-2">22.8</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Risk in Context</h3>
        <p>
          Policing is a dangerous profession, but the risk is often overstated in public discourse:
        </p>
        <ul>
          <li><strong>Occupational ranking:</strong> Policing ranks ~18th in occupational fatality rates</li>
          <li><strong>Higher risk occupations:</strong> Logging, fishing, roofing, trucking, farming</li>
          <li><strong>Primary risks:</strong> Traffic accidents, COVID-19, heart attacks (not gunfire)</li>
          <li><strong>Felonious deaths:</strong> ~60-80 per year among 800,000+ officers (0.008%)</li>
          <li><strong>Assault rates:</strong> 10-12% of officers assaulted annually, mostly minor injuries</li>
        </ul>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Warrior vs. Guardian Debate</h3>
        <p>
          Police culture has been influenced by conflicting paradigms about the officer's role:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">"Warrior" Mindset</h4>
            <ul className="text-sm space-y-2">
              <li>• Emphasis on officer safety above all else</li>
              <li>• "Better to be judged by 12 than carried by 6"</li>
              <li>• Hypervigilance and tactical thinking</li>
              <li>• Military-style training and equipment</li>
              <li>• Us vs. them mentality</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">"Guardian" Mindset</h4>
            <ul className="text-sm space-y-2">
              <li>• Balance officer safety with public service</li>
              <li>• "Protect and serve" philosophy</li>
              <li>• De-escalation and communication skills</li>
              <li>• Community-oriented policing</li>
              <li>• Partnership with community</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Reform Efforts and Their Effectiveness</h2>
        
        <p>
          Various reform initiatives have been implemented to reduce police use of force. 
          Their effectiveness varies significantly:
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Policy Reforms</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Reform Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Evidence of Effectiveness</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Implementation Challenges</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Duty to intervene</td>
                <td className="border border-gray-300 px-4 py-2">Officers must stop excessive force by colleagues</td>
                <td className="border border-gray-300 px-4 py-2 text-yellow-600">Limited research, mixed results</td>
                <td className="border border-gray-300 px-4 py-2">Police culture, fear of retaliation</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Ban on chokeholds</td>
                <td className="border border-gray-300 px-4 py-2">Prohibit neck restraints</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">Reduced chokehold deaths where implemented</td>
                <td className="border border-gray-300 px-4 py-2">Definition disputes, enforcement</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Qualified immunity limits</td>
                <td className="border border-gray-300 px-4 py-2">Reduce legal protection for officers</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">Too recent to evaluate</td>
                <td className="border border-gray-300 px-4 py-2">Police union opposition, legal complexity</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Civilian oversight</td>
                <td className="border border-gray-300 px-4 py-2">Independent investigation of complaints</td>
                <td className="border border-gray-300 px-4 py-2 text-yellow-600">Mixed, depends on authority level</td>
                <td className="border border-gray-300 px-4 py-2">Access to information, police cooperation</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Use of force databases</td>
                <td className="border border-gray-300 px-4 py-2">Track and analyze force incidents</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">Improved oversight and training</td>
                <td className="border border-gray-300 px-4 py-2">Standardization, officer reporting compliance</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Training Reforms</h3>
        <ul>
          <li><strong>De-escalation training:</strong> Shows promise but implementation varies widely</li>
          <li><strong>Bias training:</strong> Limited evidence of effectiveness, may be counterproductive</li>
          <li><strong>Crisis intervention:</strong> Positive results for mental health encounters</li>
          <li><strong>Scenario-based training:</strong> Better than classroom instruction</li>
          <li><strong>Procedural justice training:</strong> Improves community relations</li>
        </ul>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Technological Solutions</h3>
        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-8">
          <h4 className="font-semibold mb-3 text-purple-800">Less-Lethal Weapons</h4>
          <ul className="text-sm space-y-2">
            <li>• <strong>TASERs:</strong> Widely adopted, reduced some shootings but created new controversies</li>
            <li>• <strong>Pepper spray:</strong> Effective for some situations, concerns about overuse</li>
            <li>• <strong>Bean bag rounds:</strong> Can cause serious injury, limited deployment</li>
            <li>• <strong>Long Range Acoustic Device (LRAD):</strong> Crowd control, hearing damage concerns</li>
          </ul>
          <p className="text-sm mt-3">
            <strong>Net effect:</strong> Less-lethal weapons have likely prevented some fatal shootings but 
            have also increased overall use of force incidents.
          </p>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Path Forward: Evidence-Based Solutions</h2>
        
        <p>
          Reducing police use of force requires comprehensive approaches based on research evidence 
          rather than political rhetoric:
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Proven Strategies</h3>
        <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
          <h4 className="font-semibold mb-3 text-green-800">Reforms with Strong Evidence</h4>
          <ul className="text-sm space-y-2">
            <li>• <strong>Comprehensive de-escalation training:</strong> When properly implemented with leadership support</li>
            <li>• <strong>Early warning systems:</strong> Identify officers at risk before problems escalate</li>
            <li>• <strong>Restrictive use-of-force policies:</strong> Clear standards reduce inappropriate force</li>
            <li>• <strong>Civilian oversight with real authority:</strong> Independent investigation and discipline</li>
            <li>• <strong>Community policing programs:</strong> Build trust and reduce adversarial encounters</li>
            <li>• <strong>Officer wellness programs:</strong> Address stress, trauma, and burnout</li>
          </ul>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Systemic Changes Needed</h3>
        <ul>
          <li><strong>National standards:</strong> Consistent training and policies across departments</li>
          <li><strong>Data collection:</strong> Mandatory reporting of all use of force incidents</li>
          <li><strong>Cultural change:</strong> Shift from warrior to guardian mindset</li>
          <li><strong>Accountability systems:</strong> Swift, fair consequences for misconduct</li>
          <li><strong>Community investment:</strong> Address root causes of crime and social problems</li>
        </ul>

        <div className="bg-gray-900 text-white rounded-xl p-8 mb-8">
          <h3 className="font-heading text-xl font-bold mb-6 text-center">Police Use of Force: Key Facts</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">The Numbers</h4>
              <ul className="text-sm space-y-2">
                <li>• ~1,100 fatal police shootings annually</li>
                <li>• Black Americans killed at 2.5x rate per capita</li>
                <li>• 95% of shooting victims were armed</li>
                <li>• Use of force occurs in ~1% of police encounters</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">What Works</h4>
              <ul className="text-sm space-y-2">
                <li>• De-escalation training with leadership support</li>
                <li>• Body cameras (when properly implemented)</li>
                <li>• Restrictive use-of-force policies</li>
                <li>• Independent oversight with real authority</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="font-semibold mb-3 text-yellow-300">International Context</h4>
            <p className="text-sm">
              US police kill civilians at 30-50 times the rate of police in other developed nations. 
              This reflects differences in training, culture, legal standards, and civilian gun ownership.
            </p>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6 mb-8">
          <div>
            <h4 className="font-semibold mb-2">How many people are killed by police each year in America?</h4>
            <p className="text-sm text-gray-700">
              Approximately 1,100 people are fatally shot by police annually, according to databases 
              maintained by The Washington Post and other organizations tracking police shootings.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Do police kill Black Americans at higher rates than other groups?</h4>
            <p className="text-sm text-gray-700">
              Yes. Black Americans are killed by police at about 2.5 times the rate of white Americans 
              when adjusted for population. However, the interpretation of this disparity is debated.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Do body cameras reduce police use of force?</h4>
            <p className="text-sm text-gray-700">
              Research shows mixed results, but the famous Rialto study found a 93% reduction in 
              use-of-force complaints. However, results vary significantly across different departments 
              and implementations.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">How does US police use of force compare internationally?</h4>
            <p className="text-sm text-gray-700">
              US police kill civilians at dramatically higher rates than other developed nations. 
              For example, UK police killed 3 people in 2022 compared to over 1,100 in the US.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Are most police shooting victims armed?</h4>
            <p className="text-sm text-gray-700">
              Yes, approximately 95% of people shot by police were armed with some type of weapon 
              (firearm, knife, or other weapon). However, the presence of a weapon doesn't automatically 
              justify the use of deadly force.
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <h3 className="font-semibold mb-3">Data Sources and Limitations</h3>
          <p className="text-sm mb-3">
            Police use of force data has significant limitations:
          </p>
          <ul className="text-sm space-y-1">
            <li>• No comprehensive national database for non-fatal force</li>
            <li>• Voluntary reporting means many incidents go uncounted</li>
            <li>• Definitions of "use of force" vary by department</li>
            <li>• Media databases focus on fatal incidents only</li>
            <li>• Officer-involved shooting data often lacks context</li>
            <li>• Civilian complaint data may be biased (both over- and under-reporting)</li>
          </ul>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Related Analysis</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link href="/analysis/crime-by-race" className="block bg-[#1e3a5f] text-white rounded-lg p-4 hover:bg-[#2a4d7a] transition">
            <h4 className="font-semibold mb-2">Crime by Race</h4>
            <p className="text-sm opacity-90">Complete FBI data breakdown on racial patterns in crime</p>
          </Link>
          
          <Link href="/analysis/police-funding" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Police Funding and Crime Rates</h4>
            <p className="text-sm text-gray-600">Do cities that spend more on policing have less crime?</p>
          </Link>
          
          <Link href="/analysis/defund-police" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Did "Defund the Police" Cause a Crime Surge?</h4>
            <p className="text-sm text-gray-600">What happened to police budgets and crime after 2020</p>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="police-use-of-force" />
        <ShareButtons title="Police Use of Force: What the Data Actually Shows" />
      </div>
      
      <p className="text-sm text-gray-500 mt-8">
        Sources: Washington Post Police Shootings Database, FBI Law Enforcement Officers Killed and Assaulted, 
        Mapping Police Violence, Bureau of Justice Statistics, National Institute of Justice, 
        Police Executive Research Forum, Campaign Zero.
      </p>
    </div>
  );
}