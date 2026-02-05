import { defineType } from 'sanity'

export default defineType({
  name: 'notice',
  type: 'document',
  title: 'Notice',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    },
    {
      name: 'publishedDate',
      type: 'date',
      title: 'Published Date',
      validation: (rule) => rule.required(),
    },
    {
      name: 'expiryDate',
      type: 'date',
      title: 'Expiry Date',
      description: 'Notice will be archived after this date. Leave empty for no expiry.',
    },
    {
      name: 'content',
      type: 'text',
      title: 'Content',
      rows: 5,
      validation: (rule) => rule.required(),
    },
    {
      name: 'priority',
      type: 'string',
      title: 'Priority',
      options: {
        list: [
          { title: 'Urgent', value: 'urgent' },
          { title: 'High', value: 'high' },
          { title: 'Normal', value: 'normal' },
          { title: 'Low', value: 'low' },
        ],
      },
      initialValue: 'normal',
      validation: (rule) => rule.required(),
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Academic', value: 'academic' },
          { title: 'Administrative', value: 'administrative' },
          { title: 'Event', value: 'event' },
          { title: 'General', value: 'general' },
        ],
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'attachments',
      type: 'array',
      title: 'Attachments',
      of: [
        {
          type: 'file',
          fields: [
            {
              name: 'description',
              type: 'string',
              title: 'Description',
            },
          ],
        },
      ],
    },
    {
      name: 'targetAudience',
      type: 'array',
      title: 'Target Audience',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Students', value: 'students' },
          { title: 'Parents', value: 'parents' },
          { title: 'Staff', value: 'staff' },
          { title: 'All', value: 'all' },
        ],
      },
    },
    {
      name: 'pinned',
      type: 'boolean',
      title: 'Pinned',
      description: 'Pin this notice to the top of the list',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      publishedDate: 'publishedDate',
      priority: 'priority',
      pinned: 'pinned',
    },
    prepare({ title, publishedDate, priority, pinned }) {
      return {
        title: `${pinned ? '📌 ' : ''}${title}`,
        subtitle: `${new Date(publishedDate).toLocaleDateString()} | ${priority}`,
      }
    },
  },
  orderings: [
    {
      title: 'Pinned, then Date',
      name: 'pinnedAndDate',
      by: [
        { field: 'pinned', direction: 'desc' },
        { field: 'publishedDate', direction: 'desc' },
      ],
    },
    {
      title: 'Priority, then Date',
      name: 'priorityAndDate',
      by: [
        { field: 'priority', direction: 'asc' },
        { field: 'publishedDate', direction: 'desc' },
      ],
    },
  ],
})
