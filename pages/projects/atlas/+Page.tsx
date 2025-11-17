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
          <AvatarImage src="/images/sahaj-atlas/logo.webp" alt="Sahaj Atlas Logo" />
        </Avatar>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">The Sahaj Atlas Project</h1>
          <a
            href="https://atlas.sydevelopers.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-1"
          >
            atlas.sydevelopers.com
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <Separator />

      {/* Content */}
      <div className="prose prose-sm max-w-none space-y-8">
        <p className="text-lg text-muted-foreground">
          A central repository of all Sahaj public programs worldwide.
        </p>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">What is Sahaj Atlas?</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              There are many Sahaj websites out there with old public program information. Even
              when the information is updated, it quickly becomes outdated again. On top of that
              most website show the programs in a long difficult to navigate list - as opposed a
              map.
            </p>
            <p>
              Realisation tours, and international Sahaj websites need a reliable place to refer
              seekers so that they can make it to local programs.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">A Reuseable World Map</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              We&apos;ve created a map where seekers can search for programs worldwide. It is
              mobile-friendly, easy to search, and has a slick modern design. Seekers can register
              for the class and view images of the class if available.
            </p>
            <p>
              This map is designed so that it can be added to any Sahaj website. The style of the
              map can be adjusted match the website, and the map can be restricted to only show
              one country or region. Our hope is that national collectives will start using this
              map for their country&apos;s website. Then they will be committed to keeping it up
              to date, and all international Sahaj projects will benefit.
            </p>
            <p>
              To make the map easier to adopt, seekers can be directed to register on Meetup,
              Eventbrite, or Facebook instead of registering on the map directly.
            </p>
            <p>
              For more advanced technical usage, the data of Sahaj Atlas can also be accessed via
              an API.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Database Management</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              New programs can be entered into the database using a custom administrative website.
              A manager can be set up for each country, who can then delegate access to specific
              regions to other yogis. This way each country and local collective can manage the
              events in their area.
            </p>
            <p>
              To make sure the map stays up to date an automatic email will be sent to local
              program managers every 2 months or so. In this email they will be asked to confirm
              that the program details are still correct. Programs which are not confirmed will be
              removed from the map until they are updated.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Registration Follow-ups</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              When seekers register on Sahaj Atlas, they give us their email address. We will then
              send them a reminder email just before the class. We can also use these email
              addresses to promote programs to those seekers.
            </p>
            <p>
              For example, if a seeker attends a big concert, we can then send them an email
              suggesting a few follow-up classes in their area after the concert.
            </p>
            <p>The email list will also be sent to the local yogi running the program.</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Useful Links</h2>
          <div className="flex flex-col gap-2">
            <Button asChild variant="outline" className="justify-start">
              <a
                href="https://wemeditate.com/map?preview=true"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Sahaj Atlas on We Meditate
              </a>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <a
                href="https://atlas.sydevelopers.com/statistics"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Sahaj Atlas Statistics
              </a>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <a href="https://github.com/sydevs/Atlas" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Sahaj Atlas on GitHub
              </a>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <a href="https://www.sydevelopers.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Donate to Sahaj Atlas
              </a>
            </Button>
          </div>
        </div>

        <Separator />

        <div className="text-muted-foreground">
          <p>
            If you have questions, would like to help with development, or need help embedding
            the map on your website, please email{' '}
            <a href="mailto:contact@sydevelopers.com" className="text-primary hover:underline">
              contact@sydevelopers.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
