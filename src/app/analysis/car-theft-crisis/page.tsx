import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'The Car Theft Crisis — Why Vehicle Theft Is Surging',
  description: 'Motor vehicle theft surged 25%+ since 2019. The Kia/Hyundai vulnerability, organized theft rings, and why your car is less safe than you think.',
  openGraph: { title: 'The Car Theft Crisis', description: 'Vehicle theft surged 25% since 2019. A design flaw, TikTok, and organized crime.' },
};

export default function CarTheftPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Car Theft Crisis' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">The Car Theft Crisis: Why Vehicle Theft Is Surging</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600">
          While most crime categories have been declining for decades, motor vehicle theft has surged 
          roughly 25% since 2019. The reasons reveal a fascinating intersection of technology, 
          social media, and organized crime.
        </p>

        <h2 className="font-heading">The Kia/Hyundai Factor</h2>
        <p>
          The single biggest driver of the car theft surge is a design vulnerability in millions of 
          Hyundai and Kia vehicles manufactured between 2011 and 2022. These cars lacked electronic 
          immobilizers — a standard anti-theft technology in virtually every other brand — making 
          them startable with a USB cable in under 60 seconds.
        </p>
        <p>
          The vulnerability went viral in 2022 when the &quot;Kia Boys&quot; trend spread across social 
          media, particularly TikTok, with videos showing teenagers stealing and joyriding in these 
          vehicles. The result: Kia/Hyundai thefts increased by 900%+ in some cities.
        </p>
        <p>
          Cities like Milwaukee, St. Louis, and Columbus saw their auto theft rates double or triple, 
          driven almost entirely by this one vulnerability. Insurance companies began refusing to cover 
          affected models, and Hyundai/Kia eventually released a software update — but for millions 
          of already-sold vehicles with no hardware immobilizer, the fix was imperfect.
        </p>

        <h2 className="font-heading">Organized Theft Rings</h2>
        <p>
          Beyond the opportunistic Kia Boys phenomenon, organized vehicle theft has become increasingly 
          sophisticated:
        </p>
        <ul>
          <li><strong>Relay attacks:</strong> Thieves use signal amplifiers to extend the range of key fob signals, unlocking and starting cars while the owner&apos;s keys are inside their home.</li>
          <li><strong>CAN bus hacking:</strong> Sophisticated thieves can access a vehicle&apos;s Controller Area Network through headlight wiring, bypassing all security.</li>
          <li><strong>Catalytic converter theft:</strong> While not the vehicle itself, catalytic converter theft has exploded due to precious metal prices (palladium, rhodium, platinum).</li>
          <li><strong>Export operations:</strong> Stolen vehicles, particularly trucks and SUVs, are shipped overseas within hours — often through ports in Florida, Texas, and California.</li>
        </ul>

        <h2 className="font-heading">Which Cars Are Stolen Most?</h2>
        <p>The most stolen vehicles in America consistently include:</p>
        <ul>
          <li><strong>Hyundai Elantra &amp; Sonata, Kia Optima &amp; Sportage</strong> (the vulnerability models)</li>
          <li><strong>Chevrolet/GMC full-size pickups</strong> (valuable parts, popular for export)</li>
          <li><strong>Honda Civic &amp; Accord</strong> (parts interchangeability across model years)</li>
          <li><strong>Ford F-150</strong> (the best-selling vehicle in America)</li>
        </ul>

        <h2 className="font-heading">The Recovery Problem</h2>
        <p>
          Only about 50-60% of stolen vehicles are recovered, and many are stripped for parts within 
          hours. The rise of &quot;chop shops&quot; and online parts marketplaces has made it easier 
          to profit from stolen vehicles without selling the whole car.
        </p>
        <p>
          Law enforcement faces resource constraints — auto theft investigation typically receives 
          lower priority than violent crime, and the cross-jurisdictional nature of organized theft 
          complicates prosecution. The average police department clears (solves) fewer than 10% of 
          auto theft cases.
        </p>

        <h2 className="font-heading">What&apos;s Being Done</h2>
        <ul>
          <li>Hyundai/Kia released software updates and free steering wheel locks</li>
          <li>Several states passed laws requiring immobilizers in all new vehicles</li>
          <li>Multi-agency auto theft task forces have been expanded in major metro areas</li>
          <li>GPS tracking subscription services (like LoJack) are seeing renewed interest</li>
        </ul>

        <h2 className="font-heading">The Broader Lesson</h2>
        <p>
          The car theft surge illustrates how a single design vulnerability, amplified by social media, 
          can create a crime wave that overwhelms local law enforcement. It also shows that crime 
          trends aren&apos;t always driven by the factors we assume — this surge has nothing to do 
          with poverty, policing levels, or sentencing policy. It&apos;s fundamentally a technology 
          and design failure.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/property-crime" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Property Crime</Link>
        <Link href="/cargo-theft" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Cargo Theft</Link>
      </div>

      <div className="mt-8"><ShareButtons title="The Car Theft Crisis" /></div>

      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer, NICB Hot Wheels Report, Insurance Institute data.</p>
    </div>
  );
}
