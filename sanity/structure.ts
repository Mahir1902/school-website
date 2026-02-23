import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // News & Events Section
      S.listItem()
        .title('📰 News & Events')
        .child(
          S.list()
            .title('News & Events')
            .items([
              S.listItem()
                .title('📝 News Articles')
                .child(
                  S.documentTypeList('news')
                    .title('News Articles')
                    .defaultOrdering([{ field: 'publishedDate', direction: 'desc' }])
                ),

              S.listItem()
                .title('🎉 Events')
                .child(
                  S.documentTypeList('event')
                    .title('Events')
                    .defaultOrdering([{ field: 'startDate', direction: 'desc' }])
                ),

              S.listItem()
                .title('📢 Notices')
                .child(
                  S.documentTypeList('notice')
                    .title('Notices')
                    .defaultOrdering([{ field: 'pinned', direction: 'desc' }, { field: 'publishedDate', direction: 'desc' }])
                ),

              S.divider(),

              S.listItem()
                .title('📸 Photo Gallery')
                .child(
                  S.documentTypeList('galleryImage')
                    .title('Photo Gallery')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }, { field: 'dateTaken', direction: 'desc' }])
                ),

              S.listItem()
                .title('🎥 Video Gallery')
                .child(
                  S.documentTypeList('videoGallery')
                    .title('Video Gallery')
                    .defaultOrdering([{ field: 'uploadDate', direction: 'desc' }])
                ),

              S.divider(),

              S.listItem()
                .title('📰 Legacy News (Old)')
                .child(
                  S.documentTypeList('newsArticle')
                    .title('Legacy News Articles')
                    .defaultOrdering([{ field: 'publishedDate', direction: 'desc' }])
                ),
            ])
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
