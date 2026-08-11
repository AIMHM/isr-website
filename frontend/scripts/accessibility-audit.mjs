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

const files = [
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

for (
  const file
  of files
) {
  const source =
    fs.readFileSync(
      file,
      'utf8',
    )

  if (
    source.includes(
      'target="_blank"',
    ) &&
    !source.includes(
      'noopener',
    )
  ) {
    failures.push(
      path.relative(
        root,
        file,
      ) +
      ': target blank without noopener',
    )
  }

  if (
    /<img\b/.test(
      source,
    ) &&
    !/alt=/.test(
      source,
    )
  ) {
    failures.push(
      path.relative(
        root,
        file,
      ) +
      ': raw img may be missing alt text',
    )
  }
}

const layout =
  fs.readFileSync(
    path.join(
      root,
      'app/layout.tsx',
    ),
    'utf8',
  )

if (
  !layout.includes(
    'Skip to main content',
  )
) {
  failures.push(
    'Global skip link missing',
  )
}

const css =
  fs.readFileSync(
    path.join(
      root,
      'app/d3-experience.css',
    ),
    'utf8',
  )

if (
  !css.includes(
    'prefers-reduced-motion',
  )
) {
  failures.push(
    'Reduced motion rules missing',
  )
}

if (
  !css.includes(
    ':focus-visible',
  )
) {
  failures.push(
    'Focus-visible styles missing',
  )
}

console.log(
  '\nISR ACCESSIBILITY STATIC AUDIT\n',
)

if (
  failures.length ===
  0
) {
  console.log(
    'PASS - accessibility static contracts.',
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
