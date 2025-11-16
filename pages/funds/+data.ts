import { fetchProjects } from '../../lib/airtable'
import type { PageContextServer } from 'vike/types'

export type Data = Awaited<ReturnType<typeof data>>

export async function data(_pageContext: PageContextServer) {
  const projects = await fetchProjects()
  const totalExpenses = projects.reduce((sum, p) => sum + (p.monthly || 0), 0)

  return {
    projects,
    totalExpenses,
  }
}
