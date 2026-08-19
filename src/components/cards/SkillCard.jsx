import { motion } from 'framer-motion'
import { fadeInUp } from '../../animations/variants.js'
import { FiCheckCircle, FiCode } from 'react-icons/fi'

export default function SkillCard({ skill, index = 0 }) {
  const levelText = skill.proficiency >= 85 ? 'Expert' : skill.proficiency >= 70 ? 'Advanced' : 'Proficient'

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="group p-5 rounded-2xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-md hover:shadow-xl dark:shadow-black/30 hover:-translate-y-1 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 flex items-center justify-between"
    >
      <div className="flex items-center gap-3.5">
        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 text-primary dark:text-primary-light flex items-center justify-center text-lg font-bold group-hover:scale-110 transition-transform duration-300">
          {skill.iconUrl ? (
            <img src={skill.iconUrl} alt={skill.name} className="w-6 h-6 object-contain" />
          ) : (
            <FiCode />
          )}
        </span>

        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
            {skill.name}
          </h4>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            {skill.categoryName || 'Core Technology'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300">
        <FiCheckCircle className="text-secondary text-xs" />
        <span>{levelText}</span>
      </div>
    </motion.div>
  )
}
