import fs from 'node:fs'
import path from 'node:path'

const root =
  process.cwd()

const appDir =
  path.join(
    root,
    'app',
  )

function walkSourceFiles(
  directory,
) {
  const output = []

  if (
    !fs.existsSync(
      directory,
    )
  ) {
    return output
  }

  for (
    const entry
    of fs.readdirSync(
      directory,
      {
        withFileTypes: true,
      },
    )
  ) {
    const fullPath =
      path.join(
        directory,
        entry.name,
      )

    if (
      entry.isDirectory()
    ) {
      if (
        entry.name ===
          '.next' ||
        entry.name ===
          'node_modules'
      ) {
        continue
      }

      output.push(
        ...walkSourceFiles(
          fullPath,
        ),
      )
    } else if (
      entry.isFile() &&
      (
        entry.name.endsWith(
          '.tsx',
        ) ||
        entry.name.endsWith(
          '.ts',
        )
      )
    ) {
      output.push(
        fullPath,
      )
    }
  }

  return output
}

function collectPageFiles(
  directory,
) {
  const output = []

  if (
    !fs.existsSync(
      directory,
    )
  ) {
    return output
  }

  for (
    const entry
    of fs.readdirSync(
      directory,
      {
        withFileTypes: true,
      },
    )
  ) {
    const fullPath =
      path.join(
        directory,
        entry.name,
      )

    if (
      entry.isDirectory()
    ) {
      output.push(
        ...collectPageFiles(
          fullPath,
        ),
      )
    } else if (
      entry.isFile() &&
      entry.name ===
        'page.tsx'
    ) {
      output.push(
        fullPath,
      )
    }
  }

  return output
}

function escapeRegex(
  value,
) {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&',
  )
}

function pageToPattern(
  pageFile,
) {
  const directory =
    path.dirname(
      pageFile,
    )

  const relative =
    path.relative(
      appDir,
      directory,
    )

  if (
    relative === ''
  ) {
    return {
      display: '/',
      regex: /^\/$/,
    }
  }

  const segments =
    relative
      .split(
        path.sep,
      )
      .filter(Boolean)
      .filter(
        (segment) =>
          !(
            segment.startsWith(
              '(',
            ) &&
            segment.endsWith(
              ')',
            )
          ),
      )
      .filter(
        (segment) =>
          !segment.startsWith(
            '@',
          ),
      )

  const regexParts =
    segments.map(
      (segment) => {
        if (
          /^\[\[\.\.\..+\]\]$/.test(
            segment,
          )
        ) {
          return '.*'
        }

        if (
          /^\[\.\.\..+\]$/.test(
            segment,
          )
        ) {
          return '.+'
        }

        if (
          /^\[.+\]$/.test(
            segment,
          )
        ) {
          return '[^/]+'
        }

        return escapeRegex(
          segment,
        )
      },
    )

  const display =
    '/' +
    segments.join('/')

  return {
    display,
    regex:
      new RegExp(
        `^/${regexParts.join(
          '/',
        )}/?$`,
      ),
  }
}

const routePatterns =
  collectPageFiles(
    appDir,
  ).map(
    pageToPattern,
  )

function routeExists(
  route,
) {
  if (
    route ===
      '/sitemap.xml' ||
    route ===
      '/robots.txt'
  ) {
    return true
  }

  return routePatterns.some(
    (pattern) =>
      pattern.regex.test(
        route,
      ),
  )
}

const sourceFiles = [
  ...walkSourceFiles(
    path.join(
      root,
      'app',
    ),
  ),
  ...walkSourceFiles(
    path.join(
      root,
      'components',
    ),
  ),
]

const broken = []
const unsafeBlank = []

for (
  const file
  of sourceFiles
) {
  const content =
    fs.readFileSync(
      file,
      'utf8',
    )

  const relative =
    path.relative(
      root,
      file,
    )

  const hrefRegex =
    /\bhref\s*=\s*["']([^"']+)["']/g

  let match

  while (
    (
      match =
        hrefRegex.exec(
          content,
        )
    ) !== null
  ) {
    const href =
      match[1]

    if (
      !href.startsWith(
        '/',
      ) ||
      href.startsWith(
        '//',
      )
    ) {
      continue
    }

    const route =
      href
        .split('#')[0]
        .split('?')[0] ||
      '/'

    if (
      !routeExists(
        route,
      )
    ) {
      broken.push({
        file: relative,
        href,
      })
    }
  }

  const anchorRegex =
    /<a\b[\s\S]*?>/g

  const anchors =
    content.match(
      anchorRegex,
    ) ?? []

  for (
    const anchor
    of anchors
  ) {
    if (
      !/target\s*=\s*["']_blank["']/i.test(
        anchor,
      )
    ) {
      continue
    }

    const rel =
      anchor.match(
        /rel\s*=\s*["']([^"']+)["']/i,
      )?.[1] ?? ''

    const normalizedRel =
      rel.toLowerCase()

    if (
      !normalizedRel.includes(
        'noopener',
      ) ||
      !normalizedRel.includes(
        'noreferrer',
      )
    ) {
      unsafeBlank.push(
        relative,
      )
    }
  }
}

console.log(
  '\nSTATIC INTERNAL LINK AUDIT\n',
)

console.log(
  `Detected ${routePatterns.length} Next.js page routes.`,
)

console.log('')

if (
  broken.length === 0
) {
  console.log(
    'PASS - no broken literal internal links found.',
  )
} else {
  console.error(
    'FAIL - broken internal links:',
  )

  for (
    const item
    of broken
  ) {
    console.error(
      `  ${item.file} -> ${item.href}`,
    )
  }
}

console.log('')

if (
  unsafeBlank.length === 0
) {
  console.log(
    'PASS - external <a target="_blank"> links use noopener + noreferrer.',
  )
} else {
  console.error(
    'FAIL - target="_blank" anchor safety issue in:',
  )

  for (
    const file
    of [
      ...new Set(
        unsafeBlank,
      ),
    ]
  ) {
    console.error(
      `  ${file}`,
    )
  }
}

if (
  broken.length >
    0 ||
  unsafeBlank.length >
    0
) {
  process.exit(1)
}
