import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Hate Crime Statistics 2024 — FBI Data by State, Bias Type & Trends',
  description: 'FBI hate crime statistics: incidents by state, bias motivation (race, religion, sexual orientation), and trends. Data from the Hate Crime Statistics program.',
  openGraph: { url: 'https://www.opencrime.us/hate-crimes' },
  alternates: { canonical: 'https://www.opencrime.us/hate-crimes' },
};

type HCState = {
  state: string;
  totalIncidents: number;
  raceEthnicity: number;
  religion: number;
  sexualOrientation: number;
};

export default function HateCrimesPage() {
  const byState = loadData<Record<string, HCState>>('hate-crime-by-state.json');
  const states = Object.values(byState).filter(s => s.totalIncidents > 0).sort((a, b) => b.totalIncidents - a.totalIncidents);
  const totalIncidents = states.reduce((s, st) => s + st.totalIncidents, 0);
  const totalRace = states.reduce((s, st) => s + (st.raceEthnicity || 0), 0);
  const totalReligion = states.reduce((s, st) => s + (st.religion || 0), 0);
  const totalSO = states.reduce((s, st) => s + (st.sexualOrientation || 0), 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Hate Crime Statistics</h1>
      <p className="text-lg text-gray-600 mb-8">
        FBI Hate Crime Statistics program data. Hate crimes are criminal offenses motivated by 
        bias against race, religion, sexual orientation, disability, gender, or gender identity.
      </p>

      <div className="bg-gray-900 text-white rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{fmtNum(totalIncidents)}</div>
            <div className="text-gray-300 text-sm">Total Incidents</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-400">{fmtNum(totalRace)}</div>
            <div className="text-gray-300 text-sm">Race/Ethnicity Bias</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-400">{fmtNum(totalReligion)}</div>
            <div className="text-gray-300 text-sm">Religious Bias</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400">{fmtNum(totalSO)}</div>
            <div className="text-gray-300 text-sm">Sexual Orientation Bias</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-red-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-700">{totalIncidents > 0 ? (totalRace / totalIncidents * 100).toFixed(0) : 0}%</div>
          <div className="text-sm text-gray-600">Motivated by Race/Ethnicity</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">{totalIncidents > 0 ? (totalReligion / totalIncidents * 100).toFixed(0) : 0}%</div>
          <div className="text-sm text-gray-600">Motivated by Religion</div>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-700">{totalIncidents > 0 ? (totalSO / totalIncidents * 100).toFixed(0) : 0}%</div>
          <div className="text-sm text-gray-600">Motivated by Sexual Orientation</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <h2 className="font-heading">Understanding Hate Crime Data</h2>
        <p>
          The FBI collects hate crime data voluntarily from law enforcement agencies nationwide. 
          Important caveats:
        </p>
        <ul>
          <li><strong>Underreporting is massive.</strong> The Bureau of Justice Statistics estimates that only 
          about half of hate crimes are reported to police, and many agencies don&apos;t participate in 
          the FBI program at all.</li>
          <li><strong>State variations reflect reporting, not just incidence.</strong> States with more agencies 
          reporting (like California and New York) appear to have more hate crimes partly because they&apos;re 
          better at counting them.</li>
          <li><strong>Anti-Black bias</strong> is consistently the largest single category of race-based hate crime.</li>
          <li><strong>Antisemitic incidents</strong> are the largest category of religious hate crime, despite Jewish 
          Americans being approximately 2% of the population.</li>
        </ul>
      </div>

      <h2 className="font-heading text-2xl font-bold mb-4">Hate Crimes by State</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="text-left px-3 py-2">#</th>
              <th className="text-left px-3 py-2">State</th>
              <th className="text-right px-3 py-2">Total</th>
              <th className="text-right px-3 py-2">Race/Ethnicity</th>
              <th className="text-right px-3 py-2">Religion</th>
              <th className="text-right px-3 py-2">Sexual Orient.</th>
            </tr>
          </thead>
          <tbody>
            {states.slice(0, 51).map((st, i) => (
              <tr key={st.state} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                <td className="px-3 py-2 font-medium">{st.state}</td>
                <td className="px-3 py-2 text-right font-mono font-semibold">{fmtNum(st.totalIncidents)}</td>
                <td className="px-3 py-2 text-right font-mono text-red-600">{fmtNum(st.raceEthnicity)}</td>
                <td className="px-3 py-2 text-right font-mono text-blue-600">{fmtNum(st.religion)}</td>
                <td className="px-3 py-2 text-right font-mono text-purple-600">{fmtNum(st.sexualOrientation)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/dashboard" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Crime Dashboard</Link>
        <Link href="/analysis" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Analysis Articles</Link>
      </div>

      <div className="mt-8"><ShareButtons title="Hate Crime Statistics" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How many hate crimes are there in the US?', acceptedAnswer: { '@type': 'Answer', text: `The FBI recorded ${totalIncidents.toLocaleString()} hate crime incidents in the most recent reporting year. However, experts estimate the true number is roughly double due to underreporting.` }},
          { '@type': 'Question', name: 'What is the most common type of hate crime?', acceptedAnswer: { '@type': 'Answer', text: `Race/ethnicity-based hate crimes are the most common, accounting for ${totalIncidents > 0 ? Math.round(totalRace/totalIncidents*100) : 0}% of all reported incidents. Anti-Black bias is the single largest subcategory.` }},
        ]
      })}} />

      <p className="text-sm text-gray-500 mt-8">
        Source: FBI Hate Crime Statistics program. Not all agencies participate; numbers may undercount actual incidents.
      </p>
    </div>
  );
}
