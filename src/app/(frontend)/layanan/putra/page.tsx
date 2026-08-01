import React from 'react'
import { Hero } from '@/components/frontend/sections/Hero'
import { CTA } from '@/components/frontend/sections/CTA'

export default function LayananPutraPage() {
  return (
    <>
      <Hero
        title="Panti Asuhan Putra"
        subtitle="Layanan pendidikan dan pengasuhan untuk anak yatim putra"
        height="medium"
        overlay="dark"
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Tentang Panti Putra</h2>
              <p className="text-slate-600 mb-4">
                Panti Asuhan Putra Muhammadiyah Asahan menampung dan mendidik anak-anak
                yatim, piatu, fakir miskin, dan terlantar dengan penuh kasih sayang.
              </p>
              <p className="text-slate-600 mb-4">
                Kami menyediakan pendidikan formal, pendidikan agama, dan pembinaan karakter
                untuk membentuk generasi yang beriman, bertakwa, dan berprestasi.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-none p-4 mb-6">
                <h3 className="font-semibold text-blue-800 mb-2">Fasilitas:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Asrama yang nyaman</li>
                  <li>• Ruang belajar</li>
                  <li>• Musholla</li>
                  <li>• Lapangan olahraga</li>
                  <li>• Perpustakaan</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-none p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Kegiatan:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Sholat berjamaah</li>
                  <li>• Tahfidz Quran</li>
                  <li>• Belajar kelompok</li>
                  <li>• Olahraga</li>
                  <li>• Kegiatan ekstrakurikuler</li>
                </ul>
              </div>
            </div>

            <div className="relative aspect-video rounded-none overflow-hidden">
              <img
                src="/images/panti/gedung-putra.jpg"
                alt="Panti Asuhan Putra Muhammadiyah Asahan"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="Dukung Panti Putra"
        description="Bantu kami memberikan pendidikan terbaik untuk anak-anak asuh putra."
        buttons={[
          { label: 'Donasi Sekarang', url: '/donasi', variant: 'primary' },
          { label: 'Hubungi Kami', url: '/kontak', variant: 'outline' },
        ]}
      />
    </>
  )
}



