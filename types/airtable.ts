export interface Job {
  id: string
  name: string
  category: string
  brief: string
  description: string
  priority?: string
  project?: string
  contactEmail?: string
  public: boolean
}

export interface Project {
  id: string
  name: string
  identifier: string
  description: string
  url: string
  icon: string
  monthly: number
  expenses: Expense[]
}

export interface Expense {
  name: string
  description: string
  type: 'Monthly' | 'Yearly'
  monthly: number
  yearly: number
}

export interface Person {
  name: string
  initials: string
  country: string
  shortCountry: string
  teams: string[]
  color: string
}

export type Teams = Record<string, Person[]>
