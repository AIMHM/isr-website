'use client'

import {
  useEffect,
  useState,
} from 'react'
import ProgramCard from '@/components/ProgramCard'
import {
  fetchPrograms,
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

  useEffect(() => {
    let active = true

    fetchPrograms()
      .then(
        (
          data,
        ) => {
          if (active) {
            setPrograms(
              data,
            )
          }
        },
      )
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <div>
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
          Website 2.0
        </p>

        <h1 className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl">
          Programs
        </h1>

        <p className="mt-4 leading-relaxed text-gray-600">
          Preview the recurring-program model for weekly
          halaqas, workshops and regular campus activities.
          Editing and database persistence arrive in Batch 2B.
        </p>
      </div>

      <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-relaxed text-amber-900">
        Current entries are local development examples only.
        They are intentionally prevented from appearing in production.
      </div>

      {loading ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map(
            (
              item,
            ) => (
              <div
                key={
                  item
                }
                className="h-72 animate-pulse rounded-3xl bg-white"
              />
            ),
          )}
        </div>
      ) : programs.length >
        0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {programs.map(
            (
              program,
            ) => (
              <ProgramCard
                key={
                  program.id
                }
                program={
                  program
                }
              />
            ),
          )}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl bg-white p-8 text-center">
          <h2 className="text-xl font-bold text-isr-dark-red">
            No local program preview data
          </h2>
        </div>
      )}
    </div>
  )
}
