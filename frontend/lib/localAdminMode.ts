export const IS_LOCAL_ADMIN_MODE =
  process.env.NODE_ENV !== 'production' &&
  process.env.NEXT_PUBLIC_LOCAL_ADMIN_MODE === 'true'

export function localAdminApiUrl(
  path = '',
): string {
  const suffix =
    path.length === 0
      ? ''
      : path.startsWith('/')
        ? path
        : `/${path}`

  if (typeof window !== 'undefined') {
    return `/api/local-admin${suffix}`
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    'http://localhost:3000'

  return `${siteUrl.replace(
    /\/$/,
    '',
  )}/api/local-admin${suffix}`
}
