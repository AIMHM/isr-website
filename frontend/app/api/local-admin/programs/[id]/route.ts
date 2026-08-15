import {
  NextResponse,
} from 'next/server'
import {
  localAdminAuthorized,
  localAdminEnabled,
  readStore,
  safeHttpUrl,
  writeStore,
} from '@/lib/localAdminStore.server'
import type {
  Program,
} from '@/lib/programs'

function makeSlug(
  value: string,
): string {
  return value
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9]+/g,
      '-',
    )
    .replace(
      /^-+|-+$/g,
      '',
    )
}

export async function PUT(
  request: Request,
  context: {
    params: Promise<{
      id: string
    }>
  },
) {
  if (!localAdminEnabled()) {
    return NextResponse.json(
      {
        error:
          'Not found',
      },
      {
        status:
          404,
      },
    )
  }

  if (
    !localAdminAuthorized(
      request,
    )
  ) {
    return NextResponse.json(
      {
        error:
          'Unauthorized',
      },
      {
        status:
          401,
      },
    )
  }

  const {
    id,
  } =
    await context.params

  const body =
    await request.json() as
      Partial<Program>

  if (
    body.registrationUrl &&
    !safeHttpUrl(
      body.registrationUrl,
    )
  ) {
    return NextResponse.json(
      {
        error:
          'Registration URL must use http or https',
      },
      {
        status:
          400,
      },
    )
  }

  const store =
    await readStore()

  const index =
    store.programs.findIndex(
      (
        item,
      ) =>
        item.id ===
        id,
    )

  if (index < 0) {
    return NextResponse.json(
      {
        error:
          'Program not found',
      },
      {
        status:
          404,
      },
    )
  }

  const existing =
    store.programs[
      index
    ]

  const slug =
    makeSlug(
      body.slug ||
      body.name ||
      existing.slug,
    )

  if (
    store.programs.some(
      (
        item,
      ) =>
        item.id !==
          id &&
        item.slug ===
          slug,
    )
  ) {
    return NextResponse.json(
      {
        error:
          'A program with this slug already exists',
      },
      {
        status:
          409,
      },
    )
  }

  const updated: Program = {
    ...existing,
    ...body,
    id,
    slug,
  }

  store.programs[
    index
  ] =
    updated

  await writeStore(
    store,
  )

  return NextResponse.json({
    data:
      updated,
  })
}

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{
      id: string
    }>
  },
) {
  if (!localAdminEnabled()) {
    return NextResponse.json(
      {
        error:
          'Not found',
      },
      {
        status:
          404,
      },
    )
  }

  if (
    !localAdminAuthorized(
      request,
    )
  ) {
    return NextResponse.json(
      {
        error:
          'Unauthorized',
      },
      {
        status:
          401,
      },
    )
  }

  const {
    id,
  } =
    await context.params

  const store =
    await readStore()

  const before =
    store.programs.length

  store.programs =
    store.programs.filter(
      (
        item,
      ) =>
        item.id !==
        id,
    )

  if (
    store.programs.length ===
    before
  ) {
    return NextResponse.json(
      {
        error:
          'Program not found',
      },
      {
        status:
          404,
      },
    )
  }

  await writeStore(
    store,
  )

  return new Response(
    null,
    {
      status:
        204,
    },
  )
}
