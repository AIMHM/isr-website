import fs from 'node:fs'
import path from 'node:path'

const root =
  process.cwd()

let failed = false

function pass(message) {
  console.log(
    `PASS - ${message}`,
  )
}

function fail(message) {
  console.error(
    `FAIL - ${message}`,
  )

  failed = true
}

function requireFile(
  relativePath,
) {
  const absolute =
    path.join(
      root,
      relativePath,
    )

  if (
    fs.existsSync(
      absolute,
    )
  ) {
    pass(
      `${relativePath} exists`,
    )

    return fs.readFileSync(
      absolute,
      'utf8',
    )
  }

  fail(
    `${relativePath} is missing`,
  )

  return ''
}

function walk(directory) {
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
    const full =
      path.join(
        directory,
        entry.name,
      )

    if (
      entry.isDirectory()
    ) {
      if (
        [
          'node_modules',
          '.next',
          'admin',
        ].includes(
          entry.name,
        )
      ) {
        continue
      }

      output.push(
        ...walk(
          full,
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
        full,
      )
    }
  }

  return output
}

console.log(
  '\nISR FINAL CONTENT + SAFETY AUDIT\n',
)

/* -------------------------------------------------------
   Local admin isolation
   ------------------------------------------------------- */

const localAdminMode =
  requireFile(
    'lib/localAdminMode.ts',
  )

if (
  /NODE_ENV[\s\S]{0,100}production/i.test(
    localAdminMode,
  )
) {
  pass(
    'local admin mode contains a production guard',
  )
} else {
  fail(
    'local admin mode production guard was not detected',
  )
}

if (
  /NEXT_PUBLIC_LOCAL_ADMIN_MODE/.test(
    localAdminMode,
  )
) {
  pass(
    'local admin mode requires an explicit environment flag',
  )
} else {
  fail(
    'explicit local-admin environment flag was not detected',
  )
}

/* -------------------------------------------------------
   API default
   ------------------------------------------------------- */

const apiSource =
  requireFile(
    'lib/api.ts',
  )

if (
  apiSource.includes(
    'http://localhost:4000',
  )
) {
  pass(
    'frontend API fallback remains localhost',
  )
} else {
  fail(
    'frontend API fallback is not clearly localhost',
  )
}

/* -------------------------------------------------------
   Public content decisions
   ------------------------------------------------------- */

const siteContent =
  requireFile(
    'lib/siteContent.ts',
  )

if (
  /membership[\s\S]{0,500}verified:\s*true/i.test(
    siteContent,
  )
) {
  pass(
    'membership pathway is marked verified',
  )
} else {
  fail(
    'verified membership pathway was not detected',
  )
}

if (
  /priceLabel:\s*['"]Free['"]/i.test(
    siteContent,
  )
) {
  pass(
    'membership is recorded as free',
  )
} else {
  fail(
    'free membership label was not detected',
  )
}

if (
  /brothersCommunity[\s\S]{0,350}url:\s*null/i.test(
    siteContent,
  )
) {
  pass(
    'Brothers Community remains an intentional placeholder',
  )
} else {
  fail(
    'Brothers Community placeholder safety was not detected',
  )
}

if (
  /sistersCommunity[\s\S]{0,350}url:\s*null/i.test(
    siteContent,
  )
) {
  pass(
    'Sisters Community remains an intentional placeholder',
  )
} else {
  fail(
    'Sisters Community placeholder safety was not detected',
  )
}

/* -------------------------------------------------------
   Redirect compatibility
   ------------------------------------------------------- */

const announcementsRedirect =
  requireFile(
    'app/announcements/page.tsx',
  )

if (
  /redirect\(\s*['"]\/updates['"]\s*\)/.test(
    announcementsRedirect,
  )
) {
  pass(
    '/announcements redirects to /updates',
  )
} else {
  fail(
    '/announcements does not clearly redirect to /updates',
  )
}

/* -------------------------------------------------------
   Start compatibility redirect
   ------------------------------------------------------- */

const startRedirect =
  requireFile(
    'app/start/page.tsx',
  )

if (
  /redirect\(\s*['"]\/student-guide['"]\s*\)/.test(
    startRedirect,
  )
) {
  pass(
    '/start redirects to /student-guide',
  )
} else {
  fail(
    '/start does not clearly redirect to /student-guide',
  )
}

/* -------------------------------------------------------
   Robots
   ------------------------------------------------------- */

const robots =
  requireFile(
    'app/robots.ts',
  )

if (
  /localhost/.test(
    robots,
  ) &&
  /disallow:\s*['"]\/['"]/.test(
    robots,
  )
) {
  pass(
    'local/development robots protection detected',
  )
} else {
  fail(
    'local robots protection was not detected',
  )
}

/* -------------------------------------------------------
   Public content stale-language scan
   ------------------------------------------------------- */

const publicFiles = [
  ...walk(
    path.join(
      root,
      'app',
    ),
  ),
  ...walk(
    path.join(
      root,
      'components',
    ),
  ),
]

const prohibited = [
  {
    regex: /\bRUSU\b/i,
    name: 'RUSU',
  },
  {
    regex: /\bLinktree\b/i,
    name: 'Linktree',
  },
]

for (
  const item
  of prohibited
) {
  const matches = []

  for (
    const file
    of publicFiles
  ) {
    const relative =
      path.relative(
        root,
        file,
      )

    if (
      relative
        .replaceAll('\\', '/')
        .startsWith(
          'app/about/history/',
        )
    ) {
      continue
    }

    const text =
      fs.readFileSync(
        file,
        'utf8',
      )

    if (
      item.regex.test(
        text,
      )
    ) {
      matches.push(
        relative,
      )
    }
  }

  if (
    matches.length === 0
  ) {
    pass(
      `${item.name} does not appear in non-history public UI`,
    )
  } else {
    fail(
      `${item.name} still appears in: ${matches.join(', ')}`,
    )
  }
}

/* -------------------------------------------------------
   Membership-price contradiction heuristic
   ------------------------------------------------------- */

const membershipPriceIssues = []

for (
  const file
  of publicFiles
) {
  const relative =
    path.relative(
      root,
      file,
    )

  if (
    relative
      .replaceAll('\\', '/')
      .startsWith(
        'app/about/history/',
      )
  ) {
    continue
  }

  const text =
    fs.readFileSync(
      file,
      'utf8',
    )

  if (
    /membership[\s\S]{0,100}\$\d+/i.test(
      text,
    ) ||
    /\$\d+[\s\S]{0,100}membership/i.test(
      text,
    )
  ) {
    membershipPriceIssues.push(
      relative,
    )
  }
}

if (
  membershipPriceIssues.length ===
  0
) {
  pass(
    'no obvious paid-membership contradiction detected',
  )
} else {
  fail(
    `possible paid-membership wording in: ${membershipPriceIssues.join(', ')}`,
  )
}

/* -------------------------------------------------------
   Required public page metadata
   ------------------------------------------------------- */

const metadataPages = [
  'app/page.tsx',
  'app/pray/page.tsx',
  'app/events/page.tsx',
  'app/events/[id]/page.tsx',
  'app/updates/page.tsx',
  'app/join/page.tsx',
  'app/support/page.tsx',
  'app/about/page.tsx',
  'app/contact/page.tsx',
  'app/governance/page.tsx',
  'app/privacy/page.tsx',
  'app/accessibility/page.tsx',
]

for (
  const page
  of metadataPages
) {
  const content =
    requireFile(
      page,
    )

  if (
    /export\s+const\s+metadata|generateMetadata/.test(
      content,
    )
  ) {
    pass(
      `${page} provides metadata`,
    )
  } else {
    fail(
      `${page} has no detected metadata`,
    )
  }
}

/* -------------------------------------------------------
   Result
   ------------------------------------------------------- */

console.log('')

if (failed) {
  console.error(
    'FINAL CONTENT + SAFETY AUDIT FAILED.',
  )

  process.exit(1)
}

console.log(
  'FINAL CONTENT + SAFETY AUDIT PASSED.',
)
