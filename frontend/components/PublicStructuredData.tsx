export default function PublicStructuredData() {
  const data = {
    '@context':
      'https://schema.org',

    '@type':
      'Organization',

    name:
      'Islamic Society of RMIT',

    url:
      'https://theisr.com.au',

    email:
      'isr@rmit.edu.au',

    telephone:
      '+61 418 835 013',
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
