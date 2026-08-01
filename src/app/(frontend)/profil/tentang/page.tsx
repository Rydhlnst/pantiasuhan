import React from 'react'
import { Hero } from '@/components/frontend/sections/Hero'
import { Statistics } from '@/components/frontend/sections/Statistics'
import { CTA } from '@/components/frontend/sections/CTA'

export default function TentangPage() {
  return (
    <>
      <Hero
        title="Tentang Kami"
        subtitle="Mengenal lebih dekat Panti Asuhan Muhammadiyah Asahan"
        height="medium"
        overlay="dark"
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Profil Panti Asuhan</h2>
          <p className="text-slate-600 mb-4 text-lg leading-relaxed">
            Panti Asuhan Yatim Putra/Putri Muhammadiyah Asahan adalah salah satu amal usaha
            Muhammadiyah yang bergerak di bidang pelayanan sosial anak. Kami melayani anak
            yatim, piatu, fakir miskin, terlantar, dan penyandang masalah sosial.
          </p>
          <p className="text-slate-600 mb-4 text-lg leading-relaxed">
            Berlokasi di Jl. Setia Budi, Kel. Selawan, Kec. Kisaran Timur, Kab. Asahan,
            Prov. Sumatera Utara, kami berkomitmen untuk memberikan pendidikan dan
            kehidupan yang layak bagi anak-anak asuh kami.
          </p>
          <p className="text-slate-600 mb-8 text-lg leading-relaxed">
            Dengan dukungan dari para donatur dan masyarakat, kami terus berupaya
            meningkatkan kualitas pelayanan dan fasilitas untuk anak-anak asuh.
          </p>

          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
              <h3 className="font-semibold text-green-800 mb-2">Layanan Kami:</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Panti Asuhan Putra Muhammadiyah</li>
                <li>• Panti Asuhan Putri Muhammadiyah</li>
                <li>• Pendidikan formal dan agama</li>
                <li>• Pembinaan karakter dan akhlak</li>
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
              <h3 className="font-semibold text-blue-800 mb-2">Kontak Kami:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Admin Rini: 082175723169</li>
                <li>• WhatsApp tersedia</li>
                <li>• Kunjungan langsung welcome</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img src="/images/panti/gedung-putra.jpg" alt="Panti Asuhan Putra" className="object-cover w-full h-full" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <span className="text-white text-sm font-medium">Panti Putra</span>
              </div>
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img src="/images/panti/gedung-putri.jpg" alt="Panti Asuhan Putri" className="object-cover w-full h-full" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <span className="text-white text-sm font-medium">Panti Putri</span>
              </div>
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img src="/images/panti/pengajian-putri.jpg" alt="Pengajian" className="object-cover w-full h-full" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <span className="text-white text-sm font-medium">Pengajian</span>
              </div>
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img src="/images/panti/kegiatan-1.jpg" alt="Kegiatan" className="object-cover w-full h-full" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <span className="text-white text-sm font-medium">Kegiatan</span>
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

      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Visi & Misi</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-green-700 mb-4">VISI</h3>
              <p className="text-slate-600 leading-relaxed">
                Berkembangnya Fungsi Pelayanan Sosial Muhammadiyah Dalam Mengentaskan
                Kemiskinan, meningkatkan Kualitas Hidup Masyarakat Dan Mewujudkan
                Masyarakat Yang Inklusif Melalui Sistem Yang Terencana Dan Terpadu
                Di Landasi Semangat Menegakkan Keadilan.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-green-700 mb-4">MISI</h3>
              <ol className="space-y-3 text-slate-600">
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
              </ol>
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="Bergabung Bersama Kami"
        description="Bantu kami mewujudkan kesejahteraan sosial anak yatim, piatu, fakir miskin, dan terlantar."
        buttons={[
          { label: 'Donasi Sekarang', url: '/donasi', variant: 'primary' },
          { label: 'Hubungi Kami', url: '/kontak', variant: 'outline' },
        ]}
      />
    </>
  )
}
