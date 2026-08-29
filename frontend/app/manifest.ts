import type {
  MetadataRoute,
} from 'next'

export default function manifest():
  MetadataRoute.Manifest {
  return {
    name:
      'Islamic Society of RMIT',

    short_name:
      'ISR',

    description:
      'The home of Muslim students at RMIT. Prayer, events, community, support and opportunities to get involved.',

    start_url:
      '/',

    display:
      'standalone',

    background_color:
      '#FFFFFF',

    theme_color:
      '#5B0B05',

    orientation:
      'portrait-primary',

    icons: [
      {
        src:
          '/images/isr_logo_transparent.png',

        sizes:
          'any',

        type:
          'image/png',

        purpose:
          'any',
      },
    ],
  }
}