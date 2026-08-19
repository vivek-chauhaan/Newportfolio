import { useState } from 'react'
import toast from 'react-hot-toast'
import { FiMail, FiPhone, FiMapPin, FiSend, FiCopy, FiCheck, FiLinkedin, FiGithub } from 'react-icons/fi'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import PrimaryButton from '../../components/buttons/PrimaryButton.jsx'
import useFetch from '../../hooks/useFetch.js'
import aboutService from '../../services/aboutService.js'
import contactService from '../../services/contactService.js'

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' }

export default function ContactSection() {
  const { data: about } = useFetch(() => aboutService.get(), [])
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleCopyEmail = () => {
    if (about?.email) {
      navigator.clipboard.writeText(about.email)
      setCopied(true)
      toast.success('Email copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await contactService.submit(form)
      toast.success("Message sent! I'll get back to you soon.")
      setForm(initialForm)
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="max-w-7xl mx-auto px-5 md:px-8 py-24">
      <SectionTitle
        eyebrow="Get In Touch"
        title="Let's Build Something Great Together"
        subtitle="Have a project, opportunity, or interesting idea? I'd love to hear from you."
      />

      <div className="grid lg:grid-cols-5 gap-10">
        {/* Left Column: Contact Detail Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              Contact Information
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Feel free to reach out via email, social networks, or by submitting the contact form.
            </p>

            {about?.email && (
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg">
                    <FiMail />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase">Email</p>
                    <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">{about.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 transition-colors"
                  title="Copy email address"
                >
                  {copied ? <FiCheck className="text-emerald-500" /> : <FiCopy />}
                </button>
              </div>
            )}

            {about?.phone && (
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10">
                <span className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center text-lg">
                  <FiPhone />
                </span>
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase">Phone</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">{about.phone}</p>
                </div>
              </div>
            )}

            {about?.address && (
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10">
                <span className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-lg">
                  <FiMapPin />
                </span>
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase">Location</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">{about.address}</p>
                </div>
              </div>
            )}

            {/* Social Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-primary hover:text-white dark:hover:bg-primary text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <FiLinkedin /> LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <FiGithub /> GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-3 p-8 rounded-3xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xl space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                Your Name
              </label>
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                Your Email
              </label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="er.amitkumar9129@gmail.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                Mobile Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 91299 83785"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                Subject
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Software Opportunity / Project Query"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              Message
            </label>
            <textarea
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Hi, I'm interested in discussing an opportunity..."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <PrimaryButton type="submit" icon={FiSend} className="w-full justify-center !py-3.5">
            {submitting ? 'Sending Message...' : 'Send Message'}
          </PrimaryButton>
        </form>
      </div>
    </section>
  )
}
