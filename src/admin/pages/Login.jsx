import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FiLock, FiMail, FiArrowLeft, FiCode } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext.jsx'
import PrimaryButton from '../../components/buttons/PrimaryButton.jsx'
import ThemeToggle from '../../components/common/ThemeToggle.jsx'
import logoImg from '../../assets/images/logo.png'

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back to Admin Dashboard!')
      window.location.href = '/admin/dashboard'
    } catch {
      toast.error('Invalid credentials. Please check your email and password.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-white p-6 relative overflow-hidden">
      {/* Background Decorative Halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between max-w-7xl w-full mx-auto relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors">
          <FiArrowLeft /> Back to Public Portfolio
        </Link>
        <ThemeToggle />
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md mx-auto relative z-10 my-auto">
        <form
          onSubmit={handleSubmit}
          className="p-8 md:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-2xl space-y-6"
        >
          <div className="text-center space-y-3">
            <div className="inline-block relative p-0.5 rounded-2xl bg-gradient-to-tr from-primary via-indigo-500 to-secondary shadow-xl shadow-primary/30 overflow-hidden">
              <img
                src={logoImg}
                alt="Amit Kumar Logo"
                className="h-14 w-auto max-w-[200px] object-contain rounded-xl bg-slate-950 px-2 py-1"
              />
            </div>
            <h1 className="font-display font-extrabold text-2xl tracking-tight">Admin Authentication</h1>
            <p className="text-xs text-slate-400">Sign in to manage portfolio content and settings</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <FiMail className="text-primary" /> Admin Email
              </label>
              <input
                required
                type="email"
                placeholder="admin@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder:text-slate-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <FiLock className="text-secondary" /> Password
              </label>
              <input
                required
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder:text-slate-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <PrimaryButton type="submit" className="w-full justify-center !py-3.5 text-sm font-bold">
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </PrimaryButton>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-slate-500 relative z-10">
        &copy; {new Date().getFullYear()} Portfolio Admin Portal. Protected System.
      </div>
    </div>
  )
}
