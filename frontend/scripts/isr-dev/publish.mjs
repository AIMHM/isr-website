import {
  assert,
  capture,
  run,
} from './helpers.mjs'

const expectedOrigin =
  new Set([
    'https://github.com/AIMHM/isr-website.git',
    'git@github.com:AIMHM/isr-website.git',
  ])

const branch =
  capture(
    'git',
    [
      'branch',
      '--show-current',
    ],
  )

assert(
  branch ===
    'ideas',
  `Publish is only allowed from ideas. Current branch: ${branch}`,
)

const origin =
  capture(
    'git',
    [
      'remote',
      'get-url',
      'origin',
    ],
  )

assert(
  expectedOrigin.has(
    origin,
  ),
  `Refusing push. origin is not AIMHM/isr-website: ${origin}`,
)

const status =
  capture(
    'git',
    [
      'status',
      '--porcelain',
    ],
  )

const unsafe =
  status
    .split(
      '\n',
    )
    .filter(
      Boolean,
    )
    .filter(
      (line) => {
        const file =
          line.slice(
            3,
          )

        return (
          file.includes(
            '.local-data',
          ) ||
          /(^|[\\/])\.env($|\.)/.test(
            file,
          )
        )
      },
    )

assert(
  unsafe.length ===
    0,
  `Private/local files detected:\n${unsafe.join('\n')}`,
)

run(
  'git',
  [
    'diff',
    '--check',
  ],
)

console.log(
  '\nPublishing ideas to AIMHM GitHub...\n',
)

run(
  'git',
  [
    'push',
    '--set-upstream',
    'origin',
    'ideas',
  ],
)

console.log(`
=================================================
ISR IDEAS PUBLISHED TO GITHUB
=================================================

Repository:
AIMHM/isr-website

Branch:
ideas

No main merge.
No deployment.
No production changes.
`)
