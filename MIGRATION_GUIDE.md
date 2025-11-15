# SYDevelopers Migration Guide

## ✅ Completed

1. **Project Setup**
   - ✅ Initialized Vike with React, TypeScript, Tailwind CSS, shadcn/ui, Cloudflare, ESLint, Prettier
   - ✅ Installed dependencies: airtable, stripe, @heroicons/react
   - ✅ Added shadcn components: button, card, badge, accordion, progress, alert

2. **Core Infrastructure**
   - ✅ Type definitions (`types/airtable.ts`, `types/stripe.ts`)
   - ✅ Airtable data fetchers (`lib/airtable.ts`)
   - ✅ Stripe client utilities (`lib/stripe-client.ts`)
   - ✅ Cloudflare Function for donation stats (`functions/api/donation-stats.ts`)

3. **Components**
   - ✅ Navigation component with Heroicons
   - ✅ DonationStats component (client-side)
   - ✅ Updated Layout component

4. **Pages Implemented**
   - ✅ Homepage (`pages/index/+Page.tsx`) - with project cards
   - ✅ Funds page (`pages/funds/+Page.tsx`) - with dual Stripe Buy Buttons
   - ⏳ Jobs index page (data file created, need UI)
   - ⏳ Job detail page (need to create)
   - ⏳ Policy page (need to copy content)
   - ⏳ Project pages (need to copy content from old site)

## 🚧 Remaining Tasks

### 1. Complete Jobs Pages

**Jobs Index (`pages/jobs/index/+Page.tsx`)**
```tsx
import { useData } from 'vike-react/useData'
import { Card, CardContent } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { ArrowLeftIcon, BriefcaseIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import type { Data } from './+data'

// Helper functions
const categoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Development': 'bg-blue-100 text-blue-800',
    'Design': 'bg-purple-100 text-purple-800',
    'Content': 'bg-green-100 text-green-800',
    'Marketing': 'bg-orange-100 text-orange-800',
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}

const teamIcon = (team: string) => {
  const icons: Record<string, string> = {
    'Development': 'code',
    'Design': 'palette',
    'Content': 'document-text',
    'Marketing': 'megaphone',
  }
  return icons[team] || 'users'
}

export default function Page() {
  const { jobsByCategory, teams } = useData<Data>()

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Sahaj Web Volunteering</h1>
      <p className="italic mb-2">Help us build a strong digital campaign to spread Sahaja Yoga.</p>
      <p className="mb-4">
        Many yogis volunteer for <a href="https://wemeditate.com" target="_blank" rel="noopener" className="text-blue-600 hover:underline">We Meditate</a> and its related projects, but there's much more than we can manage alone!
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>If you're ready to take responsibility to make part of this project successful, please get in touch. Enthusiasm is as important as skill.</li>
        <li>If you need resume-worthy work, look no further. You're being given meaningful responsibility and a great opportunity to develop skills.</li>
      </ul>
      <p className="mb-6">
        <a href="/" className="inline-flex items-center text-sm text-blue-600 hover:underline">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back
        </a>
      </p>

      <h3 className="text-xl font-bold text-teal-600 border-t pt-6 mb-4">Our Current Team</h3>
      <div className="mb-8 space-y-2">
        {Object.entries(teams).map(([team, people]) => (
          <div key={team} className="flex gap-4 items-start">
            <div className="flex items-center gap-2 min-w-[150px]">
              <BriefcaseIcon className="h-5 w-5" />
              <span className="font-medium">{team}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {people.map((person, i) => (
                <Badge key={i} variant="outline">
                  {person.name.split(' ')[0]} - {person.shortCountry}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-teal-600 border-t pt-6 mb-4">Jobs</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(jobsByCategory).map(([category, jobs]) => (
          <a key={category} href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}>
            <Badge className={categoryColor(category)}>
              {category.toUpperCase()}
              <span className="ml-2 rounded-full bg-white px-1.5 text-xs">{jobs.length}</span>
            </Badge>
          </a>
        ))}
      </div>

      {Object.entries(jobsByCategory).map(([category, jobs]) => (
        <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">{category.toUpperCase()}</h3>
          {category.toLowerCase() === 'development' && (
            <p className="text-sm text-muted-foreground mb-3">For most of these roles we expect that you have some prior skills.</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {jobs
              .sort((a, b) => (a.priority || 'z').localeCompare(b.priority || 'z'))
              .map((job) => (
                <a key={job.id} href={`/jobs/${job.id}`}>
                  <Card className="transition-all hover:shadow-md hover:border-teal-400">
                    <CardContent className="flex items-center gap-3 p-4">
                      <BriefcaseIcon className="h-10 w-10 text-teal-400" />
                      {job.priority && (
                        <Badge variant={job.priority === 'Critical' ? 'destructive' : 'secondary'} className="absolute top-2 right-2 text-xs">
                          {job.priority.toLowerCase()}
                        </Badge>
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold">{job.name}</h4>
                        <p className="text-sm text-muted-foreground">{job.brief.toLowerCase()}</p>
                      </div>
                      <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </a>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
```

**Job Detail (`pages/jobs/@id/+data.ts`)**
```tsx
import { fetchJob } from '../../../lib/airtable'
import type { PageContextServer } from 'vike/types'

export type Data = Awaited<ReturnType<typeof data>>

export async function data(pageContext: PageContextServer) {
  const job = await fetchJob(pageContext.routeParams.id)

  if (!job) {
    throw new Error('Job not found')
  }

  return { job }
}
```

**Job Detail (`pages/jobs/@id/+Page.tsx`)**
```tsx
import { useData } from 'vike-react/useData'
import { Card, CardContent } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import type { Data } from './+data'

export default function Page() {
  const { job } = useData<Data>()

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <p className="mb-4">
        <a href="/jobs" className="inline-flex items-center text-sm text-blue-600 hover:underline">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Jobs
        </a>
      </p>

      <Badge className="mb-4">{job.category}</Badge>
      <h1 className="text-3xl font-bold mb-2">{job.name}</h1>
      <p className="text-lg text-muted-foreground mb-6">{job.brief}</p>

      <Card>
        <CardContent className="p-6">
          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: job.description }} />
        </CardContent>
      </Card>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold mb-2">Interested?</h3>
        <p className="text-sm mb-4">
          If you'd like to apply for this role, please email us at{' '}
          <a href="mailto:contact@sydevelopers.com" className="text-blue-600 hover:underline">
            contact@sydevelopers.com
          </a>
        </p>
      </div>
    </div>
  )
}
```

### 2. Copy Project Pages

You need to read the content from the original Slim files and create React versions. For each page:

1. Read `/Users/devindra/Documents/Projects/SYDevelopers/app/views/projects/{name}.html.slim`
2. Create `/Users/devindra/Documents/Projects/SYDevelopersReact/pages/projects/{name}/+Page.tsx`
3. Convert Slim syntax to React/JSX
4. Replace Semantic UI classes with Tailwind equivalents

Example structure for a project page:
```tsx
export default function Page() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">[Project Name]</h1>
      {/* Copy and convert content here */}
    </div>
  )
}
```

### 3. Copy Policy Page

Read `/Users/devindra/Documents/Projects/SYDevelopers/app/views/application/policy.html.slim` and create:
`/Users/devindra/Documents/Projects/SYDevelopersReact/pages/policy/+Page.tsx`

### 4. Copy and Optimize Images

```bash
# From the old project directory
cd /Users/devindra/Documents/Projects/SYDevelopers/app/assets/images

# Find all used images
# Copy logo.png and project icons
cp logo.png /Users/devindra/Documents/Projects/SYDevelopersReact/public/images/

# Convert to WebP using ImageMagick or similar
# Example:
convert logo.png -quality 90 logo.webp
```

Then update image paths in components to use `/images/logo.webp`

### 5. Configure Environment Variables

Create `.env.local`:
```env
AIRTABLE_KEY=your_key_here
AIRTABLE_BASE=your_base_here
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51HQqi7K5E1L5TSuqteyptETR4hx20IfM3XD1OOjCR9iu9SGDqMMpxW7ahtoDtkSE9GIZ6a8kSOsEluBHiqmR4shl00VTFGdkvi
```

### 6. Add robots.txt

Create `/Users/devindra/Documents/Projects/SYDevelopersReact/public/robots.txt`:
```
User-agent: *
Disallow: /
```

### 7. Update wrangler.toml

```toml
name = "sydevelopers"
compatibility_date = "2025-11-15"
main = "virtual:photon:cloudflare:server-entry"

[[env.production.vars]]
# Add any environment variables here
```

### 8. Test Locally

```bash
cd /Users/devindra/Documents/Projects/SYDevelopersReact
pnpm dev
```

Visit `http://localhost:3000` and test all pages.

### 9. Deploy to Cloudflare Pages

1. Create GitHub repository
2. Push code to GitHub
3. Connect Cloudflare Pages to the repository
4. Set environment variables in Cloudflare Pages dashboard:
   - `AIRTABLE_KEY`
   - `AIRTABLE_BASE`
   - `PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY` (for the Function)
5. Deploy

### 10. Create GitHub Issue for Airtable Webhook

Create an issue in the new repo:

**Title:** Automate rebuilds with Airtable webhook

**Body:**
```markdown
## Feature Request: Automatic Rebuilds via Airtable Webhook

### Description
Set up automatic Cloudflare Pages rebuilds when Airtable data changes (Jobs or Projects tables).

### Implementation Steps
1. Create Airtable Automation that triggers on record updates in Jobs/Projects tables
2. Configure it to call Cloudflare Pages Deploy Hook
3. Test that changes trigger rebuilds

### Resources
- [Airtable Automations](https://support.airtable.com/docs/getting-started-with-airtable-automations)
- [Cloudflare Pages Deploy Hooks](https://developers.cloudflare.com/pages/configuration/deploy-hooks/)

### Priority
Low - Manual redeployment is acceptable for now given infrequent changes
```

## 📝 Notes

- All Stripe checkout is handled by Stripe Buy Buttons (no server-side code needed)
- Donation stats are fetched from Cloudflare Function at `/api/donation-stats`
- All pages are pre-rendered at build time (SSG)
- No database - all data from Airtable
- Heroicons used throughout (no emojis)
- shadcn/ui components for all UI elements
