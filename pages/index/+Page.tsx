import { useData } from 'vike-react/useData'
import { useEffect, useState } from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Heart, Briefcase, ExternalLink } from 'lucide-react'
import { fetchDonationStats, calculateFunding } from '@/lib/stripe-client'
import type { DonationStats } from '@/types/stripe'
import type { Data } from './+data'

export default function Page() {
  const { jobs, projects } = useData<Data>()
  const [stats, setStats] = useState<DonationStats | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch total expenses from projects
  const totalExpenses = projects.reduce((sum, project) => {
    return sum + project.expenses.reduce((expSum, e) => expSum + (e.monthly || 0), 0)
  }, 0)

  useEffect(() => {
    let mounted = true
    fetchDonationStats().then((data) => {
      if (mounted) {
        setStats(data)
        setLoading(false)
      }
    })
    return () => {
      mounted = false
    }
  }, [])

  const funding = calculateFunding(totalExpenses, stats)
  const fundingPercent = Math.round(funding.totalPercent)

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12 space-y-16">
      {/* Hero Section */}
      <div className="flex flex-col text-center items-center justify-center gap-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src="/images/logo.webp" alt="Sahaj Web Projects Logo" />
        </Avatar>
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Sahaj Web Projects</h1>
          <p className="text-base text-muted-foreground max-w-2xl">
            Contribute to our projects and help spread Sahaja Yoga around the world
          </p>
        </div>
      </div>

      {/* Primary CTAs */}
      <div className="flex flex-col text-center sm:flex-row gap-4 justify-center items-center sm:items-start">
        <div>
          <Button asChild variant="default" size="lg">
            <a href="/funds">
              <Heart className="mr-2 h-5 w-5" />
              Donate
            </a>
          </Button>
          {!loading && stats && (
            <div className="text-sm italic text-muted-foreground mt-2">
              {fundingPercent}% funded
            </div>
          )}
        </div>
        <div>
          <Button asChild variant="secondary" size="lg">
            <a href="/jobs">
              <Briefcase className="mr-2 h-5 w-5" />
              Volunteer
            </a>
          </Button>
          <div className="text-sm italic text-muted-foreground text-center mt-1">
            {jobs.length} {jobs.length === 1 ? 'job needed' : 'jobs needed'}
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-center">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            if (!project.identifier) return null

            return (
              <Card key={project.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    {project.icon && (
                      <img
                        src={project.icon}
                        alt={project.name}
                        className="w-12 h-12 rounded-lg object-cover"
                        loading="lazy"
                      />
                    )}
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto flex gap-2">
                  <Button asChild variant="outline" className="flex-1">
                    <a href={`/projects/${project.identifier}`}>Learn More</a>
                  </Button>
                  {project.url && (
                    <Button asChild variant="outline" size="icon">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.name}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
