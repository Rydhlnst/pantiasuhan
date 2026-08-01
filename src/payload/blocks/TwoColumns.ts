import type { Block } from 'payload'
import { RichTextBlock } from './RichText'
import { ImageBlock } from './Image'
import { VideoBlock } from './Video'

export const TwoColumns: Block = {
  slug: 'twoColumns',
  label: 'Two Columns',
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'content-left',
      options: [
        { label: 'Content Left', value: 'content-left' },
        { label: 'Content Right', value: 'content-right' },
        { label: 'Image Left', value: 'image-left' },
        { label: 'Image Right', value: 'image-right' },
      ],
    },
    {
      name: 'gap',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
    {
      name: 'leftColumn',
      type: 'group',
      fields: [
        {
          name: 'width',
          type: 'select',
          defaultValue: '1/2-1/2',
          options: [
            { label: '1/3 - 2/3', value: '1/3-2/3' },
            { label: '1/2 - 1/2', value: '1/2-1/2' },
            { label: '2/3 - 1/3', value: '2/3-1/3' },
          ],
        },
        {
          name: 'content',
          type: 'blocks',
          blocks: [RichTextBlock, ImageBlock, VideoBlock],
        },
      ],
    },
    {
      name: 'rightColumn',
      type: 'group',
      fields: [
        {
          name: 'width',
          type: 'select',
          defaultValue: '1/2-1/2',
          options: [
            { label: '1/3 - 2/3', value: '1/3-2/3' },
            { label: '1/2 - 1/2', value: '1/2-1/2' },
            { label: '2/3 - 1/3', value: '2/3-1/3' },
          ],
        },
        {
          name: 'content',
          type: 'blocks',
          blocks: [RichTextBlock, ImageBlock, VideoBlock],
        },
      ],
    },
  ],
}
