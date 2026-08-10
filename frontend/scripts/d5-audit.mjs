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

const find =
  read(
    'components/FindExperience.tsx',
  )

const findPage =
  read(
    'app/find/page.tsx',
  )

const campuses =
  read(
    'components/CampusDirectoryExperience.tsx',
  )

const campusPage =
  read(
    'app/campuses/page.tsx',
  )

const start =
  read(
    'components/StartUtilityPanel.tsx',
  )

const notFound =
  read(
    'app/not-found.tsx',
  )

const layout =
  read(
    'app/layout.tsx',
  )

const structured =
  read(
    'components/PublicStructuredData.tsx',
  )

const prayerDirectory =
  read(
    'components/PrayerSpaceDirectory.tsx',
  )

expect(
  find.includes(
    'fetchEvents',
  ),
  'Find page does not search events.',
)

expect(
  find.includes(
    'fetchAnnouncements',
  ),
  'Find page does not search ISR Updates.',
)

expect(
  find.includes(
    'PRAYER_SPACES',
  ),
  'Find page does not search prayer spaces.',
)

expect(
  find.includes(
    "'/updates#update-'",
  ),
  'Find page does not deep-link ISR Updates.',
)

expect(
  findPage.includes(
    'Metadata',
  ),
  'Find page metadata missing.',
)

expect(
  campuses.includes(
    'PRAYER_SPACES',
  ),
  'Campus guide is not tied to central prayer data.',
)

expect(
  campuses.includes(
    '/pray#jumuah',
  ),
  'Campus guide Jumuah pathway missing.',
)

expect(
  campusPage.includes(
    'Metadata',
  ),
  'Campus page metadata missing.',
)

expect(
  start.includes(
    "'/find'",
  ),
  'Start Here search shortcut missing.',
)

expect(
  start.includes(
    "'/campuses'",
  ),
  'Start Here campus shortcut missing.',
)

expect(
  notFound.includes(
    '/find',
  ),
  '404 search recovery missing.',
)

expect(
  notFound.includes(
    '/pray',
  ),
  '404 prayer recovery missing.',
)

expect(
  layout.includes(
    'Skip to main content',
  ),
  'Global skip link missing.',
)

expect(
  layout.includes(
    'id="isr-page-content"',
  ),
  'Skip-link target missing.',
)

expect(
  layout.includes(
    'PublicStructuredData',
  ),
  'Structured data component missing from layout.',
)

expect(
  structured.includes(
    "'Organization'",
  ),
  'Organization structured data missing.',
)

expect(
  !structured.includes(
    'Charity',
  ),
  'Unsupported charity claim in structured data.',
)

expect(
  !structured.includes(
    'incorporated',
  ),
  'Unsupported incorporated-status claim in structured data.',
)

expect(
  !prayerDirectory.includes(
    'JUMUAH_SERVICES',
  ),
  'Prayer directory duplicates Jumuah.',
)

expect(
  !prayerDirectory.includes(
    'fetchPrayerTimes',
  ),
  'Prayer directory duplicates daily timetable.',
)

console.log(
  '\nISR D5 AUDIT\n',
)

if (
  failures.length ===
  0
) {
  console.log(
    'PASS - D5 discovery, campus and accessibility contracts.',
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
