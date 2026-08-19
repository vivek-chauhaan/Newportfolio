export default function OutlineButton({ children, onClick, type = 'button', className = '', icon: Icon }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white font-bold text-sm tracking-wide backdrop-blur-md bg-white/60 dark:bg-white/[0.05] hover:bg-white dark:hover:bg-white/10 hover:border-primary dark:hover:border-primary-light hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 whitespace-nowrap shrink-0 ${className}`}
    >
      {Icon && <Icon size={18} className="transition-transform group-hover:scale-110 shrink-0" />}
      <span className="whitespace-nowrap">{children}</span>
    </button>
  )
}

