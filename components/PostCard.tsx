import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue, parseTags } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: Post
  priority?: boolean
}

export default function PostCard({ post, priority = false }: PostCardProps) {
  const image = post.metadata?.featured_image
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const category = post.metadata?.category
  const author = post.metadata?.author
  const tags = parseTags(post.metadata?.tags)

  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-charcoal/5 mb-5">
        <Link href={`/posts/${post.slug}`} className="block w-full h-full">
          {image ? (
            <img
              src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              width={800}
              height={600}
              loading={priority ? 'eager' : 'lazy'}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-charcoal/30 text-5xl">
              🍽️
            </div>
          )}
        </Link>
      </div>

      {category && (
        <div className="mb-3">
          <CategoryBadge category={category} />
        </div>
      )}

      <Link href={`/posts/${post.slug}`}>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-charcoal leading-snug mb-2 group-hover:text-terracotta transition-colors">
          {post.title}
        </h3>
      </Link>

      {excerpt && (
        <p className="text-charcoal/60 leading-relaxed line-clamp-2 mb-3">
          {excerpt}
        </p>
      )}

      <div className="flex items-center justify-between">
        {author?.metadata?.name && (
          <span className="text-sm text-charcoal/50 font-medium">
            By {getMetafieldValue(author.metadata.name)}
          </span>
        )}
        {tags.length > 0 && (
          <span className="text-xs text-gold font-medium uppercase tracking-wide">
            {tags[0]}
          </span>
        )}
      </div>
    </article>
  )
}