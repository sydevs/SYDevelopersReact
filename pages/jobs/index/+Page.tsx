import { useData } from 'vike-react/useData'
import { useState, useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Wrench,
  Pencil,
  Newspaper,
  Smartphone,
  Video,
  Share2,
  Globe,
  Briefcase,
} from 'lucide-react'
import type { Data } from './+data'

import { CategoryFilter } from './CategoryFilter'
import { ProjectFilter } from './ProjectFilter'
import { JobList } from './JobList'

// Map team names to Lucide icons
const getTeamIcon = (teamName: string) => {
  const teamLower = teamName.toLowerCase()
  if (teamLower === 'technical') return Wrench
  if (teamLower === 'past writers') return Pencil
  if (teamLower === 'editorial') return Newspaper
  if (teamLower === 'app development') return Smartphone
  if (teamLower === 'live meditations') return Video
  if (teamLower === 'social media') return Share2
  return Wrench
}

// Map team colors
const getTeamColor = (teamName: string) => {
  const teamLower = teamName.toLowerCase()
  if (teamLower === 'technical')
    return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
  if (teamLower === 'editorial')
    return 'bg-purple-500/10 text-purple-600 border-purple-500/20'
  if (teamLower === 'app development')
    return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
  if (teamLower === 'social media')
    return 'bg-pink-500/10 text-pink-600 border-pink-500/20'
  if (teamLower === 'live meditations')
    return 'bg-amber-500/10 text-amber-600 border-amber-500/20'
  return 'bg-slate-500/10 text-slate-600 border-slate-500/20'
}

export default function Page() {
  const { jobs, jobsByCategory, jobsByProject, projects, teams } =
    useData<Data>()
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showTeam, setShowTeam] = useState(false)

  // Team data calculations
  const allPeople = useMemo(() => {
    const people = new Set<string>()
    Object.values(teams).forEach((members) => {
      members.forEach((person) => people.add(person.name))
    })
    return people
  }, [teams])
  const totalVolunteers = allPeople.size

  const sortedTeams = useMemo(
    () => Object.entries(teams).sort(([a], [b]) => a.localeCompare(b)),
    [teams],
  )

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
          onSelectCategory={(category) => {
            setSelectedCategory(category)
            setShowTeam(false)
          }}
          getCategoryCount={getCategoryCount}
          showTeam={showTeam}
          onToggleTeam={() => {
            setShowTeam((prev) => !prev)
            if (!showTeam) {
              setSelectedCategory(null)
            }
          }}
          totalVolunteers={totalVolunteers}
        />

        {showTeam ? (
          <div className="space-y-6">
            {/* Teams Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {sortedTeams.map(([teamName, members]) => {
                const TeamIcon = getTeamIcon(teamName)
                const colorClasses = getTeamColor(teamName)

                return (
                  <Card key={teamName} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${colorClasses}`}>
                          <TeamIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{teamName}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {members.map((person, i) => (
                          <div
                            key={`${person.name}-${i}`}
                            className="flex items-center gap-2 bg-muted/50 rounded-full px-3 py-1.5"
                          >
                            <Avatar className="h-6 w-6">
                              <AvatarFallback
                                className="text-[10px] font-medium"
                                style={{
                                  backgroundColor: `var(--${person.color}-100, #e0e0e0)`,
                                  color: `var(--${person.color}-700, #333)`,
                                }}
                              >
                                {person.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">
                              {person.name.split(' ')[0]}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              {person.shortCountry}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Separator />

            {/* Join CTA */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="pt-6 text-center space-y-4">
                <h2 className="text-xl font-bold">Want to Join Our Team?</h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  We&apos;re always looking for passionate volunteers to help
                  with our projects. Whether you&apos;re a developer, writer,
                  designer, or just enthusiastic about spreading meditation,
                  there&apos;s a place for you.
                </p>
                <Button size="lg" onClick={() => setShowTeam(false)}>
                  <Briefcase className="h-4 w-4 mr-2" />
                  View Open Positions
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <JobList
            jobs={filteredJobs}
            projects={projects}
            selectedCategory={selectedCategory}
          />
        )}
      </div>
    </>
  )
}
