import { NavLink } from 'react-router-dom'
import {
  FiGrid, FiUser, FiCode, FiFolder, FiBriefcase, FiBookOpen,
  FiAward, FiStar, FiFileText, FiLink, FiMail, FiSettings, FiCode as LogoIcon
} from 'react-icons/fi'
import logoImg from '../../assets/images/logo.png'

const NAV = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: FiGrid },
  { to: '/admin/about', label: 'About', icon: FiUser },
  { to: '/admin/skills', label: 'Skills', icon: FiCode },
  { to: '/admin/projects', label: 'Projects', icon: FiFolder },
  { to: '/admin/experience', label: 'Experience', icon: FiBriefcase },
  { to: '/admin/education', label: 'Education', icon: FiBookOpen },
  { to: '/admin/certifications', label: 'Certifications', icon: FiAward },
  { to: '/admin/reviews', label: 'Reviews', icon: FiStar },
  { to: '/admin/blogs', label: 'Blog', icon: FiFileText },
  { to: '/admin/social-links', label: 'Social Links', icon: FiLink },
  { to: '/admin/contact-messages', label: 'Messages', icon: FiMail },
  { to: '/admin/settings', label: 'Settings', icon: FiSettings },
]

export default function Sidebar({ mobileOpen = false, onClose = () => {} }) {
  return (
    <>
      {/* Sidebar Content Container */}
      <aside
        className={`w-64 shrink-0 h-screen sticky top-0 border-r border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-bg-darksurface/90 backdrop-blur-xl overflow-y-auto z-40 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0 fixed inset-y-0 left-0' : '-translate-x-full md:translate-x-0 hidden md:block'
        }`}
      >
        <div className="px-6 py-6 border-b border-slate-200/60 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative p-0.5 rounded-xl bg-gradient-to-tr from-primary via-indigo-500 to-secondary shadow-md shadow-primary/20 overflow-hidden">
              <img
                src={logoImg}
                alt="Logo"
                className="h-8 w-auto max-w-[110px] object-contain rounded-lg bg-slate-950 px-1 py-0.5"
              />
            </div>
            <h1 className="font-display font-extrabold text-base text-slate-900 dark:text-white tracking-tight">
              Admin<span className="text-primary dark:text-primary-light">Portal</span>
            </h1>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onClose}
          className="md:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30"
        />
      )}
    </>
  )
}
