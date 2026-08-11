'use client'

import {
  useMemo,
  useState,
} from 'react'

export type EventDiscoveryFilter =
  'all' |
  'upcoming' |
  'past'

type Props = {
  onSearch?: (
    value: string,
  ) => void

  onFilter?: (
    value:
      EventDiscoveryFilter,
  ) => void
}

const FILTERS:
  {
    label: string
    value: EventDiscoveryFilter
  }[] =
[
  {
    label:
      'All',

    value:
      'all',
  },
  {
    label:
      'Upcoming',

    value:
      'upcoming',
  },
  {
    label:
      'Past',

    value:
      'past',
  },
]

export default function EventDiscoveryBar({
  onSearch,
  onFilter,
}: Props) {
  const [
    search,
    setSearch,
  ] =
    useState('')

  const [
    active,
    setActive,
  ] =
    useState<EventDiscoveryFilter>(
      'all',
    )

  const normalized =
    useMemo(
      () =>
        search.trim(),
      [
        search,
      ],
    )

  return (
    <section
      aria-label="Event discovery tools"
      className="isr-event-discovery"
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <label
            htmlFor="isr-event-search"
            className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise"
          >
            Search events
          </label>

          <input
            id="isr-event-search"
            type="search"
            value={
              search
            }
            onChange={
              (
                event,
              ) => {
                const value =
                  event.target.value

                setSearch(
                  value,
                )

                onSearch?.(
                  value,
                )
              }
            }
            placeholder="Search by event name, campus or venue"
            className="mt-2 min-h-12 w-full rounded-2xl border border-isr-light-blue/35 bg-white px-4 text-sm outline-none focus:border-isr-turquoise focus:ring-4 focus:ring-isr-turquoise/10"
          />

          {normalized && (
            <button
              type="button"
              onClick={() => {
                setSearch('')
                onSearch?.('')
              }}
              className="mt-2 text-xs font-bold text-isr-turquoise hover:text-isr-dark-red"
            >
              Clear search
            </button>
          )}
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
            Show
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {FILTERS.map(
              (
                filter,
              ) => (
                <button
                  key={
                    filter.value
                  }
                  type="button"
                  aria-pressed={
                    active ===
                    filter.value
                  }
                  onClick={() => {
                    setActive(
                      filter.value,
                    )

                    onFilter?.(
                      filter.value,
                    )
                  }}
                  className={
                    active ===
                    filter.value
                      ? 'isr-event-filter is-active'
                      : 'isr-event-filter'
                  }
                >
                  {
                    filter.label
                  }
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
