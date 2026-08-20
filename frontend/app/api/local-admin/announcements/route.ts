import {
  NextResponse,
} from 'next/server'
import {
  formString,
  imageToDataUrl,
  localAdminAuthorized,
  localAdminEnabled,
  nextId,
  optionalString,
  readStore,
  safeActionUrl,
  validPriority,
  validPublicationStatus,
  validAnnouncementScope,
  writeStore,
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

  const publicScope =
  new URL(
    request.url,
  ).searchParams.get(
    'scope',
  ) === 'public'

let announcements =
  publicScope
    ? store.announcements.filter(
        (announcement) =>
          (
            announcement.publicationStatus ??
            'published'
          ) === 'published' &&
          (
            !announcement.expiresAt ||
            new Date(
              announcement.expiresAt,
            ).getTime() >
              Date.now()
          ),
      )
    : [...store.announcements]

announcements =
  [...announcements].sort(
      (a, b) => {
        if (
          a.pinned !== b.pinned
        ) {
          return a.pinned
            ? -1
            : 1
        }

        return (
          new Date(
            b.createdAt,
          ).getTime() -
          new Date(
            a.createdAt,
          ).getTime()
        )
      },
    )

  return NextResponse.json({
    data: announcements,
  })
}

export async function POST(
  request: Request,
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

  try {
    const form =
      await request.formData()

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
      ) || 'normal'

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
      ) || 'draft'

    const scope =
      formString(
        form,
        'scope',
      ) || 'general'

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
      expiresAt &&
      Number.isNaN(
        new Date(
          expiresAt,
        ).getTime(),
      )
    ) {
      return NextResponse.json(
        {
          error:
            'Invalid expiry time',
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
            'Action link must be a local path or http/https URL',
        },
        { status: 400 },
      )
    }

        if (
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
const imageUrl =
      await imageToDataUrl(
        form.get('image'),
      )

    const store =
      await readStore()

    const announcement = {
      id: nextId(
        store.announcements,
      ),
      title,
      body,
      pinned:
        formString(
          form,
          'pinned',
        ) === 'true',
      imageUrl,
      createdAt:
        new Date().toISOString(),
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
      publicationStatus,
      scope,
      campus:
        optionalString(
          campus,
        ),
      audience:
        optionalString(
          audience,
        ),
      contentOwner:
        optionalString(
          contentOwner,
        ),
      reviewedAt:
        optionalString(
          reviewedAt,
        ),    }

    store.announcements.push(
      announcement,
    )

    await writeStore(store)

    return NextResponse.json(
      {
        data: announcement,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to create ISR update',
      },
      { status: 400 },
    )
  }
}
