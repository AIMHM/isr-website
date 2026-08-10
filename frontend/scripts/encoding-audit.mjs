import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const roots = [
  path.join(root, 'app'),
  path.join(root, 'components'),
  path.join(root, 'lib'),
]

const extensions =
  new Set([
    '.ts',
    '.tsx',
    '.css',
    '.js',
    '.mjs',
    '.json',
  ])

const suspicious = [
  'â€™',
  'â€œ',
  'â€\u009d',
  'â€“',
  'â€”',
  'Â°C',
  'Â·',
  'Â ',
  'Ã©',
  'Ã¨',
]

function walk(directory) {
  const files = []

  if (!fs.existsSync(directory)) {
    return files
  }

  for (
    const entry
    of fs.readdirSync(
      directory,
      {
        withFileTypes: true,
      },
    )
  ) {
    const full =
      path.join(
        directory,
        entry.name,
      )

    if (entry.isDirectory()) {
      files.push(
        ...walk(full),
      )
      continue
    }

    if (
      entry.isFile() &&
      extensions.has(
        path.extname(
          entry.name,
        ),
      )
    ) {
      files.push(full)
    }
  }

  return files
}

const files =
  roots.flatMap(walk)

const findings = []

for (
  const file
  of files
) {
  const text =
    fs.readFileSync(
      file,
      'utf8',
    )

  for (
    const token
    of suspicious
  ) {
    if (
      text.includes(
        token,
      )
    ) {
      findings.push({
        file:
          path.relative(
            root,
            file,
          ),
        token,
      })
    }
  }
}

console.log(
  '\nUTF-8 / MOJIBAKE AUDIT\n',
)

if (
  findings.length === 0
) {
  console.log(
    'PASS - no common mojibake sequences found in actual UTF-8 source.',
  )

  console.log(
    'The strange characters previously shown were caused by PowerShell display decoding.',
  )

  process.exit(0)
}

console.error(
  'FAIL - suspicious encoded text exists in source:',
)

for (
  const finding
  of findings
) {
  console.error(
    `  ${finding.file} -> ${JSON.stringify(
      finding.token,
    )}`,
  )
}

process.exit(1)
