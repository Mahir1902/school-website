import { defineType } from 'sanity'

export default defineType({
  name: 'newsArticle',
  type: 'document',
  title: 'News Article',
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    },
    {
      name: 'publishedDate',
      type: 'date',
      validation: (rule) => rule.required(),
    },
    {
      name: 'excerpt',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(200),
    },
    {
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    },
    {
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'Event', value: 'event' },
          { title: 'Achievement', value: 'achievement' },
          { title: 'Announcement', value: 'announcement' },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishedDate',
      media: 'image',
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: new Date(date).toLocaleDateString(),
        media,
      }
    },
  },
})
