export const ISR_PUBLIC = {
  name: 'Islamic Society of RMIT',
  shortName: 'ISR',

  tagline: 'The home of Muslim students at RMIT',
  representationTagline:
    'Representing Muslims on campus.',

  mission:
    'To provide Muslim students at RMIT with a reliable, accessible and welcoming home for worship, community, support, participation and representation.',

  email: 'isr@rmit.edu.au',

  phone: {
    label: '+61 418 835 013',
    href: 'tel:+61418835013',
  },

  location:
    'RMIT University, Melbourne',

  instagram: {
    label: '@islamicsocietyofrmit',
    url: 'https://www.instagram.com/islamicsocietyofrmit/',
  },

  tiktok: {
    label: '@islamicsocietyofrmit_',
    url: 'https://www.tiktok.com/@islamicsocietyofrmit_',
  },

  whatsapp: {
    label: 'Message ISR on WhatsApp',
    url: 'https://api.whatsapp.com/send?phone=61418835013',
  },

  membership: {
    label: 'Free ISR Membership',
    url: 'https://campus.hellorubric.com/?s=10733',
    verified: true,
    priceLabel: 'Free',
  },

  community: {
    label: 'Join the ISR WhatsApp Community',
    url: 'https://chat.whatsapp.com/Hcqw7j4wg382XYxFehkYMI',
    verified: true,
  },

  brothersCommunity: {
    label: 'Brothers Community',
    url: null as string | null,
    verified: false,
    placeholder: 'Link coming soon',
  },

  sistersCommunity: {
    label: 'Sisters Community',
    url: null as string | null,
    verified: false,
    placeholder: 'Link coming soon',
  },

  volunteer: {
    label: 'Become an ISR Volunteer',
    url: 'https://forms.office.com/Pages/ResponsePage.aspx?id=cTYy0b7NF0S01L2yS1ExayRsUk9zIkJEuN2urJtW7blUNDQ0WVc1MlBURkpUVFZET0ZJRUVTOEdGWCQlQCN0PWcu&origin=QRCode',
  },

  team: {
    label: 'Be Part of the ISR Team',
    url: 'https://forms.office.com/pages/responsepage.aspx?id=cTYy0b7NF0S01L2yS1ExawGQ5buxbcZOm1cW9tREGppUMFJZWDUxMEJYMjA0VFRRQ1BXMUlZSFRCTi4u&route=shorturl',
  },

  donate: {
    label: 'Support Muslim Students at RMIT',
    url: 'https://www.trybooking.com/au/donate/isrdonations',
  },

  bank: {
    accountName: 'Islamic Society of RMIT',
    bsb: '063262',
    accountNumber: '10083473',
  },
} as const

export type PublicPrayerSpace = {
  id: string
  name: string
  campus: string
  summary: string
  verified: boolean
  building: string
  room: string
  accessHours: string
  wudu: string
  brothers: string
  sisters: string
  accessibility: string
}

export const PRAYER_SPACES: PublicPrayerSpace[] = [
  {
    id: 'city',
    name: 'City Campus',
    campus: 'City',
    summary:
      'Dedicated Islamic prayer rooms in the Multifaith and Wellbeing Centre.',
    verified: true,
    building:
      'Building 47 — Multifaith and Wellbeing Centre',
    room:
      'Brothers: 47.02.02 • Sisters: 47.01.07',
    accessHours:
      '12:00 pm–8:00 pm, Monday–Friday',
    wudu:
      'Dedicated ablution facilities are available in Building 47.',
    brothers:
      'Building 47, Level 2, Room 02 (47.02.02)',
    sisters:
      'Building 47, Level 1, Room 07 (47.01.07)',
    accessibility:
      'Contact ISR if you need accessibility or access guidance.',
  },
  {
    id: 'bundoora-east',
    name: 'Bundoora East',
    campus: 'Bundoora',
    summary:
      'Dedicated Islamic prayer rooms at Bundoora East.',
    verified: true,
    building:
      'Building 254, Level 1',
    room:
      'Brothers: 254.1.02 • Sisters: 254.1.03',
    accessHours:
      '9:00 am–5:00 pm, Monday–Thursday',
    wudu:
      'Contact ISR if you need current wudu directions.',
    brothers:
      'Building 254, Level 1, Room 02 (254.1.02)',
    sisters:
      'Building 254, Level 1, Room 03 (254.1.03)',
    accessibility:
      'Contact ISR if you need accessibility or access guidance.',
  },
  {
    id: 'bundoora-west',
    name: 'Bundoora West',
    campus: 'Bundoora',
    summary:
      'Daily prayer rooms and the Bundoora Friday prayer location.',
    verified: true,
    building:
      'Building 202',
    room:
      'Brothers: 202.04.29 • Sisters: 202.04.01',
    accessHours:
      '9:00 am–5:00 pm, Monday–Friday',
    wudu:
      'Contact ISR if you need current wudu directions.',
    brothers:
      'Building 202, Level 4, Room 29 (202.04.29)',
    sisters:
      'Building 202, Level 4, Room 01 (202.04.01)',
    accessibility:
      'Contact ISR if you need accessibility or access guidance.',
  },
  {
    id: 'brunswick',
    name: 'Brunswick Campus',
    campus: 'Brunswick',
    summary:
      'Dedicated Islamic prayer rooms at Brunswick.',
    verified: true,
    building:
      'Building 514, Level 2',
    room:
      'Brothers: 514.2.07 • Sisters: 514.2.06',
    accessHours:
      '9:00 am–5:00 pm, Monday–Friday',
    wudu:
      'Contact ISR if you need current wudu directions.',
    brothers:
      'Building 514, Level 2, Room 07 (514.2.07)',
    sisters:
      'Building 514, Level 2, Room 06 (514.2.06)',
    accessibility:
      'Contact ISR if you need accessibility or access guidance.',
  },
]

export type PublicJumuahService = {
  id: string
  campus: string
  time: string
  venue: string
  brothers: string
  sisters: string
  notes: string
  verified: boolean
}

export const JUMUAH_SERVICES: PublicJumuahService[] = [
  {
    id: 'city-jumuah',
    campus: 'City Campus',
    time: '1:30 pm year-round',
    venue: 'Building 47',
    brothers:
      '47.02.02',
    sisters:
      '47.01.07',
    notes:
      'City Jumu’ah remains at 1:30 pm throughout the year. Check ISR Updates for exceptional changes.',
    verified: true,
  },
  {
    id: 'bundoora-jumuah',
    campus: 'Bundoora West',
    time:
      '12:30 pm outside daylight saving • 1:30 pm during daylight saving',
    venue:
      'Building 202, Level 3, Room 30 (202.03.30)',
    brothers:
      'Jumu’ah is held in 202.03.30.',
    sisters:
      'Sisters use the sisters prayer room, 202.04.01, with the Jumu’ah livestream.',
    notes:
      'The Bundoora time changes with Victorian daylight saving. Check ISR Updates if you are unsure before travelling.',
    verified: true,
  },
]

/**
 * Backwards-compatible City Jumu'ah export.
 * Prefer JUMUAH_SERVICES for new UI.
 */
export const JUMUAH = {
  verified: true,
  campus: 'City Campus',
  venue: 'Building 47',
  khutbahTime: '1:30 pm',
  jamaahTime: null as string | null,
  brothers: '47.02.02',
  sisters: '47.01.07',
  accessibility:
    'Contact ISR if you need accessibility or access guidance.',
} as const

export function mailto(
  subject: string,
): string {
  return `mailto:${ISR_PUBLIC.email}?subject=${encodeURIComponent(
    subject,
  )}`
}
