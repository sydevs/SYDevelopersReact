import tailwindcss from '@tailwindcss/vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import react from '@vitejs/plugin-react'
import { config as loadDotenv } from 'dotenv'
import { existsSync } from 'fs'
import { resolve } from 'path'
import vike from 'vike/plugin'
import { defineConfig } from 'vite'

// Load .dev.vars for local development (if it exists)
// In production (Cloudflare Pages), process.env is already populated from dashboard
const devVarsPath = resolve(process.cwd(), '.dev.vars')
if (existsSync(devVarsPath)) {
  loadDotenv({ path: devVarsPath })
}

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

  // Explicitly map process.env to import.meta.env using define
  // This works for both local (.dev.vars loaded above) and Cloudflare (dashboard env vars in process.env)
  define: {
    'import.meta.env.AIRTABLE_KEY': JSON.stringify(process.env.AIRTABLE_KEY || ''),
    'import.meta.env.AIRTABLE_BASE': JSON.stringify(process.env.AIRTABLE_BASE || ''),
  },
})
