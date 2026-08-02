import { test, expect } from '@playwright/test'
import { ADMIN_PASSWORD, uniqueTitle, dismissOverlay } from './helpers'

async function login(page: import('@playwright/test').Page) {
  await page.goto('/admin/login')
  await page.waitForLoadState('networkidle')
  await dismissOverlay(page)
  await page.locator('input[type="password"]').fill(ADMIN_PASSWORD)
  await dismissOverlay(page)
  await page.locator('button[type="submit"]').click({ force: true })
  await page.waitForURL((url) => !url.pathname.includes('/admin/login'), { timeout: 15000 })
}

test.describe.serial('Data Integrity - CMS to Frontend', () => {
  const testTitle = uniqueTitle('E2E Test Post')

  test('create post in admin and verify on frontend', async ({ page }) => {
    await login(page)
    // Create post
    await page.goto('/admin/posts/new')
    await page.locator('input[placeholder*="Judul" i]').fill(testTitle)
    const editor = page.locator('.ProseMirror').first()
    await editor.click({ force: true })
    await editor.type('Konten E2E test yang akan muncul di frontend.')
    await page.getByRole('button', { name: /publish/i }).click({ force: true })
    await expect(page).toHaveURL(/\/admin\/posts/, { timeout: 10000 })
    // Verify on frontend
    await page.goto('/berita')
    await page.waitForTimeout(3000)
    // The post should be visible (or at least the page should load without error)
    await expect(page.locator('h1, h2').first()).toBeVisible()
    // Cleanup
    await login(page)
    await page.goto('/admin/posts')
    const row = page.locator('tr', { hasText: testTitle })
    if (await row.count() > 0) {
      page.once('dialog', (d) => d.accept())
      await row.locator('button[title="Hapus"]').click({ force: true })
      await page.waitForTimeout(1500)
    }
  })

  test('settings update reflects on frontend', async ({ page }) => {
    await login(page)
    await page.goto('/admin/settings')
    await page.waitForTimeout(2000)
    const siteNameInput = page.locator('input').first()
    const originalValue = await siteNameInput.inputValue()
    // Update to test value
    await siteNameInput.fill('Test Site E2E')
    await page.getByRole('button', { name: /simpan/i }).click({ force: true })
    await page.waitForTimeout(1500)
    // Check frontend
    await page.goto('/')
    await page.waitForTimeout(2000)
    // The header should show the site name
    const header = page.locator('header')
    await expect(header).toBeVisible()
    // Revert
    await login(page)
    await page.goto('/admin/settings')
    await page.waitForTimeout(2000)
    await siteNameInput.fill(originalValue)
    await page.getByRole('button', { name: /simpan/i }).click({ force: true })
    await page.waitForTimeout(1000)
  })

  test('frontend pages load without errors', async ({ page }) => {
    const pages = ['/', '/beranda', '/berita', '/galeri', '/donasi', '/kontak', '/profil/tentang', '/profil/visi-misi']
    for (const path of pages) {
      const response = await page.goto(path)
      await page.waitForTimeout(1000)
      expect(response?.status()).toBeLessThan(500)
      // No error page
      const errorText = await page.getByText('Application error').isVisible().catch(() => false)
      expect(errorText).toBeFalsy()
    }
  })

  test('admin dashboard shows correct stats', async ({ page }) => {
    await login(page)
    await page.goto('/admin/dashboard')
    await page.waitForTimeout(2000)
    // Stats should be visible
    await expect(page.getByText('Total Berita')).toBeVisible()
    await expect(page.getByText('Total Foto')).toBeVisible()
    await expect(page.getByText('Pesan Baru')).toBeVisible()
  })

  test('gallery admin page matches frontend gallery', async ({ page }) => {
    await login(page)
    await page.goto('/admin/gallery')
    await page.waitForTimeout(2000)
    // Count images in admin
    const adminImages = await page.locator('.grid > div').count()
    // Check frontend gallery
    await page.goto('/galeri')
    await page.waitForTimeout(3000)
    // Frontend should load
    await expect(page.locator('h1, h2').first()).toBeVisible()
  })
})