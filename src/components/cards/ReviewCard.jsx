import { FiStar } from 'react-icons/fi'

export default function ReviewCard({ review }) {
  return (
    <div className="p-6 rounded-3xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-lg hover:shadow-xl dark:shadow-black/30 hover:-translate-y-1 hover:border-primary/40 transition-all duration-300 w-full h-full min-h-[260px] flex flex-col justify-between">
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex gap-1 mb-3 text-amber-400">
            {Array.from({ length: 5 }, (_, i) => (
              <FiStar key={i} fill={i < (review.rating || 0) ? 'currentColor' : 'none'} size={18} className="drop-shadow-sm" />
            ))}
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-200 mb-4 leading-relaxed italic font-normal line-clamp-6">
            &ldquo;{review.reviewText}&rdquo;
          </p>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/5 mt-auto">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-sm overflow-hidden shadow-md shadow-primary/20 shrink-0">
            {review.clientImage ? (
              <img src={review.clientImage} alt={review.clientName} className="w-full h-full object-cover" />
            ) : (
              review.clientName?.[0]
            )}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{review.clientName}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">{review.company}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

