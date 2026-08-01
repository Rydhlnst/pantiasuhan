import React from 'react'
import { Hero } from '@/components/frontend/sections/Hero'
import { CTA } from '@/components/frontend/sections/CTA'

export default function LayananPutriPage() {
  return (
    <>
      <Hero
        title="Panti Asuhan Putri"
        subtitle="Layanan pendidikan dan pengasuhan untuk anak yatim putri"
        height="medium"
        overlay="dark"
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Tentang Panti Putri</h2>
              <p className="text-slate-600 mb-4">
                Panti Asuhan Putri Muhammadiyah Asahan menampung dan mendidik anak-anak
                yatim, piatu, fakir miskin, dan terlantar dengan penuh kasih sayang.
              </p>
              <p className="text-slate-600 mb-4">
                Kami menyediakan pendidikan formal, pendidikan agama, dan pembinaan karakter
                untuk membentuk generasi yang beriman, bertakwa, dan berprestasi.
              </p>

              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-pink-800 mb-2">Fasilitas:</h3>
                <ul className="text-sm text-pink-700 space-y-1">
                  <li>• Asrama yang nyaman</li>
                  <li>• Ruang belajar</li>
                  <li>• Musholla</li>
                  <li>• Ruang seni</li>
                  <li>• Perpustakaan</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-2">Kegiatan:</h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Sholat berjamaah</li>
                  <li>• Tahfidz Quran</li>
                  <li>• Belajar kelompok</li>
                  <li>• Memasak</li>
                  <li>• Kegiatan ekstrakurikuler</li>
                </ul>
              </div>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden">
              <img
                src="/images/panti/gedung-putri.jpg"
                alt="Panti Asuhan Putri Muhammadiyah Asahan"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="Dukung Panti Putri"
        description="Bantu kami memberikan pendidikan terbaik untuk anak-anak asuh putri."
        buttons={[
          { label: 'Donasi Sekarang', url: '/donasi', variant: 'primary' },
          { label: 'Hubungi Kami', url: '/kontak', variant: 'outline' },
        ]}
      />
    </>
  )
}
