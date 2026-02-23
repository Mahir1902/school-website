# Sanity CMS Architect Memory

## Schema Consolidation (2026-02-05)

### News Schema Migration
Successfully consolidated duplicate news schemas:
- **Removed**: `newsArticle.ts` schema (old, used by homepage only)
- **Kept**: `news.ts` schema (correct schema for News & Events section)
- **Migrated**: 4 articles from newsArticle → news type

**Key Field Differences**:
- Image field: `image` → `featuredImage`
- Date field: `date` type → `datetime` type
- Categories: event/achievement/announcement → latest/achievements

**Category Mapping Applied**:
- `event` → `latest`
- `achievement` → `achievements`

**Migration Process**:
1. Queried existing newsArticle documents
2. Created new news documents with field mapping
3. Published all 4 news documents
4. Updated homepage query from `newsArticle` to `news`
5. Removed newsArticle schema file and index reference

## Current Schemas

### News (`/sanity/schemas/documents/news.ts`)
- Uses `featuredImage` field with hotspot
- Uses `datetime` for publishedDate
- Categories: "latest", "achievements"
- Includes `content` field (Portable Text array)
- Used by: Homepage news section, News & Events pages

### Other Active Schemas
- `event.ts` - Events with start/end dates, location, registration
- `notice.ts` - Notices with priority and expiry
- `galleryImage.ts` - Gallery images with photographer metadata
- `videoGallery.ts` - Video entries
- `testimonial.ts` - Student/parent testimonials
- `statistic.ts` - Homepage stats
- `calendarEvent.ts` - Calendar entries

## GROQ Queries (`/sanity/lib/queries.ts`)

### Homepage Query
```groq
newsQuery - Fetches latest 3 news articles by publishedDate desc
```

### News & Events Queries
- `featuredItemsQuery` - Featured news + events for carousel
- `latestNewsQuery` - Paginated news
- `newsByCategoryQuery` - Category-filtered news
- `newsArticleBySlugQuery` - Single news by slug
- `relatedNewsQuery` - Related news by category

All queries use `featuredImage` field and proper datetime handling.

## Project Configuration
- Project ID: `m7t9w5hz`
- Dataset: `production`
- Studio config: `/sanity.config.ts`
