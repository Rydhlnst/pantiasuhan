import type { Block } from 'payload'

export const MapBlock: Block = {
  slug: 'mapBlock',
  label: 'Map',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'latitude',
      type: 'text',
    },
    {
      name: 'longitude',
      type: 'text',
    },
    {
      name: 'zoomLevel',
      type: 'number',
      defaultValue: 15,
      admin: {
        step: 1,
      },
    },
    {
      name: 'mapStyle',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Roadmap', value: 'roadmap' },
        { label: 'Satellite', value: 'satellite' },
        { label: 'Terrain', value: 'terrain' },
      ],
    },
  ],
}
