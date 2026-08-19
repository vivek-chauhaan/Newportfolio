export default function PrimaryButton({ children, onClick, type = 'button', className = '', icon: Icon }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`shimmer-btn inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-primary via-purple-600 to-secondary text-white font-bold text-sm tracking-wide shadow-lg shadow-primary/30 hover:shadow-glow-primary hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 whitespace-nowrap shrink-0 ${className}`}
    >
      {Icon && <Icon size={18} className="transition-transform group-hover:scale-110 shrink-0" />}
      <span className="whitespace-nowrap">{children}</span>
    </button>
  )
}

