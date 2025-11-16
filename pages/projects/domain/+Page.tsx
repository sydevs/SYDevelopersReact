import { Check } from 'lucide-react'

export default function Page() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">WeMeditate.com Fundraising Drive</h1>
      </div>

      <div className="space-y-6">
        <p>
          We Meditate has had around 300,000 unique visitors in the last year. More than 2,500
          people have signed up for live meditation reminders and been meditating with us regularly.
          Around 200 people have attended going deeper courses. Getting people to attend such
          courses has been as simple as sending an email, as we already have an engaged, constantly
          growing audience of seekers!
        </p>

        <p>
          But this is all far less than the goal of We Meditate, which is to work on a strong
          strategy to bring hundreds of thousands of people from around the world to this resource,
          giving them realisation, meditating with them online, and ultimately bringing them to
          local meetings and centers. A platform like this needs a strong, easily remembered domain
          name.
        </p>

        <p>
          Below are a few of the key points as to why we are raising the money to buy the{' '}
          <em>wemeditate.com</em> website address.
        </p>

        <ul className="space-y-3">
          <li className="flex gap-3">
            <Check className="mt-1 h-5 w-5 shrink-0 text-green-600" />
            <div>
              <strong>Familiarity</strong>
              <p className="text-sm text-muted-foreground">
                When told a website address, people will often forget the exact address, but they
                will remember the general name (ie. &quot;We Meditate&quot;). Then they will just
                assume that assume that the address ends with <em>.com</em> because this is the most
                common and website address. You may have even experienced this yourself.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <Check className="mt-1 h-5 w-5 shrink-0 text-green-600" />
            <div>
              <strong>Protection</strong>
              <p className="text-sm text-muted-foreground">
                The current owner of the <em>wemeditate.com</em> address has agreed to sell it to
                us, but is in fact a Mindfulness coach who is considering selling courses using this
                domain name. We need to secure the domain to avoid confusion, the spread of false
                knowledge, and others from profiting off of the advancement we make with We
                Meditate.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <Check className="mt-1 h-5 w-5 shrink-0 text-green-600" />
            <div>
              <strong>Google Optimisation and Credibility</strong>
              <p className="text-sm text-muted-foreground">
                A simple and familiar domain name (like .com) gives a sense of legitimacy and
                trustworthiness. This is very important to make it possible for We Meditate to
                appear high on the list when people search for meditation on Google. In order to
                rank high on Google, we need other website owners to see us as trustworthy and link
                to We Meditate from their websites. This would mean that thousands of people who
                search for meditation related questions on Google would be sent to a Sahaj resource.
              </p>
            </div>
          </li>
        </ul>

        <div className="border-t pt-6">
          <h2 className="mb-4 text-xl font-semibold">Cost</h2>
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <p className="mb-3">
                We have negotiated with the current owner of the <em>wemeditate.com</em> address for
                over 2 years now, and managed to bring the cost down by 20%. This cost may still
                seem very high, but unfortunately that is simply the value of a short, memorable,
                and relevant domain name like wemeditate.com
              </p>
              <p>
                Were we to seek other domain names that have similar simplicity and relevance we
                would be facing similar costs.
              </p>
            </div>
            <div className="ml-4 text-right">
              <div className="text-3xl font-bold">$7,948</div>
              <div className="text-sm text-muted-foreground">Raised</div>
              <div className="mt-2">
                <div className="h-3 w-48 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full bg-green-500" style={{ width: '41.4%' }} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">negotiated price: $19,200</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="mb-3 text-xl font-semibold">Importance of We Meditate</h2>
          <p className="mb-3">
            There are many Sahaj websites out there, but none have a coherent and focused strategy
            for bringing seekers en masse from the internet. Very few Sahaj websites have a similar
            level of professional quality.
          </p>
          <p className="mb-3">
            Our earnest desire with this website is to create a resource that will draw seekers to
            Sahaja Yoga at a scale that no other Sahaj project has managed to, and we are committed
            to making this project succeed over the long term. To build the kind of internet
            authority that is needed to attract hundreds of thousands of daily visitors is a large
            investment of effort that will take some time to achieve, and the{' '}
            <em>wemeditate.com</em> domain is a part of making that effort successful.
          </p>
          <p>
            You can read more about the We Meditate Project{' '}
            <a href="/wemeditate" className="text-sky-600 hover:underline">
              here
            </a>
            .
          </p>
        </div>

        <div className="border-t pt-6">
          <p className="font-semibold">Please consider donating towards this effort.</p>
          <p className="text-sm">
            If you would like to donate, or have any questions, please write to{' '}
            <a href="mailto:admin@wemeditate.co" className="text-sky-600 hover:underline">
              admin@wemeditate.co
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
