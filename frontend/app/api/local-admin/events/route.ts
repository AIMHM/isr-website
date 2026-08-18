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
  safeHttpUrl,
  validEventRegistrationMode,
  validEventStatus,
  validPublicationStatus,
  writeStore,
} from '@/lib/localAdminStore.server'

function effectiveEnd(
  event: {
    date: string
    endDate?: string | null
  },
): number {
  return new Date(
    event.endDate ??
      event.date,
  ).getTime()
}

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

  const url =
    new URL(request.url)

  const filter =
    url.searchParams.get(
      'filter',
    )

  const now =
    Date.now()

  let events =
    [...store.events]

  const publicScope =
    url.searchParams.get(
      'scope',
    ) === 'public'

  if (publicScope) {
    events =
      events.filter(
        (event) =>
          (
            event.publicationStatus ??
            'published'
          ) === 'published',
      )
  }

  if (filter === 'upcoming') {
    events =
      events.filter(
        (event) =>
          event.status !==
            'completed' &&
          effectiveEnd(event) >=
            now,
      )
  }

  if (filter === 'past') {
    events =
      events.filter(
        (event) =>
          event.status ===
            'completed' ||
          effectiveEnd(event) <
            now,
      )
  }

  events.sort(
    (a, b) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime(),
  )

  return NextResponse.json({
    data: events,
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
      ) || 'scheduled'

    const registrationMode =
      formString(
        form,
        'registrationMode',
      ) || 'unknown'

    const publicationStatus =
      formString(
        form,
        'publicationStatus',
      ) || 'draft'

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
      Number.isNaN(
        new Date(
          endDate,
        ).getTime(),
      )
    ) {
      return NextResponse.json(
        {
          error:
            'Invalid end date',
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

    const imageUrl =
      await imageToDataUrl(
        form.get('image'),
      )

    const store =
      await readStore()

    const event = {
      id: nextId(
        store.events,
      ),
      name,
      date,
      endDate:
        optionalString(
          endDate,
        ),
      imageUrl:
        imageUrl ?? '',
      description,
      ticketUrl:
        optionalString(
          ticketUrl,
        ),
      registrationMode,
      publicationStatus,
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
    }

    store.events.push(event)

    await writeStore(store)

    return NextResponse.json(
      {
        data: event,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to create event',
      },
      { status: 400 },
    )
  }
}
