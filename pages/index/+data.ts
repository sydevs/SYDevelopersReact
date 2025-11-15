import { fetchJobs, fetchProjects } from '../../lib/airtable'
import type { PageContextServer } from 'vike/types'

export type Data = Awaited<ReturnType<typeof data>>

export async function data(_pageContext: PageContextServer) {
  const [jobs, projects] = await Promise.all([fetchJobs(), fetchProjects()])

  const totalExpenses = projects.reduce((sum, p) => sum + (p.monthly || 0), 0)

  return {
    jobs,
    projects,
    totalExpenses,
  }
}
