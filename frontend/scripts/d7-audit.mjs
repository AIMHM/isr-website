import fs from 'node:fs'
import path from 'node:path'

const root =
  process.cwd()

function read(
  file,
) {
  return fs.readFileSync(
    path.join(
      root,
      file,
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

const home =
  read(
    'app/page.tsx',
  )

const dashboard =
  read(
    'components/HomeStudentDashboard.tsx',
  )

const join =
  read(
    'app/join/page.tsx',
  )

const membership =
  read(
    'components/JoinMembershipSpotlight.tsx',
  )

const support =
  read(
    'app/support/page.tsx',
  )

const triage =
  read(
    'components/SupportTriage.tsx',
  )

expect(
  home.includes(
    'HomeStudentDashboard',
  ),
  'Homepage dashboard is not mounted.',
)

expect(
  dashboard.includes(
    'fetchPrayerTimes',
  ),
  'Homepage dashboard has no prayer data.',
)

expect(
  dashboard.includes(
    'fetchEvents',
  ),
  'Homepage dashboard has no event data.',
)

expect(
  dashboard.includes(
    'fetchAnnouncements',
  ),
  'Homepage dashboard has no updates data.',
)

expect(
  dashboard.includes(
    'This is not a',
  ) &&
  dashboard.includes(
    'iqamah',
  ),
  'Prayer dashboard does not distinguish prayer time from iqamah.',
)

expect(
  join.includes(
    'JoinMembershipSpotlight',
  ),
  'Join membership spotlight is not mounted.',
)

expect(
  membership.includes(
    'Membership is free',
  ),
  'Free membership message is missing.',
)

expect(
  membership.includes(
    'campus.hellorubric.com',
  ),
  'Rubric membership pathway is missing.',
)

expect(
  support.includes(
    'SupportTriage',
  ),
  'Support triage is not mounted.',
)

expect(
  triage.includes(
    'isr@rmit.edu.au',
  ),
  'Support triage is not routed to ISR.',
)

expect(
  !triage.includes(
    'Safer Community',
  ),
  'Support triage contains an unapproved external pathway.',
)

expect(
  !triage.includes(
    'RUSU',
  ),
  'Support triage contains RUSU.',
)

console.log(
  '\nISR D7 AUDIT\n',
)

if (
  failures.length ===
  0
) {
  console.log(
    'PASS - D7 student experience contracts.',
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
