import { API_BASE_URL } from '@/lib/api'
import { MOCK_ANNOUNCEMENTS } from '@/lib/mockData'
import { IS_LOCAL_MOCK_DATA } from '@/lib/mockMode'

export type AnnouncementPriority =
  | 'normal'
  | 'important'
  | 'urgent'

export type Announcement = {
  id: number
  title: string
  body: string
  pinned: boolean
  imageUrl: string | null
  createdAt: string

  priority?: AnnouncementPriority
  expiresAt?: string | null
  actionLabel?: string | null
  actionUrl?: string | null
  contentOwner?: string | null
  reviewedAt?: string | null
}

type AnnouncementsResponse = {
  data: Announcement[]
}

const TIMEZONE = 'Australia/Melbourne'

export function formatAnnouncementDate(
  isoDate: string,
): string {
  return new Intl.DateTimeFormat('en-AU', {
    timeZone: TIMEZONE,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(isoDate))
}

export function isAnnouncementExpired(
  announcement: Announcement,
): boolean {
  if (!announcement.expiresAt) return false

  return (
    new Date(announcement.expiresAt).getTime() <
    Date.now()
  )
}

export function sortAnnouncements(
  announcements: Announcement[],
): Announcement[] {
  const priorityWeight: Record<
    AnnouncementPriority,
    number
  > = {
    normal: 0,
    important: 1,
    urgent: 2,
  }

  return [...announcements].sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return a.pinned ? -1 : 1
    }

    const aPriority =
      priorityWeight[a.priority ?? 'normal']

    const bPriority =
      priorityWeight[b.priority ?? 'normal']

    if (aPriority !== bPriority) {
      return bPriority - aPriority
    }

    return (
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
    )
  })
}

function fetchOptions(): RequestInit | undefined {
  return typeof window === 'undefined'
    ? { next: { revalidate: 60 } }
    : undefined
}

export async function fetchAnnouncements(): Promise<
  Announcement[]
> {
  if (IS_LOCAL_MOCK_DATA) {
    const announcements =
      MOCK_ANNOUNCEMENTS.map(
        (announcement) => ({
          ...announcement,
        }),
      ) as Announcement[]

    return sortAnnouncements(
      announcements.filter(
        (announcement) =>
          !isAnnouncementExpired(announcement),
      ),
    )
  }

  const response = await fetch(
    `${API_BASE_URL}/api/announcements`,
    fetchOptions(),
  )

  if (!response.ok) {
    throw new Error(
      'Failed to fetch announcements',
    )
  }

  const json =
    (await response.json()) as AnnouncementsResponse

  return sortAnnouncements(
    json.data.filter(
      (announcement) =>
        !isAnnouncementExpired(announcement),
    ),
  )
}
