interface Props {
  tags: string[]
  activeTag: string
  onTagChange: (tag: string) => void
}

export default function TagFilter({ tags, activeTag, onTagChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onTagChange('')}
        className={`px-4 py-1.5 text-sm rounded-full border transition-all duration-200 ${
          activeTag === ''
            ? 'bg-gradient-to-r from-[var(--accent-start)] to-[var(--accent-end)] text-white border-transparent'
            : 'bg-transparent text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]'
        }`}
      >
        全部
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag)}
          className={`px-4 py-1.5 text-sm rounded-full border transition-all duration-200 ${
            activeTag === tag
              ? 'bg-gradient-to-r from-[var(--accent-start)] to-[var(--accent-end)] text-white border-transparent'
              : 'bg-transparent text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
