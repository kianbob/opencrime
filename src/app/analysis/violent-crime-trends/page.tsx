import RelatedAnalysis from '@/components/RelatedAnalysis';
import type { Metadata } from 'next';
import Link from 'next/link';
import { loadData, fmtRate, fmtNum } from '@/lib/utils';
import type { NationalTrend, CityIndex } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Violent Crime Trends 2025 — Is Crime Going Up or Down? | OpenCrime',
  description: 'Is violent crime rising or falling in 2025? 45 years of FBI data reveal the real trend. Murder is down 35% from 2020, but some crimes are surging. See the full picture.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/violent-crime-trends' },
  openGraph: {
    title: 'Violent Crime Trends 2025 — The Real Numbers',
    description: '45 years of FBI data show whether crime is actually going up or down.',
    url: 'https://www.opencrime.us/analysis/violent-crime-trends',
  },
};

type StateSummary = {
  abbr: string; name: string; population: number;
  violentRate: number; propertyRate: number; homicideRate: number;
  violentChange: number; propertyChange: number;
};

export default function ViolentCrimeTrendsPage() {
  const national = loadData<NationalTrend[]>('national-trends.json');
  const cities = loadData<CityIndex[]>('city-index.json');
  const states = loadData<StateSummary[]>('state-summary.json');

  const n = national[national.length - 1];
  const prev = national[national.length - 2];
  const peak = national.reduce((max, y) => y.violentRate > max.violentRate ? y : max, national[0]);
  const n2020 = national.find(y => y.year === 2020);
  const n2019 = national.find(y => y.year === 2019);
  const n2000 = national.find(y => y.year === 2000);
  const n1990 = national.find(y => y.year === 1990);

  const violentChange = prev ? ((n.violentRate - prev.violentRate) / prev.violentRate * 100) : 0;
  const murderChange = prev ? ((n.homicideRate - prev.homicideRate) / prev.homicideRate * 100) : 0;
  const declineFromPeak = ((peak.violentRate - n.violentRate) / peak.violentRate * 100);
  const murderDeclineFrom2020 = n2020 ? ((n2020.homicideRate - n.homicideRate) / n2020.homicideRate * 100) : 0;

  const assaultRate = n.aggravatedAssault / n.population * 100000;
  const robberyRate = n.robbery / n.population * 100000;
  const rapeRate = n.rape / n.population * 100000;

  const prevAssault = prev ? prev.aggravatedAssault / prev.population * 100000 : assaultRate;
  const assaultChange = ((assaultRate - prevAssault) / prevAssault * 100);

  const improvingStates = states.filter(s => s.violentChange < 0).length;
  const worseningStates = states.filter(s => s.violentChange > 0).length;

  // Decades comparison
  const decades = [
    { label: '1980s Peak', year: peak.year, rate: peak.violentRate },
    n1990 ? { label: '1990', year: 1990, rate: n1990.violentRate } : null,
    n2000 ? { label: '2000', year: 2000, rate: n2000.violentRate } : null,
    n2019 ? { label: '2019 (Pre-COVID)', year: 2019, rate: n2019.violentRate } : null,
    n2020 ? { label: '2020 (COVID)', year: 2020, rate: n2020.violentRate } : null,
    { label: `${n.year} (Latest)`, year: n.year, rate: n.violentRate },
  ].filter(Boolean) as { label: string; year: number; rate: number }[];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Violent Crime Trends 2025' }]} />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Violent Crime Trends 2025: Is Crime Going Up or Down?</h1>
      <p className="text-lg text-gray-600 mb-6">
        It&apos;s the question everyone argues about: is crime getting worse? The answer depends on your
        timeframe. Here&apos;s what 45 years of FBI data actually show — and why the recent trends are
        more complicated than either &quot;crime is surging&quot; or &quot;everything is fine&quot; headlines suggest.
      </p>

      <AIOverview insights={[
        `Violent crime rate: ${fmtRate(n.violentRate)} per 100K — ${violentChange > 0 ? 'up' : 'down'} ${Math.abs(violentChange).toFixed(1)}% from last year`,
        `Down ${declineFromPeak.toFixed(0)}% from the ${peak.year} peak of ${fmtRate(peak.violentRate)} per 100K`,
        `Murder rate down ${murderDeclineFrom2020.toFixed(0)}% since the 2020 COVID spike`,
        `${improvingStates} states saw violent crime decrease vs ${worseningStates} states with increases`,
        `Aggravated assault — 71% of all violent crime — ${assaultChange > 0 ? 'rose' : 'fell'} ${Math.abs(assaultChange).toFixed(1)}% year-over-year`,
        `${fmtNum(n.violentCrime)} total violent crimes reported in ${n.year}`,
      ]} />

      <ShareButtons title="Violent Crime Trends 2025" />

      {/* Headline stats */}
      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{fmtRate(n.violentRate)}</div>
            <div className="text-blue-200 text-sm">{n.year} Violent Rate</div>
          </div>
          <div>
            <div className={`text-3xl font-bold ${violentChange < 0 ? 'text-green-400' : 'text-red-400'}`}>{violentChange > 0 ? '+' : ''}{violentChange.toFixed(1)}%</div>
            <div className="text-blue-200 text-sm">Year-over-Year</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">-{declineFromPeak.toFixed(0)}%</div>
            <div className="text-blue-200 text-sm">From {peak.year} Peak</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtRate(n.homicideRate)}</div>
            <div className="text-blue-200 text-sm">Murder Rate</div>
          </div>
        </div>
      </div>

      {/* The big picture */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">The Big Picture: 45 Years of Violent Crime</h2>
      <p className="text-gray-700 mb-4">
        To understand where we are, you need to see where we&apos;ve been. Here&apos;s how violent crime rates have
        changed across key periods:
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">Period</th><th className="py-2 text-right">Violent Rate</th><th className="py-2 text-right">vs Today</th></tr></thead>
          <tbody>
            {decades.map(d => (
              <tr key={d.year} className="border-b">
                <td className="py-2">{d.label} ({d.year})</td>
                <td className="text-right font-mono">{fmtRate(d.rate)}</td>
                <td className={`text-right font-mono ${d.rate > n.violentRate ? 'text-green-600' : d.rate < n.violentRate ? 'text-red-600' : ''}`}>
                  {d.year !== n.year ? `${d.rate > n.violentRate ? '-' : '+'}${Math.abs(((d.rate - n.violentRate) / d.rate) * 100).toFixed(0)}%` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-gray-700 mb-4">
        The overall trajectory is clear: America is dramatically safer than it was in the early 1990s. The current
        violent crime rate is {declineFromPeak.toFixed(0)}% below the {peak.year} peak. For a deeper dive into
        this remarkable transformation, see our <Link href="/analysis/crime-decline" className="text-[#1e3a5f] hover:underline">Great Crime Decline analysis</Link>.
      </p>

      {/* By crime type */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Breaking It Down by Crime Type</h2>
      <p className="text-gray-700 mb-4">
        &quot;Violent crime&quot; is actually four different offenses, and they don&apos;t all move together:
      </p>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h3 className="font-heading text-lg font-bold mb-2">Murder &amp; Manslaughter</h3>
          <div className="text-3xl font-bold mb-1">{fmtRate(n.homicideRate)}<span className="text-sm text-gray-500"> /100K</span></div>
          <div className={`text-sm ${murderChange < 0 ? 'text-green-600' : 'text-red-600'}`}>{murderChange > 0 ? '+' : ''}{murderChange.toFixed(1)}% year-over-year</div>
          <p className="text-sm text-gray-600 mt-2">{fmtNum(n.homicide)} total murders — the most reliable crime stat because nearly every case gets reported.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h3 className="font-heading text-lg font-bold mb-2">Aggravated Assault</h3>
          <div className="text-3xl font-bold mb-1">{fmtRate(assaultRate)}<span className="text-sm text-gray-500"> /100K</span></div>
          <div className={`text-sm ${assaultChange < 0 ? 'text-green-600' : 'text-red-600'}`}>{assaultChange > 0 ? '+' : ''}{assaultChange.toFixed(1)}% year-over-year</div>
          <p className="text-sm text-gray-600 mt-2">{fmtNum(n.aggravatedAssault)} assaults — makes up ~71% of all violent crime.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h3 className="font-heading text-lg font-bold mb-2">Robbery</h3>
          <div className="text-3xl font-bold mb-1">{fmtRate(robberyRate)}<span className="text-sm text-gray-500"> /100K</span></div>
          <p className="text-sm text-gray-600 mt-2">{fmtNum(n.robbery)} robberies — theft with force or threat of force.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h3 className="font-heading text-lg font-bold mb-2">Rape</h3>
          <div className="text-3xl font-bold mb-1">{fmtRate(rapeRate)}<span className="text-sm text-gray-500"> /100K</span></div>
          <p className="text-sm text-gray-600 mt-2">{fmtNum(n.rape)} reported rapes — heavily underreported; actual numbers estimated 2-3x higher.</p>
        </div>
      </div>

      {/* The COVID effect */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">The COVID Crime Spike — and Recovery</h2>
      <p className="text-gray-700 mb-4">
        {n2020 && n2019 ? <>
          2020 was a dramatic outlier. Murder rates jumped {((n2020.homicideRate - n2019.homicideRate) / n2019.homicideRate * 100).toFixed(0)}%
          in a single year — the largest one-year increase ever recorded. The causes were a perfect storm: pandemic
          disruption, social unrest, police pullbacks, court closures, and economic stress.
        </> : 'The 2020 pandemic caused an unprecedented spike in homicides.'}
      </p>
      <p className="text-gray-700 mb-4">
        The good news: the murder rate has been dropping since. {n2020 ? <>At {fmtRate(n.homicideRate)} per 100K,
        the current rate is down {murderDeclineFrom2020.toFixed(0)}% from the 2020 peak of {fmtRate(n2020.homicideRate)}.</> : ''}
        {' '}However, we haven&apos;t fully returned to pre-pandemic levels in all crime categories, and the recovery
        is uneven across cities.
      </p>

      {/* State trends */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">State-by-State Trends</h2>
      <p className="text-gray-700 mb-4">
        National averages hide enormous variation. {improvingStates} states saw violent crime decrease year-over-year,
        while {worseningStates} saw increases. Here are the extremes:
      </p>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-green-50 rounded-xl p-6">
          <h3 className="font-heading text-lg font-bold text-green-800 mb-3">📉 Biggest Drops</h3>
          <ul className="space-y-1 text-sm">
            {[...states].sort((a, b) => a.violentChange - b.violentChange).slice(0, 5).map(s => (
              <li key={s.abbr}>
                <Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link>: {fmtRate(s.violentChange)}%
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 rounded-xl p-6">
          <h3 className="font-heading text-lg font-bold text-red-800 mb-3">📈 Biggest Increases</h3>
          <ul className="space-y-1 text-sm">
            {[...states].sort((a, b) => b.violentChange - a.violentChange).slice(0, 5).map(s => (
              <li key={s.abbr}>
                <Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link>: +{fmtRate(s.violentChange)}%
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-gray-700 mb-4">
        For a complete state-by-state breakdown, see our <Link href="/analysis/crime-statistics-by-state" className="text-[#1e3a5f] hover:underline">crime statistics by state</Link> analysis or
        use the <Link href="/compare-states" className="text-[#1e3a5f] hover:underline">state comparison tool</Link>.
      </p>

      {/* What's driving the trends */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">What&apos;s Driving Current Trends?</h2>
      <p className="text-gray-700 mb-4">
        Criminologists point to several factors shaping current crime patterns:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
        <li><strong>Post-COVID recovery:</strong> Courts, social services, and community programs disrupted during the pandemic are rebuilding, contributing to the murder rate decline.</li>
        <li><strong>Police staffing:</strong> Many departments face a <Link href="/analysis/police-staffing-crisis" className="text-[#1e3a5f] hover:underline">severe staffing crisis</Link>, with fewer officers per capita than at any point in decades.</li>
        <li><strong>Fentanyl:</strong> The <Link href="/analysis/fentanyl-crisis" className="text-[#1e3a5f] hover:underline">fentanyl crisis</Link> continues to fuel drug-related violence in many cities.</li>
        <li><strong>Technology:</strong> Better surveillance, data-driven policing, and community violence intervention programs are showing results in some cities.</li>
        <li><strong>Property crime shifts:</strong> <Link href="/analysis/car-theft-crisis" className="text-[#1e3a5f] hover:underline">Car thefts</Link> and <Link href="/analysis/organized-retail-theft" className="text-[#1e3a5f] hover:underline">organized retail theft</Link> have surged even as some violent crimes declined.</li>
      </ul>

      {/* Bottom line */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">The Bottom Line</h2>
      <p className="text-gray-700 mb-4">
        If someone tells you &quot;crime is out of control,&quot; they&apos;re wrong by the data — we&apos;re still
        far below the terrible peaks of the early 1990s. If someone tells you &quot;crime is fine,&quot; they&apos;re
        also wrong — the 2020 spike was real, the recovery is incomplete, and certain crime categories remain
        stubbornly high.
      </p>
      <p className="text-gray-700 mb-4">
        The truth is nuanced: the long-term trend is strongly positive, the recent COVID disruption was severe
        but fading, and the picture varies enormously by city, state, and crime type. Anyone claiming a simple
        answer is selling you a narrative, not showing you the data.
      </p>

      <div className="bg-gray-50 rounded-xl p-6 mt-10">
        <h3 className="font-heading text-lg font-bold mb-3">Keep Exploring</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <Link href="/violent-crime" className="text-[#1e3a5f] hover:underline">Violent Crime Statistics →</Link>
          <Link href="/analysis/crime-decline" className="text-[#1e3a5f] hover:underline">The Great Crime Decline →</Link>
          <Link href="/years" className="text-[#1e3a5f] hover:underline">Crime by Year →</Link>
          <Link href="/analysis/crime-statistics-by-state" className="text-[#1e3a5f] hover:underline">Crime by State →</Link>
          <Link href="/most-dangerous-cities" className="text-[#1e3a5f] hover:underline">Most Dangerous Cities →</Link>
          <Link href="/analysis/seasonal-crime" className="text-[#1e3a5f] hover:underline">Seasonal Crime Patterns →</Link>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Violent Crime Trends 2025: Is Crime Going Up or Down?',
        description: '45 years of FBI data reveal the real violent crime trend in America.',
        url: 'https://www.opencrime.us/analysis/violent-crime-trends',
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Is violent crime going up or down in 2025?', acceptedAnswer: { '@type': 'Answer', text: `The violent crime rate is ${fmtRate(n.violentRate)} per 100,000 — ${violentChange < 0 ? 'down' : 'up'} ${Math.abs(violentChange).toFixed(1)}% from the previous year and ${declineFromPeak.toFixed(0)}% below the ${peak.year} peak.` }},
          { '@type': 'Question', name: 'Is the murder rate dropping?', acceptedAnswer: { '@type': 'Answer', text: `Yes. The murder rate has fallen ${murderDeclineFrom2020.toFixed(0)}% since the 2020 COVID spike and is now at ${fmtRate(n.homicideRate)} per 100,000.` }},
          { '@type': 'Question', name: 'What caused the 2020 crime spike?', acceptedAnswer: { '@type': 'Answer', text: 'A combination of pandemic disruption, social unrest, police pullbacks, court closures, and economic stress led to a record one-year increase in murder rates.' }},
          { '@type': 'Question', name: 'How does current crime compare to the 1990s?', acceptedAnswer: { '@type': 'Answer', text: `Today\'s violent crime rate of ${fmtRate(n.violentRate)} per 100K is ${declineFromPeak.toFixed(0)}% below the ${peak.year} peak of ${fmtRate(peak.violentRate)} per 100K.` }},
        ],
      })}} />

      <RelatedAnalysis currentSlug="violent-crime-trends" />
    </div>
  );
}
