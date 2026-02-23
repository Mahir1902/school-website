import { defineType } from 'sanity'

export default defineType({
  name: 'videoGallery',
  type: 'document',
  title: 'Video Gallery',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
    },
    {
      name: 'videoUrl',
      type: 'url',
      title: 'Video URL',
      description: 'YouTube or Vimeo URL',
      validation: (rule) => rule.required(),
    },
    {
      name: 'thumbnail',
      type: 'image',
      title: 'Thumbnail',
      description: 'Custom thumbnail (optional, YouTube/Vimeo thumbnails used by default)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    },
    {
      name: 'duration',
      type: 'string',
      title: 'Duration',
      description: 'e.g., "5:30" or "1:23:45"',
      placeholder: 'MM:SS or HH:MM:SS',
    },
    {
      name: 'uploadDate',
      type: 'date',
      title: 'Upload Date',
      validation: (rule) => rule.required(),
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Events', value: 'events' },
          { title: 'Campus Tour', value: 'campus-tour' },
          { title: 'Testimonials', value: 'testimonials' },
          { title: 'Academics', value: 'academics' },
          { title: 'Sports', value: 'sports' },
          { title: 'Others', value: 'others' },
        ],
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
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      uploadDate: 'uploadDate',
      category: 'category',
      media: 'thumbnail',
    },
    prepare({ title, uploadDate, category, media }) {
      return {
        title,
        subtitle: `${category || 'Uncategorized'} | ${new Date(uploadDate).toLocaleDateString()}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Upload Date, Newest',
      name: 'uploadDateDesc',
      by: [{ field: 'uploadDate', direction: 'desc' }],
    },
    {
      title: 'Upload Date, Oldest',
      name: 'uploadDateAsc',
      by: [{ field: 'uploadDate', direction: 'asc' }],
    },
  ],
})
