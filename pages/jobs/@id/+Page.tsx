import { useData } from 'vike-react/useData'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Mail, ArrowLeft } from 'lucide-react'
import { Markdown } from '../../../components/Markdown'
import type { Data } from './+data'

const DEFAULT_EMAIL = 'contact@sydevelopers.com'

export default function Page() {
  const { job } = useData<Data>()
  const contactEmail = job.contactEmail || DEFAULT_EMAIL
  const hasProjects = job.projects && job.projects.length > 0

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Back button */}
      <Button asChild variant="ghost" size="sm">
        <a href="/jobs" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </a>
      </Button>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge>{job.category}</Badge>
          {job.priority && (
            <Badge
              variant={
                job.priority === 'Critical' ? 'destructive' : 'secondary'
              }
            >
              {job.priority}
            </Badge>
          )}
        </div>

        {/* Project Icons Row */}
        {hasProjects && (
          <div className="flex items-center gap-3 flex-wrap">
            {job.projects!.map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-2 bg-muted/50 rounded-full pl-1 pr-3 py-1"
              >
                <Avatar className="h-6 w-6">
                  {project.icon ? (
                    <AvatarImage src={project.icon} alt={project.name} />
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                      {project.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  {project.name}
                </span>
              </div>
            ))}
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold">{job.name}</h1>
        {job.brief && (
          <p className="text-lg text-muted-foreground">{job.brief}</p>
        )}
      </div>

      {/* Description */}
      <Card>
        <CardContent className="pt-6">
          <Markdown content={job.description} />
        </CardContent>
      </Card>

      {/* Contact CTA */}
      <Alert>
        <Mail className="h-4 w-4" />
        <AlertTitle>Interested in this position?</AlertTitle>
        <AlertDescription className="mt-2 flex flex-col gap-4">
          <p>
            If you&apos;d like to apply for this role, please email us with your
            background and why you&apos;d be a good fit.
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="text-primary hover:underline font-medium flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            {contactEmail}
          </a>
        </AlertDescription>
      </Alert>
    </div>
  )
}
