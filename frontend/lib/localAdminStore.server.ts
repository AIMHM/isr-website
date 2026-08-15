import 'server-only'

import fs from 'node:fs/promises'
import path from 'node:path'
import type {
  Event,
  EventStatus,
} from '@/lib/events'
import type {
  Announcement,
  AnnouncementPriority,
} from '@/lib/announcements'
import type {
  Program,
} from '@/lib/programs'
import {
  MOCK_EVENTS,
  MOCK_ANNOUNCEMENTS,
} from '@/lib/mockData'

type LocalStore = {
  events: Event[]
  announcements: Announcement[]
  programs: Program[]
}

const DATA_DIR = path.join(
  process.cwd(),
  '.local-data',
)

const DATA_FILE = path.join(
  DATA_DIR,
  'admin-content.json',
)

const EVENT_STATUSES = new Set<EventStatus>([
  'scheduled',
  'sold-out',
  'postponed',
  'cancelled',
  'completed',
])

const ANNOUNCEMENT_PRIORITIES =
  new Set<AnnouncementPriority>([
    'normal',
    'important',
    'urgent',
  ])

export function localAdminEnabled(): boolean {
  return (
    process.env.NODE_ENV !== 'production' &&
    process.env.LOCAL_ADMIN_MODE === 'true'
  )
}

export function localAdminAuthorized(
  request: Request,
): boolean {
  if (!localAdminEnabled()) {
    return false
  }

  const token =
    process.env.LOCAL_ADMIN_TOKEN

  if (!token) return false

  return (
    request.headers.get('authorization') ===
    `Bearer ${token}`
  )
}

export function localAdminCredentialsValid(
  email: string,
  password: string,
): boolean {
  if (!localAdminEnabled()) {
    return false
  }

  return (
    email ===
      process.env.LOCAL_ADMIN_EMAIL &&
    password ===
      process.env.LOCAL_ADMIN_PASSWORD
  )
}

export function localAdminToken():
  | string
  | null {
  if (!localAdminEnabled()) {
    return null
  }

  return (
    process.env.LOCAL_ADMIN_TOKEN ??
    null
  )
}

function starterStore(): LocalStore {
  return {
    events: MOCK_EVENTS.map(
      (event) => ({
        ...event,
      }),
    ) as Event[],

    announcements:
      MOCK_ANNOUNCEMENTS.map(
        (announcement) => ({
          ...announcement,
        }),
      ) as Announcement[],

    programs: [],
  }
}

async function ensureStore(): Promise<void> {
  await fs.mkdir(
    DATA_DIR,
    { recursive: true },
  )

  try {
    await fs.access(DATA_FILE)
  } catch {
    await writeStore(
      starterStore(),
    )
  }
}

export async function readStore():
  Promise<LocalStore> {
  await ensureStore()

  const raw =
    await fs.readFile(
      DATA_FILE,
      'utf8',
    )

  const parsed =
    JSON.parse(raw) as LocalStore

  return {
    events:
      Array.isArray(parsed.events)
        ? parsed.events
        : [],

    announcements:
      Array.isArray(
        parsed.announcements,
      )
        ? parsed.announcements
        : [],

    programs:
      Array.isArray(
        parsed.programs,
      )
        ? parsed.programs
        : [],
  }
}

export async function writeStore(
  store: LocalStore,
): Promise<void> {
  await fs.mkdir(
    DATA_DIR,
    { recursive: true },
  )

  await fs.writeFile(
    DATA_FILE,
    JSON.stringify(
      store,
      null,
      2,
    ),
    'utf8',
  )
}

export function nextId(
  records: { id: number }[],
): number {
  const highest =
    records.reduce(
      (max, record) =>
        Math.max(
          max,
          record.id,
        ),
      0,
    )

  return highest + 1
}

export function formString(
  form: FormData,
  key: string,
): string {
  const value =
    form.get(key)

  return typeof value === 'string'
    ? value.trim()
    : ''
}

export function optionalString(
  value: string,
): string | null {
  return value || null
}

export function validEventStatus(
  value: string,
): value is EventStatus {
  return EVENT_STATUSES.has(
    value as EventStatus,
  )
}

export function validPriority(
  value: string,
): value is AnnouncementPriority {
  return ANNOUNCEMENT_PRIORITIES.has(
    value as AnnouncementPriority,
  )
}

export function safeHttpUrl(
  value: string,
): boolean {
  if (!value) return true

  try {
    const parsed =
      new URL(value)

    return (
      parsed.protocol === 'http:' ||
      parsed.protocol === 'https:'
    )
  } catch {
    return false
  }
}

export function safeActionUrl(
  value: string,
): boolean {
  if (!value) return true

  if (
    value.startsWith('/') &&
    !value.startsWith('//')
  ) {
    return true
  }

  return safeHttpUrl(value)
}

export async function imageToDataUrl(
  entry: FormDataEntryValue | null,
): Promise<string | null> {
  if (!(entry instanceof File)) {
    return null
  }

  if (entry.size === 0) {
    return null
  }

  const allowedTypes =
    new Set([
      'image/jpeg',
      'image/png',
      'image/webp',
    ])

  if (
    !allowedTypes.has(entry.type)
  ) {
    throw new Error(
      'Only JPEG, PNG and WebP images are allowed',
    )
  }

  if (
    entry.size >
    5 * 1024 * 1024
  ) {
    throw new Error(
      'Image must be 5 MB or smaller',
    )
  }

  const bytes =
    Buffer.from(
      await entry.arrayBuffer(),
    )

  return `data:${entry.type};base64,${bytes.toString(
    'base64',
  )}`
}
