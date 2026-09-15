import { useMemo, useState } from 'react'
import projectsData from '../data/projects.json'
import type { Project } from '../types/project'
import TagFilter from './TagFilter'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function ProjectSection() {
  const projects = projectsData as Project[]
  const [activeTag, setActiveTag] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)))
    return Array.from(tagSet).sort()
  }, [projects])

  const filtered = useMemo(() => {
    if (!activeTag) return projects
    return projects.filter((p) => p.tags.includes(activeTag))
  }, [projects, activeTag])

  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <>
      <section id="projects" ref={sectionRef} className="reveal py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="gradient-text">项目作品</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-sm">
              探索我在 AI 编程学习中构建的各类项目
            </p>
          </div>

          {/* Tag filter */}
          <div className="mb-10">
            <TagFilter
              tags={allTags}
              activeTag={activeTag}
              onTagChange={setActiveTag}
            />
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetail={setSelectedProject}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-[var(--text-muted)] py-12">
              暂无该分类的项目
            </p>
          )}
        </div>
      </section>

      {/* Project detail modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
