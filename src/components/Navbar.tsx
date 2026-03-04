'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-[#1e3a5f] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="text-xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
          Open<span className="text-red-400">Crime</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/dashboard" className="hover:text-red-300 transition-colors">Dashboard</Link>
          <Link href="/states" className="hover:text-red-300 transition-colors">States</Link>
          <Link href="/crimes" className="hover:text-red-300 transition-colors">Crime Types</Link>
          <Link href="/rankings" className="hover:text-red-300 transition-colors">Rankings</Link>
          <Link href="/analysis" className="hover:text-red-300 transition-colors">Analysis</Link>
          <Link href="/search" className="hover:text-red-300 transition-colors">Search</Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Toggle menu">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#162d4a] border-t border-white/10 px-4 py-3 space-y-2 text-sm">
          <Link href="/dashboard" className="block py-1 hover:text-red-300" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link href="/states" className="block py-1 hover:text-red-300" onClick={() => setOpen(false)}>States</Link>
          <Link href="/crimes" className="block py-1 hover:text-red-300" onClick={() => setOpen(false)}>Crime Types</Link>
          <Link href="/rankings" className="block py-1 hover:text-red-300" onClick={() => setOpen(false)}>Rankings</Link>
          <Link href="/analysis" className="block py-1 hover:text-red-300" onClick={() => setOpen(false)}>Analysis</Link>
          <Link href="/search" className="block py-1 hover:text-red-300" onClick={() => setOpen(false)}>Search</Link>
        </div>
      )}
    </nav>
  )
}
