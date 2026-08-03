import type { Metadata } from 'next'
import '@fontsource-variable/plus-jakarta-sans'
import { FrontendLayout } from '@/components/frontend/FrontendLayout'

const SITE_URL = 'https://pantiasuhan-mu.vercel.app'

export const metadata: Metadata = {
  title: {
    default: 'Panti Asuhan Muhammadiyah Asahan | Yatim & Piatu Kisaran',
    template: '%s | Panti Asuhan Muhammadiyah Asahan',
  },
  description:
    'Panti Asuhan Anak Yatim Putra/Putri Muhammadiyah Asahan di Kisaran, Sumatera Utara. Melayani anak yatim, piatu, fakir miskin, dan terlantar dengan penuh kasih sayang.',
  keywords: [
    'panti asuhan',
    'panti asuhan muhammadiyah',
    'panti asuhan kisaran',
    'panti asuhan asahan',
    'anak yatim',
    'piatu',
    'donasi',
    'sedekah',
    'kesejahteraan sosial',
    'muhammadiyah asahan',
  ],
  authors: [{ name: 'Panti Asuhan Muhammadiyah Asahan' }],
  creator: 'Panti Asuhan Muhammadiyah Asahan',
  publisher: 'Panti Asuhan Muhammadiyah Asahan',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE_URL,
    siteName: 'Panti Asuhan Muhammadiyah Asahan',
    title: 'Panti Asuhan Muhammadiyah Asahan | Yatim & Piatu Kisaran',
    description:
      'Panti Asuhan Anak Yatim Putra/Putri Muhammadiyah Asahan di Kisaran, Sumatera Utara. Melayani anak yatim, piatu, fakir miskin, dan terlantar.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Panti Asuhan Muhammadiyah Asahan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Panti Asuhan Muhammadiyah Asahan | Yatim & Piatu Kisaran',
    description:
      'Panti Asuhan Anak Yatim Putra/Putri Muhammadiyah Asahan di Kisaran, Sumatera Utara.',
    images: ['/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function FrontendRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FrontendLayout
      siteName="Panti Asuhan Muhammadiyah Asahan"
      navigation={[
        { label: 'Beranda', url: '/' },
        {
          label: 'Profil',
          url: '/profil',
          children: [
            { label: 'Tentang Kami', url: '/profil/tentang' },
            { label: 'Visi & Misi', url: '/profil/visi-misi' },
            { label: 'Sejarah', url: '/profil/sejarah' },
          ],
        },
        { label: 'Galeri', url: '/galeri' },
        { label: 'Berita', url: '/berita' },
        { label: 'Donasi', url: '/donasi' },
        { label: 'Kontak', url: '/kontak' },
      ]}
      footer={{
        columns: [
          {
            title: 'Tautan',
            links: [
              { label: 'Tentang Kami', url: '/profil/tentang' },
              { label: 'Visi & Misi', url: '/profil/visi-misi' },
              { label: 'Galeri', url: '/galeri' },
              { label: 'Berita', url: '/berita' },
            ],
          },
          {
            title: 'Layanan',
            links: [
              { label: 'Panti Putra', url: '/layanan/putra' },
              { label: 'Panti Putri', url: '/layanan/putri' },
              { label: 'Donasi', url: '/donasi' },
              { label: 'Kontak', url: '/kontak' },
            ],
          },
        ],
        socialLinks: [
          { platform: 'facebook', url: 'https://facebook.com' },
          { platform: 'whatsapp', url: 'https://wa.me/6282175723169' },
        ],
        copyright: '© {year} Panti Asuhan Muhammadiyah Asahan. All rights reserved.',
      }}
      contact={{
        phone: '082175723169',
        address: 'Jl. Setia Budi, Kel. Selawan, Kec. Kisaran Timur, Kab. Asahan, Prov. Sumatera Utara',
      }}
    >
      {children}
    </FrontendLayout>
  )
}

