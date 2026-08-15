'use client'

import type {
  ProgramException,
} from '@/lib/programs'

const EMPTY_EXCEPTION: ProgramException = {
  date: '',
  status: 'cancelled',
  startTime: '',
  endTime: '',
  venue: '',
  note: '',
}

export default function ProgramExceptionsEditor({
  exceptions,
  onChange,
}: {
  exceptions: ProgramException[]
  onChange: (value: ProgramException[]) => void
}) {
  function addException() {
    onChange([
      ...exceptions,
      {
        ...EMPTY_EXCEPTION,
      },
    ])
  }

  function updateException(
    index: number,
    patch: Partial<ProgramException>,
  ) {
    onChange(
      exceptions.map(
        (item, itemIndex) =>
          itemIndex === index
            ? {
                ...item,
                ...patch,
              }
            : item,
      ),
    )
  }

  function removeException(
    index: number,
  ) {
    onChange(
      exceptions.filter(
        (_, itemIndex) =>
          itemIndex !== index,
      ),
    )
  }

  return (
    <section className="mt-8 rounded-3xl border border-isr-light-blue/25 bg-isr-cream/35 p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
            Session exceptions
          </p>

          <h3 className="mt-2 text-xl font-bold text-isr-dark-red">
            Cancel or change individual sessions
          </h3>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
            Use an exception when one occurrence of a recurring
            program is cancelled, moved or has a different time
            or venue. The normal weekly schedule remains unchanged.
          </p>
        </div>

        <button
          type="button"
          onClick={addException}
          className="isr-button-secondary text-sm"
        >
          Add session exception
        </button>
      </div>

      {exceptions.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-isr-light-blue/30 bg-white p-5 text-sm text-gray-600">
          No session exceptions added.
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {exceptions.map(
            (exception, index) => (
              <article
                key={`${exception.date}-${index}`}
                className="rounded-2xl border border-isr-light-blue/20 bg-white p-5"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <label>
                    <span className="text-sm font-bold text-isr-dark-red">
                      Session date
                    </span>

                    <input
                      type="date"
                      value={exception.date}
                      onChange={(event) =>
                        updateException(
                          index,
                          {
                            date:
                              event.target.value,
                          },
                        )
                      }
                      className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
                      required
                    />
                  </label>

                  <label>
                    <span className="text-sm font-bold text-isr-dark-red">
                      Change type
                    </span>

                    <select
                      value={exception.status}
                      onChange={(event) =>
                        updateException(
                          index,
                          {
                            status:
                              event.target.value as ProgramException['status'],
                          },
                        )
                      }
                      className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
                    >
                      <option value="cancelled">
                        Cancel this session
                      </option>

                      <option value="changed">
                        Change this session
                      </option>
                    </select>
                  </label>

                  {exception.status ===
                    'changed' && (
                    <>
                      <label>
                        <span className="text-sm font-bold text-isr-dark-red">
                          Different start time
                        </span>

                        <input
                          type="time"
                          value={
                            exception.startTime ??
                            ''
                          }
                          onChange={(event) =>
                            updateException(
                              index,
                              {
                                startTime:
                                  event.target.value,
                              },
                            )
                          }
                          className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
                        />
                      </label>

                      <label>
                        <span className="text-sm font-bold text-isr-dark-red">
                          Different end time
                        </span>

                        <input
                          type="time"
                          value={
                            exception.endTime ??
                            ''
                          }
                          onChange={(event) =>
                            updateException(
                              index,
                              {
                                endTime:
                                  event.target.value,
                              },
                            )
                          }
                          className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
                        />
                      </label>

                      <label className="md:col-span-2">
                        <span className="text-sm font-bold text-isr-dark-red">
                          Different venue
                        </span>

                        <input
                          value={
                            exception.venue ??
                            ''
                          }
                          onChange={(event) =>
                            updateException(
                              index,
                              {
                                venue:
                                  event.target.value,
                              },
                            )
                          }
                          placeholder="Leave blank to keep normal venue"
                          className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/30 px-4"
                        />
                      </label>
                    </>
                  )}

                  <label className="md:col-span-2">
                    <span className="text-sm font-bold text-isr-dark-red">
                      Public note
                    </span>

                    <textarea
                      value={
                        exception.note ??
                        ''
                      }
                      onChange={(event) =>
                        updateException(
                          index,
                          {
                            note:
                              event.target.value,
                          },
                        )
                      }
                      placeholder={
                        exception.status ===
                        'cancelled'
                          ? 'Example: This week’s session is cancelled.'
                          : 'Example: This session has moved to Building 80.'
                      }
                      className="mt-2 min-h-24 w-full rounded-xl border border-isr-light-blue/30 p-4"
                    />
                  </label>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      removeException(
                        index,
                      )
                    }
                    className="text-sm font-bold text-red-700 hover:text-red-900"
                  >
                    Remove exception
                  </button>
                </div>
              </article>
            ),
          )}
        </div>
      )}
    </section>
  )
}
