import type {
  PublicationStatus,
} from '@/lib/contentTypes'

export type PrayerVerificationStatus =
  | 'verified'
  | 'needs-review'
  | 'temporary'

export type PrayerSpaceRecord = {
  id: number
  slug: string

  name: string
  campus: string
  summary: string

  building: string
  room: string
  accessHours: string

  wudu: string
  brothers: string
  sisters: string
  accessibility: string

  publicationStatus:
    PublicationStatus

  verificationStatus:
    PrayerVerificationStatus

  contentOwner?: string | null
  sourceLabel?: string | null
  reviewedAt?: string | null
  reviewDueAt?: string | null

  createdAt?: string
  updatedAt?: string
}

export type JumuahServiceRecord = {
  id: number
  slug: string

  campus: string
  venue: string

  brothers: string
  sisters: string
  notes: string

  timeRule: string
  standardTime?: string | null
  daylightSavingTime?: string | null

  publicationStatus:
    PublicationStatus

  verificationStatus:
    PrayerVerificationStatus

  contentOwner?: string | null
  sourceLabel?: string | null
  reviewedAt?: string | null
  reviewDueAt?: string | null

  createdAt?: string
  updatedAt?: string
}

export type PrayerRecordsResponse = {
  prayerSpaces:
    PrayerSpaceRecord[]

  jumuahServices:
    JumuahServiceRecord[]
}

export function isPrayerRecordStale(
  record: {
    reviewDueAt?: string | null
  },
  now: Date =
    new Date(),
): boolean {
  if (!record.reviewDueAt) {
    return true
  }

  const due =
    new Date(
      record.reviewDueAt,
    )

  if (
    Number.isNaN(
      due.getTime(),
    )
  ) {
    return true
  }

  return (
    due.getTime() <
    now.getTime()
  )
}
