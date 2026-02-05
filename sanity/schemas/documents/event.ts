import { defineType } from 'sanity'

export default defineType({
  name: 'event',
  type: 'document',
  title: 'Event',
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
      validation: (rule) => rule.required(),
    },
    {
      name: 'startDate',
      type: 'datetime',
      title: 'Start Date',
      validation: (rule) => rule.required(),
    },
    {
      name: 'endDate',
      type: 'datetime',
      title: 'End Date',
      description: 'Leave empty for single-day events',
    },
    {
      name: 'location',
      type: 'string',
      title: 'Location',
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      rows: 3,
      validation: (rule) => rule.required().max(200),
    },
    {
      name: 'featuredImage',
      type: 'image',
      title: 'Featured Image',
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
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        { type: 'block' },
        {
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
      ],
    },
    {
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Past', value: 'past' },
        ],
      },
      description: 'Status is automatically determined by date, but can be manually set',
    },
    {
      name: 'eventType',
      type: 'string',
      title: 'Event Type',
      options: {
        list: [
          { title: 'Academic', value: 'academic' },
          { title: 'Sports', value: 'sports' },
          { title: 'Cultural', value: 'cultural' },
          { title: 'Community', value: 'community' },
        ],
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'registrationLink',
      type: 'url',
      title: 'Registration Link',
      description: 'External link for event registration',
    },
    {
      name: 'capacity',
      type: 'number',
      title: 'Capacity',
      description: 'Maximum number of participants',
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      description: 'Show in featured carousel on homepage',
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
      startDate: 'startDate',
      media: 'featuredImage',
      eventType: 'eventType',
    },
    prepare({ title, startDate, media, eventType }) {
      return {
        title,
        subtitle: `${new Date(startDate).toLocaleDateString()} | ${eventType}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Start Date, Newest',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
    {
      title: 'Start Date, Oldest',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
  ],
})
