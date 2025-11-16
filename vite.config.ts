import tailwindcss from '@tailwindcss/vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv'
import { resolve } from 'path'
import vike from 'vike/plugin'
import { defineConfig } from 'vite'

// Load .dev.vars for local development
// In production (Cloudflare Pages), process.env is already populated from dashboard
config({ path: resolve(process.cwd(), '.dev.vars') })

export default defineConfig({
  plugins: [
    vike(),
    react(),
    sentryVitePlugin({
      sourcemaps: {
        disable: false,
      },
    }),
    tailwindcss(),
  ],

  build: {
    sourcemap: true,
  },

  resolve: {
    alias: {
      '@': new URL('./', import.meta.url).pathname,
    },
  },

  // Map import.meta.env to process.env for all environments
  // Local dev: loaded from .dev.vars above
  // Cloudflare Pages: loaded from dashboard environment variables
  define: {
    'import.meta.env.AIRTABLE_KEY': JSON.stringify(process.env.AIRTABLE_KEY),
    'import.meta.env.AIRTABLE_BASE': JSON.stringify(process.env.AIRTABLE_BASE),
  },
})
