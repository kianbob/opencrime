import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import { loadData, fmtNum, fmtPct } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Crime by Race — The Complete FBI Data Breakdown',
  description: 'Comprehensive analysis of FBI arrest and victim data by race. Black Americans are 13.7% of population but 30.5% of arrests and 51.6% of murder victims. Full data breakdown with context.',
  openGraph: { title: 'Crime by Race — The Complete FBI Data Breakdown', description: 'Full FBI data on crime by race: arrests, victims, offenders — with essential social context.', url: 'https://www.opencrime.us/analysis/crime-by-race' },
  alternates: { canonical: 'https://www.opencrime.us/analysis/crime-by-race' },
};

type ArrestData = {
  byRace: Array<{
    offense: string;
    total: number;
    white: number;
    black: number;
    nativeAmerican: number;
    asian: number;
    pacificIslander: number;
  }>;
};

type HomicideData = {
  victimRace: Array<{
    race: string;
    count: number;
  }>;
};

export default function CrimeByRacePage() {
  const arrestData = loadData<ArrestData>('arrest-data.json');
  const homicideData = loadData<HomicideData>('homicide-data.json');
  
  const totalArrests = arrestData.byRace.find(r => r.offense === 'TOTAL');
  const murderArrests = arrestData.byRace.find(r => r.offense === 'Murder and nonnegligent manslaughter');
  const violentCrime = arrestData.byRace.find(r => r.offense === 'Violent crime');
  const propertyCrime = arrestData.byRace.find(r => r.offense === 'Property crime');
  const drugViolations = arrestData.byRace.find(r => r.offense === 'Drug abuse violations');
  
  const totalVictims = homicideData.victimRace.reduce((sum, v) => sum + v.count, 0);
  const blackVictims = homicideData.victimRace.find(v => v.race === 'Black')?.count || 0;
  const whiteVictims = homicideData.victimRace.find(v => v.race === 'White')?.count || 0;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "What percentage of arrests are Black Americans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Black Americans account for ${fmtPct((totalArrests?.black || 0) / (totalArrests?.total || 1))} of all arrests despite being 13.7% of the US population. This represents ${fmtNum(totalArrests?.black || 0)} arrests out of ${fmtNum(totalArrests?.total || 0)} total arrests.`
      }
    }, {
      "@type": "Question",
      "name": "Are Black Americans more likely to be crime victims?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Yes, Black Americans are disproportionately victims of violent crime, especially homicide. They represent ${fmtPct(blackVictims / totalVictims)} of murder victims (${fmtNum(blackVictims)} of ${fmtNum(totalVictims)} total) despite being 13.7% of the population.`
      }
    }, {
      "@type": "Question",
      "name": "How do arrest rates vary by crime type?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Arrest patterns vary significantly by offense type. Black Americans account for 58% of murder arrests, 57.8% of robbery arrests, but only 16.8% of DUI arrests and 29.7% of drug violation arrests."
      }
    }, {
      "@type": "Question",
      "name": "What factors contribute to racial disparities in crime statistics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multiple factors contribute including poverty rates, residential segregation, differential policing practices, educational opportunities, and historical discrimination. Crime statistics reflect complex social, economic, and policy factors rather than individual characteristics."
      }
    }]
  };

  const aiInsights = [
    `Black Americans are ${fmtPct((totalArrests?.black || 0) / (totalArrests?.total || 1))} of arrests but 13.7% of population`,
    `${fmtPct(blackVictims / totalVictims)} of murder victims are Black — they are victims at far higher rates`,
    `White Americans account for ${fmtPct((totalArrests?.white || 0) / (totalArrests?.total || 1))} of total arrests`,
    `Drug arrest disparities exist despite similar usage rates across racial groups`,
    `Geographic concentration: Most arrests occur in segregated, high-poverty neighborhoods`,
    `Victim-offender patterns often occur within racial groups in the same communities`
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <Breadcrumbs items={[{label:'Analysis',href:'/analysis'},{label:'Crime by Race'}]} />
      <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">ANALYSIS</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">Crime by Race — The Complete FBI Data Breakdown</h1>
      <p className="text-lg text-gray-600 mb-8">
        Racial disparities in crime statistics reflect complex social realities. Here's what the FBI's comprehensive 
        arrest and victimization data shows — the numbers, the context, and what they actually mean.
      </p>

      <AIOverview insights={aiInsights} />

      <div className="bg-gray-900 text-white rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4 text-center">Crime by Race: Key Statistics</h2>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{fmtNum(totalArrests?.total || 0)}</div>
            <div className="text-gray-300 text-sm">Total Arrests (2024)</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtPct((totalArrests?.white || 0) / (totalArrests?.total || 1))}</div>
            <div className="text-gray-300 text-sm">White Arrests</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtPct((totalArrests?.black || 0) / (totalArrests?.total || 1))}</div>
            <div className="text-gray-300 text-sm">Black Arrests</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtPct(blackVictims / totalVictims)}</div>
            <div className="text-gray-300 text-sm">Black Murder Victims</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 leading-relaxed">
          Few topics in criminal justice generate more heat than racial disparities in crime statistics. The FBI data 
          is unambiguous: significant disparities exist. But understanding what those numbers mean — and don't mean — 
          requires examining the full context of American social, economic, and policy realities.
        </p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Raw Numbers: What FBI Data Shows</h2>
        
        <p>
          In 2024, law enforcement agencies reported approximately {fmtNum(totalArrests?.total || 0)} arrests to the 
          FBI. The racial breakdown reveals stark disparities that have persisted for decades:
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h3 className="font-semibold mb-3 text-blue-800">2024 US Population vs. Arrest Percentages</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-3">Population (2024 Census estimates)</h4>
              <ul className="space-y-1">
                <li>• White (non-Hispanic): 58.4%</li>
                <li>• Black: 13.7%</li>
                <li>• Hispanic: 19.5%</li>
                <li>• Asian: 6.3%</li>
                <li>• Native American: 1.3%</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">FBI Arrest Data</h4>
              <ul className="space-y-1">
                <li>• White: {fmtPct((totalArrests?.white || 0) / (totalArrests?.total || 1))} ({fmtNum(totalArrests?.white || 0)})</li>
                <li>• Black: {fmtPct((totalArrests?.black || 0) / (totalArrests?.total || 1))} ({fmtNum(totalArrests?.black || 0)})</li>
                <li>• Native American: {fmtPct((totalArrests?.nativeAmerican || 0) / (totalArrests?.total || 1))} ({fmtNum(totalArrests?.nativeAmerican || 0)})</li>
                <li>• Asian: {fmtPct((totalArrests?.asian || 0) / (totalArrests?.total || 1))} ({fmtNum(totalArrests?.asian || 0)})</li>
                <li>• Pacific Islander: {fmtPct((totalArrests?.pacificIslander || 0) / (totalArrests?.total || 1))} ({fmtNum(totalArrests?.pacificIslander || 0)})</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white rounded">
            <strong>Key disparity:</strong> Black Americans are 13.7% of the population but {fmtPct((totalArrests?.black || 0) / (totalArrests?.total || 1))} of arrests — a 2.2x overrepresentation.
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Complete Arrest Breakdown by Race and Crime Type</h3>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Crime Category</th>
              <th className="text-right px-4 py-2">Total</th>
              <th className="text-right px-4 py-2">White %</th>
              <th className="text-right px-4 py-2">Black %</th>
              <th className="text-right px-4 py-2">Other %</th>
            </tr>
          </thead>
          <tbody>
            {arrestData.byRace.filter(offense => [
              'TOTAL',
              'Murder and nonnegligent manslaughter', 
              'Rape',
              'Robbery', 
              'Aggravated assault',
              'Violent crime',
              'Property crime',
              'Drug abuse violations',
              'Driving under the influence',
              'Burglary',
              'Larceny-theft',
              'Motor vehicle theft'
            ].includes(offense.offense)).map(offense => {
              const otherPct = 100 - ((offense.white / offense.total) * 100) - ((offense.black / offense.total) * 100);
              return (
                <tr key={offense.offense} className="border-t">
                  <td className="px-4 py-2 font-medium">{offense.offense}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtNum(offense.total)}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtPct(offense.white / offense.total)}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtPct(offense.black / offense.total)}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtPct(otherPct / 100)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Crime Type Patterns</h3>
        
        <p>
          The data reveals significant variation in racial patterns across different crime types:
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">Violent Crime</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Murder:</strong> Black {fmtPct((murderArrests?.black || 0) / (murderArrests?.total || 1))}, White {fmtPct((murderArrests?.white || 0) / (murderArrests?.total || 1))}</li>
              <li>• <strong>Robbery:</strong> Black 57.8%, White 39.2%</li>
              <li>• <strong>Aggravated Assault:</strong> Black 40.6%, White 55.0%</li>
              <li>• <strong>Overall Violent:</strong> Black {fmtPct((violentCrime?.black || 0) / (violentCrime?.total || 1))}, White {fmtPct((violentCrime?.white || 0) / (violentCrime?.total || 1))}</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Property Crime</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Overall Property:</strong> White {fmtPct((propertyCrime?.white || 0) / (propertyCrime?.total || 1))}, Black {fmtPct((propertyCrime?.black || 0) / (propertyCrime?.total || 1))}</li>
              <li>• <strong>Burglary:</strong> White 62.6%, Black 34.3%</li>
              <li>• <strong>Larceny-theft:</strong> White 62.0%, Black 34.4%</li>
              <li>• <strong>Motor vehicle theft:</strong> White 58.4%, Black 38.4%</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Other Offenses</h4>
            <ul className="text-sm space-y-2">
              <li>• <strong>Drug violations:</strong> White {fmtPct((drugViolations?.white || 0) / (drugViolations?.total || 1))}, Black {fmtPct((drugViolations?.black || 0) / (drugViolations?.total || 1))}</li>
              <li>• <strong>DUI:</strong> White 78.8%, Black 16.8%</li>
              <li>• <strong>Public order:</strong> Varies by jurisdiction</li>
              <li>• <strong>White-collar:</strong> Predominantly white offenders</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Victim Side: Who Gets Hurt by Crime?</h2>
        
        <p>
          A crucial but often overlooked aspect of crime statistics is victimization. Black Americans are not only 
          overrepresented among offenders — they're also disproportionately victims of crime, especially violent crime.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Homicide Victimization by Race</h3>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Victim Race</th>
              <th className="text-right px-4 py-2">Murder Victims</th>
              <th className="text-right px-4 py-2">% of Victims</th>
              <th className="text-right px-4 py-2">% of Population</th>
              <th className="text-right px-4 py-2">Risk Ratio</th>
            </tr>
          </thead>
          <tbody>
            {homicideData.victimRace.filter(v => !v.race.includes('Unknown')).map(victim => {
              const pct = (victim.count / totalVictims) * 100;
              const popPct = victim.race === 'White' ? 58.4 : victim.race === 'Black' ? 13.7 : 28.0; // Other groups combined
              const ratio = pct / popPct;
              return (
                <tr key={victim.race} className="border-t">
                  <td className="px-4 py-2 font-medium">{victim.race}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtNum(victim.count)}</td>
                  <td className="px-4 py-2 text-right font-mono">{pct.toFixed(1)}%</td>
                  <td className="px-4 py-2 text-right font-mono">{popPct.toFixed(1)}%</td>
                  <td className="px-4 py-2 text-right font-mono">{ratio.toFixed(1)}x</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-yellow-800">The Double Burden</h4>
          <p className="text-sm mb-3">
            Black Americans face what criminologists call a "double burden" — higher rates of both offending and 
            victimization. They are {fmtNum(blackVictims)} of {fmtNum(totalVictims)} murder victims ({fmtPct(blackVictims / totalVictims)}), 
            nearly 4 times their share of the population.
          </p>
          <p className="text-sm">
            This pattern reflects the concentrated nature of crime in specific communities rather than widespread 
            criminal behavior across demographic groups.
          </p>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Intraracial vs. Interracial Crime</h3>
        
        <p>
          Most violent crime occurs within racial groups, not between them. FBI data consistently shows:
        </p>

        <ul>
          <li><strong>84% of white victims</strong> are killed by white offenders</li>
          <li><strong>88% of Black victims</strong> are killed by Black offenders</li>
          <li><strong>Interracial violence</strong> is relatively uncommon compared to intraracial violence</li>
          <li><strong>Geographic concentration</strong> explains much of this pattern — people tend to commit crimes in their own neighborhoods</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">What the Data Does NOT Tell You</h2>
        
        <p>
          Raw crime statistics, while factually accurate, don't exist in a vacuum. Understanding what's driving 
          these patterns requires examining factors that don't show up in FBI data tables.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Arrests vs. Actual Crime Commission</h3>
        
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-red-800">The Arrest Data Limitation</h4>
          <p className="text-sm mb-3">
            FBI data shows arrests, not necessarily crime commission. Differential policing practices, prosecutorial 
            decisions, and reporting patterns can create disparities in who gets arrested for similar behavior.
          </p>
          <div className="text-xs bg-white p-3 rounded">
            <strong>Example:</strong> Drug usage surveys show similar rates across racial groups, but drug arrest rates show significant disparities.
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Factors Not Captured in FBI Data</h4>
            <ul className="text-sm space-y-2">
              <li>• Poverty rates and economic opportunity</li>
              <li>• Educational access and quality</li>
              <li>• Employment discrimination</li>
              <li>• Residential segregation patterns</li>
              <li>• Historical redlining effects</li>
              <li>• Family structure and stability</li>
              <li>• Community social capital</li>
              <li>• Mental health service access</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">System-Level Factors</h4>
            <ul className="text-sm space-y-2">
              <li>• Differential police deployment</li>
              <li>• Stop-and-frisk practices</li>
              <li>• Prosecutorial discretion patterns</li>
              <li>• Sentencing disparities</li>
              <li>• Plea bargaining outcomes</li>
              <li>• Pretrial detention rates</li>
              <li>• Probation/parole violations</li>
              <li>• School-to-prison pipeline</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Role of Socioeconomic Factors</h3>
        
        <p>
          Research consistently shows that when controlling for socioeconomic factors, racial disparities in crime 
          rates diminish significantly (though don't disappear entirely).
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Factor</th>
                <th className="border border-gray-300 px-4 py-2 text-left">White Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Black Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Ratio</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Crime Connection</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Poverty rate</td>
                <td className="border border-gray-300 px-4 py-2">8.1%</td>
                <td className="border border-gray-300 px-4 py-2">18.8%</td>
                <td className="border border-gray-300 px-4 py-2">2.3x</td>
                <td className="border border-gray-300 px-4 py-2">Strong correlation with crime rates</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Child poverty</td>
                <td className="border border-gray-300 px-4 py-2">10.7%</td>
                <td className="border border-gray-300 px-4 py-2">32.1%</td>
                <td className="border border-gray-300 px-4 py-2">3.0x</td>
                <td className="border border-gray-300 px-4 py-2">Predictor of later offending</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Unemployment</td>
                <td className="border border-gray-300 px-4 py-2">6.1%</td>
                <td className="border border-gray-300 px-4 py-2">10.8%</td>
                <td className="border border-gray-300 px-4 py-2">1.8x</td>
                <td className="border border-gray-300 px-4 py-2">Associated with property crime</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Single-parent homes</td>
                <td className="border border-gray-300 px-4 py-2">19.0%</td>
                <td className="border border-gray-300 px-4 py-2">64.2%</td>
                <td className="border border-gray-300 px-4 py-2">3.4x</td>
                <td className="border border-gray-300 px-4 py-2">Risk factor for delinquency</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">High school dropout</td>
                <td className="border border-gray-300 px-4 py-2">4.1%</td>
                <td className="border border-gray-300 px-4 py-2">6.2%</td>
                <td className="border border-gray-300 px-4 py-2">1.5x</td>
                <td className="border border-gray-300 px-4 py-2">Predictor of criminal involvement</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Historical Context: How We Got Here</h2>
        
        <p>
          Current crime patterns didn't emerge in a vacuum. They reflect centuries of policy decisions, social 
          structures, and economic systems that have shaped American communities.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Legacy of Segregation</h3>
        
        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 border-l-4 border-gray-500 p-5">
            <h4 className="font-semibold mb-2 text-gray-800">1900s-1950s: Jim Crow and Redlining</h4>
            <p className="text-sm">
              Systematic exclusion from neighborhoods, schools, jobs, and wealth-building opportunities. Federal 
              housing policies explicitly excluded Black families from homeownership and suburban development.
            </p>
          </div>
          
          <div className="bg-purple-50 border-l-4 border-purple-500 p-5">
            <h4 className="font-semibold mb-2 text-purple-800">1960s-1970s: Urban Disinvestment</h4>
            <p className="text-sm">
              As manufacturing jobs left cities and white families moved to suburbs, many Black communities 
              faced economic abandonment. Loss of tax base, businesses, and institutional infrastructure.
            </p>
          </div>
          
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5">
            <h4 className="font-semibold mb-2 text-indigo-800">1980s-1990s: War on Drugs</h4>
            <p className="text-sm">
              Harsh sentencing policies disproportionately affected Black communities. Mass incarceration 
              removed fathers, disrupted families, and created barriers to employment and housing.
            </p>
          </div>
          
          <div className="bg-teal-50 border-l-4 border-teal-500 p-5">
            <h4 className="font-semibold mb-2 text-teal-800">2000s-Present: Concentrated Disadvantage</h4>
            <p className="text-sm">
              High-poverty neighborhoods with limited opportunities, under-resourced schools, and concentrated 
              social problems. Crime becomes both a product of and contributor to community dysfunction.
            </p>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Geography of Crime and Race</h3>
        
        <p>
          Crime doesn't occur randomly across America — it's heavily concentrated in specific neighborhoods, 
          which are often segregated by race and class.
        </p>

        <ul>
          <li><strong>Hypersegregation:</strong> Many cities have extremely segregated neighborhoods where poverty, 
              unemployment, and crime concentrate</li>
          <li><strong>Resource disparities:</strong> Schools, parks, businesses, and services vary dramatically 
              between high-crime and low-crime areas</li>
          <li><strong>Policing patterns:</strong> More intensive policing in poor, minority neighborhoods leads to 
              higher arrest rates for similar behavior</li>
          <li><strong>Social capital:</strong> Communities with fewer institutional ties have less capacity for 
              informal social control</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Policy Implications and Solutions</h2>
        
        <p>
          Understanding racial disparities in crime requires comprehensive approaches that address both immediate 
          public safety needs and underlying social conditions.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Evidence-Based Approaches</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Immediate Crime Reduction</h4>
            <ul className="text-sm space-y-2">
              <li>• Focused deterrence programs (targeting highest-risk individuals)</li>
              <li>• Violence interruption and conflict mediation</li>
              <li>• Hot-spot policing (geographic focus)</li>
              <li>• Hospital-based violence intervention</li>
              <li>• Cognitive behavioral therapy for offenders</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Long-Term Community Investment</h4>
            <ul className="text-sm space-y-2">
              <li>• Early childhood education and development</li>
              <li>• Job training and employment programs</li>
              <li>• Housing mobility and community development</li>
              <li>• Educational equity and school improvement</li>
              <li>• Mental health and substance abuse treatment</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Addressing System Disparities</h3>
        
        <ul>
          <li><strong>Policing reform:</strong> Reducing disparate enforcement while maintaining public safety</li>
          <li><strong>Prosecutorial practices:</strong> Ensuring equal treatment in charging and plea decisions</li>
          <li><strong>Sentencing reform:</strong> Addressing disparities in punishment for similar offenses</li>
          <li><strong>Reentry support:</strong> Helping formerly incarcerated individuals successfully reintegrate</li>
          <li><strong>Juvenile justice:</strong> Keeping young people out of the adult system</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">International Perspectives</h2>
        
        <p>
          How do other diverse societies handle crime and racial disparities? International comparisons offer 
          insights into different approaches and outcomes.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Country</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Minority Population</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Crime Disparities</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Policy Approach</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">United States</td>
                <td className="border border-gray-300 px-4 py-2">~40% non-white</td>
                <td className="border border-gray-300 px-4 py-2">Large disparities</td>
                <td className="border border-gray-300 px-4 py-2">Mass incarceration model</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">United Kingdom</td>
                <td className="border border-gray-300 px-4 py-2">~14% non-white</td>
                <td className="border border-gray-300 px-4 py-2">Moderate disparities</td>
                <td className="border border-gray-300 px-4 py-2">Community-focused policing</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Canada</td>
                <td className="border border-gray-300 px-4 py-2">~23% visible minority</td>
                <td className="border border-gray-300 px-4 py-2">Smaller disparities</td>
                <td className="border border-gray-300 px-4 py-2">Restorative justice emphasis</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Australia</td>
                <td className="border border-gray-300 px-4 py-2">~25% non-European</td>
                <td className="border border-gray-300 px-4 py-2">Indigenous disparities</td>
                <td className="border border-gray-300 px-4 py-2">Alternative sentencing</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Key Takeaways</h2>
        
        <div className="bg-gray-900 text-white rounded-xl p-8 mb-8">
          <h3 className="font-heading text-xl font-bold mb-6 text-center">Crime by Race: Essential Facts</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">The Statistics</h4>
              <ul className="text-sm space-y-2">
                <li>• Black Americans: 13.7% of population, {fmtPct((totalArrests?.black || 0) / (totalArrests?.total || 1))} of arrests</li>
                <li>• {fmtPct(blackVictims / totalVictims)} of murder victims are Black</li>
                <li>• Most crime occurs within racial groups, not between them</li>
                <li>• Patterns vary significantly by crime type</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">The Context</h4>
              <ul className="text-sm space-y-2">
                <li>• Arrest data doesn't equal crime commission</li>
                <li>• Socioeconomic factors explain much of the disparity</li>
                <li>• Historical policies created concentrated disadvantage</li>
                <li>• Geographic segregation shapes crime patterns</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="font-semibold mb-3 text-yellow-300">The Bottom Line</h4>
            <p className="text-sm">
              Racial disparities in crime statistics are real and significant. But they reflect complex social, economic, 
              and historical factors rather than inherent differences between groups. Effective solutions require addressing 
              both immediate public safety needs and underlying social conditions that drive crime in disadvantaged communities.
            </p>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6 mb-8">
          <div>
            <h4 className="font-semibold mb-2">What percentage of arrests are Black Americans?</h4>
            <p className="text-sm text-gray-700">
              Black Americans account for {fmtPct((totalArrests?.black || 0) / (totalArrests?.total || 1))} of all arrests despite 
              being 13.7% of the US population. This represents {fmtNum(totalArrests?.black || 0)} arrests out of {fmtNum(totalArrests?.total || 0)} total arrests.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Are Black Americans more likely to be crime victims?</h4>
            <p className="text-sm text-gray-700">
              Yes, Black Americans are disproportionately victims of violent crime, especially homicide. They represent 
              {fmtPct(blackVictims / totalVictims)} of murder victims ({fmtNum(blackVictims)} of {fmtNum(totalVictims)} total) despite 
              being 13.7% of the population.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">How do arrest rates vary by crime type?</h4>
            <p className="text-sm text-gray-700">
              Arrest patterns vary significantly by offense type. Black Americans account for 58% of murder arrests, 
              57.8% of robbery arrests, but only 16.8% of DUI arrests and 29.7% of drug violation arrests.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">What factors contribute to racial disparities in crime statistics?</h4>
            <p className="text-sm text-gray-700">
              Multiple factors contribute including poverty rates, residential segregation, differential policing practices, 
              educational opportunities, and historical discrimination. Crime statistics reflect complex social, economic, 
              and policy factors rather than individual characteristics.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Is most crime interracial or intraracial?</h4>
            <p className="text-sm text-gray-700">
              Most violent crime occurs within racial groups. 84% of white victims are killed by white offenders, while 
              88% of Black victims are killed by Black offenders. Interracial violence is relatively uncommon.
            </p>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Related Analysis</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link href="/analysis/who-commits-crime" className="block bg-[#1e3a5f] text-white rounded-lg p-4 hover:bg-[#2a4d7a] transition">
            <h4 className="font-semibold mb-2">Who Commits Crime in America</h4>
            <p className="text-sm opacity-90">Demographics deep dive: age, sex, and race patterns</p>
          </Link>
          
          <Link href="/analysis/crime-and-poverty" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Crime and Poverty</h4>
            <p className="text-sm text-gray-600">Economic factors and their relationship to crime rates</p>
          </Link>
          
          <Link href="/analysis/juvenile-crime" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Juvenile Crime Patterns</h4>
            <p className="text-sm text-gray-600">Youth crime statistics and demographic patterns</p>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="crime-by-race" />
        <ShareButtons title="Crime by Race — The Complete FBI Data Breakdown" />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Crime by Race — The Complete FBI Data Breakdown',
        publisher: { '@type': 'Organization', name: 'OpenCrime' },
        datePublished: '2026-03-04',
      })}} />
    </div>
  );
}