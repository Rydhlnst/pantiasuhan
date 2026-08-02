import { test as setup, expect } from '@playwright/test'
import { ADMIN_PASSWORD, dismissOverlay } from './helpers'

const authFile = 'tests/.auth/admin.json'

setup('authenticate as admin', async ({ page }) => {
  await page.goto('/admin/login')
  await page.waitForLoadState('networkidle')
  await dismissOverlay(page)
  await page.locator('input[type="password"]').fill(ADMIN_PASSWORD)
  await dismissOverlay(page)
  await page.locator('button[type="submit"]').click({ force: true })
  await page.waitForURL((url) => !url.pathname.includes('/admin/login'), { timeout: 15000 })
  await page.context().storageState({ path: authFile })
})