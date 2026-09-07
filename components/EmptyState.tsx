export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-24">
      <div className="text-5xl mb-4">🍽️</div>
      <p className="text-charcoal/50 text-lg">{message}</p>
    </div>
  )
}