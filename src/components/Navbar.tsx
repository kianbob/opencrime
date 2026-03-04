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
  { href: '/analysis', label: 'Analysis' },
];

const TOOLS = [
  { href: '/tools/compare', label: 'Compare Cities' },
  { href: '/tools/state-compare', label: 'Compare States' },
  { href: '/tools/safety-score', label: 'Safety Score' },
  { href: '/tools/risk-calculator', label: 'Risk Calculator' },
  { href: '/search', label: 'Search' },
  { href: '/most-improved', label: 'Most Improved' },
  { href: '/years', label: 'By Year' },
  { href: '/crime-clock', label: 'Crime Clock' },
  { href: '/city-trajectories', label: 'Trajectories' },
  { href: '/safest-cities', label: 'Safest Cities' },
  { href: '/most-dangerous-cities', label: 'Most Dangerous' },
  { href: '/crime-dna', label: 'Crime DNA' },
  { href: '/violence-concentration', label: 'Violence Map' },
  { href: '/population-crime-paradox', label: 'Crime Paradox' },
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
                <div className="absolute top-full left-0 bg-white text-gray-800 rounded-lg shadow-xl py-2 min-w-48 z-50">
                  {TOOLS.map(t => (
                    <Link key={t.href} href={t.href} className="block px-4 py-2 text-sm hover:bg-gray-50 transition">
                      {t.label}
                    </Link>
                  ))}
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
              {TOOLS.map(t => (
                <Link key={t.href} href={t.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-blue-100 hover:text-white hover:bg-white/10">
                  {t.label}
                </Link>
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
