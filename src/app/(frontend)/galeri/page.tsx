import React from 'react'
import { Hero } from '@/components/frontend/sections/Hero'
import { GalleryMasonry } from '@/components/frontend/sections/GalleryMasonry'
import { CTA } from '@/components/frontend/sections/CTA'
import { getMediaItems } from '@/lib/cms-api'

export default async function GaleriPage() {
  let media: Awaited<ReturnType<typeof getMediaItems>> = []
  try {
    media = await getMediaItems(50)
  } catch {
    // CMS belum tersedia
  }

  const galleryImages = media
    .filter((m) => m.image?.url)
    .map((m) => ({
      src: m.image!.url,
      alt: m.alt,
      caption: m.caption || m.alt,
    }))

  return (
    <>
      <Hero
        title="Galeri Foto"
        subtitle="Dokumentasi kegiatan panti asuhan"
        height="medium"
        overlay="dark"
      />

      {galleryImages.length > 0 ? (
        <GalleryMasonry
          title="Galeri Foto"
          images={galleryImages}
          columns="3"
        />
      ) : (
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-slate-500">Belum ada foto. Upload gambar melalui admin panel.</p>
          </div>
        </section>
      )}

      <CTA
        title="Ingin Melihat Lebih Dekat?"
        description="Kunjungi langsung Panti Asuhan Muhammadiyah Asahan."
        buttons={[
          { label: 'Hubungi Kami', url: '/kontak', variant: 'primary' },
        ]}
      />
    </>
  )
}
