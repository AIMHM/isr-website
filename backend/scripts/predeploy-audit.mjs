import fs from 'node:fs'
import path from 'node:path'

const root =
  process.cwd()

const errors = []
const warnings = []

function fail(
  message,
) {
  errors.push(
    message,
  )
}

function warn(
  message,
) {
  warnings.push(
    message,
  )
}

function read(
  relativePath,
) {
  const fullPath =
    path.join(
      root,
      relativePath,
    )

  if (
    !fs.existsSync(
      fullPath,
    )
  ) {
    fail(
      `Missing required file: ${relativePath}`,
    )

    return ''
  }

  return fs.readFileSync(
    fullPath,
    'utf8',
  )
}

const packageJson =
  JSON.parse(
    read(
      'package.json',
    ) ||
      '{}',
  )

if (
  packageJson.scripts?.start !==
  'node dist/index.js'
) {
  fail(
    'Backend start command must point to dist/index.js',
  )
}

const schema =
  read(
    'prisma/schema.prisma',
  )

const requiredModels = [
  'Event',
  'Announcement',
  'Program',
  'ProgramException',
  'PrayerSpace',
  'JumuahService',
]

for (
  const model
  of requiredModels
) {
  if (
    !schema.includes(
      `model ${model} `,
    ) &&
    !schema.includes(
      `model ${model}\n`,
    )
  ) {
    fail(
      `Prisma schema missing model: ${model}`,
    )
  }
}

const migrationsDir =
  path.join(
    root,
    'prisma',
    'migrations',
  )

const migrationNames =
  fs.existsSync(
    migrationsDir,
  )
    ? fs
        .readdirSync(
          migrationsDir,
          {
            withFileTypes:
              true,
          },
        )
        .filter(
          (
            entry,
          ) =>
            entry.isDirectory(),
        )
        .map(
          (
            entry,
          ) =>
            entry.name,
        )
        .sort()
    : []

const expectedMigrations = [
  '20260625235330_init',
  '20260725000000_add_announcements',
  '20260728000000_optional_ticket_url',
  '20260809000000_expand_public_content',
  '20260814000000_add_programs',
  '20260816020000_event_2_0',
  '20260816030000_publication_workflow',
  '20260816040000_notice_workflow',
  '20260821020000_prayer_persistence',
  '20260830063000_seed_verified_prayer_content',
]

for (
  const migration
  of expectedMigrations
) {
  if (
    !migrationNames.includes(
      migration,
    )
  ) {
    fail(
      `Expected migration missing: ${migration}`,
    )
  }
}

for (
  const migration
  of migrationNames
) {
  const sqlPath =
    path.join(
      migrationsDir,
      migration,
      'migration.sql',
    )

  if (
    !fs.existsSync(
      sqlPath,
    )
  ) {
    fail(
      `Migration SQL missing: ${migration}`,
    )

    continue
  }

  const sql =
    fs.readFileSync(
      sqlPath,
      'utf8',
    )

  const destructivePatterns = [
    {
      label:
        'DROP TABLE',
      pattern:
        /\bDROP\s+TABLE\b/i,
    },
    {
      label:
        'DROP COLUMN',
      pattern:
        /\bDROP\s+COLUMN\b/i,
    },
    {
      label:
        'TRUNCATE',
      pattern:
        /\bTRUNCATE\b/i,
    },
    {
      label:
        'DELETE FROM',
      pattern:
        /\bDELETE\s+FROM\b/i,
    },
  ]

  for (
    const check
    of destructivePatterns
  ) {
    if (
      check.pattern.test(
        sql,
      )
    ) {
      warn(
        `${migration} contains ${check.label}; manual review required`,
      )
    }
  }
}

const noticeMigration =
  read(
    'prisma/migrations/20260816040000_notice_workflow/migration.sql',
  )

if (
  !noticeMigration.includes(
    'UPDATE "Announcement"',
  )
) {
  fail(
    'Notice workflow migration no longer preserves existing announcement visibility',
  )
}

const publicationMigration =
  read(
    'prisma/migrations/20260816030000_publication_workflow/migration.sql',
  )

if (
  !publicationMigration.includes(
    'UPDATE "Event"',
  )
) {
  fail(
    'Publication workflow migration no longer preserves existing event visibility',
  )
}

if (
  !publicationMigration.includes(
    'ALTER COLUMN "publicationStatus" SET DEFAULT \'draft\'',
  )
) {
  fail(
    'Program publication default migration is missing',
  )
}

const prayerMigration =
  read(
    'prisma/migrations/20260821020000_prayer_persistence/migration.sql',
  )

for (
  const table
  of [
    'PrayerSpace',
    'JumuahService',
  ]
) {
  if (
    !prayerMigration.includes(
      `CREATE TABLE "${table}"`,
    )
  ) {
    fail(
      `Prayer persistence migration missing table: ${table}`,
    )
  }
}

const confirmedPrayerMigration =
  read(
    'prisma/migrations/20260830063000_seed_verified_prayer_content/migration.sql',
  )

for (
  const marker
  of [
    "'city'",
    "'bundoora-east'",
    "'bundoora-west'",
    "'brunswick'",
    "'city-jumuah'",
    "'bundoora-jumuah'",
    "'12:30 pm'",
    "'1:30 pm'",
    '202.04.01',
    'Jumu’ah livestream',
    "'published'",
    "'verified'",
    '30 August 2026',
    'ON CONFLICT',
  ]
) {
  if (
    !confirmedPrayerMigration.includes(
      marker,
    )
  ) {
    fail(
      `Confirmed prayer migration missing marker: ${marker}`,
    )
  }
}

const prayerController =
  read(
    'controllers/prayerTimesController.ts',
  )

if (
  !prayerController.includes(
    "'Australia/Melbourne'",
  )
) {
  fail(
    'Prayer controller is not explicitly Melbourne-timezone aware',
  )
}

if (
  !prayerController.includes(
    'const METHOD =',
  ) ||
  !prayerController.includes(
    '3; // Muslim World League',
  )
) {
  fail(
    'Prayer calculation method must remain confirmed MWL / AlAdhan method 3',
  )
}

const prayerContentRoute =
  read(
    'routes/prayerContent.ts',
  )

for (
  const protectedRoute
  of [
    '"/admin/all"',
    '"/spaces/:id"',
    '"/jumuah/:id"',
  ]
) {
  if (
    !prayerContentRoute.includes(
      protectedRoute,
    )
  ) {
    fail(
      `Prayer-content route missing: ${protectedRoute}`,
    )
  }
}

if (
  !prayerContentRoute.includes(
    'checkAuth',
  )
) {
  fail(
    'Prayer admin routes are not using authentication middleware',
  )
}

console.log('')
console.log(
  'ISR BACKEND PREDEPLOY AUDIT',
)
console.log(
  '===========================',
)

console.log(
  `Migrations found: ${migrationNames.length}`,
)

console.log(
  `Errors: ${errors.length}`,
)

console.log(
  `Warnings: ${warnings.length}`,
)

if (
  warnings.length >
  0
) {
  console.log('')
  console.log(
    'MANUAL REVIEW ITEMS',
  )

  for (
    const warning
    of warnings
  ) {
    console.log(
      `- ${warning}`,
    )
  }
}

if (
  errors.length >
  0
) {
  console.error('')
  console.error(
    'ERRORS',
  )

  for (
    const error
    of errors
  ) {
    console.error(
      `- ${error}`,
    )
  }

  process.exit(1)
}

console.log('')
console.log(
  'STATIC BACKEND AUDIT PASSED',
)

console.log(
  'No database connection or migration was performed.',
)
