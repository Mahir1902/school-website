# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 website for Singapore International School (SIS), built with React 19, TypeScript, and Tailwind CSS 4. The site features a homepage with multiple sections showcasing the school's programs, facilities, and admissions process, plus a comprehensive News & Events section with dynamic content managed through Sanity CMS.

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

## Architecture

### Sanity CMS Integration

The project uses Sanity CMS for managing dynamic content in the News & Events section.

**Configuration:**
- Project ID: `m7t9w5hz`
- Dataset: `production`
- Studio Tool: Configured with structureTool plugin
- Config file: `sanity.config.ts`

**Content Schemas** (located in `/sanity/schemas/documents/`):
1. **news.ts** - News articles with title, slug, publishedDate, excerpt, featuredImage, content (Portable Text), category (Latest/Achievements), featured flag, tags, author
2. **event.ts** - Events with startDate, endDate, location, excerpt, featuredImage, content, status (Upcoming/Ongoing/Past), eventType (Academic/Sports/Cultural/Community), registrationLink, capacity, featured flag
3. **notice.ts** - Notices with publishedDate, expiryDate, content, priority (Urgent/High/Normal/Low), category (Academic/Administrative/Event/General), attachments, targetAudience, pinned flag
4. **galleryImage.ts** - Gallery images with title, image (hotspot enabled), caption, photographer, dateTaken, category, aspectRatio, tags, featured, order
5. **videoGallery.ts** - Video gallery entries

All schemas are aggregated in `sanity/schemas/index.ts`.

**GROQ Queries** (located in `/sanity/lib/queries.ts`):
- `featuredItemsQuery` - Featured news & events for carousel
- `latestNewsQuery` - Paginated news articles
- `newsByCategoryQuery` - News filtered by category
- `upcomingEventsQuery` - Future events
- `pastEventsQuery` - Historical events with pagination
- `allEventsQuery` - All events for calendar view
- `activeNoticesQuery` - Current active notices

**Image Handling:**
- Sanity images use `sanity/lib/image.ts` with `@sanity/image-url` builder
- Supports hotspot/crop, responsive sizing, and WebP format

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

**Content Managed via Sanity CMS** - All content is fetched from Sanity using GROQ queries with ISR (60-second revalidation on overview page).

### Font System

The project uses a custom font configuration with both Google Fonts and local fonts:

**Local fonts** (stored in `/assets/fonts/`):
- `orpheus` (OrpheusPro-Bold.ttf) - Used for headings via `font-orpheus` class
- `orpheusNormal` (OrpheusW05-Regular.ttf) - Used via `font-orpheusNormal` class
- `proximaNova` (ProximaNovaA-Light.ttf) - Used for body text via `font-proximaNova` class
- `le_beaune` (LeBeauneNew.otf) - Used for hero section via `font-le_beaune` class

**Google Fonts**:
- `poppins` - Available via `font-poppins` class

All fonts are configured in `app/layout.tsx` and exposed as CSS variables in `app/globals.css`. Apply fonts using Tailwind utility classes (e.g., `className="font-orpheus"`).

### Theming and Design System

The project uses a comprehensive design token system defined in `app/globals.css`:

- **Color scheme**: Uses OKLCH color space with semantic tokens (primary, secondary, accent, etc.)
- **Primary color**: Green (`oklch(0.52 0.15 149.49)`)
- **Secondary color**: Gold/Yellow (`oklch(0.75 0.17 62.22)`)
- **Dark mode**: Fully configured with alternate color values in `.dark` class
- **Custom shadows**: Brand-specific shadow system with green tint (`--shadow-*` variables)
- **Border radius**: Consistent radius tokens via `--radius-*` variables

All design tokens are accessible via Tailwind utilities (e.g., `bg-primary`, `text-secondary`, `shadow-lg`).

### Component Architecture

- **UI Components**: Located in `/components/ui/` - shadcn/ui components configured via `components.json`
- **Layout Components**: Located in `/components/` (e.g., ScrollNavbar)
- **Section Components**: Located in `/sections/` - Full-width sections that compose the homepage
- **News & Events Components**: Located in `/components/newsEvents/` - Feature-specific components

**News & Events Components** (`/components/newsEvents/`):
- `NewsCard.tsx` - News article cards with featured variant, metadata, excerpt
- `EventCard.tsx` - Event cards with date badges, time, location, registration button
- `NoticeCard.tsx` - Notice cards with priority indicator, attachments, expand/collapse
- `GalleryGrid.tsx` - Masonry layout using react-responsive-masonry
- `Lightbox.tsx` - Full-screen image viewer with keyboard/touch navigation
- `FilterBar.tsx` - Category filter pills with search
- `Pagination.tsx` - Page navigation with URL query params
- `Breadcrumb.tsx` - Dynamic breadcrumb navigation with `bg-primary/5` green-tinted background
- `CategoryBadge.tsx` - Category pill badges with color mapping
- `PageHero.tsx` - Section hero header

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

#### 3. sanity-cms-architect (Sonnet, PURPLE)
**When to use:** Any Sanity CMS-related work
**Capabilities:**
- Creates and modifies Sanity schemas
- Configures Sanity Studio structure
- Writes optimized GROQ queries
- Uses Sanity MCP tools for schema deployment and document operations
- Ensures best practices for content modeling

**Delegation example:** "Add testimonials schema to Sanity" → Delegate to sanity-cms-architect

#### 4. code-reviewer (Opus, YELLOW)
**When to use:** After implementing features, before committing code
**Capabilities:**
- Conducts security-conscious code reviews
- Checks TypeScript patterns, React best practices
- Verifies design token usage (OKLCH colors, Tailwind utilities)
- Uses severity levels: Critical (🔴), Important (🟡), Suggestion (🟢)

**Delegation example:** "Review the new payment integration" → Delegate to code-reviewer

#### 5. ui-design-validator (Sonnet, BLUE)
**When to use:** After creating/modifying UI components, validating design system compliance
**Capabilities:**
- Validates design system consistency
- Tests responsive behavior using Playwright MCP
- Verifies proper design token usage, animations, accessibility
- Performs cross-viewport testing (mobile, tablet, desktop)

**Delegation example:** "Validate the new hero carousel design" → Delegate to ui-design-validator

### Agent Workflow Pattern

**Recommended workflow for new features:**
1. **Planning**: feature-planner creates implementation roadmap
2. **CMS Setup** (if needed): sanity-cms-architect creates schemas and queries
3. **Implementation**: coder-agent builds components and features
4. **Code Review**: code-reviewer checks code quality and security
5. **Design Validation**: ui-design-validator ensures design system compliance

**Agents should be delegated to in parallel when possible** to maximize efficiency (e.g., sanity-cms-architect and coder-agent working simultaneously on backend and frontend).

### Agent Memory System

Each agent maintains persistent memory in `.claude/agents/{agent-name}/memory/`:
- Agents accumulate context across sessions
- Important patterns, decisions, and learnings are preserved
- Main agent should leverage agent memory when delegating repeat tasks

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

**Note:** Skills folder is referenced in agent configurations (coder-agent, ui-design-validator) but not yet populated. As the project grows, document reusable patterns here.

## MCP Servers & Tools

The project has access to Model Context Protocol (MCP) servers that provide specialized tools. **Agents should use MCP tools whenever relevant to their task.**

### Available MCP Servers

#### 1. Sanity MCP Server
**Purpose:** Direct interaction with Sanity CMS
**Key Tools:**
- `get_schema` - Retrieve Sanity schemas
- `query_documents` - Execute GROQ queries
- `create_documents_from_json` - Create content
- `patch_document_from_json` - Update content
- `publish_documents` - Publish drafts
- `deploy_schema` - Deploy schemas to cloud

**When to use:** sanity-cms-architect should use these tools for all Sanity operations instead of manual file editing when appropriate.

#### 2. Playwright MCP Server
**Purpose:** Browser automation and testing
**Key Tools:**
- `browser_navigate` - Navigate to URLs
- `browser_snapshot` - Capture accessibility snapshot
- `browser_take_screenshot` - Take screenshots
- `browser_click`, `browser_type`, etc. - Interact with pages
- `browser_resize` - Test different viewport sizes

**When to use:** ui-design-validator should use these tools to test responsive behavior and visual consistency across viewports.

#### 3. IDE MCP Server
**Purpose:** Code diagnostics and execution
**Key Tools:**
- `getDiagnostics` - Get TypeScript/ESLint diagnostics
- `executeCode` - Run Python code in Jupyter kernel

**When to use:** code-reviewer can use `getDiagnostics` to identify type errors and linting issues.

### MCP Tool Usage Guidelines

- **Prefer MCP tools over manual operations** when available (e.g., use Sanity MCP for schema deployment rather than CLI commands)
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
- Logos: `sis-logo.jpg`, `sis-logo-white.png`, `sis-logo-2.png`
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

- `next.config.ts`: Default Next.js configuration (currently empty)
- `tailwind.config.ts`: Not present - Tailwind CSS 4 uses `@tailwindcss/postcss` with inline configuration in `globals.css`
- `components.json`: shadcn/ui configuration for component generation
- `tsconfig.json`: TypeScript configuration with `@/*` path alias
- `sanity.config.ts`: Sanity Studio configuration with project ID, dataset, plugins, and schema
- `.claude/settings.local.json`: Agent permissions and MCP server configuration
- `.claude/agents/*.md`: Individual agent configuration files

## Key Dependencies

**Framework & Core:**
- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS 4

**UI & Styling:**
- shadcn/ui components
- lucide-react icons
- clsx + tailwind-merge (via `cn()` utility)

**CMS:**
- @sanity/client - Sanity API client
- @sanity/image-url - Image URL builder
- next-sanity - Next.js integration

**Calendar & Media:**
- @fullcalendar/react, @fullcalendar/daygrid, @fullcalendar/interaction - Event calendar
- react-responsive-masonry - Gallery masonry layout

**Development:**
- ESLint with Next.js config
- TypeScript strict mode

## Development Notes

**Current Branch:** `feature/news-events-section`
- Major feature in progress: News & Events section with Sanity CMS integration
- Implementation tracked in `FEATURE_DOCUMENT.md` (15 phases, 200+ tasks)

**Code Standards:**
- All section components use `"use client"` directive for client-side interactivity
- Strict TypeScript mode enforced
- Use IntersectionObserver pattern for scroll animations
- Follow established design token system (OKLCH colors)
- All images must use Next.js `<Image>` component

**Agent Coordination:**
- Main agent should delegate to specialized agents (see Agent System section)
- Agents should check `/skills` folder before implementing new patterns
- Agents should use MCP tools when appropriate (Sanity, Playwright, IDE)
- Each agent maintains persistent memory in `.claude/agents/{agent-name}/memory/`

**Navigation Data:**
- News & Events navigation configured in `/data/newsEvents/navigation.ts`
- Future sections should follow this pattern for dropdown menus

**Feature Implementation:**
- Track progress in `FEATURE_DOCUMENT.md`
- Currently in Phase 1-3 (Schema, Routes, Components creation)
- ISR configured on overview page (60-second revalidation)
