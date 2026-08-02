import { test, expect } from '@playwright/test'
import { ADMIN_PASSWORD } from './helpers'

test.describe('API Security', () => {
  test('POST /api/admin/posts returns 401 without session', async ({ request }) => {
    const res = await request.post('/api/admin/posts', {
      data: { title: 'unauthorized' },
    })
    expect(res.status()).toBe(401)
  })

  test('PUT /api/admin/posts/1 returns 401 without session', async ({ request }) => {
    const res = await request.put('/api/admin/posts/1', {
      data: { title: 'unauthorized' },
    })
    expect(res.status()).toBe(401)
  })

  test('DELETE /api/admin/posts/1 returns 401 without session', async ({ request }) => {
    const res = await request.delete('/api/admin/posts/1')
    expect(res.status()).toBe(401)
  })

  test('POST /api/admin/gallery returns 401 without session', async ({ request }) => {
    const res = await request.post('/api/admin/gallery', {
      data: { alt: 'unauthorized', imageUrl: 'https://example.com/test.jpg' },
    })
    expect(res.status()).toBe(401)
  })

  test('DELETE /api/admin/gallery returns 401 without session', async ({ request }) => {
    const res = await request.delete('/api/admin/gallery', {
      data: { id: 999 },
    })
    expect(res.status()).toBe(401)
  })

  test('PUT /api/admin/settings returns 401 without session', async ({ request }) => {
    const res = await request.put('/api/admin/settings', {
      data: { siteName: 'hacked' },
    })
    expect(res.status()).toBe(401)
  })

  test('POST /api/admin/upload returns 401 without session', async ({ request }) => {
    const res = await request.post('/api/admin/upload', {
      data: { filename: 'test.jpg', contentType: 'image/jpeg' },
    })
    expect(res.status()).toBe(401)
  })

  test('POST /api/admin/auth rejects wrong password', async ({ request }) => {
    const res = await request.post('/api/admin/auth', {
      data: { password: 'wrongpassword' },
    })
    expect(res.status()).toBe(401)
    const body = await res.json()
    expect(body.error).toBeTruthy()
  })

  test('GET /api/admin/settings is public (no auth required)', async ({ request }) => {
    const res = await request.get('/api/admin/settings')
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.siteName).toBeTruthy()
  })

  test('GET /api/admin/posts is public (no auth required)', async ({ request }) => {
    const res = await request.get('/api/admin/posts')
    expect(res.status()).toBe(200)
  })
})