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
          <AvatarImage
            src="/images/journeyselfdiscovery/logo.webp"
            alt="Journey of Self-Discovery Logo"
          />
        </Avatar>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Journey of Self-Discovery</h1>
          <a
            href="https://sahajayoga.nl/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-1"
          >
            sahajayoga.nl
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <Separator />

      {/* Content */}
      <div className="prose prose-sm max-w-none space-y-8">
        <p className="text-lg text-muted-foreground">
          A series of 12-week courses for beginner, intermediate and advanced
          meditators.
        </p>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            What is Journey of Self-Discovery?
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              This successful series of 12-week courses for beginner,
              intermediate and advanced meditators, has been developed and
              fine-tuned in Amsterdam over the last eight and a half years by an
              enthusiastic and inspired team of Sahaja Yoga practitioners of all
              ages (including former course participants).
            </p>
            <p>
              The course shares Shri Mataji&apos;s teachings in a fresh and
              structured way. The focus lies on &apos;know yourself&apos;. We
              provide the rich knowledge of Sahaja Yoga, supported by recent
              scientific discoveries. Special emphasis is placed on the ego and
              superego, the importance of attention, vibrations, and collective
              consciousness.
            </p>
            <p>
              We dive deep into the week&apos;s topic with presentations, video
              excerpts from Shri Mataji&apos;s teachings and other supporting
              videos.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">International, Live and Online</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The courses are held online and live at meditation centres in
              Amsterdam and other countries. We have always attracted a very
              international audience, with English-speaking seekers attending
              not only from the Netherlands and other European countries and the
              UK, but from around the world.
            </p>
            <p>
              Together we hope we have created a beautiful, diverse, and
              balanced series of courses where plenty of information is
              presented to satisfy the enquiring mind and at the same time open
              the heart. This is an approach which we feel to be particularly
              appropriate and successful in the West.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Self-Paced Learning Coming Soon
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The courses are being translated into 35+ languages for
              learnsahajayoga.org. This means that all materials will be made
              available to meditators for self-paced learning, in addition to
              the option to attend the courses live.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Collaboration with Let&apos;s Meditate for 21 Days and We Meditate
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Thanks to our new collaboration with the Let&apos;s Meditate for
              21 Days team, we can now offer additional live collective
              meditations during the week, plus one-on-one mentorship to our
              course participants.
            </p>
            <p>
              We have collaborated for many years with We Meditate by referring
              our seekers to their guided meditations, website and app.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Useful Links</h2>
          <div className="flex flex-col gap-2">
            <Button asChild variant="outline" className="justify-start">
              <a
                href="https://sahajayoga.nl/en/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Journey of Self-Discovery Website
              </a>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <a
                href="https://learnsahajayoga.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Learn Sahaja Yoga (Self-Paced Courses)
              </a>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <a
                href="https://wemeditate.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                We Meditate
              </a>
            </Button>
          </div>
        </div>

        <Separator />

        <div className="text-muted-foreground">
          <p>
            If you have questions or would like to get involved, please email{' '}
            <a
              href="mailto:contact@sydevelopers.com"
              className="text-primary hover:underline"
            >
              contact@sydevelopers.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
