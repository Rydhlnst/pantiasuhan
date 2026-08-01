import type { CollectionConfig } from 'payload'
import { isAdmin } from '../../shared/access'
import { createdAtField, updatedAtField } from '../../shared/fields'

export const Asrama: CollectionConfig = {
  slug: 'asrama',
  labels: {
    singular: 'Asrama',
    plural: 'Asrama',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Data asrama pondok pesantren',
    defaultColumns: ['name', 'gender', 'capacity', 'pengurus', 'status'],
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
      label: 'Nama Asrama',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'gender',
      type: 'select',
      required: true,
      options: [
        { label: 'Putra', value: 'male' },
        { label: 'Putri', value: 'female' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'capacity',
      type: 'number',
      label: 'Kapasitas',
    },
    {
      name: 'currentOccupancy',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'pengurus',
      type: 'relationship',
      relationTo: 'ustadz',
      label: 'Pengurus Asrama',
      admin: {
        description: 'Ustadz/Ustadzah yang mengurus asrama',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Asrama',
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
      name: 'facilities',
      type: 'array',
      label: 'Fasilitas',
      fields: [
        { name: 'name', type: 'text', required: true },
      ],
    },
    {
      name: 'rules',
      type: 'richText',
      label: 'Tata Tertib Asrama',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Deskripsi',
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
        { label: 'Renovasi', value: 'renovation' },
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
