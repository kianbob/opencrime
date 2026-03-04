'use client';
import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/states', label: 'States' },
  { href: '/cities', label: 'Cities' },
  { href: '/rankings', label: 'Rankings' },
  { href: '/crimes', label: 'Crime Types' },
  { href: '/search', label: 'Search' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
            <Link href="/about" className="px-3 py-2 rounded-lg text-sm text-blue-200 hover:text-white hover:bg-white/10 transition">
              About
            </Link>
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
            <Link href="/about" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10">
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
