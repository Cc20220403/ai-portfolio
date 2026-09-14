import { Mail, Heart } from 'lucide-react'
import GithubIcon from './GithubIcon'
import profile from '../data/profile.json'
import { useScrollReveal } from '../hooks/useScrollReveal'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  github: GithubIcon as React.ComponentType<{ size?: number }>,
  mail: Mail,
}

export default function FooterSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <footer id="contact" ref={ref} className="reveal py-16 px-6 border-t border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto text-center">
        {/* Social links */}
        <div className="flex items-center justify-center gap-6 mb-8">
          {profile.socialLinks.map((link) => {
            const Icon = ICON_MAP[link.icon] || GithubIcon as React.ComponentType<{ size?: number }>
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all duration-200"
                title={link.platform}
              >
                <Icon size={18} />
                <span className="text-sm">{link.platform}</span>
              </a>
            )
          })}
        </div>

        {/* Copyright */}
        <p className="text-[var(--text-muted)] text-sm flex items-center justify-center gap-1">
          Built with <Heart size={14} className="text-red-400" /> using React
        </p>
      </div>
    </footer>
  )
}
