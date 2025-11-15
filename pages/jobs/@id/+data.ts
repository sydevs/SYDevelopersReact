import { fetchJob } from '../../../lib/airtable'
import type { PageContextServer } from 'vike/types'

export type Data = Awaited<ReturnType<typeof data>>

export async function data(pageContext: PageContextServer) {
  const job = await fetchJob(pageContext.routeParams.id)

  if (!job) {
    throw new Error('Job not found')
  }

  return { job }
}
