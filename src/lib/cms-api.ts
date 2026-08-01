import { db } from '@/db'
import { posts, media, siteSettings, faqs, testimonials, categories } from '@/db/schema'
import { eq, desc, asc, and } from 'drizzle-orm'

// ─── Posts / Berita ──────────────────────────────────────────────────────────

export type Post = {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  content?: string | null
  publishedAt?: string | null
  createdAt: string
  featuredImageUrl?: string | null
  featuredImage?: { url: string } | null
  category?: { name: string; slug: string } | null
  status: string
}

export async function getPosts(
  options: { limit?: number } = {},
): Promise<Post[]> {
  const { limit = 10 } = options

  const rows = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      content: posts.content,
      featuredImageUrl: posts.featuredImageUrl,
      status: posts.status,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
      categoryName: categories.name,
      categorySlug: categories.slug,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(eq(posts.status, 'published'))
    .orderBy(desc(posts.publishedAt))
    .limit(limit)

  return rows.map((r) => ({
    id: String(r.id),
    title: r.title,
    slug: r.slug,
    excerpt: r.excerpt,
    content: r.content,
    featuredImageUrl: r.featuredImageUrl,
    featuredImage: r.featuredImageUrl ? { url: r.featuredImageUrl } : null,
    status: r.status,
    publishedAt: r.publishedAt?.toISOString() ?? null,
    createdAt: r.createdAt.toISOString(),
    category: r.categoryName
      ? { name: r.categoryName, slug: r.categorySlug! }
      : null,
  }))
}

export async function getPost(slug: string): Promise<Post | null> {
  const rows = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      content: posts.content,
      featuredImageUrl: posts.featuredImageUrl,
      status: posts.status,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
      categoryName: categories.name,
      categorySlug: categories.slug,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(and(eq(posts.slug, slug), eq(posts.status, 'published')))
    .limit(1)

  const r = rows[0]
  if (!r) return null

  return {
    id: String(r.id),
    title: r.title,
    slug: r.slug,
    excerpt: r.excerpt,
    content: r.content,
    featuredImageUrl: r.featuredImageUrl,
    featuredImage: r.featuredImageUrl ? { url: r.featuredImageUrl } : null,
    status: r.status,
    publishedAt: r.publishedAt?.toISOString() ?? null,
    createdAt: r.createdAt.toISOString(),
    category: r.categoryName
      ? { name: r.categoryName, slug: r.categorySlug! }
      : null,
  }
}

// ─── Media / Galeri ──────────────────────────────────────────────────────────

export type MediaItem = {
  id: string
  alt: string
  caption?: string | null
  category?: string | null
  imageUrl: string
  createdAt: string
  image?: { url: string } | null
}

export async function getMediaItems(limit = 50): Promise<MediaItem[]> {
  const rows = await db
    .select()
    .from(media)
    .orderBy(desc(media.createdAt))
    .limit(limit)

  return rows.map((r) => ({
    id: String(r.id),
    alt: r.alt,
    caption: r.caption,
    category: r.category,
    imageUrl: r.imageUrl,
    image: { url: r.imageUrl },
    createdAt: r.createdAt.toISOString(),
  }))
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export type Testimonial = {
  id: string
  name: string
  role?: string | null
  content: string
  featured: boolean
  order: number
  photoUrl?: string | null
  photo?: { url: string } | null
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.featured, true))
    .orderBy(asc(testimonials.order))

  return rows.map((r) => ({
    id: String(r.id),
    name: r.name,
    role: r.role,
    content: r.content,
    featured: r.featured ?? false,
    order: r.order ?? 0,
    photoUrl: r.photoUrl,
    photo: r.photoUrl ? { url: r.photoUrl } : null,
  }))
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export type FAQItem = {
  id: string
  question: string
  answer: string
  order: number
}

export async function getFAQs(): Promise<FAQItem[]> {
  const rows = await db
    .select()
    .from(faqs)
    .where(eq(faqs.status, 'published'))
    .orderBy(asc(faqs.order))

  return rows.map((r) => ({
    id: String(r.id),
    question: r.question,
    answer: r.answer,
    order: r.order ?? 0,
  }))
}

// ─── Programs (static — no DB table) ─────────────────────────────────────────

export type Program = {
  id: string
  name: string
  slug: string
  description?: string | null
  icon?: string | null
  order: number
  image?: { url: string } | null
}

export async function getPrograms(): Promise<Program[]> {
  return []
}

// ─── Statistics (static — no DB table) ───────────────────────────────────────

export type Statistic = {
  id: string
  label: string
  value: string
  icon?: string | null
  order: number
}

export async function getStatistics(): Promise<Statistic[]> {
  return []
}

// ─── Announcements (static — no DB table) ────────────────────────────────────

export type Announcement = {
  id: string
  title: string
  content: string
  type: string
  publishedAt: string
}

export async function getAnnouncements(limit = 5): Promise<Announcement[]> {
  return []
}

// ─── Site Settings ───────────────────────────────────────────────────────────

export type SiteSettings = {
  siteName?: string | null
  siteDescription?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  whatsapp?: string | null
  donationInfo?: string | null
  bankName?: string | null
  bankAccountNumber?: string | null
  bankAccountName?: string | null
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await db.select().from(siteSettings).where(eq(siteSettings.id, 1)).limit(1)
    const r = rows[0]
    if (!r) return {}
    return {
      siteName: r.siteName,
      siteDescription: r.siteDescription,
      phone: r.phone,
      email: r.email,
      address: r.address,
      whatsapp: r.whatsapp,
      donationInfo: r.donationInfo,
      bankName: r.bankName,
      bankAccountNumber: r.bankAccountNumber,
      bankAccountName: r.bankAccountName,
    }
  } catch {
    return {}
  }
}

// ─── Contact Form ────────────────────────────────────────────────────────────

export async function submitContact(data: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}): Promise<{ success: boolean }> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return { success: res.ok }
}

// ─── Image URL helper ─────────────────────────────────────────────────────────

export function getImageUrl(
  imageField: { url: string } | null | undefined
): string | undefined {
  return imageField?.url ?? undefined
}
