export default function PostsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="h-10 w-64 bg-charcoal/5 rounded mb-4 animate-pulse" />
      <div className="h-6 w-96 bg-charcoal/5 rounded mb-12 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/3] bg-charcoal/5 rounded-lg mb-5" />
            <div className="h-4 w-20 bg-charcoal/5 rounded mb-3" />
            <div className="h-6 w-full bg-charcoal/5 rounded mb-2" />
            <div className="h-4 w-full bg-charcoal/5 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}