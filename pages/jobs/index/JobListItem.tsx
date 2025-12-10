import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ChevronRight } from 'lucide-react'
import type { Job, Project } from '@/types/airtable'

interface JobListItemProps {
  job: Job
  projectInfo?: Project
  showCategory?: boolean
  showPriorityInSubtitle?: boolean
}

export function JobListItem({
  job,
  projectInfo,
  showCategory = true,
  showPriorityInSubtitle = false,
}: JobListItemProps) {
  return (
    <a
      href={`/jobs/${job.id}`}
      className="flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors"
    >
      {/* Project Logo */}
      <Avatar className="h-10 w-10 shrink-0">
        {projectInfo?.icon ? (
          <AvatarImage src={projectInfo.icon} alt={projectInfo.name} />
        ) : (
          <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
            {(job.project || 'G').charAt(0).toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>

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
          <span>{projectInfo?.name || job.project || 'All Projects'}</span>
          {showPriorityInSubtitle && job.priority && (
            <>
              <span className="text-muted-foreground/50">|</span>
              <span
                className={job.priority === 'Critical' ? 'text-destructive' : ''}
              >
                {job.priority} Priority
              </span>
            </>
          )}
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

