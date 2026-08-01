import React from 'react'
import { Hero } from '@/components/frontend/sections/Hero'
import { CTA } from '@/components/frontend/sections/CTA'
import { Trophy, Zap, Shield, Music, Mic, BookOpen, Tent, Languages, Globe, Monitor, Crown, Dumbbell } from 'lucide-react'

export default function EkskulPage() {
  const ekskul = [
    { name: 'Sepak Bola', category: 'Olahraga', schedule: 'Senin & Rabu, 16:00-17:30', icon: Dumbbell },
    { name: 'Futsal', category: 'Olahraga', schedule: 'Selasa & Kamis, 16:00-17:30', icon: Zap },
    { name: 'Bela Diri', category: 'Olahraga', schedule: 'Senin & Kamis, 05:00-06:30', icon: Shield },
    { name: 'Rebana', category: 'Seni', schedule: 'Selasa & Jumat, 15:30-17:00', icon: Music },
    { name: 'Nasyid', category: 'Seni', schedule: 'Rabu & Sabtu, 15:30-17:00', icon: Mic },
    { name: 'Kaligrafi', category: 'Seni', schedule: 'Kamis, 15:30-17:00', icon: BookOpen },
    { name: 'Tilawah', category: 'Keagamaan', schedule: 'Setiap hari, 04:30-05:30', icon: BookOpen },
    { name: 'Pramuka', category: 'Kepemimpinan', schedule: 'Jumat, 14:00-16:00', icon: Tent },
    { name: 'Bahasa Arab', category: 'Bahasa', schedule: 'Senin & Rabu, 06:30-07:30', icon: Languages },
    { name: 'Bahasa Inggris', category: 'Bahasa', schedule: 'Selasa & Kamis, 06:30-07:30', icon: Globe },
    { name: 'Komputer & IT', category: 'Teknologi', schedule: 'Jumat, 10:00-12:00', icon: Monitor },
    { name: 'Kepemimpinan', category: 'Kepemimpinan', schedule: 'Sabtu, 08:00-10:00', icon: Crown },
  ]

  const categories = [...new Set(ekskul.map(e => e.category))]

  return (
    <>
      <Hero
        title="Ekstrakurikuler"
        subtitle="Kegiatan pengembangan diri di luar jam pelajaran."
        height="medium"
        overlay="dark"
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ekskul.filter(e => e.category === category).map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <div key={index} className="bg-white shadow-sm border p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-100 flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-slate-900">{item.name}</h3>
                      </div>
                      <p className="text-sm text-slate-500">{item.schedule}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTA
        title="Ikuti Kegiatan Favoritmu!"
        description="Kembangkan bakat dan minatmu di kegiatan ekstrakurikuler Al-Hikmah."
        buttons={[
          { label: 'Daftar Sekarang', url: '/pendaftaran', variant: 'primary' },
        ]}
      />
    </>
  )
}
