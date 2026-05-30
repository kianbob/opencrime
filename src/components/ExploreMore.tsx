import Link from 'next/link';

const SECTIONS = [
  { href: '/most-dangerous-cities', label: 'Most Dangerous Cities', emoji: '🔴' },
  { href: '/safest-cities', label: 'Safest Cities', emoji: '🟢' },
  { href: '/murder-rate', label: 'Murder Rate', emoji: '💀' },
  { href: '/violent-crime', label: 'Violent Crime', emoji: '⚠️' },
  { href: '/property-crime', label: 'Property Crime', emoji: '🏠' },
  { href: '/crime-rate', label: 'US Crime Rate', emoji: '📊' },
  { href: '/states', label: 'Crime by State', emoji: '🗺️' },
  { href: '/cities', label: 'Crime by City', emoji: '🏙️' },
  { href: '/rankings', label: 'Full Rankings', emoji: '🏆' },
  { href: '/assault-statistics', label: 'Assault Statistics', emoji: '👊' },
  { href: '/arrests', label: 'Arrest Data', emoji: '🚔' },
  { href: '/analysis/gun-violence', label: 'Gun Violence', emoji: '🔫' },
];

export default function ExploreMore({ currentPath }: { currentPath: string }) {
  const links = SECTIONS.filter(s => s.href !== currentPath).slice(0, 8);
  return (
    <div className="bg-[#f0f4f8] rounded-xl p-6 mt-10 mb-6">
      <h3 className="font-heading text-lg font-bold mb-3">Explore More Crime Data</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {links.map(l => (
          <Link key={l.href} href={l.href} className="flex items-center gap-2 text-sm text-[#1e3a5f] hover:underline font-medium">
            <span>{l.emoji}</span> {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
