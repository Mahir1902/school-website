# Code Reviewer Agent Memory

## Project Patterns

### Sanity CMS Integration
- Sanity client at `/sanity/lib/client.ts` uses `next-sanity` with CDN enabled
- Image URL builder at `/sanity/lib/image.ts` using `@sanity/image-url` with `.auto('format').quality(90)`
- GROQ queries centralized in `/sanity/lib/queries.ts`
- Schemas in `/sanity/schemas/documents/` - news, event, notice, galleryImage, videoGallery
- `registrationLink` uses Sanity `url` type (validates URLs at schema level)

### Unified Detail Page Architecture (Feb 2025)
- Route: `/app/news-events/[slug]/page.tsx` - single dynamic route for both news and events
- Uses `contentBySlugQuery` GROQ query that searches both `news` and `event` types by slug
- Type discrimination via `_type` field on `ContentItem` union type
- Templates: `NewsDetailTemplate` and `EventDetailTemplate` in `/components/newsEvents/templates/`
- CRITICAL RISK: Slug collision between news and events returns arbitrary first match

### Card Link Patterns
- `NewsCard.tsx` links to `/news-events/${news.slug.current}` (unified route) -- CORRECT
- `EventCard.tsx` links to `/news-events/${event.slug.current}` (unified route) -- CORRECT
- `NewsClient.tsx` (homepage section) links to `/news/${slug}` -- BROKEN (old route)

### Type Safety Issues Found
- `/types/newsEvents.ts` uses `any` for Sanity images and Portable Text content
- PortableTextContent serializers use `any` for all props
- `ContentItem` union adds `_type` via intersection, base types lack `_type`
- `EventCard.tsx` defines inline interface instead of importing shared types

### Security Status (All Pass)
- External links: All `target="_blank"` have `rel="noopener noreferrer"`
- `@portabletext/react` escapes HTML by default
- Sanity `url` type validates registration URLs at schema level

### Performance Notes
- `PortableTextContent.tsx` is `'use client'` but has no interactive state
- Duplicate Sanity fetch in `generateMetadata` and page component (no `cache()`)
- Detail template images use `urlFor(img).url()` without width/height constraints

### Design System
- Fonts: `font-orpheus` headings, `font-proximaNova` body -- consistent
- OKLCH color tokens used properly throughout

## Key Review Findings (Architecture Restructure, Feb 2025)
1. CRITICAL: Slug collision risk in `contentBySlugQuery` (news + event same slug)
2. CRITICAL: `NewsClient.tsx` line 136 links to `/news/${slug}` (broken route)
3. IMPORTANT: No React `cache()` for duplicate fetches
4. IMPORTANT: `PortableTextContent` should be server component
5. IMPORTANT: Pervasive `any` types for images and content
6. IMPORTANT: No date validation in `/lib/dateUtils.ts`
7. IMPORTANT: `EventCard` shows registration for past events (no status check)
8. SUGGESTION: Missing JSON-LD structured data
9. SUGGESTION: Image alt should prefer `.alt` field over title

## Files for Reference
- `/components/newsEvents/templates/` - Detail page templates
- `/components/newsEvents/EventCard.tsx`, `NewsCard.tsx` - Card components
- `/components/newsEvents/PortableTextContent.tsx` - Portable Text renderer
- `/lib/dateUtils.ts` - Date utilities (needs error handling)
- `/types/newsEvents.ts` - Shared type definitions
- `/sanity/lib/queries.ts` - All GROQ queries
