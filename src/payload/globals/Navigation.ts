import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: {
    description: 'Manage website navigation menus',
  },
  fields: [
    {
      name: 'header',
      type: 'array',
      label: 'Header Navigation',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          defaultValue: 'link',
          options: [
            { label: 'Custom Link', value: 'link' },
            { label: 'Page', value: 'page' },
            { label: 'Post', value: 'post' },
            { label: 'Category', value: 'category' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            description: 'Custom URL (for custom links)',
          },
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'page',
          },
        },
        {
          name: 'children',
          type: 'array',
          label: 'Submenu Items',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'type',
              type: 'select',
              defaultValue: 'link',
              options: [
                { label: 'Custom Link', value: 'link' },
                { label: 'Page', value: 'page' },
              ],
            },
            {
              name: 'url',
              type: 'text',
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
            },
          ],
        },
      ],
    },
  ],
}
