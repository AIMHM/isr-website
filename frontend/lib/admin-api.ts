import { API_BASE_URL } from '@/lib/api'
import type { Event } from '@/lib/events'
import type { Announcement } from '@/lib/announcements'

function authHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
  }
}

async function readJson(res: Response) {
  try {
    return await res.json()
  } catch {
    return {}
  }
}

export async function signIn(
  email: string,
  password: string,
): Promise<string> {
  const res = await fetch(
    `${API_BASE_URL}/api/auth/signin`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  )

  const json = await readJson(res)

  if (!res.ok) {
    throw new Error(
      json.error ?? 'Sign in failed',
    )
  }

  const token =
    json.data?.session?.access_token

  if (!token) {
    throw new Error(
      'No authenticated session was returned',
    )
  }

  return token
}

export async function getMe(
  token: string,
): Promise<unknown> {
  const res = await fetch(
    `${API_BASE_URL}/api/auth/me`,
    {
      headers: authHeaders(token),
      cache: 'no-store',
    },
  )

  const json = await readJson(res)

  if (!res.ok) {
    throw new Error(
      json.error ??
        'Admin session is no longer valid',
    )
  }

  return json.data?.user
}

export async function fetchAllEvents(): Promise<
  Event[]
> {
  const res = await fetch(
    `${API_BASE_URL}/api/events`,
    {
      cache: 'no-store',
    },
  )

  const json = await readJson(res)

  if (!res.ok) {
    throw new Error(
      json.error ??
        'Failed to fetch events',
    )
  }

  return json.data as Event[]
}

export async function createEvent(
  token: string,
  formData: FormData,
): Promise<Event> {
  const res = await fetch(
    `${API_BASE_URL}/api/events`,
    {
      method: 'POST',
      headers: authHeaders(token),
      body: formData,
    },
  )

  const json = await readJson(res)

  if (!res.ok) {
    throw new Error(
      json.error ??
        'Failed to create event',
    )
  }

  return json.data as Event
}

export async function updateEvent(
  token: string,
  id: number,
  formData: FormData,
): Promise<Event> {
  const res = await fetch(
    `${API_BASE_URL}/api/events/${id}`,
    {
      method: 'PUT',
      headers: authHeaders(token),
      body: formData,
    },
  )

  const json = await readJson(res)

  if (!res.ok) {
    throw new Error(
      json.error ??
        'Failed to update event',
    )
  }

  return json.data as Event
}

export async function deleteEvent(
  token: string,
  id: number,
): Promise<void> {
  const res = await fetch(
    `${API_BASE_URL}/api/events/${id}`,
    {
      method: 'DELETE',
      headers: authHeaders(token),
    },
  )

  if (!res.ok) {
    const json = await readJson(res)

    throw new Error(
      json.error ??
        'Failed to delete event',
    )
  }
}

export async function fetchAllAnnouncements(): Promise<
  Announcement[]
> {
  const res = await fetch(
    `${API_BASE_URL}/api/announcements`,
    {
      cache: 'no-store',
    },
  )

  const json = await readJson(res)

  if (!res.ok) {
    throw new Error(
      json.error ??
        'Failed to fetch ISR updates',
    )
  }

  return json.data as Announcement[]
}

export async function createAnnouncement(
  token: string,
  formData: FormData,
): Promise<Announcement> {
  const res = await fetch(
    `${API_BASE_URL}/api/announcements`,
    {
      method: 'POST',
      headers: authHeaders(token),
      body: formData,
    },
  )

  const json = await readJson(res)

  if (!res.ok) {
    throw new Error(
      json.error ??
        'Failed to create ISR update',
    )
  }

  return json.data as Announcement
}

export async function updateAnnouncement(
  token: string,
  id: number,
  formData: FormData,
): Promise<Announcement> {
  const res = await fetch(
    `${API_BASE_URL}/api/announcements/${id}`,
    {
      method: 'PUT',
      headers: authHeaders(token),
      body: formData,
    },
  )

  const json = await readJson(res)

  if (!res.ok) {
    throw new Error(
      json.error ??
        'Failed to update ISR update',
    )
  }

  return json.data as Announcement
}

export async function deleteAnnouncement(
  token: string,
  id: number,
): Promise<void> {
  const res = await fetch(
    `${API_BASE_URL}/api/announcements/${id}`,
    {
      method: 'DELETE',
      headers: authHeaders(token),
    },
  )

  if (!res.ok) {
    const json = await readJson(res)

    throw new Error(
      json.error ??
        'Failed to delete ISR update',
    )
  }
}
