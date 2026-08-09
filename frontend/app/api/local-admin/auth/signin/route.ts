import {
  NextResponse,
} from 'next/server'
import {
  localAdminCredentialsValid,
  localAdminEnabled,
  localAdminToken,
} from '@/lib/localAdminStore.server'

export async function POST(
  request: Request,
) {
  if (!localAdminEnabled()) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 },
    )
  }

  const body =
    (await request.json()) as {
      email?: string
      password?: string
    }

  const email =
    body.email?.trim() ?? ''

  const password =
    body.password ?? ''

  if (
    !localAdminCredentialsValid(
      email,
      password,
    )
  ) {
    return NextResponse.json(
      {
        error:
          'Invalid local admin credentials',
      },
      { status: 401 },
    )
  }

  const token =
    localAdminToken()

  if (!token) {
    return NextResponse.json(
      {
        error:
          'Local admin token is not configured',
      },
      { status: 500 },
    )
  }

  return NextResponse.json({
    data: {
      session: {
        access_token: token,
      },
      user: {
        email,
        app_metadata: {
          role: 'admin',
        },
      },
    },
  })
}
