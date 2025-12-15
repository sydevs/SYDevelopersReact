import { useData } from 'vike-react/useData'
import { useState, useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Users } from 'lucide-react'
import type { Data } from './+data'

import { CategoryFilter } from './CategoryFilter'
import { ProjectFilter } from './ProjectFilter'
import { JobList } from './JobList'

export default function Page() {
  const { jobs, jobsByCategory, jobsByProject, projects } = useData<Data>()
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = useMemo(
    () => Object.keys(jobsByCategory),
    [jobsByCategory],
  )

  const projectsWithJobs = useMemo(
    () =>
      Object.keys(jobsByProject).sort((a, b) => {
        if (a === 'All Projects') return 1
        if (b === 'All Projects') return -1
        return a.localeCompare(b)
      }),
    [jobsByProject],
  )

  const filteredJobs = useMemo(() => {
    let result = jobs

    if (selectedProject) {
      result = result.filter(
        (job) => (job.project || 'All Projects') === selectedProject,
      )
    }

    if (selectedCategory) {
      result = result.filter((job) => job.category === selectedCategory)
    }

    return result.sort((a, b) => a.name.localeCompare(b.name))
  }, [jobs, selectedProject, selectedCategory])

  const getCategoryCount = (category: string | null) => {
    const baseJobs = selectedProject
      ? jobs.filter(
          (job) => (job.project || 'All Projects') === selectedProject,
        )
      : jobs

    if (category === null) return baseJobs.length
    return baseJobs.filter((job) => job.category === category).length
  }

  const getProjectJobCount = (project: string | null) => {
    if (project === null) return jobs.length
    return jobsByProject[project]?.length || 0
  }

  return (
    <>
      {/* Hero Section */}
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src="/images/logo.webp" alt="Sahaj Web Projects Logo" />
        </Avatar>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Sahaj Web Volunteering
          </h1>
          <p className="text-muted-foreground">
            Help us build a strong digital campaign to spread Sahaja Yoga
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="prose prose-sm max-w-none space-y-4">
        <p className="text-foreground/80">
          Numerous yogis are already volunteering their time for{' '}
          <a href="/" rel="noopener noreferrer">
            Sahaj Projects
          </a>{' '}
          , but there's so more that needs to be done to reach seekers online.
        </p>
        <ul className="space-y-2 text-foreground/80 list-disc pl-5">
          <li>
            If you&apos;re ready to take responsibility to make part of this
            project successful, please get in touch. Enthusiasm is as important
            as skill.
          </li>
          <li>
            If you need resume-worthy work, look no further. You&apos;re being
            given meaningful responsibility and a great opportunity to develop
            skills.
          </li>
        </ul>
        <Button asChild variant="outline" className="gap-2 bg-inherit">
          <a href="/jobs/teams">
            <Users className="h-4 w-4" />
            Meet Our Team
          </a>
        </Button>
      </div>

      {/* Jobs Dashboard */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Job Dashboard</h2>

          <ProjectFilter
            projects={projects}
            projectsWithJobs={projectsWithJobs}
            selectedProject={selectedProject}
            onSelectProject={setSelectedProject}
            getProjectJobCount={getProjectJobCount}
            totalJobCount={jobs.length}
          />
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          getCategoryCount={getCategoryCount}
        />

        <JobList
          jobs={filteredJobs}
          projects={projects}
          selectedCategory={selectedCategory}
        />
      </div>
    </>
  )
}
