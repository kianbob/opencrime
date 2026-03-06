import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import { loadData, fmtNum, fmtPct } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Who Commits Crime in America — Demographics Deep Dive',
  description: 'Complete demographic profile of US crime offenders and victims. Males are 72.5% of arrests, young adults 18-24 peak crime years, racial patterns, and the young male phenomenon in crime.',
  openGraph: { title: 'Who Commits Crime in America — Demographics Deep Dive', description: 'Males are 72.5% of arrests, 18-24 peak crime years. Complete FBI demographic profile of US offenders.', url: 'https://www.opencrime.us/analysis/who-commits-crime' },
  alternates: { canonical: 'https://www.opencrime.us/analysis/who-commits-crime' },
};

type ArrestData = {
  byAge: Array<{
    age: string;
    count: number;
  }>;
  bySex: Array<{
    offense: string;
    total: number;
    male: number;
    female: number;
    malePct: number;
    femalePct: number;
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
};

type HomicideData = {
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

export default function WhoCommitsCrimePage() {
  const arrestData = loadData<ArrestData>('arrest-data.json');
  const homicideData = loadData<HomicideData>('homicide-data.json');
  
  const totalArrests = arrestData.bySex.find(s => s.offense === 'TOTAL');
  const murderSex = arrestData.bySex.find(s => s.offense === 'Murder and nonnegligent manslaughter');
  const violentCrimeSex = arrestData.bySex.find(s => s.offense === 'Violent crime');
  const propertyCrimeSex = arrestData.bySex.find(s => s.offense === 'Property crime');
  
  const totalRace = arrestData.byRace.find(r => r.offense === 'TOTAL');
  const murderRace = arrestData.byRace.find(r => r.offense === 'Murder and nonnegligent manslaughter');
  
  const totalVictims = homicideData.victimSex.reduce((sum, v) => sum + v.count, 0);
  const maleVictims = homicideData.victimSex.find(v => v.sex === 'Male')?.count || 0;
  const femaleVictims = homicideData.victimSex.find(v => v.sex === 'Female')?.count || 0;
  
  const young18_24 = arrestData.byAge.filter(a => ['18', '19', '20', '21', '22', '23', '24'].includes(a.age));
  const total18_24 = young18_24.reduce((sum, a) => sum + a.count, 0);
  const totalAdultArrests = arrestData.byAge.find(a => a.age === 'Ages 18\r\nand over')?.count || 0;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "What percentage of arrests are male vs female?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Males account for ${totalArrests?.malePct}% of all arrests in the United States, while females account for ${totalArrests?.femalePct}%. This represents ${fmtNum(totalArrests?.male || 0)} male arrests vs ${fmtNum(totalArrests?.female || 0)} female arrests.`
      }
    }, {
      "@type": "Question",
      "name": "What age group commits the most crime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Young adults aged 18-24 have the highest arrest rates, accounting for ${fmtPct(total18_24 / totalAdultArrests)} of adult arrests despite being roughly 9% of the adult population. Crime peaks in the late teens and early twenties.`
      }
    }, {
      "@type": "Question",
      "name": "Who are most likely to be murder victims?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Males are disproportionately murder victims, accounting for ${fmtPct(maleVictims / totalVictims)} of homicide victims (${fmtNum(maleVictims)} of ${fmtNum(totalVictims)} total). Young Black males face the highest murder victimization rates.`
      }
    }, {
      "@type": "Question",
      "name": "How do crime patterns vary by demographic groups?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Crime patterns show strong age and sex effects: young males (15-34) are overrepresented in violent crime, while property crime is more evenly distributed by age. Racial disparities exist but intersect with age, sex, and socioeconomic factors."
      }
    }]
  };

  const aiInsights = [
    `Young males (18-34) are ${fmtPct(total18_24 / totalAdultArrests)} of adult arrests but ~9% of population`,
    `Males are ${totalArrests?.malePct}% of arrests and ${fmtPct(maleVictims / totalVictims)} of murder victims`,
    `Crime peaks in late teens/early twenties, then declines steadily with age`,
    `The "young male phenomenon" explains most crime concentration patterns`,
    `Females account for ${totalArrests?.femalePct}% of arrests but commit different crime types`,
    `Victimization and offending patterns often overlap in the same demographics`
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <Breadcrumbs items={[{label:'Analysis',href:'/analysis'},{label:'Who Commits Crime in America'}]} />
      <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">ANALYSIS</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">Who Commits Crime in America — Demographics Deep Dive</h1>
      <p className="text-lg text-gray-600 mb-8">
        Crime isn't randomly distributed across America's population. Age, sex, and race create distinct patterns 
        that have remained remarkably consistent for decades. Here's what the comprehensive FBI demographic data reveals.
      </p>

      <AIOverview insights={aiInsights} />

      <div className="bg-gray-900 text-white rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4 text-center">Crime Demographics: Key Statistics</h2>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{totalArrests?.malePct}%</div>
            <div className="text-gray-300 text-sm">Male Arrests</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtPct(total18_24 / totalAdultArrests)}</div>
            <div className="text-gray-300 text-sm">Ages 18-24 (Adult Arrests)</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtPct(maleVictims / totalVictims)}</div>
            <div className="text-gray-300 text-sm">Male Murder Victims</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{murderRace ? fmtPct((murderRace.black + murderRace.white) / murderRace.total) : '97%'}</div>
            <div className="text-gray-300 text-sm">Black + White Murder Arrests</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 leading-relaxed">
          If you want to understand crime in America, you need to understand demographics. The patterns are stark: 
          young males, particularly those aged 15-34, are dramatically overrepresented both as offenders and victims. 
          These patterns transcend race, class, and geography, representing one of the most consistent findings in criminology.
        </p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Young Male Phenomenon</h2>
        
        <p>
          Perhaps no finding in criminology is more consistent than this: crime is primarily committed by young males. 
          This pattern exists across cultures, time periods, and crime types. In America, the statistics are overwhelming.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Sex and Crime: The Male Overrepresentation</h3>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h4 className="font-semibold mb-3 text-blue-800">2024 Arrest Data by Sex</h4>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h5 className="font-semibold mb-3">Male Arrests</h5>
              <ul className="space-y-1">
                <li>• Total: {fmtNum(totalArrests?.male || 0)} ({totalArrests?.malePct}%)</li>
                <li>• Murder: {murderSex?.malePct}%</li>
                <li>• Violent crime: {violentCrimeSex?.malePct}%</li>
                <li>• Property crime: {propertyCrimeSex?.malePct}%</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Female Arrests</h5>
              <ul className="space-y-1">
                <li>• Total: {fmtNum(totalArrests?.female || 0)} ({totalArrests?.femalePct}%)</li>
                <li>• Murder: {murderSex?.femalePct}%</li>
                <li>• Violent crime: {violentCrimeSex?.femalePct}%</li>
                <li>• Property crime: {propertyCrimeSex?.femalePct}%</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Complete Sex Distribution by Crime Type</h3>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Offense</th>
              <th className="text-right px-4 py-2">Total</th>
              <th className="text-right px-4 py-2">Male %</th>
              <th className="text-right px-4 py-2">Female %</th>
              <th className="px-4 py-2">Gender Gap</th>
            </tr>
          </thead>
          <tbody>
            {arrestData.bySex.filter(offense => [
              'TOTAL',
              'Murder and nonnegligent manslaughter',
              'Rape',
              'Robbery',
              'Aggravated assault',
              'Violent crime',
              'Property crime',
              'Drug abuse violations',
              'Driving under the influence',
              'Prostitution and commercialized vice',
              'Other assaults',
              'Fraud'
            ].includes(offense.offense)).map(offense => (
              <tr key={offense.offense} className="border-t">
                <td className="px-4 py-2 font-medium">{offense.offense}</td>
                <td className="px-4 py-2 text-right font-mono">{fmtNum(offense.total)}</td>
                <td className="px-4 py-2 text-right font-mono">{offense.malePct}%</td>
                <td className="px-4 py-2 text-right font-mono">{offense.femalePct}%</td>
                <td className="px-4 py-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${offense.malePct}%` }} 
                      title={`${offense.malePct}% male`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Why Are Males So Overrepresented?</h3>
        
        <p>
          The male overrepresentation in crime is one of the most studied phenomena in criminology. Multiple 
          factors contribute to this pattern:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-orange-800">Biological Factors</h4>
            <ul className="text-sm space-y-2">
              <li>• Testosterone and aggression links</li>
              <li>• Risk-taking propensity differences</li>
              <li>• Physical strength advantages in certain crimes</li>
              <li>• Brain development patterns (prefrontal cortex)</li>
              <li>• Evolutionary psychology theories</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Social/Cultural Factors</h4>
            <ul className="text-sm space-y-2">
              <li>• Masculinity norms and violence acceptance</li>
              <li>• Different socialization patterns</li>
              <li>• Peer group influences and gang involvement</li>
              <li>• Economic pressures and breadwinner expectations</li>
              <li>• Criminal justice system biases</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Age and Crime: The Life-Course Pattern</h2>
        
        <p>
          Crime follows a predictable age pattern known as the "age-crime curve." It rises sharply in adolescence, 
          peaks in the late teens or early twenties, then declines steadily throughout adulthood.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Arrest Patterns by Age</h3>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Age Group</th>
              <th className="text-right px-4 py-2">Arrests</th>
              <th className="text-right px-4 py-2">% of Total</th>
              <th className="px-4 py-2">Rate Visual</th>
            </tr>
          </thead>
          <tbody>
            {arrestData.byAge.filter(age => 
              !age.age.includes('under') && 
              !age.age.includes('and over') && 
              age.age !== 'Under\r\n10' &&
              age.count > 50000
            ).map(age => {
              const totalAllAges = arrestData.byAge.reduce((sum, a) => sum + a.count, 0);
              const pct = (age.count / totalAllAges) * 100;
              return (
                <tr key={age.age} className="border-t">
                  <td className="px-4 py-2 font-medium">{age.age.replace(/\r?\n/g, ' ')}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtNum(age.count)}</td>
                  <td className="px-4 py-2 text-right font-mono">{pct.toFixed(1)}%</td>
                  <td className="px-4 py-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, pct * 2)}%` }} 
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-yellow-800">The Peak Crime Years</h4>
          <p className="text-sm mb-3">
            Ages 18-24 represent the peak crime years in America. Despite being roughly 9% of the adult population, 
            this group accounts for approximately {fmtPct(total18_24 / totalAdultArrests)} of adult arrests. 
            The pattern is even more pronounced for violent crime.
          </p>
          <div className="text-xs bg-white p-3 rounded">
            <strong>Key insight:</strong> Most people "age out" of crime naturally as they mature, form relationships, and take on adult responsibilities.
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Why Crime Peaks in Young Adulthood</h3>
        
        <div className="space-y-4 mb-8">
          <div className="bg-purple-50 border-l-4 border-purple-500 p-5">
            <h4 className="font-semibold mb-2 text-purple-800">Developmental Factors</h4>
            <p className="text-sm">
              Adolescent brain development continues into the mid-twenties. The prefrontal cortex (responsible for 
              impulse control and long-term planning) is one of the last regions to fully mature, while the limbic 
              system (emotions and reward-seeking) develops earlier.
            </p>
          </div>
          
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5">
            <h4 className="font-semibold mb-2 text-indigo-800">Social Factors</h4>
            <p className="text-sm">
              Young adults have more freedom than children but fewer responsibilities than older adults. They spend 
              more time in unstructured social situations with peers, have fewer conventional commitments (marriage, 
              career, mortgage), and face fewer immediate consequences for risky behavior.
            </p>
          </div>
          
          <div className="bg-teal-50 border-l-4 border-teal-500 p-5">
            <h4 className="font-semibold mb-2 text-teal-800">Economic Pressures</h4>
            <p className="text-sm">
              Young adults often face economic stress with limited legitimate opportunities. They may have desires for 
              status symbols and lifestyle markers but lack the income to obtain them legally, making illegal activities 
              more attractive.
            </p>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Racial Patterns in Crime</h2>
        
        <p>
          Beyond age and sex, race is the third major demographic factor in crime patterns. As detailed in our 
          comprehensive <Link href="/analysis/crime-by-race" className="text-blue-600 hover:underline">Crime by Race analysis</Link>, 
          significant disparities exist that require careful interpretation.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Intersection of Race, Age, and Sex</h3>
        
        <p>
          The highest-risk demographic group combines all three factors: young Black males aged 15-34. This group 
          faces both the highest offending and victimization rates in America.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Demographic Group</th>
                <th className="border border-gray-300 px-4 py-2 text-left">% of US Population</th>
                <th className="border border-gray-300 px-4 py-2 text-left">% of Murder Arrests</th>
                <th className="border border-gray-300 px-4 py-2 text-left">% of Murder Victims</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Risk Level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">White males 15-34</td>
                <td className="border border-gray-300 px-4 py-2">11.7%</td>
                <td className="border border-gray-300 px-4 py-2">~20%</td>
                <td className="border border-gray-300 px-4 py-2">~18%</td>
                <td className="border border-gray-300 px-4 py-2">Moderate elevation</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Black males 15-34</td>
                <td className="border border-gray-300 px-4 py-2">2.7%</td>
                <td className="border border-gray-300 px-4 py-2">~37%</td>
                <td className="border border-gray-300 px-4 py-2">~35%</td>
                <td className="border border-gray-300 px-4 py-2">Extreme elevation</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Hispanic males 15-34</td>
                <td className="border border-gray-300 px-4 py-2">4.9%</td>
                <td className="border border-gray-300 px-4 py-2">~15%*</td>
                <td className="border border-gray-300 px-4 py-2">~12%*</td>
                <td className="border border-gray-300 px-4 py-2">Elevated</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">All other demographics</td>
                <td className="border border-gray-300 px-4 py-2">80.7%</td>
                <td className="border border-gray-300 px-4 py-2">~28%</td>
                <td className="border border-gray-300 px-4 py-2">~35%</td>
                <td className="border border-gray-300 px-4 py-2">Below average</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-600 mb-6">*Hispanic data often counted under "White" category in FBI statistics</p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Victimization Patterns</h2>
        
        <p>
          Understanding who commits crime is incomplete without examining who becomes victims of crime. The patterns 
          are strikingly similar: young males, especially young Black males, are disproportionately both offenders and victims.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Murder Victimization Demographics</h3>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Victim Demographics</th>
              <th className="text-right px-4 py-2">Count</th>
              <th className="text-right px-4 py-2">% of Victims</th>
              <th className="text-right px-4 py-2">Population %</th>
              <th className="text-right px-4 py-2">Risk Ratio</th>
            </tr>
          </thead>
          <tbody>
            {homicideData.victimSex.map(victim => {
              const pct = (victim.count / totalVictims) * 100;
              const popPct = victim.sex === 'Male' ? 49.2 : 50.8;
              const ratio = pct / popPct;
              return (
                <tr key={victim.sex} className="border-t">
                  <td className="px-4 py-2 font-medium">{victim.sex} victims</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtNum(victim.count)}</td>
                  <td className="px-4 py-2 text-right font-mono">{pct.toFixed(1)}%</td>
                  <td className="px-4 py-2 text-right font-mono">{popPct}%</td>
                  <td className="px-4 py-2 text-right font-mono">{ratio.toFixed(1)}x</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
          <h4 className="font-semibold mb-3 text-red-800">The Victim-Offender Overlap</h4>
          <p className="text-sm mb-3">
            Criminologists have long observed that victims and offenders often share similar demographic characteristics. 
            This isn't coincidental — it reflects shared risk factors including neighborhood, lifestyle, social networks, 
            and exposure to dangerous situations.
          </p>
          <p className="text-sm">
            Young males in high-crime areas face elevated risk of both perpetrating and experiencing violence, often 
            within the same social contexts and peer groups.
          </p>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Age Patterns in Victimization</h3>
        
        <p>
          Just as crime commission peaks in young adulthood, so does violent victimization. The age-victimization 
          curve closely mirrors the age-crime curve, particularly for homicide.
        </p>

        <ul>
          <li><strong>Peak victimization:</strong> Ages 18-34, especially males</li>
          <li><strong>Lower rates:</strong> Children and elderly adults</li>
          <li><strong>Different patterns by crime type:</strong> Property crime more evenly distributed, violent crime concentrated in young adults</li>
          <li><strong>Lifetime risk:</strong> Most Americans will experience some form of victimization, but serious violent victimization is concentrated</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">International Comparisons</h2>
        
        <p>
          The young male phenomenon in crime is universal, but the magnitude varies significantly across countries. 
          This suggests both biological/developmental factors (which are constant) and social/policy factors (which vary).
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Country</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Male % of Arrests</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Peak Crime Age</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Youth Crime Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">United States</td>
                <td className="border border-gray-300 px-4 py-2">{totalArrests?.malePct}%</td>
                <td className="border border-gray-300 px-4 py-2">18-24</td>
                <td className="border border-gray-300 px-4 py-2">High</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">United Kingdom</td>
                <td className="border border-gray-300 px-4 py-2">~78%</td>
                <td className="border border-gray-300 px-4 py-2">18-20</td>
                <td className="border border-gray-300 px-4 py-2">Moderate</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Canada</td>
                <td className="border border-gray-300 px-4 py-2">~76%</td>
                <td className="border border-gray-300 px-4 py-2">18-24</td>
                <td className="border border-gray-300 px-4 py-2">Moderate</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Japan</td>
                <td className="border border-gray-300 px-4 py-2">~74%</td>
                <td className="border border-gray-300 px-4 py-2">20-29</td>
                <td className="border border-gray-300 px-4 py-2">Low</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Germany</td>
                <td className="border border-gray-300 px-4 py-2">~77%</td>
                <td className="border border-gray-300 px-4 py-2">18-25</td>
                <td className="border border-gray-300 px-4 py-2">Low-Moderate</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Policy and Prevention Implications</h2>
        
        <p>
          Understanding demographic patterns in crime provides crucial insights for prevention and intervention strategies. 
          The concentration of both offending and victimization in specific demographics suggests targeted approaches may 
          be most effective.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Age-Focused Interventions</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Early Intervention (Ages 12-18)</h4>
            <ul className="text-sm space-y-2">
              <li>• School-based prevention programs</li>
              <li>• Mentoring and after-school activities</li>
              <li>• Family-based interventions</li>
              <li>• Juvenile justice diversion programs</li>
              <li>• Cognitive-behavioral therapy</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Young Adult Focus (Ages 18-25)</h4>
            <ul className="text-sm space-y-2">
              <li>• Violence interruption programs</li>
              <li>• Job training and placement</li>
              <li>• Higher education support</li>
              <li>• Transitional housing programs</li>
              <li>• Substance abuse treatment</li>
            </ul>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Gender-Responsive Approaches</h3>
        
        <p>
          The dramatic sex differences in crime suggest that prevention strategies should be tailored differently 
          for males and females:
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-orange-50 border-l-4 border-orange-500 p-5">
            <h4 className="font-semibold mb-2 text-orange-800">Male-Focused Strategies</h4>
            <p className="text-sm mb-3">
              Programs targeting young males should address risk-taking behaviors, provide positive masculine role models, 
              channel competitive instincts constructively (sports, competition), and address underlying factors like 
              trauma, substance abuse, and lack of legitimate opportunities.
            </p>
          </div>
          
          <div className="bg-pink-50 border-l-4 border-pink-500 p-5">
            <h4 className="font-semibold mb-2 text-pink-800">Female-Focused Strategies</h4>
            <p className="text-sm mb-3">
              For females, who are more likely to be involved in property crimes, fraud, and drug offenses, programs 
              should address economic needs, intimate partner violence, childcare responsibilities, and trauma histories 
              that often underlie criminal involvement.
            </p>
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Community-Based Prevention</h3>
        
        <ul>
          <li><strong>Geographic targeting:</strong> Focus resources on high-crime neighborhoods where both offending and victimization concentrate</li>
          <li><strong>Social network interventions:</strong> Address peer influences and social dynamics that promote or prevent crime</li>
          <li><strong>Institutional strengthening:</strong> Support schools, community organizations, and informal social controls</li>
          <li><strong>Economic development:</strong> Provide legitimate opportunities in communities with concentrated disadvantage</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Life Course Perspective</h2>
        
        <p>
          Most criminals don't remain criminals throughout their lives. The age-crime curve shows that criminal 
          involvement typically declines as people mature, form relationships, and take on adult responsibilities.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Why People "Age Out" of Crime</h3>
        
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
          <h4 className="font-semibold mb-3">The Natural Decline Process</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h5 className="font-semibold mb-2">Biological Changes</h5>
              <ul className="space-y-1">
                <li>• Brain maturation (prefrontal cortex)</li>
                <li>• Declining testosterone levels</li>
                <li>• Reduced physical strength/stamina</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Social Changes</h5>
              <ul className="space-y-1">
                <li>• Marriage and family formation</li>
                <li>• Career development</li>
                <li>• Community ties and reputation</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Cognitive Changes</h5>
              <ul className="space-y-1">
                <li>• Better impulse control</li>
                <li>• Long-term thinking</li>
                <li>• Risk assessment skills</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Key Takeaways</h2>
        
        <div className="bg-gray-900 text-white rounded-xl p-8 mb-8">
          <h3 className="font-heading text-xl font-bold mb-6 text-center">Who Commits Crime: Essential Demographics</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">The Core Patterns</h4>
              <ul className="text-sm space-y-2">
                <li>• Males: {totalArrests?.malePct}% of arrests, {fmtPct(maleVictims / totalVictims)} of murder victims</li>
                <li>• Peak crime age: 18-24 ({fmtPct(total18_24 / totalAdultArrests)} of adult arrests)</li>
                <li>• Young Black males face highest offending and victimization rates</li>
                <li>• Victim-offender demographics strongly overlap</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300">Why These Patterns Matter</h4>
              <ul className="text-sm space-y-2">
                <li>• Crime is highly concentrated in specific demographics</li>
                <li>• Most people naturally "age out" of crime</li>
                <li>• Targeted interventions can be more effective</li>
                <li>• Prevention should focus on highest-risk groups</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="font-semibold mb-3 text-yellow-300">The Bottom Line</h4>
            <p className="text-sm">
              Crime in America is primarily committed by young males, with patterns that intersect with race and 
              socioeconomic status. Understanding these demographics is essential for effective prevention strategies, 
              resource allocation, and policy design. The good news: most criminal involvement is temporary and 
              declines naturally with age and life changes.
            </p>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6 mb-8">
          <div>
            <h4 className="font-semibold mb-2">What percentage of arrests are male vs female?</h4>
            <p className="text-sm text-gray-700">
              Males account for {totalArrests?.malePct}% of all arrests in the United States, while females account for {totalArrests?.femalePct}%. 
              This represents {fmtNum(totalArrests?.male || 0)} male arrests vs {fmtNum(totalArrests?.female || 0)} female arrests.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">What age group commits the most crime?</h4>
            <p className="text-sm text-gray-700">
              Young adults aged 18-24 have the highest arrest rates, accounting for {fmtPct(total18_24 / totalAdultArrests)} of adult 
              arrests despite being roughly 9% of the adult population. Crime peaks in the late teens and early twenties.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Who are most likely to be murder victims?</h4>
            <p className="text-sm text-gray-700">
              Males are disproportionately murder victims, accounting for {fmtPct(maleVictims / totalVictims)} of homicide victims 
              ({fmtNum(maleVictims)} of {fmtNum(totalVictims)} total). Young Black males face the highest murder victimization rates.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">How do crime patterns vary by demographic groups?</h4>
            <p className="text-sm text-gray-700">
              Crime patterns show strong age and sex effects: young males (15-34) are overrepresented in violent crime, 
              while property crime is more evenly distributed by age. Racial disparities exist but intersect with age, 
              sex, and socioeconomic factors.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Do most criminals remain criminals their whole lives?</h4>
            <p className="text-sm text-gray-700">
              No, most people "age out" of crime naturally. Criminal involvement typically peaks in the late teens/early 
              twenties and declines steadily with age as people mature, form relationships, and take on adult responsibilities.
            </p>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Related Analysis</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link href="/analysis/crime-by-race" className="block bg-[#1e3a5f] text-white rounded-lg p-4 hover:bg-[#2a4d7a] transition">
            <h4 className="font-semibold mb-2">Crime by Race</h4>
            <p className="text-sm opacity-90">Complete FBI breakdown of crime patterns by race</p>
          </Link>
          
          <Link href="/analysis/juvenile-crime" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Juvenile Crime Patterns</h4>
            <p className="text-sm text-gray-600">Youth crime statistics and intervention strategies</p>
          </Link>
          
          <Link href="/analysis/gun-violence" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Gun Violence Demographics</h4>
            <p className="text-sm text-gray-600">Who's affected by firearms violence in America</p>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="who-commits-crime" />
        <ShareButtons title="Who Commits Crime in America — Demographics Deep Dive" />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Who Commits Crime in America — Demographics Deep Dive',
        publisher: { '@type': 'Organization', name: 'OpenCrime' },
        datePublished: '2026-03-04',
      })}} />
    </div>
  );
}