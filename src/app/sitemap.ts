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
    '/crime-velocity', '/violence-inequality', '/hidden-crime', '/decades', '/city-fingerprint',
    '/crime-stories', '/arrest-efficiency', '/arrest-demographics', '/arson',
    '/years', '/contact', '/who-are-victims', '/weapon-shift',
    '/analysis', '/analysis/crime-decline', '/analysis/gun-violence',
    '/analysis/property-crime-surge', '/analysis/rural-vs-urban',
    '/analysis/police-funding', '/analysis/drug-crime',
    '/analysis/domestic-violence', '/analysis/racial-disparities',
    '/analysis/crime-by-race', '/analysis/who-commits-crime',
    '/analysis/crime-and-poverty', '/analysis/murder-map',
    '/analysis/opioid-crime-connection',
    '/homicide-demographics',
    '/analysis/homicide-in-america',
    '/analysis/cybercrime-trends',
    '/analysis/recidivism-crisis',
    '/analysis/women-and-crime',
    '/analysis/clearance-rates',
    '/analysis/hate-crimes-america',
    '/analysis/unsolved-murders',
    '/analysis/seasonal-crime',
    '/analysis/police-staffing-crisis',
    '/analysis/incarceration-nation',
    '/tools/timeline',
    '/tools/city-report',
    '/analysis/cost-of-crime',
    '/analysis/crime-and-guns',
    '/analysis/crime-myths',
    '/is-it-safe',
    '/is-it-safe/new-york', '/is-it-safe/los-angeles', '/is-it-safe/chicago',
    '/is-it-safe/houston', '/is-it-safe/phoenix', '/is-it-safe/philadelphia',
    '/is-it-safe/san-antonio', '/is-it-safe/san-diego', '/is-it-safe/dallas', '/is-it-safe/austin',
    '/compare-states',
    '/compare-states/california-vs-texas', '/compare-states/new-york-vs-florida',
    '/compare-states/illinois-vs-ohio', '/compare-states/california-vs-florida',
    '/compare-states/texas-vs-florida', '/compare-states/new-york-vs-california',
    '/compare-states/pennsylvania-vs-ohio', '/compare-states/georgia-vs-north-carolina',
    '/compare-states/washington-vs-oregon', '/compare-states/arizona-vs-nevada',
    '/decades/1980s', '/decades/1990s', '/decades/2000s', '/decades/2010s', '/decades/2020s',
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
