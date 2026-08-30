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
    <article className="group flex h-full flex-col border-t-4 border-isr-turquoise bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
          Weekly program
        </span>

        <span className="text-xs font-semibold text-gray-500">
          {program.category}
        </span>

        {program.localDemo && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
            Local demo
          </span>
        )}
      </div>

      <h3 className="mt-4 text-2xl font-bold leading-tight text-isr-dark-red">
        <Link
          href={'/programs/' + program.slug}
          className="transition hover:text-isr-turquoise"
        >
          {program.name}
        </Link>
      </h3>

      <p className="mt-3 text-base font-bold leading-relaxed text-isr-turquoise">
        {formatProgramSchedule(program)}
      </p>

      <p className="mt-2 text-sm font-medium text-gray-600">
        {[program.campusLabel, program.audience]
          .filter(Boolean)
          .join(' · ')}
      </p>

      <p className="mt-5 flex-1 text-sm leading-relaxed text-gray-700">
        {program.summary}
      </p>

      <div className="mt-5 border-y border-isr-light-blue/20 py-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
          Attendance
        </p>

        <p className="mt-1 font-bold text-isr-dark-red">
          {getProgramRegistrationLabel(program)}
        </p>

        {program.price && (
          <p className="mt-1 text-sm text-gray-600">
            {program.price}
          </p>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-3">
        <span className="max-w-[70%] text-sm leading-relaxed text-gray-600">
          {program.venue}
        </span>

        <Link
          href={'/programs/' + program.slug}
          className="inline-flex min-h-11 items-center font-bold text-isr-turquoise transition hover:text-isr-dark-red"
        >
          View program →
        </Link>
      </div>
    </article>
  )
}
