import SectionTitle from '../../components/common/SectionTitle.jsx'
import EducationCard from '../../components/cards/EducationCard.jsx'
import CertificationCard from '../../components/cards/CertificationCard.jsx'
import Loader from '../../components/common/Loader.jsx'
import useFetch from '../../hooks/useFetch.js'
import educationService from '../../services/educationService.js'
import certificationService from '../../services/certificationService.js'

export default function EducationSection() {
  const { data: education, loading: eduLoading } = useFetch(() => educationService.getAll(), [])
  const { data: certifications, loading: certLoading } = useFetch(() => certificationService.getAll(), [])

  return (
    <section id="education" className="max-w-7xl mx-auto px-5 md:px-8 py-24">
      <SectionTitle eyebrow="Background" title="Education & Certifications" />
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h3 className="font-display font-semibold text-lg mb-4">Education</h3>
          {eduLoading ? (
            <Loader />
          ) : (
            <div className="space-y-4">
              {(education || []).map((edu) => (
                <EducationCard key={edu.id} edu={edu} />
              ))}
            </div>
          )}
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg mb-4">Certifications</h3>
          {certLoading ? (
            <Loader />
          ) : (
            <div className="space-y-4">
              {(certifications || []).map((cert) => (
                <CertificationCard key={cert.id} cert={cert} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
