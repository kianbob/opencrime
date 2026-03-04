import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Explore</h3>
          <ul className="space-y-2">
            <li><Link href="/states" className="hover:text-white">States</Link></li>
            <li><Link href="/crimes" className="hover:text-white">Crime Types</Link></li>
            <li><Link href="/rankings" className="hover:text-white">Rankings</Link></li>
            <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
            <li><Link href="/search" className="hover:text-white">Search</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Analysis</h3>
          <ul className="space-y-2">
            <li><Link href="/analysis" className="hover:text-white">All Analysis</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/methodology" className="hover:text-white">Methodology</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/downloads" className="hover:text-white">Downloads</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Popular</h3>
          <ul className="space-y-2">
            <li><Link href="/rankings/safest-cities" className="hover:text-white">Safest Cities</Link></li>
            <li><Link href="/rankings/most-dangerous" className="hover:text-white">Most Dangerous Cities</Link></li>
            <li><Link href="/crimes/murder" className="hover:text-white">Murder Statistics</Link></li>
            <li><Link href="/crimes/robbery" className="hover:text-white">Robbery Statistics</Link></li>
            <li><Link href="/rankings/safest-states" className="hover:text-white">Safest States</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Sister Sites</h3>
          <ul className="space-y-2">
            <li><a href="https://www.openmedicaid.org" className="hover:text-white">OpenMedicaid</a></li>
            <li><a href="https://www.openmedicare.us" className="hover:text-white">OpenMedicare</a></li>
            <li><a href="https://www.openprescriber.org" className="hover:text-white">OpenPrescriber</a></li>
            <li><a href="https://www.openlobby.us" className="hover:text-white">OpenLobby</a></li>
            <li><a href="https://www.vaccinewatch.org" className="hover:text-white">VaccineWatch</a></li>
            <li><a href="https://www.opensubsidies.org" className="hover:text-white">OpenSubsidies</a></li>
            <li><a href="https://www.openimmigration.us" className="hover:text-white">OpenImmigration</a></li>
            <li><a href="https://thedataproject.ai" className="hover:text-white">TheDataProject.ai</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
        <p>Data from FBI Uniform Crime Reporting (UCR) Program. Not legal advice.</p>
        <p className="mt-1">A <a href="https://thedataproject.ai" className="text-primary hover:underline">TheDataProject.ai</a> platform · © {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
