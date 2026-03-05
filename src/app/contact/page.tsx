import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — OpenCrime',
  description: 'Get in touch with the OpenCrime team. General inquiries, data corrections, media requests.',
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
      </p>

      <div className="space-y-8">
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-heading text-xl font-bold mb-3" style={{ color: '#1e3a5f' }}>📬 General Inquiries</h2>
          <p className="text-gray-600 mb-3">
            Questions about the site, data, partnerships, or anything else.
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
      </div>
    </div>
  );
}
