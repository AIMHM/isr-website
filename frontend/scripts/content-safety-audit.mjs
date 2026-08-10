import fs from 'node:fs'
import path from 'node:path'

const root =
  process.cwd()

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
            entry.name ===
            'admin'
          ) {
            return []
          }

          return collect(
            absolute,
          )
        }

        if (
          !/\.(tsx|ts)$/.test(
            entry.name,
          )
        ) {
          return []
        }

        return [
          absolute,
        ]
      },
    )
}

const publicFiles = [
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
]

const failures = []

function fail(
  file,
  message,
) {
  failures.push(
    path.relative(
      root,
      file,
    ) +
    ': ' +
    message,
  )
}

for (
  const file
  of publicFiles
) {
  const source =
    fs.readFileSync(
      file,
      'utf8',
    )

  if (
    source.includes(
      'contentOwner',
    )
  ) {
    fail(
      file,
      'internal contentOwner metadata is visible in public source',
    )
  }

  if (
    source.includes(
      'reviewedAt',
    )
  ) {
    fail(
      file,
      'internal reviewedAt metadata is visible in public source',
    )
  }

  if (
    source.includes(
      'Safer Community',
    )
  ) {
    fail(
      file,
      'public support routing references Safer Community',
    )
  }

  if (
    source.includes(
      'RUSU Student Rights',
    )
  ) {
    fail(
      file,
      'public support routing references RUSU Student Rights',
    )
  }

  if (
    /incorporated association/i.test(
      source,
    )
  ) {
    fail(
      file,
      'unsupported incorporated-association status appears publicly',
    )
  }

  if (
    /company limited by guarantee/i.test(
      source,
    )
  ) {
    fail(
      file,
      'unsupported company status appears publicly',
    )
  }

  if (
    /\bDGR\b/.test(
      source,
    )
  ) {
    fail(
      file,
      'unsupported DGR status appears publicly',
    )
  }
}

const join =
  fs.readFileSync(
    path.join(
      root,
      'app',
      'join',
      'page.tsx',
    ),
    'utf8',
  )

if (
  !join.includes(
    'Membership is free',
  )
) {
  failures.push(
    'app/join/page.tsx: free membership statement is missing',
  )
}

const support =
  fs.readFileSync(
    path.join(
      root,
      'components',
      'StudentSupportDirectory.tsx',
    ),
    'utf8',
  )

if (
  !support.includes(
    'ISR is a student society',
  )
) {
  failures.push(
    'Student Support scope statement is missing',
  )
}

console.log(
  '\nISR PUBLIC CONTENT SAFETY AUDIT\n',
)

if (
  failures.length ===
  0
) {
  console.log(
    'PASS - public content safety contracts.',
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
