import type { Config } from 'vike/types'
import vikePhoton from 'vike-photon/config'
import vikeReact from 'vike-react/config'

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/head-tags
  title: 'My Vike App',
  description: 'Demo showcasing Vike',

  // Note: vikePhoton is for production builds (Cloudflare Workers/SSR)
  // For local dev, use `pnpm dev` which runs without Photon
  // For production, use `pnpm build` which includes Photon
  extends: process.env.NODE_ENV === 'production' ? [vikeReact, vikePhoton] : [vikeReact],
} satisfies Config
