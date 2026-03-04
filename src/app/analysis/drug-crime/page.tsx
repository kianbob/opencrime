import RelatedAnalysis from '@/components/RelatedAnalysis';
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'The Drug-Crime Connection: From Crack to Fentanyl',
  description: 'How drug epidemics have shaped American crime waves. From the 1980s crack crisis to today\'s fentanyl surge — the data on drugs, violence, and arrests.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/drug-crime' },
};

export default function DrugCrimePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/analysis" className="hover:underline">Analysis</Link> / <span className="text-gray-800">Drug-Crime Connection</span>
      </nav>
      <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">The Drug-Crime Connection: From Crack to Fentanyl</h1>
      <p className="text-lg text-gray-600 mb-8">
        Every major American crime wave has a drug story behind it. Understanding the drug-crime connection 
        is essential to understanding why crime rises, falls, and concentrates where it does.
      </p>

      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">1985–1993</div>
            <div className="text-blue-200 text-sm">Crack Epidemic Peak</div>
          </div>
          <div>
            <div className="text-3xl font-bold">2× Murder</div>
            <div className="text-blue-200 text-sm">Rate Increase During Crack Era</div>
          </div>
          <div>
            <div className="text-3xl font-bold">110K+</div>
            <div className="text-blue-200 text-sm">Annual Fentanyl Deaths (2024)</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">Three Pathways from Drugs to Crime</h2>
        <p>Criminologist Paul Goldstein identified three ways drugs generate crime:</p>
        <ol>
          <li><strong>Psychopharmacological.</strong> Drug use directly causes violence through intoxication, withdrawal, or disinhibition. Alcohol is actually the largest driver in this category — far more than illegal drugs.</li>
          <li><strong>Economic-compulsive.</strong> Addicts commit crimes to fund their habit. This drives property crime (burglary, robbery, shoplifting) more than violence, but robberies can turn deadly.</li>
          <li><strong>Systemic.</strong> The drug market itself generates violence — turf wars, debt collection, robbery of dealers, witness intimidation. This is the biggest driver of drug-related homicide.</li>
        </ol>

        <h2 className="font-heading">The Crack Catastrophe (1985–1993)</h2>
        <p>
          No drug epidemic has shaped American crime more profoundly than crack cocaine. When crack hit 
          inner-city neighborhoods in the mid-1980s, it created an explosive combination: a highly addictive 
          substance with enormous profit margins, sold on street corners by armed young men competing for territory.
        </p>
        <p>
          The murder rate among Black males aged 14-24 tripled between 1985 and 1993. Cities like Washington DC, 
          New York, Detroit, and New Orleans became synonymous with drug violence. DC earned the nickname 
          &quot;Murder Capital&quot; with a homicide rate of 80 per 100,000 — sixteen times the national average.
        </p>
        <p>
          The crack market also produced mass incarceration. The federal 100:1 sentencing disparity between 
          crack and powder cocaine meant that crack offenders — disproportionately Black — received sentences 
          comparable to major drug kingpins. The US prison population doubled during the crack era.
        </p>

        <h2 className="font-heading">The Heroin-Opioid Wave (2010–2022)</h2>
        <p>
          Unlike crack, the opioid epidemic began in doctor&apos;s offices and pharmacies. Pharmaceutical 
          companies marketed opioid painkillers aggressively; doctors prescribed them freely; millions 
          became addicted. When prescriptions tightened, many users switched to heroin, then to synthetic 
          fentanyl.
        </p>
        <p>
          The opioid crisis killed more Americans than crack ever did — over 110,000 overdose deaths per 
          year at its peak. But it didn&apos;t generate the same spike in violent crime. Why? Several reasons:
        </p>
        <ul>
          <li>Opioids sedate users rather than energizing them (unlike crack and meth)</li>
          <li>The supply chain is more centralized and less street-level competitive</li>
          <li>Many users were in suburban and rural areas with different market dynamics</li>
          <li>Users are more likely to die than to commit violent crimes</li>
        </ul>
        <p>
          That said, the opioid epidemic did drive increases in property crime, particularly in rural areas 
          and small cities where users stole to fund their habit. And fentanyl&apos;s infiltration into other 
          drugs (cocaine, methamphetamine, counterfeit pills) has added unpredictable violence to drug markets.
        </p>

        <h2 className="font-heading">Methamphetamine: The Rural Drug</h2>
        <p>
          Meth has been a persistent driver of crime in rural America and the West for decades. Unlike 
          crack (urban) and opioids (suburban), meth is predominantly a rural and small-city drug. It 
          generates violence through psychosis and paranoia in heavy users, domestic violence, and the 
          hazards of clandestine labs.
        </p>
        <p>
          Mexican cartels have largely replaced domestic meth production with cheap, high-purity crystal 
          meth since the mid-2000s. This eliminated the lab explosions and toxic waste of the &quot;shake and bake&quot; 
          era but didn&apos;t reduce the crime associated with meth use — including assault, child neglect, 
          property crime, and identity theft.
        </p>

        <h2 className="font-heading">The Fentanyl Question</h2>
        <p>
          Fentanyl now contaminates virtually every illicit drug market in America. It&apos;s 50-100 times 
          more potent than morphine, dirt cheap to produce, and nearly impossible to dose accurately. 
          This means every drug transaction now carries a risk of death for the buyer — and increased 
          legal exposure for the seller.
        </p>
        <p>
          Some criminologists predict fentanyl could eventually reduce violent crime by the grim mechanism 
          of killing the most chaotic drug users before they commit violence. Others worry it will increase 
          violence as markets become more dangerous and desperate. The data so far is ambiguous — violent 
          crime is falling even as fentanyl deaths remain historically high.
        </p>

        <h2 className="font-heading">Policy Lessons</h2>
        <p>
          The drug-crime connection teaches several lessons:
        </p>
        <ul>
          <li><strong>Prohibition creates violence.</strong> It&apos;s the illegal market — not the drug itself — that generates most drug-related violence. Legal alcohol causes more individual violence than illegal drugs, but alcohol doesn&apos;t generate turf wars.</li>
          <li><strong>Enforcement alone can&apos;t solve drug problems.</strong> The War on Drugs spent over $1 trillion and incarcerated millions. Drugs are cheaper, purer, and more available than ever.</li>
          <li><strong>Different drugs create different crime patterns.</strong> Policy should target the specific harms of each substance rather than treating all drugs equally.</li>
          <li><strong>Treatment reduces crime.</strong> Programs that connect drug users to treatment — rather than incarceration — consistently show reduced recidivism and crime.</li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/analysis/crime-decline" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Crime Decline</Link>
        <Link href="/murder-rate" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Murder Rate</Link>
      </div>

      <div className="mt-8"><RelatedAnalysis currentSlug="drug-crime" />

      <ShareButtons title="The Drug-Crime Connection" /></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The Drug-Crime Connection: From Crack to Fentanyl',
        publisher: { '@type': 'Organization', name: 'OpenCrime' },
        datePublished: '2026-03-04',
      })}} />
    </div>
  );
}
