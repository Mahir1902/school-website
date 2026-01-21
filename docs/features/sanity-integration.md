# Sanity CMS Integration

**Status**: In Progress
**Started**: 2026-01-21
**Last Updated**: 2026-01-21

## Overview

Sanity CMS has been integrated into the Singapore International School website to enable non-technical content management. This feature allows the client to update website content (news articles, testimonials, statistics, and more) without requiring code changes.

## What Content is Managed

### High-Priority Content (Phase 1)
**Implemented**: ⏳ In Progress

1. **News & Events** (`newsArticle`)
   - Title, publication date, excerpt
   - Featured image with alt text
   - Category (Event, Achievement, Announcement)
   - Slug for URL generation
   - Displays latest 3 articles on homepage

2. **Testimonials** (`testimonial`)
   - Name, role (e.g., "Parent of Year 10 Student")
   - Quote text
   - Initials for avatar display
   - Manual ordering
   - Active/inactive toggle
   - Displays in carousel on homepage

3. **Statistics** (`statistic`)
   - Numeric value
   - Suffix ("+", "%", etc.)
   - Label text
   - Manual ordering
   - Displays with counter animation

### Future Content (Planned)
- Hero section carousel images and navigation menu
- Welcome section content
- Why Choose SIS feature cards
- Academic Programs
- Campus Life activities
- Footer and global settings

## Architecture

### Hybrid Server/Client Component Pattern

The integration uses Next.js 15's App Router with a hybrid approach:

```
┌─────────────────────────┐
│  Server Component       │
│  (Data Fetching)        │
│  - Fetches from Sanity  │
│  - ISR Caching          │
│  - No client JS         │
└───────────┬─────────────┘
            │ Props
            ▼
┌─────────────────────────┐
│  Client Component       │
│  (Interactions)         │
│  - Scroll animations    │
│  - Carousels            │
│  - Counter animations   │
└─────────────────────────┘
```

**Example**:
- `News.tsx` (Server) - Fetches news data with ISR
- `NewsClient.tsx` (Client) - Handles scroll animations

### Caching Strategy

**Incremental Static Regeneration (ISR)**:
- News: 1-hour revalidation
- Testimonials: 24-hour revalidation
- Stats: 1-week revalidation

**Benefits**:
- Fast page loads (pre-rendered HTML)
- Reduced API calls
- Fresh content at defined intervals

### Embedded Studio

Studio is embedded at `/studio` route within the Next.js app:

**Benefits**:
- Single deployment
- Shared environment variables
- Easier local development

**Access**: `http://localhost:3000/studio` (development) or `https://yoursite.com/studio` (production)

## How to Use the Studio

### Accessing the Studio

1. Navigate to `/studio` route
2. Login with Sanity credentials
3. Select content type from sidebar

### Managing News Articles

1. Click "📰 News & Events" in sidebar
2. Click "Create" button (+ icon)
3. Fill in required fields:
   - **Title**: Main headline
   - **Slug**: Auto-generated from title (click "Generate")
   - **Published Date**: When article should appear
   - **Excerpt**: Short summary (max 200 characters)
   - **Image**: Upload and set hotspot for cropping
   - **Category**: Select Event, Achievement, or Announcement
4. Click "Publish" to make live

**Notes**:
- Only latest 3 articles display on homepage (by date)
- Images are automatically optimized by Sanity CDN
- Changes appear after ISR revalidation (1 hour) or server restart

### Managing Testimonials

1. Click "💬 Testimonials" in sidebar
2. Create new testimonial
3. Fill in fields:
   - **Name**: Person's full name
   - **Role**: Relationship to school (e.g., "Parent of Year 10 Student")
   - **Quote**: Testimonial text
   - **Initials**: 2-3 characters for avatar (e.g., "ST")
   - **Order**: Numeric value (1, 2, 3...) for display sequence
   - **Active**: Toggle to show/hide on website
4. Publish

**Notes**:
- Only active testimonials appear on site
- Order determines carousel sequence (lower numbers first)
- Carousel auto-rotates every 6 seconds

### Managing Statistics

1. Click "📊 Statistics" in sidebar
2. Create new statistic
3. Fill in fields:
   - **Value**: Numeric value (e.g., 500)
   - **Suffix**: Optional suffix ("+", "%", etc.)
   - **Label**: Description (e.g., "Students Enrolled")
   - **Order**: Display order (1-4)
4. Publish

**Notes**:
- Stats display with animated counter on homepage
- Maximum 4 stats recommended for visual balance

## File Structure

```
/sanity
  /schemas
    /documents          # Content types
      - newsArticle.ts
      - testimonial.ts
      - statistic.ts
    - index.ts
  /lib
    - client.ts         # Sanity client config
    - image.ts          # Image URL builder
    - queries.ts        # GROQ queries
  - config.ts           # Studio configuration
  - structure.ts        # Custom desk layout

/app
  /studio
    /[[...tool]]
      - page.tsx        # Studio route
      - layout.tsx

/sections
  - News.tsx            # Server component
  - NewsClient.tsx      # Client component
  - Testimonials.tsx    # Server component
  - TestimonialsClient.tsx
  - Stats.tsx           # Server component
  - StatsClient.tsx
```

## Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-21
SANITY_API_TOKEN=<your-token>
```

## Technical Decisions

### Why Embedded Studio?
- Simpler deployment (single app)
- Shared authentication context
- Easier local development
- Can migrate to separate deployment if needed

### Why ISR over Real-Time?
- Better performance (static HTML)
- Lower API costs
- Suitable for content that updates infrequently
- Can add webhooks for critical instant updates

### Why Hybrid Components?
- Maintains existing animations without rewrite
- Reduces client JS bundle
- Leverages Next.js 15 Server Components
- Clear separation of concerns

### Why GROQ over REST?
- More flexible querying
- Fewer API calls (fetch related data in one query)
- Better performance
- Native Sanity language

## Troubleshooting

### Studio Not Loading
1. Check environment variables are set correctly
2. Verify CORS origins include your development URL
3. Check Sanity project ID and dataset name

### Content Not Updating
1. Check ISR revalidation period
2. Verify document is published (not draft)
3. Restart dev server to bypass cache
4. Check browser DevTools for errors

### Images Not Displaying
1. Verify image uploaded to Sanity
2. Check image asset reference in document
3. Ensure image URL builder is configured
4. Check browser Network tab for 404s

### TypeScript Errors
1. Run `npm run typegen` to regenerate types
2. Verify schema definitions match queries
3. Check import paths for types

## Performance Impact

**Before Sanity**:
- Hardcoded data
- No CMS overhead
- Static images

**After Sanity**:
- ISR caching maintains performance
- Images optimized by Sanity CDN (WebP/AVIF)
- Minimal client JS added
- Lighthouse score maintained (>90)

## Future Enhancements

1. **Additional Content Types**
   - Hero carousel images
   - Academic programs
   - Campus life activities
   - Footer global settings

2. **Advanced Features**
   - Scheduled publishing for news
   - Multi-language support (i18n)
   - Content relationships and tags
   - Analytics integration

3. **Workflow Improvements**
   - Draft/Review/Published states
   - On-demand revalidation webhooks
   - Preview mode for unpublished content
   - Content performance tracking

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next-Sanity Guide](https://github.com/sanity-io/next-sanity)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Implementation Log](/docs/plans/implementation-log.md)
- [Changelog](/docs/changes/changelog.md)

---

**Maintained by**: Development Team
**Client Contact**: TBD
**Sanity Project**: TBD
