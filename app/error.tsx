'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <span className="text-6xl mb-6 block">🔥</span>
      <h1 className="font-serif text-4xl font-bold text-charcoal mb-4">
        Something went wrong
      </h1>
      <p className="text-charcoal/60 text-lg mb-8">
        We hit a snag pulling up this page. Please try again.
      </p>
      <button
        onClick={reset}
        className="inline-block px-6 py-3 bg-terracotta text-cream rounded-full font-medium hover:bg-terracotta/90 transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}