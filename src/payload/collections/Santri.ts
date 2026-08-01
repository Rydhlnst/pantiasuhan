import type { CollectionConfig } from 'payload'
import { isAdmin } from '../../shared/access'
import { slugField, createdAtField, updatedAtField } from '../../shared/fields'

export const Santri: CollectionConfig = {
  slug: 'santri',
  labels: {
    singular: 'Santri',
    plural: 'Santri',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Data santri pondok pesantren',
    defaultColumns: ['name', 'nis', 'asrama', 'kelas', 'status'],
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
      name: 'nis',
      type: 'text',
      required: true,
      unique: true,
      label: 'NIS (Nomor Induk Santri)',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Profil',
    },
    {
      name: 'birthPlace',
      type: 'text',
      label: 'Tempat Lahir',
    },
    {
      name: 'birthDate',
      type: 'date',
      label: 'Tanggal Lahir',
    },
    {
      name: 'gender',
      type: 'select',
      options: [
        { label: 'Laki-laki', value: 'male' },
        { label: 'Perempuan', value: 'female' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Alamat Asal',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'No. HP Orang Tua',
    },
    {
      name: 'parentName',
      type: 'text',
      label: 'Nama Orang Tua/Wali',
    },
    {
      name: 'asrama',
      type: 'relationship',
      relationTo: 'asrama',
      label: 'Asrama',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'kelas',
      type: 'relationship',
      relationTo: 'kelas',
      label: 'Kelas',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'enrollmentDate',
      type: 'date',
      label: 'Tanggal Masuk',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'graduationDate',
      type: 'date',
      label: 'Tanggal Keluar/Lulus',
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
        { label: 'Cuti', value: 'leave' },
        { label: 'Lulus', value: 'graduated' },
        { label: 'Keluar', value: 'withdrawn' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'Profil Singkat',
    },
    {
      name: 'achievements',
      type: 'array',
      label: 'Prestasi',
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Prestasi' },
        { name: 'year', type: 'text', label: 'Tahun' },
        { name: 'level', type: 'select', options: [
          { label: 'Sekolah', value: 'school' },
          { label: 'Kabupaten', value: 'district' },
          { label: 'Provinsi', value: 'province' },
          { label: 'Nasional', value: 'national' },
          { label: 'Internasional', value: 'international' },
        ]},
      ],
    },
    createdAtField,
    updatedAtField,
  ],
}
