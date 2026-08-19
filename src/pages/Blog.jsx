import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SectionTitle from '../components/common/SectionTitle.jsx'
import SearchBox from '../components/common/SearchBox.jsx'
import Pagination from '../components/common/Pagination.jsx'
import Loader from '../components/common/Loader.jsx'
import useFetch from '../hooks/useFetch.js'
import useDebounce from '../hooks/useDebounce.js'
import usePagination from '../hooks/usePagination.js'
import blogService from '../services/blogService.js'

export default function Blog() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const { page, size, setPage } = usePagination(0, 9)

  const { data, loading } = useFetch(
    () => blogService.getAll({ search: debouncedSearch || undefined, page, size }),
    [debouncedSearch, page]
  )

  return (
    <div className="pt-28">
      <Helmet><title>Blog | Portfolio</title></Helmet>
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <SectionTitle eyebrow="Writing" title="Latest Articles" subtitle="Thoughts, tutorials, and insights on modern software development and engineering." />
        <div className="flex justify-center mb-10">
          <SearchBox value={search} onChange={setSearch} placeholder="Search articles..." />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(data?.content || []).map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group rounded-3xl overflow-hidden bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-lg hover:shadow-2xl dark:shadow-black/40 hover:-translate-y-2 hover:border-primary/50 transition-all duration-400 flex flex-col justify-between"
                >
                  {post.coverImage && (
                    <div className="h-44 overflow-hidden bg-slate-100 dark:bg-slate-900">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 font-normal leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <Pagination page={page} totalPages={data?.totalPages || 0} onPageChange={setPage} />
          </>
        )}
      </section>
    </div>
  )
}

