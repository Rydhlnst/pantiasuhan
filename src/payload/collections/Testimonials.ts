import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../../shared/access'
import { createdAtField, updatedAtField } from '../../shared/fields'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Manage testimonials and reviews',
    defaultColumns: ['name', 'role', 'rating', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the person giving the testimonial',
      },
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        description: 'Role or title of the person',
      },
    },
    {
      name: 'organization',
      type: 'text',
      admin: {
        description: 'Organization or company',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      admin: {
        description: 'Rating from 1 to 5',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Volunteer', value: 'volunteer' },
        { label: 'Donor', value: 'donor' },
        { label: 'Partner', value: 'partner' },
        { label: 'Beneficiary', value: 'beneficiary' },
      ],
      defaultValue: 'general',
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
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Feature this testimonial prominently',
      },
    },
    createdAtField,
    updatedAtField,
  ],
}
