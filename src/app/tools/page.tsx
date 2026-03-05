import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Crime Data Tools — Compare Cities, Safety Scores & More',
  description: 'Interactive crime data tools. Compare city crime rates, calculate safety scores, explore rankings and trends.',
  openGraph: { url: 'https://www.opencrime.us/tools' },
  alternates: { canonical: 'https://www.opencrime.us/tools' },
};

const tools = [
  { href: '/tools/compare', title: 'Compare Cities', desc: 'Side-by-side crime rate comparison between any two cities', icon: '⚖️' },
  { href: '/tools/state-compare', title: 'Compare States', desc: 'Side-by-side state crime comparison with trend charts', icon: '🗺️' },
  { href: '/tools/safety-score', title: 'Safety Score', desc: 'Get a safety grade (A-F) for any city based on FBI data', icon: '🛡️' },
  { href: '/tools/risk-calculator', title: 'Crime Risk Calculator', desc: 'Calculate your statistical odds of being a crime victim', icon: '🎲' },
  { href: '/search', title: 'City Search', desc: 'Search crime data for any of 9,700+ US cities', icon: '🔍' },
  { href: '/rankings', title: 'City Rankings', desc: 'Most dangerous and safest cities ranked by crime rate', icon: '📊' },
  { href: '/most-improved', title: 'Most Improved Cities', desc: 'Biggest crime rate drops and increases year-over-year', icon: '📈' },
  { href: '/safest-cities', title: 'Safest Cities', desc: 'Complete list of the safest cities in America', icon: '✅' },
  { href: '/most-dangerous-cities', title: 'Most Dangerous Cities', desc: 'Complete list of the most dangerous cities', icon: '⚠️' },
  { href: '/crime-clock', title: 'Crime Clock', desc: 'See crime happen in real-time as you watch', icon: '⏱️' },
  { href: '/city-trajectories', title: 'City Trajectories', desc: 'Which cities are getting safer or more dangerous?', icon: '📉' },
  { href: '/population-crime-paradox', title: 'Population Paradox', desc: 'Big cities aren\'t the most dangerous — here\'s proof', icon: '🔬' },
  { href: '/crime-dna', title: 'Crime DNA', desc: 'Every city has a unique crime fingerprint — see the composition', icon: '🧬' },
  { href: '/violence-concentration', title: 'Violence Concentration', desc: '10 cities = 21% of all murders. See where violence concentrates.', icon: '📍' },
  { href: '/crime-stories', title: 'Crime Stories', desc: 'Data-driven narratives of turnarounds, crises, and surprises', icon: '📖' },
  { href: '/arrest-efficiency', title: 'Arrest Efficiency', desc: 'How effective is policing? Arrests vs crimes by type', icon: '🔒' },
  { href: '/cargo-theft', title: 'Cargo Theft', desc: '272K FBI cargo theft incidents — data nobody else has', icon: '📦' },
  { href: '/arrest-demographics', title: 'Arrest Demographics', desc: 'Who gets arrested? By race, sex, age, and offense type', icon: '👥' },
  { href: '/arson', title: 'Arson Data', desc: 'Arson by property type with clearance rates', icon: '🔥' },
];

export default function ToolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"WebPage","name":"Crime Data Tools — Compare Cities, Safety Scores & More","description":"Interactive crime data tools. Compare city crime rates, calculate safety scores, explore rankings and trends.","url":"https://www.opencrime.us/tools","publisher":{"@type":"Organization","name":"OpenCrime","url":"https://www.opencrime.us"}}` }} />
      <h1 className="font-heading text-3xl font-bold mb-2">Crime Data Tools</h1>
      <p className="text-gray-600 mb-8">Interactive tools to explore and compare FBI crime statistics</p>
      <div className="grid md:grid-cols-2 gap-4">
        {tools.map(t => (
          <Link key={t.href} href={t.href} className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition group">
            <div className="text-3xl mb-2">{t.icon}</div>
            <h2 className="font-heading text-lg font-bold group-hover:text-[#1e3a5f] transition">{t.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{t.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
