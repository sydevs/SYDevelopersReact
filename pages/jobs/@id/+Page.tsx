import { useData } from 'vike-react/useData'
import { Card, CardContent } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '../../../components/ui/alert'
import { ArrowLeftIcon, EnvelopeIcon } from '@heroicons/react/24/solid'
import type { Data } from './+data'

export default function Page() {
  const { job } = useData<Data>()

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <p className="mb-4">
        <a href="/jobs" className="inline-flex items-center text-sm text-blue-600 hover:underline">
          <ArrowLeftIcon className="mr-1 h-4 w-4" />
          Back to Jobs
        </a>
      </p>

      <Badge className="mb-4">{job.category}</Badge>
      <h1 className="mb-2 text-3xl font-bold">{job.name}</h1>
      <p className="mb-6 text-lg text-muted-foreground">{job.brief}</p>

      <Card>
        <CardContent className="p-6">
          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: job.description }} />
        </CardContent>
      </Card>

      <Alert className="mt-8 border-blue-200 bg-blue-50">
        <EnvelopeIcon className="h-4 w-4 text-blue-600" />
        <AlertTitle>Interested?</AlertTitle>
        <AlertDescription>
          If you'd like to apply for this role, please email us at{' '}
          <a href="mailto:contact@sydevelopers.com" className="text-blue-600 hover:underline">
            contact@sydevelopers.com
          </a>
        </AlertDescription>
      </Alert>
    </div>
  )
}
