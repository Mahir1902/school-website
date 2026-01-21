# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 website for Singapore International School (SIS), built with React 19, TypeScript, and Tailwind CSS 4. The site features a single-page landing page with multiple sections showcasing the school's programs, facilities, and admissions process.

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
- **Layout Components**: Located in `/components/` (e.g., Navbar)
- **Section Components**: Located in `/sections/` - Full-width sections that compose the homepage

**shadcn/ui configuration** (`components.json`):
- Style: "new-york"
- Uses CSS variables for theming
- Icon library: lucide-react
- Path aliases: `@/components`, `@/lib`, `@/hooks`

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

### Navbar Component
- Currently commented out in `app/layout.tsx`
- Responsive with mobile menu toggle
- Uses hardcoded navigation links array
- Mobile menu state managed via `isMenuOpen` useState

### Utility Functions

`lib/utils.ts` exports the `cn()` function for conditional className merging using `clsx` and `tailwind-merge`.

## Configuration Files

- `next.config.ts`: Default Next.js configuration (currently empty)
- `tailwind.config.ts`: Not present - Tailwind CSS 4 uses `@tailwindcss/postcss` with inline configuration in `globals.css`
- `components.json`: shadcn/ui configuration for component generation
- `tsconfig.json`: TypeScript configuration with `@/*` path alias

## Development Notes

- All section components use `"use client"` directive for client-side interactivity
- The site currently has uncommitted changes to core files (layout, page, globals.css)
- Navbar component exists but is not currently rendered in the layout
- Some fonts in layout.tsx are commented out (Montserrat, Quadraat, Lora)
