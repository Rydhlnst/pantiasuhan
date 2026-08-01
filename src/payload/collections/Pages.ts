import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../../shared/access'
import { slugField, seoField } from '../../shared/fields'

import { Hero } from '../blocks/Hero'
import { RichTextBlock } from '../blocks/RichText'
import { ImageBlock } from '../blocks/Image'
import { GalleryBlock } from '../blocks/Gallery'
import { VideoBlock } from '../blocks/Video'
import { StatisticsBlock } from '../blocks/Statistics'
import { Timeline } from '../blocks/Timeline'
import { Features } from '../blocks/Features'
import { ProgramsBlock } from '../blocks/ProgramsBlock'
import { Cards } from '../blocks/Cards'
import { Quote } from '../blocks/Quote'
import { FAQBlock } from '../blocks/FAQBlock'
import { TestimonialsBlock } from '../blocks/TestimonialsBlock'
import { CTA } from '../blocks/CTA'
import { PartnersBlock } from '../blocks/PartnersBlock'
import { LatestPosts } from '../blocks/LatestPosts'
import { AnnouncementsBlock } from '../blocks/AnnouncementsBlock'
import { DownloadsBlock } from '../blocks/DownloadsBlock'
import { MapBlock } from '../blocks/Map'
import { ContactForm } from '../blocks/ContactForm'
import { AccordionBlock } from '../blocks/Accordion'
import { TwoColumns } from '../blocks/TwoColumns'
import { ThreeColumns } from '../blocks/ThreeColumns'
import { Spacer } from '../blocks/Spacer'
import { Divider } from '../blocks/Divider'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Create and manage pages with the layout builder',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField('title'),
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    seoField,
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        Hero,
        RichTextBlock,
        ImageBlock,
        GalleryBlock,
        VideoBlock,
        StatisticsBlock,
        Timeline,
        Features,
        ProgramsBlock,
        Cards,
        Quote,
        FAQBlock,
        TestimonialsBlock,
        CTA,
        PartnersBlock,
        LatestPosts,
        AnnouncementsBlock,
        DownloadsBlock,
        MapBlock,
        ContactForm,
        AccordionBlock,
        TwoColumns,
        ThreeColumns,
        Spacer,
        Divider,
      ],
      minRows: 1,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  versions: {
    drafts: true,
  },
}
