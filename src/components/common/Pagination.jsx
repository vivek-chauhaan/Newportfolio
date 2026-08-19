import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(Math.max(0, page - 1))}
        disabled={page === 0}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 disabled:opacity-30 hover:border-primary transition-all duration-300 shadow-sm"
      >
        <FiChevronLeft size={18} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-10 h-10 rounded-full text-xs font-bold transition-all duration-300 ${
            i === page
              ? 'bg-gradient-to-r from-primary via-purple-600 to-secondary text-white shadow-md shadow-primary/30 scale-105'
              : 'bg-white/80 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-primary'
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
        disabled={page === totalPages - 1}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 disabled:opacity-30 hover:border-primary transition-all duration-300 shadow-sm"
      >
        <FiChevronRight size={18} />
      </button>
    </div>
  )
}

