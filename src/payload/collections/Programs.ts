import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../../shared/access'
import { slugField, seoField, createdAtField, updatedAtField } from '../../shared/fields'

export const Programs: CollectionConfig = {
  slug: 'programs',
  labels: {
    singular: 'Program',
    plural: 'Programs',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Manage programs and activities',
    defaultColumns: ['title', 'category', 'status', 'startDate'],
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField('title'),
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Brief description of the program',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Education', value: 'education' },
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Recreation', value: 'recreation' },
        { label: 'Religious', value: 'religious' },
        { label: 'Vocational', value: 'vocational' },
        { label: 'Social', value: 'social' },
      ],
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'beneficiaries',
      type: 'number',
      admin: {
        description: 'Number of beneficiaries',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Planning', value: 'planning' },
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
        { label: 'Paused', value: 'paused' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    seoField,
    createdAtField,
    updatedAtField,
  ],
}
