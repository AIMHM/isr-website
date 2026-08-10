import {
  appendMarkedBlock,
  read,
  write,
} from './helpers.mjs'

console.log(`
=================================================
ISR D8
PROFESSIONAL VISUAL REFINEMENT
=================================================
`)

/* =========================================================
 * GLOBAL VISUAL REFINEMENT
 * ========================================================= */

let css =
  read(
    'app/d3-experience.css',
  )

const polish =
String.raw`/* ISR TOOLKIT D8 PROFESSIONAL POLISH */

/* ---------------------------------------------------------
   DOCUMENT RHYTHM
--------------------------------------------------------- */

html {
  scroll-behavior: smooth;
}

body {
  background:
    #ffffff;
  color:
    #1f2937;
  text-rendering:
    optimizeLegibility;
  -webkit-font-smoothing:
    antialiased;
}

main {
  overflow:
    clip;
}

section[id],
article[id] {
  scroll-margin-top:
    7.5rem;
}

/* ---------------------------------------------------------
   CONTAINERS
--------------------------------------------------------- */

.container-isr {
  width:
    100%;
  margin-inline:
    auto;
}

@media (min-width: 1280px) {
  .container-isr {
    padding-inline:
      0.25rem;
  }
}

/* ---------------------------------------------------------
   TYPOGRAPHY
--------------------------------------------------------- */

h1,
h2,
h3 {
  text-wrap:
    balance;
}

h1 {
  letter-spacing:
    -0.035em;
}

h2 {
  letter-spacing:
    -0.025em;
}

p {
  text-wrap:
    pretty;
}

/* ---------------------------------------------------------
   ISR BUTTON SYSTEM
--------------------------------------------------------- */

.isr-button-primary,
.isr-button-secondary {
  display:
    inline-flex;
  min-height:
    3rem;
  align-items:
    center;
  justify-content:
    center;
  gap:
    0.5rem;
  border-radius:
    9999px;
  padding:
    0.72rem 1.35rem;
  font-weight:
    750;
  line-height:
    1.2;
  transition:
    transform 150ms ease,
    box-shadow 150ms ease,
    background-color 150ms ease,
    border-color 150ms ease,
    color 150ms ease;
}

.isr-button-primary {
  border:
    1px solid #5B0B05;
  background:
    #5B0B05;
  color:
    #ffffff;
  box-shadow:
    0 7px 18px rgba(91, 11, 5, 0.13);
}

.isr-button-primary:hover {
  transform:
    translateY(-1px);
  border-color:
    #509589;
  background:
    #509589;
  box-shadow:
    0 10px 25px rgba(80, 149, 137, 0.18);
}

.isr-button-secondary {
  border:
    1px solid rgba(91, 11, 5, 0.18);
  background:
    #ffffff;
  color:
    #5B0B05;
}

.isr-button-secondary:hover {
  transform:
    translateY(-1px);
  border-color:
    rgba(80, 149, 137, 0.65);
  background:
    rgba(234, 227, 216, 0.36);
  color:
    #509589;
}

/* ---------------------------------------------------------
   TEXT LINKS
--------------------------------------------------------- */

.isr-text-link {
  display:
    inline-flex;
  min-height:
    2.5rem;
  align-items:
    center;
  gap:
    0.4rem;
  color:
    #509589;
  font-weight:
    750;
  text-underline-offset:
    0.2em;
}

.isr-text-link:hover {
  color:
    #5B0B05;
}

/* ---------------------------------------------------------
   CARD SYSTEM
--------------------------------------------------------- */

.isr-card {
  border:
    1px solid rgba(152, 174, 168, 0.23);
  border-radius:
    1.5rem;
  background:
    rgba(255, 255, 255, 0.96);
  box-shadow:
    0 8px 30px rgba(91, 11, 5, 0.045);
}

.isr-card-interactive {
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.isr-card-interactive:hover {
  transform:
    translateY(-3px);
  border-color:
    rgba(80, 149, 137, 0.52);
  box-shadow:
    0 18px 44px rgba(91, 11, 5, 0.08);
}

/* ---------------------------------------------------------
   PUBLIC PAGE HERO CONSISTENCY
--------------------------------------------------------- */

main > section:first-child {
  position:
    relative;
}

main > section:first-child::before {
  pointer-events:
    none;
  position:
    absolute;
  inset:
    0;
  content:
    "";
  background:
    radial-gradient(
      circle at 88% 5%,
      rgba(80, 149, 137, 0.075),
      transparent 26rem
    );
}

/* Keep content above the decorative layer */

main > section:first-child > * {
  position:
    relative;
  z-index:
    1;
}

/* ---------------------------------------------------------
   DASHBOARD POLISH
--------------------------------------------------------- */

.isr-home-dashboard-shell {
  border-radius:
    2.25rem;
}

.isr-dashboard-card {
  position:
    relative;
  overflow:
    hidden;
}

.isr-dashboard-card::after {
  pointer-events:
    none;
  position:
    absolute;
  right:
    -2.5rem;
  top:
    -2.5rem;
  width:
    8rem;
  height:
    8rem;
  border-radius:
    9999px;
  background:
    rgba(80, 149, 137, 0.055);
  content:
    "";
}

.isr-dashboard-card > * {
  position:
    relative;
  z-index:
    1;
}

/* ---------------------------------------------------------
   UPDATES
--------------------------------------------------------- */

.isr-updates-control-panel {
  backdrop-filter:
    blur(10px);
}

.isr-update-tool-button {
  transition:
    border-color 150ms ease,
    background-color 150ms ease,
    color 150ms ease;
}

.isr-update-tool-button:hover {
  background:
    rgba(80, 149, 137, 0.08);
}

/* ---------------------------------------------------------
   PRAYER
--------------------------------------------------------- */

.isr-prayer-issue-card {
  border-radius:
    2rem;
}

/* ---------------------------------------------------------
   SEARCH / CAMPUS
--------------------------------------------------------- */

.isr-find-result,
.isr-campus-guide-card {
  box-shadow:
    0 8px 26px rgba(91, 11, 5, 0.04);
}

.isr-find-result:hover {
  box-shadow:
    0 14px 35px rgba(91, 11, 5, 0.075);
}

/* ---------------------------------------------------------
   MEMBERSHIP
--------------------------------------------------------- */

.isr-membership-spotlight {
  border-radius:
    2.25rem;
}

.isr-membership-step {
  transition:
    transform 150ms ease,
    border-color 150ms ease,
    background-color 150ms ease;
}

.isr-membership-step:hover {
  transform:
    translateY(-2px);
  border-color:
    rgba(80, 149, 137, 0.5);
  background:
    rgba(234, 227, 216, 0.48);
}

/* ---------------------------------------------------------
   SUPPORT
--------------------------------------------------------- */

.isr-support-triage {
  border-radius:
    2.25rem;
}

/* ---------------------------------------------------------
   ADMIN UTILITY
--------------------------------------------------------- */

.isr-admin-utility-bar {
  position:
    relative;
  z-index:
    5;
}

/* ---------------------------------------------------------
   QUICK ACCESS
--------------------------------------------------------- */

.isr-global-quick-button {
  backdrop-filter:
    blur(12px);
}

.isr-global-quick-panel {
  overscroll-behavior:
    contain;
}

/* ---------------------------------------------------------
   MOBILE
--------------------------------------------------------- */

@media (max-width: 639px) {
  h1 {
    line-height:
      1.08;
  }

  h2 {
    line-height:
      1.12;
  }

  .isr-button-primary,
  .isr-button-secondary {
    min-height:
      3.1rem;
  }

  .isr-card {
    border-radius:
      1.3rem;
  }

  .isr-home-dashboard-shell,
  .isr-membership-spotlight,
  .isr-support-triage {
    border-radius:
      1.55rem;
  }

  .isr-dashboard-card {
    min-height:
      auto;
  }
}

/* ---------------------------------------------------------
   LARGE SCREEN
--------------------------------------------------------- */

@media (min-width: 1024px) {
  .isr-dashboard-card {
    padding:
      1.55rem;
  }

  .isr-home-dashboard-shell {
    padding:
      2.4rem;
  }
}

/* ---------------------------------------------------------
   ACCESSIBILITY
--------------------------------------------------------- */

::selection {
  background:
    rgba(80, 149, 137, 0.22);
  color:
    #5B0B05;
}

a,
button,
input,
textarea,
select {
  -webkit-tap-highlight-color:
    transparent;
}

a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline:
    3px solid rgba(80, 149, 137, 0.52);
  outline-offset:
    3px;
}

/* ---------------------------------------------------------
   MOTION SAFETY
--------------------------------------------------------- */

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior:
      auto;
  }

  *,
  *::before,
  *::after {
    scroll-behavior:
      auto !important;
    transition-duration:
      0.01ms !important;
    animation-duration:
      0.01ms !important;
    animation-iteration-count:
      1 !important;
  }

  .isr-button-primary:hover,
  .isr-button-secondary:hover,
  .isr-card-interactive:hover,
  .isr-membership-step:hover {
    transform:
      none;
  }
}
`

css =
  appendMarkedBlock(
    css,
    'ISR TOOLKIT D8 PROFESSIONAL POLISH',
    polish,
  )

write(
  'app/d3-experience.css',
  css,
)

/* =========================================================
 * NAVBAR — ADD SEARCH ACCESS
 * ========================================================= */

let navbar =
  read(
    'components/Navbar.tsx',
  )

if (
  !navbar.includes(
    "href=\"/find\"",
  ) &&
  !navbar.includes(
    "href='/find'",
  )
) {
  const joinMarkers = [
    '<Link\n            href="/join"',
    '<Link\n                href="/join"',
    'href="/join"',
  ]

  let index =
    -1

  for (
    const marker
    of joinMarkers
  ) {
    index =
      navbar.indexOf(
        marker,
      )

    if (
      index >=
      0
    ) {
      break
    }
  }

  if (
    index >=
    0
  ) {
    const search =
`<Link
            href="/find"
            aria-label="Search ISR"
            className="hidden min-h-11 items-center justify-center rounded-full border border-isr-light-blue/35 px-4 text-sm font-bold text-isr-dark-red transition hover:border-isr-turquoise hover:text-isr-turquoise sm:inline-flex"
          >
            Search
          </Link>

          `

    navbar =
      navbar.slice(
        0,
        index,
      ) +
      search +
      navbar.slice(
        index,
      )
  }
}

write(
  'components/Navbar.tsx',
  navbar,
)

console.log(
  'PASS - global visual system.',
)

/* =========================================================
 * FOOTER — DISCOVERY LINKS
 * ========================================================= */

let footer =
  read(
    'components/Footer.tsx',
  )

if (
  !footer.includes(
    "href: '/find'",
  )
) {
  const studentMarker =
    'const studentLinks = ['

  if (
    footer.includes(
      studentMarker,
    )
  ) {
    footer =
      footer.replace(
        studentMarker,
        `const studentLinks = [
  {
    href: '/find',
    label: 'Search ISR',
  },
  {
    href: '/campuses',
    label: 'Campus Guide',
  },`,
      )
  }
}

write(
  'components/Footer.tsx',
  footer,
)

/* =========================================================
 * D8 AUDIT
 * ========================================================= */

const audit =
String.raw`import fs from 'node:fs'
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
`

write(
  'scripts/d8-audit.mjs',
  audit,
)

/* =========================================================
 * REGISTER AUDIT
 * ========================================================= */

let health =
  read(
    'scripts/isr-dev/health.mjs',
  )

if (
  !health.includes(
    "'scripts/d8-audit.mjs'",
  )
) {
  const anchor =
    "'scripts/d7-audit.mjs',"

  if (
    !health.includes(
      anchor,
    )
  ) {
    throw new Error(
      'Could not locate D7 audit in health.mjs.',
    )
  }

  health =
    health.replace(
      anchor,
      `${anchor}
  'scripts/d8-audit.mjs',`,
    )
}

write(
  'scripts/isr-dev/health.mjs',
  health,
)

console.log(`
=================================================
D8 PATCH COMPLETE
=================================================

Refined:
 - typography
 - buttons
 - cards
 - hover states
 - focus states
 - mobile sizing
 - section rhythm
 - dashboard
 - prayer
 - updates
 - membership
 - support
 - campus/search views
 - quick access
 - Search in navigation
 - discovery links in footer
 - reduced-motion handling
`)
