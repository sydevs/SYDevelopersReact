import { fetchJobs, fetchTeams, fetchProjects } from '../../../lib/airtable'
import type { PageContextServer } from 'vike/types'

export type Data = Awaited<ReturnType<typeof data>>

export async function data(_pageContext: PageContextServer) {
  const [jobs, teams, projects] = await Promise.all([fetchJobs(), fetchTeams(), fetchProjects()])

  // Group jobs by category
  const jobsByCategory: Record<string, typeof jobs> = {}
  jobs.forEach((job) => {
    if (!jobsByCategory[job.category]) {
      jobsByCategory[job.category] = []
    }
    jobsByCategory[job.category].push(job)
  })

  // Group jobs by project
  const jobsByProject: Record<string, typeof jobs> = {}
  jobs.forEach((job) => {
    const projectKey = job.project || 'General'
    if (!jobsByProject[projectKey]) {
      jobsByProject[projectKey] = []
    }
    jobsByProject[projectKey].push(job)
  })

  return {
    jobs,
    jobsByCategory,
    jobsByProject,
    teams,
    projects,
  }
}
