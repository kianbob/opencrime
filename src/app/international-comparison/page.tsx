import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import InternationalClient from './InternationalClient';

export const metadata: Metadata = {
  title: 'International Crime Comparison: How the US Compares to Other Countries',
  description: 'Compare US crime rates to other countries. Homicide rates, incarceration rates, and gun violence data from UNODC, WHO, and World Prison Brief.',
  openGraph: { 
    title: 'International Crime Comparison: US vs World', 
    description: 'US homicide rate 6.4 per 100K vs Japan 0.3, UK 1.2. Incarceration rate 531 per 100K vs European peers 69-129.', 
    url: 'https://www.opencrime.us/international-comparison' 
  },
  alternates: { canonical: 'https://www.opencrime.us/international-comparison' },
};

const aiInsights = [
  'US homicide rate of 6.4 per 100K is the highest among wealthy developed nations',
  'US incarceration rate of 531 per 100K is 5-10 times higher than European peers',
  'US gun homicide rate of 4.3 per 100K is ~200 times higher than Japan (0.01)',
  'While high among rich countries, US is safer than Latin America and Africa',
  'US combines high violence rates with extremely high imprisonment rates',
  'Homicide rates vary dramatically: South Africa 41.1, Mexico 25.2, Brazil 22.4 vs Japan 0.3',
  'Even without guns, US non-firearm homicide rate exceeds total homicide rates of peer nations'
];

export default function InternationalComparisonPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{label:'International Crime Comparison'}]} />
      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">INTERNATIONAL</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">
        International Crime Comparison: How the US Compares to Other Countries
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        The United States has unique crime patterns compared to other developed nations. While safer than 
        many countries in Latin America and Africa, the US is an outlier among wealthy democracies in both 
        violence rates and incarceration levels. Here&apos;s what the international data shows.
      </p>

      <AIOverview insights={aiInsights} />

      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">6.4</div>
            <div className="text-blue-200 text-sm">US Homicide Rate</div>
            <div className="text-blue-200 text-xs">per 100K people</div>
          </div>
          <div>
            <div className="text-3xl font-bold">21x</div>
            <div className="text-blue-200 text-sm">Higher than Japan</div>
            <div className="text-blue-200 text-xs">(0.3 per 100K)</div>
          </div>
          <div>
            <div className="text-3xl font-bold">531</div>
            <div className="text-blue-200 text-sm">US Prison Rate</div>
            <div className="text-blue-200 text-xs">per 100K people</div>
          </div>
          <div>
            <div className="text-3xl font-bold">8x</div>
            <div className="text-blue-200 text-sm">Higher than Germany</div>
            <div className="text-blue-200 text-xs">(69 per 100K)</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The US Crime Paradox</h2>
        <p>
          The United States occupies a unique position in global crime statistics. By the standards of 
          wealthy, developed nations — countries with similar GDP per capita, democratic institutions, 
          and social safety nets — America has extraordinarily high rates of both violent crime and 
          incarceration.
        </p>
        <p>
          Yet in absolute global terms, the US is relatively safe. Countries in Latin America, Africa, 
          and parts of Eastern Europe and Asia have much higher murder rates. The US homicide rate of 
          6.4 per 100,000 people places it somewhere in the middle globally — but at the very top among 
          its economic and political peers.
        </p>

        <h2 className="font-heading">Homicide Rates: US vs the World</h2>
        <p>
          Homicide is the most reliable crime statistic for international comparison because it&apos;s 
          consistently reported across countries and harder to hide or misclassify than other crimes. 
          The data comes from the UN Office on Drugs and Crime (UNODC) and World Health Organization.
        </p>
      </div>

      <InternationalClient />

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Incarceration Outlier</h2>
        <p>
          If America&apos;s violence rates make it an outlier among rich countries, its incarceration 
          rates are in a category entirely their own. With 531 people per 100,000 in prison, the US 
          imprisons its population at rates 5-10 times higher than European democracies.
        </p>
        <p>
          This isn&apos;t simply because America has more crime. Even accounting for higher crime rates, 
          US sentencing is significantly harsher and prison terms much longer than in peer nations. 
          The &quot;tough on crime&quot; policies of the 1980s and 1990s created a prison system that, 
          while reducing crime, also created the highest incarceration rate in the world.
        </p>

        <h3 className="font-heading">International Prison Rates</h3>
        <p>
          The World Prison Brief tracks incarceration rates globally. Some key comparisons to the US rate of 531 per 100,000:
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Country</th>
              <th className="text-right px-4 py-2">Rate per 100K</th>
              <th className="text-right px-4 py-2">vs US</th>
              <th className="px-4 py-2">Comparison</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-red-50 font-semibold">
              <td className="px-4 py-2">United States</td>
              <td className="px-4 py-2 text-right font-mono">531</td>
              <td className="px-4 py-2 text-right">—</td>
              <td className="px-4 py-2">
                <div className="w-full bg-red-200 rounded-full h-2">
                  <div className="bg-[#dc2626] h-2 rounded-full" style={{ width: '100%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Brazil</td>
              <td className="px-4 py-2 text-right font-mono">381</td>
              <td className="px-4 py-2 text-right text-gray-600">72%</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '72%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Russia</td>
              <td className="px-4 py-2 text-right font-mono">300</td>
              <td className="px-4 py-2 text-right text-gray-600">56%</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '56%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">South Africa</td>
              <td className="px-4 py-2 text-right font-mono">238</td>
              <td className="px-4 py-2 text-right text-gray-600">45%</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '45%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Australia</td>
              <td className="px-4 py-2 text-right font-mono">160</td>
              <td className="px-4 py-2 text-right text-gray-600">30%</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '30%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Mexico</td>
              <td className="px-4 py-2 text-right font-mono">153</td>
              <td className="px-4 py-2 text-right text-gray-600">29%</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '29%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">United Kingdom</td>
              <td className="px-4 py-2 text-right font-mono">129</td>
              <td className="px-4 py-2 text-right text-gray-600">24%</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '24%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">China</td>
              <td className="px-4 py-2 text-right font-mono">121</td>
              <td className="px-4 py-2 text-right text-gray-600">23%</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '23%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Canada</td>
              <td className="px-4 py-2 text-right font-mono">104</td>
              <td className="px-4 py-2 text-right text-gray-600">20%</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '20%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">France</td>
              <td className="px-4 py-2 text-right font-mono">93</td>
              <td className="px-4 py-2 text-right text-gray-600">18%</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '18%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">South Korea</td>
              <td className="px-4 py-2 text-right font-mono">90</td>
              <td className="px-4 py-2 text-right text-gray-600">17%</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '17%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Sweden</td>
              <td className="px-4 py-2 text-right font-mono">74</td>
              <td className="px-4 py-2 text-right text-gray-600">14%</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '14%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Germany</td>
              <td className="px-4 py-2 text-right font-mono">69</td>
              <td className="px-4 py-2 text-right text-gray-600">13%</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '13%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">India</td>
              <td className="px-4 py-2 text-right font-mono">39</td>
              <td className="px-4 py-2 text-right text-gray-600">7%</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '7%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Japan</td>
              <td className="px-4 py-2 text-right font-mono">38</td>
              <td className="px-4 py-2 text-right text-gray-600">7%</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '7%' }} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Gun Violence Gap</h2>
        <p>
          Perhaps nowhere is the US more of an outlier than in gun violence. With 4.3 gun homicides 
          per 100,000 people annually, America&apos;s firearm murder rate is orders of magnitude higher 
          than other developed nations. This isn&apos;t simply because the US has more total homicides 
          — guns account for about 75% of US murders, compared to much lower percentages elsewhere.
        </p>
        <p>
          The disparity is staggering: the US gun homicide rate is roughly 430 times higher than 
          Japan&apos;s (0.01 per 100K), 215 times higher than the UK&apos;s (0.02), and still 8-36 times 
          higher than countries like Canada, France, Germany, and Australia that have more permissive 
          gun laws than most of Europe.
        </p>

        <h3 className="font-heading">Comparing Gun Violence Rates</h3>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
        <div className="bg-red-50 px-4 py-2 font-semibold text-sm">Gun Homicide Rates (2022-2023)</div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Country</th>
              <th className="text-right px-4 py-2">Rate per 100K</th>
              <th className="text-right px-4 py-2">vs US</th>
              <th className="px-4 py-2">Comparison</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-red-50 font-semibold">
              <td className="px-4 py-2">United States</td>
              <td className="px-4 py-2 text-right font-mono">4.30</td>
              <td className="px-4 py-2 text-right">—</td>
              <td className="px-4 py-2">
                <div className="w-full bg-red-200 rounded-full h-2">
                  <div className="bg-[#dc2626] h-2 rounded-full" style={{ width: '100%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Canada</td>
              <td className="px-4 py-2 text-right font-mono">0.50</td>
              <td className="px-4 py-2 text-right text-gray-600">8.6x lower</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '12%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Australia</td>
              <td className="px-4 py-2 text-right font-mono">0.13</td>
              <td className="px-4 py-2 text-right text-gray-600">33x lower</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '3%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">France</td>
              <td className="px-4 py-2 text-right font-mono">0.12</td>
              <td className="px-4 py-2 text-right text-gray-600">36x lower</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '3%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Germany</td>
              <td className="px-4 py-2 text-right font-mono">0.06</td>
              <td className="px-4 py-2 text-right text-gray-600">72x lower</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '1.5%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">United Kingdom</td>
              <td className="px-4 py-2 text-right font-mono">0.02</td>
              <td className="px-4 py-2 text-right text-gray-600">215x lower</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '0.5%' }} />
                </div>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Japan</td>
              <td className="px-4 py-2 text-right font-mono">0.01</td>
              <td className="px-4 py-2 text-right text-gray-600">430x lower</td>
              <td className="px-4 py-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '0.25%' }} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">Why These Differences Exist</h2>
        <p>
          The reasons for America&apos;s unique crime patterns are complex and debated. Some key factors 
          that researchers have identified:
        </p>

        <h3 className="font-heading">Gun Availability</h3>
        <p>
          The US has an estimated 400+ million civilian-owned firearms — more guns than people. No other 
          country comes close to this level of gun ownership. While gun ownership doesn&apos;t directly cause 
          violence, it makes violent conflicts more deadly. Arguments that might result in fistfights or 
          knife wounds elsewhere become shootings in America.
        </p>

        <h3 className="font-heading">Economic Inequality</h3>
        <p>
          The US has higher levels of income inequality than most other developed nations. Research 
          consistently finds that inequality — not just poverty — is associated with higher violence rates. 
          The concentration of disadvantage in specific neighborhoods creates conditions where violence becomes 
          a rational response to limited economic opportunities.
        </p>

        <h3 className="font-heading">Social Safety Net</h3>
        <p>
          Most European countries have more robust social safety nets — universal healthcare, stronger 
          unemployment benefits, subsidized housing, free higher education — that may reduce the desperation 
          that sometimes drives people to crime. The US system is more individualistic, which can leave 
          people without alternatives when legal opportunities fail.
        </p>

        <h3 className="font-heading">Drug Policy</h3>
        <p>
          The US &quot;War on Drugs&quot; criminalized drug use and dealing more aggressively than most 
          other countries. This created lucrative black markets that generated violence, while also 
          creating the mass incarceration system. Countries that treated drug use as a public health 
          issue rather than primarily a criminal one have seen different outcomes.
        </p>

        <h3 className="font-heading">Cultural Factors</h3>
        <p>
          Some researchers point to cultural differences — attitudes toward authority, individualism vs. 
          collectivism, tolerance for violence — but these are harder to measure and more controversial 
          to discuss. What&apos;s clear is that similar countries with different policies and social structures 
          have achieved much lower violence and incarceration rates.
        </p>

        <h2 className="font-heading">What We Can Learn</h2>
        <p>
          The international comparison reveals both challenges and opportunities. Countries like Canada, 
          Australia, and the UK show that wealthy, diverse democracies can maintain much lower violence 
          rates. European countries demonstrate that effective criminal justice doesn&apos;t require mass 
          incarceration.
        </p>
        <p>
          However, direct policy copying rarely works. The US has unique characteristics — its size, 
          diversity, federal system, constitutional protections, and existing institutions — that shape 
          what approaches might be effective. The key lesson isn&apos;t that America should become Europe, 
          but that much lower violence and incarceration rates are possible for a country with America&apos;s 
          resources and capabilities.
        </p>
        <p>
          Some US cities have achieved European-level homicide rates, proving it&apos;s possible even within 
          the American context. The question is whether successful local approaches can scale nationally.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-6 text-sm text-amber-800">
        <strong>Data sources:</strong> Homicide rates from UN Office on Drugs and Crime (UNODC) and World 
        Health Organization. Incarceration rates from World Prison Brief. Gun homicide rates from various 
        national statistics agencies and research organizations. Rates are for 2022-2023 where available.
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 my-6 text-sm text-blue-800">
        <strong>Important context:</strong> International crime comparisons face methodological challenges. 
        Countries define crimes differently, have different reporting practices, and different levels of 
        trust in police. Homicide is considered the most reliable statistic because it&apos;s hard to hide 
        or misclassify, but even homicide data should be interpreted carefully when comparing across 
        very different political and social systems.
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/murder-rate" className="bg-[#dc2626] text-white px-5 py-2 rounded-lg hover:bg-red-700 transition">US Murder Rate</Link>
        <Link href="/analysis/gun-violence" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Gun Violence Analysis</Link>
        <Link href="/analysis/incarceration-nation" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Incarceration Nation</Link>
        <Link href="/analysis/homicide-in-america" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Homicide in America</Link>
        <Link href="/map" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">🗺️ Interactive Map</Link>
        <Link href="/crime-rate" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">US Crime Rate</Link>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="international-comparison" />
        <ShareButtons title="International Crime Comparison: US vs World" />
      </div>

      <div className="mt-8">
        <h2 className="font-heading text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Why does the US have such high murder rates compared to other rich countries?</h3>
            <p className="text-gray-600 text-sm">
              The US homicide rate of 6.4 per 100K is driven by several factors: higher gun availability (400+ million civilian firearms), 
              greater economic inequality, weaker social safety nets, and drug policy that created violent black markets. Cultural and 
              historical factors also play a role.
            </p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-2">How does US gun violence compare internationally?</h3>
            <p className="text-gray-600 text-sm">
              The US gun homicide rate of 4.3 per 100K is 8-430 times higher than other developed nations. Japan (0.01), UK (0.02), 
              and Germany (0.06) have dramatically lower rates. Even countries with more permissive gun laws like Canada (0.5) are 
              still 8 times lower than the US.
            </p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Why does the US imprison so many people?</h3>
            <p className="text-gray-600 text-sm">
              At 531 per 100K, the US incarceration rate is 5-10 times higher than European peers. This results from &quot;tough on 
              crime&quot; policies since the 1980s: longer sentences, mandatory minimums, three-strikes laws, and aggressive drug war 
              prosecutions. It&apos;s not just higher crime - it&apos;s much harsher punishment for the same crimes.
            </p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Is the US safer than most countries globally?</h3>
            <p className="text-gray-600 text-sm">
              Yes, in absolute terms. Countries in Latin America (Brazil 22.4, Mexico 25.2), Africa (South Africa 41.1), and parts 
              of Asia and Eastern Europe have much higher murder rates. The US ranks middle globally but highest among wealthy, 
              democratic nations with similar resources and institutions.
            </p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Can the US learn from other countries&apos; approaches?</h3>
            <p className="text-gray-600 text-sm">
              Some successful approaches could potentially be adapted: community policing models, drug decriminalization, shorter 
              sentences with better rehabilitation, and stronger social safety nets. However, direct copying rarely works due to 
              different political systems, cultures, and existing institutions. The key insight is that much better outcomes are possible.
            </p>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', 
        '@type': 'FAQPage',
        mainEntity: [
          { 
            '@type': 'Question', 
            name: 'How does the US homicide rate compare to other countries?', 
            acceptedAnswer: { 
              '@type': 'Answer', 
              text: 'The US homicide rate of 6.4 per 100,000 is the highest among wealthy developed nations, 21 times higher than Japan (0.3) and 5 times higher than Canada (2.3). However, it is lower than many countries in Latin America and Africa.' 
            }
          },
          { 
            '@type': 'Question', 
            name: 'Why is the US incarceration rate so high?', 
            acceptedAnswer: { 
              '@type': 'Answer', 
              text: 'The US incarceration rate of 531 per 100,000 is 5-10 times higher than European peers due to tough-on-crime policies: longer sentences, mandatory minimums, and aggressive drug war prosecutions starting in the 1980s.' 
            }
          },
          { 
            '@type': 'Question', 
            name: 'How does US gun violence compare internationally?', 
            acceptedAnswer: { 
              '@type': 'Answer', 
              text: 'The US gun homicide rate of 4.3 per 100,000 is orders of magnitude higher than other developed nations: 430 times higher than Japan (0.01), 215 times higher than the UK (0.02), and 36 times higher than France (0.12).' 
            }
          },
        ]
      })}} />
    </div>
  );
}