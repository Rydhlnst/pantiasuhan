import type { CollectionConfig } from 'payload'
import { isAdmin } from '../../shared/access'
import { createdAtField, updatedAtField } from '../../shared/fields'

export const Kelas: CollectionConfig = {
  slug: 'kelas',
  labels: {
    singular: 'Kelas',
    plural: 'Kelas',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Data kelas dan rombongan belajar',
    defaultColumns: ['name', 'level', 'waliKelas', 'jumlahSantri'],
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
      unique: true,
      label: 'Nama Kelas',
      admin: {
        description: 'contoh: VII-A, VIII-B, IX-A',
      },
    },
    {
      name: 'level',
      type: 'select',
      required: true,
      options: [
        { label: 'Tsanawiyah (MTs)', value: 'tsanawiyah' },
        { label: 'Aliyah (MA)', value: 'aliyah' },
        { label: 'Tahfidz', value: 'tahfidz' },
        { label: 'Kitab Kuning', value: 'kitab' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'grade',
      type: 'number',
      label: 'Tingkat',
      admin: {
        description: '7 = VII, 8 = VIII, 9 = IX, 10 = X, 11 = XI, 12 = XII',
        position: 'sidebar',
      },
    },
    {
      name: 'waliKelas',
      type: 'relationship',
      relationTo: 'ustadz',
      label: 'Wali Kelas',
    },
    {
      name: 'capacity',
      type: 'number',
      label: 'Kapasitas',
    },
    {
      name: 'jumlahSantri',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi',
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
