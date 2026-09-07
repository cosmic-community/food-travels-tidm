// app/posts/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getAllPosts,
  getPostBySlug,
  getMetafieldValue,
  parseTags,
} from '@/lib/cosmic'
import AuthorByline from '@/components/AuthorByline'
import CategoryBadge from '@/components/CategoryBadge'
import TagBadge from '@/components/TagBadge'

export const revalidate = 60

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found | Food Travels' }
  }

  const excerpt = getMetafieldValue(post.metadata?.excerpt)

  return {
    title: `${post.title} | Food Travels`,
    description: excerpt || post.title,
    other: {
      'cosmic-context': JSON.stringify({
        object_id: post.id,
        object_type: 'posts',
      }),
    },
    openGraph: post.metadata?.featured_image
      ? {
          images: [
            {
              url: `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
            },
          ],
        }
      : undefined,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const image = post.metadata?.featured_image
  const content = getMetafieldValue(post.metadata?.content)
  const category = post.metadata?.category
  const author = post.metadata?.author
  const tags = parseTags(post.metadata?.tags)

  return (
    <article className="pb-24">
      <div className="relative">
        {image ? (
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-charcoal/10">
            <img
              src={`${image.imgix_url}?w=2400&h=1200&fit=crop&auto=format,compress`}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
          </div>
        ) : (
          <div className="aspect-[21/9] w-full bg-charcoal/10 flex items-center justify-center text-8xl">
            🍽️
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-8 -mt-20 md:-mt-32 relative z-10">
        <div className="bg-cream rounded-2xl p-6 md:p-12 shadow-xl">
          {category && (
            <div className="mb-4">
              <CategoryBadge category={category} />
            </div>
          )}

          <h1 className="font-serif text-3xl md:text-5xl font-bold text-charcoal leading-tight mb-6">
            {post.title}
          </h1>

          {author && (
            <div className="mb-8">
              <AuthorByline author={author} />
              {author.metadata?.bio && (
                <p className="text-charcoal/60 mt-4 leading-relaxed max-w-xl">
                  {getMetafieldValue(author.metadata.bio)}
                </p>
              )}
            </div>
          )}

          <div
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-charcoal prose-p:text-charcoal/80 prose-a:text-terracotta prose-strong:text-charcoal prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-charcoal/10">
              {tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          )}

          <div className="mt-10 pt-8 border-t border-charcoal/10">
            <Link
              href="/posts"
              className="text-terracotta font-medium hover:underline"
            >
              ← Back to all stories
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}