import { Link } from 'react-router-dom'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import ProjectCard from '../../components/cards/ProjectCard.jsx'
import Loader from '../../components/common/Loader.jsx'
import OutlineButton from '../../components/buttons/OutlineButton.jsx'
import useFetch from '../../hooks/useFetch.js'
import projectService from '../../services/projectService.js'

export default function ProjectsSection() {
  const { data, loading } = useFetch(() => projectService.getAll({ size: 6 }), [])

  return (
    <section id="projects" className="max-w-7xl mx-auto px-5 md:px-8 py-24">
      <SectionTitle eyebrow="Portfolio" title="Featured Projects" />
      {loading ? (
        <Loader />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data?.content || []).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      )}
      <div className="text-center mt-10">
        <Link to="/projects">
          <OutlineButton>View All Projects</OutlineButton>
        </Link>
      </div>
    </section>
  )
}
