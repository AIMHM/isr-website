import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const RECOVERY_LINKS = [
  {
    href: '/find',
    title: 'Search ISR',
    description:
      'Search pages, prayer spaces, events, programs and current updates.',
  },
  {
    href: '/pray',
    title: 'Pray at RMIT',
    description:
      'Find prayer spaces, Jumu’ah arrangements and today’s prayer information.',
  },
  {
    href: '/events',
    title: 'What’s On',
    description:
      'See one-off events, halaqas, workshops and recurring ISR programs.',
  },
  {
    href: '/student-guide',
    title: 'New Students',
    description:
      'Start with the Muslim student essentials if you are new to RMIT.',
  },
]

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main id="main-content">
        <section className="bg-isr-cream px-4 py-16 sm:py-24">
          <div className="container-isr mx-auto max-w-4xl">
            <p className="isr-eyebrow text-isr-turquoise">
              404 · Page not found
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-isr-dark-red sm:text-5xl">
              That page isn’t here anymore.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-700">
              The address may be old, mistyped or moved. Choose the closest destination below instead of starting over.
            </p>

            <div className="mt-10 divide-y divide-isr-light-blue/20 border-y border-isr-light-blue/20">
              {RECOVERY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex min-h-24 items-center justify-between gap-5 py-5 transition hover:bg-white/55 sm:px-3"
                >
                  <div>
                    <h2 className="font-bold text-isr-dark-red group-hover:text-isr-turquoise">
                      {link.title}
                    </h2>

                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {link.description}
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

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="isr-button-primary">
                Return home
              </Link>

              <Link href="/contact" className="isr-button-secondary">
                Contact ISR
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
