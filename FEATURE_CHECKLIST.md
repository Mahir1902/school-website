# Feature Checklist

> **Session-persistent progress tracker. Read this first at the start of every session.**
> Detailed task breakdowns live in `FEATURE_DOCUMENT.md`. Update this file whenever a phase or feature is completed.

---

## Completed Features ✅

- [x] **Phase 14.5 — Event & News Detail Pages** — Full implementation including: `@portabletext/react` dependency, `dateUtils.ts`, `types/newsEvents.ts`, `PortableTextContent.tsx`, event detail page (`/news-events/events/[slug]`), news detail page (`/news-events/news/[slug]`), GROQ queries for related content, OpenGraph/Twitter metadata, ISR (60s revalidation), 404 handling, responsive two-column layout, sticky sidebar, tags, registration CTA logic, integration tests, and CLAUDE.md documentation updates.

---

## In Progress 🔄

*(Nothing currently in active development — see Planned below for next priorities)*

---

## Planned 📋

### High Priority

- [ ] **Phase 1 — Sanity Schema & Foundation** — Create news, event, notice, galleryImage, videoGallery schemas; deploy to Studio; write and test GROQ queries; populate initial content (10 news, 8 events, 5 notices, 30 gallery images, 5 videos).
- [ ] **Phase 2 — Navigation Integration** — Create `/data/newsEvents/navigation.ts`; update ScrollNavbar to support News & Events dropdown with 3 sections (News, Events, More).
- [ ] **Phase 3 — Shared Layout & Structure** — Create `/app/news-events/layout.tsx`; Breadcrumb component; directory structure for all sub-routes.

### Medium Priority

- [ ] **Phase 4 — Core UI Components** — CategoryBadge, DateBadge, FilterBar, Pagination, DownloadButton components.
- [ ] **Phase 5 — Content Card Components** — NewsCard, EventCard, NoticeCard components with all variants.
- [ ] **Phase 6 — Advanced Components** — FeaturedCarousel (Framer Motion), GalleryGrid (masonry), Lightbox (keyboard/touch), CalendarView (FullCalendar).
- [ ] **Phase 7 — Overview Page** — `/news-events` hub page with FeaturedCarousel, Quick Links, Events Preview, News Grid, Notices Banner, Gallery Preview.
- [ ] **Phase 8 — News Pages** — News hub, Announcements page, Achievements page (individual detail already done in Phase 14.5).
- [ ] **Phase 9 — Events Pages** — Events hub, Upcoming, Past, Calendar, (individual detail already done in Phase 14.5).
- [ ] **Phase 10 — Notices Pages** — Current Notices page, Notice Archive page.
- [ ] **Phase 11 — Gallery Pages** — Photo Gallery (masonry + lightbox), Video Gallery.

### Lower Priority

- [ ] **Phase 12 — Package Installation** — Verify/install react-responsive-masonry and FullCalendar packages.
- [ ] **Phase 13 — Testing & QA** — Playwright test suites: navigation, news hub, gallery, calendar, responsive, accessibility.
- [ ] **Phase 14 — Performance Optimization** — Image optimization, code splitting (dynamic imports for Lightbox, CalendarView), ISR tuning, Lighthouse audit (target >90).
- [ ] **Phase 15 — Final Polish & Deployment** — Code review pass, cross-browser testing, documentation, final QA checklist, production deployment.

---

## Phase Status Summary

| Phase | Name | Status |
|-------|------|--------|
| 1 | Sanity Schema & Foundation | Not started |
| 2 | Navigation Integration | Not started |
| 3 | Shared Layout & Structure | Not started |
| 4 | Core UI Components | Not started |
| 5 | Content Card Components | Not started |
| 6 | Advanced Components | Not started |
| 7 | Overview Page | Not started |
| 8 | News Pages | Not started |
| 9 | Events Pages | Not started |
| 10 | Notices Pages | Not started |
| 11 | Gallery Pages | Not started |
| 12 | Package Installation | Not started |
| 13 | Testing & QA | Not started |
| 14 | Performance Optimization | Not started |
| 14.5 | Event & News Detail Pages | **Complete ✅** |
| 15 | Final Polish & Deployment | Not started |

---

## Notes & Decisions

- Phase 14.5 was implemented out of order (before 1–14) as a priority item.
- Phases 1–3 are the current recommended next steps to unblock all remaining phases.
- All agents must update this file immediately after completing any phase or significant feature.

---

**Last Updated:** 2026-03-17
**Overall Progress:** 1 of 15 phases complete (Phase 14.5)
