import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Crime Analysis — In-Depth Articles on US Crime Data',
  description: 'Data-driven analysis of US crime trends. The great crime decline, gun violence, property crime, rural vs urban crime, and more. All backed by FBI statistics.',
  openGraph: { url: 'https://www.opencrime.us/analysis' },
  alternates: { canonical: 'https://www.opencrime.us/analysis' },
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
  { slug: 'fentanyl-crisis', title: 'The Fentanyl Crisis: How Synthetic Opioids Are Reshaping Crime', desc: '70,000+ deaths per year. How fentanyl changed drug markets, fueled property crime, and overwhelmed law enforcement.', tag: 'DEEP DIVE' },
  { slug: 'juvenile-crime', title: 'Juvenile Crime: The Data Behind the Headlines', desc: 'Youth arrests are down 70%+ since 2006. Why the perception gap between data and media narratives is so wide.', tag: 'ANALYSIS' },
  { slug: 'crime-by-race', title: 'Crime by Race — The Complete FBI Data Breakdown', desc: 'Black Americans are 13.7% of population but 30.5% of arrests and 51.6% of murder victims. Full data breakdown with context.', tag: 'DEEP DIVE' },
  { slug: 'who-commits-crime', title: 'Who Commits Crime in America — Demographics Deep Dive', desc: 'Males are 72.5% of arrests, young adults 18-24 peak crime years. The complete demographic profile of US crime patterns.', tag: 'ANALYSIS' },
  { slug: 'crime-and-poverty', title: 'Crime and Poverty — What the Data Actually Shows', desc: 'State murder rates vary 25x. How economic conditions, inequality, and concentrated poverty drive crime patterns.', tag: 'DEEP DIVE' },
  { slug: 'murder-map', title: 'America\'s Murder Map — Where Homicides Actually Happen', desc: 'Top 10 cities account for 21% of all murders. Geographic concentration, weapon patterns, and victim-offender relationships.', tag: 'ANALYSIS' },
  { slug: 'opioid-crime-connection', title: 'The Opioid-Crime Connection — How Drug Policy Shapes Crime Data', desc: '822K drug arrests annually despite similar usage rates. How the opioid epidemic drives property crime and mass incarceration.', tag: 'DEEP DIVE' },
  { slug: 'homicide-in-america', title: 'Homicide in America — Who Kills Whom and Why', desc: '77% male victims, intraracial violence patterns, age profiles, and the gender gap. Deep analysis using FBI SHR data.', tag: 'DEEP DIVE' },
  { slug: 'cybercrime-trends', title: 'Cybercrime Trends — The $12.5 Billion Crime Wave Missing from FBI Stats', desc: 'FBI IC3 reported $12.5B in losses in 2023. How cybercrime is underrepresented in traditional crime statistics.', tag: 'ANALYSIS' },
  { slug: 'recidivism-crisis', title: 'The Recidivism Crisis — 83% Rearrested Within 9 Years', desc: 'BJS data shows 44% rearrested within 1 year. The revolving door of criminal justice and what works to break the cycle.', tag: 'DEEP DIVE' },
  { slug: 'women-and-crime', title: 'Women and Crime — The Gender Gap in Victims, Offenders & Incarceration', desc: '3,538 female murder victims, 1,902 female offenders. How crime affects women differently as both victims and perpetrators.', tag: 'ANALYSIS' },
  { slug: 'clearance-rates', title: 'Crime Clearance Rates — How Many Crimes Actually Get Solved?', desc: 'Only ~50% of violent crimes and ~15% of property crimes are cleared. Murder clearance dropped from 90% to 50%.', tag: 'DEEP DIVE' },
  { slug: 'hate-crimes-america', title: 'Hate Crimes in America: A Deep Dive Into FBI Data (2024)', desc: '11,679 hate crime incidents in 2024. Breakdown by bias motivation — anti-Black, anti-Jewish, anti-LGBTQ+ — state variation, and reporting challenges.', tag: 'DEEP DIVE' },
  { slug: 'unsolved-murders', title: 'Unsolved Murders: The Epidemic of Cases That Never Close', desc: 'Murder clearance dropped from 90%+ to ~50%. An estimated 250,000+ murders unsolved since 2000. Racial disparities, cold cases, and what went wrong.', tag: 'DEEP DIVE' },
  { slug: 'seasonal-crime', title: 'Seasonal Crime Patterns: When Does Crime Happen?', desc: 'Violent crime peaks in summer, property crime in fall. Holiday DV spikes, weekend violence patterns, and what temperature does to aggression.', tag: 'ANALYSIS' },
  { slug: 'police-staffing-crisis', title: 'The Police Staffing Crisis: Why Departments Can\'t Hire', desc: 'Applicants down ~20% since 2020. 47% of agencies saw 25%+ drops. Signing bonuses, lowered requirements, and the impact on public safety.', tag: 'DEEP DIVE' },
  { slug: 'incarceration-nation', title: 'Incarceration Nation: America\'s Prison Problem by the Numbers', desc: '1.9M incarcerated, $81B annual cost, 5x racial disparity. Why America has 5% of the world\'s people but 20% of its prisoners.', tag: 'DEEP DIVE' },
  { slug: 'cost-of-crime', title: 'The Cost of Crime: What Does Crime Actually Cost America?', desc: '$2.6 trillion annually. Murder alone costs $152 billion. Per-crime cost estimates, state-level costs, and the economic case for prevention.', tag: 'DEEP DIVE' },
  { slug: 'crime-and-guns', title: 'Crime and Guns: What Does the Data Actually Say?', desc: 'Firearms in 77% of homicides. Gun ownership vs crime rates, strict vs permissive states, international comparison — data-driven, not political.', tag: 'DEEP DIVE' },
  { slug: 'crime-myths', title: '10 Things Everyone Gets Wrong About Crime', desc: 'Crime myths debunked: crime is NOT at an all-time high, immigrants DON\'T cause more crime, and 8 more facts that challenge assumptions.', tag: 'DEEP DIVE' },
];

const specialPages = [
  { href: '/population-crime-paradox', title: 'The Population-Crime Paradox', desc: 'Mid-size cities are MORE dangerous than mega-cities. The data will surprise you.', tag: 'UNIQUE' },
  { href: '/crime-clock', title: 'The Crime Clock', desc: 'See crime happen in real time. A violent crime every 26 seconds, a murder every 31 minutes.', tag: 'INTERACTIVE' },
  { href: '/city-trajectories', title: 'City Crime Trajectories', desc: 'Every city classified: improving, worsening, volatile, stable, or dangerous. Which way is yours heading?', tag: 'UNIQUE' },
  { href: '/crime-dna', title: 'Crime Composition DNA', desc: 'Every city has a unique crime fingerprint. See visual breakdowns of murder, assault, robbery, and rape proportions.', tag: 'UNIQUE' },
  { href: '/violence-concentration', title: 'Violence Concentration', desc: 'Just 10 cities produce 21% of all murders. See where violence really concentrates in America.', tag: 'DATA' },
  { href: '/crime-stories', title: 'Crime Stories', desc: 'Data-driven narratives: turnarounds, crises, surprises, and the wildest swings in American crime.', tag: 'UNIQUE' },
  { href: '/arrest-efficiency', title: 'Arrest Efficiency', desc: 'How effective is policing? For every 3 murders, 1 goes without an arrest.', tag: 'DATA' },
  { href: '/weapon-shift', title: 'The Weapon Shift', desc: 'How Americans are killed is changing. 5 years of murder weapon data visualized.', tag: 'DATA' },
  { href: '/who-are-victims', title: 'Who Are the Victims?', desc: 'The human face behind crime statistics. Demographics, relationships, and circumstances of murder victims.', tag: 'DATA' },
  { href: '/homicide-demographics', title: 'Homicide Demographics', desc: 'Complete FBI data on victim and offender demographics by race, gender, ethnicity, age, and victim-offender cross-tabulation.', tag: 'DATA' },
];

const tagColors: Record<string, string> = {
  'DEEP DIVE': 'bg-[#1e3a5f] text-white',
  'ANALYSIS': 'bg-red-100 text-red-700',
  'UNIQUE': 'bg-purple-100 text-purple-700',
  'INTERACTIVE': 'bg-emerald-100 text-emerald-700',
  'DATA': 'bg-amber-100 text-amber-700',
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

      <h2 className="font-heading text-2xl font-bold mt-12 mb-6">Unique Data Explorations</h2>
      <div className="space-y-4">
        {specialPages.map(a => (
          <Link key={a.href} href={a.href} className="block bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition group">
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
