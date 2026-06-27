# Reminda — Smart Reminders on OpenCompany

A SaaS reminders app built on the [OpenCompany](https://opencompany.dev) platform with auth, billing, and data storage. Reminda lets users manage personal reminders with a seamless Stripe-powered checkout — all backed by the OpenCompany infrastructure.

## Getting Started

```bash
# 1. Clone the repo
git clone <repo-url> && cd oc-reminda

# 2. Install dependencies (pnpm required)
pnpm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual values

# 4. Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

- **Framework**: [Next.js 16](https://nextjs.org/) with the App Router and React Server Components
- **Platform**: [OpenCompany](https://opencompany.dev) — handles identity, data access, secret storage, and the Stripe billing integration
- **SDK**: `@opencompany/sdk` (local file dependency) for typed platform access
- **Billing**: Stripe checkout sessions provisioned through the platform's billing API
- **Styling**: Tailwind CSS v4 with the Next.js theme tokens (light + dark)

### Key Files

| Path | Purpose |
|------|---------|
| `src/lib/auth.ts` | Session resolution, auth guard, dev cookie helpers |
| `src/lib/billing.ts` | Stripe checkout creation via the platform billing API |
| `src/lib/db.ts` | Typed data-access layer on top of the platform store |
| `src/lib/opencompany.ts` | SDK client initialization and secret resolution |
| `src/app/page.tsx` | Home page — session-aware reminder list |
| `src/app/checkout/page.tsx` | Authenticated checkout redirect |

## Contributor Workflow

1. **Log in** to the platform CLI: `oc login`
2. **Create a feature branch**: `git checkout -b feat/my-feature`
3. **Never push to `main`** — all changes go through feature branches and PRs
4. After merging, the platform auto-deploys from `main`

## Documentation

- [OpenCompany Docs](https://docs.opencompany.dev) — platform concepts, API reference, and guides
- [Next.js Docs](https://nextjs.org/docs) — framework reference