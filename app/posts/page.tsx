import { Suspense } from 'react'
import type { Metadata } from 'next'
import {
  getAllPosts,
  getAllCategories,
  parseTags,
} from '@/lib/cosmic'
import PostGrid from '@/components/PostGrid'
import PostFilters from '@/components/PostFilters'

export const metadata: Metadata = {
  title: 'All Posts | Food Travels',
  description:
    'Browse street food, fine dining, markets, recipes, and budget travel stories from around the world.',
}

export const revalidate = 60

interface PostsPageProps {
  searchParams: Promise<{ category?: string; tag?: string }>
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const params = await searchParams
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ])

  const allTags = Array.from(
    new Set(posts.flatMap((post) => parseTags(post.metadata?.tags)))
  ).sort()

  let filteredPosts = posts

  if (params.category) {
    filteredPosts = filteredPosts.filter(
      (post) => post.metadata?.category?.slug === params.category
    )
  }

  if (params.tag) {
    const activeTag = params.tag
    filteredPosts = filteredPosts.filter((post) =>
      parseTags(post.metadata?.tags).includes(activeTag)
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="mb-12 max-w-2xl">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">
          All Stories
        </h1>
        <p className="text-charcoal/60 text-lg leading-relaxed">
          Every dish, market, and meal we&apos;ve discovered on the road —
          filter by category or tag to find your next craving.
        </p>
      </div>

      <Suspense fallback={null}>
        <PostFilters categories={categories} tags={allTags} />
      </Suspense>

      <PostGrid
        posts={filteredPosts}
        emptyMessage="No posts match these filters. Try clearing them."
      />
    </div>
  )
}