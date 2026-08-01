import type { Field } from 'payload'

export const slugField = (source: string = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'URL-friendly identifier',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (value) {
          return value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        const sourceValue = data?.[source]
        if (typeof sourceValue === 'string') {
          return sourceValue
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return value
      },
    ],
  },
})

export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'SEO Title',
      admin: {
        description: 'Override the default title for this page',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'SEO Description',
      admin: {
        description: 'Meta description for search engines',
      },
    },
    {
      name: 'keywords',
      type: 'text',
      label: 'Keywords',
      admin: {
        description: 'Comma-separated keywords',
      },
    },
    {
      name: 'ogImage',
      type: 'upload',
      label: 'OG Image',
      relationTo: 'media',
      admin: {
        description: 'Image for social media sharing',
      },
    },
    {
      name: 'canonical',
      type: 'text',
      label: 'Canonical URL',
      admin: {
        description: 'Override canonical URL',
      },
    },
    {
      name: 'robots',
      type: 'select',
      label: 'Robots',
      defaultValue: 'index, follow',
      options: [
        { label: 'Index, Follow', value: 'index, follow' },
        { label: 'No Index, Follow', value: 'noindex, follow' },
        { label: 'Index, No Follow', value: 'index, nofollow' },
        { label: 'No Index, No Follow', value: 'noindex, nofollow' },
      ],
      admin: {
        description: 'Control search engine indexing',
      },
    },
  ],
}

export const createdAtField: Field = {
  name: 'createdAt',
  type: 'date',
  admin: {
    position: 'sidebar',
    readOnly: true,
  },
  hooks: {
    beforeChange: [
      ({ value, operation }) => {
        if (operation === 'create' && !value) {
          return new Date().toISOString()
        }
        return value
      },
    ],
  },
}

export const updatedAtField: Field = {
  name: 'updatedAt',
  type: 'date',
  admin: {
    position: 'sidebar',
    readOnly: true,
  },
  hooks: {
    beforeChange: [
      () => {
        return new Date().toISOString()
      },
    ],
  },
}
