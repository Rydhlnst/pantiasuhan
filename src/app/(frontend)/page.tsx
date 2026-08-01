import React from 'react'
import { FrontendLayout } from '@/components/frontend/FrontendLayout'
import { Hero } from '@/components/frontend/sections/Hero'
import { Sekilas } from '@/components/frontend/sections/Sekilas'
import { Statistics } from '@/components/frontend/sections/Statistics'
import { GalleryMasonry } from '@/components/frontend/sections/GalleryMasonry'
import { LatestPosts } from '@/components/frontend/sections/LatestPosts'
import { CTA } from '@/components/frontend/sections/CTA'
import { WhatsAppButton } from '@/components/frontend/WhatsAppButton'
import { fetchGlobal, fetchCollection, getMediaUrl } from '@/lib/payload-api'

async function getSettings() {
  try {
    const settings = await fetchGlobal<{ siteName?: string; contact?: { phone?: string; whatsapp?: string; address?: string }; donation?: { bankAccounts?: Array<{ bankName: string; accountNumber: string; accountName: string }>; donationInfo?: string }; organization?: { name?: string } }>('settings', { next: { revalidate: 60 } })
    return settings
  } catch {
    return null
  }
}

async function getMedia() {
  try {
    const media = await fetchCollection<{ id: string; url?: string; alt: string; caption?: string; category?: string }>('media', 'limit=20&sort=-createdAt', { next: { reveal: 60 } })
    return media.docs
  } catch {
    return []
  }
}

async function getPosts() {
  try {
    const posts = await fetchCollection<{ id: string; title: string; slug: string; excerpt?: string; publishedAt?: string; featuredImage?: string | { url: string } | null; category?: { name: string; slug: string } | null }>('posts', 'limit=3&sort=-publishedAt&where[status][equals]=published', { next: { revalidate: 60 } })
    return posts.docs
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [settings, media, posts] = await Promise.all([
    getSettings(),
    getMedia(),
    getPosts(),
  ])

  const siteName = settings?.siteName || 'Panti Asuhan Muhammadiyah Asahan'
  const phone = settings?.contact?.phone || '082175723169'
  const whatsapp = settings?.contact?.whatsapp || '6282175723169'
  const address = settings?.contact?.address || 'Jl. Setia Budi, Kel. Selawan, Kec. Kisaran Timur, Kab. Asahan, Prov. Sumatera Utara'

  const galleryImages = media
    .filter((m) => m.category === 'activity' || m.category === 'children' || m.category === 'building' || m.category === 'general')
    .map((m) => ({
      src: getMediaUrl(m.url),
      alt: m.alt,
      caption: m.caption || m.alt,
    }))

  const heroImages = media
    .filter((m) => m.category === 'building' || m.category === 'hero')
    .map((m) => ({
      title: m.alt,
      image: getMediaUrl(m.url),
    }))

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
    <FrontendLayout
      siteName={siteName}
      phone={phone}
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
      contact={{
        phone: phone,
        address: address,
      }}
    >
      <Hero
        slides={
          heroImages.length > 0
            ? heroImages.map((h, i) => ({
                title: h.title || 'Panti Asuhan Muhammadiyah Asahan',
                subtitle: 'Kisaran - Asahan, Sumatera Utara',
                image: h.image,
                link: i === 0 ? '/profil/tentang' : i === 1 ? '/donasi' : '/kontak',
                linkLabel: i === 0 ? 'Selengkapnya' : i === 1 ? 'Donasi Sekarang' : 'Hubungi Kami',
              }))
            : [
                {
                  title: 'Panti Asuhan Anak Yatim Muhammadiyah',
                  subtitle: 'Kisaran - Asahan, Sumatera Utara',
                  image: '/images/panti/gedung-putra.jpg',
                  link: '/profil/tentang',
                  linkLabel: 'Selengkapnya',
                },
              ]
        }
      />

      <Sekilas
        title="Sekilas Panti"
        cards={[
          {
            title: 'Visi & Misi',
            description: 'Berkembangnya Fungsi Pelayanan Sosial Muhammadiyah Dalam Mengentaskan Kemiskinan.',
            image: galleryImages.length > 0 ? galleryImages[0].src : '/images/panti/visi-misi.jpg',
            link: '/profil/visi-misi',
            linkLabel: 'Lihat Detail',
          },
          {
            title: 'Kegiatan Pengajian',
            description: 'Kegiatan pengajian rutin anak-anak asuh putri untuk membentuk karakter religius.',
            image: galleryImages.length > 1 ? galleryImages[1].src : '/images/panti/pengajian-putri.jpg',
            link: '/galeri',
            linkLabel: 'Lihat Galeri',
          },
          {
            title: 'Kegiatan Anak',
            description: 'Anak-anak asuh menerima bantuan pakaian dan perlengkapan.',
            image: galleryImages.length > 2 ? galleryImages[2].src : '/images/panti/anak-baju.jpg',
            link: '/galeri',
            linkLabel: 'Lihat Galeri',
          },
          {
            title: 'Mari Donasi',
            description: 'Bantu kami mewujudkan kesejahteraan sosial anak melalui donasi Anda.',
            image: galleryImages.length > 3 ? galleryImages[3].src : '/images/panti/kegiatan-berkebun.jpg',
            link: '/donasi',
            linkLabel: 'Donasi Sekarang',
          },
        ]}
      />

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                {settings?.organization?.name || siteName}
              </h2>
              <p className="text-slate-600 mb-4">
                Panti Asuhan Anak Yatim Putra/Putri Muhammadiyah Asahan adalah salah satu amal usaha Muhammadiyah yang bergerak di bidang pelayanan sosial anak.
              </p>
              <p className="text-slate-600 mb-4">
                Kami melayani anak yatim, piatu, fakir miskin, terlantar, dan penyandang masalah sosial dengan penuh kasih sayang dan kepedulian.
              </p>
              <p className="text-slate-600 mb-6">
                Lokasi kami berada di {address}.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-800 mb-2">Layanan Kami:</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Panti Asuhan Putra Muhammadiyah</li>
                  <li>• Panti Asuhan Putri Muhammadiyah</li>
                  <li>• Bisa langsung datang ke panti</li>
                  <li>• Transfer ke rekening panti</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">
                    Hubungi Admin Rini
                  </button>
                </a>
                <a href="/donasi">
                  <button className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-2 rounded-lg font-medium">
                    Donasi Sekarang
                  </button>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img
                  src={galleryImages.length > 0 ? galleryImages[0].src : '/images/panti/gedung-putra.jpg'}
                  alt="Panti Asuhan Putra"
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <span className="text-white text-sm font-medium">Panti Asuhan Putra</span>
                </div>
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img
                  src={galleryImages.length > 1 ? galleryImages[1].src : '/images/panti/gedung-putri.jpg'}
                  alt="Panti Asuhan Putri"
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <span className="text-white text-sm font-medium">Panti Asuhan Putri</span>
                </div>
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden col-span-2">
                <img
                  src={galleryImages.length > 2 ? galleryImages[2].src : '/images/panti/logo-lksa.jpg'}
                  alt="Logo LKSA"
                  className="object-contain w-full h-full bg-white p-4"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <span className="text-white text-sm font-medium">LKSA Panti Asuhan Muhammadiyah Asahan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section className="py-12 lg:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Visi & Misi</h2>
            <p className="text-slate-600">Landasan gerakan pelayanan sosial kami</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-green-700 mb-4">VISI</h3>
              <p className="text-slate-600 leading-relaxed">
                {settings?.organization?.vision || 'Berkembangnya Fungsi Pelayanan Sosial Muhammadiyah Dalam Mengentaskan Kemiskinan, meningkatkan Kualitas Hidup Masyarakat Dan Mewujudkan Masyarakat Yang Inklusif Melalui Sistem Yang Terencana Dan Terpadu Di Landasi Semangat Menegakkan Keadilan.'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-green-700 mb-4">MISI</h3>
              <ol className="space-y-3 text-slate-600">
                {settings?.organization?.mission && settings.organization.mission.length > 0
                  ? settings.organization.mission.map((m: { text: string }, i: number) => (
                      <li key={i} className="flex gap-3">
                        <span className="font-bold text-green-600">{String.fromCharCode(65 + i)}.</span>
                        <span>{m.text}</span>
                      </li>
                    ))
                  : (
                    <>
                      <li className="flex gap-3">
                        <span className="font-bold text-green-600">A.</span>
                        <span>Mewujudkan Kesejahteraan Sosial Anak Melalui Hak Dasar Anak.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-green-600">B.</span>
                        <span>Menjadikan Keluarga Pilar Utama Dalam Mewujudkan Kesejahteraan Sosial.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-green-600">C.</span>
                        <span>Memfasilitasi Keterlibatan Masyarakat Dalam Mewujudkan Kesejahteraan Sosial.</span>
                      </li>
                    </>
                  )}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {galleryImages.length > 0 && (
        <GalleryMasonry
          title="Galeri Kegiatan"
          subtitle="Dokumentasi kegiatan panti asuhan"
          images={galleryImages.slice(0, 12)}
          columns="3"
        />
      )}

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
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-green-800 mb-3">Cara 1: Datang Langsung</h3>
              <p className="text-sm text-green-700 mb-2">
                Anda bisa langsung datang ke panti asuhan:
              </p>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Panti Asuhan Putra Muhammadiyah</li>
                <li>• Panti Asuhan Putri Muhammadiyah</li>
              </ul>
              <p className="text-sm text-green-700 mt-2">
                <strong>Alamat:</strong> {address}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-blue-800 mb-3">Cara 2: Transfer Bank</h3>
              <p className="text-sm text-blue-700 mb-2">
                Anda bisa mentransfer donasi ke rekening:
              </p>
              {settings?.donation?.bankAccounts && settings.donation.bankAccounts.length > 0 ? (
                settings.donation.bankAccounts.map((bank, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 mt-2">
                    <p className="font-bold text-slate-900">{bank.bankName}</p>
                    <p className="text-lg font-bold text-slate-900">{bank.accountNumber}</p>
                    <p className="text-sm text-slate-600">a.n. {bank.accountName}</p>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg p-4 mt-2">
                  <p className="font-bold text-slate-900">Bank BNI</p>
                  <p className="text-lg font-bold text-slate-900">3271 0102 4236 534</p>
                  <p className="text-sm text-slate-600">a.n. Panti Asuhan Muhammadiyah Asahan</p>
                </div>
              )}
              <p className="text-sm text-blue-700 mt-3">
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
