import Link from 'next/link';

type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && ' / '}
          {item.href ? (
            <Link href={item.href} className="hover:underline">{item.label}</Link>
          ) : (
            <span className="text-gray-800">{item.label}</span>
          )}
        </span>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.filter(i => i.href).map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.label,
          item: `https://www.opencrime.us${item.href}`,
        })),
      })}} />
    </nav>
  );
}
