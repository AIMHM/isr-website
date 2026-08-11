import fs from 'node:fs'
import path from 'node:path'

import {
  capture,
  checkRoutes,
  frontendRoot,
  run,
} from './helpers.mjs'

console.log(
  '\n=================================================',
)

console.log(
  'ISR LOCAL WEBSITE HEALTH CHECK',
)

console.log(
  '=================================================\n',
)

const branch =
  capture(
    'git',
    [
      'branch',
      '--show-current',
    ],
  )

if (
  branch !==
  'ideas'
) {
  throw new Error(
    'Unexpected branch: ' +
    branch,
  )
}

console.log(
  'PASS - branch: ' +
  branch,
)

const status =
  capture(
    'git',
    [
      'status',
      '--porcelain',
    ],
  )

const unsafe =
  status
    .split(
      '\n',
    )
    .filter(
      Boolean,
    )
    .filter(
      (
        line,
      ) => {
        const file =
          line.slice(
            3,
          )

        return (
          file.includes(
            '.local-data',
          ) ||
          /(^|[\\/])\.env($|\.)/.test(
            file,
          )
        )
      },
    )

if (
  unsafe.length >
  0
) {
  throw new Error(
    'Private/local files visible to Git:\n' +
    unsafe.join(
      '\n',
    ),
  )
}

console.log(
  'PASS - private/local Git safety.',
)

run(
  'git',
  [
    'diff',
    '--check',
  ],
)

run(
  'npm.cmd',
  [
    'run',
    'lint',
  ],
  {
    cwd:
      frontendRoot,
  },
)

const audits = [
  'scripts/route-audit.mjs',
  'scripts/link-audit.mjs',
  'scripts/final-audit.mjs',
  'scripts/encoding-audit.mjs',
  'scripts/d3-structure-audit.mjs',
  'scripts/d4-regression-audit.mjs',
  'scripts/d4-services-audit.mjs',
  'scripts/d5-audit.mjs',
  'scripts/content-safety-audit.mjs',
  'scripts/d6-audit.mjs',
  'scripts/d7-audit.mjs',
  'scripts/d8-audit.mjs',
  'scripts/finish-sprint-audit.mjs',
  'scripts/readiness-audit.mjs',
  'scripts/accessibility-audit.mjs',
  'scripts/seo-audit.mjs',
]

for (
  const audit
  of audits
) {
  const absolute =
    path.join(
      frontendRoot,
      audit,
    )

  if (
    !fs.existsSync(
      absolute,
    )
  ) {
    continue
  }

  run(
    'node',
    [
      audit,
    ],
    {
      cwd:
        frontendRoot,
    },
  )
}

console.log(
  '\nLIVE LOCALHOST:',
)

await checkRoutes(
  [
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
    '/admin/login',
    '/admin/events',
    '/admin/announcements',
  ],
)

const missing =
  await fetch(
    'http://localhost:3000/isr-health-check-not-a-real-page',
  )

if (
  missing.status !==
  404
) {
  throw new Error(
    '404 regression failed. Received HTTP ' +
    missing.status,
  )
}

console.log(
  'PASS  404  missing route',
)

console.log(
  '\n=================================================',
)

console.log(
  'ISR LOCAL HEALTH CHECK PASSED',
)

console.log(
  '=================================================\n',
)
