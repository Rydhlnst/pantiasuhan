import type { Block } from 'payload'

export const ProgramsBlock: Block = {
  slug: 'programsBlock',
  label: 'Programs',
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
      name: 'programs',
      type: 'relationship',
      relationTo: 'programs',
      hasMany: true,
    },
    {
      name: 'maxItems',
      type: 'number',
      defaultValue: 6,
      admin: {
        step: 1,
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
  ],
}
