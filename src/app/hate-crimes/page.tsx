import { loadData, fmtNum } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import LastUpdated from '@/components/LastUpdated';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';

export const metadata: Metadata = {
  title: 'Hate Crime Statistics 2024 — FBI Data by State, Bias Type & Trends',
  description: 'FBI hate crime statistics: 11,679 incidents in 2024 by state, bias motivation (race, religion, sexual orientation), offender demographics, and trends.',
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

type BiasRow = {
  motivation: string;
  incidents: number;
  offenses: number;
  victims: number;
  knownOffenders: number;
};

type RaceDemo = { race: string; count: number; pct: number };
type EthDemo = { ethnicity: string; count: number };

type HateDetail = {
  year: number;
  totals: { incidents: number; offenses: number; victims: number; knownOffenders: number };
  biasMotivation: BiasRow[];
  offenderDemographics: {
    totalOffenders: number;
    race: RaceDemo[];
    ethnicity: EthDemo[];
    age: { total: number; adults: number; juveniles: number };
  };
};

/* Bias categories grouped by type */
const RACE_BIASES = [
  'Anti-Black or African American', 'Anti-White', 'Anti-Hispanic or Latino', 'Anti-Asian',
  'Anti-Arab', 'Anti-American Indian or Alaska Native', 'Anti-Native Hawaiian or Other Pacific Islander',
  'Anti-Multiple Races, Group', 'Anti-Other Race/Ethnicity/Ancestry',
];
const RELIGION_BIASES = [
  'Anti-Jewish', 'Anti-Islamic (Muslim)', 'Anti-Sikh', 'Anti-Other Christian', 'Anti-Catholic',
  'Anti-Protestant', 'Anti-Eastern Orthodox (Russian, Greek, Other)', 'Anti-Multiple Religions, Group',
  'Anti-Other Religion', 'Anti-Buddhist', 'Anti-Hindu',
  'Anti-Church of Jesus Christ3', "Anti-Jehovah's Witness", 'Anti-Atheism/Agnosticism/etc.',
];
const SO_BIASES = [
  'Anti-Gay (Male)', 'Anti-Lesbian, Gay, Bisexual, or Transgender (Mixed Group)',
  'Anti-Lesbian', 'Anti-Bisexual', 'Anti-Heterosexual',
];
const DISABILITY_BIASES = ['Anti-Physical', 'Anti-Mental'];
const GENDER_BIASES = ['Anti-Female', 'Anti-Male'];
const GI_BIASES = ['Anti-Transgender', 'Anti-Gender Non-Conforming'];

function BiasTable({ title, color, biases, data }: { title: string; color: string; biases: string[]; data: BiasRow[] }) {
  const rows = biases.map(b => data.find(d => d.motivation === b)).filter(Boolean) as BiasRow[];
  if (rows.length === 0) return null;
  return (
    <div className="mb-8">
      <h3 className={`font-heading text-xl font-bold mb-3 ${color}`}>{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-3 py-2">Bias Motivation</th>
              <th className="text-right px-3 py-2">Incidents</th>
              <th className="text-right px-3 py-2">Offenses</th>
              <th className="text-right px-3 py-2">Victims</th>
              <th className="text-right px-3 py-2">Known Offenders</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.motivation} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2">{r.motivation}</td>
                <td className="px-3 py-2 text-right font-mono">{fmtNum(r.incidents)}</td>
                <td className="px-3 py-2 text-right font-mono">{fmtNum(r.offenses)}</td>
                <td className="px-3 py-2 text-right font-mono">{fmtNum(r.victims)}</td>
                <td className="px-3 py-2 text-right font-mono">{fmtNum(r.knownOffenders)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function HateCrimesPage() {
  const byState = loadData<Record<string, HCState>>('hate-crime-by-state.json');
  const detail = loadData<HateDetail>('hate-crime-detail.json');
  const states = Object.values(byState).filter(s => s.totalIncidents > 0).sort((a, b) => b.totalIncidents - a.totalIncidents);
  const totalIncidents = detail.totals.incidents;
  const totalOffenses = detail.totals.offenses;
  const totalVictims = detail.totals.victims;
  const totalOffenders = detail.totals.knownOffenders;

  const raceCategory = detail.biasMotivation.find(b => b.motivation === 'Race/Ethnicity/Ancestry:');
  const religionCategory = detail.biasMotivation.find(b => b.motivation === 'Religion:');
  const soCategory = detail.biasMotivation.find(b => b.motivation === 'Sexual Orientation:');
  const disabilityCategory = detail.biasMotivation.find(b => b.motivation === 'Disability:');
  const genderCategory = detail.biasMotivation.find(b => b.motivation === 'Gender:');
  const giCategory = detail.biasMotivation.find(b => b.motivation === 'Gender Identity:');

  const demo = detail.offenderDemographics;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: `Hate Crime Statistics ${detail.year}` }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Hate Crime Statistics {detail.year}</h1>
      <p className="text-lg text-gray-600 mb-8">
        FBI Hate Crime Statistics program data — {fmtNum(totalIncidents)} incidents, {fmtNum(totalOffenses)} offenses,
        and {fmtNum(totalVictims)} victims reported in {detail.year}. Hate crimes are criminal offenses motivated by
        bias against race, religion, sexual orientation, disability, gender, or gender identity.
      </p>

      <AIOverview insights={[
        `${fmtNum(totalIncidents)} hate crime incidents reported in ${detail.year} with ${fmtNum(totalVictims)} victims`,
        `Race/ethnicity bias accounts for ${raceCategory ? (raceCategory.incidents / totalIncidents * 100).toFixed(1) : 0}% of all incidents`,
        `Anti-Black hate crimes (${fmtNum(detail.biasMotivation.find(b => b.motivation === 'Anti-Black or African American')?.incidents ?? 0)}) are the single largest category`,
        `Anti-Jewish incidents (${fmtNum(detail.biasMotivation.find(b => b.motivation === 'Anti-Jewish')?.incidents ?? 0)}) dominate religious bias at ${religionCategory ? ((detail.biasMotivation.find(b => b.motivation === 'Anti-Jewish')?.incidents ?? 0) / religionCategory.incidents * 100).toFixed(1) : 0}%`,
        `${states[0]?.state ?? 'California'} reported the most incidents (${fmtNum(states[0]?.totalIncidents ?? 0)})`,
        `${fmtNum(demo.age.juveniles)} juvenile offenders identified — ${(demo.age.juveniles / demo.age.total * 100).toFixed(1)}% of known offenders`,
      ]} />

      {/* Hero Stats */}
      <div className="bg-gray-900 text-white rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{fmtNum(totalIncidents)}</div>
            <div className="text-gray-300 text-sm">Total Incidents</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-400">{fmtNum(totalOffenses)}</div>
            <div className="text-gray-300 text-sm">Total Offenses</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400">{fmtNum(totalVictims)}</div>
            <div className="text-gray-300 text-sm">Total Victims</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-400">{fmtNum(totalOffenders)}</div>
            <div className="text-gray-300 text-sm">Known Offenders</div>
          </div>
        </div>
      </div>

      {/* Category breakdown cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Race/Ethnicity', data: raceCategory, color: 'bg-red-50 text-red-700' },
          { label: 'Religion', data: religionCategory, color: 'bg-blue-50 text-blue-700' },
          { label: 'Sexual Orientation', data: soCategory, color: 'bg-purple-50 text-purple-700' },
        ].map(cat => (
          <div key={cat.label} className={`rounded-xl p-4 text-center ${cat.color.split(' ')[0]}`}>
            <div className={`text-2xl font-bold ${cat.color.split(' ')[1]}`}>
              {cat.data ? fmtNum(cat.data.incidents) : '—'}
            </div>
            <div className="text-sm text-gray-600">{cat.label} Bias</div>
            <div className="text-xs text-gray-500 mt-1">
              {cat.data && totalIncidents > 0 ? `${(cat.data.incidents / totalIncidents * 100).toFixed(1)}% of all incidents` : ''}
            </div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Disability', data: disabilityCategory, color: 'bg-green-50 text-green-700' },
          { label: 'Gender', data: genderCategory, color: 'bg-orange-50 text-orange-700' },
          { label: 'Gender Identity', data: giCategory, color: 'bg-pink-50 text-pink-700' },
        ].map(cat => (
          <div key={cat.label} className={`rounded-xl p-4 text-center ${cat.color.split(' ')[0]}`}>
            <div className={`text-2xl font-bold ${cat.color.split(' ')[1]}`}>
              {cat.data ? fmtNum(cat.data.incidents) : '—'}
            </div>
            <div className="text-sm text-gray-600">{cat.label} Bias</div>
            <div className="text-xs text-gray-500 mt-1">
              {cat.data && totalIncidents > 0 ? `${(cat.data.incidents / totalIncidents * 100).toFixed(1)}% of all incidents` : ''}
            </div>
          </div>
        ))}
      </div>

      {/* Understanding section */}
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
          <li><strong>Anti-Black bias</strong> is consistently the largest single category of race-based hate crime,
          with {fmtNum(detail.biasMotivation.find(b => b.motivation === 'Anti-Black or African American')?.incidents ?? 0)} incidents in {detail.year}.</li>
          <li><strong>Antisemitic incidents</strong> are the largest category of religious hate crime ({fmtNum(detail.biasMotivation.find(b => b.motivation === 'Anti-Jewish')?.incidents ?? 0)} incidents),
          despite Jewish Americans being approximately 2% of the population.</li>
          <li><strong>Anti-LGBTQ+ hate crimes</strong> totaled {fmtNum(soCategory?.incidents ?? 0)} incidents based on sexual orientation,
          plus {fmtNum(giCategory?.incidents ?? 0)} based on gender identity.</li>
        </ul>
      </div>

      {/* Year-over-year context */}
      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4 text-center">Year-over-Year Context</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-blue-200 mb-2">Key Trends in {detail.year}</h3>
            <ul className="text-sm space-y-2">
              <li>• {fmtNum(totalIncidents)} total hate crime incidents reported</li>
              <li>• Race/ethnicity bias remains the top motivator ({raceCategory ? (raceCategory.incidents / totalIncidents * 100).toFixed(0) : 0}%)</li>
              <li>• Anti-Jewish incidents ({fmtNum(detail.biasMotivation.find(b => b.motivation === 'Anti-Jewish')?.incidents ?? 0)}) remain the top religious bias</li>
              <li>• Anti-Hispanic incidents reached {fmtNum(detail.biasMotivation.find(b => b.motivation === 'Anti-Hispanic or Latino')?.incidents ?? 0)}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-200 mb-2">Historical Perspective</h3>
            <ul className="text-sm space-y-2">
              <li>• Hate crime reporting has expanded significantly since 2020</li>
              <li>• More agencies participating in the FBI program</li>
              <li>• Anti-Asian hate crimes surged post-COVID, now at {fmtNum(detail.biasMotivation.find(b => b.motivation === 'Anti-Asian')?.incidents ?? 0)}</li>
              <li>• Gender identity bias tracking expanded in recent years</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Full Bias Motivation Breakdown */}
      <h2 className="font-heading text-2xl font-bold mb-6">Complete Bias Motivation Breakdown</h2>
      <p className="text-gray-600 mb-6">
        All {detail.biasMotivation.length} bias motivation categories reported by the FBI in {detail.year},
        organized by bias type. Each row shows the number of incidents, offenses, victims, and known offenders.
      </p>

      <BiasTable title="Race/Ethnicity/Ancestry Bias" color="text-red-700" biases={RACE_BIASES} data={detail.biasMotivation} />
      <BiasTable title="Religious Bias" color="text-blue-700" biases={RELIGION_BIASES} data={detail.biasMotivation} />
      <BiasTable title="Sexual Orientation Bias" color="text-purple-700" biases={SO_BIASES} data={detail.biasMotivation} />
      <BiasTable title="Disability Bias" color="text-green-700" biases={DISABILITY_BIASES} data={detail.biasMotivation} />
      <BiasTable title="Gender Bias" color="text-orange-700" biases={GENDER_BIASES} data={detail.biasMotivation} />
      <BiasTable title="Gender Identity Bias" color="text-pink-700" biases={GI_BIASES} data={detail.biasMotivation} />

      {/* Offender Demographics */}
      <h2 className="font-heading text-2xl font-bold mb-6 mt-12">Offender Demographics</h2>
      <p className="text-gray-600 mb-6">
        Of the {fmtNum(totalIncidents)} hate crime incidents in {detail.year}, {fmtNum(demo.totalOffenders)} known offenders
        were identified. Demographics are only available for known offenders — many cases have unidentified perpetrators.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Race */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-heading text-lg font-bold mb-4">Offender Race</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2">Race</th>
                  <th className="text-right px-3 py-2">Count</th>
                  <th className="text-right px-3 py-2">%</th>
                </tr>
              </thead>
              <tbody>
                {demo.race.map(r => (
                  <tr key={r.race} className="border-t">
                    <td className="px-3 py-2">{r.race}</td>
                    <td className="px-3 py-2 text-right font-mono">{fmtNum(r.count)}</td>
                    <td className="px-3 py-2 text-right font-mono">{r.pct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            White offenders account for the majority ({demo.race.find(r => r.race === 'White')?.pct}%) of known hate crime offenders.
            {demo.race.find(r => r.race === 'Unknown')?.pct}% of offenders have unknown race.
          </p>
        </div>

        {/* Ethnicity */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-heading text-lg font-bold mb-4">Offender Ethnicity</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2">Ethnicity</th>
                  <th className="text-right px-3 py-2">Count</th>
                </tr>
              </thead>
              <tbody>
                {demo.ethnicity.map(e => (
                  <tr key={e.ethnicity} className="border-t">
                    <td className="px-3 py-2">{e.ethnicity}</td>
                    <td className="px-3 py-2 text-right font-mono">{fmtNum(e.count)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-heading text-lg font-bold mt-6 mb-4">Offender Age</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold">{fmtNum(demo.age.total)}</div>
              <div className="text-xs text-gray-500">Total Known</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold">{fmtNum(demo.age.adults)}</div>
              <div className="text-xs text-gray-500">Adults ({(demo.age.adults / demo.age.total * 100).toFixed(0)}%)</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-red-600">{fmtNum(demo.age.juveniles)}</div>
              <div className="text-xs text-gray-500">Juveniles ({(demo.age.juveniles / demo.age.total * 100).toFixed(0)}%)</div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            {fmtNum(demo.age.juveniles)} juvenile offenders ({(demo.age.juveniles / demo.age.total * 100).toFixed(1)}%) were identified —
            a significant portion suggesting hate crime education and prevention in schools is critical.
          </p>
        </div>
      </div>

      {/* Disproportion analysis */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
        <h3 className="font-heading text-lg font-bold mb-3">Key Demographic Findings</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold mb-2">Offender Profile</p>
            <ul className="space-y-1 text-gray-700">
              <li>• Majority of known offenders are White ({demo.race.find(r => r.race === 'White')?.pct}%)</li>
              <li>• Black offenders account for {demo.race.find(r => r.race === 'Black')?.pct}%</li>
              <li>• {fmtNum(demo.ethnicity.find(e => e.ethnicity === 'Hispanic or Latino')?.count ?? 0)} identified as Hispanic or Latino</li>
              <li>• Nearly 1 in 5 offenders ({(demo.age.juveniles / demo.age.total * 100).toFixed(0)}%) are juveniles</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Victim Disproportion</p>
            <ul className="space-y-1 text-gray-700">
              <li>• Anti-Black incidents ({fmtNum(detail.biasMotivation.find(b => b.motivation === 'Anti-Black or African American')?.incidents ?? 0)}) are {((detail.biasMotivation.find(b => b.motivation === 'Anti-Black or African American')?.incidents ?? 0) / (detail.biasMotivation.find(b => b.motivation === 'Anti-White')?.incidents ?? 1)).toFixed(1)}× Anti-White incidents</li>
              <li>• Anti-Jewish incidents far exceed all other religious biases combined</li>
              <li>• Anti-Gay (Male) incidents ({fmtNum(detail.biasMotivation.find(b => b.motivation === 'Anti-Gay (Male)')?.incidents ?? 0)}) dominate sexual orientation bias</li>
              <li>• Anti-Transgender ({fmtNum(detail.biasMotivation.find(b => b.motivation === 'Anti-Transgender')?.incidents ?? 0)}) is the top gender identity bias</li>
            </ul>
          </div>
        </div>
      </div>

      {/* State table */}
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
        <Link href="/analysis/racial-disparities" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Racial Disparities</Link>
      </div>

      <div className="mt-8"><ShareButtons title="Hate Crime Statistics" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How many hate crimes are there in the US?', acceptedAnswer: { '@type': 'Answer', text: `The FBI recorded ${totalIncidents.toLocaleString()} hate crime incidents in ${detail.year}, with ${totalVictims.toLocaleString()} victims and ${totalOffenders.toLocaleString()} known offenders. However, experts estimate the true number is roughly double due to underreporting.` }},
          { '@type': 'Question', name: 'What is the most common type of hate crime?', acceptedAnswer: { '@type': 'Answer', text: `Race/ethnicity-based hate crimes are the most common, accounting for ${raceCategory ? (raceCategory.incidents / totalIncidents * 100).toFixed(0) : 0}% of all reported incidents. Anti-Black bias is the single largest subcategory with ${detail.biasMotivation.find(b => b.motivation === 'Anti-Black or African American')?.incidents.toLocaleString()} incidents.` }},
          { '@type': 'Question', name: 'Who commits hate crimes?', acceptedAnswer: { '@type': 'Answer', text: `Of ${totalOffenders.toLocaleString()} known offenders in ${detail.year}, ${demo.race.find(r => r.race === 'White')?.pct}% were White, ${demo.race.find(r => r.race === 'Black')?.pct}% were Black, and ${demo.race.find(r => r.race === 'Unknown')?.pct}% were unknown race. About ${(demo.age.juveniles / demo.age.total * 100).toFixed(0)}% of offenders were juveniles.` }},
          { '@type': 'Question', name: 'What are the most common religious hate crimes?', acceptedAnswer: { '@type': 'Answer', text: `Anti-Jewish hate crimes are by far the most common religious bias, with ${detail.biasMotivation.find(b => b.motivation === 'Anti-Jewish')?.incidents.toLocaleString()} incidents in ${detail.year}. Anti-Islamic incidents (${detail.biasMotivation.find(b => b.motivation === 'Anti-Islamic (Muslim)')?.incidents.toLocaleString()}) and Anti-Sikh incidents (${detail.biasMotivation.find(b => b.motivation === 'Anti-Sikh')?.incidents.toLocaleString()}) follow.` }},
        ]
      })}} />

      <p className="text-sm text-gray-500 mt-8">
        Source: FBI Hate Crime Statistics program, {detail.year}. Not all agencies participate; numbers may undercount actual incidents.
      </p>
      <LastUpdated />
    </div>
  );
}
