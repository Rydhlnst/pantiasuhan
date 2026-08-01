import type { Block } from 'payload'

export const Timeline: Block = {
  slug: 'timeline',
  label: 'Timeline',
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
      name: 'events',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'date',
          type: 'date',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'type',
          type: 'select',
          defaultValue: 'event',
          options: [
            { label: 'Milestone', value: 'milestone' },
            { label: 'Achievement', value: 'achievement' },
            { label: 'Event', value: 'event' },
            { label: 'Donation', value: 'donation' },
            { label: 'Partnership', value: 'partnership' },
          ],
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'vertical',
      options: [
        { label: 'Vertical', value: 'vertical' },
        { label: 'Horizontal', value: 'horizontal' },
      ],
    },
  ],
}
