import { motion } from 'framer-motion'
import { FiBriefcase, FiCalendar, FiCheckCircle } from 'react-icons/fi'

export default function Timeline({ items }) {
  const fmt = (d) => (d ? new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present')

  if (!items || items.length === 0) {
    return (
      <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 text-slate-400">
        No work experience loaded yet.
      </div>
    )
  }

  return (
    <div className="relative border-l-2 border-slate-200 dark:border-white/10 ml-3 md:ml-6 space-y-10">
      {items.map((item, i) => (
        <motion.div
          key={item.id || i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="ml-6 md:ml-10 relative"
        >
          {/* Glowing node marker */}
          <span className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-secondary ring-4 ring-slate-100 dark:ring-bg-dark shadow-lg shadow-primary/40 flex items-center justify-center text-white text-xs">
            <FiBriefcase className="text-[10px]" />
          </span>

          <div className="p-6 md:p-8 rounded-3xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-lg hover:shadow-xl dark:shadow-black/30 hover:border-primary/40 transition-all duration-300">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <h3 className="font-display font-bold text-slate-900 dark:text-white text-xl">
                  {item.designation || item.role}
                </h3>
                <p className="text-sm font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mt-0.5">
                  {item.company}
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-secondary dark:text-secondary-light px-3.5 py-1.5 rounded-full bg-secondary/10 dark:bg-secondary/20 border border-secondary/20">
                <FiCalendar /> {fmt(item.startDate)} – {item.currentlyWorking ? 'Present' : fmt(item.endDate)}
              </span>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5 font-normal">
              {item.description}
            </p>

            {/* Key Achievements Bullet List */}
            {item.achievements?.length > 0 && (
              <div className="mb-5 space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Key Achievements & Impact:</p>
                {item.achievements.map((ach, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                    <FiCheckCircle className="text-emerald-500 shrink-0 text-sm mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack Badges */}
            {item.techStack?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-white/5">
                {item.techStack.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.08] border border-slate-200/60 dark:border-white/10 text-slate-700 dark:text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
