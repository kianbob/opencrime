import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'The Fentanyl Crisis — How Synthetic Opioids Are Reshaping Crime',
  description: 'Fentanyl now kills 70,000+ Americans per year. How synthetic opioids have reshaped drug markets, violent crime patterns, and law enforcement priorities.',
  openGraph: { title: 'The Fentanyl Crisis', description: 'How synthetic opioids are reshaping crime in America. 70,000+ deaths per year.' },
};

export default function FentanylCrisisPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Fentanyl Crisis' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">The Fentanyl Crisis: How Synthetic Opioids Are Reshaping American Crime</h1>

      <div className="bg-red-900 text-white rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">70,000+</div>
            <div className="text-red-200 text-sm">Fentanyl Deaths Per Year</div>
          </div>
          <div>
            <div className="text-3xl font-bold">150x</div>
            <div className="text-red-200 text-sm">More Potent Than Morphine</div>
          </div>
          <div>
            <div className="text-3xl font-bold">$1,500/kg</div>
            <div className="text-red-200 text-sm">Wholesale Cost (vs $50K for Heroin)</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600">
          Fentanyl has become the deadliest drug crisis in American history, killing more people annually 
          than car accidents, gun violence, or any single disease under age 50. Its impact on crime 
          statistics is profound — and often misunderstood.
        </p>

        <h2 className="font-heading">Why Fentanyl Changed Everything</h2>
        <p>
          Previous drug epidemics — crack cocaine in the 1980s, methamphetamine in the 2000s, prescription 
          opioids in the 2010s — all fueled crime waves. Fentanyl is different in critical ways:
        </p>
        <ul>
          <li><strong>Economics:</strong> A kilogram of fentanyl (~$1,500 from China/Mexico) produces the same number of doses as a kilogram of heroin (~$50,000). The profit margins are extraordinary.</li>
          <li><strong>Potency:</strong> 150x stronger than morphine means doses are measured in micrograms. A briefcase can hold a city&apos;s supply.</li>
          <li><strong>Lethality:</strong> The margin between a &quot;high&quot; and a fatal overdose is razor-thin. Users die not from chronic use but from inconsistent dosing.</li>
          <li><strong>Supply chain:</strong> Precursor chemicals from China → Mexican cartel labs → US distribution. No poppy fields needed.</li>
        </ul>

        <h2 className="font-heading">Impact on Violent Crime</h2>
        <p>
          Fentanyl&apos;s impact on violent crime is complex. Unlike crack cocaine, which was strongly 
          associated with turf wars and street violence, fentanyl&apos;s relationship to violent crime 
          operates differently:
        </p>
        <ul>
          <li><strong>Drug market violence:</strong> Territorial disputes still occur, but fentanyl&apos;s compact size makes it easier to move discreetly, potentially reducing street-level confrontations</li>
          <li><strong>Desperation crimes:</strong> Addicted users commit robberies, burglaries, and thefts to fund their habit — a pattern common to all opioid epidemics</li>
          <li><strong>Homicide misclassification:</strong> Some fentanyl poisonings (dealers selling tainted drugs) could arguably be classified as homicides but rarely are</li>
          <li><strong>Domestic violence:</strong> Substance abuse is a factor in roughly 40-60% of domestic violence incidents</li>
        </ul>

        <h2 className="font-heading">Impact on Property Crime</h2>
        <p>
          The property crime connection is more direct. Opioid addiction is extraordinarily expensive — 
          a heavy fentanyl user may need $100-300 per day. Common property crimes linked to addiction:
        </p>
        <ul>
          <li><strong>Shoplifting/retail theft:</strong> Organized boosting rings often fund drug operations</li>
          <li><strong>Catalytic converter theft:</strong> Quick cash from precious metals</li>
          <li><strong>Car break-ins:</strong> Smash-and-grab for anything sellable</li>
          <li><strong>Burglary:</strong> Targeting homes and businesses for electronics, tools, anything with resale value</li>
          <li><strong>Package theft:</strong> Porch piracy has increased alongside addiction rates</li>
        </ul>

        <h2 className="font-heading">The Arrest Data</h2>
        <p>
          FBI arrest data shows drug abuse violations remain one of the top arrest categories — 
          over 1.1 million drug arrests annually. However, many jurisdictions have shifted from 
          arresting users to targeting distribution networks. The trend toward treating addiction 
          as a public health issue rather than a criminal justice issue is reshaping arrest statistics 
          even as the crisis deepens.
        </p>

        <h2 className="font-heading">The Geographic Pattern</h2>
        <p>
          Fentanyl initially devastated the Northeast and Appalachia (regions already hit hard by 
          prescription opioids), but has now spread everywhere. Western states — previously more 
          affected by methamphetamine — have seen fentanyl deaths surge 300-500% since 2019. 
          No region is immune.
        </p>
        <p>
          Cities along major drug trafficking corridors (I-95, I-10, I-40) see higher volumes, 
          but even rural communities now report fentanyl-related overdoses and crimes.
        </p>

        <h2 className="font-heading">What the Data Can&apos;t Tell Us</h2>
        <p>
          FBI crime data has significant limitations when it comes to drug-related crime:
        </p>
        <ul>
          <li>Crimes aren&apos;t tagged with &quot;drug-motivated&quot; in UCR data</li>
          <li>Overdose deaths are tracked by CDC, not FBI — creating a data silo</li>
          <li>Many drug-related property crimes go unreported</li>
          <li>The connection between specific drugs and specific crimes requires local-level analysis that national data can&apos;t provide</li>
        </ul>

        <h2 className="font-heading">The Bottom Line</h2>
        <p>
          Fentanyl is the defining drug crisis of this era. Its impact on crime is real but diffuse — 
          driving property crime, fueling some violent crime, overwhelming law enforcement, and 
          killing more Americans than any illicit drug in history. Understanding this crisis requires 
          looking beyond FBI crime statistics to the broader public health and economic data.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/analysis/drug-crime" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Drug-Crime Connection</Link>
        <Link href="/drug-arrests" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Drug Arrest Data</Link>
        <Link href="/property-crime" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Property Crime</Link>
      </div>

      <div className="mt-8"><ShareButtons title="The Fentanyl Crisis" /></div>
      <p className="text-sm text-gray-500 mt-8">Sources: FBI Crime Data Explorer, CDC WONDER, DEA Intelligence Reports.</p>
    </div>
  );
}
