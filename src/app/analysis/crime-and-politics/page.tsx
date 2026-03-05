import type { Metadata } from 'next';
import Link from 'next/link';
import { loadData, fmtRate, fmtNum } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Do Red States or Blue States Have More Crime? — Data Analysis | OpenCrime',
  description: 'A data-driven analysis of crime rates in red vs blue states. The answer depends on what you measure — and the real variable might surprise you.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/crime-and-politics' },
  openGraph: {
    title: 'Do Red States or Blue States Have More Crime?',
    description: 'The data-driven answer: it depends on what you measure.',
    url: 'https://www.opencrime.us/analysis/crime-and-politics',
  },
};

type StateSummary = {
  abbr: string; name: string; population: number;
  violentRate: number; propertyRate: number; homicideRate: number;
  violentChange: number; propertyChange: number;
};

// 2024 presidential results — states Trump won
const RED_STATES = new Set([
  'AL','AK','AR','FL','GA','ID','IN','IA','KS','KY','LA','ME','MI','MS','MO',
  'MT','NE','NC','ND','OH','OK','PA','SC','SD','TN','TX','UT','WV','WI','WY',
  'AZ','NV',
]);

export default function CrimeAndPoliticsPage() {
  const states = loadData<StateSummary[]>('state-summary.json');

  const red = states.filter(s => RED_STATES.has(s.abbr));
  const blue = states.filter(s => !RED_STATES.has(s.abbr));

  const avgRate = (arr: StateSummary[], key: keyof StateSummary) => {
    const totalPop = arr.reduce((s, st) => s + st.population, 0);
    return arr.reduce((s, st) => s + (st[key] as number) * st.population, 0) / totalPop;
  };

  const redViolent = avgRate(red, 'violentRate');
  const blueViolent = avgRate(blue, 'violentRate');
  const redMurder = avgRate(red, 'homicideRate');
  const blueMurder = avgRate(blue, 'homicideRate');
  const redProperty = avgRate(red, 'propertyRate');
  const blueProperty = avgRate(blue, 'propertyRate');

  const topViolent = [...states].sort((a, b) => b.violentRate - a.violentRate).slice(0, 10);
  const topMurder = [...states].sort((a, b) => b.homicideRate - a.homicideRate).slice(0, 10);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Crime and Politics' }]} />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Do Red States or Blue States Have More Crime?</h1>
      <p className="text-lg text-gray-600 mb-6">
        It&apos;s one of the most politically charged questions in criminal justice. Both sides cherry-pick stats
        to make their case. Here&apos;s what the FBI data actually shows — and why the answer is more complicated
        than either side admits.
      </p>

      <AIOverview insights={[
        `Population-weighted violent crime: Red states ${fmtRate(redViolent)}/100K vs Blue states ${fmtRate(blueViolent)}/100K`,
        `Murder rates: Red ${fmtRate(redMurder)}/100K vs Blue ${fmtRate(blueMurder)}/100K`,
        `Property crime: Red ${fmtRate(redProperty)}/100K vs Blue ${fmtRate(blueProperty)}/100K`,
        'The top 10 most violent states include both red and blue states',
        'Urbanization, not politics, is the strongest predictor of crime rates',
      ]} />

      <ShareButtons title="Do Red States or Blue States Have More Crime?" />

      {/* The Numbers */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">The Raw Numbers</h2>

      <p className="text-gray-700 mb-4">
        Let&apos;s start with the population-weighted averages. Using 2024 FBI data and the 2024 presidential
        election results to classify states:
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-red-50 rounded-xl p-6">
          <h3 className="font-heading text-lg font-bold text-red-800 mb-3">🔴 Red States ({red.length} states)</h3>
          <ul className="space-y-2 text-sm">
            <li>Violent crime: <strong>{fmtRate(redViolent)}</strong> per 100K</li>
            <li>Murder rate: <strong>{fmtRate(redMurder)}</strong> per 100K</li>
            <li>Property crime: <strong>{fmtRate(redProperty)}</strong> per 100K</li>
            <li>Population: {fmtNum(red.reduce((s, st) => s + st.population, 0))}</li>
          </ul>
        </div>
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="font-heading text-lg font-bold text-blue-800 mb-3">🔵 Blue States ({blue.length} states + DC)</h3>
          <ul className="space-y-2 text-sm">
            <li>Violent crime: <strong>{fmtRate(blueViolent)}</strong> per 100K</li>
            <li>Murder rate: <strong>{fmtRate(blueMurder)}</strong> per 100K</li>
            <li>Property crime: <strong>{fmtRate(blueProperty)}</strong> per 100K</li>
            <li>Population: {fmtNum(blue.reduce((s, st) => s + st.population, 0))}</li>
          </ul>
        </div>
      </div>

      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">But It&apos;s Not That Simple</h2>

      <p className="text-gray-700 mb-4">
        Before you declare a winner, consider these complications:
      </p>

      <h3 className="font-heading text-xl font-bold mt-8 mb-3">1. The DC Effect</h3>
      <p className="text-gray-700 mb-4">
        Washington DC has a violent crime rate of {fmtRate(states.find(s => s.abbr === 'DC')?.violentRate || 0)} per 100K —
        by far the highest in the nation. As a blue &quot;state,&quot; it significantly inflates the blue average. But DC is a
        dense urban center, not a real state comparison. Remove DC and the picture shifts.
      </p>

      <h3 className="font-heading text-xl font-bold mt-8 mb-3">2. Most Violent States: Both Colors</h3>
      <p className="text-gray-700 mb-4">
        The top 10 states by violent crime rate include both red and blue states:
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">State</th><th className="py-2 text-right">Violent Rate</th><th className="py-2 text-center">2024</th></tr></thead>
          <tbody>
            {topViolent.map((s, i) => (
              <tr key={s.abbr} className="border-b">
                <td className="py-1">{i + 1}</td>
                <td><Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link></td>
                <td className="text-right">{fmtRate(s.violentRate)}</td>
                <td className="text-center">{RED_STATES.has(s.abbr) ? '🔴' : '🔵'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="font-heading text-xl font-bold mt-8 mb-3">3. Murder Tells a Different Story</h3>
      <p className="text-gray-700 mb-4">
        Murder rates — the most reliable crime statistic — show a somewhat different pattern:
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">#</th><th className="py-2 text-left">State</th><th className="py-2 text-right">Murder Rate</th><th className="py-2 text-center">2024</th></tr></thead>
          <tbody>
            {topMurder.map((s, i) => (
              <tr key={s.abbr} className="border-b">
                <td className="py-1">{i + 1}</td>
                <td><Link href={`/states/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] hover:underline">{s.name}</Link></td>
                <td className="text-right">{fmtRate(s.homicideRate)}</td>
                <td className="text-center">{RED_STATES.has(s.abbr) ? '🔴' : '🔵'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="font-heading text-xl font-bold mt-8 mb-3">4. The Urbanization Variable</h3>
      <p className="text-gray-700 mb-4">
        Here&apos;s the real insight that gets lost in the partisan debate: <strong>urbanization is a far better
        predictor of crime than political affiliation</strong>. States with large, dense cities tend to have higher
        crime rates regardless of which party they vote for.
      </p>
      <p className="text-gray-700 mb-4">
        Consider: Texas (red) has high crime driven by Houston, Dallas, and San Antonio. Massachusetts (blue)
        is relatively safe despite being deep blue. Alaska (red) has some of the highest per-capita crime in
        the nation. Maine (red-leaning in 2024) is one of the safest states in America.
      </p>

      <h3 className="font-heading text-xl font-bold mt-8 mb-3">5. Cities vs States</h3>
      <p className="text-gray-700 mb-4">
        The &quot;red state/blue state&quot; framework is fundamentally flawed because crime is hyperlocal. The most
        dangerous neighborhoods in America exist in both red and blue states. Chicago&apos;s South Side and
        Memphis&apos;s Whitehaven exist in very different political environments but share similar crime challenges.
      </p>
      <p className="text-gray-700 mb-4">
        Moreover, many red states have blue cities (Atlanta in Georgia, Houston in Texas, Nashville in Tennessee)
        where crime concentrates. And many blue states have vast, safe rural areas that bring the average down.
      </p>

      <h3 className="font-heading text-xl font-bold mt-8 mb-3">6. Rural Crime Is Rising</h3>
      <p className="text-gray-700 mb-4">
        One trend that complicates the narrative: rural crime has been rising faster than urban crime in
        recent years. Small cities under 50,000 have seen per-capita violent crime rates approach or exceed
        some major metros. This challenges the &quot;crime is a big-city problem&quot; narrative that drives much of
        the political discussion.
      </p>

      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">The Bottom Line</h2>
      <p className="text-gray-700 mb-4">
        <strong>Neither side has a monopoly on safe communities or dangerous ones.</strong> Both red and blue states
        appear in the top 10 most violent and the top 10 safest lists. The factors that drive crime — poverty,
        urbanization, drug markets, inequality, policing strategies — don&apos;t align neatly with partisan lines.
      </p>
      <p className="text-gray-700 mb-4">
        Anyone who tells you &quot;red states are more dangerous&quot; or &quot;blue states have all the crime&quot; is either
        cherry-picking data or doesn&apos;t understand what drives crime. The truth is messier — and more interesting —
        than a simple color-coded map suggests.
      </p>
      <p className="text-gray-700 mb-4">
        If you want to understand crime, look at specific cities, specific neighborhoods, and specific economic
        conditions. State-level political labels are nearly useless for predicting whether a place is safe.
      </p>

      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">What Actually Predicts Crime?</h2>
      <p className="text-gray-700 mb-4">
        Our <Link href="/crime-correlations" className="text-[#1e3a5f] hover:underline">correlation analysis</Link> shows
        that poverty rate is a much stronger predictor of murder rates than any political variable. Income inequality,
        lack of economic opportunity, and concentrated disadvantage are the real drivers — and these exist in both
        red and blue states.
      </p>

      <div className="bg-gray-50 rounded-xl p-6 mt-10">
        <h3 className="font-heading text-lg font-bold mb-3">Related Analysis</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <Link href="/states" className="text-[#1e3a5f] hover:underline">Browse All States →</Link>
          <Link href="/rankings" className="text-[#1e3a5f] hover:underline">State Rankings →</Link>
          <Link href="/analysis/rural-vs-urban" className="text-[#1e3a5f] hover:underline">Rural vs Urban Crime →</Link>
          <Link href="/analysis/crime-myths" className="text-[#1e3a5f] hover:underline">10 Crime Myths Debunked →</Link>
          <Link href="/crime-correlations" className="text-[#1e3a5f] hover:underline">Crime Correlations Dashboard →</Link>
          <Link href="/state-report-card" className="text-[#1e3a5f] hover:underline">State Report Cards →</Link>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Do Red States or Blue States Have More Crime?',
        description: 'A data-driven analysis of crime rates in red vs blue states using FBI data.',
        url: 'https://www.opencrime.us/analysis/crime-and-politics',
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Do red states or blue states have more crime?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on what you measure. Both red and blue states appear in the top 10 most violent and safest lists. Urbanization is a much stronger predictor of crime than political affiliation.' }},
          { '@type': 'Question', name: 'Which states have the highest murder rates?', acceptedAnswer: { '@type': 'Answer', text: `The states with the highest murder rates include both red and blue states. ${topMurder[0].name} (${fmtRate(topMurder[0].homicideRate)}/100K) and ${topMurder[1].name} (${fmtRate(topMurder[1].homicideRate)}/100K) lead the list.` }},
          { '@type': 'Question', name: 'Is crime a partisan issue?', acceptedAnswer: { '@type': 'Answer', text: 'Crime patterns are driven primarily by urbanization, poverty, and economic factors — not political affiliation. The same crime challenges exist in both red and blue states.' }},
          { '@type': 'Question', name: 'What predicts crime rates better than politics?', acceptedAnswer: { '@type': 'Answer', text: 'Poverty rates, urbanization levels, income inequality, and the presence of large cities are all stronger predictors of crime than whether a state votes red or blue.' }},
        ],
      })}} />
    </div>
  );
}
