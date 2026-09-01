# ISR Website

Website development repository for the **Islamic Society of RMIT (ISR)**.

Public site: https://theisr.com.au

> **Development safety:** active Website 2.0 work happens on the `ideas` branch. Do not deploy, migrate a production database, change DNS/hosting, or merge this work into production as part of ordinary development or review.

## What this repository contains

This is a monorepo with:

- `frontend/` — Next.js 15 public website and admin interface
- `backend/` — Express 5 API, Prisma and Supabase integrations
- `.github/workflows/ci.yml` — automated quality, security and browser checks
- `PRODUCTION_MIGRATION_RUNBOOK.md` — guarded production database procedure for an explicitly authorised release only

The public experience includes prayer and Jumu’ah information, campus guidance, events and weekly programs, student support, membership/community pathways, ISR updates, search, contact information and accessibility/privacy/governance pages.

## Branches

| Branch | Purpose |
| --- | --- |
| `ideas` | Active development and team-review branch |
| `main` | Do not modify or merge into without explicit release approval |
| `restore/pre-master-prompt` | Preserved restore point for the earlier preferred visual baseline |
| `backup/post-master-prompt` | Preserved backup of the later visual redesign work |

## Fastest safe way to review the website

For **UI/UX review**, you do not need a Supabase project and you should not connect the development site to the existing production database.

### Requirements

- Node.js 22 recommended
- npm

### Windows / PowerShell

```powershell
$ErrorActionPreference = "Stop"

git clone https://github.com/AIMHM/isr-website.git
Set-Location .\isr-website
git switch ideas

Set-Location .\frontend
npm.cmd ci

@"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_LOCAL_ADMIN_MODE=false
NEXT_PUBLIC_USE_MOCK_DATA=true
"@ | Set-Content .env.local

npm.cmd run dev
```

Open `http://localhost:3000`.

This review configuration uses the frontend's development/mock-data path and does **not** require production Supabase credentials.

### macOS / Linux

```bash
git clone https://github.com/AIMHM/isr-website.git
cd isr-website
git switch ideas
cd frontend
npm ci

cat > .env.local <<'EOF'
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_LOCAL_ADMIN_MODE=false
NEXT_PUBLIC_USE_MOCK_DATA=true
EOF

npm run dev
```

Open `http://localhost:3000`.

## Full local stack

Only use the backend when you are intentionally developing or testing backend behaviour. Use **development/test credentials and a non-production database**.

In separate terminals:

```text
backend/  -> npm run dev
frontend/ -> npm run dev
```

Defaults are normally:

- frontend: `http://localhost:3000`
- backend: `http://localhost:4000`

### Frontend environment

`frontend/.env.local`

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_LOCAL_ADMIN_MODE=false
NEXT_PUBLIC_USE_MOCK_DATA=true
```

Set `NEXT_PUBLIC_USE_MOCK_DATA=false` only when deliberately testing a configured development backend.

### Backend environment

The backend expects configuration for its database/Supabase connection, allowed frontend origins, weather service and email service. Never place production secrets in chat, source control, screenshots or committed `.env` files.

Relevant keys include:

```env
PORT=4000
DATABASE_URL=...
SUPABASE_URL=...
SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_ANON_KEY=...
SUPABASE_SECRET_KEY=...
CORS_ALLOWED_ORIGINS=http://localhost:3000
WEATHER_API_KEY=...
RESEND_API_KEY=...
RESEND_FROM_ADDRESS=...
```

`.env` and `.env.local` are ignored by Git.

## Quality checks

Every push to `ideas` runs GitHub Actions checks covering:

- frontend production dependency security audit
- TypeScript type-checking
- ESLint
- public-route/link QA
- Next.js production build
- Playwright browser journeys on desktop and mobile
- automated WCAG A/AA checks with axe-core
- baseline HTTP security headers
- robots, sitemap and web-app manifest checks
- JavaScript delivery budgets for core public routes
- backend production dependency security audit
- Prisma schema validation and client generation
- backend Jest tests
- backend predeployment audit
- backend production build

Useful local commands:

```text
frontend: npm run lint
frontend: npx tsc --noEmit
frontend: npm run isr:public-qa
frontend: npm run build
frontend: npm run test:e2e

backend:  npx prisma validate
backend:  npm test -- --runInBand
backend:  npm run audit:predeploy
backend:  npm run build
```

## Current delivery profile

The website is built with the Next.js App Router. Public routes are tested at desktop and mobile widths, and core page JavaScript delivery is guarded in CI. Public network requests are bounded so an unavailable external service cannot leave the interface waiting indefinitely.

The admin area is intentionally excluded from indexing and is served with private/no-store caching rules.

## Brand colours

| Name | Hex |
| --- | --- |
| Cream | `#EAE3D8` |
| Light Blue | `#98AEA8` |
| Yellow | `#EBE8CB` |
| Turquoise | `#509589` |
| Dark Red | `#5B0B05` |
| Bright Red | `#D43325` |

The brighter turquoise remains the brand surface/decorative colour. Accessible readable text uses a darker companion shade where required to meet WCAG contrast.

## Production boundary

Development readiness is **not** production authorisation.

Before any future release, the exact release SHA, environment configuration, database backup, migration status, hosting configuration and final public QA must be reviewed against the production runbook. Production database scripts in this repository contain explicit confirmation gates by design.

Do not run production backup/migration procedures or connect development work to the existing production Supabase project merely to review how the website looks.
