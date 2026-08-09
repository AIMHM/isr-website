export const ISR_PUBLIC = {
  name: 'Islamic Society of RMIT',
  shortName: 'ISR',

  tagline: 'The home of Muslim students at RMIT',
  representationTagline: 'Representing Muslims on campus.',

  email: 'isr@rmit.edu.au',

  location: 'RMIT University, Melbourne',

  instagram: {
    label: '@islamicsocietyofrmit',
    url: 'https://www.instagram.com/islamicsocietyofrmit/',
  },

  whatsapp: {
    label: 'Message ISR',
    url: 'https://api.whatsapp.com/send?phone=61418835013',
  },

  membership: {
    url: 'https://campus.hellorubric.com/?s=10733',
    verified: false,
  },

  community: {
    url: null as string | null,
    verified: false,
  },
} as const

export type PublicPrayerSpace = {
  id: string
  name: string
  summary: string
  verified: boolean
  building: string | null
  room: string | null
  accessHours: string | null
  wudu: string | null
  brothers: string | null
  sisters: string | null
  accessibility: string | null
}

export const PRAYER_SPACES: PublicPrayerSpace[] = [
  {
    id: 'city',
    name: 'City Campus',
    summary:
      'Prayer-space location, access, wudu and facility information.',
    verified: false,
    building: null,
    room: null,
    accessHours: null,
    wudu: null,
    brothers: null,
    sisters: null,
    accessibility: null,
  },
  {
    id: 'bundoora',
    name: 'Bundoora Campus',
    summary:
      'Prayer-space availability and access information for Bundoora.',
    verified: false,
    building: null,
    room: null,
    accessHours: null,
    wudu: null,
    brothers: null,
    sisters: null,
    accessibility: null,
  },
  {
    id: 'brunswick',
    name: 'Brunswick Campus',
    summary:
      'Available prayer options and campus access information.',
    verified: false,
    building: null,
    room: null,
    accessHours: null,
    wudu: null,
    brothers: null,
    sisters: null,
    accessibility: null,
  },
]

export const JUMUAH = {
  verified: false,
  campus: null as string | null,
  venue: null as string | null,
  khutbahTime: null as string | null,
  jamaahTime: null as string | null,
  brothers: null as string | null,
  sisters: null as string | null,
  accessibility: null as string | null,
} as const

export function mailto(subject: string): string {
  return `mailto:${ISR_PUBLIC.email}?subject=${encodeURIComponent(subject)}`
}
