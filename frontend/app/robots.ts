import type {
  MetadataRoute,
} from 'next'

export default function robots():
  MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    'http://localhost:3000'

  const isLocal =
    baseUrl.includes(
      'localhost',
    ) ||
    process.env.NODE_ENV !==
      'production'

  if (isLocal) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/api',
      ],
    },

    sitemap:
      `${baseUrl}/sitemap.xml`,
  }
}
