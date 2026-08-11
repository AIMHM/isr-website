import fs from 'node:fs'
import path from 'node:path'

const root =
  process.cwd()

const routes = [
  'app/page.tsx',
  'app/start/page.tsx',
  'app/pray/page.tsx',
  'app/events/page.tsx',
  'app/updates/page.tsx',
  'app/join/page.tsx',
  'app/support/page.tsx',
  'app/about/page.tsx',
  'app/contact/page.tsx',
  'app/find/page.tsx',
  'app/campuses/page.tsx',
]

const failures = []

for (
  const route
  of routes
) {
  const absolute =
    path.join(
      root,
      route,
    )

  if (
    !fs.existsSync(
      absolute,
    )
  ) {
    failures.push(
      route +
      ': route file missing',
    )

    continue
  }

  const source =
    fs.readFileSync(
      absolute,
      'utf8',
    )

  if (
    route !==
      'app/page.tsx' &&
    !source.includes(
      'Metadata',
    )
  ) {
    failures.push(
      route +
      ': Metadata export/import missing',
    )
  }
}

const layout =
  fs.readFileSync(
    path.join(
      root,
      'app/layout.tsx',
    ),
    'utf8',
  )

if (
  !layout.includes(
    'metadataBase',
  )
) {
  failures.push(
    'Root metadataBase missing',
  )
}

if (
  !layout.includes(
    'openGraph',
  )
) {
  failures.push(
    'Root Open Graph metadata missing',
  )
}

const sitemap =
  path.join(
    root,
    'app/sitemap.ts',
  )

if (
  !fs.existsSync(
    sitemap,
  )
) {
  failures.push(
    'sitemap.ts missing',
  )
}

const robots =
  path.join(
    root,
    'app/robots.ts',
  )

if (
  !fs.existsSync(
    robots,
  )
) {
  failures.push(
    'robots.ts missing',
  )
}

console.log(
  '\nISR SEO AUDIT\n',
)

if (
  failures.length ===
  0
) {
  console.log(
    'PASS - metadata, sitemap and robots foundations.',
  )

  process.exit(
    0,
  )
}

for (
  const failure
  of failures
) {
  console.error(
    'FAIL - ' +
    failure,
  )
}

process.exit(
  1,
)
