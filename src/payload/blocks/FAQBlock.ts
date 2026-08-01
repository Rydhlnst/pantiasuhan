import type { Block } from 'payload'

export const FAQBlock: Block = {
  slug: 'faqBlock',
  label: 'FAQ',
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
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faq',
      hasMany: true,
    },
    {
      name: 'maxItems',
      type: 'number',
      defaultValue: 10,
      admin: {
        step: 1,
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'accordion',
      options: [
        { label: 'Accordion', value: 'accordion' },
        { label: 'Toggle', value: 'toggle' },
      ],
    },
  ],
}
