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
  value,
  message,
) {
  if (!value) {
    failures.push(
      message,
    )
  }
}

const pray =
  read(
    'app/pray/page.tsx',
  )

const guidance =
  read(
    'components/PrayerPageGuidance.tsx',
  )

const css =
  read(
    'app/d3-experience.css',
  )

const adminQa =
  read(
    'components/admin/AdminContentQaPanel.tsx',
  )

expect(
  pray.includes(
    'PrayerPageGuidance',
  ),
  'Prayer guidance not mounted.',
)

expect(
  guidance.includes(
    '/campuses',
  ),
  'Prayer guidance lacks campus guide.',
)

expect(
  guidance.includes(
    '/pray#jumuah',
  ),
  'Prayer guidance lacks Jumuah shortcut.',
)

expect(
  css.includes(
    '[id^="update-"]:target',
  ),
  'Update deep-link highlighting missing.',
)

expect(
  adminQa.includes(
    'Public preview',
  ),
  'Admin QA public preview missing.',
)

expect(
  adminQa.includes(
    '/admin/events',
  ),
  'Admin QA events link missing.',
)

console.log(
  '\nISR FINISH SPRINT AUDIT\n',
)

if (
  failures.length ===
  0
) {
  console.log(
    'PASS - finish sprint contracts.',
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
