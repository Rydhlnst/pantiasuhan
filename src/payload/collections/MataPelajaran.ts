import type { CollectionConfig } from 'payload'
import { isAdmin } from '../../shared/access'
import { createdAtField, updatedAtField } from '../../shared/fields'

export const MataPelajaran: CollectionConfig = {
  slug: 'mata-pelajaran',
  labels: {
    singular: 'Mata Pelajaran',
    plural: 'Mata Pelajaran',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Data mata pelajaran',
    defaultColumns: ['name', 'category', 'guru', 'status'],
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
      label: 'Nama Mata Pelajaran',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Umum', value: 'general' },
        { label: 'Keagamaan', value: 'religious' },
        { label: 'Tahfidz', value: 'tahfidz' },
        { label: 'Kitab Kuning', value: 'kitab' },
        { label: 'Bahasa', value: 'language' },
        { label: 'Sains', value: 'science' },
        { label: 'Ekstrakurikuler', value: 'extracurricular' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'code',
      type: 'text',
      label: 'Kode Mata Pelajaran',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi',
    },
    {
      name: 'guru',
      type: 'relationship',
      relationTo: 'ustadz',
      label: 'Guru Pengajar',
      hasMany: true,
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Bobot Nilai (%)',
      admin: {
        description: 'Bobot untuk perhitungan rata-rata',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Aktif', value: 'active' },
        { label: 'Tidak Aktif', value: 'inactive' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    createdAtField,
    updatedAtField,
  ],
}
