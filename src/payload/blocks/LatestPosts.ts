import type { Block } from 'payload'

export const LatestPosts: Block = {
  slug: 'latestPosts',
  label: 'Latest Posts',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'maxItems',
      type: 'number',
      defaultValue: 3,
      admin: {
        step: 1,
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
      ],
    },
  ],
}
