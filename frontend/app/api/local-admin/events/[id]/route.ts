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
  safeHttpUrl,
  validEventRegistrationMode,
  validEventStatus,
  validPublicationStatus,
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

  const eventId =
    Number(id)

  if (
    !Number.isInteger(
      eventId,
    )
  ) {
    return NextResponse.json(
      { error: 'Invalid event id' },
      { status: 400 },
    )
  }

  const store =
    await readStore()

  const event =
    store.events.find(
      (item) =>
        item.id === eventId,
    )

  if (!event) {
    return NextResponse.json(
      { error: 'Event not found' },
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
      event.publicationStatus ??
      'published'
    ) !== 'published'
  ) {
    return NextResponse.json(
      { error: 'Event not found' },
      { status: 404 },
    )
  }

  return NextResponse.json({
    data: event,
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

  const eventId =
    Number(id)

  const store =
    await readStore()

  const index =
    store.events.findIndex(
      (item) =>
        item.id === eventId,
    )

  if (index === -1) {
    return NextResponse.json(
      { error: 'Event not found' },
      { status: 404 },
    )
  }

  try {
    const form =
      await request.formData()

    const existing =
      store.events[index]

    const name =
      formString(
        form,
        'name',
      )

    const date =
      formString(
        form,
        'date',
      )

    const endDate =
      formString(
        form,
        'endDate',
      )

    const description =
      formString(
        form,
        'description',
      )

    const ticketUrl =
      formString(
        form,
        'ticketUrl',
      )

    const status =
      formString(
        form,
        'status',
      )

    const registrationMode =
      formString(
        form,
        'registrationMode',
      ) || 'unknown'

    const publicationStatus =
      formString(
        form,
        'publicationStatus',
      )

    if (
      !name ||
      !date ||
      !description
    ) {
      return NextResponse.json(
        {
          error:
            'Name, date and description are required',
        },
        { status: 400 },
      )
    }

    if (
      Number.isNaN(
        new Date(
          date,
        ).getTime(),
      )
    ) {
      return NextResponse.json(
        {
          error:
            'Invalid start date',
        },
        { status: 400 },
      )
    }

    if (
      endDate &&
      new Date(
        endDate,
      ).getTime() <
        new Date(
          date,
        ).getTime()
    ) {
      return NextResponse.json(
        {
          error:
            'End time cannot be before start time',
        },
        { status: 400 },
      )
    }

    if (
      !safeHttpUrl(
        ticketUrl,
      )
    ) {
      return NextResponse.json(
        {
          error:
            'Registration URL must use http or https',
        },
        { status: 400 },
      )
    }

    if (
      !validEventStatus(
        status,
      )
    ) {
      return NextResponse.json(
        {
          error:
            'Invalid event status',
        },
        { status: 400 },
      )
    }

    if (
      !validEventRegistrationMode(
        registrationMode,
      )
    ) {
      return NextResponse.json(
        {
          error:
            'Invalid registration mode',
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
      registrationMode === 'required' &&
      !ticketUrl
    ) {
      return NextResponse.json(
        {
          error:
            'Registration URL is required when registration is required',
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
      name,
      date,
      endDate:
        optionalString(
          endDate,
        ),
      description,
      ticketUrl:
        optionalString(
          ticketUrl,
        ),
      registrationMode,
      publicationStatus:
        validPublicationStatus(
          publicationStatus,
        )
          ? publicationStatus
          : existing.publicationStatus ??
            'published',
      category:
        optionalString(
          formString(
            form,
            'category',
          ),
        ),
      contentOwner:
        optionalString(
          formString(
            form,
            'contentOwner',
          ),
        ),
      reviewedAt:
        optionalString(
          formString(
            form,
            'reviewedAt',
          ),
        ),
      venue:
        optionalString(
          formString(
            form,
            'venue',
          ),
        ),
      campus:
        optionalString(
          formString(
            form,
            'campus',
          ),
        ),
      audience:
        optionalString(
          formString(
            form,
            'audience',
          ),
        ),
      price:
        optionalString(
          formString(
            form,
            'price',
          ),
        ),
      accessibility:
        optionalString(
          formString(
            form,
            'accessibility',
          ),
        ),
      status,
      statusNote:
        optionalString(
          formString(
            form,
            'statusNote',
          ),
        ),
      imageUrl:
        newImage ??
        existing.imageUrl,
    }

    store.events[index] =
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
            : 'Failed to update event',
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

  const eventId =
    Number(id)

  const store =
    await readStore()

  const exists =
    store.events.some(
      (item) =>
        item.id === eventId,
    )

  if (!exists) {
    return NextResponse.json(
      { error: 'Event not found' },
      { status: 404 },
    )
  }

  store.events =
    store.events.filter(
      (item) =>
        item.id !== eventId,
    )

  await writeStore(store)

  return NextResponse.json({
    data: {
      id: eventId,
    },
  })
}
