import fs from 'node:fs'
import path from 'node:path'

const root =
  process.cwd()

const failures = []
const warnings = []

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

        return (
          /\.(tsx|ts)$/.test(
            entry.name,
          )
            ? [
                absolute,
              ]
            : []
        )
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

for (
  const file
  of publicFiles
) {
  const source =
    fs.readFileSync(
      file,
      'utf8',
    )

  const relative =
    path.relative(
      root,
      file,
    )

  if (
    source.includes(
      'Linktree',
    )
  ) {
    failures.push(
      relative +
      ': Linktree reference remains',
    )
  }

  if (
    source.includes(
      'contentOwner',
    )
  ) {
    failures.push(
      relative +
      ': internal contentOwner exposed publicly',
    )
  }

  if (
    source.includes(
      'reviewedAt',
    )
  ) {
    failures.push(
      relative +
      ': internal reviewedAt exposed publicly',
    )
  }

  if (
    /prototype only/i.test(
      source,
    )
  ) {
    warnings.push(
      relative +
      ': prototype wording remains',
    )
  }

  if (
    /verification required/i.test(
      source,
    )
  ) {
    warnings.push(
      relative +
      ': verification wording remains',
    )
  }

  if (
    /pending confirmation/i.test(
      source,
    )
  ) {
    warnings.push(
      relative +
      ': pending confirmation wording remains',
    )
  }
}

console.log(
  '\nISR READINESS AUDIT\n',
)

for (
  const warning
  of warnings
) {
  console.log(
    'WARN - ' +
    warning,
  )
}

if (
  failures.length ===
  0
) {
  console.log(
    '\nPASS - no critical public readiness violations.',
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
