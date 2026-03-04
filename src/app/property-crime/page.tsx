import { loadData, fmtNum, fmtRate } from '@/lib/utils';
import type { NationalTrend, CityIndex } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Property Crime Statistics 2024 — Burglary, Theft, Auto Theft Rates',
  description: 'US property crime statistics: burglary, larceny-theft, motor vehicle theft rates. State rankings, city data, 45-year trends. FBI 2024 data.',
  openGraph: { url: 'https://www.opencrime.us/property-crime' },
  alternates: { canonical: 'https://www.opencrime.us/property-crime' },
};

export default function PropertyCrimePage() {
  const national = loadData<NationalTrend[]>('national-trends.json');
  const cities = loadData<CityIndex[]>('city-index.json');
  const n = national[national.length - 1];
  const large = cities.filter(c => c.population >= 100000);
  const topProperty = [...large].sort((a, b) => b.propertyRate - a.propertyRate).slice(0, 20);
  const peak = national.reduce((max, y) => y.propertyRate > (max.propertyRate || 0) ? y : max, national[0]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Property Crime Statistics 2024' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Property Crime Statistics 2024</h1>

      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{fmtNum(n.propertyCrime)}</div>
            <div className="text-blue-200 text-sm">Property Crimes</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtRate(n.propertyRate)}</div>
            <div className="text-blue-200 text-sm">per 100K People</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtNum(n.burglary)}</div>
            <div className="text-blue-200 text-sm">Burglaries</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{fmtNum(n.motorVehicleTheft)}</div>
            <div className="text-blue-200 text-sm">Vehicle Thefts</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">National Overview</h2>
        <p>
          In 2024, the United States recorded {fmtNum(n.propertyCrime)} property crimes — a rate 
          of {fmtRate(n.propertyRate)} per 100,000 residents. Property crime includes burglary, 
          larceny-theft, motor vehicle theft, and arson.
        </p>
        <p>
          Like violent crime, property crime has declined dramatically from its peak. The rate 
          peaked at {fmtRate(peak.propertyRate)} in {peak.year} and has since fallen by {((1 - n.propertyRate / peak.propertyRate) * 100).toFixed(0)}%. 
          However, motor vehicle theft has surged in recent years, bucking the overall downward trend.
        </p>

        <h2 className="font-heading">2024 Breakdown</h2>
        <table>
          <thead><tr><th>Type</th><th>Total</th><th>Rate per 100K</th><th>% of Property Crime</th></tr></thead>
          <tbody>
            <tr><td><strong>Larceny-Theft</strong></td><td>{fmtNum(n.larceny)}</td><td>{fmtRate(n.larceny / n.population * 100000)}</td><td>{(n.larceny / n.propertyCrime * 100).toFixed(0)}%</td></tr>
            <tr><td><strong>Burglary</strong></td><td>{fmtNum(n.burglary)}</td><td>{fmtRate(n.burglary / n.population * 100000)}</td><td>{(n.burglary / n.propertyCrime * 100).toFixed(0)}%</td></tr>
            <tr><td><strong>Motor Vehicle Theft</strong></td><td>{fmtNum(n.motorVehicleTheft)}</td><td>{fmtRate(n.motorVehicleTheft / n.population * 100000)}</td><td>{(n.motorVehicleTheft / n.propertyCrime * 100).toFixed(0)}%</td></tr>
          </tbody>
        </table>

        <p>
          Larceny-theft (shoplifting, pocket-picking, purse-snatching, theft from vehicles) accounts 
          for the vast majority of property crime. Burglary has declined the most dramatically — 
          down roughly 60% since the early 1990s, likely due to improved security technology. 
          Motor vehicle theft spiked roughly 25% from 2019-2022, partly driven by a design flaw 
          in certain Hyundai/Kia models.
        </p>
      </div>

      <h2 className="font-heading text-2xl font-bold mb-4">Highest Property Crime Rate Cities (100K+)</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-3 py-2">#</th>
              <th className="text-left px-3 py-2">City</th>
              <th className="text-right px-3 py-2">Property Rate</th>
              <th className="text-right px-3 py-2">Property Crime</th>
              <th className="text-right px-3 py-2">Population</th>
            </tr>
          </thead>
          <tbody>
            {topProperty.map((c, i) => (
              <tr key={c.slug} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                <td className="px-3 py-2">
                  <Link href={`/cities/${c.slug}`} className="text-[#1e3a5f] hover:underline font-medium">{c.city}</Link>
                  <span className="text-gray-400 text-xs ml-1">{c.state}</span>
                </td>
                <td className="px-3 py-2 text-right font-mono text-[#1e3a5f] font-semibold">{fmtRate(c.propertyRate)}</td>
                <td className="px-3 py-2 text-right font-mono">{fmtNum(c.propertyCrime)}</td>
                <td className="px-3 py-2 text-right font-mono text-gray-500">{fmtNum(c.population)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/crime-rate" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">All Crime Data</Link>
        <Link href="/cargo-theft" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Cargo Theft</Link>
        <Link href="/analysis/property-crime-surge" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Property Crime Analysis</Link>
      </div>

      <div className="mt-8"><ShareButtons title="Property Crime Statistics 2024" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How much property crime is there in the US?', acceptedAnswer: { '@type': 'Answer', text: `There were ${n.propertyCrime.toLocaleString()} property crimes in 2024, a rate of ${n.propertyRate.toFixed(1)} per 100,000.` }},
          { '@type': 'Question', name: 'Is property crime increasing?', acceptedAnswer: { '@type': 'Answer', text: `Overall property crime has been declining for decades. However, motor vehicle theft has increased significantly since 2019, and organized retail theft has become a growing concern.` }},
        ]
      })}} />

      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer, 2024.</p>
    </div>
  );
}
