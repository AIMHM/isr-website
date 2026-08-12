import {
  ISR_PUBLIC,
} from '@/lib/siteContent'

export default function PublicStructuredData() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    'http://localhost:3000'

  const data = {
    '@context':
      'https://schema.org',

    '@type':
      'Organization',

    name:
      ISR_PUBLIC.name,

    url:
      siteUrl,

    email:
      ISR_PUBLIC.email,

    telephone:
      ISR_PUBLIC.phone.label,

    sameAs: [
      ISR_PUBLIC.instagram.url,
      ISR_PUBLIC.tiktok.url,
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html:
          JSON.stringify(
            data,
          ),
      }}
    />
  )
}
