import type { CollectionConfig } from 'payload'
import { isAdmin } from '../../shared/access'
import { slugField, createdAtField, updatedAtField } from '../../shared/fields'

export const Staff: CollectionConfig = {
  slug: 'staff',
  labels: {
    singular: 'Staff',
    plural: 'Staff',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Manage staff members',
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
    },
    slugField('name'),
    {
      name: 'position',
      type: 'text',
      required: true,
      admin: {
        description: 'Job title or position',
      },
    },
    {
      name: 'department',
      type: 'select',
      options: [
        { label: 'Management', value: 'management' },
        { label: 'Education', value: 'education' },
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Administration', value: 'administration' },
        { label: 'Maintenance', value: 'maintenance' },
        { label: 'Social Services', value: 'social-services' },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio',
      type: 'richText',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order',
        position: 'sidebar',
      },
    },
    {
      name: 'isLeadership',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show in leadership section',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'On Leave', value: 'on-leave' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    createdAtField,
    updatedAtField,
  ],
}
