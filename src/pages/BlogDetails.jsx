import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiArrowLeft } from "react-icons/fi";
import useFetch from "../hooks/useFetch.js";
import blogService from "../services/blogService.js";
import Loader from "../components/common/Loader.jsx";

export default function BlogDetails() {
  const { slug } = useParams();
  const { data: post, loading } = useFetch(
    () => blogService.getBySlug(slug),
    [slug],
  );

  if (loading) return <Loader full />;
  if (!post) return null;

  return (
    <div className="relative pt-28 overflow-hidden">
      <Helmet>
        <title>{post.title} | Blog</title>
      </Helmet>
      {/* Aurora ambience */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      <article className="max-w-3xl mx-auto px-5 md:px-8 py-3">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-current/60 hover:text-primary mb-8 transition-colors"
        >
          <FiArrowLeft /> Back to Blog
        </Link>

        <div className="neon-ring p-6 md:p-10 rounded-3xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-primary to-slate-800 dark:from-white dark:via-primary-light dark:to-secondary">
            {post.title}
          </h1>
          {post.coverImage && (
            <div className="rounded-2xl overflow-hidden mb-8 border border-slate-200/60 dark:border-white/10 shadow-lg">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full"
              />
            </div>
          )}
          <div className="prose prose-invert max-w-none whitespace-pre-line text-slate-600 dark:text-slate-300 leading-relaxed">
            {post.content}
          </div>
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-200/60 dark:border-white/10">
            {(post.tags || []).map((t) => (
              <span
                key={t}
                className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.08] border border-slate-200/60 dark:border-white/10 text-slate-700 dark:text-slate-300"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
