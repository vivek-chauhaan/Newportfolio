import { motion } from 'framer-motion'
import { fadeInUp } from '../../animations/variants.js'

export default function SectionTitle({ eyebrow, title, subtitle, center = true }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeInUp}
      className={`mb-14 ${center ? 'text-center mx-auto max-w-2xl' : ''}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light border border-primary/30 dark:border-primary/40 mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-light animate-pulse" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-primary to-slate-800 dark:from-white dark:via-primary-light dark:to-secondary leading-snug">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">{subtitle}</p>}
    </motion.div>
  )
}

