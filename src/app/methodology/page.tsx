import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Methodology — How We Process FBI Crime Data',
  description: 'How OpenCrime processes and presents FBI crime data. Data sources, calculation methods, known limitations, and how to interpret crime statistics.',
};

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
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

        <h2 className="font-heading">Data Updates</h2>
        <p>
          The FBI typically releases annual crime data in the fall following the reporting year. 
          We update OpenCrime as soon as new data becomes available from the Crime Data Explorer.
        </p>
        <p>
          Last data update: <strong>August 5, 2025</strong> (2024 annual data release)
        </p>

        <h2 className="font-heading">Questions?</h2>
        <p>
          Contact us at <a href="mailto:info@thedataproject.ai" className="text-[#1e3a5f]">info@thedataproject.ai</a> with 
          any questions about our methodology or data.
        </p>
      </div>
    </div>
  );
}
