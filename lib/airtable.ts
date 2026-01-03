import type {
  Job,
  Project,
  Person,
  Expense,
  Teams,
  ProjectRef,
} from '../types/airtable'

// Use Cloudflare's native fetch API for Airtable (compatible with Workers)
const AIRTABLE_API_URL = 'https://api.airtable.com/v0'

interface AirtableRecord {
  id: string
  fields: Record<string, any>
}

interface AirtableResponse {
  records: AirtableRecord[]
  offset?: string
}

async function airtableFetch(
  tableName: string,
  options: {
    filterByFormula?: string
    sort?: Array<{ field: string; direction: 'asc' | 'desc' }>
  } = {},
): Promise<AirtableRecord[]> {
  const apiKey = import.meta.env.AIRTABLE_KEY as string
  const baseId = import.meta.env.AIRTABLE_BASE as string

  if (!apiKey || !baseId) {
    throw new Error(
      'Airtable credentials not configured. Check AIRTABLE_KEY and AIRTABLE_BASE in .env.local',
    )
  }

  const params = new URLSearchParams()
  if (options.filterByFormula) {
    params.append('filterByFormula', options.filterByFormula)
  }
  if (options.sort) {
    options.sort.forEach((s, i) => {
      params.append(`sort[${i}][field]`, s.field)
      params.append(`sort[${i}][direction]`, s.direction)
    })
  }

  const url = `${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(tableName)}?${params}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Airtable API error: ${response.status} ${errorText}`)
  }

  const data: AirtableResponse = await response.json()
  return data.records
}

async function airtableFindRecord(
  tableName: string,
  recordId: string,
): Promise<AirtableRecord> {
  const apiKey = import.meta.env.AIRTABLE_KEY as string
  const baseId = import.meta.env.AIRTABLE_BASE as string

  if (!apiKey || !baseId) {
    throw new Error(
      'Airtable credentials not configured. Check AIRTABLE_KEY and AIRTABLE_BASE in .env.local',
    )
  }

  const url = `${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(tableName)}/${recordId}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Airtable API error: ${response.status} ${errorText}`)
  }

  return response.json()
}

const COLORS = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
]

/**
 * Maps project identifiers to their local image paths
 */
function getProjectIconPath(identifier: string): string {
  const iconMap: Record<string, string> = {
    wemeditate: '/images/wemeditate/logo.webp',
    atlas: '/images/sahaj-atlas/logo.webp',
    app: '/images/mobile-app/logo.svg',
    resources: '/images/resources/logo.webp',
    journeyselfdiscovery: '/images/journeyselfdiscovery/logo.webp',
    '21daymeditation': '/images/21daymeditation/logo.webp',
  }

  return iconMap[identifier] || ''
}

/**
 * Validates that a job record has all required fields.
 * Returns the missing fields array (empty if valid).
 */
function validateJobFields(record: AirtableRecord): string[] {
  const missingFields: string[] = []
  const fields = record.fields

  if (typeof fields.Name !== 'string' || !fields.Name)
    missingFields.push('Name')
  if (typeof fields.Category !== 'string' || !fields.Category)
    missingFields.push('Category')
  if (typeof fields.Brief !== 'string') missingFields.push('Brief')
  if (typeof fields.Description !== 'string') missingFields.push('Description')

  return missingFields
}

export async function fetchJobs(): Promise<Job[]> {
  try {
    console.log('Fetching jobs from Airtable...')
    const records = await airtableFetch('JobsV3', {
      filterByFormula: 'Public = 1',
      sort: [{ field: 'Category', direction: 'asc' }],
    })

    console.log(`Fetched ${records.length} jobs`)

    // Collect all unique project IDs from all jobs
    const allProjectIds = new Set<string>()
    records.forEach((r) => {
      const projectIds = r.fields.Projects as string[] | undefined
      projectIds?.forEach((id) => allProjectIds.add(id))
    })

    // Fetch all referenced projects in parallel
    const projectMap = new Map<string, ProjectRef>()
    if (allProjectIds.size > 0) {
      const projectPromises = Array.from(allProjectIds).map((id) =>
        airtableFindRecord('Projects', id).catch(() => null),
      )
      const projectRecords = await Promise.all(projectPromises)

      projectRecords.forEach((record) => {
        if (record) {
          const identifier = record.fields.Identifier as string
          projectMap.set(record.id, {
            id: record.id,
            identifier,
            name: record.fields.Name as string,
            icon: getProjectIconPath(identifier),
          })
        }
      })
    }

    const validJobs = records
      .map((r): Job | null => {
        const missingFields = validateJobFields(r)
        if (missingFields.length > 0) {
          console.warn(
            `[fetchJobs] Discarding job (id: ${r.id}): missing required fields [${missingFields.join(', ')}]`,
            { recordId: r.id, fields: r.fields },
          )
          return null
        }

        // Resolve linked projects
        const projectIds = r.fields.Projects as string[] | undefined
        const projects: ProjectRef[] = []
        projectIds?.forEach((id) => {
          const project = projectMap.get(id)
          if (project) projects.push(project)
        })

        return {
          id: r.id,
          name: r.fields.Name as string,
          category: r.fields.Category as string,
          brief: r.fields.Brief as string,
          description: r.fields.Description as string,
          priority: r.fields.Priority as string | undefined,
          projects: projects.length > 0 ? projects : undefined,
          contactEmail: r.fields.ContactEmail as string | undefined,
          public: true,
        }
      })
      .filter((job): job is Job => job !== null)

    if (validJobs.length < records.length) {
      console.warn(
        `[fetchJobs] ${records.length - validJobs.length} job(s) were discarded due to missing fields`,
      )
    }

    return validJobs
  } catch (error) {
    console.error('Error fetching jobs from Airtable:', error)
    return []
  }
}

export async function fetchJob(id: string): Promise<Job | null> {
  try {
    const record = await airtableFindRecord('JobsV3', id)

    const missingFields = validateJobFields(record)
    if (missingFields.length > 0) {
      console.warn(
        `[fetchJob] Job (id: ${id}) has missing required fields [${missingFields.join(', ')}]`,
        {
          recordId: record.id,
          fields: record.fields,
        },
      )
      return null
    }

    // Resolve linked projects
    const projectIds = record.fields.Projects as string[] | undefined
    const projects: ProjectRef[] = []

    if (projectIds?.length) {
      const projectPromises = projectIds.map((pid) =>
        airtableFindRecord('Projects', pid).catch(() => null),
      )
      const projectRecords = await Promise.all(projectPromises)

      projectRecords.forEach((p) => {
        if (p) {
          const identifier = p.fields.Identifier as string
          projects.push({
            id: p.id,
            identifier,
            name: p.fields.Name as string,
            icon: getProjectIconPath(identifier),
          })
        }
      })
    }

    return {
      id: record.id,
      name: record.fields.Name as string,
      category: record.fields.Category as string,
      brief: record.fields.Brief as string,
      description: record.fields.Description as string,
      priority: record.fields.Priority as string | undefined,
      projects: projects.length > 0 ? projects : undefined,
      contactEmail: record.fields.ContactEmail as string | undefined,
      public: record.fields.Public as boolean,
    }
  } catch (error) {
    console.error('Error fetching job:', error)
    return null
  }
}

/**
 * Validates that an expense record has all required fields.
 * Returns the missing fields array (empty if valid).
 */
function validateExpenseFields(
  record: AirtableRecord,
):
  | { valid: true; expense: Expense }
  | { valid: false; missingFields: string[] } {
  const missingFields: string[] = []
  const fields = record.fields

  if (typeof fields.Name !== 'string' || !fields.Name)
    missingFields.push('Name')
  if (typeof fields.Description !== 'string') missingFields.push('Description')
  if (fields.Type !== 'Monthly' && fields.Type !== 'Yearly')
    missingFields.push('Type')

  if (missingFields.length > 0) {
    return { valid: false, missingFields }
  }

  return {
    valid: true,
    expense: {
      name: fields.Name as string,
      description: fields.Description as string,
      type: fields.Type as 'Monthly' | 'Yearly',
      monthly: (fields.Monthly as number) || 0,
      yearly: (fields.Yearly as number) || 0,
    },
  }
}

/**
 * Validates that a project record has all required fields.
 * Returns the missing fields array (empty if valid).
 */
function validateProjectFields(record: AirtableRecord): string[] {
  const missingFields: string[] = []
  const fields = record.fields

  if (typeof fields.Name !== 'string' || !fields.Name)
    missingFields.push('Name')
  if (typeof fields.Identifier !== 'string' || !fields.Identifier)
    missingFields.push('Identifier')
  if (typeof fields.Description !== 'string') missingFields.push('Description')
  if (typeof fields.URL !== 'string') missingFields.push('URL')

  return missingFields
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    console.log('Fetching projects from Airtable...')
    const projectRecords = await airtableFetch('Projects', {
      filterByFormula: "Type = 'Internal'",
      sort: [{ field: 'Monthly', direction: 'desc' }],
    })

    console.log(`Fetched ${projectRecords.length} projects`)

    const projectResults = await Promise.all(
      projectRecords.map(async (project) => {
        // Validate required project fields
        const missingFields = validateProjectFields(project)
        if (missingFields.length > 0) {
          console.warn(
            `[fetchProjects] Discarding project (id: ${project.id}): missing required fields [${missingFields.join(', ')}]`,
            { recordId: project.id, fields: project.fields },
          )
          return null
        }

        const expenseIds = project.fields.Expenses as string[] | undefined
        let expenses: Expense[] = []

        if (expenseIds?.length) {
          const expenseRecords = await airtableFetch('Expenses', {
            filterByFormula: `FIND(RECORD_ID(), "${expenseIds.join(',')}")`,
            sort: [{ field: 'Monthly', direction: 'desc' }],
          })

          expenses = expenseRecords
            .map((r) => {
              const result = validateExpenseFields(r)
              if (!result.valid) {
                console.warn(
                  `[fetchProjects] Discarding expense (id: ${r.id}) for project "${project.fields.Name}": missing required fields [${result.missingFields.join(', ')}]`,
                  { recordId: r.id, projectId: project.id, fields: r.fields },
                )
                return null
              }
              return result.expense
            })
            .filter((e): e is Expense => e !== null)
        }

        // Map project identifier to local icon path
        const identifier = project.fields.Identifier as string
        const localIconPath = getProjectIconPath(identifier)

        return {
          id: project.id,
          name: project.fields.Name as string,
          identifier,
          description: project.fields.Description as string,
          url: project.fields.URL as string,
          icon: localIconPath,
          monthly: (project.fields.Monthly as number) || 0,
          expenses,
        }
      }),
    )

    // Filter out any null projects (those that failed validation)
    const validProjects = projectResults.filter((p): p is Project => p !== null)

    if (validProjects.length < projectRecords.length) {
      console.warn(
        `[fetchProjects] ${projectRecords.length - validProjects.length} project(s) were discarded due to missing fields`,
      )
    }

    return validProjects
  } catch (error) {
    console.error('Error fetching projects from Airtable:', error)
    return []
  }
}

export async function fetchTeams(): Promise<Teams> {
  const records = await airtableFetch('People', {
    filterByFormula: 'Public = 1',
    sort: [{ field: 'Teams', direction: 'asc' }],
  })

  const teams: Teams = {}

  records.forEach((r, i) => {
    const teamsList = r.fields.Teams as string[]
    const name = r.fields.Name as string
    const nameParts = name.split(' ')

    const person: Person = {
      name: nameParts.map((n, idx) => (idx > 0 ? n[0] : n)).join(' '),
      initials: nameParts.map((n) => n[0]).join(''),
      country: r.fields.Country as string,
      shortCountry: r.fields['Short Country'] as string,
      teams: teamsList,
      color: COLORS[i % 10],
    }

    teamsList.forEach((team) => {
      if (!teams[team]) teams[team] = []
      teams[team].push(person)
    })
  })

  // Sort people within each team
  Object.keys(teams).forEach((team) => {
    teams[team].sort((a, b) => a.name.localeCompare(b.name))
  })

  return teams
}
