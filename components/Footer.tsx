import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-cream mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">
              Food <span className="text-gold">Travels</span>
            </h3>
            <p className="text-cream/70 leading-relaxed max-w-sm">
              Stories of street food, fine dining, markets, and recipes
              discovered on the road.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gold mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/posts"
                  className="text-cream/70 hover:text-cream transition-colors"
                >
                  All Posts
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-cream/70 hover:text-cream transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/authors"
                  className="text-cream/70 hover:text-cream transition-colors"
                >
                  Authors
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-cream/70 hover:text-cream transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gold mb-4">
              Powered By
            </h4>
            <p className="text-cream/70">
              Built with{' '}
              <a
                href="https://www.cosmicjs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-cream transition-colors"
              >
                Cosmic
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 text-center text-cream/50 text-sm">
          © {year} Food Travels. All rights reserved.
        </div>
      </div>
    </footer>
  )
}