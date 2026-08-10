'use client'

import {
  useState,
} from 'react'
import {
  PRAYER_SPACES,
} from '@/lib/siteContent'

function fallbackCopy(
  value: string,
) {
  const textarea =
    document.createElement(
      'textarea',
    )

  textarea.value =
    value

  textarea.style.position =
    'fixed'

  textarea.style.opacity =
    '0'

  textarea.setAttribute(
    'readonly',
    '',
  )

  document.body.appendChild(
    textarea,
  )

  textarea.select()

  const copied =
    document.execCommand(
      'copy',
    )

  textarea.remove()

  return copied
}

export default function PrayerQuickNav() {
  const [
    copied,
    setCopied,
  ] =
    useState(false)

  const links = [
    {
      id:
        'jumuah',

      label:
        'Jumu’ah',
    },

    ...PRAYER_SPACES.map(
      (
        space,
      ) => ({
        id:
          space.id,

        label:
          space.name,
      }),
    ),

    {
      id:
        'daily-prayer-times',

      label:
        'Daily timetable',
    },
  ]

  async function copyPage() {
    const url =
      window.location.href

    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(
          url,
        )
      }
      else if (
        !fallbackCopy(
          url,
        )
      ) {
        throw new Error(
          'Copy failed',
        )
      }

      setCopied(
        true,
      )

      window.setTimeout(
        () => {
          setCopied(
            false,
          )
        },
        2200,
      )
    }
    catch {
      setCopied(
        false,
      )
    }
  }

  return (
    <div className="isr-prayer-quick-nav">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
            Quick navigation
          </p>

          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            Jump directly to Jumu’ah, a campus
            prayer space or the daily timetable.
          </p>
        </div>

        <button
          type="button"
          onClick={
            copyPage
          }
          className="shrink-0 text-sm font-bold text-isr-turquoise transition hover:text-isr-dark-red"
        >
          {copied
            ? 'Prayer page link copied'
            : 'Copy prayer page link'}
        </button>
      </div>

      <nav
        aria-label="Prayer page quick navigation"
        className="isr-prayer-quick-nav-scroll mt-4"
      >
        {links.map(
          (
            link,
          ) => (
            <a
              key={
                link.id
              }
              href={`#${link.id}`}
              className="isr-prayer-quick-nav-pill"
            >
              {link.label}
            </a>
          ),
        )}
      </nav>
    </div>
  )
}
