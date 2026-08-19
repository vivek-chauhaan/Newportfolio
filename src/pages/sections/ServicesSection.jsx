import { motion } from 'framer-motion'
import { FiServer, FiGlobe, FiCpu, FiDatabase, FiShield, FiLayers } from 'react-icons/fi'
import SectionTitle from '../../components/common/SectionTitle.jsx'

const services = [
  {
    icon: FiServer,
    title: 'Backend Development',
    description: 'Build high-performance, scalable Java & Spring Boot backend services with robust architecture and enterprise-grade reliability.',
    tags: ['Java', 'Spring Boot', 'Microservices', 'REST'],
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: FiGlobe,
    title: 'Full Stack Development',
    description: 'Craft seamless, end-to-end web applications combining responsive React / Angular frontends with resilient backend APIs.',
    tags: ['React', 'Angular', 'TailwindCSS', 'Full-Stack'],
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    icon: FiCpu,
    title: 'API Design & Integration',
    description: 'Design clean, well-documented, versioned RESTful APIs with Swagger/OpenAPI spec, rate limiting, and optimal payload structures.',
    tags: ['REST API', 'Swagger', 'JSON', 'API Gateway'],
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    icon: FiDatabase,
    title: 'Database Architecture',
    description: 'Engineer optimized relational (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) data models with index tuning & transactions.',
    tags: ['PostgreSQL', 'MongoDB', 'Redis', 'Spring Data JPA'],
    gradient: 'from-cyan-500 to-teal-600',
  },
  {
    icon: FiShield,
    title: 'Authentication & Security',
    description: 'Implement stateless JWT authentication, refresh token rotation, OAuth2 single sign-on, and fine-grained Role-Based Access Control (RBAC).',
    tags: ['JWT', 'Spring Security', 'OAuth2', 'RBAC'],
    gradient: 'from-rose-500 to-amber-600',
  },
  {
    icon: FiLayers,
    title: 'System Design & Scalability',
    description: 'Architect distributed systems with caching strategies, asynchronous messaging, containerized deployments, and clean domain boundary isolation.',
    tags: ['Microservices', 'System Design', 'Docker', 'AWS'],
    gradient: 'from-emerald-500 to-teal-600',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="max-w-7xl mx-auto px-5 md:px-8 py-24">
      <SectionTitle
        eyebrow="Capabilities"
        title="What I Can Do For You"
        subtitle="Specialized engineering capabilities focused on building robust, scalable, and maintainable software systems."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => {
          const Icon = service.icon
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group p-8 rounded-3xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-primary/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${service.gradient} opacity-80 group-hover:h-1.5 transition-all duration-300`} />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} text-white flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon />
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200/60 dark:border-white/10">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
