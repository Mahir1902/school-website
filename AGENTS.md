# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 website for Singapore International School (SIS), built with React 19, TypeScript, and Tailwind CSS 4. The site features a homepage with multiple sections showcasing the school's programs, facilities, and admissions process, plus a comprehensive News & Events section with dynamic content managed through Pages CMS (Git-backed, content stored as files in this repo).

## Development Commands

```bash
# Start development server (uses Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

`npm run build` needs no environment variables. `npm run lint` runs `eslint .` directly (`next lint` was removed in Next.js 16).

## Architecture

### Content (Pages CMS)

Content is edited in [Pages CMS](https://pagescms.org) (hosted at app.pagescms.org), which commits JSON files to this repo; every save triggers a rebuild. There is no CMS backend, API key, or admin route in the site itself. Editor guide: `docs/editing-content.md`.

- **Schema:** `.pages.yml` at the repo root defines every collection and field. Field `name`s are the stored JSON keys and must match `types/newsEvents.ts` / `types/academics.ts`; Pages CMS removes undeclared keys on save.
- **Content files:** `content/news/`, `content/events/`, `content/notices/`, `content/gallery/`, `content/videos/`, `content/calendar/` (one JSON file per entry; news/event file name = URL slug), plus single-list files `content/stats.json` and `content/testimonials.json` (array order = display order).
- **Media:** uploads go to `public/media/`, referenced in content as `/media/<file>`.
- **Loading:** `lib/content.ts` reads the folders with `node:fs` (server-only) and does all sorting/filtering (upcoming vs past, active notices, categories). Pages are statically generated; date-sensitive pages keep `revalidate = 60` and `next.config.ts` traces `content/**` so ISR re-renders can read it.
- **Rich text:** `body` fields are Markdown, rendered by `components/newsEvents/MarkdownContent.tsx` (react-markdown, raw HTML disabled).
- **Adding a field:** update `.pages.yml`, the JSON files, the TS type, and the consumer together.

### Page Structure

The application uses Next.js App Router with a single homepage (`app/page.tsx`) that composes multiple section components in a specific order:

1. Hero (image carousel with overlay)
2. Welcome
3. WhyChooseSIS
4. AcademicPrograms
5. CampusLife
6. Stats
7. Testimonials
8. News
9. ApplicationProcess
10. Footer

All sections are located in `/sections/*.tsx` and imported into the homepage.

### News & Events Multi-Page Section

The application includes a dedicated `/news-events` route with the following structure:

**Main Routes:**
- `/news-events` - Overview/hub page with featured content
- `/news-events/news` - News articles hub with pagination
- `/news-events/news/[slug]` - Individual news article detail pages
- `/news-events/events` - Events hub
- `/news-events/events/upcoming` - Upcoming events filtered view
- `/news-events/events/past` - Past events with archive
- `/news-events/events/calendar` - Calendar view using FullCalendar
- `/news-events/events/[slug]` - Individual event detail pages
- `/news-events/notices` - Current active notices
- `/news-events/notices/archive` - Archived notices
- `/news-events/gallery` - Photo gallery with masonry layout
- `/news-events/gallery/videos` - Video gallery

**Content Managed via Pages CMS** - All content is read from `/content` via `lib/content.ts` at build time (date-sensitive pages re-render every 60 seconds).

**Detail Page Features** (Event & News detail pages):
- Hero section with featured image overlay and metadata
- Two-column responsive layout: content (2/3) + sticky sidebar (1/3)
- Markdown body rendering with custom styling using `react-markdown`
- Event metadata sidebar: date, time, location, capacity, registration CTA
- News metadata sidebar: published date, category, author
- Related content section (3 items, filtered by category/eventType)
- Dynamic SEO metadata: OpenGraph and Twitter Cards
- ISR with 60-second revalidation for fresh content
- 404 handling via `notFound()` for invalid slugs
- Past event detection (hides registration button, shows "concluded" message)
- Security: External links use `rel="noopener noreferrer"` with `target="_blank"`

### Font System

The project uses a custom font configuration with both Google Fonts and local fonts:

**Local fonts** (stored in `/assets/fonts/`):
- `inglobal` (inglobal/*.ttf, regular/italic/bold) - Used for headings via `font-inglobal` class
- `inglobalNormal` (inglobal/inglobal.ttf) - Used via `font-inglobalNormal` class
- `proximaNova` (ProximaNovaA-Light.ttf) - Used for body text via `font-proximaNova` class
- `le_beaune` (LeBeauneNew.otf) - Used for hero section via `font-le_beaune` class

**Google Fonts**:
- `poppins` - Available via `font-poppins` class

All fonts are configured in `app/layout.tsx` and exposed as CSS variables in `app/globals.css`. Apply fonts using Tailwind utility classes (e.g., `className="font-inglobal"`).

### Theming and Design System

The project uses a comprehensive design token system defined in `app/globals.css`:

- **Color scheme**: Uses OKLCH color space with semantic tokens (primary, secondary, accent, etc.)
- **Primary color**: Green (`oklch(0.52 0.15 149.49)`)
- **Secondary color**: Gold/Yellow (`oklch(0.75 0.17 62.22)`)
- **Dark mode**: Fully configured with alternate color values in `.dark` class
- **Custom shadows**: Brand-specific shadow system with green tint (`--shadow-*` variables)
- **Border radius**: Consistent radius tokens via `--radius-*` variables

All design tokens are accessible via Tailwind utilities (e.g., `bg-primary`, `text-secondary`, `shadow-lg`).

### UI Consistency Rules

**The design token system (`app/globals.css`) is the single source of truth. These rules are mandatory:**

- **Never hardcode colors, fonts, or spacing.** Always use OKLCH design tokens and Tailwind utilities. No inline `style` attributes with color values or raw hex/rgb colors in JSX/TSX.
- **Every UI change requires a visual diff check** by `ui-design-validator` against existing components before the change is considered complete.
- **Cross-viewport testing is mandatory** for every UI change:
  - Mobile: 375px
  - Tablet: 768px
  - Desktop: 1440px
- **Animations must follow the IntersectionObserver pattern** — do not introduce alternate animation libraries without explicit approval.
- **New components must use existing design tokens** — introduce new CSS variables to `globals.css` only if genuinely needed and they follow the established naming convention.

### Component Architecture

- **UI Components**: Located in `/components/ui/` - shadcn/ui components configured via `components.json`
- **Layout Components**: Located in `/components/` (e.g., ScrollNavbar)
- **Section Components**: Located in `/sections/` - Full-width sections that compose the homepage
- **News & Events Components**: Located in `/components/newsEvents/` - Feature-specific components

**News & Events Components** (`/components/newsEvents/`):
- `NewsCard.tsx` - News article cards (shared by homepage and listings): image or crest placeholder, title, excerpt, date/category footer
- `EventCard.tsx` - Event cards with date badges, time, location, registration button
- `NoticeCard.tsx` - Notice cards with priority indicator, attachments, expand/collapse
- `GalleryGrid.tsx` - Masonry layout using react-responsive-masonry
- `Lightbox.tsx` - Full-screen image viewer with keyboard/touch navigation
- `FilterBar.tsx` - Category filter pills with search
- `Pagination.tsx` - Page navigation with URL query params
- `Breadcrumb.tsx` - Dynamic breadcrumb navigation with `bg-primary/5` green-tinted background
- `CategoryBadge.tsx` - Category pill badges with color mapping
- `PageHero.tsx` - Section hero header
- `MarkdownContent.tsx` - Markdown renderer with custom element styling for rich-text bodies

**Academics Components** (`/components/academics/`):
- `Breadcrumb.tsx` - Dynamic breadcrumb navigation with matching `bg-primary/5` green-tinted background (standardized design)

**Breadcrumb Styling**: Both breadcrumb components (News/Events and Academics) use consistent styling with `bg-primary/5 border-b border-border` for a subtle green-tinted background. Breadcrumbs are spaced from the navbar with `pt-24 md:pt-28` in their respective layouts.

All components follow the established design system with OKLCH colors, typography classes, and IntersectionObserver animations.

**shadcn/ui configuration** (`components.json`):
- Style: "new-york"
- Uses CSS variables for theming
- Icon library: lucide-react
- Path aliases: `@/components`, `@/lib`, `@/hooks`

## Agent System & Task Delegation

This project uses specialized AI agents to handle different aspects of development. **When working on tasks, the main agent should delegate to the appropriate specialized agent rather than handling everything directly.**

### Available Agents

Located in `.claude/agents/`, these agents are configured with specific expertise:

#### 1. feature-planner (Opus, CYAN)
**When to use:** Breaking down new features, creating implementation roadmaps
**Capabilities:**
- Decomposes features into actionable task lists
- Creates feature implementation logs in `/plans` directory
- Identifies dependencies and parallel work streams
- Considers project-specific patterns and constraints

**Delegation example:** "New authentication feature needs planning" → Delegate to feature-planner

#### 2. coder-agent (Sonnet, RED)
**When to use:** Implementing features, writing code, building components
**Capabilities:**
- Implements features following established patterns
- Checks `/skills` folder for reusable patterns (see Skills & Patterns section)
- Enforces TypeScript strict mode and security-first approach
- Uses persistent agent memory for context across sessions

**Delegation example:** "Implement user profile component" → Delegate to coder-agent

#### 3. code-reviewer (Opus, YELLOW)
**When to use:** After implementing features, before committing code
**Capabilities:**
- Conducts security-conscious code reviews
- Checks TypeScript patterns, React best practices
- Verifies design token usage (OKLCH colors, Tailwind utilities)
- Uses severity levels: Critical (🔴), Important (🟡), Suggestion (🟢)

**Delegation example:** "Review the new payment integration" → Delegate to code-reviewer

#### 4. ui-design-validator (Sonnet, BLUE)
**When to use:** After creating/modifying UI components, validating design system compliance
**Capabilities:**
- Validates design system consistency
- Tests responsive behavior in a browser
- Verifies proper design token usage, animations, accessibility
- Performs cross-viewport testing (mobile, tablet, desktop)

**Delegation example:** "Validate the new hero carousel design" → Delegate to ui-design-validator

### Agent Workflow Pattern

**Recommended workflow for new features:**
1. **Planning**: feature-planner creates implementation roadmap
2. **CMS Setup** (if needed): add fields/collections to `.pages.yml` and `/content`
3. **Implementation**: coder-agent builds components and features
4. **Code Review**: code-reviewer checks code quality and security
5. **Design Validation**: ui-design-validator ensures design system compliance

**Agents should be delegated to in parallel when possible** to maximize efficiency (e.g., code-reviewer and ui-design-validator checking the same change simultaneously).

### Agent Memory System

Each agent maintains persistent memory in `.claude/agents/{agent-name}/memory/`:
- Agents accumulate context across sessions
- Important patterns, decisions, and learnings are preserved
- Main agent should leverage agent memory when delegating repeat tasks

## Mandatory Change Workflow

**Every code change — no matter how small — must follow this workflow. No step can be skipped.**

| Step | Role | Agent / Action |
|------|------|----------------|
| 1 | **Planner** | `feature-planner` — breaks task into steps, checks `docs/` for context, updates docs when done |
| 2 | **Devil's Advocate** | Built into every agent: challenge assumptions, flag risks, surface edge cases before coding starts |
| 3 | **Coder** | `coder-agent` — implements only after the plan is approved |
| 4 | **UI Validator** | `ui-design-validator` — runs browser tests on every change, not just UI-focused tasks |
| 5 | **Code Reviewer** | `code-reviewer` — final security and quality gate before anything is considered done |

### Non-Negotiable Rules

- **No step can be skipped** — even for one-line fixes, all 5 roles must be engaged.
- **Skills first** — every agent must search `/skills` before writing any new code. If no skill is found, invoke the `find-skills` skill before proceeding. Only after exhausting both should code be written from scratch.
- **Tests must pass** — code is not "done" until it is confirmed passing. No marking tasks complete without evidence.
- **UI consistency** — design tokens (OKLCH colors, fonts, spacing) must not drift between changes. `ui-design-validator` must confirm visual consistency before any change is marked complete.
- **Doc updates** — after completing any feature, update `docs/changes/changelog.md` immediately.

### Running Agents in Parallel

When steps 1 and 2 are complete (plan approved), agents 3, 4, and 5 can run in parallel where their inputs don't depend on each other. Maximize parallelism but never skip the sequence of: Plan → Implement → Validate → Review.

## Skills & Patterns

**Location:** `/skills` directory (to be created)

All agents should check the `/skills` folder for reusable patterns and project-specific implementations before creating new code. This prevents duplication and ensures consistency.

**Expected skill categories:**
- Component patterns (forms, cards, modals)
- Authentication flows
- API integration patterns
- State management patterns
- Testing utilities
- Deployment scripts

**When implementing new features:** Always search the skills folder first. If a suitable pattern exists, adapt it. If you create a novel pattern that could be reused, document it as a new skill.

**Mandatory skills search order (all agents must follow):**
1. Search `/skills` folder for matching pattern.
2. If not found, invoke the `find-skills` skill (`Skill tool: find-skills`).
3. Only after both steps return no match should new code be written from scratch.
4. If new reusable patterns are created during implementation, document them in `/skills` immediately.

**Note:** Skills folder is referenced in agent configurations (coder-agent, ui-design-validator) but not yet populated. As the project grows, document reusable patterns here.

## MCP Servers & Tools

The project has access to Model Context Protocol (MCP) servers that provide specialized tools. **Agents should use MCP tools whenever relevant to their task.**

### Available MCP Servers

#### 1. IDE MCP Server
**Purpose:** Code diagnostics and execution
**Key Tools:**
- `getDiagnostics` - Get TypeScript/ESLint diagnostics
- `executeCode` - Run Python code in Jupyter kernel

**When to use:** code-reviewer can use `getDiagnostics` to identify type errors and linting issues.

### MCP Tool Usage Guidelines

- **Prefer MCP tools over manual operations** when available (e.g., IDE diagnostics rather than ad-hoc type checks)
- **Agents must request appropriate permissions** before using MCP tools
- **Check tool availability** before attempting operations
- **MCP tools are configured in** `.claude/settings.local.json` with granular permissions

### Animation Patterns

Sections use IntersectionObserver for scroll-triggered animations:
```tsx
// Common pattern in section components
const [isVisible, setIsVisible] = useState(false);
const sectionRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    },
    { threshold: 0.2 }
  );
  // ... observer setup
}, []);
```

Apply opacity and transform transitions based on `isVisible` state.

### Image Handling

- Images are stored in `/assets/` directory
- Hero images: `hero-1.jpg` through `hero-6.jpg`
- Logos: `sis-logo.jpg`, `sis-logo-white.png`, `sis-logo-removebg-preview.png`
- Use Next.js `<Image>` component with imports for type safety

### Path Aliases

TypeScript path alias `@/*` maps to the root directory:
```typescript
import Hero from "@/sections/Hero";
import { cn } from "@/lib/utils";
```

## Key Implementation Details

### Hero Section
- Implements automatic image carousel (8-second intervals)
- Images fade with opacity transitions
- Logo and menu overlay positioned absolutely with z-index layering
- Black overlay (`bg-black/50`) for text contrast

### ScrollNavbar Component
- Active and integrated into the layout
- Responsive with mobile menu toggle and dropdown support
- Navigation state managed via `isMenuOpen` (boolean) and `openDropdown` (string | null)
- Supports multiple simultaneous dropdowns (Academics, News & Events)
- News & Events dropdown configured in `/data/newsEvents/navigation.ts`
- Includes 3 sections: News, Events, and More (Gallery/Notices)
- Uses `usePathname()` from `next/navigation` for active link highlighting
- **Dropdown positioning**: Dropdowns are 600px wide and positioned dynamically - "News & Events" dropdown uses `right-0` positioning to prevent viewport cutoff, while other dropdowns use `left-0`

### Utility Functions

`lib/utils.ts` exports the `cn()` function for conditional className merging using `clsx` and `tailwind-merge`.

## Configuration Files

- `next.config.ts`: Next.js configuration (traces `content/**` into ISR functions)
- `tailwind.config.ts`: Not present - Tailwind CSS 4 uses `@tailwindcss/postcss` with inline configuration in `globals.css`
- `components.json`: shadcn/ui configuration for component generation
- `tsconfig.json`: TypeScript configuration with `@/*` path alias
- `.pages.yml`: Pages CMS configuration (collections, fields, media folder)
- `.claude/settings.local.json`: Agent permissions and MCP server configuration
- `.claude/agents/*.md`: Individual agent configuration files

## Key Dependencies

**Framework & Core:**
- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS 4

**UI & Styling:**
- shadcn/ui components
- lucide-react icons
- clsx + tailwind-merge (via `cn()` utility)

**CMS:**
- Pages CMS (external hosted app, no npm dependency) - edits `/content` via Git
- react-markdown - renders Markdown rich-text bodies

**Calendar & Media:**
- @fullcalendar/react, @fullcalendar/daygrid, @fullcalendar/interaction - Event calendar
- react-responsive-masonry - Gallery masonry layout

**Development:**
- ESLint with Next.js config
- TypeScript strict mode

## Development Notes

### Resuming Work

**When starting a new session, read `docs/changes/changelog.md` and `docs/plans/implementation-log.md` first** to orient on current progress before making any changes. Update them after completing any feature or phase.

**Current Branch:** `feature/news-events-section`
- Major feature in progress: News & Events section (content via Pages CMS)

**Code Standards:**
- All section components use `"use client"` directive for client-side interactivity
- Strict TypeScript mode enforced
- Use IntersectionObserver pattern for scroll animations
- Follow established design token system (OKLCH colors)
- All images must use Next.js `<Image>` component

**Agent Coordination:**
- Main agent should delegate to specialized agents (see Agent System section)
- Agents should check `/skills` folder before implementing new patterns
- Agents should use MCP tools when appropriate (IDE)
- Each agent maintains persistent memory in `.claude/agents/{agent-name}/memory/`

**Navigation Data:**
- News & Events navigation configured in `/data/newsEvents/navigation.ts`
- Future sections should follow this pattern for dropdown menus

**Feature Implementation:**
- Track progress in `docs/plans/implementation-log.md`
- ISR configured on overview page (60-second revalidation)

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
