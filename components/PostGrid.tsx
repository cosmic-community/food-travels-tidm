import type { Post } from '@/types'
import PostCard from '@/components/PostCard'
import EmptyState from '@/components/EmptyState'

export default function PostGrid({
  posts,
  emptyMessage,
}: {
  posts: Post[]
  emptyMessage?: string
}) {
  if (!posts || posts.length === 0) {
    return <EmptyState message={emptyMessage || 'No posts found.'} />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}