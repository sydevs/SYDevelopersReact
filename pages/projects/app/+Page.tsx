export default function Page() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <img
          src="/images/mobile-app/logo.webp"
          alt="We Meditate App Logo"
          className="mx-auto mb-4 h-24 w-24 rounded-full border"
        />
        <h1 className="mb-2 text-2xl font-semibold">The We Meditate App</h1>
      </div>

      <div className="space-y-6">
        <p>
          A professional quality iOS and Android app to introduce seekers to Sahaja Yoga, and
          supporting intermediate seekers in public programs.
        </p>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Why develop this app?</h2>
          <p className="mb-3">
            Increasingly people who are interested meditation look for a phone app as their first
            interest in meditation. This is especially true amongst the younger more technically
            savvy population. The idea of trying meditation is increasingly popular. Free meditation
            apps are an accessible solution for people who don&apos;t want to commit to a class.
          </p>
          <p className="mb-3">
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

        <div>
          <h2 className="mb-2 text-xl font-semibold">Guided Meditations Library</h2>
          <p className="mb-3">
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

        <div>
          <h2 className="mb-2 text-xl font-semibold">Directing Seekers to Programs</h2>
          <p className="mb-3">
            Although this will not be ready in the first iteration of the app, it will be possible
            to use the app to direct seekers to attend local public programs. The first step would
            be to integrate the app with the{' '}
            <a href="/atlas" className="text-indigo-600 hover:underline">
              Sahaj Atlas
            </a>{' '}
            project, in order to list all public programs world wide.
          </p>
          <p>
            An even more advanced implementation would allow us to send notifications to users&apos;
            phones when there is a special event in their area, or when they travel to a new
            location.
          </p>
        </div>

        <div className="border-t pt-6">
          <p className="text-sm">
            If you have further questions or would like to help with development, please write to{' '}
            <a href="mailto:contact@sydevelopers.com" className="text-indigo-600 hover:underline">
              contact@sydevelopers.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
