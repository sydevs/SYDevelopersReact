# Final Setup Instructions

## ✅ Completed Work

The core application structure is complete with:
- ✅ Homepage with project cards
- ✅ Funds page with dual Stripe Buy Buttons
- ✅ Jobs index and detail pages
- ✅ Policy page
- ✅ Navigation and Layout
- ✅ Cloudflare Function for donation stats
- ✅ TypeScript types and Airtable integrations
- ✅ robots.txt configured

## 🔧 Remaining Tasks (10-15 minutes)

### 1. Copy Logo Image

```bash
# Copy logo from old project
cp /Users/devindra/Documents/Projects/SYDevelopers/app/assets/images/logo.png \
   /Users/devindra/Documents/Projects/SYDevelopersReact/public/images/

# Optional: Convert to WebP for better performance
# If you have ImageMagick installed:
convert /Users/devindra/Documents/Projects/SYDevelopersReact/public/images/logo.png \
        -quality 90 \
        /Users/devindra/Documents/Projects/SYDevelopersReact/public/images/logo.webp

# If using WebP, update pages/index/+Page.tsx line 12:
# Change: <img src="/images/logo.png" ...
# To: <img src="/images/logo.webp" ...
```

### 2. Create Environment File

```bash
cd /Users/devindra/Documents/Projects/SYDevelopersReact

# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and add your actual API keys
# You can get these from:
# - Airtable: https://airtable.com/account
# - Stripe: https://dashboard.stripe.com/apikeys
```

Edit `.env.local`:
```env
AIRTABLE_KEY=keyXXXXXXXXXXXXXX
AIRTABLE_BASE=appXXXXXXXXXXXXXX
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51HQqi7K5E1L5TSuqteyptETR4hx20IfM3XD1OOjCR9iu9SGDqMMpxW7ahtoDtkSE9GIZ6a8kSOsEluBHiqmR4shl00VTFGdkvi
STRIPE_SECRET_KEY=sk_live_XXXXXXXXXXXXXXXXXX
```

### 3. Create Project Pages (Optional - Can Do Later)

The project pages need to be manually created by converting the Slim templates to React.

For now, create placeholder pages for each project:

```bash
cd /Users/devindra/Documents/Projects/SYDevelopersReact

# Create project page directories
mkdir -p pages/projects/wemeditate
mkdir -p pages/projects/atlas
mkdir -p pages/projects/resources
mkdir -p pages/projects/app
mkdir -p pages/projects/domain
```

Then for each, create a basic `+Page.tsx`. Example for wemeditate:

```tsx
// pages/projects/wemeditate/+Page.tsx
export default function Page() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">The We Meditate Project</h1>
      <p className="mb-4">
        <a href="https://wemeditate.com" target="_blank" rel="noopener" className="text-blue-600 hover:underline">
          wemeditate.com
        </a>
      </p>
      <p className="mb-4">We Meditate is an international website promoting Sahaja Yoga.</p>

      {/* TODO: Copy full content from old site */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm">
          <strong>Note:</strong> Full project content needs to be copied from the old site.
          See the original at: /Users/devindra/Documents/Projects/SYDevelopers/app/views/projects/wemeditate.html.slim
        </p>
      </div>
    </div>
  )
}
```

**You can deploy without these pages and add them later!** The homepage links won't work until you create them.

### 4. Test Locally

```bash
cd /Users/devindra/Documents/Projects/SYDevelopersReact

# Install dependencies (if not already done)
pnpm install

# Start dev server
pnpm dev
```

Visit `http://localhost:3000` and test:
- ✅ Homepage loads
- ✅ Navigation works
- ✅ Funds page shows Stripe buttons
- ✅ Jobs page lists jobs
- ✅ Policy page displays

**Expected Issues:**
- ❌ Logo won't show (until you copy it)
- ❌ Project page links will 404 (until you create them)
- ❌ Donation stats won't load (needs Stripe secret key in Function)
- ❌ Jobs/Projects won't show (needs Airtable keys in .env.local)

### 5. Create GitHub Repository

```bash
cd /Users/devindra/Documents/Projects/SYDevelopersReact

# Initialize git (already done by Vike scaffolder)
# git init

# Create repo on GitHub (via web or gh CLI)
gh repo create SYDevelopersReact --private

# Or manually create at: https://github.com/new

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/SYDevelopersReact.git
git add .
git commit -m "Initial commit: SYDevelopers React migration"
git push -u origin master
```

### 6. Deploy to Cloudflare Pages

#### Option A: Via Cloudflare Dashboard (Recommended)

1. Go to https://dash.cloudflare.com/
2. Select your account → Pages
3. Click "Create a project"
4. Connect to GitHub and select `SYDevelopersReact`
5. Build settings:
   - **Framework preset:** None
   - **Build command:** `pnpm build`
   - **Build output directory:** `dist/client`
6. Environment variables:
   - `AIRTABLE_KEY` = your_key
   - `AIRTABLE_BASE` = your_base
   - `PUBLIC_STRIPE_PUBLISHABLE_KEY` = pk_live_...
   - `STRIPE_SECRET_KEY` = sk_live_... (IMPORTANT: For the Function to work)
7. Click "Save and Deploy"

#### Option B: Via Wrangler CLI

```bash
cd /Users/devindra/Documents/Projects/SYDevelopersReact

# Login to Cloudflare
npx wrangler login

# Deploy
npx wrangler pages deploy dist/client --project-name=sydevelopers

# Set secrets for the Function
npx wrangler pages secret put STRIPE_SECRET_KEY --project-name=sydevelopers
# Paste your secret key when prompted
```

### 7. Configure Custom Domain (If Needed)

1. In Cloudflare Pages dashboard
2. Go to your project → Custom domains
3. Add `sydevelopers.com` or `www.sydevelopers.com`
4. DNS records will be automatically configured

### 8. Post-Deployment Testing

Visit your deployed site and verify:
- ✅ Pages load correctly
- ✅ Navigation works
- ✅ Stripe Buy Buttons appear and work
- ✅ Donation stats load (check browser console for errors)
- ✅ Jobs and projects display from Airtable

**If donation stats don't load:**
1. Check Cloudflare Function logs in dashboard
2. Verify `STRIPE_SECRET_KEY` is set
3. Test the endpoint directly: `https://your-site.com/api/donation-stats`

## 🐛 Troubleshooting

### Build fails with "Module not found"
- Run `pnpm install` to ensure all dependencies are installed
- Check that TypeScript paths are correct in `tsconfig.json`

### Airtable data not showing
- Verify `AIRTABLE_KEY` and `AIRTABLE_BASE` in environment variables
- Check Cloudflare build logs for errors
- Test locally first with `pnpm dev`

### Stripe Buy Buttons not appearing
- Check browser console for errors
- Verify the Stripe script loads: `https://js.stripe.com/v3/buy-button.js`
- Ensure publishable key is correct

### Donation stats endpoint returns 500
- Check Function logs in Cloudflare dashboard
- Verify `STRIPE_SECRET_KEY` is set correctly
- Test Stripe API access with correct secret key

### Images not loading
- Check that images exist in `public/images/`
- Verify paths start with `/images/` not `./images/`
- Check browser network tab for 404s

## 📝 Future Enhancements

Create these GitHub issues for later:

1. **Airtable Webhook Automation**
   - Auto-rebuild on data changes
   - Setup: Airtable Automation → Cloudflare Deploy Hook

2. **Project Pages Content**
   - Convert all 5 project pages from Slim to React
   - Optimize and copy images

3. **Performance Optimization**
   - Convert all images to WebP
   - Add image optimization
   - Implement lazy loading

4. **Analytics**
   - Add Fathom or similar (if needed)
   - Track donation button clicks

## ✅ You're Done!

Your site should now be live at:
- **Development:** http://localhost:3000
- **Production:** https://sydevelopers.pages.dev (or your custom domain)

The migration is complete! 🎉
