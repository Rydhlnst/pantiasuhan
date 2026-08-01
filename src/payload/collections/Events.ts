import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../../shared/access'
import { slugField, seoField, createdAtField, updatedAtField } from '../../shared/fields'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Manage events and activities',
    defaultColumns: ['title', 'startDate', 'status'],
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
        description: 'Brief summary of the event',
      },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
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
      name: 'startTime',
      type: 'text',
      admin: {
        description: 'e.g., 09:00 AM',
      },
    },
    {
      name: 'endTime',
      type: 'text',
      admin: {
        description: 'e.g., 05:00 PM',
      },
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'capacity',
      type: 'number',
      admin: {
        description: 'Maximum number of attendees',
      },
    },
    {
      name: 'registrationsCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Show this event publicly',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Completed', value: 'completed' },
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
