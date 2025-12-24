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
            src="/images/21daymeditation/logo.webp"
            alt="21 Day Course Logo"
          />
        </Avatar>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">21 Day Course</h1>
          <a
            href="https://us.sahajayoga.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-1"
          >
            us.sahajayoga.org
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <Separator />

      {/* Content */}
      <div className="prose prose-sm max-w-none space-y-8">
        <p className="text-lg text-muted-foreground">
          An intensive, powerful collective experience of meditation and
          transformation.
        </p>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">What is the 21 Day Course?</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The 21 Days online course offers an intensive, powerful collective
              experience of meditation and transformation. It begins with a
              daily program for 21 days, followed by 21 day sessions that meet
              less frequently.
            </p>
            <p>
              Participants can join live on Zoom or YouTube, or watch the
              recording on YouTube.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Program Format</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The focus is on achieving a state of thoughtless awareness, so
              meditators at all levels can join at any time. Every program has a
              topic, with a short video of Shri Mataji&apos;s talk, two guided
              meditations, live music, and a conversation about the topic. The
              course is offered in many languages.
            </p>
            <p>
              Participants can request to meet one-on-one with a Sahaja Yoga
              instructor through our mentoring program.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Useful Links</h2>
          <div className="flex flex-col gap-2">
            <Button asChild variant="outline" className="justify-start">
              <a
                href="https://us.sahajayoga.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                21 Day Course Website
              </a>
            </Button>
          </div>
        </div>

        <Separator />

        <div className="text-muted-foreground">
          <p>
            For more information, please email{' '}
            <a
              href="mailto:sy.europe.21@gmail.com"
              className="text-primary hover:underline"
            >
              sy.europe.21@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

