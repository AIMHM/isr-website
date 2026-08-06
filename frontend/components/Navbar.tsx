'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [logoFailed, setLogoFailed] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/pray', label: 'Pray at RMIT' },
    { href: '/events', label: 'Events' },
    { href: '/announcements', label: 'Announcements' },
    { href: '/support', label: 'Student Support' },
    { href: '/about', label: 'About ISR' },
    { href: '/governance', label: 'Governance' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 px-4 pb-2 pt-4">
      <div className="relative h-14">
        <div className="absolute inset-x-0 top-0 overflow-hidden rounded-[1.75rem] border border-isr-light-blue/30 bg-isr-cream/70 shadow-lg backdrop-blur-md">
          <div className="relative z-10 flex h-14 items-center justify-between px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-3">
              {!logoFailed ? (
                <Image
                  src="/images/isr_logo_transparent.png"
                  alt="Islamic Society of RMIT logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-isr-turquoise">
                  <span className="text-sm font-bold text-white">ISR</span>
                </div>
              )}

              <span className="hidden text-lg font-bold text-isr-dark-red sm:inline">
                Islamic Society of RMIT
              </span>
            </Link>

            <div className="hidden items-center gap-5 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-isr-turquoise"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/join"
                className="rounded-full bg-isr-turquoise px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-isr-dark-red"
              >
                Join ISR
              </Link>
            </div>

            <button
              type="button"
              className="p-2 text-isr-turquoise lg:hidden"
              onClick={() => setIsOpen((current) => !current)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18 18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <div
            id="mobile-navigation"
            className={`grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
              isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="overflow-hidden">
              <div
                className={`border-t border-isr-light-blue/30 px-4 pb-4 transition-all duration-300 ${
                  isOpen
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-2 opacity-0'
                }`}
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-isr-turquoise"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="px-4 pt-3">
                  <Link
                    href="/join"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-full bg-isr-turquoise px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-isr-dark-red"
                  >
                    Join ISR
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
