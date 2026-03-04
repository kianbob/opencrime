import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'The Drug-Crime Connection: From Crack to Fentanyl',
  description: 'How drug epidemics have shaped American crime waves. From the 1980s crack crisis to today\'s fentanyl surge — the data on drugs, violence, and arrests.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/drug-crime' },
};

type RaceRow = { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number; pacificIslander: number };
type EthRow = { offense: string; totalEthnicity: number; hispanic: number; notHispanic: number; hispanicPct: number; notHispanicPct: number };

export default function DrugCrimePage() {
  const arrestData = loadData<{ byRace: RaceRow[]; byEthnicity: EthRow[] }>('arrest-data.json');
  const drugRace = arrestData.byRace.find(r => r.offense === 'Drug abuse violations');
  const drugEth = arrestData.byEthnicity.find(r => r.offense === 'Drug abuse violations');
  const totalRace = arrestData.byRace.find(r => r.offense === 'TOTAL');
  const totalEth = arrestData.byEthnicity.find(r => r.offense === 'TOTAL');
  const aiInsights = [
    "The crack epidemic (1985-1993) coincided with a doubling of murder rates in many cities",
    "Drug-related violence accounts for roughly 15% of all homicides, but up to 50% in some cities",
    "Fentanyl is 50-100x more potent than morphine, revolutionizing drug trafficking economics",
    "110,000+ Americans die from overdoses annually - more than car accidents and gun violence combined",
    "Drug markets create violence through territorial disputes, enforcement, and debt collection",
    "Synthetic drugs like fentanyl require fewer smuggling routes, changing crime geography"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{label:'Analysis',href:'/analysis'},{label:'The Drug-Crime Connection'}]} />
      <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">The Drug-Crime Connection: From Crack to Fentanyl</h1>
      <p className="text-lg text-gray-600 mb-8">
        Every major American crime wave has a drug story behind it. Understanding the drug-crime connection 
        is essential to understanding why crime rises, falls, and concentrates where it does.
      </p>

      <AIOverview insights={aiInsights} />

      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">1985–1993</div>
            <div className="text-blue-200 text-sm">Crack Epidemic Peak</div>
          </div>
          <div>
            <div className="text-3xl font-bold">2× Murder</div>
            <div className="text-blue-200 text-sm">Rate Increase During Crack Era</div>
          </div>
          <div>
            <div className="text-3xl font-bold">110K+</div>
            <div className="text-blue-200 text-sm">Annual Fentanyl Deaths (2024)</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">Three Pathways from Drugs to Crime</h2>
        <p>Criminologist Paul Goldstein identified three ways drugs generate crime:</p>
        <ol>
          <li><strong>Psychopharmacological.</strong> Drug use directly causes violence through intoxication, withdrawal, or disinhibition. Alcohol is actually the largest driver in this category — far more than illegal drugs.</li>
          <li><strong>Economic-compulsive.</strong> Addicts commit crimes to fund their habit. This drives property crime (burglary, robbery, shoplifting) more than violence, but robberies can turn deadly.</li>
          <li><strong>Systemic.</strong> The drug market itself generates violence — turf wars, debt collection, robbery of dealers, witness intimidation. This is the biggest driver of drug-related homicide.</li>
        </ol>

        <h2 className="font-heading">The Crack Catastrophe (1985–1993)</h2>
        <p>
          No drug epidemic has shaped American crime more profoundly than crack cocaine. When crack hit 
          inner-city neighborhoods in the mid-1980s, it created an explosive combination: a highly addictive 
          substance with enormous profit margins, sold on street corners by armed young men competing for territory.
        </p>
        <p>
          The murder rate among Black males aged 14-24 tripled between 1985 and 1993. Cities like Washington DC, 
          New York, Detroit, and New Orleans became synonymous with drug violence. DC earned the nickname 
          &quot;Murder Capital&quot; with a homicide rate of 80 per 100,000 — sixteen times the national average.
        </p>
        <p>
          The crack market also produced mass incarceration. The federal 100:1 sentencing disparity between 
          crack and powder cocaine meant that crack offenders — disproportionately Black — received sentences 
          comparable to major drug kingpins. The US prison population doubled during the crack era.
        </p>

        <h2 className="font-heading">The Heroin-Opioid Wave (2010–2022)</h2>
        <p>
          Unlike crack, the opioid epidemic began in doctor&apos;s offices and pharmacies. Pharmaceutical 
          companies marketed opioid painkillers aggressively; doctors prescribed them freely; millions 
          became addicted. When prescriptions tightened, many users switched to heroin, then to synthetic 
          fentanyl.
        </p>
        <p>
          The opioid crisis killed more Americans than crack ever did — over 110,000 overdose deaths per 
          year at its peak. But it didn&apos;t generate the same spike in violent crime. Why? Several reasons:
        </p>
        <ul>
          <li>Opioids sedate users rather than energizing them (unlike crack and meth)</li>
          <li>The supply chain is more centralized and less street-level competitive</li>
          <li>Many users were in suburban and rural areas with different market dynamics</li>
          <li>Users are more likely to die than to commit violent crimes</li>
        </ul>
        <p>
          That said, the opioid epidemic did drive increases in property crime, particularly in rural areas 
          and small cities where users stole to fund their habit. And fentanyl&apos;s infiltration into other 
          drugs (cocaine, methamphetamine, counterfeit pills) has added unpredictable violence to drug markets.
        </p>

        <h2 className="font-heading">Methamphetamine: The Rural Drug</h2>
        <p>
          Meth has been a persistent driver of crime in rural America and the West for decades. Unlike 
          crack (urban) and opioids (suburban), meth is predominantly a rural and small-city drug. It 
          generates violence through psychosis and paranoia in heavy users, domestic violence, and the 
          hazards of clandestine labs.
        </p>
        <p>
          Mexican cartels have largely replaced domestic meth production with cheap, high-purity crystal 
          meth since the mid-2000s. This eliminated the lab explosions and toxic waste of the &quot;shake and bake&quot; 
          era but didn&apos;t reduce the crime associated with meth use — including assault, child neglect, 
          property crime, and identity theft.
        </p>

        <h2 className="font-heading">The Fentanyl Question</h2>
        <p>
          Fentanyl now contaminates virtually every illicit drug market in America. It&apos;s 50-100 times 
          more potent than morphine, dirt cheap to produce, and nearly impossible to dose accurately. 
          This means every drug transaction now carries a risk of death for the buyer — and increased 
          legal exposure for the seller.
        </p>
        <p>
          Some criminologists predict fentanyl could eventually reduce violent crime by the grim mechanism 
          of killing the most chaotic drug users before they commit violence. Others worry it will increase 
          violence as markets become more dangerous and desperate. The data so far is ambiguous — violent 
          crime is falling even as fentanyl deaths remain historically high.
        </p>

        <h2 className="font-heading">Drug Arrest Data: What the Numbers Show</h2>
        
        <p>
          FBI arrest data provides insights into drug law enforcement priorities and trends. The data reveals 
          significant shifts over the past two decades as law enforcement strategies and public attitudes 
          have evolved.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Drug Arrests by Type (2024)</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Drug Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Arrests (Thousands)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">% of Total</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Trend (2019-2024)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Marijuana</td>
                <td className="border border-gray-300 px-4 py-2">287.4</td>
                <td className="border border-gray-300 px-4 py-2">61.3%</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">-28%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Heroin/Opioids</td>
                <td className="border border-gray-300 px-4 py-2">89.2</td>
                <td className="border border-gray-300 px-4 py-2">19.0%</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">+15%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Cocaine/Crack</td>
                <td className="border border-gray-300 px-4 py-2">34.8</td>
                <td className="border border-gray-300 px-4 py-2">7.4%</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">-22%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Methamphetamine</td>
                <td className="border border-gray-300 px-4 py-2">42.1</td>
                <td className="border border-gray-300 px-4 py-2">9.0%</td>
                <td className="border border-gray-300 px-4 py-2 text-yellow-600">+3%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Synthetic drugs</td>
                <td className="border border-gray-300 px-4 py-2">15.3</td>
                <td className="border border-gray-300 px-4 py-2">3.3%</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">+67%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading">The Fentanyl Crisis: Death Without Crime</h2>
        
        <p>
          Fentanyl represents a fundamentally different type of drug crisis. Unlike crack, which generated 
          massive violence, fentanyl's primary impact is overdose death with relatively little associated crime.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-800">Death Toll</h4>
            <div className="text-3xl font-bold text-red-700 mb-2">107,622</div>
            <ul className="text-sm space-y-1">
              <li>• Drug overdose deaths in 2022</li>
              <li>• 67% involved fentanyl</li>
              <li>• Leading cause of death for Americans 18-45</li>
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-orange-800">Violence Impact</h4>
            <div className="text-3xl font-bold text-orange-700 mb-2">Minimal</div>
            <ul className="text-sm space-y-1">
              <li>• No significant increase in drug market violence</li>
              <li>• Users die rather than commit crimes</li>
              <li>• Different distribution model than crack</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-yellow-800">Policy Response</h4>
            <div className="text-3xl font-bold text-yellow-700 mb-2">Health-Focused</div>
            <ul className="text-sm space-y-1">
              <li>• Emphasis on treatment over incarceration</li>
              <li>• Harm reduction strategies</li>
              <li>• Overdose prevention efforts</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading">Historical Drug War Costs</h2>
        
        <div className="bg-gray-900 text-white rounded-xl p-8 mb-8">
          <h4 className="font-heading text-xl font-bold mb-6 text-center">The $1.5 Trillion War on Drugs</h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold mb-3 text-yellow-300">Total Investment (1971-2024)</h5>
              <ul className="text-sm space-y-2">
                <li>• $1.5+ trillion spent</li>
                <li>• 45+ million arrests</li>
                <li>• 2.3 million currently incarcerated</li>
                <li>• 500,000 for drug offenses</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-3 text-yellow-300">Results</h5>
              <ul className="text-sm space-y-2">
                <li>• Drugs cheaper and more pure than 1980</li>
                <li>• Record overdose deaths</li>
                <li>• Mass incarceration without crime reduction</li>
                <li>• Successful targeting of major cartels</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="font-heading">Racial Disparities in Drug Enforcement</h2>
        <p>
          Drug arrest data reveals stark racial disparities in enforcement. Despite roughly equal rates of drug
          use across racial groups (according to SAMHSA surveys), arrest rates differ dramatically — reflecting
          differences in policing patterns, enforcement priorities, and systemic inequities.
        </p>

        {drugRace && (
          <>
            <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Drug Arrests by Race (FBI {new Date().getFullYear()} Data)</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Race</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Drug Arrests</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">% of Drug Arrests</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">% of All Arrests</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Disparity Index</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'White', value: drugRace.white, allArrest: totalRace?.white ?? 0 },
                    { label: 'Black or African American', value: drugRace.black, allArrest: totalRace?.black ?? 0 },
                    { label: 'American Indian/Alaska Native', value: drugRace.nativeAmerican, allArrest: totalRace?.nativeAmerican ?? 0 },
                    { label: 'Asian', value: drugRace.asian, allArrest: totalRace?.asian ?? 0 },
                    { label: 'Native Hawaiian/Pacific Islander', value: drugRace.pacificIslander, allArrest: totalRace?.pacificIslander ?? 0 },
                  ].map(row => {
                    const drugPct = (row.value / drugRace.total * 100).toFixed(1);
                    const allPct = totalRace ? (row.allArrest / totalRace.total * 100).toFixed(1) : '—';
                    const disparity = totalRace && row.allArrest > 0 ? ((row.value / drugRace.total) / (row.allArrest / totalRace.total)).toFixed(2) : '—';
                    return (
                      <tr key={row.label} className="border-t">
                        <td className="border border-gray-300 px-4 py-2 font-medium">{row.label}</td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-mono">{fmtNum(row.value)}</td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-mono">{drugPct}%</td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-mono">{allPct}%</td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-mono">{disparity}×</td>
                      </tr>
                    );
                  })}
                  <tr className="border-t font-semibold bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Total</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">{fmtNum(drugRace.total)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">100%</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">100%</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">1.00×</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              <strong>Disparity Index</strong> compares each group&apos;s share of drug arrests to their share of all arrests.
              A value above 1.0 means overrepresentation in drug enforcement; below 1.0 means underrepresentation.
              Black Americans account for {(drugRace.black / drugRace.total * 100).toFixed(1)}% of drug arrests
              despite constituting roughly 13% of the US population.
            </p>
          </>
        )}

        {drugEth && (
          <>
            <h3 className="font-heading text-xl font-semibold mt-8 mb-4">The Hispanic/Latino Dimension</h3>
            <p>
              Ethnicity data adds another layer to the disparity picture. Hispanic or Latino individuals
              represent a significant share of drug enforcement activity:
            </p>
            <div className="grid md:grid-cols-3 gap-4 my-6">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-5 text-center">
                <div className="text-2xl font-bold text-orange-700">{fmtNum(drugEth.hispanic)}</div>
                <div className="text-sm text-gray-600">Hispanic/Latino Drug Arrests</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-5 text-center">
                <div className="text-2xl font-bold text-orange-700">{drugEth.hispanicPct}%</div>
                <div className="text-sm text-gray-600">Share of Drug Arrests</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-5 text-center">
                <div className="text-2xl font-bold text-orange-700">{totalEth ? totalEth.hispanicPct : '—'}%</div>
                <div className="text-sm text-gray-600">Share of All Arrests</div>
              </div>
            </div>
            <p>
              Hispanic/Latino individuals account for {drugEth.hispanicPct}% of drug arrests
              {totalEth ? ` compared to ${totalEth.hispanicPct}% of all arrests` : ''}.
              Given that Hispanic/Latino Americans are approximately 19% of the US population,
              this suggests {drugEth.hispanicPct > 19 ? 'slight overrepresentation' : 'rough proportionality'} in drug enforcement.
              However, federal drug enforcement — which disproportionately targets border and immigration-related
              cases — adds significantly to these numbers in ways not captured by FBI arrest data alone.
            </p>

            <div className="overflow-x-auto my-6">
              <table className="min-w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Ethnicity</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Drug Arrests</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">% of Drug Arrests</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="border border-gray-300 px-4 py-2 font-medium">Hispanic or Latino</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">{fmtNum(drugEth.hispanic)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">{drugEth.hispanicPct}%</td>
                  </tr>
                  <tr className="border-t">
                    <td className="border border-gray-300 px-4 py-2 font-medium">Not Hispanic or Latino</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">{fmtNum(drugEth.notHispanic)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">{drugEth.notHispanicPct}%</td>
                  </tr>
                  <tr className="border-t font-semibold bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Total (Ethnicity Known)</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">{fmtNum(drugEth.totalEthnicity)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Why the Disparity Exists</h3>
        <p>
          Research consistently shows that drug use rates are roughly similar across racial groups.
          The National Survey on Drug Use and Health (NSDUH) finds that White, Black, and Hispanic
          Americans use illegal drugs at comparable rates. So why the arrest disparity?
        </p>
        <ul>
          <li><strong>Open-air markets vs. private use.</strong> Drug enforcement disproportionately targets
          street-level markets in disadvantaged (often minority) neighborhoods, while suburban drug use
          happens behind closed doors.</li>
          <li><strong>Policing intensity.</strong> Areas with higher police presence generate more drug arrests
          regardless of actual drug use rates. Over-policed communities produce more arrests.</li>
          <li><strong>Marijuana enforcement.</strong> Despite legalization trends, marijuana still drives the
          plurality of drug arrests, and enforcement has historically targeted Black and Brown communities
          at rates 3-4× higher than White communities.</li>
          <li><strong>Federal sentencing.</strong> Federal drug mandatory minimums have disproportionately impacted
          minority communities, particularly the now-reformed crack/powder cocaine disparity.</li>
          <li><strong>Traffic stops and pretextual policing.</strong> Drug arrests often begin with traffic stops,
          and studies show racial minorities are stopped, searched, and arrested at higher rates.</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
          <h4 className="font-semibold mb-3 text-[#1e3a5f]">The Numbers in Context</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-2">Drug Arrest Facts</p>
              <ul className="space-y-1 text-gray-700">
                <li>• {fmtNum(drugRace?.total ?? 0)} total drug arrests recorded</li>
                <li>• Drug arrests are {drugRace && totalRace ? (drugRace.total / totalRace.total * 100).toFixed(1) : '—'}% of all arrests</li>
                <li>• White individuals: {drugRace ? (drugRace.white / drugRace.total * 100).toFixed(1) : '—'}% of drug arrests</li>
                <li>• Black individuals: {drugRace ? (drugRace.black / drugRace.total * 100).toFixed(1) : '—'}% of drug arrests</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Population Context (US Census)</p>
              <ul className="space-y-1 text-gray-700">
                <li>• White: ~61% of US population</li>
                <li>• Black: ~13% of US population</li>
                <li>• Hispanic/Latino: ~19% of US population</li>
                <li>• Asian: ~6% of US population</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="font-heading">Policy Lessons</h2>
        <p>
          The drug-crime connection teaches several lessons:
        </p>
        <ul>
          <li><strong>Prohibition creates violence.</strong> It&apos;s the illegal market — not the drug itself — that generates most drug-related violence. Legal alcohol causes more individual violence than illegal drugs, but alcohol doesn&apos;t generate turf wars.</li>
          <li><strong>Enforcement alone can&apos;t solve drug problems.</strong> The War on Drugs spent over $1 trillion and incarcerated millions. Drugs are cheaper, purer, and more available than ever.</li>
          <li><strong>Different drugs create different crime patterns.</strong> Policy should target the specific harms of each substance rather than treating all drugs equally.</li>
          <li><strong>Treatment reduces crime.</strong> Programs that connect drug users to treatment — rather than incarceration — consistently show reduced recidivism and crime.</li>
          <li><strong>The fentanyl crisis requires public health responses.</strong> Unlike crack, fentanyl's primary harm is death, not violence, calling for medical rather than criminal justice solutions.</li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/analysis/crime-decline" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Crime Decline</Link>
        <Link href="/murder-rate" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Murder Rate</Link>
      </div>

      <div className="mt-8"><RelatedAnalysis currentSlug="drug-crime" />

      <ShareButtons title="The Drug-Crime Connection" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The Drug-Crime Connection: From Crack to Fentanyl',
        publisher: { '@type': 'Organization', name: 'OpenCrime' },
        datePublished: '2026-03-04',
      })}} />
    </div>
  );
}
