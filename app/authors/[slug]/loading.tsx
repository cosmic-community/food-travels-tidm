// app/authors/[slug]/loading.tsx
export default function AuthorLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16 pb-16 border-b border-charcoal/10 animate-pulse">
        <div className="w-40 h-40 rounded-full bg-charcoal/5 flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-10 w-64 bg-charcoal/5 rounded mx-auto md:mx-0" />
          <div className="h-4 w-32 bg-charcoal/5 rounded mx-auto md:mx-0" />
          <div className="h-4 w-full bg-charcoal/5 rounded" />
        </div>
      </div>
    </div>
  )
}