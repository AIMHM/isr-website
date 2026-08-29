import type {
  MetadataRoute,
} from 'next'

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'http://localhost:3000'

export default function sitemap():
  MetadataRoute.Sitemap {
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
      path: '/support',
      frequency: 'monthly',
      priority: 0.85,
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

  return pages.map(
    (page) => ({
      url:
        `${baseUrl}${page.path}`,

      changeFrequency:
        page.frequency,

      priority:
        page.priority,
    }),
  )
}
