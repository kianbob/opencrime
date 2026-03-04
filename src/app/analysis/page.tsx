import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Crime Analysis — In-Depth Articles on US Crime Data',
  description: 'Data-driven analysis of US crime trends. The great crime decline, gun violence, property crime, rural vs urban crime, and more. All backed by FBI statistics.',
};

const articles = [
  { slug: 'crime-decline', title: 'The Great Crime Decline: Why America Is Safer Than You Think', desc: 'Violent crime has fallen 52% since 1991. We analyze 45 years of data to understand the biggest public safety story nobody talks about.', tag: 'DEEP DIVE' },
  { slug: 'gun-violence', title: 'Gun Violence by the Numbers: What FBI Data Actually Shows', desc: 'Firearms account for 77% of US murders. A data-driven look at gun violence patterns, weapon types, and geographic concentration.', tag: 'ANALYSIS' },
  { slug: 'property-crime-surge', title: 'The Property Crime Paradox: Why Theft Is Rising While Violence Falls', desc: 'Motor vehicle theft up 25% since 2019 while murder drops. Inside the diverging trends reshaping American crime.', tag: 'ANALYSIS' },
  { slug: 'rural-vs-urban', title: 'Rural vs Urban Crime: Shattering the Myths', desc: 'Crime isn\'t just a big-city problem. Small cities under 50K have higher per-capita violence than many major metros.', tag: 'DEEP DIVE' },
  { slug: 'racial-disparities', title: 'Crime Victimization: Who Bears the Burden?', desc: 'Homicide is the leading cause of death for Black males aged 15-34. A look at the unequal geography of violence.', tag: 'ANALYSIS' },
  { slug: 'police-funding', title: 'Police Funding and Crime Rates: What the Data Shows', desc: 'Do cities that spend more on policing have less crime? We analyze the relationship between police budgets and crime rates.', tag: 'ANALYSIS' },
  { slug: 'drug-crime', title: 'The Drug-Crime Connection: From Crack to Fentanyl', desc: 'How drug epidemics have shaped American crime waves from the 1980s crack crisis to today\'s fentanyl surge.', tag: 'DEEP DIVE' },
  { slug: 'domestic-violence', title: 'Domestic Violence in America: The Hidden Epidemic', desc: 'Over 40% of female murder victims are killed by intimate partners. The data behind America\'s most underreported crime.', tag: 'ANALYSIS' },
  { slug: 'mass-shootings', title: 'Mass Shootings vs Total Gun Violence: What the Data Shows', desc: 'Mass shootings dominate headlines but account for less than 2% of gun deaths. The real picture is very different.', tag: 'DEEP DIVE' },
  { slug: 'car-theft-crisis', title: 'The Car Theft Crisis: Why Vehicle Theft Is Surging', desc: 'Motor vehicle theft surged 25% since 2019. A design flaw, TikTok, and organized crime explain why.', tag: 'ANALYSIS' },
  { slug: 'defund-police', title: 'Did "Defund the Police" Cause a Crime Surge?', desc: 'What actually happened to police budgets, staffing, and crime rates after 2020. The data is more nuanced than either side admits.', tag: 'DEEP DIVE' },
  { slug: 'organized-retail-theft', title: 'Organized Retail Theft: Is Shoplifting Really Out of Control?', desc: 'Viral videos say yes. The NRF retracted its $100B figure. What the FBI data and retail industry data actually show.', tag: 'ANALYSIS' },
];

const tagColors: Record<string, string> = {
  'DEEP DIVE': 'bg-[#1e3a5f] text-white',
  'ANALYSIS': 'bg-red-100 text-red-700',
};

export default function AnalysisPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-bold mb-2">Crime Analysis</h1>
      <p className="text-gray-600 mb-8">In-depth, data-driven articles on US crime trends and patterns. All backed by FBI statistics.</p>

      <div className="space-y-4">
        {articles.map(a => (
          <Link key={a.slug} href={`/analysis/${a.slug}`} className="block bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition group">
            <div className="flex items-start gap-3">
              <span className={`text-xs font-bold px-2 py-1 rounded ${tagColors[a.tag] || 'bg-gray-100'}`}>{a.tag}</span>
              <div>
                <h2 className="font-heading text-lg font-bold group-hover:text-[#1e3a5f] transition">{a.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{a.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
