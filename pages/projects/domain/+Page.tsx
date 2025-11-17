import { Separator } from '@/components/ui/separator'
import { Check } from 'lucide-react'

export default function Page() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">WeMeditate.com Fundraising Drive</h1>
      </div>

      <Separator />

      {/* Content */}
      <div className="prose prose-sm max-w-none space-y-8">
        <div className="space-y-4 text-muted-foreground">
          <p>
            We Meditate has had around 300,000 unique visitors in the last year. More than 2,500
            people have signed up for live meditation reminders and been meditating with us
            regularly. Around 200 people have attended going deeper courses. Getting people to
            attend such courses has been as simple as sending an email, as we already have an
            engaged, constantly growing audience of seekers!
          </p>
          <p>
            But this is all far less than the goal of We Meditate, which is to work on a strong
            strategy to bring hundreds of thousands of people from around the world to this
            resource, giving them realisation, meditating with them online, and ultimately
            bringing them to local meetings and centers. A platform like this needs a strong,
            easily remembered domain name.
          </p>
          <p>
            Below are a few of the key points as to why we are raising the money to buy the{' '}
            <em>wemeditate.com</em> website address.
          </p>
        </div>

        <div className="space-y-4">
          <ul className="space-y-4">
            <li className="flex gap-3">
              <Check className="mt-1 h-5 w-5 shrink-0 text-green-600" />
              <div className="text-muted-foreground">
                <strong className="text-foreground">Familiarity</strong>
                <p className="mt-1">
                  When told a website address, people will often forget the exact address, but
                  they will remember the general name (ie. &quot;We Meditate&quot;). Then they
                  will just assume that assume that the address ends with <em>.com</em> because
                  this is the most common and website address. You may have even experienced this
                  yourself.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <Check className="mt-1 h-5 w-5 shrink-0 text-green-600" />
              <div className="text-muted-foreground">
                <strong className="text-foreground">Protection</strong>
                <p className="mt-1">
                  The current owner of the <em>wemeditate.com</em> address has agreed to sell it
                  to us, but is in fact a Mindfulness coach who is considering selling courses
                  using this domain name. We need to secure the domain to avoid confusion, the
                  spread of false knowledge, and others from profiting off of the advancement we
                  make with We Meditate.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <Check className="mt-1 h-5 w-5 shrink-0 text-green-600" />
              <div className="text-muted-foreground">
                <strong className="text-foreground">Google Optimisation and Credibility</strong>
                <p className="mt-1">
                  A simple and familiar domain name (like .com) gives a sense of legitimacy and
                  trustworthiness. This is very important to make it possible for We Meditate to
                  appear high on the list when people search for meditation on Google. In order to
                  rank high on Google, we need other website owners to see us as trustworthy and
                  link to We Meditate from their websites. This would mean that thousands of
                  people who search for meditation related questions on Google would be sent to a
                  Sahaj resource.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Cost</h2>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-1 text-muted-foreground">
                <p className="mb-4">
                  We have negotiated with the current owner of the <em>wemeditate.com</em> address
                  for over 2 years now, and managed to bring the cost down by 20%. This cost may
                  still seem very high, but unfortunately that is simply the value of a short,
                  memorable, and relevant domain name like wemeditate.com
                </p>
                <p>
                  Were we to seek other domain names that have similar simplicity and relevance we
                  would be facing similar costs.
                </p>
              </div>
              <div className="text-center md:text-right">
                <div className="text-4xl font-bold">$7,948</div>
                <div className="text-sm text-muted-foreground mb-4">Raised</div>
                <div className="h-3 w-full md:w-48 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full bg-green-500" style={{ width: '41.4%' }} />
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  negotiated price: $19,200
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Importance of We Meditate</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              There are many Sahaj websites out there, but none have a coherent and focused
              strategy for bringing seekers en masse from the internet. Very few Sahaj websites
              have a similar level of professional quality.
            </p>
            <p>
              Our earnest desire with this website is to create a resource that will draw seekers
              to Sahaja Yoga at a scale that no other Sahaj project has managed to, and we are
              committed to making this project succeed over the long term. To build the kind of
              internet authority that is needed to attract hundreds of thousands of daily visitors
              is a large investment of effort that will take some time to achieve, and the{' '}
              <em>wemeditate.com</em> domain is a part of making that effort successful.
            </p>
            <p>
              You can read more about the We Meditate Project{' '}
              <a href="/projects/wemeditate" className="text-primary hover:underline">
                here
              </a>
              .
            </p>
          </div>
        </div>

        <Separator />

        <div className="text-muted-foreground">
          <p className="font-semibold text-foreground">
            Please consider donating towards this effort.
          </p>
          <p>
            If you would like to donate, or have any questions, please email{' '}
            <a href="mailto:admin@wemeditate.co" className="text-primary hover:underline">
              admin@wemeditate.co
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
