import Link from 'next/link';

const ALL_ARTICLES = [
  { slug: 'crime-decline', title: 'The Great Crime Decline', tag: 'trends' },
  { slug: 'gun-violence', title: 'Gun Violence by the Numbers', tag: 'violence' },
  { slug: 'property-crime-surge', title: 'The Property Crime Paradox', tag: 'property' },
  { slug: 'rural-vs-urban', title: 'Rural vs Urban Crime', tag: 'geography' },
  { slug: 'racial-disparities', title: 'Crime Victimization: Who Bears the Burden?', tag: 'demographics' },
  { slug: 'police-funding', title: 'Police Funding and Crime Rates', tag: 'policy' },
  { slug: 'drug-crime', title: 'The Drug-Crime Connection', tag: 'drugs' },
  { slug: 'domestic-violence', title: 'Domestic Violence in America', tag: 'violence' },
  { slug: 'mass-shootings', title: 'Mass Shootings vs Total Gun Violence', tag: 'violence' },
  { slug: 'car-theft-crisis', title: 'The Car Theft Crisis', tag: 'property' },
  { slug: 'defund-police', title: 'Did "Defund the Police" Cause a Crime Surge?', tag: 'policy' },
  { slug: 'organized-retail-theft', title: 'Organized Retail Theft', tag: 'property' },
  { slug: 'fentanyl-crisis', title: 'The Fentanyl Crisis', tag: 'drugs' },
  { slug: 'juvenile-crime', title: 'Juvenile Crime: The Data Behind Headlines', tag: 'demographics' },
  { slug: 'crime-by-race', title: 'Crime by Race — The Complete FBI Data Breakdown', tag: 'demographics' },
  { slug: 'who-commits-crime', title: 'Who Commits Crime in America — Demographics Deep Dive', tag: 'demographics' },
  { slug: 'crime-and-poverty', title: 'Crime and Poverty — What the Data Actually Shows', tag: 'economics' },
  { slug: 'murder-map', title: 'America\'s Murder Map — Where Homicides Actually Happen', tag: 'geography' },
  { slug: 'opioid-crime-connection', title: 'The Opioid-Crime Connection — How Drug Policy Shapes Crime Data', tag: 'drugs' },
  { slug: 'hate-crimes-america', title: 'Hate Crimes in America: A Deep Dive Into FBI Data', tag: 'demographics' },
  { slug: 'unsolved-murders', title: 'Unsolved Murders: The Epidemic of Cases That Never Close', tag: 'violence' },
  { slug: 'seasonal-crime', title: 'Seasonal Crime Patterns: When Does Crime Happen?', tag: 'trends' },
  { slug: 'police-staffing-crisis', title: 'The Police Staffing Crisis', tag: 'policy' },
  { slug: 'incarceration-nation', title: 'Incarceration Nation: America\'s Prison Problem', tag: 'policy' },
  { slug: 'crime-and-politics', title: 'Do Red States or Blue States Have More Crime?', tag: 'politics' },
  { slug: 'safest-places-to-live', title: 'The Safest Places to Live in America', tag: 'geography' },
];

export default function RelatedAnalysis({ currentSlug, tags }: { currentSlug: string; tags?: string[] }) {
  const current = ALL_ARTICLES.find(a => a.slug === currentSlug);
  const currentTags = tags || (current ? [current.tag] : []);
  
  // Same-tag articles first, then others
  const related = ALL_ARTICLES
    .filter(a => a.slug !== currentSlug)
    .sort((a, b) => {
      const aMatch = currentTags.includes(a.tag) ? 1 : 0;
      const bMatch = currentTags.includes(b.tag) ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 4);

  return (
    <div className="bg-gray-50 rounded-xl p-6 mt-10">
      <h3 className="font-heading text-lg font-bold mb-3">You Might Also Like</h3>
      <div className="grid md:grid-cols-2 gap-3">
        {related.map(a => (
          <Link key={a.slug} href={`/analysis/${a.slug}`} className="text-[#1e3a5f] hover:underline text-sm">
            {a.title} →
          </Link>
        ))}
      </div>
    </div>
  );
}
