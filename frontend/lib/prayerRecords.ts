import {
  API_BASE_URL,
} from '@/lib/api'
import {
  IS_LOCAL_ADMIN_MODE,
  localAdminApiUrl,
} from '@/lib/localAdminMode'
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

export async function fetchPrayerRecords():
  Promise<PrayerRecordsResponse> {
  const response =
    await fetch(
      IS_LOCAL_ADMIN_MODE
        ? localAdminApiUrl(
            '/prayer-info',
          )
        : `${API_BASE_URL}/api/prayer-info`,
      typeof window ===
        'undefined'
        ? {
            next: {
              revalidate:
                60,
            },
          }
        : undefined,
    )

  if (!response.ok) {
    throw new Error(
      'Failed to fetch prayer information',
    )
  }

  const json =
    await response.json()

  return (
    json.data as
      PrayerRecordsResponse
  )
}

export async function fetchAdminPrayerRecords(
  token: string,
): Promise<PrayerRecordsResponse> {
  const response =
    await fetch(
      IS_LOCAL_ADMIN_MODE
        ? localAdminApiUrl(
            '/prayer-info?scope=admin',
          )
        : `${API_BASE_URL}/api/prayer-info/admin/all`,
      {
        cache:
          'no-store',

        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      },
    )

  if (!response.ok) {
    throw new Error(
      'Failed to fetch admin prayer information',
    )
  }

  const json =
    await response.json()

  return (
    json.data as
      PrayerRecordsResponse
  )
}

export async function updatePrayerSpaceRecord(
  token: string,
  id: number,
  data: Partial<PrayerSpaceRecord>,
): Promise<PrayerSpaceRecord> {
  const response =
    await fetch(
      IS_LOCAL_ADMIN_MODE
        ? localAdminApiUrl(
            `/prayer-info/spaces/${id}`,
          )
        : `${API_BASE_URL}/api/prayer-info/spaces/${id}`,
      {
        method:
          'PUT',

        headers: {
          Authorization:
            `Bearer ${token}`,
          'Content-Type':
            'application/json',
        },

        body:
          JSON.stringify(
            data,
          ),
      },
    )

  const json =
    await response.json()

  if (!response.ok) {
    throw new Error(
      json.error ??
        'Failed to update prayer space',
    )
  }

  return (
    json.data as
      PrayerSpaceRecord
  )
}

export async function updateJumuahServiceRecord(
  token: string,
  id: number,
  data: Partial<JumuahServiceRecord>,
): Promise<JumuahServiceRecord> {
  const response =
    await fetch(
      IS_LOCAL_ADMIN_MODE
        ? localAdminApiUrl(
            `/prayer-info/jumuah/${id}`,
          )
        : `${API_BASE_URL}/api/prayer-info/jumuah/${id}`,
      {
        method:
          'PUT',

        headers: {
          Authorization:
            `Bearer ${token}`,
          'Content-Type':
            'application/json',
        },

        body:
          JSON.stringify(
            data,
          ),
      },
    )

  const json =
    await response.json()

  if (!response.ok) {
    throw new Error(
      json.error ??
        'Failed to update Jumuah service',
    )
  }

  return (
    json.data as
      JumuahServiceRecord
  )
}
