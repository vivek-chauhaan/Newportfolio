import { useMemo, useState } from 'react'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import SearchBox from '../../components/common/SearchBox.jsx'
import FilterBar from '../../components/common/FilterBar.jsx'
import SkillCard from '../../components/cards/SkillCard.jsx'
import Loader from '../../components/common/Loader.jsx'
import useFetch from '../../hooks/useFetch.js'
import useDebounce from '../../hooks/useDebounce.js'
import skillService from '../../services/skillService.js'

export default function SkillsSection() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const debouncedSearch = useDebounce(search)

  const { data: categories } = useFetch(() => skillService.getCategories(), [])
  const { data: skills, loading } = useFetch(
    () => skillService.getAll({ search: debouncedSearch || undefined }),
    [debouncedSearch]
  )

  const categoryOptions = useMemo(() => ['All', ...(categories || []).map((c) => c.name)], [categories])

  const filtered = useMemo(() => {
    if (!skills) return []
    if (activeCategory === 'All') return skills
    const cat = (categories || []).find((c) => c.name === activeCategory)
    return skills.filter((s) => s.categoryId === cat?.id)
  }, [skills, activeCategory, categories])

  return (
    <section id="skills" className="max-w-7xl mx-auto px-5 md:px-8 py-24">
      <SectionTitle eyebrow="Skills" title="What I Work With" />
      <div className="flex flex-col items-center gap-6 mb-10">
        <SearchBox value={search} onChange={setSearch} placeholder="Search skills..." />
        <FilterBar options={categoryOptions} active={activeCategory} onChange={setActiveCategory} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}
