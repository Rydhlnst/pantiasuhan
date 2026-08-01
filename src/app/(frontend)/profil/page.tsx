import React from 'react'
import { Hero } from '@/components/frontend/sections/Hero'
import { Statistics } from '@/components/frontend/sections/Statistics'
import { CTA } from '@/components/frontend/sections/CTA'

export default function ProfilPage() {
  return (
    <>
      <Hero
        title="Tentang Kami"
        subtitle="Mengenal lebih dekat Pondok Pesantren Al-Hikmah."
        height="medium"
        overlay="dark"
        backgroundImage="/profil-hero.jpg"
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Sejarah Singkat</h2>
              <p className="text-slate-600 mb-4">
                Pondok Pesantren Al-Hikmah didirikan pada tahun 2005 oleh KH. Abdullah Ahmad
                dengan visi menjadikan pusat pendidikan Islam terpadu yang menggabungkan
                tradisi pesantren salaf dengan kurikulum nasional modern.
              </p>
              <p className="text-slate-600 mb-4">
                Berawal dari sebuah surau kecil dengan 50 santri, kini Al-Hikmah telah berkembang
                menjadi pondok pesantren modern dengan lebih dari 1.200 santri aktif dan
                120 ustadz/ustadzah berkompeten.
              </p>
              <p className="text-slate-600">
                Selama 19 tahun perjalanan, kami telah meluluskan ribuan santri yang tersebar
                di berbagai bidang, dari ustadz/ustadzah, guru, dokter, insinyur, hingga
                pengusaha sukses yang tetap berpegang pada nilai-nilai keislaman.
              </p>
            </div>
            <div className="bg-slate-100 rounded-none p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-900 mb-2">19</div>
                  <div className="text-slate-600">Tahun Berdiri</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-900 mb-2">1.200+</div>
                  <div className="text-slate-600">Santri Aktif</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-900 mb-2">850+</div>
                  <div className="text-slate-600">Hafidz/Hafidzah</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-900 mb-2">5.000+</div>
                  <div className="text-slate-600">Alumni</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Visi</h2>
              <p className="text-slate-600 text-lg">
                Menjadi pondok pesantren unggulan yang menghasilkan lulusan hafidz Quran,
                menguasai kitab kuning, dan berprestasi di tingkat nasional serta berakhlak
                mulia dalam kehidupan sehari-hari.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Misi</h2>
              <ul className="space-y-3 text-slate-600 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1">✓</span>
                  Menyelenggarakan pendidikan tahfidz Quran yang berkualitas
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1">✓</span>
                  Melestarikan kajian kitab kuning dengan metode yang efektif
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1">✓</span>
                  Mengintegrasikan kurikulum nasional dengan program pesantren
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1">✓</span>
                  Membina karakter Islami dan akhlak mulia santri
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1">✓</span>
                  Mengembangkan potensi santri melalui kegiatan ekstrakurikuler
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Statistics
        title="Pesantren Dalam Angka"
        stats={[
          { value: '1.200+', label: 'Santri Aktif' },
          { value: '850+', label: 'Hafidz/Hafidzah' },
          { value: '120+', label: 'Ustadz/Ustadzah' },
          { value: '15', label: 'Asrama' },
          { value: '30+', label: 'Ekstrakurikuler' },
          { value: '5.000+', label: 'Alumni' },
        ]}
        columns="4"
      />

      <CTA
        title="Bergabung dengan Al-Hikmah"
        description="Jadilah bagian dari keluarga besar Pondok Pesantren Al-Hikmah."
        buttons={[
          { label: 'Daftar Sekarang', url: '/pendaftaran', variant: 'primary' },
          { label: 'Hubungi Kami', url: '/kontak', variant: 'outline' },
        ]}
      />
    </>
  )
}



