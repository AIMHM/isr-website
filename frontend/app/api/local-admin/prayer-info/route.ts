import {
  NextResponse,
} from 'next/server'
import {
  localAdminAuthorized,
  localAdminEnabled,
  readStore,
} from '@/lib/localAdminStore.server'

export async function GET(
  request: Request,
) {
  if (!localAdminEnabled()) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 },
    )
  }

  const store =
    await readStore()

  const adminScope =
    new URL(
      request.url,
    ).searchParams.get(
      'scope',
    ) === 'admin'

  if (
    adminScope &&
    !localAdminAuthorized(
      request,
    )
  ) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 },
    )
  }

  const prayerSpaces =
    adminScope
      ? store.prayerSpaces
      : store.prayerSpaces.filter(
          (record) =>
            record.publicationStatus ===
            'published',
        )

  const jumuahServices =
    adminScope
      ? store.jumuahServices
      : store.jumuahServices.filter(
          (record) =>
            record.publicationStatus ===
            'published',
        )

  return NextResponse.json({
    data: {
      prayerSpaces,
      jumuahServices,
    },
  })
}
