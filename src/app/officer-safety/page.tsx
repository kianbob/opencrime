import { Metadata } from 'next';
import { loadData, fmtNum } from '@/lib/utils';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import OfficerSafetyCharts from './OfficerSafetyCharts';
import AIOverview from '@/components/AIOverview';

type YearCount = { year: number; count: number };
type LeokaData = {
  totalSwornOfficers: number;
  feloniouslyKilled: YearCount[];
  accidentallyKilled: YearCount[];
  assaulted: YearCount[];
  killedByCircumstance: Record<string, number | string>;
  dangerousProfessionDeathRates: { professions: { profession: string; rate: number }[] };
};

const leoka = loadData<LeokaData>('leoka.json');

export const metadata: Metadata = {
  title: 'Officer Safety — LEOKA Statistics | OpenCrime',
  description: 'Law Enforcement Officers Killed and Assaulted (LEOKA) data from FBI reports. Explore trends in officer deaths, assaults, and the dangers of policing in America.',
  openGraph: {
    title: 'The Cost of Keeping America Safe — Officer Safety Statistics',
    description: 'Every year, ~60 officers are killed and 79,000+ assaulted in the line of duty. Explore the data.',
    url: 'https://www.opencrime.us/officer-safety',
  },
  alternates: { canonical: 'https://www.opencrime.us/officer-safety' },
};

export default function OfficerSafetyPage() {
  const latestKilled = leoka.feloniouslyKilled[leoka.feloniouslyKilled.length - 2]; // use 2023 as latest complete
  const latestAssaulted = leoka.assaulted[leoka.assaulted.length - 2];
  const latestAccidental = leoka.accidentallyKilled[leoka.accidentallyKilled.length - 2];
  const totalOfficers = leoka.totalSwornOfficers;
  const assaultOdds = Math.round(totalOfficers / latestAssaulted.count);

  const circumstanceMap = leoka.killedByCircumstance;
  const circumstances = Object.entries(circumstanceMap)
    .filter(([k]) => k !== 'description')
    .map(([k, v]) => ({
      name: k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()),
      value: v as number,
    }))
    .sort((a, b) => b.value - a.value);

  const professions = leoka.dangerousProfessionDeathRates.professions;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Officer Safety' }]} />

      {/* Hero */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white rounded-2xl p-8 md:p-12 mb-10">
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">The Cost of Keeping America Safe</h1>
        <p className="text-xl text-blue-200 mb-6">
          Every year, law enforcement officers put their lives on the line. The numbers tell the story of that sacrifice.
        </p>

      <AIOverview insights={[
        "50 law enforcement officers were feloniously killed in the line of duty in 2024 — plus dozens more in accidents.",
        "78,000 officers were assaulted on duty — more than 1 in 10 of all sworn officers nationwide.",
        "Policing remains one of the most dangerous professions, but the risk varies dramatically by assignment and jurisdiction.",
        "Ambush attacks have increased in recent years, changing how departments approach officer safety protocols."
      ]} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <p className="text-3xl md:text-4xl font-bold">{fmtNum(totalOfficers)}</p>
            <p className="text-sm text-blue-200">Sworn Officers</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <p className="text-3xl md:text-4xl font-bold text-red-400">~{latestKilled.count}</p>
            <p className="text-sm text-blue-200">Killed Per Year</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <p className="text-3xl md:text-4xl font-bold text-orange-400">{fmtNum(latestAssaulted.count)}</p>
            <p className="text-sm text-blue-200">Assaulted Per Year</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <p className="text-3xl md:text-4xl font-bold text-yellow-400">1 in {assaultOdds}</p>
            <p className="text-sm text-blue-200">Assaulted Annually</p>
          </div>
        </div>
      </div>

      {/* Key context */}
      <section className="mb-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="font-bold text-red-800 text-lg mb-2">Officers Feloniously Killed</h3>
            <p className="text-3xl font-bold text-red-700 mb-1">{latestKilled.count}</p>
            <p className="text-sm text-red-600">In {latestKilled.year} — that&apos;s more than one per week</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h3 className="font-bold text-orange-800 text-lg mb-2">Officers Assaulted</h3>
            <p className="text-3xl font-bold text-orange-700 mb-1">{fmtNum(latestAssaulted.count)}</p>
            <p className="text-sm text-orange-600">In {latestAssaulted.year} — {Math.round(latestAssaulted.count / 365)} per day</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="font-bold text-yellow-800 text-lg mb-2">Accidental Deaths</h3>
            <p className="text-3xl font-bold text-yellow-700 mb-1">{latestAccidental.count}</p>
            <p className="text-sm text-yellow-600">In {latestAccidental.year} — vehicle incidents, training accidents</p>
          </div>
        </div>
      </section>

      {/* Assault odds callout */}
      <section className="bg-gray-900 text-white rounded-2xl p-8 mb-10 text-center">
        <p className="text-4xl md:text-6xl font-bold mb-4">1 in {assaultOdds}</p>
        <p className="text-xl text-gray-300">
          officers will be assaulted this year. That&apos;s {Math.round(latestAssaulted.count / 365)} assaults on officers every single day.
        </p>
        <p className="text-sm text-gray-500 mt-2">Based on {fmtNum(totalOfficers)} sworn officers and {fmtNum(latestAssaulted.count)} assaults ({latestAssaulted.year})</p>
      </section>

      {/* Charts */}
      <OfficerSafetyCharts
        killed={leoka.feloniouslyKilled}
        accidental={leoka.accidentallyKilled}
        assaulted={leoka.assaulted}
        professions={professions}
        circumstances={circumstances}
      />

      {/* Methodology / About */}
      <section className="mt-12 prose prose-gray max-w-none">
        <h2 className="font-display text-2xl font-bold text-primary">About LEOKA Data</h2>
        <p>
          The Law Enforcement Officers Killed and Assaulted (LEOKA) program is administered by the FBI as part of its
          Uniform Crime Reporting program. It collects data on officers who were feloniously or accidentally killed, or
          assaulted while performing their official duties.
        </p>
        <p>
          &quot;Feloniously killed&quot; means an officer was intentionally killed by another person. Accidental deaths include
          those caused by vehicle crashes, training accidents, and other non-criminal incidents. Assault data covers
          any physical attack on an officer in the line of duty.
        </p>
        <p>
          The death rate for law enforcement (approximately 14.6 per 100,000 officers) places it among the more
          dangerous professions in America, though it falls below logging, fishing, and roofing. The assault rate,
          however, is extraordinarily high — no other profession faces the same frequency of intentional physical attack.
        </p>

        <h2 className="font-display text-2xl font-bold text-primary">Frequently Asked Questions</h2>
        <h3>How many police officers are killed each year?</h3>
        <p>
          On average, about 60 law enforcement officers are feloniously killed each year in the United States, with an
          additional 40–55 dying in accidental line-of-duty deaths. The total varies significantly year to year — 2021
          saw a spike to 73 felonious killings.
        </p>
        <h3>What are the most dangerous situations for officers?</h3>
        <p>
          Ambush attacks are the leading circumstance of felonious officer killings, accounting for roughly 30% of deaths.
          Traffic stops, domestic disturbance calls, and investigative activities are also particularly dangerous.
        </p>
        <h3>How does policing compare to other dangerous jobs?</h3>
        <p>
          While policing is dangerous, its fatality rate (~14.6 per 100K) is lower than logging (82.2), aircraft pilots
          (58.9), and roofers (47.4). However, policing is unique in that the danger comes primarily from intentional
          violence rather than accidents.
        </p>
      </section>

      <ShareButtons title="Officer Safety — LEOKA Statistics" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How many police officers are killed each year?', acceptedAnswer: { '@type': 'Answer', text: 'On average, about 60 law enforcement officers are feloniously killed each year in the United States, with an additional 40-55 dying in accidental line-of-duty deaths.' } },
          { '@type': 'Question', name: 'What are the most dangerous situations for police officers?', acceptedAnswer: { '@type': 'Answer', text: 'Ambush attacks are the leading circumstance, followed by traffic stops, domestic disturbance calls, and investigative activities.' } },
          { '@type': 'Question', name: 'How many officers are assaulted each year?', acceptedAnswer: { '@type': 'Answer', text: 'Approximately 79,000-80,000 officers are assaulted in the line of duty each year, which works out to about 1 in 9 officers.' } },
          { '@type': 'Question', name: 'Is policing the most dangerous job in America?', acceptedAnswer: { '@type': 'Answer', text: 'Policing has a fatality rate of about 14.6 per 100,000 officers, making it dangerous but not the deadliest profession. Logging (82.2), aircraft pilots (58.9), and roofers (47.4) have higher fatality rates. However, policing is unique in that most fatalities come from intentional violence.' } },
        ]
      })}} />

      <section className="mt-12 pt-8 border-t">
        <h2 className="font-heading text-2xl font-bold mb-4">Related Analysis</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/analysis/police-staffing-crisis" className="block border rounded-lg p-4 hover:bg-gray-50 transition">
            <h3 className="font-semibold">The Police Staffing Crisis</h3>
            <p className="text-sm text-gray-600">Departments across America are struggling to recruit and retain officers.</p>
          </Link>
          <Link href="/analysis/defund-police" className="block border rounded-lg p-4 hover:bg-gray-50 transition">
            <h3 className="font-semibold">Defund the Police — What Happened?</h3>
            <p className="text-sm text-gray-600">Data on police funding changes and their relationship to crime rates.</p>
          </Link>
          <Link href="/analysis/police-funding" className="block border rounded-lg p-4 hover:bg-gray-50 transition">
            <h3 className="font-semibold">Police Funding by City</h3>
            <p className="text-sm text-gray-600">How much do cities spend on policing, and does more spending mean less crime?</p>
          </Link>
          <Link href="/arrests" className="block border rounded-lg p-4 hover:bg-gray-50 transition">
            <h3 className="font-semibold">Arrest Data</h3>
            <p className="text-sm text-gray-600">National arrest statistics by crime type from FBI data.</p>
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'The Cost of Keeping America Safe — Officer Safety Statistics',
        description: 'Law Enforcement Officers Killed and Assaulted (LEOKA) data from FBI reports.',
        url: 'https://www.opencrime.us/officer-safety',
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
      })}} />
    </main>
  );
}
