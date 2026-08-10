import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main
        id="main-content"
        className="px-4 py-20 sm:py-28"
      >
        <div className="container-isr mx-auto max-w-4xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-isr-turquoise">
              404
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-isr-dark-red sm:text-5xl">
              We couldn&apos;t find that page
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-gray-700">
              The page may have moved, the link may be
              outdated, or the address may have been
              entered incorrectly.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="isr-button-primary"
              >
                Go to homepage
              </Link>

              <Link
                href="/start"
                className="isr-button-secondary"
              >
                Start Here
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-3">
            <Link
              href="/pray"
              className="isr-card isr-card-interactive p-5 text-center"
            >
              <p className="font-bold text-isr-dark-red">
                Pray at RMIT
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Prayer rooms and Jumu&apos;ah
              </p>
            </Link>

            <Link
              href="/events"
              className="isr-card isr-card-interactive p-5 text-center"
            >
              <p className="font-bold text-isr-dark-red">
                Events
              </p>

              <p className="mt-2 text-sm text-gray-600">
                See what&apos;s happening
              </p>
            </Link>

            <Link
              href="/contact"
              className="isr-card isr-card-interactive p-5 text-center"
            >
              <p className="font-bold text-isr-dark-red">
                Contact ISR
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Get in touch
              </p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
