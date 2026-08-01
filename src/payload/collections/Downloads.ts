import type { CollectionConfig } from 'payload'
import { isAdmin } from '../../shared/access'
import { createdAtField, updatedAtField } from '../../shared/fields'

export const Downloads: CollectionConfig = {
  slug: 'downloads',
  labels: {
    singular: 'Download',
    plural: 'Downloads',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Manage downloadable files',
    defaultColumns: ['title', 'category', 'downloads', 'status'],
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
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Document', value: 'document' },
        { label: 'Form', value: 'form' },
        { label: 'Report', value: 'report' },
        { label: 'Brochure', value: 'brochure' },
        { label: 'Presentation', value: 'presentation' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'document',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'downloads',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    createdAtField,
    updatedAtField,
  ],
}
