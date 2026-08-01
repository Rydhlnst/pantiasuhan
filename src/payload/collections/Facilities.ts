import type { CollectionConfig } from 'payload'
import { isAdmin } from '../../shared/access'
import { slugField, createdAtField, updatedAtField } from '../../shared/fields'

export const Facilities: CollectionConfig = {
  slug: 'facilities',
  labels: {
    singular: 'Facility',
    plural: 'Facilities',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Manage facilities and infrastructure',
    defaultColumns: ['name', 'category', 'status'],
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
    },
    slugField('name'),
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
        { label: 'Building', value: 'building' },
        { label: 'Outdoor', value: 'outdoor' },
        { label: 'Recreation', value: 'recreation' },
        { label: 'Education', value: 'education' },
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Worship', value: 'worship' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'capacity',
      type: 'number',
      admin: {
        description: 'Capacity or maximum occupancy',
      },
    },
    {
      name: 'area',
      type: 'text',
      admin: {
        description: 'Area in square meters',
      },
    },
    {
      name: 'yearBuilt',
      type: 'number',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'operational',
      options: [
        { label: 'Operational', value: 'operational' },
        { label: 'Under Maintenance', value: 'under-maintenance' },
        { label: 'Under Construction', value: 'under-construction' },
        { label: 'Planned', value: 'planned' },
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
