'use client'

export default function ShareButtons({ title }: { title: string }) {
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const encoded = encodeURIComponent(url)
  const text = encodeURIComponent(title)

  return (
    <div className="flex items-center gap-3 text-sm text-gray-500 my-3">
      <span>Share:</span>
      <a href={`https://twitter.com/intent/tweet?url=${encoded}&text=${text}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary" aria-label="Share on X">𝕏</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary" aria-label="Share on Facebook">
        <svg className="w-5 h-5 inline" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary" aria-label="Share on LinkedIn">
        <svg className="w-5 h-5 inline" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
      </a>
    </div>
  )
}
