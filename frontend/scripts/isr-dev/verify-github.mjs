import {
  assert,
  capture,
} from './helpers.mjs'

console.log(
  '\n=================================================',
)

console.log(
  'ISR GITHUB DEVELOPMENT CHECK',
)

console.log(
  '=================================================\n',
)

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
  'Expected ideas branch. Current: ' +
    branch,
)

console.log(
  'PASS - branch: ideas',
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

const allowed =
  new Set([
    'https://github.com/AIMHM/isr-website.git',
    'git@github.com:AIMHM/isr-website.git',
  ])

assert(
  allowed.has(
    origin,
  ),
  'origin is not AIMHM/isr-website: ' +
    origin,
)

console.log(
  'PASS - origin: ' +
  origin,
)

const remotes =
  capture(
    'git',
    [
      'remote',
      '-v',
    ],
  )

console.log(
  '\nConfigured remotes:\n' +
  remotes,
)

const local =
  capture(
    'git',
    [
      'rev-parse',
      'ideas',
    ],
  )

let remote = ''

try {
  remote =
    capture(
      'git',
      [
        'rev-parse',
        'origin/ideas',
      ],
    )
}
catch {
  console.log(
    '\nNOTE - origin/ideas has not been fetched or published yet.',
  )
}

if (
  remote
) {
  if (
    local ===
    remote
  ) {
    console.log(
      '\nPASS - local ideas matches origin/ideas.',
    )
  }
  else {
    console.log(
      '\nNOTE - local ideas and origin/ideas differ.',
    )
  }
}

console.log(
  '\nNo production deployment was performed by this check.',
)
