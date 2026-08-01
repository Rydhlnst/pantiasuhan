import React from 'react'
import { Hero } from '@/components/frontend/sections/Hero'
import { LatestPosts } from '@/components/frontend/sections/LatestPosts'
import { CTA } from '@/components/frontend/sections/CTA'
import { getPosts, getImageUrl } from '@/lib/cms-api'

export default async function BeritaPage() {
  let posts: Awaited<ReturnType<typeof getPosts>> = []
  try {
    posts = await getPosts({ limit: 20 })
  } catch {
    // CMS belum tersedia, tampilkan halaman kosong
  }

  const postsFormatted = posts.map((p) => ({
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || '',
    publishedAt: p.publishedAt || p.createdAt,
    featuredImage: getImageUrl(p.featuredImage),
    category: p.category ?? undefined,
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
