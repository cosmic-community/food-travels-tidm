import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getAllCategories, getMetafieldValue } from '@/lib/cosmic'
import HeroPost from '@/components/HeroPost'
import PostGrid from '@/components/PostGrid'

export const metadata: Metadata = {
  title: 'Food Travels | Street Food, Fine Dining & Markets Around the World',
  description:
    'A food and travel blog showcasing street food, fine dining, markets, recipes, and budget travel discovered on the road.',
}

export const revalidate = 60

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ])

  const [featuredPost, ...restPosts] = posts
  const recentPosts = restPosts.slice(0, 6)

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-charcoal leading-tight mb-4">
            Eat your way{' '}
            <span className="text-terracotta">around the world</span>
          </h1>
          <p className="text-charcoal/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Street food, fine dining, markets, recipes, and budget travel —
            stories from the road, plate by plate.
          </p>
        </div>

        {featuredPost && <HeroPost post={featuredPost} />}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal">
            Recent Stories
          </h2>
          <Link
            href="/posts"
            className="text-terracotta font-medium hover:underline whitespace-nowrap ml-4"
          >
            View all →
          </Link>
        </div>

        <PostGrid
          posts={recentPosts}
          emptyMessage="No posts yet — check back soon!"
        />
      </div>

      {categories.length > 0 && (
        <div className="bg-terracotta/5 py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-10 text-center">
              Browse by Category
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => {
                const name =
                  getMetafieldValue(category.metadata?.name) || category.title
                return (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="px-6 py-3 bg-cream rounded-full font-medium text-charcoal hover:bg-terracotta hover:text-cream transition-colors shadow-sm"
                  >
                    {name}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}