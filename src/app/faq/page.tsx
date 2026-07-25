import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ — Crime Data Questions Answered',
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
  { q: 'How accurate is FBI crime data?', a: 'FBI data is the most comprehensive national crime dataset available, but it has limitations. Not all agencies report every year, some crimes go unreported to police, and reporting definitions can vary. Murder data is the most reliable (nearly 100% reported), while property crime and sexual assault data likely undercounts actual incidents significantly.' },
  { q: 'What\'s the difference between crime rate and crime count?', a: 'Crime count is the raw number of crimes. Crime rate adjusts for population (crimes per 100,000 residents). Always use rates for comparison — a city of 1 million with 5,000 crimes is actually safer than a city of 100,000 with 1,000 crimes, even though the count is higher.' },
  { q: 'Why do some cities show "—" for year-over-year change?', a: 'Year-over-year change requires data from two consecutive years. If a city didn\'t report data in either the current or previous year, we can\'t calculate the change and display "—" instead.' },
  { q: 'How should I interpret "safety percentile"?', a: 'A city\'s safety percentile shows what percentage of cities it is safer than. A 90th percentile means the city is safer than 90% of all cities in our database. A 10th percentile means 90% of cities are safer.' },
  { q: 'Can crime data predict how safe I\'ll be in a city?', a: 'Crime rates reflect averages across an entire city and don\'t predict individual risk. Crime often concentrates in specific neighborhoods — even "dangerous" cities have safe areas, and "safe" cities have higher-crime blocks. Use our data as one input alongside neighborhood-level research, local knowledge, and personal visits.' },
  { q: 'Why do you include Washington DC as a "state"?', a: 'The FBI reports Washington DC\'s crime data separately, similar to states. Since DC has a large population (700K+) and operates as a state-equivalent jurisdiction, we include it in state rankings for completeness. Its high crime rates partly reflect its unique status as a dense urban area competing against entire states.' },
  { q: 'What methodology do you use for city rankings?', a: 'We rank cities using violent crime rate per 100,000 residents from the FBI\'s Uniform Crime Reporting program. For "large city" rankings, we filter to cities with populations of 100,000 or more. All rates are calculated using the population figures provided alongside the FBI crime data.' },
  { q: 'How can I get the raw data?', a: 'The raw FBI data is freely available at crime-data-explorer.fr.cloud.gov. OpenCrime processes and presents this data in a more accessible format, but we encourage researchers and journalists to work with the primary source as well.' },
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl font-bold mb-2">Frequently Asked Questions</h1>
      <p className="text-gray-600 mb-8">
        Everything you need to know about crime statistics, FBI data, and how to interpret the numbers on OpenCrime.
        Can&apos;t find your answer? <Link href="/contact" className="text-[#1e3a5f] hover:underline">Contact us</Link>.
      </p>

      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border p-5">
            <h2 className="font-heading text-lg font-bold mb-2">{faq.q}</h2>
            <p className="text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mt-10">
        <h3 className="font-heading text-lg font-bold mb-3">Explore the Data</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <Link href="/cities" className="text-[#1e3a5f] hover:underline">Browse All Cities →</Link>
          <Link href="/states" className="text-[#1e3a5f] hover:underline">Browse All States →</Link>
          <Link href="/analysis" className="text-[#1e3a5f] hover:underline">Crime Analysis Articles →</Link>
          <Link href="/about" className="text-[#1e3a5f] hover:underline">About OpenCrime →</Link>
        </div>
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
