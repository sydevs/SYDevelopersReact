# SY Developers - React/Vike Migration

Modern React application built with Vike (SSG), deployed to Cloudflare Pages.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm
- Airtable account with API key
- Stripe account

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment template
cp .env.local.example .env.local

# Edit .env.local and add your API keys
```

### Development

```bash
pnpm dev
```

Visit `http://localhost:3000`

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## 📁 Project Structure

```
├── pages/                  # Vike pages (SSG)
│   ├── index/             # Homepage
│   ├── funds/             # Donations page
│   ├── jobs/              # Job listings
│   ├── policy/            # Policy page
│   └── projects/          # Project pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── Navigation.tsx    # Header navigation
│   └── DonationStats.tsx # Client-side donation stats
├── lib/                   # Utilities
│   ├── airtable.ts       # Airtable data fetchers
│   ├── stripe-client.ts  # Stripe client utilities
│   └── utils.ts          # shadcn utils
├── types/                 # TypeScript types
│   ├── airtable.ts       # Airtable record types
│   └── stripe.ts         # Stripe types
├── functions/            # Cloudflare Functions
│   └── api/
│       └── donation-stats.ts  # Stripe API proxy
└── public/               # Static assets
    ├── robots.txt        # SEO (disallow all)
    └── images/           # Images
```

## 🔧 Tech Stack

- **Framework:** Vike (SSG mode)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui
- **Icons:** Heroicons
- **Data:** Airtable (build-time fetch)
- **Payments:** Stripe Buy Buttons
- **Deployment:** Cloudflare Pages
- **Language:** TypeScript

## 🌐 Data Fetching

### Build-time (Airtable)
- Jobs
- Projects
- Teams/People
- Expenses

### Client-side (Cloudflare Function)
- Donation statistics (last 30 days)
- Recent donations

## 💳 Stripe Integration

Uses Stripe Buy Buttons for donations:
- **Monthly donations:** `buy_btn_1STkr7K5E1L5TSuqjuFbdUKO`
- **One-time donations:** `buy_btn_1STk1QK5E1L5TSuqNdkTV2km`

No server-side Stripe code needed (Buy Buttons handle everything).

## 📊 Donation Stats API

The `/api/donation-stats` endpoint is a Cloudflare Function that:
1. Fetches transactions from Stripe API (last 30 days)
2. Calculates monthly vs one-time donations
3. Returns recent charges with country info
4. Called client-side from Funds page

## 🚢 Deployment

### Cloudflare Pages

1. Connect GitHub repository to Cloudflare Pages
2. Build settings:
   - Build command: `pnpm build`
   - Build output directory: `dist/client`
3. Environment variables:
   - `AIRTABLE_KEY`
   - `AIRTABLE_BASE`
   - `PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY` (for Function)

### Manual Deployment

```bash
# Build the site
pnpm build

# Deploy via wrangler
npx wrangler pages deploy dist/client
```

## 📝 Environment Variables

### Required for Build
- `AIRTABLE_KEY` - Airtable API key
- `AIRTABLE_BASE` - Airtable base ID
- `PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

### Required for Functions
- `STRIPE_SECRET_KEY` - Stripe secret key (set in Cloudflare dashboard)

## 🔄 Updating Content

### Jobs/Projects
1. Update data in Airtable
2. Trigger rebuild:
   - Manual: Push to GitHub or trigger deploy hook
   - Automated: (Future) Airtable webhook → Cloudflare deploy hook

## 🎨 Components

### shadcn/ui Components Used
- Button
- Card
- Badge
- Accordion
- Progress
- Alert

### Custom Components
- `Navigation` - Header with links
- `DonationStats` - Real-time donation statistics

## 📋 TODO

- [ ] Copy project page content from old site
- [ ] Optimize and convert images to WebP
- [ ] Setup Airtable webhook for auto-rebuilds
- [ ] Add analytics (if needed)

## 🤝 Contributing

This is an internal project for Sahaja Yoga web developers.

## 📞 Contact

For questions: contact@sydevelopers.com

## 🔒 License

Private - All rights reserved
