import type { Block } from 'payload'

export const ContactForm: Block = {
  slug: 'contactForm',
  label: 'Contact Form',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'showPhone',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showAddress',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'successMessage',
      type: 'text',
    },
  ],
}
