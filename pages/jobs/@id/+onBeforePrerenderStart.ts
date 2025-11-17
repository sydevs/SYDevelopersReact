import { fetchJobs } from '@/lib/airtable'

export async function onBeforePrerenderStart() {
  const jobs = await fetchJobs()

  // Return URLs with pre-fetched job data to avoid redundant API calls
  return jobs.map(job => ({
    url: `/jobs/${job.id}`,
    pageContext: {
      data: { job }
    }
  }))
}
