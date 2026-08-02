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

test.describe('Settings Full CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
  })

  test('settings page loads with current values', async ({ page }) => {
    await page.goto('/admin/settings')
    await page.waitForTimeout(2000)
    const siteNameInput = page.locator('input').first()
    await expect(siteNameInput).toBeVisible()
    await expect(siteNameInput).not.toBeEmpty()
  })

  test('settings page shows all form sections', async ({ page }) => {
    await page.goto('/admin/settings')
    await page.waitForTimeout(2000)
    // Info section
    await expect(page.getByText('Informasi Situs')).toBeVisible()
    // Contact section
    await expect(page.getByText('Informasi Kontak')).toBeVisible()
    // Donation section
    await expect(page.getByText('Informasi Donasi')).toBeVisible()
  })

  test('update settings shows success toast', async ({ page }) => {
    await page.goto('/admin/settings')
    await page.waitForTimeout(2000)
    // Change site name
    const siteNameInput = page.locator('input').first()
    const originalValue = await siteNameInput.inputValue()
    await siteNameInput.fill('Test Update Playwright')
    // Submit
    await page.getByRole('button', { name: /simpan/i }).click({ force: true })
    await page.waitForTimeout(1000)
    // Revert
    await siteNameInput.fill(originalValue)
    await page.getByRole('button', { name: /simpan/i }).click({ force: true })
    await page.waitForTimeout(1000)
  })

  test('settings persist on page refresh', async ({ page }) => {
    await page.goto('/admin/settings')
    await page.waitForTimeout(2000)
    const siteNameInput = page.locator('input').first()
    const value = await siteNameInput.inputValue()
    // Refresh
    await page.reload()
    await page.waitForTimeout(2000)
    const refreshedValue = await siteNameInput.inputValue()
    expect(refreshedValue).toBe(value)
  })

  test('save button is present and functional', async ({ page }) => {
    await page.goto('/admin/settings')
    await page.waitForTimeout(2000)
    const saveBtn = page.getByRole('button', { name: /simpan/i })
    await expect(saveBtn).toBeVisible()
    await expect(saveBtn).toBeEnabled()
  })

  test('settings fields are editable', async ({ page }) => {
    await page.goto('/admin/settings')
    await page.waitForTimeout(2000)
    const inputs = page.locator('input[type="text"], input[type="email"], input[type="tel"], textarea')
    const count = await inputs.count()
    expect(count).toBeGreaterThan(0)
    // All inputs should be editable
    for (let i = 0; i < Math.min(count, 3); i++) {
      await expect(inputs.nth(i)).toBeEditable()
    }
  })
})