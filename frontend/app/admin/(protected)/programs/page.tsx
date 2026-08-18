'use client'

import {
  useCallback,
  useEffect,
  useState,
} from 'react'
import ProgramEditor from '@/components/admin/ProgramEditor'
import {
  deleteProgram,
  fetchAllPrograms,
} from '@/lib/admin-api'
import {
  getToken,
} from '@/lib/auth'
import {
  formatProgramSchedule,
  getProgramRegistrationLabel,
  type Program,
} from '@/lib/programs'

export default function AdminProgramsPage() {
  const [
    programs,
    setPrograms,
  ] =
    useState<Program[]>([])

  const [
    loading,
    setLoading,
  ] =
    useState(true)

  const [
    editing,
    setEditing,
  ] =
    useState<Program | null>(
      null,
    )

  const [
    creating,
    setCreating,
  ] =
    useState(false)

  const [
    error,
    setError,
  ] =
    useState('')

  const load =
    useCallback(
      async () => {
        setLoading(true)
        setError('')

        try {
          const token =
            getToken()

          if (!token) {
            throw new Error(
              'Admin session missing',
            )
          }

          setPrograms(
            await fetchAllPrograms(
              token,
            ),
          )
        }
        catch (caught) {
          setError(
            caught instanceof Error
              ? caught.message
              : 'Failed to load programs',
          )
        }
        finally {
          setLoading(false)
        }
      },
      [],
    )

  useEffect(() => {
    void load()
  }, [
    load,
  ])

  async function remove(
    program: Program,
  ) {
    if (
      !window.confirm(
        'Delete "' +
        program.name +
        '" from the local program store?',
      )
    ) {
      return
    }

    try {
      const token =
        getToken()

      if (!token) {
        throw new Error(
          'Admin session missing',
        )
      }

      await deleteProgram(
        token,
        program.id,
      )

      await load()
    }
    catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'Failed to delete program',
      )
    }
  }

  if (
    creating ||
    editing
  ) {
    return (
      <ProgramEditor
        program={
          editing
        }
        onCancel={() => {
          setCreating(false)
          setEditing(null)
        }}
        onSaved={() => {
          setCreating(false)
          setEditing(null)

          void load()
        }}
      />
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
            What&apos;s On
          </p>

          <h1 className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl">
            Programs
          </h1>

          <p className="mt-4 leading-relaxed text-gray-600">
            Manage weekly and fortnightly halaqas,
            workshops and recurring ISR activities.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setCreating(
              true,
            )
          }
          className="isr-button-primary"
        >
          New program
        </button>
      </div>

      <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-relaxed text-amber-900">
        This admin is using the local sandbox store.
        The Prisma migration is being prepared in source,
        but no production database migration is being run.
      </div>

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-800">
          {error}
        </div>
      )}

      {loading ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[1, 2, 3, 4].map(
            (
              item,
            ) => (
              <div
                key={
                  item
                }
                className="h-60 animate-pulse rounded-3xl bg-white"
              />
            ),
          )}
        </div>
      ) : programs.length >
        0 ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {programs.map(
            (
              program,
            ) => (
              <article
                key={
                  program.id
                }
                className="rounded-3xl border border-isr-light-blue/20 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-isr-turquoise/10 px-3 py-1 text-xs font-bold text-isr-turquoise">
                    {program.status}
                  </span>

                  <span className="rounded-full bg-isr-cream px-3 py-1 text-xs font-bold text-isr-dark-red">
                    {program.publicationStatus}
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-bold text-isr-dark-red">
                  {program.name}
                </h2>

                <p className="mt-2 font-semibold text-isr-turquoise">
                  {formatProgramSchedule(
                    program,
                  )}
                </p>

                <p className="mt-3 text-sm text-gray-600">
                  {program.campusLabel}
                  {' Â· '}
                  {program.venue}
                </p>

                <p className="mt-3 text-sm font-semibold text-gray-700">
                  {getProgramRegistrationLabel(
                    program,
                  )}
                </p>

                <div className="mt-6 flex flex-wrap gap-3 border-t border-isr-light-blue/20 pt-5">
                  <button
                    type="button"
                    onClick={() =>
                      setEditing(
                        program,
                      )
                    }
                    className="isr-button-secondary text-sm"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      void remove(
                        program,
                      )
                    }
                    className="rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ),
          )}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-dashed border-isr-light-blue/35 bg-white p-10 text-center">
          <h2 className="text-2xl font-bold text-isr-dark-red">
            No programs yet
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-600">
            Create the first local recurring ISR program
            to test the full Programs workflow.
          </p>

          <button
            type="button"
            onClick={() =>
              setCreating(
                true,
              )
            }
            className="isr-button-primary mt-6"
          >
            Create program
          </button>
        </div>
      )}
    </div>
  )
}
