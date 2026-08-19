import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FiArrowLeft } from 'react-icons/fi'
import useFetch from '../hooks/useFetch.js'
import blogService from '../services/blogService.js'
import Loader from '../components/common/Loader.jsx'

export default function BlogDetails() {
  const { slug } = useParams()
  const { data: post, loading } = useFetch(() => blogService.getBySlug(slug), [slug])

  if (loading) return <Loader full />
  if (!post) return null

  return (
    <div className="pt-28">
      <Helmet><title>{post.title} | Blog</title></Helmet>
      <article className="max-w-3xl mx-auto px-5 md:px-8 py-16">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-current/60 hover:text-primary mb-8">
          <FiArrowLeft /> Back to Blog
        </Link>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
        {post.coverImage && <img src={post.coverImage} alt={post.title} className="w-full rounded-2xl mb-8 border border-white/10" />}
        <div className="prose prose-invert max-w-none whitespace-pre-line text-current/80 leading-relaxed">
          {post.content}
        </div>
        <div className="flex flex-wrap gap-2 mt-8">
          {(post.tags || []).map((t) => (
            <span key={t} className="text-xs font-mono px-2 py-1 rounded-md bg-white/10">#{t}</span>
          ))}
        </div>
      </article>
    </div>
  )
}
