import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllAuthors, getMetafieldValue } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'About | Food Travels',
  description:
    'Food Travels is a food and travel blog chasing street food, fine dining, markets, and recipes around the world.',
}

export const revalidate = 60

export default async function AboutPage() {
  const authors = await getAllAuthors()

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <span className="text-5xl mb-4 block">🌍🍜</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-6">
          About Food Travels
        </h1>
        <p className="text-charcoal/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          We believe the best way to understand a place is through its food.
          Food Travels is a collection of stories from street corners, night
          markets, family kitchens, and fine dining rooms across the globe —
          plus the recipes and budget tips to bring it all home.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="text-center p-8 rounded-2xl bg-terracotta/5">
          <span className="text-4xl mb-4 block">🍢</span>
          <h3 className="font-serif text-xl font-bold text-charcoal mb-2">
            Street Food
          </h3>
          <p className="text-charcoal/60 leading-relaxed">
            The best meals are often found from a cart, a stall, or a plastic
            stool on the sidewalk.
          </p>
        </div>
        <div className="text-center p-8 rounded-2xl bg-terracotta/5">
          <span className="text-4xl mb-4 block">🥘</span>
          <h3 className="font-serif text-xl font-bold text-charcoal mb-2">
            Markets &amp; Recipes
          </h3>
          <p className="text-charcoal/60 leading-relaxed">
            We shop the markets, learn the techniques, and bring the recipes
            back for your kitchen.
          </p>
        </div>
        <div className="text-center p-8 rounded-2xl bg-terracotta/5">
          <span className="text-4xl mb-4 block">🎒</span>
          <h3 className="font-serif text-xl font-bold text-charcoal mb-2">
            Budget Travel
          </h3>
          <p className="text-charcoal/60 leading-relaxed">
            Great food doesn&apos;t require a big budget — we share how to eat
            well for less.
          </p>
        </div>
      </div>

      {authors.length > 0 && (
        <div>
          <h2 className="font-serif text-3xl font-bold text-charcoal mb-8 text-center">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.map((author) => {
              const name =
                getMetafieldValue(author.metadata?.name) || author.title
              const photo = author.metadata?.photo
              const location = getMetafieldValue(author.metadata?.location)

              return (
                <Link
                  key={author.id}
                  href={`/authors/${author.slug}`}
                  className="group text-center p-6 rounded-2xl hover:bg-terracotta/5 transition-colors"
                >
                  {photo ? (
                    <img
                      src={`${photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                      alt={name}
                      width={100}
                      height={100}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-3"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-terracotta/10 flex items-center justify-center text-3xl mx-auto mb-3">
                      👤
                    </div>
                  )}
                  <p className="font-serif font-bold text-charcoal group-hover:text-terracotta transition-colors">
                    {name}
                  </p>
                  {location && (
                    <p className="text-sm text-charcoal/50">{location}</p>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}