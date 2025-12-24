import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Filter, Check } from 'lucide-react'
import type { Project } from '@/types/airtable'

interface ProjectFilterProps {
  projects: Project[]
  projectsWithJobs: string[]
  selectedProject: string | null
  onSelectProject: (project: string | null) => void
  getProjectJobCount: (project: string | null) => number
  totalJobCount: number
}

export function ProjectFilter({
  projects,
  projectsWithJobs,
  selectedProject,
  onSelectProject,
  getProjectJobCount,
  totalJobCount,
}: ProjectFilterProps) {
  const [filterOpen, setFilterOpen] = useState(false)

  const getProjectInfo = (identifier: string) => {
    return projects.find(
      (p) => p.identifier === identifier || p.name === identifier,
    )
  }

  const selectedProjectInfo = selectedProject
    ? getProjectInfo(selectedProject)
    : null

  return (
    <Popover open={filterOpen} onOpenChange={setFilterOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2 bg-inherit cursor-pointer">
          <Filter className="h-4 w-4" />
          {selectedProject ? (
            <span className="flex items-center gap-2">
              {selectedProjectInfo?.icon && (
                <img
                  src={selectedProjectInfo.icon}
                  alt=""
                  className="h-4 w-4 rounded object-cover"
                />
              )}
              {selectedProjectInfo?.name || selectedProject}
            </span>
          ) : (
            'Filter by project'
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="end">
        <div className="space-y-1">
          <button
            onClick={() => {
              onSelectProject(null)
              setFilterOpen(false)
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent cursor-pointer ${
              selectedProject === null ? 'bg-accent' : ''
            }`}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              {selectedProject === null && <Check className="h-4 w-4" />}
            </div>
            <span>All Projects</span>
            <Badge variant="secondary" className="ml-auto text-xs">
              {totalJobCount}
            </Badge>
          </button>
          {projectsWithJobs.map((projectKey) => {
            const projectInfo = getProjectInfo(projectKey)
            const jobCount = getProjectJobCount(projectKey)
            const isSelected = selectedProject === projectKey

            return (
              <button
                key={projectKey}
                onClick={() => {
                  onSelectProject(projectKey)
                  setFilterOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent cursor-pointer ${
                  isSelected ? 'bg-accent' : ''
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  {isSelected && <Check className="h-4 w-4" />}
                </div>
                {projectInfo?.icon ? (
                  <img
                    src={projectInfo.icon}
                    alt=""
                    className="h-5 w-5 rounded object-cover"
                  />
                ) : (
                  <div className="h-5 w-5 rounded bg-muted flex items-center justify-center text-[10px] font-bold">
                    {projectKey.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="flex-1 text-left">
                  {projectInfo?.name || projectKey}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {jobCount}
                </Badge>
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
