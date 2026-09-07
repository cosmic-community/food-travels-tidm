import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <span className="text-6xl mb-6 block">🧭</span>
      <h1 className="font-serif text-4xl font-bold text-charcoal mb-4">
        Page Not Found
      </h1>
      <p className="text-charcoal/60 text-lg mb-8">
        Looks like this dish isn&apos;t on the menu. Let&apos;s get you back
        to something delicious.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-terracotta text-cream rounded-full font-medium hover:bg-terracotta/90 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}