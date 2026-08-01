import type { Block } from 'payload'

export const Spacer: Block = {
  slug: 'spacer',
  label: 'Spacer',
  fields: [
    {
      name: 'height',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Small (2rem)', value: 'small' },
        { label: 'Medium (4rem)', value: 'medium' },
        { label: 'Large (6rem)', value: 'large' },
        { label: 'Extra Large (8rem)', value: 'extra-large' },
      ],
    },
  ],
}
