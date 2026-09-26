import RelatedAnalysis from '@/components/RelatedAnalysis';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '2025 Historic Crime Drop — Largest Decline Since 1936 | OpenCrime',
  description: 'FBI data confirms 2025 saw the largest single-year drop in violent crime since records began in 1936. Violent crime fell 9.3%, murder dropped 18.1%, and the murder rate hit its lowest point since 1955.',
  openGraph: { title: '2025 Historic Crime Drop — Largest Decline Since 1936', description: 'The FBI reports record-breaking decreases in violent crime and murder rates in 2025.', url: 'https://www.opencrime.us/analysis/2025-historic-crime-drop' },
  alternates: { canonical: 'https://www.opencrime.us/analysis/2025-historic-crime-drop' },
};

export default function HistoricCrimeDropPage() {
  const aiInsights = [
    'Violent crime fell 9.3% in 2025 — the largest single-year drop since FBI estimations began in 1936',
    'Murder and nonnegligent manslaughter plunged 18.1%, also a record decline',
    'The 2025 murder rate of 4.1 per 100,000 ties 1955-1956 for the lowest ever recorded',
    'An estimated 1,119,768 violent crimes occurred — rate of 327.6 per 100,000',
    'Property crime fell 12.4%, with motor vehicle theft down 22%',
    'Violent crime has declined every year since the 2022 spike',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{label:'Analysis',href:'/analysis'},{label:'2025 Historic Crime Drop'}]} />
      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">BREAKING DATA</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">2025 Historic Crime Drop — The Largest Decline Since FBI Records Began</h1>
      <p className="text-lg text-gray-600 mb-8">
        On August 14, 2026, the FBI released its annual Reported Crimes in the Nation statistics confirming
        that 2025 saw the largest single-year decline in both violent crime and murder rates since the Bureau
        began publishing estimated crime data in 1936. Here's what the data shows.
      </p>

      <AIOverview insights={aiInsights} />

      <div className="bg-gray-900 text-white rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4 text-center">2025 Crime Data: Record-Breaking Numbers</h2>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-green-400">-9.3%</div>
            <div className="text-gray-300 text-sm">Violent Crime Change</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">-18.1%</div>
            <div className="text-gray-300 text-sm">Murder Rate Change</div>
          </div>
          <div>
            <div className="text-3xl font-bold">4.1</div>
            <div className="text-gray-300 text-sm">Murder Rate per 100K</div>
            <div className="text-gray-500 text-xs">Lowest since 1955</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">-12.4%</div>
            <div className="text-gray-300 text-sm">Property Crime Change</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">The Numbers: What FBI Data Shows</h2>

        <p>
          The FBI estimates that <strong>1,119,768 violent crime offenses</strong> occurred nationwide in 2025,
          producing a rate of <strong>327.6 offenses per 100,000 inhabitants</strong>, down from 362.9 in 2024.
          This 9.3% decline is the steepest single-year drop ever recorded.
        </p>

        <p>
          The <strong>murder rate of 4.1 per 100,000</strong> ties 1955 and 1956 for the lowest rate since FBI
          estimations began. An estimated <strong>14,085 murders</strong> were reported in 2025, down from
          approximately 16,935 in 2024 — an 18.1% decline.
        </p>

        <h3 className="font-heading text-xl font-semibold mt-8 mb-4">Year-over-Year Changes by Crime Type</h3>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden my-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Crime Category</th>
                <th className="text-right px-4 py-2">2024</th>
                <th className="text-right px-4 py-2">2025</th>
                <th className="text-right px-4 py-2">Change</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Violent Crime (total)</td>
                <td className="px-4 py-2 text-right font-mono">1,221,345</td>
                <td className="px-4 py-2 text-right font-mono">1,119,768</td>
                <td className="px-4 py-2 text-right font-mono text-green-600">-9.3%</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Murder &amp; Manslaughter</td>
                <td className="px-4 py-2 text-right font-mono">16,935</td>
                <td className="px-4 py-2 text-right font-mono">14,085</td>
                <td className="px-4 py-2 text-right font-mono text-green-600">-18.1%</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Rape</td>
                <td className="px-4 py-2 text-right font-mono">127,527</td>
                <td className="px-4 py-2 text-right font-mono">117,835</td>
                <td className="px-4 py-2 text-right font-mono text-green-600">-7.6%</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Robbery</td>
                <td className="px-4 py-2 text-right font-mono">205,952</td>
                <td className="px-4 py-2 text-right font-mono">167,851</td>
                <td className="px-4 py-2 text-right font-mono text-green-600">-18.5%</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Aggravated Assault</td>
                <td className="px-4 py-2 text-right font-mono">870,931</td>
                <td className="px-4 py-2 text-right font-mono">805,611</td>
                <td className="px-4 py-2 text-right font-mono text-green-600">-7.5%</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="px-4 py-2 font-medium">Property Crime (total)</td>
                <td className="px-4 py-2 text-right font-mono">5,986,400</td>
                <td className="px-4 py-2 text-right font-mono">5,244,087</td>
                <td className="px-4 py-2 text-right font-mono text-green-600">-12.4%</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Burglary</td>
                <td className="px-4 py-2 text-right font-mono">779,542</td>
                <td className="px-4 py-2 text-right font-mono">656,374</td>
                <td className="px-4 py-2 text-right font-mono text-green-600">-15.8%</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Motor Vehicle Theft</td>
                <td className="px-4 py-2 text-right font-mono">880,327</td>
                <td className="px-4 py-2 text-right font-mono">686,655</td>
                <td className="px-4 py-2 text-right font-mono text-green-600">-22.0%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Historical Context: Where 2025 Fits</h2>

        <p>
          The 2025 decline caps a three-year correction from the <strong>2022 post-pandemic spike</strong>.
          Violent crime rates have now fallen below pre-pandemic 2019 levels, and the murder rate is at
          its lowest point in seven decades.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h3 className="font-semibold mb-3 text-blue-800">The Three-Year Correction (2022–2025)</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold">2023</h4>
              <ul className="space-y-1 mt-2">
                <li>• Violent crime: -3.5%</li>
                <li>• Murder: -11.6%</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">2024</h4>
              <ul className="space-y-1 mt-2">
                <li>• Violent crime: -4.5%</li>
                <li>• Murder: -14.9%</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">2025</h4>
              <ul className="space-y-1 mt-2">
                <li>• Violent crime: -9.3%</li>
                <li>• Murder: -18.1%</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm">
            <strong>Cumulative since 2022:</strong> Violent crime down ~16%, murder down ~40%.
          </p>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Not All the News Is Good</h2>

        <p>
          While crime broadly declined, the FBI report flagged one concerning trend: <strong>assaults on
          law enforcement officers increased 13.8%</strong> in 2025. A total of 90,178 officers were
          assaulted in the line of duty — a 10-year high.
        </p>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
          <h4 className="font-semibold mb-3 text-red-800">Officer Safety Concern</h4>
          <p className="text-sm">
            Even as overall violent crime plummeted, violence directed at police officers rose sharply.
            This divergence highlights the unique risks facing law enforcement even during periods of
            declining crime. See our <Link href="/officer-safety" className="text-blue-600 underline">Officer Safety dashboard</Link> for
            detailed LEOKA data.
          </p>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">What's Driving the Decline?</h2>

        <p>
          Criminologists point to several converging factors behind the historic drop:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-green-800">Law Enforcement Factors</h4>
            <ul className="text-sm space-y-2">
              <li>• Increased police staffing after post-2020 shortages</li>
              <li>• Technology-aided policing (ShotSpotter, surveillance, predictive tools)</li>
              <li>• Focused deterrence programs targeting repeat violent offenders</li>
              <li>• Federal-local task force partnerships on gun violence</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-blue-800">Social &amp; Economic Factors</h4>
            <ul className="text-sm space-y-2">
              <li>• Post-pandemic social stabilization</li>
              <li>• Low unemployment and wage growth at the bottom</li>
              <li>• Fading of pandemic-era disruptions to courts, schools, services</li>
              <li>• Community violence intervention programs scaling up</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Looking Ahead: 2026 Preliminary Trends</h2>

        <p>
          FBI Director Kash Patel noted in the report that <strong>"preliminary trends for 2026 are showing
          additional decreases in crime."</strong> If sustained, the U.S. could see violent crime rates
          drop to levels not seen since the early 1960s.
        </p>

        <p>
          However, experts caution that crime trends can reverse quickly — as demonstrated by the sharp
          pandemic-era spike in 2020-2022. Sustained investment in both policing and community-level
          interventions will be critical to maintaining these gains.
        </p>

        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Data Sources</h2>

        <ul>
          <li><a href="https://cde.ucr.cjis.gov/" className="text-blue-600">FBI Crime Data Explorer</a> — Full 2025 NIBRS and UCR data</li>
          <li><a href="https://www.fbi.gov/news/press-releases/fbi-releases-2025-reported-crimes-in-the-nation-statistics" className="text-blue-600">FBI Press Release</a> — August 14, 2026</li>
          <li><a href="https://cde.ucr.cjis.gov/LATEST/resources/reports/UCR_Summary_of_Reported_Crimes_in_the_Nation_2025.pdf" className="text-blue-600">UCR Summary Report (PDF)</a></li>
        </ul>
      </div>

      <div className="prose prose-lg max-w-none mt-8">
        <h2 className="font-heading text-2xl font-bold mt-10 mb-6">Related Analysis</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link href="/analysis/crime-decline" className="block bg-[#1e3a5f] text-white rounded-lg p-4 hover:bg-[#2a4d7a] transition">
            <h4 className="font-semibold mb-2">The Great Crime Decline</h4>
            <p className="text-sm opacity-90">Long-term trends from the 1990s peak to today</p>
          </Link>
          <Link href="/analysis/violent-crime-statistics-2026" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Violent Crime Statistics 2026</h4>
            <p className="text-sm text-gray-600">Current year data and early trends</p>
          </Link>
          <Link href="/analysis/most-dangerous-cities-2026" className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition">
            <h4 className="font-semibold mb-2">Most Dangerous Cities 2026</h4>
            <p className="text-sm text-gray-600">Which cities still have high crime despite the national decline</p>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="2025-historic-crime-drop" />
        <ShareButtons title="2025 Historic Crime Drop — Largest Decline Since 1936" />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: '2025 Historic Crime Drop — Largest Decline Since FBI Records Began',
        publisher: { '@type': 'Organization', name: 'OpenCrime' },
        datePublished: '2026-09-26',
        dateModified: '2026-09-26',
      })}} />
    </div>
  );
}
