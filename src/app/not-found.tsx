import Link from 'next/link';

const popularLinks = [
  { href: '/dashboard', label: 'National Crime Dashboard' },
  { href: '/rankings', label: 'Most Dangerous & Safest Cities' },
  { href: '/states', label: 'Browse All 50 States' },
  { href: '/cities', label: 'Search 9,700+ Cities' },
  { href: '/analysis', label: 'Crime Analysis Articles' },
  { href: '/tools', label: 'Interactive Tools' },
  { href: '/murder-rate', label: 'Murder Rate by City' },
  { href: '/crime-rate', label: 'US Crime Rate Trends' },
];

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-8xl font-bold text-gray-100 mb-4 leading-none select-none">404</div>
      <h1 className="font-heading text-3xl font-bold text-[#1e3a5f] mb-3">Page Not Found</h1>
      <p className="text-gray-500 mb-10">
        That page doesn&apos;t exist. Try searching for a city or state, or explore our most popular pages below.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <Link href="/" className="bg-[#1e3a5f] text-white px-6 py-3 rounded-lg hover:bg-[#2a4d7a] transition font-medium">Home</Link>
        <Link href="/search" className="bg-[#dc2626] text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium">Search Cities</Link>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 text-left">
        <h2 className="font-heading font-bold text-[#1e3a5f] mb-4">Popular Pages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {popularLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#1e3a5f] hover:underline py-1"
            >
              <span className="text-gray-300">→</span>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
