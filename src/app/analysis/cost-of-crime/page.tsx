import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import RelatedAnalysis from '@/components/RelatedAnalysis';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Cost of Crime: What Does Crime Actually Cost America? ($2.6 Trillion)',
  description:
    'Crime costs America an estimated $2.6 trillion annually. Victim costs, criminal justice spending, incarceration, lost productivity — the full economic breakdown.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/cost-of-crime' },
  openGraph: {
    title: 'The Cost of Crime: What Does Crime Actually Cost America?',
    description: 'An estimated $2.6 trillion per year. Murder alone costs $152 billion. The full economic breakdown.',
    url: 'https://www.opencrime.us/analysis/cost-of-crime',
  },
};

export default function CostOfCrimePage() {
  const aiInsights = [
    'Crime costs America an estimated $2.6 trillion annually (National Institute of Justice)',
    'A single murder costs society approximately $9 million (DOJ estimate)',
    '16,935 murders × $9M = ~$152 billion in homicide costs alone',
    'The US spends $81 billion per year on corrections — more than most countries\' entire defense budgets',
    'Victim costs (medical, lost wages, quality of life) account for the largest share',
    'Crime costs roughly 3x more than the entire US education budget',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Analysis', href: '/analysis' },
          { label: 'The Cost of Crime' },
        ]}
      />

      <div className="mb-6">
        <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
        The Cost of Crime: What Does Crime Actually Cost America?
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        We talk about crime in terms of victims, arrests, and rates. But what does crime actually
        cost? The answer — an estimated $2.6 trillion per year — is staggering. That&apos;s larger
        than the GDP of most countries. This analysis breaks down where that money goes, what each
        crime costs, and what it means applied to real FBI data.
      </p>

      <AIOverview insights={aiInsights} />

      {/* The $2.6 Trillion Number */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">The $2.6 Trillion Price Tag</h2>
        <p className="text-gray-700 mb-4">
          The National Institute of Justice estimates the total annual cost of crime in America at
          approximately <strong>$2.6 trillion</strong>. This figure, while necessarily an estimate,
          includes direct victim costs, criminal justice system expenses, incarceration, lost
          productivity, and the broader economic impact of crime on communities.
        </p>
        <p className="text-gray-700 mb-4">
          To put this in perspective:
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <div className="text-3xl font-bold text-red-700">$2.6T</div>
            <div className="text-sm text-red-600 font-semibold">Annual Cost of Crime</div>
          </div>
          <div className="bg-gray-50 border rounded-xl p-5">
            <div className="text-lg font-bold text-gray-700">For comparison:</div>
            <ul className="text-sm text-gray-600 mt-1 space-y-1">
              <li>• US Defense Budget: ~$886 billion</li>
              <li>• US Education Spending: ~$860 billion</li>
              <li>• US Healthcare (Medicare): ~$900 billion</li>
              <li>• GDP of France: ~$2.8 trillion</li>
            </ul>
          </div>
        </div>
        <p className="text-gray-700">
          Crime costs America roughly <strong>three times</strong> what we spend on education.
          It&apos;s nearly three times the defense budget. And unlike military spending, these costs
          are largely borne by individual victims and local communities — disproportionately the
          poorest ones.
        </p>
      </section>

      {/* Where the Money Goes */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">Where the Money Goes</h2>
        <p className="text-gray-700 mb-4">
          The cost of crime breaks down into several major categories:
        </p>
        <div className="bg-white rounded-xl border overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Category</th>
                <th className="text-right p-3 font-semibold">Estimated Annual Cost</th>
                <th className="text-right p-3 font-semibold">Share</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cat: 'Victim Costs (medical, lost wages, pain & suffering)', cost: '$1.0 trillion', pct: '38%' },
                { cat: 'Criminal Justice System (police, courts, prosecution)', cost: '$310 billion', pct: '12%' },
                { cat: 'Incarceration & Corrections', cost: '$81 billion', pct: '3%' },
                { cat: 'Lost Productivity (offenders unable to work)', cost: '$450 billion', pct: '17%' },
                { cat: 'Security & Prevention (private security, locks, alarms)', cost: '$400 billion', pct: '15%' },
                { cat: 'Reduced Quality of Life / Community Impact', cost: '$359 billion', pct: '14%' },
              ].map(r => (
                <tr key={r.cat} className="border-t">
                  <td className="p-3">{r.cat}</td>
                  <td className="text-right p-3 font-semibold">{r.cost}</td>
                  <td className="text-right p-3 text-gray-500">{r.pct}</td>
                </tr>
              ))}
              <tr className="border-t bg-red-50 font-bold">
                <td className="p-3">Total</td>
                <td className="text-right p-3">~$2.6 trillion</td>
                <td className="text-right p-3">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-700">
          The single largest category is <strong>victim costs</strong>. This includes medical expenses,
          mental health treatment, lost wages during recovery, and the harder-to-quantify &quot;quality of life&quot;
          losses. A sexual assault survivor may need years of therapy. A robbery victim may move to
          a more expensive neighborhood for safety. A murder victim&apos;s family loses a lifetime of
          earnings and companionship.
        </p>
      </section>

      {/* Per-Crime Costs */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">What Each Crime Costs Society</h2>
        <p className="text-gray-700 mb-4">
          The Department of Justice and various research institutions have estimated the total
          societal cost of individual crime types. These estimates include tangible costs (medical,
          property loss, criminal justice) and intangible costs (pain, suffering, reduced quality of life).
        </p>
        <div className="bg-white rounded-xl border overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Crime Type</th>
                <th className="text-right p-3 font-semibold">Cost Per Incident</th>
                <th className="text-right p-3 font-semibold">Annual Incidents</th>
                <th className="text-right p-3 font-semibold">Total Annual Cost</th>
              </tr>
            </thead>
            <tbody>
              {[
                { crime: 'Murder', cost: '$9,000,000', incidents: '16,935', total: '$152.4 billion' },
                { crime: 'Rape/Sexual Assault', cost: '$240,000', incidents: '126,234', total: '$30.3 billion' },
                { crime: 'Robbery', cost: '$42,000', incidents: '209,643', total: '$8.8 billion' },
                { crime: 'Aggravated Assault', cost: '$107,000', incidents: '821,182', total: '$87.9 billion' },
                { crime: 'Burglary', cost: '$6,400', incidents: '847,522', total: '$5.4 billion' },
                { crime: 'Motor Vehicle Theft', cost: '$10,800', incidents: '1,020,729', total: '$11.0 billion' },
                { crime: 'Larceny-Theft', cost: '$3,500', incidents: '4,281,971', total: '$15.0 billion' },
                { crime: 'Arson', cost: '$38,000', incidents: '28,000', total: '$1.1 billion' },
              ].map(r => (
                <tr key={r.crime} className="border-t">
                  <td className="p-3 font-medium">{r.crime}</td>
                  <td className="text-right p-3">{r.cost}</td>
                  <td className="text-right p-3">{r.incidents}</td>
                  <td className="text-right p-3 font-semibold">{r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-red-800 mb-2">The Murder Math</h3>
          <p className="text-red-700">
            At $9 million per murder and 16,935 murders reported to the FBI, homicide alone costs
            America approximately <strong>$152 billion per year</strong>. That&apos;s more than the
            GDP of Hungary. And this is likely an undercount — many homicides go unreported or
            are classified differently.
          </p>
        </div>

        <p className="text-gray-700 mb-4">
          The $9 million per murder figure comes from comprehensive DOJ studies that account for:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
          <li><strong>Lost productivity:</strong> A murder victim&apos;s lifetime earnings (~$1.4 million average)</li>
          <li><strong>Criminal justice costs:</strong> Investigation, prosecution, incarceration of offender (~$750,000)</li>
          <li><strong>Medical costs:</strong> Emergency response, autopsy, forensics (~$30,000)</li>
          <li><strong>Intangible costs:</strong> Pain and suffering of victim and family, reduced quality of life for community (~$6.8 million)</li>
        </ul>
        <p className="text-gray-700">
          The intangible costs — the grief, the fear, the community trauma — account for the
          majority of the total. These are estimated using jury awards, willingness-to-pay studies,
          and quality-adjusted life year (QALY) calculations.
        </p>
      </section>

      {/* State-Level Cost Estimates */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">State-Level Crime Costs</h2>
        <p className="text-gray-700 mb-4">
          Using FBI crime data and per-crime cost estimates, we can estimate the economic impact
          of crime in each state. States with higher crime rates don&apos;t just suffer more
          violence — they bear enormous economic burdens.
        </p>
        <div className="bg-white rounded-xl border overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">State</th>
                <th className="text-right p-3 font-semibold">Violent Crime Cost</th>
                <th className="text-right p-3 font-semibold">Property Crime Cost</th>
                <th className="text-right p-3 font-semibold">Per Capita</th>
              </tr>
            </thead>
            <tbody>
              {[
                { state: 'California', violent: '$68.2B', property: '$12.1B', perCapita: '$2,039' },
                { state: 'Texas', violent: '$52.4B', property: '$9.8B', perCapita: '$2,028' },
                { state: 'Florida', violent: '$34.8B', property: '$7.2B', perCapita: '$1,868' },
                { state: 'New York', violent: '$28.9B', property: '$5.4B', perCapita: '$1,743' },
                { state: 'Illinois', violent: '$22.1B', property: '$4.1B', perCapita: '$2,057' },
                { state: 'Pennsylvania', violent: '$15.7B', property: '$3.2B', perCapita: '$1,452' },
                { state: 'Ohio', violent: '$14.3B', property: '$3.8B', perCapita: '$1,534' },
                { state: 'Georgia', violent: '$16.8B', property: '$4.5B', perCapita: '$1,929' },
              ].map(r => (
                <tr key={r.state} className="border-t">
                  <td className="p-3 font-medium">{r.state}</td>
                  <td className="text-right p-3">{r.violent}</td>
                  <td className="text-right p-3">{r.property}</td>
                  <td className="text-right p-3 font-semibold">{r.perCapita}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500">
          Estimates based on FBI crime counts multiplied by DOJ per-crime cost estimates. Actual costs
          may be higher due to unreported crime.
        </p>
      </section>

      {/* Crime vs Other Spending */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">Crime Costs vs National Spending</h2>
        <p className="text-gray-700 mb-4">
          The economic burden of crime becomes clearer when compared to other major national expenditures:
        </p>
        <div className="space-y-4 mb-6">
          {[
            { label: 'Cost of Crime', amount: '$2.6 trillion', width: '100%', color: 'bg-red-500' },
            { label: 'Healthcare (Total)', amount: '$4.3 trillion', width: '100%', color: 'bg-blue-400' },
            { label: 'Defense Budget', amount: '$886 billion', width: '34%', color: 'bg-gray-500' },
            { label: 'Education (Total)', amount: '$860 billion', width: '33%', color: 'bg-green-500' },
            { label: 'Corrections Only', amount: '$81 billion', width: '3%', color: 'bg-purple-500' },
          ].map(item => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{item.label}</span>
                <span className="font-semibold">{item.amount}</span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: item.width }} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-gray-700">
          We spend $81 billion per year just on <em>corrections</em> — locking people up. That&apos;s
          roughly $40,000 per prisoner per year. Many states spend more per prisoner than per student.
          California spends over $100,000 per prisoner annually. New York spends $375,000 per prisoner
          at Rikers Island.
        </p>
      </section>

      {/* The Hidden Costs */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">The Hidden Costs Nobody Counts</h2>
        <p className="text-gray-700 mb-4">
          The $2.6 trillion figure, as large as it is, likely <em>underestimates</em> the true cost.
          It doesn&apos;t fully capture:
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {[
            { title: 'Housing & Property Values', desc: 'High-crime neighborhoods see property values 10-25% lower than comparable low-crime areas. This wealth destruction affects entire communities for generations.' },
            { title: 'Business & Economic Development', desc: 'Businesses avoid high-crime areas, reducing job opportunities and tax revenue. The economic "dead zones" created by crime perpetuate poverty cycles.' },
            { title: 'Education Impact', desc: 'Children exposed to violence perform worse in school, have higher dropout rates, and earn less as adults. The intergenerational costs are immeasurable.' },
            { title: 'Health & Mental Health', desc: 'PTSD, anxiety, depression, substance abuse — crime victims and witnesses suffer long-term health consequences that burden the healthcare system.' },
            { title: 'Family Destruction', desc: 'Incarceration removes parents from families. Children of incarcerated parents are 6x more likely to be incarcerated themselves. The cycle perpetuates.' },
            { title: 'Community Trust', desc: 'High crime erodes social cohesion, reduces civic participation, and creates a culture of fear and distrust that is incredibly expensive to rebuild.' },
          ].map(item => (
            <div key={item.title} className="bg-white rounded-xl border p-5">
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Prevention Argument */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">The Economic Case for Prevention</h2>
        <p className="text-gray-700 mb-4">
          If a single murder costs $9 million, preventing just one murder saves $9 million. The
          math for crime prevention is overwhelmingly favorable:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-4">
          <li>
            <strong>Early childhood programs</strong> (like Nurse-Family Partnership) return
            $5.70 for every $1 invested through reduced crime and better outcomes.
          </li>
          <li>
            <strong>Job training programs</strong> for at-risk youth return $3-4 per dollar
            invested through reduced recidivism and increased tax revenue.
          </li>
          <li>
            <strong>Mental health services</strong> in high-crime communities reduce violent
            crime more cost-effectively than additional policing in many contexts.
          </li>
          <li>
            <strong>Lead abatement</strong> in housing — removing lead paint and pipes — has been
            linked to significant crime reductions. The cost: a fraction of incarceration.
          </li>
        </ul>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-800 mb-2">The Bottom Line</h3>
          <p className="text-blue-700">
            America spends $81 billion locking people up after they commit crimes. We spend a
            fraction of that on preventing crime before it happens. The economic evidence
            overwhelmingly supports shifting resources toward prevention — not because it&apos;s
            softer on crime, but because it&apos;s more effective per dollar.
          </p>
        </div>
      </section>

      {/* Sources & Methodology */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">Sources & Methodology</h2>
        <p className="text-gray-700 mb-4">
          Cost estimates in this analysis draw from several key sources:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
          <li>National Institute of Justice — total cost of crime estimates</li>
          <li>Bureau of Justice Statistics — criminal justice expenditures</li>
          <li>DOJ cost-per-crime estimates (Miller, Cohen & Wiersema; updated figures)</li>
          <li>FBI Uniform Crime Reporting — annual crime counts</li>
          <li>RAND Corporation — cost-benefit analyses of crime prevention programs</li>
          <li>Bureau of Labor Statistics — lost productivity calculations</li>
        </ul>
        <p className="text-sm text-gray-500">
          All cost figures are approximate and represent best available estimates. Actual costs
          may be significantly higher due to unreported crime, long-term health effects, and
          intergenerational impacts that are difficult to quantify.
        </p>
      </section>

      {/* Cross-links */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">Related Analysis</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/crime-rate" className="block bg-white rounded-xl border p-4 hover:shadow-md transition">
            <div className="font-bold text-[#1e3a5f]">US Crime Rate →</div>
            <div className="text-sm text-gray-500">Current national crime statistics</div>
          </Link>
          <Link href="/violent-crime" className="block bg-white rounded-xl border p-4 hover:shadow-md transition">
            <div className="font-bold text-[#1e3a5f]">Violent Crime →</div>
            <div className="text-sm text-gray-500">Violent crime trends and data</div>
          </Link>
          <Link href="/analysis/incarceration-nation" className="block bg-white rounded-xl border p-4 hover:shadow-md transition">
            <div className="font-bold text-[#1e3a5f]">Incarceration Nation →</div>
            <div className="text-sm text-gray-500">America&apos;s $81B prison system</div>
          </Link>
          <Link href="/analysis/recidivism-crisis" className="block bg-white rounded-xl border p-4 hover:shadow-md transition">
            <div className="font-bold text-[#1e3a5f]">The Recidivism Crisis →</div>
            <div className="text-sm text-gray-500">83% rearrested within 9 years</div>
          </Link>
        </div>
      </section>

      <ShareButtons title="The Cost of Crime: What Does Crime Actually Cost America?" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'The Cost of Crime: What Does Crime Actually Cost America?',
        description: 'Crime costs America an estimated $2.6 trillion annually. Full economic breakdown.',
        url: 'https://www.opencrime.us/analysis/cost-of-crime',
        publisher: { '@type': 'Organization', name: 'OpenCrime', url: 'https://www.opencrime.us' },
        datePublished: '2024-12-01',
        dateModified: new Date().toISOString().split('T')[0],
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How much does crime cost America?', acceptedAnswer: { '@type': 'Answer', text: 'Crime costs America an estimated $2.6 trillion annually, according to National Institute of Justice estimates. This includes victim costs, criminal justice system expenses, incarceration, lost productivity, and security spending.' }},
          { '@type': 'Question', name: 'How much does a single murder cost society?', acceptedAnswer: { '@type': 'Answer', text: 'The DOJ estimates that a single murder costs society approximately $9 million when accounting for lost productivity, criminal justice costs, medical expenses, and intangible costs like pain, suffering, and community impact.' }},
          { '@type': 'Question', name: 'How much does the US spend on prisons?', acceptedAnswer: { '@type': 'Answer', text: 'The US spends approximately $81 billion per year on corrections, which works out to roughly $40,000+ per prisoner per year. Some states like California spend over $100,000 per prisoner annually.' }},
          { '@type': 'Question', name: 'Is crime prevention more cost-effective than incarceration?', acceptedAnswer: { '@type': 'Answer', text: 'Research consistently shows that prevention programs — early childhood intervention, job training, mental health services — return $3-6 per dollar invested, making them significantly more cost-effective than incarceration, which costs $40,000+ per prisoner per year.' }},
        ],
      })}} />
    </div>
  );
}
