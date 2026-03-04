import { loadData, fmtNum, fmtRate, fmtPct } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'OpenCrime — US Crime Data Explorer | FBI Statistics for Every City & State',
  description: 'Explore FBI crime statistics for 9,700+ cities and all 50 states. Crime rates, trends since 1979, rankings, and analysis. Free and open data.',
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
  const stats = loadData<Stats>('stats.json');
  const n = stats.national2024;

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1e3a5f] text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
            US Crime Data Explorer
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto">
            FBI crime statistics for {fmtNum(stats.totalCities)} cities and all 50 states. 
            45 years of data. Free and open.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold">{fmtNum(n.violentCrime)}</div>
              <div className="text-blue-200 text-sm">Violent Crimes (2024)</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold">{fmtRate(n.violentRate)}</div>
              <div className="text-blue-200 text-sm">per 100K People</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-400">{fmtPct(stats.trends.violentCrimeChange1yr)}</div>
              <div className="text-blue-200 text-sm">vs 2023</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-400">{fmtPct(stats.trends.violentCrimeChangeSincePeak)}</div>
              <div className="text-blue-200 text-sm">Since 1991 Peak</div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/dashboard" className="bg-white text-[#1e3a5f] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              Explore Dashboard
            </Link>
            <Link href="/states" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              Browse States
            </Link>
            <Link href="/rankings" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              City Rankings
            </Link>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="font-heading text-3xl font-bold text-center mb-8">2024 National Crime Overview</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-2">Violent Crime</h3>
            <div className="text-3xl font-bold text-red-600 mb-1">{fmtNum(n.violentCrime)}</div>
            <div className="text-gray-500">Rate: {fmtRate(n.violentRate)} per 100K</div>
            <div className="text-sm text-green-600 mt-2">{fmtPct(stats.trends.violentCrimeChange1yr)} from 2023</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-2">Homicides</h3>
            <div className="text-3xl font-bold text-red-700 mb-1">{fmtNum(n.homicide)}</div>
            <div className="text-gray-500">Rate: {fmtRate(n.homicideRate)} per 100K</div>
            <div className="text-sm text-green-600 mt-2">{fmtPct(stats.trends.homicideChange1yr)} from 2023</div>
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

      {/* About */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="font-heading text-3xl font-bold mb-4">About OpenCrime</h2>
        <p className="text-lg text-gray-600 mb-6">
          OpenCrime makes FBI crime statistics accessible to everyone. We process data from the FBI&apos;s 
          Uniform Crime Reporting (UCR) program and present it in a clean, searchable format. 
          No paywalls, no logins, no ads.
        </p>
        <p className="text-gray-500">
          Data source: FBI Crime Data Explorer (CDE). National estimates 1979–2024. 
          City-level data 2020–2024. Updated as new data is released.
        </p>
        <p className="text-sm text-gray-400 mt-4">
          Part of <a href="https://thedataproject.ai" className="underline hover:text-gray-600">TheDataProject.ai</a> network
        </p>
      </section>
    </div>
  );
}
