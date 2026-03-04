import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Organized Retail Theft — Is Shoplifting Really Surging?',
  description: 'Examining the organized retail theft narrative. What FBI data says vs what retailers claim. Shrinkage data, flash mob robberies, and prosecutorial gaps.',
  openGraph: { title: 'Organized Retail Theft', description: 'Is shoplifting really surging? What the data actually shows vs the narrative.' },
};

export default function RetailTheftPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Organized Retail Theft' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">Organized Retail Theft: Is Shoplifting Really Out of Control?</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600">
          Viral videos of brazen shoplifting. Major retailers citing &quot;shrinkage.&quot; Store closures 
          blamed on theft. But what does the actual data show?
        </p>

        <h2 className="font-heading">The Narrative vs the Data</h2>
        <p>
          In 2022-2023, organized retail theft became a dominant media narrative. Retailers reported 
          billions in losses. Videos of flash mob robberies went viral. Politicians called for crackdowns. 
          But the data tells a more complicated story.
        </p>
        <p>
          <strong>FBI larceny-theft data</strong> shows a long-term decline in overall larceny rates — 
          down roughly 40% since the early 2000s. The FBI does not separately track shoplifting 
          from other forms of larceny-theft, making it impossible to isolate retail theft trends 
          from national crime data.
        </p>

        <h2 className="font-heading">The &quot;Shrinkage&quot; Problem</h2>
        <p>
          Retailers often cite &quot;shrinkage&quot; — the difference between expected and actual 
          inventory — as evidence of rising theft. The National Retail Federation (NRF) claimed 
          $100 billion in annual losses. But &quot;shrinkage&quot; includes:
        </p>
        <ul>
          <li><strong>External theft</strong> (shoplifting, ORC) — estimated 36% of shrinkage</li>
          <li><strong>Employee theft</strong> — roughly 29% (often underdiscussed)</li>
          <li><strong>Administrative/process errors</strong> — roughly 27% (mislabeled items, scanning errors, spoilage)</li>
          <li><strong>Vendor fraud</strong> — roughly 5%</li>
          <li><strong>Unknown causes</strong> — 3%</li>
        </ul>
        <p>
          The NRF actually <strong>retracted</strong> its widely-cited $100 billion figure in 2024, 
          admitting the methodology was flawed. Several major retailers (including Target and Walgreens) 
          later acknowledged they had overstated the role of theft in store closures and financial 
          performance.
        </p>

        <h2 className="font-heading">What IS Real</h2>
        <p>
          This isn&apos;t to say organized retail theft doesn&apos;t exist. Several trends are documented:
        </p>
        <ul>
          <li><strong>Professional boosting crews</strong> that steal to order, targeting specific high-value items for resale on online marketplaces</li>
          <li><strong>Flash mob robberies</strong> (coordinated group grabs) that are visually dramatic and genuinely traumatizing for employees</li>
          <li><strong>Resale through Amazon, eBay, Facebook Marketplace</strong> — online platforms have made it easier to monetize stolen goods</li>
          <li><strong>Prosecutorial gaps</strong> in some jurisdictions where DA offices have deprioritized property crime prosecution</li>
        </ul>

        <h2 className="font-heading">The Self-Checkout Factor</h2>
        <p>
          One underreported factor: the massive expansion of self-checkout. Retailers saved billions 
          on labor costs by replacing cashiers with self-checkout machines, then blamed customers 
          when shrinkage increased. Studies suggest self-checkout increases &quot;shrinkage&quot; 
          by 4-5% — some of it intentional theft, much of it honest scanning errors.
        </p>

        <h2 className="font-heading">Policy Response</h2>
        <p>Several states have responded to the retail theft narrative:</p>
        <ul>
          <li><strong>California Prop 36 (2024):</strong> Lowered the felony theft threshold, partially reversing Prop 47</li>
          <li><strong>INFORM Act (federal, 2023):</strong> Requires online marketplaces to verify high-volume sellers</li>
          <li><strong>Multiple states</strong> increased penalties for organized retail theft specifically</li>
          <li><strong>Retailer-funded task forces</strong> in several major metro areas</li>
        </ul>

        <h2 className="font-heading">The Takeaway</h2>
        <p>
          Organized retail theft is a real phenomenon, but its scale has been significantly exaggerated 
          by retailers who benefited from the narrative (justifying store closures, depressed financial 
          expectations, and lobbying for policy changes). The FBI data doesn&apos;t show a larceny 
          crisis — it shows continued long-term decline. The truth, as usual, is somewhere between 
          &quot;everything is fine&quot; and &quot;civilization is collapsing.&quot;
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/property-crime" className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition">Property Crime</Link>
        <Link href="/cargo-theft" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Cargo Theft</Link>
        <Link href="/analysis/property-crime-surge" className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition">Property Crime Analysis</Link>
      </div>

      <div className="mt-8"><ShareButtons title="Organized Retail Theft" /></div>

      <p className="text-sm text-gray-500 mt-8">Source: FBI Crime Data Explorer (larceny-theft), NRF National Retail Security Survey, various retailer earnings calls.</p>
    </div>
  );
}
