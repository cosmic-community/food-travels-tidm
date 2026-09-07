'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface PostFiltersProps {
  categories: Category[]
  tags: string[]
}

export default function PostFilters({ categories, tags }: PostFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeCategory = searchParams.get('category') || ''
  const activeTag = searchParams.get('tag') || ''

  function updateParams(key: 'category' | 'tag', value: string) {
    const params = new URLSearchParams(searchParams.toString())
    const current = params.get(key)
    if (current === value) {
      params.delete(key)
    } else if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  const hasActiveFilters = Boolean(activeCategory || activeTag)

  return (
    <div className="mb-12 space-y-6">
      {categories.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-charcoal/40 mb-3">
            Category
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const name =
                getMetafieldValue(category.metadata?.name) || category.title
              const isActive = activeCategory === category.slug
              return (
                <button
                  key={category.id}
                  onClick={() => updateParams('category', category.slug)}
                  className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                    isActive
                      ? 'bg-terracotta text-cream border-terracotta'
                      : 'bg-transparent text-charcoal/70 border-charcoal/15 hover:border-terracotta hover:text-terracotta'
                  }`}
                >
                  {name}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {tags.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-charcoal/40 mb-3">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const isActive = activeTag === tag
              return (
                <button
                  key={tag}
                  onClick={() => updateParams('tag', tag)}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wide rounded-full transition-colors ${
                    isActive
                      ? 'bg-gold text-charcoal'
                      : 'bg-charcoal/5 text-charcoal/60 hover:bg-gold/20'
                  }`}
                >
                  #{tag}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {hasActiveFilters && (
        <button
          onClick={() => router.push(pathname)}
          className="text-sm font-medium text-terracotta underline hover:text-terracotta/70"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}