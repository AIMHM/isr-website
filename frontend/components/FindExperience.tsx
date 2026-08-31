'use client'

import Link from 'next/link'
import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  fetchEvents,
  formatEventDate,
  type Event,
} from '@/lib/events'
import {
  fetchAnnouncements,
  type Announcement,
} from '@/lib/announcements'
import {
  fetchPrograms,
  formatProgramSchedule,
  type Program,
} from '@/lib/programs'
import {
  PRAYER_SPACES,
} from '@/lib/siteContent'

type SearchCategory =
  | 'Page'
  | 'Prayer'
  | 'Event'
  | 'Program'
  | 'ISR Update'

type SearchItem = {
  id: string
  title: string
  description: string
  href: string
  category: SearchCategory
}

const STATIC_ITEMS: SearchItem[] = [
  {
    id: 'start',
    title: 'Student Guide',
    description:
      'New to RMIT or ISR? Start with the Muslim student essentials.',
    href: '/student-guide',
    category: 'Page',
  },
  {
    id: 'pray',
    title: 'Pray at RMIT',
    description:
      'Prayer spaces, Jumu’ah and daily prayer times.',
    href: '/pray',
    category: 'Page',
  },
  {
    id: 'jumuah',
    title: 'Jumu’ah at RMIT',
    description:
      'Current Friday prayer locations and times.',
    href: '/pray#jumuah',
    category: 'Prayer',
  },
  {
    id: 'events',
    title: 'What’s On at ISR',
    description:
      'This week, one-off events, weekly programs and past events.',
    href: '/events',
    category: 'Page',
  },
  {
    id: 'programs',
    title: 'Weekly ISR Programs',
    description:
      'Regular halaqas, workshops and recurring campus activities.',
    href: '/events#programs',
    category: 'Page',
  },
  {
    id: 'updates',
    title: 'ISR Updates',
    description:
      'Operational notices and time-sensitive ISR information.',
    href: '/updates',
    category: 'Page',
  },
  {
    id: 'support',
    title: 'Student Support',
    description:
      'Support pathways for Muslim students at RMIT.',
    href: '/support',
    category: 'Page',
  },
  {
    id: 'join',
    title: 'Join ISR',
    description:
      'Free membership, community, volunteering and team pathways.',
    href: '/join',
    category: 'Page',
  },
  {
    id: 'contact',
    title: 'Contact ISR',
    description:
      'Official Islamic Society of RMIT contact channels.',
    href: '/contact',
    category: 'Page',
  },
  {
    id: 'faq',
    title: 'ISR FAQ',
    description:
      'Quick answers about prayer, Jumu’ah, membership, events, community, volunteering and support.',
    href: '/faq',
    category: 'Page',
  },
  {
    id: 'about',
    title: 'About ISR',
    description:
      'Who ISR is, what it does and why it exists.',
    href: '/about',
    category: 'Page',
  },
  {
    id: 'campuses',
    title: 'Campus Guide',
    description:
      'Muslim student information across RMIT campuses.',
    href: '/campuses',
    category: 'Page',
  },
  {
    id: 'teams',
    title: 'ISR Teams',
    description:
      'Explore the student teams that help bring ISR to life.',
    href: '/teams',
    category: 'Page',
  },
  {
    id: 'links',
    title: 'ISR Links',
    description:
      'Membership, community, volunteering, social channels and useful ISR links.',
    href: '/links',
    category: 'Page',
  },
]

const CATEGORY_ORDER: SearchCategory[] = [
  'Page',
  'Prayer',
  'Program',
  'Event',
  'ISR Update',
]

const QUICK_SEARCHES = [
  'Jumu’ah',
  'City prayer',
  'Bundoora',
  'Sisters',
  'Membership',
  'Volunteer',
] as const

const STARTING_POINTS = [
  {
    title: 'Find a prayer space',
    description:
      'City, Bundoora and Brunswick prayer locations.',
    href: '/campuses',
  },
  {
    title: 'Find Jumu’ah',
    description:
      'Friday prayer times and campus arrangements.',
    href: '/pray#jumuah',
  },
  {
    title: 'See what’s on',
    description:
      'Events, halaqas, workshops and weekly programs.',
    href: '/events',
  },
  {
    title: 'New to RMIT',
    description:
      'The Muslim student essentials for getting started.',
    href: '/student-guide',
  },
  {
    title: 'Join ISR',
    description:
      'Membership, community, volunteering and team pathways.',
    href: '/join',
  },
  {
    title: 'Get student support',
    description:
      'Find the right pathway for a Muslim student concern.',
    href: '/support',
  },
] as const

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/jumu'?ah|jummah/g, 'jumuah')
}

export default function FindExperience() {
  const [query, setQuery] = useState('')
  const [events, setEvents] = useState<Event[]>([])
  const [programs, setPrograms] = useState<Program[]>([])
  const [updates, setUpdates] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const requestedQuery = new URLSearchParams(
      window.location.search,
    ).get('q')

    if (requestedQuery) {
      setQuery(requestedQuery)
    }
  }, [])

  useEffect(() => {
    let active = true

    Promise.allSettled([
      fetchEvents(),
      fetchPrograms(),
      fetchAnnouncements(),
    ])
      .then((results) => {
        if (!active) return

        const [eventResult, programResult, updateResult] = results

        if (eventResult.status === 'fulfilled') {
          setEvents(eventResult.value)
        }

        if (programResult.status === 'fulfilled') {
          setPrograms(programResult.value)
        }

        if (updateResult.status === 'fulfilled') {
          setUpdates(updateResult.value)
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const items = useMemo(() => {
    const prayerItems: SearchItem[] = PRAYER_SPACES.map(
      (space) => ({
        id: 'prayer-' + space.id,
        title: space.name,
        description: [
          space.building,
          space.room,
          space.summary,
        ]
          .filter(Boolean)
          .join(' · '),
        href: '/pray#' + space.id,
        category: 'Prayer',
      }),
    )

    const programItems: SearchItem[] = programs.map(
      (program) => ({
        id: 'program-' + program.id,
        title: program.name,
        description: [
          formatProgramSchedule(program),
          program.campusLabel,
          program.venue,
          program.audience,
          program.localDemo ? 'Local demo' : null,
        ]
          .filter(Boolean)
          .join(' · '),
        href: '/programs/' + program.slug,
        category: 'Program',
      }),
    )

    const eventItems: SearchItem[] = events.map((event) => {
      const formatted = formatEventDate(event.date)

      return {
        id: 'event-' + event.id,
        title: event.name,
        description: [
          formatted.date,
          event.campus,
          event.venue,
        ]
          .filter(Boolean)
          .join(' · '),
        href: '/events/' + event.id,
        category: 'Event',
      }
    })

    const updateItems: SearchItem[] = updates.map((update) => ({
      id: 'update-' + update.id,
      title: update.title,
      description: update.body,
      href: '/updates#update-' + update.id,
      category: 'ISR Update',
    }))

    return [
      ...STATIC_ITEMS,
      ...prayerItems,
      ...programItems,
      ...eventItems,
      ...updateItems,
    ]
  }, [events, programs, updates])

  const normalizedQuery = normalize(query.trim())
  const hasQuery = Boolean(normalizedQuery)

  const results = useMemo(() => {
    if (!normalizedQuery) return []

    const terms = normalizedQuery.split(/\s+/).filter(Boolean)

    return items.filter((item) => {
      const haystack = normalize(
        [
          item.title,
          item.description,
          item.category,
        ].join(' '),
      )

      return terms.every((term) => haystack.includes(term))
    })
  }, [items, normalizedQuery])

  const grouped = useMemo(
    () =>
      CATEGORY_ORDER.map((category) => ({
        category,
        items: results.filter((item) => item.category === category),
      })).filter((group) => group.items.length > 0),
    [results],
  )

  return (
    <div>
      <section className="isr-find-panel">
        <label
          htmlFor="isr-site-search"
          className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise"
        >
          Search ISR
        </label>

        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            id="isr-site-search"
            type="search"
            autoComplete="off"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Jumu’ah, halaqa, Bundoora, membership, support..."
            className="min-h-14 w-full rounded-2xl border border-isr-light-blue/35 bg-white px-5 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-isr-turquoise focus:ring-4 focus:ring-isr-turquoise/10"
          />

          {hasQuery && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="isr-button-secondary shrink-0"
            >
              Clear search
            </button>
          )}
        </div>

        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
            Try a popular search
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {QUICK_SEARCHES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setQuery(item)}
                className="min-h-11 rounded-full border border-isr-light-blue/30 bg-white px-4 py-2 text-xs font-bold text-isr-dark-red transition hover:border-isr-turquoise hover:text-isr-turquoise"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
          <p aria-live="polite">
            {!hasQuery
              ? 'Type a word or choose a starting point below.'
              : loading
                ? 'Searching current ISR information…'
                : `${results.length} result${results.length === 1 ? '' : 's'}`}
          </p>

          <Link
            href="/contact"
            className="font-bold text-isr-turquoise hover:text-isr-dark-red"
          >
            Can’t find it? Contact ISR →
          </Link>
        </div>
      </section>

      {!hasQuery ? (
        <section className="mt-8" aria-labelledby="find-start-heading">
          <div className="max-w-2xl">
            <p className="isr-eyebrow text-isr-turquoise">
              Common destinations
            </p>

            <h2
              id="find-start-heading"
              className="mt-3 text-2xl font-bold text-isr-dark-red sm:text-3xl"
            >
              Or go straight to what you need
            </h2>
          </div>

          <div className="mt-6 divide-y divide-isr-light-blue/20 border-y border-isr-light-blue/20">
            {STARTING_POINTS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex min-h-20 items-center justify-between gap-5 py-5 transition hover:bg-isr-cream/35 sm:px-3"
              >
                <div className="min-w-0">
                  <h3 className="font-bold text-isr-dark-red">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="shrink-0 font-bold text-isr-turquoise transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : results.length === 0 && !loading ? (
        <section className="mt-8 border-y border-isr-light-blue/20 py-10 text-center sm:py-12">
          <h2 className="text-2xl font-bold text-isr-dark-red">
            Nothing matched “{query.trim()}”
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-gray-600">
            Try a shorter term, a campus name, Jumu’ah, prayer, event, membership or support.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setQuery('')}
              className="isr-button-secondary"
            >
              Start again
            </button>

            <Link
              href="/contact"
              className="isr-button-primary"
            >
              Contact ISR
            </Link>
          </div>
        </section>
      ) : (
        <div className="mt-8 space-y-10">
          {grouped.map((group) => {
            const headingId =
              'search-category-' +
              group.category.toLowerCase().replace(/\s+/g, '-')

            return (
              <section key={group.category} aria-labelledby={headingId}>
                <div className="flex items-center justify-between gap-4 border-b border-isr-light-blue/20 pb-3">
                  <h2
                    id={headingId}
                    className="text-xl font-bold text-isr-dark-red"
                  >
                    {group.category}
                  </h2>

                  <span className="text-sm font-semibold text-gray-500">
                    {group.items.length}
                  </span>
                </div>

                <div className="divide-y divide-isr-light-blue/20">
                  {group.items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="group flex min-h-20 items-center justify-between gap-5 py-5 transition hover:bg-isr-cream/35 sm:px-3"
                    >
                      <div className="min-w-0">
                        <h3 className="font-bold text-isr-dark-red group-hover:text-isr-turquoise">
                          {item.title}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-600">
                          {item.description}
                        </p>
                      </div>

                      <span
                        aria-hidden="true"
                        className="shrink-0 font-bold text-isr-turquoise transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
