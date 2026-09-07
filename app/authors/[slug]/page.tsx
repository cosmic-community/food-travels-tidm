// app/authors/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllAuthors,
  getAuthorBySlug,
  getPostsByAuthor,
  getMetafieldValue,
} from '@/lib/cosmic'
import PostGrid from '@/components/PostGrid'

export const revalidate = 60

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = await getAllAuthors()
  return authors.map((author) => ({ slug: author.slug }))
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    return { title: 'Author Not Found | Food Travels' }
  }

  const name = getMetafieldValue(author.metadata?.name) || author.title

  return {
    title: `${name} | Food Travels`,
    description: getMetafieldValue(author.metadata?.bio) || `Posts by ${name}`,
    other: {
      'cosmic-context': JSON.stringify({
        object_id: author.id,
        object_type: 'authors',
      }),
    },
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const location = getMetafieldValue(author.metadata?.location)
  const photo = author.metadata?.photo

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16 pb-16 border-b border-charcoal/10">
        {photo ? (
          <img
            src={`${photo.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
            alt={name}
            width={160}
            height={160}
            className="w-40 h-40 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-40 h-40 rounded-full bg-terracotta/10 flex items-center justify-center text-5xl flex-shrink-0">
            👤
          </div>
        )}
        <div className="text-center md:text-left">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-2">
            {name}
          </h1>
          {location && (
            <p className="text-terracotta font-medium mb-4">📍 {location}</p>
          )}
          {bio && (
            <p className="text-charcoal/60 text-lg leading-relaxed max-w-2xl">
              {bio}
            </p>
          )}
        </div>
      </div>

      <h2 className="font-serif text-2xl font-bold text-charcoal mb-8">
        Stories by {name}
      </h2>

      <PostGrid
        posts={posts}
        emptyMessage={`${name} hasn't published any stories yet.`}
      />
    </div>
  )
}