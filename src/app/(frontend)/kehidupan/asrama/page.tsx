import React from 'react'
import { Hero } from '@/components/frontend/sections/Hero'
import { CTA } from '@/components/frontend/sections/CTA'

export default function AsramaPage() {
  const asrama = [
    { name: 'Asrama Al-Falah', gender: 'Putra', capacity: 120, pengurus: 'Ust. H. Ahmad Supriyadi', facilities: ['Ruang Belajar', 'Kamar Mandi', 'Musholla', 'Kantin'] },
    { name: 'Asrama Al-Ikhlas', gender: 'Putra', capacity: 100, pengurus: 'Ust. Muhammad Fadilah', facilities: ['Ruang Belajar', 'Kamar Mandi', 'Musholla'] },
    { name: 'Asrama An-Nur', gender: 'Putri', capacity: 100, pengurus: 'Ustdz. Siti Aminah', facilities: ['Ruang Belajar', 'Kamar Mandi', 'Musholla', 'Ruang Seni'] },
    { name: 'Asrama Ar-Rahman', gender: 'Putri', capacity: 80, pengurus: 'Ustdz. Nur Hidayah', facilities: ['Ruang Belajar', 'Kamar Mandi', 'Musholla'] },
  ]

  return (
    <>
      <Hero
        title="Kehidupan Asrama"
        subtitle="Lingkungan asrama yang kondusif untuk belajar dan menghafal Al-Quran."
        height="medium"
        overlay="dark"
        backgroundImage="/asrama-hero.jpg"
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Asrama Pondok Pesantren</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Santri tinggal di asrama yang diawasi oleh ustadz/ustadzah pembina.
              Setiap asrama memiliki suasana kekeluargaan yang mendukung proses belajar dan menghafal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {asrama.map((item, index) => (
              <div key={index} className="bg-white rounded-none shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900">{item.name}</h3>
                  <span className={`px-3 py-1 rounded-none text-sm font-medium ${item.gender === 'Putra' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                    {item.gender}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-slate-600 mb-4">
                  <p><strong>Pengurus:</strong> {item.pengurus}</p>
                  <p><strong>Kapasitas:</strong> {item.capacity} santri</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-2">Fasilitas:</p>
                  <div className="flex flex-wrap gap-2">
                    {item.facilities.map((f, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Ingin Menjadi Santri?"
        description="Daftarkan diri Anda dan rasakan kehidupan asrama yang penuh keberkahan."
        buttons={[
          { label: 'Daftar Sekarang', url: '/pendaftaran', variant: 'primary' },
        ]}
      />
    </>
  )
}


