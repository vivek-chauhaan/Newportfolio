import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import SectionTitle from '../components/common/SectionTitle.jsx'
import SearchBox from '../components/common/SearchBox.jsx'
import ProjectCard from '../components/cards/ProjectCard.jsx'
import Pagination from '../components/common/Pagination.jsx'
import Loader from '../components/common/Loader.jsx'
import useFetch from '../hooks/useFetch.js'
import useDebounce from '../hooks/useDebounce.js'
import usePagination from '../hooks/usePagination.js'
import projectService from '../services/projectService.js'

export default function Projects() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const { page, size, setPage } = usePagination(0, 9)

  const { data, loading } = useFetch(
    () => projectService.getAll({ search: debouncedSearch || undefined, page, size }),
    [debouncedSearch, page]
  )

  return (
    <div className="pt-28">
      <Helmet><title>Projects | Portfolio</title></Helmet>
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <SectionTitle eyebrow="Portfolio" title="All Projects" />
        <div className="flex justify-center mb-10">
          <SearchBox value={search} onChange={setSearch} placeholder="Search projects..." />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(data?.content || []).map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
            <Pagination page={page} totalPages={data?.totalPages || 0} onPageChange={setPage} />
          </>
        )}
      </section>
    </div>
  )
}
