import {
  NextResponse,
} from 'next/server'
import {
  localAdminAuthorized,
  localAdminEnabled,
} from '@/lib/localAdminStore.server'

export async function GET(
  request: Request,
) {
  if (!localAdminEnabled()) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 },
    )
  }

  if (
    !localAdminAuthorized(request)
  ) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 },
    )
  }

  return NextResponse.json({
    data: {
      user: {
        email:
          process.env.LOCAL_ADMIN_EMAIL ??
          'local-admin',
        app_metadata: {
          role: 'admin',
        },
      },
    },
  })
}
