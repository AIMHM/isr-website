'use client'

import Link from 'next/link'

const CHECKS = [
  {
    title:
      'Events',

    description:
      'Check dates, status, campus, venue, registration and public preview.',

    admin:
      '/admin/events',

    public:
      '/events',
  },
  {
    title:
      'ISR Updates',

    description:
      'Check priority, expiry, pinned status, action links and public preview.',

    admin:
      '/admin/announcements',

    public:
      '/updates',
  },
  {
    title:
      'Prayer information',

    description:
      'Review the student-facing prayer and campus information before publication.',

    admin:
      '/pray',

    public:
      '/pray',
  },
]

export default function AdminContentQaPanel() {
  return (
    <section
      aria-labelledby="admin-content-qa-heading"
      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
        Content QA
      </p>

      <h2
        id="admin-content-qa-heading"
        className="isr-admin-content-heading mt-3 text-2xl font-bold text-isr-dark-red"
      >
        Review before publishing
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
        Use the admin view and the public preview
        together. Confirm operational details rather
        than relying on old event or prayer information.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {CHECKS.map(
          (
            item,
          ) => (
            <article
              key={
                item.title
              }
              className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
            >
              <h3 className="font-bold text-isr-dark-red">
                {
                  item.title
                }
              </h3>

              <p className="mt-2 min-h-16 text-sm leading-relaxed text-gray-600">
                {
                  item.description
                }
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href={
                    item.admin
                  }
                  className="rounded-full bg-isr-dark-red px-4 py-2 text-xs font-bold text-white"
                >
                  Manage
                </Link>

                <Link
                  href={
                    item.public
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-isr-dark-red"
                >
                  Public preview
                </Link>
              </div>
            </article>
          ),
        )}
      </div>
    </section>
  )
}
