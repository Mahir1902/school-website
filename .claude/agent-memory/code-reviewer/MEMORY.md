# Code Reviewer Agent Memory

## Project Patterns

### Content (Pages CMS, file-based)
- Content is JSON under `/content` (news, events, notices, gallery, videos, calendar, stats.json, testimonials.json), edited via Pages CMS; schema in `/.pages.yml`
- All reads go through `/lib/content.ts` (server-only `node:fs`); images/files are `/media/...` paths in `public/media`
- Rich text (`body`) is Markdown rendered by `MarkdownContent.tsx` (react-markdown; raw HTML not rendered)
- `.pages.yml` field names must match the JSON keys and `/types/newsEvents.ts` (Pages CMS drops undeclared keys on save)

### Unified Detail Page Architecture (Feb 2025)
- Route: `/app/news-events/[slug]/page.tsx` - single dynamic route for both news and events
- Looks up news by slug first, then events (`getNewsBySlug` / `getEventBySlug`)
- Templates: `NewsDetailTemplate` and `EventDetailTemplate` in `/components/newsEvents/templates/`
- RISK: a news slug that matches an event slug hides the event (news wins)

### Card Link Patterns
- `NewsCard.tsx` links to `/news-events/${news.slug}` (unified route) -- CORRECT
- `EventCard.tsx` links to `/news-events/${event.slug}` (unified route) -- CORRECT
- `NewsClient.tsx` (homepage section) links to `/news/${slug}` -- BROKEN (old route)

### Type Safety Issues Found
- `EventCard.tsx` defines inline interface instead of importing shared types

### Security Status (All Pass)
- External links: All `target="_blank"` have `rel="noopener noreferrer"`
- react-markdown does not render raw HTML by default
- `registrationLink` validated by a `^https?://` pattern in `.pages.yml`

### Performance Notes
- Content reads are synchronous fs reads at build/ISR time; no request caching needed

### Design System
- Fonts: `font-orpheus` headings, `font-proximaNova` body -- consistent
- OKLCH color tokens used properly throughout

## Key Review Findings (Architecture Restructure, Feb 2025)
1. CRITICAL: Slug collision risk (news + event same slug; news wins)
2. CRITICAL: `NewsClient.tsx` line 136 links to `/news/${slug}` (broken route)
3. IMPORTANT: No date validation in `/lib/dateUtils.ts`
4. IMPORTANT: `EventCard` shows registration for past events (no status check)
5. SUGGESTION: Missing JSON-LD structured data
6. SUGGESTION: Image alt should prefer `.alt` field over title

## Files for Reference
- `/components/newsEvents/templates/` - Detail page templates
- `/components/newsEvents/EventCard.tsx`, `NewsCard.tsx` - Card components
- `/components/newsEvents/MarkdownContent.tsx` - Markdown renderer
- `/lib/dateUtils.ts` - Date utilities (needs error handling)
- `/types/newsEvents.ts` - Shared type definitions
- `/lib/content.ts` - All content loaders
