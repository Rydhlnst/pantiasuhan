import type { Block } from 'payload'

export const AnnouncementsBlock: Block = {
  slug: 'announcementsBlock',
  label: 'Announcements',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'maxItems',
      type: 'number',
      defaultValue: 3,
      admin: {
        step: 1,
      },
    },
    {
      name: 'showPinned',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
