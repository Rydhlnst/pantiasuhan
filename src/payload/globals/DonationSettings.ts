import type { GlobalConfig } from 'payload'

export const DonationSettings: GlobalConfig = {
  slug: 'donation-settings',
  label: 'Donation Settings',
  admin: {
    description: 'Configure donation page and settings',
  },
  fields: [
    {
      name: 'pageSettings',
      type: 'group',
      label: 'Page Settings',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Support Our Cause' },
        { name: 'description', type: 'textarea' },
        { name: 'heroImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'presetAmounts',
      type: 'array',
      label: 'Preset Donation Amounts',
      fields: [
        {
          name: 'amount',
          type: 'number',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          admin: {
            description: 'e.g., "Provides meals for 1 child"',
          },
        },
      ],
    },
    {
      name: 'campaigns',
      type: 'array',
      label: 'Active Campaigns',
      fields: [
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
          name: 'targetAmount',
          type: 'number',
        },
        {
          name: 'currentAmount',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'isActive',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'recurringOptions',
      type: 'group',
      label: 'Recurring Donation Options',
      fields: [
        {
          name: 'enableRecurring',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'intervals',
          type: 'select',
          hasMany: true,
          options: [
            { label: 'Monthly', value: 'monthly' },
            { label: 'Quarterly', value: 'quarterly' },
            { label: 'Annually', value: 'annually' },
          ],
        },
      ],
    },
    {
      name: 'thankYouMessage',
      type: 'richText',
      admin: {
        description: 'Message shown after successful donation',
      },
    },
  ],
}
