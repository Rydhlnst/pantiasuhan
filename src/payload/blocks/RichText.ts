import type { Block } from 'payload'

export const RichTextBlock: Block = {
  slug: 'richText',
  label: 'Rich Text',
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'maxWidth',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Narrow', value: 'narrow' },
        { label: 'Default', value: 'default' },
        { label: 'Wide', value: 'wide' },
        { label: 'Full Width', value: 'full' },
      ],
    },
  ],
}
