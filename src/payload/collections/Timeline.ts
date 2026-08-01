import type { CollectionConfig } from 'payload'
import { isAdmin } from '../../shared/access'
import { createdAtField, updatedAtField } from '../../shared/fields'

export const Timeline: CollectionConfig = {
  slug: 'timeline',
  labels: {
    singular: 'Timeline Event',
    plural: 'Timeline Events',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Manage historical timeline events',
    defaultColumns: ['title', 'date', 'category'],
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
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        description: 'Date of the event',
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Milestone', value: 'milestone' },
        { label: 'Achievement', value: 'achievement' },
        { label: 'Event', value: 'event' },
        { label: 'Donation', value: 'donation' },
        { label: 'Partnership', value: 'partnership' },
      ],
      defaultValue: 'milestone',
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
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    createdAtField,
    updatedAtField,
  ],
}
