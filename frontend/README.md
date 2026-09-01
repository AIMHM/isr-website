# ISR Website Frontend

Next.js 15 frontend for the Islamic Society of RMIT website.

For branch rules, production boundaries and the full-stack handover guide, see the repository root `README.md`.

## Safe local review

For ordinary UI/UX review, use the mock-data path. A Supabase project and production backend are not required.

### Requirements

- Node.js 22 recommended
- npm

### Windows / PowerShell

```powershell
$ErrorActionPreference = "Stop"

Set-Location .\frontend
npm.cmd ci
Copy-Item .env.example .env.local
npm.cmd run dev
```

### macOS / Linux

```bash
cd frontend
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The committed `.env.example` defaults to:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_LOCAL_ADMIN_MODE=false
NEXT_PUBLIC_USE_MOCK_DATA=true
```

Keep `NEXT_PUBLIC_USE_MOCK_DATA=true` when the goal is visual review. Do not connect the frontend to ISR's production backend or database merely to compare the website design.

## Main application areas

- `app/` — App Router pages, metadata, delivery policies and global styles
- `components/` — public UI, navigation, prayer, events, support and admin components
- `lib/` — API helpers, content/data utilities and shared logic
- `public/` — ISR logos and other static assets
- `tests/e2e/` — Playwright student journeys, delivery safeguards and axe accessibility checks
- `scripts/isr-dev/` — public QA and development verification scripts

## Useful scripts

```text
npm run dev            Start the local development server
npm run build          Create the production build
npm run start          Start the built app (defaults to port 3000, honours PORT)
npm run lint           Run ESLint
npm run test:e2e       Run Playwright desktop/mobile browser QA
npm run isr:public-qa  Check public routes and static internal links
npm run isr:health     Run ISR development health checks
npm run isr:github     Verify GitHub development state
```

For a clean production-preview check:

```bash
npm run build
npm run start
```

On Windows use the equivalent `npm.cmd` commands.

## Design system

ISR brand tokens are defined through Tailwind CSS v4 theme declarations in `app/globals.css`.

Core palette:

| Name | Hex |
| --- | --- |
| Cream | `#EAE3D8` |
| Light Blue | `#98AEA8` |
| Yellow | `#EBE8CB` |
| Turquoise | `#509589` |
| Dark Red | `#5B0B05` |
| Bright Red | `#D43325` |

The public UI intentionally preserves ISR's existing visual character. Accessible text may use darker companion shades where the brighter brand token does not meet WCAG contrast requirements.

## Quality expectations

Changes to `ideas` are automatically checked in GitHub Actions for TypeScript, linting, public-route QA, production build, runtime dependency security, Playwright desktop/mobile journeys, axe WCAG A/AA checks, delivery/security headers and core JavaScript budgets.

Do not weaken a quality gate to make a failure disappear; fix the underlying application issue or correct an inaccurate test assumption.
