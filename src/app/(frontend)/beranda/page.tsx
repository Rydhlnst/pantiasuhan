import React from 'react'
import { Hero } from '@/components/frontend/sections/Hero'
import { Sekilas } from '@/components/frontend/sections/Sekilas'
import { Statistics } from '@/components/frontend/sections/Statistics'
import { GalleryMasonry } from '@/components/frontend/sections/GalleryMasonry'
import { LatestPosts } from '@/components/frontend/sections/LatestPosts'
import { CTA } from '@/components/frontend/sections/CTA'
import { BadanUsaha } from '@/components/frontend/sections/BadanUsaha'
import { WhatsAppButton } from '@/components/frontend/WhatsAppButton'
import { Building, MapPin } from 'lucide-react'

export default function BerandaPage() {
  return (
    <>
      <Hero
        slides={[
          {
            title: 'Panti Asuhan Anak Yatim Muhammadiyah',
            subtitle: 'Kisaran - Asahan, Sumatera Utara',
            description: 'Melayani anak yatim, piatu, fakir miskin, terlantar dengan penuh kasih sayang',
            image: '/images/panti/ramai2.jpeg',
            link: '/profil/tentang',
            linkLabel: 'Selengkapnya',
          },
          {
            title: 'Penerimaan Bantuan Anak Asuh',
            subtitle: 'Bersama mewujudkan kesejahteraan anak',
            image: '/images/panti/ramai2.jpeg',
            link: '/donasi',
            linkLabel: 'Donasi Sekarang',
          },
          {
            title: 'Mari Bersedekah Bersama',
            subtitle: 'Bantu kami mewujudkan kesejahteraan anak yatim',
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
            image: '/images/panti/WhatsApp Image 2026-07-31 at 22.01.38.jpeg',
            link: '/profil/visi-misi',
            linkLabel: 'Lihat Detail',
          },
          {
            title: 'Kegiatan Pengajian',
            description: 'Kegiatan pengajian rutin anak-anak asuh putri untuk membentuk karakter religius.',
            image: '/images/panti/WhatsApp Image 2026-07-31 at 22.01.39 (1).jpeg',
            link: '/galeri',
            linkLabel: 'Lihat Galeri',
          },
          {
            title: 'Penerimaan Bantuan',
            description: 'Anak-anak asuh menerima bantuan pakaian dan perlengkapan.',
            image: '/images/panti/WhatsApp Image 2026-07-31 at 22.01.39 (2).jpeg',
            link: '/galeri',
            linkLabel: 'Lihat Galeri',
          },
          {
            title: 'Mari Donasi',
            description: 'Bantu kami mewujudkan kesejahteraan sosial anak melalui donasi Anda.',
            image: '/images/panti/WhatsApp Image 2026-07-31 at 22.01.40.jpeg',
            link: '/donasi',
            linkLabel: 'Donasi Sekarang',
          },
        ]}
      />

      {/* About Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <span className="inline-block bg-[#1e3a5f] text-white text-xs font-semibold px-3 py-1 rounded-none mb-4">Tentang Kami</span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Panti Asuhan Muhammadiyah Asahan
              </h2>
              <p className="text-slate-600 mb-4">
                Panti Asuhan Anak Yatim Putra/Putri Muhammadiyah Asahan adalah salah satu amal usaha Muhammadiyah yang bergerak di bidang pelayanan sosial anak.
              </p>
              <p className="text-slate-600 mb-6">
                Kami melayani anak yatim, piatu, fakir miskin, terlantar, dan penyandang masalah sosial dengan penuh kasih sayang dan kepedulian.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/6282175723169" target="_blank" rel="noopener noreferrer">
                  <button className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white px-6 py-2.5 rounded-none font-medium transition-colors shadow-lg">
                    Hubungi Admin Rini
                  </button>
                </a>
                <a href="/donasi">
                  <button className="bg-white border border-[#1e3a5f]/20 text-[#1e3a5f] hover:bg-slate-50 px-6 py-2.5 rounded-none font-medium transition-colors">
                    Donasi Sekarang
                  </button>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-none overflow-hidden shadow-lg">
                <img src="/images/panti/WhatsApp Image 2026-07-31 at 22.01.38.jpeg" alt="Panti Putra" className="object-cover w-full h-full" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <span className="text-white text-sm font-medium">Panti Putra</span>
                </div>
              </div>
              <div className="relative aspect-square rounded-none overflow-hidden shadow-lg">
                <img src="/images/panti/WhatsApp Image 2026-07-31 at 22.01.38 (1).jpeg" alt="Panti Putri" className="object-cover w-full h-full" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <span className="text-white text-sm font-medium">Panti Putri</span>
                </div>
              </div>
              <div className="relative aspect-square rounded-none overflow-hidden shadow-lg col-span-2">
                <img src="/images/panti/WhatsApp Image 2026-07-31 at 22.01.39 (1).jpeg" alt="Kegiatan" className="object-cover w-full h-full" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <span className="text-white text-sm font-medium">Kegiatan Anak Asuh</span>
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

      {/* Visi Misi - Dark section */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#1e3a5f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-none mb-4 backdrop-blur-sm">Landasan Kami</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Visi & Misi</h2>
            <div className="w-12 h-1 bg-white/60 mx-auto mt-3" />
          </div>
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-none p-6 md:p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">VISI</h3>
              <p className="text-white/80 leading-relaxed">
                Berkembangnya Fungsi Pelayanan Sosial Muhammadiyah Dalam Mengentaskan Kemiskinan, meningkatkan Kualitas Hidup Masyarakat Dan Mewujudkan Masyarakat Yang Inklusif Melalui Sistem Yang Terencana Dan Terpadu Di Landasi Semangat Menegakkan Keadilan.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-none p-6 md:p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">MISI</h3>
              <ol className="space-y-4 text-white/80">
                <li className="flex gap-3">
                  <span className="font-bold text-white text-lg">A.</span>
                  <span>Mewujudkan Kesejahteraan Sosial Anak Melalui Hak Dasar Anak.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-white text-lg">B.</span>
                  <span>Menjadikan Keluarga Pilar Utama Dalam Mewujudkan Kesejahteraan Sosial.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-white text-lg">C.</span>
                  <span>Memfasilitasi Keterlibatan Masyarakat Dalam Mewujudkan Kesejahteraan Sosial.</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <GalleryMasonry
        title="Galeri Kegiatan"
        subtitle="Dokumentasi kegiatan panti asuhan"
        images={[
          { src: '/images/panti/WhatsApp Image 2026-07-31 at 22.01.38.jpeg', alt: 'Gedung Panti Putra', caption: 'Gedung Panti Putra' },
          { src: '/images/panti/WhatsApp Image 2026-07-31 at 22.01.39.jpeg', alt: 'Gedung Panti Putri', caption: 'Gedung Panti Putri' },
          { src: '/images/panti/WhatsApp Image 2026-07-31 at 22.01.38 (1).jpeg', alt: 'Panti Putri', caption: 'Panti Asuhan Putri' },
          { src: '/images/panti/WhatsApp Image 2026-07-31 at 22.01.39 (1).jpeg', alt: 'Pengajian Putri', caption: 'Kegiatan Pengajian' },
          { src: '/images/panti/WhatsApp Image 2026-07-31 at 22.01.39 (2).jpeg', alt: 'Penerimaan Bantuan', caption: 'Penerimaan Bantuan' },
          { src: '/images/panti/WhatsApp Image 2026-07-31 at 22.01.40.jpeg', alt: 'Kegiatan Berkebun', caption: 'Kegiatan Berkebun' },
        ]}
        columns="3"
      />

      <LatestPosts
        title="Berita Terbaru"
        posts={[
          {
            title: 'Kegiatan Rutin Pengajian Anak Asuh',
            slug: 'kegiatan-pengajian',
            excerpt: 'Kegiatan pengajian rutin dilaksanakan setiap hari untuk membentuk karakter religius anak-anak.',
            publishedAt: '2024-01-15',
            category: { name: 'Kegiatan', slug: 'kegiatan' },
          },
          {
            title: 'Bantuan Pakaian untuk Anak Asuh',
            slug: 'bantuan-pakaian',
            excerpt: 'Penerimaan bantuan berupa pakaian untuk anak-anak asuh panti.',
            publishedAt: '2024-01-10',
            category: { name: 'Bantuan', slug: 'bantuan' },
          },
          {
            title: 'Kegiatan Berkebun Anak Asuh',
            slug: 'kegiatan-berkebun',
            excerpt: 'Kegiatan positif anak-anak asuh dalam belajar berkebun dan pertanian.',
            publishedAt: '2024-01-05',
            category: { name: 'Kegiatan', slug: 'kegiatan' },
          },
        ]}
        layout="grid"
        viewAllUrl="/berita"
      />

      {/* Donasi Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#1e3a5f] text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10 blur-lg" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Mari Bersedekah</h2>
          <div className="w-12 h-1 bg-white/60 mx-auto mb-4" />
          <p className="text-white/80 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Bantu kami mewujudkan kesejahteraan sosial anak yatim, piatu, fakir miskin, dan terlantar melalui donasi Anda.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/donasi" className="bg-white text-[#1e3a5f] hover:bg-white/90 px-8 py-3 rounded-none font-semibold transition-colors shadow-lg">
              Donasi Sekarang
            </a>
            <a href="/kontak" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-none font-semibold transition-colors">
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>

      {/* Info Donasi */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <span className="inline-block bg-[#1e3a5f] text-white text-xs font-semibold px-3 py-1 rounded-none mb-4">Donasi</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Informasi Donasi</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-none p-6 shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-[#1e3a5f]/10 flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-[#1e3a5f]" />
              </div>
              <h3 className="font-bold text-slate-900 mb-3">Transfer Bank</h3>
              <div className="bg-slate-50 rounded-none p-4">
                <p className="font-bold text-slate-900">Bank BRI</p>
                <p className="text-xl font-bold text-[#1e3a5f]">3271 0102 4236 534</p>
                <p className="text-sm text-slate-500">a.n. Panti Asuhan Muhammadiyah Asahan</p>
              </div>
              <p className="text-sm text-slate-500 mt-3">Setelah transfer, konfirmasi ke Admin Rini: 082175723169</p>
            </div>
            <div className="bg-white rounded-none p-6 shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-green-50 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-3">Datang Langsung</h3>
              <p className="text-slate-600 mb-3">Anda bisa langsung datang ke:</p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#1e3a5f] rounded-none"></span>
                  Panti Asuhan Putra Muhammadiyah
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-none"></span>
                  Panti Asuhan Putri Muhammadiyah
                </li>
              </ul>
              <p className="text-sm text-slate-500 mt-3">
                Jl. Setia Budi, Kel. Selawan, Kec. Kisaran Timur, Kab. Asahan
              </p>
            </div>
          </div>
        </div>
      </section>

      <BadanUsaha
        sponsors={[
          '/images/sponsors/sponsor-1.jpeg',
          '/images/sponsors/sponsor-2.jpeg',
        ]}
        warungImage="/images/panti/warung.jpeg"
        depotImage="/images/panti/depotair.jpeg"
        papanBungaImage="/images/panti/image.png"
      />

      <WhatsAppButton
        phone="6282175723169"
        message="Assalamualaikum...saya ingin mendapatkan informasi tentang panti asuhan muhammadiyah asahan, bisa dibantu?"
      />
    </>
  )
}