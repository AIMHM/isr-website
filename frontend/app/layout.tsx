import SiteTour from '@/components/SiteTour'
import PublicStructuredData from '@/components/PublicStructuredData'
import type { Metadata, Viewport } from 'next'
import './globals.css'

import './d2-polish.css'
import './d3-experience.css'
import './experience-refinement.css'
import { Geist } from 'next/font/google'
import { cn } from '@/lib/utils'
import LocalDemoBanner from '@/components/LocalDemoBanner'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const publicDeployment =
  siteUrl.startsWith('https://theisr.com.au')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'Islamic Society of RMIT',
    template: '%s | Islamic Society of RMIT',
  },

  description:
    'The home of Muslim students at RMIT. Prayer, events, community, support and opportunities to get involved.',

  applicationName: 'Islamic Society of RMIT',

  manifest:
    '/manifest.webmanifest',

  appleWebApp: {
    capable:
      true,

    title:
      'ISR',

    statusBarStyle:
      'default',
  },

  icons: {
    icon: '/images/isr_logo_dark.JPG',
  },

  openGraph: {
    type: 'website',
    siteName: 'Islamic Society of RMIT',
    title: 'Islamic Society of RMIT',
    description:
      'The home of Muslim students at RMIT.',
    url: '/',
  },

  twitter: {
    card: 'summary',
    title: 'Islamic Society of RMIT',
    description:
      'The home of Muslim students at RMIT.',
  },

  robots: {
    index: publicDeployment,
    follow: publicDeployment,
  },
}

export const viewport: Viewport = {
  width:
    'device-width',

  initialScale:
    1,

  themeColor:
    '#5B0B05',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn('font-sans', geist.variable)}>
      <body className="bg-white text-gray-900">
        <PublicStructuredData />
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-isr-dark-red px-4 py-2 font-semibold text-white shadow-lg transition focus:translate-y-0"
        >
          Skip to main content
        </a>

        <LocalDemoBanner />

        <div
          id="isr-page-content"
          tabIndex={-1}
        >
          {children}
        </div>

        <SiteTour />
      </body>
    </html>
  )
}
