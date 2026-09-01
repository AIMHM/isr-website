import { FlatCompat } from '@eslint/eslintrc'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const filename =
  fileURLToPath(
    import.meta.url,
  )

const dirname =
  path.dirname(
    filename,
  )

const compat =
  new FlatCompat({
    baseDirectory:
      dirname,
  })

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'coverage/**',
      'next-env.d.ts',
      // Historical one-off build scripts are retained as implementation
      // records, but are not part of the active frontend application or QA
      // tooling. Active scripts (public-qa, health, GitHub verification) stay
      // inside the lint surface.
      'scripts/isr-dev/d*.mjs',
    ],
  },

  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
  ),
]

export default eslintConfig
