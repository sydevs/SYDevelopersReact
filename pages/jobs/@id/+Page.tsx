import { useData } from 'vike-react/useData'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Mail, ArrowLeft } from 'lucide-react'
import { Markdown } from '../../../components/Markdown'
import type { Data } from './+data'

export default function Page() {
  const { job } = useData<Data>()

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
        <div className="flex items-center gap-3">
          <Badge>{job.category}</Badge>
          {job.priority && (
            <Badge variant={job.priority === 'Critical' ? 'destructive' : 'secondary'}>
              {job.priority}
            </Badge>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">{job.name}</h1>
        {job.brief && <p className="text-lg text-muted-foreground">{job.brief}</p>}
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
            If you'd like to apply for this role, please email us with your background and
            why you'd be a good fit.
          </p>
          <a
            href="mailto:contact@sydevelopers.com"
            className="text-primary hover:underline font-medium flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            contact@sydevelopers.com
          </a>
        </AlertDescription>
      </Alert>
    </div>
  )
}
