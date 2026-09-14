import { ChevronDown } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import profile from '../data/profile.json'

export default function HeroSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section
      id="hero"
      ref={ref}
      className="reveal relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, var(--accent-start) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 70% 60%, var(--accent-end) 0%, transparent 70%)',
          }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="text-center max-w-3xl">
        <p className="text-[var(--text-secondary)] text-sm font-mono tracking-widest uppercase mb-4">
          Welcome to my
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="gradient-text">{profile.name}</span>
        </h1>
        <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-4">
          {profile.title}
        </p>
        <p className="text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
          {profile.bio}
        </p>
      </div>

      {/* Scroll indicator */}
      <a
        href="#projects"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="absolute bottom-10 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors animate-bounce"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  )
}
