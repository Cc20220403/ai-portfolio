export interface Project {
  id: string
  title: string
  description: string
  fullDescription: string
  image: string
  screenshots: string[]
  tags: string[]
  category: string
  githubUrl?: string
  demoUrl?: string
  features: string[]
  featured?: boolean
  date: string
}
