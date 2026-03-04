import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions About Crime Data',
  description: 'Common questions about crime statistics, FBI data, crime rates, and how to interpret crime data. From OpenCrime, the free US crime data explorer.',
  openGraph: { url: 'https://www.opencrime.us/faq' },
  alternates: { canonical: 'https://www.opencrime.us/faq' },
};

const faqs = [
  { q: 'Where does the data come from?', a: 'All data comes from the FBI\'s Crime Data Explorer (CDE), which collects crime reports from over 18,000 law enforcement agencies nationwide through the Uniform Crime Reporting (UCR) program.' },
  { q: 'How often is the data updated?', a: 'The FBI releases annual crime data typically in the fall. Our current data reflects the 2024 reporting year, released August 5, 2025.' },
  { q: 'What is a crime rate?', a: 'A crime rate is the number of crimes per 100,000 residents. This allows fair comparison between cities of different sizes. For example, a violent crime rate of 500 means 500 violent crimes per 100,000 people.' },
  { q: 'What counts as violent crime?', a: 'The FBI classifies four offenses as violent crime: murder and nonnegligent manslaughter, rape, robbery, and aggravated assault. These are also known as Part I violent offenses.' },
  { q: 'What counts as property crime?', a: 'Property crimes include burglary, larceny-theft, motor vehicle theft, and arson. These involve taking or destroying property without force or threat against victims.' },
  { q: 'Why is there a gap in national data from 2017-2020?', a: 'The FBI transitioned from the Summary Reporting System (SRS) to the National Incident-Based Reporting System (NIBRS) during this period. Not enough agencies had switched to NIBRS to generate reliable national estimates until 2021.' },
  { q: 'Can I use this data to compare cities?', a: 'While our data enables comparisons, the FBI cautions against simple rankings. Crime rates are influenced by many factors: population density, economic conditions, climate, policing practices, demographic composition, and reporting methods. Use comparisons as one data point, not the whole picture.' },
  { q: 'Why is my city not listed?', a: 'A city may be missing if its law enforcement agency did not submit complete data to the FBI for that year, or if the city is very small. We include all cities in the FBI\'s Table 8 data.' },
  { q: 'Does this data include unreported crimes?', a: 'No. FBI data only includes crimes reported to law enforcement. The Bureau of Justice Statistics estimates roughly half of violent crimes and about a third of property crimes go unreported.' },
  { q: 'Is crime increasing or decreasing?', a: 'Violent crime in the US has been on a long-term decline since the early 1990s. The 2024 violent crime rate of 359.1 per 100K is down 52.6% from the 1991 peak of 758.2. There was a temporary spike in 2020-2021, but rates have since fallen below pre-pandemic levels.' },
  { q: 'What is NIBRS?', a: 'The National Incident-Based Reporting System (NIBRS) replaced the older Summary Reporting System (SRS). NIBRS captures much more detail about each incident, including victim/offender demographics, location type, weapon, and relationships. This is the future of US crime reporting.' },
  { q: 'Is OpenCrime free?', a: 'Yes, completely free. No paywall, no login, no ads. Public data should be publicly accessible.' },
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl font-bold mb-6">Frequently Asked Questions</h1>

      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border p-5">
            <h2 className="font-heading text-lg font-bold mb-2">{faq.q}</h2>
            <p className="text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question', name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      })}} />
    </div>
  );
}
