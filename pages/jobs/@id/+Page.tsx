import { useData } from 'vike-react/useData'
import { Card, CardContent } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '../../../components/ui/alert'
import { EnvelopeIcon } from '@heroicons/react/24/solid'
import { Markdown } from '../../../components/Markdown'
import { getHeroicon, getCategoryColors } from '../../../lib/heroicons'
import type { Data } from './+data'

export default function Page() {
  const { job } = useData<Data>()
  const colors = getCategoryColors(job.category)
  const JobIcon = getHeroicon(job.icon || 'briefcase', 'solid')

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <JobIcon className={`h-12 w-12 ${colors.icon}`} />
        <div className="flex-1">
          <Badge className={colors.badge}>{job.category}</Badge>
          <h1 className="mt-1 text-3xl font-bold">{job.name}</h1>
        </div>
      </div>

      <p className="mb-6 text-lg text-gray-600">{job.brief}</p>

      <Card className={`${colors.border}`}>
        <CardContent className="p-6">
          <Markdown content={job.description} />
        </CardContent>
      </Card>

      <Alert className="mt-8 border-indigo-200 bg-indigo-50">
        <EnvelopeIcon className="h-4 w-4 text-sky-600" />
        <AlertTitle>Interested?</AlertTitle>
        <AlertDescription>
          If you&apos;d like to apply for this role, please email us at{' '}
          <a href="mailto:contact@sydevelopers.com" className="text-sky-600 hover:underline">
            contact@sydevelopers.com
          </a>
        </AlertDescription>
      </Alert>
    </div>
  )
}
