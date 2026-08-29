import {
  cache,
} from 'react'
import type {
  Metadata,
} from 'next'
import {
  notFound,
} from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProgramDetailExperience from '@/components/ProgramDetailExperience'
import {
  fetchProgramBySlug,
  type Program,
} from '@/lib/programs'

type ProgramPageProps = {
  params: Promise<{
    slug: string
  }>
}

const getProgram =
  cache(
    fetchProgramBySlug,
  )

function metadataDescription(
  program: Program,
): string {
  const value =
    (
      program.summary ||
      program.description
    )
      .replace(
        /\s+/g,
        ' ',
      )
      .trim()

  if (
    value.length <=
    155
  ) {
    return value
  }

  return (
    value
      .slice(
        0,
        152,
      )
      .trimEnd() +
    '...'
  )
}

export async function generateMetadata({
  params,
}: ProgramPageProps): Promise<Metadata> {
  const {
    slug,
  } =
    await params

  if (!slug) {
    return {
      title:
        'Program unavailable',

      robots: {
        index:
          false,
        follow:
          true,
      },
    }
  }

  try {
    const program =
      await getProgram(
        slug,
      )

    if (!program) {
      return {
        title:
          'Program unavailable',

        description:
          'This ISR program could not be found.',

        robots: {
          index:
            false,
          follow:
            true,
        },
      }
    }

    const description =
      metadataDescription(
        program,
      )

    return {
      title:
        program.name,

      description,

      alternates: {
        canonical:
          `/programs/${program.slug}`,
      },

      openGraph: {
        type:
          'website',

        title:
          program.name,

        description,

        url:
          `/programs/${program.slug}`,

        images:
          program.imageUrl
            ? [
                {
                  url:
                    program.imageUrl,

                  alt:
                    `${program.name} program`,
                },
              ]
            : undefined,
      },

      twitter: {
        card:
          program.imageUrl
            ? 'summary_large_image'
            : 'summary',

        title:
          program.name,

        description,

        images:
          program.imageUrl
            ? [
                program.imageUrl,
              ]
            : undefined,
      },
    }
  }
  catch {
    return {
      title:
        'ISR Program',

      description:
        'Recurring program information from the Islamic Society of RMIT.',
    }
  }
}

export default async function ProgramPage({
  params,
}: ProgramPageProps) {
  const {
    slug,
  } =
    await params

  if (!slug) {
    notFound()
  }

  let program:
    Program |
    null |
    undefined

  try {
    program =
      await getProgram(
        slug,
      )
  }
  catch {
    /*
     * Keep undefined so the client can retry if the
     * public API is temporarily unavailable.
     */
    program =
      undefined
  }

  if (
    program ===
    null
  ) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <ProgramDetailExperience
        slug={slug}
        initialProgram={
          program
        }
      />

      <Footer />
    </div>
  )
}