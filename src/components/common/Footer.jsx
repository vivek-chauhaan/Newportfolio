import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiCode, FiArrowRight, FiSend } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch.js'
import socialLinkService from '../../services/socialLinkService.js'
import aboutService from '../../services/aboutService.js'
import { NAV_LINKS } from '../../constants/navLinks.js'
import logoImg from '../../assets/images/logo.png'

const ICONS = { github: FiGithub, linkedin: FiLinkedin, twitter: FiTwitter, email: FiMail, mail: FiMail, leetcode: SiLeetcode }

export default function Footer() {
  const { data: links } = useFetch(() => socialLinkService.getAll(), [])
  const { data: about } = useFetch(() => aboutService.get(), [])

  const techBadges = ['Java 21', 'Spring Boot', 'React', 'Microservices', 'MongoDB', 'Docker', 'REST APIs', 'JWT Auth']

  return (
    <footer className="mt-12 md:mt-16 border-t border-slate-200/80 dark:border-white/10 relative overflow-hidden backdrop-blur-xl bg-slate-50/80 dark:bg-bg-dark/80 text-slate-600 dark:text-slate-400">
      {/* Ambient Lighting */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-10">
        {/* Compact CTA Banner */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-primary/10 via-purple-500/10 to-secondary/10 border border-primary/20 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="space-y-0.5 text-center sm:text-left">
            <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
              Have a project or opportunity in mind?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Let's collaborate to build high-performance backends and modern web applications.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-md shadow-primary/20 hover:scale-105 transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Let's Talk</span>
            <FiArrowRight size={14} />
          </a>
        </div>

        {/* Compact 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 pb-8 border-b border-slate-200/80 dark:border-white/10">
          {/* Column 1: Branding & Live Status (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <Link to="/" className="font-display font-extrabold text-xl tracking-tight flex items-center gap-2.5 text-slate-900 dark:text-white group">
              <div className="relative p-0.5 rounded-xl bg-gradient-to-tr from-primary via-indigo-500 to-secondary shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-300 overflow-hidden flex items-center justify-center">
                <img
                  src={logoImg}
                  alt="Amit Kumar Logo"
                  className="h-8 w-auto max-w-[120px] object-contain rounded-[10px] bg-slate-950 px-1 py-0.5"
                />
              </div>
              <span className="whitespace-nowrap">{about?.fullName?.split(' ')[0] || 'Amit'}.dev</span>
            </Link>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Engineering robust Java Spring Boot microservices, high-speed REST APIs, and modern React interfaces.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Available for Opportunities</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Quick Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs font-semibold">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="hover:text-primary dark:hover:text-primary-light transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Tech Stack (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {techBadges.map((badge) => (
                <span
                  key={badge}
                  className="px-2 py-0.5 rounded-lg bg-white dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 text-[11px] font-semibold text-slate-700 dark:text-slate-300 shadow-2xs"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Column 4: Contact & Social Connect (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Connect With Me
            </h4>

            {about?.email && (
              <a
                href={`mailto:${about.email}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-primary-light hover:border-primary/50 transition-all duration-300 shadow-2xs group max-w-full"
                title="Send Email"
              >
                <FiMail className="text-primary shrink-0 group-hover:scale-110 transition-transform" size={15} />
                <span className="whitespace-nowrap font-mono text-[11px] sm:text-xs tracking-tight">{about.email}</span>
              </a>
            )}

            <div className="flex flex-wrap gap-2 pt-0.5">
              {(links || []).map((link) => {
                const Icon = ICONS[link.icon?.toLowerCase()] || FiSend
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-white dark:bg-white/[0.08] border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-white hover:bg-gradient-to-tr hover:from-primary hover:to-secondary hover:border-transparent hover:scale-110 transition-all duration-300"
                    aria-label={link.platform}
                    title={link.platform}
                  >
                    <Icon size={14} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {about?.fullName || 'Amit Kumar'}. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Crafted with Engineering Excellence & Precision
          </p>
        </div>
      </div>
    </footer>
  )
}
