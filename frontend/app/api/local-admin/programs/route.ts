import {
  NextResponse,
} from 'next/server'
import {
  localAdminAuthorized,
  localAdminEnabled,
  readStore,
  safeHttpUrl,
  writeStore,
} from '@/lib/localAdminStore.server'
import type {
  Program,
} from '@/lib/programs'

function makeSlug(
  value: string,
): string {
  return value
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9]+/g,
      '-',
    )
    .replace(
      /^-+|-+$/g,
      '',
    )
}

function validateProgram(
  body: Partial<Program>,
): string | null {
  if (
    !body.name ||
    !body.summary ||
    !body.description ||
    !body.category ||
    !body.campusId ||
    !body.campusLabel ||
    !body.venue ||
    !body.audience ||
    body.weekday === undefined ||
    !body.startTime ||
    !body.endTime ||
    !body.activeFrom ||
    !body.activeUntil
  ) {
    return 'Required program fields are missing'
  }

  if (
    body.weekday < 0 ||
    body.weekday > 6
  ) {
    return 'Weekday must be between 0 and 6'
  }

  if (
    body.intervalWeeks !== 1 &&
    body.intervalWeeks !== 2
  ) {
    return 'Program must repeat weekly or fortnightly'
  }

  if (
    body.registrationUrl &&
    !safeHttpUrl(
      body.registrationUrl,
    )
  ) {
    return 'Registration URL must use http or https'
  }

  if (
    body.registrationMode ===
      'required' &&
    !body.registrationUrl
  ) {
    return 'Registration URL is required'
  }

  return null
}

export async function GET(
  request: Request,
) {
  if (!localAdminEnabled()) {
    return NextResponse.json(
      {
        error:
          'Not found',
      },
      {
        status:
          404,
      },
    )
  }

  const store =
    await readStore()

  const publicScope =
    new URL(
      request.url,
    ).searchParams.get(
      'scope',
    ) === 'public'

  const programs =
    publicScope
      ? store.programs.filter(
          (program) =>
            program.publicationStatus ===
            'published',
        )
      : store.programs

  return NextResponse.json({
    data:
      programs,
  })
}

export async function POST(
  request: Request,
) {
  if (!localAdminEnabled()) {
    return NextResponse.json(
      {
        error:
          'Not found',
      },
      {
        status:
          404,
      },
    )
  }

  if (
    !localAdminAuthorized(
      request,
    )
  ) {
    return NextResponse.json(
      {
        error:
          'Unauthorized',
      },
      {
        status:
          401,
      },
    )
  }

  const body =
    await request.json() as
      Partial<Program>

  const error =
    validateProgram(
      body,
    )

  if (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status:
          400,
      },
    )
  }

  const store =
    await readStore()

  const id =
    String(
      Math.max(
        0,
        ...store.programs
          .map(
            (
              item,
            ) =>
              Number(
                item.id,
              ),
          )
          .filter(
            Number.isFinite,
          ),
      ) +
      1,
    )

  const slug =
    makeSlug(
      body.slug ||
      body.name!,
    )

  if (
    store.programs.some(
      (
        item,
      ) =>
        item.slug ===
        slug,
    )
  ) {
    return NextResponse.json(
      {
        error:
          'A program with this slug already exists',
      },
      {
        status:
          409,
      },
    )
  }

  const program: Program = {
    id,
    slug,

    name:
      body.name!,

    summary:
      body.summary!,

    description:
      body.description!,

    category:
      body.category!,

    campusId:
      body.campusId!,

    campusLabel:
      body.campusLabel!,

    venue:
      body.venue!,

    audience:
      body.audience!,

    weekday:
      body.weekday!,

    startTime:
      body.startTime!,

    endTime:
      body.endTime!,

    intervalWeeks:
      body.intervalWeeks!,

    activeFrom:
      body.activeFrom!,

    activeUntil:
      body.activeUntil!,

    registrationMode:
      body.registrationMode ??
      'none',

    registrationUrl:
      body.registrationUrl ??
      null,

    price:
      body.price ??
      null,

    status:
      body.status ??
      'active',

    publicationStatus:
      body.publicationStatus ??
      'draft',

    imageUrl:
      body.imageUrl ??
      null,

    contentOwner:
      body.contentOwner ??
      null,

    lastReviewedAt:
      body.lastReviewedAt ??
      null,

    reviewDueAt:
      body.reviewDueAt ??
      null,

    exceptions:
      body.exceptions ??
      [],
  }

  store.programs.push(
    program,
  )

  await writeStore(
    store,
  )

  return NextResponse.json(
    {
      data:
        program,
    },
    {
      status:
        201,
    },
  )
}
