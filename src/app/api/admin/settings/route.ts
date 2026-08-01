import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { siteSettings } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { getSession } from '@/lib/session'

export async function GET() {
  const [settings] = await db.select().from(siteSettings).where(eq(siteSettings.id, 1))
  return NextResponse.json(settings ?? {})
}

export async function PUT(req: NextRequest) {
  const session = await getSession()
  if (!session.isLoggedIn) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()

  const existing = await db.select().from(siteSettings).where(eq(siteSettings.id, 1))
  if (existing.length === 0) {
    const [created] = await db.insert(siteSettings).values({ id: 1, ...body, updatedAt: new Date() }).returning()
    return NextResponse.json(created)
  }

  const [updated] = await db.update(siteSettings).set({ ...body, updatedAt: new Date() }).where(eq(siteSettings.id, 1)).returning()
  return NextResponse.json(updated)
}
