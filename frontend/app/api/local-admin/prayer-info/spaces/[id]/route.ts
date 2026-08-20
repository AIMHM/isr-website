import {
  NextResponse,
} from 'next/server'
import {
  localAdminAuthorized,
  localAdminEnabled,
  readStore,
  writeStore,
} from '@/lib/localAdminStore.server'
import type {
  PrayerVerificationStatus,
} from '@/lib/prayerRecords'
import type {
  PublicationStatus,
} from '@/lib/contentTypes'

type Context = {
  params: Promise<{
    id: string
  }>
}

const PUBLICATION =
  new Set<PublicationStatus>([
    'draft',
    'review',
    'published',
    'archived',
  ])

const VERIFICATION =
  new Set<PrayerVerificationStatus>([
    'verified',
    'needs-review',
    'temporary',
  ])

export async function PUT(
  request: Request,
  context: Context,
) {
  if (!localAdminEnabled()) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 },
    )
  }

  if (
    !localAdminAuthorized(
      request,
    )
  ) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 },
    )
  }

  const { id } =
    await context.params

  const recordId =
    Number(id)

  if (
    !Number.isInteger(
      recordId,
    )
  ) {
    return NextResponse.json(
      {
        error:
          'Invalid prayer-space id',
      },
      { status: 400 },
    )
  }

  const store =
    await readStore()

  const index =
    store.prayerSpaces.findIndex(
      (record) =>
        record.id ===
        recordId,
    )

  if (index === -1) {
    return NextResponse.json(
      {
        error:
          'Prayer space not found',
      },
      { status: 404 },
    )
  }

  const body =
    await request.json()

  const existing =
    store.prayerSpaces[index]

  const publicationStatus =
    body.publicationStatus ??
    existing.publicationStatus

  const verificationStatus =
    body.verificationStatus ??
    existing.verificationStatus

  if (
    !PUBLICATION.has(
      publicationStatus,
    )
  ) {
    return NextResponse.json(
      {
        error:
          'Invalid publication status',
      },
      { status: 400 },
    )
  }

  if (
    !VERIFICATION.has(
      verificationStatus,
    )
  ) {
    return NextResponse.json(
      {
        error:
          'Invalid verification status',
      },
      { status: 400 },
    )
  }

  const updated = {
    ...existing,
    ...body,

    id:
      existing.id,

    slug:
      existing.slug,

    publicationStatus,
    verificationStatus,
  }

  store.prayerSpaces[index] =
    updated

  await writeStore(
    store,
  )

  return NextResponse.json({
    data:
      updated,
  })
}
