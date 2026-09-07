import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function HeroPost({ post }: { post: Post }) {
  const image = post.metadata?.featured_image
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const category = post.metadata?.category
  const author = post.metadata?.author

  return (
    <section className="relative">
      <Link href={`/posts/${post.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl aspect-[16/9] md:aspect-[21/9] bg-charcoal/10">
          {image ? (
            <img
              src={`${image.imgix_url}?w=2400&h=1200&fit=crop&auto=format,compress`}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-cream text-8xl bg-charcoal/20">
              🍜
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            {category && (
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wide bg-terracotta text-cream rounded-full">
                {getMetafieldValue(category.metadata?.name) || category.title}
              </span>
            )}
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-4 max-w-3xl">
              {post.title}
            </h1>
            {excerpt && (
              <p className="text-cream/80 text-base md:text-lg leading-relaxed max-w-2xl mb-4 hidden md:block">
                {excerpt}
              </p>
            )}
            {author?.metadata?.name && (
              <p className="text-gold font-medium">
                By {getMetafieldValue(author.metadata.name)}
                {author.metadata.location &&
                  ` · ${getMetafieldValue(author.metadata.location)}`}
              </p>
            )}
          </div>
        </div>
      </Link>
    </section>
  )
}