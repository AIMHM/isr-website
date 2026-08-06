const TIMEZONE = 'Australia/Melbourne'

function melbourneDate(): string {
  return new Intl.DateTimeFormat('en-AU', {
    timeZone: TIMEZONE,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())
}

function relativeIso(daysFromNow: number, hour: number, minute: number): string {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  date.setHours(hour, minute, 0, 0)
  return date.toISOString()
}

export const MOCK_PRAYER_TIMES = {
  timings: {
    Fajr: '05:55',
    Dhuhr: '12:25',
    Asr: '15:25',
    Maghrib: '17:35',
    Isha: '18:55',
  },
  date: {
    readable: melbourneDate(),
  },
  meta: {
    timezone: TIMEZONE,
  },
}

export const MOCK_WEATHER = {
  current: {
    temp_c: 14,
    condition: {
      text: 'Local demonstration weather',
      icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"%3E%3Ccircle cx="12" cy="12" r="5" fill="%23D4A017"/%3E%3C/svg%3E',
    },
  },
}

export const MOCK_EVENTS = [
  {
    id: 9001,
    name: 'Demo: ISR Heritage Dinner — verification required',
    date: relativeIso(18, 15, 30),
    imageUrl: '',
    description:
      'Local demonstration event only. The date, time, venue and other details must be verified before publication.',
    ticketUrl: null,
  },
  {
    id: 9002,
    name: 'Demo: Weekly Brothers Halaqa — verification required',
    date: relativeIso(5, 17, 30),
    imageUrl: '',
    description:
      'Sample content for local website testing. This is not an official event listing.',
    ticketUrl: null,
  },
  {
    id: 9003,
    name: 'Demo: Sisters Community Program — verification required',
    date: relativeIso(10, 14, 0),
    imageUrl: '',
    description:
      'Sample content for layout and accessibility testing. All details require confirmation.',
    ticketUrl: null,
  },
  {
    id: 9004,
    name: 'Demo: Previous ISR Activity',
    date: relativeIso(-14, 13, 0),
    imageUrl: '',
    description:
      'Past demonstration event used only to test the events timeline.',
    ticketUrl: null,
  },
]

export const MOCK_ANNOUNCEMENTS = [
  {
    id: 9101,
    title: 'Local prototype notice',
    body:
      'You are viewing development-only sample information. Nothing on this local preview should be treated as an official ISR announcement.',
    pinned: true,
    imageUrl: null,
    createdAt: relativeIso(-1, 10, 0),
  },
  {
    id: 9102,
    title: 'Campus information requires verification',
    body:
      'Prayer-room locations, Jumuah arrangements, accessibility information and campus directions must be verified by ISR and RMIT before publication.',
    pinned: false,
    imageUrl: null,
    createdAt: relativeIso(-3, 10, 0),
  },
]
