import type { MetadataRoute } from 'next'

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://theisr.com.au'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: '', frequency: 'weekly', priority: 1 },
    { path: '/pray', frequency: 'daily', priority: 0.95 },
    { path: '/events', frequency: 'weekly', priority: 0.9 },
    { path: '/announcements', frequency: 'weekly', priority: 0.85 },
    { path: '/support', frequency: 'monthly', priority: 0.8 },
    { path: '/join', frequency: 'monthly', priority: 0.8 },
    { path: '/about', frequency: 'monthly', priority: 0.75 },
    { path: '/governance', frequency: 'monthly', priority: 0.7 },
    { path: '/contact', frequency: 'monthly', priority: 0.7 },
    { path: '/privacy', frequency: 'yearly', priority: 0.4 },
    { path: '/accessibility', frequency: 'yearly', priority: 0.4 },
  ] as const

  return pages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    changeFrequency: page.frequency,
    priority: page.priority,
  }))
}
