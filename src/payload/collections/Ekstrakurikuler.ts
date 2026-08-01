import type { CollectionConfig } from 'payload'
import { isAdmin } from '../../shared/access'
import { slugField, createdAtField, updatedAtField } from '../../shared/fields'

export const Ekstrakurikuler: CollectionConfig = {
  slug: 'ekstrakurikuler',
  labels: {
    singular: 'Ekstrakurikuler',
    plural: 'Ekstrakurikuler',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Kegiatan ekstrakurikuler pondok pesantren',
    defaultColumns: ['name', 'category', 'pembina', 'schedule', 'status'],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama Kegiatan',
    },
    slugField('name'),
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Olahraga', value: 'sports' },
        { label: 'Seni', value: 'arts' },
        { label: 'Keagamaan', value: 'religious' },
        { label: 'Kepemimpinan', value: 'leadership' },
        { label: 'Keterampilan', value: 'skills' },
        { label: 'Teknologi', value: 'technology' },
        { label: 'Bahasa', value: 'language' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Deskripsi',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Kegiatan',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galeri',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'pembina',
      type: 'relationship',
      relationTo: 'ustadz',
      label: 'Pembina',
      hasMany: true,
    },
    {
      name: 'schedule',
      type: 'text',
      label: 'Jadwal',
      admin: {
        description: 'contoh: Setiap Sabtu, 15:00 - 17:00',
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Tempat',
    },
    {
      name: 'maxParticipants',
      type: 'number',
      label: 'Maksimal Peserta',
    },
    {
      name: 'achievements',
      type: 'array',
      label: 'Prestasi',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'year', type: 'text' },
        { name: 'level', type: 'select', options: [
          { label: 'Sekolah', value: 'school' },
          { label: 'Kabupaten', value: 'district' },
          { label: 'Provinsi', value: 'province' },
          { label: 'Nasional', value: 'national' },
        ]},
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Aktif', value: 'active' },
        { label: 'Non-aktif', value: 'inactive' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    createdAtField,
    updatedAtField,
  ],
}
