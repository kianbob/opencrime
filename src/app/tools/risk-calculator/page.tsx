import type { Metadata } from 'next';
import RiskCalcClient from './RiskCalcClient';

export const metadata: Metadata = {
  title: 'Crime Risk Calculator — What Are Your Odds?',
  description: 'Calculate your statistical risk of being a crime victim in any US city. Based on FBI crime rates, see yearly and lifetime odds for violent and property crime.',
  alternates: { canonical: 'https://www.opencrime.us/tools/risk-calculator' },
};

export default function RiskCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Crime Risk Calculator — What Are Your Odds?",
        "description": "Calculate your statistical risk of being a crime victim in any US city. Based on FBI crime rates, see yearly and lifetime odds for violent and property crime.",
        "url": "https://www.opencrime.us/tools/risk-calculator",
        "applicationCategory": "DataVisualization",
        "creator": { "@type": "Organization", "name": "OpenCrime" }
      }) }} />
      <h1 className="font-heading text-3xl font-bold mb-2">Crime Risk Calculator</h1>
      <p className="text-gray-600 mb-6">See your statistical odds of being a crime victim based on where you live</p>
      <RiskCalcClient />
    </div>
  );
}
