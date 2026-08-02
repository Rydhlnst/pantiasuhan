import { test, expect } from '@playwright/test'
import { ADMIN_PASSWORD, dismissOverlay } from './helpers'

async function adminLogin(page: import('@playwright/test').Page) {
  await page.goto('/admin/login')
  await page.waitForLoadState('networkidle')
  await dismissOverlay(page)
  await page.locator('input[type="password"]').fill(ADMIN_PASSWORD)
  await dismissOverlay(page)
  await page.locator('button[type="submit"]').click({ force: true })
  await page.waitForURL((url) => !url.pathname.includes('/admin/login'), { timeout: 15000 })
}

test.describe('Admin: Login', () => {
  test('redirects unauthenticated users to login', async ({ page }) => {
    await page.goto('/admin/dashboard')
    await expect(page).toHaveURL(/\/admin\/login/)
  })

  test('shows login form', async ({ page }) => {
    await page.goto('/admin/login')
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await expect(page.getByRole('button', { name: /masuk|login/i })).toBeVisible()
  })

  test('rejects wrong password', async ({ page }) => {
    await page.goto('/admin/login')
    await dismissOverlay(page)
    await page.locator('input[type="password"]').fill('wrongpassword')
    await dismissOverlay(page)
    await page.locator('button[type="submit"]').click({ force: true })
    const error = page.locator('[class*="red"], [role="alert"]').first()
    await expect(error).toBeVisible({ timeout: 8000 })
  })

  test('logs in with correct password and redirects to dashboard', async ({ page }) => {
    await adminLogin(page)
    await expect(page.getByText('Dashboard').first()).toBeVisible()
  })
})

test.describe('Admin: Posts (authenticated)', () => {
  test.beforeEach(async ({ page }) => {
    await adminLogin(page)
  })

  test('posts list page loads', async ({ page }) => {
    await page.goto('/admin/posts')
    await expect(page.getByRole('link', { name: /tulis berita/i })).toBeVisible()
  })

  test('new post form renders all fields', async ({ page }) => {
    await page.goto('/admin/posts/new')
    await expect(page.locator('input[placeholder*="Judul" i]')).toBeVisible()
    await expect(page.locator('textarea')).toBeVisible()
    await expect(page.getByRole('button', { name: /simpan draft/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /publish/i })).toBeVisible()
  })

  test('creates a new post as draft', async ({ page }) => {
    await page.goto('/admin/posts/new')
    await page.locator('input[placeholder*="Judul" i]').fill('Test Post Playwright')
    const editor = page.locator('.ProseMirror').first()
    await editor.click({ force: true })
    await editor.type('Ini adalah konten test dari Playwright.')
    await page.getByRole('button', { name: /simpan draft/i }).click({ force: true })
    await expect(page).toHaveURL(/\/admin\/posts/, { timeout: 10000 })
  })

  test('deletes the test post', async ({ page }) => {
    await page.goto('/admin/posts')
    await page.waitForLoadState('networkidle')
    await dismissOverlay(page)
    await page.waitForTimeout(1000)
    const row = page.locator('tr', { hasText: 'Test Post Playwright' }).first()
    if (await row.count() > 0) {
      page.once('dialog', (d) => d.accept())
      await row.locator('button[title="Hapus"]').click({ force: true })
      await page.waitForTimeout(2000)
      await page.reload()
      await page.waitForLoadState('networkidle')
      await dismissOverlay(page)
      await page.waitForTimeout(1000)
    }
  })
})

test.describe('Admin: Gallery (authenticated)', () => {
  test.beforeEach(async ({ page }) => {
    await adminLogin(page)
  })

  test('gallery page loads with upload button', async ({ page }) => {
    await page.goto('/admin/gallery')
    await expect(page.getByRole('button', { name: /upload foto/i })).toBeVisible()
  })
})

test.describe('Admin: Settings (authenticated)', () => {
  test.beforeEach(async ({ page }) => {
    await adminLogin(page)
  })

  test('settings page loads with form fields', async ({ page }) => {
    await page.goto('/admin/settings')
    await expect(page.locator('input').first()).toBeVisible({ timeout: 8000 })
    await expect(page.getByRole('button', { name: /simpan/i })).toBeVisible()
  })
})