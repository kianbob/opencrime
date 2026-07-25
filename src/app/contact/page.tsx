import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us — OpenCrime',
  description: 'Get in touch with the OpenCrime team. General inquiries, data corrections, media requests, and research partnerships.',
  openGraph: {
    title: 'Contact Us — OpenCrime',
    description: 'Get in touch with the OpenCrime team.',
    url: 'https://www.opencrime.us/contact',
  },
  alternates: { canonical: 'https://www.opencrime.us/contact' },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"WebPage","name":"Contact Us — OpenCrime","description":"Get in touch with the OpenCrime team. General inquiries, data corrections, media requests.","url":"https://www.opencrime.us/contact","publisher":{"@type":"Organization","name":"OpenCrime","url":"https://www.opencrime.us"}}` }} />
      <h1 className="font-heading text-3xl font-bold mb-6" style={{ color: '#1e3a5f' }}>Contact Us</h1>

      <p className="text-lg text-gray-600 mb-8">
        Have a question, suggestion, or found something that doesn&apos;t look right? We&apos;d love to hear from you.
        OpenCrime is committed to making public crime data accessible and accurate.
      </p>

      <div className="space-y-8">
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-heading text-xl font-bold mb-3" style={{ color: '#1e3a5f' }}>📬 General Inquiries</h2>
          <p className="text-gray-600 mb-3">
            Questions about the site, data, partnerships, or anything else. We typically respond within 24-48 hours.
          </p>
          <a href="mailto:contact@opencrime.us" className="text-blue-600 hover:underline font-medium">contact@opencrime.us</a>
        </section>

        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-heading text-xl font-bold mb-3" style={{ color: '#1e3a5f' }}>🔧 Data Corrections &amp; Feedback</h2>
          <p className="text-gray-600 mb-3">
            OpenCrime uses publicly available FBI crime data. If you believe any data is displayed incorrectly, please let us know.
          </p>
          <p className="text-gray-600 mb-3">
            Include the specific page URL and what you believe is incorrect, and we&apos;ll investigate promptly.
          </p>
          <a href="mailto:contact@opencrime.us?subject=Data%20Correction" className="text-blue-600 hover:underline font-medium">contact@opencrime.us</a>
        </section>

        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-heading text-xl font-bold mb-3" style={{ color: '#1e3a5f' }}>📰 Media &amp; Press</h2>
          <p className="text-gray-600 mb-3">
            Journalists, researchers, and media organizations are welcome to use OpenCrime data with attribution.
            For interviews, data requests, or press inquiries:
          </p>
          <a href="mailto:contact@opencrime.us?subject=Media%20Inquiry" className="text-blue-600 hover:underline font-medium">contact@opencrime.us</a>
        </section>

        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-heading text-xl font-bold mb-3" style={{ color: '#1e3a5f' }}>🎓 Research &amp; Academic Use</h2>
          <p className="text-gray-600 mb-3">
            Students, professors, and researchers are welcome to use OpenCrime data for academic work. If you need
            bulk data exports, custom queries, or have questions about methodology, reach out and we&apos;ll do our best to help.
          </p>
          <a href="mailto:contact@opencrime.us?subject=Research%20Inquiry" className="text-blue-600 hover:underline font-medium">contact@opencrime.us</a>
        </section>

        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-heading text-xl font-bold mb-3" style={{ color: '#1e3a5f' }}>🏛️ Law Enforcement &amp; Government</h2>
          <p className="text-gray-600 mb-3">
            Law enforcement agencies and government officials with questions about how their jurisdiction&apos;s data
            is presented, or who want to ensure their reporting is accurately reflected, are encouraged to contact us.
          </p>
          <a href="mailto:contact@opencrime.us?subject=Government%20Inquiry" className="text-blue-600 hover:underline font-medium">contact@opencrime.us</a>
        </section>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mt-10">
        <h2 className="font-heading text-xl font-bold mb-4" style={{ color: '#1e3a5f' }}>About the Project</h2>
        <p className="text-gray-600 mb-4">
          OpenCrime is a free, ad-free platform that makes FBI crime data accessible to everyone. We believe
          public data should be publicly accessible — without paywalls, logins, or barriers.
        </p>
        <p className="text-gray-600 mb-4">
          Our database covers <strong>9,739 cities</strong> and <strong>all 50 states</strong> plus Washington DC,
          with data going back decades. We process raw FBI Uniform Crime Reporting data into interactive rankings,
          city profiles, state comparisons, and in-depth analysis articles.
        </p>
        <p className="text-gray-600 mb-4">
          OpenCrime is part of <a href="https://thedataproject.ai" className="text-blue-600 hover:underline">TheDataProject.ai</a>,
          a portfolio of data-driven websites that aggregate and visualize public records across healthcare, transportation,
          finance, and public safety.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6 mt-8">
        <h2 className="font-heading text-xl font-bold mb-4" style={{ color: '#1e3a5f' }}>Quick Links</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <Link href="/faq" className="text-[#1e3a5f] hover:underline">Frequently Asked Questions →</Link>
          <Link href="/about" className="text-[#1e3a5f] hover:underline">About OpenCrime →</Link>
          <Link href="/analysis" className="text-[#1e3a5f] hover:underline">Crime Analysis Articles →</Link>
          <Link href="/cities" className="text-[#1e3a5f] hover:underline">Browse All Cities →</Link>
        </div>
      </div>
    </div>
  );
}
