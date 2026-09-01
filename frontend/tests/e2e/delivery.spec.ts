import {
  expect,
  test,
} from '@playwright/test'

test.describe('public delivery safeguards', () => {
  test('public pages send the baseline security headers', async ({ request }) => {
    const response = await request.get('/')

    expect(response.status()).toBeLessThan(400)

    const headers = response.headers()

    expect(headers['strict-transport-security']).toBe(
      'max-age=31536000',
    )
    expect(headers['x-content-type-options']).toBe('nosniff')
    expect(headers['x-frame-options']).toBe('SAMEORIGIN')
    expect(headers['referrer-policy']).toBe(
      'strict-origin-when-cross-origin',
    )
    expect(headers['permissions-policy']).toContain('camera=()')
    expect(headers['permissions-policy']).toContain('microphone=()')
    expect(headers['permissions-policy']).toContain('geolocation=()')
  })

  test('robots exposes the production crawl policy and sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt')

    expect(response.status()).toBe(200)

    const robots = await response.text()

    expect(robots).toContain('User-Agent: *')
    expect(robots).toContain('Allow: /')
    expect(robots).toContain('Disallow: /admin')
    expect(robots).toContain('Disallow: /api')
    expect(robots).toContain(
      'Sitemap: https://theisr.com.au/sitemap.xml',
    )
  })

  test('sitemap exposes public destinations but not held or noindex routes', async ({ request }) => {
    const response = await request.get('/sitemap.xml')

    expect(response.status()).toBe(200)

    const sitemap = await response.text()

    expect(sitemap).toContain('https://theisr.com.au/pray')
    expect(sitemap).toContain('https://theisr.com.au/events')
    expect(sitemap).toContain('https://theisr.com.au/student-guide')
    expect(sitemap).not.toContain('https://theisr.com.au/find')
    expect(sitemap).not.toContain('/about/history')
    expect(sitemap).not.toContain('/admin')
  })

  test('web app manifest remains valid and ISR-branded', async ({ request }) => {
    const response = await request.get('/manifest.webmanifest')

    expect(response.status()).toBe(200)

    const manifest = await response.json()

    expect(manifest.name).toBe('Islamic Society of RMIT')
    expect(manifest.short_name).toBe('ISR')
    expect(manifest.start_url).toBe('/')
    expect(manifest.display).toBe('standalone')
    expect(manifest.theme_color).toBe('#5B0B05')
    expect(manifest.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          src: '/images/isr_logo_transparent.png',
        }),
      ]),
    )
  })
})
