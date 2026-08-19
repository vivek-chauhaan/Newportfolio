export default function FilterBar({ options, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${
            active === opt
              ? 'bg-gradient-to-r from-primary via-purple-600 to-secondary text-white border-transparent shadow-md shadow-primary/30 scale-[1.02]'
              : 'border-slate-200/80 dark:border-white/15 bg-white/70 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-white/10 hover:border-primary/40 hover:scale-[1.01]'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

