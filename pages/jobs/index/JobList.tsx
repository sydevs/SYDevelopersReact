import { JobListItem } from './JobListItem'
import type { Job } from '@/types/airtable'

interface JobListProps {
  jobs: Job[]
  selectedCategory: string | null
}

export function JobList({ jobs, selectedCategory }: JobListProps) {
  const sortedJobs = [...jobs].sort((a, b) =>
    (a.priority || 'z').localeCompare(b.priority || 'z'),
  )

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground border rounded-lg">
        No jobs found matching the selected filters.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {selectedCategory?.toLowerCase() === 'development' && (
        <p className="text-sm text-muted-foreground">
          For most of these technical roles we expect that you have some prior
          skills.
        </p>
      )}
      <div className="border rounded-lg divide-y">
        {sortedJobs.map((job) => (
          <JobListItem key={job.id} job={job} />
        ))}
      </div>
    </div>
  )
}
