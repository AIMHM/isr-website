import type { Metadata } from 'next'
import './globals.css'
import { Geist } from 'next/font/google'
import { cn } from '@/lib/utils'
import LocalDemoBanner from '@/components/LocalDemoBanner'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://theisr.com.au',
  ),
  title: {
    default: 'Islamic Society of RMIT',
    template: '%s | Islamic Society of RMIT',
  },
  description:
    'Prayer, community, student support and opportunities for Muslim students at RMIT University.',
  applicationName: 'Islamic Society of RMIT',
  icons: {
    icon: '/images/isr_logo_dark.JPG',
  },
  openGraph: {
    type: 'website',
    siteName: 'Islamic Society of RMIT',
    title: 'Islamic Society of RMIT',
    description:
      'The home of Muslim students at RMIT. Prayer, community, student support and opportunities.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn('font-sans', geist.variable)}>
      <body className="bg-white text-gray-900">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-isr-dark-red px-4 py-2 font-semibold text-white transition focus:translate-y-0"
        >
          Skip to main content
        </a>

        <LocalDemoBanner />
        {children}
      </body>
    </html>
  )
}
