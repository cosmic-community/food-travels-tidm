'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/posts', label: 'Posts' },
    { href: '/categories', label: 'Categories' },
    { href: '/authors', label: 'Authors' },
    { href: '/about', label: 'About' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="font-serif text-2xl md:text-3xl font-bold text-charcoal tracking-tight"
          >
            Food <span className="text-terracotta">Travels</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wide text-charcoal/70 hover:text-terracotta transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-charcoal transition-transform ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-charcoal transition-opacity ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-charcoal transition-transform ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden flex flex-col gap-1 pb-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3 text-sm font-medium uppercase tracking-wide text-charcoal/70 hover:text-terracotta transition-colors border-b border-charcoal/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}