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
    <div className="pt-28">
      <Helmet><title>{project.title} | Portfolio</title></Helmet>
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-16">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-current/60 hover:text-primary mb-8">
          <FiArrowLeft /> Back to Projects
        </Link>

        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {(project.technologies || []).map((t) => (
            <span key={t} className="text-xs font-mono px-2 py-1 rounded-md bg-white/10">{t}</span>
          ))}
        </div>

        {project.thumbnailImage && (
          <img src={project.thumbnailImage} alt={project.title} className="w-full rounded-2xl mb-8 border border-white/10" />
        )}

        <p className="text-current/80 leading-relaxed whitespace-pre-line mb-8">{project.description}</p>

        <div className="flex gap-4">
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
  )
}
