import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'OpenCrime — US Crime Data Explorer | FBI Statistics for Every State & City',
  description: 'Explore FBI crime statistics for every US state and 18,000+ law enforcement agencies. Violent crime, property crime, trends, rankings, and analysis — free and open.',
  openGraph: {
    title: 'OpenCrime — US Crime Data Explorer',
    description: 'FBI crime statistics for every US state and 18,000+ agencies. Free, open, no paywall.',
    url: 'https://www.opencrime.us',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f2440] via-[#1e3a5f] to-[#1a365d] text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Every Crime. Every State. Every City.
          </h1>
          <p className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto mb-4">
            The most comprehensive free explorer of FBI crime data — covering 18,000+ law enforcement agencies, 50 states, and decades of trends. No paywall. No login. Just data.
          </p>
          <p className="text-sm text-blue-300 mb-8">
            FBI Uniform Crime Reporting data through 2024 · Updated March 2026
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/states" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Explore by State
            </Link>
            <Link href="/rankings" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold border border-white/30 transition-colors">
              City Rankings
            </Link>
            <Link href="/search" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold border border-white/30 transition-colors">
              Search Cities
            </Link>
          </div>
        </div>
      </section>

      {/* Stat Tiles — will be data-driven */}
      <section className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Violent Crimes', value: '1.2M', sub: 'Reported in 2024', color: 'text-red-600' },
            { label: 'Property Crimes', value: '6.7M', sub: 'Reported in 2024', color: 'text-blue-600' },
            { label: 'Agencies Reporting', value: '18,800+', sub: 'FBI UCR participants' },
            { label: 'Murder Rate', value: '5.7', sub: 'Per 100K (2024)', color: 'text-red-700' },
          ].map(tile => (
            <div key={tile.label} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 text-center">
              <p className={`text-2xl md:text-3xl font-bold ${tile.color || 'text-primary'}`}>{tile.value}</p>
              <p className="text-sm font-medium text-gray-700 mt-1">{tile.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{tile.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Crime Overview */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">National Crime Overview</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <h3 className="font-bold text-red-700 mb-3">Violent Crime</h3>
            <div className="space-y-3">
              {[
                { crime: 'Murder', count: '17,690', rate: '5.7', trend: '↓ 11.6%' },
                { crime: 'Rape', count: '107,260', rate: '34.5', trend: '↓ 9.4%' },
                { crime: 'Robbery', count: '222,134', rate: '71.4', trend: '↓ 13.6%' },
                { crime: 'Aggravated Assault', count: '857,313', rate: '275.7', trend: '↓ 6.3%' },
              ].map(c => (
                <div key={c.crime} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <span className="font-medium text-gray-900">{c.crime}</span>
                    <span className="text-xs text-gray-500 ml-2">{c.count} reported</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-mono">{c.rate}/100K</span>
                    <span className="text-xs text-green-600 ml-2 font-semibold">{c.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <h3 className="font-bold text-blue-700 mb-3">Property Crime</h3>
            <div className="space-y-3">
              {[
                { crime: 'Burglary', count: '847,582', rate: '272.6', trend: '↓ 1.3%' },
                { crime: 'Larceny-Theft', count: '4,561,878', rate: '1,467.8', trend: '↓ 2.4%' },
                { crime: 'Motor Vehicle Theft', count: '900,892', rate: '289.7', trend: '↓ 19.0%' },
              ].map(c => (
                <div key={c.crime} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <span className="font-medium text-gray-900">{c.crime}</span>
                    <span className="text-xs text-gray-500 ml-2">{c.count} reported</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-mono">{c.rate}/100K</span>
                    <span className="text-xs text-green-600 ml-2 font-semibold">{c.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Source: FBI UCR &quot;Crime in the United States, 2024&quot; national estimates. Rates per 100,000 population. Trends show 2023→2024 change.
        </p>
      </section>

      {/* What You Can Explore */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6 text-center">Explore the Data</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: '50 States', href: '/states', sub: 'Crime by state + DC' },
            { label: '18K+ Agencies', href: '/cities', sub: 'City & county data' },
            { label: 'Crime Types', href: '/crimes', sub: '20+ offense categories' },
            { label: 'Rankings', href: '/rankings', sub: 'Safest & most dangerous' },
            { label: 'Trends', href: '/trends', sub: 'Multi-year comparisons' },
            { label: 'Dashboard', href: '/dashboard', sub: 'Interactive charts' },
            { label: 'Hate Crimes', href: '/hate-crimes', sub: 'Bias-motivated incidents' },
            { label: 'Analysis', href: '/analysis', sub: 'In-depth articles' },
          ].map(item => (
            <Link key={item.href} href={item.href} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all text-center">
              <p className="font-semibold text-gray-900">{item.label}</p>
              <p className="text-xs text-gray-500 mt-1">{item.sub}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* How We&apos;re Different */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6 text-center">Why OpenCrime?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-5 border">
            <h3 className="font-semibold text-gray-900">Free & Open</h3>
            <p className="text-sm text-gray-600 mt-2">No paywall, no login, no ads. NeighborhoodScout charges $40/month for basic crime data. We give you everything for free.</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border">
            <h3 className="font-semibold text-gray-900">Per-Capita Rates</h3>
            <p className="text-sm text-gray-600 mt-2">Raw crime counts are misleading — New York has more crimes than Wyoming because it has more people. We show per-100K rates for fair comparison.</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border">
            <h3 className="font-semibold text-gray-900">Better Than the FBI&apos;s Own Site</h3>
            <p className="text-sm text-gray-600 mt-2">The FBI&apos;s Crime Data Explorer is a slow, confusing SPA. We built something faster, clearer, and more useful — using the same data.</p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-gray-100 py-10 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4">Browse by State</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {['CA','TX','FL','NY','PA','IL','OH','GA','NC','MI','NJ','VA','WA','AZ','MA','TN','IN','MO','MD','WI'].map(st => (
              <Link key={st} href={`/states/${st.toLowerCase()}`} className="text-xs bg-white px-3 py-1.5 rounded-full border hover:border-primary/30 hover:text-primary transition-colors">
                {st}
              </Link>
            ))}
            <Link href="/states" className="text-xs text-primary px-3 py-1.5">All states →</Link>
          </div>

          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4">Popular Searches</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <Link href="/rankings/safest-cities" className="text-primary hover:underline">Safest Cities in America</Link>
            <Link href="/rankings/most-dangerous" className="text-primary hover:underline">Most Dangerous Cities</Link>
            <Link href="/crimes/murder" className="text-primary hover:underline">Murder Statistics</Link>
            <Link href="/rankings/safest-states" className="text-primary hover:underline">Safest States</Link>
            <Link href="/crimes/robbery" className="text-primary hover:underline">Robbery Statistics</Link>
            <Link href="/crimes/burglary" className="text-primary hover:underline">Burglary Statistics</Link>
            <Link href="/crimes/motor-vehicle-theft" className="text-primary hover:underline">Car Theft Statistics</Link>
            <Link href="/hate-crimes" className="text-primary hover:underline">Hate Crime Statistics</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
