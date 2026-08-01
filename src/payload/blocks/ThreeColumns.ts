import type { Block } from 'payload'
import { RichTextBlock } from './RichText'
import { ImageBlock } from './Image'
import { Features } from './Features'
import { Cards } from './Cards'

export const ThreeColumns: Block = {
  slug: 'threeColumns',
  label: 'Three Columns',
  fields: [
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
      name: 'columns',
      type: 'array',
      required: true,
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: 'width',
          type: 'select',
          defaultValue: 'equal',
          options: [
            { label: 'Equal', value: 'equal' },
            { label: '1 - 2 - 1', value: '1-2-1' },
            { label: 'Sidebar - Content - Sidebar', value: 'sidebar-content-sidebar' },
          ],
        },
        {
          name: 'content',
          type: 'blocks',
          blocks: [RichTextBlock, ImageBlock, Features, Cards],
        },
      ],
    },
  ],
}
