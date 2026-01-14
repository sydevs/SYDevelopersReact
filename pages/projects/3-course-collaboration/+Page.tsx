import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export default function Page() {
  const handleDonation = (type: 'monthly' | 'onetime') => {
    const donationLinks = {
      monthly: 'https://donate.stripe.com/14A14ogjdfoI6zjfut33W03',
      onetime: 'https://donate.stripe.com/eVqdRa9UP90kaPzeqp33W02',
    }
    window.open(donationLinks[type], '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6">
        <div className="flex -space-x-8 rtl:space-x-reverse">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src="/images/21daymeditation/logo.webp"
              alt="Journey of Self-Discovery Logo"
            />
          </Avatar>
          <Avatar className="w-20 h-20">
            <AvatarImage
              src="/images/journeyselfdiscovery/logo.webp"
              alt="Journey of Self-Discovery Logo"
            />
          </Avatar>
          <Avatar className="w-20 h-20">
            <AvatarImage src="/images/wemeditate/logo.webp" alt="Journey of Self-Discovery Logo" />
          </Avatar>
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">3-Course Collaboration</h1>
          <a
            href="https://shrimatajifoundation.org/3-course-collaboration"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-1"
          >
            shrimatajifoundation.org
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <Separator />

      {/* Content */}
      <div className="prose prose-sm max-w-none space-y-8" id="donate">
        <p className="text-lg text-muted-foreground">
          We are delighted to announce a new collaboration between three well established and
          successful online Sahaja Yoga platforms for seekers.
        </p>

        {/* Funding Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">Donate</span>
            </CardTitle>
            <CardDescription>
              any raised funds will be divided among the 3 projects, to support promotion and
              operation to keep the projects going and reach more seekers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Button
                  size="lg"
                  className="cursor-pointer w-full text-lg h-12"
                  onClick={() => handleDonation('monthly')}
                  variant="default"
                >
                  Monthly Donation
                </Button>
                <Button
                  size="lg"
                  className="cursor-pointer w-full text-lg h-12"
                  onClick={() => handleDonation('onetime')}
                  variant="outline"
                >
                  One-Time Donation
                </Button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Contact us at{' '}
              <a className="underline" href="mailto:finances@sahajayoga.nlbb">
                finances@sahajayoga.nl
              </a>{' '}
              if you need you need to cancel a monthly donation.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">3 courses join forces!</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Mother seemed to bring us all together this summer very spontaneously! And over the
              last couple of months, we have already started working together. As a result we have
              been able to offer more opportunities to seekers to join live collective meditations
              and to receive guidance in their meditation practice through mentorship. All courses
              have had considerable success in bringing seekers to collectives around the world.
            </p>
            <p>The three courses are:</p>
            <ul>
              <li>
                <a href="/projects/wemeditate" target="_blank" rel="noopener noreferrer">
                  WeMeditate
                </a>
              </li>
              <li>
                <a href="/projects/21daymeditation" target="_blank" rel="noopener noreferrer">
                  Let&rsquo;s Meditate for 21 Days
                </a>
              </li>
              <li>
                <a href="/projects/journeyselfdiscovery" target="_blank" rel="noopener noreferrer">
                  Journey of Self-discovery
                </a>
              </li>
            </ul>
            <p>Here is a short video outlining the different courses and this initiative:</p>
            <iframe
              src="https://www.veed.io/embed/a4713139-8e9a-4503-bbe8-8ee95f4b74c1"
              width="80%"
              height="100%"
              frameborder="0"
              title="Collaboration Announcement"
              webkitallowfullscreen
              mozallowfullscreen
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">World Foundation support</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The World Foundation has kindly agreed to support us, both with an initial financial
              donation and by highlighting the collaboration on the World Foundation website, where
              you can{' '}
              <a
                href="https://shrimatajifoundation.org/3-course-collaboration"
                target="_blank"
                rel="noopener noreferrer"
              >
                find out more
              </a>
              .&nbsp;
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2>Your support is also very much needed!</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Some of you may already be supporting one or more of these courses. It is now possible
              to support all three together - financially or with time and expertise.
            </p>
            <p>
              <button
                className="underline cursor-pointer"
                onClick={() =>
                  document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <strong>Financial donations</strong>
              </button>{' '}
              will be divided equally between the three courses. They will be used to cover monthly
              subscriptions to various platforms (Brevo, Zoom, Canva etc.) plus of course marketing.
              In this way, we will be able to reach many more seekers.&nbsp;
            </p>
            <p>
              {/* <strong> */}
              <button>
                <a href="/jobs">Join our teams!</a>
              </button>{' '}
              {/* </strong> */}
              Equally importantly, our teams are always in much need of additional helping hands -
              whether to help guide a meditation, give a presentation, mentor a seeker, or to help
              behind the scenes with organisation or marketing.
            </p>
            <p>
              We hope we have inspired you to actively support this new collaboration that takes a
              unified approach to spreading Sahaja Yoga worldwide. This could be, for example, by
              making a national donation, or by inviting yogis from your sangha to contribute and
              volunteer to help.
            </p>
            <p>Do not hesitate to contact us if you have any questions or for more information!</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Useful Links</h2>
          <div className="flex flex-col gap-2">
            <Button asChild variant="outline" className="justify-start">
              <a href="https://wemeditate.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                We Meditate
              </a>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <a
                href="https://www.amruta.org/sahaja-yoga-meditation-course/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Journey of Self-Discovery
              </a>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <a href="https://us.sahajayoga.org" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                21 Day Course
              </a>
            </Button>
          </div>
        </div>

        <Separator />

        <div className="text-muted-foreground">
          <p>
            If you have questions or would like to get involved, you can contact:
            <ul>
              <li>
                Linda Taylor for Let&rsquo;s Meditate for 21 days:{' '}
                <a href="mailto:linda.taylor333@yahoo.com" className="text-primary hover:underline">
                  linda.taylor333@yahoo.com
                </a>
              </li>
              <li>
                WeMeditate team:{' '}
                <a href="mailto:contact@sydevelopers.com" className="text-primary hover:underline">
                  contact@sydevelopers.com
                </a>
              </li>
              <li>
                Journey of Self-Discovery:
                <br />
                Rafael Reina:{' '}
                <a href="mailto:r.reina108@gmail.com" className="text-primary hover:underline">
                  r.reina108@gmail.com
                </a>
                <br />
                Vanessa Goad:{' '}
                <a href="mailto:vanessagoad@gmail.com" className="text-primary hover:underline">
                  vanessagoad@gmail.com
                </a>
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  )
}
