import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { StateSummary } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type StateTrend = { abbr: string; name: string; years: { year: number; violentRate: number; propertyRate: number; homicideRate: number; population: number; violentCrime: number; propertyCrime: number }[] };

const COMPARISONS: Record<string, { state1: string; state2: string; abbr1: string; abbr2: string }> = {
  'california-vs-texas': { state1: 'California', state2: 'Texas', abbr1: 'CA', abbr2: 'TX' },
  'new-york-vs-florida': { state1: 'New York', state2: 'Florida', abbr1: 'NY', abbr2: 'FL' },
  'illinois-vs-ohio': { state1: 'Illinois', state2: 'Ohio', abbr1: 'IL', abbr2: 'OH' },
  'california-vs-florida': { state1: 'California', state2: 'Florida', abbr1: 'CA', abbr2: 'FL' },
  'texas-vs-florida': { state1: 'Texas', state2: 'Florida', abbr1: 'TX', abbr2: 'FL' },
  'new-york-vs-california': { state1: 'New York', state2: 'California', abbr1: 'NY', abbr2: 'CA' },
  'pennsylvania-vs-ohio': { state1: 'Pennsylvania', state2: 'Ohio', abbr1: 'PA', abbr2: 'OH' },
  'georgia-vs-north-carolina': { state1: 'Georgia', state2: 'North Carolina', abbr1: 'GA', abbr2: 'NC' },
  'washington-vs-oregon': { state1: 'Washington', state2: 'Oregon', abbr1: 'WA', abbr2: 'OR' },
  'arizona-vs-nevada': { state1: 'Arizona', state2: 'Nevada', abbr1: 'AZ', abbr2: 'NV' },
};

export async function generateStaticParams() {
  return Object.keys(COMPARISONS).map(slug => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comp = COMPARISONS[slug];
  if (!comp) return {};
  return {
    title: `${comp.state1} vs ${comp.state2} Crime Rates — Which State Is Safer? (2024)`,
    description: `Compare crime rates between ${comp.state1} and ${comp.state2}. Side-by-side violent crime, property crime, homicide rates, and historical trends.`,
    alternates: { canonical: `https://www.opencrime.us/compare-states/${slug}` },
    openGraph: {
      title: `${comp.state1} vs ${comp.state2} Crime Comparison`,
      description: `Which is safer: ${comp.state1} or ${comp.state2}? Full crime rate comparison with FBI data.`,
      url: `https://www.opencrime.us/compare-states/${slug}`,
    },
  };
}

export default async function CompareStatesPage({ params }: Props) {
  const { slug } = await params;
  const comp = COMPARISONS[slug];
  if (!comp) notFound();

  const states = loadData<StateSummary[]>('state-summary.json');
  const trends = loadData<StateTrend[]>('state-trends.json');

  const s1 = states.find(s => s.abbr === comp.abbr1);
  const s2 = states.find(s => s.abbr === comp.abbr2);
  if (!s1 || !s2) notFound();

  const t1 = trends.find(t => t.abbr === comp.abbr1);
  const t2 = trends.find(t => t.abbr === comp.abbr2);

  // Get recent trend years (last 10)
  const recentYears1 = t1?.years.slice(-10) ?? [];
  const recentYears2 = t2?.years.slice(-10) ?? [];

  const winner = s1.violentRate < s2.violentRate ? comp.state1 : comp.state2;
  const loser = winner === comp.state1 ? comp.state2 : comp.state1;
  const winnerData = winner === comp.state1 ? s1 : s2;
  const loserData = winner === comp.state1 ? s2 : s1;

  const aiInsights = [
    `${winner} has a lower violent crime rate (${fmtRate(winnerData.violentRate)}) than ${loser} (${fmtRate(loserData.violentRate)}) per 100K`,
    `${comp.state1} population: ${fmtNum(s1.population)} | ${comp.state2}: ${fmtNum(s2.population)}`,
    `Homicide rate: ${comp.state1} ${fmtRate(s1.homicideRate)} vs ${comp.state2} ${fmtRate(s2.homicideRate)} per 100K`,
    `Property crime: ${comp.state1} ${fmtRate(s1.propertyRate)} vs ${comp.state2} ${fmtRate(s2.propertyRate)} per 100K`,
  ];

  const verdict = `Based on ${s1.year} FBI data, **${winner}** has a lower violent crime rate at ${fmtRate(winnerData.violentRate)} per 100,000 compared to ${loser}'s ${fmtRate(loserData.violentRate)}. ${s1.propertyRate < s2.propertyRate ? comp.state1 : comp.state2} has lower property crime. However, crime varies enormously within each state — some cities in the "safer" state may be more dangerous than most cities in the other.`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Compare States', href: '/compare-states' }, { label: `${comp.state1} vs ${comp.state2}` }]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
        {comp.state1} vs {comp.state2}: Crime Rate Comparison ({s1.year})
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Side-by-side crime comparison between {comp.state1} and {comp.state2} using FBI data.
      </p>

      <AIOverview insights={aiInsights} />

      {/* Side-by-Side Comparison */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">Crime Rate Comparison</h2>
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Metric</th>
                <th className="text-right p-3 font-semibold">{comp.state1}</th>
                <th className="text-right p-3 font-semibold">{comp.state2}</th>
                <th className="text-right p-3 font-semibold">Safer</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Population', v1: fmtNum(s1.population), v2: fmtNum(s2.population), winner: '' },
                { label: 'Violent Crime Rate', v1: fmtRate(s1.violentRate), v2: fmtRate(s2.violentRate), winner: s1.violentRate < s2.violentRate ? comp.state1 : comp.state2 },
                { label: 'Homicide Rate', v1: fmtRate(s1.homicideRate), v2: fmtRate(s2.homicideRate), winner: s1.homicideRate < s2.homicideRate ? comp.state1 : comp.state2 },
                { label: 'Property Crime Rate', v1: fmtRate(s1.propertyRate), v2: fmtRate(s2.propertyRate), winner: s1.propertyRate < s2.propertyRate ? comp.state1 : comp.state2 },
                { label: 'Total Violent Crimes', v1: fmtNum(s1.violentCrime), v2: fmtNum(s2.violentCrime), winner: '' },
                { label: 'Total Property Crimes', v1: fmtNum(s1.propertyCrime), v2: fmtNum(s2.propertyCrime), winner: '' },
                { label: 'Violent Crime Change', v1: s1.violentChange != null ? `${s1.violentChange > 0 ? '+' : ''}${s1.violentChange.toFixed(1)}%` : '—', v2: s2.violentChange != null ? `${s2.violentChange > 0 ? '+' : ''}${s2.violentChange.toFixed(1)}%` : '—', winner: (s1.violentChange ?? 0) < (s2.violentChange ?? 0) ? comp.state1 : comp.state2 },
              ].map(row => (
                <tr key={row.label} className="border-t">
                  <td className="p-3 font-medium">{row.label}</td>
                  <td className={`text-right p-3 ${row.winner === comp.state1 ? 'text-green-600 font-bold' : ''}`}>{row.v1}</td>
                  <td className={`text-right p-3 ${row.winner === comp.state2 ? 'text-green-600 font-bold' : ''}`}>{row.v2}</td>
                  <td className="text-right p-3 text-xs">{row.winner ? `✓ ${row.winner}` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Historical Trend Table */}
      {recentYears1.length > 0 && recentYears2.length > 0 && (
        <section className="mb-10">
          <h2 className="font-heading text-2xl font-bold mb-4">Historical Violent Crime Trend</h2>
          <div className="bg-white rounded-xl border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-semibold">Year</th>
                  <th className="text-right p-3 font-semibold">{comp.state1} Rate</th>
                  <th className="text-right p-3 font-semibold">{comp.state2} Rate</th>
                </tr>
              </thead>
              <tbody>
                {recentYears1.map((y1, i) => {
                  const y2 = recentYears2.find(y => y.year === y1.year);
                  if (!y2) return null;
                  return (
                    <tr key={y1.year} className="border-t">
                      <td className="p-3">{y1.year}</td>
                      <td className={`text-right p-3 ${y1.violentRate < (y2?.violentRate ?? 0) ? 'text-green-600' : 'text-red-600'}`}>{fmtRate(y1.violentRate)}</td>
                      <td className={`text-right p-3 ${(y2?.violentRate ?? 0) < y1.violentRate ? 'text-green-600' : 'text-red-600'}`}>{fmtRate(y2?.violentRate ?? 0)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Verdict */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">Verdict: Which State Is Safer?</h2>
        <div className="bg-gray-50 rounded-xl border p-6">
          <p className="text-gray-800 text-lg">{verdict}</p>
          <div className="mt-4 flex gap-3">
            <Link href={`/states/${comp.abbr1.toLowerCase()}`} className="text-sm text-[#1e3a5f] font-semibold hover:underline">
              {comp.state1} Crime Profile →
            </Link>
            <Link href={`/states/${comp.abbr2.toLowerCase()}`} className="text-sm text-[#1e3a5f] font-semibold hover:underline">
              {comp.state2} Crime Profile →
            </Link>
          </div>
        </div>
      </section>

      <ShareButtons title={`${comp.state1} vs ${comp.state2} Crime Comparison`} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: `${comp.state1} vs ${comp.state2} Crime Rate Comparison`,
        description: `Side-by-side crime rate comparison between ${comp.state1} and ${comp.state2}`,
        url: `https://www.opencrime.us/compare-states/${slug}`,
        creator: { '@type': 'Organization', name: 'OpenCrime' },
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: `Is ${comp.state1} safer than ${comp.state2}?`, acceptedAnswer: { '@type': 'Answer', text: `Based on violent crime rates, ${winner} has a lower rate (${fmtRate(winnerData.violentRate)}) than ${loser} (${fmtRate(loserData.violentRate)}) per 100,000 residents.` }},
          { '@type': 'Question', name: `What is the crime rate in ${comp.state1} vs ${comp.state2}?`, acceptedAnswer: { '@type': 'Answer', text: `${comp.state1}: violent crime rate ${fmtRate(s1.violentRate)}, property crime rate ${fmtRate(s1.propertyRate)} per 100K. ${comp.state2}: violent crime rate ${fmtRate(s2.violentRate)}, property crime rate ${fmtRate(s2.propertyRate)} per 100K.` }},
          { '@type': 'Question', name: `Which state has more murders, ${comp.state1} or ${comp.state2}?`, acceptedAnswer: { '@type': 'Answer', text: `${comp.state1} homicide rate: ${fmtRate(s1.homicideRate)} per 100K. ${comp.state2}: ${fmtRate(s2.homicideRate)} per 100K. ${s1.homicideRate < s2.homicideRate ? comp.state1 : comp.state2} has the lower homicide rate.` }},
        ],
      })}} />
    </div>
  );
}
