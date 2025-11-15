import { useData } from 'vike-react/useData'
import { Card, CardContent } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { ChevronRightIcon, UserGroupIcon } from '@heroicons/react/24/solid'
import { getHeroicon, getCategoryColors } from '../../../lib/heroicons'
import type { Data } from './+data'

export default function Page() {
  const { jobsByCategory, teams } = useData<Data>()

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Sahaj Web Volunteering</h1>
      <p className="mb-2 italic">Help us build a strong digital campaign to spread Sahaja Yoga.</p>
      <p className="mb-4">
        Many yogis volunteer for{' '}
        <a
          href="https://wemeditate.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline"
        >
          We Meditate
        </a>{' '}
        and its related projects, but there&apos;s much more than we can manage alone!
      </p>
      <ul className="mb-8 list-inside list-disc space-y-1">
        <li>
          If you&apos;re ready to take responsibility to make part of this project successful,
          please get in touch. Enthusiasm is as important as skill.
        </li>
        <li>
          If you need resume-worthy work, look no further. You&apos;re being given meaningful
          responsibility and a great opportunity to develop skills.
        </li>
      </ul>

      <h3 className="mb-4 border-t pt-6 text-xl font-bold">Our Current Team</h3>
      <div className="mb-8 space-y-2">
        {Object.entries(teams).map(([team, people]) => (
          <div key={team} className="flex items-start gap-4">
            <div className="flex min-w-[150px] items-center gap-2">
              <UserGroupIcon className="h-5 w-5 text-gray-500" />
              <span className="font-medium">{team}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {people.map((person, i) => (
                <Badge key={i} variant="outline">
                  {person.name.split(' ')[0]} - {person.shortCountry}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-4 border-t pt-6 text-xl font-bold">Jobs</h2>
      <div className="mb-6 flex flex-wrap gap-2">
        {Object.entries(jobsByCategory).map(([category, jobs]) => {
          const colors = getCategoryColors(category)
          return (
            <a key={category} href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}>
              <Badge className={colors.badge}>
                {category.toUpperCase()}
                <span className="ml-2 rounded-full bg-white px-1.5 text-xs">{jobs.length}</span>
              </Badge>
            </a>
          )
        })}
      </div>

      {Object.entries(jobsByCategory).map(([category, jobs]) => {
        const colors = getCategoryColors(category)
        return (
          <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="mb-8">
            <h3 className={`mb-2 text-sm font-semibold ${colors.text}`}>
              {category.toUpperCase()}
            </h3>
            {category.toLowerCase() === 'development' && (
              <p className="mb-3 text-sm text-gray-600">
                For most of these roles we expect that you have some prior skills.
              </p>
            )}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {jobs
                .sort((a, b) => (a.priority || 'z').localeCompare(b.priority || 'z'))
                .map((job) => {
                  const JobIcon = getHeroicon(job.icon || 'briefcase', 'outline')
                  return (
                    <a key={job.id} href={`/jobs/${job.id}`}>
                      <Card
                        className={`relative transition-all ${colors.border} ${colors.hover} hover:shadow-md`}
                      >
                        <CardContent className="flex items-center gap-3 p-4">
                          <JobIcon className={`h-10 w-10 shrink-0 ${colors.icon}`} />
                          {job.priority && (
                            <Badge
                              variant={job.priority === 'Critical' ? 'destructive' : 'secondary'}
                              className="absolute right-2 top-2 text-xs"
                            >
                              {job.priority.toLowerCase()}
                            </Badge>
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold">{job.name}</h4>
                            <p className="text-sm text-gray-600">{job.brief.toLowerCase()}</p>
                          </div>
                          <ChevronRightIcon className="h-5 w-5 shrink-0 text-gray-400" />
                        </CardContent>
                      </Card>
                    </a>
                  )
                })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
