import { Metadata } from 'next';
import { loadData, fmtNum, fmtRate, stateAbbr } from '@/lib/utils';
import type { CityIndex, Analytics } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import TrajectoryCharts from './TrajectoryCharts';

export const metadata: Metadata = {
  title: 'City Crime Trajectories — Improving, Worsening & Volatile Cities | OpenCrime',
  description: 'Every city has a crime trajectory. Some are steadily improving, others are getting worse, and many swing wildly year to year. See which category your city falls in.',
  openGraph: {
    title: 'City Crime Trajectories — Is Your City Getting Safer or More Dangerous?',
    description: 'We classified 9,700+ cities into 6 trajectory types. Only 158 are steadily improving. 302 are worsening.',
    url: 'https://www.opencrime.us/city-trajectories',
  },
  alternates: { canonical: 'https://www.opencrime.us/city-trajectories' },
};

const TRAJECTORY_INFO: Record<string, { label: string; color: string; emoji: string; desc: string }> = {
  'improving': { label: 'Improving', color: '#22c55e', emoji: '📈', desc: 'Crime rates declining consistently over multiple years' },
  'worsening': { label: 'Worsening', color: '#dc2626', emoji: '📉', desc: 'Crime rates increasing consistently over multiple years' },
  'volatile': { label: 'Volatile', color: '#f59e0b', emoji: '📊', desc: 'Crime rates swinging up and down unpredictably' },
  'stable-safe': { label: 'Stable & Safe', color: '#0ea5e9', emoji: '🛡️', desc: 'Consistently low crime rates (under 200 violent per 100K)' },
  'stable-dangerous': { label: 'Stable & Dangerous', color: '#991b1b', emoji: '⚠️', desc: 'Consistently high crime rates that aren\'t changing' },
  'unknown': { label: 'Insufficient Data', color: '#9ca3af', emoji: '❓', desc: 'Less than 3 years of data available' },
};

export default function CityTrajectoriesPage() {
  const cities = loadData<CityIndex[]>('city-index.json');
  const analytics = loadData<Analytics>('analytics.json');
  const { trajectoryCount } = analytics;

  // Example cities for each trajectory (top by population)
  const examples: Record<string, CityIndex[]> = {};
  Object.keys(TRAJECTORY_INFO).forEach(t => {
    if (t === 'unknown') return;
    examples[t] = cities.filter(c => c.trajectory === t && c.population >= 25000)
      .sort((a, b) => b.population - a.population).slice(0, 10);
  });

  // Best turnarounds: improving cities that used to be dangerous
  const turnarounds = cities
    .filter(c => c.trajectory === 'improving' && c.population >= 25000 && c.violentRate > 200)
    .sort((a, b) => (b.violentChange ?? 0) - (a.violentChange ?? 0))
    .slice(0, 15);

  // Worst declines: worsening cities
  const declines = cities
    .filter(c => c.trajectory === 'worsening' && c.population >= 25000)
    .sort((a, b) => (a.violentChange ?? 0) - (b.violentChange ?? 0))
    .slice(0, 15);

  const chartData = Object.entries(trajectoryCount)
    .filter(([k]) => k !== 'unknown')
    .map(([key, count]) => ({ name: TRAJECTORY_INFO[key]?.label || key, count: count as number, color: TRAJECTORY_INFO[key]?.color || '#999' }));

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"Dataset","name":"City Crime Trajectories — Improving, Worsening & Volatile Cities | OpenCrime","description":"Every city has a crime trajectory. Some are steadily improving, others are getting worse, and many swing wildly year to year. See which category your city falls in.","url":"https://www.opencrime.us/city-trajectories","creator":{"@type":"Organization","name":"OpenCrime","url":"https://www.opencrime.us"},"license":"https://www.opencrime.us/about","sourceOrganization":"FBI Crime Data Explorer"}` }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'City Trajectories' }]} />
      <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">City Crime Trajectories</h1>
      <p className="text-lg text-gray-600 mb-8">
        We analyzed multi-year crime trends for {fmtNum(cities.length)} cities and classified each one into a trajectory type.
        Is your city getting safer, more dangerous, or bouncing around unpredictably?
      </p>

      {/* Trajectory distribution */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {Object.entries(TRAJECTORY_INFO).filter(([k]) => k !== 'unknown').map(([key, info]) => (
          <div key={key} className="bg-white border rounded-xl p-5" style={{ borderLeftWidth: 4, borderLeftColor: info.color }}>
            <p className="text-2xl mb-1">{info.emoji}</p>
            <p className="text-2xl font-bold" style={{ color: info.color }}>{fmtNum(trajectoryCount[key] || 0)}</p>
            <p className="font-semibold text-gray-800">{info.label}</p>
            <p className="text-xs text-gray-500">{info.desc}</p>
          </div>
        ))}
      </div>

      <TrajectoryCharts chartData={chartData} />

      {/* Example cities per trajectory */}
      {Object.entries(examples).map(([traj, cities]) => {
        const info = TRAJECTORY_INFO[traj];
        if (!cities.length) return null;
        return (
          <section key={traj} className="mb-8">
            <h2 className="font-display text-xl font-bold mb-3" style={{ color: info.color }}>
              {info.emoji} {info.label} Cities (Largest)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-2 font-semibold">City</th>
                    <th className="text-right p-2 font-semibold">Pop.</th>
                    <th className="text-right p-2 font-semibold">Violent Rate</th>
                    <th className="text-right p-2 font-semibold">YoY Change</th>
                  </tr>
                </thead>
                <tbody>
                  {cities.map(c => (
                    <tr key={c.slug} className="border-b border-gray-100">
                      <td className="p-2"><a href={`/cities/${c.slug}`} className="text-primary hover:underline">{c.city}, {stateAbbr(c.state)}</a></td>
                      <td className="p-2 text-right font-mono">{fmtNum(c.population)}</td>
                      <td className="p-2 text-right font-mono">{fmtRate(c.violentRate)}</td>
                      <td className={`p-2 text-right font-mono ${(c.violentChange ?? 0) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {c.violentChange != null ? `${c.violentChange > 0 ? '+' : ''}${c.violentChange.toFixed(1)}%` : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}

      <section className="prose prose-gray max-w-none mt-8">
        <h2 className="font-display text-2xl font-bold text-primary">How We Classify Trajectories</h2>
        <p>
          Our trajectory classification uses 3-5 years of FBI Uniform Crime Report data for each city.
          We analyze year-over-year changes in violent crime rates to determine the overall direction:
        </p>
        <ul>
          <li><strong>Improving:</strong> Violent crime rate has declined every year in the available data period, but the city is still above 200 per 100K.</li>
          <li><strong>Worsening:</strong> Violent crime rate has increased every year.</li>
          <li><strong>Stable &amp; Safe:</strong> All years show declining rates AND the latest rate is under 200 per 100K — consistently low.</li>
          <li><strong>Stable &amp; Dangerous:</strong> All years show increasing rates AND the latest rate exceeds 500 per 100K — stuck in a high-crime pattern.</li>
          <li><strong>Volatile:</strong> Crime rates bounce up and down with no clear trend — the most common pattern, reflecting how crime responds to many variables.</li>
        </ul>
        <p>
          Volatility is the most common trajectory ({fmtNum(trajectoryCount['volatile'] || 0)} cities) because crime rates
          are influenced by many factors: policing changes, economic shifts, drug markets, and even weather. A single year&apos;s
          spike or drop often reverses the next year.
        </p>
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <a href="/most-improved" className="text-primary hover:underline">→ Most Improved Cities</a>
        <a href="/population-crime-paradox" className="text-primary hover:underline">→ Population-Crime Paradox</a>
        <a href="/violence-concentration" className="text-primary hover:underline">→ Violence Concentration</a>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mt-6 mb-4">
        <p className="text-sm text-gray-600">
          <strong>Demographic context:</strong> Crime trajectory improvements benefit all communities, but
          historically disadvantaged neighborhoods may lag. National data shows significant racial disparities
          in victimization.{' '}
          <a href="/arrest-demographics" className="text-primary hover:underline">Arrest demographics</a> |{' '}
          <a href="/analysis/racial-disparities" className="text-primary hover:underline">Racial disparities</a>
        </p>
      </div>

      <ShareButtons title="City Crime Trajectories — Is Your City Getting Safer?" />
    </main>
  );
}
