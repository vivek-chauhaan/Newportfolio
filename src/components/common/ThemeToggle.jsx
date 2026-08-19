import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext.jsx'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-amber-300 hover:border-primary dark:hover:border-primary-light hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300 shrink-0 ${className}`}
    >
      <div className="transition-transform duration-500 ease-out transform hover:rotate-45">
        {theme === 'dark' ? <FiSun size={17} className="text-amber-400" /> : <FiMoon size={17} className="text-slate-700" />}
      </div>
    </button>
  )
}

