export default function EducationCard({ edu }) {
  const fmt = (d) => (d ? new Date(d).getFullYear() : 'Present')
  return (
    <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-md hover:shadow-xl dark:shadow-black/30 hover:-translate-y-1 hover:border-primary/40 transition-all duration-300">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg">{edu.institution}</h3>
        <span className="text-xs font-mono font-semibold text-secondary dark:text-secondary-light px-2.5 py-1 rounded-md bg-secondary/10 dark:bg-secondary/20">
          {fmt(edu.startDate)} – {fmt(edu.endDate)}
        </span>
      </div>
      <p className="text-sm font-semibold text-primary dark:text-primary-light mb-2">{edu.degree}</p>
      {edu.cgpa && <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">CGPA: {edu.cgpa}</p>}
      {edu.description && <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{edu.description}</p>}
    </div>
  )
}

