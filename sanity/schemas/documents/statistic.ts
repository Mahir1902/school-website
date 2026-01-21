import { defineType } from 'sanity'

export default defineType({
  name: 'statistic',
  type: 'document',
  title: 'Statistic',
  fields: [
    {
      name: 'value',
      type: 'number',
      validation: (rule) => rule.required().integer().positive(),
    },
    {
      name: 'suffix',
      type: 'string',
      description: 'e.g., "+", "%", etc.',
    },
    {
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'order',
      type: 'number',
      description: 'Display order (lower numbers first)',
      validation: (rule) => rule.integer().positive(),
    },
  ],
  preview: {
    select: {
      value: 'value',
      suffix: 'suffix',
      label: 'label',
    },
    prepare({ value, suffix, label }) {
      return {
        title: `${value}${suffix || ''} ${label}`,
      }
    },
  },
})
