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

        <h2 className="font-heading">Important Notes</h2>
        <ul>
          <li>Crime statistics reflect <em>reported</em> crimes, not all crimes that occur. Many crimes go unreported.</li>
          <li>The FBI cautions against using crime data to rank or compare communities. Crime rates are influenced by many factors including population density, economic conditions, climate, policing practices, and reporting methods.</li>
          <li>There is a gap in national estimates between 2017–2020 due to the FBI&apos;s transition from the Summary Reporting System (SRS) to the National Incident-Based Reporting System (NIBRS).</li>
          <li>Rates are calculated per 100,000 residents using the population figures provided in the FBI data.</li>
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
          healthcare, government spending, immigration, prescriber data, lobbying, farm subsidies, and more.
        </p>

        <h2 className="font-heading">Explore</h2>
        <ul>
          <li><Link href="/dashboard">Interactive Dashboard</Link> — 45 years of charts</li>
          <li><Link href="/analysis">Analysis Articles</Link> — In-depth data journalism</li>
          <li><Link href="/tools">Interactive Tools</Link> — Compare cities, safety scores</li>
          <li><Link href="/downloads">Download Data</Link> — Free JSON data files</li>
          <li><Link href="/methodology">Methodology</Link> — How we process data</li>
          <li><Link href="/faq">FAQ</Link> — Common questions answered</li>
        </ul>

        <h2 className="font-heading">Contact</h2>
        <p>
          Questions or feedback? Reach us at{' '}
          <a href="mailto:info@thedataproject.ai" className="text-[#1e3a5f] hover:underline">info@thedataproject.ai</a>
        </p>
      </div>
    </div>
  );
}
