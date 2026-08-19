import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiCheckCircle, FiCpu, FiDatabase, FiShield, FiZap, FiExternalLink, FiGithub } from 'react-icons/fi'

export default function CaseStudyModal({ project, isOpen, onClose }) {
  if (!project) return null

  const problem = project.problemStatement || project.problemSolved || 'Organizations required a seamless, high-performance platform capable of handling real-time user requests with high availability, low latency API responses, and strict authorization boundary controls.'
  const solution = project.solutionOverview || project.description || 'Designed and built a modular distributed application leveraging Spring Boot microservices, asynchronous caching, and a responsive frontend interface.'
  const architecture = project.systemArchitecture || (
    project.technologies && project.technologies.length > 0
      ? `Client Layer ➔ API Gateway ➔ Core Services (${project.technologies.join(' / ')}) ➔ Persistence & Database`
      : 'Client Layer (React / Tailwind) ➔ Gateway (Spring Cloud / CORS) ➔ Microservice Core (Java 21 / Spring Boot) ➔ Persistence (MongoDB & Redis Cache)'
  )
  const outcomes = (Array.isArray(project.keyOutcomes) && project.keyOutcomes.length > 0)
    ? project.keyOutcomes
    : [
        'High-performance API response time across key business endpoints',
        'End-to-end type safety and validated DTO boundary contracts',
        'Seamless multi-role access control with granular permission checks',
      ]

  const decisions = [
    {
      question: 'Why Spring Boot & Microservices?',
      answer: 'Spring Boot provides enterprise-grade dependency injection, robust security filter chains, automated ORM mapping, and production-ready monitoring actuators.',
      icon: FiCpu,
    },
    {
      question: 'Why MongoDB & Caching?',
      answer: 'MongoDB offers flexible document schema evolution for rapid domain changes, while Redis caches hot read queries to reduce database latency by over 80%.',
      icon: FiDatabase,
    },
    {
      question: 'How does Authentication Work?',
      answer: 'Stateless JWT tokens signed via HMAC-SHA256, validated on every API request via a custom Spring Security filter chain with zero database overhead for session state.',
      icon: FiShield,
    },
    {
      question: 'How is Scalability Handled?',
      answer: 'Stateless REST controller design enables horizontal pod autoscaling in containerized environments with zero session sticky requirements.',
      icon: FiZap,
    },
  ]

  const demoLink = project.liveDemoUrl || project.demoUrl

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white dark:bg-bg-darksurface border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
          >
            {/* Header */}
            <div className="p-6 md:p-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close modal"
              >
                <FiX className="text-xl" />
              </button>

              <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary-light text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                Engineering Case Study
              </span>
              <h2 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight">
                {project.title}
              </h2>
              <p className="text-slate-300 text-sm md:text-base mt-2 max-w-2xl">
                {project.shortDescription || project.description}
              </p>

              {/* Action Links */}
              <div className="flex flex-wrap gap-3 mt-6">
                {demoLink && (
                  <a
                    href={demoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-colors shadow-md shadow-primary/30"
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 border border-white/20 transition-colors"
                  >
                    <FiGithub /> Source Code
                  </a>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 max-h-[65vh] overflow-y-auto space-y-8">
              {/* Problem & Solution Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20">
                  <h4 className="font-display font-bold text-base text-rose-700 dark:text-rose-400 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    The Problem
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                    {problem}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20">
                  <h4 className="font-display font-bold text-base text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    The Solution
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                    {solution}
                  </p>
                </div>
              </div>

              {/* System Architecture */}
              <div>
                <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-3">
                  System Architecture & Data Flow
                </h4>
                <div className="p-5 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs md:text-sm border border-slate-800 shadow-inner overflow-x-auto whitespace-pre-line">
                  {architecture}
                </div>
              </div>

              {/* Engineering Decisions */}
              <div>
                <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-4">
                  Key Technical Decisions
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {decisions.map((dec) => {
                    const Icon = dec.icon
                    return (
                      <div
                        key={dec.question}
                        className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="p-2 rounded-xl bg-primary/10 text-primary text-base">
                            <Icon />
                          </span>
                          <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                            {dec.question}
                          </h5>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {dec.answer}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Key Results */}
              <div>
                <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-3">
                  Results & Key Outcomes
                </h4>
                <div className="space-y-2">
                  {outcomes.map((res, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/10 text-xs font-medium text-slate-800 dark:text-slate-200">
                      <FiCheckCircle className="text-emerald-500 text-base shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
