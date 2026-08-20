import {
  NextResponse,
} from 'next/server'
import {
  formString,
  imageToDataUrl,
  localAdminAuthorized,
  localAdminEnabled,
  optionalString,
  readStore,
  safeActionUrl,
  validPriority,
  validPublicationStatus,
  validAnnouncementScope,
  writeStore,
} from '@/lib/localAdminStore.server'

type Context = {
  params: Promise<{
    id: string
  }>
}

export async function GET(
  request: Request,
  context: Context,
) {
  if (!localAdminEnabled()) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 },
    )
  }

  const { id } =
    await context.params

  const announcementId =
    Number(id)

  const store =
    await readStore()

  const announcement =
    store.announcements.find(
      (item) =>
        item.id ===
        announcementId,
    )

  if (!announcement) {
    return NextResponse.json(
      {
        error:
          'ISR update not found',
      },
      { status: 404 },
    )
  }

  const publicScope =
    new URL(
      request.url,
    ).searchParams.get(
      'scope',
    ) === 'public'

  if (
    publicScope &&
    (
      (
        announcement.publicationStatus ??
        'published'
      ) !== 'published' ||
      (
        announcement.expiresAt &&
        new Date(
          announcement.expiresAt,
        ).getTime() <=
          Date.now()
      )
    )
  ) {
    return NextResponse.json(
      {
        error:
          'ISR update not found',
      },
      { status: 404 },
    )
  }

  return NextResponse.json({
    data: announcement,
  })
}
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
    !localAdminAuthorized(request)
  ) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 },
    )
  }

  const { id } =
    await context.params

  const announcementId =
    Number(id)

  const store =
    await readStore()

  const index =
    store.announcements.findIndex(
      (item) =>
        item.id ===
        announcementId,
    )

  if (index === -1) {
    return NextResponse.json(
      {
        error:
          'ISR update not found',
      },
      { status: 404 },
    )
  }

  try {
    const form =
      await request.formData()

    const existing =
      store.announcements[index]

    const title =
      formString(
        form,
        'title',
      )

    const body =
      formString(
        form,
        'body',
      )

    const priority =
      formString(
        form,
        'priority',
      )

    const expiresAt =
      formString(
        form,
        'expiresAt',
      )

    const actionLabel =
      formString(
        form,
        'actionLabel',
      )

    const actionUrl =
      formString(
        form,
        'actionUrl',
      )

        const publicationStatus =
      formString(
        form,
        'publicationStatus',
      )

    const scope =
      formString(
        form,
        'scope',
      )

    const campus =
      formString(
        form,
        'campus',
      )

    const audience =
      formString(
        form,
        'audience',
      )

    const contentOwner =
      formString(
        form,
        'contentOwner',
      )

    const reviewedAt =
      formString(
        form,
        'reviewedAt',
      )
if (
      !title ||
      !body
    ) {
      return NextResponse.json(
        {
          error:
            'Title and update text are required',
        },
        { status: 400 },
      )
    }

    if (
      !validPriority(
        priority,
      )
    ) {
      return NextResponse.json(
        {
          error:
            'Invalid update priority',
        },
        { status: 400 },
      )
    }

    if (
      Boolean(actionLabel) !==
      Boolean(actionUrl)
    ) {
      return NextResponse.json(
        {
          error:
            'Action label and action link must be provided together',
        },
        { status: 400 },
      )
    }

    if (
      !safeActionUrl(
        actionUrl,
      )
    ) {
      return NextResponse.json(
        {
          error:
            'Invalid action link',
        },
        { status: 400 },
      )
    }

        if (
      publicationStatus &&
      !validPublicationStatus(
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
      scope &&
      !validAnnouncementScope(
        scope,
      )
    ) {
      return NextResponse.json(
        {
          error:
            'Invalid update scope',
        },
        { status: 400 },
      )
    }

    if (
      reviewedAt &&
      Number.isNaN(
        new Date(
          reviewedAt,
        ).getTime(),
      )
    ) {
      return NextResponse.json(
        {
          error:
            'Invalid review time',
        },
        { status: 400 },
      )
    }
const newImage =
      await imageToDataUrl(
        form.get('image'),
      )

    const updated = {
      ...existing,
      title,
      body,
      pinned:
        formString(
          form,
          'pinned',
        ) === 'true',
      priority,
      expiresAt:
        optionalString(
          expiresAt,
        ),
      actionLabel:
        optionalString(
          actionLabel,
        ),
      actionUrl:
        optionalString(
          actionUrl,
        ),
      imageUrl:
        newImage ??
        existing.imageUrl,
          publicationStatus:
        validPublicationStatus(
          publicationStatus,
        )
          ? publicationStatus
          : existing.publicationStatus ??
            'published',

      scope:
        validAnnouncementScope(
          scope,
        )
          ? scope
          : existing.scope ??
            'general',

      campus:
        form.has(
          'campus',
        )
          ? optionalString(
              campus,
            )
          : existing.campus ?? null,

      audience:
        form.has(
          'audience',
        )
          ? optionalString(
              audience,
            )
          : existing.audience ?? null,

      contentOwner:
        form.has(
          'contentOwner',
        )
          ? optionalString(
              contentOwner,
            )
          : existing.contentOwner ??
            null,

      reviewedAt:
        form.has(
          'reviewedAt',
        )
          ? optionalString(
              reviewedAt,
            )
          : existing.reviewedAt ??
            null,}

    store.announcements[index] =
      updated

    await writeStore(store)

    return NextResponse.json({
      data: updated,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to update ISR update',
      },
      { status: 400 },
    )
  }
}

export async function DELETE(
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
    !localAdminAuthorized(request)
  ) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 },
    )
  }

  const { id } =
    await context.params

  const announcementId =
    Number(id)

  const store =
    await readStore()

  const exists =
    store.announcements.some(
      (item) =>
        item.id ===
        announcementId,
    )

  if (!exists) {
    return NextResponse.json(
      {
        error:
          'ISR update not found',
      },
      { status: 404 },
    )
  }

  store.announcements =
    store.announcements.filter(
      (item) =>
        item.id !==
        announcementId,
    )

  await writeStore(store)

  return NextResponse.json({
    data: {
      id: announcementId,
    },
  })
}
