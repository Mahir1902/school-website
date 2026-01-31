import { defineType } from 'sanity'

export default defineType({
  name: 'calendarEvent',
  type: 'document',
  title: 'Calendar Event',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Event Title',
      validation: (rule) => rule.required(),
    },
    {
      name: 'eventType',
      type: 'string',
      title: 'Event Type',
      options: {
        list: [
          { title: 'Holiday', value: 'holiday' },
          { title: 'Results Day', value: 'results_day' },
          { title: 'Examination', value: 'exam' },
          { title: 'School Event', value: 'event' },
        ],
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'startDate',
      type: 'date',
      title: 'Start Date',
      validation: (rule) => rule.required(),
    },
    {
      name: 'endDate',
      type: 'date',
      title: 'End Date',
      description: 'Optional - for multi-day events',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Academic', value: 'academic' },
          { title: 'Administrative', value: 'administrative' },
          { title: 'Co-Curricular', value: 'co-curricular' },
          { title: 'Examination', value: 'examination' },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      eventType: 'eventType',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare({ title, eventType, startDate, endDate }) {
      const start = new Date(startDate).toLocaleDateString()
      const end = endDate ? ` - ${new Date(endDate).toLocaleDateString()}` : ''
      const typeLabel = eventType ? ` (${eventType})` : ''

      return {
        title,
        subtitle: `${start}${end}${typeLabel}`,
      }
    },
  },
})
