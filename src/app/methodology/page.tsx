import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Methodology — How We Process FBI Data',
  description: 'How OpenCrime processes and presents FBI crime data. Data sources, calculation methods, known limitations, and how to interpret crime statistics.',
  openGraph: { url: 'https://www.opencrime.us/methodology' },
  alternates: { canonical: 'https://www.opencrime.us/methodology' },
};

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"WebPage","name":"Methodology — How We Process FBI Crime Data","description":"How OpenCrime processes and presents FBI crime data. Data sources, calculation methods, known limitations, and how to interpret crime statistics.","url":"https://www.opencrime.us/methodology","publisher":{"@type":"Organization","name":"OpenCrime","url":"https://www.opencrime.us"}}` }} />
      <h1 className="font-heading text-3xl font-bold mb-6">Methodology</h1>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">Data Sources</h2>
        <p>All data on OpenCrime comes from official FBI sources:</p>
        <ul>
          <li><strong>FBI Crime Data Explorer (CDE)</strong> — Our primary data source for all crime statistics</li>
          <li><strong>Summary Reporting System (SRS)</strong> — National and state estimated crimes, 1979–2024</li>
          <li><strong>Table 8: Offenses Known to Law Enforcement</strong> — City-level crime data by state, 2020–2024</li>
          <li><strong>CIUS Estimation Tables</strong> — FBI&apos;s official national crime volume and rate estimates</li>
          <li><strong>Expanded Homicide Data</strong> — Victim demographics, weapons, circumstances</li>
          <li><strong>Hate Crime Statistics</strong> — Bias-motivated incidents by state and type</li>
        </ul>

        <h2 className="font-heading">How Crime Rates Are Calculated</h2>
        <p>
          Crime rates are expressed as incidents per 100,000 residents. This standardization allows 
          meaningful comparison between cities of different sizes.
        </p>
        <p><strong>Formula:</strong> Crime Rate = (Number of Crimes ÷ Population) × 100,000</p>
        <p>
          For example, a city with 500 violent crimes and 200,000 residents has a violent crime rate 
          of 250 per 100,000. Population figures come from the FBI data, which uses Census Bureau estimates.
        </p>

        <h2 className="font-heading">Crime Categories</h2>
        <h3>Violent Crime (Part I — Violent)</h3>
        <ul>
          <li><strong>Murder and Nonnegligent Manslaughter</strong> — Willful killing of one person by another (excludes justifiable homicide, negligent manslaughter, suicide, accident)</li>
          <li><strong>Rape</strong> — Penetration without consent (revised definition since 2013)</li>
          <li><strong>Robbery</strong> — Taking property by force or threat of force</li>
          <li><strong>Aggravated Assault</strong> — Attack with intent to cause serious bodily injury, often with a weapon</li>
        </ul>

        <h3>Property Crime (Part I — Property)</h3>
        <ul>
          <li><strong>Burglary</strong> — Unlawful entry of a structure to commit a crime</li>
          <li><strong>Larceny-Theft</strong> — Unlawful taking of property (shoplifting, pocket-picking, etc.)</li>
          <li><strong>Motor Vehicle Theft</strong> — Theft or attempted theft of a motor vehicle</li>
          <li><strong>Arson</strong> — Willful burning of property</li>
        </ul>

        <h2 className="font-heading">Known Limitations</h2>
        <ul>
          <li><strong>Reporting gap:</strong> Not all crimes are reported to police. The Bureau of Justice Statistics estimates only about half of violent crimes are reported.</li>
          <li><strong>SRS to NIBRS transition:</strong> Between 2017–2020, the FBI transitioned from summary-based to incident-based reporting. This caused a gap in national estimates for those years.</li>
          <li><strong>Agency participation:</strong> Not all law enforcement agencies submit data every year. City-level data only includes agencies that reported.</li>
          <li><strong>Population accuracy:</strong> Population figures are estimates and may not reflect seasonal fluctuations, tourism, or commuter populations.</li>
          <li><strong>Definition changes:</strong> The FBI revised the definition of rape in 2013, making historical comparisons for this category less reliable.</li>
          <li><strong>Ranking limitations:</strong> The FBI cautions against using crime data to rank or compare communities because crime rates are influenced by many factors beyond law enforcement control.</li>
        </ul>

        <h2 className="font-heading">Our Processing Pipeline</h2>
        <p>
          Raw FBI data requires significant processing before it can be presented in a user-friendly format.
          Here&apos;s how we handle the data:
        </p>
        <ol>
          <li><strong>Data acquisition:</strong> Download raw datasets from FBI Crime Data Explorer API and bulk downloads</li>
          <li><strong>Data cleaning:</strong> Remove duplicate records, handle missing values, standardize agency names</li>
          <li><strong>Rate calculation:</strong> Compute per capita crime rates (per 100,000 residents) for all geographies</li>
          <li><strong>Trend analysis:</strong> Calculate year-over-year changes, 5-year trends, historical context</li>
          <li><strong>Validation:</strong> Cross-check calculated totals against FBI published estimates to ensure accuracy</li>
          <li><strong>Database loading:</strong> Load processed data into PostgreSQL database for fast querying</li>
          <li><strong>Static generation:</strong> Pre-generate all 9,700+ city pages at build time for optimal performance</li>
        </ol>

        <h2 className="font-heading">How to Interpret Crime Statistics</h2>
        <h3>Absolute Numbers vs Rates</h3>
        <p>
          <strong>Always use rates (per 100,000) for comparisons.</strong> Absolute crime counts are only useful
          for understanding scale within a single jurisdiction. A city with 1,000 murders sounds worse than a city
          with 100 — but if the first city has 10 million residents (rate: 10) and the second has 50,000 (rate: 200),
          the smaller city is actually far more dangerous.
        </p>

        <h3>Year-to-Year Volatility</h3>
        <p>
          Single-year changes can be misleading, especially for smaller cities. A city with 2 murders one year and 4
          the next has a "100% increase" — but it&apos;s really statistical noise. Focus on multi-year trends instead.
        </p>

        <h3>Context Matters</h3>
        <p>
          Crime rates don&apos;t exist in a vacuum. Consider:
        </p>
        <ul>
          <li><strong>Regional patterns:</strong> Crime tends to be higher in the South, lower in the Northeast</li>
          <li><strong>Seasonal variation:</strong> Violent crime peaks in summer, property crime in fall</li>
          <li><strong>Economic factors:</strong> Poverty, unemployment, inequality all correlate with crime</li>
          <li><strong>Demographic factors:</strong> Age distribution affects crime (younger populations have higher rates)</li>
          <li><strong>Tourism/commuters:</strong> Daytime populations can be much larger than resident populations</li>
        </ul>

        <h2 className="font-heading">Data Quality Checks</h2>
        <p>
          We perform several validation checks to ensure data accuracy:
        </p>
        <ul>
          <li><strong>Total reconciliation:</strong> City/state totals are checked against FBI published national estimates</li>
          <li><strong>Outlier detection:</strong> Extreme values are flagged for manual review</li>
          <li><strong>Longitudinal consistency:</strong> Cities that report dramatically different figures year-over-year are investigated</li>
          <li><strong>Source verification:</strong> All data can be traced back to specific FBI published tables</li>
          <li><strong>Population validation:</strong> Population figures are compared with Census Bureau estimates</li>
        </ul>

        <h2 className="font-heading">Data Updates</h2>
        <p>
          The FBI typically releases annual crime data in the fall following the reporting year. 
          We update OpenCrime as soon as new data becomes available from the Crime Data Explorer.
        </p>
        <p>
          Last data update: <strong>August 5, 2025</strong> (2024 annual data release)
        </p>

        <h2 className="font-heading">Technical Notes</h2>
        <h3>Population Sources</h3>
        <p>
          We use the population figures provided by the FBI, which are based on Census Bureau estimates. These
          represent resident populations as of July 1 of the reporting year. For cities with populations under
          10,000, estimates can be less accurate.
        </p>

        <h3>Partial Reporting</h3>
        <p>
          If an agency reports data for fewer than 12 months, the FBI may estimate a full-year count. We note
          when agencies report partial-year data. Cities where the reporting agency covered fewer than 9 months
          are excluded from our database.
        </p>

        <h3>Multi-Agency Jurisdictions</h3>
        <p>
          Some cities are served by multiple law enforcement agencies (city police, county sheriff, university
          police, etc.). We use the primary municipal agency for city profiles. This may undercount crimes that
          occurred within city limits but were reported to other agencies.
        </p>

        <h2 className="font-heading">Citing OpenCrime</h2>
        <p>
          If you use OpenCrime data in research, journalism, or publications, please cite both OpenCrime and
          the original FBI source:
        </p>
        <p className="bg-gray-100 p-4 rounded font-mono text-sm">
          Federal Bureau of Investigation. (2025). <em>Crime Data Explorer.</em> Retrieved from https://cde.ucr.cjis.gov/<br />
          OpenCrime. (2025). <em>Crime Statistics Database.</em> https://www.opencrime.us
        </p>

        <h2 className="font-heading">Open Data</h2>
        <p>
          We believe in open data. All our processed datasets are available for download in JSON format
          on our <Link href="/downloads" className="text-[#1e3a5f] hover:underline">Downloads</Link> page.
          Use it for research, build on it, share it — just cite the sources.
        </p>

        <h2 className="font-heading">Questions?</h2>
        <p>
          Contact us at <a href="mailto:info@thedataproject.ai" className="text-[#1e3a5f]">info@thedataproject.ai</a> with 
          any questions about our methodology, data quality, or technical implementation.
        </p>
      </div>
    </div>
  );
}
