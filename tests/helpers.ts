import { Page, expect } from '@playwright/test'
import { readFileSync } from 'fs'
import { resolve } from 'path'

function getEnvPassword(): string {
  try {
    const envPath = resolve(__dirname, '..', '.env')
    const envContent = readFileSync(envPath, 'utf8')
    const match = envContent.match(/^ADMIN_PASSWORD=(.+)$/m)
    return match ? match[1].trim() : 'admin123'
  } catch {
    return 'admin123'
  }
}

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || getEnvPassword()

export async function dismissOverlay(page: Page) {
  // Remove Next.js dev overlay that intercepts pointer events
  await page.evaluate(() => {
    document.querySelectorAll('nextjs-portal').forEach(el => el.remove())
    // Also remove any dev overlay shadow hosts
    document.querySelectorAll('[data-nextjs-dev-overlay]').forEach(el => el.remove())
  }).catch(() => {})
}

export async function adminLogin(page: Page) {
  await page.goto('/admin/login')
  await page.waitForLoadState('networkidle')
  await dismissOverlay(page)
  // Fill password
  await page.locator('input[type="password"]').fill(ADMIN_PASSWORD)
  await dismissOverlay(page)
  // Click submit
  await page.locator('button[type="submit"]').click({ force: true })
  // Wait for navigation away from login
  await page.waitForURL((url) => !url.pathname.includes('/admin/login'), { timeout: 15000 })
}

export async function adminLogout(page: Page) {
  await dismissOverlay(page)
  const logoutBtn = page.getByRole('button', { name: /keluar|logout/i })
  if (await logoutBtn.isVisible()) {
    await logoutBtn.click({ force: true })
    await page.waitForTimeout(2000)
  }
}

export function timestamp() {
  return Date.now()
}

export function uniqueTitle(prefix: string) {
  return `${prefix} ${Date.now()}`
}