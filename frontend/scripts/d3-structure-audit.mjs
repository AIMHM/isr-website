import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

function read(relative) {
  return fs.readFileSync(
    path.join(root, relative),
    'utf8',
  )
}

const failures = []

function expect(condition, message) {
  if (!condition) {
    failures.push(message)
  }
}

const pray =
  read('app/pray/page.tsx')

const directory =
  read('components/PrayerSpaceDirectory.tsx')

const home =
  read('components/HomeExperience.tsx')

const events =
  read('components/EventsExperience.tsx')

const start =
  read('app/start/page.tsx')

const join =
  read('app/join/page.tsx')

const support =
  read('components/StudentSupportDirectory.tsx')

const contact =
  read('app/contact/page.tsx')

expect(
  pray.includes('id="jumuah"'),
  'Primary Jumuah section missing.',
)

expect(
  pray.includes('id="campus-prayer-spaces"'),
  'Campus prayer section missing.',
)

expect(
  pray.includes('id="daily-prayer-times"'),
  'Daily timetable section missing.',
)

expect(
  !directory.includes('JUMUAH_SERVICES'),
  'Prayer directory duplicates Jumuah.',
)

expect(
  !directory.includes('fetchPrayerTimes'),
  'Prayer directory duplicates prayer timetable.',
)

expect(
  !directory.includes('DAILY_PRAYERS'),
  'Prayer directory contains timetable logic.',
)

expect(
  home.includes('What do you need right now?'),
  'D3 homepage essentials missing.',
)

expect(
  events.includes('Search events, venues or audiences'),
  'D3 event search missing.',
)

expect(
  start.includes('Six useful first steps'),
  'D3 onboarding missing.',
)

expect(
  join.includes('Membership is free'),
  'Free membership wording missing.',
)

expect(
  join.includes('Brothers Community') &&
  join.includes('Sisters Community'),
  'Community placeholders missing.',
)

expect(
  support.includes('ISR is a student society'),
  'Support scope statement missing.',
)

expect(
  contact.includes('Official channels'),
  'Contact channels missing.',
)

console.log('\nISR D3 STRUCTURE AUDIT\n')

if (failures.length === 0) {
  console.log(
    'PASS - D3 structure is consolidated.',
  )

  process.exit(0)
}

console.error('FAIL - D3 structure issues:')

for (const failure of failures) {
  console.error(`  - ${failure}`)
}

process.exit(1)
