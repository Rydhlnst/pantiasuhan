import React from 'react'
import { Hero } from '@/components/frontend/sections/Hero'
import { Programs } from '@/components/frontend/sections/Programs'
import { CTA } from '@/components/frontend/sections/CTA'

export default function AkademikPage() {
  return (
    <>
      <Hero
        title="Program Akademik"
        subtitle="Pendidikan terpadu yang menggabungkan pesantren salaf dan kurikulum nasional."
        height="medium"
        overlay="dark"
        backgroundImage="/akademik-hero.jpg"
      />

      <Programs
        title="Program Tahfidz Quran"
        subtitle="Menghafal Al-Quran dengan metode Tahsin dan Tahfidz yang terbukti efektif."
        programs={[
          {
            title: 'Tahfidz Juz 30',
            slug: 'tahfidz-juz-30',
            excerpt: 'Program awal penghafalan Juz Amma dengan bimbingan ustadz khusus tahfidz.',
            category: 'Tahfidz',
          },
          {
            title: 'Tahfidz 5 Juz',
            slug: 'tahfidz-5-juz',
            excerpt: 'Program lanjutan untuk santri yang telah menyelesaikan Juz 30.',
            category: 'Tahfidz',
          },
          {
            title: 'Tahfidz 10 Juz',
            slug: 'tahfidz-10-juz',
            excerpt: 'Program intensif untuk mencapai hafalan 10 Juz.',
            category: 'Tahfidz',
          },
          {
            title: 'Tahfidz 30 Juz',
            slug: 'tahfidz-30-juz',
            excerpt: 'Program unggulan untuk mencapai predikat Hafidz/Hafidzah.',
            category: 'Tahfidz',
          },
        ]}
      />

      <Programs
        title="Kajian Kitab Kuning"
        subtitle="Melestarikan tradisi keilmuan Islam melalui kajian kitab-kitab klasik."
        programs={[
          {
            title: 'Shafinah An-Najah',
            slug: 'shafinah',
            excerpt: 'Kitab dasar fikih untuk pemula.',
            category: 'Kitab',
          },
          {
            title: 'Sullamul Munirq',
            slug: 'sullamul-munirq',
            excerpt: 'Kitab nahwu dasar untuk memahami tata bahasa Arab.',
            category: 'Kitab',
          },
          {
            title: 'Jurumiyah',
            slug: 'jurumiyah',
            excerpt: 'Kitab tata bahasa Arab tingkat lanjut.',
            category: 'Kitab',
          },
          {
            title: 'Fathul Bari',
            slug: 'fathul-bari',
            excerpt: 'Syarah (penjelasan) hadits Shahih Bukhari.',
            category: 'Kitab',
          },
        ]}
      />

      <Programs
        title="Kurikulum Nasional"
        subtitle="Pendidikan formal MTs/MA dengan standar nasional."
        programs={[
          {
            title: 'Madrasah Tsanawiyah (MTs)',
            slug: 'mtss',
            excerpt: 'Jenjang pendidikan setingkat SMP dengan kurikulum nasional plus pesantren.',
            category: 'Formal',
          },
          {
            title: 'Madrasah Aliyah (MA)',
            slug: 'maa',
            excerpt: 'Jenjang pendidikan setingkat SMA dengan kurikulum nasional plus pesantren.',
            category: 'Formal',
          },
          {
            title: 'Madrasah Aliyah Program Khusus (MAPK)',
            slug: 'mapk',
            excerpt: 'Program MA khusus dengan fokus tahfidz dan kitab kuning.',
            category: 'Formal',
          },
        ]}
      />

      <CTA
        title="Siap Belajar di Al-Hikmah?"
        description="Daftarkan putra/putri Anda sekarang dan raih masa depan cerah."
        buttons={[
          { label: 'Daftar Sekarang', url: '/pendaftaran', variant: 'primary' },
          { label: 'Lihat Kalender Akademik', url: '/akademik/kalender', variant: 'outline' },
        ]}
      />
    </>
  )
}
