import { Metadata } from 'next';
import { loadData, fmtNum } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import Link from 'next/link';

type RaceRow = { offense: string; total: number; white: number; black: number; nativeAmerican: number; asian: number; pacificIslander: number };

export const metadata: Metadata = {
  title: 'Arson Statistics — FBI Data on Arson by Property Type | OpenCrime',
  description: 'FBI arson data broken down by property type: residential, commercial, vehicles, and more. Includes clearance rates by category.',
  openGraph: {
    title: 'Arson Statistics — FBI Data on Arson by Property Type',
    description: 'How many arsons happen, what burns, and how many get solved. FBI data analyzed.',
    url: 'https://www.opencrime.us/arson',
  },
  alternates: { canonical: 'https://www.opencrime.us/arson' },
};

type ArsonRow = { type: string; count: number; pctCleared: number };

export default function ArsonPage() {
  const offense = loadData<{ arsonByProperty: ArsonRow[] }>('offense-data.json');
  const arson = (offense?.arsonByProperty ?? []).filter(a => a.count > 0);
  const arsonRace = loadData<{ byRace: RaceRow[] }>('arrest-data.json').byRace.find(r => r.offense === 'Arson');
  const total = arson.reduce((s, a) => s + a.count, 0);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"Dataset","name":"Arson Statistics — FBI Data on Arson by Property Type | OpenCrime","description":"FBI arson data broken down by property type: residential, commercial, vehicles, and more. Includes clearance rates by category.","url":"https://www.opencrime.us/arson","creator":{"@type":"Organization","name":"OpenCrime","url":"https://www.opencrime.us"},"license":"https://www.opencrime.us/about","sourceOrganization":"FBI Crime Data Explorer"}` }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Crime Types', href: '/crimes' }, { label: 'Arson' }]} />
      <h1 className="font-display text-4xl font-bold text-primary mb-4">Arson Statistics</h1>
      <p className="text-lg text-gray-600 mb-8">
        Arson — the criminal setting of fires — affects thousands of properties annually. FBI data breaks down 
        arson incidents by property type and clearance rates, revealing what burns and how often arsonists get caught.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-red-700">{fmtNum(total)}</p>
          <p className="text-sm text-gray-600">Total Arsons (2024)</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-amber-700">{fmtNum(arson.find(a => a.type.includes('Single occupancy'))?.count ?? 0)}</p>
          <p className="text-sm text-gray-600">Single-Family Homes</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-primary">{fmtNum(arson.find(a => a.type.includes('Motor'))?.count ?? 0)}</p>
          <p className="text-sm text-gray-600">Motor Vehicles</p>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-primary mb-4">Arson by Property Type</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Property Type</th>
                <th className="text-right p-3 font-semibold">Count</th>
                <th className="text-right p-3 font-semibold">% of Total</th>
                <th className="text-right p-3 font-semibold">Clearance Rate</th>
              </tr>
            </thead>
            <tbody>
              {arson.map(a => (
                <tr key={a.type} className="border-b border-gray-100">
                  <td className="p-3 font-medium">{a.type}</td>
                  <td className="p-3 text-right font-mono">{fmtNum(a.count)}</td>
                  <td className="p-3 text-right font-mono text-gray-500">{total > 0 ? (a.count / total * 100).toFixed(1) + '%' : '—'}</td>
                  <td className="p-3 text-right font-mono">{a.pctCleared > 0 ? a.pctCleared.toFixed(1) + '%' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Motor Vehicle 0% Clearance Callout */}
      {arson.find(a => a.type.includes('Motor') && a.pctCleared === 0) && (
        <div className="bg-red-100 border-l-4 border-red-600 rounded-xl p-5 mb-8">
          <h3 className="font-display text-lg font-bold text-red-800 mb-2">🚗 Motor Vehicle Arsons: 0% Clearance Rate</h3>
          <p className="text-sm text-red-900">
            Of the {fmtNum(arson.find(a => a.type.includes('Motor'))?.count ?? 0)} motor vehicle arsons reported in 2024,
            <strong> not a single one</strong> was cleared by arrest or exceptional means. Vehicle fires destroy forensic
            evidence rapidly, and many are linked to insurance fraud or are used to conceal other crimes —
            making them among the hardest arsons to solve.
          </p>
        </div>
      )}

      {/* Clearance Rate Comparison */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-primary mb-4">Clearance Rates by Property Type</h2>
        <p className="text-gray-600 mb-4 text-sm">
          Arson clearance rates are extremely low across all property types. Industrial/manufacturing arsons
          have the highest clearance rate at just {arson.find(a => a.type.includes('Industrial'))?.pctCleared.toFixed(1)}%.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {arson.filter(a => a.count > 0).map(a => (
            <div key={a.type} className={`rounded-lg p-3 text-center border ${a.pctCleared === 0 ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className={`text-xl font-bold ${a.pctCleared === 0 ? 'text-red-600' : 'text-primary'}`}>
                {a.pctCleared > 0 ? `${a.pctCleared.toFixed(1)}%` : '0%'}
              </div>
              <div className="text-xs text-gray-600 mt-1">{a.type}</div>
              <div className="text-xs text-gray-400">{fmtNum(a.count)} cases</div>
            </div>
          ))}
        </div>
      </section>

      <section className="prose prose-gray max-w-none">
        <h2 className="font-display text-2xl font-bold text-primary">Key Takeaways</h2>
        <ul>
          <li><strong>Residential fires dominate:</strong> Single-occupancy and multi-occupancy residential arsons together make up the largest category.</li>
          <li><strong>Abysmal clearance rates:</strong> No property type has a clearance rate above 4%. Fire destroys evidence, making arson one of the hardest crimes to prove.</li>
          <li><strong>Motor vehicles &amp; &ldquo;Other&rdquo; — 0% solved:</strong> {fmtNum((arson.find(a => a.type === 'Motor vehicles')?.count ?? 0) + (arson.find(a => a.type === 'Other mobile')?.count ?? 0) + (arson.find(a => a.type === 'Other')?.count ?? 0))} arsons across motor vehicles, other mobile property, and &ldquo;other&rdquo; categories had a 0% clearance rate.</li>
          <li><strong>Industrial/manufacturing:</strong> Highest clearance rate at {arson.find(a => a.type.includes('Industrial'))?.pctCleared.toFixed(1)}%, likely due to better surveillance and insurance investigation.</li>
        </ul>
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/crimes" className="text-primary hover:underline">→ All Crime Types</Link>
        <Link href="/property-crime" className="text-primary hover:underline">→ Property Crime Overview</Link>
        <Link href="/arrests" className="text-primary hover:underline">→ Arrest Data</Link>
      </div>

      {/* Arson Arrest Demographics */}
      {arsonRace && (
        <div className="bg-gray-50 rounded-xl p-4 mt-6 mb-4">
          <h3 className="font-semibold text-sm mb-2">Arson Arrests by Race</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center text-xs">
            {[
              { label: 'White', pct: (arsonRace.white / arsonRace.total * 100).toFixed(1) },
              { label: 'Black', pct: (arsonRace.black / arsonRace.total * 100).toFixed(1) },
              { label: 'Native Am.', pct: (arsonRace.nativeAmerican / arsonRace.total * 100).toFixed(1) },
              { label: 'Asian', pct: (arsonRace.asian / arsonRace.total * 100).toFixed(1) },
              { label: 'Pacific Isl.', pct: (arsonRace.pacificIslander / arsonRace.total * 100).toFixed(1) },
            ].map(r => (
              <div key={r.label} className="bg-white rounded p-1.5 border">
                <div className="font-bold">{r.pct}%</div>
                <div className="text-gray-500">{r.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            <Link href="/arrest-demographics" className="text-primary hover:underline">Full demographics</Link> |{' '}
            <Link href="/analysis/racial-disparities" className="text-primary hover:underline">Racial disparities</Link>
          </p>
        </div>
      )}

      <ShareButtons title="Arson Statistics — FBI Data by Property Type" />
    </main>
  );
}
