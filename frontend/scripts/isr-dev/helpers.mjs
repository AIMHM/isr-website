import fs from 'node:fs'
import path from 'node:path'
import {
  fileURLToPath,
} from 'node:url'
import {
  spawnSync,
} from 'node:child_process'

const here =
  path.dirname(
    fileURLToPath(
      import.meta.url,
    ),
  )

export const frontendRoot =
  path.resolve(
    here,
    '../..',
  )

export const repoRoot =
  path.resolve(
    frontendRoot,
    '..',
  )

export function frontendPath(
  relative,
) {
  return path.join(
    frontendRoot,
    relative,
  )
}

export function read(
  relative,
) {
  const absolute =
    frontendPath(
      relative,
    )

  if (
    !fs.existsSync(
      absolute,
    )
  ) {
    throw new Error(
      `Missing file: frontend/${relative}`,
    )
  }

  return fs.readFileSync(
    absolute,
    'utf8',
  )
}

export function write(
  relative,
  content,
) {
  const absolute =
    frontendPath(
      relative,
    )

  fs.mkdirSync(
    path.dirname(
      absolute,
    ),
    {
      recursive:
        true,
    },
  )

  fs.writeFileSync(
    absolute,
    content
      .replace(
        /\r?\n/g,
        '\n',
      )
      .replace(
        /[ \t]+$/gm,
        '',
      )
      .trimEnd() +
      '\n',
    'utf8',
  )
}

export function ensureImport(
  source,
  importLine,
) {
  if (
    source.includes(
      importLine,
    )
  ) {
    return source
  }

  const useClient =
    source.match(
      /^(['"])use client\1;?\s*\n/,
    )

  if (useClient) {
    const position =
      useClient[0].length

    return (
      source.slice(
        0,
        position,
      ) +
      '\n' +
      importLine +
      '\n' +
      source.slice(
        position,
      )
    )
  }

  const firstImport =
    source.search(
      /^import\s/m,
    )

  if (
    firstImport >=
    0
  ) {
    return (
      source.slice(
        0,
        firstImport,
      ) +
      importLine +
      '\n' +
      source.slice(
        firstImport,
      )
    )
  }

  return (
    importLine +
    '\n\n' +
    source
  )
}

export function appendMarkedBlock(
  source,
  marker,
  block,
) {
  if (
    source.includes(
      marker,
    )
  ) {
    return source
  }

  return (
    source.trimEnd() +
    '\n\n' +
    block.trim() +
    '\n'
  )
}

export function run(
  command,
  args = [],
  {
    cwd =
      repoRoot,

    allowFailure =
      false,
  } = {},
) {
  console.log(
    `\n> ${command} ${args.join(' ')}`,
  )

  const result =
    spawnSync(
      command,
      args,
      {
        cwd,
        stdio:
          'inherit',

        shell:
          process.platform === 'win32' &&
          /\.(cmd|bat)$/i.test(command),
      },
    )

  if (
    !allowFailure &&
    result.status !==
      0
  ) {
    throw new Error(
      `${command} failed with exit code ${result.status}`,
    )
  }

  return result.status ?? 1
}

export function capture(
  command,
  args = [],
  {
    cwd =
      repoRoot,
  } = {},
) {
  const result =
    spawnSync(
      command,
      args,
      {
        cwd,
        encoding:
          'utf8',

        shell:
          process.platform === 'win32' &&
          /\.(cmd|bat)$/i.test(command),
      },
    )

  if (
    result.status !==
    0
  ) {
    throw new Error(
      `${command} ${args.join(' ')} failed.`,
    )
  }

  return (
    result.stdout ??
    ''
  ).trim()
}

export function assert(
  condition,
  message,
) {
  if (!condition) {
    throw new Error(
      message,
    )
  }
}

export async function checkRoutes(
  routes,
) {
  for (
    const route
    of routes
  ) {
    const response =
      await fetch(
        `http://localhost:3000${route}`,
        {
          redirect:
            'follow',
        },
      )

    if (
      response.status !==
      200
    ) {
      throw new Error(
        `${route} returned HTTP ${response.status}`,
      )
    }

    console.log(
      `PASS  200  ${route}`,
    )
  }
}
