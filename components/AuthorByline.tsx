import Link from 'next/link'
import type { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function AuthorByline({ author }: { author: Author }) {
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const location = getMetafieldValue(author.metadata?.location)
  const photo = author.metadata?.photo

  return (
    <Link href={`/authors/${author.slug}`} className="flex items-center gap-4 group">
      {photo ? (
        <img
          src={`${photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
          alt={name}
          width={80}
          height={80}
          className="w-16 h-16 rounded-full object-cover"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-terracotta/10 flex items-center justify-center text-2xl">
          👤
        </div>
      )}
      <div>
        <p className="font-serif text-lg font-bold text-charcoal group-hover:text-terracotta transition-colors">
          {name}
        </p>
        {location && <p className="text-sm text-charcoal/50">📍 {location}</p>}
      </div>
    </Link>
  )
}