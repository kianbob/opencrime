import { MetadataRoute } from 'next';
import { loadData } from '@/lib/utils';

type CityIdx = { slug: string };
type StateData = { abbr: string };

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.opencrime.us';
  const now = new Date().toISOString();

  const staticPages = [
    '', '/dashboard', '/states', '/cities', '/rankings', '/crimes', '/search', '/about',
    '/safest-cities', '/most-dangerous-cities', '/crime-rate', '/murder-rate',
    '/tools', '/tools/compare', '/tools/safety-score',
    '/methodology', '/faq', '/hate-crimes',
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

  return [...staticPages, ...statePages, ...cityPages];
}
