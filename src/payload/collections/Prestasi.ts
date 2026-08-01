import type { CollectionConfig } from 'payload'
import { isAdmin } from '../../shared/access'
import { createdAtField, updatedAtField } from '../../shared/fields'

export const Prestasi: CollectionConfig = {
  slug: 'prestasi',
  labels: {
    singular: 'Prestasi',
    plural: 'Prestasi',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Prestasi santri dan pesantren',
    defaultColumns: ['title', 'category', 'level', 'year'],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul Prestasi',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Akademik', value: 'academic' },
        { label: 'Tahfidz', value: 'tahfidz' },
        { label: 'Olahraga', value: 'sports' },
        { label: 'Seni', value: 'arts' },
        { label: 'Keagamaan', value: 'religious' },
        { label: 'Teknologi', value: 'technology' },
        { label: 'Kepemimpinan', value: 'leadership' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'level',
      type: 'select',
      required: true,
      options: [
        { label: 'Tingkat Pesantren', value: 'pesantren' },
        { label: 'Tingkat Kabupaten', value: 'district' },
        { label: 'Tingkat Provinsi', value: 'province' },
        { label: 'Tingkat Nasional', value: 'national' },
        { label: 'Tingkat Internasional', value: 'international' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'year',
      type: 'text',
      required: true,
      label: 'Tahun',
    },
    {
      name: 'event',
      type: 'text',
      label: 'Nama Event/Lomba',
    },
    {
      name: 'winner',
      type: 'text',
      label: 'Pemenang/Peserta',
      admin: {
        description: 'Nama santri atau kelompok',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto',
    },
    {
      name: 'certificate',
      type: 'upload',
      relationTo: 'media',
      label: 'Sertifikat',
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Tampilkan di halaman utama',
      },
    },
    createdAtField,
    updatedAtField,
  ],
}
