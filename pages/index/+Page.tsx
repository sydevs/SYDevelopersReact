import { useData } from 'vike-react/useData'
import { Card, CardContent } from '../../components/ui/card'
import { HeartIcon, BriefcaseIcon, ChevronRightIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import type { Data } from './+data'

export default function Page() {
  const { jobs, projects } = useData<Data>()

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="text-center mb-8">
        <img src="/images/logo.png" alt="Logo" className="mx-auto mb-4 h-32 w-32" />
        <div className="text-sm text-muted-foreground mb-2">CONTRIBUTE TO</div>
        <h1 className="text-4xl font-bold">SAHAJ WEB PROJECTS</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <a href="/funds">
          <Card className="border-red-200 transition-all hover:border-red-400 hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <HeartIcon className="h-12 w-12 text-red-400" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Donations</h3>
                <p className="text-sm font-medium text-red-600">
                  Support our projects
                </p>
              </div>
              <ChevronRightIcon className="h-6 w-6 text-muted-foreground" />
            </CardContent>
          </Card>
        </a>

        <a href="/jobs">
          <Card className="border-teal-200 transition-all hover:border-teal-400 hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <BriefcaseIcon className="h-12 w-12 text-teal-400" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Volunteering</h3>
                <p className="text-sm font-medium text-teal-600">
                  {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} need help
                </p>
              </div>
              <ChevronRightIcon className="h-6 w-6 text-muted-foreground" />
            </CardContent>
          </Card>
        </a>
      </div>

      <div className="border-t pt-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Our Projects
        </h2>
        <div className="space-y-6">
          {projects.map(
            (project) =>
              project.identifier && (
                <div key={project.id} className="flex gap-4">
                  <img
                    src={project.icon[0]?.url}
                    alt={project.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {project.url ? new URL(project.url).host : 'work in progress'}
                    </p>
                    <p className="mt-1 text-sm">{project.description}</p>
                    <a
                      href={`/${project.identifier}`}
                      className="mt-2 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                    >
                      Learn More
                      <ArrowRightIcon className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  )
}
