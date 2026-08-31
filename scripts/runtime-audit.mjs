import { spawnSync } from 'node:child_process'
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
 * CI runs this after `npm ci --omit=dev --ignore-scripts`, so the
 * installed node_modules tree is the production dependency tree.
 * `--omit=dev` also tells npm ls not to treat intentionally absent
 * devDependencies as missing-package errors.
 */
const treeResult =
  runNpm([
    'ls',
    '--omit=dev',
    '--all',
    '--parseable',
  ])

if (
  treeResult.error ||
  treeResult.status !== 0
) {
  console.error(
    'Unable to resolve the installed production dependency tree.',
  )

  if (treeResult.stderr) {
    console.error(
      treeResult.stderr.trim(),
    )
  }

  process.exit(1)
}

const productionNodes =
  new Set(
    treeResult.stdout
      .split(/\r?\n/)
      .map((entry) =>
        entry.trim(),
      )
      .filter(Boolean)
      .map((absolutePath) =>
        normalizePackagePath(
          path.relative(
            process.cwd(),
            absolutePath,
          ),
        ),
      )
      .filter((entry) =>
        entry &&
        entry !== '.',
      ),
  )

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
  `Runtime dependency audit passed: ${productionNodes.size} installed production package paths checked.`,
)

if (ignored.length > 0) {
  console.log(
    `High/critical advisories outside the installed production tree were excluded from the runtime gate: ${[
      ...new Set(ignored),
    ].sort().join(', ')}.`,
  )
}
