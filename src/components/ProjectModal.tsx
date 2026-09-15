import { useEffect, useState, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Check, ExternalLink } from 'lucide-react'
import GithubIcon from './GithubIcon'
import type { Project } from '../types/project'

interface Props {
  project: Project | null
  onClose: () => void
}

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

function resolveImg(src: string) {
  if (src.startsWith('http') || src.startsWith('data:')) return src
  return base + src
}

export default function ProjectModal({ project, onClose }: Props) {
  const [activeScreenshot, setActiveScreenshot] = useState(0)

  const allImages = (project?.screenshots?.length ?? 0) > 0 ? project!.screenshots : project ? [project.image] : []

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (!project) return
      const total = allImages.length
      if (total <= 1) return
      if (e.key === 'ArrowLeft') {
        setActiveScreenshot((prev) => (prev > 0 ? prev - 1 : total - 1))
      }
      if (e.key === 'ArrowRight') {
        setActiveScreenshot((prev) => (prev < total - 1 ? prev + 1 : 0))
      }
    },
    [onClose, project, allImages.length]
  )

  useEffect(() => {
    if (!project) return
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    setActiveScreenshot(0)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [project, handleKeyDown])

  if (!project) return null

  const resolvedImages = allImages.map(resolveImg)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-[var(--bg-primary)]/80 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Screenshot gallery */}
        <div className="relative">
          <div className="aspect-video bg-[var(--bg-primary)] overflow-hidden rounded-t-2xl">
            <img
              src={resolvedImages[activeScreenshot]}
              alt={`${project.title} screenshot ${activeScreenshot + 1}`}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Navigation arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={() => setActiveScreenshot((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setActiveScreenshot((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Thumbnail strip */}
          {allImages.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveScreenshot(idx)}
                  className={`rounded-full transition-all ${
                    idx === activeScreenshot
                      ? 'w-6 h-2.5 bg-white'
                      : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`查看第 ${idx + 1} 张截图`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
                {project.title}
              </h2>
              <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                <span>{project.date}</span>
                <span className="px-2 py-0.5 rounded-full bg-[var(--bg-primary)] text-[var(--text-secondary)] text-xs">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[var(--accent-start)] to-[var(--accent-end)] text-white text-xs">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
            {project.fullDescription}
          </p>

          {/* Features */}
          {project.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">
                功能亮点
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <Check size={16} className="shrink-0 mt-0.5 text-emerald-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">
              技术栈
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-lg bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-color)] font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action links */}
          <div className="flex items-center gap-4 pt-5 border-t border-[var(--border-color)]">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-all text-sm"
              >
                <GithubIcon size={16} />
                查看源码
              </a>
            ) : (
              <span className="flex items-center gap-2 px-4 py-2 rounded-lg text-[var(--text-muted)] text-sm opacity-60">
                <GithubIcon size={16} />
                代码即将上传
              </span>
            )}

            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--accent-start)] to-[var(--accent-end)] text-white text-sm hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={16} />
                在线演示
              </a>
            ) : (
              <span className="flex items-center gap-2 px-4 py-2 rounded-lg text-[var(--text-muted)] text-sm opacity-60">
                <ExternalLink size={16} />
                演示即将上线
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
