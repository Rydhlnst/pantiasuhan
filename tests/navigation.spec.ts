import { test, expect } from '@playwright/test'

test.describe('Frontend navigation', () => {
  test('beranda loads without error', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Panti Asuhan/i)
    await expect(page.locator('h1, h2').first()).toBeVisible()
  })

  test('main nav links are present', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /beranda/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /galeri/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /berita/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /donasi/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /kontak/i }).first()).toBeVisible()
  })

  test('navigates to berita page', async ({ page }) => {
    await page.goto('/berita')
    await expect(page.locator('h1, h2').first()).toBeVisible()
    await expect(page).not.toHaveURL(/error/i)
  })

  test('navigates to galeri page', async ({ page }) => {
    await page.goto('/galeri')
    await expect(page.locator('h1, h2').first()).toBeVisible()
  })

  test('navigates to donasi page', async ({ page }) => {
    await page.goto('/donasi')
    await expect(page.locator('h1, h2').first()).toBeVisible()
  })

  test('navigates to kontak page', async ({ page }) => {
    await page.goto('/kontak')
    await expect(page.locator('h1, h2').first()).toBeVisible()
  })

  test('profil dropdown pages load', async ({ page }) => {
    for (const path of ['/profil/tentang', '/profil/visi-misi', '/profil/sejarah']) {
      await page.goto(path)
      await expect(page.locator('h1, h2').first()).toBeVisible()
    }
  })
})
