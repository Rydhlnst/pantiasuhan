import React from 'react'
import { Hero } from '@/components/frontend/sections/Hero'
import { CTA } from '@/components/frontend/sections/CTA'

export default function SejarahPage() {
  return (
    <>
      <Hero
        title="Sejarah"
        subtitle="Perjalanan Panti Asuhan Muhammadiyah Asahan"
        height="medium"
        overlay="dark"
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2>Sejarah Berdirinya Panti Asuhan</h2>
            <p>
              Panti Asuhan Yatim Putra/Putri Muhammadiyah Asahan didirikan sebagai salah satu
              amal usaha Muhammadiyah cabang Asahan. Pendirian ini merupakan wujud nyata dari
              penerapan Firman Allah SWT yang tertera pada Al-Quran Surat Al-Ma&apos;un.
            </p>
            <p>
              Tujuan pendirian panti asuhan ini adalah agar anak yatim piatu, anak dhuafa
              dapat mengenyam pendidikan yang layak. Sehingga kelak diharapkan menjadi insan
              yang berfungsi di tengah-tengah masyarakat, berguna bagi agama, nusa, dan bangsa.
            </p>
            <p>
              Lokasi Panti Asuhan berada di tengah-tengah komunitas masyarakat, tepatnya di
              Jl. Setia Budi, Kel. Selawan, Kec. Kisaran Timur, Kab. Asahan, Prov. Sumatera Utara.
            </p>

            <h3>Perkembangan</h3>
            <p>
              Sejak berdiri, panti asuhan terus berkembang dan memberikan pelayanan terbaik
              bagi anak-anak asuh. Dengan dukungan dari para donatur, masyarakat, dan pemerintah
              daerah, kami terus meningkatkan kualitas pendidikan dan fasilitas.
            </p>
            <p>
              Saat ini, panti asuhan menampung puluhan anak asuh yang mendapatkan pendidikan
              formal, pendidikan agama, dan pembinaan karakter. Kami juga menyediakan asrama
              yang nyaman dan fasilitas yang memadai untuk mendukung kegiatan belajar dan
              kehidupan sehari-hari anak-anak asuh.
            </p>

            <h3>Pimpinan</h3>
            <p>
              Panti asuhan dipimpin oleh pengurus yang berkomitmen dan berdedikasi tinggi
              dalam melayani anak-anak asuh. Dibantu oleh ustadz/ustadzah yang berpengalaman
              dan tenaga kependidikan yang profesional.
            </p>
          </div>
        </div>
      </section>

      <CTA
        title="Bergabung Bersama Kami"
        description="Bantu kami melanjutkan sejarah kebaikan untuk anak-anak asuh."
        buttons={[
          { label: 'Donasi Sekarang', url: '/donasi', variant: 'primary' },
          { label: 'Hubungi Kami', url: '/kontak', variant: 'outline' },
        ]}
      />
    </>
  )
}


