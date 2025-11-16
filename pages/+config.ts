import type { Config } from 'vike/types'
import vikeReact from 'vike-react/config'

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/head-tags
  title: 'SYDevelopers',
  description: 'Fundraising website for SYDevelopers',

  // Enable SSG (Static Site Generation)
  // Pages are pre-rendered at build time to static HTML
  prerender: true,

  // vikePhoton is NOT needed for SSG!
  // It's only for SSR (Server-Side Rendering) with Cloudflare Workers
  // Cloudflare Pages Functions in functions/ work independently
  extends: [vikeReact],
} satisfies Config
