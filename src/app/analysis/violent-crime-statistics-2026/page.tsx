import RelatedAnalysis from '@/components/RelatedAnalysis';
import type { Metadata } from 'next';
import Link from 'next/link';
import { loadData, fmtRate, fmtNum } from '@/lib/utils';
import type { NationalTrend } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Violent Crime Statistics 2026 — Murder, Assault, Robbery & Rape Data | OpenCrime',
  description: 'Complete breakdown of violent crime in the US for 2026. Aggravated assault makes up 71% of all violent crime. Murder down 35% since 2020. See 45 years of FBI data and trends.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/violent-crime-statistics-2026' },
  openGraph: {
    title: 'Violent Crime Statistics 2026 — The Complete Picture',
    description: 'Murder, assault, robbery, and rape statistics with 45 years of trend data.',
    url: 'https://www.opencrime.us/analysis/violent-crime-statistics-2026',
  },
};

export default function ViolentCrimeStatistics2026Page() {
  const national = loadData<NationalTrend[]>('national-trends.json');
  const n = national[national.length - 1];
  const prev = national[national.length - 2];
  const peak = national.reduce((max, y) => y.violentRate > max.violentRate ? y : max, national[0]);
  const n2020 = national.find(y => y.year === 2020);
  const n2000 = national.find(y => y.year === 2000);
  const n1990 = national.find(y => y.year === 1990);

  const violentChange = prev ? ((n.violentRate - prev.violentRate) / prev.violentRate * 100) : 0;
  const murderChange = prev ? ((n.homicideRate - prev.homicideRate) / prev.homicideRate * 100) : 0;
  const declineFromPeak = ((peak.violentRate - n.violentRate) / peak.violentRate * 100);
  const murderDeclineFrom2020 = n2020 ? ((n2020.homicideRate - n.homicideRate) / n2020.homicideRate * 100) : 0;

  const assaultRate = n.aggravatedAssault / n.population * 100000;
  const robberyRate = n.robbery / n.population * 100000;
  const rapeRate = n.rape / n.population * 100000;

  const assaultPct = n.aggravatedAssault / n.violentCrime * 100;
  const robberyPct = n.robbery / n.violentCrime * 100;
  const rapePct = n.rape / n.violentCrime * 100;
  const murderPct = n.homicide / n.violentCrime * 100;

  // Historical decades
  const decades = [1980, 1990, 2000, 2010, 2020].map(yr => national.find(y => y.year === yr)).filter(Boolean) as NationalTrend[];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Violent Crime Statistics 2026' }]} />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Violent Crime Statistics 2026: The Complete Picture</h1>
      <p className="text-lg text-gray-600 mb-6">
        A deep dive into violent crime in the United States — breaking down murder, aggravated assault,
        robbery, and rape using the latest FBI data. Where are we now, and how did we get here?
      </p>

      <AIOverview insights={[
        `${fmtNum(n.violentCrime)} violent crimes reported — a rate of ${fmtRate(n.violentRate)} per 100K`,
        `Violent crime is ${violentChange < 0 ? 'down' : 'up'} ${Math.abs(violentChange).toFixed(1)}% from the previous year`,
        `Down ${declineFromPeak.toFixed(0)}% from the ${peak.year} peak of ${fmtRate(peak.violentRate)} per 100K`,
        `Aggravated assault dominates at ${assaultPct.toFixed(0)}% of all violent crime`,
        `${fmtNum(n.homicide)} murders recorded — a rate of ${fmtRate(n.homicideRate)} per 100K`,
        n2020 ? `Murder rate down ${murderDeclineFrom2020.toFixed(0)}% since the 2020 spike` : '',
      ].filter(Boolean)} />

      <ShareButtons title="Violent Crime Statistics 2026" />

      {/* Key stats dashboard */}
      <div className="bg-red-900 text-white rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div>
            <div className="text-2xl md:text-3xl font-bold">{fmtNum(n.violentCrime)}</div>
            <div className="text-red-200 text-sm">Total Violent Crimes</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold">{fmtRate(n.violentRate)}</div>
            <div className="text-red-200 text-sm">Rate per 100K</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold">{fmtNum(n.homicide)}</div>
            <div className="text-red-200 text-sm">Murders</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold">{fmtNum(n.aggravatedAssault)}</div>
            <div className="text-red-200 text-sm">Assaults</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-green-400">-{declineFromPeak.toFixed(0)}%</div>
            <div className="text-red-200 text-sm">Since {peak.year} Peak</div>
          </div>
        </div>
      </div>

      {/* Breakdown by type */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Violent Crime Breakdown by Category</h2>
      <p className="text-gray-700 mb-4">
        The FBI classifies four offenses as violent crime. Here&apos;s how they break down:
      </p>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h3 className="font-heading text-lg font-bold mb-2">🔪 Aggravated Assault</h3>
          <div className="text-3xl font-bold text-red-600 mb-1">{fmtNum(n.aggravatedAssault)}</div>
          <div className="text-sm text-gray-600 mb-2">{fmtRate(assaultRate)} per 100K · {assaultPct.toFixed(1)}% of violent crime</div>
          <p className="text-sm text-gray-500">Attack with a weapon or intent to cause serious bodily harm. By far the most common violent crime.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h3 className="font-heading text-lg font-bold mb-2">🔫 Robbery</h3>
          <div className="text-3xl font-bold text-red-600 mb-1">{fmtNum(n.robbery)}</div>
          <div className="text-sm text-gray-600 mb-2">{fmtRate(robberyRate)} per 100K · {robberyPct.toFixed(1)}% of violent crime</div>
          <p className="text-sm text-gray-500">Taking property by force or threat of force. Distinct from burglary (property crime) because it involves a victim.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h3 className="font-heading text-lg font-bold mb-2">⚠️ Rape</h3>
          <div className="text-3xl font-bold text-red-600 mb-1">{fmtNum(n.rape)}</div>
          <div className="text-sm text-gray-600 mb-2">{fmtRate(rapeRate)} per 100K · {rapePct.toFixed(1)}% of violent crime</div>
          <p className="text-sm text-gray-500">The most underreported violent crime — estimated that only ~25% of rapes are reported to police.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h3 className="font-heading text-lg font-bold mb-2">💀 Murder</h3>
          <div className="text-3xl font-bold text-red-600 mb-1">{fmtNum(n.homicide)}</div>
          <div className="text-sm text-gray-600 mb-2">{fmtRate(n.homicideRate)} per 100K · {murderPct.toFixed(1)}% of violent crime</div>
          <p className="text-sm text-gray-500">The least common but most reliably reported violent crime. Nearly every homicide is recorded.</p>
        </div>
      </div>

      {/* Historical trends */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">45 Years of Violent Crime Trends</h2>
      <p className="text-gray-700 mb-4">
        Despite what many Americans believe, violent crime has been on a long-term decline since the early 1990s.
        The current rate of {fmtRate(n.violentRate)} per 100K is {declineFromPeak.toFixed(0)}% below
        the {peak.year} peak of {fmtRate(peak.violentRate)}.
      </p>
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-left">Year</th><th className="py-2 text-right">Violent Rate</th><th className="py-2 text-right">Murder Rate</th><th className="py-2 text-right">Violent Crimes</th><th className="py-2 text-right">Murders</th></tr></thead>
          <tbody>
            {decades.map(d => (
              <tr key={d.year} className="border-b">
                <td className="py-1 font-bold">{d.year}</td>
                <td className="text-right font-mono">{fmtRate(d.violentRate)}</td>
                <td className="text-right font-mono">{fmtRate(d.homicideRate)}</td>
                <td className="text-right font-mono">{fmtNum(d.violentCrime)}</td>
                <td className="text-right font-mono">{fmtNum(d.homicide)}</td>
              </tr>
            ))}
            <tr className="border-b bg-blue-50 font-bold">
              <td className="py-1">{n.year}</td>
              <td className="text-right font-mono">{fmtRate(n.violentRate)}</td>
              <td className="text-right font-mono">{fmtRate(n.homicideRate)}</td>
              <td className="text-right font-mono">{fmtNum(n.violentCrime)}</td>
              <td className="text-right font-mono">{fmtNum(n.homicide)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Murder deep dive */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Murder: The Most Reliable Crime Metric</h2>
      <p className="text-gray-700 mb-4">
        Murder is the gold standard of crime statistics because it&apos;s nearly impossible to underreport — a body
        demands investigation. In {n.year}, {fmtNum(n.homicide)} people were murdered in the United States,
        a rate of {fmtRate(n.homicideRate)} per 100,000 residents.
      </p>
      <p className="text-gray-700 mb-4">
        {murderChange < 0 ? `That's a ${Math.abs(murderChange).toFixed(1)}% decline from the previous year.` : `That's a ${murderChange.toFixed(1)}% increase from the previous year.`}
        {n2020 && ` Since the 2020 spike (when the murder rate hit ${fmtRate(n2020.homicideRate)} per 100K), the rate has fallen ${murderDeclineFrom2020.toFixed(0)}%.`}
      </p>
      <p className="text-gray-700 mb-4">
        For more on homicide patterns, see our <Link href="/analysis/homicide-in-america" className="text-[#1e3a5f] hover:underline">Homicide in America</Link> deep
        dive and <Link href="/analysis/gun-violence" className="text-[#1e3a5f] hover:underline">gun violence analysis</Link>.
      </p>

      {/* Aggravated assault */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Aggravated Assault: The Dominant Category</h2>
      <p className="text-gray-700 mb-4">
        Aggravated assault accounts for {assaultPct.toFixed(0)}% of all violent crime — more than robbery, rape,
        and murder combined. There were {fmtNum(n.aggravatedAssault)} aggravated assaults in {n.year},
        a rate of {fmtRate(assaultRate)} per 100,000.
      </p>
      <p className="text-gray-700 mb-4">
        What distinguishes aggravated assault from simple assault is the use of a weapon or the intent to cause
        serious bodily injury. Firearms, knives, and blunt objects are the most common weapons. Many aggravated
        assaults occur between people who know each other — domestic violence, bar fights, and neighbor disputes.
      </p>

      {/* Robbery trends */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Robbery Trends</h2>
      <p className="text-gray-700 mb-4">
        Robbery — taking property by force or threat of force — is unique among violent crimes because it has
        both a personal violence component and a financial motive. There were {fmtNum(n.robbery)} robberies
        in {n.year}, at a rate of {fmtRate(robberyRate)} per 100,000.
      </p>
      <p className="text-gray-700 mb-4">
        Robbery has declined significantly over the past two decades as cash transactions decrease, surveillance
        technology improves, and urban policing strategies have evolved. However, certain types of robbery — particularly
        street robberies and carjackings — have seen recent upticks in some cities.
      </p>

      {/* Underreporting */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">The Underreporting Problem</h2>
      <p className="text-gray-700 mb-4">
        FBI data only captures crimes reported to law enforcement. The Bureau of Justice Statistics&apos; National Crime
        Victimization Survey estimates that roughly 42% of violent crimes go unreported. The gap is especially
        large for:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
        <li><strong>Rape and sexual assault:</strong> Only about 25% reported — the most underreported violent crime.</li>
        <li><strong>Simple assault:</strong> Many victims don&apos;t consider it worth reporting, especially domestic incidents.</li>
        <li><strong>Robbery:</strong> Small-value thefts, especially from younger victims, often go unreported.</li>
        <li><strong>Murder:</strong> Nearly 100% reported — the only crime category with minimal underreporting.</li>
      </ul>
      <p className="text-gray-700 mb-4">
        This means the real number of violent crimes is likely closer to {fmtNum(Math.round(n.violentCrime / 0.58))} — nearly
        double the reported figure. This has major implications for understanding the true scope of violence in America.
      </p>

      {/* Year-over-year */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Year-Over-Year Changes</h2>
      <p className="text-gray-700 mb-4">
        Comparing the most recent year to the previous year:
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className={`rounded-xl p-4 text-center ${violentChange < 0 ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className={`text-2xl font-bold ${violentChange < 0 ? 'text-green-700' : 'text-red-700'}`}>{violentChange > 0 ? '+' : ''}{violentChange.toFixed(1)}%</div>
          <div className="text-sm text-gray-600">Violent Crime</div>
        </div>
        <div className={`rounded-xl p-4 text-center ${murderChange < 0 ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className={`text-2xl font-bold ${murderChange < 0 ? 'text-green-700' : 'text-red-700'}`}>{murderChange > 0 ? '+' : ''}{murderChange.toFixed(1)}%</div>
          <div className="text-sm text-gray-600">Murder</div>
        </div>
        {prev && (
          <>
            <div className={`rounded-xl p-4 text-center ${(assaultRate - (prev.aggravatedAssault / prev.population * 100000)) < 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className={`text-2xl font-bold ${(assaultRate - (prev.aggravatedAssault / prev.population * 100000)) < 0 ? 'text-green-700' : 'text-red-700'}`}>
                {((assaultRate - (prev.aggravatedAssault / prev.population * 100000)) / (prev.aggravatedAssault / prev.population * 100000) * 100) > 0 ? '+' : ''}
                {((assaultRate - (prev.aggravatedAssault / prev.population * 100000)) / (prev.aggravatedAssault / prev.population * 100000) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Assault</div>
            </div>
            <div className={`rounded-xl p-4 text-center ${(robberyRate - (prev.robbery / prev.population * 100000)) < 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className={`text-2xl font-bold ${(robberyRate - (prev.robbery / prev.population * 100000)) < 0 ? 'text-green-700' : 'text-red-700'}`}>
                {((robberyRate - (prev.robbery / prev.population * 100000)) / (prev.robbery / prev.population * 100000) * 100) > 0 ? '+' : ''}
                {((robberyRate - (prev.robbery / prev.population * 100000)) / (prev.robbery / prev.population * 100000) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Robbery</div>
            </div>
          </>
        )}
      </div>

      {/* What drives violent crime */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">What Drives Violent Crime?</h2>
      <p className="text-gray-700 mb-4">
        Research consistently identifies several key drivers of violent crime:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
        <li><strong>Poverty and inequality:</strong> The <Link href="/analysis/crime-and-poverty" className="text-[#1e3a5f] hover:underline">poverty-crime link</Link> is one of the strongest predictors. Areas of concentrated poverty see dramatically higher rates.</li>
        <li><strong>Drug markets:</strong> The <Link href="/analysis/drug-crime" className="text-[#1e3a5f] hover:underline">drug-crime connection</Link> drives a significant portion of violence, from territorial disputes to robbery for drug money.</li>
        <li><strong>Firearms access:</strong> The US has far higher rates of <Link href="/analysis/gun-violence" className="text-[#1e3a5f] hover:underline">gun violence</Link> than peer nations, with firearms involved in 77% of homicides.</li>
        <li><strong>Policing levels:</strong> <Link href="/analysis/police-staffing-crisis" className="text-[#1e3a5f] hover:underline">Police staffing declines</Link> correlate with increases in certain crime categories.</li>
        <li><strong>Demographics:</strong> Crime peaks in the 18-24 age group. Areas with larger young male populations tend to have higher rates.</li>
        <li><strong>Seasonal patterns:</strong> <Link href="/analysis/seasonal-crime" className="text-[#1e3a5f] hover:underline">Violent crime peaks in summer</Link> — warmer weather increases outdoor activity and interpersonal conflict.</li>
      </ul>

      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">The Perception Gap</h2>
      <p className="text-gray-700 mb-4">
        Despite violent crime being near historic lows, roughly 78% of Americans tell Gallup they believe crime
        is rising nationally. This perception gap is driven by media coverage that emphasizes dramatic incidents,
        social media amplification, and the natural human tendency to remember threats more than safety.
      </p>
      <p className="text-gray-700 mb-4">
        The data tells a different story: Americans are safer from violent crime today than at almost any point
        in the last 50 years. That doesn&apos;t mean crime isn&apos;t a real problem in specific communities — it is.
        But the national trend is unmistakably downward.
      </p>

      <div className="bg-gray-50 rounded-xl p-6 mt-10">
        <h3 className="font-heading text-lg font-bold mb-3">Explore More</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <Link href="/analysis/violent-crime-trends" className="text-[#1e3a5f] hover:underline">Violent Crime Trends →</Link>
          <Link href="/analysis/crime-decline" className="text-[#1e3a5f] hover:underline">The Great Crime Decline →</Link>
          <Link href="/analysis/homicide-in-america" className="text-[#1e3a5f] hover:underline">Homicide in America →</Link>
          <Link href="/analysis/gun-violence" className="text-[#1e3a5f] hover:underline">Gun Violence by the Numbers →</Link>
          <Link href="/analysis/most-dangerous-cities-2026" className="text-[#1e3a5f] hover:underline">Most Dangerous Cities 2026 →</Link>
          <Link href="/analysis/crime-rates-by-state-2026" className="text-[#1e3a5f] hover:underline">Crime Rates by State 2026 →</Link>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Violent Crime Statistics 2026 — The Complete Picture',
        description: 'Complete breakdown of violent crime in the US including murder, assault, robbery, and rape trends.',
        url: 'https://www.opencrime.us/analysis/violent-crime-statistics-2026',
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How many violent crimes happen in the US each year?', acceptedAnswer: { '@type': 'Answer', text: `${fmtNum(n.violentCrime)} violent crimes were reported in ${n.year}, a rate of ${fmtRate(n.violentRate)} per 100,000 residents. The actual number is estimated to be nearly double due to underreporting.` }},
          { '@type': 'Question', name: 'What is the most common violent crime?', acceptedAnswer: { '@type': 'Answer', text: `Aggravated assault is by far the most common, accounting for ${assaultPct.toFixed(0)}% of all violent crime. Robbery is second at ${robberyPct.toFixed(0)}%, followed by rape at ${rapePct.toFixed(0)}% and murder at ${murderPct.toFixed(0)}%.` }},
          { '@type': 'Question', name: 'Is violent crime increasing or decreasing?', acceptedAnswer: { '@type': 'Answer', text: `Violent crime is ${violentChange < 0 ? 'decreasing' : 'increasing'} — ${violentChange < 0 ? 'down' : 'up'} ${Math.abs(violentChange).toFixed(1)}% year-over-year and down ${declineFromPeak.toFixed(0)}% from the ${peak.year} peak.` }},
        ],
      })}} />

      <RelatedAnalysis currentSlug="violent-crime-statistics-2026" />
    </div>
  );
}
