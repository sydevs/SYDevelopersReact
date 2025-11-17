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
          <AvatarImage src="/images/resources/logo.webp" alt="Sahaja Resources Logo" />
        </Avatar>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Sahaja Resources Catalog</h1>
          <a
            href="http://www.sahajaresources.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-1"
          >
            sahajaresources.com
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <Separator />

      {/* Content */}
      <div className="prose prose-sm max-w-none space-y-8">
        <p className="text-lg text-muted-foreground">
          A website to distribute high-quality resources that can help yogis in spreading Sahaja
          Yoga.
        </p>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Why Sahaja Resources?</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Yogis are often looking for good quality posters, handouts, excerpts of Shri
              Mataji&apos;s talks, banners and more to support their local programs. When they
              don&apos;t find good options, yogis are forced to remaking new posters all the time.
              Most yogis are not designers, and so they are usually not able to produce a high
              quality poster. This project hopes to make good quality materials available, with
              editable files to solve this problem.
            </p>
            <p>
              There were a few existing Sahaj resources websites. However they were usualy difficult
              to navigate and filled with low quality content. This new catalog contains a small
              collection of only top quality materials, which can be filtered to find exactly what
              you need.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Types of Resources</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The resources on the site are grouped into a few key categories that yogis often are
              looking for.
            </p>
            <ul className="space-y-3">
              <li>
                <strong>Materials</strong> - Handouts and presentations to be used during a public
                program.
              </li>
              <li>
                <strong>Marketing</strong> - Posters, flyers, and adverts to promote public
                programs.
              </li>
              <li>
                <strong>Lectures</strong> - Excerpts of Shri Mataji&apos;s talks which are suitable
                for seekers. Filterable by topic.
              </li>
              <li>
                <strong>Guides</strong> - Short guides on specific topics that might help with
                spreading Sahaja Yoga. E.g. &quot;How to do facebook advertising,&quot; suggestions
                for corporate programs, etc.
              </li>
              <li>
                <strong>Images</strong> - Photos of Shri Mataji, stock photos of yogis for posters,
                logos, and other graphics.
              </li>
              <li>
                <strong>Research</strong> - Scientific studies on the effects of Sahaja Yoga.
              </li>
              <li>
                <strong>Websites</strong> - A complete list of the best quality Sahaj websites and
                apps.
              </li>
            </ul>
            <p>
              Yogis can submit new resources using a form on the website. However, all the resources
              will be curated to maintain high quality, ensure that every resource in the collection
              is useful, and keep the collection small enough to easily navigate.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Editable & Translatable</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              All the resources available on the site should be provided with editable files so that
              they can be translated to other languages and the content (website, contact details,
              event details, etc) can be updated for local collectives.
            </p>
            <p>
              By default all the files will use an international website like{' '}
              <em>freemeditation.com</em>, <em>wemeditate.co</em>, or <em>shrimataji.org</em>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Useful Links</h2>
          <div className="flex flex-col gap-2">
            <Button asChild variant="outline" className="justify-start">
              <a href="http://www.sahajaresources.com/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Sahaja Resources Website
              </a>
            </Button>
          </div>
        </div>

        <Separator />

        <div className="text-muted-foreground">
          <p>
            If you have questions, please email{' '}
            <a href="mailto:contact@sydevelopers.com" className="text-primary hover:underline">
              contact@sydevelopers.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
