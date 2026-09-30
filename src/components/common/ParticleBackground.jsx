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

  // Neural-network style nodes + connecting lines — purely decorative AI motif
  const nodes = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 1.6 + 1,
      })),
    []
  )

  const links = useMemo(() => {
    const arr = []
    for (let i = 0; i < nodes.length; i++) {
      const next = nodes[(i + 1) % nodes.length]
      const jitterTarget = nodes[(i + 3) % nodes.length]
      arr.push([nodes[i], next])
      if (i % 2 === 0) arr.push([nodes[i], jitterTarget])
    }
    return arr
  }, [nodes])

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Aurora Drift Blobs — purple / electric blue / cyan */}
      <div
        className="aurora-layer -top-40 -left-40 w-[520px] h-[520px] bg-primary/40 dark:bg-primary/50"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="aurora-layer top-1/4 -right-40 w-[560px] h-[560px] bg-secondary/35 dark:bg-secondary/45"
        style={{ animationDelay: '4s', animationDuration: '26s' }}
      />
      <div
        className="aurora-layer -bottom-40 left-1/4 w-[480px] h-[480px] bg-accent-pink/30 dark:bg-accent-pink/35"
        style={{ animationDelay: '8s', animationDuration: '20s' }}
      />
      <div
        className="aurora-layer top-1/2 left-1/2 w-[400px] h-[400px] bg-indigo-500/20 dark:bg-indigo-400/25"
        style={{ animationDelay: '2s', animationDuration: '24s' }}
      />

      {/* Neural network node/line motif — very low opacity, AI-futuristic accent */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.12] dark:opacity-[0.18]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {links.map(([a, b], i) => (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="url(#neuralGradient)"
            strokeWidth="0.15"
          />
        ))}
        {nodes.map((n) => (
          <circle key={n.id} cx={n.x} cy={n.y} r={n.r * 0.35} fill="url(#neuralGradient)" />
        ))}
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>

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

