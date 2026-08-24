import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const heading = Playfair_Display({ subsets: ['latin'], variable: '--font-heading', display: 'swap' })
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'US Crime Rates by City — 9,739 Cities | OpenCrime', template: '%s | OpenCrime' },
  description: 'Compare crime rates across 9,739 US cities. Search violent crime, property crime, and safety rankings for any city or state. Free, updated data.',
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
      <head>
      </head>      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'OpenCrime',
          url: 'https://www.opencrime.us',
          description: 'Compare crime rates across 9,739 US cities and all 50 states. Search violent crime, property crime, and safety rankings. Free, updated FBI data.',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.opencrime.us/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        })}} />
        
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-RNSJRKGR0G" 
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
            gtag('config', 'G-RNSJRKGR0G');
          `}
        </Script>
        
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
