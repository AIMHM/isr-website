import type {
  Metadata,
} from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EventDetailExperience from '@/components/EventDetailExperience'
import {
  fetchEventById,
} from '@/lib/events'

type EventPageProps = {
  params: Promise<{
    id: string
  }>
}

function descriptionForMetadata(
  value: string,
): string {
  const cleaned =
    value
      .replace(
        /\s+/g,
        ' ',
      )
      .trim()

  if (
    cleaned.length <=
    155
  ) {
    return cleaned
  }

  return (
    cleaned
      .slice(
        0,
        152,
      )
      .trimEnd() +
    '...'
  )
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const {
    id,
  } =
    await params

  const eventId =
    Number(id)

  if (
    !Number.isFinite(
      eventId,
    )
  ) {
    return {
      title:
        'Event unavailable',

      description:
        'This ISR event could not be found.',

      robots: {
        index:
          false,
        follow:
          true,
      },
    }
  }

  try {
    const event =
      await fetchEventById(
        eventId,
      )

    if (!event) {
      return {
        title:
          'Event unavailable',

        description:
          'This ISR event could not be found.',

        robots: {
          index:
            false,
          follow:
            true,
        },
      }
    }

    const description =
      descriptionForMetadata(
        event.description,
      )

    return {
      title:
        event.name,

      description,

      alternates: {
        canonical:
          `/events/${event.id}`,
      },

      openGraph: {
        type:
          'website',

        title:
          event.name,

        description,

        url:
          `/events/${event.id}`,

        images:
          event.imageUrl
            ? [
                {
                  url:
                    event.imageUrl,

                  alt:
                    `${event.name} event poster`,
                },
              ]
            : undefined,
      },

      twitter: {
        card:
          event.imageUrl
            ? 'summary_large_image'
            : 'summary',

        title:
          event.name,

        description,

        images:
          event.imageUrl
            ? [
                event.imageUrl,
              ]
            : undefined,
      },
    }
  }
  catch {
    return {
      title:
        'ISR Event',

      description:
        'Event information from the Islamic Society of RMIT.',
    }
  }
}

export default async function EventPage({
  params,
}: EventPageProps) {
  const {
    id,
  } =
    await params

  const eventId =
    Number(id)

  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <EventDetailExperience
        id={eventId}
      />

      <Footer />
    </div>
  )
}