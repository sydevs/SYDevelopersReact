import { fetchJobs, fetchTeams } from '../../../lib/airtable'
import type { PageContextServer } from 'vike/types'

export type Data = Awaited<ReturnType<typeof data>>

export async function data(_pageContext: PageContextServer) {
  const [jobs, teams] = await Promise.all([fetchJobs(), fetchTeams()])

  // Group jobs by category
  const jobsByCategory: Record<string, typeof jobs> = {}
  jobs.forEach((job) => {
    if (!jobsByCategory[job.category]) {
      jobsByCategory[job.category] = []
    }
    jobsByCategory[job.category].push(job)
  })

  return {
    jobs,
    jobsByCategory,
    teams,
  }
}
