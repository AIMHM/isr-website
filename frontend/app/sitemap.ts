import type {
  MetadataRoute,
} from 'next'
import {
  fetchEvents,
} from '@/lib/events'
import {
  fetchPrograms,
} from '@/lib/programs'

const baseUrl =
  process.env
    .NEXT_PUBLIC_SITE_URL ??
  'http://localhost:3000'

const pages = [
  {
    path: '',
    frequency: 'weekly',
    priority: 1,
  },
  {
    path: '/student-guide',
    frequency: 'monthly',
    priority: 0.95,
  },
  {
    path: '/pray',
    frequency: 'daily',
    priority: 0.95,
  },
  {
    path: '/campuses',
    frequency: 'monthly',
    priority: 0.9,
  },
  {
    path: '/events',
    frequency: 'weekly',
    priority: 0.9,
  },
  {
    path: '/updates',
    frequency: 'weekly',
    priority: 0.85,
  },
  {
    path: '/join',
    frequency: 'monthly',
    priority: 0.85,
  },
  {
    path: '/teams',
    frequency: 'monthly',
    priority: 0.82,
  },
  {
    path: '/links',
    frequency: 'monthly',
    priority: 0.82,
  },
  {
    path: '/find',
    frequency: 'monthly',
    priority: 0.85,
  },
  {
    path: '/support',
    frequency: 'monthly',
    priority: 0.85,
  },
  {
    path: '/faq',
    frequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/about',
    frequency: 'monthly',
    priority: 0.75,
  },
  {
    path: '/about/history',
    frequency: 'monthly',
    priority: 0.72,
  },
  {
    path: '/contact',
    frequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/governance',
    frequency: 'yearly',
    priority: 0.35,
  },
  {
    path: '/privacy',
    frequency: 'yearly',
    priority: 0.3,
  },
  {
    path: '/accessibility',
    frequency: 'yearly',
    priority: 0.3,
  },
] as const

export default async function sitemap():
  Promise<MetadataRoute.Sitemap> {
  const staticEntries:
    MetadataRoute.Sitemap =
    pages.map(
      (
        page,
      ) => ({
        url:
          `${baseUrl}${page.path}`,

        changeFrequency:
          page.frequency,

        priority:
          page.priority,
      }),
    )

  const [
    eventsResult,
    programsResult,
  ] =
    await Promise.allSettled([
      fetchEvents(),
      fetchPrograms(),
    ])

  const dynamicEntries:
    MetadataRoute.Sitemap = []

  if (
    eventsResult.status ===
    'fulfilled'
  ) {
    for (
      const event
      of eventsResult.value
    ) {
      if (
        event.publicationStatus &&
        event.publicationStatus !==
          'published'
      ) {
        continue
      }

      dynamicEntries.push({
        url:
          `${baseUrl}/events/${event.id}`,

        changeFrequency:
          'weekly',

        priority:
          0.72,
      })
    }
  }

  if (
    programsResult.status ===
    'fulfilled'
  ) {
    for (
      const program
      of programsResult.value
    ) {
      if (
        program.publicationStatus !==
          'published' ||
        program.localDemo
      ) {
        continue
      }

      dynamicEntries.push({
        url:
          `${baseUrl}/programs/${program.slug}`,

        changeFrequency:
          'weekly',

        priority:
          program.status ===
            'active'
            ? 0.78
            : 0.6,
      })
    }
  }

  const unique =
    new Map<
      string,
      MetadataRoute.Sitemap[number]
    >()

  for (
    const entry
    of [
      ...staticEntries,
      ...dynamicEntries,
    ]
  ) {
    unique.set(
      entry.url,
      entry,
    )
  }

  return Array.from(
    unique.values(),
  )
}