import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiArrowUpRight, FiBookOpen } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { fadeInUp } from '../../animations/variants.js'
import CaseStudyModal from '../common/CaseStudyModal.jsx'

export default function ProjectCard({ project, index = 0 }) {
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false)

  return (
    <>
      <motion.div
        custom={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="group rounded-3xl overflow-hidden bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-lg hover:shadow-2xl dark:shadow-black/40 hover:-translate-y-2 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-400 flex flex-col justify-between"
      >
        <div>
          <Link to={`/projects/${project.slug}`} className="block relative overflow-hidden h-52 bg-slate-900">
            {(project.liveDemoUrl || project.demoUrl) && (
              <a
                href={project.liveDemoUrl || project.demoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-primary via-purple-600 to-secondary text-white text-[11px] font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all"
                title="View Live Demo"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Live</span>
              </a>
            )}
            {project.thumbnailImage ? (
              <img
                src={project.thumbnailImage}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-300 font-mono text-sm">
                <span className="p-3 rounded-2xl bg-white/10 border border-white/20 font-bold">
                  {project.title}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5 bg-primary/80 backdrop-blur-md px-3 py-1.5 rounded-full">
                View Project Details <FiArrowUpRight size={14} />
              </span>
            </div>
          </Link>

          <div className="p-6">
            {project.featured && (
              <span className="inline-block mb-3 text-[10px] font-bold font-mono px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm shadow-amber-500/20 uppercase tracking-wider">
                Featured Engineering Project
              </span>
            )}

            <Link to={`/projects/${project.slug}`}>
              <h3 className="font-display font-bold text-xl mb-2 text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                {project.title}
              </h3>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 font-normal leading-relaxed">
              {project.shortDescription || project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {(project.technologies || []).slice(0, 5).map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.08] border border-slate-200/60 dark:border-white/10 text-slate-700 dark:text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 pt-4 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
          <button
            onClick={() => setIsCaseStudyOpen(true)}
            className="text-xs font-bold text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 dark:bg-primary/20 transition-colors"
          >
            <FiBookOpen size={14} /> Case Study
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                title="GitHub Source Code"
              >
                <FiGithub size={18} />
              </a>
            )}
            {(project.liveDemoUrl || project.demoUrl) && (
              <a
                href={project.liveDemoUrl || project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary via-purple-600 to-secondary hover:opacity-90 shadow-md shadow-primary/20 transition-all flex items-center gap-1.5"
                title="Live Demo"
              >
                <span>Live Demo</span>
                <FiExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </motion.div>

      <CaseStudyModal
        project={project}
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
      />
    </>
  )
}
