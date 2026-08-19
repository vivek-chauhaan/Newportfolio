import { TypeAnimation } from 'react-type-animation'
import { motion } from 'framer-motion'
import { FiDownload, FiMessageCircle, FiCode, FiZap, FiGithub, FiLinkedin, FiMail, FiTerminal, FiLayers } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import PrimaryButton from '../buttons/PrimaryButton.jsx'
import OutlineButton from '../buttons/OutlineButton.jsx'
import useFetch from '../../hooks/useFetch.js'
import aboutService from '../../services/aboutService.js'
import Loader from '../common/Loader.jsx'

export default function Hero() {
  const { data: about, loading } = useFetch(() => aboutService.get(), [])

  if (loading) return <Loader full />

  const name = about?.fullName || 'Your Name'
  const designation = about?.designation || 'Java Backend & Full Stack Developer'
  const description = about?.description || 'Crafting high-performance Java & Spring Boot backends, scalable REST microservices, and modern React user interfaces with clean architecture.'

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden transition-colors duration-400">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Personal Intro */}
        <div className="lg:col-span-7">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-400/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            🟢 Available for opportunities
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white"
          >
            Hi, I'm{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-500 to-secondary">
              {name}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary-light"
          >
            <TypeAnimation
              sequence={[
                'Java Developer',
                2000,
                'Spring Boot Developer',
                2000,
                'Full Stack Developer',
                2000,
                'Backend Engineer',
                2000,
                'Software Engineer',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-xl leading-relaxed font-normal"
          >
            {description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 max-w-md sm:max-w-none"
          >
            <a href="#projects" className="w-full sm:w-auto">
              <PrimaryButton icon={FiCode} className="w-full sm:w-auto justify-center">View My Work</PrimaryButton>
            </a>
            {about?.resumeUrl ? (
              <a href={about.resumeUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                <OutlineButton icon={FiDownload} className="w-full sm:w-auto justify-center">Download Resume</OutlineButton>
              </a>
            ) : (
              <a href="#contact" className="w-full sm:w-auto">
                <OutlineButton icon={FiMessageCircle} className="w-full sm:w-auto justify-center">Contact Me</OutlineButton>
              </a>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4 text-slate-600 dark:text-slate-400"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 leading-none">CONNECT:</span>
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                title="GitHub Profile"
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/80 dark:bg-white/[0.08] border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-white hover:bg-primary hover:border-transparent hover:scale-110 shadow-sm transition-all duration-300 shrink-0"
              >
                <FiGithub size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn Profile"
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/80 dark:bg-white/[0.08] border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-white hover:bg-primary hover:border-transparent hover:scale-110 shadow-sm transition-all duration-300 shrink-0"
              >
                <FiLinkedin size={18} />
              </a>
              <a
                href="https://leetcode.com"
                target="_blank"
                rel="noreferrer"
                title="LeetCode Profile"
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/80 dark:bg-white/[0.08] border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-white hover:bg-amber-500 hover:border-transparent hover:scale-110 shadow-sm transition-all duration-300 shrink-0"
              >
                <SiLeetcode size={18} />
              </a>
              {about?.email && (
                <a
                  href={`mailto:${about.email}`}
                  title="Send Email"
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/80 dark:bg-white/[0.08] border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-white hover:bg-rose-500 hover:border-transparent hover:scale-110 shadow-sm transition-all duration-300 shrink-0"
                >
                  <FiMail size={18} />
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Developer Code Terminal & Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-5 relative flex justify-center"
        >
          {/* Decorative Halo */}
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 blur-2xl animate-pulse-slow" />

          {/* IDE Terminal Window Mockup */}
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl shadow-black/50 overflow-hidden font-mono text-xs text-slate-300">
            {/* Terminal Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-[11px] text-slate-400 font-sans font-medium flex items-center gap-1.5">
                <FiTerminal className="text-secondary" /> DeveloperService.java
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">● Active</span>
            </div>

            {/* Terminal Code Content */}
            <div className="p-5 space-y-2 overflow-x-auto leading-relaxed">
              <p className="text-slate-500">// Portfolio Architecture & Profile</p>
              <p>
                <span className="text-purple-400">@RestController</span>
              </p>
              <p>
                <span className="text-purple-400">@RequestMapping</span>(<span className="text-emerald-300">"/api/v1/developer"</span>)
              </p>
              <p>
                <span className="text-blue-400">public class</span> <span className="text-amber-300">DeveloperController</span> &#123;
              </p>

              <p className="pl-4">
                <span className="text-purple-400">@GetMapping</span>(<span className="text-emerald-300">"/status"</span>)
              </p>
              <p className="pl-4">
                <span className="text-blue-400">public</span> ResponseEntity&lt;Developer&gt; getProfile() &#123;
              </p>
              <p className="pl-8 text-slate-400">
                return ResponseEntity.ok(
              </p>
              <p className="pl-12">
                Developer.builder()
              </p>
              <p className="pl-16">
                .name(<span className="text-emerald-300">"{name}"</span>)
              </p>
              <p className="pl-16">
                .role(<span className="text-emerald-300">"Backend & Full-Stack"</span>)
              </p>
              <p className="pl-16">
                .stack(List.of(<span className="text-emerald-300">"Java"</span>, <span className="text-emerald-300">"Spring Boot"</span>, <span className="text-emerald-300">"React"</span>, <span className="text-emerald-300">"MongoDB"</span>))
              </p>
              <p className="pl-16">
                .availability(<span className="text-emerald-300">"Open for Roles"</span>)
              </p>
              <p className="pl-16">
                .build()
              </p>
              <p className="pl-8 text-slate-400">);</p>
              <p className="pl-4">&#125;</p>
              <p>&#125;</p>
            </div>

            {/* Floating Glass Badges */}
            <span className="absolute -left-4 bottom-12 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-bg-darksurface/90 border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white text-xs font-bold shadow-xl backdrop-blur-xl flex items-center gap-2 animate-float font-sans">
              <FiZap className="text-amber-500 fill-amber-500" />
              REST Microservices
            </span>
            <span
              className="absolute -right-4 top-10 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-bg-darksurface/90 border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white text-xs font-bold shadow-xl backdrop-blur-xl flex items-center gap-2 animate-float font-sans"
              style={{ animationDelay: '1.5s' }}
            >
              <FiLayers className="text-secondary" />
              Spring Security & JWT
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
