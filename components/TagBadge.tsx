import Link from 'next/link'

export default function TagBadge({
  tag,
  active = false,
}: {
  tag: string
  active?: boolean
}) {
  return (
    <Link
      href={`/posts?tag=${encodeURIComponent(tag)}`}
      className={`inline-block px-3 py-1.5 text-xs font-semibold uppercase tracking-wide rounded-full transition-colors ${
        active
          ? 'bg-gold text-charcoal'
          : 'bg-charcoal/5 text-charcoal/60 hover:bg-gold/20 hover:text-charcoal'
      }`}
    >
      #{tag}
    </Link>
  )
}