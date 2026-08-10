import fs from 'node:fs'
import path from 'node:path'

const root =
  process.cwd()

function read(
  file,
) {
  return fs.readFileSync(
    path.join(
      root,
      file,
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

const css =
  read(
    'app/d3-experience.css',
  )

const nav =
  read(
    'components/Navbar.tsx',
  )

const footer =
  read(
    'components/Footer.tsx',
  )

expect(
  css.includes(
    'ISR TOOLKIT D8 PROFESSIONAL POLISH',
  ),
  'D8 visual layer missing.',
)

expect(
  css.includes(
    'prefers-reduced-motion',
  ),
  'Reduced-motion protection missing.',
)

expect(
  css.includes(
    ':focus-visible',
  ),
  'Focus-visible styling missing.',
)

expect(
  css.includes(
    '.isr-button-primary',
  ),
  'Primary button system missing.',
)

expect(
  css.includes(
    '.isr-card-interactive',
  ),
  'Interactive card refinement missing.',
)

expect(
  nav.includes(
    '/find',
  ),
  'Navbar has no ISR Search route.',
)

expect(
  footer.includes(
    "'/find'",
  ),
  'Footer search link missing.',
)

expect(
  footer.includes(
    "'/campuses'",
  ),
  'Footer Campus Guide link missing.',
)

console.log(
  '\nISR D8 AUDIT\n',
)

if (
  failures.length ===
  0
) {
  console.log(
    'PASS - D8 visual refinement contracts.',
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
