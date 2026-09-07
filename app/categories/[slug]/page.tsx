// app/categories/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllCategories,
  getCategoryBySlug,
  getPostsByCategory,
  getMetafieldValue,
} from '@/lib/cosmic'
import PostGrid from '@/components/PostGrid'

export const revalidate = 60

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found | Food Travels' }
  }

  const name = getMetafieldValue(category.metadata?.name) || category.title

  return {
    title: `${name} | Food Travels`,
    description:
      getMetafieldValue(category.metadata?.description) || `Posts in ${name}`,
    other: {
      'cosmic-context': JSON.stringify({
        object_id: category.id,
        object_type: 'categories',
      }),
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="mb-12 max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-terracotta">
          Category
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mt-2 mb-4">
          {name}
        </h1>
        {description && (
          <p className="text-charcoal/60 text-lg leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <PostGrid posts={posts} emptyMessage={`No posts in ${name} yet.`} />
    </div>
  )
}