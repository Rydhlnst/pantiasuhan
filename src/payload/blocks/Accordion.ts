import type { Block } from 'payload'

export const AccordionBlock: Block = {
  slug: 'accordionBlock',
  label: 'Accordion',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'trigger',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'defaultOpen',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'allowMultiple',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
