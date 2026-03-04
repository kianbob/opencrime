import RelatedAnalysis from '@/components/RelatedAnalysis';
import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { NationalTrend } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'The Property Crime Paradox: Theft Rising While Violence Falls',
  description: 'Motor vehicle theft up 25% since 2019 while murder drops 15.7%. Analysis of diverging crime trends: why property crime is surging as violent crime falls.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/property-crime-surge' },
};

export default function PropertyCrimeSurgePage() {
  const national = loadData<NationalTrend[]>('national-trends.json');
  const n = national[national.length - 1];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/analysis" className="hover:underline">Analysis</Link> / <span className="text-gray-800">Property Crime Paradox</span>
      </nav>
      <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">ANALYSIS</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">The Property Crime Paradox: Why Theft Is Rising While Violence Falls</h1>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-green-600">-15.7%</div>
            <div className="text-sm text-gray-600">Murder Rate Change (2023→2024)</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-amber-600">{fmtRate(n.propertyRate)}</div>
            <div className="text-sm text-gray-600">Property Crime Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-600">+25%</div>
            <div className="text-sm text-gray-600">MV Theft Since 2019</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-600">
          Something strange is happening in American crime: violent crime is plummeting while certain 
          property crimes are surging. The trends that used to move together have diverged.
        </p>

        <h2 className="font-heading">The Divergence</h2>
        <p>
          Between 2022 and 2024, murder fell by roughly 25% — one of the fastest declines ever recorded. 
          Robbery is down. Aggravated assault is down. By every violent crime measure, America is getting safer.
        </p>
        <p>
          But property crime tells a different story. Motor vehicle theft surged roughly 25% from 2019 to 2024, 
          even as it has begun to stabilize. Retail theft — hard to measure precisely with FBI data — has become 
          a major political and business issue. Catalytic converter theft, package theft, and organized retail crime 
          have created new categories of property victimization.
        </p>

        <h2 className="font-heading">Why the Split?</h2>
        <p>Several factors explain the divergence:</p>

        <h3>1. Different incentives</h3>
        <p>
          Violence is typically emotional — driven by arguments, domestic disputes, gang rivalries, and 
          impulsive encounters. Property crime is typically economic — driven by opportunity, need, and risk 
          calculation. The factors that reduced violence (aging demographics, less crack, more incarceration) 
          didn&apos;t necessarily reduce the incentive to steal.
        </p>

        <h3>2. Reduced consequences</h3>
        <p>
          Many jurisdictions raised felony theft thresholds, meaning more thefts are charged as misdemeanors. 
          Some prosecutors deprioritized property crime. Whether these policy changes caused the increase or 
          merely coincided with it is debated, but the perception of reduced consequences may embolden offenders.
        </p>

        <h3>3. Technology created new vulnerabilities</h3>
        <p>
          Hyundai and Kia vehicles became easy targets due to a design flaw (no immobilizer chip), driving a 
          significant share of the auto theft surge. Social media spread the technique nationally. Meanwhile, 
          the explosion of package deliveries created millions of daily theft opportunities that didn&apos;t exist 
          a decade ago.
        </p>

        <h3>4. The resale market went digital</h3>
        <p>
          Online marketplaces made it easier to fence stolen goods anonymously. This reduced one of the 
          traditional barriers to property crime — finding a buyer — and may have enabled organized theft 
          rings to scale operations.
        </p>

        <h2 className="font-heading">The Historical Perspective</h2>
        <p>
          Ironically, property crime is still far below its historical peak. The property crime rate peaked 
          around 5,000 per 100,000 in 1980 and has since fallen by more than half. Even the recent increases 
          represent a blip in a decades-long decline. The current rate of {fmtRate(n.propertyRate)} is historically low.
        </p>
        <p>
          The concern isn&apos;t that property crime is at record highs — it isn&apos;t. It&apos;s that the recent 
          trend reversal, particularly in motor vehicle theft and organized retail crime, suggests 
          a structural shift rather than a temporary fluctuation.
        </p>

        <h2 className="font-heading">What the Data Doesn&apos;t Show</h2>
        <p>
          FBI data has significant blind spots when it comes to property crime. Many thefts go unreported — 
          the Bureau of Justice Statistics estimates only about a third of property crimes are reported to 
          police. Shoplifting is notoriously underreported. And newer forms of theft (online fraud, package 
          theft, catalytic converter theft) may not be consistently categorized.
        </p>
        <p>
          This means the property crime trends we see in FBI data may understate the actual picture. The 
          lived experience of retail workers, delivery drivers, and residents in high-theft areas may be 
          worse than the statistics suggest.
        </p>

        <h2 className="font-heading">The Bottom Line</h2>
        <p>
          America faces a genuine paradox: it is simultaneously becoming much safer (in terms of violence) 
          and experiencing a property crime challenge that affects daily quality of life. Smart policy requires 
          acknowledging both realities — celebrating the violence decline while taking property crime 
          seriously — rather than cherry-picking whichever trend supports a preferred narrative.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/crime-rate" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">All Crime Data</Link>
        <Link href="/crimes" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Crime Types</Link>
      </div>

      <div className="mt-8"><RelatedAnalysis currentSlug="property-crime-surge" />

      <ShareButtons title="The Property Crime Paradox" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The Property Crime Paradox: Why Theft Is Rising While Violence Falls',
        publisher: { '@type': 'Organization', name: 'OpenCrime' },
        datePublished: '2026-03-04',
      })}} />
    </div>
  );
}
