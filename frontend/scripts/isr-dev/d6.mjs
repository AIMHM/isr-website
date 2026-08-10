import fs from 'node:fs'
import path from 'node:path'

import {
  appendMarkedBlock,
  assert,
  ensureImport,
  frontendRoot,
  repoRoot,
  read,
  write,
} from './helpers.mjs'

console.log(`
=================================================
ISR D6
GLOBAL UX + COLLABORATION + SAFETY
=================================================
`)

/* =========================================================
 * 1. GLOBAL QUICK ACCESS
 * ========================================================= */

const globalQuickAccess =
String.raw`'use client'

import Link from 'next/link'
import {
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  usePathname,
} from 'next/navigation'

const QUICK_LINKS = [
  {
    href:
      '/find',

    label:
      'Search ISR',

    description:
      'Find prayer spaces, events, updates and student services.',
  },
  {
    href:
      '/pray',

    label:
      'Pray at RMIT',

    description:
      'Prayer spaces, Jumu’ah and daily prayer times.',
  },
  {
    href:
      '/events',

    label:
      'Events',

    description:
      'See upcoming Islamic Society of RMIT events.',
  },
  {
    href:
      '/updates',

    label:
      'ISR Updates',

    description:
      'Check current operational notices.',
  },
  {
    href:
      '/support',

    label:
      'Student Support',

    description:
      'Contact ISR about a concern or support need.',
  },
  {
    href:
      '/join',

    label:
      'Join ISR',

    description:
      'Membership, volunteering and team pathways.',
  },
]

export default function GlobalQuickAccess() {
  const pathname =
    usePathname()

  const [
    open,
    setOpen,
  ] =
    useState(false)

  const panelRef =
    useRef<HTMLDivElement | null>(
      null,
    )

  useEffect(
    () => {
      function handleKeyDown(
        event: KeyboardEvent,
      ) {
        const target =
          event.target

        const editing =
          target instanceof
            HTMLInputElement ||
          target instanceof
            HTMLTextAreaElement ||
          (
            target instanceof
              HTMLElement &&
            target.isContentEditable
          )

        if (
          (
            event.ctrlKey ||
            event.metaKey
          ) &&
          event.key.toLowerCase() ===
            'k'
        ) {
          event.preventDefault()

          setOpen(
            (
              current,
            ) =>
              !current,
          )

          return
        }

        if (
          event.key ===
          'Escape'
        ) {
          setOpen(
            false,
          )

          return
        }

        if (
          !editing &&
          event.key ===
            '/' &&
          !open
        ) {
          event.preventDefault()

          window.location.href =
            '/find'
        }
      }

      window.addEventListener(
        'keydown',
        handleKeyDown,
      )

      return () => {
        window.removeEventListener(
          'keydown',
          handleKeyDown,
        )
      }
    },
    [
      open,
    ],
  )

  useEffect(
    () => {
      if (
        open &&
        panelRef.current
      ) {
        const firstLink =
          panelRef.current.querySelector<
            HTMLAnchorElement
          >(
            'a',
          )

        firstLink?.focus()
      }
    },
    [
      open,
    ],
  )

  if (
    pathname.startsWith(
      '/admin',
    )
  ) {
    return null
  }

  return (
    <>
      <button
        type="button"
        aria-expanded={
          open
        }
        aria-controls="isr-global-quick-access"
        onClick={() =>
          setOpen(
            (
              current,
            ) =>
              !current,
          )
        }
        className="isr-global-quick-button"
      >
        <span
          aria-hidden="true"
          className="text-lg"
        >
          ⌕
        </span>

        <span>
          Quick access
        </span>

        <span
          aria-hidden="true"
          className="hidden text-[10px] font-bold opacity-50 sm:inline"
        >
          Ctrl K
        </span>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close quick access"
            onClick={() =>
              setOpen(
                false,
              )
            }
            className="isr-global-quick-backdrop"
          />

          <div
            id="isr-global-quick-access"
            ref={
              panelRef
            }
            role="dialog"
            aria-modal="true"
            aria-labelledby="isr-global-quick-heading"
            className="isr-global-quick-panel"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                  ISR quick access
                </p>

                <h2
                  id="isr-global-quick-heading"
                  className="mt-2 text-2xl font-bold text-isr-dark-red"
                >
                  Where do you need to go?
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setOpen(
                    false,
                  )
                }
                className="isr-global-quick-close"
                aria-label="Close quick access"
              >
                ×
              </button>
            </div>

            <div className="mt-6 grid gap-2">
              {QUICK_LINKS.map(
                (
                  link,
                ) => (
                  <Link
                    key={
                      link.href
                    }
                    href={
                      link.href
                    }
                    onClick={() =>
                      setOpen(
                        false,
                      )
                    }
                    className="isr-global-quick-link"
                  >
                    <div>
                      <p className="font-bold text-isr-dark-red">
                        {link.label}
                      </p>

                      <p className="mt-1 text-xs leading-relaxed text-gray-600">
                        {link.description}
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="text-isr-turquoise"
                    >
                      →
                    </span>
                  </Link>
                ),
              )}
            </div>

            <div className="mt-5 border-t border-isr-light-blue/20 pt-4">
              <p className="text-xs leading-relaxed text-gray-500">
                Keyboard: Ctrl/Cmd + K opens this panel.
                Press / from most pages to open ISR search.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}
`

write(
  'components/GlobalQuickAccess.tsx',
  globalQuickAccess,
)

let layout =
  read(
    'app/layout.tsx',
  )

layout =
  ensureImport(
    layout,
    "import GlobalQuickAccess from '@/components/GlobalQuickAccess'",
  )

if (
  !layout.includes(
    '<GlobalQuickAccess',
  )
) {
  const bodyClose =
    layout.lastIndexOf(
      '</body>',
    )

  assert(
    bodyClose >=
      0,
    'Could not locate root </body>.',
  )

  layout =
    layout.slice(
      0,
      bodyClose,
    ) +
    `
        <GlobalQuickAccess />
      ` +
    layout.slice(
      bodyClose,
    )
}

write(
  'app/layout.tsx',
  layout,
)

console.log(
  'PASS - global ISR quick access.',
)

/* =========================================================
 * 2. PRAYER ISSUE REPORTER
 * ========================================================= */

const prayerIssueReporter =
String.raw`import Link from 'next/link'

const EMAIL =
  'isr@rmit.edu.au'

const SUBJECT =
  encodeURIComponent(
    'Prayer space information / access issue',
  )

const BODY =
  encodeURIComponent(
    [
      'Assalamu alaikum,',
      '',
      'I would like to report an issue relating to an RMIT prayer space.',
      '',
      'Campus:',
      'Building / room:',
      'What appears to be incorrect or unavailable:',
      '',
      'Jazakum Allahu khayran.',
    ].join(
      '\n',
    ),
  )

export default function PrayerIssueReporter() {
  return (
    <section
      aria-labelledby="prayer-issue-heading"
      className="isr-prayer-issue-card"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
            Help keep this accurate
          </p>

          <h2
            id="prayer-issue-heading"
            className="mt-3 text-2xl font-bold text-isr-dark-red sm:text-3xl"
          >
            Something wrong with a prayer-space detail?
          </h2>

          <p className="mt-3 max-w-2xl leading-relaxed text-gray-700">
            If a room, access detail, facility note or
            prayer-space direction appears incorrect, tell ISR
            so the information can be checked.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a
            href={
              'mailto:' +
              EMAIL +
              '?subject=' +
              SUBJECT +
              '&body=' +
              BODY
            }
            className="isr-button-primary text-center"
          >
            Report by email
          </a>

          <Link
            href="/contact"
            className="isr-button-secondary text-center"
          >
            Contact ISR
          </Link>
        </div>
      </div>
    </section>
  )
}
`

write(
  'components/PrayerIssueReporter.tsx',
  prayerIssueReporter,
)

let pray =
  read(
    'app/pray/page.tsx',
  )

pray =
  ensureImport(
    pray,
    "import PrayerIssueReporter from '@/components/PrayerIssueReporter'",
  )

if (
  !pray.includes(
    '<PrayerIssueReporter',
  )
) {
  const close =
    pray.lastIndexOf(
      '</main>',
    )

  assert(
    close >=
      0,
    'Could not locate </main> in prayer page.',
  )

  const reporter =
`
        <section className="bg-isr-cream px-4 pb-16 sm:pb-20">
          <div className="container-isr mx-auto max-w-6xl">
            <PrayerIssueReporter />
          </div>
        </section>

`

  pray =
    pray.slice(
      0,
      close,
    ) +
    reporter +
    pray.slice(
      close,
    )
}

write(
  'app/pray/page.tsx',
  pray,
)

console.log(
  'PASS - prayer issue reporting pathway.',
)

/* =========================================================
 * 3. PUBLIC CONTENT SAFETY AUDIT
 * ========================================================= */

const contentSafety =
String.raw`import fs from 'node:fs'
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
`

write(
  'scripts/content-safety-audit.mjs',
  contentSafety,
)

/* =========================================================
 * 4. GITHUB / TEAM VERIFY COMMAND
 * ========================================================= */

const verifyGithub =
String.raw`import {
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
`

write(
  'scripts/isr-dev/verify-github.mjs',
  verifyGithub,
)

/* =========================================================
 * 5. TEAM DEVELOPMENT DOCUMENTATION
 * ========================================================= */

const developmentDoc =
"# ISR Website Development\n\nThis repository is the development workspace for the Islamic Society of RMIT website.\n\n## Development repository\n\nGitHub owner: **AIMHM**\n\nRepository: **isr-website**\n\nPrimary development branch: **ideas**\n\nThe ideas branch contains unfinished development and redesign work. Its presence on GitHub does not mean the code is approved for production.\n\n## Repository independence\n\nDevelopment is currently carried out entirely within AIMHM/isr-website.\n\nThe development workflow does not push to, modify, merge into, or otherwise change another GitHub repository.\n\nIf the completed redesign is later transferred to another repository, that must be done as a separate deliberate handover step.\n\n## Production boundary\n\nDevelopment work must not automatically:\n\n- merge into main\n- deploy the website\n- modify production hosting\n- modify DNS\n- modify the production database\n- modify Supabase production data\n- modify production API configuration\n\nProduction changes require an explicit review and approval step.\n\n## Normal workflow\n\n1. Work on the ideas branch.\n2. Run the local Next.js development server.\n3. Review changes at http://localhost:3000.\n4. Run the ISR health check.\n5. Complete visual QA.\n6. Commit a coherent development checkpoint.\n7. Push ideas to AIMHM GitHub.\n8. Allow team members to review the branch.\n\n## Useful commands\n\nFrom the frontend directory:\n\n    npm run isr:health\n\nFrom the repository root:\n\n    node frontend/scripts/isr-dev/verify-github.mjs\n    node frontend/scripts/isr-dev/publish.mjs\n\n## Development data\n\nNever commit:\n\n- .env files\n- local admin data\n- passwords\n- access tokens\n- production credentials\n- database credentials\n\n## Content rules\n\nPublic ISR information should use confirmed source-of-truth content.\n\nDo not invent:\n\n- prayer-room locations\n- Jumuah arrangements\n- access hours\n- membership prices\n- institutional affiliations\n- legal status\n- charity or DGR status\n- historical founding dates\n\nInternal content-owner and review metadata belongs in administration workflows, not the public website.\n\n## History\n\nThe substantive ISR history page should not be expanded from assumptions. Historical claims should be added through the dedicated ISR history research process."

fs.writeFileSync(
  path.join(
    repoRoot,
    'DEVELOPMENT.md',
  ),
  developmentDoc.trimEnd() +
    '\n',
  'utf8',
)

const contributingDoc =
"# Contributing to the ISR Website\n\nThank you for helping improve the Islamic Society of RMIT website.\n\n## Development home\n\nCurrent development repository:\n\n**AIMHM/isr-website**\n\nActive development branch:\n\n**ideas**\n\nDo not push unfinished redesign work into another repository or production branch.\n\n## Before committing\n\nRun:\n\n    cd frontend\n    npm run isr:health\n\nThen visually check the pages you changed on localhost.\n\n## Public content\n\nKeep public language student-facing and practical.\n\nDo not expose internal:\n\n- content ownership\n- review timestamps\n- approval workflows\n- committee operations\n- compliance checklists\n\n## Prayer information\n\nPrayer and Jumuah information is operationally sensitive. Only publish confirmed details.\n\nIf uncertain, direct students to ISR rather than inventing a location or facility detail.\n\n## Student support\n\nPublic support pathways route through ISR.\n\nDo not add external support organisations or university pathways without an explicit content decision.\n\n## Membership\n\nISR membership is free.\n\n## Review\n\nA review should confirm:\n\n- the change works locally\n- mobile layout works\n- keyboard navigation remains usable\n- no private data was committed\n- source-of-truth information remains accurate\n- no production deployment is bundled into the change"

fs.writeFileSync(
  path.join(
    repoRoot,
    'CONTRIBUTING.md',
  ),
  contributingDoc.trimEnd() +
    '\n',
  'utf8',
)

const githubDirectory =
  path.join(
    repoRoot,
    '.github',
  )

fs.mkdirSync(
  githubDirectory,
  {
    recursive:
      true,
  },
)

const prTemplate =
"## What changed?\n\nDescribe the change and why it is useful.\n\n## Local QA\n\n- [ ] Tested on localhost\n- [ ] ISR health check passes\n- [ ] Desktop layout checked\n- [ ] Mobile layout checked\n- [ ] Keyboard navigation checked where relevant\n- [ ] No environment files, tokens, credentials or local admin data committed\n\n## ISR content checks\n\n- [ ] Prayer and Jumuah details are confirmed\n- [ ] Membership is not shown as paid\n- [ ] No internal ownership or review metadata is public\n- [ ] No unsupported legal or charity status claims were added\n- [ ] No unverified history claims were added\n\n## Repository boundary\n\n- [ ] Work remains within AIMHM/isr-website unless a separate handover was explicitly approved\n\n## Production\n\n- [ ] This change does not deploy automatically\n- [ ] Production changes, if any, are separately identified"

fs.writeFileSync(
  path.join(
    githubDirectory,
    'pull_request_template.md',
  ),
  prTemplate.trimEnd() +
    '\n',
  'utf8',
)

console.log(
  'PASS - team workflow documentation.',
)

/* =========================================================
 * 6. PACKAGE COMMANDS
 * ========================================================= */

const packagePath =
  path.join(
    frontendRoot,
    'package.json',
  )

const packageJson =
  JSON.parse(
    fs.readFileSync(
      packagePath,
      'utf8',
    ),
  )

packageJson.scripts ??=
  {}

packageJson.scripts[
  'isr:health'
] =
  'node scripts/isr-dev/health.mjs'

packageJson.scripts[
  'isr:github'
] =
  'node scripts/isr-dev/verify-github.mjs'

fs.writeFileSync(
  packagePath,
  JSON.stringify(
    packageJson,
    null,
    2,
  ) +
    '\n',
  'utf8',
)

console.log(
  'PASS - team npm commands.',
)

/* =========================================================
 * 7. EXTEND HEALTH CHECK
 * ========================================================= */

let health =
  read(
    'scripts/isr-dev/health.mjs',
  )

if (
  !health.includes(
    "'scripts/content-safety-audit.mjs'",
  )
) {
  const auditCandidates = [
    "'scripts/d5-audit.mjs',",
    "'scripts/d4-services-audit.mjs',",
    "'scripts/d4-regression-audit.mjs',",
  ]

  let inserted =
    false

  for (
    const anchor
    of auditCandidates
  ) {
    if (
      health.includes(
        anchor,
      )
    ) {
      health =
        health.replace(
          anchor,
          `${anchor}
  'scripts/content-safety-audit.mjs',`,
        )

      inserted =
        true

      break
    }
  }

  assert(
    inserted,
    'Could not extend health audit list.',
  )
}

write(
  'scripts/isr-dev/health.mjs',
  health,
)

/* =========================================================
 * 8. D6 CSS
 * ========================================================= */

let css =
  read(
    'app/d3-experience.css',
  )

const d6Css =
String.raw`/* ISR TOOLKIT D6 GLOBAL UX */

.isr-global-quick-button {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 80;
  display: inline-flex;
  min-height: 3rem;
  align-items: center;
  gap: 0.55rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 9999px;
  background: #5B0B05;
  padding: 0.7rem 1rem;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow:
    0 12px 34px rgba(91, 11, 5, 0.24);
}

.isr-global-quick-button:hover {
  background: #509589;
}

.isr-global-quick-backdrop {
  position: fixed;
  inset: 0;
  z-index: 89;
  background: rgba(24, 18, 18, 0.42);
  backdrop-filter: blur(3px);
}

.isr-global-quick-panel {
  position: fixed;
  right: 1rem;
  bottom: 5rem;
  z-index: 90;
  width: min(
    calc(100vw - 2rem),
    27rem
  );
  max-height: min(
    75vh,
    42rem
  );
  overflow-y: auto;
  border: 1px solid rgba(152, 174, 168, 0.3);
  border-radius: 1.5rem;
  background: #ffffff;
  padding: 1.25rem;
  box-shadow:
    0 24px 70px rgba(37, 18, 18, 0.24);
}

.isr-global-quick-close {
  display: inline-flex;
  width: 2.5rem;
  height: 2.5rem;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: rgba(234, 227, 216, 0.65);
  color: #5B0B05;
  font-size: 1.5rem;
  font-weight: 500;
}

.isr-global-quick-close:hover {
  background: #509589;
  color: #ffffff;
}

.isr-global-quick-link {
  display: flex;
  min-height: 4.5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid rgba(152, 174, 168, 0.24);
  border-radius: 1rem;
  padding: 0.9rem 1rem;
  transition:
    border-color 150ms ease,
    background-color 150ms ease;
}

.isr-global-quick-link:hover {
  border-color: rgba(80, 149, 137, 0.65);
  background: rgba(234, 227, 216, 0.32);
}

.isr-prayer-issue-card {
  overflow: hidden;
  border: 1px solid rgba(152, 174, 168, 0.3);
  border-radius: 1.75rem;
  background:
    radial-gradient(
      circle at 90% 12%,
      rgba(80, 149, 137, 0.12),
      transparent 35%
    ),
    #ffffff;
  padding: 1.5rem;
  box-shadow:
    0 10px 30px rgba(91, 11, 5, 0.05);
}

@media (min-width: 640px) {
  .isr-global-quick-button {
    right: 1.5rem;
    bottom: 1.5rem;
  }

  .isr-global-quick-panel {
    right: 1.5rem;
    bottom: 5.5rem;
  }

  .isr-prayer-issue-card {
    padding: 2rem;
  }
}

@media (max-width: 639px) {
  .isr-global-quick-button {
    right: 0.75rem;
    bottom: 0.75rem;
  }

  .isr-global-quick-panel {
    right: 0.75rem;
    bottom: 4.7rem;
    width: calc(
      100vw - 1.5rem
    );
  }
}

@media (prefers-reduced-motion: reduce) {
  .isr-global-quick-link {
    transition: none;
  }
}
`

css =
  appendMarkedBlock(
    css,
    'ISR TOOLKIT D6 GLOBAL UX',
    d6Css,
  )

write(
  'app/d3-experience.css',
  css,
)

/* =========================================================
 * 9. D6 AUDIT
 * ========================================================= */

const d6Audit =
String.raw`import fs from 'node:fs'
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

const quick =
  read(
    'components/GlobalQuickAccess.tsx',
  )

const layout =
  read(
    'app/layout.tsx',
  )

const reporter =
  read(
    'components/PrayerIssueReporter.tsx',
  )

const pray =
  read(
    'app/pray/page.tsx',
  )

const packageJson =
  JSON.parse(
    read(
      'package.json',
    ),
  )

expect(
  quick.includes(
    "event.ctrlKey",
  ) ||
  quick.includes(
    "event.metaKey",
  ),
  'Quick-access keyboard shortcut missing.',
)

expect(
  quick.includes(
    "'/find'",
  ),
  'Global ISR search shortcut missing.',
)

expect(
  quick.includes(
    "'/pray'",
  ),
  'Global prayer shortcut missing.',
)

expect(
  quick.includes(
    "pathname.startsWith",
  ) &&
  quick.includes(
    "'/admin'",
  ),
  'Quick access is not suppressed in admin.',
)

expect(
  layout.includes(
    'GlobalQuickAccess',
  ),
  'Global quick-access component missing from root layout.',
)

expect(
  reporter.includes(
    'isr@rmit.edu.au',
  ),
  'Prayer issue reporter does not route to ISR.',
)

expect(
  reporter.includes(
    '/contact',
  ),
  'Prayer issue reporter has no ISR contact fallback.',
)

expect(
  pray.includes(
    'PrayerIssueReporter',
  ),
  'Prayer issue reporter not mounted on /pray.',
)

expect(
  packageJson.scripts?.[
    'isr:health'
  ] ===
    'node scripts/isr-dev/health.mjs',
  'npm isr:health command missing.',
)

expect(
  packageJson.scripts?.[
    'isr:github'
  ] ===
    'node scripts/isr-dev/verify-github.mjs',
  'npm isr:github command missing.',
)

console.log(
  '\nISR D6 AUDIT\n',
)

if (
  failures.length ===
  0
) {
  console.log(
    'PASS - D6 global UX and workflow contracts.',
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
`

write(
  'scripts/d6-audit.mjs',
  d6Audit,
)

health =
  read(
    'scripts/isr-dev/health.mjs',
  )

if (
  !health.includes(
    "'scripts/d6-audit.mjs'",
  )
) {
  const anchor =
    "'scripts/content-safety-audit.mjs',"

  assert(
    health.includes(
      anchor,
    ),
    'Content-safety audit is not registered in health.mjs.',
  )

  health =
    health.replace(
      anchor,
      `${anchor}
  'scripts/d6-audit.mjs',`,
    )
}

write(
  'scripts/isr-dev/health.mjs',
  health,
)

console.log(`
=================================================
ISR D6 PATCH COMPLETE
=================================================

Added:
 - global quick-access panel
 - Ctrl/Cmd + K shortcut
 - / search shortcut
 - prayer information issue reporting
 - public content safety audit
 - AIMHM GitHub verification tool
 - DEVELOPMENT.md
 - CONTRIBUTING.md
 - GitHub pull-request template
 - npm isr:health
 - npm isr:github
 - D6 regression audit
`)
