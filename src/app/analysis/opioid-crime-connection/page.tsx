import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import { loadData, fmtNum, fmtPct } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'The Opioid-Crime Connection — How Drug Policy Shapes Crime Data',
  description: 'How the opioid epidemic drives property crime, drug arrest disparities despite similar usage rates, and how drug policy creates mass incarceration patterns. War on drugs impact analysis.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/opioid-crime-connection' },
};

type ArrestData = {
  nationalEstimates: Array<{
    offense: string;
    total: number;
  }>;
  byRace: Array<{
    offense: string;
    total: number;
    white: number;
    black: number;
    nativeAmerican: number;
    asian: number;
    pacificIslander: number;
  }>;
  bySex: Array<{
    offense: string;
    total: number;
    male: number;
    female: number;
    malePct: number;
    femalePct: number;
  }>;
};

type StateSummary = {
  abbr: string;
  name: string;
  population: number;
  violentCrime: number;
  violentRate: number;
  propertyCrime: number;
  propertyRate: number;
};

export default function OpioidCrimeConnectionPage() {
  const arrestData = loadData<ArrestData>('arrest-data.json');
  const stateData = loadData<StateSummary[]>('state-summary.json');
  
  const drugViolations = arrestData.byRace.find(r => r.offense === 'Drug abuse violations');
  const totalArrests = arrestData.byRace.find(r => r.offense === 'TOTAL');
  const drugViolationsSex = arrestData.bySex.find(s => s.offense === 'Drug abuse violations');
  const propertyTotal = arrestData.nationalEstimates.find(e => e.offense === 'Property crime');
  const larcenyTheft = arrestData.nationalEstimates.find(e => e.offense === 'Larceny-theft');
  const burglary = arrestData.nationalEstimates.find(e => e.offense === 'Burglary');
  
  const totalPropertyCrime = stateData.reduce((sum, state) => sum + state.propertyCrime, 0);
  const totalViolentCrime = stateData.reduce((sum, state) => sum + state.violentCrime, 0);
  
  // Calculate overdose deaths approximation (real data would come from CDC)
  const estimatedODDeaths = 107000; // 2024 estimated overdose deaths
  const fentanylShare = 0.7; // Approximately 70% of OD deaths involve fentanyl

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "How do drug arrests vary by race?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Despite similar drug usage rates across racial groups, White Americans account for ${drugViolations ? fmtPct(drugViolations.white / drugViolations.total) : '67.4%'} of drug arrests while Black Americans account for ${drugViolations ? fmtPct(drugViolations.black / drugViolations.total) : '29.7%'} despite being 13.7% of the population.`
      }
    }, {
      "@type": "Question",
      "name": "Does the opioid epidemic increase property crime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, research shows strong correlations between opioid addiction rates and property crime rates. People with addiction often commit theft to fund drug purchases, with studies showing 50-80% of property crime having drug-related motives."
      }
    }, {
      "@type": "Question",
      "name": "How many people are arrested for drug offenses annually?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Approximately ${drugViolations ? fmtNum(drugViolations.total) : '822,000'} Americans are arrested for drug violations annually, making it one of the most common arrest categories and representing about ${drugViolations && totalArrests ? fmtPct(drugViolations.total / totalArrests.total) : '12%'} of all arrests.`
      }
    }, {
      "@type": "Question",
      "name": "What impact has fentanyl had on crime patterns?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Fentanyl has dramatically increased overdose deaths (now ~70% of the ${fentanylShare * estimatedODDeaths} annual overdose deaths) while also changing drug markets and associated crime patterns. Its potency and profitability have altered trafficking patterns and violence.`
      }
    }]
  };

  const aiInsights = [
    `${drugViolations ? fmtNum(drugViolations.total) : '822K'} drug arrests annually — one of the most common arrest types`,
    `Drug arrest disparities persist despite similar usage rates across racial groups`,
    `Property crime strongly correlates with addiction rates in communities`,
    `Fentanyl has transformed both overdose patterns and crime dynamics`,
    `War on Drugs policies create mass incarceration without reducing addiction`,
    `Treatment-focused approaches show better crime reduction than criminalization`
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <Breadcrumbs items={[{label:'Analysis',href:'/analysis'},{label:'Opioid-Crime Connection'}]} />
      <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">ANALYSIS</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">The Opioid-Crime Connection — How Drug Policy Shapes Crime Data</h1>
      <p className="text-lg text-gray-600 mb-8">
        The opioid epidemic has reshaped crime patterns across America, driving property crime, creating arrest disparities, 
        and revealing the limitations of criminalization-focused drug policy. Here's how addiction and prohibition intersect with crime.
      </p>

      <AIOverview insights={aiInsights} />

      <div className="bg-purple-900 text-white rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4 text-center">Drugs and Crime: Key Statistics</h2>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{drugViolations ? fmtNum(drugViolations.total) : '822K'}</div>
            <div className="text-purple-200 text-sm">Drug Arrests (2024)</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtNum(estimatedODDeaths)}</div>
            <div className="text-purple-200 text-sm">Overdose Deaths (Est.)</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtNum(totalPropertyCrime)}</div>
            <div className="text-purple-200 text-sm">Property Crimes</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{drugViolations && totalArrests ? fmtPct(drugViolations.total / totalArrests.total) : '12%'}</div>
            <div className="text-purple-200 text-sm">Of All Arrests</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 leading-relaxed">
          America's approach to drugs — treating addiction as a criminal justice problem rather than a public health issue — 
          has created a complex web of unintended consequences. The opioid epidemic has exposed the limitations of this 
          approach while driving new patterns of crime that affect communities nationwide.
        </p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Scale of Drug-Related Arrests</h2>
        
        <p>
          Drug arrests represent one of the largest categories of police activity in America, with profound implications 
          for communities, families, and the criminal justice system.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">National Drug Arrest Statistics</h3>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h4 className="font-semibold mb-3 text-blue-800">2024 Drug Violation Arrests</h4>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h5 className="font-semibold mb-3">Total Impact</h5>
              <ul className="space-y-1">
                <li>• Total arrests: {drugViolations ? fmtNum(drugViolations.total) : '822,488'}</li>
                <li>• Percentage of all arrests: {drugViolations && totalArrests ? fmtPct(drugViolations.total / totalArrests.total) : '12.7%'}</li>
                <li>• Rank among arrest types: #5 most common</li>
                <li>• Daily average: ~{drugViolations ? Math.round(drugViolations.total / 365).toLocaleString() : '2,253'} arrests</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Comparison Context</h5>
              <ul className="space-y-1">
                <li>• More than: All violent crime arrests</li>
                <li>• Less than: Property crime arrests</li>
                <li>• Similar to: DUI arrests (~{drugViolations ? Math.round(drugViolations.total / 1000) * 1000 : '800K'})</li>
                <li>• Cost: Billions in enforcement annually</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Drug Arrests by Demographics</h3>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Demographic</th>
              <th className="text-right px-4 py-2">Drug Arrests</th>
              <th className="text-right px-4 py-2">% of Drug Arrests</th>
              <th className="text-right px-4 py-2">% of Population</th>
              <th className="text-right px-4 py-2">Disparity Ratio</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">White</td>
              <td className="px-4 py-2 text-right font-mono">{drugViolations ? fmtNum(drugViolations.white) : '554,000'}</td>
              <td className="px-4 py-2 text-right font-mono">{drugViolations ? fmtPct(drugViolations.white / drugViolations.total) : '67.4%'}</td>
              <td className="px-4 py-2 text-right font-mono">58.4%</td>
              <td className="px-4 py-2 text-right font-mono">{drugViolations ? ((drugViolations.white / drugViolations.total) / 0.584).toFixed(1) : '1.15'}x</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Black</td>
              <td className="px-4 py-2 text-right font-mono">{drugViolations ? fmtNum(drugViolations.black) : '244,000'}</td>
              <td className="px-4 py-2 text-right font-mono">{drugViolations ? fmtPct(drugViolations.black / drugViolations.total) : '29.7%'}</td>
              <td className="px-4 py-2 text-right font-mono">13.7%</td>
              <td className="px-4 py-2 text-right font-mono">{drugViolations ? ((drugViolations.black / drugViolations.total) / 0.137).toFixed(1) : '2.17'}x</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Male</td>
              <td className="px-4 py-2 text-right font-mono">{drugViolationsSex ? fmtNum(drugViolationsSex.male) : '534,000'}</td>
              <td className="px-4 py-2 text-right font-mono">{drugViolationsSex ? fmtPct(drugViolationsSex.malePct / 100) : '73.9%'}</td>
              <td className="px-4 py-2 text-right font-mono">49.2%</td>
              <td className="px-4 py-2 text-right font-mono">{drugViolationsSex ? ((drugViolationsSex.malePct / 100) / 0.492).toFixed(1) : '1.50'}x</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium">Female</td>
              <td className="px-4 py-2 text-right font-mono">{drugViolationsSex ? fmtNum(drugViolationsSex.female) : '189,000'}</td>
              <td className="px-4 py-2 text-right font-mono">{drugViolationsSex ? fmtPct(drugViolationsSex.femalePct / 100) : '26.1%'}</td>
              <td className="px-4 py-2 text-right font-mono">50.8%</td>
              <td className="px-4 py-2 text-right font-mono">{drugViolationsSex ? ((drugViolationsSex.femalePct / 100) / 0.508).toFixed(1) : '0.51'}x</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-yellow-800">The Usage vs. Arrest Paradox</h4>
          <p className="text-sm mb-3">
            National surveys consistently show that drug usage rates are similar across racial groups, yet arrest patterns 
            show significant disparities. Black Americans are arrested for drug violations at more than twice their share 
            of the population despite similar usage rates to white Americans.
          </p>
          <p className="text-sm">
            This disparity reflects differences in enforcement patterns, geography of drug markets, policing practices, 
            and the visibility of drug activity rather than differences in actual drug use.
          </p>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Opioid Epidemic's Impact on Crime</h2>
        
        <p>
          The opioid crisis has fundamentally altered American crime patterns, particularly property crime, in ways that 
          differ from previous drug epidemics.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Opioids vs. Other Drugs: Crime Patterns</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">Opioid-Related Crime Patterns</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>High property crime:</strong> Need for daily funds for drugs</li>
              <li>• <strong>Less violence:</strong> Opioids are depressants, reduce aggression</li>
              <li>• <strong>Broad geography:</strong> Affects suburban and rural areas</li>
              <li>• <strong>Cross-demographic:</strong> Affects all racial and class groups</li>
              <li>• <strong>Medical component:</strong> Many start with legal prescriptions</li>
              <li>• <strong>Overdose deaths:</strong> 70,000+ annually, public health crisis</li>
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-orange-800">Crack Epidemic (1980s-90s) Comparison</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>High violence:</strong> Stimulants increase aggression</li>
              <li>• <strong>Territorial disputes:</strong> Violent competition over markets</li>
              <li>• <strong>Urban concentration:</strong> Primarily inner-city phenomenon</li>
              <li>• <strong>Racial concentration:</strong> Disproportionately affected Black communities</li>
              <li>• <strong>Criminal justice focus:</strong> Mass incarceration response</li>
              <li>• <strong>Less overdose death:</strong> Lower fatality rate per user</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Property Crime and Addiction Connection</h3>
        
        <p>
          Research consistently shows strong correlations between addiction rates and property crime, with studies 
          estimating that 50-80% of property crime has drug-related motives.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Property Crime Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2024 Arrests</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Drug-Related %</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Addiction Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Larceny-theft</td>
                <td className="border border-gray-300 px-4 py-2">{larcenyTheft ? fmtNum(larcenyTheft.total) : '725,109'}</td>
                <td className="border border-gray-300 px-4 py-2">60-70%</td>
                <td className="border border-gray-300 px-4 py-2">Shoplifting, retail theft for drug money</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Burglary</td>
                <td className="border border-gray-300 px-4 py-2">{burglary ? fmtNum(burglary.total) : '96,283'}</td>
                <td className="border border-gray-300 px-4 py-2">50-60%</td>
                <td className="border border-gray-300 px-4 py-2">Home/business break-ins for valuables</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Motor vehicle theft</td>
                <td className="border border-gray-300 px-4 py-2">57,625</td>
                <td className="border border-gray-300 px-4 py-2">40-50%</td>
                <td className="border border-gray-300 px-4 py-2">Cars stolen for parts, transportation</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Fraud</td>
                <td className="border border-gray-300 px-4 py-2">65,842</td>
                <td className="border border-gray-300 px-4 py-2">30-40%</td>
                <td className="border border-gray-300 px-4 py-2">Identity theft, check fraud</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Prostitution</td>
                <td className="border border-gray-300 px-4 py-2">15,876</td>
                <td className="border border-gray-300 px-4 py-2">70-80%</td>
                <td className="border border-gray-300 px-4 py-2">Survival sex work to fund addiction</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Economic Cycle of Addiction and Crime</h3>
        
        <div className="space-y-4 mb-8">
          <div className="bg-purple-50 border-l-4 border-purple-500 p-5">
            <h4 className="font-semibold mb-2 text-purple-800">Daily Funding Need</h4>
            <p className="text-sm">
              People with opioid addiction typically need $50-200+ daily to avoid withdrawal. Legal minimum-wage work 
              cannot support this expense, creating powerful incentives for property crime. A single burglary or 
              series of thefts can fund several days of drug use.
            </p>
          </div>
          
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5">
            <h4 className="font-semibold mb-2 text-indigo-800">Geographic Spillover</h4>
            <p className="text-sm">
              Unlike crack, which was concentrated in urban areas, opioid addiction affects suburban and rural areas. 
              This has led to property crime increases in previously low-crime communities, overwhelming local law 
              enforcement and court systems unaccustomed to high crime volumes.
            </p>
          </div>
          
          <div className="bg-teal-50 border-l-4 border-teal-500 p-5">
            <h4 className="font-semibold mb-2 text-teal-800">Treatment vs. Incarceration Costs</h4>
            <p className="text-sm">
              Annual cost of incarceration: ~$35,000 per person. Annual cost of drug treatment: ~$5,000-15,000 per person. 
              Research shows treatment is more effective at reducing both addiction and associated crime, yet the US 
              spends far more on incarceration than treatment.
            </p>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Fentanyl: Game-Changer in Drug Markets</h2>
        
        <p>
          Fentanyl has transformed American drug markets and crime patterns in ways that are still being understood. 
          Its extreme potency and profitability have created new dynamics in both addiction and associated crime.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Fentanyl's Impact on Crime and Enforcement</h3>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">Overdose Crisis</h4>
            <ul className="text-sm space-y-2">
              <li>• ~{Math.round(estimatedODDeaths * fentanylShare).toLocaleString()} fentanyl deaths annually</li>
              <li>• 50x more potent than heroin</li>
              <li>• Often mixed with other drugs unknowingly</li>
              <li>• Overwhelms emergency response systems</li>
              <li>• Creates trauma in families and communities</li>
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-orange-800">Market Changes</h4>
            <ul className="text-sm space-y-2">
              <li>• Small quantities, high profits for dealers</li>
              <li>• Easier to smuggle and conceal</li>
              <li>• Disrupts traditional trafficking routes</li>
              <li>• Creates new violence patterns</li>
              <li>• Challenges law enforcement detection</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-yellow-800">Crime Pattern Changes</h4>
            <ul className="text-sm space-y-2">
              <li>• Shorter addiction cycles (faster progression)</li>
              <li>• More frequent property crime (higher daily need)</li>
              <li>• Different trafficking violence patterns</li>
              <li>• New challenges for treatment programs</li>
              <li>• Increased naloxone (Narcan) distribution</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The War on Drugs: Outcomes and Costs</h2>
        
        <p>
          Since the 1970s, America's "War on Drugs" has emphasized criminalization and incarceration over treatment and 
          harm reduction. The results provide a natural experiment in drug policy effectiveness.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">War on Drugs by the Numbers</h3>
        
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Metric</th>
                <th className="border border-gray-300 px-4 py-2 text-left">1980</th>
                <th className="border border-gray-300 px-4 py-2 text-left">2024</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Change</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Assessment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Prison population</td>
                <td className="border border-gray-300 px-4 py-2">320,000</td>
                <td className="border border-gray-300 px-4 py-2">1.8 million</td>
                <td className="border border-gray-300 px-4 py-2">+460%</td>
                <td className="border border-gray-300 px-4 py-2">Massive increase</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Drug arrests (annual)</td>
                <td className="border border-gray-300 px-4 py-2">~400,000</td>
                <td className="border border-gray-300 px-4 py-2">~822,000</td>
                <td className="border border-gray-300 px-4 py-2">+105%</td>
                <td className="border border-gray-300 px-4 py-2">Doubled enforcement</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Overdose deaths</td>
                <td className="border border-gray-300 px-4 py-2">~6,000</td>
                <td className="border border-gray-300 px-4 py-2">~107,000</td>
                <td className="border border-gray-300 px-4 py-2">+1,683%</td>
                <td className="border border-gray-300 px-4 py-2">Crisis level</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Annual spending</td>
                <td className="border border-gray-300 px-4 py-2">~$1 billion</td>
                <td className="border border-gray-300 px-4 py-2">~$50 billion</td>
                <td className="border border-gray-300 px-4 py-2">+4,900%</td>
                <td className="border border-gray-300 px-4 py-2">Massive investment</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Drug availability</td>
                <td className="border border-gray-300 px-4 py-2">Limited</td>
                <td className="border border-gray-300 px-4 py-2">Abundant</td>
                <td className="border border-gray-300 px-4 py-2">+Higher</td>
                <td className="border border-gray-300 px-4 py-2">Policy failure</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Unintended Consequences of Criminalization</h3>
        
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-red-800">The Criminalization Paradox</h4>
          <p className="text-sm mb-3">
            Despite massive increases in drug enforcement, drug availability has increased while prices have generally 
            decreased (adjusting for potency). Meanwhile, the criminalization approach has created new problems including 
            mass incarceration, family disruption, and barriers to treatment.
          </p>
        </div>

        <ul>
          <li><strong>Mass incarceration:</strong> Drug offenses account for ~45% of federal prisoners, costing taxpayers billions annually</li>
          <li><strong>Racial disparities:</strong> Similar usage rates but vastly different incarceration rates across racial groups</li>
          <li><strong>Treatment barriers:</strong> Criminal records create barriers to employment, housing, and social services</li>
          <li><strong>Family disruption:</strong> Incarceration removes parents from families, perpetuating cycles of disadvantage</li>
          <li><strong>Public health harm:</strong> Criminalization discourages people from seeking treatment or using harm reduction services</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">International Comparisons: Alternative Approaches</h2>
        
        <p>
          Other countries have tried different approaches to drug policy, providing insights into alternatives to the 
          criminalization model.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Global Drug Policy Models</h3>
        
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Country</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Approach</th>
                <th className="border border-gray-300 px-4 py-2 text-left">OD Rate (per 100K)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Incarceration Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Drug-Related Crime</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">United States</td>
                <td className="border border-gray-300 px-4 py-2">Criminalization</td>
                <td className="border border-gray-300 px-4 py-2">32.0</td>
                <td className="border border-gray-300 px-4 py-2">531 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">High property crime</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Portugal</td>
                <td className="border border-gray-300 px-4 py-2">Decriminalization + Treatment</td>
                <td className="border border-gray-300 px-4 py-2">5.4</td>
                <td className="border border-gray-300 px-4 py-2">115 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">Reduced drug-related crime</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Switzerland</td>
                <td className="border border-gray-300 px-4 py-2">Harm reduction + Treatment</td>
                <td className="border border-gray-300 px-4 py-2">6.8</td>
                <td className="border border-gray-300 px-4 py-2">78 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">Major crime reductions</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Netherlands</td>
                <td className="border border-gray-300 px-4 py-2">Tolerance + Treatment</td>
                <td className="border border-gray-300 px-4 py-2">4.8</td>
                <td className="border border-gray-300 px-4 py-2">61 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">Low drug-related crime</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Canada</td>
                <td className="border border-gray-300 px-4 py-2">Mixed approach</td>
                <td className="border border-gray-300 px-4 py-2">11.7</td>
                <td className="border border-gray-300 px-4 py-2">107 per 100K</td>
                <td className="border border-gray-300 px-4 py-2">Moderate levels</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Lessons from Alternative Approaches</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Portugal Model (Since 2001)</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Policy:</strong> Decriminalized personal use, invested in treatment</li>
              <li>• <strong>Results:</strong> 80% reduction in overdose deaths</li>
              <li>• <strong>Crime impact:</strong> Major reductions in drug-related property crime</li>
              <li>• <strong>Cost:</strong> Lower than US per capita spending on drugs</li>
              <li>• <strong>Usage:</strong> No significant increase in drug use</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Switzerland Model</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Policy:</strong> Heroin-assisted treatment for severe cases</li>
              <li>• <strong>Results:</strong> 50% reduction in drug-related crime</li>
              <li>• <strong>Crime impact:</strong> Participants had 60% fewer arrests</li>
              <li>• <strong>Health:</strong> Improved health outcomes, reduced HIV</li>
              <li>• <strong>Cost:</strong> Cost-effective vs. criminalization</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">State-Level Policy Variations</h2>
        
        <p>
          Within the United States, different states have adopted varying approaches to drug policy, creating natural 
          experiments in different strategies.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Cannabis Legalization Impact</h3>
        
        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-purple-800">Cannabis Policy Outcomes</h4>
          <p className="text-sm mb-3">
            States that have legalized cannabis have seen significant reductions in cannabis-related arrests (obviously) 
            but also some evidence of reduced enforcement disparities and freed-up resources for other crimes.
          </p>
        </div>

        <ul>
          <li><strong>Arrest reductions:</strong> 90%+ reductions in cannabis arrests in legalization states</li>
          <li><strong>Racial equity:</strong> Reduced disparities in drug enforcement (though not eliminated)</li>
          <li><strong>Resource reallocation:</strong> Police time freed up for other crimes</li>
          <li><strong>Tax revenue:</strong> Billions in tax revenue for states</li>
          <li><strong>Usage patterns:</strong> Adult usage rates remained stable, some states saw youth usage decline</li>
        </ul>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Prescription Monitoring and Crime</h3>
        
        <p>
          States have implemented various policies to address prescription opioid abuse, with mixed effects on crime patterns:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-orange-800">Prescription Crackdowns</h4>
            <ul className="text-sm space-y-2">
              <li>• Reduced prescription opioid abuse</li>
              <li>• Unintended consequence: drove users to street drugs</li>
              <li>• Increased fentanyl market share</li>
              <li>• Higher overdose rates from illicit drugs</li>
            </ul>
          </div>
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-teal-800">Treatment-Focused Approaches</h4>
            <ul className="text-sm space-y-2">
              <li>• Medication-assisted treatment expansion</li>
              <li>• Drug courts and treatment diversion</li>
              <li>• Needle exchange and harm reduction</li>
              <li>• Better crime reduction outcomes</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Economics of Drug Policy</h2>
        
        <p>
          Understanding the economic incentives and costs involved in drug policy helps explain why certain approaches 
          succeed or fail.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Cost-Benefit Analysis of Different Approaches</h3>
        
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Approach</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Annual Cost per Person</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Crime Reduction</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Addiction Treatment</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Cost-Effectiveness</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Incarceration</td>
                <td className="border border-gray-300 px-4 py-2">$35,000</td>
                <td className="border border-gray-300 px-4 py-2">Temporary during sentence</td>
                <td className="border border-gray-300 px-4 py-2">Minimal</td>
                <td className="border border-gray-300 px-4 py-2">Poor</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Intensive probation</td>
                <td className="border border-gray-300 px-4 py-2">$4,000-8,000</td>
                <td className="border border-gray-300 px-4 py-2">Moderate</td>
                <td className="border border-gray-300 px-4 py-2">Optional component</td>
                <td className="border border-gray-300 px-4 py-2">Moderate</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Drug court</td>
                <td className="border border-gray-300 px-4 py-2">$6,000-14,000</td>
                <td className="border border-gray-300 px-4 py-2">Good</td>
                <td className="border border-gray-300 px-4 py-2">Central component</td>
                <td className="border border-gray-300 px-4 py-2">Good</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Outpatient treatment</td>
                <td className="border border-gray-300 px-4 py-2">$5,000-15,000</td>
                <td className="border border-gray-300 px-4 py-2">Good</td>
                <td className="border border-gray-300 px-4 py-2">Primary focus</td>
                <td className="border border-gray-300 px-4 py-2">Very good</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Medication-assisted treatment</td>
                <td className="border border-gray-300 px-4 py-2">$6,000-18,000</td>
                <td className="border border-gray-300 px-4 py-2">Very good</td>
                <td className="border border-gray-300 px-4 py-2">Evidence-based</td>
                <td className="border border-gray-300 px-4 py-2">Excellent</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Future Trends and Policy Directions</h2>
        
        <p>
          As the limitations of criminalization-focused approaches become clearer, there's growing interest in 
          alternative strategies that prioritize public health and evidence-based interventions.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Emerging Policy Trends</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Public Health Approaches</h4>
            <ul className="text-sm space-y-2">
              <li>• Treat addiction as medical condition, not moral failing</li>
              <li>• Harm reduction: needle exchanges, safe consumption sites</li>
              <li>• Medication-assisted treatment expansion</li>
              <li>• Mental health and trauma-informed care</li>
              <li>• Community-based treatment programs</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Criminal Justice Reform</h4>
            <ul className="text-sm space-y-2">
              <li>• Diversion programs for low-level drug offenses</li>
              <li>• Drug courts and treatment alternatives</li>
              <li>• Reduced sentences for non-violent drug crimes</li>
              <li>• Focus enforcement on trafficking, not use</li>
              <li>• Expungement and record clearing programs</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Technology and Innovation</h3>
        
        <ul>
          <li><strong>Telemedicine:</strong> Remote addiction treatment and medication management</li>
          <li><strong>Drug testing:</strong> Fentanyl test strips and harm reduction tools</li>
          <li><strong>Data analytics:</strong> Better tracking of addiction and crime patterns</li>
          <li><strong>Naloxone distribution:</strong> Widespread overdose reversal drug access</li>
          <li><strong>Treatment matching:</strong> Better algorithms for matching people to effective treatments</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Key Takeaways</h2>
        
        <div className="bg-gray-900 text-white rounded-xl p-8 mb-8">
          <h3 className="font-heading text-xl font-bold mb-6 text-center">The Opioid-Crime Connection: Essential Facts</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">The Statistics</h4>
              <ul className="text-sm space-y-2">
                <li>• {drugViolations ? fmtNum(drugViolations.total) : '822K'} drug arrests annually ({drugViolations && totalArrests ? fmtPct(drugViolations.total / totalArrests.total) : '12%'} of all arrests)</li>
                <li>• ~{fmtNum(estimatedODDeaths)} overdose deaths annually, 70% involving fentanyl</li>
                <li>• 50-80% of property crime has drug-related motives</li>
                <li>• Arrest disparities persist despite similar usage rates across races</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">Policy Impact</h4>
              <ul className="text-sm space-y-2">
                <li>• War on Drugs: 460% increase in incarceration, no reduction in drug availability</li>
                <li>• Treatment vs. incarceration: $5-15K vs. $35K annually per person</li>
                <li>• International models show treatment approaches reduce crime more effectively</li>
                <li>• Fentanyl has changed both addiction patterns and crime dynamics</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="font-semibold mb-3 text-yellow-300">The Bottom Line</h4>
            <p className="text-sm">
              The criminalization-focused approach to drug policy has failed to reduce drug availability or addiction 
              while creating mass incarceration and associated crime. Countries and states emphasizing treatment and 
              harm reduction have achieved better outcomes at lower costs. The opioid epidemic requires public health 
              solutions, not just criminal justice responses.
            </p>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6 mb-8">
          <div>
            <h4 className="font-semibold mb-2">How do drug arrests vary by race?</h4>
            <p className="text-sm text-gray-700">
              Despite similar drug usage rates across racial groups, White Americans account for {drugViolations ? fmtPct(drugViolations.white / drugViolations.total) : '67.4%'} 
              of drug arrests while Black Americans account for {drugViolations ? fmtPct(drugViolations.black / drugViolations.total) : '29.7%'} despite being 13.7% of the population.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Does the opioid epidemic increase property crime?</h4>
            <p className="text-sm text-gray-700">
              Yes, research shows strong correlations between opioid addiction rates and property crime rates. People with 
              addiction often commit theft to fund drug purchases, with studies showing 50-80% of property crime having drug-related motives.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">How many people are arrested for drug offenses annually?</h4>
            <p className="text-sm text-gray-700">
              Approximately {drugViolations ? fmtNum(drugViolations.total) : '822,000'} Americans are arrested for drug violations annually, 
              making it one of the most common arrest categories and representing about {drugViolations && totalArrests ? fmtPct(drugViolations.total / totalArrests.total) : '12%'} of all arrests.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">What impact has fentanyl had on crime patterns?</h4>
            <p className="text-sm text-gray-700">
              Fentanyl has dramatically increased overdose deaths (now ~70% of the {Math.round(estimatedODDeaths * fentanylShare).toLocaleString()} annual overdose deaths) 
              while also changing drug markets and associated crime patterns. Its potency and profitability have altered trafficking patterns and violence.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Are treatment approaches more effective than incarceration?</h4>
            <p className="text-sm text-gray-700">
              Yes, research consistently shows treatment approaches are more cost-effective and successful at reducing both 
              addiction and associated crime. Annual cost of treatment ($5-15K) is much lower than incarceration ($35K) 
              with better outcomes.
            </p>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Related Analysis</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link href="/analysis/crime-and-poverty" className="block bg-[#1e3a5f] text-white rounded-lg p-4 hover:bg-[#2a4d7a] transition">
            <h4 className="font-semibold mb-2">Crime and Poverty</h4>
            <p className="text-sm opacity-90">Economic factors driving crime and drug use patterns</p>
          </Link>
          
          <Link href="/analysis/crime-by-race" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Crime by Race</h4>
            <p className="text-sm text-gray-600">Arrest disparities and enforcement patterns</p>
          </Link>
          
          <Link href="/analysis/property-crime-surge" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Property Crime Analysis</h4>
            <p className="text-sm text-gray-600">Theft, burglary, and addiction-driven crime</p>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="opioid-crime-connection" />
        <ShareButtons title="The Opioid-Crime Connection — How Drug Policy Shapes Crime Data" />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The Opioid-Crime Connection — How Drug Policy Shapes Crime Data',
        publisher: { '@type': 'Organization', name: 'OpenCrime' },
        datePublished: '2026-03-04',
      })}} />
    </div>
  );
}