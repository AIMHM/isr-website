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
  writeStore,
} from '@/lib/localAdminStore.server'

export async function GET() {
  if (!localAdminEnabled()) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 },
    )
  }

  const store =
    await readStore()

  const announcements =
    [...store.announcements].sort(
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
    }

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
