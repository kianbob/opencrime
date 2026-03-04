import { MetadataRoute } from 'next';
import { loadData } from '@/lib/utils';

type CityIdx = { slug: string };
type StateData = { abbr: string };

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.opencrime.us';
  const now = new Date().toISOString();

  const staticPages = [
    '', '/dashboard', '/states', '/cities', '/rankings', '/crimes', '/search', '/about',
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
