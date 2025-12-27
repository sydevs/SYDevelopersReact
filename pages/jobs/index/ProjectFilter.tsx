import { useMemo } from 'react'
import type { Project } from '@/types/airtable'

interface ProjectFilterProps {
  projects: Project[]
  projectsWithJobs: string[]
  selectedProject: string | null
  onSelectProject: (project: string | null) => void
}

export function ProjectFilter({
  projects,
  projectsWithJobs,
  selectedProject,
  onSelectProject,
}: ProjectFilterProps) {
  const getProjectInfo = (identifier: string) => {
    return projects.find(
      (p) => p.identifier === identifier || p.name === identifier,
    )
  }

  const sortedProjects = useMemo(() => {
    return [...projectsWithJobs].sort((a, b) => {
      const nameA = getProjectInfo(a)?.name || a
      const nameB = getProjectInfo(b)?.name || b
      return nameA.localeCompare(nameB)
    })
  }, [projectsWithJobs, projects])

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => onSelectProject(null)}
        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer border ${
          selectedProject === null
            ? 'bg-foreground text-background border-foreground'
            : 'bg-muted/50 text-foreground border-border hover:bg-muted'
        }`}
      >
        All Projects
      </button>

      {sortedProjects.map((projectKey) => {
        const projectInfo = getProjectInfo(projectKey)
        const isSelected = selectedProject === projectKey

        return (
          <button
            key={projectKey}
            onClick={() => onSelectProject(projectKey)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer border ${
              isSelected
                ? 'bg-foreground text-background border-foreground'
                : 'bg-transparent text-muted-foreground border-border hover:border-foreground/50 hover:text-foreground'
            }`}
          >
            {projectInfo?.icon ? (
              <img
                src={projectInfo.icon}
                alt=""
                className={`h-4 w-4 rounded-full object-cover ${
                  isSelected ? 'ring-1 ring-background' : ''
                }`}
              />
            ) : (
              <span
                className={`h-4 w-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                  isSelected
                    ? 'bg-background text-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {projectKey.charAt(0).toUpperCase()}
              </span>
            )}
            <span>{projectInfo?.name || projectKey}</span>
          </button>
        )
      })}
    </div>
  )
}
