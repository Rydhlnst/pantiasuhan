import { test, expect } from '@playwright/test'
import { ADMIN_PASSWORD, dismissOverlay } from './helpers'

async function login(page: import('@playwright/test').Page) {
  await page.goto('/admin/login')
  await page.waitForLoadState('networkidle')
  await dismissOverlay(page)
  await page.locator('input[type="password"]').fill(ADMIN_PASSWORD)
  await dismissOverlay(page)
  await page.locator('button[type="submit"]').click({ force: true })
  await page.waitForURL((url) => !url.pathname.includes('/admin/login'), { timeout: 15000 })
}

test.describe('Auth Security', () => {
  test('admin pages redirect when unauthenticated', async ({ page }) => {
    const pages = ['/admin/dashboard', '/admin/posts', '/admin/gallery', '/admin/settings']
    for (const path of pages) {
      await page.goto(path)
      await expect(page).toHaveURL(/\/admin\/login/, { timeout: 10000 })
    }
  })

  test('login with correct password shows dashboard', async ({ page }) => {
    await login(page)
    await expect(page.getByText('Dashboard').first()).toBeVisible()
  })

  test('session persists on page refresh', async ({ page }) => {
    await login(page)
    await page.reload()
    await page.waitForLoadState('networkidle')
    await dismissOverlay(page)
    await expect(page.getByText('Dashboard').first()).toBeVisible({ timeout: 10000 })
  })

  test('logout redirects to login', async ({ page }) => {
    await login(page)
    await dismissOverlay(page)
    const logoutBtn = page.getByRole('button', { name: /keluar|logout/i })
    await expect(logoutBtn).toBeVisible()
    await logoutBtn.click({ force: true })
    await expect(page).toHaveURL(/\/admin\/login/, { timeout: 10000 })
  })

  test('destroyed session blocks admin pages', async ({ page }) => {
    await login(page)
    await dismissOverlay(page)
    await page.getByRole('button', { name: /keluar|logout/i }).click({ force: true })
    await expect(page).toHaveURL(/\/admin\/login/, { timeout: 10000 })
    await page.goto('/admin/dashboard')
    await expect(page).toHaveURL(/\/admin\/login/, { timeout: 10000 })
  })

  test('cookie is not accessible via document.cookie (httpOnly)', async ({ page }) => {
    await login(page)
    const cookies = await page.evaluate(() => document.cookie)
    expect(cookies).not.toContain('admin_session')
  })

  test('login page shows error on wrong password', async ({ page }) => {
    await page.goto('/admin/login')
    await page.waitForLoadState('networkidle')
    await dismissOverlay(page)
    await page.locator('input[type="password"]').fill('wrongpassword')
    await dismissOverlay(page)
    await page.locator('button[type="submit"]').click({ force: true })
    const error = page.locator('[class*="red"], [role="alert"]').first()
    await expect(error).toBeVisible({ timeout: 8000 })
  })
})