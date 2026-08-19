import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    let animationFrameId
    const move = (e) => {
      if (ref.current) {
        animationFrameId = requestAnimationFrame(() => {
          if (ref.current) {
            ref.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`
          }
        })
      }
    }
    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="hidden md:block fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none -z-10 blur-3xl opacity-30 dark:opacity-40 transition-transform duration-100 ease-out"
      style={{
        background:
          'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(6, 182, 212, 0.25) 40%, rgba(236, 72, 153, 0.1) 70%, transparent 80%)',
      }}
    />
  )
}

