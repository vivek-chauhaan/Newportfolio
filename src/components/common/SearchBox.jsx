import { FiSearch } from 'react-icons/fi'

export default function SearchBox({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative w-full max-w-md">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400 text-lg" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-5 py-3 rounded-full bg-white/80 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white backdrop-blur-xl placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent shadow-sm hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300"
      />
    </div>
  )
}

