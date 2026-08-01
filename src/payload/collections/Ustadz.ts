import type { CollectionConfig } from 'payload'
import { isAdmin } from '../../shared/access'
import { slugField, createdAtField, updatedAtField } from '../../shared/fields'

export const Ustadz: CollectionConfig = {
  slug: 'ustadz',
  labels: {
    singular: 'Ustadz/Ustadzah',
    plural: 'Ustadz/Ustadzah',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Data pengajar dan pembimbing',
    defaultColumns: ['name', 'position', 'department', 'status'],
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
      label: 'Nama Lengkap',
    },
    slugField('name'),
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Profil',
    },
    {
      name: 'position',
      type: 'text',
      required: true,
      label: 'Jabatan',
      admin: {
        description: 'contoh: Kepala Madrasah, Ustadz Tahfidz, Guru Fiqih',
      },
    },
    {
      name: 'department',
      type: 'select',
      options: [
        { label: 'Pimpinan', value: 'leadership' },
        { label: 'Tahfidz Quran', value: 'tahfidz' },
        { label: 'Kitab Kuning', value: 'kitab-kuning' },
        { label: 'Umum', value: 'general' },
        { label: 'Bahasa Arab', value: 'arabic' },
        { label: 'Bahasa Inggris', value: 'english' },
        { label: 'Sains & Matematika', value: 'science' },
        { label: 'Keagamaan', value: 'religious' },
        { label: 'Olahraga', value: 'sports' },
        { label: 'Seni & Budaya', value: 'arts' },
        { label: 'Konseling', value: 'counseling' },
        { label: 'Tata Usaha', value: 'administration' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'specialization',
      type: 'text',
      label: 'Spesialisasi',
      admin: {
        description: 'contoh: Tahfidz Juz 30, Kitab Fathul Bari',
      },
    },
    {
      name: 'education',
      type: 'text',
      label: 'Pendidikan Terakhir',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'No. HP',
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'Profil Singkat',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Urutan tampil',
      },
    },
    {
      name: 'isLeadership',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Tampilkan di bagian pimpinan',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Aktif', value: 'active' },
        { label: 'Cuti', value: 'leave' },
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
