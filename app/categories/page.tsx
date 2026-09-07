import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllCategories, getMetafieldValue } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'Categories | Food Travels',
  description:
    'Explore food travel stories by category — street food, fine dining, markets, recipes and more.',
}

export const revalidate = 60

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="mb-12 max-w-2xl">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">
          Categories
        </h1>
        <p className="text-charcoal/60 text-lg leading-relaxed">
          From bustling night markets to quiet countryside kitchens — browse
          by the flavor of story you&apos;re craving.
        </p>
      </div>

      {categories.length === 0 ? (
        <p className="text-charcoal/50">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const name =
              getMetafieldValue(category.metadata?.name) || category.title
            const description = getMetafieldValue(
              category.metadata?.description
            )
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group block p-8 rounded-2xl bg-terracotta/5 hover:bg-terracotta/10 transition-colors"
              >
                <h2 className="font-serif text-2xl font-bold text-charcoal group-hover:text-terracotta transition-colors mb-2">
                  {name}
                </h2>
                {description && (
                  <p className="text-charcoal/60 leading-relaxed line-clamp-3">
                    {description}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}