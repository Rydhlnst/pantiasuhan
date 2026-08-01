import type { GlobalConfig } from 'payload'

export const SocialMedia: GlobalConfig = {
  slug: 'social-media',
  label: 'Social Media',
  admin: {
    description: 'Manage social media profiles',
  },
  fields: [
    {
      name: 'platforms',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'TikTok', value: 'tiktok' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'handle',
          type: 'text',
          admin: {
            description: 'e.g., @berescms',
          },
        },
        {
          name: 'isActive',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'shareSettings',
      type: 'group',
      label: 'Share Settings',
      fields: [
        {
          name: 'enableSharing',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'shareMessage',
          type: 'text',
          admin: {
            description: 'Default share message template',
          },
        },
      ],
    },
  ],
}
