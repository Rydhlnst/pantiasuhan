import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../../shared/access'
import { slugField, createdAtField, updatedAtField } from '../../shared/fields'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  labels: {
    singular: 'Announcement',
    plural: 'Announcements',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Create and manage announcements',
    defaultColumns: ['title', 'priority', 'status', 'publishedAt'],
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
      required: true,
      admin: {
        description: 'Brief summary shown in list view',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Normal', value: 'normal' },
        { label: 'High', value: 'high' },
        { label: 'Urgent', value: 'urgent' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
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
      name: 'isPinned',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Pin this announcement to the top',
      },
    },
    {
      name: 'publishFrom',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'When should this announcement become visible',
      },
    },
    {
      name: 'publishUntil',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'When should this announcement expire',
      },
    },
    createdAtField,
    updatedAtField,
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  versions: {
    drafts: true,
  },
}
