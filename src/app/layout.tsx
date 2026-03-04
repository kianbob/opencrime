import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const heading = Playfair_Display({ subsets: ['latin'], variable: '--font-heading', display: 'swap' })
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'OpenCrime — US Crime Data Explorer', template: '%s | OpenCrime' },
  description: 'Explore FBI crime statistics for 9,700+ cities and all 50 states. Crime rates, trends since 1979, rankings, and analysis — free and open.',
  metadataBase: new URL('https://www.opencrime.us'),
  openGraph: {
    siteName: 'OpenCrime',
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    types: { 'application/rss+xml': '/feed.xml' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'OpenCrime',
          url: 'https://www.opencrime.us',
          description: 'Free FBI crime statistics for 9,700+ US cities. Crime rates, trends, rankings, and analysis.',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.opencrime.us/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        })}} />
        
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-K37SSPQD54" 
          strategy="afterInteractive" 
        />
        <Script 
          id="gtag" 
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K37SSPQD54');
          `}
        </Script>
        
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
