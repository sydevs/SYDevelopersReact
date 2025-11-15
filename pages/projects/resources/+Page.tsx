export default function Page() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <img
          src="/images/resources/logo.webp"
          alt="Sahaja Resources Logo"
          className="mx-auto mb-4 h-24"
        />
        <h1 className="mb-2 text-2xl font-semibold">Sahaja Resources Catalog</h1>
        <p>
          <a
            href="http://www.sahajaresources.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 hover:underline"
          >
            sahajaresources.com
          </a>
        </p>
      </div>

      <div className="space-y-6">
        <p>
          This is a website to distribute high-quality resources that can help yogis in spreading
          Sahaja Yoga.
        </p>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Why Sahaja Resources?</h2>
          <p className="mb-3">
            Yogis are often looking for good quality posters, handouts, excerpts of Shri
            Mataji&apos;s talks, banners and more to support their local programs. When they
            don&apos;t find good options, yogis are forced to remaking new posters all the time.
            Most yogis are not designers, and so they are usually not able to produce a high quality
            poster. This project hopes to make good quality materials available, with editable files
            to solve this problem.
          </p>
          <p>
            There were a few existing Sahaj resources websites. However they were usualy difficult
            to navigate and filled with low quality content. This new catalog contains a small
            collection of only top quality materials, which can be filtered to find exactly what you
            need.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Types of Resources</h2>
          <p className="mb-3">
            The resources on the site are grouped into a few key categories that yogis often are
            looking for.
          </p>
          <ul className="space-y-2">
            <li>
              <strong>Materials</strong>
              <p className="text-sm text-muted-foreground">
                Handouts and presentations to be used during a public program.
              </p>
            </li>
            <li>
              <strong>Marketing</strong>
              <p className="text-sm text-muted-foreground">
                Posters, flyers, and adverts to promote public programs.
              </p>
            </li>
            <li>
              <strong>Lectures</strong>
              <p className="text-sm text-muted-foreground">
                Excerpts of Shri Mataji&apos;s talks which are suitable for seekers. Filterable by
                topic.
              </p>
            </li>
            <li>
              <strong>Guides</strong>
              <p className="text-sm text-muted-foreground">
                Short guides on specific topics that might help with spreading Sahaja Yoga. Eg.
                &quot;How to do facebook advertising,&quot; suggestions for corporate programs, etc.
              </p>
            </li>
            <li>
              <strong>Images</strong>
              <p className="text-sm text-muted-foreground">
                Photos of Shri Mataji, stock photos of yogis for posters, logos, and other graphics.
              </p>
            </li>
            <li>
              <strong>Research</strong>
              <p className="text-sm text-muted-foreground">
                Scientific studies on the effects of Sahaja Yoga
              </p>
            </li>
            <li>
              <strong>Websites</strong>
              <p className="text-sm text-muted-foreground">
                A complete list of the best quality Sahaj websites and apps.
              </p>
            </li>
          </ul>
          <p className="mt-3">
            Yogis can submit new resources using a form on the website. However, all the resources
            will be curated to maintain high quality, ensure that every resource in the collection
            is useful, and keep the collection small enough to easily navigate.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Editable & Translatable</h2>
          <p className="mb-3">
            All the resources available on the site should be provided with editable files so that
            they can be translated to other languages and the content (website, contact details,
            event details, etc) can be updated for local collectives.
          </p>
          <p>
            By default all the files will use an international website like{' '}
            <em>freemeditation.com</em>, <em>wemeditate.co</em>, or <em>shrimataji.org</em>
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Links</h2>
          <ul className="list-inside list-disc space-y-1">
            <li>
              <a href="http://www.sahajaresources.com/" className="text-sky-600 hover:underline">
                Sahaj Resources website
              </a>
            </li>
          </ul>
        </div>

        <div className="border-t pt-6">
          <p className="text-sm">
            If you have further questions, please write to{' '}
            <a href="mailto:contact@sydevelopers.com" className="text-sky-600 hover:underline">
              contact@sydevelopers.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
