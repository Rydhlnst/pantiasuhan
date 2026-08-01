import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Pengaturan Website',
  admin: {
    description: 'Pengaturan umum website Panti Asuhan',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Panti Asuhan Muhammadiyah Asahan',
      label: 'Nama Website',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      defaultValue: 'Panti Asuhan Anak Yatim Putra/Putri Muhammadiyah Kisaran - Asahan',
      label: 'Deskripsi Website',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      label: 'Favicon',
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Informasi Kontak',
      fields: [
        { name: 'email', type: 'email', label: 'Email' },
        { name: 'phone', type: 'text', label: 'No. HP Admin', defaultValue: '082175723169' },
        { name: 'phoneLabel', type: 'text', label: 'Label No. HP', defaultValue: 'Admin Rini' },
        { name: 'whatsapp', type: 'text', label: 'No. WhatsApp', defaultValue: '6282175723169' },
        { name: 'address', type: 'textarea', label: 'Alamat', defaultValue: 'Jl. Setia Budi, Kel. Selawan, Kec. Kisaran Timur, Kab. Asahan, Prov. Sumatera Utara' },
        {
          name: 'mapCoordinates',
          type: 'group',
          label: 'Koordinat Maps',
          fields: [
            { name: 'lat', type: 'text', label: 'Latitude' },
            { name: 'lng', type: 'text', label: 'Longitude' },
          ],
        },
      ],
    },
    {
      name: 'organization',
      type: 'group',
      label: 'Informasi Organisasi',
      fields: [
        { name: 'name', type: 'text', label: 'Nama Organisasi', defaultValue: 'Panti Asuhan Muhammadiyah Asahan' },
        { name: 'legalName', type: 'text', label: 'Nama Legal', defaultValue: 'Lembaga Kesejahteraan Sosial Anak (LKSA) Muhammadiyah Asahan' },
        { name: 'establishedYear', type: 'number', label: 'Tahun Berdiri' },
        {
          name: 'vision',
          type: 'textarea',
          label: 'Visi',
          defaultValue: 'Berkembangnya Fungsi Pelayanan Sosial Muhammadiyah Dalam Mengentaskan Kemiskinan, meningkatkan Kualitas Hidup Masyarakat Dan Mewujudkan Masyarakat Yang Inklusif Melalui Sistem Yang Terencana Dan Terpadu Di Landasi Semangat Menegakkan Keadilan.',
        },
        {
          name: 'mission',
          type: 'array',
          label: 'Misi',
          fields: [
            { name: 'text', type: 'textarea', required: true, label: 'Pernyataan Misi' },
          ],
          defaultValue: [
            { text: 'Mewujudkan Kesejahteraan Sosial Anak Melalui Hak Dasar Anak.' },
            { text: 'Menjadikan Keluarga Pilar Utama Dalam Mewujudkan Kesejahteraan Sosial.' },
            { text: 'Memfasilitasi Keterlibatan Masyarakat Dalam Mewujudkan Kesejahteraan Sosial.' },
          ],
        },
      ],
    },
    {
      name: 'donation',
      type: 'group',
      label: 'Informasi Donasi',
      fields: [
        {
          name: 'bankAccounts',
          type: 'array',
          label: 'Rekening Bank',
          fields: [
            { name: 'bankName', type: 'text', required: true, label: 'Nama Bank' },
            { name: 'accountNumber', type: 'text', required: true, label: 'Nomor Rekening' },
            { name: 'accountName', type: 'text', required: true, label: 'Atas Nama' },
          ],
          defaultValue: [
            {
              bankName: 'Bank BNI',
              accountNumber: '327101024236534',
              accountName: 'Panti Asuhan Muhammadiyah Asahan',
            },
          ],
        },
        {
          name: 'donationInfo',
          type: 'textarea',
          label: 'Informasi Donasi',
          defaultValue: 'Layanan panti bisa langsung datang ke panti asuhan putra atau putri atau bisa melalui transfer ke rekening panti.',
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Media Sosial',
      fields: [
        { name: 'facebook', type: 'text', label: 'Facebook URL' },
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
        { name: 'youtube', type: 'text', label: 'YouTube URL' },
        { name: 'tiktok', type: 'text', label: 'TikTok URL' },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      label: 'Analytics',
      fields: [
        {
          name: 'googleAnalyticsId',
          type: 'text',
          label: 'Google Analytics ID',
          admin: {
            description: 'Format: G-XXXXXXXXXX',
          },
        },
      ],
    },
  ],
}
