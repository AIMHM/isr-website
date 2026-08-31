import { spawnSync } from 'node:child_process'
import {
  existsSync,
  readdirSync,
} from 'node:fs'
import path from 'node:path'

const npm =
  process.platform === 'win32'
    ? 'npm.cmd'
    : 'npm'

const maxBuffer =
  32 * 1024 * 1024

function runNpm(args) {
  return spawnSync(
    npm,
    args,
    {
      cwd: process.cwd(),
      encoding: 'utf8',
      maxBuffer,
    },
  )
}

function normalizePackagePath(value) {
  return value
    .replaceAll('\\', '/')
    .replace(/^\.\//, '')
    .replace(/\/$/, '')
}

/*
 * CI runs this after `npm ci --omit=dev --ignore-scripts`.
 * We inspect packages physically present in node_modules rather than
 * trusting npm lockfile classifications such as devOptional.
 */
const productionNodes =
  new Set()

function visitPackage(
  relativePackagePath,
) {
  const normalized =
    normalizePackagePath(
      relativePackagePath,
    )

  const absolutePackagePath =
    path.join(
      process.cwd(),
      normalized,
    )

  if (
    !existsSync(
      path.join(
        absolutePackagePath,
        'package.json',
      ),
    )
  ) {
    return
  }

  productionNodes.add(
    normalized,
  )

  scanNodeModules(
    path.join(
      normalized,
      'node_modules',
    ),
  )
}

function scanNodeModules(
  relativeNodeModulesPath,
) {
  const absoluteNodeModulesPath =
    path.join(
      process.cwd(),
      relativeNodeModulesPath,
    )

  if (
    !existsSync(
      absoluteNodeModulesPath,
    )
  ) {
    return
  }

  for (
    const entry
    of readdirSync(
      absoluteNodeModulesPath,
      {
        withFileTypes: true,
      },
    )
  ) {
    if (
      entry.name.startsWith('.') ||
      !entry.isDirectory()
    ) {
      continue
    }

    if (
      entry.name.startsWith('@')
    ) {
      const scopePath =
        path.join(
          relativeNodeModulesPath,
          entry.name,
        )

      const absoluteScopePath =
        path.join(
          process.cwd(),
          scopePath,
        )

      for (
        const scopedEntry
        of readdirSync(
          absoluteScopePath,
          {
            withFileTypes: true,
          },
        )
      ) {
        if (
          scopedEntry.isDirectory()
        ) {
          visitPackage(
            path.join(
              scopePath,
              scopedEntry.name,
            ),
          )
        }
      }

      continue
    }

    visitPackage(
      path.join(
        relativeNodeModulesPath,
        entry.name,
      ),
    )
  }
}

scanNodeModules(
  'node_modules',
)

if (
  productionNodes.size === 0
) {
  console.error(
    'No installed production packages were found to audit.',
  )
  process.exit(1)
}

/*
 * npm can label architecture-specific optional packages as extraneous.
 * Those labels do not make the runtime tree invalid. Missing or invalid
 * production dependencies do, so fail specifically on those problems.
 */
const treeResult =
  runNpm([
    'ls',
    '--omit=dev',
    '--all',
    '--json',
  ])

let tree

try {
  tree = JSON.parse(
    treeResult.stdout || '{}',
  )
} catch {
  console.error(
    'npm ls did not return valid JSON.',
  )
  process.exit(1)
}

const dependencyProblems =
  (tree.problems || [])
    .filter((problem) =>
      /^missing:|^invalid:/i.test(
        String(problem),
      ),
    )

if (
  dependencyProblems.length > 0
) {
  console.error(
    'The production dependency tree has missing or invalid packages:',
  )

  for (
    const problem
    of dependencyProblems
  ) {
    console.error(
      `- ${problem}`,
    )
  }

  process.exit(1)
}

const auditResult =
  runNpm([
    'audit',
    '--json',
  ])

let audit

try {
  audit = JSON.parse(
    auditResult.stdout || '{}',
  )
} catch {
  console.error(
    'npm audit did not return valid JSON.',
  )

  if (auditResult.stderr) {
    console.error(
      auditResult.stderr.trim(),
    )
  }

  process.exit(1)
}

if (audit.error) {
  console.error(
    'npm audit could not complete:',
    audit.error.summary ||
      audit.error.message ||
      'unknown error',
  )
  process.exit(1)
}

const severityRank = {
  info: 0,
  low: 1,
  moderate: 2,
  high: 3,
  critical: 4,
}

const blocking = []
const ignored = []

for (
  const [
    packageName,
    vulnerability,
  ] of Object.entries(
    audit.vulnerabilities || {},
  )
) {
  const rank =
    severityRank[
      vulnerability.severity
    ] ?? 0

  if (rank < severityRank.high) {
    continue
  }

  const runtimeNodes =
    (vulnerability.nodes || [])
      .map(normalizePackagePath)
      .filter((node) =>
        productionNodes.has(node),
      )

  if (runtimeNodes.length > 0) {
    blocking.push({
      packageName,
      severity:
        vulnerability.severity,
      range:
        vulnerability.range,
      nodes:
        runtimeNodes,
    })
  } else {
    ignored.push(packageName)
  }
}

if (blocking.length > 0) {
  console.error(
    'High or critical vulnerabilities are present in the installed production dependency tree:',
  )

  for (const finding of blocking) {
    console.error(
      `- ${finding.packageName} (${finding.severity}) ${finding.range || ''}`.trim(),
    )

    for (const node of finding.nodes) {
      console.error(
        `  ${node}`,
      )
    }
  }

  process.exit(1)
}

console.log(
  `Runtime dependency audit passed: ${productionNodes.size} physically installed production package paths checked.`,
)

if (ignored.length > 0) {
  console.log(
    `High/critical advisories outside the installed production tree were excluded from the runtime gate: ${[
      ...new Set(ignored),
    ].sort().join(', ')}.`,
  )
}
