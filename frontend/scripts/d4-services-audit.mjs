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

const updates =
  read(
    'components/AnnouncementsList.tsx',
  )

const announcementsLib =
  read(
    'lib/announcements.ts',
  )

const announcementsRedirect =
  read(
    'app/announcements/page.tsx',
  )

const start =
  read(
    'app/start/page.tsx',
  )

const startUtility =
  read(
    'components/StartUtilityPanel.tsx',
  )

const adminLayout =
  read(
    'app/admin/(protected)/layout.tsx',
  )

const adminUtility =
  read(
    'components/admin/AdminUtilityBar.tsx',
  )

const support =
  read(
    'app/support/page.tsx',
  ) +
  '\n' +
  read(
    'components/StudentSupportDirectory.tsx',
  )

const join =
  read(
    'app/join/page.tsx',
  )

const pray =
  read(
    'app/pray/page.tsx',
  )

const eventTools =
  read(
    'components/EventUtilities.tsx',
  )

expect(
  updates.includes(
    'Search updates',
  ),
  'ISR Updates search is missing.',
)

expect(
  updates.includes(
    "'urgent'",
  ) &&
  updates.includes(
    "'important'",
  ) &&
  updates.includes(
    "'pinned'",
  ),
  'ISR Update priority filters are missing.',
)

expect(
  updates.includes(
    'navigator.share',
  ),
  'ISR Update sharing is missing.',
)

expect(
  updates.includes(
    'navigator.clipboard',
  ),
  'ISR Update copy-link support is missing.',
)

expect(
  updates.includes(
    "'update-' +",
  ),
  'Direct update anchors are missing.',
)

expect(
  !updates.includes(
    'contentOwner',
  ),
  'Internal content owner leaked publicly.',
)

expect(
  !updates.includes(
    'reviewedAt',
  ),
  'Internal review metadata leaked publicly.',
)

expect(
  announcementsLib.includes(
    'isAnnouncementExpired',
  ),
  'Update expiry handling is missing.',
)

expect(
  announcementsLib.includes(
    'sortAnnouncements',
  ),
  'Update priority sorting is missing.',
)

expect(
  announcementsRedirect.includes(
    "redirect('/updates')",
  ) ||
  announcementsRedirect.includes(
    'redirect("/updates")',
  ),
  '/announcements no longer redirects to /updates.',
)

expect(
  start.includes(
    'StartUtilityPanel',
  ),
  'Start Here student utility panel is missing.',
)

expect(
  startUtility.includes(
    'PRAYER_SPACES',
  ),
  'Start Here campus shortcuts are not tied to the prayer-space source.',
)

expect(
  startUtility.includes(
    'ISR_PUBLIC.community.url',
  ),
  'Official ISR community pathway is missing.',
)

expect(
  adminLayout.includes(
    'AdminUtilityBar',
  ),
  'Admin public preview bar is missing.',
)

expect(
  adminUtility.includes(
    "target=\"_blank\"",
  ),
  'Admin preview links do not open separately.',
)

expect(
  adminUtility.includes(
    'noopener noreferrer',
  ),
  'Admin preview external-window protection is missing.',
)

expect(
  !support.includes(
    'Safer Community',
  ),
  'Public support page contains Safer Community.',
)

expect(
  !support.includes(
    'RUSU Student Rights',
  ),
  'Public support page contains RUSU Student Rights.',
)

expect(
  join.includes(
    'Membership is free',
  ),
  'Free membership wording has regressed.',
)

expect(
  pray.includes(
    'NextPrayerCountdown',
  ),
  'D4 smart prayer utility has regressed.',
)

expect(
  pray.includes(
    'PrayerQuickNav',
  ),
  'D4 prayer navigation has regressed.',
)

expect(
  eventTools.includes(
    'BEGIN:VCALENDAR',
  ),
  'D4 event calendar export has regressed.',
)

expect(
  eventTools.includes(
    'navigator.share',
  ),
  'D4 event sharing has regressed.',
)

console.log(
  '\nISR D4 SERVICES AUDIT\n',
)

if (
  failures.length ===
  0
) {
  console.log(
    'PASS - D4.4, D4.5 and D4.6 service contracts.',
  )

  process.exit(
    0,
  )
}

console.error(
  'FAIL - D4 service issues:',
)

for (
  const failure
  of failures
) {
  console.error(
    '  - ' +
    failure,
  )
}

process.exit(
  1,
)
