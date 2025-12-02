import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ExternalLink } from 'lucide-react'

export default function Page() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src="/images/journey-self-discovery/logo.png" alt="Journey of Self Discovery Logo" />
        </Avatar>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Journey of Self Discovery</h1>
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-1"
          >
            example.com
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <Separator />

      {/* Content */}
      <div className="prose prose-sm max-w-none space-y-8">
        <p className="text-lg text-muted-foreground">
          A brief description of the Journey of Self Discovery project.
        </p>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">About this Project</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>Add detailed information about the project here.</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Useful Links</h2>
          <div className="flex flex-col gap-2">
            <Button asChild variant="outline" className="justify-start">
              <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Project Website
              </a>
            </Button>
          </div>
        </div>

        <Separator />

        <div className="text-muted-foreground">
          <p>
            If you have questions or would like to get involved, please email{' '}
            <a href="mailto:contact@sydevelopers.com" className="text-primary hover:underline">
              contact@sydevelopers.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

