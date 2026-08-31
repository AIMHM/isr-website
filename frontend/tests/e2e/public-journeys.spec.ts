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

const ACCESSIBILITY_ROUTES = [
  '/',
  '/pray',
  '/events',
  '/support',
  '/find',
] as const

test.describe('public ISR routes', () => {
  for (const route of PUBLIC_ROUTES) {
    test(`${route} renders a usable public page`, async ({ page }) => {
      const response = await page.goto(route)

      expect(response).not.toBeNull()
      expect(response?.status()).toBeLessThan(400)

      await expect(page.locator('#main-content')).toBeVisible()
      await expect(page.locator('h1').first()).toBeVisible()
      await expect(
        page.getByRole('link', {
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

    const search = page.getByLabel('Search ISR')

    await expect(search).toBeVisible()
    await expect(
      page.getByRole('heading', {
        name: 'Or go straight to what you need',
      }),
    ).toBeVisible()

    await search.fill('Jumuah')

    await expect(
      page.getByRole('link', {
        name: /Jumu’ah at RMIT/i,
      }),
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
      dialog.getByText('Student essentials'),
    ).toBeVisible()

    expect(
      await page.locator('body').evaluate((body) => body.style.overflow),
    ).toBe('hidden')

    await page.keyboard.press('Escape')

    await expect(dialog).toBeHidden()
    await expect(menuButton).toBeFocused()
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
