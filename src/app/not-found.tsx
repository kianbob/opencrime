import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="font-heading text-6xl font-bold text-[#1e3a5f] mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/" className="bg-[#1e3a5f] text-white px-6 py-3 rounded-lg hover:bg-[#2a4d7a] transition">Home</Link>
        <Link href="/search" className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition">Search Cities</Link>
        <Link href="/states" className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition">Browse States</Link>
      </div>
    </div>
  );
}
