import type { Metadata } from 'next'
import '@fontsource-variable/plus-jakarta-sans'
import '../globals.css'
import { FrontendLayout } from '@/components/frontend/FrontendLayout'

export const metadata: Metadata = {
  title: {
    default: 'Panti Asuhan Muhammadiyah Asahan',
    template: '%s | Panti Asuhan Muhammadiyah Asahan',
  },
  description: 'Panti Asuhan Anak Yatim Putra/Putri Muhammadiyah Kisaran - Asahan',
}

export default function FrontendRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning className="bg-background text-foreground font-sans antialiased">
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
      </body>
    </html>
  )
}

