import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { FiCode, FiBriefcase, FiAward, FiLayers } from 'react-icons/fi'
import dashboardService from '../../services/dashboardService.js'
import aboutService from '../../services/aboutService.js'
import projectService from '../../services/projectService.js'
import skillService from '../../services/skillService.js'
import certificationService from '../../services/certificationService.js'

export default function QuickStatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const [counts, setCounts] = useState({
    years: 3,
    projects: 15,
    skills: 10,
    certs: 2,
  })

  useEffect(() => {
    let isMounted = true

    async function loadStats() {
      try {
        const statsData = await dashboardService.getPublicStats()
        if (statsData && isMounted) {
          setCounts({
            years: Number(statsData.yearsOfExperience) || 3,
            projects: Number(statsData.projectsCompleted) || 15,
            skills: Number(statsData.technologiesMastered) || 10,
            certs: Number(statsData.certifications) || 2,
          })
          return
        }
      } catch (e) {
        // Fallback below
      }

      try {
        const [aboutRes, projectsRes, skillsRes, certsRes] = await Promise.allSettled([
          aboutService.get(),
          projectService.getAll(),
          skillService.getAll(),
          certificationService.getAll(),
        ])

        const aboutData = aboutRes.status === 'fulfilled' ? aboutRes.value : null
        const projectsData = projectsRes.status === 'fulfilled' ? projectsRes.value : []
        const skillsData = skillsRes.status === 'fulfilled' ? skillsRes.value : []
        const certsData = certsRes.status === 'fulfilled' ? certsRes.value : []

        const yearsVal = aboutData?.yearsOfExperience ?? 3
        const projectsVal = Math.max(aboutData?.projectsCompleted || 0, Array.isArray(projectsData) ? projectsData.length : 0) || 15
        const skillsVal = (Array.isArray(skillsData) && skillsData.length > 0) ? skillsData.length : 10
        const certsVal = (Array.isArray(certsData) && certsData.length > 0) ? certsData.length : 2

        if (isMounted) {
          setCounts({
            years: yearsVal,
            projects: projectsVal,
            skills: skillsVal,
            certs: certsVal,
          })
        }
      } catch (err) {
        console.error('Failed to load stats:', err)
      }
    }

    loadStats()
    return () => { isMounted = false }
  }, [])

  const stats = [
    { label: 'Years Experience', value: counts.years, suffix: '+', icon: FiBriefcase, color: 'from-blue-500 to-indigo-600' },
    { label: 'Projects Completed', value: counts.projects, suffix: '+', icon: FiCode, color: 'from-indigo-500 to-purple-600' },
    { label: 'Technologies Mastered', value: counts.skills, suffix: '+', icon: FiLayers, color: 'from-purple-500 to-pink-600' },
    { label: 'Certifications', value: counts.certs, suffix: '+', icon: FiAward, color: 'from-cyan-500 to-blue-600' },
  ]

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-5 md:px-8 py-10 -mt-10 relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group p-5 md:p-6 rounded-3xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-primary/40 transition-all duration-300 relative overflow-hidden"
            >
              {/* Background Accent Blur */}
              <div className={`absolute -right-4 -bottom-4 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-full`} />

              <div className="flex items-center gap-3 mb-3">
                <span className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center text-lg shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Icon />
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Impact
                </span>
              </div>

              <div className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {inView ? <CountUp end={stat.value} duration={2.5} /> : 0}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  {stat.suffix}
                </span>
              </div>

              <p className="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">
                {stat.label}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
