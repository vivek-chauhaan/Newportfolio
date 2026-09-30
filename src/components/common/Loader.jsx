export default function Loader({ full = false }) {
  return (
    <div className={`flex items-center justify-center ${full ? 'min-h-screen' : 'py-16'}`}>
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-secondary to-accent-pink blur-md opacity-40 animate-pulse-slow" />
        <div className="relative w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary border-r-secondary animate-spin" />
      </div>
    </div>
  )
}
