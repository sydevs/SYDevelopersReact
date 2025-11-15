export default function Page() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <img
          src="/images/sahaj-atlas/logo.webp"
          alt="Sahaj Atlas Logo"
          className="mx-auto mb-4 h-24 w-24 rounded-full border"
        />
        <h1 className="mb-2 text-2xl font-semibold">The Sahaj Atlas Project</h1>
        <p>
          <a
            href="https://atlas.sydevelopers.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            atlas.sydevelopers.com
          </a>
        </p>
      </div>

      <div className="space-y-6">
        <p>This is a project to develop a central repository of all Sahaj public programs.</p>

        <div>
          <h2 className="mb-2 text-xl font-semibold">What is Sahaj Atlas?</h2>
          <p className="mb-3">
            There are many Sahaj websites out there with old public program information. Even when
            the information is updated, it quickly becomes outdated again. On top of that most
            website show the programs in a long difficult to navigate list - as opposed a map.
          </p>
          <p>
            Realisation tours, and international Sahaj websites need a reliable place to refer
            seekers so that they can make it to local programs.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">A Reuseable World Map</h2>
          <p className="mb-3">
            We&apos;ve created a map where seekers can search for programs worldwide. It is
            mobile-friendly, easy to search, and has a slick modern design. Seekers can register for
            the class and view images of the class if available.
          </p>
          <p className="mb-3">
            This map is designed so that it can be added to any Sahaj website. The style of the map
            can be adjusted match the website, and the map can be restricted to only show one
            country or region. Our hope is that national collectives will start using this map for
            their country&apos;s website. Then they will be committed to keeping it up to date, and
            all international Sahaj projects will benefit.
          </p>
          <p className="mb-3">
            To make the map easier to adopt, seekers can be directed to register on Meetup,
            Eventbrite, or Facebook instead of registering on the map directly.
          </p>
          <p>
            For more advanced technical usage, the data of Sahaj Atlas can also be accessed via an
            API.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Database Management</h2>
          <p className="mb-3">
            New programs can be entered into the database using a custom administrative website. A
            manager can be set up for each country, who can then delegate access to specific regions
            to other yogis. This way each country and local collective can manage the events in
            their area.
          </p>
          <p>
            To make sure the map stays up to date an automatic email will be sent to local program
            managers every 2 months or so. In this email they will be asked to confirm that the
            program details are still correct. Programs which are not confirmed will be removed from
            the map until they are updated.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Registration Follow-ups</h2>
          <p className="mb-3">
            When seekers register on Sahaj Atlas, they give us their email address. We will then
            send them a reminder email just before the class. We can also use these email addresses
            to promote programs to those seekers.
          </p>
          <p className="mb-3">
            For example, if a seeker attends a big concert, we can then send them an email
            suggesting a few follow-up classes in their area after the concert.
          </p>
          <p>The email list will also be sent to the local yogi running the program.</p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Links</h2>
          <ul className="list-inside list-disc space-y-1">
            <li>
              <a
                href="https://wemeditate.com/map?preview=true"
                className="text-indigo-600 hover:underline"
              >
                Sahaj Atlas on We Meditate
              </a>{' '}
              (embedded)
            </li>
            <li>
              <a
                href="https://atlas.sydevelopers.com/statistics"
                className="text-indigo-600 hover:underline"
              >
                Sahaj Atlas Statistics
              </a>
            </li>
            <li>
              <a href="https://github.com/sydevs/Atlas" className="text-indigo-600 hover:underline">
                Sahaj Atlas on GitHub
              </a>{' '}
              (help us with programming)
            </li>
            <li>
              <a href="https://www.sydevelopers.com" className="text-indigo-600 hover:underline">
                Donate to Sahaj Atlas
              </a>
            </li>
          </ul>
        </div>

        <div className="border-t pt-6">
          <p className="text-sm">
            If you have further questions, would like to help with development, or would like help
            embedding the map on your website, please write to{' '}
            <a href="mailto:contact@sydevelopers.com" className="text-indigo-600 hover:underline">
              contact@sydevelopers.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
