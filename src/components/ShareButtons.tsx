'use client';

export default function ShareButtons({ title }: { title: string }) {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm text-gray-500">Share:</span>
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener" className="text-sm px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition">𝕏</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener" className="text-sm px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Facebook</a>
      <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`} target="_blank" rel="noopener" className="text-sm px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition">LinkedIn</a>
    </div>
  );
}
