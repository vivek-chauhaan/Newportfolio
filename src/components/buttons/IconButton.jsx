export default function IconButton({ icon: Icon, onClick, label, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary/80 backdrop-blur-md border border-white/10 transition-colors duration-300 ${className}`}
    >
      <Icon size={18} />
    </button>
  )
}
