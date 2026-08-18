import {
  API_BASE_URL,
} from '@/lib/api'
import {
  IS_LOCAL_ADMIN_MODE,
  localAdminApiUrl,
} from '@/lib/localAdminMode'
import type {
  Event,
} from '@/lib/events'
import type {
  Announcement,
} from '@/lib/announcements'
import type {
  Program,
} from '@/lib/programs'

function authHeaders(
  token: string,
): HeadersInit {
  return {
    Authorization:
      `Bearer ${token}`,
  }
}

function endpoint(
  localPath: string,
  backendPath: string,
): string {
  return IS_LOCAL_ADMIN_MODE
    ? localAdminApiUrl(
        localPath,
      )
    : `${API_BASE_URL}${backendPath}`
}

async function readJson(
  response: Response,
) {
  try {
    return await response.json()
  } catch {
    return {}
  }
}

export async function signIn(
  email: string,
  password: string,
): Promise<string> {
  const response =
    await fetch(
      endpoint(
        '/auth/signin',
        '/api/auth/signin',
      ),
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    )

  const json =
    await readJson(response)

  if (!response.ok) {
    throw new Error(
      json.error ??
        'Sign in failed',
    )
  }

  const token =
    json.data?.session
      ?.access_token

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
  const response =
    await fetch(
      endpoint(
        '/auth/me',
        '/api/auth/me',
      ),
      {
        headers:
          authHeaders(token),
        cache: 'no-store',
      },
    )

  const json =
    await readJson(response)

  if (!response.ok) {
    throw new Error(
      json.error ??
        'Admin session is no longer valid',
    )
  }

  return json.data?.user
}

export async function fetchAllEvents(
  token: string,
): Promise<Event[]> {
  const response =
    await fetch(
      endpoint(
        '/events',
        '/api/events/admin/all',
      ),
      {
        headers:
          authHeaders(token),
        cache: 'no-store',
      },
    )

  const json =
    await readJson(response)

  if (!response.ok) {
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
  const response =
    await fetch(
      endpoint(
        '/events',
        '/api/events',
      ),
      {
        method: 'POST',
        headers:
          authHeaders(token),
        body: formData,
      },
    )

  const json =
    await readJson(response)

  if (!response.ok) {
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
  const response =
    await fetch(
      endpoint(
        `/events/${id}`,
        `/api/events/${id}`,
      ),
      {
        method: 'PUT',
        headers:
          authHeaders(token),
        body: formData,
      },
    )

  const json =
    await readJson(response)

  if (!response.ok) {
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
  const response =
    await fetch(
      endpoint(
        `/events/${id}`,
        `/api/events/${id}`,
      ),
      {
        method: 'DELETE',
        headers:
          authHeaders(token),
      },
    )

  if (!response.ok) {
    const json =
      await readJson(response)

    throw new Error(
      json.error ??
        'Failed to delete event',
    )
  }
}

export async function fetchAllAnnouncements():
  Promise<Announcement[]> {
  const response =
    await fetch(
      endpoint(
        '/announcements',
        '/api/announcements',
      ),
      {
        cache: 'no-store',
      },
    )

  const json =
    await readJson(response)

  if (!response.ok) {
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
  const response =
    await fetch(
      endpoint(
        '/announcements',
        '/api/announcements',
      ),
      {
        method: 'POST',
        headers:
          authHeaders(token),
        body: formData,
      },
    )

  const json =
    await readJson(response)

  if (!response.ok) {
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
  const response =
    await fetch(
      endpoint(
        `/announcements/${id}`,
        `/api/announcements/${id}`,
      ),
      {
        method: 'PUT',
        headers:
          authHeaders(token),
        body: formData,
      },
    )

  const json =
    await readJson(response)

  if (!response.ok) {
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
  const response =
    await fetch(
      endpoint(
        `/announcements/${id}`,
        `/api/announcements/${id}`,
      ),
      {
        method: 'DELETE',
        headers:
          authHeaders(token),
      },
    )

  if (!response.ok) {
    const json =
      await readJson(response)

    throw new Error(
      json.error ??
        'Failed to delete ISR update',
    )
  }
}


export async function fetchAllPrograms(
  token: string,
): Promise<Program[]> {
  const response =
    await fetch(
      endpoint(
        '/programs',
        '/api/programs/admin/all',
      ),
      {
        headers:
          authHeaders(token),
        cache:
          'no-store',
      },
    )

  const json =
    await readJson(
      response,
    )

  if (!response.ok) {
    throw new Error(
      json.error ??
        'Failed to fetch programs',
    )
  }

  return json.data as Program[]
}

export async function createProgram(
  token: string,
  program: Omit<
    Program,
    'id'
  >,
): Promise<Program> {
  const response =
    await fetch(
      endpoint(
        '/programs',
        '/api/programs',
      ),
      {
        method:
          'POST',

        headers: {
          ...authHeaders(
            token,
          ),

          'Content-Type':
            'application/json',
        },

        body:
          JSON.stringify(
            program,
          ),
      },
    )

  const json =
    await readJson(
      response,
    )

  if (!response.ok) {
    throw new Error(
      json.error ??
        'Failed to create program',
    )
  }

  return json.data as Program
}

export async function updateProgram(
  token: string,
  id: string,
  program: Omit<
    Program,
    'id'
  >,
): Promise<Program> {
  const response =
    await fetch(
      endpoint(
        `/programs/${id}`,
        `/api/programs/${id}`,
      ),
      {
        method:
          'PUT',

        headers: {
          ...authHeaders(
            token,
          ),

          'Content-Type':
            'application/json',
        },

        body:
          JSON.stringify(
            program,
          ),
      },
    )

  const json =
    await readJson(
      response,
    )

  if (!response.ok) {
    throw new Error(
      json.error ??
        'Failed to update program',
    )
  }

  return json.data as Program
}

export async function deleteProgram(
  token: string,
  id: string,
): Promise<void> {
  const response =
    await fetch(
      endpoint(
        `/programs/${id}`,
        `/api/programs/${id}`,
      ),
      {
        method:
          'DELETE',

        headers:
          authHeaders(
            token,
          ),
      },
    )

  if (!response.ok) {
    const json =
      await readJson(
        response,
      )

    throw new Error(
      json.error ??
        'Failed to delete program',
    )
  }
}
