import { Link } from 'react-router-dom'
import PrimaryButton from '../components/buttons/PrimaryButton.jsx'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-display text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">
        404
      </h1>
      <p className="text-current/70 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to="/">
        <PrimaryButton>Go Home</PrimaryButton>
      </Link>
    </div>
  )
}
