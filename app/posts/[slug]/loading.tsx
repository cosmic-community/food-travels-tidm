// app/posts/[slug]/loading.tsx
export default function PostLoading() {
  return (
    <div className="pb-24">
      <div className="aspect-[21/9] w-full bg-charcoal/5 animate-pulse" />
      <div className="max-w-3xl mx-auto px-6 lg:px-8 -mt-20 md:-mt-32 relative z-10">
        <div className="bg-cream rounded-2xl p-6 md:p-12 shadow-xl animate-pulse">
          <div className="h-6 w-24 bg-charcoal/5 rounded-full mb-4" />
          <div className="h-10 w-full bg-charcoal/5 rounded mb-6" />
          <div className="h-16 w-64 bg-charcoal/5 rounded mb-8" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-charcoal/5 rounded" />
            <div className="h-4 w-full bg-charcoal/5 rounded" />
            <div className="h-4 w-3/4 bg-charcoal/5 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}