import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { posts, categories } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { getSession } from '@/lib/session'

async function requireAuth() {
  const session = await getSession()
  if (!session.isLoggedIn) throw new Error('Unauthorized')
}

export async function GET() {
  const all = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      status: posts.status,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
      categoryName: categories.name,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .orderBy(desc(posts.createdAt))

  return NextResponse.json(all)
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth()
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const [created] = await db.insert(posts).values({
    title: body.title,
    slug,
    excerpt: body.excerpt || null,
    content: body.content || null,
    featuredImageUrl: body.featuredImageUrl || null,
    categoryId: body.categoryId || null,
    status: body.status || 'draft',
    publishedAt: body.status === 'published' ? new Date() : null,
  }).returning()

  return NextResponse.json(created, { status: 201 })
}
