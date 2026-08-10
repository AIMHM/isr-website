import fs from 'node:fs'
import path from 'node:path'

const root =
  process.cwd()

const appDir =
  path.join(
    root,
    'app',
  )

const requiredRoutes = [
  'page.tsx',
  'start/page.tsx',
  'pray/page.tsx',
  'events/page.tsx',
  'events/[id]/page.tsx',
  'updates/page.tsx',
  'join/page.tsx',
  'support/page.tsx',
  'about/page.tsx',
  'about/history/page.tsx',
  'contact/page.tsx',
  'governance/page.tsx',
  'privacy/page.tsx',
  'accessibility/page.tsx',
  'not-found.tsx',
  'error.tsx',
  'loading.tsx',
  'robots.ts',
  'sitemap.ts',
]

let failed = false

console.log(
  '\nISR PUBLIC ROUTE AUDIT\n',
)

for (
  const route
  of requiredRoutes
) {
  const fullPath =
    path.join(
      appDir,
      route,
    )

  const exists =
    fs.existsSync(
      fullPath,
    )

  console.log(
    `${exists ? 'PASS' : 'FAIL'}  ${route}`,
  )

  if (!exists) {
    failed = true
  }
}

console.log('')

if (failed) {
  console.error(
    'Route audit failed.',
  )

  process.exit(1)
}

console.log(
  'All required ISR public route files are present.',
)
