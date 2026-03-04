const articles = [
  { slug: 'crime-decline', title: 'The Great Crime Decline: Why America Is Safer Than You Think', date: '2026-03-04' },
  { slug: 'gun-violence', title: 'Gun Violence by the Numbers: What FBI Data Actually Shows', date: '2026-03-04' },
  { slug: 'property-crime-surge', title: 'The Property Crime Paradox: Theft Rising While Violence Falls', date: '2026-03-04' },
  { slug: 'rural-vs-urban', title: 'Rural vs Urban Crime: Shattering the Myths', date: '2026-03-04' },
  { slug: 'police-funding', title: 'Police Funding and Crime Rates: What the Data Shows', date: '2026-03-04' },
  { slug: 'drug-crime', title: 'The Drug-Crime Connection: From Crack to Fentanyl', date: '2026-03-04' },
  { slug: 'domestic-violence', title: 'Domestic Violence in America: The Hidden Epidemic', date: '2026-03-04' },
  { slug: 'racial-disparities', title: 'Crime Victimization: Who Bears the Burden?', date: '2026-03-04' },
  { slug: 'mass-shootings', title: 'Mass Shootings vs Total Gun Violence: What the Data Shows', date: '2026-03-04' },
  { slug: 'car-theft-crisis', title: 'The Car Theft Crisis: Why Vehicle Theft Is Surging', date: '2026-03-04' },
  { slug: 'defund-police', title: 'Did "Defund the Police" Cause a Crime Surge?', date: '2026-03-04' },
  { slug: 'organized-retail-theft', title: 'Organized Retail Theft: Is Shoplifting Really Out of Control?', date: '2026-03-04' },
  { slug: 'fentanyl-crisis', title: 'The Fentanyl Crisis: How Synthetic Opioids Are Reshaping Crime', date: '2026-03-04' },
  { slug: 'juvenile-crime', title: 'Juvenile Crime: The Data Behind the Headlines', date: '2026-03-04' },
];

export async function GET() {
  const base = 'https://www.opencrime.us';
  const items = articles.map(a => `
    <item>
      <title>${a.title}</title>
      <link>${base}/analysis/${a.slug}</link>
      <guid>${base}/analysis/${a.slug}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
    </item>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>OpenCrime — Crime Data Analysis</title>
    <link>${base}</link>
    <description>In-depth analysis of US crime data from FBI statistics</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
