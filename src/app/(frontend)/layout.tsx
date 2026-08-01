import { FrontendLayout } from '@/components/frontend/FrontendLayout'
import { fetchGlobal } from '@/lib/payload-api'

async function getSettings() {
  try {
    const settings = await fetchGlobal<{
      siteName?: string
      contact?: {
        phone?: string
        phoneLabel?: string
        whatsapp?: string
        address?: string
      }
    }>('settings', { next: { revalidate: 60 } })
    return settings
  } catch {
    return null
  }
}

export default async function FrontendRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSettings()

  const siteName = settings?.siteName || 'Panti Asuhan Muhammadiyah Asahan'
  const phone = settings?.contact?.phone || '082175723169'
  const whatsapp = settings?.contact?.whatsapp || '6282175723169'
  const address = settings?.contact?.address || 'Jl. Setia Budi, Kel. Selawan, Kec. Kisaran Timur, Kab. Asahan, Prov. Sumatera Utara'

  return (
    <FrontendLayout
      siteName={siteName}
      phone={phone}
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
            title: 'Profil',
            links: [
              { label: 'Tentang Kami', url: '/profil/tentang' },
              { label: 'Visi & Misi', url: '/profil/visi-misi' },
              { label: 'Sejarah', url: '/profil/sejarah' },
            ],
          },
          {
            title: 'Layanan',
            links: [
              { label: 'Panti Putra', url: '/layanan/putra' },
              { label: 'Panti Putri', url: '/layanan/putri' },
              { label: 'Cara Donasi', url: '/donasi' },
            ],
          },
          {
            title: 'Informasi',
            links: [
              { label: 'Galeri', url: '/galeri' },
              { label: 'Berita', url: '/berita' },
              { label: 'Kontak', url: '/kontak' },
            ],
          },
        ],
        socialLinks: [
          { platform: 'facebook', url: 'https://facebook.com' },
          { platform: 'whatsapp', url: `https://wa.me/${whatsapp}` },
        ],
        copyright: `© {year} ${siteName}. All rights reserved.`,
      }}
      contact={{
        phone: phone,
        address: address,
      }}
    >
      {children}
    </FrontendLayout>
  )
}
