# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SY Developers website - a React application built with Vike (SSG mode), deployed to Cloudflare Pages. This project was migrated from Rails 5.2 to a modern serverless architecture.

**Tech Stack:** Vike (SSG) + React 19 + TypeScript + Tailwind CSS 4 + shadcn/ui + Cloudflare Pages

## Development Commands

```bash
# Development
pnpm dev                          # Start dev server with Functions (localhost:8788)
                                  # Runs: wrangler pages dev -- vike dev
                                  # Includes both pages AND Cloudflare Functions

# Building
pnpm build                        # Production build (outputs to dist/client)
pnpm preview                      # Preview production build locally

# Linting
pnpm lint                         # Run ESLint

# Deployment
pnpm deploy                       # Build and deploy to Cloudflare Pages via wrangler
npx wrangler pages deploy dist/client  # Manual deploy after build

# Utilities
pnpm shadcn                       # Add shadcn/ui components
```

## Architecture

### Hybrid Data Fetching Strategy

This app uses a **dual data-fetching approach**:

1. **Build-time (SSG):** Jobs, Projects, Teams, Expenses from Airtable
   - Fetched during `vike build` via `+data.ts` files
   - Baked into static HTML/JSON
   - Requires rebuild to update

2. **Client-side (Runtime):** Donation statistics via Cloudflare Function
   - Real-time Stripe data (last 30 days)
   - Fetched in browser from `/api/donation-stats`
   - Updates without rebuild

### Vike File-Based Routing

Routes are defined by directory structure in `pages/`:

- `pages/index/+Page.tsx` → `/`
- `pages/funds/+Page.tsx` → `/funds`
- `pages/jobs/index/+Page.tsx` → `/jobs`
- `pages/jobs/@id/+Page.tsx` → `/jobs/:id` (dynamic route)
- `pages/projects/wemeditate/+Page.tsx` → `/projects/wemeditate`

**Key files per route:**

- `+Page.tsx` - React component
- `+data.ts` - Data fetching (runs at build time)
- `+config.ts` - Route configuration (optional)

**Global files:**

- `pages/+Layout.tsx` - Shared layout wrapper
- `pages/+Head.tsx` - HTML `<head>` tags
- `pages/+config.ts` - Global Vike configuration

### Vike Configuration (Important)

[pages/+config.ts](pages/+config.ts) - This app uses **pure SSG (Static Site Generation)**:

```typescript
export default {
  prerender: true,      // Enable static site generation
  extends: [vikeReact], // No vikePhoton - not needed for SSG
}
```

**Key points:**
- All pages are pre-rendered at build time into static HTML
- No SSR (Server-Side Rendering) - no vikePhoton needed
- Pages are served as static files from Cloudflare Pages
- Functions run separately as serverless edge functions

### Cloudflare Functions

Functions live in `functions/` directory and are deployed alongside static assets:

- `functions/api/donation-stats.ts` - Stripe API proxy endpoint
- Accessed via `/api/donation-stats` URL
- Run on Cloudflare Workers (edge compute)
- Uses `PagesFunction<Env>` type for environment variables
- Requires `STRIPE_SECRET_KEY` env var (see Environment Variables section)

**Local Development:**
- Functions work automatically when running `pnpm dev`
- The dev command uses `wrangler pages dev -- vike dev`
- Wrangler serves Functions while proxying page requests to Vike
- Server runs on `http://localhost:8788` (not 3000)
- Requires `.dev.vars` file with secrets (see Environment Variables section)

### Airtable Data Fetching

[lib/airtable.ts](lib/airtable.ts) - All Airtable fetching happens here:

- `fetchJobs()` - Public jobs with filtering
- `fetchJob(id)` - Single job by ID
- `fetchProjects()` - Projects with nested expenses
- `fetchTeams()` - People grouped by teams

**Pattern:** Data fetching functions are called from `+data.ts` files, which run at build time. Results are type-safe via TypeScript.

### Stripe Integration

Uses **Stripe Buy Buttons** (no server-side checkout code):

- Monthly: `buy_btn_1STkr7K5E1L5TSuqjuFbdUKO`
- One-time: `buy_btn_1STk1QK5E1L5TSuqNdkTV2km`

The only server-side Stripe code is [functions/api/donation-stats.ts](functions/api/donation-stats.ts) for displaying stats.

## Environment Variables

This project uses **two separate environment files** for different purposes:

### Build-time Variables (.env.local)

These are used during the Vite build process and are embedded into the static assets:

```bash
AIRTABLE_KEY=your_key
AIRTABLE_BASE=your_base_id
STRIPE_PUBLISHABLE_KEY=pk_live_...
```

Copy from [.env.local.example](.env.local.example) to get started.

**How it works:**
- Vite's `define` option in [vite.config.ts](vite.config.ts) maps `process.env.*` to `import.meta.env.*`
- Variables are available in code as `import.meta.env.AIRTABLE_KEY`
- These are baked into the static build at compile time

### Function Runtime Secrets (.dev.vars)

This file contains secrets for Cloudflare Functions during local development:

```bash
STRIPE_SECRET_KEY=sk_live_...
```

**Important:**
- This file is gitignored and should NEVER be committed
- Only needed for local development with Functions
- In production, set `STRIPE_SECRET_KEY` as encrypted secret in Cloudflare dashboard
- Not processed by Vite - only used by wrangler at runtime

### Cloudflare Pages (Production)

Set in Cloudflare dashboard under **Settings → Environment Variables**:

**Build-time (regular variables):**
- `AIRTABLE_KEY` - Required for builds
- `AIRTABLE_BASE` - Required for builds
- `STRIPE_PUBLISHABLE_KEY` - Required for builds

**Function runtime (encrypted secret):**
- `STRIPE_SECRET_KEY` - Required for Functions, set as encrypted secret

## Code Patterns

### Adding a New Page

1. Create directory in `pages/` (e.g., `pages/about/`)
2. Add `+Page.tsx` with React component
3. (Optional) Add `+data.ts` if you need build-time data from Airtable
4. Add navigation link in [components/Navigation.tsx](components/Navigation.tsx)

### Adding shadcn/ui Components

```bash
pnpm shadcn add button    # Add a component
```

Components go to `components/ui/` and are auto-configured with Tailwind.

### Fetching Data at Build Time

Create a `+data.ts` file next to your `+Page.tsx`:

```typescript
import type { PageContextServer } from 'vike/types'

export type Data = Awaited<ReturnType<typeof data>>

export async function data(_pageContext: PageContextServer) {
  // Fetch from Airtable here
  return {
    /* your data */
  }
}
```

Access in component via `useData<Data>()` hook.

### Dynamic Routes

Use `@` prefix for parameters (e.g., `jobs/@id/`):

- Access params in `+data.ts` via `pageContext.routeParams.id`
- See [pages/jobs/@id/+data.ts](pages/jobs/@id/+data.ts) for example

## Important Notes

### Path Alias

The `@/` alias points to project root (configured in [vite.config.ts:24-26](vite.config.ts#L24-L26) and [tsconfig.json:21-24](tsconfig.json#L21-L24)):

```typescript
import { fetchJobs } from '@/lib/airtable'
```

### Markdown Rendering

[components/Markdown.tsx](components/Markdown.tsx) uses `marked` library to render markdown content. Use this component for any markdown strings from Airtable.

### Sentry Integration

Sentry is configured for error tracking:

- Plugin: [vite.config.ts:11-15](vite.config.ts#L11-L15)
- Sourcemaps enabled for production

### SEO

[public/robots.txt](public/robots.txt) currently **disallows all** indexing. Update this when ready to go public.

## Deployment

### Cloudflare Pages Setup

1. Build command: `pnpm build`
2. Build output: `dist/client`
3. Set environment variables in dashboard
4. Functions are auto-detected from `functions/` directory

### Triggering Rebuilds

Content updates (jobs, projects) require a rebuild since data is fetched at build time:

- **Manual:** Push to GitHub or run deploy hook
- **Future:** Set up Airtable webhook → Cloudflare deploy hook for automatic rebuilds

## Migration Context

This project was migrated from Rails 5.2. Key simplifications:

- No backend server (pure static)
- No database (Airtable replaces ActiveRecord)
- No custom Stripe checkout (using Buy Buttons)
- No ActionMailer/Sidekiq
