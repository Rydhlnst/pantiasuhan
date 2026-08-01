import React from 'react'
import { FrontendLayout } from '@/components/frontend/FrontendLayout'
import { Hero } from '@/components/frontend/sections/Hero'
import { Sekilas } from '@/components/frontend/sections/Sekilas'
import { Statistics } from '@/components/frontend/sections/Statistics'
import { GalleryMasonry } from '@/components/frontend/sections/GalleryMasonry'
import { LatestPosts } from '@/components/frontend/sections/LatestPosts'
import { CTA } from '@/components/frontend/sections/CTA'
import { WhatsAppButton } from '@/components/frontend/WhatsAppButton'
import { getSiteSettings, getMediaItems, getPosts } from '@/lib/cms-api'

const DEFAULT_PHONE = '082175723169'
const DEFAULT_WHATSAPP = '6282175723169'
const DEFAULT_ADDRESS = 'Jl. Setia Budi, Kel. Selawan, Kec. Kisaran Timur, Kab. Asahan, Prov. Sumatera Utara'
const DEFAULT_SITE_NAME = 'Panti Asuhan Muhammadiyah Asahan'
const FALLBACK_IMAGES = [
  '/images/panti/kegiatan-1.jpg',
  '/images/panti/gedung-putri-orang.jpg',
  '/images/panti/gedung-putra.jpg',
  '/images/panti/kegiatan-2.jpg',
  '/images/panti/kegiatan-3.jpg',
  '/images/panti/kegiatan-4.jpg',
]

export default async function HomePage() {
  const [settings, media, posts] = await Promise.all([
    getSiteSettings(),
    getMediaItems(20).catch(() => []),
    getPosts({ limit: 3 }).catch(() => []),
  ])

  const siteName = settings.siteName || DEFAULT_SITE_NAME
  const phone = settings.phone || DEFAULT_PHONE
  const whatsapp = settings.whatsapp || DEFAULT_WHATSAPP
  const address = settings.address || DEFAULT_ADDRESS

  const galleryImages = media
    .filter((m) => m.image?.url)
    .map((m) => ({ src: m.image!.url, alt: m.alt, caption: m.caption || m.alt }))

  const displayImages = galleryImages.length > 0
    ? galleryImages
    : FALLBACK_IMAGES.map((src, i) => ({ src, alt: `Foto panti ${i + 1}`, caption: '' }))

  const postsFormatted = posts.map((p) => ({
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || '',
    publishedAt: p.publishedAt || p.createdAt,
    featuredImage: p.featuredImage?.url,
    category: p.category ?? undefined,
  }))

  return (
    <FrontendLayout
      siteName={siteName}
      navigation={[
        { label: 'Beranda', url: '/' },
        {
          label: 'Profil',
          url: '/profil',
          children: [
            { label: 'Tentang Kami', url: '/profil/tentang' },
            { label: 'Visi & Misi', url: '/profil/visi-misi' },
            { label: 'Sejarah', url: '/profil/sejarah' },
          ],
        },
        { label: 'Galeri', url: '/galeri' },
        { label: 'Berita', url: '/berita' },
        { label: 'Donasi', url: '/donasi' },
        { label: 'Kontak', url: '/kontak' },
      ]}
      footer={{
        columns: [
          {
            title: 'Profil',
            links: [
              { label: 'Tentang Kami', url: '/profil/tentang' },
              { label: 'Visi & Misi', url: '/profil/visi-misi' },
              { label: 'Sejarah', url: '/profil/sejarah' },
            ],
          },
          {
            title: 'Layanan',
            links: [
              { label: 'Panti Putra', url: '/layanan/putra' },
              { label: 'Panti Putri', url: '/layanan/putri' },
              { label: 'Cara Donasi', url: '/donasi' },
            ],
          },
          {
            title: 'Informasi',
            links: [
              { label: 'Galeri', url: '/galeri' },
              { label: 'Berita', url: '/berita' },
              { label: 'Kontak', url: '/kontak' },
            ],
          },
        ],
        socialLinks: [
          { platform: 'facebook', url: 'https://facebook.com' },
          { platform: 'whatsapp', url: `https://wa.me/${whatsapp}` },
        ],
        copyright: `© {year} ${siteName}. All rights reserved.`,
      }}
      contact={{ phone, address }}
    >
      <Hero
        slides={[
          {
            title: 'Panti Asuhan Anak Yatim Muhammadiyah',
            subtitle: 'Kisaran - Asahan, Sumatera Utara',
            image: '/images/panti/ramai2.jpeg',
            link: '/profil/tentang',
            linkLabel: 'Selengkapnya',
          },
          {
            title: 'Layanan Panti Putra & Putri',
            subtitle: 'Melayani anak yatim, piatu, dan fakir miskin',
            image: '/images/panti/ramai2.jpeg',
            link: '/layanan/putra',
            linkLabel: 'Lihat Layanan',
          },
          {
            title: 'Mari Bersedekah Bersama',
            subtitle: 'Bantu kami wujudkan kesejahteraan anak asuh',
            image: '/images/panti/ramai2.jpeg',
            link: '/donasi',
            linkLabel: 'Donasi Sekarang',
          },
        ]}
      />

      <Sekilas
        title="Sekilas Panti"
        cards={[
          {
            title: 'Visi & Misi',
            description: 'Berkembangnya Fungsi Pelayanan Sosial Muhammadiyah Dalam Mengentaskan Kemiskinan.',
            image: displayImages[0]?.src,
            link: '/profil/visi-misi',
            linkLabel: 'Lihat Detail',
          },
          {
            title: 'Kegiatan Pengajian',
            description: 'Kegiatan pengajian rutin anak-anak asuh untuk membentuk karakter religius.',
            image: displayImages[1]?.src,
            link: '/galeri',
            linkLabel: 'Lihat Galeri',
          },
          {
            title: 'Kegiatan Anak',
            description: 'Anak-anak asuh mendapatkan pembinaan dan kegiatan positif setiap harinya.',
            image: displayImages[4]?.src,
            link: '/galeri',
            linkLabel: 'Lihat Galeri',
          },
          {
            title: 'Mari Donasi',
            description: 'Bantu kami mewujudkan kesejahteraan sosial anak melalui donasi Anda.',
            image: displayImages[3]?.src,
            link: '/donasi',
            linkLabel: 'Donasi Sekarang',
          },
        ]}
      />

      <Statistics
        title="Panti Asuhan Dalam Angka"
        stats={[
          { value: '50+', label: 'Anak Asuh' },
          { value: '2', label: 'Gedung (Putra/Putri)' },
          { value: '10+', label: 'Tahun Berdiri' },
          { value: '100+', label: 'Donatur Aktif' },
        ]}
        columns="4"
      />

      <GalleryMasonry
        title="Galeri Kegiatan"
        subtitle="Dokumentasi kegiatan panti asuhan"
        images={displayImages.slice(0, 6)}
        columns="3"
      />

      {postsFormatted.length > 0 && (
        <LatestPosts
          title="Berita Terbaru"
          posts={postsFormatted}
          layout="grid"
          viewAllUrl="/berita"
        />
      )}

      <CTA
        title="Mari Bersedekah"
        description="Bantu kami mewujudkan kesejahteraan sosial anak yatim, piatu, fakir miskin, dan terlantar melalui donasi Anda."
        buttons={[
          { label: 'Donasi Sekarang', url: '/donasi', variant: 'primary' },
          { label: 'Hubungi Kami', url: '/kontak', variant: 'outline' },
        ]}
      />

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Informasi Donasi</h2>
            <p className="text-slate-600">Cara Berdonasi</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-sky-50 border border-sky-200 rounded-none p-6">
              <h3 className="font-bold text-sky-800 mb-3">Cara 1: Datang Langsung</h3>
              <p className="text-sm text-sky-700 mb-2">Anda bisa langsung datang ke panti asuhan:</p>
              <ul className="text-sm text-sky-700 space-y-1">
                <li>• Panti Asuhan Putra Muhammadiyah</li>
                <li>• Panti Asuhan Putri Muhammadiyah</li>
              </ul>
              <p className="text-sm text-sky-700 mt-2"><strong>Alamat:</strong> {address}</p>
            </div>

            <div className="bg-sky-50 border border-sky-200 rounded-none p-6">
              <h3 className="font-bold text-sky-800 mb-3">Cara 2: Transfer Bank</h3>
              <p className="text-sm text-sky-700 mb-2">Anda bisa mentransfer donasi ke rekening:</p>
              <div className="bg-white rounded-none p-4 mt-2">
                <p className="font-bold text-slate-900">{settings.bankName || 'Bank BNI'}</p>
                <p className="text-lg font-bold text-slate-900">{settings.bankAccountNumber || '3271 0102 4236 534'}</p>
                <p className="text-sm text-slate-600">a.n. {settings.bankAccountName || 'Panti Asuhan Muhammadiyah Asahan'}</p>
              </div>
              <p className="text-sm text-sky-700 mt-3">
                Setelah transfer, mohon konfirmasi ke Admin Rini: <strong>{phone}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton
        phone={whatsapp}
        message="Assalamualaikum...saya ingin mendapatkan informasi tentang panti asuhan muhammadiyah asahan, bisa dibantu?"
      />
    </FrontendLayout>
  )
}
