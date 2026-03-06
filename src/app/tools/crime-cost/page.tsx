import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import CrimeCostClient from './CrimeCostClient';
import { loadData } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Crime Cost Calculator — What Crime Costs Your City | OpenCrime',
  description: 'Estimate the economic cost of crime in any US city. Uses DOJ and RAND Corporation cost-per-crime estimates applied to real FBI crime data for 10,000+ cities.',
  alternates: { canonical: 'https://www.opencrime.us/tools/crime-cost' },
  openGraph: {
    title: 'Crime Cost Calculator — What Crime Costs Your City',
    description: 'Crime costs America $2.6 trillion per year. See what it costs YOUR city.',
    url: 'https://www.opencrime.us/tools/crime-cost',
  },
};

type CityLite = {
  slug: string; city: string; state: string; population: number;
  violentCrime: number; propertyCrime: number; murder: number;
  violentRate: number; propertyRate: number; murderRate: number;
};

export default function CrimeCostPage() {
  const cities = loadData<CityLite[]>('city-index.json');
  // Pass only what's needed for search
  const cityList = cities
    .filter(c => c.population >= 5000)
    .map(c => ({
      slug: c.slug, city: c.city, state: c.state, population: c.population,
      violentCrime: c.violentCrime, propertyCrime: c.propertyCrime, murder: c.murder,
      violentRate: c.violentRate, propertyRate: c.propertyRate,
    }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Crime Cost Calculator' }]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">💰 Crime Cost Calculator</h1>
      <p className="text-lg text-gray-600 mb-6">
        Crime isn&apos;t just a safety issue — it&apos;s an economic one. Every murder, assault, robbery, and burglary
        carries enormous costs: medical bills, lost productivity, criminal justice, property damage, and the
        incalculable toll of pain and suffering.
      </p>

      <AIOverview insights={[
        'Crime costs the US an estimated $2.6 trillion per year (DOJ, RAND Corporation)',
        'One murder costs society an estimated $9.9 million (includes lost productivity, criminal justice, victim costs)',
        'Aggravated assault: ~$107,000 per incident. Robbery: ~$42,000. Burglary: ~$6,400',
        'Cities with high crime rates bear a disproportionate economic burden per capita',
        'Property crime costs are lower per incident but far higher in volume — ~6.7 million incidents per year',
      ]} />

      <ShareButtons title="Crime Cost Calculator — What Crime Costs Your City" />

      <div className="mt-8">
        <CrimeCostClient cities={cityList} />
      </div>

      <section className="prose prose-gray max-w-none mt-10">
        <h2 className="font-heading text-2xl font-bold">Methodology</h2>
        <p>
          Cost estimates combine data from multiple sources:
        </p>
        <ul>
          <li><strong>Murder:</strong> $9.9 million per incident (McCollister, French & Fang, 2010; adjusted for inflation to 2024 dollars)</li>
          <li><strong>Rape:</strong> $280,000 per incident</li>
          <li><strong>Robbery:</strong> $42,000 per incident</li>
          <li><strong>Aggravated Assault:</strong> $107,000 per incident</li>
          <li><strong>Burglary:</strong> $6,400 per incident</li>
          <li><strong>Larceny-Theft:</strong> $3,500 per incident</li>
          <li><strong>Motor Vehicle Theft:</strong> $10,800 per incident</li>
          <li><strong>Arson:</strong> $21,000 per incident</li>
        </ul>
        <p>
          These figures include tangible costs (medical, criminal justice, property) and intangible costs (pain, suffering,
          lost quality of life). Actual costs vary widely by incident severity. These are societal averages.
        </p>
        <p>
          <strong>Sources:</strong> McCollister, French & Fang (&quot;The Cost of Crime to Society,&quot; Drug and Alcohol Dependence, 2010),
          RAND Corporation, Bureau of Justice Statistics, adjusted to 2024 dollars using CPI-U.
        </p>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'WebApplication',
        name: 'Crime Cost Calculator',
        description: 'Estimate the economic cost of crime in any US city using DOJ per-crime cost data.',
        url: 'https://www.opencrime.us/tools/crime-cost',
        applicationCategory: 'DataVisualization',
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How much does crime cost the US?', acceptedAnswer: { '@type': 'Answer', text: 'Crime costs the United States an estimated $2.6 trillion per year when including tangible costs (medical, criminal justice, property) and intangible costs (pain, suffering, lost productivity).' }},
          { '@type': 'Question', name: 'How much does one murder cost society?', acceptedAnswer: { '@type': 'Answer', text: 'One murder costs society approximately $9.9 million, including lost productivity ($5.1M), criminal justice costs ($1.4M), victim costs, and intangible costs of pain and suffering.' }},
          { '@type': 'Question', name: 'What is the most expensive type of crime?', acceptedAnswer: { '@type': 'Answer', text: 'Murder is by far the most expensive crime per incident at $9.9 million. However, property crimes like larceny-theft cost more in aggregate due to their high volume (over 4 million incidents per year).' }},
        ],
      })}} />
    </div>
  );
}
