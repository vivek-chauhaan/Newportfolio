import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FiGithub, FiExternalLink, FiArrowLeft } from 'react-icons/fi'
import useFetch from '../hooks/useFetch.js'
import projectService from '../services/projectService.js'
import Loader from '../components/common/Loader.jsx'
import OutlineButton from '../components/buttons/OutlineButton.jsx'

export default function ProjectDetails() {
  const { slug } = useParams()
  const { data: project, loading } = useFetch(() => projectService.getBySlug(slug), [slug])

  if (loading) return <Loader full />
  if (!project) return null

  return (
    <div className="relative pt-28 overflow-hidden">
      <Helmet><title>{project.title} | Portfolio</title></Helmet>
      {/* Aurora ambience */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-5 md:px-8 py-16">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-current/60 hover:text-primary mb-8 transition-colors">
          <FiArrowLeft /> Back to Projects
        </Link>

        <div className="neon-ring p-6 md:p-10 rounded-3xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-primary to-slate-800 dark:from-white dark:via-primary-light dark:to-secondary">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {(project.technologies || []).map((t) => (
              <span
                key={t}
                className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.08] border border-slate-200/60 dark:border-white/10 text-slate-700 dark:text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>

          {project.thumbnailImage && (
            <div className="rounded-2xl overflow-hidden mb-8 border border-slate-200/60 dark:border-white/10 shadow-lg">
              <img src={project.thumbnailImage} alt={project.title} className="w-full" />
            </div>
          )}

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line mb-8">{project.description}</p>

          <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200/60 dark:border-white/10">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <OutlineButton icon={FiGithub}>Source Code</OutlineButton>
              </a>
            )}
            {project.liveDemoUrl && (
              <a href={project.liveDemoUrl} target="_blank" rel="noreferrer">
                <OutlineButton icon={FiExternalLink}>Live Demo</OutlineButton>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
