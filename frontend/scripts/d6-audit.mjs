import fs from 'node:fs'
import path from 'node:path'

const root =
  process.cwd()

function read(
  relative,
) {
  return fs.readFileSync(
    path.join(
      root,
      relative,
    ),
    'utf8',
  )
}

const failures = []

function expect(
  condition,
  message,
) {
  if (!condition) {
    failures.push(
      message,
    )
  }
}

const quick =
  read(
    'components/GlobalQuickAccess.tsx',
  )

const layout =
  read(
    'app/layout.tsx',
  )

const reporter =
  read(
    'components/PrayerIssueReporter.tsx',
  )

const pray =
  read(
    'app/pray/page.tsx',
  )

const packageJson =
  JSON.parse(
    read(
      'package.json',
    ),
  )

expect(
  quick.includes(
    "event.ctrlKey",
  ) ||
  quick.includes(
    "event.metaKey",
  ),
  'Quick-access keyboard shortcut missing.',
)

expect(
  quick.includes(
    "'/find'",
  ),
  'Global ISR search shortcut missing.',
)

expect(
  quick.includes(
    "'/pray'",
  ),
  'Global prayer shortcut missing.',
)

expect(
  quick.includes(
    "pathname.startsWith",
  ) &&
  quick.includes(
    "'/admin'",
  ),
  'Quick access is not suppressed in admin.',
)

expect(
  layout.includes(
    'GlobalQuickAccess',
  ),
  'Global quick-access component missing from root layout.',
)

expect(
  reporter.includes(
    'isr@rmit.edu.au',
  ),
  'Prayer issue reporter does not route to ISR.',
)

expect(
  reporter.includes(
    '/contact',
  ),
  'Prayer issue reporter has no ISR contact fallback.',
)

expect(
  pray.includes(
    'PrayerIssueReporter',
  ),
  'Prayer issue reporter not mounted on /pray.',
)

expect(
  packageJson.scripts?.[
    'isr:health'
  ] ===
    'node scripts/isr-dev/health.mjs',
  'npm isr:health command missing.',
)

expect(
  packageJson.scripts?.[
    'isr:github'
  ] ===
    'node scripts/isr-dev/verify-github.mjs',
  'npm isr:github command missing.',
)

console.log(
  '\nISR D6 AUDIT\n',
)

if (
  failures.length ===
  0
) {
  console.log(
    'PASS - D6 global UX and workflow contracts.',
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
