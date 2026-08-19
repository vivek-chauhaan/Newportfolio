import { useMemo } from 'react'

export default function ParticleBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1.5,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 5,
        color: i % 3 === 0 ? 'bg-primary/50' : i % 3 === 1 ? 'bg-secondary/50' : 'bg-accent-pink/40',
      })),
    []
  )

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Ambient Gradient Mesh Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 dark:bg-primary/25 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-secondary/15 dark:bg-secondary/20 rounded-full blur-[140px] animate-float-slow" />
      <div className="absolute -bottom-32 left-1/4 w-[450px] h-[450px] bg-accent-pink/15 dark:bg-accent-pink/15 rounded-full blur-[130px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Floating Star/Dot Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute rounded-full ${p.color} animate-float shadow-sm`}
          style={{
            width: p.size,
            height: p.size,
            top: `${p.top}%`,
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

