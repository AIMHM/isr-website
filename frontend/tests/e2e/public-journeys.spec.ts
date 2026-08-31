import AxeBuilder from '@axe-core/playwright'
import {
  expect,
  test,
} from '@playwright/test'

const PUBLIC_ROUTES = [
  '/',
  '/pray',
  '/events',
  '/campuses',
  '/student-guide',
  '/support',
  '/join',
  '/about',
  '/teams',
  '/faq',
  '/links',
  '/find',
  '/contact',
] as const

const ACCESSIBILITY_ROUTES = PUBLIC_ROUTES

const TOUR_STORAGE_KEY = 'isr-public-tour-v1-complete'

test.beforeEach(async ({ page }, testInfo) => {
  if (testInfo.title.includes('first-time visitors')) {
    return
  }

  await page.addInitScript((storageKey) => {
    window.localStorage.setItem(storageKey, 'true')
  }, TOUR_STORAGE_KEY)
})

test.describe('public ISR routes', () => {
  for (const route of PUBLIC_ROUTES) {
    test(`${route} renders a usable public page`, async ({ page }) => {
      const response = await page.goto(route)

      expect(response).not.toBeNull()
      expect(response?.status()).toBeLessThan(400)

      await expect(page.locator('#main-content')).toBeVisible()
      await expect(page.locator('h1').first()).toBeVisible()
      await expect(
        page.getByRole('banner').getByRole('link', {
          name: 'Islamic Society of RMIT home',
        }),
      ).toBeVisible()

      const hasHorizontalOverflow = await page.evaluate(() =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
      )

      expect(
        hasHorizontalOverflow,
        `${route} should not introduce page-level horizontal scrolling`,
      ).toBe(false)
    })
  }
})

test.describe('student task journeys', () => {
  test('search finds Jumu’ah without requiring site knowledge', async ({ page }) => {
    await page.goto('/find')

    const search = page.getByRole('searchbox', {
      name: 'Search ISR',
    })

    await expect(search).toBeVisible()
    await expect(
      page.getByRole('button', {
        name: 'Jumu’ah',
      }),
    ).toBeVisible()

    await search.fill('Jumuah')

    await expect(
      page.getByRole('link', {
        name: /Jumu’ah at RMIT/i,
      }),
    ).toBeVisible()
  })

  test('Bundoora students can reach a prayer-space detail from the campus guide', async ({ page }) => {
    await page.goto('/campuses#bundoora')

    const bundoora = page.locator('#bundoora')

    await expect(bundoora).toBeVisible()
    await expect(
      bundoora.getByRole('heading', {
        name: 'Bundoora',
        exact: true,
      }),
    ).toBeVisible()

    const prayerDetails = bundoora.getByRole('link', {
      name: 'Open prayer details',
    }).first()

    await expect(prayerDetails).toBeVisible()
    await expect(prayerDetails).toHaveAttribute('href', /^\/pray#/)
  })

  test('Friday prayer information is directly reachable', async ({ page }) => {
    await page.goto('/pray#jumuah')

    const jumuah = page.locator('#jumuah')

    await expect(jumuah).toBeVisible()
    await expect(jumuah).toContainText(/City/i)
    await expect(jumuah).toContainText(/Bundoora/i)
  })

  test('new students are given a direct route into the campus guide', async ({ page }) => {
    await page.goto('/student-guide')

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Navigate Muslim student life at RMIT',
      }),
    ).toBeVisible()

    const campusGuide = page.getByRole('link', {
      name: /Open campus guide/i,
    })

    await expect(campusGuide).toBeVisible()
    await expect(campusGuide).toHaveAttribute('href', '/campuses')
  })

  test('students can reach the current activity experience', async ({ page }) => {
    await page.goto('/events')

    await expect(page.locator('#main-content')).toBeVisible()
    await expect(
      page.locator('h1').first(),
    ).toBeVisible()
    await expect(
      page.getByRole('link', {
        name: /Join ISR/i,
      }).first(),
    ).toBeVisible()
  })

  test('unknown URLs provide recovery rather than a dead end', async ({ page }) => {
    const response = await page.goto('/this-page-should-not-exist')

    expect(response?.status()).toBe(404)
    await expect(page.locator('#main-content')).toBeVisible()
    await expect(page.locator('h1').first()).toBeVisible()
    await expect(
      page.getByRole('link', {
        name: /Pray at RMIT/i,
      }).first(),
    ).toBeVisible()
    await expect(
      page.getByRole('link', {
        name: /Search/i,
      }).first(),
    ).toBeVisible()
  })

  test('mobile navigation opens, locks the page and restores focus', async ({
    page,
  }, testInfo) => {
    const viewport = testInfo.project.use.viewport

    test.skip(
      !viewport || viewport.width >= 1280,
      'Mobile navigation is only rendered below the desktop navigation breakpoint.',
    )

    await page.goto('/')

    const menuButton = page.getByRole('button', {
      name: 'Open navigation menu',
    })

    await menuButton.click()

    const dialog = page.getByRole('dialog', {
      name: 'Site navigation',
    })

    await expect(dialog).toBeVisible()
    await expect(
      dialog.getByRole('link', {
        name: 'Pray at RMIT',
      }),
    ).toBeVisible()
    await expect(
      dialog.getByRole('link', {
        name: 'Search ISR',
      }),
    ).toBeVisible()

    expect(
      await page.locator('body').evaluate((body) => body.style.overflow),
    ).toBe('hidden')

    await page.keyboard.press('Escape')

    await expect(dialog).toBeHidden()
    await expect(menuButton).toBeFocused()
  })

  test('first-time visitors can dismiss the original website tour', async ({ page }) => {
    await page.goto('/')

    const tour = page.getByRole('dialog', {
      name: 'Welcome to ISR',
    })

    await expect(tour).toBeVisible()
    await expect(
      tour.getByText('Website tour · 1 of 8'),
    ).toBeVisible()

    await tour.getByRole('button', {
      name: 'Skip tour',
    }).click()

    await expect(tour).toBeHidden()

    expect(
      await page.evaluate((storageKey) =>
        window.localStorage.getItem(storageKey),
      TOUR_STORAGE_KEY),
    ).toBe('true')
  })
})

test.describe('automated accessibility', () => {
  for (const route of ACCESSIBILITY_ROUTES) {
    test(`${route} has no automated WCAG A/AA violations`, async ({ page }) => {
      await page.goto(route)
      await expect(page.locator('#main-content')).toBeVisible()

      const results = await new AxeBuilder({ page })
        .withTags([
          'wcag2a',
          'wcag2aa',
          'wcag21a',
          'wcag21aa',
          'wcag22aa',
        ])
        .analyze()

      const summary = results.violations
        .map((violation) => {
          const targets = violation.nodes
            .flatMap((node) => node.target)
            .slice(0, 5)
            .join(', ')

          return `${violation.id}: ${violation.help}${targets ? ` (${targets})` : ''}`
        })
        .join('\n')

      expect(
        results.violations,
        summary || 'No automated accessibility violations found.',
      ).toEqual([])
    })
  }
})
