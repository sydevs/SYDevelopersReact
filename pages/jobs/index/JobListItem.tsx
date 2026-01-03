import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ChevronRight } from 'lucide-react'
import type { Job } from '@/types/airtable'

interface JobListItemProps {
  job: Job
}

export function JobListItem({ job }: JobListItemProps) {
  const projects = job.projects || []
  const hasProjects = projects.length > 0
  const maxVisibleIcons = 3
  const visibleProjects = projects.slice(0, maxVisibleIcons)
  const remainingCount = projects.length - maxVisibleIcons
  const showOverflow = remainingCount > 0

  // Calculate icon offset based on count - more icons = denser overlap
  const iconSize = 40
  const totalIcons = visibleProjects.length + (showOverflow ? 1 : 0)
  // Offset decreases as icon count increases: 1→40, 2→22, 3→16, 4→14, 5+→12
  const getOffset = (count: number) => {
    if (count <= 1) return iconSize
    if (count === 2) return 22
    if (count === 3) return 16
    if (count === 4) return 14
    return 12
  }
  const offset = getOffset(totalIcons)
  const containerWidth = iconSize + (totalIcons - 1) * offset

  return (
    <a
      href={`/jobs/${job.id}`}
      className="flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors"
    >
      {/* Stacked Project Icons */}
      <div
        className="relative flex shrink-0"
        style={{ width: hasProjects ? `${containerWidth}px` : '40px' }}
      >
        {hasProjects ? (
          <>
            {visibleProjects.map((project, index) => (
              <Avatar
                key={project.id}
                className="h-10 w-10 border-2 border-background"
                style={{
                  position: index === 0 ? 'relative' : 'absolute',
                  left: `${index * offset}px`,
                  zIndex: totalIcons - index,
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
            {showOverflow && (
              <Avatar
                className="h-10 w-10 border-2 border-background"
                style={{
                  position: 'absolute',
                  left: `${visibleProjects.length * offset}px`,
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
        {job.brief && (
          <p className="text-sm text-foreground/70 line-clamp-2 mt-1">
            {job.brief}
          </p>
        )}
      </div>

      {/* Priority Badge & Arrow */}
      <div className="flex items-center gap-3 shrink-0">
        {job.priority === 'Critical' && (
          <Badge
            variant="outline"
            className="border-red-600 bg-red-600 text-white"
          >
            Critical
          </Badge>
        )}
        {job.priority === 'Important' && (
          <Badge
            variant="outline"
            className="border-amber-600 bg-amber-600 text-white"
          >
            Important
          </Badge>
        )}
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </a>
  )
}
