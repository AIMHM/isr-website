'use client'

import {
  useEffect,
} from 'react'

export default function GlobalError({
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
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          background: '#ffffff',
          color: '#1f2937',
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <main
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            padding: '32px 20px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '680px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                margin: 0,
                color: '#39766D',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              Islamic Society of RMIT
            </p>

            <h1
              style={{
                margin: '16px 0 0',
                color: '#5B0B05',
                fontSize: 'clamp(2rem, 7vw, 3.5rem)',
                lineHeight: 1.08,
              }}
            >
              The website hit an unexpected problem
            </h1>

            <p
              style={{
                margin: '20px auto 0',
                maxWidth: '560px',
                fontSize: '18px',
                lineHeight: 1.65,
              }}
            >
              Try loading ISR again. If the problem continues,
              you can return home or contact ISR directly.
            </p>

            <div
              style={{
                marginTop: '28px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '12px',
              }}
            >
              <button
                type="button"
                onClick={reset}
                style={{
                  minHeight: '48px',
                  border: 0,
                  borderRadius: '999px',
                  background: '#39766D',
                  padding: '12px 24px',
                  color: '#ffffff',
                  font: 'inherit',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Try again
              </button>

              <a
                href="/"
                style={{
                  minHeight: '48px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                  border: '2px solid #5B0B05',
                  borderRadius: '999px',
                  padding: '10px 24px',
                  color: '#5B0B05',
                  fontWeight: 800,
                  textDecoration: 'none',
                }}
              >
                ISR homepage
              </a>

              <a
                href="mailto:isr@rmit.edu.au"
                style={{
                  minHeight: '48px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                  borderRadius: '999px',
                  padding: '12px 20px',
                  color: '#5B0B05',
                  fontWeight: 800,
                }}
              >
                Email ISR
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
