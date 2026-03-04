import { Metadata } from 'next';
import { loadData, fmtNum } from '@/lib/utils';
import type { Analytics, CityIndex } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import ConcentrationCharts from './ConcentrationCharts';

export const metadata: Metadata = {
  title: 'Violence Concentration — Where Murder Concentrates in America | OpenCrime',
  description: 'Just 10 cities account for 21% of all murders while holding 11% of the population. Explore how violent crime concentrates in a tiny fraction of American cities.',
  openGraph: {
    title: 'Violence Concentration — Where Murder Really Happens',
    description: '10 cities produce 21% of murders. 50 cities produce nearly half. The data tells a stark story.',
    url: 'https://www.opencrime.us/violence-concentration',
  },
  alternates: { canonical: 'https://www.opencrime.us/violence-concentration' },
};

export default function ViolenceConcentrationPage() {
  const analytics = loadData<Analytics>('analytics.json');
  const cities = loadData<CityIndex[]>('city-index.json');
  const { concentration } = analytics;

  // Build cumulative distribution
  const large = cities.filter(c => c.population >= 100000).sort((a, b) => b.murder - a.murder);
  const totalMurders = concentration.totalCityMurders;

  let cumMurders = 0;
  const cumulative = large.slice(0, 100).map((c, i) => {
    cumMurders += c.murder;
    return { rank: i + 1, city: c.city, state: c.state, murders: c.murder, cumPct: Math.round(cumMurders / totalMurders * 1000) / 10 };
  });

  // States by murder concentration
  const stateMap: Record<string, { murders: number; pop: number }> = {};
  cities.forEach(c => {
    if (!stateMap[c.state]) stateMap[c.state] = { murders: 0, pop: 0 };
    stateMap[c.state].murders += c.murder;
    stateMap[c.state].pop += c.population;
  });
  const stateConc = Object.entries(stateMap)
    .map(([state, d]) => ({ state, ...d, rate: d.pop > 0 ? Math.round(d.murders / d.pop * 100000 * 10) / 10 : 0 }))
    .sort((a, b) => b.murders - a.murders)
    .slice(0, 20);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Violence Concentration' }]} />
      <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">Where Violence Concentrates</h1>
      <p className="text-lg text-gray-600 mb-8">
        Murder in America is not evenly distributed. It concentrates in a remarkably small number of cities — and
        within those cities, in a handful of neighborhoods. Understanding this concentration is essential for
        effective policy.
      </p>

      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-red-700">{concentration.top10.murderPct}%</p>
          <p className="text-sm text-gray-600">of murders in just 10 cities</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-red-700">{concentration.top10.popPct}%</p>
          <p className="text-sm text-gray-600">of population in those 10 cities</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-amber-700">{concentration.top50.murderPct}%</p>
          <p className="text-sm text-gray-600">of murders in 50 cities</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-primary">{fmtNum(totalMurders)}</p>
          <p className="text-sm text-gray-600">total murders tracked (2024)</p>
        </div>
      </div>

      {/* Top 10 murder cities */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-primary mb-4">Top 10 Murder Cities (2024)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">#</th>
                <th className="text-left p-3 font-semibold">City</th>
                <th className="text-right p-3 font-semibold">Murders</th>
                <th className="text-right p-3 font-semibold">Cumulative %</th>
              </tr>
            </thead>
            <tbody>
              {cumulative.slice(0, 10).map(c => (
                <tr key={c.rank} className="border-b border-gray-100">
                  <td className="p-3">{c.rank}</td>
                  <td className="p-3 font-medium">{c.city}, {c.state}</td>
                  <td className="p-3 text-right font-mono">{fmtNum(c.murders)}</td>
                  <td className="p-3 text-right font-mono text-red-600">{c.cumPct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <ConcentrationCharts cumulative={cumulative} stateConc={stateConc} analytics={analytics} />

      <section className="mt-12 prose prose-gray max-w-none">
        <h2 className="font-display text-2xl font-bold text-primary">Why This Matters</h2>
        <p>
          The concentration of violence has profound policy implications. If half of all murders occur in just 50 cities,
          then targeted interventions in those specific places could have outsized impact on national crime statistics. 
          Research shows that within these cities, violence concentrates further — often in just a few neighborhoods 
          or even specific street corners.
        </p>
        <p>
          This data challenges the narrative that America has a uniform &quot;crime problem.&quot; Most of the country 
          is remarkably safe. The crisis is hyperlocal, which means solutions should be too.
        </p>

        <h2 className="font-display text-2xl font-bold text-primary">The Population Paradox</h2>
        <p>
          The top 10 murder cities contain {concentration.top10.popPct}% of the tracked population but 
          produce {concentration.top10.murderPct}% of murders — a {(concentration.top10.murderPct / concentration.top10.popPct).toFixed(1)}× 
          overrepresentation. This gap is even wider at the neighborhood level, where a few square blocks can 
          account for the majority of a city&apos;s homicides.
        </p>
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <a href="/most-dangerous-cities" className="text-primary hover:underline">→ Most Dangerous Cities</a>
        <a href="/murder-rate" className="text-primary hover:underline">→ Murder Rate by State</a>
        <a href="/population-crime-paradox" className="text-primary hover:underline">→ Population-Crime Paradox</a>
        <a href="/crime-clock" className="text-primary hover:underline">→ Crime Clock</a>
      </div>

      <ShareButtons title="Violence Concentration — Where Murder Really Happens in America" />
    </main>
  );
}
