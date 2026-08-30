import fs from 'node:fs'
import path from 'node:path'

const root =
  process.cwd()

const appDir =
  path.join(
    root,
    'app',
  )

const componentsDir =
  path.join(
    root,
    'components',
  )

function walk(
  directory,
) {
  if (
    !fs.existsSync(
      directory,
    )
  ) {
    return []
  }

  return fs
    .readdirSync(
      directory,
      {
        withFileTypes:
          true,
      },
    )
    .flatMap(
      (
        entry,
      ) => {
        const fullPath =
          path.join(
            directory,
            entry.name,
          )

        if (
          entry.isDirectory()
        ) {
          return walk(
            fullPath,
          )
        }

        return [
          fullPath,
        ]
      },
    )
}

function relative(
  file,
) {
  return path
    .relative(
      root,
      file,
    )
    .replaceAll(
      '\\',
      '/',
    )
}

function routeFromPage(
  file,
) {
  const rel =
    path.relative(
      appDir,
      file,
    )

  const segments =
    rel
      .split(
        path.sep,
      )
      .slice(
        0,
        -1,
      )
      .filter(
        (
          segment,
        ) =>
          !(
            segment.startsWith(
              '(',
            ) &&
            segment.endsWith(
              ')',
            )
          ),
      )

  return (
    '/' +
    segments.join('/')
  ).replace(
    /\/$/,
    '',
  ) || '/'
}

function targetMatchesRoute(
  target,
  route,
) {
  if (
    target ===
    route
  ) {
    return true
  }

  const targetParts =
    target
      .split('/')
      .filter(Boolean)

  const routeParts =
    route
      .split('/')
      .filter(Boolean)

  if (
    targetParts.length !==
    routeParts.length
  ) {
    return false
  }

  return routeParts.every(
    (
      segment,
      index,
    ) => {
      if (
        segment.startsWith(
          '[',
        ) &&
        segment.endsWith(
          ']',
        )
      ) {
        return true
      }

      return (
        segment ===
        targetParts[
          index
        ]
      )
    },
  )
}

const pageFiles =
  walk(
    appDir,
  ).filter(
    (
      file,
    ) =>
      file.endsWith(
        `${path.sep}page.tsx`,
      ) ||
      file.endsWith(
        `${path.sep}page.ts`,
      ),
  )

const routes =
  pageFiles.map(
    routeFromPage,
  )

const publicRoutes =
  routes.filter(
    (
      route,
    ) =>
      !route.startsWith(
        '/admin',
      ) &&
      !route.startsWith(
        '/api',
      ),
  )

const generatedRoutes =
  new Set([
    '/sitemap.xml',
    '/robots.txt',
    '/manifest.webmanifest',
  ])

function routeExists(
  target,
) {
  if (
    generatedRoutes.has(
      target,
    )
  ) {
    return true
  }

  return publicRoutes.some(
    (
      route,
    ) =>
      targetMatchesRoute(
        target,
        route,
      ),
  )
}

const sourceFiles = [
  ...walk(
    appDir,
  ),
  ...walk(
    componentsDir,
  ),
].filter(
  (
    file,
  ) =>
    /\.(tsx?|jsx?)$/.test(
      file,
    ),
)

const errors = []
const warnings = []

const ENCODING_ARTIFACTS = [
  {
    label:
      'replacement character',
    value:
      '\uFFFD',
  },
  {
    label:
      'UTF-8 mojibake sequence',
    value:
      '\u00e2\u20ac',
  },
  {
    label:
      'double-encoded character marker',
    value:
      '\u00c2',
  },
  {
    label:
      'UTF-8 interpreted as Latin-1 marker',
    value:
      '\u00c3',
  },
]

const internalLinks =
  new Map()

for (
  const file
  of sourceFiles
) {
  const content =
    fs.readFileSync(
      file,
      'utf8',
    )

  for (
    const artifact
    of ENCODING_ARTIFACTS
  ) {
    if (
      content.includes(
        artifact.value,
      )
    ) {
      errors.push(
        `Possible text encoding corruption (${artifact.label}) in ${relative(file)}`,
      )
    }
  }

  const hrefRegex =
    /\bhref\s*=\s*["'](\/[^"'?#]*)[^"']*["']/g

  for (
    const match
    of content.matchAll(
      hrefRegex,
    )
  ) {
    const target =
      (
        match[1] ||
        '/'
      ).replace(
        /\/$/,
        '',
      ) ||
      '/'

    if (
      !internalLinks.has(
        target,
      )
    ) {
      internalLinks.set(
        target,
        [],
      )
    }

    internalLinks
      .get(
        target,
      )
      .push(
        relative(
          file,
        ),
      )

    if (
      target ===
        '/start' ||
      target.startsWith(
        '/start/',
      )
    ) {
      errors.push(
        `Legacy /start link in ${relative(file)}`,
      )
    }

    if (
      target.startsWith(
        '/admin',
      ) ||
      target.startsWith(
        '/api',
      )
    ) {
      continue
    }

    if (
      !routeExists(
        target,
      )
    ) {
      errors.push(
        `Broken internal route ${target} referenced by ${relative(file)}`,
      )
    }
  }

  const blankTargetRegex =
    /<a\b[^>]*target=["']_blank["'][^>]*>/gs

  for (
    const match
    of content.matchAll(
      blankTargetRegex,
    )
  ) {
    const tag =
      match[0]

    const hasNoopener =
      /rel=["'][^"']*noopener[^"']*["']/.test(
        tag,
      )

    const hasNoreferrer =
      /rel=["'][^"']*noreferrer[^"']*["']/.test(
        tag,
      )

    if (
      !hasNoopener ||
      !hasNoreferrer
    ) {
      errors.push(
        `Unsafe target="_blank" link in ${relative(file)}`,
      )
    }
  }
}

const sitemapPath =
  path.join(
    appDir,
    'sitemap.ts',
  )

if (
  fs.existsSync(
    sitemapPath,
  )
) {
  const sitemap =
    fs.readFileSync(
      sitemapPath,
      'utf8',
    )

  const sitemapRoutes =
    [
      ...sitemap.matchAll(
        /path:\s*'([^']*)'/g,
      ),
    ].map(
      (
        match,
      ) =>
        match[1] ||
        '/',
    )

  for (
    const route
    of sitemapRoutes
  ) {
    if (
      !routeExists(
        route,
      )
    ) {
      errors.push(
        `Sitemap route does not exist: ${route}`,
      )
    }
  }

  for (
    const route
    of publicRoutes
  ) {
    if (
      route.includes(
        '[',
      ) ||
      route ===
        '/announcements' ||
      route ===
        '/start'
    ) {
      continue
    }

    if (
      !sitemapRoutes.includes(
        route,
      )
    ) {
      warnings.push(
        `Public route not listed in sitemap: ${route}`,
      )
    }
  }
}
else {
  errors.push(
    'app/sitemap.ts is missing',
  )
}

const metadataRoutes = [
  '/',
  '/pray',
  '/events',
  '/campuses',
  '/student-guide',
  '/support',
  '/join',
  '/links',
  '/teams',
  '/faq',
  '/about',
  '/contact',
]

for (
  const route
  of metadataRoutes
) {
  const pageFile =
    pageFiles.find(
      (
        file,
      ) =>
        routeFromPage(
          file,
        ) ===
        route,
    )

  if (!pageFile) {
    errors.push(
      `Expected public page missing: ${route}`,
    )

    continue
  }

  const content =
    fs.readFileSync(
      pageFile,
      'utf8',
    )

  if (
    !content.includes(
      'export const metadata',
    ) &&
    !content.includes(
      'generateMetadata',
    )
  ) {
    warnings.push(
      `No page-level metadata found for ${route}`,
    )
  }
}

console.log('')
console.log('ISR PUBLIC QA')
console.log('=============')
console.log(
  `Public routes: ${publicRoutes.length}`,
)
console.log(
  `Static internal links checked: ${Array.from(internalLinks.values()).flat().length}`,
)
console.log(
  `Errors: ${errors.length}`,
)
console.log(
  `Warnings: ${warnings.length}`,
)

if (
  warnings.length >
  0
) {
  console.log('')
  console.log('WARNINGS')

  for (
    const warning
    of warnings
  ) {
    console.log(
      `- ${warning}`,
    )
  }
}

if (
  errors.length >
  0
) {
  console.error('')
  console.error(
    'ERRORS',
  )

  for (
    const error
    of errors
  ) {
    console.error(
      `- ${error}`,
    )
  }

  process.exit(1)
}

console.log('')
console.log(
  'PUBLIC QA PASSED',
)
