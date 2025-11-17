import { useData } from 'vike-react/useData'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Wrench, Pencil, Newspaper, Smartphone, Video, Share2, ChevronRight } from 'lucide-react'
import type { Data } from './+data'

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

export default function Page() {
  const { jobsByCategory, teams } = useData<Data>()

  // Get all jobs from all categories for the "All Jobs" tab
  const allJobs = Object.values(jobsByCategory)
    .flat()
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <>
      {/* Hero Section */}
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src="/images/logo.webp" alt="Sahaj Web Projects Logo" />
        </Avatar>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Sahaj Web Volunteering</h1>
          <p className="text-muted-foreground">
            Help us build a strong digital campaign to spread Sahaja Yoga
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="prose prose-sm max-w-none space-y-4">
        <p className="text-foreground/80">
          Many yogis volunteer for{' '}
          <a href="https://wemeditate.com" target="_blank" rel="noopener noreferrer">
            We Meditate
          </a>{' '}
          and its <a href="/">related projects</a> , but there&apos;s much more than we can manage
          alone!
        </p>
        <ul className="space-y-2 text-foreground/80 list-disc pl-5">
          <li>
            If you&apos;re ready to take responsibility to make part of this project successful,
            please get in touch. Enthusiasm is as important as skill.
          </li>
          <li>
            If you need resume-worthy work, look no further. You&apos;re being given meaningful
            responsibility and a great opportunity to develop skills.
          </li>
        </ul>
      </div>

      {/* Jobs and Team Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent p-0 my-3">
          <TabsTrigger value="all" className="bg-secondary/20">
            All Jobs
          </TabsTrigger>
          {Object.keys(jobsByCategory).map((category) => (
            <TabsTrigger key={category} value={category.toLowerCase()} className="bg-secondary/20">
              {category} ({jobsByCategory[category].length})
            </TabsTrigger>
          ))}
          <TabsTrigger value="team" className="bg-secondary/20">
            Current Team
          </TabsTrigger>
        </TabsList>

        {/* All Jobs Tab */}
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allJobs.map((job) => (
              <a key={job.id} href={`/jobs/${job.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
                  <CardHeader className="flex-1">
                    <CardTitle className="text-lg">{job.name}</CardTitle>
                    <CardDescription>{job.brief}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="w-full justify-between">
                      <span>View Details</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    {job.priority && (
                      <Badge
                        variant={job.priority === 'Critical' ? 'destructive' : 'secondary'}
                        className="ml-2 shrink-0"
                      >
                        {job.priority}
                      </Badge>
                    )}
                  </CardFooter>
                </Card>
              </a>
            ))}
          </div>
        </TabsContent>

        {/* Current Team Tab */}
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardContent className="pt-6 space-y-4">
              {Object.entries(teams).map(([team, people]) => {
                const TeamIcon = getTeamIcon(team)
                return (
                  <div key={team} className="space-y-2">
                    <div className="flex items-center gap-2 font-semibold">
                      <TeamIcon className="h-4 w-4" />
                      <span>{team}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pl-6">
                      {people.map((person, i) => (
                        <Badge key={i} variant="outline">
                          {person.name.split(' ')[0]} • {person.shortCountry}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Job Category Tabs */}
        {Object.entries(jobsByCategory).map(([category, jobs]) => (
          <TabsContent key={category} value={category.toLowerCase()} className="space-y-4">
            {category.toLowerCase() === 'development' && (
              <p className="text-sm text-muted-foreground text-center">
                For most of these technical roles we expect that you have some prior skills.
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs
                .sort((a, b) => (a.priority || 'z').localeCompare(b.priority || 'z'))
                .map((job) => (
                  <a key={job.id} href={`/jobs/${job.id}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
                      <CardHeader className="flex-1">
                        <CardTitle className="text-lg">{job.name}</CardTitle>
                        <CardDescription>{job.brief}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex items-center justify-between">
                        <Button variant="ghost" size="sm" className="w-full justify-between">
                          <span>View Details</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        {job.priority && (
                          <Badge
                            variant={job.priority === 'Critical' ? 'destructive' : 'secondary'}
                            className="ml-2 shrink-0"
                          >
                            {job.priority}
                          </Badge>
                        )}
                      </CardFooter>
                    </Card>
                  </a>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}
