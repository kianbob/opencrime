import { loadData, fmtNum, fmtRate, fmtPct } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import HomepageCharts from './HomepageCharts';
import LastUpdated from '@/components/LastUpdated';
import type { NationalTrend } from '@/lib/utils';

type RaceRow = { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number; pacificIslander: number };

export const metadata: Metadata = {
  title: 'OpenCrime — US Crime Data Explorer | FBI Statistics for Every City & State',
  description: 'Explore FBI crime statistics for 9,700+ cities and all 50 states. Crime rates, trends since 1979, rankings, and analysis. Free and open data.',
  openGraph: { url: 'https://www.opencrime.us/' },
  alternates: { canonical: 'https://www.opencrime.us/' },
};

type Stats = {
  totalCities: number;
  totalStates: number;
  national2024: { violentCrime: number; violentRate: number; homicide: number; homicideRate: number; propertyCrime: number; propertyRate: number; population: number };
  national2023: { violentRate: number; homicideRate: number };
  peakYear: { year: number; violentRate: number; homicideRate: number };
  trends: { violentCrimeChange1yr: number; violentCrimeChange3yr: number; violentCrimeChangeSincePeak: number; homicideChange1yr: number };
  topCitiesByViolentRate: { city: string; state: string; slug: string; population: number; violentRate: number; murderRate: number }[];
  safestCities: { city: string; state: string; slug: string; population: number; violentRate: number }[];
  topStatesByViolentRate: { abbr: string; name: string; violentRate: number; homicideRate: number }[];
  safestStates: { abbr: string; name: string; violentRate: number }[];
};

export default function HomePage() {
  const arrestRace = loadData<{ byRace: RaceRow[] }>('arrest-data.json').byRace.find(r => r.offense === 'TOTAL');
  const stats = loadData<Stats>('stats.json');
  const n = stats.national2024;
  const nationalTrends = loadData<NationalTrend[]>('national-trends.json');
  const trendData = nationalTrends.map(t => ({ year: t.year, violentRate: t.violentRate }));
  const y2024 = nationalTrends[nationalTrends.length - 1];
  const breakdownData = [
    { name: 'Agg. Assault', value: y2024.aggravatedAssault, isViolent: true },
    { name: 'Robbery', value: y2024.robbery, isViolent: true },
    { name: 'Rape', value: y2024.rape, isViolent: true },
    { name: 'Homicide', value: y2024.homicide, isViolent: true },
    { name: 'Larceny', value: y2024.larceny, isViolent: false },
    { name: 'MV Theft', value: y2024.motorVehicleTheft, isViolent: false },
    { name: 'Burglary', value: y2024.burglary, isViolent: false },
  ];

  const yoyChange = stats.trends.violentCrimeChange1yr;
  const yoyColor = yoyChange < 0 ? 'text-green-400' : 'text-red-400';
  const yoyColorMuted = yoyChange < 0 ? 'text-green-600' : 'text-red-600';
  const homicideChange = stats.trends.homicideChange1yr;
  const homicideColor = homicideChange < 0 ? 'text-green-600' : 'text-red-600';
  const peakColor = stats.trends.violentCrimeChangeSincePeak < 0 ? 'text-green-400' : 'text-red-400';

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1e3a5f] text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              US Crime Data Explorer
            </h1>
            <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto">
              FBI crime statistics for {fmtNum(stats.totalCities)} cities and all 50 states. Free and open.
            </p>
          </div>

          {/* Search */}
          <form action="/search" method="get" className="max-w-lg mx-auto mb-10">
            <div className="relative">
              <input
                type="text"
                name="q"
                placeholder="Search any city or state..."
                className="w-full px-5 py-3.5 pr-24 rounded-xl text-gray-900 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1e3a5f] hover:bg-[#2a4d7a] text-white px-5 py-2 rounded-lg font-medium text-sm transition">
                Search
              </button>
            </div>
          </form>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
            <div className="text-center py-4">
              <div className="text-2xl md:text-3xl font-bold">{fmtNum(n.violentCrime)}</div>
              <div className="text-blue-300 text-sm mt-1">Violent Crimes (2024)</div>
            </div>
            <div className="text-center py-4">
              <div className="text-2xl md:text-3xl font-bold">{fmtRate(n.violentRate)}</div>
              <div className="text-blue-300 text-sm mt-1">per 100K People</div>
            </div>
            <div className="text-center py-4">
              <div className={`text-2xl md:text-3xl font-bold ${yoyColor}`}>{fmtPct(yoyChange)}</div>
              <div className="text-blue-300 text-sm mt-1">vs 2023</div>
            </div>
            <div className="text-center py-4">
              <div className={`text-2xl md:text-3xl font-bold ${peakColor}`}>{fmtPct(stats.trends.violentCrimeChangeSincePeak)}</div>
              <div className="text-blue-300 text-sm mt-1">Since 1991 Peak</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/dashboard" className="bg-white text-[#1e3a5f] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-md">
              Explore Dashboard
            </Link>
            <Link href="/map" className="bg-white/15 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/25 transition">
              🗺️ Interactive Map
            </Link>
            <Link href="/rankings" className="bg-white/15 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/25 transition">
              City Rankings
            </Link>
            <Link href="/international-comparison" className="bg-white/15 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/25 transition">
              US vs World
            </Link>
          </div>
        </div>
      </section>

      <HomepageCharts trendData={trendData} breakdownData={breakdownData} />

      {/* Key Stats */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="font-heading text-3xl font-bold text-center mb-8">2024 National Crime Overview</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-2">Violent Crime</h3>
            <div className="text-3xl font-bold text-red-600 mb-1">{fmtNum(n.violentCrime)}</div>
            <div className="text-gray-500">Rate: {fmtRate(n.violentRate)} per 100K</div>
            <div className={`text-sm mt-2 ${yoyColorMuted}`}>{fmtPct(yoyChange)} from 2023</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-2">Homicides</h3>
            <div className="text-3xl font-bold text-red-700 mb-1">{fmtNum(n.homicide)}</div>
            <div className="text-gray-500">Rate: {fmtRate(n.homicideRate)} per 100K</div>
            <div className={`text-sm mt-2 ${homicideColor}`}>{fmtPct(homicideChange)} from 2023</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-2">Property Crime</h3>
            <div className="text-3xl font-bold text-[#1e3a5f] mb-1">{fmtNum(n.propertyCrime)}</div>
            <div className="text-gray-500">Rate: {fmtRate(n.propertyRate)} per 100K</div>
            <div className="text-sm text-gray-500 mt-2">Population: {fmtNum(n.population)}</div>
          </div>
        </div>

        {/* Most Dangerous / Safest */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-heading text-2xl font-bold mb-4 text-red-700">
              Most Dangerous Cities <span className="text-sm font-normal text-gray-500">(100K+ pop)</span>
            </h3>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2">#</th>
                    <th className="text-left px-4 py-2">City</th>
                    <th className="text-right px-4 py-2">Violent Rate</th>
                    <th className="text-right px-4 py-2">Murder Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topCitiesByViolentRate.slice(0, 10).map((c, i) => (
                    <tr key={c.slug} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                      <td className="px-4 py-2">
                        <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline font-medium">
                          {c.city}
                        </Link>
                        <span className="text-gray-400 text-xs ml-1">{c.state}</span>
                      </td>
                      <td className="px-4 py-2 text-right font-mono text-red-600">{fmtRate(c.violentRate)}</td>
                      <td className="px-4 py-2 text-right font-mono">{fmtRate(c.murderRate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <Link href="/rankings" className="block text-center text-sm text-[#1e3a5f] py-3 border-t hover:bg-gray-50">
                View Full Rankings →
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-2xl font-bold mb-4 text-green-700">
              Safest Cities <span className="text-sm font-normal text-gray-500">(100K+ pop)</span>
            </h3>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2">#</th>
                    <th className="text-left px-4 py-2">City</th>
                    <th className="text-right px-4 py-2">Violent Rate</th>
                    <th className="text-right px-4 py-2">Population</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.safestCities.slice(0, 10).map((c, i) => (
                    <tr key={c.slug} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                      <td className="px-4 py-2">
                        <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline font-medium">
                          {c.city}
                        </Link>
                        <span className="text-gray-400 text-xs ml-1">{c.state}</span>
                      </td>
                      <td className="px-4 py-2 text-right font-mono text-green-600">{fmtRate(c.violentRate)}</td>
                      <td className="px-4 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <Link href="/rankings?sort=safest" className="block text-center text-sm text-[#1e3a5f] py-3 border-t hover:bg-gray-50">
                View Full Rankings →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* States */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">Crime by State</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-red-700">Highest Violent Crime Rates</h3>
              <div className="space-y-2">
                {stats.topStatesByViolentRate.slice(0, 10).map((s, i) => (
                  <Link key={s.abbr} href={`/states/${s.abbr.toLowerCase()}`} className="flex items-center justify-between bg-white rounded-lg px-4 py-2 hover:shadow-sm transition">
                    <span><span className="text-gray-400 mr-2">{i + 1}.</span> {s.name}</span>
                    <span className="font-mono text-red-600">{fmtRate(s.violentRate)}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3 text-green-700">Lowest Violent Crime Rates</h3>
              <div className="space-y-2">
                {stats.safestStates.slice(0, 10).map((s, i) => (
                  <Link key={s.abbr} href={`/states/${s.abbr.toLowerCase()}`} className="flex items-center justify-between bg-white rounded-lg px-4 py-2 hover:shadow-sm transition">
                    <span><span className="text-gray-400 mr-2">{i + 1}.</span> {s.name}</span>
                    <span className="font-mono text-green-600">{fmtRate(s.violentRate)}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/states" className="bg-[#1e3a5f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2a4d7a] transition">
              All 50 States + DC →
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'WebSite', name: 'OpenCrime',
        url: 'https://www.opencrime.us',
        potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: 'https://www.opencrime.us/search?q={search_term_string}' }, 'query-input': 'required name=search_term_string' }
      })}} />

      {/* Featured Analysis */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="font-heading text-3xl font-bold text-center mb-2">Featured Analysis</h2>
        <p className="text-center text-gray-500 mb-8">In-depth articles backed by FBI statistics</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { href: '/analysis/crime-decline', title: 'The Great Crime Decline', desc: 'Why America is safer than you think — 45 years of data', tag: 'DEEP DIVE', reading: '12 min' },
            { href: '/analysis/gun-violence', title: 'Gun Violence by the Numbers', desc: 'Firearms in 77% of murders — what FBI data shows', tag: 'ANALYSIS', reading: '9 min' },
            { href: '/analysis/rural-vs-urban', title: 'Rural vs Urban Crime', desc: 'Small cities can be more dangerous than big metros', tag: 'DEEP DIVE', reading: '8 min' },
            { href: '/analysis/homicide-in-america', title: 'Homicide in America', desc: 'Who kills whom and why — FBI SHR data deep dive', tag: 'DEEP DIVE', reading: '11 min' },
          ].map(a => (
            <Link key={a.href} href={a.href} className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition group flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${a.tag === 'DEEP DIVE' ? 'bg-[#1e3a5f] text-white' : 'bg-red-100 text-red-700'}`}>{a.tag}</span>
                <span className="text-xs text-gray-400">{a.reading}</span>
              </div>
              <h3 className="font-heading text-base font-bold group-hover:text-[#1e3a5f] transition leading-snug mb-2">{a.title}</h3>
              <p className="text-sm text-gray-500 flex-1">{a.desc}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/analysis" className="text-[#1e3a5f] hover:underline font-medium">All 39 Analysis Articles →</Link>
        </div>
      </section>

      {/* Tools */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">Interactive Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: '/tools/compare', icon: '⚖️', title: 'Compare Cities', desc: 'Side-by-side crime comparison' },
              { href: '/tools/state-compare', icon: '🗺️', title: 'Compare States', desc: '40+ year trend comparison' },
              { href: '/tools/risk-calculator', icon: '🎲', title: 'Risk Calculator', desc: 'Your odds of being a victim' },
              { href: '/tools/safety-score', icon: '🛡️', title: 'Safety Score', desc: 'A-F grade for any city' },
              { href: '/tools/crime-cost', icon: '💰', title: 'Crime Cost', desc: 'What crime costs your city' },
              { href: '/tools/time-machine', icon: '🕰️', title: 'Time Machine', desc: 'Crime when you were born' },
              { href: '/tools/quiz', icon: '🧠', title: 'Crime Quiz', desc: 'Test your knowledge' },
              { href: '/tools/city-report', icon: '📋', title: 'City Report', desc: 'Full safety report card' },
            ].map(t => (
              <Link key={t.href} href={t.href} className="bg-white rounded-xl p-4 text-center hover:shadow-md transition group">
                <div className="text-2xl mb-2">{t.icon}</div>
                <div className="font-semibold text-sm group-hover:text-[#1e3a5f]">{t.title}</div>
                <div className="text-xs text-gray-500 mt-1">{t.desc}</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/tools" className="text-[#1e3a5f] hover:underline font-medium text-sm">View all tools →</Link>
          </div>
        </div>
      </section>

      {/* Unique Insights */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">Unique Data Insights</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { href: '/violence-concentration', icon: '📍', title: 'Violence Concentration', desc: 'Just 10 cities produce 21% of all murders.' },
              { href: '/crime-velocity', icon: '🚀', title: 'Crime Velocity', desc: 'Which cities are changing fastest?' },
              { href: '/hidden-crime', icon: '👁️', title: 'Hidden Crime', desc: 'Millions of crimes go unreported every year.' },
              { href: '/violence-inequality', icon: '📊', title: 'Violence Inequality', desc: 'How concentrated is crime within each state?' },
              { href: '/decades', icon: '📅', title: 'Crime by Decade', desc: 'How crime changed from the 1980s to today.' },
              { href: '/crime-correlations', icon: '🔬', title: 'Crime vs Everything', desc: 'Does poverty, income, or gun ownership predict crime?' },
            ].map(t => (
              <Link key={t.href} href={t.href} className="bg-white rounded-xl p-5 hover:shadow-md transition group border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{t.icon}</div>
                  <div>
                    <div className="font-bold group-hover:text-[#1e3a5f] mb-1">{t.title}</div>
                    <div className="text-sm text-gray-600">{t.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Crime Types */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="font-heading text-2xl font-bold text-center mb-6">Browse by Crime Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: '/violent-crime', label: 'Violent Crime', color: 'bg-red-600' },
            { href: '/murder-rate', label: 'Murder', color: 'bg-red-800' },
            { href: '/assault-statistics', label: 'Assault', color: 'bg-red-700' },
            { href: '/robbery-statistics', label: 'Robbery', color: 'bg-red-500' },
            { href: '/property-crime', label: 'Property Crime', color: 'bg-blue-700' },
            { href: '/cargo-theft', label: 'Cargo Theft', color: 'bg-amber-800' },
            { href: '/hate-crimes', label: 'Hate Crimes', color: 'bg-purple-700' },
            { href: '/arrests', label: 'Arrests', color: 'bg-gray-700' },
          ].map(c => (
            <Link key={c.href} href={c.href} className={`${c.color} text-white rounded-lg py-3 text-center hover:opacity-90 transition font-semibold text-sm`}>
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Arrest Demographics Summary */}
      {arrestRace && (
        <section className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="font-heading text-2xl font-bold text-center mb-3">Arrest Demographics by Race</h2>
          <p className="text-center text-gray-500 mb-6 max-w-2xl mx-auto text-sm">
            National arrest data from {fmtNum(arrestRace.total)} total arrests. These figures reflect policing patterns
            and systemic factors, not just the distribution of criminal behavior.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: 'White', value: arrestRace.white, pct: (arrestRace.white / arrestRace.total * 100).toFixed(1) },
              { label: 'Black', value: arrestRace.black, pct: (arrestRace.black / arrestRace.total * 100).toFixed(1) },
              { label: 'Native American', value: arrestRace.nativeAmerican, pct: (arrestRace.nativeAmerican / arrestRace.total * 100).toFixed(1) },
              { label: 'Asian', value: arrestRace.asian, pct: (arrestRace.asian / arrestRace.total * 100).toFixed(1) },
              { label: 'Pacific Islander', value: arrestRace.pacificIslander, pct: (arrestRace.pacificIslander / arrestRace.total * 100).toFixed(1) },
            ].map(r => (
              <div key={r.label} className="bg-white rounded-xl shadow-sm border p-4 text-center">
                <div className="text-2xl font-bold text-[#1e3a5f]">{r.pct}%</div>
                <div className="text-sm text-gray-600">{r.label}</div>
                <div className="text-xs text-gray-400">{fmtNum(r.value)}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link href="/arrest-demographics" className="text-[#1e3a5f] hover:underline font-medium text-sm">Full Arrest Demographics →</Link>
            <Link href="/analysis/racial-disparities" className="text-[#1e3a5f] hover:underline font-medium text-sm">Racial Disparities Analysis →</Link>
            <Link href="/analysis/crime-by-race" className="text-[#1e3a5f] hover:underline font-medium text-sm">Crime by Race →</Link>
          </div>
        </section>
      )}

      {/* About */}
      <section className="bg-gray-100 py-10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold mb-3">About OpenCrime</h2>
          <p className="text-gray-600 mb-4">
            OpenCrime makes FBI crime statistics accessible to everyone. We process data from the FBI&apos;s
            Uniform Crime Reporting (UCR) program and present it in a clean, searchable format.
            No paywalls, no logins, no ads.
          </p>
          <p className="text-sm text-gray-500">
            Data: FBI Crime Data Explorer (CDE). National estimates 1979–2024. City-level data 2020–2024.
          </p>
          <p className="text-xs text-gray-400 mt-3">
            Part of <a href="https://thedataproject.ai" className="underline hover:text-gray-600">TheDataProject.ai</a> network
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-4">
        <LastUpdated />
      </div>
    </div>
  );
}
