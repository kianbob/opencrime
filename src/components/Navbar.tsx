'use client';
import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/states', label: 'States' },
  { href: '/cities', label: 'Cities' },
  { href: '/rankings', label: 'Rankings' },
  { href: '/crimes', label: 'Crime Types' },
  { href: '/arrests', label: 'Arrests' },
  { href: '/hate-crimes', label: 'Hate Crimes' },
  { href: '/international-comparison', label: 'International' },
  { href: '/analysis', label: 'Analysis' },
];

const TOOLS_CATEGORIES = [
  {
    label: 'Compare',
    items: [
      { href: '/tools/compare', label: 'Compare Cities' },
      { href: '/tools/state-compare', label: 'Compare States' },
    ],
  },
  {
    label: 'Calculators',
    items: [
      { href: '/tools/safety-score', label: 'Safety Score' },
      { href: '/tools/risk-calculator', label: 'Risk Calculator' },
      { href: '/tools/time-machine', label: 'Crime Time Machine' },
      { href: '/tools/crime-cost', label: 'Crime Cost Calculator' },
    ],
  },
  {
    label: 'Rankings',
    items: [
      { href: '/most-dangerous-cities', label: 'Most Dangerous' },
      { href: '/safest-cities', label: 'Safest Cities' },
      { href: '/most-improved', label: 'Most Improved' },
      { href: '/rankings', label: 'Rankings' },
    ],
  },
  {
    label: 'Explore',
    items: [
      { href: '/crime-clock', label: 'Crime Clock' },
      { href: '/crime-dna', label: 'Crime DNA' },
      { href: '/city-trajectories', label: 'City Trajectories' },
      { href: '/city-fingerprint', label: 'City Fingerprint' },
      { href: '/crime-velocity', label: 'Crime Velocity' },
    ],
  },
  {
    label: 'Data',
    items: [
      { href: '/tools/timeline', label: 'Timeline Explorer' },
      { href: '/tools/city-report', label: 'City Safety Report' },
      { href: '/state-report-card', label: 'State Report Cards' },
      { href: '/violence-concentration', label: 'Violence Map' },
      { href: '/hidden-crime', label: 'Hidden Crime' },
      { href: '/decades', label: 'Decades' },
      { href: '/crime-correlations', label: 'Crime Correlations' },
      { href: '/violence-inequality', label: 'Violence Inequality' },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <nav className="bg-[#1e3a5f] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="font-heading text-xl font-bold tracking-tight hover:text-blue-200 transition">
            OpenCrime
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} className="px-3 py-2 rounded-lg text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 transition">
                {link.label}
              </Link>
            ))}
            <div className="relative" onMouseEnter={() => setToolsOpen(true)} onMouseLeave={() => setToolsOpen(false)}>
              <Link href="/tools" className="px-3 py-2 rounded-lg text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 transition">
                Tools ▾
              </Link>
              {toolsOpen && (
                <div className="absolute top-full right-0 bg-white text-gray-800 rounded-lg shadow-xl py-3 z-50" style={{ width: '480px' }}>
                  <div className="grid grid-cols-2 gap-x-2 px-3">
                    {TOOLS_CATEGORIES.map(cat => (
                      <div key={cat.label} className="mb-3">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-1">{cat.label}</div>
                        {cat.items.map(t => (
                          <Link key={t.href} href={t.href} className="block px-2 py-1.5 text-sm rounded hover:bg-gray-50 transition">
                            {t.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 mt-1 pt-2 px-5">
                    <Link href="/tools" className="text-xs text-[#1e3a5f] font-medium hover:underline">View all tools →</Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 hover:bg-white/10 rounded-lg" aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 space-y-1">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-blue-100 hover:text-white hover:bg-white/10">
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/20 mt-2 pt-2">
              <span className="px-3 text-xs text-blue-300 uppercase tracking-wider">Tools</span>
              {TOOLS_CATEGORIES.map(cat => (
                <div key={cat.label} className="mt-2">
                  <span className="px-3 text-xs text-blue-400 font-semibold">{cat.label}</span>
                  {cat.items.map(t => (
                    <Link key={t.href} href={t.href} onClick={() => setOpen(false)} className="block px-5 py-1.5 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 text-sm">
                      {t.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <Link href="/about" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10">
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
