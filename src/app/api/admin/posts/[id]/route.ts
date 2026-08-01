import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { getSession } from '@/lib/session'

async function requireAuth() {
  const session = await getSession()
  if (!session.isLoggedIn) throw new Error('Unauthorized')
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [post] = await db.select().from(posts).where(eq(posts.id, parseInt(id)))
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try { await requireAuth() } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json()

  const [updated] = await db.update(posts).set({
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt || null,
    content: body.content || null,
    featuredImageUrl: body.featuredImageUrl || null,
    categoryId: body.categoryId || null,
    status: body.status,
    publishedAt: body.status === 'published' ? new Date() : null,
    updatedAt: new Date(),
  }).where(eq(posts.id, parseInt(id))).returning()

  return NextResponse.json(updated)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try { await requireAuth() } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  await db.delete(posts).where(eq(posts.id, parseInt(id)))
  return NextResponse.json({ success: true })
}
