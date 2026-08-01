import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  admin: {
    useAsTitle: 'alt',
    description: 'Upload dan kelola gambar/foto panti asuhan',
    defaultColumns: ['alt', 'filename', 'mimeType', 'filesize', 'createdAt'],
  },
  upload: {
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 150,
        height: 150,
        position: 'centre',
      },
      {
        name: 'card',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1200,
        height: 600,
        position: 'centre',
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: {
        description: 'Deskripsi singkat gambar untuk aksesibilitas',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
      admin: {
        description: 'Keterangan gambar (opsional)',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategori',
      options: [
        { label: 'Umum', value: 'general' },
        { label: 'Gedung', value: 'building' },
        { label: 'Kegiatan', value: 'activity' },
        { label: 'Anak Asuh', value: 'children' },
        { label: 'Pengajian', value: 'religious' },
        { label: 'Donasi', value: 'donation' },
        { label: 'Logo', value: 'logo' },
        { label: 'Berita', value: 'news' },
      ],
      defaultValue: 'general',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
