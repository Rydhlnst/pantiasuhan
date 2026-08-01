import type { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'videoBlock',
  label: 'Video',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'youtube',
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' },
        { label: 'Upload', value: 'upload' },
        { label: 'External URL', value: 'external' },
      ],
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: {
        description: 'YouTube/Vimeo URL or external video URL',
      },
    },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'upload',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: '16:9',
      options: [
        { label: '16:9', value: '16:9' },
        { label: '4:3', value: '4:3' },
        { label: '1:1', value: '1:1' },
      ],
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'loop',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'showControls',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
