import SectionTitle from '../../components/common/SectionTitle.jsx'
import Timeline from '../../components/timeline/Timeline.jsx'
import Loader from '../../components/common/Loader.jsx'
import useFetch from '../../hooks/useFetch.js'
import experienceService from '../../services/experienceService.js'

export default function ExperienceSection() {
  const { data: experience, loading } = useFetch(() => experienceService.getAll(), [])

  return (
    <section id="experience" className="max-w-4xl mx-auto px-5 md:px-8 py-24">
      <SectionTitle eyebrow="Career Path" title="Experience" />
      {loading ? <Loader /> : <Timeline items={experience || []} />}
    </section>
  )
}
