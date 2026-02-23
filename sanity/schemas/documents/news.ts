import { defineType } from 'sanity'

export default defineType({
  name: 'news',
  type: 'document',
  title: 'News',
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
      validation: (rule) => rule.required().custom(async (value: any, context: any) => {
        if (!value?.current) return true;

        const { getClient } = context;
        const client = getClient({ apiVersion: '2023-05-03' });
        const id = context.document?._id?.replace(/^drafts\./, '');

        // Check for slug conflicts in both news and events
        const query = `*[_type in ["news", "event"] && slug.current == $slug && _id != $id][0]`;
        const params = { slug: value.current, id };
        const existing = await client.fetch(query, params);

        if (existing) {
          return `Slug "${value.current}" is already used by another ${existing._type === 'news' ? 'news article' : 'event'}. Please choose a unique slug.`;
        }

        return true;
      }),
    },
    {
      name: 'publishedDate',
      type: 'datetime',
      title: 'Published Date',
      validation: (rule) => rule.required(),
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
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Latest', value: 'latest' },
          { title: 'Achievements', value: 'achievements' },
        ],
      },
      validation: (rule) => rule.required(),
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
    {
      name: 'author',
      type: 'string',
      title: 'Author',
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishedDate',
      media: 'featuredImage',
      category: 'category',
    },
    prepare({ title, date, media, category }) {
      return {
        title,
        subtitle: `${new Date(date).toLocaleDateString()} | ${category}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, Newest',
      name: 'publishedDateDesc',
      by: [{ field: 'publishedDate', direction: 'desc' }],
    },
    {
      title: 'Published Date, Oldest',
      name: 'publishedDateAsc',
      by: [{ field: 'publishedDate', direction: 'asc' }],
    },
  ],
})
