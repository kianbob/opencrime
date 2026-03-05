import type { Metadata } from 'next';
import Link from 'next/link';
import { loadData } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'State Crime Report Cards — Safety Grades for All 50 States + DC | OpenCrime',
  description: 'Every US state graded A-F on violent crime, property crime, and trends. See which states are safest and which are most dangerous based on FBI data.',
  alternates: { canonical: 'https://www.opencrime.us/state-report-card' },
  openGraph: {
    title: 'State Crime Report Cards — All 50 States Graded',
    url: 'https://www.opencrime.us/state-report-card',
  },
};

type StateSummary = {
  abbr: string; name: string; population: number;
  violentRate: number; propertyRate: number; homicideRate: number;
  violentChange: number; propertyChange: number;
};

const NAT_VIOLENT = 359.1;
const NAT_PROPERTY = 1760.1;

function gradeFromRate(rate: number, natAvg: number): string {
  const ratio = rate / natAvg;
  if (ratio < 0.5) return 'A';
  if (ratio < 0.8) return 'B';
  if (ratio < 1.2) return 'C';
  if (ratio < 1.5) return 'D';
  return 'F';
}

function trendGrade(violentChange: number, propertyChange: number): string {
  const avg = (violentChange + propertyChange) / 2;
  if (avg < -10) return 'A';
  if (avg < -3) return 'B';
  if (avg < 3) return 'C';
  if (avg < 10) return 'D';
  return 'F';
}

function gpaValue(g: string): number {
  return g === 'A' ? 4 : g === 'B' ? 3 : g === 'C' ? 2 : g === 'D' ? 1 : 0;
}

function gpaLetter(gpa: number): string {
  if (gpa >= 3.5) return 'A';
  if (gpa >= 2.5) return 'B';
  if (gpa >= 1.5) return 'C';
  if (gpa >= 0.5) return 'D';
  return 'F';
}

const gradeColors: Record<string, string> = {
  A: 'bg-green-100 text-green-800',
  B: 'bg-blue-100 text-blue-800',
  C: 'bg-yellow-100 text-yellow-800',
  D: 'bg-orange-100 text-orange-800',
  F: 'bg-red-100 text-red-800',
};

function computeGrades(s: StateSummary) {
  const violent = gradeFromRate(s.violentRate, NAT_VIOLENT);
  const property = gradeFromRate(s.propertyRate, NAT_PROPERTY);
  const trend = trendGrade(s.violentChange, s.propertyChange);
  const safety = gpaLetter((gpaValue(violent) + gpaValue(property)) / 2);
  const gpa = (gpaValue(violent) * 0.35 + gpaValue(property) * 0.25 + gpaValue(trend) * 0.2 + gpaValue(safety) * 0.2);
  const overall = gpaLetter(gpa);
  return { violent, property, trend, safety, overall, gpa };
}

export default function StateReportCardIndex() {
  const states = loadData<StateSummary[]>('state-summary.json');
  const graded = states.map(s => ({ ...s, grades: computeGrades(s) })).sort((a, b) => b.grades.gpa - a.grades.gpa);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'State Report Cards' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">State Crime Report Cards</h1>
      <p className="text-lg text-gray-600 mb-6">
        Every state graded A through F on violent crime, property crime, trends, and overall safety.
        Based on {new Date().getFullYear()} FBI data.
      </p>

      <AIOverview insights={[
        `${graded.filter(s => s.grades.overall === 'A').length} states earned an A overall`,
        `${graded.filter(s => s.grades.overall === 'F').length} states received an F grade`,
        `${graded[0].name} ranks #1 with a ${graded[0].grades.gpa.toFixed(1)} GPA`,
        'Grades based on comparison to national averages: violent crime (359.1) and property crime (1,760.1) per 100K',
      ]} />

      <ShareButtons title="State Crime Report Cards" />

      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 text-left">
              <th className="py-2 pr-2">#</th>
              <th className="py-2 pr-4">State</th>
              <th className="py-2 px-2 text-center">Overall</th>
              <th className="py-2 px-2 text-center">Violent</th>
              <th className="py-2 px-2 text-center">Property</th>
              <th className="py-2 px-2 text-center">Trend</th>
              <th className="py-2 px-2 text-center">Safety</th>
              <th className="py-2 px-2 text-right">GPA</th>
            </tr>
          </thead>
          <tbody>
            {graded.map((s, i) => (
              <tr key={s.abbr} className="border-b hover:bg-gray-50">
                <td className="py-2 pr-2 text-gray-500">{i + 1}</td>
                <td className="py-2 pr-4">
                  <Link href={`/state-report-card/${s.abbr.toLowerCase()}`} className="text-[#1e3a5f] font-medium hover:underline">
                    {s.name}
                  </Link>
                </td>
                {['overall', 'violent', 'property', 'trend', 'safety'].map(key => (
                  <td key={key} className="py-2 px-2 text-center">
                    <span className={`inline-block w-8 h-8 leading-8 rounded-full text-xs font-bold ${gradeColors[s.grades[key as keyof typeof s.grades] as string]}`}>
                      {s.grades[key as keyof typeof s.grades]}
                    </span>
                  </td>
                ))}
                <td className="py-2 px-2 text-right font-mono">{s.grades.gpa.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'State Crime Report Cards',
        description: 'Every US state graded on crime safety',
        url: 'https://www.opencrime.us/state-report-card',
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Which state has the best crime report card?', acceptedAnswer: { '@type': 'Answer', text: `${graded[0].name} has the highest GPA at ${graded[0].grades.gpa.toFixed(1)}.` }},
          { '@type': 'Question', name: 'How are state crime grades calculated?', acceptedAnswer: { '@type': 'Answer', text: 'States are graded A-F by comparing their violent and property crime rates to national averages. A = less than 50% of average, F = more than 150% of average.' }},
          { '@type': 'Question', name: 'What data is used for state crime report cards?', acceptedAnswer: { '@type': 'Answer', text: 'All grades are based on FBI Uniform Crime Reporting data for the most recent year available (2024).' }},
        ],
      })}} />
    </div>
  );
}
