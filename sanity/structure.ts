import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('📰 News & Events')
        .child(
          S.documentTypeList('newsArticle')
            .title('News Articles')
            .defaultOrdering([{ field: 'publishedDate', direction: 'desc' }])
        ),

      S.divider(),

      S.listItem()
        .title('💬 Testimonials')
        .child(
          S.documentTypeList('testimonial')
            .title('Testimonials')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      S.listItem()
        .title('📊 Statistics')
        .child(
          S.documentTypeList('statistic')
            .title('Statistics')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      S.listItem()
        .title('📅 Calendar Events')
        .child(
          S.documentTypeList('calendarEvent')
            .title('Calendar Events')
            .defaultOrdering([{ field: 'startDate', direction: 'asc' }])
        ),
    ])
