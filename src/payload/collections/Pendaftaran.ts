import type { CollectionConfig } from 'payload'
import { isAdmin } from '../../shared/access'
import { createdAtField } from '../../shared/fields'

export const Pendaftaran: CollectionConfig = {
  slug: 'pendaftaran',
  labels: {
    singular: 'Pendaftaran',
    plural: 'Pendaftaran',
  },
  admin: {
    useAsTitle: 'studentName',
    description: 'Pendaftaran santri baru',
    defaultColumns: ['studentName', 'phone', 'status', 'createdAt'],
  },
  access: {
    read: isAdmin,
    create: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'studentName',
      type: 'text',
      required: true,
      label: 'Nama Lengkap Calon Santri',
    },
    {
      name: 'nisn',
      type: 'text',
      label: 'NISN',
    },
    {
      name: 'gender',
      type: 'select',
      required: true,
      options: [
        { label: 'Laki-laki', value: 'male' },
        { label: 'Perempuan', value: 'female' },
      ],
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
      name: 'address',
      type: 'textarea',
      label: 'Alamat',
      required: true,
    },
    {
      name: 'previousSchool',
      type: 'text',
      label: 'Asal Sekolah',
    },
    {
      name: 'programChoice',
      type: 'select',
      required: true,
      options: [
        { label: 'Tsanawiyah (MTs)', value: 'tsanawiyah' },
        { label: 'Aliyah (MA)', value: 'aliyah' },
        { label: 'Tahfidz Quran', value: 'tahfidz' },
        { label: 'Kitab Kuning', value: 'kitab' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'parentName',
      type: 'text',
      required: true,
      label: 'Nama Orang Tua/Wali',
    },
    {
      name: 'parentPhone',
      type: 'text',
      required: true,
      label: 'No. HP Orang Tua',
    },
    {
      name: 'parentEmail',
      type: 'email',
      label: 'Email Orang Tua',
    },
    {
      name: 'parentOccupation',
      type: 'text',
      label: 'Pekerjaan Orang Tua',
    },
    {
      name: 'monthlyIncome',
      type: 'select',
      label: 'Penghasilan Bulanan',
      options: [
        { label: 'Kurang dari Rp 1.000.000', value: 'below-1m' },
        { label: 'Rp 1.000.000 - 3.000.000', value: '1m-3m' },
        { label: 'Rp 3.000.000 - 5.000.000', value: '3m-5m' },
        { label: 'Rp 5.000.000 - 10.000.000', value: '5m-10m' },
        { label: 'Lebih dari Rp 10.000.000', value: 'above-10m' },
      ],
    },
    {
      name: 'motivation',
      type: 'textarea',
      label: 'Motivasi Masuk Pesantren',
    },
    {
      name: 'specialNeeds',
      type: 'textarea',
      label: 'Kebutuhan Khusus (jika ada)',
    },
    {
      name: 'documents',
      type: 'array',
      label: 'Dokumen',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'file', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Baru', value: 'new' },
        { label: 'Ditinjau', value: 'reviewing' },
        { label: 'Wawancara', value: 'interview' },
        { label: 'Diterima', value: 'accepted' },
        { label: 'Ditolak', value: 'rejected' },
        { label: 'Dibatalkan', value: 'cancelled' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Catatan Internal',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    createdAtField,
  ],
}
