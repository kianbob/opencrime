import { MetadataRoute } from 'next';
import { loadData, slugify } from '@/lib/utils';

type CityIdx = { slug: string };
type StateData = { abbr: string; name: string };
type NatTrend = { year: number };

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.opencrime.us';
  const now = new Date().toISOString();

  const staticPages = [
    '', '/dashboard', '/states', '/cities', '/rankings', '/crimes', '/search', '/about',
    '/safest-cities', '/most-dangerous-cities', '/crime-rate', '/murder-rate',
    '/tools', '/tools/compare', '/tools/safety-score',
    '/methodology', '/faq', '/hate-crimes', '/arrests', '/dui-statistics', '/drug-arrests',
    '/downloads', '/privacy', '/most-improved', '/cargo-theft',
    '/tools/state-compare', '/tools/risk-calculator',
    '/violent-crime', '/property-crime', '/robbery-statistics', '/assault-statistics',
    '/analysis/mass-shootings', '/analysis/car-theft-crisis', '/analysis/defund-police', '/analysis/organized-retail-theft',
    '/analysis/fentanyl-crisis', '/analysis/juvenile-crime',
    '/crime-clock', '/population-crime-paradox', '/city-trajectories',
    '/violence-concentration', '/crime-dna',
    '/crime-stories', '/arrest-efficiency', '/arrest-demographics', '/arson',
    '/years',
    '/analysis', '/analysis/crime-decline', '/analysis/gun-violence',
    '/analysis/property-crime-surge', '/analysis/rural-vs-urban',
    '/analysis/police-funding', '/analysis/drug-crime',
    '/analysis/domestic-violence', '/analysis/racial-disparities',
  ].map(path => ({ url: `${base}${path}`, lastModified: now, changeFrequency: 'monthly' as const }));

  const states = loadData<StateData[]>('state-trends.json');
  const statePages = states.map(s => ({
    url: `${base}/states/${s.abbr.toLowerCase()}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
  }));

  const cities = loadData<CityIdx[]>('city-index.json');
  const cityPages = cities.map(c => ({
    url: `${base}/cities/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
  }));

  const national = loadData<NatTrend[]>('national-trends.json');
  const yearPages = national.map(n => ({
    url: `${base}/years/${n.year}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
  }));

  const safestInState = states.map(s => ({
    url: `${base}/safest-cities-in/${s.abbr.toLowerCase()}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
  }));

  return [...staticPages, ...statePages, ...cityPages, ...yearPages, ...safestInState];
}
