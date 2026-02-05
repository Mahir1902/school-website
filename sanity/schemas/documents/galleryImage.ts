import { defineType } from 'sanity'

export default defineType({
  name: 'galleryImage',
  type: 'document',
  title: 'Gallery Image',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (rule) => rule.required(),
        },
      ],
    },
    {
      name: 'caption',
      type: 'text',
      title: 'Caption',
      rows: 2,
    },
    {
      name: 'photographer',
      type: 'string',
      title: 'Photographer',
    },
    {
      name: 'dateTaken',
      type: 'date',
      title: 'Date Taken',
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Programs', value: 'programs' },
          { title: 'Study Tour', value: 'study-tour' },
          { title: 'Sports', value: 'sports' },
          { title: 'Celebrations', value: 'celebrations' },
          { title: 'Classroom', value: 'classroom' },
          { title: 'Facilities', value: 'facilities' },
          { title: 'Others', value: 'others' },
        ],
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'aspectRatio',
      type: 'string',
      title: 'Aspect Ratio',
      description: 'Helps optimize masonry layout',
      options: {
        list: [
          { title: 'Portrait (2:3)', value: 'portrait' },
          { title: 'Landscape (3:2)', value: 'landscape' },
          { title: 'Square (1:1)', value: 'square' },
        ],
      },
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      description: 'Show in featured sections',
      initialValue: false,
    },
    {
      name: 'order',
      type: 'number',
      title: 'Order',
      description: 'Lower numbers appear first (0 = first)',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category',
      dateTaken: 'dateTaken',
    },
    prepare({ title, media, category, dateTaken }) {
      return {
        title,
        subtitle: `${category}${dateTaken ? ' | ' + new Date(dateTaken).toLocaleDateString() : ''}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Order (Manual)',
      name: 'orderManual',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Date Taken, Newest',
      name: 'dateTakenDesc',
      by: [{ field: 'dateTaken', direction: 'desc' }],
    },
    {
      title: 'Category',
      name: 'category',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
})
