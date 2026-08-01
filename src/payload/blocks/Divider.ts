import type { Block } from 'payload'

export const Divider: Block = {
  slug: 'divider',
  label: 'Divider',
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'solid',
      options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Dotted', value: 'dotted' },
        { label: 'Double', value: 'double' },
      ],
    },
    {
      name: 'thickness',
      type: 'select',
      defaultValue: 'thin',
      options: [
        { label: 'Thin', value: 'thin' },
        { label: 'Medium', value: 'medium' },
        { label: 'Thick', value: 'thick' },
      ],
    },
    {
      name: 'color',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Muted', value: 'muted' },
      ],
    },
    {
      name: 'spacing',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
  ],
}
