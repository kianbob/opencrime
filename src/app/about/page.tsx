import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About OpenCrime',
  description: 'About OpenCrime — a free, open platform for exploring FBI crime statistics. No paywalls, no ads, just data.',
  openGraph: { url: 'https://www.opencrime.us/about' },
  alternates: { canonical: 'https://www.opencrime.us/about' },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"WebPage","name":"About OpenCrime","description":"About OpenCrime — a free, open platform for exploring FBI crime statistics. No paywalls, no ads, just data.","url":"https://www.opencrime.us/about","publisher":{"@type":"Organization","name":"OpenCrime","url":"https://www.opencrime.us"}}` }} />
      <h1 className="font-heading text-3xl font-bold mb-6">About OpenCrime</h1>

      <div className="prose prose-lg max-w-none">
        <p>
          OpenCrime makes FBI crime statistics accessible to everyone. We take raw data from the FBI&apos;s 
          Crime Data Explorer and present it in a clean, searchable format that anyone can understand.
        </p>

        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { n: '9,800+', label: 'Pages' },
            { n: '12,826', label: 'City Profiles' },
            { n: '45', label: 'Years of Data' },
            { n: '8', label: 'Analysis Articles' },
          ].map(s => (
            <div key={s.label} className="bg-[#1e3a5f] text-white rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">{s.n}</div>
              <div className="text-blue-200 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-heading">Our Data</h2>
        <p>All data comes from the FBI&apos;s Uniform Crime Reporting (UCR) program:</p>
        <ul>
          <li><strong>National estimates:</strong> 1979–2024 (45 years of trend data)</li>
          <li><strong>State-level data:</strong> All 50 states + DC</li>
          <li><strong>City-level data:</strong> 9,700+ cities (2020–2024)</li>
          <li><strong>Crime types:</strong> Violent crime, property crime, murder, rape, robbery, assault, burglary, larceny, motor vehicle theft</li>
        </ul>

        <h2 className="font-heading">Why We Built This</h2>
        <p>
          Crime data is public information, but it&apos;s often buried in dense government reports or
          hidden behind paywalls. We believe everyone should be able to understand what&apos;s happening
          in their community without needing a statistics degree or subscription.
        </p>
        <p>
          OpenCrime translates raw FBI data into clear, searchable profiles. Search your city, compare
          it to others, explore trends over time, and understand the bigger picture of crime in America.
        </p>

        <h2 className="font-heading">Important Notes</h2>
        <ul>
          <li><strong>Reported vs actual crime:</strong> Crime statistics reflect <em>reported</em> crimes, not all crimes that occur. The Bureau of Justice Statistics estimates roughly half of violent crimes and about a third of property crimes go unreported.</li>
          <li><strong>Rankings can be misleading:</strong> The FBI cautions against using crime data to rank or compare communities. Crime rates are influenced by many factors including population density, economic conditions, climate, policing practices, demographics, and reporting methods. Use comparisons as one data point, not the whole story.</li>
          <li><strong>NIBRS transition gap:</strong> There is a gap in national estimates between 2017–2020 due to the FBI&apos;s transition from the Summary Reporting System (SRS) to the National Incident-Based Reporting System (NIBRS). NIBRS captures far more detail about each incident.</li>
          <li><strong>Rate calculations:</strong> Rates are calculated per 100,000 residents using the population figures provided in the FBI data. This allows fair comparison between cities of different sizes.</li>
          <li><strong>Missing cities:</strong> Some cities don&apos;t appear if their law enforcement agency didn&apos;t submit complete data to the FBI for that year, or if the city is very small.</li>
        </ul>

        <h2 className="font-heading">What Makes OpenCrime Different</h2>
        <ul>
          <li><strong>Comprehensive coverage:</strong> We cover every city in the FBI&apos;s published data — not just the big ones.</li>
          <li><strong>Historical context:</strong> 45 years of national data lets you see long-term trends, not just year-to-year noise.</li>
          <li><strong>Analysis, not just numbers:</strong> Our analysis articles dive deep into patterns most news coverage misses.</li>
          <li><strong>Transparent methodology:</strong> We document exactly how we process and calculate everything.</li>
          <li><strong>Completely free:</strong> No subscriptions, no login walls, no ads cluttering the data.</li>
        </ul>

        <h2 className="font-heading">No Paywalls, No Ads</h2>
        <p>
          OpenCrime is completely free. No paywalls, no login required, no ads. 
          Public data should be publicly accessible.
        </p>

        <h2 className="font-heading">Part of TheDataProject.ai</h2>
        <p>
          OpenCrime is part of <a href="https://thedataproject.ai" className="text-[#1e3a5f] hover:underline">TheDataProject.ai</a>, 
          a network of free data platforms making public records accessible. Our sister sites cover 
          healthcare, government spending, immigration, prescriber data, lobbying, construction permits (<a href="https://permitcore.io" className="text-[#1e3a5f] hover:underline">PermitCore</a>), and more.
        </p>

        <h2 className="font-heading">Data Sources & Methodology</h2>
        <p>
          All data comes from the FBI&apos;s Uniform Crime Reporting (UCR) program via the Crime Data Explorer (CDE).
          The UCR program collects crime statistics from over 18,000 law enforcement agencies nationwide.
        </p>
        <p>
          We download raw datasets from the FBI CDE, process them for consistency, calculate rates per 100,000 residents,
          and organize everything into a searchable database. Our methodology is fully documented for transparency.
        </p>
        <p>
          <strong>Key sources:</strong>
        </p>
        <ul>
          <li>FBI Crime Data Explorer (CDE) — <a href="https://cde.ucr.cjis.gov/" className="text-[#1e3a5f] hover:underline" target="_blank" rel="noopener">cde.ucr.cjis.gov</a></li>
          <li>Bureau of Justice Statistics (BJS) — victimization surveys and supplemental data</li>
          <li>CDC WONDER — mortality data for homicide trends</li>
        </ul>

        <h2 className="font-heading">Explore</h2>
        <ul>
          <li><Link href="/dashboard">Interactive Dashboard</Link> — 45 years of charts</li>
          <li><Link href="/analysis">Analysis Articles</Link> — In-depth data journalism</li>
          <li><Link href="/tools">Interactive Tools</Link> — Compare cities, safety scores</li>
          <li><Link href="/downloads">Download Data</Link> — Free JSON data files</li>
          <li><Link href="/methodology">Methodology</Link> — How we process data</li>
          <li><Link href="/faq">FAQ</Link> — Common questions answered</li>
        </ul>

        <h2 className="font-heading">Data Limitations & Accuracy</h2>
        <p>
          While we strive for accuracy, it&apos;s important to understand the limitations of crime data:
        </p>
        <ul>
          <li><strong>Reporting is voluntary:</strong> Law enforcement agencies aren&apos;t required to submit data to the FBI. Participation rates vary by state and year.</li>
          <li><strong>Definitions vary:</strong> What counts as "aggravated assault" vs "simple assault" can vary between agencies.</li>
          <li><strong>Population estimates:</strong> We use FBI-provided population figures, which may differ from Census estimates.</li>
          <li><strong>Timing:</strong> FBI data is typically released 9-12 months after the reporting year ends.</li>
        </ul>
        <p>
          Despite these limitations, the FBI UCR program remains the most comprehensive source of crime statistics in America.
          We supplement FBI data with Bureau of Justice Statistics (BJS) victimization surveys and CDC mortality data where relevant.
        </p>

        <h2 className="font-heading">Contact</h2>
        <p>
          Questions or feedback? Found an error? Want to collaborate? Reach us at{' '}
          <a href="mailto:info@thedataproject.ai" className="text-[#1e3a5f] hover:underline">info@thedataproject.ai</a>
        </p>
        <p>
          We welcome feedback from journalists, researchers, law enforcement professionals, and anyone interested in understanding crime data better.
        </p>
      </div>
    </div>
  );
}
