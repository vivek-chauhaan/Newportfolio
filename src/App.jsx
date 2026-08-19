import AppRoutes from './routes/AppRoutes.jsx'
import ParticleBackground from './components/common/ParticleBackground.jsx'
import CursorGlow from './components/common/CursorGlow.jsx'
import ScrollProgressBar from './components/common/ScrollProgressBar.jsx'
import BackToTop from './components/common/BackToTop.jsx'

function App() {
  return (
    <div className="relative min-h-screen font-body text-bg-dark dark:text-white overflow-x-hidden">
      <ParticleBackground />
      <CursorGlow />
      <AppRoutes />
      <BackToTop />
    </div>
  )
}

export default App
