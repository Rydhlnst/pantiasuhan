import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { media } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { getSession } from '@/lib/session'

async function requireAuth() {
  const session = await getSession()
  if (!session.isLoggedIn) throw new Error('Unauthorized')
}

export async function GET() {
  const all = await db.select().from(media).orderBy(desc(media.createdAt))
  return NextResponse.json(all)
}

export async function POST(req: NextRequest) {
  try { await requireAuth() } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const [created] = await db.insert(media).values({
    alt: body.alt,
    caption: body.caption || null,
    category: body.category || 'general',
    imageUrl: body.imageUrl,
  }).returning()

  return NextResponse.json(created, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  try { await requireAuth() } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await req.json()
  await db.delete(media).where(eq(media.id, id))
  return NextResponse.json({ success: true })
}
