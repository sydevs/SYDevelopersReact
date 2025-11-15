# 🚀 Quick Start Guide

## Deploy in 15 Minutes

### 1. Setup Environment (2 minutes)

```bash
cd /Users/devindra/Documents/Projects/SYDevelopersReact

# Copy environment template
cp .env.local.example .env.local

# Edit .env.local with your API keys
# Get keys from:
# - Airtable: https://airtable.com/account
# - Stripe: https://dashboard.stripe.com/apikeys
```

### 2. Test Locally (2 minutes)

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Visit http://localhost:3000

**Expected behavior:**
- ✅ Pages load
- ✅ Navigation works
- ✅ Stripe buttons appear
- ✅ Jobs/Projects from Airtable display

### 3. Create GitHub Repo (3 minutes)

```bash
# Using GitHub CLI
gh repo create SYDevelopersReact --private

# Or create manually at https://github.com/new

# Push code
git remote add origin https://github.com/YOUR_USERNAME/SYDevelopersReact.git
git add .
git commit -m "Initial commit: SYDevelopers React migration"
git push -u origin master
```

### 4. Deploy to Cloudflare Pages (5-10 minutes)

#### Via Dashboard (Easier)
1. Go to https://dash.cloudflare.com → Pages
2. Click "Create a project"
3. Connect GitHub repo
4. Build settings:
   - Build command: `pnpm build`
   - Build output: `dist/client`
5. Environment variables:
   ```
   AIRTABLE_KEY=your_key
   AIRTABLE_BASE=your_base
   PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   ```
6. Deploy!

#### Via CLI (Faster if you know Wrangler)
```bash
npx wrangler login
npx wrangler pages deploy dist/client --project-name=sydevelopers

# Set Stripe secret
npx wrangler pages secret put STRIPE_SECRET_KEY --project-name=sydevelopers
```

### 5. Configure Domain (Optional)

In Cloudflare Pages:
- Go to Custom domains
- Add `sydevelopers.com`
- DNS auto-configured ✅

## ✅ You're Live!

Your site is now at:
- https://sydevelopers.pages.dev
- or your custom domain

## 🐛 Issues?

See **SETUP_INSTRUCTIONS.md** for troubleshooting.

## 📝 Next Steps

**Optional (can do later):**
- Copy project page content from old site
- Optimize images to WebP
- Setup Airtable webhook for auto-rebuilds

The core site is **fully functional** without these!
