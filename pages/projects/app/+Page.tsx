import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { ExternalLink } from 'lucide-react'

export default function Page() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src="/images/mobile-app/logo.svg" alt="We Meditate App Logo" />
        </Avatar>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">The We Meditate App</h1>
          <a
            href="https://wemeditate.com/app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-1"
          >
            sahajaresources.com
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <Separator />

      {/* Content */}
      <div className="prose prose-sm max-w-none space-y-8">
        <p className="text-lg text-muted-foreground">
          A professional quality iOS and Android app to introduce seekers to Sahaja Yoga, and
          supporting intermediate seekers in public programs.
        </p>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Why develop this app?</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Increasingly people who are interested meditation look for a phone app as their first
              interest in meditation. This is especially true amongst the younger more technically
              savvy population. The idea of trying meditation is increasingly popular. Free
              meditation apps are an accessible solution for people who don&apos;t want to commit to
              a class.
            </p>
            <p>
              While we don&apos;t have the marketing power to compete with apps like Headspace and
              Calm, it is within our capability to create an app of the same professional quality.
              There are a few Sahaj apps out there, but they are often difficult to navigate and
              poorly designed.
            </p>
            <p>
              Once this app is developed, it can be recommended directly to friends, in public
              programs and on realisation tours - rather than relying on advertising.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Guided Meditations Library</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The primary feature of this app will be a library of guided meditations. This is what
              most people look for in a meditation app.
            </p>
            <p>
              The plan is to start with a very small but professional app, and then expand the
              features based on user testing and feedback. Future iterations of the app may include
              tracking personal goals, and recommending guided meditations based on what the user
              tells us that they feel on their hands.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Directing Seekers to Programs</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Although this will not be ready in the first iteration of the app, it will be possible
              to use the app to direct seekers to attend local public programs. The first step would
              be to integrate the app with the{' '}
              <a href="/projects/atlas" className="text-primary hover:underline">
                Sahaj Atlas
              </a>{' '}
              project, in order to list all public programs world wide.
            </p>
            <p>
              An even more advanced implementation would allow us to send notifications to
              users&apos; phones when there is a special event in their area, or when they travel to
              a new location.
            </p>
          </div>
        </div>

        <Separator />

        <div className="text-muted-foreground">
          <p>
            If you have questions or would like to help with development, please email{' '}
            <a href="mailto:contact@sydevelopers.com" className="text-primary hover:underline">
              contact@sydevelopers.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
