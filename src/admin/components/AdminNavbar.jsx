import { FiLogOut, FiMenu, FiGlobe } from 'react-icons/fi'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import ThemeToggle from '../../components/common/ThemeToggle.jsx'

export default function AdminNavbar({ onToggleMobileMenu }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-bg-darksurface/70 backdrop-blur-xl sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white text-lg"
          aria-label="Toggle Navigation"
        >
          <FiMenu />
        </button>
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Authenticated Admin Portal
          </p>
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            Logged in as <span className="text-primary dark:text-primary-light">{user?.name || 'Admin'}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white hover:border-primary border border-transparent transition-all"
        >
          <FiGlobe /> View Live Site
        </Link>

        <ThemeToggle />

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-colors"
        >
          <FiLogOut size={14} /> Logout
        </button>
      </div>
    </header>
  )
}
