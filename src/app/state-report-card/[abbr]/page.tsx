import type { Metadata } from 'next';
import Link from 'next/link';
import { loadData, fmtRate, fmtNum } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import ReportCardCharts from './ReportCardCharts';

type StateSummary = {
  abbr: string; name: string; population: number;
  violentRate: number; propertyRate: number; homicideRate: number;
  violentChange: number; propertyChange: number;
};
type StateTrend = {
  abbr: string; name: string;
  years: { year: number; violentRate: number; propertyRate: number; homicideRate: number }[];
};
type CityIndex = {
  slug: string; city: string; state: string; population: number;
  violentRate: number; murderRate: number; propertyRate: number;
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
function trendGrade(vc: number, pc: number): string {
  const avg = (vc + pc) / 2;
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
  A: 'bg-green-100 text-green-800 border-green-300',
  B: 'bg-blue-100 text-blue-800 border-blue-300',
  C: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  D: 'bg-orange-100 text-orange-800 border-orange-300',
  F: 'bg-red-100 text-red-800 border-red-300',
};

export function generateStaticParams() {
  const states = loadData<StateSummary[]>('state-summary.json');
  return states.map(s => ({ abbr: s.abbr.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ abbr: string }> }): Promise<Metadata> {
  const { abbr } = await params;
  const states = loadData<StateSummary[]>('state-summary.json');
  const state = states.find(s => s.abbr.toLowerCase() === abbr);
  if (!state) return { title: 'State Not Found' };
  return {
    title: `${state.name} Crime Report Card — Safety Grade & Crime Data | OpenCrime`,
    description: `${state.name} crime report card with letter grades for violent crime, property crime, and safety trends. Is ${state.name} safe? See the data.`,
    alternates: { canonical: `https://www.opencrime.us/state-report-card/${abbr}` },
    openGraph: {
      title: `${state.name} Crime Report Card`,
      url: `https://www.opencrime.us/state-report-card/${abbr}`,
    },
  };
}

export default async function StateReportCardPage({ params }: { params: Promise<{ abbr: string }> }) {
  const { abbr } = await params;
  const states = loadData<StateSummary[]>('state-summary.json');
  const trends = loadData<StateTrend[]>('state-trends.json');
  const cities = loadData<CityIndex[]>('city-index.json');

  const state = states.find(s => s.abbr.toLowerCase() === abbr);
  if (!state) return <div className="max-w-4xl mx-auto px-4 py-8"><h1>State not found</h1></div>;

  const stateTrend = trends.find(t => t.abbr.toLowerCase() === abbr);
  const stateCities = cities.filter(c => {
    const stateNameLower = state.name.toLowerCase();
    return c.state.toLowerCase() === stateNameLower;
  });

  const safest = [...stateCities].sort((a, b) => a.violentRate - b.violentRate).slice(0, 5);
  const dangerous = [...stateCities].sort((a, b) => b.violentRate - a.violentRate).slice(0, 5);

  const violent = gradeFromRate(state.violentRate, NAT_VIOLENT);
  const property = gradeFromRate(state.propertyRate, NAT_PROPERTY);
  const trend = trendGrade(state.violentChange, state.propertyChange);
  const safety = gpaLetter((gpaValue(violent) + gpaValue(property)) / 2);
  const gpa = gpaValue(violent) * 0.35 + gpaValue(property) * 0.25 + gpaValue(trend) * 0.2 + gpaValue(safety) * 0.2;
  const overall = gpaLetter(gpa);

  const grades = [
    { label: 'Violent Crime', grade: violent, detail: `${fmtRate(state.violentRate)} per 100K (national avg: ${NAT_VIOLENT})` },
    { label: 'Property Crime', grade: property, detail: `${fmtRate(state.propertyRate)} per 100K (national avg: ${NAT_PROPERTY})` },
    { label: 'Trend', grade: trend, detail: `Violent ${state.violentChange > 0 ? '+' : ''}${state.violentChange.toFixed(1)}%, Property ${state.propertyChange > 0 ? '+' : ''}${state.propertyChange.toFixed(1)}% YoY` },
    { label: 'Safety', grade: safety, detail: 'Composite of violent + property crime' },
  ];

  const chartYears = stateTrend?.years.map(y => ({
    year: y.year, violentRate: y.violentRate, propertyRate: y.propertyRate, homicideRate: y.homicideRate,
  })) || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[
        { label: 'State Report Cards', href: '/state-report-card' },
        { label: state.name },
      ]} />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold">{state.name} Crime Report Card</h1>
          <p className="text-gray-600 mt-1">Population: {fmtNum(state.population)} · {state.abbr} · 2024 Data</p>
        </div>
        <div className={`text-center rounded-2xl border-2 px-8 py-4 ${gradeColors[overall]}`}>
          <div className="text-5xl font-bold">{overall}</div>
          <div className="text-sm font-medium mt-1">GPA: {gpa.toFixed(1)}/4.0</div>
        </div>
      </div>

      <AIOverview insights={[
        `${state.name} receives an overall grade of ${overall} (GPA: ${gpa.toFixed(1)})`,
        `Violent crime rate: ${fmtRate(state.violentRate)} per 100K (${((state.violentRate / NAT_VIOLENT - 1) * 100).toFixed(0)}% ${state.violentRate > NAT_VIOLENT ? 'above' : 'below'} national average)`,
        `Murder rate: ${fmtRate(state.homicideRate)} per 100K`,
        `Year-over-year violent crime change: ${state.violentChange > 0 ? '+' : ''}${state.violentChange.toFixed(1)}%`,
      ]} />

      <ShareButtons title={`${state.name} Crime Report Card`} />

      {/* Grade cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-8">
        {grades.map(g => (
          <div key={g.label} className={`rounded-xl border-2 p-4 text-center ${gradeColors[g.grade]}`}>
            <div className="text-4xl font-bold">{g.grade}</div>
            <div className="text-sm font-bold mt-1">{g.label}</div>
            <div className="text-xs mt-1 opacity-75">{g.detail}</div>
          </div>
        ))}
      </div>

      {/* Key Stats */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4">Key Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Violent Crime Rate', value: fmtRate(state.violentRate), sub: 'per 100K' },
            { label: 'Property Crime Rate', value: fmtRate(state.propertyRate), sub: 'per 100K' },
            { label: 'Murder Rate', value: fmtRate(state.homicideRate), sub: 'per 100K' },
            { label: 'Population', value: fmtNum(state.population), sub: '2024' },
            { label: 'Violent Trend', value: `${state.violentChange > 0 ? '+' : ''}${state.violentChange.toFixed(1)}%`, sub: 'YoY change' },
            { label: 'Property Trend', value: `${state.propertyChange > 0 ? '+' : ''}${state.propertyChange.toFixed(1)}%`, sub: 'YoY change' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
              <div className="text-xs text-gray-400">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      {chartYears.length > 0 && <div className="mb-8"><ReportCardCharts years={chartYears} /></div>}

      {/* Cities */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {safest.length > 0 && (
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="font-heading text-lg font-bold text-green-800 mb-3">🛡️ Top 5 Safest Cities</h3>
            <ol className="space-y-2">
              {safest.map((c, i) => (
                <li key={c.slug} className="flex justify-between">
                  <Link href={`/cities/${c.slug}`} className="text-green-700 hover:underline">{i + 1}. {c.city}</Link>
                  <span className="text-sm text-green-600">{fmtRate(c.violentRate)}/100K</span>
                </li>
              ))}
            </ol>
          </div>
        )}
        {dangerous.length > 0 && (
          <div className="bg-red-50 rounded-xl p-6">
            <h3 className="font-heading text-lg font-bold text-red-800 mb-3">⚠️ Top 5 Most Dangerous Cities</h3>
            <ol className="space-y-2">
              {dangerous.map((c, i) => (
                <li key={c.slug} className="flex justify-between">
                  <Link href={`/cities/${c.slug}`} className="text-red-700 hover:underline">{i + 1}. {c.city}</Link>
                  <span className="text-sm text-red-600">{fmtRate(c.violentRate)}/100K</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="font-heading text-lg font-bold mb-3">See More</h3>
        <div className="flex flex-wrap gap-3">
          <Link href={`/states/${abbr}`} className="text-[#1e3a5f] hover:underline font-medium">Full {state.name} Crime Data →</Link>
          <Link href="/state-report-card" className="text-[#1e3a5f] hover:underline font-medium">All State Report Cards →</Link>
          <Link href="/rankings" className="text-[#1e3a5f] hover:underline font-medium">State Rankings →</Link>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `${state.name} Crime Report Card`,
        description: `${state.name} crime safety grade: ${overall}. Violent crime rate: ${state.violentRate} per 100K.`,
        url: `https://www.opencrime.us/state-report-card/${abbr}`,
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: `What is ${state.name}'s crime grade?`, acceptedAnswer: { '@type': 'Answer', text: `${state.name} receives an overall grade of ${overall} with a GPA of ${gpa.toFixed(1)} out of 4.0.` }},
          { '@type': 'Question', name: `Is ${state.name} safe?`, acceptedAnswer: { '@type': 'Answer', text: `${state.name}'s violent crime rate is ${fmtRate(state.violentRate)} per 100,000, which is ${state.violentRate > NAT_VIOLENT ? 'above' : 'below'} the national average of ${NAT_VIOLENT}.` }},
          { '@type': 'Question', name: `What is the murder rate in ${state.name}?`, acceptedAnswer: { '@type': 'Answer', text: `${state.name}'s murder rate is ${fmtRate(state.homicideRate)} per 100,000 residents.` }},
        ],
      })}} />
    </div>
  );
}
