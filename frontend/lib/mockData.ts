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
    method: {
      id: 3,
      name: 'Muslim World League',
    },
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
    name: 'Demo: ISR Heritage Dinner',
    date: relativeIso(18, 15, 30),
    endDate: relativeIso(18, 20, 0),
    imageUrl: '',
    description:
      'Local demonstration event only. All event details must be verified before publication.',
    ticketUrl: null,
    venue: 'RMIT Building 16, Storey Hall',
    campus: 'City campus',
    audience: 'RMIT students and invited guests',
    price: 'Demo price: $15',
    accessibility:
      'Accessibility arrangements require venue confirmation.',
    status: 'scheduled',
    statusNote:
      'Prototype listing only. This is not an official published event.',
    contentOwner: 'Events Team',
    reviewedAt: relativeIso(-1, 10, 0),
  },
  {
    id: 9002,
    name: 'Demo: Weekly Brothers Halaqa',
    date: relativeIso(5, 17, 30),
    endDate: relativeIso(5, 19, 0),
    imageUrl: '',
    description:
      'Sample content for local website testing. This is not an official event listing.',
    ticketUrl: null,
    venue: 'Venue verification required',
    campus: 'City campus',
    audience: 'Brothers',
    price: 'Free',
    accessibility:
      'Contact ISR to discuss accessibility arrangements.',
    status: 'postponed',
    statusNote:
      'A new date and venue are being confirmed.',
    contentOwner: 'Religious Affairs',
    reviewedAt: relativeIso(-2, 10, 0),
  },
  {
    id: 9003,
    name: 'Demo: Sisters Community Program',
    date: relativeIso(10, 14, 0),
    endDate: relativeIso(10, 17, 0),
    imageUrl: '',
    description:
      'Sample content for layout and accessibility testing. All details require confirmation.',
    ticketUrl: 'https://example.com',
    venue: 'Venue verification required',
    campus: 'City campus',
    audience: 'Sisters',
    price: 'Free registration',
    accessibility:
      'Step-free access information requires confirmation.',
    status: 'sold-out',
    statusNote:
      'Demo sold-out state for website testing.',
    contentOwner: 'Sisters Events Team',
    reviewedAt: relativeIso(-1, 10, 0),
  },
  {
    id: 9004,
    name: 'Demo: Previous ISR Activity',
    date: relativeIso(-14, 13, 0),
    endDate: relativeIso(-14, 16, 0),
    imageUrl: '',
    description:
      'Past demonstration event used only to test completed-event displays.',
    ticketUrl: null,
    venue: 'RMIT University',
    campus: 'City campus',
    audience: 'Students',
    price: 'Free',
    accessibility:
      'Historical accessibility information unavailable.',
    status: 'completed',
    statusNote: null,
    contentOwner: 'Events Team',
    reviewedAt: relativeIso(-14, 18, 0),
  },
  {
    id: 9005,
    name: 'Demo: Cancelled Community BBQ',
    date: relativeIso(7, 14, 0),
    endDate: relativeIso(7, 18, 0),
    imageUrl: '',
    description:
      'Demonstration listing used to test event cancellation messaging.',
    ticketUrl: null,
    venue: 'Bundoora campus',
    campus: 'Bundoora campus',
    audience: 'RMIT students',
    price: 'Refunds required',
    accessibility:
      'Event cancelled.',
    status: 'cancelled',
    statusNote:
      'This demonstration event has been cancelled. Registered attendees would receive direct communication.',
    contentOwner: 'Events Team',
    reviewedAt: relativeIso(-1, 10, 0),
  },
]

export const MOCK_ANNOUNCEMENTS = [
  {
    id: 9101,
    title: 'Local prototype notice',
    body:
      'You are viewing development-only sample information. Nothing on this local preview should be treated as an official ISR announcement.',
    pinned: true,
    priority: 'urgent',
    imageUrl: null,
    createdAt: relativeIso(-1, 10, 0),
    expiresAt: relativeIso(30, 23, 59),
    actionLabel: null,
    actionUrl: null,
    contentOwner: 'Website Team',
    reviewedAt: relativeIso(-1, 10, 0),
  },
  {
    id: 9102,
    title: 'Campus information requires verification',
    body:
      'Prayer-room locations, Jumuah arrangements, accessibility information and campus directions must be verified before publication.',
    pinned: false,
    priority: 'important',
    imageUrl: null,
    createdAt: relativeIso(-3, 10, 0),
    expiresAt: relativeIso(14, 23, 59),
    actionLabel: 'Review prayer information',
    actionUrl: '/pray',
    contentOwner: 'Musallah Team',
    reviewedAt: relativeIso(-2, 10, 0),
  },
  {
    id: 9103,
    title: 'Demonstration community update',
    body:
      'This sample notice tests standard announcements, action links and content ownership information.',
    pinned: false,
    priority: 'normal',
    imageUrl: null,
    createdAt: relativeIso(-4, 10, 0),
    expiresAt: null,
    actionLabel: 'View student support',
    actionUrl: '/support',
    contentOwner: 'Administration',
    reviewedAt: relativeIso(-3, 10, 0),
  },
]
