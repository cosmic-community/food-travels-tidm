import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllAuthors, getMetafieldValue } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'Authors | Food Travels',
  description: 'Meet the writers and photographers behind Food Travels.',
}

export const revalidate = 60

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="mb-12 max-w-2xl">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">
          Our Writers
        </h1>
        <p className="text-charcoal/60 text-lg leading-relaxed">
          The people chasing flavor across borders, one plate at a time.
        </p>
      </div>

      {authors.length === 0 ? (
        <p className="text-charcoal/50">No authors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => {
            const name =
              getMetafieldValue(author.metadata?.name) || author.title
            const location = getMetafieldValue(author.metadata?.location)
            const photo = author.metadata?.photo

            return (
              <Link
                key={author.id}
                href={`/authors/${author.slug}`}
                className="group text-center p-8 rounded-2xl bg-terracotta/5 hover:bg-terracotta/10 transition-colors"
              >
                {photo ? (
                  <img
                    src={`${photo.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
                    alt={name}
                    width={120}
                    height={120}
                    className="w-28 h-28 rounded-full object-cover mx-auto mb-4"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-terracotta/20 flex items-center justify-center text-4xl mx-auto mb-4">
                    👤
                  </div>
                )}
                <h2 className="font-serif text-xl font-bold text-charcoal group-hover:text-terracotta transition-colors">
                  {name}
                </h2>
                {location && (
                  <p className="text-sm text-charcoal/50 mt-1">📍 {location}</p>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}