import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiGitPullRequest, FiCode, FiExternalLink, FiUsers } from 'react-icons/fi'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import useFetch from '../../hooks/useFetch.js'
import socialLinkService from '../../services/socialLinkService.js'

export default function GitHubActivitySection() {
  const { data: links } = useFetch(() => socialLinkService.getAll(), [])
  const [ghUser, setGhUser] = useState({
    login: 'AmitKumarHac',
    public_repos: 10,
    followers: 1,
    html_url: 'https://github.com/AmitKumarHac',
    avatar_url: 'https://avatars.githubusercontent.com/u/130203377?v=4',
  })

  // Extract GitHub URL from social links or fallback to AmitKumarHac
  const githubLink = links?.find((l) => l.platform?.toLowerCase().includes('github'))?.url || 'https://github.com/AmitKumarHac'
  const username = githubLink.split('/').filter(Boolean).pop() || 'AmitKumarHac'

  useEffect(() => {
    let isMounted = true
    async function fetchGitHubProfile() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`)
        if (res.ok) {
          const data = await res.json()
          if (isMounted) setGhUser(data)
        }
      } catch (err) {
        console.error('Failed to load GitHub user data:', err)
      }
    }
    fetchGitHubProfile()
    return () => { isMounted = false }
  }, [username])

  const stats = [
    { label: 'Public Repos', value: `${ghUser.public_repos || 10}+`, icon: FiCode, color: 'text-blue-500' },
    { label: 'Followers', value: `${ghUser.followers || 1}`, icon: FiUsers, color: 'text-purple-500' },
    { label: 'Contributions', value: '500+', icon: FiGitPullRequest, color: 'text-amber-500' },
  ]

  const topLanguages = [
    { name: 'Java & Spring Boot', percentage: '65%', color: 'bg-amber-500' },
    { name: 'JavaScript & React', percentage: '20%', color: 'bg-sky-500' },
    { name: 'SQL & Database', percentage: '10%', color: 'bg-emerald-500' },
    { name: 'HTML/CSS/Others', percentage: '5%', color: 'bg-purple-500' },
  ]

  return (
    <section id="github" className="max-w-7xl mx-auto px-5 md:px-8 py-20">
      <SectionTitle
        eyebrow="Open Source & Activity"
        title="Coding & GitHub Profile"
        subtitle="Continuous learning, active contributions, and clean architecture practices."
      />

      <div className="grid lg:grid-cols-3 gap-6 items-stretch">
        {/* Left Column - GitHub Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden"
        >
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {ghUser.avatar_url ? (
                  <img src={ghUser.avatar_url} alt={username} className="w-12 h-12 rounded-2xl border border-white/20 object-cover shadow-md" />
                ) : (
                  <span className="p-3 rounded-2xl bg-white/10 text-white text-2xl">
                    <FiGithub />
                  </span>
                )}
                <div>
                  <h3 className="font-display font-bold text-lg">{ghUser.name || 'Amit Kumar'}</h3>
                  <p className="text-xs text-slate-400">@{username}</p>
                </div>
              </div>
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Building open-source tools, backend microservices, and maintaining clean architecture code standards.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {stats.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.label} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <Icon className={`mx-auto mb-1 text-base ${s.color}`} />
                    <p className="font-display font-extrabold text-base">{s.value}</p>
                    <p className="text-[10px] text-slate-400">{s.label}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <a
            href={ghUser.html_url || `https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 border border-white/15 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
          >
            <FiExternalLink /> View @{username} Profile
          </a>
        </motion.div>

        {/* Right Column - Languages Breakdown & Live Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 p-8 rounded-3xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Most Used Stack & Contribution Heatmap
              </h3>
              <a
                href={ghUser.html_url || `https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-primary dark:text-primary-light hover:underline flex items-center gap-1"
              >
                <span>gh/{username}</span>
                <FiExternalLink />
              </a>
            </div>

            {/* Language Progress Bar */}
            <div className="space-y-3 mb-8">
              <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden flex">
                {topLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    style={{ width: lang.percentage }}
                    className={`${lang.color} h-full`}
                    title={`${lang.name}: ${lang.percentage}`}
                  />
                ))}
              </div>

              <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-600 dark:text-slate-300">
                {topLanguages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${lang.color}`} />
                    <span>{lang.name} ({lang.percentage})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real GitHub Contribution Chart / Graph */}
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Commit Consistency & Activity
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/10 overflow-x-auto flex justify-center items-center min-h-[120px]">
                <img
                  src={`https://ghchart.rshah.org/8B5CF6/${username}`}
                  alt={`${username}'s GitHub Contributions`}
                  className="w-full max-w-full dark:invert-[0.1] filter transition-all"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
