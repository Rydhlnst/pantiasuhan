import type { CollectionConfig } from 'payload'
import { isAdmin } from '../../shared/access'
import { createdAtField, updatedAtField } from '../../shared/fields'

export const Statistics: CollectionConfig = {
  slug: 'statistics',
  labels: {
    singular: 'Statistic',
    plural: 'Statistics',
  },
  admin: {
    useAsTitle: 'label',
    description: 'Manage display statistics and counters',
    defaultColumns: ['label', 'value', 'category', 'status'],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'Display label (e.g., "Children Supported")',
      },
    },
    {
      name: 'value',
      type: 'number',
      required: true,
    },
    {
      name: 'suffix',
      type: 'text',
      admin: {
        description: 'e.g., "+", "K", "%"',
      },
    },
    {
      name: 'description',
      type: 'text',
      admin: {
        description: 'Brief description of this statistic',
      },
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Lucide icon name',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Impact', value: 'impact' },
        { label: 'Facilities', value: 'facilities' },
        { label: 'Programs', value: 'programs' },
        { label: 'Financial', value: 'financial' },
        { label: 'Volunteers', value: 'volunteers' },
      ],
      defaultValue: 'impact',
      admin: {
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
