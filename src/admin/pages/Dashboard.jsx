import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { Link } from 'react-router-dom'
import {
  FiFolder, FiCode, FiFileText, FiStar, FiBriefcase, FiBookOpen,
  FiAward, FiMail, FiPlus, FiSettings, FiArrowRight, FiShield, FiCheckCircle, FiServer
} from 'react-icons/fi'
import useFetch from '../../hooks/useFetch.js'
import dashboardService from '../../services/dashboardService.js'
import Loader from '../../components/common/Loader.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const STAT_CONFIG = [
  { key: 'projects', label: 'Projects', icon: FiFolder, color: 'from-blue-500 to-indigo-600', link: '/admin/projects' },
  { key: 'skills', label: 'Skills & Tech', icon: FiCode, color: 'from-indigo-500 to-purple-600', link: '/admin/skills' },
  { key: 'blogs', label: 'Blog Posts', icon: FiFileText, color: 'from-purple-500 to-pink-600', link: '/admin/blogs' },
  { key: 'reviews', label: 'Testimonials', icon: FiStar, color: 'from-amber-500 to-rose-600', link: '/admin/reviews' },
  { key: 'experience', label: 'Experience Entries', icon: FiBriefcase, color: 'from-emerald-500 to-teal-600', link: '/admin/experience' },
  { key: 'education', label: 'Education Entries', icon: FiBookOpen, color: 'from-cyan-500 to-blue-600', link: '/admin/education' },
  { key: 'certifications', label: 'Certifications', icon: FiAward, color: 'from-violet-500 to-purple-600', link: '/admin/certifications' },
  { key: 'contactMessages', label: 'Contact Messages', icon: FiMail, color: 'from-rose-500 to-red-600', link: '/admin/contact-messages' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const { data: statsData, loading } = useFetch(() => dashboardService.getStats(), [])

  // Guaranteed fallback stats map so dashboard is NEVER blank
  const stats = {
    projects: 0,
    skills: 0,
    blogs: 0,
    reviews: 0,
    experience: 0,
    education: 0,
    certifications: 0,
    contactMessages: 0,
    ...(statsData || {}),
  }

  if (loading) return <Loader full />

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> System Active
          </span>
          <h1 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">
            Welcome back, {user?.name || 'Administrator'} 👋
          </h1>
          <p className="text-slate-300 text-sm max-w-xl">
            Manage your portfolio contents, update projects, monitor contact inquiries, and configure system settings.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <Link
            to="/admin/projects"
            className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all"
          >
            <FiPlus /> Add Project
          </Link>
          <Link
            to="/admin/settings"
            className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-bold flex items-center gap-2 hover:bg-white/20 border border-white/20 transition-all"
          >
            <FiSettings /> Settings
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            Content Overview & Metrics
          </h2>
          <span className="text-xs font-semibold text-slate-400">Live Backend Stats</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STAT_CONFIG.map((conf, i) => {
            const Icon = conf.icon
            const value = stats[conf.key] ?? 0
            return (
              <motion.div
                key={conf.key}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={conf.link}
                  className="group block p-6 rounded-3xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-lg hover:shadow-xl hover:border-primary/40 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${conf.color} text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon />
                    </span>
                    <span className="text-xs font-bold text-slate-400 group-hover:text-primary dark:group-hover:text-primary-light flex items-center gap-1 transition-colors">
                      Manage <FiArrowRight />
                    </span>
                  </div>

                  <p className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
                    <CountUp end={value} duration={2} />
                  </p>

                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
                    {conf.label}
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Quick Operations & System Status */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Quick Action Buttons */}
        <div className="md:col-span-2 p-6 rounded-3xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xl space-y-4">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
            Quick Content Operations
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              to="/admin/projects"
              className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 hover:border-primary/40 flex items-center gap-3 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-all"
            >
              <span className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 text-lg">
                <FiFolder />
              </span>
              <div>
                <p className="font-bold">Add / Edit Projects</p>
                <p className="text-[10px] text-slate-400">Upload portfolio items</p>
              </div>
            </Link>

            <Link
              to="/admin/skills"
              className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 hover:border-primary/40 flex items-center gap-3 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-all"
            >
              <span className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 text-lg">
                <FiCode />
              </span>
              <div>
                <p className="font-bold">Manage Tech Skills</p>
                <p className="text-[10px] text-slate-400">Update skill categories</p>
              </div>
            </Link>

            <Link
              to="/admin/blogs"
              className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 hover:border-primary/40 flex items-center gap-3 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-all"
            >
              <span className="p-2.5 rounded-xl bg-pink-500/10 text-pink-500 text-lg">
                <FiFileText />
              </span>
              <div>
                <p className="font-bold">Write Blog Post</p>
                <p className="text-[10px] text-slate-400">Publish technical articles</p>
              </div>
            </Link>

            <Link
              to="/admin/contact-messages"
              className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 hover:border-primary/40 flex items-center gap-3 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-all"
            >
              <span className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 text-lg">
                <FiMail />
              </span>
              <div>
                <p className="font-bold">View Inquiries</p>
                <p className="text-[10px] text-slate-400">Read contact messages</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Right Col: System Status Widget */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
          <h3 className="font-display font-bold text-base flex items-center gap-2">
            <FiServer className="text-secondary" /> System Health
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-slate-400 flex items-center gap-2">
                <FiCheckCircle className="text-emerald-400" /> Backend API:
              </span>
              <span className="font-mono font-bold text-emerald-400">Online (Spring Boot)</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-slate-400 flex items-center gap-2">
                <FiShield className="text-secondary" /> Security:
              </span>
              <span className="font-mono font-bold text-secondary">JWT Authenticated</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-slate-400 flex items-center gap-2">
                <FiCode className="text-purple-400" /> Frontend Build:
              </span>
              <span className="font-mono font-bold text-purple-400">Vite + React</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
