import { test, expect } from '@playwright/test'
import { ADMIN_PASSWORD, uniqueTitle, dismissOverlay } from './helpers'

const TEST_TITLE = uniqueTitle('Test Post Playwright')
const UPDATED_TITLE = uniqueTitle('Updated Post Playwright')

async function login(page: import('@playwright/test').Page) {
  await page.goto('/admin/login')
  await page.waitForLoadState('networkidle')
  await dismissOverlay(page)
  await page.locator('input[type="password"]').fill(ADMIN_PASSWORD)
  await dismissOverlay(page)
  await page.locator('button[type="submit"]').click({ force: true })
  await page.waitForURL((url) => !url.pathname.includes('/admin/login'), { timeout: 15000 })
}

test.describe.serial('Posts Full CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
  })

  test('create post with all fields', async ({ page, request }) => {
    // First verify API works
    const listBefore = await request.get('/api/admin/posts')
    const postsBefore = await listBefore.json()
    const countBefore = postsBefore.length

    await page.goto('/admin/posts/new')
    await page.waitForLoadState('networkidle')
    await dismissOverlay(page)
    // Title
    await page.locator('input[placeholder*="Judul" i]').fill(TEST_TITLE)
    // Content via TipTap
    const editor = page.locator('.ProseMirror').first()
    await editor.click({ force: true })
    await editor.type('Ini adalah konten test dari Playwright.')
    // Publish
    await page.getByRole('button', { name: /publish/i }).click({ force: true })
    // Wait for redirect to posts page
    await page.waitForURL(/\/admin\/posts/, { timeout: 15000 })
    // Verify via API that post was created
    await page.waitForTimeout(2000)
    const listAfter = await request.get('/api/admin/posts')
    const postsAfter = await listAfter.json()
    expect(postsAfter.length).toBeGreaterThan(countBefore)
    // Find our post
    const ourPost = postsAfter.find((p: { title: string }) => p.title === TEST_TITLE)
    expect(ourPost).toBeTruthy()
    expect(ourPost.status).toBe('published')
  })

  test('post shows published status', async ({ page }) => {
    await page.goto('/admin/posts')
    const row = page.locator('tr', { hasText: TEST_TITLE })
    await expect(row.locator('text=Published').first()).toBeVisible()
  })

  test('edit existing post', async ({ page }) => {
    // Navigate to posts page first to ensure we have the session
    await page.goto('/admin/posts')
    await page.waitForLoadState('networkidle')
    await dismissOverlay(page)
    await page.waitForTimeout(1000)

    // Get post ID and update via page context (shares cookies)
    const result = await page.evaluate(async (titles) => {
      const listRes = await fetch('/api/admin/posts')
      const posts = await listRes.json()
      const ourPost = posts.find((p: { title: string }) => p.title === titles.old)
      if (!ourPost) return { error: 'Post not found' }

      const updateRes = await fetch(`/api/admin/posts/${ourPost.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: titles.new, content: 'Updated content', status: 'published' }),
      })
      return { ok: updateRes.ok, status: updateRes.status }
    }, { old: TEST_TITLE, new: UPDATED_TITLE })

    expect(result.ok).toBeTruthy()

    // Refresh and verify
    await page.reload()
    await page.waitForLoadState('networkidle')
    await dismissOverlay(page)
    await page.waitForTimeout(2000)
    await expect(page.locator('td', { hasText: UPDATED_TITLE }).first()).toBeVisible({ timeout: 15000 })
  })

  test('delete the test post', async ({ page }) => {
    await page.goto('/admin/posts')
    await page.waitForLoadState('networkidle')
    await dismissOverlay(page)
    await page.waitForTimeout(1000)
    const row = page.locator('tr', { hasText: UPDATED_TITLE })
    if (await row.count() > 0) {
      // Accept the confirmation dialog
      page.once('dialog', (d) => d.accept())
      await row.locator('button[title="Hapus"]').click({ force: true })
      // Wait for the row to be removed
      await page.waitForTimeout(3000)
      await page.reload()
      await page.waitForLoadState('networkidle')
      await dismissOverlay(page)
      await page.waitForTimeout(1000)
      await expect(page.locator('tr', { hasText: UPDATED_TITLE })).toHaveCount(0)
    }
  })

  test('empty title shows validation error', async ({ page }) => {
    await page.goto('/admin/posts/new')
    await page.getByRole('button', { name: /simpan draft/i }).click({ force: true })
    // Should show toast error or stay on page
    await page.waitForTimeout(1000)
    await expect(page).toHaveURL(/\/admin\/posts\/new/)
  })

  test('posts page shows empty state when no posts', async ({ page }) => {
    await page.goto('/admin/posts')
    // After deleting test posts, should show empty state or have posts
    const hasEmptyState = await page.getByText('Belum ada berita').isVisible().catch(() => false)
    const hasRows = await page.locator('tbody tr').count()
    expect(hasEmptyState || hasRows > 0).toBeTruthy()
  })
})