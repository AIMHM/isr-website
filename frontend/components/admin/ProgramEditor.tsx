'use client'

import {
  useEffect,
  useState,
} from 'react'
import {
  createProgram,
  updateProgram,
} from '@/lib/admin-api'
import {
  getToken,
} from '@/lib/auth'
import type {
  Program,
  ProgramAudience,
  ProgramCategory,
  ProgramRegistrationMode,
  ProgramException,
} from '@/lib/programs'
import type {
  CampusId,
} from '@/lib/contentTypes'
import ProgramExceptionsEditor from '@/components/admin/ProgramExceptionsEditor'

type FormState = {
  name: string
  slug: string
  summary: string
  description: string
  category: ProgramCategory

  campusId: CampusId
  campusLabel: string
  venue: string

  audience: ProgramAudience

  weekday: number
  startTime: string
  endTime: string
  intervalWeeks: 1 | 2

  activeFrom: string
  activeUntil: string

  registrationMode:
    ProgramRegistrationMode

  registrationUrl: string
  price: string

  status:
    Program['status']

  publicationStatus:
    Program['publicationStatus']

  contentOwner: string
}

const EMPTY: FormState = {
  name: '',
  slug: '',
  summary: '',
  description: '',

  category:
    'Islamic Learning',

  campusId:
    'city',

  campusLabel:
    'City',

  venue: '',

  audience:
    'Everyone',

  weekday:
    4,

  startTime:
    '18:00',

  endTime:
    '19:00',

  intervalWeeks:
    1,

  activeFrom: '',
  activeUntil: '',

  registrationMode:
    'none',

  registrationUrl: '',
  price:
    'Free',

  status:
    'active',

  publicationStatus:
    'draft',

  contentOwner: '',
}

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

export default function ProgramEditor({
  program,
  onSaved,
  onCancel,
}: {
  program?: Program | null
  onSaved:
    (program: Program) =>
      void
  onCancel:
    () => void
}) {
  const [
    form,
    setForm,
  ] =
    useState<FormState>(
      EMPTY,
    )

  const [
    exceptions,
    setExceptions,
  ] = useState<ProgramException[]>([])

  const [
    saving,
    setSaving,
  ] = useState(false)

  const [
    error,
    setError,
  ] =
    useState('')

  useEffect(() => {
    if (!program) {
      setForm(
        EMPTY,
      )

      setExceptions([])

      return
    }

    setForm({
      name:
        program.name,

      slug:
        program.slug,

      summary:
        program.summary,

      description:
        program.description,

      category:
        program.category,

      campusId:
        program.campusId,

      campusLabel:
        program.campusLabel,

      venue:
        program.venue,

      audience:
        program.audience,

      weekday:
        program.weekday,

      startTime:
        program.startTime,

      endTime:
        program.endTime,

      intervalWeeks:
        program.intervalWeeks,

      activeFrom:
        program.activeFrom,

      activeUntil:
        program.activeUntil,

      registrationMode:
        program.registrationMode,

      registrationUrl:
        program.registrationUrl ??
        '',

      price:
        program.price ??
        '',

      status:
        program.status,

      publicationStatus:
        program.publicationStatus,

      contentOwner:
        program.contentOwner ??
        '',
    })

    setExceptions(
      program.exceptions ?? [],
    )
  }, [
    program,
  ])

  function set<
    Key extends keyof FormState
  >(
    key: Key,
    value: FormState[Key],
  ) {
    setForm(
      (
        current,
      ) => ({
        ...current,
        [key]:
          value,
      }),
    )
  }

  async function submit(
    event:
      React.FormEvent,
  ) {
    event.preventDefault()

    setSaving(true)
    setError('')

    try {
      const token =
        getToken()

      if (!token) {
        throw new Error(
          'Admin session missing',
        )
      }

      if (
        !form.name ||
        !form.summary ||
        !form.description ||
        !form.venue ||
        !form.activeFrom ||
        !form.activeUntil
      ) {
        throw new Error(
          'Complete all required fields',
        )
      }

      const payload:
        Omit<
          Program,
          'id'
        > = {
        slug:
          form.slug ||
          makeSlug(
            form.name,
          ),

        name:
          form.name,

        summary:
          form.summary,

        description:
          form.description,

        category:
          form.category,

        campusId:
          form.campusId,

        campusLabel:
          form.campusLabel,

        venue:
          form.venue,

        audience:
          form.audience,

        weekday:
          form.weekday,

        startTime:
          form.startTime,

        endTime:
          form.endTime,

        intervalWeeks:
          form.intervalWeeks,

        activeFrom:
          form.activeFrom,

        activeUntil:
          form.activeUntil,

        registrationMode:
          form.registrationMode,

        registrationUrl:
          form.registrationUrl ||
          null,

        price:
          form.price ||
          null,

        status:
          form.status,

        publicationStatus:
          form.publicationStatus,

        imageUrl:
          null,

        contentOwner:
          form.contentOwner ||
          null,

        lastReviewedAt:
          null,

        reviewDueAt:
          null,

        exceptions,
      }

      const saved =
        program
          ? await updateProgram(
              token,
              program.id,
              payload,
            )
          : await createProgram(
              token,
              payload,
            )

      onSaved(
        saved,
      )
    }
    catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'Failed to save program',
      )
    }
    finally {
      setSaving(
        false,
      )
    }
  }

  return (
    <form
      onSubmit={
        submit
      }
      className="rounded-3xl border border-isr-light-blue/25 bg-white p-5 shadow-sm sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
            {program
              ? 'Edit program'
              : 'New program'}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-isr-dark-red">
            {program
              ? program.name
              : 'Create recurring program'}
          </h2>
        </div>

        <button
          type="button"
          onClick={
            onCancel
          }
          className="isr-button-secondary text-sm"
        >
          Cancel
        </button>
      </div>

      {error && (
        <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-800">
          {error}
        </p>
      )}

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <label className="md:col-span-2">
          <span className="text-sm font-bold text-isr-dark-red">
            Program name
          </span>

          <input
            value={
              form.name
            }
            onChange={(
              event,
            ) =>
              set(
                'name',
                event.target.value,
              )
            }
            className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
            required
          />
        </label>

        <label className="md:col-span-2">
          <span className="text-sm font-bold text-isr-dark-red">
            Short summary
          </span>

          <input
            value={
              form.summary
            }
            onChange={(
              event,
            ) =>
              set(
                'summary',
                event.target.value,
              )
            }
            className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
            required
          />
        </label>

        <label className="md:col-span-2">
          <span className="text-sm font-bold text-isr-dark-red">
            Description
          </span>

          <textarea
            value={
              form.description
            }
            onChange={(
              event,
            ) =>
              set(
                'description',
                event.target.value,
              )
            }
            className="mt-2 min-h-36 w-full rounded-xl border border-isr-light-blue/30 p-4"
            required
          />
        </label>

        <label>
          <span className="text-sm font-bold text-isr-dark-red">
            Category
          </span>

          <select
            value={
              form.category
            }
            onChange={(
              event,
            ) =>
              set(
                'category',
                event.target.value as ProgramCategory,
              )
            }
            className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
          >
            {[
              'Islamic Learning',
              'Community',
              'Workshop',
              'Social',
              'Sports',
              'Professional',
              'Charity',
              'Other',
            ].map(
              (
                item,
              ) => (
                <option
                  key={
                    item
                  }
                  value={
                    item
                  }
                >
                  {item}
                </option>
              ),
            )}
          </select>
        </label>

        <label>
          <span className="text-sm font-bold text-isr-dark-red">
            Audience
          </span>

          <select
            value={
              form.audience
            }
            onChange={(
              event,
            ) =>
              set(
                'audience',
                event.target.value as ProgramAudience,
              )
            }
            className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
          >
            <option>
              Everyone
            </option>

            <option>
              Brothers
            </option>

            <option>
              Sisters
            </option>
          </select>
        </label>

        <label>
          <span className="text-sm font-bold text-isr-dark-red">
            Campus
          </span>

          <select
            value={
              form.campusId
            }
            onChange={(
              event,
            ) => {
              const value =
                event.target.value as CampusId

              set(
                'campusId',
                value,
              )

              set(
                'campusLabel',
                value === 'city'
                  ? 'City'
                  : value === 'bundoora'
                    ? 'Bundoora'
                    : 'Brunswick',
              )
            }}
            className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
          >
            <option value="city">
              City
            </option>

            <option value="bundoora">
              Bundoora
            </option>

            <option value="brunswick">
              Brunswick
            </option>
          </select>
        </label>

        <label>
          <span className="text-sm font-bold text-isr-dark-red">
            Venue
          </span>

          <input
            value={
              form.venue
            }
            onChange={(
              event,
            ) =>
              set(
                'venue',
                event.target.value,
              )
            }
            className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
            required
          />
        </label>

        <label>
          <span className="text-sm font-bold text-isr-dark-red">
            Day
          </span>

          <select
            value={
              form.weekday
            }
            onChange={(
              event,
            ) =>
              set(
                'weekday',
                Number(
                  event.target.value,
                ),
              )
            }
            className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
          >
            {[
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ].map(
              (
                label,
                index,
              ) => (
                <option
                  key={
                    label
                  }
                  value={
                    index
                  }
                >
                  {label}
                </option>
              ),
            )}
          </select>
        </label>

        <label>
          <span className="text-sm font-bold text-isr-dark-red">
            Repeats
          </span>

          <select
            value={
              form.intervalWeeks
            }
            onChange={(
              event,
            ) =>
              set(
                'intervalWeeks',
                Number(
                  event.target.value,
                ) as 1 | 2,
              )
            }
            className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
          >
            <option value="1">
              Every week
            </option>

            <option value="2">
              Every 2 weeks
            </option>
          </select>
        </label>

        <label>
          <span className="text-sm font-bold text-isr-dark-red">
            Start time
          </span>

          <input
            type="time"
            value={
              form.startTime
            }
            onChange={(
              event,
            ) =>
              set(
                'startTime',
                event.target.value,
              )
            }
            className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
          />
        </label>

        <label>
          <span className="text-sm font-bold text-isr-dark-red">
            End time
          </span>

          <input
            type="time"
            value={
              form.endTime
            }
            onChange={(
              event,
            ) =>
              set(
                'endTime',
                event.target.value,
              )
            }
            className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
          />
        </label>

        <label>
          <span className="text-sm font-bold text-isr-dark-red">
            Active from
          </span>

          <input
            type="date"
            value={
              form.activeFrom
            }
            onChange={(
              event,
            ) =>
              set(
                'activeFrom',
                event.target.value,
              )
            }
            className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
            required
          />
        </label>

        <label>
          <span className="text-sm font-bold text-isr-dark-red">
            Active until
          </span>

          <input
            type="date"
            value={
              form.activeUntil
            }
            onChange={(
              event,
            ) =>
              set(
                'activeUntil',
                event.target.value,
              )
            }
            className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
            required
          />
        </label>

        <label>
          <span className="text-sm font-bold text-isr-dark-red">
            Registration
          </span>

          <select
            value={
              form.registrationMode
            }
            onChange={(
              event,
            ) =>
              set(
                'registrationMode',
                event.target.value as ProgramRegistrationMode,
              )
            }
            className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
          >
            <option value="none">
              No registration required
            </option>

            <option value="optional">
              Registration optional
            </option>

            <option value="required">
              Registration required
            </option>
          </select>
        </label>

        <label>
          <span className="text-sm font-bold text-isr-dark-red">
            Price
          </span>

          <input
            value={
              form.price
            }
            onChange={(
              event,
            ) =>
              set(
                'price',
                event.target.value,
              )
            }
            placeholder="Free"
            className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
          />
        </label>

        {form.registrationMode !==
          'none' && (
          <label className="md:col-span-2">
            <span className="text-sm font-bold text-isr-dark-red">
              Registration URL
            </span>

            <input
              type="url"
              value={
                form.registrationUrl
              }
              onChange={(
                event,
              ) =>
                set(
                  'registrationUrl',
                  event.target.value,
                )
              }
              className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
            />
          </label>
        )}

        <label>
          <span className="text-sm font-bold text-isr-dark-red">
            Program status
          </span>

          <select
            value={
              form.status
            }
            onChange={(
              event,
            ) =>
              set(
                'status',
                event.target.value as Program['status'],
              )
            }
            className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
          >
            <option value="active">
              Active
            </option>

            <option value="paused">
              Paused
            </option>

            <option value="ended">
              Ended
            </option>
          </select>
        </label>

        <label>
          <span className="text-sm font-bold text-isr-dark-red">
            Publication
          </span>

          <select
            value={
              form.publicationStatus
            }
            onChange={(
              event,
            ) =>
              set(
                'publicationStatus',
                event.target.value as Program['publicationStatus'],
              )
            }
            className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
          >
            <option value="draft">
              Draft
            </option>

            <option value="review">
              Review
            </option>

            <option value="published">
              Published
            </option>

            <option value="archived">
              Archived
            </option>
          </select>
        </label>

        <label className="md:col-span-2">
          <span className="text-sm font-bold text-isr-dark-red">
            Internal content owner
          </span>

          <input
            value={
              form.contentOwner
            }
            onChange={(
              event,
            ) =>
              set(
                'contentOwner',
                event.target.value,
              )
            }
            placeholder="e.g. Dawah Team / Events"
            className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
          />
        </label>
      </div>

      <ProgramExceptionsEditor
        exceptions={exceptions}
        onChange={setExceptions}
      />

      <div className="mt-7 flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={
            onCancel
          }
          className="isr-button-secondary"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            saving
          }
          className="isr-button-primary"
        >
          {saving
            ? 'Saving…'
            : program
              ? 'Save changes'
              : 'Create program'}
        </button>
      </div>
    </form>
  )
}
