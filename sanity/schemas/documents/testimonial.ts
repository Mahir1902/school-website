import { defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  type: 'document',
  title: 'Testimonial',
  fields: [
    {
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'role',
      type: 'string',
      description: 'e.g., "Parent of Year 10 Student"',
      validation: (rule) => rule.required(),
    },
    {
      name: 'quote',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    },
    {
      name: 'initials',
      type: 'string',
      description: 'Used for avatar display',
      validation: (rule) => rule.max(3),
    },
    {
      name: 'order',
      type: 'number',
      description: 'Display order (lower numbers first)',
      validation: (rule) => rule.integer().positive(),
    },
    {
      name: 'active',
      type: 'boolean',
      description: 'Show this testimonial on the website',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
    },
  },
})
