import { Metadata } from 'next';
import { loadData } from '@/lib/utils';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import AIOverview from '@/components/AIOverview';
import HiddenCrimeClient from './HiddenCrimeClient';

type CrimeItem = { crimeType: string; reported: number; estimatedActual: number; unreported: number; reportingRate: number };
type HiddenData = { year: number; source: string; crimes: CrimeItem[]; totals: { reported: number; estimatedActual: number; unreported: number; overallReportingRate: number } };

export const metadata: Metadata = {
  title: 'The Crimes Nobody Counts — Hidden Crime Estimates | OpenCrime',
  description: 'For every crime reported to police, 1-3 more go unreported. Using NCVS data, we estimate the true scale of crime in America, including 14+ million unreported crimes.',
  openGraph: {
    title: 'The Crimes Nobody Counts — Hidden Crime Estimates',
    description: 'For every crime reported to police, 1-3 more go unreported. See the true scale of American crime.',
    url: 'https://www.opencrime.us/hidden-crime',
  },
  alternates: { canonical: 'https://www.opencrime.us/hidden-crime' },
};

export default function HiddenCrimePage() {
  const data = loadData<HiddenData>('hidden-crime.json');
  const rapeCrime = data.crimes.find(c => c.crimeType.includes('Rape'));
  const larceny = data.crimes.find(c => c.crimeType.includes('Larceny'));

  const faqItems = [
    { q: 'How do we know about unreported crime?', a: 'The National Crime Victimization Survey (NCVS) surveys ~240,000 people annually about whether they experienced crime AND whether they reported it to police. This gives reliable reporting rates for each crime type.' },
    { q: 'Why don\'t people report crimes?', a: 'Common reasons include: fear of retaliation, believing police won\'t help, feeling the crime wasn\'t important enough, not wanting to deal with the justice system, or not realizing they were victimized.' },
    { q: 'Why is the rape reporting rate so low?', a: 'Only about 22% of rapes/sexual assaults are reported to police. Victims often fear not being believed, retaliation, social stigma, or re-traumatization through the legal process.' },
    { q: 'Does this mean FBI crime data is wrong?', a: 'FBI data only counts reported crimes. It\'s accurate for what it measures but systematically undercounts actual victimization. Think of it as the "tip of the iceberg."' },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Dataset',
        name: 'Hidden Crime Estimates — Unreported Crime in America',
        description: 'Estimated actual crime counts using NCVS reporting rates applied to FBI UCR data.',
        url: 'https://www.opencrime.us/hidden-crime',
        creator: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqItems.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      })}} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Hidden Crime' }]} />

      <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">The Crimes Nobody Counts</h1>
      <p className="text-xl text-gray-600 mb-2">For every crime reported to police, 1-3 more go unreported.</p>
      <p className="text-gray-500 mb-6">FBI crime statistics only capture crimes reported to law enforcement. Using the National Crime Victimization Survey (NCVS), we can estimate how much crime actually happens — and the gap is staggering.</p>

      <ShareButtons title="The Crimes Nobody Counts" />

      <AIOverview insights={[
        `An estimated ${data.totals.unreported.toLocaleString()} crimes went unreported in ${data.year} — that's ${Math.round(data.totals.unreported / data.totals.reported * 10) / 10}x the reported total.`,
        rapeCrime ? `Only ${(rapeCrime.reportingRate * 100).toFixed(0)}% of rapes are reported — an estimated ${rapeCrime.unreported.toLocaleString()} go uncounted each year.` : '',
        larceny ? `Larceny/theft has the lowest reporting rate at ${(larceny.reportingRate * 100).toFixed(0)}%, with ${larceny.unreported.toLocaleString()} estimated unreported cases.` : '',
        `The overall reporting rate is just ${data.totals.overallReportingRate}% — meaning most crime is invisible to official statistics.`,
      ].filter(Boolean)} />

      <HiddenCrimeClient data={data} />

      <section className="mt-12 bg-purple-50 border border-purple-200 rounded-xl p-6">
        <h2 className="font-display text-xl font-bold mb-3">🔍 The Rape Reporting Gap</h2>
        <p className="text-sm text-gray-700 mb-2">Of all major crime types, rape and sexual assault have the <strong>lowest reporting rate at just 22%</strong>. This means:</p>
        {rapeCrime && (
          <ul className="text-sm text-gray-700 list-disc ml-6 space-y-1">
            <li>{rapeCrime.reported.toLocaleString()} rapes were reported to police in {data.year}</li>
            <li>An estimated {rapeCrime.estimatedActual.toLocaleString()} actually occurred</li>
            <li>{rapeCrime.unreported.toLocaleString()} victims never had their crime counted</li>
            <li>Nearly 4 out of 5 rape victims don&apos;t report to police</li>
          </ul>
        )}
      </section>

      <section className="mt-12 bg-gray-50 rounded-xl p-6">
        <h2 className="font-display text-xl font-bold mb-3">Why This Matters</h2>
        <p className="text-sm text-gray-700 mb-2">When we debate crime policy using only reported crime data, we&apos;re looking at a fraction of the picture. Understanding the &quot;dark figure of crime&quot; is essential for:</p>
        <ul className="text-sm text-gray-700 list-disc ml-6 space-y-1">
          <li><strong>Resource allocation:</strong> Areas with low reporting may need more victim services, not fewer</li>
          <li><strong>Trend analysis:</strong> A drop in reported crime could mean less crime OR less reporting</li>
          <li><strong>Comparing cities:</strong> Cities with better victim support may have higher reporting rates, appearing MORE dangerous</li>
          <li><strong>Policy evaluation:</strong> True crime reduction requires looking beyond police reports</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold mb-4">FAQ</h2>
        <div className="space-y-4">
          {faqItems.map((f, i) => (
            <div key={i}>
              <h3 className="font-semibold text-gray-800">{f.q}</h3>
              <p className="text-sm text-gray-600 mt-1">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 pt-8 border-t">
        <h2 className="font-heading text-2xl font-bold mb-4">Related Analysis</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/analysis/crime-myths" className="block border rounded-lg p-4 hover:bg-gray-50 transition">
            <h3 className="font-semibold">Crime Myths Debunked</h3>
            <p className="text-sm text-gray-600">Common misconceptions about crime in America — and what the data actually shows.</p>
          </Link>
          <Link href="/analysis/clearance-rates" className="block border rounded-lg p-4 hover:bg-gray-50 transition">
            <h3 className="font-semibold">Crime Clearance Rates</h3>
            <p className="text-sm text-gray-600">How often do police actually solve crimes? The answer may surprise you.</p>
          </Link>
          <Link href="/crime-rate" className="block border rounded-lg p-4 hover:bg-gray-50 transition">
            <h3 className="font-semibold">US Crime Rate</h3>
            <p className="text-sm text-gray-600">National crime rate trends over time — is crime really going up?</p>
          </Link>
          <Link href="/analysis/women-and-crime" className="block border rounded-lg p-4 hover:bg-gray-50 transition">
            <h3 className="font-semibold">Women and Crime</h3>
            <p className="text-sm text-gray-600">How crime impacts women differently — victimization, reporting, and safety.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
