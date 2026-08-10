'use client'

import Link from 'next/link'
import {
  usePathname,
} from 'next/navigation'

const PUBLIC_LINKS = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/events',
    label: 'Events',
  },
  {
    href: '/updates',
    label: 'ISR Updates',
  },
  {
    href: '/pray',
    label: 'Pray at RMIT',
  },
  {
    href: '/start',
    label: 'Start Here',
  },
]

export default function AdminUtilityBar() {
  const pathname =
    usePathname()

  const localMode =
    process.env.NEXT_PUBLIC_LOCAL_ADMIN_MODE ===
    'true'

  return (
    <aside
      aria-label="Admin public preview shortcuts"
      className="isr-admin-utility-bar"
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
              Admin workspace
            </p>

            {localMode && (
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-900">
                Local sandbox
              </span>
            )}
          </div>

          <p className="mt-1 text-xs text-gray-500">
            Current admin route: {pathname}
          </p>
        </div>

        <nav
          aria-label="Preview public ISR pages"
          className="flex flex-wrap gap-2"
        >
          {PUBLIC_LINKS.map(
            (
              link,
            ) => (
              <Link
                key={
                  link.href
                }
                href={
                  link.href
                }
                target="_blank"
                rel="noopener noreferrer"
                className="isr-admin-preview-link"
              >
                {link.label}
                <span
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>
            ),
          )}
        </nav>
      </div>
    </aside>
  )
}
