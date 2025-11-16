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
          <AvatarImage src="/images/wemeditate/logo.webp" alt="We Meditate Logo" />
        </Avatar>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">The We Meditate Project</h1>
          <a
            href="https://wemeditate.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-1"
          >
            wemeditate.com
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <Separator />

      {/* Content */}
      <div className="prose prose-sm max-w-none space-y-8">
        <p className="text-lg text-muted-foreground">
          We Meditate is an international website promoting Sahaja Yoga.
        </p>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">How is We Meditate different?</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The internet is flooded with Sahaj websites, but very few of them feature professional
              quality design and engaging, well-produced visual and textual content. Amongst the
              high quality websites, none fully exploit the potential of modern day digital
              marketing.
            </p>
            <p>
              We Meditate aims to assist a seeker&apos;s journey to recognising the value of
              meditation and eventually joining a local meditation class, from discovering the
              website via Google search, from social media or from a yogi; to meditating and
              learning online; and finally to being encouraged to come to a local meeting.
            </p>
            <p>
              We Meditate is also intended to compliment other existing projects and international
              websites. Free Meditation, for example, offers more of a community aspect. It is much
              better if the first page of Google results has several top quality Sahaj websites,
              rather than just one, and these projects can support each other by linking to each
              other.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Supporting Resource for Public Programs</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              We Meditate is not meant to be a stand-alone resource. With the rise of online
              streaming it may be possible to establish a Sahaja presence fully online, but we
              fundamentally believe that people ultimately need to attend in-person meetings and
              that seekers will stay with the practice much more easily if they have the regular
              company and attention of an experienced collective. Thus, We Meditate&apos;s primary
              purpose is as a resource to introduce seekers to the value of meditation and help them
              establish a practice, with the understanding that they will soon attend programs in
              their local area.
            </p>
            <p>
              Although Sahaja Yoga itself is free, We Meditate requires donations and volunteer work
              to cover infrastructure and development costs.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Useful Links</h2>
          <div className="flex flex-col gap-2">
            <Button asChild variant="outline" className="justify-start">
              <a href="https://wemeditate.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                We Meditate Website
              </a>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <a href="https://github.com/sydevs/Atlas" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Atlas Project on GitHub
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
