import React from 'react'
import { Hero } from '@/components/frontend/sections/Hero'
import { LatestPosts } from '@/components/frontend/sections/LatestPosts'
import { CTA } from '@/components/frontend/sections/CTA'
import { fetchCollection, getMediaUrl } from '@/lib/payload-api'

async function getPosts() {
  try {
    const posts = await fetchCollection<{
      id: string
      title: string
      slug: string
      excerpt?: string
      publishedAt?: string
      featuredImage?: string | { url: string } | null
      category?: { name: string; slug: string } | null
    }>('posts', 'limit=10&sort=-publishedAt&where[status][equals]=published', { next: { revalidate: 60 } })
    return posts.docs
  } catch {
    return []
  }
}

export default async function BeritaPage() {
  const posts = await getPosts()

  const postsFormatted = posts.map((p) => ({
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || '',
    publishedAt: p.publishedAt || '',
    featuredImage: typeof p.featuredImage === 'object' && p.featuredImage?.url
      ? getMediaUrl(p.featuredImage.url)
      : undefined,
    category: p.category ? { name: p.category.name, slug: p.category.slug } : undefined,
  }))

  return (
    <>
      <Hero
        title="Berita & Informasi"
        subtitle="Kabar terbaru dari Panti Asuhan Muhammadiyah Asahan"
        height="medium"
        overlay="dark"
      />

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {postsFormatted.length > 0 ? (
            <LatestPosts
              title="Semua Berita"
              posts={postsFormatted}
              layout="grid"
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500">Belum ada berita. Tambahkan melalui admin panel.</p>
            </div>
          )}
        </div>
      </section>

      <CTA
        title="Tetap Terhubung"
        description="Ikuti media sosial kami untuk mendapatkan informasi terbaru."
        buttons={[
          { label: 'Hubungi Kami', url: '/kontak', variant: 'primary' },
        ]}
      />
    </>
  )
}
