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

  // Group jobs by project (jobs can appear under multiple projects)
  const jobsByProject: Record<string, typeof jobs> = {}
  jobs.forEach((job) => {
    if (job.projects && job.projects.length > 0) {
      // Add job to each linked project
      job.projects.forEach((project) => {
        const projectKey = project.identifier
        if (!jobsByProject[projectKey]) {
          jobsByProject[projectKey] = []
        }
        jobsByProject[projectKey].push(job)
      })
    } else {
      // Jobs without projects go to "All Projects"
      if (!jobsByProject['All Projects']) {
        jobsByProject['All Projects'] = []
      }
      jobsByProject['All Projects'].push(job)
    }
  })

  return {
    jobs,
    jobsByCategory,
    jobsByProject,
    teams,
    projects,
  }
}
