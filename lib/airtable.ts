import Airtable from 'airtable'
import type { Job, Project, Person, Expense, Teams } from '../types/airtable'

const client = new Airtable({ apiKey: import.meta.env.AIRTABLE_KEY as string })
const base = client.base(import.meta.env.AIRTABLE_BASE as string)

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

export async function fetchJobs(): Promise<Job[]> {
  const records = await base('Jobs')
    .select({
      filterByFormula: 'Public = 1',
      sort: [{ field: 'Category', direction: 'asc' }],
    })
    .all()

  return records.map((r) => ({
    id: r.id,
    name: r.get('Name') as string,
    category: r.get('Category') as string,
    brief: r.get('Brief') as string,
    description: r.get('Description') as string,
    icon: r.get('Icon') as string,
    priority: r.get('Priority') as string | undefined,
    public: true,
  }))
}

export async function fetchJob(id: string): Promise<Job | null> {
  try {
    const record = await base('Jobs').find(id)
    return {
      id: record.id,
      name: record.get('Name') as string,
      category: record.get('Category') as string,
      brief: record.get('Brief') as string,
      description: record.get('Description') as string,
      icon: record.get('Icon') as string,
      priority: record.get('Priority') as string | undefined,
      public: record.get('Public') as boolean,
    }
  } catch (error) {
    console.error('Error fetching job:', error)
    return null
  }
}

export async function fetchProjects(): Promise<Project[]> {
  const projectRecords = await base('Projects')
    .select({
      filterByFormula: "Type = 'Internal'",
      sort: [{ field: 'Monthly', direction: 'desc' }],
    })
    .all()

  const projects = await Promise.all(
    projectRecords.map(async (project) => {
      const expenseIds = project.get('Expenses') as string[] | undefined
      let expenses: Expense[] = []

      if (expenseIds?.length) {
        const expenseRecords = await base('Expenses')
          .select({
            filterByFormula: `FIND(RECORD_ID(), "${expenseIds.join(',')}")`,
            sort: [{ field: 'Monthly', direction: 'desc' }],
          })
          .all()

        expenses = expenseRecords.map((r) => ({
          name: r.get('Name') as string,
          description: r.get('Description') as string,
          type: r.get('Type') as 'Monthly' | 'Yearly',
          monthly: (r.get('Monthly') as number) || 0,
          yearly: (r.get('Yearly') as number) || 0,
        }))
      }

      return {
        id: project.id,
        name: project.get('Name') as string,
        identifier: project.get('Identifier') as string,
        description: project.get('Description') as string,
        url: project.get('URL') as string,
        icon: project.get('Icon') as Array<{ url: string }>,
        monthly: (project.get('Monthly') as number) || 0,
        expenses,
      }
    }),
  )

  return projects
}

export async function fetchTeams(): Promise<Teams> {
  const records = await base('People')
    .select({
      filterByFormula: 'Public = 1',
      sort: [{ field: 'Teams', direction: 'asc' }],
    })
    .all()

  const teams: Teams = {}

  records.forEach((r, i) => {
    const teamsList = r.get('Teams') as string[]
    const name = r.get('Name') as string
    const nameParts = name.split(' ')

    const person: Person = {
      name: nameParts.map((n, idx) => (idx > 0 ? n[0] : n)).join(' '),
      initials: nameParts.map((n) => n[0]).join(''),
      country: r.get('Country') as string,
      shortCountry: r.get('Short Country') as string,
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
