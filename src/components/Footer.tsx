import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Explore</h3>
          <ul className="space-y-2">
            <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
            <li><Link href="/states" className="hover:text-white">States</Link></li>
            <li><Link href="/cities" className="hover:text-white">Cities</Link></li>
            <li><Link href="/crimes" className="hover:text-white">Crime Types</Link></li>
            <li><Link href="/rankings" className="hover:text-white">Rankings</Link></li>
            <li><Link href="/search" className="hover:text-white">Search</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Resources</h3>
          <ul className="space-y-2">
            <li><Link href="/crime-rate" className="hover:text-white">US Crime Rate</Link></li>
            <li><Link href="/murder-rate" className="hover:text-white">Murder Rate</Link></li>
            <li><Link href="/safest-cities" className="hover:text-white">Safest Cities</Link></li>
            <li><Link href="/most-dangerous-cities" className="hover:text-white">Most Dangerous Cities</Link></li>
            <li><Link href="/methodology" className="hover:text-white">Methodology</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Tools & Analysis</h3>
          <ul className="space-y-2">
            <li><Link href="/tools/compare" className="hover:text-white">Compare Cities</Link></li>
            <li><Link href="/tools/safety-score" className="hover:text-white">Safety Score</Link></li>
            <li><Link href="/arrests" className="hover:text-white">Arrest Data</Link></li>
            <li><Link href="/hate-crimes" className="hover:text-white">Hate Crimes</Link></li>
            <li><Link href="/analysis" className="hover:text-white">Analysis Articles</Link></li>
            <li><Link href="/analysis/crime-decline" className="hover:text-white">The Great Crime Decline</Link></li>
            <li><Link href="/analysis/gun-violence" className="hover:text-white">Gun Violence</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Popular States</h3>
          <ul className="space-y-2">
            <li><Link href="/states/ca" className="hover:text-white">California</Link></li>
            <li><Link href="/states/tx" className="hover:text-white">Texas</Link></li>
            <li><Link href="/states/fl" className="hover:text-white">Florida</Link></li>
            <li><Link href="/states/ny" className="hover:text-white">New York</Link></li>
            <li><Link href="/states/il" className="hover:text-white">Illinois</Link></li>
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
        <p>Data from FBI Crime Data Explorer &amp; Uniform Crime Reporting (UCR) Program. Not legal advice.</p>
        <p className="mt-1">A <a href="https://thedataproject.ai" className="hover:underline hover:text-gray-300">TheDataProject.ai</a> platform · 9,800+ pages of free crime data · © {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
