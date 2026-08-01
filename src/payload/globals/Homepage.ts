import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: {
    description: 'Konfigurasi halaman utama',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'textarea',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'primaryButton',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
          ],
        },
        {
          name: 'secondaryButton',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'sections',
      type: 'blocks',
      label: 'Bagian Homepage',
      blocks: [
        {
          slug: 'about',
          label: 'Tentang Pesantren',
          fields: [
            { name: 'title', type: 'text', defaultValue: 'Tentang Pesantren' },
            { name: 'description', type: 'richText' },
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'buttonLabel', type: 'text' },
            { name: 'buttonUrl', type: 'text' },
          ],
        },
        {
          slug: 'programs',
          label: 'Program Unggulan',
          fields: [
            { name: 'title', type: 'text', defaultValue: 'Program Unggulan' },
            { name: 'subtitle', type: 'textarea' },
            { name: 'programs', type: 'relationship', relationTo: 'programs', hasMany: true },
            { name: 'maxItems', type: 'number', defaultValue: 6 },
          ],
        },
        {
          slug: 'statistics',
          label: 'Statistik',
          fields: [
            { name: 'title', type: 'text', defaultValue: 'Pesantren Dalam Angka' },
            { name: 'subtitle', type: 'textarea' },
          ],
        },
        {
          slug: 'testimonials',
          label: 'Testimoni',
          fields: [
            { name: 'title', type: 'text', defaultValue: 'Kata Mereka Tentang Kami' },
            { name: 'subtitle', type: 'textarea' },
          ],
        },
        {
          slug: 'gallery',
          label: 'Galeri',
          fields: [
            { name: 'title', type: 'text', defaultValue: 'Kegiatan Pesantren' },
            { name: 'subtitle', type: 'textarea' },
          ],
        },
        {
          slug: 'achievements',
          label: 'Prestasi',
          fields: [
            { name: 'title', type: 'text', defaultValue: 'Prestasi Terbaru' },
            { name: 'subtitle', type: 'textarea' },
            { name: 'maxItems', type: 'number', defaultValue: 6 },
          ],
        },
        {
          slug: 'latestNews',
          label: 'Berita Terbaru',
          fields: [
            { name: 'title', type: 'text', defaultValue: 'Berita & Informasi' },
            { name: 'subtitle', type: 'textarea' },
            { name: 'maxItems', type: 'number', defaultValue: 3 },
          ],
        },
        {
          slug: 'cta',
          label: 'Call to Action',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            { name: 'buttonLabel', type: 'text' },
            { name: 'buttonUrl', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Homepage',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
