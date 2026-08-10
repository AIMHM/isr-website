'use client'

import {
  useEffect,
} from 'react'
import Link from 'next/link'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & {
    digest?: string
  }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main
      id="main-content"
      className="px-4 py-20 sm:py-28"
    >
      <div className="container-isr mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-isr-turquoise">
          Something went wrong
        </p>

        <h1 className="mt-4 text-4xl font-bold text-isr-dark-red sm:text-5xl">
          This page couldn&apos;t be loaded
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-gray-700">
          You can try loading it again. If the problem
          continues, return to the homepage or contact ISR.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="isr-button-primary"
          >
            Try again
          </button>

          <Link
            href="/"
            className="isr-button-secondary"
          >
            Homepage
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
  )
}
