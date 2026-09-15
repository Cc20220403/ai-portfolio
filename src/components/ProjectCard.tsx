import { useState } from 'react'
import { ExternalLink, Calendar, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import GithubIcon from './GithubIcon'
import type { Project } from '../types/project'

interface Props {
  project: Project
  onViewDetail: (project: Project) => void
}

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

function resolveImg(src: string) {
  if (src.startsWith('http') || src.startsWith('data:')) return src
  return base + src
}

export default function ProjectCard({ project, onViewDetail }: Props) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [loadedMap, setLoadedMap] = useState<Record<number, boolean>>({})

  const images = project.screenshots.length > 0
    ? project.screenshots
    : [project.image]

  return (
    <article className="group relative rounded-xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-all duration-300 hover:bg-[var(--bg-card-hover)] card-enter">
      {/* Image carousel */}
      <div className="relative h-48 overflow-hidden bg-[var(--bg-secondary)]">
        {/* Skeleton placeholder */}
        {!loadedMap[activeIdx] && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[var(--bg-secondary)] via-[rgba(255,255,255,0.04)] to-[var(--bg-secondary)] bg-[length:200%_100%]" style={{ animation: 'shimmer 1.5s infinite' }} />
        )}
        <img
          src={resolveImg(images[activeIdx])}
          alt={project.title}
          loading="lazy"
          onLoad={() => setLoadedMap((prev) => ({ ...prev, [activeIdx]: true }))}
          className={`w-full h-full object-cover transition-opacity duration-300 ${loadedMap[activeIdx] ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent opacity-60" />

        {/* Featured badge */}
        {project.featured && (
          <span className="absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-[var(--accent-start)] to-[var(--accent-end)] text-white z-10">
            Featured
          </span>
        )}
        {/* 注意：featured 标记由 projects.json 中的 "featured": true 控制，当前项目已移除该字段 */}

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveIdx((prev) => prev > 0 ? prev - 1 : images.length - 1) }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-10"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveIdx((prev) => prev < images.length - 1 ? prev + 1 : 0) }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-10"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setActiveIdx(idx) }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === activeIdx ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        )}

        {/* View detail overlay - clickable */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300 select-none"
          onClick={() => onViewDetail(project)}
        >
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-primary)]/80 text-[var(--text-primary)] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-view">
            <Eye size={14} />
            查看详情
          </span>
        </div>
      </div>

      {/* Content - clickable */}
      <div
        className="p-5 cursor-pointer"
        onClick={() => onViewDetail(project)}
      >
        <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs mb-2">
          <Calendar size={12} />
          <span>{project.date}</span>
          <span className="ml-auto px-2 py-0.5 rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-[10px] font-medium">
            {project.category}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:gradient-text transition-all">
          {project.title}
        </h3>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-md bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border-color)] font-mono"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-0.5 text-xs rounded-md text-[var(--text-muted)]">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-[var(--border-color)]">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <GithubIcon size={14} />
              Source
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] opacity-50">
              <GithubIcon size={14} />
              代码即将上传
            </span>
          )}

          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ExternalLink size={14} />
              Demo
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] opacity-50">
              <ExternalLink size={14} />
              演示即将上线
            </span>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); onViewDetail(project) }}
            className="ml-auto flex items-center gap-1 text-xs text-[var(--accent-start)] hover:text-[var(--accent-end)] transition-colors"
          >
            <Eye size={14} />
            详情
          </button>
        </div>
      </div>
    </article>
  )
}
