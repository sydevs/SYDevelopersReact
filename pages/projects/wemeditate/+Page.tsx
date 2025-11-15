import { ArrowLeftIcon } from '@heroicons/react/24/solid'

export default function Page() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <img
          src="https://wemeditate.com/favicon.png"
          alt="We Meditate Logo"
          className="mx-auto mb-4 h-24 w-24 rounded-full border"
        />
        <h1 className="mb-2 text-2xl font-semibold">The We Meditate Project</h1>
        <p>
          <a
            href="https://wemeditate.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            wemeditate.com
          </a>
        </p>
      </div>

      <div className="space-y-6">
        <p>We Meditate is an international website promoting Sahaja Yoga.</p>

        <div>
          <h2 className="mb-2 text-xl font-semibold">How is We Meditate different?</h2>
          <p className="mb-3">
            The internet is flooded with Sahaj websites, but very few of them feature professional
            quality design and engaging, well-produced visual and textual content. Amongst the high
            quality websites, none fully exploit the potential of modern day digital marketing.
          </p>
          <p className="mb-3">
            We Meditate aims to assist a seeker's journey to recognising the value of meditation and
            eventually joining a local meditation class, from discovering the website via Google
            search, from social media or from a yogi; to meditating and learning online; and finally
            to being encouraged to come to a local meeting.
          </p>
          <p>
            We Meditate is also intended to compliment other existing projects and international
            websites. Free Meditation, for example, offers more of a community aspect. It is much
            better if the first page of Google results has several top quality Sahaj websites,
            rather than just one, and these projects can support each other by linking to each
            other.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Supporting Resource for Public Programs</h2>
          <p className="mb-3">
            One of the reasons why newcomers do not establish themselves in Sahaja Yoga is that they
            do not meditate on a regular basis for long enough to experience the beauty and the
            magic of it. We Meditate aims to change that by offering the following resources:
          </p>
          <ul className="space-y-2">
            <li>
              <strong>Guided Meditations</strong>
              <p className="text-sm text-muted-foreground">
                A variety of short meditations guided by sahaja yogies, served in an a simple
                app-like interface.
              </p>
            </li>
            <li>
              <strong>Meditation Music</strong>
              <p className="text-sm text-muted-foreground">
                A curated collection of recordings by sahaja yogi artists, for newcomers who prefer
                music to guided meditations.
              </p>
            </li>
            <li>
              <strong>Web pages on Chakras, Treatments, and Shri Mataji</strong>
              <p className="text-sm text-muted-foreground">
                To learn theoretical, as well as practical sahaj knowledge.
              </p>
            </li>
            <li>
              <strong>
                Articles featuring inspiring realised souls, talks of Shri Mataji, scientific
                studies, and art and poetry by yogis
              </strong>
              <p className="text-sm text-muted-foreground">
                In this area we give more personality to the platform by displaying art and
                individual stories of sahaja yogies. We also bring in more depth by curating a
                collection of articles about realised souls from various times, and cater for the
                rational minds of some seekers by citing a variety of scientific studies about
                Sahaja Yoga.
              </p>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Guiding People to Public Programs</h2>
          <p className="mb-3">
            One of the primary goals of We Meditate is to funnel seekers who arrive on the site via
            Google, to attend a local program.
          </p>
          <p className="mb-3">
            Several techniques are being employed to increase the search ranking on Google for We
            Meditate and therefore generate more visitors to the site. Those people then proceed to
            engage with meditation content and try out guided meditations, leaving their contact
            details if they want to keep practicing meditation.
          </p>
          <p>
            We then send them automated series of emails with more meditation content, educating
            them about various aspects of Sahaja Yoga and inviting them to try more guided
            meditations, in order to experience and establish their connection. The content any user
            receives can be catered to them based on their previous activity on site. This constant
            interaction is similar to nurturing someone you meet at a class and stay in touch with.
            Finally, we send them invitations to come to their local class and emphasise the
            importance of collective meditation.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">International Translation</h2>
          <p className="mb-3">
            We Meditate is developed from the ground up to be easily translatable into any language.
            Currently 10 translations are underway into various languages (Russian, German, Italian,
            Spanish, French, Ukrainian, Armenian, etc) by local collectives.
          </p>
          <p>
            Many smaller collectives don't have the resources to create a countrywide collective,
            and others can benefit from an actively maintained website. We Meditate is a truly
            international project, pooling the resources of yogis worldwide for the design,
            development, content production, analytics and maintenance of the site.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Analytics & Sahaja Yoga Promotion</h2>
          <p>
            The beauty of the digital world is the ability to understand the users and how they
            interact with a website or an app. We have a comprehensive analytics framework in place
            allowing us to monitor the usage of our platform and therefore gradually make it more
            and more useful for newcomers on every step of their journey.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Links</h2>
          <ul className="list-inside list-disc space-y-1">
            <li>
              <a href="https://wemeditate.com" className="text-blue-600 hover:underline">
                We Meditate website
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/wemeditate.co"
                className="text-blue-600 hover:underline"
              >
                We Meditate on Instagram
              </a>
            </li>
            <li>
              <a
                href="https://github.com/sydevs/WeMeditate"
                className="text-blue-600 hover:underline"
              >
                We Meditate on GitHub
              </a>{' '}
              (help us with programming)
            </li>
            <li>
              <a href="https://www.sydevelopers.com" className="text-blue-600 hover:underline">
                Donate to We Meditate
              </a>
            </li>
          </ul>
        </div>

        <div className="border-t pt-6">
          <p className="text-sm">
            If you have further questions or would help with development, translation or content,
            please write to{' '}
            <a href="mailto:admin@wemeditate.co" className="text-blue-600 hover:underline">
              admin@wemeditate.co
            </a>
          </p>
        </div>

        <p className="mt-6">
          <a href="/" className="inline-flex items-center text-sm text-blue-600 hover:underline">
            <ArrowLeftIcon className="mr-1 h-4 w-4" />
            Back to Home
          </a>
        </p>
      </div>
    </div>
  )
}
