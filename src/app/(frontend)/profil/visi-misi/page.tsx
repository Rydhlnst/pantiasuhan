import React from 'react'
import { Hero } from '@/components/frontend/sections/Hero'
import { CTA } from '@/components/frontend/sections/CTA'

export default function VisiMisiPage() {
  return (
    <>
      <Hero
        title="Visi & Misi"
        subtitle="Landasan gerakan pelayanan sosial Panti Asuhan Muhammadiyah Asahan"
        height="medium"
        overlay="dark"
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Visi</h2>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-none">
              <p className="text-lg text-slate-700 leading-relaxed">
                Berkembangnya Fungsi Pelayanan Sosial Muhammadiyah Dalam Mengentaskan Kemiskinan,
                meningkatkan Kualitas Hidup Masyarakat Dan Mewujudkan Masyarakat Yang Inklusif
                Melalui Sistem Yang Terencana Dan Terpadu Di Landasi Semangat Menegakkan Keadilan.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Misi</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white border rounded-none p-6 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-none flex items-center justify-center shrink-0">
                  <span className="text-blue-600 font-bold">A</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Kesejahteraan Sosial Anak</h3>
                  <p className="text-slate-600">Mewujudkan Kesejahteraan Sosial Anak Melalui Hak Dasar Anak.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white border rounded-none p-6 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-none flex items-center justify-center shrink-0">
                  <span className="text-blue-600 font-bold">B</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Keluarga sebagai Pilar Utama</h3>
                  <p className="text-slate-600">Menjadikan Keluarga Pilar Utama Dalam Mewujudkan Kesejahteraan Sosial.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white border rounded-none p-6 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-none flex items-center justify-center shrink-0">
                  <span className="text-blue-600 font-bold">C</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Keterlibatan Masyarakat</h3>
                  <p className="text-slate-600">Memfasilitasi Keterlibatan Masyarakat Dalam Mewujudkan Kesejahteraan Sosial.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-none p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Nilai-Nilai Kami</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span> Ikhlas dalam beramal
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span> Peduli sesama
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span> Gotong royong
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span> Amanah
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span> Profesional
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-none p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Prinsip Kerja</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span> Berbasis kebutuhan anak
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span> Berkelanjutan
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span> Partisipatif
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span> Transparan
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span> Akuntabel
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="Mari Wujudkan Kesejahteraan Anak"
        description="Bergabunglah bersama kami untuk mewujudkan hak-hak dasar anak."
        buttons={[
          { label: 'Donasi Sekarang', url: '/donasi', variant: 'primary' },
          { label: 'Hubungi Kami', url: '/kontak', variant: 'outline' },
        ]}
      />
    </>
  )
}



