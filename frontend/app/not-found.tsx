import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main
        id="main-content"
        className="flex min-h-[65vh] items-center px-4 py-16"
      >
        <div className="container-isr mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
            404
          </p>

          <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
            We could not find that page
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-gray-700">
            The page may have moved, expired or never existed. Use one of the
            links below to continue.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="isr-button-primary"
            >
              Return home
            </Link>

            <Link
              href="/events"
              className="isr-button-secondary"
            >
              View events
            </Link>

            <Link
              href="/contact"
              className="isr-button-secondary"
            >
              Contact ISR
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
