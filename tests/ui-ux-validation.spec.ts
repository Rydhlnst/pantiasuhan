import { test, expect } from '@playwright/test'
import { ADMIN_PASSWORD, dismissOverlay } from './helpers'

test.describe('UI/UX Validation', () => {
  test('no horizontal overflow on homepage', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(2000)
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2)
  })

  test('no horizontal overflow on beranda', async ({ page }) => {
    await page.goto('/beranda')
    await page.waitForTimeout(2000)
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2)
  })

  test('no horizontal overflow on berita', async ({ page }) => {
    await page.goto('/berita')
    await page.waitForTimeout(2000)
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2)
  })

  test('no horizontal overflow on galeri', async ({ page }) => {
    await page.goto('/galeri')
    await page.waitForTimeout(2000)
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2)
  })

  test('no horizontal overflow on kontak', async ({ page }) => {
    await page.goto('/kontak')
    await page.waitForTimeout(2000)
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2)
  })

  test('no horizontal overflow on donasi', async ({ page }) => {
    await page.goto('/donasi')
    await page.waitForTimeout(2000)
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2)
  })

  test('admin pages have no horizontal overflow', async ({ page }) => {
    await page.goto('/admin/login')
    await page.waitForLoadState('networkidle')
    await dismissOverlay(page)
    await page.locator('input[type="password"]').fill(ADMIN_PASSWORD)
    await dismissOverlay(page)
    await page.locator('button[type="submit"]').click({ force: true })
    await page.waitForURL((url) => !url.pathname.includes('/admin/login'), { timeout: 15000 })
    for (const path of ['/admin/dashboard', '/admin/posts', '/admin/gallery', '/admin/settings']) {
      await page.goto(path)
      await page.waitForTimeout(1500)
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2)
    }
  })

  test('images on frontend have valid src', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(3000)
    const images = page.locator('img[src]')
    const count = await images.count()
    for (let i = 0; i < count; i++) {
      const src = await images.nth(i).getAttribute('src')
      expect(src).toBeTruthy()
      expect(src).not.toBe('')
    }
  })

  test('hero section is visible', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(2000)
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()
  })

  test('footer is visible', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(2000)
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('header navigation is visible on desktop', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(2000)
    // Check for nav links in the navy bar
    const navLinks = page.locator('nav a, header a')
    const count = await navLinks.count()
    expect(count).toBeGreaterThan(0)
  })
})