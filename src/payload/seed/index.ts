import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding database...')

  const adminUser = await payload.create({
    collection: 'users',
    data: {
      name: 'Admin Rini',
      email: 'admin@pantiasuhan-asahan.id',
      password: 'admin123',
      role: 'super-admin',
      status: 'active',
    },
  })

  console.log('Admin user created:', adminUser.email)

  await payload.updateGlobal({
    slug: 'settings',
    data: {
      siteName: 'Panti Asuhan Muhammadiyah Asahan',
      siteDescription: 'Panti Asuhan Anak Yatim Putra/Putri Muhammadiyah Kisaran - Asahan',
      contact: {
        email: 'info@pantiasuhan-asahan.id',
        phone: '082175723169',
        phoneLabel: 'Admin Rini',
        whatsapp: '6282175723169',
        address: 'Jl. Setia Budi, Kel. Selawan, Kec. Kisaran Timur, Kab. Asahan, Prov. Sumatera Utara',
      },
      organization: {
        name: 'Panti Asuhan Muhammadiyah Asahan',
        legalName: 'Lembaga Kesejahteraan Sosial Anak (LKSA) Muhammadiyah Asahan',
        vision: 'Berkembangnya Fungsi Pelayanan Sosial Muhammadiyah Dalam Mengentaskan Kemiskinan, meningkatkan Kualitas Hidup Masyarakat Dan Mewujudkan Masyarakat Yang Inklusif Melalui Sistem Yang Terencana Dan Terpadu Di Landasi Semangat Menegakkan Keadilan.',
        mission: [
          { text: 'Mewujudkan Kesejahteraan Sosial Anak Melalui Hak Dasar Anak.' },
          { text: 'Menjadikan Keluarga Pilar Utama Dalam Mewujudkan Kesejahteraan Sosial.' },
          { text: 'Memfasilitasi Keterlibatan Masyarakat Dalam Mewujudkan Kesejahteraan Sosial.' },
        ],
      },
      donation: {
        bankAccounts: [
          {
            bankName: 'Bank BNI',
            accountNumber: '327101024236534',
            accountName: 'Panti Asuhan Muhammadiyah Asahan',
          },
        ],
        donationInfo: 'Layanan panti bisa langsung datang ke panti asuhan putra atau putri atau bisa melalui transfer ke rekening panti.',
      },
    },
  })

  console.log('Settings seeded')

  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      header: [
        { label: 'Beranda', type: 'link', url: '/' },
        {
          label: 'Profil',
          type: 'link',
          url: '/profil',
          children: [
            { label: 'Tentang Kami', url: '/profil/tentang' },
            { label: 'Visi & Misi', url: '/profil/visi-misi' },
            { label: 'Sejarah', url: '/profil/sejarah' },
          ],
        },
        { label: 'Galeri', type: 'link', url: '/galeri' },
        { label: 'Berita', type: 'link', url: '/berita' },
        { label: 'Donasi', type: 'link', url: '/donasi' },
        { label: 'Kontak', type: 'link', url: '/kontak' },
      ],
    },
  })

  console.log('Navigation seeded')

  await payload.updateGlobal({
    slug: 'footer',
    data: {
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
      copyright: '© {year} Panti Asuhan Muhammadiyah Asahan. All rights reserved.',
    },
  })

  console.log('Footer seeded')

  console.log('Seed completed!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
