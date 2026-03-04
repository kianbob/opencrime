import Link from 'next/link'

type BreadcrumbItem = { label: string; href?: string }

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-primary">Home</Link>
      {items.map((item, i) => (
        <span key={i}>
          <span className="mx-1">›</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-primary">{item.label}</Link>
          ) : (
            <span className="text-gray-700">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
