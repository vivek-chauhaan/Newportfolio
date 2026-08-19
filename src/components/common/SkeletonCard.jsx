export default function SkeletonCard({ className = '' }) {
  return (
    <div className={`animate-pulse rounded-2xl bg-white/5 border border-white/10 overflow-hidden ${className}`}>
      <div className="h-40 bg-white/10" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/10 rounded w-5/6" />
      </div>
    </div>
  )
}
