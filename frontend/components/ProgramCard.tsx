import Link from 'next/link'
import {
  formatProgramSchedule,
  getProgramRegistrationLabel,
  type Program,
} from '@/lib/programs'

export default function ProgramCard({
  program,
}: {
  program: Program
}) {
  return (
    <article className="isr-card flex h-full flex-col p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-isr-turquoise/10 px-3 py-1.5 text-xs font-bold text-isr-turquoise">
          Weekly program
        </span>

        <span className="rounded-full bg-isr-cream px-3 py-1.5 text-xs font-bold text-isr-dark-red">
          {program.category}
        </span>

        {program.localDemo && (
          <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-900">
            Local demo
          </span>
        )}
      </div>

      <h3 className="mt-5 text-2xl font-bold leading-tight text-isr-dark-red">
        <Link
          href={
            '/programs/' +
            program.slug
          }
          className="transition hover:text-isr-turquoise"
        >
          {program.name}
        </Link>
      </h3>

      <p className="mt-3 font-semibold leading-relaxed text-isr-turquoise">
        {formatProgramSchedule(
          program,
        )}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-gray-600">
        <span className="rounded-full bg-isr-cream px-3 py-1.5">
          {program.campusLabel}
        </span>

        <span className="rounded-full bg-isr-cream px-3 py-1.5">
          {program.audience}
        </span>
      </div>

      <p className="mt-5 flex-1 text-sm leading-relaxed text-gray-700">
        {program.summary}
      </p>

      <div className="mt-5 rounded-2xl bg-isr-cream/70 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
          Attendance
        </p>

        <p className="mt-1 font-bold text-isr-dark-red">
          {getProgramRegistrationLabel(
            program,
          )}
        </p>

        {program.price && (
          <p className="mt-1 text-sm text-gray-600">
            {program.price}
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-isr-light-blue/20 pt-5">
        <span className="text-sm text-gray-600">
          {program.venue}
        </span>

        <Link
          href={
            '/programs/' +
            program.slug
          }
          className="font-bold text-isr-turquoise transition hover:text-isr-dark-red"
        >
          Program details →
        </Link>
      </div>
    </article>
  )
}
