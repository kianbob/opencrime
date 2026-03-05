import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'OpenCrime privacy policy. We collect minimal analytics data and never sell personal information.',
  openGraph: { url: 'https://www.opencrime.us/privacy' },
  alternates: { canonical: 'https://www.opencrime.us/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"WebPage","name":"Privacy Policy","description":"OpenCrime privacy policy. We collect minimal analytics data and never sell personal information.","url":"https://www.opencrime.us/privacy","publisher":{"@type":"Organization","name":"OpenCrime","url":"https://www.opencrime.us"}}` }} />
      <h1 className="font-heading text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose prose-lg max-w-none">
        <p><strong>Last updated:</strong> March 4, 2026</p>

        <h2 className="font-heading">What We Collect</h2>
        <p>OpenCrime uses Google Analytics to understand how visitors use the site. This collects:</p>
        <ul>
          <li>Page views and navigation patterns</li>
          <li>Approximate geographic location (country/city level)</li>
          <li>Device type and browser</li>
          <li>Referral source</li>
        </ul>
        <p>We do <strong>not</strong> collect names, email addresses, or any personally identifiable information.</p>

        <h2 className="font-heading">No Accounts, No Tracking</h2>
        <p>
          OpenCrime has no user accounts, no login system, no cookies beyond analytics, and no advertising.
          We don&apos;t track individual users across sessions and we don&apos;t build user profiles.
        </p>

        <h2 className="font-heading">Data Sources</h2>
        <p>
          All crime data on this site comes from publicly available FBI datasets. We do not collect, 
          store, or process any private or personal crime data. All statistics are aggregate data 
          from law enforcement agencies.
        </p>

        <h2 className="font-heading">Third Parties</h2>
        <p>We use:</p>
        <ul>
          <li><strong>Vercel</strong> for hosting</li>
          <li><strong>Google Analytics</strong> for anonymized usage statistics</li>
        </ul>
        <p>We do not sell, rent, or share any data with third parties.</p>

        <h2 className="font-heading">Contact</h2>
        <p>Questions about this policy? Email <a href="mailto:info@thedataproject.ai" className="text-[#1e3a5f]">info@thedataproject.ai</a>.</p>
      </div>
    </div>
  );
}
