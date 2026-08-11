import fs from 'node:fs'
import path from 'node:path'

const root =
  process.cwd()

const repoRoot =
  path.resolve(
    root,
    '..',
  )

function collect(
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
        const absolute =
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
            ].includes(
              entry.name,
            )
          ) {
            return []
          }

          return collect(
            absolute,
          )
        }

        return /\.(tsx|ts|js|mjs|css|json|md)$/.test(
          entry.name,
        )
          ? [
              absolute,
            ]
          : []
      },
    )
}

const files = [
  ...collect(
    path.join(
      root,
      'app',
    ),
  ),

  ...collect(
    path.join(
      root,
      'components',
    ),
  ),

  ...collect(
    path.join(
      root,
      'lib',
    ),
  ),
]

const publicFiles =
  files.filter(
    (
      file,
    ) => {
      const relative =
        path.relative(
          root,
          file,
        )

      const inPublicApp =
        relative.startsWith(
          'app' + path.sep,
        ) &&
        !relative.startsWith(
          'app' + path.sep +
          'admin' + path.sep,
        )

      const inPublicComponents =
        relative.startsWith(
          'components' + path.sep,
        ) &&
        !relative.startsWith(
          'components' + path.sep +
          'admin' + path.sep,
        )

      return (
        (
          inPublicApp ||
          inPublicComponents
        ) &&
        !relative.includes(
          'mockData',
        )
      )
    },
  )

const critical = []
const content = []
const technical = []

function relative(
  file,
) {
  return path.relative(
    root,
    file,
  )
}

const mojibakePatterns = [
  '\u00e2\u20ac',
  '\u00c3\u00a2',
  '\u00c2\u00a0',
  '\ufffd',
]

for (
  const file
  of files
) {
  const source =
    fs.readFileSync(
      file,
      'utf8',
    )

  for (
    const pattern
    of mojibakePatterns
  ) {
    if (
      source.includes(
        pattern,
      )
    ) {
      critical.push(
        relative(file) +
        ': suspicious encoding remains',
      )

      break
    }
  }
}

const contentPatterns = [
  {
    regex:
      /prototype only/gi,

    label:
      'prototype wording',
  },
  {
    regex:
      /local prototype/gi,

    label:
      'local prototype wording',
  },
  {
    regex:
      /verification required/gi,

    label:
      'verification required',
  },
  {
    regex:
      /requires? confirmation/gi,

    label:
      'requires confirmation',
  },
  {
    regex:
      /pending confirmation/gi,

    label:
      'pending confirmation',
  },
  {
    regex:
      /to be verified/gi,

    label:
      'to be verified',
  },
  {
    regex:
      /under review/gi,

    label:
      'under review',
  },

]

for (
  const file
  of publicFiles
) {
  const source =
    fs.readFileSync(
      file,
      'utf8',
    )

  for (
    const item
    of contentPatterns
  ) {
    const matches =
      source.match(
        item.regex,
      )

    if (
      matches?.length
    ) {
      content.push(
        `${relative(file)}: ${item.label} (${matches.length})`,
      )
    }
  }

  if (
    source.includes(
      'https://example.com',
    )
  ) {
    content.push(
      relative(file) +
      ': example.com link',
    )
  }

  if (
    /\bLinktree\b/i.test(
      source,
    )
  ) {
    content.push(
      relative(file) +
      ': Linktree wording',
    )
  }

  if (
    source.includes(
      'contentOwner',
    )
  ) {
    critical.push(
      relative(file) +
      ': internal contentOwner exposed publicly',
    )
  }

  if (
    source.includes(
      'reviewedAt',
    )
  ) {
    critical.push(
      relative(file) +
      ': internal reviewedAt exposed publicly',
    )
  }
}

const packageJson =
  JSON.parse(
    fs.readFileSync(
      path.join(
        root,
        'package.json',
      ),
      'utf8',
    ),
  )

if (
  packageJson.scripts?.lint ===
    'next lint'
) {
  technical.push(
    'Lint command still uses deprecated Next.js next lint.',
  )
}

const sitemap =
  path.join(
    root,
    'app',
    'sitemap.ts',
  )

if (
  !fs.existsSync(
    sitemap,
  )
) {
  critical.push(
    'app/sitemap.ts missing',
  )
}

const robots =
  path.join(
    root,
    'app',
    'robots.ts',
  )

if (
  !fs.existsSync(
    robots,
  )
) {
  critical.push(
    'app/robots.ts missing',
  )
}

const routes = [
  '/',
  '/start',
  '/find',
  '/campuses',
  '/pray',
  '/events',
  '/updates',
  '/join',
  '/support',
  '/about',
  '/about/history',
  '/contact',
  '/governance',
  '/privacy',
  '/accessibility',
]

const report = [
  '# ISR Website Final Readiness',
  '',
  'Generated by the D12 development close-out audit.',
  '',
  '## Development status',
  '',
  'The redesign has completed its main frontend development phases.',
  '',
  'This report does not authorise deployment or a merge to production.',
  '',
  'Development repository: AIMHM/isr-website',
  '',
  'Development branch: ideas',
  '',
  '## Critical technical blockers',
  '',
]

if (
  critical.length
) {
  for (
    const item
    of critical
  ) {
    report.push(
      '- [ ] ' +
      item,
    )
  }
}
else {
  report.push(
    '- None detected by the static readiness audit.',
  )
}

report.push(
  '',
  '## Content requiring confirmation or replacement',
  '',
)

if (
  content.length
) {
  for (
    const item
    of [
      ...new Set(
        content,
      ),
    ]
  ) {
    report.push(
      '- [ ] ' +
      item,
    )
  }
}
else {
  report.push(
    '- No development or verification wording detected.',
  )
}

report.push(
  '',
  '## Technical follow-up',
  '',
)

if (
  technical.length
) {
  for (
    const item
    of technical
  ) {
    report.push(
      '- [ ] ' +
      item,
    )
  }
}
else {
  report.push(
    '- No static technical follow-up identified.',
  )
}

report.push(
  '',
  '## Public route checklist',
  '',
)

for (
  const route
  of routes
) {
  report.push(
    '- [ ] ' +
    route,
  )
}

report.push(
  '',
  '## Mandatory human verification before deployment',
  '',
  '- [ ] Prayer-space locations are current.',
  '- [ ] Jumuah venues and times are current.',
  '- [ ] Membership link is current.',
  '- [ ] Community links are current.',
  '- [ ] ISR contact details are current.',
  '- [ ] Event links and registration links are current.',
  '- [ ] Policies shown publicly are approved for publication.',
  '- [ ] History claims have completed the separate history research process.',
  '- [ ] Mobile visual QA completed.',
  '- [ ] Keyboard QA completed.',
  '- [ ] Production build completed.',
  '- [ ] Final deployment decision explicitly approved.',
  '',
  '## Repository boundary',
  '',
  'This development remains in AIMHM/isr-website on the ideas branch.',
  '',
  'No merge, deployment, production database change, Supabase production change, DNS change or Captain-Fahd repository change is authorised by this report.',
  '',
)

fs.writeFileSync(
  path.join(
    repoRoot,
    'FINAL_READINESS.md',
  ),
  report.join(
    '\n',
  ),
  'utf8',
)

console.log(
  '\nISR FINAL READINESS AUDIT\n',
)

console.log(
  `Critical blockers: ${critical.length}`,
)

console.log(
  `Content confirmations: ${new Set(content).size}`,
)

console.log(
  `Technical follow-ups: ${technical.length}`,
)

console.log(
  '\nReport written: FINAL_READINESS.md',
)

if (
  critical.length
) {
  console.error(
    '\nFAIL - critical readiness blockers remain.',
  )

  for (
    const item
    of critical
  ) {
    console.error(
      'FAIL - ' +
      item,
    )
  }

  process.exit(
    1,
  )
}

console.log(
  '\nPASS - no critical static readiness blockers.',
)

if (
  content.length
) {
  console.log(
    'NOTE - content confirmations remain and are recorded in FINAL_READINESS.md.',
  )
}
