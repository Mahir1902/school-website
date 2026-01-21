# Changelog

All notable changes to the Singapore International School website project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- N/A

## [2026-01-21] - Sanity CMS Integration COMPLETE (Phases 0-7)

### Added (Phases 6-7 - Component Refactoring & Content Migration)
- **Phase 6**: Three Client Component files (NewsClient, TestimonialsClient, StatsClient)
- **Phase 7**: Published content in Sanity:
  - 3 news articles (Annual Sports Day, Science Fair Excellence, University Fair Success)
  - 4 testimonials (Sarah Thompson, Ahmed Hassan, Maria Rodriguez, David Chen)
  - 4 statistics (500+ students, 20+ years, 98% placement, 25+ nationalities)

### Changed (Phase 6 - Component Refactoring)
- Converted News, Testimonials, Stats sections to hybrid Server/Client pattern
- News.tsx, Testimonials.tsx, Stats.tsx now Server Components with ISR caching
- All animations and interactions preserved in separate Client Components

### Rationale (Phases 6-7)
- **Hybrid pattern**: Separates data fetching (Server) from interactivity (Client) for optimal performance
- **ISR caching**: Different revalidation intervals based on update frequency (News: 1hr, Testimonials: 24hr, Stats: 1week)
- **Animation preservation**: All existing scroll triggers, carousels, and counter animations work identically
- **Content migration**: Used MCP tools for bulk content creation and publishing
- **Type safety**: Added TypeScript interfaces for all Sanity data structures

### Technical Details
**Server Components**:
- Fetch data from Sanity using GROQ queries
- Implement Next.js 16 ISR with configurable revalidation
- Pass data as props to Client Components
- Zero client-side JS for data fetching

**Client Components**:
- Handle all animations (IntersectionObserver, carousel, counters)
- Receive data via type-safe props
- Preserve all existing UX/UI exactly
- Use "use client" directive

**Content Created**:
- All documents created as drafts via `create_documents_from_json` MCP tool
- All 11 documents published via `publish_documents` MCP tool
- Content now live and queryable

### Files Modified/Created (Phase 6-7)
**Created**:
- `/sections/NewsClient.tsx`
- `/sections/TestimonialsClient.tsx`
- `/sections/StatsClient.tsx`

**Modified**:
- `/sections/News.tsx` - Now Server Component
- `/sections/Testimonials.tsx` - Now Server Component
- `/sections/Stats.tsx` - Now Server Component
- `/docs/plans/implementation-log.md` - Updated with completion status
- `/docs/changes/changelog.md` - This file

### Added
- Documentation system (`/docs` directory structure with features, changes, plans subdirectories)
- Sanity CMS configuration and schemas
- Three content types deployed to Sanity cloud:
  - `newsArticle` - News and events management
  - `testimonial` - Testimonial management with ordering
  - `statistic` - Statistics with animated counters
- Embedded Sanity Studio at `/studio` route
- GROQ queries for data fetching
- Environment configuration (`.env.local`)

### Changed
- Upgraded Next.js from v15.3.2 to v16.1.1-canary for Sanity compatibility
- Installed Sanity dependencies:
  - `next-sanity` - Sanity integration for Next.js
  - `@sanity/vision` - GROQ query testing tool
  - `@sanity/image-url` - Image URL builder
  - `sanity` - Sanity Studio

### Rationale
- Phase 0: Documentation system enables context preservation across Claude Code sessions
- Phase 1-4: Sanity CMS allows client to manage dynamic content without code changes
- Embedded Studio simplifies deployment (single app vs separate hosting)
- MCP deployment used for direct schema deployment to Sanity cloud
- ISR caching strategy planned for optimal performance

### Files Created
**Documentation:**
- `/docs/README.md` - Documentation system overview
- `/docs/features/sanity-integration.md` - Comprehensive Sanity feature documentation
- `/docs/changes/changelog.md` - This file
- `/docs/plans/implementation-log.md` - Implementation tracking

**Sanity Configuration:**
- `/sanity/lib/client.ts` - Sanity client setup
- `/sanity/lib/image.ts` - Image URL builder utility
- `/sanity/lib/queries.ts` - GROQ queries (news, testimonials, stats)
- `/sanity/config.ts` - Studio configuration
- `/sanity/structure.ts` - Custom desk structure

**Sanity Schemas:**
- `/sanity/schemas/documents/newsArticle.ts`
- `/sanity/schemas/documents/testimonial.ts`
- `/sanity/schemas/documents/statistic.ts`
- `/sanity/schemas/index.ts` - Schema registry

**Studio Routes:**
- `/app/studio/[[...tool]]/page.tsx` - Studio page component
- `/app/studio/[[...tool]]/layout.tsx` - Studio layout

**Environment:**
- `/.env.local` - Sanity credentials and configuration

### Technical Details
- **Sanity Project**: m7t9w5hz
- **Dataset**: production
- **CORS**: Configured for `http://localhost:3000`
- **API Version**: 2025-01-21
- **Deployment Method**: MCP tools (direct cloud deployment)

## [2026-01-21] - Documentation Setup

### Added
- `/docs/README.md` - Documentation system overview
- `/docs/features/sanity-integration.md` - Sanity CMS feature documentation
- `/docs/changes/changelog.md` - This changelog file
- `/docs/plans/implementation-log.md` - Implementation tracking

### Changed
- N/A

### Rationale
- Established documentation system to track features, changes, and decisions
- Enables context preservation across Claude Code sessions
- Facilitates troubleshooting and future development
- Provides reference for client and future developers

### Files Modified
- Created `/docs/` directory structure
- Created documentation markdown files

---

## Template for Future Entries

```markdown
## [YYYY-MM-DD] - Brief Description

### Added
- New features or files added

### Changed
- Changes to existing functionality

### Removed
- Deprecated or removed features

### Fixed
- Bug fixes

### Rationale
- Why these changes were made
- Context and decision-making process

### Files Modified
- List of files created, modified, or deleted
```

---

## Change Categories

**Added**: New features, files, or capabilities
**Changed**: Modifications to existing functionality
**Deprecated**: Features marked for removal in future versions
**Removed**: Deleted features or files
**Fixed**: Bug fixes
**Security**: Vulnerability patches

## Notes

- Include date in YYYY-MM-DD format
- Group related changes under a single date entry
- Provide context in "Rationale" section
- List all modified files for easy reference
- Use relative paths from project root
