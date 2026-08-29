import {
  getEventStatus,
  type Event,
} from '@/lib/events'

function schemaStatus(
  event: Event,
): string | undefined {
  const status =
    getEventStatus(
      event,
    )

  if (
    status ===
    'cancelled'
  ) {
    return 'https://schema.org/EventCancelled'
  }

  if (
    status ===
    'postponed'
  ) {
    return 'https://schema.org/EventPostponed'
  }

  if (
    status ===
      'scheduled' ||
    status ===
      'sold-out'
  ) {
    return 'https://schema.org/EventScheduled'
  }

  return undefined
}

export default function EventStructuredData({
  event,
}: {
  event: Event
}) {
  const baseUrl =
    process.env
      .NEXT_PUBLIC_SITE_URL ??
    'https://theisr.com.au'

  const locationName =
    [
      event.venue,
      event.campus,
    ]
      .filter(Boolean)
      .join(', ')

  const data = {
    '@context':
      'https://schema.org',

    '@type':
      'Event',

    name:
      event.name,

    description:
      event.description,

    startDate:
      event.date,

    endDate:
      event.endDate ??
      undefined,

    eventStatus:
      schemaStatus(
        event,
      ),

    eventAttendanceMode:
      locationName
        ? 'https://schema.org/OfflineEventAttendanceMode'
        : undefined,

    location:
      locationName
        ? {
            '@type':
              'Place',

            name:
              locationName,
          }
        : undefined,

    image:
      event.imageUrl
        ? [
            event.imageUrl,
          ]
        : undefined,

    url:
      `${baseUrl}/events/${event.id}`,

    organizer: {
      '@type':
        'Organization',

      name:
        'Islamic Society of RMIT',

      url:
        baseUrl,
    },
  }

  const json =
    JSON.stringify(
      data,
    ).replace(
      /</g,
      '\\u003c',
    )

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html:
          json,
      }}
    />
  )
}