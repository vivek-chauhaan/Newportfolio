import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCode, FiAward, FiExternalLink, FiTrendingUp, FiCheck } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import useFetch from '../../hooks/useFetch.js'
import socialLinkService from '../../services/socialLinkService.js'

export default function LeetCodeActivitySection() {
  const { data: links } = useFetch(() => socialLinkService.getAll(), [])

  // Dynamic state initialized with AmitHacker's real profile data as default fallback
  const [lcStats, setLcStats] = useState({
    totalSolved: 475,
    easySolved: 133,
    totalEasy: 958,
    mediumSolved: 279,
    totalMedium: 2099,
    hardSolved: 63,
    totalHard: 962,
    ranking: 226042,
    recentSubmissions: [
      { title: 'Best Reachable Tower', lang: 'java', statusDisplay: 'Accepted' },
      { title: 'Minimum Edge Toggles on a Tree', lang: 'java', statusDisplay: 'Accepted' },
      { title: 'LFU Cache', lang: 'java', statusDisplay: 'Accepted' },
      { title: 'Maximal Rectangle', lang: 'java', statusDisplay: 'Accepted' },
      { title: 'Smallest Subtree with all Deepest Nodes', lang: 'java', statusDisplay: 'Accepted' },
    ],
  })

  // Extract LeetCode link from social links or fallback to AmitHacker profile
  const leetcodeLink =
    links?.find((l) => l.platform?.toLowerCase().includes('leetcode'))?.url ||
    'https://leetcode.com/u/AmitHacker/'

  const username = 'AmitHacker'

  useEffect(() => {
    let isMounted = true
    async function fetchLeetCodeData() {
      try {
        const res = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`)
        if (res.ok) {
          const data = await res.json()
          if (isMounted && data.totalSolved) {
            setLcStats({
              totalSolved: data.totalSolved || 475,
              easySolved: data.easySolved || 133,
              totalEasy: data.totalEasy || 958,
              mediumSolved: data.mediumSolved || 279,
              totalMedium: data.totalMedium || 2099,
              hardSolved: data.hardSolved || 63,
              totalHard: data.totalHard || 962,
              ranking: data.ranking || 226042,
              recentSubmissions: (data.recentSubmissions || [])
                .filter((s) => s.statusDisplay === 'Accepted')
                .slice(0, 5),
            })
          }
        }
      } catch (err) {
        console.error('Failed to load LeetCode data:', err)
      }
    }
    fetchLeetCodeData()
    return () => {
      isMounted = false
    }
  }, [username])

  const statsList = [
    { label: 'Problems Solved', value: `${lcStats.totalSolved}+`, icon: FiCode, color: 'text-amber-500' },
    { label: 'Global Ranking', value: `#${(lcStats.ranking || 226042).toLocaleString()}`, icon: FiTrendingUp, color: 'text-orange-500' },
    { label: 'Hard Solved', value: `${lcStats.hardSolved}`, icon: FiAward, color: 'text-rose-500' },
  ]

  const difficulties = [
    {
      name: 'Easy',
      solved: lcStats.easySolved,
      total: lcStats.totalEasy,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-500',
    },
    {
      name: 'Medium',
      solved: lcStats.mediumSolved,
      total: lcStats.totalMedium,
      color: 'bg-amber-500',
      textColor: 'text-amber-500',
    },
    {
      name: 'Hard',
      solved: lcStats.hardSolved,
      total: lcStats.totalHard,
      color: 'bg-rose-500',
      textColor: 'text-rose-500',
    },
  ]

  return (
    <section id="leetcode" className="max-w-7xl mx-auto px-5 md:px-8 py-20">
      <SectionTitle
        eyebrow="Problem Solving & Algorithms"
        title="LeetCode Coding Profile"
        subtitle="Data structures, competitive programming, and algorithmic problem solving."
      />

      <div className="grid lg:grid-cols-3 gap-6 items-stretch">
        {/* Left Column - LeetCode Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 text-2xl border border-amber-500/30">
                  <SiLeetcode />
                </span>
                <div>
                  <h3 className="font-display font-bold text-lg">LeetCode Activity</h3>
                  <p className="text-xs text-amber-400 font-medium">@{username}</p>
                </div>
              </div>
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Solving complex algorithmic challenges, optimizing space/time complexity, and mastering Data Structures in Java.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {statsList.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.label} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <Icon className={`mx-auto mb-1 text-base ${s.color}`} />
                    <p className="font-display font-extrabold text-sm">{s.value}</p>
                    <p className="text-[10px] text-slate-400">{s.label}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <a
            href={leetcodeLink}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-90 border border-white/15 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
          >
            <FiExternalLink /> View @{username} Profile
          </a>
        </motion.div>

        {/* Right Column - Difficulty Breakdown & Recent Accepted Problems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 p-8 rounded-3xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Difficulty Breakdown & Accepted Solutions
              </h3>
              <a
                href={leetcodeLink}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-amber-500 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>lc/{username}</span>
                <FiExternalLink />
              </a>
            </div>

            {/* Difficulty Cards & Progress Bars */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {difficulties.map((d) => (
                <div key={d.name} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold ${d.textColor}`}>{d.name}</span>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{d.solved} Solved</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                    <div className={`h-full ${d.color}`} style={{ width: `${Math.min(100, Math.round((d.solved / lcStats.totalSolved) * 100))}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Submissions */}
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Recently Accepted Submissions
              </p>
              <div className="space-y-2">
                {(lcStats.recentSubmissions || []).slice(0, 4).map((sub, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/10 hover:border-amber-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xs">
                        <FiCheck />
                      </span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {sub.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-500 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                        {sub.lang || 'Java'}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">
                        Accepted
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
