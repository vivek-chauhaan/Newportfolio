export default function PrimaryButton({ children, onClick, type = 'button', className = '', icon: Icon }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`shimmer-btn transform-gpu inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-primary via-purple-600 to-secondary text-white font-bold text-sm tracking-wide shadow-[0_6px_0_-1px_rgba(109,40,217,0.5),0_10px_25px_-6px_rgba(139,92,246,0.5)] hover:shadow-glow-primary hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] active:shadow-[0_2px_0_-1px_rgba(109,40,217,0.5),0_4px_12px_-4px_rgba(139,92,246,0.5)] transition-all duration-300 whitespace-nowrap shrink-0 ${className}`}
    >
      {Icon && <Icon size={18} className="transition-transform group-hover:scale-110 shrink-0" />}
      <span className="whitespace-nowrap">{children}</span>
    </button>
  )
}

