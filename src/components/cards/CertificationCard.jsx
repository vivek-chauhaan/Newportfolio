import { FiAward, FiExternalLink } from 'react-icons/fi'

export default function CertificationCard({ cert }) {
  return (
    <div className="p-5 rounded-2xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-md hover:shadow-xl dark:shadow-black/30 hover:-translate-y-1 hover:border-primary/40 transition-all duration-300 flex gap-4 items-start">
      <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md shadow-primary/30">
        <FiAward size={22} />
      </div>
      <div className="flex-1">
        <h4 className="font-display font-bold text-slate-900 dark:text-white text-base mb-0.5">{cert.title}</h4>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{cert.organization}</p>
        {cert.issueDate && (
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
            Issued: {new Date(cert.issueDate).toLocaleDateString()}
          </p>
        )}
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary dark:text-primary-light mt-2.5 hover:underline"
          >
            View Credential <FiExternalLink size={13} />
          </a>
        )}
      </div>
    </div>
  )
}

