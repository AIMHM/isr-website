import { API_BASE_URL } from '@/lib/api'
import { MOCK_ANNOUNCEMENTS } from '@/lib/mockData'
import { IS_LOCAL_MOCK_DATA } from '@/lib/mockMode'

export type Announcement = {
  id: number
  title: string
  body: string
  pinned: boolean
  imageUrl: string | null
  createdAt: string
}

type AnnouncementsResponse = {
  data: Announcement[]
}

const TIMEZONE = 'Australia/Melbourne'

export function formatAnnouncementDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-AU', {
    timeZone: TIMEZONE,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(isoDate))
}

function fetchOptions(): RequestInit | undefined {
  return typeof window === 'undefined'
    ? { next: { revalidate: 60 } }
    : undefined
}

export async function fetchAnnouncements(): Promise<Announcement[]> {
  if (IS_LOCAL_MOCK_DATA) {
    return MOCK_ANNOUNCEMENTS.map((announcement) => ({
      ...announcement,
    }))
  }

  const response = await fetch(
    `${API_BASE_URL}/api/announcements`,
    fetchOptions(),
  )

  if (!response.ok) {
    throw new Error('Failed to fetch announcements')
  }

  const json = (await response.json()) as AnnouncementsResponse
  return json.data
}
