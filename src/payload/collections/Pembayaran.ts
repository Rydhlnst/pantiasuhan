import type { CollectionConfig } from 'payload'
import { isAdmin } from '../../shared/access'
import { createdAtField, updatedAtField } from '../../shared/fields'

export const Pembayaran: CollectionConfig = {
  slug: 'pembayaran',
  labels: {
    singular: 'Pembayaran',
    plural: 'Pembayaran',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Data pembayaran SPP dan biaya lainnya',
    defaultColumns: ['title', 'category', 'amount', 'status'],
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul Pembayaran',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'SPP Bulanan', value: 'spp-monthly' },
        { label: 'SPP Semester', value: 'spp-semester' },
        { label: 'SPP Tahunan', value: 'spp-annual' },
        { label: 'Uang Masuk', value: 'entrance' },
        { label: 'Uang Pembangunan', value: 'development' },
        { label: 'Uang Seragam', value: 'uniform' },
        { label: 'Uang Asrama', value: 'dormitory' },
        { label: 'Uang Makan', value: 'meals' },
        { label: 'Uang Kegiatan', value: 'activities' },
        { label: 'Lainnya', value: 'other' },
      ],
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
      name: 'amount',
      type: 'number',
      required: true,
      label: 'Nominal (Rp)',
      admin: {
        description: 'Masukkan tanpa titik atau koma',
      },
    },
    {
      name: 'academicYear',
      type: 'text',
      label: 'Tahun Ajaran',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'dueDate',
      type: 'date',
      label: 'Batas Waktu',
    },
    {
      name: 'lateFee',
      type: 'number',
      label: 'Denda Keterlambatan (Rp)',
    },
    {
      name: 'paymentMethods',
      type: 'array',
      label: 'Cara Pembayaran',
      fields: [
        {
          name: 'method',
          type: 'select',
          required: true,
          options: [
            { label: 'Transfer Bank', value: 'bank' },
            { label: 'E-Wallet', value: 'ewallet' },
            { label: 'QRIS', value: 'qris' },
            { label: 'Tunai', value: 'cash' },
          ],
        },
        { name: 'bankName', type: 'text' },
        { name: 'accountNumber', type: 'text' },
        { name: 'accountName', type: 'text' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Aktif', value: 'active' },
        { label: 'Tidak Aktif', value: 'inactive' },
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
