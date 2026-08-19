import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiClock, FiArrowRight, FiBookOpen } from 'react-icons/fi'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import useFetch from '../../hooks/useFetch.js'
import blogService from '../../services/blogService.js'

export default function BlogSection() {
  const { data, loading } = useFetch(() => blogService.getAll({ size: 3 }), [])

  const articles = data?.content || []

  return (
    <section id="blog" className="max-w-7xl mx-auto px-5 md:px-8 py-24">
      <SectionTitle
        eyebrow="Technical Writing"
        title="Articles & Insights"
        subtitle="Exploring Java performance, Spring Boot microservices, system design, and modern frontend practices."
      />

      {articles.length === 0 && !loading ? (
        <div className="text-center p-12 rounded-3xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl mx-auto mb-3">
            <FiBookOpen />
          </div>
          <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-1">
            Articles Coming Soon
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Technical writing on Java 21, Spring Boot microservices, and system architecture will be published here shortly.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
        {articles.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={`/blog/${post.slug}`}
              className="group h-full rounded-3xl overflow-hidden bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden bg-slate-900 relative">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-950 to-slate-900 text-primary font-mono text-2xl font-bold">
                      <FiBookOpen />
                    </div>
                  )}
                  {post.category && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-mono text-[10px] uppercase font-bold tracking-wider">
                      {post.category}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                    <FiClock /> {post.readingTime || '5 min read'}
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 flex items-center text-xs font-bold text-primary dark:text-primary-light group-hover:translate-x-1 transition-transform">
                Read Article <FiArrowRight className="ml-1" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      )}

      <div className="text-center mt-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-bold transition-all"
        >
          View All Articles <FiArrowRight />
        </Link>
      </div>
    </section>
  )
}
