import type { CollectionConfig } from 'payload'
import { isAdmin } from '../../shared/access'
import { createdAtField, updatedAtField } from '../../shared/fields'

export const KalenderAkademik: CollectionConfig = {
  slug: 'kalender-akademik',
  labels: {
    singular: 'Kalender Akademik',
    plural: 'Kalender Akademik',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Jadwal dan kalender akademik',
    defaultColumns: ['title', 'category', 'startDate', 'endDate'],
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
      label: 'Judul',
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
        { label: 'Pendaftaran', value: 'registration' },
        { label: 'Ujian', value: 'exam' },
        { label: 'Libur', value: 'holiday' },
        { label: 'Kegiatan', value: 'activity' },
        { label: 'Pembayaran', value: 'payment' },
        { label: 'Wisuda', value: 'graduation' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'academicYear',
      type: 'text',
      label: 'Tahun Ajaran',
      admin: {
        position: 'sidebar',
        description: 'contoh: 2024/2025',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      label: 'Tanggal Mulai',
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'Tanggal Selesai',
    },
    {
      name: 'isHoliday',
      type: 'checkbox',
      defaultValue: false,
      label: 'Hari Libur',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'richText',
      label: 'Catatan',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Dipublikasikan', value: 'published' },
        { label: 'Selesai', value: 'completed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    createdAtField,
    updatedAtField,
  ],
}
