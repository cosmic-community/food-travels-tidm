import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function CategoryBadge({ category }: { category: Category }) {
  const name = getMetafieldValue(category.metadata?.name) || category.title

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-terracotta/10 text-terracotta rounded-full hover:bg-terracotta hover:text-cream transition-colors"
    >
      {name}
    </Link>
  )
}