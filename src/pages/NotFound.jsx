import { Link } from 'react-router-dom'
import PrimaryButton from '../components/buttons/PrimaryButton.jsx'

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="glass-3d neon-ring inline-flex flex-col items-center px-10 py-12 rounded-3xl bg-white/70 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-2xl">
        <h1 className="font-display text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">
          404
        </h1>
        <p className="text-current/70 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/">
          <PrimaryButton>Go Home</PrimaryButton>
        </Link>
      </div>
    </div>
  )
}
