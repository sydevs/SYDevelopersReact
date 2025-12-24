import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ChevronRight } from 'lucide-react'
import type { Job, ProjectRef } from '@/types/airtable'

interface JobListItemProps {
  job: Job
  showCategory?: boolean
}

export function JobListItem({ job, showCategory = true }: JobListItemProps) {
  const projects = job.projects || []
  const hasProjects = projects.length > 0
  const maxVisibleIcons = 3
  const visibleProjects = projects.slice(0, maxVisibleIcons)
  const remainingCount = projects.length - maxVisibleIcons

  // Generate project names for display
  const projectNames = hasProjects
    ? projects.map((p) => p.name).join(', ')
    : 'All Projects'

  return (
    <a
      href={`/jobs/${job.id}`}
      className="flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors"
    >
      {/* Stacked Project Icons */}
      <div className="relative flex shrink-0" style={{ width: hasProjects ? `${Math.min(projects.length, maxVisibleIcons) * 28 + 12}px` : '40px' }}>
        {hasProjects ? (
          <>
            {visibleProjects.map((project, index) => (
              <Avatar
                key={project.id}
                className="h-10 w-10 border-2 border-background"
                style={{
                  position: index === 0 ? 'relative' : 'absolute',
                  left: `${index * 28}px`,
                  zIndex: maxVisibleIcons - index,
                }}
              >
                {project.icon ? (
                  <AvatarImage src={project.icon} alt={project.name} />
                ) : (
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                    {project.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
            ))}
            {remainingCount > 0 && (
              <Avatar
                className="h-10 w-10 border-2 border-background"
                style={{
                  position: 'absolute',
                  left: `${maxVisibleIcons * 28}px`,
                  zIndex: 0,
                }}
              >
                <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                  +{remainingCount}
                </AvatarFallback>
              </Avatar>
            )}
          </>
        ) : (
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
              G
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      {/* Job Info */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-foreground">{job.name}</div>
        <div className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
          {showCategory && (
            <>
              <span>{job.category}</span>
              <span className="text-muted-foreground/50">|</span>
            </>
          )}
          <span className="truncate">{projectNames}</span>
        </div>
      </div>

      {/* Priority Badge & Arrow */}
      <div className="flex items-center gap-3 shrink-0">
        {job.priority && (
          <Badge
            variant="outline"
            className={
              job.priority === 'Critical'
                ? 'border-red-600 bg-red-600 text-white'
                : job.priority === 'Important'
                  ? 'border-amber-600 bg-amber-600 text-white'
                  : 'border-teal-600 bg-teal-600 text-white'
            }
          >
            {job.priority}
          </Badge>
        )}
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </a>
  )
}
