import {
  assert,
  capture,
  repoRoot,
  run,
} from './helpers.mjs'

const args =
  process.argv.slice(
    2,
  )

function option(
  name,
) {
  const index =
    args.indexOf(
      name,
    )

  if (
    index < 0 ||
    !args[
      index + 1
    ]
  ) {
    return null
  }

  return args[
    index + 1
  ]
}

const tag =
  option(
    '--tag',
  )

const message =
  option(
    '--message',
  )

assert(
  tag,
  'Missing --tag',
)

assert(
  message,
  'Missing --message',
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
    'redesign/d4-features',
  `Unexpected branch: ${branch}`,
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
    .filter(Boolean)
    .filter(
      (line) =>
        line.includes(
          '.local-data',
        ) ||
        /(^|[\\/])\.env($|\.)/.test(
          line.slice(
            3,
          ),
        ),
    )

assert(
  unsafe.length ===
    0,
  `Private/local files detected:\n${unsafe.join('\n')}`,
)

run(
  'git',
  [
    'add',
    'frontend/app',
    'frontend/components',
    'frontend/scripts',
  ],
)

const staged =
  capture(
    'git',
    [
      'diff',
      '--cached',
      '--name-only',
    ],
  )

const stagedUnsafe =
  staged
    .split(
      '\n',
    )
    .filter(Boolean)
    .filter(
      (file) =>
        file.includes(
          '.local-data',
        ) ||
        /(^|[\\/])\.env($|\.)/.test(
          file,
        ),
    )

if (
  stagedUnsafe.length >
  0
) {
  run(
    'git',
    [
      'reset',
    ],
  )

  throw new Error(
    `Unsafe files entered staging:\n${stagedUnsafe.join('\n')}`,
  )
}

run(
  'git',
  [
    'diff',
    '--cached',
    '--check',
  ],
)

const stagedStatus =
  run(
    'git',
    [
      'diff',
      '--cached',
      '--quiet',
    ],
    {
      allowFailure:
        true,
    },
  )

if (
  stagedStatus ===
  1
) {
  run(
    'git',
    [
      'commit',
      '-m',
      message,
    ],
  )
}
else {
  console.log(
    'No uncommitted staged changes.',
  )
}

const existingTag =
  capture(
    'git',
    [
      'tag',
      '--list',
      tag,
    ],
  )

if (!existingTag) {
  run(
    'git',
    [
      'tag',
      tag,
    ],
  )
}

console.log(`
=================================================
LOCAL CHECKPOINT COMPLETE
=================================================

Branch:
${branch}

Tag:
${tag}

No push.
No deployment.
`)
